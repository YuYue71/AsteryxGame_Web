/**
* @file dynamicHydrator.js (Team Role Badge Expansion)
* @dependency studio_data.json
* @responsibility 將成員職稱字串解耦為獨立標籤矩陣，實作動態渲染與空值安全防禦。
*/

class DynamicHydrator {
  constructor() {
    this.dataPath = 'data/studio_data.json';
    this.cachedData = null;
  }

  async init() {
    this.cachedData = await this.fetchData();
    if (!this.cachedData) return;

    this.hydrateAll();
    
    window.addEventListener('studioLanguageChanged', (e) => {
      this.hydrateAll(e.detail.lang);
    });
  }

  async fetchData() {
    try {
      const res = await fetch(this.dataPath);
      if (!res.ok) throw new Error(`HTTP Pipeline error: ${res.status}`);
      return await res.json();
    } catch (fault) {
      console.error(`Global Data Hydration Aborted: ${fault.message}`);
      const portfolioGrid = document.getElementById('portfolio-grid');
      if (portfolioGrid) {
        portfolioGrid.innerHTML = `<p class="error-fallback">Constellation Matrix Connection Failed.</p>`;
      }
      return null;
    }
  }

  /**
   * @param {string} [forcedLang]
   */
  hydrateAll(forcedLang) {
    const lang = forcedLang || document.documentElement.getAttribute('data-lang') || 'zh';
    
    // 進行防禦性型別檢查，確保即使 JSON 結構毀損，也不阻礙其餘正常元件渲染
    if (this.cachedData.portfolios) this.hydratePortfolio(this.cachedData.portfolios, lang);
    if (this.cachedData.team) this.hydrateTeam(this.cachedData.team, lang);
    if (this.cachedData.contact) this.hydrateContact(this.cachedData.contact, lang);
  }

  hydratePortfolio(data, lang) {
    const container = document.getElementById('portfolio-grid');
    if (!container) return;
    
    container.innerHTML = data.map(item => {
      // 安全邊界：防止 JSON 語系欄位遺漏導致執行緒中斷 (Null Defensive Guard)
      const title = item.title ? (item.title[lang] || item.title['zh'] || 'Untitled Project') : 'Untitled Project';
      const description = item.description ? (item.description[lang] || item.description['zh'] || '') : '';
      const image = item.image || 'assets/images/portfolio/fallback.jpg';
      const url = item.url || '#';
      const tags = item.tags || [];

      return `
        <a href="${url}" target="_blank" class="portfolio-card">
          <div class="card-image-wrapper">
            <img src="${image}" alt="${title}" loading="lazy" class="card-img">
          </div>
          <div class="card-info-pane">
            <h3 class="card-project-title">${title}</h3>
            <p class="card-project-desc">${description}</p>
            <div class="card-tags">
              ${tags.map(t => `<span class="tag-token">${t}</span>`).join('')}
            </div>
          </div>
        </a>
      `;
    }).join('');
  }

  hydrateTeam(data, lang) {
    const container = document.getElementById('team-grid');
    if (!container) return;
    
    container.innerHTML = data.map(member => {
      // 1. 安全邊界：維持原有的多國語言欄位防禦 (Null Defensive Guard)
      const name = member.name ? (member.name[lang] || member.name['zh'] || 'Anonymous') : 'Anonymous';
      const roleRaw = member.role ? (member.role[lang] || member.role['zh'] || 'Staff') : 'Staff';
      const avatar = member.avatar || 'assets/images/team/fallback.jpg';

      // 2. 核心增強：解析最新 JSON 內嵌的 link 欄位，實作空值與無效錨點防禦
      const hasLink = member.link && member.link.trim() !== "" && member.link !== "#";
      const hrefAttr = hasLink ? `href="${member.link}" target="_blank" rel="noopener noreferrer"` : 'href="javascript:void(0);"';
      const cardClass = hasLink ? 'team-card clickable-card' : 'team-card static-card';

      // 3. 標籤解耦管道：將 "職稱A | 職稱B" 拆解為獨立的 Array (陣列)
      // 利用 trim() 消除前後空格，確保渲染幾何對稱
      const roleBadges = roleRaw.split('|')
        .map(r => r.trim())
        .filter(r => r.length > 0);

      // 4. 結構重構：移除原本的 <p class="team-role">，升級為 <div class="team-badges-container">
      return `
        <a ${hrefAttr} class="${cardClass}" data-id="${member.id}">
          <div class="avatar-wrapper">
            <img src="${avatar}" alt="${name}" loading="lazy" class="member-avatar">
          </div>
          <div class="member-info">
            <h3 class="team-name">${name}</h3>
            <div class="team-badges-container">
              ${roleBadges.map(badge => `<span class="role-badge">${badge}</span>`).join('')}
            </div>
          </div>
        </a>
      `;
    }).join('');
  }

  hydrateContact(data, lang) {
    const linksContainer = document.getElementById('social-links-cluster');
    const quoteNode = document.getElementById('footer-quote-node');
    const copyrightNode = document.getElementById('footer-copyright-node');

    if (linksContainer && data.socials) {
      linksContainer.innerHTML = data.socials.map(s => {
        const platform = s.platform || 'Link';
        const url = s.url || '#';
        return `<a href="${url}" target="_blank" class="social-item">${platform}</a>`;
      }).join('');
    }

    if (data.footer) {
      if (quoteNode) {
        quoteNode.textContent = data.footer.declaration ? (data.footer.declaration[lang] || data.footer.declaration['zh'] || '') : '';
      }
      if (copyrightNode) {
        copyrightNode.textContent = data.footer.copyright || '';
      }
    }
  }
}

export async function bootstrapDynamicModules() {
  const hydrator = new DynamicHydrator();
  await hydrator.init();
  return hydrator;
}