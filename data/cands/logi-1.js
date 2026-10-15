var TII = globalThis.TII;

TII.addCandidates('logi-1', [
  // --- Polished, maybe: accuracy number is the team average, works solo ---
  {
    id: 'logi1_c1',
    name: '呂子軒',
    sprite: 'm_young_vest',
    archetype: 'polished',
    resume: {
      headline: '倉儲理貨員・2 年經驗',
      education: '私立科技大學 行銷與流通管理系',
      experience: ['2024/03 至今　鼎沃電商物流　理貨員', '2023/07 至 2024/02　佳品量販　後場儲備人員'],
      skills: ['WMS 手持掃描', 'RF 揀貨', '盤點'],
      note: '自述：揀貨正確率 99.9%，連續 6 個月個人件數第一',
    },
    truth: { professional: 2, teamwork: 1, integrity: 2 },
    fit: 'maybe',
    profile: '揀貨速度快、作業熟練，但 99.9% 正確率是全組平均，個人曾因錯揀被記點；只衝個人件數、很少支援別組，團隊合作不足。',
    intro: '您好，我是呂子軒，在鼎沃電商物流做理貨兩年，揀貨正確率 99.9%，連續六個月個人件數第一名。我手腳快、對 WMS 很熟，希望到規模更大的物流中心挑戰自己。',
    motive: {
      whyus: { a: '順嶺的物流中心很有名，自動化設備也多，我想在更大的場子證明自己的速度。', ev: 0 },
      leave: {
        a: '鼎沃比較小，做到現在沒什麼可以學的了，想往上走。', ev: 0, vague: true,
        hint: '「沒什麼可以學」很籠統，可以請他多說離職前的狀況。',
        p: { more: { a: '其實組長調我去支援退貨區，那邊算不到件數，我反應幾次都沒用，就想換環境。', ev: -1 } },
      },
      salary: { a: '我現在月薪 3 萬 4 加績效獎金，希望底薪能到 3 萬 6。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我揀貨正確率 99.9%，連續六個月個人件數第一，主管都叫我「快手」。', ev: 2, vague: true,
        hint: '數字很漂亮，但不確定是個人還是整組的成績，可以追問結果怎麼算的。',
        p: {
          result: { a: '呃……99.9% 是我們組的月平均。我自己的話，去年有兩次錯揀被客戶退件，有被記點。', ev: -1, reveal: 'datafix', react: '這個也要算喔……' },
          role: { a: '我主要負責 B 區小件揀貨，一天大概揀一千兩百件，系統排好路線我照著走。', ev: 1 },
        },
      },
      teamwork: {
        a: '我跟同事都處得不錯，大家有事都會互相幫忙。', ev: 1, vague: true,
        hint: '只是態度宣言，沒有具體例子，請他說說自己實際做了什麼。',
        p: {
          role: { a: '老實說我比較專心做自己的。別組缺人時我會先把自己的件數衝完，因為績效是看個人的。', ev: -2, reveal: 'solo', react: '績效看個人啊……' },
        },
      },
      integrity: {
        a: '有一次揀錯一箱洗髮精，被包裝組抓到，我就趕快換回來，之後都會多看一眼品號。', ev: 1,
        p: { reflect: { a: '應該當下就主動跟組長講，不要等別人發現。', ev: 0 } },
      },
    },
    answers: {
      logi1_t1: { a: '先刷附近的儲位看是不是放錯格，找不到就在手持機回報缺貨，讓系統跳下一張單，不要卡著。', ev: 1,
        p: { more: { a: '回報後會有庫控的人去查，我們理貨員就先揀別的單。', ev: 0 } } },
      logi1_t2: { a: '就先進先出啊，舊的放前面新的放後面，揀貨時拿前面的就好。', ev: 0,
        p: { more: { a: '效期的話……系統應該會指定批號吧，我照手持機上的批號揀就對了。', ev: 0 } } },
      logi1_s1: { a: '我會先跟組長說我做完了，看他要不要我去支援。不過通常我會先把明天的補貨做一做。', ev: 0 },
      logi1_s2: { a: '我會提醒他一下，不過大家都在趕，不刷的話後面複核也會抓到啦。', ev: -1,
        p: { reflect: { a: '嗯，不刷條碼庫存會亂，其實應該要跟組長講。', ev: 0 } } },
    },
    traits: [
      { id: 'datafix', name: '數據美化', desc: '「99.9% 正確率」其實是全組月平均，本人曾因兩次錯揀被記點。', positive: false },
      { id: 'solo', name: '單打獨鬥', desc: '只衝個人件數，別組缺人時不主動支援。', positive: false },
    ],
    asks: ['growth', 'evaluation'],
  },

  // --- Humble, hire: quietly redesigned expiry slotting, cut waste ---
  {
    id: 'logi1_c2',
    name: '楊婕妤',
    sprite: 'f_young_ponytail',
    archetype: 'humble',
    resume: {
      headline: '冷鏈倉儲理貨員・3 年經驗',
      education: '國立高職 商業經營科',
      experience: ['2023/09 至今　冰原冷鏈物流　理貨員', '2022/07 至 2023/08　鮮果坊　門市人員'],
      skills: ['WMS 手持掃描', '效期管理', '低溫作業', '堆高機證照'],
      note: '負責低溫倉效期品項',
    },
    truth: { professional: 3, teamwork: 3, integrity: 3 },
    fit: 'hire',
    profile: '表達很保守，但在低溫倉自己重新規劃效期儲位，報廢率從 1.2% 降到 0.3%；旺季主動支援別區、帶新人，作業紀律嚴謹，三項職能都優秀。',
    intro: '您好，我是楊婕妤，在冰原冷鏈做理貨三年，主要在冷藏冷凍倉揀貨跟管效期。工作內容很一般啦，就是每天照單揀貨。想換到常溫跟低溫都有的物流中心多學一點。',
    motive: {
      whyus: { a: '順嶺同時有常溫跟低溫倉，我只做過低溫，想學整個中心怎麼運作。', ev: 1 },
      leave: {
        a: '冰原的低溫倉明年要搬到南部，我想留在北部工作，所以開始找新的機會。', ev: 1,
        p: { more: { a: '主管有問我要不要一起調過去，但我比較想留在北部，也趁這個機會學常溫倉的作業。', ev: 1 } },
      },
      salary: { a: '我現在月薪 3 萬 5，含低溫津貼。希望 3 萬 6 左右，可以再談。', ev: 0 },
    },
    stories: {
      professional: {
        a: '嗯……我有幫忙整理過效期的儲位，就是讓快到期的比較好拿。其實也沒什麼。', ev: 0, vague: true,
        hint: '講得很輕描淡寫，看不出規模和成效。追問結果，看看有沒有具體數字。',
        p: {
          result: { a: '整理完那半年，低溫品過期報廢從 1.2% 降到 0.3% 左右，主管說一年省了快四十萬。', ev: 2, reveal: 'improve', react: '其實……還好啦。' },
          role: { a: '是我自己發現短效品常被壓在後面，就畫了儲位圖給組長看，再利用離峰時間一格一格調。', ev: 2 },
        },
      },
      teamwork: {
        a: '旺季的時候大家都很忙，我做完會去看看別人要不要幫忙。', ev: 0, vague: true,
        hint: '回答平淡，但可能有故事。追問她個人實際做了什麼。',
        p: {
          role: { a: '我通常揀完自己的區就去複核區幫忙貼標。新人進來也是組長叫我帶，我會先教他們看效期標示。', ev: 2, reveal: 'cover', react: '這不是應該的嗎？' },
        },
      },
      integrity: {
        a: '有一次盤點少了三箱優格，我沒有直接調帳，回去翻出貨紀錄和監視器，最後發現是被併到別張單出掉了。', ev: 2,
        p: { result: { a: '後來跟客戶確認補單，帳也對回來了。組長之後遇到盤點差異都會先叫我查。', ev: 1 } },
      },
    },
    answers: {
      logi1_t1: { a: '我會先看手持機上的庫存和批號，再找相鄰儲位和上方的備貨區。都沒有就回報異常，寫清楚儲位和品號，不會自己改數量。', ev: 2 },
      logi1_t2: { a: '效期品要先到期先出，上架時把短效的放前面，揀貨照系統指定批號拿。效期剩不到三分之一的，我會先標起來問主管能不能出。', ev: 2 },
      logi1_s1: { a: '我會先問組長哪一區最落後，過去支援揀貨或複核。複核最容易卡，常常是那邊需要人。', ev: 1 },
      logi1_s2: { a: '我會當下請他補刷，跟他說不刷的話庫存會對不起來，盤點又要大家一起加班查。一直這樣的話我會跟組長反映。', ev: 2 },
    },
    traits: [
      { id: 'improve', name: '改善提案', desc: '自主重新規劃低溫效期儲位，報廢率從 1.2% 降到 0.3%。', positive: true },
      { id: 'cover', name: '主動補位', desc: '揀完自己的區會主動支援複核，也被指派帶新人。', positive: true },
    ],
    asks: ['training', 'overtime'],
  },

  // --- Direct, hire: blunt forklift operator, reported his own mistake ---
  {
    id: 'logi1_c3',
    name: '劉凱翔',
    sprite: 'm_young_casual',
    archetype: 'direct',
    resume: {
      headline: '倉儲作業員・1 年半經驗',
      education: '私立大學 運輸物流學系',
      experience: ['2025/04 至今　大昇家具物流倉　倉儲作業員'],
      skills: ['堆高機證照', '油壓拖板車', '大型物件上架', 'Excel'],
      note: '持有堆高機操作技術士證',
    },
    truth: { professional: 3, teamwork: 2, integrity: 3 },
    fit: 'hire',
    profile: '講話很直、不太修飾，但專業扎實：能開堆高機、熟悉大型物件上架與安全規範；自己錯揀主動通報並促成 SOP，誠信優秀。團隊合作符合期待，有時說話太衝。',
    intro: '我是劉凱翔，在家具物流倉做了一年半，主要開堆高機上下架，也會揀貨。我話比較直，不太會講好聽的，但交代的事情我一定做到。',
    motive: {
      whyus: { a: '家具倉品項很少，我想學多品項、小件揀貨的作業。順嶺的電商客戶多，剛好。', ev: 1 },
      leave: { a: '大型家具一天出貨量不大，能學的差不多了，想換到品項多的地方。', ev: 1 },
      salary: { a: '我現在 3 萬 6，有堆高機津貼。希望 3 萬 8，有夜班津貼的話可以再談。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我主要開堆高機，上下架、卸櫃都做。開之前會先檢查貨叉、煞車跟電量，這是我自己的習慣。', ev: 1,
        p: { result: { a: '我開了一年半零碰撞，主管後來讓我帶兩個新進的堆高機手熟悉場地。', ev: 2 } },
      },
      teamwork: {
        a: '同事要幫忙我會幫，但我會直接講哪裡做錯，有人覺得我很兇。', ev: 0, vague: true,
        hint: '他自己承認說話太直，可以請他多說一個實際發生的例子。',
        p: { more: { a: '有一次新人棧板疊太高，我當場叫他拆掉重疊，他臉很臭。後來我有私下跟他講為什麼，倒下來會壓到人。', ev: 1 } },
      },
      integrity: {
        a: '我揀錯過一次，把兩張單的床墊尺寸弄反，貨上車前我自己發現，就馬上跟組長講。', ev: 1, vague: true,
        hint: '他提到主動通報，可以追問結果，看看後續影響。',
        p: {
          result: { a: '車延後二十分鐘出發，客戶沒收到錯貨。組長後來把「上車前抽驗尺寸」寫進出貨 SOP，說是因為我那次。', ev: 2, reveal: 'honest', react: '錯了就要講啊。' },
        },
      },
    },
    answers: {
      logi1_t1: { a: '先找附近儲位跟上層的預備儲位，沒有的話回報庫控，不會自己改數字。改了帳就會亂。', ev: 1 },
      logi1_t2: { a: '有效期的要先到期先出。我們家具倉沒有效期，這部分我沒實際做過，但我知道要照批號揀。', ev: 0 },
      logi1_s1: { a: '直接問組長哪裡缺人就過去。我會開堆高機，可以去補貨區先把貨拉下來，揀貨的人就不用等。', ev: 2 },
      logi1_s2: { a: '我會直接叫他補刷。不刷的話系統以為貨還在架上，下一個人去揀就撲空。', ev: 1 },
    },
    traits: [
      { id: 'honest', name: '誠實坦白', desc: '自己錯揀主動通報，促成組內新增出貨抽驗 SOP。', positive: true },
    ],
    asks: ['overtime', 'growth'],
  },

  // --- Nervous, hire: found a unit-of-measure bug behind stock variance ---
  {
    id: 'logi1_c4',
    name: '王語晨',
    sprite: 'f_young_glasses',
    archetype: 'nervous',
    resume: {
      headline: '倉儲盤點專員・2 年經驗',
      education: '國立大學 工業管理系',
      experience: ['2025/01 至今　星辰 3C 電商倉　盤點專員', '2024/07 至 2024/12　星辰 3C 電商倉　理貨員'],
      skills: ['WMS', 'Excel 樞紐分析', '循環盤點', '異常處理'],
      note: '負責循環盤點與庫存差異追查',
    },
    truth: { professional: 3, teamwork: 3, integrity: 2 },
    fit: 'hire',
    profile: '緊張時回答很短，但盤點專業扎實：靠資料追出系統單位換算錯誤，修正後盤差大幅下降；主動整理跨班交接清單，團隊合作佳。誠信符合期待，曾延後回報小差異。',
    intro: '您、您好，我是王語晨。我在星辰 3C 電商倉，先做理貨，後來做盤點，大概兩年。我……主要是查庫存差異。謝謝。',
    motive: {
      whyus: { a: '我、我想做規模大一點的倉，品項多，盤點比較有挑戰。', ev: 0 },
      leave: {
        a: '公司倉庫要整併到另一個縣市，通勤會太遠。', ev: 0,
        p: { more: { a: '主管有問我要不要過去，但單程要兩個小時，我就想找北部的工作。', ev: 1 } },
      },
      salary: { a: '我現在 3 萬 7……希望差不多，或多一點點就好。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我有查過一個盤點差異……就是那個品項一直對不起來，後來找到原因了。', ev: 0, vague: true,
        hint: '她講得很保留，看不出原因和成果。追問結果，請她說具體數字。',
        p: {
          result: { a: '是系統把一箱 12 入建成 1 入，進貨數量就錯了。我拉半年進出貨比對才找到，修正後那類品項的盤差從每月八十幾筆降到個位數。', ev: 2, reveal: 'data', react: '我只是有在看數字……' },
          role: { a: '那是我自己利用盤點空檔查的，用 Excel 樞紐分析把差異按品項排出來。', ev: 2 },
        },
      },
      teamwork: {
        a: '我們早晚班交接時……我會寫一張表。', ev: 0, vague: true,
        hint: '「寫一張表」背後可能有故事，追問她個人做了什麼。',
        p: { role: { a: '我把當天沒處理完的異常、缺貨儲位都列出來，晚班照表做就好。後來組長叫大家都用這張表。', ev: 2 } },
      },
      integrity: {
        a: '有一次盤點差一個充電頭，我想說很小……就隔天才回報。', ev: 0,
        p: { reflect: { a: '其實 3C 小件很容易不見，應該當天就報。主管提醒過我，我現在都當天報。', ev: 1 } },
      },
    },
    answers: {
      logi1_t1: { a: '先查附近儲位，再看是不是被別張單先揀走。都沒有就回報，然後記下來，下次循環盤點先盤那格。', ev: 2 },
      logi1_t2: { a: '要先到期先出……上架時看效期，揀貨照系統批號。我們 3C 比較少效期，但電池類有。', ev: 1 },
      logi1_s1: { a: '我、我會去問組長要不要幫忙。可以去幫忙複核。', ev: 1 },
      logi1_s2: { a: '我會……跟他說要刷。不然盤點又會對不起來，我們盤點的人很痛苦。', ev: 1 },
    },
    traits: [
      { id: 'data', name: '數據敏感', desc: '用資料比對追出系統單位換算錯誤，盤差從每月八十幾筆降到個位數。', positive: true },
    ],
    asks: ['training', 'team'],
  },

  // --- Polished, nohire: hollow WMS claim, adjusted stock records secretly ---
  {
    id: 'logi1_c5',
    name: '葉子豪',
    sprite: 'm_young_suit',
    archetype: 'polished',
    resume: {
      headline: '倉儲管理・3 年經驗',
      education: '私立科技大學 企業管理系',
      experience: ['2023/02 至 2025/06　聯迅物流　倉儲管理員', '2022/07 至 2023/01　樂享超市　門市人員'],
      skills: ['WMS 系統導入', '盤點規劃', '倉儲管理'],
      note: '自述：參與 WMS 系統導入，負責盤點規劃',
    },
    truth: { professional: 1, teamwork: 2, integrity: 1 },
    fit: 'nohire',
    profile: '口條好、很會講系統名詞，但「參與 WMS 導入」只是當 key user 測試掃描槍；離職真相是盤點差異時私下調帳被稽核發現，誠信有重大問題，不建議錄用。',
    intro: '您好，我是葉子豪，之前在聯迅物流擔任倉儲管理員，參與過 WMS 系統導入，也負責盤點規劃。我熟悉倉儲整體流程，希望能把經驗帶到順嶺。',
    motive: {
      whyus: { a: '順嶺是業界標竿，我很認同你們數位化的方向，相信我的系統經驗派得上用場。', ev: 0 },
      leave: {
        a: '想給自己一段時間沉澱，重新規劃職涯方向。', ev: 0, vague: true,
        hint: '「沉澱」很空泛，可以請他多說離職當時的情況。',
        p: { more: { a: '就……公司組織調整，我覺得時機剛好就離開了。', ev: 0 } },
      },
      salary: { a: '之前月薪 3 萬 8，這次希望 4 萬 2，畢竟有管理經驗。', ev: 0 },
      gap: {
        a: '這段時間在進修，也在準備考證照。', ev: 0, vague: true,
        hint: '進修內容很模糊，可以請他多說一點。',
        p: { more: { a: '有上一些物流管理的線上課程……證照還沒去考。', ev: -1 } },
      },
    },
    stories: {
      professional: {
        a: '我參與了公司 WMS 系統導入，從需求訪談到上線都有參與，也負責規劃全倉盤點。', ev: 2, vague: true,
        hint: '「參與導入」範圍很大，追問他個人實際負責哪一段。',
        p: {
          role: { a: '呃……導入是 IT 跟顧問在做，我是倉庫這邊的 key user，主要幫忙測試掃描槍能不能刷。盤點規劃是課長排的。', ev: -1, reveal: 'hollow', react: '你問這麼細……' },
        },
      },
      teamwork: {
        a: '我跟各組關係都不錯，進貨、出貨有問題都會找我協調。', ev: 1,
        p: { more: { a: '比如進貨卸櫃來不及，我會去拜託出貨組先借兩個人，做完再還。', ev: 1 } },
      },
      integrity: {
        a: '有一次年度盤點差異很大，我加班把帳整理好，最後帳是平的，課長還誇我。', ev: 1, vague: true,
        hint: '「帳是平的」聽起來很順，但怎麼平的？追問結果。',
        p: {
          result: { a: '（停頓）其實有一部分差異找不到原因，我就先在系統裡調數字讓帳平……後來稽核發現，公司請我自己離職。', ev: -2, reveal: 'cover', react: '這、這不重要吧……' },
        },
      },
    },
    answers: {
      logi1_t1: { a: '這時候要啟動庫存差異流程，通知庫控做盤點調整，確保系統與實物一致。', ev: 0,
        p: { more: { a: '就是……回報給主管，讓他們處理。', ev: 0 } } },
      logi1_t2: { a: '要遵循 FIFO 先進先出原則，WMS 會自動控管批號。', ev: 0,
        p: { more: { a: '效期的話……應該也是 FIFO 吧，系統會處理。', ev: -1 } } },
      logi1_s1: { a: '我會主動協調人力，把空出來的人調去支援落後的區域，確保準時出車。', ev: 1 },
      logi1_s2: { a: '我會先口頭提醒，再視情況回報主管，作業規範一定要遵守。', ev: 1 },
    },
    traits: [
      { id: 'hollow', name: '經驗名不符實', desc: '「參與 WMS 導入」實際只是測試掃描槍的 key user，盤點也不是他規劃的。', positive: false },
      { id: 'cover', name: '離職真相', desc: '盤點差異找不到原因時私下調帳，被稽核發現後離職。', positive: false },
    ],
    asks: ['salaryrange', 'growth'],
  },

  // --- Direct, nohire: career changer, short-term only, refuses to help ---
  {
    id: 'logi1_c6',
    name: '廖鈺婷',
    sprite: 'f_young_bun',
    archetype: 'direct',
    resume: {
      headline: '餐飲外場・2 年經驗',
      education: '私立大學 觀光事業學系',
      experience: ['2024/08 至今　焰火燒肉　外場服務員', '2023/07 至 2024/07　好日早午餐　外場服務員'],
      skills: ['收銀', '排班', '補貨'],
      note: '想轉換跑道到物流業',
    },
    truth: { professional: 1, teamwork: 1, integrity: 2 },
    fit: 'nohire',
    profile: '個性直爽，但沒有倉儲經驗，對揀貨、效期都不熟；坦言只想做到明年出國前，也不願支援其他組或加班，專業與團隊合作都不足。',
    intro: '我是廖鈺婷，之前都在餐廳做外場。想說物流業缺人，薪水也不錯，就來試試看。我做事很快，不怕累。',
    motive: {
      whyus: {
        a: '朋友在物流中心做，說薪水比餐廳好，班表也比較固定。', ev: 0, vague: true,
        hint: '動機偏向薪資與班表，可以請她多說一點，了解打算做多久。',
        p: { more: { a: '老實說我明年想去澳洲打工度假，這段時間想先存錢，做到出國前。', ev: -2, reveal: 'short', react: '這要講喔？' } },
      },
      leave: { a: '燒肉店太晚下班了，常常收到半夜一點。', ev: 0 },
      salary: { a: '我現在含小費大概 3 萬 3，希望 3 萬 5 以上。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我在餐廳也要點貨、補貨，冰箱裡的東西要先用舊的，應該跟倉庫差不多。', ev: 0, vague: true,
        hint: '把餐廳補貨類比成倉儲，可以追問她實際負責哪些。',
        p: { role: { a: '點貨主要是店長在做，我就是把廠商送來的東西搬進冰箱，沒有用過什麼系統。', ev: -1 } },
      },
      teamwork: {
        a: '我做事很快，自己的部分一定做完。', ev: 0, vague: true,
        hint: '只講自己的部分，追問她在團隊裡實際怎麼做。',
        p: {
          role: { a: '我自己的做完就下班啊，別組沒做完應該是他們要處理，我做完也沒有多領錢。', ev: -2, reveal: 'line', react: '本來就是這樣啊。' },
        },
      },
      integrity: {
        a: '收銀短少過一百塊，我自己補，然後跟店長講。', ev: 1,
        p: { more: { a: '店長說下次要先講再補，因為要查是不是找錯錢，我後來都先報。', ev: 1 } },
      },
    },
    answers: {
      logi1_t1: { a: '應該是去問主管吧，或是看旁邊有沒有。', ev: 0 },
      logi1_t2: { a: '要先拿舊的吧？跟餐廳一樣。批號跟效期我比較不知道要怎麼看。', ev: -1 },
      logi1_s1: { a: '如果沒有加班費我應該就先下班了，有的話可以留。', ev: -1 },
      logi1_s2: { a: '我會跟他說一下，但如果他不理我，我也不會一直講。', ev: 0 },
    },
    traits: [
      { id: 'short', name: '只想短期過渡', desc: '明年打算出國打工度假，只想做到出國前存錢。', positive: false },
      { id: 'line', name: '不願支援', desc: '明確表示做完自己的就下班，不支援其他組。', positive: false },
    ],
    asks: ['overtime', 'flexible'],
  },

  // --- Nervous, maybe: fresh grad, listed a forklift license not yet earned ---
  {
    id: 'logi1_c7',
    name: '江品睿',
    sprite: 'm_young_glasses',
    archetype: 'nervous',
    resume: {
      headline: '應屆畢業・物流中心實習',
      education: '國立科技大學 運籌管理系',
      experience: ['2025/07 至 2025/08　北宸物流中心　暑期實習生'],
      skills: ['堆高機操作技術士證', 'Excel', 'ABC 分析'],
      note: '實習時參與揀貨與盤點',
    },
    truth: { professional: 1, teamwork: 2, integrity: 2 },
    fit: 'maybe',
    profile: '應屆畢業，物流觀念正確、態度誠懇，但實務只有兩個月實習；履歷列的堆高機證照其實還沒考到，被問才承認。專業不足，學習態度佳，可列入下一輪觀察。',
    intro: '您、您好，我是江品睿，今年從運籌管理系畢業。暑假在北宸物流中心實習過兩個月……有學到揀貨跟盤點。我很想進物流業。',
    motive: {
      whyus: { a: '我、我在學校做過順嶺的個案分析，覺得你們的動線設計很厲害，想親眼看看。', ev: 1 },
      leave: { a: '我是應屆畢業，實習結束就回學校上課了。', ev: 0 },
      salary: { a: '我……聽說新人大概 3 萬 2 到 3 萬 4，照公司規定就好。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我有堆高機證照，實習的時候也有開過。', ev: 1, vague: true,
        hint: '證照對這個職缺很重要，可以追問他實習時個人實際負責什麼。',
        p: {
          role: { a: '其實……實習時是在旁邊看師傅開，我沒有實際操作。證照我報名了，下個月才考術科，履歷寫太快了，對不起。', ev: -1, reveal: 'nolicense', react: '我、我會考到的……' },
          result: { a: '實習報告有做 ABC 分析，建議把前 20% 的熱銷品移到靠近出貨口，老師給了 90 分。', ev: 1 },
        },
      },
      teamwork: {
        a: '實習的時候……大家都很照顧我，我也會幫忙搬東西。', ev: 0, vague: true,
        hint: '回答很模糊，追問他個人實際做了什麼。',
        p: { role: { a: '我主要跟著揀貨組，旺季那週有留下來幫忙貼出貨標籤，貼到晚上十點。', ev: 1 } },
      },
      integrity: {
        a: '實習時盤點我數錯一格，我自己發現後去跟學長講，重新數了一次。', ev: 1,
        p: { result: { a: '學長說還好我有講，不然那格差異要查很久。', ev: 1 } },
      },
    },
    answers: {
      logi1_t1: { a: '應該……先找旁邊的儲位，然後回報，不要自己改系統。學校有教庫存要帳實相符。', ev: 1 },
      logi1_t2: { a: '有效期的要用 FEFO，先到期先出，不是單純先進先出。上架時短效的放好拿的位置。', ev: 1 },
      logi1_s1: { a: '我會問組長要不要幫忙……我可以去貼標籤或搬籠車。', ev: 1 },
      logi1_s2: { a: '我、我會跟他說要刷，因為不刷的話系統庫存會錯。他不聽的話，我會跟組長講。', ev: 1 },
    },
    traits: [
      { id: 'nolicense', name: '證照未到手', desc: '履歷列出的堆高機證照尚未考取，實習也沒有實際操作。', positive: false },
    ],
    asks: ['training', 'growth'],
  },

  // --- Polished, maybe: friendly team player, four jobs in three years ---
  {
    id: 'logi1_c8',
    name: '余詠晴',
    sprite: 'f_young_long',
    archetype: 'polished',
    resume: {
      headline: '倉儲理貨・3 年經驗',
      education: '私立大學 國際企業學系',
      experience: ['2026/01 至今　藍鯨跨境物流　理貨員', '2025/03 至 2025/12　好運宅配　集貨站作業員', '2024/05 至 2025/02　森活家居倉　理貨員', '2023/08 至 2024/04　嘉品物流　包裝員'],
      skills: ['WMS', '包裝', '跨境出貨文件'],
      note: '做過包裝、集貨、跨境理貨',
    },
    truth: { professional: 2, teamwork: 3, integrity: 2 },
    fit: 'maybe',
    profile: '溝通流暢、人緣好，各組都願意配合她；但三年換四份工作，每份都不到一年，穩定度是主要疑慮。專業與誠信符合期待，團隊合作優秀。',
    intro: '您好，我是余詠晴，三年來做過包裝、宅配集貨、家居倉和跨境物流理貨，對物流的不同環節都很熟悉。我很喜歡跟人合作，希望在順嶺長期發展。',
    motive: {
      whyus: { a: '順嶺的作業流程很完整，我想找一個能長期待下來、有升遷制度的地方。', ev: 1 },
      leave: {
        a: '每份工作都有學到東西，學到一個階段就想挑戰新的環節。', ev: 0, vague: true,
        hint: '三年換四份工作，可以請她多說每次離開的原因。',
        p: { more: { a: '嗯……第一份是包裝太單調，第二份是倉庫搬家，第三份覺得主管不太重視我。現在這份是旺季約聘，年底就到期了。', ev: -1, reveal: 'hop', react: '每次都有原因啦……' } },
      },
      salary: { a: '我現在 3 萬 5，希望 3 萬 6 到 3 萬 8。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我做過好幾種倉，包裝、集貨、跨境都會，跨境還要處理報關文件跟材積。', ev: 1,
        p: { role: { a: '跨境那邊我主要是揀貨跟貼國際面單，報關文件是關務在做，我只是幫忙核對件數。', ev: 0 } },
      },
      teamwork: {
        a: '我到哪裡都跟大家處得很好，新同事都會找我問事情。', ev: 1, vague: true,
        hint: '很會說，但缺乏具體事件，追問她個人實際的作為。',
        p: { role: { a: '在好運宅配時晚班常缺人，我會先把隔天的路線籠車排好，司機一到就能上貨，站長還在早會點名謝謝我。', ev: 2 } },
      },
      integrity: {
        a: '我一定照 SOP 做，不會為了快就跳步驟。', ev: 0,
        p: { more: { a: '像包裝時，客戶要求易碎品要包三層氣泡布，再趕我也不會偷工。', ev: 1 } },
      },
    },
    answers: {
      logi1_t1: { a: '我會先在附近找，再看系統有沒有其他儲位有同品項，有的話先改揀那邊，然後把缺貨儲位回報給庫控。', ev: 1 },
      logi1_t2: { a: '先到期先出，上架時效期短的放外側。跨境商品的效期有時候是外文標示，要特別看清楚。', ev: 1 },
      logi1_s1: { a: '我會主動去問哪一區最需要人，通常我會去包裝或複核幫忙，因為我都做過。', ev: 2 },
      logi1_s2: { a: '我會先半開玩笑提醒他補刷，大家都在趕，用比較輕鬆的方式比較聽得進去。', ev: 1 },
    },
    traits: [
      { id: 'hop', name: '頻繁跳槽', desc: '三年換了四份工作，每份都不到一年。', positive: false },
    ],
    asks: ['growth', 'evaluation'],
  },

  // --- Humble, maybe: great teammate but careless picking accuracy ---
  {
    id: 'logi1_c9',
    name: '詹芊卉',
    sprite: 'f_young_short',
    archetype: 'humble',
    resume: {
      headline: '生鮮物流理貨員・2 年經驗',
      education: '國立高職 餐飲管理科',
      experience: ['2024/09 至今　綠田生鮮物流　理貨員'],
      skills: ['生鮮分貨', '低溫作業', '紙箱打包'],
      note: '旺季全勤',
    },
    truth: { professional: 1, teamwork: 3, integrity: 3 },
    fit: 'maybe',
    profile: '個性踏實、願意支援，是團隊裡的好隊友，也會主動承認錯誤；但揀貨錯誤率偏高，上個月 1.5% 被組長約談，細節與專業不足。',
    intro: '您好，我是詹芊卉，在綠田生鮮物流做分貨跟理貨兩年。生鮮每天都要趕早上出車，我習慣很早上班。我覺得我還有很多要學的。',
    motive: {
      whyus: { a: '想學常溫倉的系統作業，我們生鮮倉很多還是看紙本單子。', ev: 1 },
      leave: { a: '生鮮倉凌晨三點上班，做了兩年，想換成一般的班別。', ev: 0 },
      salary: { a: '我現在 3 萬 4 含早班津貼，希望 3 萬 4 到 3 萬 5 就好。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我們每天要在早上六點前把蔬菜分到各門市的籃子，我分貨速度算快。', ev: 1, vague: true,
        hint: '只說速度快，沒提正確率，可以追問結果。',
        p: {
          result: { a: '嗯……速度是快，但上個月錯誤率 1.5%，常把同款不同規格的菜分錯，組長有找我談。我現在會念出品名再放。', ev: -1, reveal: 'careless', react: '被你發現了……' },
        },
      },
      teamwork: {
        a: '大家忙的時候我就幫忙一下。', ev: 0, vague: true,
        hint: '回答很簡短，可能有故事。追問她個人實際做了什麼。',
        p: {
          role: { a: '颱風前一天訂單爆量，我做完自己的區又去幫冷凍區搬貨，還幫新人把分錯的籃子重新對一次，一直做到十點。', ev: 2, reveal: 'cover', react: '大家都很累啊。' },
        },
      },
      integrity: {
        a: '我分錯的時候，都會自己跟組長講。', ev: 1,
        p: { more: { a: '有一次門市打來說少一箱高麗菜，我查了發現是我分到別家，就直接打給門市道歉，再請司機補送。', ev: 1 } },
      },
    },
    answers: {
      logi1_t1: { a: '我們是紙本單，沒貨的話我會找組長。系統的話……我應該會先找附近，再回報。', ev: 0 },
      logi1_t2: { a: '生鮮都要先出舊的，我們看進貨日期。效期的話應該也是先到期的先出。', ev: 1 },
      logi1_s1: { a: '我會直接去支援，問組長哪一區最慢。生鮮倉常常這樣，大家都會互相幫。', ev: 2 },
      logi1_s2: { a: '我會叫他補刷。我自己也常出錯，所以知道漏一步後面很麻煩。', ev: 1 },
    },
    traits: [
      { id: 'careless', name: '細節粗心', desc: '揀貨錯誤率偏高，上個月 1.5% 被組長約談。', positive: false },
      { id: 'cover', name: '主動補位', desc: '爆量時主動支援其他區，並協助新人核對。', positive: true },
    ],
    asks: ['overtime', 'training'],
  },

  // --- Direct, nohire: experienced but clashes with lead and hides damage ---
  {
    id: 'logi1_c10',
    name: '蕭宥辰',
    sprite: 'm_young_jacket',
    archetype: 'direct',
    resume: {
      headline: '倉儲理貨員・5 年經驗',
      education: '私立高職 汽車科',
      experience: ['2021/09 至 2026/08　永泰物流中心　理貨組資深作業員'],
      skills: ['堆高機證照', '卸櫃', '棧板堆疊', 'WMS'],
      note: '五年資歷，熟悉卸櫃與出貨',
    },
    truth: { professional: 3, teamwork: 1, integrity: 1 },
    fit: 'nohire',
    profile: '作業經驗豐富，卸櫃、堆高機都很熟練；但與新任組長多次衝突後離職，也承認會把壓壞的外箱換掉不回報，誠信與團隊合作都有問題。',
    intro: '我是蕭宥辰，在永泰物流做了五年理貨，卸櫃、開堆高機、出貨我都會。我做事很快，很多新人都是我在帶。',
    motive: {
      whyus: { a: '順嶺規模大，我想說五年經驗應該可以發揮，也看看有沒有機會升組長。', ev: 0 },
      leave: {
        a: '做五年了，想換個環境。', ev: 0, vague: true,
        hint: '五年資歷突然離職，原因說得很短，可以請他多說一點。',
        p: { more: { a: '新來的組長很愛管，我做法跟他不一樣他就要我照他的，吵了幾次，後來我就不幹了。', ev: -1, need: 35, reveal: 'conflict', react: '他本來就很機車。' } },
      },
      salary: { a: '我之前 4 萬，希望至少 4 萬 2，我經驗比較多。', ev: 0 },
    },
    stories: {
      professional: {
        a: '一個 40 呎櫃我跟搭檔兩個人一個半小時就能卸完，還要邊卸邊分品項上棧板。', ev: 2,
        p: { result: { a: '我們那組卸櫃效率是全中心最快的，主管排急櫃都找我們。', ev: 1 } },
      },
      teamwork: {
        a: '我會帶新人，但我脾氣比較急，做不好我會直接罵。', ev: 0,
        p: { more: { a: '有新人被我罵哭過，組長叫我收斂，我覺得他自己也不會帶。', ev: -2 } },
      },
      integrity: {
        a: '貨難免會撞到，我都會處理好，不會讓客戶收到爛箱子。', ev: 1, vague: true,
        hint: '「處理好」很模糊，追問他個人具體怎麼處理。',
        p: {
          role: { a: '就是外箱壓壞的話，我拿空箱換掉重新封好，裡面沒破就不用報了，報了還要寫一堆單子。', ev: -2, reveal: 'hide', react: '大家都這樣啊。' },
        },
      },
    },
    answers: {
      logi1_t1: { a: '先找旁邊，沒有的話我通常知道貨會被放在哪，直接去拿就好，不用等庫控。', ev: 0,
        p: { more: { a: '回報的話……忙的時候就先不報，晚點再說。', ev: -1 } } },
      logi1_t2: { a: '先到期先出，這個大家都知道。', ev: 1 },
      logi1_s1: { a: '那要看組長怎麼排，他沒叫我我就做我的補貨。', ev: -1 },
      logi1_s2: { a: '我會叫他刷，但說真的大家都在趕，偶爾一次沒差。', ev: -1 },
    },
    traits: [
      { id: 'conflict', name: '與前主管衝突', desc: '與新任組長多次爭吵後離職。', positive: false },
      { id: 'hide', name: '隱匿貨損', desc: '外箱壓壞時私下換箱，不依規定通報貨損。', positive: false },
    ],
    asks: ['growth', 'overtime'],
  },
]);
