var TII = globalThis.TII;

TII.registerIndustry({
  id: 'build',
  name: '營建工程',
  icon: '🏗️',
  color: '#a0703c',
  bg: 'assets/bg/build.webp',
  interviewer: { name: '顏耀中', title: '工務協理', sprite: 'i_build' },
  levels: [
    // ===== Level 1: Assistant site engineer (difficulty 1) =====
    {
      id: 'build-1',
      position: '工地助理工程師',
      difficulty: 1,
      company: '穩基營造',
      jd: '協助工地主任管理集合住宅新建工程，負責施工日報、工安巡檢、材料進場查驗與分包商聯繫，需具土木或建築相關背景。',
      competencies: ['professional', 'teamwork', 'learning'],
      questions: [
        { id: 'build1_t1', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '一層樓板要澆置混凝土，澆置前你會檢查哪些項目？當天要盯什麼？' },
        { id: 'build1_t2', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '施工日報你會記錄哪些內容？這些紀錄之後會用在哪裡？' },
        { id: 'build1_s1', cat: 'situ', kind: 'good', cost: 3, comp: 'teamwork', text: '鋼筋班和模板班為了誰先進場吵起來，當天進度卡住，你會怎麼處理？' },
        { id: 'build1_s2', cat: 'situ', kind: 'good', cost: 3, comp: 'learning', text: '公司第一次接鋼構案，你只跟過 RC 工地，你會怎麼在一個月內跟上？' },
        { id: 'build1_x1', cat: 'tech', kind: 'poor', cost: 2, tpl: 'closed', text: '工地的安全規定你應該都懂吧？',
          note: '誘導式封閉問題，候選人只會回答「懂」，看不出實際巡檢能力', better: '你在工地做工安巡檢時，會特別注意哪些項目？遇過什麼狀況？' },
      ],
      candidates: [],
    },

    // ===== Level 2: Cost estimating engineer (difficulty 2) =====
    {
      id: 'build-2',
      position: '營建估算工程師',
      difficulty: 2,
      company: '承岳營造',
      jd: '負責公共工程與民間建案投標估算，進行圖說數量計算、單價分析與詢價比價，並協助變更設計追加減帳與結算。',
      competencies: ['professional', 'problem', 'communication'],
      questions: [
        { id: 'build2_t1', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '拿到一套 RC 結構圖，你算混凝土、模板、鋼筋數量的順序是什麼？怎麼避免漏算？' },
        { id: 'build2_t2', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '做單價分析時，你怎麼拆解工、料、機具？遇到鋼筋行情大漲又怎麼處理？' },
        { id: 'build2_s1', cat: 'situ', kind: 'good', cost: 3, comp: 'problem', text: '開標前兩天，你發現鋼筋數量少算約一成，標單已送主管簽核，你會怎麼做？' },
        { id: 'build2_s2', cat: 'situ', kind: 'good', cost: 3, comp: 'communication', text: '變更設計追加的數量，工地主任說你算太少，監造卻說太多，你怎麼協調？' },
        { id: 'build2_x1', cat: 'tech', kind: 'poor', cost: 2, tpl: 'closed', text: '你 PCCES 應該很熟吧？',
          note: '封閉式問題，只能確認他用過軟體，看不出數量計算與單價分析的邏輯', better: '拿到一套 RC 結構圖，你算混凝土、模板、鋼筋數量的順序是什麼？怎麼避免漏算？' },
      ],
      candidates: [],
    },

    // ===== Level 3: Site manager leading engineers and subcontractors (difficulty 3) =====
    {
      id: 'build-3',
      position: '工地主任',
      difficulty: 3,
      company: '崧嶺營造',
      jd: '統籌地上十五層集合住宅新建工程，帶領工程師與分包商約 40 人，掌控工期、品質、成本與職業安全衛生，並對接業主與監造。',
      competencies: ['leadership', 'professional', 'integrity'],
      questions: [
        { id: 'build3_t1', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '結構體進度落後三週，你會怎麼重新排程把工期追回來？哪些工項能搶？' },
        { id: 'build3_t2', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '高樓層外牆施工期間，你怎麼規劃施工架、開口與吊掛作業的安全管理？' },
        { id: 'build3_s1', cat: 'situ', kind: 'good', cost: 3, comp: 'leadership', text: '一位資深工程師常不寫日報、和分包商稱兄道弟，品質抽查又出包，你怎麼處理？' },
        { id: 'build3_s2', cat: 'situ', kind: 'good', cost: 3, comp: 'integrity', text: '業主趕交屋，要你在下雨天照常澆置頂樓樓板，監造也沒意見，你會怎麼做？' },
        { id: 'build3_x1', cat: 'tech', kind: 'poor', cost: 2, tpl: 'closed', text: '你帶過的工地應該都是零災害吧？',
          note: '誘導式封閉問題，候選人只會說是，還會讓人更想隱瞞虛驚事件', better: '你帶過的工地發生過什麼工安事件或虛驚事故？當時你怎麼處理？' },
      ],
      candidates: [],
    },
  ],
});
