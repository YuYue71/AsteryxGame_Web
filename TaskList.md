# 星簇Asteryx官方網站 — AI 協作任務範本 (Task Brief)

## [SECTION 0] 全域技術棧 (Immutable Stack)
| 項目 | 值 |
|------|-----|
| 引擎 / 框架 | HTML5 / Vanilla CSS3 / ES6+ JavaScript Modules (原生元件化架構) |
| 核心機制 | Canvas API / JSON Dynamic Pipeline (資料與邏輯解耦) / i18n Custom Event Bus |
| 生產部署 | GitHub Repository ➔ Cloudflare Pages (自動化 CI/CD 持續整合部署) |
| 當前網域 | https://asteryxgame.net/ |
| 原始碼庫 | https://github.com/YuYue71/AsteryxGame_Web |

---

## [SECTION 1] 專案實體資料結構樹 (File Tree Blueprint)


```

[專案根目錄]/
├── index.html                   # 主結構入口點 (頂部已掛載 Favicon 分頁圖標標籤)
├── LICENSE                      # MIT 開源授權合約
├── README.md                    # 文字化編程 (Literate Programming) 架構維護說明書
├── data/
│   └── studio_data.json         # 統一內容資料庫 (雙語系節點、社群外部連結變數源)
├── css/
│   ├── main.css                 # 全域變數與重設矩陣
│   └── components/
│       ├── navbar.css           # 導覽列（Logo 漸層、切換按鈕流體推推防禦已部署）
│       ├── hero.css             # 主視覺與打字機佈局
│       ├── portfolio.css        # 作品網格（已導入 16px Padding 與 10px 圖片圓角框）
│       ├── team.css             # 成員卡片佈局（已升級為雙欄彈性佈局與 Stellar Ghost Badge 矩陣）
│       └── contact.css          # 聯絡我們（已移除阻斷，重構為二維不對稱網格）
├── images/
│   ├── icon.png                 # 網站分頁圖標來源
│   ├── portfolio/
│   │   └── test.png            # 作品集專用測試資產 (路徑嚴格區分大小寫)
│   └── team/
│       ├── yanze.jpg            # 成員頭像資產
│       └── yuyue.jpg            # 成員頭像資產
└── js/
    ├── app.js                   # 主引導啟動程序 (System Bootstrap)
    ├── config.js                # 靜態字典與中文打字機字串常數 ("創意與發想 | 一切的起源")
    └── modules/
        ├── background.js        # 動力學粒子畫布（記憶定錨點與滑鼠二維向量排斥力場）
        ├── dynamicHydrator.js   # 資料非同步注入與空值防禦 (Null Defensive)
        ├── i18n.js              # 事件驅動多國語言狀態機 (studioLanguageChanged)
        └── portfolioRenderer.js # 作品集專用渲染器

```

---

## [SECTION 2] 場景 / 物件 / 元件結構圖 (Object Structure)


```

[index.html] (主入口結構)
├── [] (中繼資料矩陣)
│   └── [] (定義分頁圖標節點 ➔ images/icon.png)
└── [] (頁面實體內容)
├── [] (全域導覽列：含 Logo、lang-btn、menu-toggle、nav-menu)
├── [] (打字機文字輪播區塊)
├── [] (內襯距作品集網格)
├── [] (成員星簇微光標籤卡片區塊)
└── [] (不對稱壓艙聯絡網格)
├── [.contact-status-pillar] (左縱列：ONLINE 綠色脈衝呼吸燈與元數據)
└── [.contact-form-pillar] (右縱列：極簡星際投遞表單)

```

---

## [SECTION 3] 開發進度看板 (Kanban)


```

[階段1] 基礎功能與多國語言
✓ [任務A] 雙語字典與事件驅動狀態機配置
✓ [任務B] 動態打字機引擎優化 (中文局部字串合併完成)

[階段2] 畫布互動與視覺增強
✓ [任務A] 星座拓撲與亮度微調 (連線臨界值調至 130px、線寬 1.0px)
✓ [任務B] 鼠標粒子排斥力場部署 (導入二維向量與線性插值歸位演算法)

[階段3] 佈局平衡與結構優化
✓ [任務A] 作品集卡片精緻化 (加入 16px Padding 內襯距、圖片 10px 圓角與 overflow: hidden)
✓ [任務B] 底部聯絡我們重構 (升級為不對稱二維網格、追加 pulse-glow 呼吸燈)

[階段4] 生產環境與自動化整合
✓ [任務A] 編譯警告排除 (修正 contact.css 的註解錯誤，補齊 navbar.css 的相容前綴)
✓ [任務B] 串接 GitHub 儲存庫與 Cloudflare Pages，成功啟用自動化 CI/CD 部署
✓ [任務C] 多國語言切換按鈕排版衝突修復 (利用 margin-left: auto 實作桌機/行動端雙端幾何防禦)

[階段5] 數據解耦與標籤化迭代 (Active Sprint)
✓ [任務A] dynamicHydrator.js 職稱管線重構 (利用 split('|') 成功將字串轉化為陣列獨立渲染)
✓ [任務B] team.css 雙欄幾何優化 (引入 Ghost Badge 微光虛線邊框與懸停發光共振特效)
□ [任務C] 表單實際端點對接與測試 (確認第三方 API 或 mailto 運作)
□ [任務D] 生產環境大小寫與快取更新機制 (Cache Busting) 巡檢

```

---

## [SECTION 4] 當前任務 (Active Task Brief)


```

STATUS: IDLE — 系統架構穩定，導覽列與成員標籤改動已完美兼容，等待新指令輸入。

【目標】
成員卡面的職稱已成功解耦為「微光虛線邊框標籤（Stellar Ghost Badges）」，且多國語言切換按鈕不論在桌機端（置右靠頁籤）還是行動端（置右靠漢堡選單左側）皆具備完美的 RWD 幾何防禦。

【正在修改的檔案】

* 無 (暫無檔案變更)

【依賴的模組 / 系統】

* GitHub Master Branch (主分支原始碼)
* Cloudflare Pages Deployment Webhook (自動部署觸發器)

【關鍵變數 / 狀態】

* 無

【輸出約束】

1. 依循文字化編程與雙語標記規範。
2. 聚焦於下一個功能迭代。

```

---

## [SECTION 5] 編碼規範 (Coding Contract)
- **Literate Programming (文字化編程)**：所有新撰寫的 CSS/JS 組件，頂部必須包含完整的 `@file`、`@dependency`、`@responsibility` 標頭說明，程式碼內部邏輯需具備高密度、維基式的行內註解。
- **雙語標記 (100% Bilingual Imperative)**：所有技術名詞、控制台按鈕或欄位屬性在提及時，必須立即以括號標記在地化中文對照，例：`CI/CD (持續整合與持續部署)`。
- **防禦性程式設計 (Defensive Design)**：JSON 欄位必須配置 Null Coalescing (空值合併) 預設值；任何推送到遠端伺服器的資產必須遵循嚴格的 Case Sensitivity (大小寫檢查)，防範 Linux 託管環境破圖。
- **無道歉語句**：遇到異常或 Bug 時直接進行 Cognitive Pivot (認知轉向) 進行分析，嚴禁任何軟性修飾語或客套詞。

---

## [SECTION 6] AI 輸出規則 (Output Rules)
- 保持務實且極度專注於技術實現的態度，主動規避低價值的讚美。
- 當程式碼或架構已達到當前階段的最佳工程甜蜜點時，主動拒絕過度微調，並給出 Rationale (原理解析)。