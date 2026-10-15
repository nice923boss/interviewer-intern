var TII = globalThis.TII;

TII.registerIndustry({
  id: 'media',
  name: '行銷媒體',
  icon: '📣',
  color: '#ff6b5b',
  bg: 'assets/bg/media.webp',
  interviewer: { name: '鄭曉薇', title: '行銷總監', sprite: 'i_media' },
  levels: [
    // ===== Level 1: Social media editor (difficulty 1) =====
    {
      id: 'media-1',
      position: '社群小編',
      difficulty: 1,
      company: '拾光選物',
      jd: '負責生活選物品牌的 FB、IG、Threads 經營，企劃貼文與短影音、回覆粉絲留言，並每週整理成效數據。',
      competencies: ['professional', 'customer', 'learning'],
      questions: [
        { id: 'media1_t1', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '如果一篇貼文的觸及很高，但互動率很低，你會怎麼分析原因？' },
        { id: 'media1_t2', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '你會怎麼規劃一個月的社群貼文排程？會參考哪些數據？' },
        { id: 'media1_s1', cat: 'situ', kind: 'good', cost: 3, comp: 'customer', text: '品牌貼文底下突然湧入大量負評，說商品有瑕疵，你會怎麼處理？' },
        { id: 'media1_s2', cat: 'situ', kind: 'good', cost: 3, comp: 'learning', text: '主管希望下個月開始經營短影音，但你沒拍過，你會怎麼準備？' },
        { id: 'media1_x1', cat: 'tech', kind: 'poor', cost: 2, tpl: 'closed', text: '你平常很常滑 IG，應該很懂社群吧？',
          note: '誘導式封閉問題，會滑手機不等於會經營社群，看不出實際能力', better: '如果一篇貼文的觸及很高，但互動率很低，你會怎麼分析原因？' },
      ],
      candidates: [],
    },

    // ===== Level 2: Digital ads specialist (difficulty 2) =====
    {
      id: 'media-2',
      position: '數位廣告投放專員',
      difficulty: 2,
      company: '浪潮數位行銷',
      jd: '負責電商客戶的 Meta 與 Google 廣告投放，規劃受眾與預算、執行 A/B 測試，並每月向客戶提出成效報告。',
      competencies: ['professional', 'problem', 'integrity'],
      questions: [
        { id: 'media2_t1', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '電商客戶的 ROAS 連續兩週下滑，你會從哪些地方開始檢查？' },
        { id: 'media2_t2', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '新品上市有 30 萬預算，你會怎麼分配 Meta 和 Google 的預算與受眾？' },
        { id: 'media2_s1', cat: 'situ', kind: 'good', cost: 3, comp: 'problem', text: '活動前一天，主力廣告素材被平台拒登，帳號還收到警告，你會怎麼處理？' },
        { id: 'media2_s2', cat: 'situ', kind: 'good', cost: 3, comp: 'integrity', text: '月底發現成效遠低於客戶 KPI，主管暗示你換個指標包裝報告，你會怎麼做？' },
        { id: 'media2_x1', cat: 'tech', kind: 'poor', cost: 2, tpl: 'closed', text: '你投的廣告 ROAS 應該都有 3 以上吧？',
          note: '封閉又預設答案，候選人只會說有；ROAS 高低也受產業、客單價與歸因方式影響，脫離情境沒有意義', better: '電商客戶的 ROAS 連續兩週下滑，你會從哪些地方開始檢查？' },
      ],
      candidates: [],
    },

    // ===== Level 3: Brand marketing manager (difficulty 3) =====
    {
      id: 'media-3',
      position: '品牌行銷經理',
      difficulty: 3,
      company: '森沐保養',
      jd: '帶領 5 人品牌團隊，負責保養品牌定位、年度行銷策略與預算，管理廣告代理商，並與業務、產品部門協調上市計畫。',
      competencies: ['leadership', 'professional', 'communication'],
      questions: [
        { id: 'media3_t1', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '品牌聲量很高，但營收連續兩季停滯，你會怎麼診斷問題、調整策略？' },
        { id: 'media3_t2', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '年度行銷預算被砍三成，你會怎麼重新分配品牌廣告與成效廣告？' },
        { id: 'media3_s1', cat: 'situ', kind: 'good', cost: 3, comp: 'leadership', text: '團隊資深企劃連續幾次提案都偏離品牌調性，最近開始消極應付，你會怎麼處理？' },
        { id: 'media3_s2', cat: 'situ', kind: 'good', cost: 3, comp: 'communication', text: '業務部要求下一季全面打七折衝業績，你認為會傷害品牌，你會怎麼溝通？' },
        { id: 'media3_x1', cat: 'tech', kind: 'poor', cost: 2, tpl: 'closed', text: '你操盤過的品牌活動應該都很成功吧？',
          note: '誘導式封閉問題，候選人只會說「是」，看不出他在活動中的角色與判斷', better: '請挑一個你操盤過、成效不如預期的品牌活動，說說你後來怎麼調整？' },
      ],
      candidates: [],
    },
  ],
});
