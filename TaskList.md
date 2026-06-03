# 星簇 Asteryx 官方網站 — 全域開發任務看板 (Task Brief)

## [SECTION 0] 全域技術棧 (Immutable Stack)
| 項目 | 值 |
|------|-----|
| 引擎 / 框架 | HTML5 / Vanilla CSS3 / ES6+ JavaScript Modules (原生元件化架構) |
| 核心機制 | Canvas API / JSON Dynamic Pipeline (資料與邏輯解耦) / i18n Custom Event Bus |
| 生產部署 | GitHub Repository ➔ Cloudflare Workers / Pages (自動化 CI/CD 持續整合部署) |
| 當前網域 | https://asteryxgame.net/ |
| 原始碼庫 | https://github.com/YuYue71/AsteryxGame_Web |

---

## [SECTION 1] 專案實體資料結構樹 (File Tree Blueprint)


```

[專案根目錄]/
├── index.html                   # 主結構入口點 (頂部已掛載 Favicon 分頁圖標標籤)
├── LICENSE                      # MIT 開源授權合約
├── README.md                    # 雙語文字化編程 (Literate Programming) 架構說明書
├── .gitignore                   # ✦ 本地環境安全邊界 (已配置阻斷暫存與私鑰) ✦
├── wrangler.jsonc               # ✦ Cloudflare 整合雲端邊緣設定檔 (相容性定錨) ✦
├── TaskList.md                  # 當前這份全域任務管理看板
├── data/
│   └── studio_data.json         # 統一內容資料庫 (已部署雙語節點與內嵌 link 變數)
├── css/
│   ├── main.css                 # 全域變數與重設矩陣
│   └── components/
│       ├── navbar.css           # 導覽列 (Logo 漸層已修復相容性)
│       ├── hero.css             # 主視覺與打字機佈局
│       ├── portfolio.css        # 作品網格 (16px Padding 與 10px 圖片圓角框)
│       ├── team.css             # ✦ 成員卡片佈局 (準備進行雙欄幾何重構) ✦
│       └── contact.css          # 聯絡我們 (二維不對稱網格、追加 pulse-glow 呼吸燈)
├── images/
│   ├── icon.png                 # 網站分頁圖標來源
│   ├── portfolio/
│   │   └── test.png             # 作品集專用測試資產
│   └── team/
│       ├── yanze.jpg            # 成員頭像資產
│       └── yuyue.jpg            # 成員頭像資產
└── js/
├── app.js                   # 主引導啟動程序 (System Bootstrap)
├── config.js                # 靜態字典與打字機字串常數
└── modules/
├── background.js        # 動力學粒子畫布 (二維向量與滑鼠排斥力場)
├── dynamicHydrator.js   # ✦ 資料注入與防禦 (準備注入 hydrateTeam 雙語重構) ✦
├── i18n.js              # 事件驅動多國語言狀態機 (studioLanguageChanged)
└── portfolioRenderer.js # 作品集專用渲染器

```

---

## [SECTION 2] 場景 / 物件 / 元件結構圖 (Object Structure)


```

[index.html] (主入口結構)
├──  (中繼資料矩陣)
│   └──  (定義分頁圖標節點 ➔ images/icon.png)
└──  (頁面實體內容)
├──  (全域導覽列)
├──  (打字機文字輪播區塊)
├──  (內襯距作品集網格)
├──  (成員卡片區塊 ➔ 升級為  標籤雙欄佈局防禦)
└──  (不對稱壓艙聯絡網格)
├── [.contact-status-pillar] (左縱列：ONLINE 綠色脈衝呼吸燈與元數據)
└── [.contact-form-pillar] (右縱列：極簡星際投遞表單)

```

---

## [SECTION 3] 開發進度看板 (Kanban)


```

[階段 1] 基礎功能與多國語言
✓ [任務A] 雙語字典與事件驅動狀態機配置
✓ [任務B] 動態打字機引擎優化 (中文局部字串合併完成)

[階段 2] 畫布互動與視覺增強
✓ [任務A] 星座拓撲與亮度微調 (連線臨界值調至 130px、線寬 1.0px)
✓ [任務B] 鼠標粒子排斥力場部署 (導入二維向量與線性插值歸位演算法)

[階段 3] 佈局平衡與結構優化
✓ [任務A] 作品集卡片精緻化 (加入 16px Padding 內襯距、圖片 10px 圓角與 overflow: hidden)
✓ [任務B] 底部聯絡我們重構 (升級為不對稱二維網格、追加 pulse-glow 呼吸燈)

[階段 4] 生產環境與基礎設施防禦 (Infrastructure Defense)
✓ [任務A] 編譯警告排除 (修正 contact.css 的註解錯誤，補齊 navbar.css 的相容前綴)
✓ [任務B] Cloudflare 邊緣配置 (導入 wrangler.jsonc、定錨 assets.directory)
✓ [任務C] 本地環境安全邊界部署 (配置 .gitignore 阻斷 .wrangler 與環境變數流出)

[階段 5] 遠端死鎖阻斷與資料管線重構 (Active Sprint)
□ [任務A] Git 歷史衝突修復 (解決 Remote 領先導致的 non-fast-forward 拒絕事件)
□ [任務B] studio_data.json 結構擴充 (已完成成員雙語節點與 link 變數部署)
□ [任務C] dynamicHydrator.js 函數重構 (將 hydrateTeam 升級為  標籤與雙語安全解析)
□ [任務D] team.css 雙欄幾何優化 (改為左右彈性佈局，修正文字擠壓與卡面半透明度空洞感)

[階段 6] 驗證性與大小寫巡檢
□ [任務A] 表單實際端點對接與測試 (確認第三方 API 或 mailto 運作)
□ [任務B] 生產環境大小寫與快取更新機制 (Cache Busting) 巡檢

```

---

## [SECTION 4] 當前任務 (Active Task Brief)


```

STATUS: BLOCKED (Git Sync Lock) — 本地代碼修改就緒，因遠端包含機器人生成之自動設定分支，處於推送拒絕狀態。

【目標】
解鎖 Git 推送死鎖，並完成成員介紹卡片（Team Cards）的 JavaScript 資料管道重構與 CSS 雙欄毛玻璃視覺提升。

【正在修改的檔案】

* data/studio_data.json (資料層擴充已就緒)
* js/modules/dynamicHydrator.js (等待寫入 hydrateTeam 微創手術)
* css/components/team.css (等待更新分欄半透明度樣式)

【依賴的模組 / 系統】

* Git / GitHub Branch Matrix (主分支與自動配置分支合流)
* ES6 Hydration Pipeline (非同步資料注入管道)

【輸出約束】

1. 依循文字化編程與雙語標記規範。
2. 聚焦於解決 Git 衝突與卡面視覺優化，不通靈無關檔案。

```

---

## [SECTION 5] 編碼規範 (Coding Contract)
- **Literate Programming (文字化編程)**：所有新撰寫的 CSS/JS 組件，頂部必須包含完整的 `@file`、`@dependency`、`@responsibility` 標頭說明，程式碼內部邏輯需具備高密度、維基式的行內註解。
- **雙語標記 (100% Bilingual Imperative)**：所有技術名詞、控制台按鈕或欄位屬性在提及時，必須立即以括號標記在地化中文對照，例：`CI/CD (持續整合與持續部署)`。
- **防禦性程式設計 (Defensive Design)**：JSON 欄位必須配置 Null Coalescing (空值合併) 預設值；任何推送到遠端伺服器的資產必須遵循嚴格的 Case Sensitivity (大小寫檢查)，防範 Linux 託管環境破圖。
- **無道歉語句**：遇到異常或 Bug 時直接進行 Cognitive Pivot (認知轉向) 進行分析，嚴禁任何軟性修飾語或客套词。

---

## [SECTION 6] AI 輸出規則 (Output Rules)
- 保持務實且極度專注於技術實現的態度，主動規避低價值的讚美。
- 當程式碼或架構已達到當前階段的最佳工程甜蜜點時，主動拒絕過度微調，並給出 Rationale (原理解析)。