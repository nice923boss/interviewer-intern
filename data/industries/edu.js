var TII = globalThis.TII;

TII.registerIndustry({
  id: 'edu',
  name: '教育培訓',
  icon: '📚',
  color: '#d4a017',
  bg: 'assets/bg/edu.webp',
  interviewer: { name: '宋靜宜', title: '教學總監', sprite: 'i_edu' },
  levels: [
    // ===== Level 1: Children's English teacher at a cram school (difficulty 1) =====
    {
      id: 'edu-1',
      position: '兒童美語教師',
      difficulty: 1,
      company: '青檸兒童美語',
      jd: '負責國小兒童美語班教學，含自然發音、繪本與會話課程，需撰寫教案、批改作業，並定期與家長溝通孩子的學習狀況。',
      competencies: ['professional', 'customer', 'pressure'],
      questions: [
        { id: 'edu1_t1', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '教國小一年級零基礎的孩子自然發音，你第一堂課會怎麼安排？' },
        { id: 'edu1_t2', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '班上有人能讀短文、有人字母還認不全，同一堂課你會怎麼設計？' },
        { id: 'edu1_s1', cat: 'situ', kind: 'good', cost: 3, comp: 'customer', text: '家長在聯絡簿寫「上了半年還不會拼字，補習沒效」，你會怎麼回應？' },
        { id: 'edu1_s2', cat: 'situ', kind: 'good', cost: 3, comp: 'pressure', text: '課上到一半兩個孩子吵起來、全班跟著起鬨，複習進度又還沒上完，你會怎麼做？' },
        { id: 'edu1_x1', cat: 'tech', kind: 'poor', cost: 2, tpl: 'closed', text: '你英文發音應該很標準吧？',
          note: '封閉式問題，對方只會說「還可以」，看不出會不會教', better: '你會怎麼教小朋友分辨 short a 和 short e？可以直接示範一次嗎？' },
      ],
      candidates: [],
    },

    // ===== Level 2: Corporate trainer at a training consultancy (difficulty 2) =====
    {
      id: 'edu-2',
      position: '企業內訓講師',
      difficulty: 2,
      company: '橡實企業管理顧問',
      jd: '為企業客戶規劃並講授新人訓、溝通與主管管理課程，負責需求訪談、教材設計與課後成效評估，需配合外縣市授課。',
      competencies: ['professional', 'communication', 'problem'],
      questions: [
        { id: 'edu2_t1', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '客戶要一堂「主管溝通」課，從需求訪談到開課，你的課程設計流程是什麼？' },
        { id: 'edu2_t2', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '課程結束後，你怎麼證明這堂課對學員的工作真的有幫助？' },
        { id: 'edu2_s1', cat: 'situ', kind: 'good', cost: 3, comp: 'communication', text: '學員多半是被主管指派來的，開場十分鐘就有人滑手機、回訊息，你會怎麼做？' },
        { id: 'edu2_s2', cat: 'situ', kind: 'good', cost: 3, comp: 'problem', text: '開課前一天，客戶說六小時的課要砍成三小時，但目標不變，你怎麼處理？' },
        { id: 'edu2_x1', cat: 'tech', kind: 'poor', cost: 2, tpl: 'closed', text: '你上台應該不會緊張吧？',
          note: '封閉式問題，只會得到「不會」，看不出控場和課程設計能力', better: '分享一次課堂氣氛不如預期的經驗，你當下怎麼調整？' },
      ],
      candidates: [],
    },

    // ===== Level 3: Head of teaching at a cram school (difficulty 3) =====
    {
      id: 'edu-3',
      position: '教學部主任',
      difficulty: 3,
      company: '青嵐文理補習班',
      jd: '管理國高中部 16 位專兼任老師與 6 位課輔，負責課程規劃、教學品質稽核、師資培訓與續班率，並處理重大家長客訴。',
      competencies: ['leadership', 'professional', 'customer'],
      questions: [
        { id: 'edu3_t1', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '你怎麼判斷一位老師的教學品質？除了學生成績，還會看哪些指標？' },
        { id: 'edu3_t2', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '國中部續班率連兩季下滑，你會從哪些數據和環節開始找原因？' },
        { id: 'edu3_s1', cat: 'situ', kind: 'good', cost: 3, comp: 'leadership', text: '學生最多的資深名師拒絕用新版教材，其他老師都在看你怎麼處理，你會怎麼做？' },
        { id: 'edu3_s2', cat: 'situ', kind: 'good', cost: 3, comp: 'customer', text: '一位家長在班級群組公開指控老師偏心，其他家長開始附和，你會怎麼處理？' },
        { id: 'edu3_x1', cat: 'tech', kind: 'poor', cost: 2, tpl: 'closed', text: '你帶過老師，應該很會管人吧？',
          note: '誘導式封閉問題，只會得到「還可以」，看不出領導方式', better: '分享一次你讓表現不佳的老師改善的經驗，你具體做了什麼？' },
      ],
      candidates: [],
    },
  ],
});
