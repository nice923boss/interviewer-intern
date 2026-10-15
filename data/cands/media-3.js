var TII = globalThis.TII;

TII.addCandidates('media-3', [
  // --- Polished, nohire: took credit for agency-led rebrand, stuck in TV-and-print thinking ---
  {
    id: 'media3_c1',
    name: '杜勝雄',
    sprite: 'm_senior',
    archetype: 'polished',
    resume: {
      headline: '品牌行銷主管・18 年經驗',
      education: '國立大學 大眾傳播學系',
      experience: ['2016/02 至今　悅榮食品　品牌部經理', '2008/05 至 2016/01　嘉禾日用品　行銷課長'],
      skills: ['品牌定位', '電視廣告企劃', '平面媒體', '代理商管理'],
      note: '主導悅榮食品品牌重塑，年營收成長 25%',
    },
    truth: { leadership: 1, professional: 1, communication: 2 },
    fit: 'nohire',
    profile: '說話有份量、包裝得體；但品牌重塑的策略與創意其實由代理商主導，他只負責簽核；排斥數位與成效廣告，預算思維停在電視平面；帶人靠權威，團隊三年換掉一半。',
    intro: '您好，我是杜勝雄，做品牌行銷十八年，目前是悅榮食品品牌部經理。我最具代表性的成績，是主導悅榮的品牌重塑，讓年營收成長兩成五。',
    motive: {
      whyus: { a: '森沐的品牌底子很好，我有信心把它做大、做出高度。', ev: 0 },
      leave: { a: '悅榮被集團整併，品牌部改由集團統籌，我能發揮的舞台變小了。', ev: 0 },
      salary: { a: '目前 10 萬 5，希望 12 萬。', ev: 0 },
    },
    stories: {
      leadership: {
        a: '我帶過 12 人的品牌部，要求很高，跟不上的人自然會離開，留下來的都是精英。', ev: -1, vague: true,
        p: {
          reflect: { a: '現在想想，三年換掉一半的人，每次交接都要重來，成本其實不低。', ev: 0 },
        },
      },
      professional: {
        a: '悅榮的品牌重塑是我主導的，從定位、視覺到電視廣告整套翻新，年營收成長 25%。', ev: 2, vague: true,
        hint: '「主導」是很大的詞，可以追問他實際負責哪個環節。',
        guard: '整個專案從頭到尾都是我在統籌，細節很多就不一一說了。',
        p: {
          role: { a: '……定位和視覺是代理商提的，廣告也是他們拍。我負責把關，最後簽核。', ev: -2, need: 60, reveal: 'creditgrab', react: '把關才是最難的。' },
          result: { a: '營收成長那年，公司也剛好擴大超商通路。', ev: 0 },
        },
      },
      communication: {
        a: '我跟業務部關係很好，常常一起吃飯，很多事私下講比較快。', ev: 0,
        p: { result: { a: '大部分時候談得成，不過也有幾次要總經理出面才定案。', ev: 0 } },
      },
    },
    answers: {
      media3_t1: { a: '聲量高代表知名度夠了，接下來要拍一支更有份量的形象廣告，把品牌高度拉上去，營收自然會跟上。', ev: -1, vague: true,
        p: { more: { a: '通路和轉換數據……那部分我通常交給業務去看。', ev: -1 } } },
      media3_t2: { a: '電視和雜誌我一定保留，那是品牌的門面。數位廣告效果很難說，先砍。', ev: -2, vague: true,
        p: { reflect: { a: '回頭看，悅榮這幾年數位幾乎沒投，年輕客群確實流失不少……不過我還是認為電視比較有份量。', ev: -1, reveal: 'outdated2', react: '網路上的點擊很多是假的。' } } },
      media3_s1: { a: '這種人我會直接約談，給他一個月改善，不行就換人。品牌部不能有人拖後腿。', ev: -1,
        p: { more: { a: '主管不需要花太多時間哄人，做得到就留，做不到就走。', ev: -1 } } },
      media3_s2: { a: '我會請總經理出面，業務聽總經理的。', ev: -1, vague: true,
        p: { more: { a: '如果總經理也支持打折，那就照做，之後再用形象廣告把品牌拉回來。', ev: -1 } } },
    },
    traits: [
      { id: 'creditgrab', name: '搶功', desc: '把代理商主導的品牌重塑說成自己主導，實際只負責簽核。', positive: false },
      { id: 'outdated2', name: '思維過時', desc: '只信電視與平面，排斥數位廣告，品牌年輕客群流失仍不調整。', positive: false },
    ],
    asks: ['team', 'salaryrange'],
  },

  // --- Humble, hire: quiet cross-functional bridge, grew two subordinates into managers ---
  {
    id: 'media3_c2',
    name: '劉淑惠',
    sprite: 'f_senior_glasses',
    archetype: 'humble',
    resume: {
      headline: '品牌行銷經理・15 年經驗',
      education: '國立大學 企業管理研究所',
      experience: ['2019/03 至今　青禾生活　品牌行銷經理', '2011/07 至 2019/02　織光家居　行銷企劃'],
      skills: ['品牌策略', '跨部門專案管理', '團隊培育', '消費者研究'],
      note: '帶領 6 人品牌團隊',
    },
    truth: { leadership: 3, professional: 2, communication: 3 },
    fit: 'hire',
    profile: '講話低調、常把功勞歸給團隊；跨部門溝通很有方法，帶出兩位升任主管的部屬，團隊三年零離職。品牌策略穩健，但成效廣告的操作細節較弱，靠團隊成員補位。',
    intro: '您好，我是劉淑惠，在青禾生活擔任品牌行銷經理，帶一個六人的團隊。之前在家居品牌做行銷企劃，主要經驗是品牌策略和跨部門的專案。',
    motive: {
      whyus: { a: '森沐重視成分和永續，跟我自己做品牌的理念很接近。', ev: 1 },
      leave: { a: '青禾被收購後，品牌要併入母公司，我的部門年底會解散。', ev: 0 },
      salary: { a: '目前 9 萬 5，希望 10 萬左右。', ev: 0 },
    },
    stories: {
      leadership: {
        a: '我的團隊大家都很努力，我主要是在旁邊協助他們。', ev: 0, vague: true,
        guard: '團隊的成績是大家的，我其實沒做什麼。',
        p: {
          role: { a: '每個人我每兩週一對一，聊他想學什麼，再依興趣分配案子。', ev: 2 },
          more: { a: '……帶過的人裡，有兩位後來升成其他品牌的主管。這三年團隊沒有人離職，前同事會叫我「劉老師」。', ev: 2, need: 60, reveal: 'mentor', react: '是他們自己很努力。' },
        },
      },
      professional: {
        a: '我們做過「回家吃飯」的品牌企劃，讓家居品牌從賣產品，變成賣一種生活方式。', ev: 1,
        p: { result: { a: '會員回購率從 22% 到 31%。不過廣告投放的細節，我主要靠團隊裡的投放專員。', ev: 1 } },
      },
      communication: {
        a: '業務和產品部常常意見不同，我會先分別聊，找到雙方都在意的點，再一起開會。', ev: 2,
        p: { result: { a: '有次新品定價吵了一個月，後來用小規模測試的數據說服雙方，兩週就定案。', ev: 2 } },
      },
    },
    answers: {
      media3_t1: { a: '先拆是哪一段斷掉：聲量有沒有轉成搜尋、進到官網、加入購物車，還是通路鋪貨不夠。再做消費者訪談，問大家知道品牌卻不買的原因。', ev: 2 },
      media3_t2: { a: '我會先保住能直接帶營收的成效廣告和會員經營，品牌廣告改成集中在檔期打，不平均撒。', ev: 1,
        p: { more: { a: '成效廣告的出價和受眾，我會和投放同事一起算，這塊我比較依賴他們的判斷。', ev: 0 } } },
      media3_s1: { a: '我會先私下約他聊，了解是對方向沒共識，還是有別的狀況。再請他一起修訂品牌調性的範例，讓他有參與感。', ev: 2 },
      media3_s2: { a: '我會先問業務七折想解決什麼，是庫存還是業績缺口。再提組合價或會員專屬方案，把毛利差多少算給他們看。', ev: 2 },
    },
    traits: [
      { id: 'mentor', name: '育才口碑', desc: '帶出兩位升任主管的部屬，團隊三年零離職，前同事稱她「劉老師」。', positive: true },
    ],
    asks: ['team', 'training'],
  },

  // --- Direct, maybe: sharp performance marketer, short-term mindset, clashes with sales ---
  {
    id: 'media3_c3',
    name: '梁哲瑋',
    sprite: 'm_mid_beard',
    archetype: 'direct',
    resume: {
      headline: '成效行銷主管・9 年經驗',
      education: '私立大學 國際貿易學系',
      experience: ['2021/01 至今　快選電商　成效行銷經理', '2017/03 至 2020/12　迅點數位　廣告投放主任'],
      skills: ['成效廣告', '數據分析', 'CRM', '預算管理'],
      note: '管理年度廣告預算 2,400 萬',
    },
    truth: { leadership: 2, professional: 2, communication: 1 },
    fit: 'maybe',
    profile: '成效行銷專業強，數字敏銳、帶人直接有效率；但習慣用 ROAS 一把尺衡量一切，輕忽品牌長期經營，與業務部門屢有衝突，跨部門溝通是明顯短板。',
    intro: '我是梁哲瑋，在快選電商當成效行銷經理，一年管兩千四百萬的廣告預算。我習慣用數字說話，想從成效行銷轉到品牌，補足自己的完整度。',
    motive: {
      whyus: { a: '我做成效做很久了，想學品牌怎麼經營，森沐是很好的起點。', ev: 1 },
      leave: { a: '快選老闆只要每個月的業績，我想做一些長期一點的事。', ev: 0 },
      salary: { a: '目前 9 萬，希望 10 萬 5。', ev: 0 },
    },
    stories: {
      leadership: {
        a: '我帶 4 個投放專員，每週一起看數字，誰的帳戶掉了就一起找原因。', ev: 1,
        p: { result: { a: '一年內團隊整體 ROAS 從 2.6 拉到 3.4，有兩個人升主任。', ev: 1 } },
      },
      professional: {
        a: '我把廣告預算從平均分配改成依 ROAS 每週動態調整，一年多帶來 1,800 萬營收。', ev: 1,
        p: { more: { a: '品牌廣告我砍得很兇，因為看不到直接轉換。', ev: -1 } },
      },
      communication: {
        a: '我講話比較直，用數字說話，對事不對人。', ev: 0, vague: true,
        guard: '跨部門本來就各有立場，我都是用數據溝通。',
        p: {
          more: { a: '……老實說，我跟業務吵到總經理那邊好幾次。我覺得他們不看數據，後來業務部開會乾脆不找我。', ev: -2, need: 60, reveal: 'clash', react: '數字擺在那裡啊。' },
        },
      },
    },
    answers: {
      media3_t1: { a: '聲量高沒轉換，代表流量沒被接住。我會加強再行銷和促購，把聲量轉成訂單。', ev: 1,
        p: { reflect: { a: '……您這樣問，我想起在快選一直打促購，營收衝上去了，回購率卻一年掉一半，品牌變成只有特價時才被想起。', ev: 0, reveal: 'shortterm', react: '這點我得承認。' } } },
      media3_t2: { a: '砍品牌廣告，保成效廣告。看得到轉換的錢才該花。', ev: -1,
        p: { more: { a: '品牌廣告的價值我知道，但很難算，砍它最不會被罵。', ev: -1 } } },
      media3_s1: { a: '我會直接跟他說哪裡不對，給明確的修改方向和期限。消極的話，我會問他是不是不想做了。', ev: 0,
        p: { more: { a: '如果他有自己的想法，我願意讓他試一個小案子，用數據證明。', ev: 1 } } },
      media3_s2: { a: '我會算給業務看，打七折毛利剩多少、要多賣幾倍才打平，數字擺出來他們就懂了。', ev: 1,
        p: { result: { a: '上次這樣做，業務覺得我在教他們做事，最後還是打了折。', ev: -1 } } },
    },
    traits: [
      { id: 'shortterm', name: '重短期輕品牌', desc: '習慣用促購衝營收，曾讓回購率一年掉一半，對品牌長期價值重視不足。', positive: false },
      { id: 'clash', name: '跨部門衝突', desc: '與業務多次衝突鬧到總經理，業務部開會不再找他。', positive: false },
    ],
    asks: ['evaluation', 'growth'],
  },

  // --- Polished, hire: balanced brand and performance, calm crisis handler ---
  {
    id: 'media3_c4',
    name: '邱佳蓉',
    sprite: 'f_mid_blazer',
    archetype: 'polished',
    resume: {
      headline: '品牌行銷經理・11 年經驗',
      education: '國立大學 廣告學系',
      experience: ['2020/06 至今　水漾生技　品牌行銷經理', '2015/08 至 2020/05　瑞格廣告　客戶總監'],
      skills: ['品牌定位', '整合行銷', '危機溝通', '代理商管理'],
      note: '主導保養品牌年度行銷，預算 3,500 萬',
    },
    truth: { leadership: 3, professional: 3, communication: 3 },
    fit: 'hire',
    profile: '表達流暢且經得起追問；把一支面霜重新定位為年營收破億的主力，預算被砍仍能讓營收成長；成分謠言危機中 48 小時統一對外說法，帶隊穩定、跨部門協調成熟。',
    intro: '您好，我是邱佳蓉，在水漾生技擔任品牌行銷經理六年，帶五人團隊，負責保養品牌的年度行銷。之前在廣告公司當客戶總監，代理商和品牌端都熟。',
    motive: {
      whyus: { a: '森沐的品牌故事很完整，但數位化還有空間，這正好是我擅長的。', ev: 1 },
      leave: { a: '水漾準備轉型做代工，品牌部明年會縮編。', ev: 0 },
      salary: { a: '目前 10 萬，希望 11 萬。', ev: 0 },
    },
    stories: {
      leadership: {
        a: '我帶 5 個人，每季一起訂目標，讓每個人都有自己負責到底的專案。', ev: 2,
        p: { result: { a: '兩年內一位升資深、一位轉調產品經理，團隊沒有人離職。', ev: 2 } },
      },
      professional: {
        a: '我把一支面霜重新定位成「敏感肌修護」，年營收從 3,000 萬做到破億。', ev: 2,
        p: { role: { a: '定位和訊息架構是我帶團隊做的，代理商負責創意執行，我每週審稿。', ev: 2 } },
      },
      communication: {
        a: '我比較常扮演橋樑，產品、業務、法務都要顧到。', ev: 1, vague: true,
        p: {
          reflect: { a: '回頭看最難的一次，是網路謠傳我們成分有問題。我 48 小時內召集法務、研發和客服統一說法，附上檢驗報告，一週後聲量回穩，退貨率沒有上升。', ev: 2, reveal: 'crisis2', react: '那週幾乎沒睡。' },
        },
      },
    },
    answers: {
      media3_t1: { a: '先看漏斗哪裡斷：聲量是不是集中在不會買的族群、通路找不找得到、價格帶對不對。我會結合銷售數據和消費者訪談做一次品牌健檢。', ev: 2 },
      media3_t2: { a: '先保住帶得到營收的成效廣告和會員經營，品牌廣告集中在上市檔期，不平均撒。', ev: 2,
        p: { more: { a: '品牌廣告我也會掛可追蹤的指標，像品牌字搜尋量、新客占比。上一份工作預算砍兩成，當年營收還成長 8%。', ev: 2, need: 60, reveal: 'balance', react: '錢少就要花得更準。' } } },
      media3_s1: { a: '先一對一了解原因，可能是對調性理解不同，也可能是倦怠。我會請他主導一次品牌調性的內部工作坊，找回參與感。', ev: 2 },
      media3_s2: { a: '先跟業務對齊業績缺口，再提三個替代方案：限定組合、會員回饋、通路專屬品，各自試算毛利，最後挑一區小規模測試，讓數據決定。', ev: 2 },
    },
    traits: [
      { id: 'crisis2', name: '危機處理', desc: '成分謠言危機中 48 小時內整合法務、研發、客服統一對外說法，退貨率未上升。', positive: true },
      { id: 'balance', name: '品效兼顧', desc: '品牌廣告也設可追蹤指標，預算砍兩成仍讓營收成長 8%。', positive: true },
    ],
    asks: ['growth', 'team'],
  },

  // --- Nervous, hire: insight-driven planner who shields his team, zero turnover ---
  {
    id: 'media3_c5',
    name: '范致遠',
    sprite: 'm_mid_shirt',
    archetype: 'nervous',
    resume: {
      headline: '品牌行銷副理・8 年經驗',
      education: '國立大學 心理學系',
      experience: ['2018/09 至今　綠田家品　品牌行銷副理'],
      skills: ['消費者洞察', '品牌企劃', '內容行銷', '團隊管理'],
      note: '帶領 3 人企劃小組',
    },
    truth: { leadership: 3, professional: 3, communication: 2 },
    fit: 'hire',
    profile: '面試緊張、說話不流暢；但品牌企劃扎實，靠消費者訪談翻轉滯銷產品；帶的小組四年無人離職，願意替部屬擋壓力，帶人潛力高。跨部門時偶爾太好說話。',
    intro: '您、您好，我是范致遠，在綠田家品做品牌行銷八年，現在是副理，帶三個人的企劃小組。我比較擅長消費者研究，從訪談裡找品牌可以說的故事。',
    motive: {
      whyus: { a: '森沐的成分研究很扎實，我、我想試試看保養品類。', ev: 1 },
      leave: { a: '綠田的品牌部要外包給代理商，副理職位會取消。', ev: 0 },
      salary: { a: '目前 7 萬 8，希望……8 萬 5。', ev: 0 },
    },
    stories: {
      leadership: {
        a: '我、我帶的人不多，三個……主要就是一起做事。', ev: 0, vague: true,
        guard: '就、就一般的帶法……',
        p: {
          more: { a: '……組員犯錯被老闆罵，我會先扛下來，事後再私下陪他檢討。四年來小組沒人離職，有一位還被挖去當主管。', ev: 2, need: 50, reveal: 'leadpot', react: '這、這是應該的。' },
        },
      },
      professional: {
        a: '有一條洗碗精賣不好，我、我去做了二十場家庭訪談，發現大家最在意的是「不傷手」。', ev: 2,
        p: { result: { a: '改了包裝和訴求後，半年營收成長四成。', ev: 2 } },
      },
      communication: {
        a: '業務要求的事，我大部分會盡量配合。', ev: 0, vague: true,
        p: { reflect: { a: '回頭看，有幾次太好說話，答應了不合理的檔期，組員加班很辛苦。現在我會先說「要評估一下」。', ev: 1 } },
      },
    },
    answers: {
      media3_t1: { a: '我、我會先做消費者調查，看大家知道品牌卻不買的原因，是價格、通路，還是不覺得自己需要，再對照銷售數據。', ev: 2 },
      media3_t2: { a: '我會先看哪些活動真的帶來新客，保留那些。品牌廣告改成集中在一兩個檔期，製作物盡量重複利用。', ev: 1 },
      media3_s1: { a: '我會先私下問他是不是遇到困難，也許是不認同方向。然後……請他一起重新整理品牌調性的範例。', ev: 2 },
      media3_s2: { a: '我、我會先算毛利給業務看，再提組合價的方案。可是業務如果很堅持……我可能會請總監一起談。', ev: 1 },
    },
    traits: [
      { id: 'leadpot', name: '帶人潛力', desc: '會替犯錯的組員擋壓力再私下陪檢討，小組四年零離職，有部屬升任主管。', positive: true },
    ],
    asks: ['training', 'team'],
  },

  // --- Polished, nohire: inflated team size, hid a 40% launch overspend ---
  {
    id: 'media3_c6',
    name: '黃苡安',
    sprite: 'f_mid_long',
    archetype: 'polished',
    resume: {
      headline: '品牌行銷經理・10 年經驗',
      education: '私立大學 傳播管理學系',
      experience: ['2021/03 至今　曜石美妝　品牌行銷經理', '2016/07 至 2021/02　沐光國際　行銷專員'],
      skills: ['品牌經營', '新品上市', 'KOL 合作', '團隊管理'],
      note: '帶領 15 人品牌行銷團隊',
    },
    truth: { leadership: 1, professional: 2, communication: 2 },
    fit: 'nohire',
    profile: '談吐得體、很會包裝；但「15 人團隊」其實只直接帶 3 人，其餘是代理商與外包；新品上市超支四成沒有主動揭露，直到財務稽核才曝光。帶人經驗與誠信都有疑慮。',
    intro: '您好，我是黃苡安，在曜石美妝擔任品牌行銷經理，帶一個十五人的團隊。我主導過品牌當年最成功的新品上市，也很擅長 KOL 合作。',
    motive: {
      whyus: { a: '森沐這兩年聲量很好，我想帶它更上一層樓。', ev: 0 },
      leave: { a: '曜石最近組織調整，我想找更大的舞台。', ev: 0 },
      salary: { a: '目前 10 萬，希望 12 萬。', ev: 0 },
    },
    stories: {
      leadership: {
        a: '我帶 15 人的團隊，分成社群、內容、活動三組，每組都有明確的 KPI。', ev: 2, vague: true,
        hint: '15 人都是她直接帶的嗎？可以追問團隊的實際組成。',
        guard: '組織架構很完整，每個人分工都很清楚。',
        p: {
          more: { a: '……正式編制是 3 個人，其他是代理商和外包的窗口，平常也一起開會，所以我都算進來。', ev: -2, need: 60, reveal: 'inflate2', react: '一起做事就是團隊啊。' },
        },
      },
      professional: {
        a: '我主導一支唇彩上市，首月賣出 5 萬支，是品牌當年最成功的新品。', ev: 2, vague: true,
        p: {
          result: { a: '預算原本 600 萬，最後花了 840 萬左右。', ev: -1 },
          reflect: { a: '回頭看……超支的部分我當時沒有馬上報，想說銷量好就沒關係，後來是財務季度稽核才提出來。', ev: -2, reveal: 'hideover', react: '結果是好的嘛。' },
        },
      },
      communication: {
        a: '我跟業務和產品都處得不錯，有衝突會先找主管協調。', ev: 0,
        p: { more: { a: '大部分時候是請總監出面定案。', ev: 0 } },
      },
    },
    answers: {
      media3_t1: { a: '我會加強 KOL 合作和話題活動，讓聲量延續到銷售。', ev: 0, vague: true,
        p: { more: { a: '轉換的部分……我會請團隊去拉數據看看。', ev: -1 } } },
      media3_t2: { a: '我會先砍成效廣告，保留 KOL 和品牌活動，品牌形象最重要。', ev: -1,
        p: { more: { a: '成效廣告其實……我之前都交給代理商在管。', ev: -1 } } },
      media3_s1: { a: '我會跟他好好溝通，了解他的想法，給他一些空間。', ev: 0, vague: true,
        p: { more: { a: '如果還是不行，我會請人資協助處理。', ev: -1 } } },
      media3_s2: { a: '我會跟業務說明品牌價值的重要，打折會傷害品牌形象。', ev: 0, vague: true,
        p: { more: { a: '具體會影響多少……我可能要再算一下。', ev: -1 } } },
    },
    traits: [
      { id: 'inflate2', name: '團隊灌水', desc: '自稱帶 15 人團隊，正式編制只有 3 人，其餘是代理商與外包。', positive: false },
      { id: 'hideover', name: '隱瞞超支', desc: '新品上市超支四成未主動揭露，直到財務稽核才曝光。', positive: false },
    ],
    asks: ['team', 'salaryrange'],
  },

  // --- Humble, maybe: gifted copywriter who rewrites everything himself ---
  {
    id: 'media3_c7',
    name: '孫育誠',
    sprite: 'm_mid_sweater',
    archetype: 'humble',
    resume: {
      headline: '品牌企劃主管・12 年經驗',
      education: '國立大學 中國文學系',
      experience: ['2019/05 至今　山嵐茶飲　品牌企劃主任', '2014/03 至 2019/04　品文廣告　資深文案'],
      skills: ['品牌文案', '品牌故事', '整合行銷', '跨部門溝通'],
      note: '主導茶飲品牌重塑，獲年度廣告獎',
    },
    truth: { leadership: 1, professional: 3, communication: 3 },
    fit: 'maybe',
    profile: '謙和、文字功力深厚，品牌故事與跨部門溝通都是強項；但事必躬親，常深夜自己重寫組員文案，組員缺乏成長空間，兩年走了三人，授權與帶人是最大弱點。',
    intro: '您好，我是孫育誠，在山嵐茶飲負責品牌企劃，之前在廣告公司當文案。我比較擅長把品牌的故事說清楚，前年茶飲品牌重塑的案子有拿到廣告獎。',
    motive: {
      whyus: { a: '森沐的品牌故事很有溫度，我想用文字把它說得更好。', ev: 1 },
      leave: { a: '公司決定行銷全部外包，我的職位會縮編。', ev: 0 },
      salary: { a: '目前 8 萬 2，希望 9 萬。', ev: 0 },
    },
    stories: {
      leadership: {
        a: '我帶兩個企劃，大家都很認真，我會幫他們看稿。', ev: 0, vague: true,
        p: {
          role: { a: '提案方向是我定，初稿給組員寫，最後我來修。', ev: 0 },
          reflect: { a: '……其實很多稿子最後都是我自己重寫，常弄到半夜。兩年走了三個人，有人說在我底下學不到東西。我知道要放手，但看到不對就忍不住。', ev: -1, reveal: 'micromanage', react: '這是我的老毛病。' },
        },
      },
      professional: {
        a: '我們把茶飲品牌從「平價解渴」重新定位成「台灣茶的日常儀式」，拿到年度廣告獎。', ev: 2,
        p: { result: { a: '重塑後一年，客單價提高 15%，門市來客數持平沒有流失。', ev: 2 } },
      },
      communication: {
        a: '漲價時業務和加盟主都反對，我花一個月跑各區說明會，用品牌故事和毛利試算說服他們。', ev: 2,
      },
    },
    answers: {
      media3_t1: { a: '我會先檢查品牌訊息和產品利益點有沒有對上。聲量可能來自好看的內容，卻沒講清楚為什麼要買，再對照銷售數據確認。', ev: 2 },
      media3_t2: { a: '我會保留品牌核心內容，成效廣告集中在轉換最好的通路，製作盡量內部自己來，省外包費。', ev: 1,
        p: { more: { a: '自己做的話……大概又是我加班寫吧。', ev: 0 } } },
      media3_s1: { a: '我會跟他一起看品牌調性指南，逐條討論提案哪裡偏了。', ev: 1,
        p: { more: { a: '如果時間真的來不及，我可能會先自己改好，再跟他說明。', ev: -1 } } },
      media3_s2: { a: '我會先聽業務的業績壓力，再提組合禮盒、會員日這些替代方案，算出毛利差異讓他們比較。', ev: 2 },
    },
    traits: [
      { id: 'micromanage', name: '事必躬親', desc: '常深夜自己重寫組員的稿子，組員缺乏成長空間，兩年走了三人。', positive: false },
    ],
    asks: ['training', 'flexible'],
  },

  // --- Direct, maybe: PR veteran with strong stakeholder skills, big salary gap ---
  {
    id: 'media3_c8',
    name: '張怡君',
    sprite: 'f_mid_cardigan',
    archetype: 'direct',
    resume: {
      headline: '公關暨品牌溝通・10 年經驗',
      education: '國立大學 新聞學系',
      experience: ['2019/01 至今　明遠公關顧問　公關副總監', '2016/02 至 2018/12　采風公關　資深公關'],
      skills: ['媒體關係', '品牌溝通', '危機公關', '活動企劃'],
      note: '服務 8 個美妝與食品品牌客戶',
    },
    truth: { leadership: 2, professional: 2, communication: 3 },
    fit: 'maybe',
    profile: '說話直接，媒體與溝通能力很強，擅長協調多方立場；但一直在公關公司，品牌端預算與成效廣告經驗有限；薪資期待明顯高於職缺預算，需要先談清楚。',
    intro: '我是張怡君，在明遠公關當副總監，服務八個美妝和食品品牌。我一直在代理端，想轉到品牌端，從頭到尾經營一個品牌。',
    motive: {
      whyus: { a: '我想從代理端轉到品牌端，看品牌從頭到尾怎麼經營，森沐的產品我自己也在用。', ev: 1 },
      leave: { a: '公關公司一直在比稿，我想專心經營一個品牌。', ev: 1 },
      salary: {
        a: '薪資可以再談，我比較看重發展空間。', ev: 0, vague: true,
        guard: '這部分我們可以之後再細談。',
        p: { more: { a: '……老實說，我現在含獎金一年約 170 萬，希望不要低於這個，換算月薪大概要 13 萬以上。', ev: -1, need: 60, reveal: 'salarygap', react: '先講清楚比較好。' } },
      },
    },
    stories: {
      leadership: {
        a: '我帶 4 個公關，主要是分配客戶，讓大家各自負責到底。', ev: 1,
        p: { result: { a: '去年團隊留住全部客戶，還新增兩個。', ev: 1 } },
      },
      professional: {
        a: '我幫一個食品品牌辦上市記者會，當天上了 40 則新聞。', ev: 1,
        p: { more: { a: '不過廣告預算是品牌自己管，成效廣告我比較少碰。', ev: -1 } },
      },
      communication: {
        a: '我的工作就是溝通，跟媒體、客戶、通路都要講得上話。', ev: 1,
        p: { more: { a: '服務過 8 個品牌，品牌、業務、通路之間的拉扯我看很多，常是我把各方拉到同一張桌子，先談共同目標再談分歧。', ev: 2, reveal: 'crossdomain', react: '這是公關的基本功。' } },
      },
    },
    answers: {
      media3_t1: { a: '我會先看聲量的來源，是不是話題很熱但跟產品無關。再找業務和通路聊，聽終端的反應。', ev: 1,
        p: { more: { a: '銷售數據的拆解我需要團隊或業務協助，這塊我比較少做。', ev: 0 } } },
      media3_t2: { a: '公關和口碑比廣告便宜，我會多用媒體關係和 KOL 互惠合作，把省下的錢留給成效廣告。', ev: 1 },
      media3_s1: { a: '我會直接跟他談，問他是不是不認同這個調性。不認同就說出來，我們一起討論。', ev: 1,
        p: { more: { a: '如果他只是倦怠，我會換一個不同類型的案子給他試試。', ev: 1 } } },
      media3_s2: { a: '我會先私下找業務主管，了解他的業績壓力，再找產品一起提替代方案，三方坐下來談，不在大會上硬碰硬。', ev: 2 },
    },
    traits: [
      { id: 'crossdomain', name: '跨域協調經驗', desc: '服務過 8 個美妝與食品品牌，熟悉品牌、業務、通路各方立場，擅長居中協調。', positive: true },
      { id: 'salarygap', name: '薪資落差', desc: '期待月薪 13 萬以上，明顯高於職缺預算。', positive: false },
    ],
    asks: ['salaryrange', 'growth'],
  },

  // --- Direct, nohire: talented creative who plans to route agency contracts to his own studio ---
  {
    id: 'media3_c9',
    name: '謝冠宏',
    sprite: 'm_mid_navy',
    archetype: 'direct',
    resume: {
      headline: '品牌行銷經理・10 年經驗',
      education: '私立大學 商業設計學系',
      experience: ['2020/02 至今　晨曦家電　品牌行銷經理', '2016/04 至 2020/01　創視廣告　創意企劃'],
      skills: ['品牌視覺', '整合行銷', '代理商比稿', '影音企劃'],
      note: '主導年度品牌形象影片，觀看數破 300 萬',
    },
    truth: { leadership: 2, professional: 3, communication: 2 },
    fit: 'nohire',
    profile: '專業與創意能力強，品牌形象案做得漂亮；但私下經營設計工作室，打算把代理商預算轉給自己的工作室和朋友的公司，利益衝突與誠信疑慮嚴重。',
    intro: '我是謝冠宏，在晨曦家電當品牌行銷經理，之前在廣告公司做創意企劃。去年主導的品牌形象影片觀看破三百萬，視覺和影音是我的強項。',
    motive: {
      whyus: { a: '森沐的視覺還有很大的進步空間，我很有想法。', ev: 1 },
      leave: { a: '晨曦今年換了總經理，品牌預算一直被砍。', ev: 0 },
      salary: { a: '目前 9 萬 5，希望 10 萬 5。', ev: 0 },
    },
    stories: {
      leadership: {
        a: '我帶 3 個設計和企劃，要求很高，作品要拿得出去。', ev: 1,
        p: { result: { a: '團隊作品拿過兩座廣告獎，不過工時也比較長。', ev: 0 } },
      },
      professional: {
        a: '我主導家電品牌的形象影片，觀看破 300 萬，品牌好感度調查提升 12 個百分點。', ev: 2,
        p: { role: { a: '創意和腳本我主導，拍攝外包，代理商比稿也是我負責評選。', ev: 1 } },
      },
      communication: {
        a: '我跟業務合作還可以，但他們常想要很促銷的東西，我會堅持品牌質感。', ev: 0,
        p: { result: { a: '有時候會僵住，最後各退一步。', ev: 0 } },
      },
    },
    answers: {
      media3_t1: { a: '聲量高營收停滯，可能是品牌形象太輕，產品價值沒說清楚。我會重整視覺和訊息，讓溢價站得住。', ev: 1 },
      media3_t2: { a: '我會砍掉大代理商的月費，改成專案制發包，製作成本可以省三到四成。', ev: 1, vague: true,
        guard: '發包對象我心裡有底，進來再細談。',
        p: { more: { a: '……其實我自己有一間設計工作室，朋友也開製作公司。與其給大代理商，不如發給自己人，便宜又好溝通。', ev: -2, need: 60, reveal: 'conflict', react: '肥水不落外人田嘛。' } } },
      media3_s1: { a: '我會給他明確的品牌規範，逐案審，偏了就退。消極的話，我會直接問他還想不想做。', ev: 0 },
      media3_s2: { a: '我會跟業務說，打一次七折之後就回不去了，品牌要守住價格。', ev: 1,
        p: { more: { a: '替代方案的話，我會先試算組合價給他們看。', ev: 0 } } },
    },
    traits: [
      { id: 'conflict', name: '利益衝突', desc: '私下經營設計工作室，打算把代理商預算轉給自己和朋友的公司。', positive: false },
    ],
    asks: ['flexible', 'evaluation'],
  },

  // --- Nervous, maybe: strong in-house planner who cannot say no to her boss ---
  {
    id: 'media3_c10',
    name: '蔡詠晴',
    sprite: 'f_mid_bun',
    archetype: 'nervous',
    resume: {
      headline: '品牌行銷主任・9 年經驗',
      education: '國立大學 外國語文學系',
      experience: ['2021/08 至今　暖日香氛　品牌行銷主任', '2017/07 至 2021/07　暖日香氛　行銷專員'],
      skills: ['品牌企劃', '社群經營', '異業合作', '電商活動'],
      note: '內部升任主任，帶 2 人',
    },
    truth: { leadership: 2, professional: 3, communication: 1 },
    fit: 'maybe',
    profile: '緊張、自評保守；品牌企劃專業扎實，異業聯名讓香氛品牌打進百貨；但對老闆不敢說不，曾照指示做明顯傷品牌的促銷，向上與跨部門溝通是主要弱點。',
    intro: '您、您好，我是蔡詠晴，在暖日香氛待了九年，從行銷專員升到品牌行銷主任，現在帶兩個人，負責品牌企劃和電商活動。',
    motive: {
      whyus: { a: '森沐的品牌調性跟我很合，我、我自己很喜歡你們的產品。', ev: 1 },
      leave: { a: '在同一家公司九年了，想看看不同的環境，也想挑戰更大的品牌。', ev: 0 },
      salary: { a: '目前 7 萬 2，希望……8 萬左右。', ev: 0 },
    },
    stories: {
      leadership: {
        a: '我、我帶兩個人，都是我自己面試進來的。', ev: 1,
        p: { result: { a: '其中一位現在可以獨立負責電商檔期了。', ev: 1 } },
      },
      professional: {
        a: '我、我談過一個和連鎖咖啡的異業合作，做聯名香氛禮盒。', ev: 1, vague: true,
        p: { result: { a: '三週賣完 8,000 盒，品牌也因為這次合作進了兩家百貨專櫃。', ev: 2 } },
      },
      communication: {
        a: '老闆的決定，我、我都會盡量做到。', ev: -1, vague: true,
        p: {
          reflect: { a: '……有次老闆要全館五折清庫存，我知道會傷品牌，可是不敢說。後來老客人抱怨原價買很虧，回購掉很多。我那時應該拿數據去跟他談。', ev: -1, reveal: 'cantsayno', react: '現在想起來還很後悔。' },
        },
      },
    },
    answers: {
      media3_t1: { a: '我會先把銷售數據依通路拆開，再看會員回購率，也許新客有進來但沒留住。', ev: 2 },
      media3_t2: { a: '我、我會先保留轉換好的電商活動和會員經營，品牌曝光改用異業合作，拿合作方的資源換曝光。', ev: 2 },
      media3_s1: { a: '我、我會先私下問他怎麼了……再一起重新看品牌調性。', ev: 1,
        p: { more: { a: '如果他比我資深……我可能不太敢講得太重。', ev: -1 } } },
      media3_s2: { a: '我會……先算七折的毛利影響。但如果業務很堅持，我、我可能就配合了。', ev: -1,
        p: { more: { a: '我知道應該要堅持，可是我不太會跟人爭。', ev: -1 } } },
    },
    traits: [
      { id: 'cantsayno', name: '不敢說不', desc: '明知傷品牌仍照老闆指示全館五折，老客回購大幅下滑。', positive: false },
    ],
    asks: ['training', 'evaluation'],
  },
]);
