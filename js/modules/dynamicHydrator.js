/**
 * @file dynamicHydrator.js (安全防禦加強版)
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
      const name = member.name ? (member.name[lang] || member.name['zh'] || 'Anonymous') : 'Anonymous';
      const role = member.role ? (member.role[lang] || member.role['zh'] || 'Staff') : 'Staff';
      const avatar = member.avatar || 'assets/images/team/fallback.jpg';

      return `
        <div class="team-card">
          <div class="team-avatar" style="background-image: url('${avatar}'); background-size: cover; background-position: center;"></div>
          <h3 class="team-name">${name}</h3>
          <p class="team-role">${role}</p>
        </div>
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