/**
 * @file app.js
 * @function setupMobileNavigation
 * @description 初始化手機端漢堡選單互動狀態機
 */

import { initStarfield } from './modules/background.js';
import { initI18n } from './modules/i18n.js';
import { bootstrapDynamicModules } from './modules/dynamicHydrator.js'; // 導入新版引擎

class AppKernel {
  constructor() {
    this.isInitialized = false;
  }

  async bootstrap() {
    if (this.isInitialized) return;

    try {
      // 1. 啟動進階星座連線畫布背景
      initStarfield('starfield-canvas');

      // 2. 初始化靜態多國語言翻譯與打字機
      initI18n();

      // 3. 一次性同步加載 JSON 並渲染 Portfolio、Team、Contact 與 Footer 頁尾
      await bootstrapDynamicModules();

      this.isInitialized = true;
    } catch (fault) {
      console.error(`System Fault Detected within Kernel Boot: ${fault.message}`);
    }
  }
}

const kernel = new AppKernel();
window.addEventListener('DOMContentLoaded', () => kernel.bootstrap());

function setupMobileNavigation() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('stage-nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuBtn || !navMenu) return;

  // 1. 點擊漢堡按鈕 ➔ 切換選單狀態
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // 2. 點擊任何導覽連結 ➔ 自動關閉選單 (防止點擊錨點後選單依然擋住畫面)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // 3. 防禦性設計：點擊選單外部空白處自動收合選單
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      menuBtn.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// 確保在 DOM 載入完畢後掛載
document.addEventListener('DOMContentLoaded', () => {
  setupMobileNavigation();
});