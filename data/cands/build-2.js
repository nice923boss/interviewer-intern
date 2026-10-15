var TII = globalThis.TII;

TII.addCandidates('build-2', [
  // --- Polished, nohire: department win rate claimed as his own, offers to bring old employer's price data ---
  {
    id: 'build2_c1',
    name: '郭浩宇',
    sprite: 'm_mid_glasses',
    archetype: 'polished',
    resume: {
      headline: '資深估算工程師・8 年經驗',
      education: '國立科技大學 營建工程系',
      experience: ['2020/04 至今　晉豐營造　估算部資深工程師', '2017/07 至 2020/03　晉豐營造　估算助理'],
      skills: ['PCCES', 'AutoCAD', 'Excel 單價分析'],
      note: '自述：主導公共工程投標估算，近三年得標率 40%',
    },
    truth: { professional: 2, problem: 1, communication: 2 },
    fit: 'nohire',
    profile: '簡報漂亮、自信滿滿，但「主導估算、得標率 40%」是部門整體成績，定價是經理，他負責詢價與彙整；還主動表示能帶前公司的單價資料庫過來，有誠信疑慮。數量計算有基礎，遇到問題習慣等主管決定。',
    intro: '您好，我是郭浩宇，在晉豐營造估算部八年，主導過多件公共工程投標估算，近三年得標率 40%。我對單價行情很熟，相信可以很快幫承岳提升得標率。',
    motive: {
      whyus: { a: '承岳這幾年公共工程接得很積極，我的估算經驗正好派得上用場。', ev: 1 },
      leave: { a: '晉豐這幾年轉向民間建案，公共工程標得少，我想繼續做公共工程。', ev: 0 },
      salary: { a: '我目前 6 萬 2，希望 7 萬，我帶來的資源應該值得這個價錢。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我在晉豐主導公共工程投標估算，近三年得標率 40%，像去年一件三億的國小校舍改建，就是我估的。', ev: 2, vague: true,
        hint: '「主導」和「40%」都沒交代個人角色。先讓他放鬆，再追問他實際負責哪一段。',
        guard: '我在估算部算是核心，很多案子都是我在跑。',
        p: {
          role: { a: '嗯……定價主要是經理在定，我負責詢價，再把各工項彙整成標單。40% 其實是部門的數字。', ev: -1, need: 50, reveal: 'credit', react: '我也有參與啊……' },
        },
      },
      problem: {
        a: '遇到問題我都會先跟主管報告，讓主管決定怎麼處理。', ev: 0, vague: true,
        p: {
          more: { a: '有次發現模板數量重複算，我報告經理，經理說來不及就照送，後來那案沒標到。', ev: -1 },
          reflect: { a: '現在想想，我可以先把差異算出來，帶著修正方案去找經理。', ev: 0 },
        },
      },
      communication: {
        a: '跟工地主任溝通我很有一套，數字攤開來講，大家就沒話說。', ev: 1,
        p: { more: { a: '不過有幾次主任覺得我們估太低，最後還是經理出面協調。', ev: 0 } },
      },
    },
    answers: {
      build2_t1: { a: '我會先算基礎、柱、梁、版、牆的混凝土，再依同樣構件算模板，鋼筋最後照配筋圖算，用檢核表打勾避免漏算。', ev: 1 },
      build2_t2: { a: '工料機分開拆，人工用工率乘日薪，材料用最新報價，機具算台班。鋼筋漲價就用物價指數調整。', ev: 1,
        guard: '詳細的做法，進來之後我可以再跟您分享。',
        p: { more: { a: '其實我手上有晉豐歷年的單價資料庫和廠商報價，來了可以直接用，省很多詢價時間。', ev: -2, need: 55, reveal: 'takedata', react: '大家都會帶一點吧？' } } },
      build2_s1: { a: '我會先跟主管報告，看主管要不要改。', ev: -1,
        p: { reflect: { a: '可能也要把差多少錢先算出來，主管比較好判斷。', ev: 0 } } },
      build2_s2: { a: '我會把計算式攤出來，讓工地主任跟監造各自看哪裡有意見。', ev: 1 },
    },
    traits: [
      { id: 'credit', name: '搶功', desc: '自稱主導估算、得標率 40%，實際定價是經理，他負責詢價與彙整，40% 是部門成績。', positive: false },
      { id: 'takedata', name: '帶走前公司資料', desc: '主動表示會帶前公司歷年單價資料庫與廠商報價過來使用，涉及營業秘密與誠信問題。', positive: false },
    ],
    asks: ['salaryrange', 'growth'],
  },

  // --- Humble, hire: the "price table she helped tidy" is the department's core template ---
  {
    id: 'build2_c2',
    name: '楊筠庭',
    sprite: 'f_mid_short',
    archetype: 'humble',
    resume: {
      headline: '估算工程師・10 年經驗',
      education: '國立大學 土木工程學系',
      experience: ['2016/07 至今　昱泰營造　估算部估算工程師'],
      skills: ['PCCES', 'Excel', '物價指數調整', '詢價比價'],
      note: '協助維護部門單價表',
    },
    truth: { professional: 3, problem: 3, communication: 2 },
    fit: 'hire',
    profile: '十年估算資歷，講話低調。「協助維護單價表」其實是她建立的單價分析範本，內建物價指數調整，報價時間少近一半；開標前抓出分包報價單位錯誤，對數字非常敏感。溝通符合期待，偶爾讓步太快。',
    intro: '您好，我是楊筠庭，在昱泰營造估算部做了十年，主要負責數量計算和單價分析，也有協助維護部門的單價表。希望能多參與公共工程投標。',
    motive: {
      whyus: { a: '承岳公共工程做得多，標案種類也比較廣，我想累積不同類型的估算經驗。', ev: 1 },
      leave: { a: '昱泰明年起估算改由總公司統一做，分公司估算部會縮編，我想找能繼續做完整估算的地方。', ev: 1 },
      salary: { a: '目前 6 萬 3，希望 6 萬 8 左右，可以再談。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我平常就是算數量、做單價分析，部門的單價表我有幫忙整理一下。', ev: 0, vague: true,
        hint: '她講得很保守，「幫忙整理」的單價表做到什麼程度？試著追問結果。',
        p: {
          result: { a: '後來部門所有標案都用我做的範本，鋼筋、水泥會依營造工程物價指數自動調整，報價時間少了快一半。', ev: 2, need: 45, reveal: 'hidden', react: '大家用得順就好。' },
          role: { a: '架構是我自己設計的，工料機分頁，每一項都連到詢價紀錄，誰改過都看得到。', ev: 1 },
        },
      },
      problem: {
        a: '有一次開標前一天，我覺得標單總價怪怪的，就重新核一次。', ev: 1, vague: true,
        p: {
          result: { a: '結果是分包報價的單位寫錯，把每平方公尺當成每公尺，差了六百多萬。改完隔天照常投標，最後也得標了。', ev: 2, reveal: 'datasense', react: '剛好有看到啦。' },
          reflect: { a: '後來我在範本加了單位檢核欄，單價偏離歷史均價三成以上就會標紅。', ev: 1 },
        },
      },
      communication: {
        a: '跟工地或監造有不同意見，我會把計算式寄給對方，請他們指出哪裡不一樣。', ev: 1,
        p: { more: { a: '不過遇到比較強勢的主任，我有時候讓步太快，這點我還在學。', ev: 0 } },
      },
    },
    answers: {
      build2_t1: { a: '先看結構總說明確認強度和保護層，再由下往上算基礎、柱、梁、版、牆的混凝土和模板，鋼筋最後照配筋圖算，每層用檢核表打勾。', ev: 2,
        p: { more: { a: '我也會用樓地板面積推算每平方公尺的鋼筋量和混凝土量，跟過去類似案子比，差太多就回頭查。', ev: 2 } } },
      build2_t2: { a: '人工用工率乘工資，材料含損耗率，機具算台班費。鋼筋大漲的話，報價要寫有效期限，合約爭取物價調整條款。', ev: 2 },
      build2_s1: { a: '我會馬上把正確數量和差額算出來，當天帶著修正後的標單去找主管，說明原因和影響，請主管重新簽核。', ev: 2 },
      build2_s2: { a: '我會請兩邊各提出計算依據，三方一起對圖說和現場量測紀錄，找出差在哪一項。', ev: 1 },
    },
    traits: [
      { id: 'hidden', name: '隱藏實力', desc: '低調說「幫忙整理」的單價表，其實是她設計的部門範本，內建物價指數調整，報價時間少近一半。', positive: true },
      { id: 'datasense', name: '數據敏感', desc: '開標前察覺總價異常，抓出分包報價單位錯誤，避免六百多萬的誤差。', positive: true },
    ],
    asks: ['team', 'training'],
  },

  // --- Nervous, maybe: very precise quantities, freezes when challenged ---
  {
    id: 'build2_c3',
    name: '朱偉倫',
    sprite: 'm_young_stripe',
    archetype: 'nervous',
    resume: {
      headline: '建築師事務所預算人員・4 年經驗',
      education: '國立科技大學 建築系',
      experience: ['2021/08 至今　安澄建築師事務所　預算編列人員'],
      skills: ['PCCES', 'AutoCAD', 'Excel'],
      note: '負責公共工程設計階段預算書編列',
    },
    truth: { professional: 3, problem: 2, communication: 1 },
    fit: 'maybe',
    profile: '數量計算非常精準，四年編二十多件預算書只被退修一次；但不擅溝通協調，遇到監造質疑就退縮，常請主持建築師出面。專業強，問題解決中等，溝通是明顯短板。',
    intro: '您、您好，我是朱偉倫，在建築師事務所做了四年預算編列，主要是公共工程設計階段的預算書。我、我想到營造廠，看看實際投標是怎麼做的。',
    motive: {
      whyus: { a: '事務所的預算是設計階段的，我、我想知道營造廠怎麼估，跟實際施工差多少。', ev: 1 },
      leave: { a: '事務所的案子大多是預算書，做久了流程都差不多，我想學投標估算。', ev: 0 },
      salary: { a: '我、我現在 4 萬 9，希望 5 萬 5……如果太高可以再談。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我負責的預算書，審查的時候……還算順利。', ev: 0, vague: true,
        hint: '他講得很含糊，「還算順利」是多順利？追問結果。',
        p: {
          result: { a: '這四年編了二十幾件，數量被審查委員退件修正的只有一件，而且差不到 1%。', ev: 2, reveal: 'precise', react: '那、那是應該的……' },
        },
      },
      problem: {
        a: '有次設計變更很晚才通知，我、我加班兩天重算。', ev: 1,
        p: { more: { a: '建築師改了樓梯位置，梁跟版都要重算，我把有變動的圖框出來一張一張比，最後趕上送審。', ev: 1 } },
      },
      communication: {
        a: '溝通的部分……我、我會盡量把資料準備好。', ev: 0, vague: true,
        p: {
          role: { a: '之前監造質疑我們的模板數量，我、我不知道怎麼回，都是請主持建築師去講……其實我的數字是對的。', ev: -1, need: 45, reveal: 'shy', react: '我、我比較不會講……' },
        },
      },
    },
    answers: {
      build2_t1: { a: '我、我會先確認結構總說明，基礎、柱、梁、版、牆依序算混凝土跟模板，鋼筋照配筋圖算搭接和彎鉤，每算完一層就跟樓板面積比一次。', ev: 2 },
      build2_t2: { a: '工、料、機分開，人工看工率，材料含損耗，機具算台班……鋼筋大漲的話，我、我在事務所是照物價指數更新。', ev: 1,
        p: { more: { a: '營造廠的詢價跟廠商談價我沒做過，這部分要學。', ev: 0 } } },
      build2_s1: { a: '我、我會趕快把正確的數量算出來，然後……跟主管講。', ev: 1,
        p: { more: { a: '我會把差多少噸、多少錢列成一張表，主管比較好決定要不要重簽。', ev: 1 } } },
      build2_s2: { a: '這個……我、我可能會先請主管一起去開會。', ev: -1, vague: true,
        hint: '他的第一反應是找主管出面。追問他自己會怎麼準備、怎麼說明。',
        p: { reflect: { a: '如果要我自己去……我、我會先把計算式和圖說位置整理好，可是要當場說服他們，我沒什麼把握。', ev: 0 } } },
    },
    traits: [
      { id: 'precise', name: '數量計算精準', desc: '四年編二十多件預算書，數量只被退件修正一次，誤差不到 1%。', positive: true },
      { id: 'shy', name: '不擅溝通協調', desc: '被監造質疑時不敢說明，都請主持建築師出面，即使自己的數字正確。', positive: false },
    ],
    asks: ['training', 'team'],
  },

  // --- Polished, maybe: knows how owners review, but outsourced the actual takeoffs ---
  {
    id: 'build2_c4',
    name: '丁曉薇',
    sprite: 'f_young_suit',
    archetype: 'polished',
    resume: {
      headline: '業主端成本控管・4 年經驗',
      education: '國立大學 土木工程學系',
      experience: ['2021/09 至今　千岫建設　成本控管專員'],
      skills: ['合約管理', '估驗計價審查', 'Excel'],
      note: '負責審查營造廠計價與變更設計追加減帳',
    },
    truth: { professional: 1, problem: 2, communication: 3 },
    fit: 'maybe',
    profile: '表達清楚、熟悉業主與監造的審查邏輯，談判與溝通強；但業主端的數量計算多委外給估算顧問，自己很少從圖說算整棟。專業硬底子不足，問題解決中等。',
    intro: '您好，我是丁曉薇，在千岫建設做了四年成本控管，負責審查營造廠的估驗計價和變更設計追加減帳。我很清楚業主在看什麼，相信能讓承岳的估算更貼近審查邏輯。',
    motive: {
      whyus: { a: '在業主端審了四年營造廠的帳，我想換到營造廠這一邊，從投標開始參與。', ev: 1 },
      leave: { a: '千岫最近兩年推案變少，成本部的工作多半是行政，我想回到技術面。', ev: 1 },
      salary: { a: '目前 5 萬 6，希望 6 萬 2。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我在千岫審過十幾個建案的計價和追加減帳，數量和單價有沒有灌水，我一看就知道。', ev: 2, vague: true,
        guard: '數量的部分，我們有一套很完整的審查流程。',
        p: {
          role: { a: '嗯……數量主要是委外的估算顧問算，我負責看差異、跟營造廠談，自己從圖說算整棟的經驗比較少。', ev: -1, need: 50, reveal: 'outsource', react: '業主端分工本來就這樣……' },
        },
      },
      problem: {
        a: '有次營造廠追加三千萬，我逐項核對，最後談到一千八百萬。', ev: 1,
        p: { more: { a: '很多是重複請款跟單價偏高，我請他們補詢價單，沒有依據的就不認。', ev: 1 } },
      },
      communication: {
        a: '我跟營造廠、建築師開協調會很多，習慣先把雙方的底線問清楚，再找中間值。', ev: 2,
        p: { result: { a: '那幾年千岫的變更設計爭議都沒有走到調解，好幾位營造廠主任也說跟我談比較好溝通。', ev: 2, reveal: 'ownerview', react: '這是我比較有把握的。' } },
      },
    },
    answers: {
      build2_t1: { a: '大概就是混凝土、模板、鋼筋分開算，再用軟體跑一次檢核。', ev: 0, vague: true,
        hint: '她講得很籠統，連順序和檢核方式都沒提。追問她實際怎麼算。',
        p: { more: { a: '細的計算我比較常看顧問的成果，自己算的話……我會從基礎開始，可能要花比較多時間。', ev: -1 } } },
      build2_t2: { a: '工料機拆開後，我會看哪一項偏離市場行情。鋼筋漲價的話，要看合約有沒有物價調整條款。', ev: 1 },
      build2_s1: { a: '我會立刻跟主管說明，寧可重簽也不要送錯的標單出去。', ev: 1 },
      build2_s2: { a: '我會先把三方的計算依據並排，找出差在哪一項，通常是計算範圍或界面認定不同，談清楚就能收斂。', ev: 2 },
    },
    traits: [
      { id: 'outsource', name: '數量多靠外包', desc: '業主端的數量計算多由委外顧問完成，她負責審差異與談判，自己從圖說算整棟的經驗少。', positive: false },
      { id: 'ownerview', name: '熟悉業主審查', desc: '熟悉業主與監造的審查邏輯，經手的變更設計爭議都在協調會內談妥。', positive: true },
    ],
    asks: ['growth', 'evaluation'],
  },

  // --- Direct, hire: six years on site before estimating, owns up to his own miss ---
  {
    id: 'build2_c5',
    name: '傅俊傑',
    sprite: 'm_mid_polo',
    archetype: 'direct',
    resume: {
      headline: '估算工程師・5 年（前工地工程師 6 年）',
      education: '私立科技大學 土木工程系',
      experience: ['2020/05 至今　崇和營造　估算工程師', '2014/07 至 2020/04　崇和營造　工地工程師'],
      skills: ['PCCES', '數量計算', '詢價比價', '施工排程'],
      note: '具 6 年工地現場經驗',
    },
    truth: { professional: 3, problem: 3, communication: 2 },
    fit: 'hire',
    profile: '六年工地加五年估算，估價會考慮施工分區與工法，跨域經驗明顯；得標後發現自己漏算，主動坦承並提出補救方案。專業與問題解決扎實，溝通偏直但有效。',
    intro: '您好，我是傅俊傑，前面六年在工地當工程師，後來轉到估算做了五年。我估價會想現場到底怎麼做，數字比較不會脫離實際。',
    motive: {
      whyus: { a: '承岳的公共工程規模比崇和大，我想試試看更大的標案。', ev: 1 },
      leave: { a: '崇和的估算部只有兩個人，大案子都外包給顧問公司，我想參與大型標案。', ev: 1 },
      salary: { a: '我現在 6 萬，希望 6 萬 6。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我估價時會想現場怎麼施工，像模板我會依施工分區算轉用次數，不是單純照面積算。', ev: 1,
        p: {
          result: { a: '去年一個地下三層的標案，我依開挖分區調整模板轉用和抽水費用，得標後實際成本只跟預算差 2%。', ev: 2, reveal: 'site', react: '工地待過才知道啦。' },
        },
      },
      problem: {
        a: '有一次得標後才發現我把一段擋土排樁漏算，我直接跟經理講。', ev: 1,
        p: {
          more: { a: '我把漏算金額和能吸收的方案列出來，跟工地一起改用比較省的支撐工法，最後成本控制在預算內。', ev: 2, need: 50, reveal: 'honest', react: '錯了就是要講。' },
        },
      },
      communication: {
        a: '我講話比較直，工地主任說數量不對，我就約他去現場一起量。', ev: 1,
        p: { reflect: { a: '不過我有時候講太衝，後來會先私下跟對方對過，再上會議。', ev: 1 } },
      },
    },
    answers: {
      build2_t1: { a: '先看結構總說明，從基礎往上算混凝土、模板，鋼筋照配筋圖算，搭接、彎鉤、損耗都要列。每層算完跟樓地板面積比單位用量。', ev: 2 },
      build2_t2: { a: '人工我用自己工地的實際工率，不只照手冊。材料加損耗，機具算台班和進出場費。鋼筋漲價就縮短報價效期，合約爭取物價調整。', ev: 2 },
      build2_s1: { a: '我會當天把正確數量和差額算好，直接去找主管說是我算錯，請他重簽。', ev: 2 },
      build2_s2: { a: '我會約主任和監造到現場，帶圖和量測紀錄，一項一項對到底差在哪。', ev: 1 },
    },
    traits: [
      { id: 'site', name: '跨域經驗', desc: '六年工地經驗讓他估價時考慮施工分區與工法，得標後實際成本與預算只差 2%。', positive: true },
      { id: 'honest', name: '誠實坦白', desc: '得標後發現自己漏算擋土排樁，主動向經理坦承並提出補救方案。', positive: true },
    ],
    asks: ['team', 'overtime'],
  },

  // --- Direct, nohire: four employers in four years, careless rebar takeoff ---
  {
    id: 'build2_c6',
    name: '傅欣妤',
    sprite: 'f_young_long',
    archetype: 'direct',
    resume: {
      headline: '估算工程師・4 年經驗',
      education: '私立大學 土木工程學系',
      experience: ['2025/02 至今　柏磊鋼構　估算工程師', '2024/01 至 2025/01　澤安營造　估算工程師', '2022/09 至 2023/12　昊宇營造　估算助理', '2021/07 至 2022/08　鼎恆工程顧問　工程助理'],
      skills: ['PCCES', 'Excel', 'AutoCAD'],
    },
    truth: { professional: 1, problem: 1, communication: 2 },
    fit: 'nohire',
    profile: '講話直接、自信，但四年換了四家公司，每家都不滿一年半，多半是不適應主管要求；數量計算細節粗心，漏算鋼筋搭接卻怪圖說不清楚。溝通尚可，專業與問題解決都不足。',
    intro: '您好，我是傅欣妤，做估算四年，待過顧問公司、營造廠和鋼構廠，接觸的工程類型很多元。我學東西很快，想找一個能長期發展的地方。',
    motive: {
      whyus: { a: '承岳是大公司，我想找一個可以待久一點的地方。', ev: 0 },
      leave: {
        a: '柏磊鋼構主要做鋼構件估價，跟我想做的建築估算不太一樣。', ev: 0, vague: true,
        guard: '每份工作都有學到東西，只是想找更適合的。',
        p: { more: { a: '其實……前幾家也都是覺得主管要求太細，改來改去，做不到一年多我就想換了。', ev: -2, need: 45, reveal: 'hopper', react: '每家都有原因啦。' } },
      },
      salary: { a: '目前 5 萬 2，希望 5 萬 8。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我算數量很快，一棟十二層的結構，三天就能算完。', ev: 1, vague: true,
        hint: '「三天算完」很快，但準不準？追問結果。',
        p: {
          result: { a: '……有一次鋼筋搭接長度漏算，整棟少了快 8%。不過那是因為圖說的搭接表寫得很不清楚。', ev: -2, reveal: 'careless', react: '圖說本來就很亂……' },
        },
      },
      problem: {
        a: '有問題我會先自己查，查不到再問。', ev: 0, vague: true,
        p: { more: { a: '例如報價單位不清楚，我就照我覺得對的單位先填，之後再改。', ev: -1 } },
      },
      communication: {
        a: '我跟工地溝通很直接，數字有問題當場講。', ev: 1,
        p: { more: { a: '有次監造說我追加算多了，我當場跟他吵起來，後來主管去道歉。', ev: -1 } },
      },
    },
    answers: {
      build2_t1: { a: '就混凝土、模板、鋼筋分開算，我習慣先算鋼筋，因為量最大。', ev: 0,
        p: { more: { a: '檢核的話……算完我會大概看一下總量合不合理。', ev: -1 } } },
      build2_t2: { a: '工料機拆開，材料去問廠商報價，人工照公司的單價表。', ev: 0,
        p: { more: { a: '鋼筋漲價就……更新報價吧，物調條款我比較少接觸。', ev: -1 } } },
      build2_s1: { a: '開標前兩天喔……我會先改標單，再跟主管說。', ev: -1,
        p: { reflect: { a: '嗯，應該要先跟主管說，因為已經簽核了。', ev: 0 } } },
      build2_s2: { a: '我會把計算式給兩邊看，叫他們自己對。', ev: 0 },
    },
    traits: [
      { id: 'hopper', name: '頻繁跳槽', desc: '四年換了四家公司，每家都不滿一年半，離職原因多是不適應主管要求。', positive: false },
      { id: 'careless', name: '細節粗心', desc: '曾漏算鋼筋搭接長度，整棟數量少近 8%，卻歸咎圖說不清楚。', positive: false },
    ],
    asks: ['flexible', 'growth'],
  },

  // --- Polished, maybe: BIM takeoff is fast, but misses what the model lacks; wants more pay ---
  {
    id: 'build2_c7',
    name: '薛奕辰',
    sprite: 'm_young_blazer',
    archetype: 'polished',
    resume: {
      headline: 'BIM 數量計算工程師・3 年經驗',
      education: '國立大學 土木工程學系 碩士',
      experience: ['2022/09 至今　鈞衡工程顧問　BIM 工程師（數量計算）'],
      skills: ['Revit', 'Dynamo', 'PCCES', 'Navisworks'],
      note: '以 BIM 模型自動產出數量，計算時間縮短 60%',
    },
    truth: { professional: 2, problem: 3, communication: 2 },
    fit: 'maybe',
    profile: 'BIM 自動算量和程式化比對很強，設計變更時效率高；但過度依賴模型，假設工程與雜項常漏算，人工檢核習慣弱。另一家公司開出 7 萬 5，薪資期待高於本職缺範圍。',
    intro: '您好，我是薛奕辰，在鈞衡工程顧問做 BIM 數量計算三年，用模型自動產出數量，計算時間縮短 60%。我希望把 BIM 算量帶進營造廠的投標流程。',
    motive: {
      whyus: { a: '承岳的投標估算還沒有導入 BIM，我覺得可以幫你們做出差異。', ev: 1 },
      leave: { a: '顧問公司做的是設計階段，我想參與真正的投標和成本決策。', ev: 1 },
      salary: {
        a: '我希望 7 萬左右。', ev: 0, vague: true,
        hint: '7 萬已超出這個職缺的範圍，期待是怎麼來的？氣氛放鬆後再多問一點。',
        p: { more: { a: '老實說，另一家建設公司已經開到 7 萬 5，如果差太多，我可能會選那邊。', ev: -1, need: 50, reveal: 'salarygap', react: '這也是很實際的考量。' } },
      },
    },
    stories: {
      professional: {
        a: '我建立了一套 Revit 算量流程，結構模型建完，混凝土、模板、鋼筋數量一鍵產出，計算時間縮短 60%。', ev: 2, vague: true,
        p: {
          role: { a: '模型裡有的構件很準，不過假設工程、施工架、臨時排水那些模型沒畫，我之前都沒算進去，被主管退過一次。', ev: -1, reveal: 'softdep', react: '那些本來就不在模型裡……' },
        },
      },
      problem: {
        a: '有個案子設計一直變更，每次重算都要兩天，我寫了 Dynamo 程式比對新舊模型的差異。', ev: 1,
        p: { result: { a: '變更後只要半天就能產出追加減數量表，那個案子改了七版都準時交。', ev: 2 } },
      },
      communication: {
        a: '我會把模型投影出來，讓工地或監造直接看構件，比看圖好溝通。', ev: 1,
        p: { more: { a: '不過有些資深主任不看模型，堅持要看手算式，我就比較難說服他們。', ev: 0 } },
      },
    },
    answers: {
      build2_t1: { a: '我會用 Revit 結構模型分類匯出混凝土、模板、鋼筋數量，再抽幾個構件手算驗證。', ev: 1,
        p: { more: { a: '鋼筋的話模型只建主要配筋，搭接和彎鉤要另外用 Dynamo 算，這部分還在調整。', ev: 0 } } },
      build2_t2: { a: '工料機拆開，人工照手冊工率，材料詢價，機具算台班。鋼筋漲價就更新單價表。', ev: 0, vague: true,
        p: { more: { a: '物價調整條款我比較不熟，顧問公司做的是預算書，不太碰合約。', ev: -1 } } },
      build2_s1: { a: '我會馬上用模型重新產一次數量，找出少算的原因，再跟主管報告並重新簽核。', ev: 1 },
      build2_s2: { a: '我會開模型給兩邊看追加的範圍，先確認大家對範圍的認定一致，再談數量。', ev: 1 },
    },
    traits: [
      { id: 'softdep', name: '過度依賴軟體', desc: '數量多靠 BIM 模型產出，模型以外的假設工程與雜項常漏算，人工檢核習慣弱。', positive: false },
      { id: 'salarygap', name: '薪資期待落差', desc: '另一家公司開出 7 萬 5，期待高於本職缺範圍，差太多可能不會接受。', positive: false },
    ],
    asks: ['salaryrange', 'growth'],
  },

  // --- Humble, hire: change-order specialist trusted by supervisors and agencies ---
  {
    id: 'build2_c8',
    name: '宋雅琪',
    sprite: 'f_mid_glasses',
    archetype: 'humble',
    resume: {
      headline: '契約變更與估算工程師・9 年經驗',
      education: '國立科技大學 營建工程系',
      experience: ['2016/08 至今　泓禾營造　工務部契約變更與估算工程師'],
      skills: ['PCCES', '契約變更', '結算', '估驗計價'],
      note: '負責公共工程變更設計與結算',
    },
    truth: { professional: 3, problem: 2, communication: 3 },
    fit: 'hire',
    profile: '九年公共工程變更設計與結算經驗，監造與機關都信任她的計算書；自己整理估算檢核清單並推廣到部門。溝通協調出色，問題解決符合期待。',
    intro: '您好，我是宋雅琪，在泓禾營造做了九年工務，主要負責公共工程的變更設計和結算。投標估算我也有支援，但比較多是在後段的追加減帳。',
    motive: {
      whyus: { a: '承岳的估算和契約管理在同一個部門，我想把前端投標和後端結算串起來做。', ev: 1 },
      leave: { a: '泓禾這幾年組織調整，我的工作被拆成三個人做，現在只負責結算文件，我想做完整一點。', ev: 1 },
      salary: { a: '目前 6 萬 5，希望 7 萬，可以討論。', ev: 0 },
    },
    stories: {
      professional: {
        a: '我主要做變更設計的追加減帳，數量、單價、計算書都要準備，再送機關審。', ev: 1,
        p: {
          role: { a: '我整理了一份估算檢核清單，從假設工程到雜項一百多項，新人照著打勾就不會漏，後來部門投標也用。', ev: 2, reveal: 'checklist', react: '就是怕漏算而已。' },
        },
      },
      problem: {
        a: '有一次機關審查卡了兩個月不給追加，我重新整理資料。', ev: 1, vague: true,
        p: { more: { a: '我把每一項變更對應到監造指示單和現場照片，重做成一張對照表，第二次送審就核定了。', ev: 1 } },
      },
      communication: {
        a: '跟監造溝通，我會先問他擔心什麼，通常是怕被審計挑。', ev: 1, vague: true,
        hint: '她只講了原則。追問結果，看看實際的溝通成效。',
        p: {
          result: { a: '後來好幾位監造跟我們主任說，我的計算書送來他們幾乎不用改，有兩個機關還指定要我出席結算會議。', ev: 2, need: 50, reveal: 'trust', react: '大家互相幫忙啦。' },
        },
      },
    },
    answers: {
      build2_t1: { a: '先確認結構總說明和圖說版本，再依基礎、柱、梁、版、牆算混凝土和模板，鋼筋照配筋圖含搭接和彎鉤，最後用檢核清單逐項打勾。', ev: 2 },
      build2_t2: { a: '人工照工率和當地工資，材料含損耗與運費，機具算台班。鋼筋大漲時，公共工程看契約物價調整條款，民間案就縮短報價效期。', ev: 2 },
      build2_s1: { a: '我會先把少算的鋼筋數量和金額算清楚，當天拿去跟主管說明，請他重新簽核，寧可加班也不要送錯。', ev: 1 },
      build2_s2: { a: '我會請工地和監造提出各自的計算式，三方一起對圖說、指示單和現場紀錄，先確認變更範圍，再談數量。', ev: 2 },
    },
    traits: [
      { id: 'checklist', name: '改善提案', desc: '自己整理一百多項的估算檢核清單，新人照表打勾不漏算，後來推廣到部門投標使用。', positive: true },
      { id: 'trust', name: '客戶口碑', desc: '監造與機關信任她的計算書，有機關指定她出席結算會議。', positive: true },
    ],
    asks: ['team', 'evaluation'],
  },

  // --- Nervous, nohire: career changer who only copies previous budgets ---
  {
    id: 'build2_c9',
    name: '梁家銘',
    sprite: 'm_young_tech',
    archetype: 'nervous',
    resume: {
      headline: '估算助理・半年經驗（轉職）',
      education: '私立大學 不動產經營學系',
      experience: ['2025/04 至今　睿杉建設　工務部估算助理', '2021/07 至 2024/12　樂居房屋　不動產經紀營業員'],
      skills: ['Excel', 'PCCES（課程結業）'],
      note: '營建估算實務班結業',
    },
    truth: { professional: 1, problem: 1, communication: 2 },
    fit: 'nohire',
    profile: '房仲轉職，上過估算課程，但只會複製前案預算改面積和單價，換一種結構形式就不知道怎麼調；對施工流程不熟，搞不清開挖與回填的順序。學習意願有，專業與問題解決都不足。',
    intro: '您、您好，我是梁家銘，之前做了三年多房仲，後來上估算課程轉職，現在在建設公司當估算助理半年。我、我很喜歡跟數字有關的工作。',
    motive: {
      whyus: { a: '營造廠的估算比較完整……我、我想學真正的投標。', ev: 0 },
      leave: { a: '建設公司的估算助理主要是整理資料，我、我想多學一點技術。', ev: 0 },
      salary: { a: '我、我現在 3 萬 8，希望 4 萬 5……', ev: 0 },
    },
    stories: {
      professional: {
        a: '我、我在睿杉負責估算，一個月可以做好幾個案子的預算。', ev: 1, vague: true,
        hint: '「好幾個案子」聽起來效率高，追問他在估算裡實際做了什麼。',
        p: {
          role: { a: '呃……其實是把前一個案子的預算表複製過來，改面積和單價……如果結構不一樣，我、我就不太知道要怎麼改。', ev: -2, reveal: 'template', react: '大、大家都這樣做吧……' },
        },
      },
      problem: {
        a: '遇到不會的，我、我會上網查，或問主管。', ev: 0, vague: true,
        p: { more: { a: '有次鋼構廠房的報價，我照 RC 的範本做，主管說整個要重來……', ev: -1 } },
      },
      communication: {
        a: '我做房仲很會跟客戶聊天，溝通應該沒問題。', ev: 1,
        p: { more: { a: '不過跟工地的師傅講話……他們講的術語我、我常聽不懂。', ev: -1 } },
      },
    },
    answers: {
      build2_t1: { a: '先算混凝土……再算模板，鋼筋……鋼筋我比較不熟，都是主管在算。', ev: -1,
        p: { result: { a: '之前我把開挖跟回填的順序搞反，土方數量也算錯，主、主管說我對施工流程不熟……', ev: -2, reveal: 'newbie', react: '我、我會再加強……' } } },
      build2_t2: { a: '單價分析……我、我會用 PCCES 裡面的資料庫。', ev: 0, vague: true,
        p: { more: { a: '工、料、機要怎麼拆，我、我是照課程講義的範例，實際上……還不太會調。', ev: -1 } } },
      build2_s1: { a: '我、我會趕快告訴主管，請他決定。', ev: 0 },
      build2_s2: { a: '我、我會……把兩邊的數字都記下來，請主管處理。', ev: -1 },
    },
    traits: [
      { id: 'template', name: '只會套範本', desc: '估算多是複製前案預算改面積與單價，結構形式不同就不知道怎麼調整。', positive: false },
      { id: 'newbie', name: '對產業不熟', desc: '分不清開挖與回填等施工順序，對營建流程與工項關係不熟。', positive: false },
    ],
    asks: ['training', 'evaluation'],
  },

  // --- Humble, maybe: strong in a crisis, but tools and price data are out of date ---
  {
    id: 'build2_c10',
    name: '蔡慧敏',
    sprite: 'f_mid_cardigan',
    archetype: 'humble',
    resume: {
      headline: '估算工程師・12 年經驗',
      education: '國立科技大學 土木工程系',
      experience: ['2012/07 至 2024/05　崴林工程顧問　估算工程師'],
      skills: ['Excel 單價分析', '數量計算', '公共工程預算書'],
      note: '2024/06 起自由接案',
    },
    truth: { professional: 2, problem: 3, communication: 2 },
    fit: 'maybe',
    profile: '十二年估算經驗，颱風後兩週內完成十二所學校搶修工程的估價，危機處理強；但離開顧問公司一年多，沒用過新版 PCCES，也沒追最新價格資料，工具與行情需要補。溝通平實。',
    intro: '您好，我是蔡慧敏，在工程顧問公司做了十二年估算，前公司被併購後，我這一年多自己接一些裝修報價。希望能回到營造廠，重新做投標估算。',
    motive: {
      whyus: { a: '承岳公共工程多，跟我以前做的類型很接近，我想回到熟悉的領域。', ev: 1 },
      leave: { a: '崴林被大型顧問公司併購，估算部整併到總部，我的職位就沒有了。', ev: 0 },
      salary: { a: '我之前 6 萬，希望 5 萬 8 到 6 萬，我知道中間空了一段。', ev: 0 },
      gap: {
        a: '那一年多我幫朋友的室內裝修公司做報價，算是自由接案。', ev: 0, vague: true,
        p: { more: { a: '案子都是小坪數的裝修，量不大。我也想過要不要轉行，後來還是覺得估算最適合我。', ev: 0 } },
      },
    },
    stories: {
      professional: {
        a: '我在崴林做了很多公共工程預算，道路、排水、校舍都有。', ev: 1,
        p: { more: { a: '後期主要做校舍耐震補強，補強工項的單價分析大多是我建的。', ev: 1 } },
      },
      problem: {
        a: '有一次颱風後縣政府要緊急搶修，時間很趕，我們部門一起趕出來。', ev: 0, vague: true,
        hint: '「部門一起趕」看不出她的角色。追問結果，看看她做了什麼。',
        p: {
          result: { a: '是十二所學校的屋頂和圍牆搶修，我兩週內跑完現勘、算完數量、做好單價分析，隔週就發包，沒有一所學校延後開學。', ev: 2, need: 45, reveal: 'crisis', react: '那時候大家都很拚。' },
        },
      },
      communication: {
        a: '我跟機關承辦溝通還算順，會先把他們要的格式問清楚。', ev: 1,
        p: { more: { a: '不過遇到比較強勢的廠商，我就比較不會爭。', ev: 0 } },
      },
    },
    answers: {
      build2_t1: { a: '先看結構總說明，從基礎往上算混凝土和模板，鋼筋照配筋圖算，最後用樓地板面積推算單位用量做檢核。', ev: 1 },
      build2_t2: { a: '人工、材料、機具分開，我會用自己整理的 Excel 單價表，再依物價指數調整。', ev: 1, vague: true,
        p: { more: { a: '新版 PCCES 我其實沒用過，以前公司用舊版，這一年多也沒跟上最新的公共工程價格資料，要花點時間追。', ev: -1, need: 50, reveal: 'outdated', react: '這個我會盡快補。' } } },
      build2_s1: { a: '我會把正確的數量和差額算出來，馬上告訴主管，請他重新簽核。', ev: 1 },
      build2_s2: { a: '我會請兩邊把計算式拿出來，一起對圖說，找出差異。', ev: 1 },
    },
    traits: [
      { id: 'crisis', name: '危機處理經驗', desc: '颱風後兩週內完成十二所學校搶修工程的現勘、數量與單價分析，未延誤開學。', positive: true },
      { id: 'outdated', name: '技能過時', desc: '沒用過新版 PCCES，離職一年多也沒追最新價格資料，工具與行情需要補。', positive: false },
    ],
    asks: ['training', 'flexible'],
  },
]);
