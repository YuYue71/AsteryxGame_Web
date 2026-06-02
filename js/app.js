/**
 * @file app.js
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