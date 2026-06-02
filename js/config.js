/**
 * @file config.js (字串微調更新版)
 */

export const CONFIG = {
  DEFAULT_LANGUAGE: 'zh',
  
  // 打字機循環顯示文本：合併中文第二、三句，英文保持獨立切換
  TYPING_TEXTS: {
    zh: [
      "星簇工作室",
      "創意與發想 | 一切的起源" // 修正：合併兩詞並以管線符號區隔
    ],
    en: [
      "Asteryx Studio",
      "Creativity & Ideation",
      "The Origin of All"
    ]
  },

  // 靜態 UI 翻譯字典
  UI_TRANSLATIONS: {
    zh: {
      navHome: "首頁",
      navPortfolio: "作品展示",
      navTeam: "成員介紹",
      navContact: "聯絡我們",
      sectionPortfolioTitle: "星軌作品",
      sectionTeamTitle: "星群觀測者",
      sectionContactTitle: "建立星際連結"
    },
    en: {
      navHome: "Home",
      navPortfolio: "Portfolio",
      navTeam: "Team",
      navContact: "Contact",
      sectionPortfolioTitle: "Stellar Portfolio",
      sectionTeamTitle: "Constellation Observers",
      sectionContactTitle: "Interstellar Link"
    }
  }
};