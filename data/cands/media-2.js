var TII = globalThis.TII;

TII.addCandidates('media-2', [
  // --- Polished, nohire: inflated ROAS via attribution, swapped conversion metric in reports ---
  {
    id: 'media2_c1',
    name: '魏冠霖',
    sprite: 'm_young_stripe',
    archetype: 'polished',
    resume: {
      headline: '數位廣告投放・3 年經驗',
      education: '私立大學 企業管理學系',
      experience: ['2023/08 至今　橘光數位　廣告投放專員'],
      skills: ['Meta 廣告', 'Google Ads', 'GA4', 'Looker Studio'],
      note: '自述：操作美妝客戶，ROAS 達 8',
    },
    truth: { professional: 2, problem: 2, integrity: 1 },
    fit: 'nohire',
    profile: '說得頭頭是道，基本投放操作沒問題；但 ROAS 8 是 7 天點擊加 1 天瀏覽、含品牌字的後台數字，GA4 只有約 2.5；還曾把轉換指標換成加入購物車交差，誠信有重大疑慮。',
    intro: '您好，我是魏冠霖，在橘光數位做廣告投放三年，主要負責美妝和保健客戶。我最自豪的是把一個美妝品牌的 ROAS 做到 8，客戶續約了兩年。',
    motive: {
      whyus: { a: '浪潮的電商客戶規模比較大，我想挑戰更高的預算。', ev: 0 },
      leave: { a: '橘光的客戶以中小品牌為主，月預算多半不到 30 萬，能發揮的空間有限。', ev: 0 },
      salary: { a: '目前 5 萬 2，希望 6 萬 2。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我操作的美妝品牌 ROAS 做到 8，是公司當年最高的帳戶，客戶也續約兩年。', ev: 2, vague: true,
        hint: 'ROAS 8 很亮眼，但歸因方式和計算口徑都沒說。',
        p: {
          result: { a: '那是 Meta 後台的數字，用 7 天點擊加 1 天瀏覽，也有算到品牌關鍵字。如果看 GA4 最終點擊，大概 2.5 左右。', ev: -1, reveal: 'inflate', react: '大家報表都這樣看啊。' },
          role: { a: '帳戶結構和素材測試是我排的，預算調整要經過主管。', ev: 0 },
        },
      },
      problem: {
        a: '有次客戶網站改版後像素壞掉，轉換數歸零。我花一個下午跟工程師一起查，重新埋好事件。', ev: 1,
        p: { result: { a: '中間有三天數據是斷的，那幾天我先把預算降一半，避免演算法亂學。', ev: 1 } },
      },
      integrity: {
        a: '我覺得報告就是要讓客戶看懂，所以我會挑對他們最有意義的指標呈現。', ev: 0, vague: true,
        p: {
          more: { a: '（停頓）有一季購買數真的很差，主管要我把轉換欄位改成加入購物車，報告看起來就有達標。我照做了，客戶到現在都不知道。', ev: -2, need: 50, reveal: 'fakereport', react: '那是主管要求的……' },
          reflect: { a: '回頭看，至少應該在備註寫清楚指標換了。', ev: 0 },
        },
      },
    },
    answers: {
      media2_t1: { a: '我會先看素材疲勞度，頻率超過 3 就換素材；再看 CPM 有沒有上升，最後檢查到達頁和結帳流程。', ev: 1,
        p: { more: { a: '也會看歸因設定，有時候是追蹤掉了，不是真的變差。', ev: 1 } } },
      media2_t2: { a: 'Google 放三成做搜尋和購物廣告接住需求，Meta 七成做開發和再行銷。前兩週測素材，之後把錢集中在贏的組合。', ev: 1 },
      media2_s1: { a: '先看拒登原因，改掉違規字眼重新送審，同時準備備用素材，帳號警告的部分走申訴。', ev: 1 },
      media2_s2: { a: '我會跟客戶解釋這個月市場比較差，再強調表現好的指標，像點擊率或觸及。', ev: -1, vague: true,
        p: { reflect: { a: '嗯……如果客戶事後發現，可能會更不信任我們。', ev: 0 } } },
    },
    traits: [
      { id: 'inflate', name: '數據美化', desc: 'ROAS 8 是 7 天點擊加 1 天瀏覽並含品牌字的後台數字，GA4 實際約 2.5。', positive: false },
      { id: 'fakereport', name: '竄改報表', desc: '曾依主管要求把轉換指標換成加入購物車，讓報表看似達標，客戶至今不知情。', positive: false },
    ],
    asks: ['evaluation', 'growth'],
  },

  // --- Humble, hire: statistician who quietly cut CPA by 40% with a remarketing funnel ---
  {
    id: 'media2_c2',
    name: '盧佩君',
    sprite: 'f_mid_short',
    archetype: 'humble',
    resume: {
      headline: '數位廣告・6 年經驗',
      education: '國立大學 統計學系',
      experience: ['2020/04 至今　遠行旅遊網　數位廣告專員'],
      skills: ['Meta 廣告', 'Google Ads', 'GA4', 'SQL 基礎'],
      note: '負責旅遊產品廣告投放',
    },
    truth: { professional: 3, problem: 3, integrity: 2 },
    fit: 'hire',
    profile: '話不多、自評保守，但統計底子扎實，三層再行銷漏斗把 CPA 從 820 降到 480，淡季依地區拆預算；問題拆解有條理。報告誠實，但較少主動挑戰主管。',
    intro: '您好，我是盧佩君，在遠行旅遊網做廣告投放六年，主要負責機加酒和國內旅遊產品。統計系畢業，比較習慣看數字做決定。',
    motive: {
      whyus: { a: '旅遊網只有一個品牌，我想接觸不同產業的電商，看看不同商品的投放邏輯。', ev: 1 },
      leave: { a: '公司今年把廣告集中到集團統一操作，我的工作變成以執行為主，比較少參與策略。', ev: 0 },
      salary: { a: '目前 5 萬 8，希望 6 萬 3 左右。', ev: 0 },
    },
    stories: {
      professional: {
        a: '主要就是把廣告帳戶整理一下，讓預算花得比較有效率，CPA 有降一些。', ev: 0, vague: true,
        hint: '「降一些」是多少？她做了什麼？可以追問成果。',
        p: {
          result: { a: '我把受眾拆成瀏覽、加入購物車、結帳未完成三層做再行銷，CPA 從 820 降到 480，一年省下大概兩百萬廣告費。', ev: 2, reveal: 'hidden', react: '主要是數據剛好有幫助。' },
          role: { a: '漏斗是我設計的，素材請設計部依每一層做不同訊息。', ev: 1 },
        },
      },
      problem: {
        a: '有一年淡季訂單掉很多，我把預算依出發地區拆開看，發現中南部的轉換成本只有北部一半，就把預算移過去。', ev: 2,
        p: { result: { a: '那季訂單比前一年同期多一成二，總預算沒有增加。', ev: 1 } },
      },
      integrity: {
        a: '有次發現前一個月轉換數重複計算，我主動跟主管說，報告也重新修正寄給業務。', ev: 1,
        p: { more: { a: '業務有點不高興，因為他已經拿舊數字跟上面報告了。但錯就是錯，晚講只會更麻煩。', ev: 1 } },
      },
    },
    answers: {
      media2_t1: { a: '我會先分是流量還是轉換的問題：CPM、CTR 有沒有變，再看到達頁轉換率和客單價。也會確認追蹤和歸因有沒有被改。', ev: 2 },
      media2_t2: { a: '新品沒有歷史數據，我會先拿兩成做測試，Meta 測受眾和素材，Google 搶品牌字和品類字。兩週後把預算集中到 CPA 好的組合。', ev: 2 },
      media2_s1: { a: '先看拒登原因，素材問題就換備用版本，同時走申訴。時間太緊的話，我會先通知客戶部分走期可能延後。', ev: 2 },
      media2_s2: { a: '嗯……我會照實際數字做報告，附上原因分析和下個月的調整方案。', ev: 1,
        p: { more: { a: '如果主管堅持，我可能……會請他跟客戶當面說明，我自己不會改數字。', ev: 1 } } },
    },
    traits: [
      { id: 'hidden', name: '隱藏實力', desc: '講得很保守，其實設計三層再行銷漏斗，CPA 從 820 降到 480，一年省下約兩百萬。', positive: true },
    ],
    asks: ['team', 'evaluation'],
  },

  // --- Direct, maybe: veteran search specialist, honest but stuck on manual bidding ---
  {
    id: 'media2_c3',
    name: '周宗翰',
    sprite: 'm_mid_glasses',
    archetype: 'direct',
    resume: {
      headline: '搜尋廣告・8 年經驗',
      education: '私立大學 資訊管理學系',
      experience: ['2018/05 至今　關鍵行銷顧問　搜尋廣告專員'],
      skills: ['Google Ads', '關鍵字規劃', 'Excel'],
      note: '管理 20 個以上搜尋廣告帳戶',
    },
    truth: { professional: 2, problem: 2, integrity: 3 },
    fit: 'maybe',
    profile: '搜尋廣告關鍵字經驗扎實，為人誠實；但仍堅持手動出價、不熟 Meta 與智慧出價，技能有些過時。設錯地區時主動認錯並促成退費，誠信很好。',
    intro: '我是周宗翰，做 Google 搜尋廣告八年，手上管過二十幾個帳戶。關鍵字結構、否定字這些我很熟，想換到電商客戶多的環境。',
    motive: {
      whyus: { a: '浪潮電商客戶多，我想把搜尋廣告經驗用在購物廣告上。', ev: 0 },
      leave: { a: '公司客戶大多是 B2B，產業比較固定，我想換個環境。', ev: 0 },
      salary: { a: '目前 5 萬 5，希望 6 萬。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我建過一套關鍵字分組方法，一個帳戶從五百個關鍵字整理成三十個主題群組，點擊成本降了兩成。', ev: 1,
        p: {
          more: { a: '出價我都自己手動調。智慧出價試過一次，覺得錢花太快就關掉了。Meta 我比較少碰，主要做搜尋。', ev: -1, need: 50, reveal: 'outdated', react: '手動比較好控制啊。' },
        },
      },
      problem: {
        a: '客戶網站改版後轉換掉一半，我比對前後的到達頁，發現表單多了三個必填欄位。建議拿掉後，轉換回來八成。', ev: 1,
      },
      integrity: {
        a: '我做事就是照規矩，數字是多少就報多少。', ev: 0, vague: true,
        p: {
          more: { a: '有次我把投放地區設成全台，客戶其實只做北部，多花了四萬多。我自己跟客戶說，公司後來退了那筆費用。', ev: 2, reveal: 'honest', react: '錯了就要講。' },
        },
      },
    },
    answers: {
      media2_t1: { a: '我會先看搜尋字詞報告，是不是有不相關的字在吃預算，再看品質分數和出價有沒有被競爭對手墊高。', ev: 1, vague: true,
        hint: '只講搜尋廣告，追問 Meta 那邊他會怎麼看。',
        p: { more: { a: 'Meta 的部分……我會先請熟的同事幫忙看，我自己比較少操作。', ev: -1 } } },
      media2_t2: { a: '我會把大部分放 Google 搜尋，因為搜尋意圖最明確。Meta 放少一點做曝光就好。', ev: 0, vague: true,
        p: { more: { a: '新品還沒人搜尋這點我知道，但我對 Meta 受眾設定比較沒把握，所以會保守一點。', ev: 0 } } },
      media2_s1: { a: '先看平台寫的拒登原因，改素材重新送審。帳號警告就走申訴，同時請客戶準備資格文件。', ev: 1 },
      media2_s2: { a: '我不會換指標。數字差就照實講，附上原因跟下個月怎麼改。主管不高興，我也是這樣做。', ev: 2 },
    },
    traits: [
      { id: 'outdated', name: '技能過時', desc: '堅持手動出價，不熟智慧出價與 Meta 投放，工具停在幾年前。', positive: false },
      { id: 'honest', name: '誠實坦白', desc: '設錯投放地區多花四萬多，主動向客戶說明並促成退費。', positive: true },
    ],
    asks: ['training'],
  },

  // --- Nervous, hire: rigorous A/B tester who owned up to a budget typo ---
  {
    id: 'media2_c4',
    name: '簡柔安',
    sprite: 'f_young_casual',
    archetype: 'nervous',
    resume: {
      headline: '廣告投放專員・1 年半經驗',
      education: '國立大學 經濟學系',
      experience: ['2025/03 至今　小樹數位　廣告投放專員'],
      skills: ['Meta 廣告', 'Google Ads', 'GA4', 'Excel 樞紐分析'],
      note: '負責 3 個電商客戶帳戶',
    },
    truth: { professional: 3, problem: 2, integrity: 3 },
    fit: 'hire',
    profile: '面試緊張，但數據敏感度高，十二輪 A/B 測試把 ROAS 從 1.8 拉到 3.4；預算多打一個零時第一時間停損並坦承，誠信可靠。突發狀況經驗還不多。',
    intro: '您、您好，我是簡柔安，在小樹數位做廣告投放一年半，負責三個電商客戶。我比較常做素材和受眾的 A/B 測試。',
    motive: {
      whyus: { a: '我、我看過浪潮分享的增量測試案例，想學怎麼做得更嚴謹。', ev: 1 },
      leave: { a: '小樹人比較少，我一個人顧三個帳戶，沒人可以討論。我想找有前輩可以學的地方。', ev: 1 },
      salary: { a: '目前 4 萬 2，希望……4 萬 8 左右。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我、我有做一些 A/B 測試，ROAS 有變好。', ev: 0, vague: true,
        hint: '說得很簡略，追問測試的成果。',
        p: {
          result: { a: '我幫一個寵物用品客戶跑了十二輪測試，一次只改一個變數，像開頭三秒、價格露出。ROAS 從 1.8 拉到 3.4，CPA 降了快一半。', ev: 2, reveal: 'datasense', react: '其、其實還好……' },
        },
      },
      problem: {
        a: '有次客戶結帳頁壞掉，我看到轉換突然變零，就先把廣告暫停，再通知客戶的工程師。', ev: 1,
        p: { result: { a: '大概停了四個小時，修好再開。如果沒停，那天大概會白花兩萬多。', ev: 1 } },
      },
      integrity: {
        a: '我、我有犯過錯……', ev: 0, vague: true,
        p: {
          more: { a: '有次預算多打一個零，一天 3 萬變 30 萬，半小時燒了快 2 萬。我馬上停掉跟主管講，也跟客戶道歉。之後我都會設帳戶花費上限。', ev: 2, need: 50, reveal: 'honest2', react: '我、我很怕再犯……' },
        },
      },
    },
    answers: {
      media2_t1: { a: '我、我會先拆漏斗：CPM、CTR、到達頁轉換、客單價，看是哪一段掉。再看素材頻率是不是太高，還有競品有沒有在打折。', ev: 2 },
      media2_t2: { a: '我會先用三成做測試，Meta 測受眾和素材，Google 做品牌字和購物廣告。兩週後依 CPA 重新分配……再留一成做再行銷。', ev: 2 },
      media2_s1: { a: '我會先看拒登原因，改素材重送，然後……問主管有沒有申訴經驗。活動前一天的話，我可能會有點慌。', ev: 0, vague: true,
        hint: '方向對但缺乏備案，追問她怎麼確保活動照常上線。',
        p: { more: { a: '我會先用之前過審的舊素材頂著，同時告訴客戶狀況，不讓活動空窗。', ev: 1 } } },
      media2_s2: { a: '我、我不會換指標。我會照實寫，加上原因和改善計畫。如果主管堅持，我會請他一起跟客戶說明。', ev: 2 },
    },
    traits: [
      { id: 'datasense', name: '數據敏感', desc: '一次只改一個變數跑十二輪 A/B 測試，ROAS 從 1.8 拉到 3.4。', positive: true },
      { id: 'honest2', name: '主動認錯', desc: '預算多打一個零時立刻停損並向主管、客戶坦承，之後自設花費上限。', positive: true },
    ],
    asks: ['training', 'team'],
  },

  // --- Polished, maybe: strong short-video ad skills, four employers in three years ---
  {
    id: 'media2_c5',
    name: '徐昆霖',
    sprite: 'm_young_blazer',
    archetype: 'polished',
    resume: {
      headline: '數位廣告・3 年經驗',
      education: '私立大學 數位行銷學系',
      experience: ['2025/11 至今　飛鳥行銷　資深投放專員', '2025/01 至 2025/10　躍動數位　投放專員', '2024/02 至 2024/12　禾心整合行銷　投放專員', '2023/07 至 2024/01　星辰媒體　廣告助理'],
      skills: ['Meta 廣告', 'Google Ads', '短影音廣告素材', 'GA4'],
      note: '短影音廣告 CTR 平均 2.8%',
    },
    truth: { professional: 3, problem: 2, integrity: 2 },
    fit: 'maybe',
    profile: '短影音廣告的腳本、測試與優化都在水準之上；但三年換四家，現職不到一年又同時在談別家，穩定度令人擔心。問題處理與報告誠信表現中等。',
    intro: '您好，我是徐昆霖，目前在飛鳥行銷擔任資深投放專員，擅長短影音廣告，平均 CTR 2.8%。我很看重成長速度，希望找到能讓我發揮的舞台。',
    motive: {
      whyus: { a: '浪潮的客戶預算大，我想挑戰更大的帳戶。', ev: 0 },
      leave: {
        a: '每份工作我都學到東西，學得差不多就會想挑戰下一個階段。', ev: 0, vague: true,
        hint: '三年四家，可以請他多說說這次為什麼又要換。',
        p: { more: { a: '飛鳥才來不到一年，但升遷要等兩年……其實我也同時在談另一家，看哪邊條件好。', ev: -1, need: 50, reveal: 'hopper2', react: '找工作本來就會比較嘛。' } },
      },
      salary: { a: '目前 5 萬 5，希望 6 萬 5 以上。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我負責的短影音廣告平均 CTR 2.8%，比業界平均高很多。', ev: 1,
        p: {
          result: { a: '主要是前三秒直接放使用前後對比，再測三種字幕。保養品客戶的 CPA 從 650 降到 420。', ev: 2 },
          role: { a: '腳本是我寫的，拍攝外包，剪輯版本和測試排程是我自己來。', ev: 1 },
        },
      },
      problem: {
        a: '有次客戶臨時要把預算翻倍，我怕演算法重新學習，就分三天慢慢加上去，CPA 沒有暴衝。', ev: 1,
      },
      integrity: {
        a: '報告我會照數字寫，不過也會挑客戶比較在意的重點呈現。', ev: 0, vague: true,
        p: { more: { a: '像轉換差的月份，我會把重點放在 CTR 和觸及成長，購買數放後面。沒改數字啦，只是順序。', ev: -1 } },
      },
    },
    answers: {
      media2_t1: { a: '我會先看素材疲勞，短影音大概兩週就會掉，所以會看頻率和 CTR 走勢。再看競品是不是在大檔期搶流量。', ev: 1,
        p: { more: { a: '素材沒問題的話，就檢查到達頁速度和價格有沒有變。', ev: 1 } } },
      media2_t2: { a: 'Meta 六成主打短影音開發新客，Google 四成做搜尋和購物廣告。素材先做五支測試，一週後留最好的兩支放大。', ev: 2 },
      media2_s1: { a: '先改違規內容重新送審，同時開新的廣告組用備用素材上，帳號警告就申訴。我平常都會留幾支備用素材。', ev: 1 },
      media2_s2: { a: '我會照實寫，但重點放在其他有進步的指標，讓客戶看到我們有在努力。', ev: 0 },
    },
    traits: [
      { id: 'hopper2', name: '頻繁跳槽', desc: '三年換四家，現職不到一年，又同時在談另一家。', positive: false },
    ],
    asks: ['growth', 'salaryrange'],
  },

  // --- Direct, nohire: traditional media buyer whose digital work was all outsourced ---
  {
    id: 'media2_c6',
    name: '傅亭妤',
    sprite: 'f_mid_glasses',
    archetype: 'direct',
    resume: {
      headline: '媒體採購・10 年經驗',
      education: '國立大學 廣告學系',
      experience: ['2016/03 至今　恆廣媒體　媒體採購副理'],
      skills: ['電視與戶外媒體採購', '年度媒體規劃', '數位廣告'],
      note: '管理年度媒體預算 3,000 萬',
    },
    truth: { professional: 1, problem: 1, integrity: 3 },
    fit: 'nohire',
    profile: '說話直接、操守好，傳統媒體採購經驗豐富；但履歷上的「數位廣告」其實全部發包給代理商，自己沒操作過後台，投放專業和問題排除都不足。',
    intro: '我是傅亭妤，做媒體採購十年，目前是副理，每年管三千萬的媒體預算，電視、戶外、數位都有。我想往數位投放深入發展。',
    motive: {
      whyus: { a: '傳統媒體預算一年比一年少，我想轉到數位，比較有前景。', ev: 1 },
      leave: { a: '公司電視和戶外業務在縮編，我的部門明年可能會被併掉。', ev: 0 },
      salary: { a: '目前 6 萬 8，希望至少維持。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我每年規劃三千萬的媒體預算，數位大概占三成，Meta、Google 都有在投。', ev: 1, vague: true,
        p: {
          role: { a: '數位的部分……是發包給數位代理商，我負責談價格和看結案報告。後台我自己沒有實際操作過。', ev: -2, need: 50, reveal: 'mismatch', react: '發包也是管理啊。' },
        },
      },
      problem: {
        a: '有次電視廣告檔期被臨時調動，我馬上跟電視台談補檔，還多爭取到兩檔免費露出。', ev: 1,
        p: { more: { a: '不過數位廣告出問題，我們都是請代理商處理。', ev: -1 } },
      },
      integrity: {
        a: '有媒體業務私下說要給我回饋，我直接拒絕，也跟主管報備。', ev: 2,
      },
    },
    answers: {
      media2_t1: { a: '我會先請代理商提供報告，看是哪個環節出問題。', ev: -1, vague: true,
        hint: '她把問題丟給代理商，追問她自己會看哪些數據。',
        p: { more: { a: 'CPM、CTR 我看得懂，但再細的設定要問代理商。', ev: -1 } } },
      media2_t2: { a: '我會參考過去的媒體組合，大概 Meta 六成、Google 四成，再看代理商的建議。', ev: 0, vague: true,
        p: { more: { a: '受眾的話，我會用興趣和地區去切，細節還要再學。', ev: -1 } } },
      media2_s1: { a: '我會先打電話給平台的業務窗口，請他們幫忙看。', ev: 0,
        p: { more: { a: '找不到窗口的話……我可能要請同事幫我看後台。', ev: -1 } } },
      media2_s2: { a: '我不會換指標。採購這麼多年，我看過太多包裝報告，最後都會被客戶抓到。', ev: 2 },
    },
    traits: [
      { id: 'mismatch', name: '經驗名不符實', desc: '履歷寫數位廣告，實際全部發包給代理商，自己沒操作過廣告後台。', positive: false },
    ],
    asks: ['training', 'salaryrange'],
  },

  // --- Humble, maybe: small-budget marketer, self-taught GTM to fix broken tracking ---
  {
    id: 'media2_c7',
    name: '吳柏凱',
    sprite: 'm_young_suit',
    archetype: 'humble',
    resume: {
      headline: '電商行銷・1 年經驗',
      education: '私立大學 資訊管理學系',
      experience: ['2025/09 至今　山野茶行　電商行銷專員'],
      skills: ['Meta 廣告', 'GTM', 'GA4', 'Shopify'],
      note: '負責品牌官網廣告，月預算 5 萬',
    },
    truth: { professional: 1, problem: 3, integrity: 3 },
    fit: 'maybe',
    profile: '投放經驗淺、預算規模小，對大預算分配和受眾策略還不熟；但遇到追蹤問題會自學 GTM 重埋事件，解決問題能力強，個性誠實可靠。',
    intro: '您好，我是吳柏凱，在山野茶行做電商行銷一年，負責官網和廣告。預算不大，一個月 5 萬左右，很多事都要自己來。',
    motive: {
      whyus: { a: '我想學怎麼操作比較大的預算，浪潮客戶多，可以學得比較快。', ev: 1 },
      leave: { a: '茶行規模小，廣告預算很難再增加，我想找能成長的地方。', ev: 1 },
      salary: { a: '目前 3 萬 8，希望 4 萬 5 左右。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我負責茶行的 Meta 廣告，月預算 5 萬，ROAS 大概維持在 2.5。', ev: 0,
        p: { more: { a: '受眾大部分用系統自動的，大預算要怎麼拆，我還沒有經驗。', ev: -1 } },
      },
      problem: {
        a: '有段時間後台購買數跟實際訂單差很多，我就去查了一下。', ev: 0, vague: true,
        hint: '「查了一下」是怎麼查？追問他實際做了什麼。',
        p: {
          role: { a: '我發現購買事件被重複觸發，就上網自學 GTM，花兩個週末重新埋設，加上訂單編號去重。後台跟實際訂單的差距從三成縮到 5% 以內。', ev: 2, reveal: 'fixer', react: '沒人會，只好自己來。' },
        },
      },
      integrity: {
        a: '我回報都直接給老闆看後台，不會挑。有幾個月 ROAS 掉到 1.5，我也是照講，再說明原因。', ev: 2,
      },
    },
    answers: {
      media2_t1: { a: '我會先看素材是不是太久沒換，再看網站有沒有出問題。', ev: 0, vague: true,
        p: { more: { a: '還有追蹤是不是正常，我之前遇過數字錯的情況。競價環境的變化，我比較不會判斷。', ev: 0 } } },
      media2_t2: { a: '30 萬對我來說很多……我大概會兩邊各一半，再看哪邊好就加碼。', ev: -1, vague: true,
        hint: '分配邏輯很粗，追問他依據什麼。',
        p: { more: { a: '依據的話……我會先問有經驗的同事，我還沒操作過這麼大的預算。', ev: 0 } } },
      media2_s1: { a: '先看拒登原因，把違規的地方改掉，同時準備另一版素材送審。帳號警告照平台流程申訴，跟主管和客戶回報進度。', ev: 1 },
      media2_s2: { a: '我不會換。我會把真實數字和原因寫清楚，主管如果堅持，我會跟他討論怎麼跟客戶說明比較好。', ev: 2 },
    },
    traits: [
      { id: 'fixer', name: '主動補位', desc: '發現購買事件重複觸發，自學 GTM 重新埋設並去重，數據誤差從三成縮到 5% 內。', positive: true },
    ],
    asks: ['training', 'growth'],
  },

  // --- Polished, hire: rigorous incrementality tester, exposed prior agency's inflation ---
  {
    id: 'media2_c8',
    name: '郭家瑜',
    sprite: 'f_young_braid',
    archetype: 'polished',
    resume: {
      headline: '資深廣告投放・4 年經驗',
      education: '國立大學 資訊管理學系',
      experience: ['2022/07 至今　藍點數位　資深廣告投放專員'],
      skills: ['Meta 廣告', 'Google Ads', 'GA4', '增量測試'],
      note: '同時負責 5 個客戶，月預算合計 200 萬',
    },
    truth: { professional: 3, problem: 3, integrity: 3 },
    fit: 'hire',
    profile: '表達流暢且經得起追問，家電客戶 ROAS 從 2.1 做到 3.6，會用地區對照做增量測試；曾揭露前代理商灌水，三個客戶指名續約，專業與誠信都很強。',
    intro: '您好，我是郭家瑜，在藍點數位做廣告投放四年，目前負責五個客戶，月預算合計兩百萬左右。我很重視數據的真實性，也常做增量測試。',
    motive: {
      whyus: { a: '浪潮在業界以數據透明出名，跟我的做事方式很合。', ev: 1 },
      leave: { a: '藍點最近主打低價方案，客戶越接越多，我很難把每個帳戶做細。', ev: 1 },
      salary: { a: '目前 5 萬 8，希望 6 萬 5。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我操作一個家電品牌，ROAS 從 2.1 做到 3.6，主要是重整帳戶結構和素材策略。', ev: 2, vague: true,
        p: {
          result: { a: '為了確認不是自然流量，我用北中南地區做對照，停投地區的訂單少了 18%，證明廣告帶來的增量是真的。', ev: 2, reveal: 'rigor', react: '數字要能證明才算。' },
          role: { a: '帳戶結構和測試設計都是我做的，素材跟設計師一起討論。', ev: 1 },
        },
      },
      problem: {
        a: '有個客戶的購物廣告突然全部停止，我查到是平台更新了商品資料欄位格式，連夜改好重新送審，隔天下午就恢復。', ev: 2,
      },
      integrity: {
        a: '我做報告的原則是，好的壞的都要寫清楚。', ev: 1, vague: true,
        p: {
          more: { a: '接手一個客戶時，我發現前代理商把品牌字轉換算進 ROAS。我跟客戶說明真實數字，帳面從 5 掉到 2.8，客戶反而續約。現在三個客戶都指名要我。', ev: 2, need: 50, reveal: 'trusted', react: '這樣做才長久。' },
        },
      },
    },
    answers: {
      media2_t1: { a: '先看是哪段掉：CPM、CTR、轉換率還是客單價。再排除外部因素，像競品檔期和追蹤異常，最後才動素材和受眾。', ev: 2 },
      media2_t2: { a: '新品先用兩成測試，Meta 跑廣泛受眾讓演算法找人，Google 搶品類字。兩週後依增量和 CPA 重新分配，保留一成做再行銷。', ev: 2 },
      media2_s1: { a: '先查拒登條款改素材重送，同時用之前過審的素材頂上。帳號警告要申訴，也要檢查其他素材有沒有同樣風險。', ev: 2 },
      media2_s2: { a: '我不會換指標。我會照實呈現，附上原因分析和改善方案，必要時陪主管一起跟客戶說明。', ev: 2 },
    },
    traits: [
      { id: 'rigor', name: '數據嚴謹', desc: '用地區對照做增量測試，證明廣告帶來 18% 的真實增量。', positive: true },
      { id: 'trusted', name: '客戶口碑', desc: '主動揭露前代理商灌水的 ROAS，三個客戶因此指名續約。', positive: true },
    ],
    asks: ['growth', 'team'],
  },

  // --- Nervous, nohire: burned 400k overnight and disguised it in the report ---
  {
    id: 'media2_c9',
    name: '潘書豪',
    sprite: 'm_mid_polo',
    archetype: 'nervous',
    resume: {
      headline: '用戶增長・5 年經驗',
      education: '私立大學 資訊工程系',
      experience: ['2021/06 至 2026/05　玩心遊戲　用戶增長專員'],
      skills: ['Meta 廣告', 'Google Ads', 'App 安裝廣告'],
      note: '負責手遊用戶獲取廣告',
    },
    truth: { professional: 2, problem: 1, integrity: 1 },
    fit: 'nohire',
    profile: '緊張、說話遮遮掩掩；App 投放有基本能力，但曾出價設錯一晚燒掉四十萬，還改報表日期掩蓋，被財務抓到後被勸退，問題處理和誠信都不及格。',
    intro: '您好……我是潘書豪，之前在玩心遊戲做用戶增長五年，主要負責手遊的安裝廣告。我、我想換到電商領域試試看。',
    motive: {
      whyus: { a: '電商……感覺比較穩定，我、我想換個產業。', ev: 0 },
      leave: {
        a: '就是……覺得做久了，想休息一下，再換個方向。', ev: 0, vague: true,
        hint: '回答很模糊，可以溫和地多問一點離職的情況。',
        p: { more: { a: '……公司覺得我那次失誤處理得不好，主管建議我自己提離職。', ev: -1, need: 50 } },
      },
      gap: {
        a: '離職後休息了幾個月，有、有上一些線上課程。', ev: 0,
        p: { more: { a: '是 GA4 和電商廣告的入門課，還沒有拿到證書。', ev: 0 } },
      },
      salary: { a: '之前 5 萬 5，現在……5 萬左右就可以。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我負責手遊的安裝廣告，CPI 大概控制在 60 元左右。', ev: 1,
        p: { result: { a: '後來有做留存優化，七日留存從 18% 到 22%。不過電商的轉換我比較不熟。', ev: 0 } },
      },
      problem: {
        a: '遇到問題我會……先自己查，查不到再問。', ev: -1, vague: true,
        p: { more: { a: '有次出價設錯，一個晚上花掉四十萬，我隔天早上才發現……當下太慌，不知道要先停什麼。', ev: -2 } },
      },
      integrity: {
        a: '我、我覺得誠信很重要。', ev: 0, vague: true,
        hint: '只有空泛的態度，可以請他講一個實際例子。',
        p: {
          more: { a: '……那次燒掉的四十萬，我把報表日期往後拆成好幾天，看起來比較平均。後來財務對帳才發現。', ev: -2, need: 50, reveal: 'coverup', react: '我、我那時候很怕……' },
        },
      },
    },
    answers: {
      media2_t1: { a: '我、我會先看素材，然後……看出價有沒有問題。', ev: 0, vague: true,
        p: { more: { a: '電商的 ROAS 我比較少看，之前都看 CPI 和留存。', ev: -1 } } },
      media2_t2: { a: '我……可能會多放在 Meta，因為我比較熟。Google 的話放少一點。', ev: -1 },
      media2_s1: { a: '先、先申訴吧，然後等平台回覆。', ev: -1,
        p: { more: { a: '備用素材……我之前沒有準備的習慣。', ev: -1 } } },
      media2_s2: { a: '我……應該會照主管說的做吧，畢竟是主管的決定。', ev: -2 },
    },
    traits: [
      { id: 'coverup', name: '隱瞞失誤', desc: '一晚燒掉四十萬後把報表日期拆開掩蓋，直到財務對帳才被發現。', positive: false },
    ],
    asks: ['training'],
  },

  // --- Direct, maybe: resourceful brand-side lead, bound by a one-year beauty non-compete ---
  {
    id: 'media2_c10',
    name: '薛雅筑',
    sprite: 'f_mid_scarf',
    archetype: 'direct',
    resume: {
      headline: '數位行銷主任・7 年經驗',
      education: '國立大學 企業管理學系',
      experience: ['2022/04 至 2026/09　柔光美妝　數位行銷主任', '2019/03 至 2022/03　晨星廣告　數位企劃'],
      skills: ['Meta 廣告', 'Google Ads', 'LINE 官方帳號', '再行銷'],
      note: '帶領 3 人數位小組',
    },
    truth: { professional: 2, problem: 3, integrity: 2 },
    fit: 'maybe',
    profile: '問題解決能力強，主力商品缺貨時把廣告轉成補貨通知名單，危機變成名單資產；投放專業穩健。但與前公司簽了一年美妝競業條款，接案範圍受限，需要事先確認。',
    intro: '我是薛雅筑，前一份在柔光美妝當數位行銷主任四年多，帶三人小組，負責官網和 LINE 的廣告。更早在廣告公司做數位企劃，代理商和品牌端都待過。',
    motive: {
      whyus: { a: '我想回到代理商，接觸更多不同品類的電商客戶。', ev: 1 },
      leave: {
        a: '品牌端做久了，想看更多元的案子，所以上個月離開了。', ev: 0, vague: true,
        p: { more: { a: '另外要先說，我跟柔光簽了一年競業，美妝保養類客戶一年內不能接。這點可能要先確認。', ev: 0, need: 50, reveal: 'noncompete', react: '早講比較好。' } },
      },
      salary: { a: '之前 6 萬 2，希望 6 萬 5。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我帶的小組負責官網和 LINE，公司年營收大概四成來自數位廣告。', ev: 1,
        p: { role: { a: '策略和預算是我定，執行由兩位專員分工，我每週看一次帳戶。', ev: 1 } },
      },
      problem: {
        a: '有次主打精華液突然缺貨，廣告已排好兩週走期。我把廣告改成「補貨通知登記」，到貨時再用 LINE 推播。', ev: 2,
        p: { result: { a: '兩週收到快六千筆登記，到貨三天賣掉七成庫存，比原本預估還快。', ev: 2 } },
      },
      integrity: {
        a: '報告我會照實寫，但措辭會修飾一下，讓客戶比較好接受。', ev: 0, vague: true,
        p: { reflect: { a: '修飾不等於改數字。不過回頭看，有幾次我把壞消息放得太後面，客戶看到時已經來不及調整。', ev: 0 } },
      },
    },
    answers: {
      media2_t1: { a: '我會先看是不是素材疲勞或競品在打價格戰，再看到達頁和庫存。缺貨或價格變動，常常是 ROAS 掉的原因。', ev: 1 },
      media2_t2: { a: 'Meta 六成、Google 四成。Meta 先做開發和名單蒐集，Google 接搜尋需求，上市兩週後再看數據調整。', ev: 1,
        p: { more: { a: '我也會先建 LINE 名單，上市當天推播，壓低一開始的獲客成本。', ev: 1 } } },
      media2_s1: { a: '先看拒登原因改素材重送，同時用舊素材頂上。如果帳號被限制，就先轉到備用帳號，同時跟客戶說明。', ev: 1,
        p: { more: { a: '備用帳號平常就要申請好、跑一點預算養著，臨時開的會被審很久。', ev: 1 } } },
      media2_s2: { a: '我會照實寫數字，但會花更多篇幅講原因和下個月的計畫。換指標我不會做。', ev: 1 },
    },
    traits: [
      { id: 'noncompete', name: '競業條款限制', desc: '與前公司簽有一年競業條款，一年內不能接美妝保養類客戶。', positive: false },
    ],
    asks: ['flexible', 'evaluation'],
  },
]);
