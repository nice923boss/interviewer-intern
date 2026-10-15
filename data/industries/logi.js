var TII = globalThis.TII;

TII.registerIndustry({
  id: 'logi',
  name: '物流運輸',
  icon: '🚚',
  color: '#3d5a80',
  bg: 'assets/bg/logi.webp',
  interviewer: { name: '何致遠', title: '物流中心協理', sprite: 'i_logi' },
  levels: [
    // ===== Level 1: Warehouse picker (difficulty 1) =====
    {
      id: 'logi-1',
      position: '倉儲理貨專員',
      difficulty: 1,
      company: '順嶺物流',
      jd: '負責物流中心進貨驗收、上架、揀貨與盤點，使用 WMS 手持掃描作業，需配合輪班與旺季加班。',
      competencies: ['professional', 'teamwork', 'integrity'],
      questions: [
        { id: 'logi1_t1', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '揀貨時手持機顯示的儲位上沒有貨，你會怎麼處理？' },
        { id: 'logi1_t2', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '同一個品項有好幾批不同效期的貨，上架和揀貨時你會注意什麼？' },
        { id: 'logi1_s1', cat: 'situ', kind: 'good', cost: 3, comp: 'teamwork', text: '晚上九點出車前還有兩百張單沒揀完，你負責的區已經做完了，你會怎麼做？' },
        { id: 'logi1_s2', cat: 'situ', kind: 'good', cost: 3, comp: 'integrity', text: '你看到同事為了趕件數，沒刷條碼就直接把貨丟上籠車，你會怎麼做？' },
        { id: 'logi1_x1', cat: 'tech', kind: 'poor', cost: 2, tpl: 'closed', text: '你有堆高機證照吧？',
          note: '封閉式問題只能得到「有」或「沒有」，看不出實際操作經驗與安全觀念', better: '你開堆高機最常做哪些作業？有遇過什麼需要特別小心的狀況？' },
      ],
      candidates: [],
    },

    // ===== Level 2: Dispatcher (difficulty 2) =====
    {
      id: 'logi-2',
      position: '物流調度專員',
      difficulty: 2,
      company: '速航運通',
      jd: '負責北區配送車趟排程與司機調度，處理客戶急單、異常件與到貨時效追蹤，需熟悉 TMS 與 Excel。',
      competencies: ['problem', 'communication', 'pressure'],
      questions: [
        { id: 'logi2_t1', cat: 'tech', kind: 'good', cost: 3, comp: 'problem', text: '明天北區有 180 個配送點、12 台車，你排車趟時會考慮哪些因素？' },
        { id: 'logi2_t2', cat: 'tech', kind: 'good', cost: 3, comp: 'problem', text: '這個月到貨準時率從 97% 掉到 92%，你會怎麼找出原因？' },
        { id: 'logi2_s1', cat: 'situ', kind: 'good', cost: 3, comp: 'communication', text: '司機嫌你排的路線太遠、件數太多，當著大家的面跟你吵，你會怎麼處理？' },
        { id: 'logi2_s2', cat: 'situ', kind: 'good', cost: 3, comp: 'pressure', text: '下午四點客戶臨時追加一批冷藏急單，車都已經派出去了，你會怎麼做？' },
        { id: 'logi2_x1', cat: 'situ', kind: 'poor', cost: 2, tpl: 'closed', text: '你應該不怕被客戶罵吧？',
          note: '帶有預設答案的封閉問題，候選人只會說「不怕」，看不出實際應對方式', better: '說一次客戶因為延遲到貨很生氣的經驗，你當時怎麼處理？' },
      ],
      candidates: [],
    },

    // ===== Level 3: Distribution center manager (difficulty 3) =====
    {
      id: 'logi-3',
      position: '物流中心主管',
      difficulty: 3,
      company: '群展供應鏈',
      jd: '管理常溫與低溫物流中心營運，帶領 60 人理貨與調度團隊，負責人力規劃、KPI 管理與貨主 SLA。',
      competencies: ['leadership', 'professional', 'customer'],
      questions: [
        { id: 'logi3_t1', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '你接手一座庫存準確率只有 97% 的物流中心，前三個月會怎麼改善？' },
        { id: 'logi3_t2', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '雙十一前一個月，預估出貨量是平常的三倍，你會怎麼規劃人力和產能？' },
        { id: 'logi3_s1', cat: 'situ', kind: 'good', cost: 3, comp: 'leadership', text: '兩位資深組長互不配合，夜班交接一直出錯，你會怎麼處理？' },
        { id: 'logi3_s2', cat: 'situ', kind: 'good', cost: 3, comp: 'customer', text: '最大的貨主因為連續兩週出貨錯誤，揚言要換物流商，你會怎麼做？' },
        { id: 'logi3_x1', cat: 'situ', kind: 'poor', cost: 2, tpl: 'closed', text: '你帶過的團隊應該都很服你吧？',
          note: '封閉又帶預設答案，只會得到「是」，無法了解實際帶人方式', better: '說一個團隊裡有人不服你管理的經驗，你當時怎麼處理？' },
      ],
      candidates: [],
    },
  ],
});
