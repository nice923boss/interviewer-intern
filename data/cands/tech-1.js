var TII = globalThis.TII;

TII.addCandidates('tech-1', [
  // --- Direct, hire: laid off when the news site was outsourced; strong on performance ---
  {
    id: 'tech1_c4',
    name: '莊宗翰',
    sprite: 'm_young_casual',
    archetype: 'direct',
    resume: {
      headline: '前端工程師・4 年經驗',
      education: '國立大學 數學系',
      experience: ['2022/07 至 2026/08　晨報數位　前端工程師', '2021/07 至 2022/06　格點補習班　數學講師'],
      skills: ['React', 'Next.js', 'Web Vitals', 'GraphQL'],
      note: '負責新聞網站文章頁與首頁，日均瀏覽量約 300 萬',
    },
    truth: { professional: 3, teamwork: 2, learning: 3 },
    fit: 'hire',
    profile: '講話直、不太包裝，第一印象偏冷；但效能調校經驗扎實，把廣告很多的文章頁 Core Web Vitals 全部修到及格。數學系出身靠自學轉職，持續讀原始碼、寫遷移指南，學習能力優秀。和設計師溝通偶爾太直接，團隊合作符合。',
    intro: '我是莊宗翰，數學系畢業，自學轉前端，在晨報數位做了四年，負責新聞網站的文章頁跟首頁。公司八月把網站外包出去，前端組整組解散。我比較擅長效能這塊，想找一個要長期經營的產品。',
    motive: {
      whyus: { a: '電商跟新聞站一樣，慢一秒就掉人，但電商掉的是訂單，數字更直接。我想做效能會直接反映在營收上的產品。', ev: 1 },
      leave: {
        a: '不是我想走。集團決定把網站交給母公司的代理商維護，前端組六個人全部資遣，我是其中一個。', ev: 1,
        p: { more: { a: '資遣費有照規定給，所以我不急。這兩個月我在挑公司，不想再進一個隨時會被外包掉的部門。', ev: 1 } },
      },
      salary: { a: '之前月薪 6 萬 2，希望 6 萬 8 以上。', ev: 0 },
      gap: { a: '八月底離職到現在兩個月，我把之前想做的效能監控小工具寫完放上 GitHub，其他時間在面試。', ev: 1 },
    },
    stories: {
      professional: {
        a: '文章頁的效能吧。廣告版位很多，Core Web Vitals 一直不及格，我花了一季把它修好。', ev: 1, vague: true,
        hint: '「修好」沒有說到程度。追問結果，看看有沒有具體數字。',
        p: {
          result: { a: 'CLS 從 0.38 降到 0.04，LCP 從 4.1 秒到 1.8 秒。那季從搜尋引擎進來的流量多了一成二，廣告業務還跑來問我們做了什麼。', ev: 2, reveal: 'perf', react: '數字自己會說話。' },
          role: { a: '問題是我抓的，方案也是我提的：廣告版位先預留高度、圖片改 AVIF、第三方腳本延後載入。跟廣告業務談版位那段是主管出面。', ev: 2 },
        },
      },
      teamwork: {
        a: '我講話比較直，設計稿有問題我會直接講。大部分時候合作沒問題。', ev: 0, vague: true,
        hint: '「大部分時候」代表有例外。請他多說一點具體的事件。',
        p: {
          more: { a: '有次我在群組直接回設計師「這個動畫在手機上會很卡，沒必要」，她當下很不爽。後來我錄了低階手機的實測影片給她看，才談出折衷版。', ev: 0 },
          reflect: { a: '現在我會先附數據再講結論，不然對方只會聽到我在否定他。', ev: 1 },
        },
      },
      learning: {
        a: '我不是本科，前端全部是自學。現在每週還是會讀一點 React 原始碼，做筆記。', ev: 1, vague: true,
        hint: '「讀原始碼」可能只是習慣說法。追問結果，看看學了之後做出什麼。',
        p: {
          result: { a: 'React 18 出來時，組裡只有我把並行渲染的原理整理成內部分享。後來升級 Next.js App Router 也是我寫遷移指南，三週全站換完。', ev: 2, reveal: 'selftaught', react: '只是習慣而已。' },
          reflect: { a: '早期我太愛自己摸，有些坑問資深同事五分鐘就解決，我卻卡了兩天。', ev: 1 },
        },
      },
    },
    answers: {
      tech1_t1: { a: '先分清楚是哪一種慢：看 Web Vitals 是 LCP、INP 還是 CLS 出問題，再用 Performance 面板找原因，不要一開始就亂改。', ev: 2,
        p: { more: { a: 'LCP 慢常見是首圖沒預載或伺服器回應慢；INP 差通常是主執行緒被第三方腳本塞爆。原因不同，修法就不同。', ev: 2 } } },
      tech1_t2: { a: '伺服器資料用 SWR 或 React Query，表單用 React Hook Form，真的跨頁共用的才放全域。', ev: 1,
        p: { more: { a: '之前同事把文章列表放進全域 store，切頁回來資料過期又不重抓。改成 SWR 設定重新驗證的時機就好了。', ev: 1 } } },
      tech1_s1: { a: '我會先在實機上做一版給設計師看，哪裡卡、卡多少用影片說話，再一起決定哪些效果先拿掉。', ev: 1,
        p: { reflect: { a: '以前我會直接說做不到，現在知道先拿出替代方案，對方比較聽得進去。', ev: 1 } } },
      tech1_s2: { a: '先讀官方文件的核心概念，再把一個現有頁面用新框架重寫，順便整理一份新舊寫法對照表給組員。', ev: 2 },
    },
    traits: [
      { id: 'perf', name: '效能調校專家', desc: '把廣告滿版的文章頁 CLS 從 0.38 降到 0.04、LCP 從 4.1 秒降到 1.8 秒，搜尋流量增加一成二。', positive: true },
      { id: 'selftaught', name: '自學能力強', desc: '非本科靠自學轉職，至今仍讀原始碼；全站升級 App Router 的遷移指南由他撰寫，三週完成。', positive: true },
    ],
    asks: ['whyopen', 'evaluation'],
  },

  // --- Polished, nohire: pastes AI-generated code without understanding; job hopper ---
  {
    id: 'tech1_c5',
    name: '魏芷瑜',
    sprite: 'f_young_ponytail',
    archetype: 'polished',
    resume: {
      headline: '前端工程師・3 年經驗',
      education: '私立大學 數位多媒體設計系',
      experience: ['2025/09 至今　弦樂購物　前端工程師', '2024/10 至 2025/08　采匯行銷　網頁工程師', '2023/09 至 2024/09　點石數位　前端工程師'],
      skills: ['React', 'Vue', 'TypeScript', 'AI 輔助開發'],
      note: '自述：善用 AI 工具，開發效率是同事的兩倍',
    },
    truth: { professional: 1, teamwork: 2, learning: 1 },
    fit: 'nohire',
    profile: '表達流暢、很會講新工具，但程式大多由 AI 產生後直接貼上，追問基本原理就答不出來，專業不足；遇到問題只會換提示詞重試，不回頭補基礎，學習深度不足。三年換三家，每次都在要維護舊程式碼時離開。與同事相處尚可。',
    intro: '您好，我是魏芷瑜，有三年前端經驗，目前在弦樂購物。我很重視開發效率，平常大量使用 AI 工具輔助，產出大約是同事的兩倍。希望能在貴公司把這套工作方法推廣給團隊。',
    motive: {
      whyus: { a: '雲杉的技術品牌經營得很好，我看過你們的技術分享，覺得團隊很願意嘗試新工具，跟我的工作方式很合。', ev: 0 },
      leave: {
        a: '弦樂最近比較少新專案，大多是維護，我希望待在持續有新挑戰的環境。', ev: 0, vague: true,
        hint: '她三年換了三家，前兩次也是同樣理由嗎？請她多說一點前幾份工作怎麼結束的。',
        p: { more: { a: '前兩家……其實也差不多。新專案做完、開始要改別人的舊程式碼，我就覺得沒什麼成長，大概一年左右就會想換。', ev: -1, reveal: 'hop', react: '每家都待一年多啦。' } },
      },
      salary: { a: '我目前月薪 5 萬 5，因為產出效率比較高，希望能到 6 萬 8。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我在弦樂一個人用兩週做完會員中心改版，一般要一個月。關鍵是我把 AI 工具整合進流程，元件、測試都能快速產出。', ev: 2, vague: true,
        hint: '兩週完成、效率翻倍很亮眼。追問她個人具體寫了什麼，確認她懂不懂那些程式碼。',
        p: {
          role: { a: '我負責下指令給 AI，再把產出的程式碼貼進專案調樣式……狀態管理那段用了 useReducer，老實說我不太確定它的流程。', ev: -2, reveal: 'aicopy', react: '能動就好了嘛……' },
          result: { a: '上線第一週有三個 bug，會員資料偶爾會被舊資料蓋掉，後來是資深同事幫忙找到原因。', ev: -1 },
        },
      },
      teamwork: {
        a: '我跟同事相處很融洽，還會主動分享好用的 AI 工具和提示詞，大家都說很實用。', ev: 1,
        p: { more: { a: '我整理過一份提示詞範本放在共用文件，有五六個同事在用。不過 code review 時，資深同事常退我的 PR，說看不懂我的寫法。', ev: 0 } },
      },
      learning: {
        a: '我學新東西很快，有 AI 在，一個新框架大概三天就能寫出畫面。', ev: 1, vague: true,
        hint: '「三天寫出畫面」不代表學會。追問結果，看看她能不能說明自己寫的東西。',
        p: {
          result: { a: '畫面是做得出來……但如果 AI 給的寫法有錯，我通常要換很多次提示詞，因為底層原理我比較少去看。', ev: -2 },
          reflect: { a: '可能要花點時間把 JavaScript 的基礎補起來吧，像非同步那些。', ev: 0 },
        },
      },
    },
    answers: {
      tech1_t1: { a: '我會把程式碼丟給 AI 分析，它會列出可以優化的地方，像圖片壓縮、程式碼分割這些。', ev: -1,
        p: { more: { a: 'DevTools 的 Performance 面板我打開過，但那些圖表我不太會看。', ev: -1 } } },
      tech1_t2: { a: '我會用 Redux Toolkit 或 Zustand，看專案習慣，這些 AI 都很熟。', ev: 0,
        p: { more: { a: '遇過畫面一直重複渲染，我請 AI 加 useMemo 就好了。但為什麼要加，我其實不太確定。', ev: -1 } } },
      tech1_s1: { a: '我會先跟設計師確認重點，再用 AI 快速做兩三個版本給他選，三天應該來得及。', ev: 1 },
      tech1_s2: { a: '我會直接請 AI 生範例，邊做邊學，兩週綽綽有餘。', ev: 0,
        p: { reflect: { a: '嗯……官方文件我通常不太看，覺得太長了。', ev: -1 } } },
    },
    traits: [
      { id: 'aicopy', name: '依賴 AI 不求甚解', desc: '號稱兩週完成的改版，程式多由 AI 產生後直接貼上，連自己專案的狀態管理流程都說不清楚。', positive: false },
      { id: 'hop', name: '頻繁跳槽', desc: '三年換三家，每次都在新專案結束、開始要維護舊程式碼時離開。', positive: false },
    ],
    asks: ['training', 'flexible'],
  },

  // --- Nervous, maybe: agency developer, accessibility expert, but yields to pushy PMs ---
  {
    id: 'tech1_c6',
    name: '鄧佳穎',
    sprite: 'f_young_glasses',
    archetype: 'nervous',
    resume: {
      headline: '網頁前端工程師・2 年經驗',
      education: '國立大學 外國語文學系',
      experience: ['2024/07 至今　拾光網頁設計　前端工程師'],
      skills: ['Vue', 'JavaScript', 'SCSS', 'WCAG 無障礙'],
      note: '負責多個企業官網，含一家銀行官網的無障礙改版',
    },
    truth: { professional: 2, teamwork: 2, learning: 3 },
    fit: 'maybe',
    profile: '外文系轉職，非常緊張，一開始回答都很短；追問後才知道她獨力把三百多頁的銀行官網修到通過無障礙 AA 檢測。主力是 Vue 與切版，React 只在下班練習專案用過，大型專案狀態管理還不熟，專業符合；自學紮實，學習能力優秀。遇到強勢 PM 不敢表達異議，團隊合作符合。',
    intro: '您、您好，我是鄧佳穎，外文系畢業，在拾光網頁設計做前端兩年，主要做企業官網。公司主要用 Vue，React 是我下班自己學的……希望有機會做比較大型的產品。',
    motive: {
      whyus: { a: '我想做使用者很多、會一直改善的產品，而不是做完就交給客戶的官網。然後……我想用 React 做正式的專案。', ev: 1 },
      leave: { a: '公司接案為主，每個案子一兩個月就結束，我、我比較想要可以長期改善同一個產品的工作。', ev: 1 },
      salary: { a: '我現在 4 萬 2……希望可以 4 萬 8 左右。', ev: 0 },
    },
    stories: {
      professional: {
        a: '呃……我有做過一個銀行官網的改版，主要是調整一些按鈕跟表單。', ev: 0, vague: true,
        hint: '講得很保守，「調整按鈕跟表單」背後可能有更多。追問結果看看。',
        p: {
          result: { a: '那個案子要通過無障礙 AA 檢測，我把三百多個頁面的標籤、對比、鍵盤操作都修過，第一次送檢就過了。客戶後來把另外兩個網站也指定給我們。', ev: 2, reveal: 'a11y', react: '這、這個也算嗎？' },
          role: { a: '前端只有我一個，資深同事負責後端。螢幕閱讀器的測試也是我自己一頁一頁跑的。', ev: 1 },
        },
      },
      teamwork: {
        a: '我、我會跟設計師和 PM 討論，有問題就問。', ev: 0, vague: true,
        hint: '回答很短，可能只是緊張。追問她個人在合作裡具體做了什麼。',
        p: {
          role: { a: '設計師用很淺的灰字，對比度不夠，我做了對照圖給她看，她就改了。可是 PM 要我把客戶要的跑馬燈加回去，我知道會影響檢測，還、還是照做了，結果送檢被退一次。', ev: -1, reveal: 'yield', react: '我、我不太敢講……' },
          reflect: { a: '我應該把檢測標準拿給 PM 看，而不是自己吞下去。', ev: 1 },
        },
      },
      learning: {
        a: '我是外文系，程式是從線上課程開始學的，現在下班還是會自己練習。', ev: 1, vague: true,
        hint: '「自己練習」練了什麼？追問結果，看看她的學習成果。',
        p: { result: { a: '我用 React 跟 TypeScript 做了一個記帳的練習專案，有寫測試，還自己加了教學裡沒有的離線模式，大概花了三個月的下班時間。', ev: 2 } },
      },
    },
    answers: {
      tech1_t1: { a: '我、我會先用 Lighthouse 跑看看，然後看 Network 有沒有很大的圖片或檔案。', ev: 1,
        p: { result: { a: '之前一個官網首頁的輪播圖每張都 2MB，我改成 WebP 加 lazy loading，Lighthouse 分數從 45 到 82。', ev: 1 } } },
      tech1_t2: { a: '在公司是用 Vue 的 Pinia……React 的話，我練習專案用 useState 跟 Context。', ev: 0,
        p: { more: { a: 'Context 放太多東西時整個畫面會一直重新渲染，我、我查了文件才知道要拆開。大型專案的經驗是比較少。', ev: 0 } } },
      tech1_s1: { a: '我會先做一個簡化版，拿手機給設計師看，問哪些效果一定要保留。', ev: 1 },
      tech1_s2: { a: '我會先把官方教學從頭做完，再做一個小專案，每天記錄卡住的地方……我之前學 React 也是這樣。', ev: 1,
        p: { result: { a: '學 React 的時候，大概三週就能自己寫完整的頁面，記帳專案後來還補上了測試。', ev: 1 } } },
    },
    traits: [
      { id: 'a11y', name: '無障礙專長', desc: '獨力把三百多頁的銀行官網修到第一次送檢就通過無障礙 AA 檢測，客戶因此追加兩個網站。', positive: true },
      { id: 'yield', name: '不敢表達異議', desc: '明知需求會讓檢測不通過，面對強勢 PM 仍選擇照做，事後才補救。', positive: false },
    ],
    asks: ['training', 'team'],
  },

  // --- Humble, hire: former QA engineer; built the test suite and launch drills ---
  {
    id: 'tech1_c7',
    name: '何冠宏',
    sprite: 'm_young_vest',
    archetype: 'humble',
    resume: {
      headline: '前端工程師・4 年經驗（測試工程師轉任）',
      education: '私立科技大學 資訊管理系',
      experience: ['2024/08 至今　票翼售票網　前端工程師', '2022/07 至 2024/07　票翼售票網　軟體測試工程師'],
      skills: ['React', 'Playwright', 'JavaScript', 'Zustand'],
      note: '參與選位頁面開發與測試流程',
    },
    truth: { professional: 2, teamwork: 3, learning: 3 },
    fit: 'hire',
    profile: '話少、習慣把功勞講成大家的；追問才知道開賣前的跨部門演練是他發起，自動化測試也是他從零建起來。測試出身讓他寫程式很重視邊界情況，React 進階技巧還在累積，專業符合；團隊合作與學習能力優秀。',
    intro: '您好，我是何冠宏，在票翼售票網四年，前兩年做測試，後兩年轉前端，主要負責選位跟結帳頁面。我覺得自己還有很多要學，希望能到更成熟的前端團隊。',
    motive: {
      whyus: { a: '雲杉的前端團隊比較大，有專門做元件跟效能的人，我想跟有經驗的人學。也想把測試的經驗用在電商上。', ev: 1 },
      leave: { a: '票翼今年把重心放到海外市場，台灣這邊的前端只剩維護，我想找還在持續開發的產品。', ev: 1 },
      salary: { a: '我現在 5 萬 4，希望 6 萬左右，可以再談。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我負責選位頁面，就是讓大家可以在座位圖上選位子，然後送到結帳。', ev: 0, vague: true,
        hint: '描述很平淡。追問結果，看看這個頁面的規模和成效。',
        p: {
          result: { a: '熱門場次開賣時大概有八萬人同時在選位，以前常有兩個人選到同一個位子。我在前端加了鎖位狀態的即時更新，重複選位的客訴從一場幾十件降到個位數。', ev: 2 },
          role: { a: '鎖位 API 是後端同事寫的，我負責座位圖的渲染跟狀態同步。座位圖一開始用 DOM 畫很卡，我改成 Canvas。', ev: 1 },
        },
      },
      teamwork: {
        a: '我們開賣前會一起準備，大家分工合作，算是滿順的。', ev: 0, vague: true,
        hint: '「一起準備」是誰發起的？追問他個人在裡面做了什麼。',
        p: {
          role: { a: '以前每次開賣都出包，我就提議開賣前一週做一次演練，拉前端、後端、客服一起跑完整流程，問題清單也是我整理追蹤的。', ev: 2, reveal: 'drill', react: '就……覺得應該做。' },
          result: { a: '開始演練之後，連續六場大型開賣都沒有當機，客服說那半年是他們最輕鬆的時候。', ev: 2 },
        },
      },
      learning: {
        a: '從測試轉前端的時候，我利用下班時間學 React，大概半年才轉成功。', ev: 1, vague: true,
        hint: '「轉成功」之前做了哪些準備？追問結果，看看他累積了什麼。',
        p: {
          result: { a: '轉過去之前，我已經把整套 Playwright 自動化測試建起來，三百多個案例，每次上線前自動跑。轉任之後我還是那套的主要維護人。', ev: 2, reveal: 'crossqa', react: '那是之前的工作啦。' },
          role: { a: '我先幫前端同事寫測試，順便讀他們的程式碼，看不懂就記下來問。後來主管讓我先接小功能，慢慢才接整個頁面。', ev: 1 },
        },
      },
    },
    answers: {
      tech1_t1: { a: '我會先開 DevTools，Network 看請求，Performance 看是不是 JavaScript 跑太久，確定瓶頸再動手。', ev: 1,
        p: { more: { a: '選位頁之前就是 DOM 節點太多，一萬多個座位每個都是 div。改成 Canvas 之後，低階手機也能順順地滑。', ev: 2 } } },
      tech1_t2: { a: '一般的用 useState，座位這種高頻更新的狀態放 Zustand，避免整頁重新渲染。', ev: 1,
        p: { more: { a: '遇過 WebSocket 推來的座位更新跟使用者點擊同時發生，狀態就亂掉。我在測試裡模擬這種情況才找到順序問題。不過 Server Components 這類新東西我還在摸。', ev: 1 } } },
      tech1_s1: { a: '我會先在幾台常見的手機上試做，把卡頓的部分錄下來，再跟設計師一起決定哪些先簡化。', ev: 1,
        p: { more: { a: '我也會先把那幾個關鍵畫面的自動化測試寫好，簡化之後才不會不小心弄壞別的地方。', ev: 1 } } },
      tech1_s2: { a: '我會先看官方文件跟範例，再用新框架重寫一個小功能，寫測試確認行為跟原本一樣。', ev: 1 },
    },
    traits: [
      { id: 'drill', name: '主動補位', desc: '主動發起開賣前的跨部門演練並追蹤問題清單，連續六場大型開賣零當機。', positive: true },
      { id: 'crossqa', name: '跨域經驗', desc: '測試工程師出身，從零建立三百多個案例的自動化測試，寫程式特別重視邊界情況。', positive: true },
    ],
    asks: ['training', 'evaluation'],
  },

  // --- Direct, maybe: solo frontend at a closed startup; keeps a competing side gig ---
  {
    id: 'tech1_c8',
    name: '杜筠庭',
    sprite: 'f_young_short',
    archetype: 'direct',
    resume: {
      headline: '前端工程師・3 年經驗',
      education: '國立大學 資訊工程學系',
      experience: ['2023/07 至 2026/06　鮮盒新創　前端工程師（公司已結束營業）'],
      skills: ['React', 'Next.js', 'Shopify Liquid', 'Node.js'],
      note: '一人負責官網與訂閱系統前端',
    },
    truth: { professional: 3, teamwork: 2, learning: 2 },
    fit: 'maybe',
    profile: '技術扎實、講話直接，在新創一人包辦前端，訂閱流程與金流串接都做過，專業優秀。但空窗期接的網店版型案仍在持續，客戶都是電商店家，跟本公司業務有衝突，她也明說想繼續接。多人團隊的協作流程經驗少，團隊合作與學習符合，需先談清楚兼職規範。',
    intro: '我是杜筠庭，資工系畢業，在鮮盒新創做了三年前端，整個前端只有我一個。公司今年六月結束營業，我就出來找工作。我習慣自己把事情從頭做到尾。',
    motive: {
      whyus: { a: '鮮盒收掉之後，我想找一間已經站穩的公司。雲杉的電商平台規模夠大，前端也有分工，不用什麼都自己來。', ev: 1 },
      leave: {
        a: '公司募不到下一輪，六月就收了，全公司十二個人都資遣。', ev: 0,
        p: { more: { a: '最後三個月就知道撐不下去了，我還是把訂閱系統的交接文件寫完，讓客服可以處理退款。', ev: 1 } },
      },
      salary: { a: '之前 5 萬 8，希望 6 萬 5。', ev: 0 },
      gap: {
        a: '六月到現在，我一邊找工作一邊接案，主要做 Shopify 的商店版型。', ev: 0, vague: true,
        hint: '接案的內容和規模是什麼？會不會跟本公司業務衝突？追問結果看看。',
        p: { result: { a: '四個月接了五個案子，都是賣服飾跟保養品的網店，收入跟上班差不多。老實說進公司後我也想繼續接，週末做就好。', ev: -1, reveal: 'sidegig', react: '這是我的私人時間。' } },
      },
    },
    stories: {
      professional: {
        a: '鮮盒的訂閱系統前端是我一個人做的，包含方案選擇、定期扣款、暫停跟取消訂閱。', ev: 2,
        p: {
          role: { a: '設計是外包的，後端是技術長寫的，前端從架構、元件到部署都是我。金流串接也是我跟金流商的工程師對的。', ev: 2, reveal: 'solo', react: '小公司都這樣啦。' },
          result: { a: '訂閱用戶從四百成長到三千多。取消流程我加了「暫停一個月」的選項，大概兩成想取消的人改選暫停。', ev: 2 },
        },
      },
      teamwork: {
        a: '我比較習慣自己來，小公司沒什麼人可以分工。', ev: 0, vague: true,
        hint: '一人團隊的經驗，要確認她在多人團隊怎麼合作。請她多說一點。',
        p: {
          more: { a: '跟技術長意見不合時我會直接講，像他想自己刻表單驗證，我拿套件比較表說服他。不過大團隊的 code review 跟分支流程，我比較少經驗。', ev: 1 },
          reflect: { a: '我知道進大團隊要調整，不能什麼都自己決定，要先看團隊的規範。', ev: 1 },
        },
      },
      learning: {
        a: '新東西我會直接拿來用在專案上，邊做邊查，不太看長篇教學。', ev: 1,
        p: { result: { a: '去年把官網從 CRA 換到 Next.js，大概兩週。不過有些地方是先求能動，快取設定其實沒有完全弄懂。', ev: 0 } },
      },
    },
    answers: {
      tech1_t1: { a: '先看首屏資源是不是太大，再看 API 有沒有串成一條瀑布。我會開 Network 看時間軸，再用 Lighthouse 對照。', ev: 1,
        p: { result: { a: '訂閱頁原本要等三支 API 依序回來，我改成平行請求加骨架畫面，首屏從 3 秒多降到 1.2 秒。', ev: 2 } } },
      tech1_t2: { a: '伺服器資料用 SWR，購物車這種要跨頁的就放 Context 加 useReducer，規模不大不需要 Redux。', ev: 1 },
      tech1_s1: { a: '我會直接改成手機上做得到的版本，做好再給設計師看，三天沒時間來回討論。', ev: 0,
        p: { reflect: { a: '在新創沒問題，但大團隊應該先知會設計師，不然對方會覺得被跳過。', ev: 1 } } },
      tech1_s2: { a: '直接開一個小功能用新框架做，卡住再查文件。兩週夠了。', ev: 1 },
    },
    traits: [
      { id: 'solo', name: '一人撐起前端', desc: '新創公司前端只有她一人，從架構、元件、部署到金流串接全部獨力完成。', positive: true },
      { id: 'sidegig', name: '副業衝突', desc: '持續接電商網店的版型案件，客群與本公司業務重疊，且表明到職後仍想繼續接。', positive: false },
    ],
    asks: ['flexible', 'overtime'],
  },

  // --- Polished, maybe: long skill list but stuck on AngularJS; banks trust him ---
  {
    id: 'tech1_c9',
    name: '劉世豪',
    sprite: 'm_young_blazer',
    archetype: 'polished',
    resume: {
      headline: '前端工程師・5 年經驗',
      education: '私立大學 資訊工程學系',
      experience: ['2021/07 至今　鼎岳系統整合　前端工程師'],
      skills: ['React', 'Vue', 'Angular', 'jQuery', 'TypeScript'],
      note: '自述：精通各大前端框架，服務過多家金融業客戶',
    },
    truth: { professional: 1, teamwork: 3, learning: 2 },
    fit: 'maybe',
    profile: '五年經驗、技能清單很長、講話得體；但追問發現主力是 AngularJS 與 jQuery 的舊系統維護，React 只做過線上課程範例，現代前端的效能分析與狀態管理都不熟，專業不足。長年駐點銀行，跟客戶與跨部門溝通的口碑很好，團隊合作優秀；學習意願有但需要從頭補，學習符合。',
    intro: '您好，我是劉世豪，有五年前端經驗，在鼎岳系統整合服務過多家銀行客戶，React、Vue、Angular 都有接觸。我很擅長跟客戶和跨部門溝通，希望到產品公司發揮。',
    motive: {
      whyus: { a: '一直做專案，很少看到自己做的東西被長期使用。雲杉是自有產品，我很嚮往這種可以持續優化的環境。', ev: 1 },
      leave: { a: '系統整合的工作大多是維護客戶的舊系統，我希望能用比較新的技術，跟上業界。', ev: 1 },
      salary: { a: '我目前月薪 5 萬 6，希望能有 6 萬 5。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我在銀行專案負責網銀前端，React、Angular 都用過，最近也在做新舊系統的整合，經驗算是滿完整的。', ev: 2, vague: true,
        hint: '技能清單很長，但「都用過」用到什麼程度？追問他個人實際寫了什麼。',
        p: {
          role: { a: '主要是維護網銀的 AngularJS 頁面，還有一些 jQuery 寫的表單。React 是……我自己上線上課程做過範例，正式專案還沒有用過。', ev: -2, reveal: 'outdated', react: '這要看怎麼定義……' },
          result: { a: '客戶那邊很穩定，五年來我負責的頁面沒出過重大事故。', ev: 1 },
        },
      },
      teamwork: {
        a: '我跟客戶、PM、後端都合作得很好，駐點銀行時，客戶還指定要我繼續支援。', ev: 2, vague: true,
        hint: '「客戶指定」很亮眼，追問具體的結果或回饋，確認是不是真的。',
        p: {
          result: { a: '有一年合約續約，銀行的資訊處長在需求書裡寫明要我留在專案上。他們說我是少數會把技術問題講成業務聽得懂的話的人。', ev: 2, reveal: 'trust', react: '客戶比較信任我啦。' },
          more: { a: '像銀行因為法規要調表單，我會先整理影響清單，跟業務、後端一起開會對完，比較不會漏。', ev: 1 },
        },
      },
      learning: {
        a: '我平常會看技術文章，知道業界在流行什麼，像 Server Components、Signals 這些都有研究。', ev: 1, vague: true,
        hint: '「有研究」和「會用」不一樣。追問結果，看看他實際做出什麼。',
        p: {
          result: { a: '老實說大多是看文章跟影片，自己動手做的只有一個 React 的待辦清單範例。駐點工作很滿，下班比較難再寫程式。', ev: -1 },
          reflect: { a: '我應該訂一個目標，例如三個月用 React 做一個完整的小專案，而不是一直看文章。', ev: 1 },
        },
      },
    },
    answers: {
      tech1_t1: { a: '我會先看是不是伺服器回應慢，再看前端的 JavaScript 跟圖片檔案大小。', ev: 0,
        p: { more: { a: '我們網銀慢多半是後端查詢的問題。前端這邊……Lighthouse 跟 Web Vitals 我知道名詞，但沒有實際用來分析過。', ev: -1 } } },
      tech1_t2: { a: '狀態管理的話，React 有 Redux，Angular 有 Service，看框架選擇適合的方式。', ev: 1, vague: true,
        hint: '回答像在背名詞。請他多說一點實際遇過的問題。',
        p: { more: { a: '實際專案裡……AngularJS 我們是用 scope 跟 Service 傳資料。Redux 我只在課程裡看過，沒遇過什麼真實的問題。', ev: -2 } } },
      tech1_s1: { a: '我會先跟設計師和 PM 開個短會，說明手機上的限制，提出兩個替代方案讓大家選，再確認由誰跟需求方說明。', ev: 2 },
      tech1_s2: { a: '我會先上一門完整的線上課程打基礎，再請資深同事推薦範例專案，兩週內應該可以開始接小需求。', ev: 1 },
    },
    traits: [
      { id: 'outdated', name: '技能過時', desc: '五年主要在維護 AngularJS 與 jQuery 舊系統，履歷上的 React 只做過課程範例。', positive: false },
      { id: 'trust', name: '客戶口碑', desc: '駐點銀行期間，客戶在續約需求書裡指名要他留任，擅長把技術問題翻譯成業務語言。', positive: true },
    ],
    asks: ['training', 'growth'],
  },

  // --- Humble, nohire: only swapped CMS content for 3 years; blames others for a pricing error ---
  {
    id: 'tech1_c10',
    name: '邱郁婷',
    sprite: 'f_young_bun',
    archetype: 'humble',
    resume: {
      headline: '前端工程師・3 年經驗',
      education: '私立大學 資訊傳播學系',
      experience: ['2023/08 至今　禾泰百貨集團資訊處　前端工程師'],
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      note: '負責集團購物網站的活動頁面',
    },
    truth: { professional: 1, teamwork: 1, learning: 2 },
    fit: 'nohire',
    profile: '態度客氣低調，看似謙虛；但三年主要是在既有 CMS 模板裡換圖文，幾乎沒寫過元件或串接 API，經驗名不符實。活動頁標錯價格的事故，她把責任全推給行銷與測試，沒有反省自己跳過確認的環節，團隊合作不足。有在上線上課程，學習意願尚可。',
    intro: '您好，我是邱郁婷，在禾泰百貨集團的資訊處做了三年前端，負責購物網站的活動頁面。我個性比較安靜，但交代的事情都會做完。',
    motive: {
      whyus: { a: '我想在專業的科技公司學習，資訊處畢竟不是公司的主業，技術資源比較少。', ev: 0 },
      leave: {
        a: '嗯……資訊處最近人事有一些調整，我覺得可以換個環境。', ev: 0, vague: true,
        hint: '「人事調整」很含糊，請她多說一點當時的情況。',
        p: { more: { a: '今年有一次活動頁價格標錯，主管覺得我要負責，考績被打得不太好……但那個價格是行銷給的，我只是照著放上去。', ev: -1 } },
      },
      salary: { a: '我現在是 4 萬 6，希望可以到 5 萬 2。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我負責集團購物網站的活動頁，週年慶的時候一週要上十幾個頁面，量滿大的。', ev: 1, vague: true,
        hint: '一週十幾頁聽起來很多，但頁面是怎麼做出來的？追問她個人具體做了什麼。',
        p: {
          role: { a: '我們有一套 CMS 模板，我把行銷給的圖片跟文字換上去、調一下間距……元件跟 API 都是外包廠商寫好的，我比較少改程式。', ev: -2, reveal: 'thin', react: '模板也要調的……' },
          result: { a: '頁面都有準時上線，行銷那邊沒有抱怨。', ev: 0 },
        },
      },
      teamwork: {
        a: '我跟大家都還算好相處，不太會跟人起衝突。', ev: 0, vague: true,
        hint: '這是態度描述，沒有實例。追問結果，聽聽她遇過的合作問題最後怎麼收場。',
        p: {
          result: { a: '有一次頁面價格標錯，被客人截圖貼到網路上，最後公司照標價出貨，賠了二十幾萬。可是那是行銷給錯、測試也沒抓到，不是我的問題。', ev: -2, reveal: 'blame', react: '我只是照做而已。' },
          reflect: { a: '……如果重來，我可能會請行銷再確認一次吧，雖然那本來是他們的工作。', ev: -1 },
        },
      },
      learning: {
        a: '我有在上 React 的線上課，希望之後可以用在工作上。', ev: 1,
        p: { result: { a: '課程上了大概一半，有做一個天氣查詢的小練習。工作上還沒有機會用。', ev: 0 } },
      },
    },
    answers: {
      tech1_t1: { a: '我會先檢查圖片是不是太大，太大的話就請設計重新輸出。', ev: 0,
        p: { more: { a: '其他的話……JavaScript 的部分是廠商負責的，我比較不清楚。', ev: -1 } } },
      tech1_t2: { a: '狀態管理……我們的頁面大多是靜態的，比較少用到。課程裡有教 useState。', ev: -1 },
      tech1_s1: { a: '我會照設計稿盡量做，做不到的地方再請設計師決定。', ev: 0,
        p: { reflect: { a: '嗯……如果來不及，可能就先上線，之後再跟設計說哪裡沒做到。', ev: -1 } } },
      tech1_s2: { a: '我會先去上線上課程，然後請同事教我。', ev: 0 },
    },
    traits: [
      { id: 'thin', name: '經驗名不符實', desc: '三年前端職稱，實際工作是在 CMS 模板裡替換圖文，元件與 API 都由外包廠商負責。', positive: false },
      { id: 'blame', name: '推卸責任', desc: '活動頁標錯價格造成二十幾萬損失，她認為全是行銷與測試的錯，沒有反省自己跳過確認。', positive: false },
    ],
    asks: ['training'],
  },
]);
