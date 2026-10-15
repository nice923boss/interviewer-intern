var TII = globalThis.TII;

TII.addCandidates('logi-2', [
  // --- Polished, maybe: inflated routing-system claim, blames drivers ---
  {
    id: 'logi2_c1',
    name: '鄭冠廷',
    sprite: 'm_mid_shirt',
    archetype: 'polished',
    resume: {
      headline: '物流調度・5 年經驗',
      education: '私立大學 運輸與物流管理學系',
      experience: ['2022/04 至今　捷順宅配　調度專員', '2021/03 至 2022/03　大鴻貨運　調度助理'],
      skills: ['TMS', '路線規劃', 'Excel', '車隊管理'],
      note: '自述：主導路線優化系統導入，油耗降低 15%',
    },
    truth: { problem: 2, communication: 2, pressure: 1 },
    fit: 'maybe',
    profile: '調度流程熟練、表達流暢，但「主導路線優化系統」實際由 IT 與顧問導入，他只整理地址資料；急單爆量時把件數全塞給同一位司機，延誤後又推給司機，抗壓不足。',
    intro: '您好，我是鄭冠廷，在捷順宅配擔任調度專員，主導過路線優化系統導入，讓車隊油耗降低 15%。我很擅長在有限車輛下排出最有效率的車趟，希望在速航發揮。',
    motive: {
      whyus: { a: '速航的北區網路很完整，B2B 和宅配都有，我想把系統化調度的經驗帶過來。', ev: 0 },
      leave: {
        a: '捷順的調度流程已經很成熟，我想找更有挑戰的環境。', ev: 0, vague: true,
        p: { more: { a: '另外公司要把調度集中到中部，北區只留一個人，我覺得發展有限。', ev: 0 } },
      },
      salary: { a: '目前月薪 4 萬 6，希望 5 萬 2 左右。', ev: 0 },
    },
    stories: {
      problem: {
        a: '我主導導入路線優化系統，車趟從人工排改成系統排，油耗降了 15%，每天少派兩台車。', ev: 2, vague: true,
        hint: '「主導」和「15%」都很亮眼，但個人角色還沒釐清。',
        p: {
          role: { a: '系統是 IT 部和顧問公司導入的……我主要是把司機回報的地址錯誤整理成 Excel，讓他們修地址庫。', ev: -1, need: 50, reveal: 'inflate', react: '這個講太細了吧……' },
          result: { a: '油耗是整個北區的數字，那一季剛好也汰換了四台新車。', ev: -1 },
        },
      },
      communication: {
        a: '我跟司機關係不錯，有問題大家會直接講。', ev: 1,
        p: { more: { a: '有司機嫌件數多，我會跟他說系統排的我也沒辦法，叫他先跑，有問題再說。', ev: -1 } },
      },
      pressure: {
        a: '急單一來我會馬上重排，盡量都塞得進去，客戶要的我們一定送到。', ev: 1, vague: true,
        p: {
          more: { a: '有一次年貨季急單太多，我全塞給同一條線的司機，他跑不完，延誤三十幾件。客戶投訴時我說是司機太慢。', ev: -2, need: 50, reveal: 'blame', react: '那個司機真的比較慢……' },
        },
      },
    },
    answers: {
      logi2_t1: { a: '我會看配送點分布、時窗、車型載重和材積，系統排完再依司機熟悉的區域微調。', ev: 1,
        p: { more: { a: '例如有收貨時段限制的大賣場要排第一趟，不然進不了卸貨區。', ev: 1 } } },
      logi2_t2: { a: '我會先拉 TMS 的延誤報表，看哪幾條路線、哪幾位司機延誤比較多，再跟他們談。', ev: 1 },
      logi2_s1: { a: '我會先請他冷靜，跟他說路線是系統排的，有問題我們會後再討論。', ev: 0,
        p: { reflect: { a: '其實當下應該先聽他說哪裡繞，他跑那區比系統熟。', ev: 1 } } },
      logi2_s2: { a: '我會看哪台冷藏車最近，請司機回頭來載，其他件晚一點送。', ev: 0,
        p: { more: { a: '晚送的客戶……就等他們打來再處理。', ev: -1 } } },
    },
    traits: [
      { id: 'inflate', name: '履歷灌水', desc: '「主導路線優化系統」實際由 IT 與顧問導入，本人只整理地址錯誤資料。', positive: false },
      { id: 'blame', name: '推卸責任', desc: '急單全塞給單一路線導致延誤，客訴時把責任推給司機。', positive: false },
    ],
    asks: ['growth', 'overtime'],
  },

  // --- Humble, hire: cold-chain dispatcher who saved a broken-down reefer run ---
  {
    id: 'logi2_c2',
    name: '朱姿穎',
    sprite: 'f_young_suit',
    archetype: 'humble',
    resume: {
      headline: '冷鏈調度・3 年經驗',
      education: '國立科技大學 運籌管理系',
      experience: ['2023/08 至今　寒川低溫物流　調度專員'],
      skills: ['TMS', '溫度監控系統', '冷藏冷凍車調度', 'Excel'],
      note: '負責北區低溫車隊調度',
    },
    truth: { problem: 3, communication: 2, pressure: 3 },
    fit: 'hire',
    profile: '說話保守、不太會推銷自己，但冷鏈調度扎實：冷凍車故障時 40 分鐘內調來備援車轉貨，溫度全程未失控；雙溫層併車每天少派一台車。溝通符合期待，面對業務加單較少拒絕。',
    intro: '您好，我是朱姿穎，在寒川低溫物流做調度三年，主要排冷藏冷凍車。平常就是盯車、盯溫度，沒什麼特別的。',
    motive: {
      whyus: { a: '速航有常溫也有低溫配送，我想學混溫的調度，也想多接觸 B2B 客戶。', ev: 1 },
      leave: { a: '寒川的車隊規模比較小，我想學更多車型和路線的排法。', ev: 1 },
      salary: { a: '我現在 4 萬 2，希望 4 萬 5 左右，可以再討論。', ev: 0 },
    },
    stories: {
      problem: {
        a: '排車的時候我會先看溫層，再看時窗，差不多是這樣。', ev: 0, vague: true,
        p: { result: { a: '我把冷凍和冷藏能併車的路線重新整理，用雙溫層車一趟送，北區每天少派一台車，一個月省了大概六萬。', ev: 2 } },
      },
      communication: {
        a: '司機有問題都會來找我，我盡量幫他們解決。', ev: 0, vague: true,
        p: { role: { a: '我會在收班前跟司機確認隔天的特殊收貨要求，寫在派車單上。不過業務一直加單時，我比較不會拒絕。', ev: 1 } },
      },
      pressure: {
        a: '有一次冷凍車在高速公路上壓縮機壞掉，那天有點手忙腳亂。', ev: 0, vague: true,
        hint: '她只說「手忙腳亂」，可以追問最後的結果。',
        p: {
          result: { a: '我四十分鐘內調了一台備援冷凍車到交流道轉貨，請客戶延後一小時收貨，溫度紀錄全程在零下 18 度以下，沒有退貨。', ev: 2, reveal: 'crisis', react: '那時候真的很緊張……' },
        },
      },
    },
    answers: {
      logi2_t1: { a: '先分溫層，再看收貨時窗和卸貨條件，例如有沒有尾門、能不能停車。最後看載重材積，讓每台車裝載率盡量到八成以上。', ev: 2 },
      logi2_t2: { a: '我會把延誤拆成出車晚、路上塞、卸貨等太久三種，看哪一段最多。之前就發現某家量販卸貨平均要等四十分鐘。', ev: 2 },
      logi2_s1: { a: '我會先請他到旁邊，聽他說哪一段繞路，他講得有道理的話，隔天就調整。', ev: 1 },
      logi2_s2: { a: '先確認急單的溫層和數量，再看 GPS 哪台冷藏車最近、還有空間，請司機繞回來。也會先跟原本的客戶說明可能延後的時間。', ev: 2 },
    },
    traits: [
      { id: 'crisis', name: '危機處理經驗', desc: '冷凍車故障時 40 分鐘內調度備援車轉貨，全程溫度未失控。', positive: true },
    ],
    asks: ['training', 'team'],
  },

  // --- Direct, hire: former truck driver, knows routes and drivers ---
  {
    id: 'logi2_c3',
    name: '楊秉翰',
    sprite: 'm_mid_polo',
    archetype: 'direct',
    resume: {
      headline: '物流調度・2 年經驗（前職業司機 8 年）',
      education: '私立高職 汽車修護科',
      experience: ['2024/09 至今　正大貨運　調度員', '2016/05 至 2024/08　正大貨運　職業大貨車司機'],
      skills: ['職業大貨車駕照', 'TMS', '北區路況', '車輛保養'],
      note: '司機轉調度',
    },
    truth: { problem: 3, communication: 2, pressure: 3 },
    fit: 'hire',
    profile: '講話直接，但跑了八年車，熟悉北區路況與卸貨點限制，排出的路線司機願意配合，急單處理穩。溝通有時太直，Excel 報表能力還在補強。',
    intro: '我是楊秉翰，開了八年大貨車，這兩年轉做調度。北區每個卸貨點長什麼樣子我大概都知道。我講話比較直，但排車很實在。',
    motive: {
      whyus: { a: '速航車隊大，路線也比較多元，我想學怎麼用系統排大量的點。', ev: 1 },
      leave: { a: '正大的調度只有我一個人，什麼都靠經驗，我想到有制度的公司學。', ev: 0 },
      salary: { a: '我現在 4 萬 5，希望 4 萬 8。', ev: 0 },
    },
    stories: {
      problem: {
        a: '有一條路線每次都延誤，系統算的時間不對。我開過那邊，知道下午學校放學會塞，就把那區改成早上送。', ev: 2,
        p: { result: { a: '那條線準時率從八成多拉到 98%，司機也不用每天被客戶罵。', ev: 2 } },
      },
      communication: {
        a: '司機不爽我不會跟他硬碰，我自己開過車，知道他們在氣什麼。', ev: 1, vague: true,
        p: {
          role: { a: '新司機我會先跟車一天，告訴他哪裡能停、哪個警衛要先打招呼。老司機排到重的線，我會先打電話說原因，不會只丟派車單。', ev: 2, need: 50, reveal: 'cross', react: '開過車就知道啦。' },
        },
      },
      pressure: {
        a: '急單我習慣了，以前當司機就常被叫回去載。', ev: 1,
        p: { more: { a: '我會先問急單能不能拆兩批，一部分用附近回程的空車帶，不一定要整台車回頭。', ev: 2 } },
      },
    },
    answers: {
      logi2_t1: { a: '點的分布、時窗、車子大小，還有卸貨點限制，像有些地方大車進不去、有些要預約卸貨。系統排完我一定會再看一遍。', ev: 2 },
      logi2_t2: { a: '我會先看是哪幾條線掉，再打給那幾個司機問。很多原因系統看不到，像修路或客戶換了收貨時間。', ev: 1,
        p: { more: { a: '數字的部分我會請助理拉報表，Excel 樞紐分析我還在學。', ev: 0 } } },
      logi2_s1: { a: '大家面前吵沒意思，我會叫他先出車，回來請他喝飲料，聽他說哪裡繞。有道理我就改。', ev: 1 },
      logi2_s2: { a: '先看有沒有冷藏車在附近剛卸完，用回程車去載。沒有的話就問客戶能不能晚兩小時，或是叫外車。', ev: 2 },
    },
    traits: [
      { id: 'cross', name: '跨域經驗', desc: '開過八年大貨車，熟悉路況與司機處境，司機願意配合他的排程。', positive: true },
    ],
    asks: ['training', 'overtime'],
  },

  // --- Nervous, hire: analyst who found unloading wait as the delay cause ---
  {
    id: 'logi2_c4',
    name: '謝映彤',
    sprite: 'f_young_casual',
    archetype: 'nervous',
    resume: {
      headline: '調度助理・2 年經驗',
      education: '國立大學 交通管理學系',
      experience: ['2024/07 至今　雲途電商物流　調度助理'],
      skills: ['Excel 樞紐分析', 'TMS', 'Power BI', '到貨時效報表'],
      note: '負責到貨時效報表',
    },
    truth: { problem: 3, communication: 3, pressure: 2 },
    fit: 'hire',
    profile: '面試很緊張，但分析能力強：用簽收資料找出卸貨等待是延誤主因，協調客戶改時段後準時率回到 98%；整理司機常見問題，溝通細心。壓力下會先慌一下，但能完成。',
    intro: '您、您好，我是謝映彤，在雲途電商物流當調度助理兩年，主要做……到貨時效的報表，也會幫忙排車。',
    motive: {
      whyus: { a: '我想從助理升成正式調度，自己負責一個區。速航的職缺剛好是北區。', ev: 1 },
      leave: { a: '雲途的調度主管很資深，短期內……應該沒有升職的機會。', ev: 0 },
      salary: { a: '我現在 3 萬 8……希望 4 萬 2 左右。', ev: 0 },
    },
    stories: {
      problem: {
        a: '我有做過一個延誤的分析……後來準時率有比較好。', ev: 0, vague: true,
        hint: '「比較好」很模糊，可以追問具體結果。',
        p: {
          result: { a: '我把三個月的簽收時間拆開看，發現一家家電賣場平均要等 35 分鐘才能卸貨。協調改成早上七點送之後，那條線準時率從 89% 回到 98%。', ev: 2, need: 50, reveal: 'data', react: '我、我只是有算一下……' },
        },
      },
      communication: {
        a: '司機打來的時候……我會先記下來，再問主管。', ev: 0, vague: true,
        p: { more: { a: '後來我整理了一份常見問題，像地址找不到、收貨人不在怎麼處理，放在司機群組，打來的電話少了一半。', ev: 2 } },
      },
      pressure: {
        a: '月底爆量的時候，我、我會先列出要處理的事情。', ev: 0,
        p: { more: { a: '有一次系統當機，我把當天的單匯出成 Excel，手動排了四十幾個點，車晚半小時出發，但當天都送完了。', ev: 1 } },
      },
    },
    answers: {
      logi2_t1: { a: '時窗、溫層、車的載重跟材積……還有司機的工時上限，不能排超過。', ev: 1 },
      logi2_t2: { a: '我會把延誤拆成出車延遲、路上、卸貨等待三段，再用樞紐分析看哪個客戶、哪個時段最多。', ev: 2 },
      logi2_s1: { a: '我……會先讓他講完，再拿系統的里程跟件數給他看，真的不合理就調。', ev: 1 },
      logi2_s2: { a: '先、先看 GPS 哪台冷藏車最近、還有沒有空間，再打給司機。然後請客服先通知原本的客戶可能會晚。', ev: 1 },
    },
    traits: [
      { id: 'data', name: '數據敏感', desc: '用簽收資料找出卸貨等待為延誤主因，協調改時段後準時率回到 98%。', positive: true },
    ],
    asks: ['growth', 'training'],
  },

  // --- Polished, nohire: job hopper who hides delays from clients ---
  {
    id: 'logi2_c5',
    name: '杜威廷',
    sprite: 'm_young_stripe',
    archetype: 'polished',
    resume: {
      headline: '物流調度・3 年經驗',
      education: '私立大學 企業管理學系',
      experience: ['2025/11 至今　飛馳快遞　調度專員', '2025/02 至 2025/10　捷運通物流　調度專員', '2023/09 至 2025/01　佳運貨運　業務專員'],
      skills: ['TMS', '客戶溝通', '路線規劃'],
      note: '自述：負責 30 台車調度，到貨準時率 99%',
    },
    truth: { problem: 1, communication: 2, pressure: 1 },
    fit: 'nohire',
    profile: '口才好，但調度經驗實際不到兩年，一年多換了兩家；「30 台車、準時率 99%」是整組數字。延誤時習慣不通知客戶，甚至用藉口搪塞，問題解決與抗壓都不足。',
    intro: '您好，我是杜威廷，目前在飛馳快遞擔任調度專員，負責 30 台車的調度，到貨準時率維持 99%。我也做過業務，很懂客戶要什麼，希望在速航發揮。',
    motive: {
      whyus: { a: '速航是業界的領導品牌，我覺得在這裡可以學到最好的調度制度。', ev: 0 },
      leave: {
        a: '飛馳的發展比較受限，我希望找更大的舞台。', ev: 0, vague: true,
        p: { more: { a: '……其實我在飛馳還不到一年，上一家也只待八個月。兩家都是覺得跟想像的不一樣。', ev: -1, need: 50, reveal: 'hop', react: '每家都不太適合嘛……' } },
      },
      salary: { a: '我現在 4 萬 3，希望 4 萬 8 到 5 萬。', ev: 0 },
    },
    stories: {
      problem: {
        a: '我負責 30 台車，到貨準時率 99%，在公司是數一數二的。', ev: 2, vague: true,
        hint: '99% 是怎麼算的？他個人負責多少？',
        p: { role: { a: '30 台車是整組的，我們有三個調度，我負責其中十台左右。99% 是公司對外公告的數字。', ev: -1 } },
      },
      communication: {
        a: '我做過業務，跟客戶講話很有一套，客戶都很喜歡我。', ev: 1,
        p: { more: { a: '客戶問到貨時間，我都說「今天一定到」，先讓他安心比較重要。', ev: -1 } },
      },
      pressure: {
        a: '延誤是難免的，我會盡量處理，客戶那邊我很會安撫。', ev: 1, vague: true,
        p: { role: { a: '老實說，有延誤的話我通常先不講，等客戶打來再說明，講太早他們只會一直催。', ev: -2, reveal: 'hidebad', react: '先講只會被罵啊。' } },
      },
    },
    answers: {
      logi2_t1: { a: '我會用 TMS 的自動排車，系統會算出最佳路線，再參考司機的意見。', ev: 0,
        p: { more: { a: '時窗的話……系統應該都有設定好了。', ev: -1 } } },
      logi2_t2: { a: '我會開會檢討，請司機加快速度，也會提醒客服多跟客戶溝通。', ev: -1 },
      logi2_s1: { a: '我會跟他說大家都很辛苦，請他先跑，有問題我再幫他跟主管反應。', ev: 0 },
      logi2_s2: { a: '我會先答應客戶，再想辦法叫一台車回來。客戶最重要。', ev: 0,
        p: { more: { a: '真的排不進去的話……就隔天一早送，再跟客戶說是車子出狀況。', ev: -2 } } },
    },
    traits: [
      { id: 'hop', name: '頻繁跳槽', desc: '一年多內換了兩家調度工作，每家都不到一年。', positive: false },
      { id: 'hidebad', name: '報喜不報憂', desc: '延誤時習慣不主動通知客戶，等客戶打來才說明。', positive: false },
    ],
    asks: ['salaryrange', 'growth'],
  },

  // --- Direct, maybe: veteran crisis handler, no TMS, harsh with drivers ---
  {
    id: 'logi2_c6',
    name: '吳芷瑜',
    sprite: 'f_mid_glasses',
    archetype: 'direct',
    resume: {
      headline: '貨運調度・10 年經驗',
      education: '私立專科 國際貿易科',
      experience: ['2016/03 至今　興隆貨運行　調度主任'],
      skills: ['車趟安排', '司機管理', '電話派車', '外車調度'],
      note: '管理 15 台車',
    },
    truth: { problem: 2, communication: 1, pressure: 3 },
    fit: 'maybe',
    profile: '抗壓極強、急單與颱風天調度經驗豐富；但原公司靠白板與電話派車，沒用過 TMS，數據分析弱；常當眾斥責司機，溝通是明顯短板。',
    intro: '我是吳芷瑜，在興隆貨運行做調度十年，15 台車都是我在排。急單、塞車、司機臨時請假，什麼狀況我都遇過。',
    motive: {
      whyus: { a: '我想找有規模的物流公司，速航的調度缺最符合我的經驗。', ev: 0 },
      leave: { a: '老闆準備退休，貨運行年底要收掉。', ev: 0 },
      salary: { a: '我現在 4 萬 8，希望至少 5 萬。', ev: 0 },
    },
    stories: {
      problem: {
        a: '車不夠的時候我就打電話調外車，一通電話就能叫到，十年累積的人脈。', ev: 1, vague: true,
        p: { more: { a: '排車都是看白板，誰在哪我腦袋都記得。電腦系統我們沒有用，TMS 我只有聽過。', ev: -1, reveal: 'outdated', react: '白板很好用啊。' } },
      },
      communication: {
        a: '我對司機很直接，該講就講，這樣效率最好。', ev: 0, vague: true,
        hint: '「直接」可能有兩面，可以請她多說具體情況。',
        p: {
          more: { a: '司機遲到或送錯，我會在調度室當場罵，大家都怕我。上一個新司機做不到一個月就走了，說受不了我。', ev: -2, need: 50, reveal: 'harsh', react: '我是為他好啊。' },
        },
      },
      pressure: {
        a: '最誇張一次是颱風天，八台車卡在路上，客戶一直打來，我一個人接電話、改路線、叫外車，撐到半夜。', ev: 2,
        p: { result: { a: '那天 120 張單只有 6 張隔天送，客戶後來還送水果來謝謝我們。', ev: 2 } },
      },
    },
    answers: {
      logi2_t1: { a: '看點在哪、車多大、司機熟哪一區。哪些點要早上送我都記得，不用看。', ev: 1 },
      logi2_t2: { a: '直接問司機啊，他們最清楚。誰常常遲到我就盯誰。', ev: 0,
        p: { more: { a: '報表的話……我們以前沒在算準時率，都是客戶抱怨才知道。', ev: -1 } } },
      logi2_s1: { a: '我會叫他閉嘴先出車，路線我排的，有意見下班再說。', ev: -2,
        p: { reflect: { a: '嗯……也許可以先聽他講，他如果真的繞路是我的問題。', ev: 0 } } },
      logi2_s2: { a: '馬上打給附近有冷藏車的同行借車，十年的交情，一定有人幫忙。同時跟原本的客戶說會晚一點。', ev: 2 },
    },
    traits: [
      { id: 'outdated', name: '技能過時', desc: '原公司靠白板與電話派車，沒用過 TMS 與 GPS 車機，數據分析弱。', positive: false },
      { id: 'harsh', name: '溝通強勢', desc: '常當眾斥責司機，曾有新司機因受不了而離職。', positive: false },
    ],
    asks: ['overtime', 'training'],
  },

  // --- Nervous, maybe: warehouse clerk switching over, self-taught tooling ---
  {
    id: 'logi2_c7',
    name: '翁士傑',
    sprite: 'm_young_curly',
    archetype: 'nervous',
    resume: {
      headline: '倉管人員・2 年經驗',
      education: '私立科技大學 資訊管理系',
      experience: ['2024/08 至今　康寶食品物流倉　倉管人員'],
      skills: ['WMS', 'Excel', 'Python 入門', '物流管理證照'],
      note: '自學路線規劃工具',
    },
    truth: { problem: 2, communication: 2, pressure: 1 },
    fit: 'maybe',
    profile: '倉管轉調度，經驗淺但自學能力強：自己寫小工具把出貨單轉成路線清單，替調度省時間；溝通符合期待。壓力下容易慌，代班調度時曾漏派一張單，抗壓不足。',
    intro: '您、您好，我是翁士傑，在康寶食品物流倉做倉管兩年。我……一直很想做調度，有自己學一些路線規劃的工具。',
    motive: {
      whyus: { a: '我、我想轉做調度，速航的職缺有寫會培訓，所以來試試看。', ev: 1 },
      leave: { a: '倉管做兩年了，我比較想做排車、規劃這種工作。', ev: 0 },
      salary: { a: '我現在 3 萬 6……希望 3 萬 8 到 4 萬。', ev: 0 },
    },
    stories: {
      problem: {
        a: '我有寫一個小工具……幫調度整理出貨單。', ev: 0, vague: true,
        hint: '「小工具」可能有實際成果，追問結果。',
        p: {
          result: { a: '用 Python 把每天的出貨單依行政區排好，再匯成路線清單。調度說他每天排車少花四十分鐘。', ev: 2, reveal: 'selflearn', react: '我、我只是自己學的……' },
        },
      },
      communication: {
        a: '我會跟司機確認裝車順序……就是後送的先上。', ev: 1,
        p: { more: { a: '有司機抱怨裝車太亂，我就在棧板貼上送貨順序號碼，後來他們都說比較好卸。', ev: 1 } },
      },
      pressure: {
        a: '有代班過調度一次……那天有點亂。', ev: 0, vague: true,
        p: { more: { a: '同時有三通電話進來，我、我手忙腳亂，有一張單漏派，隔天客戶投訴。後來我做了一張檢查表，代班時一定勾。', ev: -1 } },
      },
    },
    answers: {
      logi2_t1: { a: '要看……配送點的位置、收貨時間，還有車子載重。我還會注意後送的先上車。', ev: 1 },
      logi2_t2: { a: '我會先把延誤的單匯出來，看是哪幾個區、哪個時段，再去問司機。', ev: 1 },
      logi2_s1: { a: '我、我會先道歉，然後問他哪裡太遠……可能會請主管來幫忙。', ev: 0 },
      logi2_s2: { a: '我……會先問主管怎麼辦。然後看有沒有車可以回來。', ev: -1,
        p: { reflect: { a: '應該先自己查好哪台車最近、有沒有空間，帶著方案去問主管，比較快。', ev: 1 } } },
    },
    traits: [
      { id: 'selflearn', name: '自學能力強', desc: '自學 Python 寫出貨單轉路線清單工具，替調度每天省四十分鐘。', positive: true },
    ],
    asks: ['training', 'growth'],
  },

  // --- Polished, maybe: great client handler from ocean freight, new to trucking ---
  {
    id: 'logi2_c8',
    name: '許瑀彤',
    sprite: 'f_young_braid',
    archetype: 'polished',
    resume: {
      headline: '海運承攬客服・4 年經驗',
      education: '國立大學 航運管理學系',
      experience: ['2022/08 至今　遠望國際物流　海運客服專員'],
      skills: ['訂艙', '報關文件', '英文溝通', '客戶關係'],
      note: '想轉往國內配送調度',
    },
    truth: { problem: 2, communication: 3, pressure: 2 },
    fit: 'maybe',
    profile: '溝通能力優秀、處理客戶抱怨很有手法；但沒有國內配送調度經驗，對車趟、時窗不熟，問題解決與抗壓待觀察；薪資期待明顯高於職缺範圍。',
    intro: '您好，我是許瑀彤，在遠望國際物流做海運客服四年，每天處理訂艙、船期變動跟客戶抱怨。我很擅長在壓力下跟客戶溝通，想把這個能力帶到國內配送調度。',
    motive: {
      whyus: { a: '海運船期一延就是好幾天，我想做節奏更快、能直接看到成果的配送調度。', ev: 1 },
      leave: { a: '海運客服做久了比較像在轉達訊息，我想做能自己決定的工作。', ev: 1 },
      salary: {
        a: '我希望薪資能維持在現在的水準。', ev: 0, vague: true,
        p: { more: { a: '我現在含年終大概月薪 5 萬 2，希望不要低於 5 萬，畢竟我有四年經驗。', ev: -1, need: 50, reveal: 'pay', react: '這很合理吧？' } },
      },
    },
    stories: {
      problem: {
        a: '船期延誤時，我會幫客戶找替代方案，像改走空運或換船公司。', ev: 1,
        p: { role: { a: '替代方案通常是業務跟運價部門報價，我負責把選項整理給客戶，追他們回覆。', ev: 0 } },
      },
      communication: {
        a: '有一次客戶的貨被海關抽驗，延誤五天，他在電話裡大罵，我花了一個下午把他安撫下來。', ev: 2,
        p: { more: { a: '我每天固定兩次主動回報進度，把海關要的文件整理成清單給他，最後他續約，還指定要我服務。', ev: 2 } },
      },
      pressure: {
        a: '旺季的時候一天會接到上百通電話，我都能處理。', ev: 1, vague: true,
        hint: '「都能處理」有點籠統，可以請她多說具體作法。',
        p: { more: { a: '我會把客戶分成急跟不急，急的先回。不過要同時改很多東西時，我還是會先問主管。', ev: 0 } },
      },
    },
    answers: {
      logi2_t1: { a: '我會考慮客戶的重要程度和交期，重要客戶先送。', ev: 0, vague: true,
        p: { more: { a: '時窗跟車型……我還不太熟，國內配送我只在客戶端看過，沒有實際排過車。', ev: -1, reveal: 'newbie', react: '這個我會學的。' } } },
      logi2_t2: { a: '我會先跟客戶了解他們感受到的延誤，再回頭看是哪個環節出問題。', ev: 0 },
      logi2_s1: { a: '我會先讓他把情緒說完，再私下跟他談，給他台階下，路線的問題再一起看。', ev: 2 },
      logi2_s2: { a: '我會先跟客戶確認最晚能收貨的時間，爭取一點緩衝，再跟主管討論派車。', ev: 1 },
    },
    traits: [
      { id: 'newbie', name: '對產業不熟', desc: '沒有國內配送調度經驗，不熟車趟、時窗與車型安排。', positive: false },
      { id: 'pay', name: '薪資期待落差', desc: '期待月薪不低於 5 萬，明顯高於職缺範圍。', positive: false },
    ],
    asks: ['salaryrange', 'training'],
  },

  // --- Direct, nohire: owns a contracted truck, routes good jobs to it ---
  {
    id: 'logi2_c9',
    name: '方昆霖',
    sprite: 'm_mid_beard',
    archetype: 'direct',
    resume: {
      headline: '物流調度・7 年經驗',
      education: '私立高職 機械科',
      experience: ['2019/06 至今　宏昇物流　調度組長'],
      skills: ['TMS', '外車調度', '路線規劃', '車輛成本計算'],
      note: '管理 25 台承攬車',
    },
    truth: { problem: 2, communication: 2, pressure: 2 },
    fit: 'nohire',
    profile: '調度經驗豐富、熟悉外車與成本計算；但名下有一台車掛在公司跑，被新主管要求切割才離職，承認會把好跑的短程單排給自己的車，有利益衝突的誠信疑慮，不建議錄用。',
    intro: '我是方昆霖，在宏昇物流做調度七年，現在是調度組長，管 25 台承攬車。外車怎麼叫、成本怎麼算我都很熟。',
    motive: {
      whyus: { a: '速航規模大，自有車隊跟外車都有，我的經驗剛好用得上。', ev: 0 },
      leave: {
        a: '宏昇被併購，新主管要改制度，我覺得不適合。', ev: 0, vague: true,
        p: { more: { a: '新主管規定調度不能有自己的車在公司跑。我有一台車給朋友開，市區短程的單比較常排給他，就談不攏了。', ev: -2, need: 55, reveal: 'sidebiz', react: '這又沒什麼……' } },
      },
      salary: { a: '我現在 5 萬，希望 5 萬 2。', ev: 0 },
    },
    stories: {
      problem: {
        a: '外車成本我算得很精，一趟該多少錢我心裡有數，幫公司省很多。', ev: 1,
        p: { result: { a: '我接手後外車成本一年降了大概 8%，主要是把零散的單併車。', ev: 1 } },
      },
      communication: {
        a: '司機跟我都很熟，好跑的線、難跑的線，我會輪流排，大家才服氣。', ev: 1, vague: true,
        p: { more: { a: '有司機抱怨分配不公平，我就直接說不爽可以不要跑，承攬車很多人在排隊。', ev: -1 } },
      },
      pressure: {
        a: '急單我都能消化，外車隨叫隨到。', ev: 1,
        p: { more: { a: '去年中秋禮盒季一天多三百箱，我半天內調了六台外車，全部當天出完。', ev: 2 } },
      },
    },
    answers: {
      logi2_t1: { a: '點位分布、時窗、車型，還有成本。自有車先排滿，不夠再叫外車，外車按趟計價要算清楚。', ev: 2 },
      logi2_t2: { a: '看是自有車還是外車延誤比較多，外車的話就換一家。', ev: 0,
        p: { more: { a: '報表我會叫助理拉，我主要看結果。', ev: 0 } } },
      logi2_s1: { a: '我會直接跟他說，路線是公平輪的，不爽可以不要跑，後面很多人在排。', ev: -1 },
      logi2_s2: { a: '直接叫外車，冷藏外車我有好幾家配合的，一小時內就能到。', ev: 1 },
    },
    traits: [
      { id: 'sidebiz', name: '副業衝突', desc: '名下有承攬車在公司跑，常把好跑的短程單排給自己的車，有利益衝突。', positive: false },
    ],
    asks: ['salaryrange', 'evaluation'],
  },

  // --- Humble, nohire: admin support, never actually dispatched ---
  {
    id: 'logi2_c10',
    name: '顏琬婷',
    sprite: 'f_mid_short',
    archetype: 'humble',
    resume: {
      headline: '物流行政・6 年經驗',
      education: '私立專科 企業管理科',
      experience: ['2020/05 至今　昌和物流　調度行政專員'],
      skills: ['派車單作業', 'TMS 資料輸入', '文書處理'],
      note: '支援調度課日常作業',
    },
    truth: { problem: 1, communication: 1, pressure: 2 },
    fit: 'nohire',
    profile: '個性溫和、做事細心，但所謂調度經驗主要是派車單輸入與行政支援，沒有自己排過車；遇到狀況習慣等主管決定，與司機溝通也偏被動，問題解決與溝通都不足。',
    intro: '您好，我是顏琬婷，在昌和物流的調度課做行政六年，平常協助處理派車單跟系統資料。我做事蠻仔細的，希望有機會學習調度。',
    motive: {
      whyus: { a: '我在調度課待很久了，想試試看自己排車，速航有培訓制度。', ev: 0 },
      leave: { a: '昌和的調度課要縮編，行政的位置會合併。', ev: 0 },
      salary: { a: '我現在 3 萬 9，希望差不多就好。', ev: 0 },
    },
    stories: {
      problem: {
        a: '我們課上遇到車排不進去的時候，會一起想辦法。', ev: 0, vague: true,
        p: {
          role: { a: '其實排車都是課長排好，我負責把派車單輸入系統、印給司機。車排不進去的時候，我會去問課長。', ev: -1, need: 45, reveal: 'hollow', react: '我只是幫忙而已……' },
        },
      },
      communication: {
        a: '司機有問題打來，我都會幫忙轉給課長。', ev: 0, vague: true,
        hint: '都是轉給別人處理，可以請她多說自己怎麼回應。',
        p: {
          more: { a: '司機有時候口氣很差，我不太敢跟他們說什麼，就先記下來，等課長回來再說。', ev: -1, reveal: 'passive', react: '我比較不會吵架……' },
        },
      },
      pressure: {
        a: '月底很忙的時候，我會加班把派車單都輸入完，不會拖到隔天。', ev: 1,
        p: { result: { a: '六年來派車單很少輸入錯誤，課長說我是最仔細的。', ev: 1 } },
      },
    },
    answers: {
      logi2_t1: { a: '我看課長排車時，會看地址跟車子大小……其他的我還不太清楚。', ev: -1 },
      logi2_t2: { a: '我會先把延誤的單整理出來，交給主管看。', ev: 0 },
      logi2_s1: { a: '我、我可能會先請他等一下，去找主管來處理。', ev: -1 },
      logi2_s2: { a: '我會馬上跟主管報告，看主管怎麼安排。', ev: -1,
        p: { reflect: { a: '我應該可以先查一下哪台車還有空間……之前沒想過。', ev: 0 } } },
    },
    traits: [
      { id: 'hollow', name: '經驗名不符實', desc: '「調度經驗」實際是派車單輸入與行政支援，沒有自己排過車。', positive: false },
      { id: 'passive', name: '缺乏主見', desc: '遇到司機抱怨或突發狀況都等主管處理，不會自己提出方案。', positive: false },
    ],
    asks: ['training', 'team'],
  },
]);
