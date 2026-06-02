/**
 * @file portfolioRenderer.js
 * @responsibility 非同步拉取外部 JSON 數據，快取資料模型，並依據全域語系渲染具備動態懸停特效的作品集卡片網格。
 */

class PortfolioRenderer {
  constructor() {
    this.jsonPath = 'data/portfolio.json';
    this.gridContainer = document.getElementById('portfolio-grid');
    this.cachedPortfolios = []; // 快取資料模型 (In-Memory Data Cache)
  }

  /**
   * 初始化非同步讀取與渲染流 (Initialize Ingestion Flow)
   */
  async init() {
    if (!this.gridContainer) return;

    // 非同步載入核心資料層
    this.cachedPortfolios = await this.fetchPortfolioData();
    
    if (this.cachedPortfolios.length > 0) {
      this.render();
      this.listenToLanguageChange();
    }
  }

  /**
   * 透過 Fetch API 擷取 JSON 結構 (Asynchronous Ingestion Vector)
   * @returns {Promise<Array>} 作品集陣列
   */
  async fetchPortfolioData() {
    try {
      const response = await fetch(this.jsonPath);
      if (!response.ok) {
        throw new Error(`HTTP network fault. Status: ${response.status}`);
      }
      const data = await response.json();
      return data.portfolios || [];
    } catch (fault) {
      console.error(`Portfolio Ingestion Fault: ${fault.message}`);
      // 容錯機制：若讀取失敗，為容器渲染降級提示 (Graceful Degradation UI)
      this.gridContainer.innerHTML = `<p class="error-fallback">Unable to load constellation matrix.</p>`;
      return [];
    }
  }

  /**
   * 執行 DOM 元件映射與動態注入 (Hydrate DOM Components)
   */
  render() {
    // 取得目前 HTML 根節點作用中的語系狀態碼 ('zh' 或 'en')
    const activeLang = document.documentElement.getAttribute('data-lang') || 'zh';
    
    // 清空既有節點，準備重新繪製 (Flush Grid)
    this.gridContainer.innerHTML = '';

    // 歷遍快取陣列，轉換為字面值模板 (Template Literal Mapping)
    this.cachedPortfolios.forEach(project => {
      // 安全解構不同語系的文字欄位 (Bilingual Field Mapping)
      const title = project.title[activeLang] || project.title['zh'];
      const description = project.description[activeLang] || project.description['zh'];
      
      // 建立外層卡片錨點容器 (Card Anchor Component)
      const cardElement = document.createElement('a');
      cardElement.href = project.url;
      cardElement.target = '_blank'; // 另開新視窗跳轉至外部連結
      cardElement.className = 'portfolio-card';
      cardElement.setAttribute('data-id', project.id);

      // 組裝內層 HTML 結構 (示意圖、資訊層、標籤集)
      cardElement.innerHTML = `
        <div class="card-image-wrapper">
          <img src="${project.image}" alt="${title}" loading="lazy" class="card-img">
        </div>
        <div class="card-info-pane">
          <h3 class="card-project-title">${title}</h3>
          <p class="card-project-desc">${description}</p>
          <div class="card-tags">
            ${project.tags.map(tag => `<span class="tag-token">${tag}</span>`).join('')}
          </div>
        </div>
      `;

      // 將元件掛載至主網格容器內
      this.gridContainer.appendChild(cardElement);
    });
  }

  /**
   * 監聽全域語系切換按鈕，觸發局部重新渲染 (Reactive Local Translation Sync)
   */
  listenToLanguageChange() {
    const langBtn = document.getElementById('lang-switch-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        // 當語系切換時，由於資料已快取在記憶體內，直接調用 render() 重新映射，不需重複 Fetch JSON
        this.render();
      });
    }
  }
}

/**
 * 外部模組界面封裝 API
 */
export async function renderPortfolio() {
  const renderer = new PortfolioRenderer();
  await renderer.init();
  return renderer;
}