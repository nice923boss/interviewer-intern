var TII = globalThis.TII;

TII.addCandidates('media-1', [
  // --- Polished, maybe: follower growth bought with giveaways, deletes negative comments ---
  {
    id: 'media1_c1',
    name: '謝宥辰',
    sprite: 'm_young_curly',
    archetype: 'polished',
    resume: {
      headline: '社群小編・2 年經驗',
      education: '私立大學 大眾傳播學系',
      experience: ['2024/09 至今　橙果餐酒館　社群小編', '2023/08 至 2024/08　禾日影像工作室　行政助理'],
      skills: ['IG', 'FB 粉專經營', 'Canva', 'CapCut'],
      note: '自述：三個月將粉專從 3 千人經營到 2 萬 3 千人',
    },
    truth: { professional: 2, customer: 1, learning: 2 },
    fit: 'maybe',
    profile: '表達流暢、企劃有基本水準，但粉絲成長主要靠抽獎，平常互動品質差；處理負評習慣直接刪除或封鎖，顧客溝通是明顯弱項。學習態度尚可。',
    intro: '您好，我是謝宥辰，目前在橙果餐酒館負責 IG 和 FB，三個月把粉專從 3 千人做到 2 萬 3 千人。我很喜歡研究什麼內容會紅，希望到選物品牌把經驗放大。',
    motive: {
      whyus: { a: '拾光的選品很有質感，IG 版面也很一致，我覺得這種品牌很適合做出有記憶點的內容。', ev: 0 },
      leave: { a: '老闆打算把社群改成外包，我的職位之後會被調整，所以想先找下一步。', ev: 0 },
      salary: { a: '我現在月薪 3 萬 3，希望能到 3 萬 8。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我最有成就感的是三個月把粉專從 3 千做到 2 萬 3，那段時間每篇貼文觸及都破萬。', ev: 2, vague: true,
        hint: '數字很亮眼，但粉絲怎麼來的、互動品質如何都還不知道，追問成果細節。',
        p: {
          result: { a: '主要是辦了三次抽獎，按讚、留言、標記三位好友就能抽雙人套餐。活動結束後，平常貼文互動率大概 0.5% 左右。', ev: -1, reveal: 'giveaway', react: '抽獎也是策略啊……' },
          role: { a: '活動文案和圖都是我做的，得獎名單也是我整理的。', ev: 0 },
        },
      },
      customer: {
        a: '負評我都會很快處理，不會讓它在版面上放太久，避免影響品牌形象。', ev: 0, vague: true,
        hint: '「很快處理」是怎麼處理？請他說說自己具體做了什麼。',
        p: {
          role: { a: '通常就是先隱藏，比較兇的就直接刪掉、封鎖。老闆說版面乾淨比較重要。', ev: -2, reveal: 'delete', react: '大家不都這樣嗎？' },
          reflect: { a: '嗯……有一次被刪留言的客人跑去 Google 評論寫一星，也許先私訊問清楚會比較好。', ev: 0 },
        },
      },
      learning: {
        a: '去年 Threads 開始紅，我花兩週研究別人的帳號，學他們的開頭寫法，幫店裡開了帳號。', ev: 1,
        p: { result: { a: '半年大概 1 千 5 百人追蹤，有一篇聊員工餐的串文有 3 百多則留言。', ev: 1 } },
      },
    },
    answers: {
      media1_t1: { a: '我會看是不是圖片不夠吸睛，或文案太長。可以改成大家比較會留言的問句，或是加抽獎。', ev: 0, vague: true,
        hint: '回答停在表面，又繞回抽獎。追問他實際怎麼判斷原因。',
        p: { more: { a: '我會比對同時段其他貼文。如果觸及高是因為下廣告，互動低可能是受眾設錯了。', ev: 1 } } },
      media1_t2: { a: '我固定一週發五篇，一三五發產品，二四發生活感內容，晚上九點發，因為那時大家最常滑手機。', ev: 1,
        p: { more: { a: '九點是看洞察報告裡粉絲上線時間抓的，不過我比較少回頭比對每種內容的成效。', ev: 0 } } },
      media1_s1: { a: '我會先把那些留言隱藏，再發一篇公告說明，不要讓更多人看到負評。', ev: -1,
        p: { reflect: { a: '如果真的是瑕疵，可能要先跟主管確認批號，再公開回應比較好。', ev: 0 } } },
      media1_s2: { a: '我會先看很多熱門短影音，抓現在流行的音樂和剪法，再用 CapCut 套模板做做看。', ev: 1 },
    },
    traits: [
      { id: 'giveaway', name: '成長靠抽獎', desc: '粉絲暴增主要靠三次抽獎，平常貼文互動率只有約 0.5%，粉絲品質不佳。', positive: false },
      { id: 'delete', name: '刪負評習慣', desc: '負評習慣直接隱藏、刪除或封鎖，曾讓客人轉到其他平台抱怨。', positive: false },
    ],
    asks: ['growth', 'evaluation'],
  },

  // --- Humble, hire: understated but drives real engagement and built a reply SOP ---
  {
    id: 'media1_c2',
    name: '范亭妤',
    sprite: 'f_young_bob',
    archetype: 'humble',
    resume: {
      headline: '社群小編・3 年經驗',
      education: '國立大學 中國文學系',
      experience: ['2023/03 至今　麥穗手作烘焙　社群小編', '2022/07 至 2023/02　青田出版社　編輯助理'],
      skills: ['FB、IG 經營', 'Meta 洞察報告', 'Canva', 'Lightroom'],
      note: '負責烘焙品牌社群經營',
    },
    truth: { professional: 3, customer: 3, learning: 2 },
    fit: 'hire',
    profile: '履歷寫得很保守，實際把互動率做到 6~7%，母親節預購七成訂單來自社群；自建留言回覆 SOP 與熟客社團，顧客溝通成熟。短影音剛起步，學習能力中上。',
    intro: '您好，我是范亭妤，在麥穗手作烘焙做社群三年，平常就是拍麵包、寫貼文、回留言。之前念中文系，文字算是比較擅長的部分。',
    motive: {
      whyus: { a: '我自己買過拾光的杯子，包裝和小卡都很用心。我想試試看經營商品種類比較多的品牌。', ev: 1 },
      leave: { a: '麥穗只有三間門市，社群能做的題目有點固定了。我想接觸電商和更完整的數據。', ev: 1,
        p: { more: { a: '老闆其實有問我要不要留下來兼做門市排班，但我還是想專心在社群。', ev: 1 } } },
      salary: { a: '目前 3 萬 4，希望 3 萬 8 左右，可以再討論。', ev: 0 },
    },
    stories: {
      professional: {
        a: '嗯……就是每天固定發文，拍麵包出爐的照片，有時做一些節日企劃，成效還算可以吧。', ev: 0, vague: true,
        hint: '她說得很保守。「還算可以」是多少？追問具體成果。',
        p: {
          result: { a: '貼文平均互動率大概 6% 到 7%。去年母親節蛋糕預購，後台統計大概七成訂單是從 IG 連結進來的。', ev: 2, reveal: 'hidden', react: '其實……也還好啦。' },
          role: { a: '企劃、拍照、文案都是我一個人做，預購表單是我跟門市一起設計的。', ev: 1 },
        },
      },
      customer: {
        a: '留言我都會盡量回，有客人抱怨也會先道歉，再看怎麼處理。', ev: 0, vague: true,
        hint: '回答很平淡，追問她後來做了什麼、結果如何。',
        p: {
          result: { a: '後來我整理一份留言回覆 SOP，分詢價、客訴、敏感問題三類，門市同事也能照著回。還開了熟客 LINE 社團，現在大概八百人，新品會先在裡面問意見。', ev: 2, reveal: 'sop', react: '這不是應該的嗎？' },
        },
      },
      learning: {
        a: '去年開始學拍 Reels，看了一些教學影片，也去上過一次手機攝影課。', ev: 1,
        p: { result: { a: '現在一週可以穩定出一支，觀看數大概 3 千到 1 萬，還在摸索什麼題材比較好。', ev: 1 } },
      },
    },
    answers: {
      media1_t1: { a: '我會先看觸及是不是來自非粉絲。如果被推給陌生人，可能內容沒讓他們有共鳴，再看文案有沒有給大家留言的理由。', ev: 1,
        p: { result: { a: '之前有一篇觸及兩萬但互動很少，後來發現圖上沒有價格，大家看看就滑走。補上價格和尺寸後，留言多了很多。', ev: 2 } } },
      media1_t2: { a: '我會先排好節日和新品時間，再搭配固定單元，像週一出爐日記、週五門市小故事。每週看一次洞察報告調整。', ev: 1 },
      media1_s1: { a: '我會先私訊留言的客人，請他提供訂單和照片，同時回報主管確認是不是同一批貨。確認後再公開回應處理方式。', ev: 2 },
      media1_s2: { a: '我會先找同類品牌的短影音，拆解他們前三秒怎麼抓人，再用手機拍幾支練習，請同事給意見。', ev: 1 },
    },
    traits: [
      { id: 'hidden', name: '隱藏實力', desc: '講得很保守，其實互動率達 6~7%，母親節預購七成訂單來自社群。', positive: true },
      { id: 'sop', name: '改善提案', desc: '主動建立留言回覆 SOP 與八百人熟客社團，讓門市也能一致回應。', positive: true },
    ],
    asks: ['training', 'team'],
  },

  // --- Nervous, nohire: personal account padded with bought followers, waits to be taught ---
  {
    id: 'media1_c3',
    name: '孫子豪',
    sprite: 'm_young_tech',
    archetype: 'nervous',
    resume: {
      headline: '社群小編・實習經驗',
      education: '私立科技大學 數位多媒體設計系',
      experience: ['2026/07 至 2026/08　米粒咖啡　社群行銷實習生'],
      skills: ['IG', 'Canva', 'CapCut'],
      note: '經營個人美食帳號，追蹤數 1 萬 2 千',
    },
    truth: { professional: 1, customer: 2, learning: 1 },
    fit: 'nohire',
    profile: '緊張、說話零碎；個人帳號 1 萬 2 千追蹤大半是買來的，實際互動很低，幾乎不懂數據。對顧客還算有禮貌，但學習被動，習慣等人教。',
    intro: '您好……我是孫子豪，我、我有在經營一個美食帳號，現在大概 1 萬 2 千人追蹤。之前在米粒咖啡實習兩個月，希望可以做社群相關的工作。',
    motive: {
      whyus: { a: '我、我覺得你們的 IG 很好看，然後……我很喜歡生活小物。', ev: 0 },
      leave: { a: '暑期實習結束了，所以現在在找正職。', ev: 0 },
      salary: { a: '我……我看人力銀行寫 3 萬 2 到 3 萬 5，我都可以。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我的美食帳號有 1 萬 2 千人追蹤，我、我每週會發三篇，都是自己拍的。', ev: 1, vague: true,
        hint: '追蹤數不少，但互動和成長過程都沒提，追問成果細節。',
        p: {
          result: { a: '呃……其實一開始為了好看有買過粉，大概 8 千人是買的。現在一篇大概二、三十個讚而已。', ev: -2, reveal: 'fakefans', react: '你、你怎麼知道……' },
        },
      },
      customer: {
        a: '實習時有客人留言說咖啡太酸，我、我就回謝謝建議，會轉達給店長。', ev: 0, vague: true,
        hint: '回答很簡短，追問後續有沒有處理。',
        p: { result: { a: '店長後來私訊送他一張飲料券，客人有回說下次再來。不過那是店長處理的。', ev: 0 } },
      },
      learning: {
        a: '我、我有想學短影音，可是還沒開始。', ev: -1, vague: true,
        hint: '沒有具體例子，追問他實際做過什麼。',
        p: {
          result: { a: '實習時想說主管會教，可是主管很忙……所以也沒學到。公司有教育訓練的話，我會學比較快。', ev: -1, reveal: 'passive', react: '我、我會努力……' },
        },
      },
    },
    answers: {
      media1_t1: { a: '可能……圖片不好看？我會換一張比較好看的照片。', ev: -1, vague: true,
        hint: '只想到換圖，追問他會看哪些數據判斷。',
        p: { more: { a: '數據的話……我平常比較少看，大概就看按讚數。', ev: -1 } } },
      media1_t2: { a: '我會、我會想到什麼就先寫下來，然後有空就發。', ev: -1, vague: true,
        hint: '沒有排程概念，追問他實習時怎麼做。',
        p: { more: { a: '實習時是主管排好表給我，我照著發。', ev: 0 } } },
      media1_s1: { a: '我會……先跟主管說，看主管要怎麼處理，不要自己亂回。', ev: 0,
        p: { more: { a: '如果主管要我回，我會先道歉，然後請客人私訊。', ev: 0 } } },
      media1_s2: { a: '我會先看 YouTube 教學，然後……等主管說要拍什麼主題。', ev: -1 },
    },
    traits: [
      { id: 'fakefans', name: '買粉灌水', desc: '個人帳號 1 萬 2 千追蹤中約 8 千是買來的，實際每篇只有二、三十個讚。', positive: false },
      { id: 'passive', name: '被動等教', desc: '學習仰賴主管或公司安排，沒人教就停在原地。', positive: false },
    ],
    asks: ['training'],
  },

  // --- Direct, hire: newsroom social editor, fast and calm under comment storms ---
  {
    id: 'media1_c4',
    name: '呂苡安',
    sprite: 'f_young_ponytail',
    archetype: 'direct',
    resume: {
      headline: '社群編輯・2 年經驗',
      education: '國立大學 新聞學系',
      experience: ['2024/08 至今　每日鮮聞網　生活消費版社群編輯'],
      skills: ['FB、IG、Threads', 'Meta Business Suite', 'GA4 基礎', 'CapCut'],
      note: '負責生活與消費版社群',
    },
    truth: { professional: 2, customer: 3, learning: 3 },
    fit: 'hire',
    profile: '說話直接、條理清楚，新聞社群的節奏讓她反應快，曾十分鐘內更正錯誤並公開致歉，留言處理成熟；自學 Threads 半年做到 9 千追蹤，學習力強。電商導購經驗較少。',
    intro: '我是呂苡安，在每日鮮聞網做生活消費版社群編輯兩年。新聞社群很講速度，每天要發十幾則，也要顧留言。我想轉到品牌端做更長期的經營。',
    motive: {
      whyus: { a: '媒體社群追的是當下流量，我想做能累積品牌好感的內容。拾光的商品故事性很強，適合深耕。', ev: 1 },
      leave: { a: '媒體這兩年流量起伏很大，部門一直調方向，我想找可以長期規劃的位置。', ev: 0 },
      salary: { a: '目前 3 萬 6，希望 4 萬。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我負責的生活版，去年平均觸及成長大概四成，主要是調整發文時段，把長文改成圖卡加重點摘要。', ev: 1,
        p: { result: { a: '不過媒體和品牌不一樣，我比較少碰導購和轉換率，這部分要再學。', ev: 0 } },
      },
      customer: {
        a: '有次合作貼文價格寫錯，一直有人留言問。我十分鐘內改好、置頂說明並道歉，再私訊每個問的人。', ev: 2,
        p: {
          result: { a: '廠商最後沒有要求撤文，還有讀者留言說處理得很負責。之後我寫了一份發文前檢查表，部門現在都在用。', ev: 2, reveal: 'crisis', react: '出錯就要扛。' },
        },
      },
      learning: {
        a: '去年 Threads 剛起來，部門沒人懂，我自己開帳號研究半年，摸出哪種開頭比較容易被轉。', ev: 1,
        p: { result: { a: '後來帳號有 9 千人追蹤，主管請我在部門分享，現在 Threads 的發文規劃是我在帶。', ev: 2 } },
      },
    },
    answers: {
      media1_t1: { a: '先看觸及從哪來。如果是演算法推給非粉絲，代表標題有吸到人，但內容沒給理由互動，我會改成有立場或有問題可以接的寫法。', ev: 2 },
      media1_t2: { a: '先排固定節點，像新品和節日，再留三成彈性給時事。每週看各類貼文的互動率和儲存數，月底檢討哪類要加碼。', ev: 2 },
      media1_s1: { a: '先回一則統一說明，說我們正在確認，再私訊請客人提供照片和訂單。確認後要公開處理結果，不能只私下處理。', ev: 2 },
      media1_s2: { a: '我會先拆熱門影片的前三秒和字幕節奏，一週先拍三支試水溫，看完播率再調整。', ev: 1 },
    },
    traits: [
      { id: 'crisis', name: '危機處理經驗', desc: '曾在十分鐘內更正錯誤貼文、公開致歉並逐一私訊，事後建立發文前檢查表。', positive: true },
    ],
    asks: ['evaluation', 'overtime'],
  },

  // --- Humble, maybe: designer with strong brand-consistency skills, avoids video ---
  {
    id: 'media1_c5',
    name: '何秉翰',
    sprite: 'm_young_glasses',
    archetype: 'humble',
    resume: {
      headline: '平面設計師・3 年經驗',
      education: '私立大學 視覺傳達設計系',
      experience: ['2023/07 至今　點點設計工作室　平面設計師'],
      skills: ['Illustrator', 'Photoshop', 'Figma', 'Canva'],
      note: '負責客戶社群視覺',
    },
    truth: { professional: 2, customer: 2, learning: 1 },
    fit: 'maybe',
    profile: '設計背景，幫四個客戶訂過社群視覺規範，對品牌一致性很敏感，是跨域加分；但只想做靜態視覺，曾推掉主管要他嘗試的 Reels，學習新形式意願偏低，數據也不熟。',
    intro: '您好，我是何秉翰，在設計工作室做平面設計三年，主要幫客戶做社群貼文的圖。做久了發現自己對整個社群經營也有興趣，想試著轉成小編。',
    motive: {
      whyus: { a: '拾光的視覺很乾淨，我覺得我的設計能力可以直接幫上忙。', ev: 0 },
      leave: { a: '工作室接的案子越來越雜，常常只是照客戶意見改圖，想做比較完整的事。', ev: 0 },
      salary: { a: '現在 3 萬 5，希望 3 萬 8 左右。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我幫客戶做過一些社群的圖，就是讓他們版面看起來比較一致。', ev: 0, vague: true,
        hint: '講得很輕，追問他在這些專案裡實際負責什麼。',
        p: {
          role: { a: '其實四個客戶的社群視覺規範都是我訂的，字體、色票、版型都有，換人做也不會跑掉。有家咖啡店改版後，主頁追蹤轉換明顯變好。', ev: 2, reveal: 'crossover', react: '這也算嗎？' },
        },
      },
      customer: {
        a: '客戶改稿改很多次時，我會先把意見整理成清單，跟對方確認後再動手，來回次數少很多。', ev: 1,
      },
      learning: {
        a: '新東西的話……我比較喜歡把熟悉的做好。', ev: -1, vague: true,
        hint: '沒有具體例子，追問實際發生過的情況與結果。',
        p: {
          result: { a: '去年主管希望我學拍 Reels，我覺得自己不擅長影片，就跟他說還是讓我專心做圖比較好。', ev: -1, reveal: 'comfort', react: '每個人擅長不同嘛。' },
        },
      },
    },
    answers: {
      media1_t1: { a: '我會先看圖是不是被看到，卻沒讓人想停下來，例如重點太小、字太多。', ev: 0, vague: true,
        hint: '只從視覺角度回答，追問他會看哪些數據。',
        p: { more: { a: '數據我之前比較少碰，大概會看留言和分享，其他要再學。', ev: 0 } } },
      media1_t2: { a: '我會先定好幾種版型，讓每週貼文有固定節奏和系列感。', ev: 0, vague: true,
        hint: '偏重視覺排版，追問他會參考什麼數據。',
        p: { more: { a: '數據的話……可能看哪種版型按讚比較多，就多做一點。', ev: 0 } } },
      media1_s1: { a: '我會先跟主管回報，請客人私訊提供照片，確認狀況再統一回覆。', ev: 1 },
      media1_s2: { a: '我會……先看看能不能用動態圖卡代替，畢竟影片我比較不熟。', ev: -1 },
    },
    traits: [
      { id: 'crossover', name: '跨域經驗', desc: '設計背景，親手訂過四個客戶的社群視覺規範，品牌一致性能力強。', positive: true },
      { id: 'comfort', name: '只待舒適圈', desc: '曾推掉主管要他嘗試 Reels 的安排，對新形式學習意願低。', positive: false },
    ],
    asks: ['training'],
  },

  // --- Polished, nohire: claims the agency's collab campaign, three jobs in 18 months ---
  {
    id: 'media1_c6',
    name: '楊宜庭',
    sprite: 'f_young_long',
    archetype: 'polished',
    resume: {
      headline: '社群行銷・1 年半經驗',
      education: '私立大學 廣告學系',
      experience: ['2026/02 至今　悅光廣告　社群企劃', '2025/07 至 2026/01　小島咖啡豆　社群小編', '2025/01 至 2025/06　星川整合行銷　實習生'],
      skills: ['IG', 'FB', 'Canva', 'Meta 廣告後台'],
      note: '自述：主導品牌聯名活動，觸及 80 萬',
    },
    truth: { professional: 1, customer: 2, learning: 1 },
    fit: 'nohire',
    profile: '口條好、形象亮眼，但「主導聯名」其實是總監帶的案子，她只負責排程上稿；一年半換三個地方，每次都怪主管。數據概念薄弱，學習多停在口頭。',
    intro: '您好，我是楊宜庭，目前在悅光廣告擔任社群企劃，主導過一檔品牌聯名活動，觸及 80 萬。我很會抓年輕族群喜歡的內容，很期待在選物品牌發揮創意。',
    motive: {
      whyus: { a: '拾光的商品很有故事，很適合做聯名和跨界合作，這是我最擅長的。', ev: 0 },
      leave: {
        a: '代理商節奏太快，我想在品牌端專心經營一個品牌。', ev: 0, vague: true,
        hint: '她的經歷換得很快，可以請她多說說每次離開的原因。',
        p: { more: { a: '小島是老闆太保守，星川是實習結束……悅光的話，主管對文案意見很多，我覺得我們想法不太合。', ev: -1, reveal: 'hopper', react: '每次都有原因啊。' } },
      },
      salary: { a: '目前 3 萬 8，希望 4 萬 2。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我主導過一檔茶飲和文具的聯名，觸及 80 萬，留言區超熱鬧，是我很驕傲的案子。', ev: 2, vague: true,
        hint: '「主導」和「80 萬」都很亮眼，追問她在專案裡實際負責什麼。',
        p: {
          role: { a: '呃……企劃和洽談是總監帶的，素材是設計組做的，我主要負責排程上稿和回留言。', ev: -2, reveal: 'credit', react: '我也有參與啊……' },
          result: { a: '80 萬是兩個品牌加上廣告的總觸及，實際導購多少我沒看到。', ev: -1 },
        },
      },
      customer: {
        a: '有粉絲抱怨抽獎不公平，我有回覆說明抽獎方式，也公布了得獎名單。', ev: 1,
      },
      learning: {
        a: '我學東西很快，平台有新功能我都會第一時間試。', ev: 0, vague: true,
        hint: '只是態度宣言，追問她具體學了什麼、成果如何。',
        p: { result: { a: '像 Threads 我有開過帳號，但後來工作比較忙，就沒有繼續經營了。', ev: -1 } },
      },
    },
    answers: {
      media1_t1: { a: '我覺得就是內容不夠有梗，可以多找網紅合作或做聯名，討論度就會出來。', ev: 0, vague: true,
        hint: '直接跳到聯名，沒有分析原因。追問她會看哪些數據。',
        p: { more: { a: '數據的話……觸及跟按讚吧，其他報表通常是 AE 在看。', ev: -1 } } },
      media1_t2: { a: '我會先想幾個大活動，中間穿插日常貼文，保持版面熱度。', ev: 0, vague: true,
        hint: '沒提數據，追問她怎麼決定什麼時候發、發什麼。',
        p: { more: { a: '時間的話大概就晚上發，因為大家晚上比較有空。', ev: -1 } } },
      media1_s1: { a: '我會先發一篇溫暖的道歉文展現品牌態度，再看要不要送折價券安撫大家。', ev: 0,
        p: { more: { a: '瑕疵是不是真的，可能要問倉庫那邊吧。', ev: 0 } } },
      media1_s2: { a: '短影音我很有興趣，我會找網紅合作拍，效果會比自己拍好。', ev: -1 },
    },
    traits: [
      { id: 'credit', name: '搶功', desc: '把總監主導的聯名案說成自己主導，實際只負責排程上稿和回留言。', positive: false },
      { id: 'hopper', name: '頻繁跳槽', desc: '一年半換了三個地方，每次都把離開歸因於主管或老闆。', positive: false },
    ],
    asks: ['growth', 'flexible'],
  },

  // --- Direct, maybe: data-driven commerce operator, ignores comments after hours ---
  {
    id: 'media1_c7',
    name: '黃冠廷',
    sprite: 'm_young_vest',
    archetype: 'direct',
    resume: {
      headline: '電商營運・3 年經驗',
      education: '國立大學 企業管理學系',
      experience: ['2023/09 至今　好室家居　電商營運專員（兼社群）'],
      skills: ['GA4', 'UTM 追蹤', 'Meta 廣告後台', 'Excel'],
      note: '社群導購營收一季成長 35%',
    },
    truth: { professional: 3, customer: 1, learning: 2 },
    fit: 'maybe',
    profile: '數據能力強，每篇貼文掛 UTM、用 GA4 追導購，內容規劃有邏輯；但下班完全不看留言，曾讓客訴累積一整個週末，對粉絲情緒不敏感，顧客溝通是弱項。',
    intro: '我是黃冠廷，在好室家居做電商營運，社群也是我在顧。我比較重數據，每篇貼文都有掛追蹤碼，上一季社群導購營收成長 35%。',
    motive: {
      whyus: { a: '拾光有自己的電商，社群可以直接看到導購成效，這是我最想做的。', ev: 1 },
      leave: { a: '公司電商部門要併到母公司，社群會交給代理商，我會變成純營運。', ev: 0 },
      salary: { a: '目前 3 萬 8，希望 4 萬到 4 萬 2。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我每篇貼文都掛 UTM，在 GA4 看哪類內容帶來訂單。發現開箱類導購最高，就把比例從兩成拉到四成，一季社群營收成長 35%。', ev: 2,
        p: { result: { a: '客單價沒變，主要是轉換率從 0.8% 拉到 1.2%。', ev: 1 } },
      },
      customer: {
        a: '留言我會在上班時間集中回，一天回兩次，效率比較好。', ev: 0, vague: true,
        hint: '只講效率，追問他下班或假日的留言怎麼辦。',
        p: {
          more: { a: '下班就不看了。有次週五晚上有人抱怨送錯貨，到週一已經五十幾則留言，主管有念我。但下班本來就該休息。', ev: -1, need: 40, reveal: 'boundary', react: '下班就是下班啊。' },
        },
      },
      learning: {
        a: '去年 GA4 改版，舊報表都不能用，我自己看說明文件，重做一份導購儀表板。', ev: 1,
        p: { result: { a: '花了大概三週，現在主管每週一都看那份報表開會。', ev: 1 } },
      },
    },
    answers: {
      media1_t1: { a: '先看觸及來源是廣告還是推薦，再看受眾和品牌客群合不合。如果合，就檢查內容有沒有行動呼籲，或互動誘因太弱。', ev: 2 },
      media1_t2: { a: '我會用過去三個月各類內容的互動率和導購轉換排比例，再配合檔期。月中檢查一次，表現差的類型就換掉。', ev: 2 },
      media1_s1: { a: '先查訂單和出貨批號，確認影響範圍，再發一則公告說明處理方式。', ev: 1,
        p: { more: { a: '速度的話……上班時間我會盡快，下班就隔天處理。', ev: -1 } } },
      media1_s2: { a: '我會先看競品哪些短影音導購最好，從開箱類開始試拍，再看完播率和點擊。', ev: 1 },
    },
    traits: [
      { id: 'boundary', name: '有明確的工作界線', desc: '下班與假日完全不看留言，曾讓客訴累積到五十幾則，主管提醒過。', positive: false },
    ],
    asks: ['overtime', 'flexible'],
  },

  // --- Nervous, hire: shy intern who self-taught short video and nails replies ---
  {
    id: 'media1_c8',
    name: '鄭舒涵',
    sprite: 'f_young_glasses',
    archetype: 'nervous',
    resume: {
      headline: '社群行銷・1 年實習經驗',
      education: '國立大學 傳播學系',
      experience: ['2025/09 至 2026/08　綠芽生活　社群行銷實習生', '2024/09 至 2025/06　系學會　粉專主編'],
      skills: ['IG Reels', 'CapCut', 'Canva', 'Meta 洞察報告'],
      note: '負責生活用品品牌 IG 貼文與留言',
    },
    truth: { professional: 2, customer: 3, learning: 3 },
    fit: 'hire',
    profile: '面試很緊張，但實習一年做出觀看 12 萬的 Reels，留言回覆率 98%；短影音從零自學起來，學習力和顧客溝通都很好。數據分析還在基礎階段。',
    intro: '您、您好，我是鄭舒涵，之前在綠芽生活實習一年，負責 IG 貼文和回留言，也有做一些短影音……我會很認真學的。',
    motive: {
      whyus: { a: '我、我很喜歡拾光的商品介紹，寫得很像朋友在推薦。我想學怎麼寫出這種感覺。', ev: 1 },
      leave: { a: '實習一年期滿，綠芽沒有正職缺，主管有幫我寫推薦信。', ev: 1 },
      salary: { a: '我、我看行情大概 3 萬 3 到 3 萬 6，都可以接受。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我……有做過一支 Reels，數字還不錯。', ev: 0, vague: true,
        hint: '她說得很含糊，追問那支影片的成果。',
        p: { result: { a: '那支是教大家收納廚房小物，觀看大概 12 萬，帶來快 9 百個新追蹤。主管後來把它改成廣告素材。', ev: 2 } },
      },
      customer: {
        a: '留言我都會回，有、有時候客人很兇，我會先道歉，再請他私訊。', ev: 1,
        p: { result: { a: '主管統計我那一年留言回覆率 98%，大部分兩小時內回。有位一開始罵很兇的客人，後來變成常回購的熟客。', ev: 2 } },
      },
      learning: {
        a: '短影音是我、我自己學的。', ev: 0, vague: true,
        hint: '回答太短，追問她怎麼學、學到什麼程度。',
        p: {
          result: { a: '公司沒人會拍，我就每天下班看教學、拆熱門影片，一個月拍了二十支練習。後來公司的短影音都交給我做。', ev: 2, reveal: 'selflearn', react: '我、我只是喜歡……' },
        },
      },
    },
    answers: {
      media1_t1: { a: '我、我會先看觸及是不是很多非粉絲，再看留言、分享、儲存哪個特別低。如果儲存低，可能內容沒有實用價值。', ev: 1 },
      media1_t2: { a: '我會先列節日和新品，再看洞察報告粉絲上線的時間……然後每週看哪類貼文互動比較好，再調整。', ev: 1,
        p: { more: { a: '報表我目前只會看基本的，比較深的分析還要再學。', ev: 0 } } },
      media1_s1: { a: '先、先不要刪留言。我會回報主管，請客人私訊照片和訂單，確認後再發統一說明。', ev: 2 },
      media1_s2: { a: '我會先找同類品牌的短影音拆解，用手機拍幾支練習，請同事看前三秒有沒有吸引力。', ev: 1 },
    },
    traits: [
      { id: 'selflearn', name: '自學能力強', desc: '從零自學短影音，一個月拍二十支練習，後來接下公司全部短影音製作。', positive: true },
    ],
    asks: ['training', 'team'],
  },

  // --- Direct, maybe: retail deputy manager switching careers, great with customers ---
  {
    id: 'media1_c9',
    name: '江士傑',
    sprite: 'm_young_jacket',
    archetype: 'direct',
    resume: {
      headline: '門市副店長・4 年經驗（轉職社群）',
      education: '私立科技大學 行銷與流通管理系',
      experience: ['2022/06 至今　木棉服飾　門市副店長'],
      skills: ['顧客關係維護', 'LINE 社群經營', 'Canva'],
      note: '自費完成八週社群行銷課程',
    },
    truth: { professional: 1, customer: 3, learning: 2 },
    fit: 'maybe',
    profile: '轉職者，門市經驗讓他很懂顧客，自建三百多人的門市 LINE 群組；動機強、自費上課。但社群專業只有課程作業程度，數據與內容企劃都很淺。',
    intro: '我是江士傑，做服飾門市四年，現在是副店長。我發現自己最喜歡的是跟客人互動，所以自費上了八週社群課，想正式轉做社群。',
    motive: {
      whyus: { a: '拾光有門市也有網路，我懂實體顧客，想把這個經驗帶到線上。', ev: 1 },
      leave: { a: '門市做到副店長，再上去就是店長，但我想做的是行銷，不想再拖了。', ev: 1 },
      salary: { a: '我知道轉職要從頭來，3 萬 2 到 3 萬 5 我都可以。', ev: 0 },
    },
    stories: {
      professional: {
        a: '社群課的期末作業，我幫一家早午餐店企劃一個月的貼文，老師給很高分。', ev: 1, vague: true,
        hint: '只有作業經驗，追問實際成果。',
        p: {
          result: { a: '那是模擬企劃，沒有真的上線。我實際經營過的只有門市 LINE 群組，貼文和數據分析還沒真正做過。', ev: -1, reveal: 'switcher', react: '所以我才想轉啊。' },
        },
      },
      customer: {
        a: '我在門市建了一個 LINE 群組，新貨到會先通知熟客。', ev: 1,
        p: {
          result: { a: '現在三百多人，群組公告新品那幾天，業績大概比平常多兩成。還有客人會幫我拉朋友進來。', ev: 2, reveal: 'loyal', react: '客人就是要顧啊。' },
        },
      },
      learning: {
        a: '我自費上了八週社群課，每週下班後上兩晚，作業都有交。', ev: 1,
        p: { more: { a: '現在每天固定看三個品牌的帳號，記錄他們什麼貼文互動高。', ev: 1 } },
      },
    },
    answers: {
      media1_t1: { a: '我猜是內容沒讓人想回應。如果是我，會在文案最後問問題，像門市跟客人聊天那樣。', ev: 0, vague: true,
        hint: '有想法但沒分析數據，追問他會看哪些指標。',
        p: { more: { a: '課堂有教看分享、儲存，但我還沒實際操作過後台。', ev: 0 } } },
      media1_t2: { a: '我會照課堂學的，先排節日和新品，再穿插日常內容。數據的部分要再請教。', ev: 0 },
      media1_s1: { a: '門市遇過很多次。先不急著辯解，私訊請客人提供照片，查同批商品，確認後公開說明換貨方式。', ev: 2 },
      media1_s2: { a: '我會先拍門市穿搭試試看，那是我最熟的，再從留言看大家喜歡什麼。', ev: 1 },
    },
    traits: [
      { id: 'switcher', name: '轉職動機強烈但經驗淺', desc: '真心想轉社群，但只有課程作業經驗，貼文企劃和數據分析還沒實際做過。', positive: false },
      { id: 'loyal', name: '客戶口碑', desc: '自建三百多人的門市 LINE 群組，熟客會主動幫忙拉新客。', positive: true },
    ],
    asks: ['training', 'growth'],
  },

  // --- Polished, nohire: mass-produces AI copy without checking, blames others ---
  {
    id: 'media1_c10',
    name: '蔡宥蓁',
    sprite: 'f_young_bun',
    archetype: 'polished',
    resume: {
      headline: '內容行銷・2 年經驗',
      education: '私立大學 應用外語學系',
      experience: ['2024/10 至今　晴天保健　內容行銷專員'],
      skills: ['AI 文案工具', 'SEO 文章', 'IG', 'Canva'],
      note: '每月產出 60 篇社群與部落格內容',
    },
    truth: { professional: 1, customer: 1, learning: 2 },
    fit: 'nohire',
    profile: '產量高、講話流暢，但大量用 AI 產文卻不查證，曾把成分寫錯遭檢舉下架，還怪設計和主管沒抓到；常有錯字錯價。回覆顧客很公式化。學新工具快。',
    intro: '您好，我是蔡宥蓁，在晴天保健做內容行銷，每個月產出六十篇貼文和文章。我很會運用 AI 工具提升效率，相信可以讓拾光的內容產量翻倍。',
    motive: {
      whyus: { a: '保健品文案限制很多，我想做比較能發揮創意的生活選物。', ev: 0 },
      leave: { a: '公司內容審核越來越嚴，很多想法都做不出來，覺得被綁住。', ev: 0 },
      salary: { a: '目前 3 萬 6，希望 4 萬。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我每個月產出六十篇內容，是部門最多的，主管也說我效率很好。', ev: 1, vague: true,
        hint: '產量高但品質不明，追問她實際怎麼產出、結果如何。',
        p: {
          role: { a: '大部分是 AI 先寫，我改一下語氣就發。量太大，細節沒辦法每篇都查，偶爾錯字或價格寫錯，再改就好。', ev: -1, reveal: 'careless', react: '大家都會打錯字嘛。' },
          result: { a: '有一篇 AI 寫的文章把成分寫錯，被消費者檢舉，後來整篇下架。不過那篇設計和主管都看過，他們也沒抓到。', ev: -2, reveal: 'blame', react: '又不是只有我的錯。' },
        },
      },
      customer: {
        a: '負評我都用固定模板回，回得很快，不會漏掉。', ev: 0, vague: true,
        hint: '模板回覆可能很公式化，追問她遇過什麼情況。',
        p: { more: { a: '有客人抱怨模板回覆像機器人，又留了一則更兇的。我就再貼一次模板，後來他就沒回了。', ev: -1 } },
      },
      learning: {
        a: '新的 AI 工具我都會第一時間試，現在搭配三、四套不同工具。', ev: 1,
        p: { result: { a: '一篇文章的產出時間從兩小時縮到半小時左右。', ev: 1 } },
      },
    },
    answers: {
      media1_t1: { a: '我會用 AI 多產幾個版本的文案去測，看哪一個互動比較好。', ev: 0, vague: true,
        hint: '只想到換文案，追問她怎麼判斷原因。',
        p: { more: { a: '原因的話……可能是演算法吧，有時候就是運氣。', ev: -1 } } },
      media1_t2: { a: '我會先用 AI 一次產一整個月的貼文，排進排程工具，省很多時間。', ev: 0, vague: true,
        hint: '只談效率，追問她參考什麼數據。',
        p: { more: { a: '會看觸及，但比較少回頭分析，因為每天都在趕產量。', ev: -1 } } },
      media1_s1: { a: '我會用標準回覆模板一則一則回，請大家私訊客服，就不會越吵越大。', ev: -1 },
      media1_s2: { a: '現在有 AI 可以生成影片，我會先用工具做做看，連拍都不用拍。', ev: 0 },
    },
    traits: [
      { id: 'blame', name: '推卸責任', desc: 'AI 產文寫錯成分遭檢舉下架，卻歸咎設計和主管沒抓到。', positive: false },
      { id: 'careless', name: '細節粗心', desc: '大量用 AI 產文不查證，常有錯字和價格錯誤。', positive: false },
    ],
    asks: ['flexible'],
  },
]);
