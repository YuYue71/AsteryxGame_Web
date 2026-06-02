/**
 * @file i18n.js (修復優化版)
 */

import { CONFIG } from '../config.js';

class LocalizationEngine {
  constructor() {
    this.currentLang = CONFIG.DEFAULT_LANGUAGE;
    this.langBtn = document.getElementById('lang-switch-btn');
    this.typingHeading = document.getElementById('typing-heading');
    this.textLoopIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.typingTimeoutId = null;
  }

  init() {
    if (this.langBtn) {
      this.langBtn.addEventListener('click', () => this.toggleLanguage());
    }
    this.applyStaticTranslations();
    this.startTypingLoop();
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
    document.documentElement.setAttribute('data-lang', this.currentLang);
    if (this.langBtn) {
      this.langBtn.textContent = this.currentLang === 'zh' ? 'EN' : '中文';
    }
    
    this.applyStaticTranslations();
    this.resetTypingMachine();
    
    // 關鍵修正：觸發全域自訂事件，通知動態資料渲染器同步刷新 (Custom Event Dispatcher)
    const langChangeEvent = new CustomEvent('studioLanguageChanged', { detail: { lang: this.currentLang } });
    window.dispatchEvent(langChangeEvent);
  }

  /**
   * 僅翻譯導覽列等靜態 HTML 節點 (Isolate Static Node Hydration)
   */
  applyStaticTranslations() {
    const dict = CONFIG.UI_TRANSLATIONS[this.currentLang];
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
  }

  startTypingLoop() {
    if (!this.typingHeading) return; // 防禦性檢查
    const currentTextArray = CONFIG.TYPING_TEXTS[this.currentLang];
    const fullText = currentTextArray[this.textLoopIndex % currentTextArray.length];

    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    this.typingHeading.textContent = fullText.substring(0, this.charIndex);
    let delay = this.isDeleting ? 40 : 100;

    if (!this.isDeleting && this.charIndex === fullText.length) {
      delay = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textLoopIndex++;
      delay = 400;
    }

    this.typingTimeoutId = setTimeout(() => this.startTypingLoop(), delay);
  }

  resetTypingMachine() {
    if (this.typingTimeoutId) clearTimeout(this.typingTimeoutId);
    this.charIndex = 0;
    this.isDeleting = false;
    this.startTypingLoop();
  }
}

// 單例快取以供調用
let instance = null;
export function initI18n() {
  instance = new LocalizationEngine();
  instance.init();
  return instance;
}