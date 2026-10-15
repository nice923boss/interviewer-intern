// Shared game data: competencies, common question bank, legal references,
// candidate archetype templates, candidate-ask pool and sprite registry.
var TII = (globalThis.TII = globalThis.TII || {});

TII.industries = TII.industries || [];
TII.registerIndustry = function (industry) {
  TII.industries.push(industry);
};

// Extra candidates live in data/cands/<levelId>.js and load after their industry file
TII.addCandidates = function (levelId, list) {
  for (var i = 0; i < TII.industries.length; i++) {
    var levels = TII.industries[i].levels;
    for (var j = 0; j < levels.length; j++) {
      if (levels[j].id === levelId) {
        levels[j].candidates = levels[j].candidates.concat(list);
        return;
      }
    }
  }
  console.error('addCandidates：找不到關卡 ' + levelId);
};

TII.TIME_LIMIT = 30; // interview minutes

TII.competencies = {
  communication: { name: '溝通表達', icon: '💬' },
  teamwork: { name: '團隊合作', icon: '🤝' },
  problem: { name: '問題解決', icon: '🧩' },
  customer: { name: '顧客導向', icon: '🙋' },
  leadership: { name: '領導帶人', icon: '🧭' },
  learning: { name: '學習成長', icon: '📚' },
  pressure: { name: '抗壓韌性', icon: '🛡️' },
  integrity: { name: '誠信負責', icon: '⚖️' },
  professional: { name: '專業能力', icon: '🛠️' },
};

TII.categories = [
  { key: 'open', name: '開場破冰', icon: '🤝' },
  { key: 'star', name: '行為事件', icon: '⭐' },
  { key: 'situ', name: '情境模擬', icon: '🧩' },
  { key: 'tech', name: '專業驗證', icon: '🛠️' },
  { key: 'probe', name: '追問深挖', icon: '🔍' },
  { key: 'motive', name: '動機背景', icon: '🎯' },
  { key: 'close', name: '收尾說明', icon: '🏁' },
];

TII.ratingLabels = { 0: '無法判斷', 1: '不足', 2: '符合', 3: '優秀' };
TII.decisionLabels = { hire: '建議錄取', maybe: '進入下一輪', nohire: '不錄取' };

// kind: good = structured / behavioral; ok = acceptable but low information;
// poor = closed, leading or cliche; yellow = privacy risk; red = discrimination risk
TII.commonQuestions = [
  { id: 'o_process', cat: 'open', kind: 'good', cost: 1, text: '今天面試大約 30 分鐘，我會先了解你的經歷，最後留時間讓你提問。', effect: { comfort: 12 }, tpl: 'process' },
  { id: 'o_ice', cat: 'open', kind: 'good', cost: 1, text: '今天過來路上還順利嗎？要不要先喝杯水？', effect: { comfort: 8 }, tpl: 'ice' },
  { id: 'o_intro', cat: 'open', kind: 'ok', cost: 2, text: '請先用兩三分鐘簡單介紹一下自己。', effect: { comfort: 3 }, src: 'intro' },
  { id: 'o_hometown', cat: 'open', kind: 'red', legal: 'origin', cost: 1, text: '聽你口音，你是哪裡人？老家在哪裡？', better: '這個職位需要不定期跨縣市出差，在通勤或外派上，有沒有需要我們先了解的地方？' },
  { id: 'o_age', cat: 'open', kind: 'red', legal: 'age', cost: 1, text: '你看起來很年輕耶，是幾年次的？', better: '這個職位需要 3 年以上相關經驗，可以談談你累積了哪些經歷嗎？' },
  { id: 'o_zodiac', cat: 'open', kind: 'red', legal: 'zodiac', cost: 1, text: '順便問一下，你是什麼星座、什麼血型？我們主管很重視這個。', better: '我們團隊節奏快、常要跨部門協作，你喜歡什麼樣的工作方式？' },

  { id: 's_communication', cat: 'star', kind: 'good', cost: 4, comp: 'communication', text: '請分享一次你需要說服別人接受你想法的經驗，當時你怎麼做？' },
  { id: 's_teamwork', cat: 'star', kind: 'good', cost: 4, comp: 'teamwork', text: '請分享一次你和同事意見不合的經驗，當時怎麼處理？' },
  { id: 's_problem', cat: 'star', kind: 'good', cost: 4, comp: 'problem', text: '請分享一個你在工作上遇到棘手問題，最後把它解決的例子。' },
  { id: 's_customer', cat: 'star', kind: 'good', cost: 4, comp: 'customer', text: '請分享一次你處理不滿意的客戶或服務對象的經驗。' },
  { id: 's_leadership', cat: 'star', kind: 'good', cost: 4, comp: 'leadership', text: '請分享一次你帶領團隊，或推動別人一起完成目標的經驗。' },
  { id: 's_learning', cat: 'star', kind: 'good', cost: 4, comp: 'learning', text: '請分享一次你在短時間內學會新技能或新領域的經驗。' },
  { id: 's_pressure', cat: 'star', kind: 'good', cost: 4, comp: 'pressure', text: '請分享一次你在很大壓力或很緊的期限下完成工作的經驗。' },
  { id: 's_integrity', cat: 'star', kind: 'good', cost: 4, comp: 'integrity', text: '請分享一次你發現自己犯錯，或發現流程有問題時，你怎麼處理？' },
  { id: 's_professional', cat: 'star', kind: 'good', cost: 4, comp: 'professional', text: '請分享一個你最有代表性的專業成果，你在其中做了什麼？' },
  { id: 's_teamplayer', cat: 'star', kind: 'poor', cost: 2, tpl: 'closed', text: '你是一個有團隊精神的人嗎？', note: '封閉式問題，候選人只會回答「是」', better: '請分享一次你和同事意見不合的經驗，當時怎麼處理？' },
  { id: 's_stress', cat: 'star', kind: 'poor', cost: 2, tpl: 'closed', text: '這份工作壓力很大，你應該很抗壓吧？', note: '誘導式問題，已經暗示了你想聽的答案', better: '請分享一次你在很大壓力或很緊的期限下完成工作的經驗。' },
  { id: 's_weakness', cat: 'star', kind: 'poor', cost: 2, tpl: 'weakness', text: '你最大的缺點是什麼？', note: '老套題，候選人多半準備了包裝過的標準答案', better: '請分享一次你收到負面回饋的經驗，後來你做了什麼調整？' },

  { id: 'm_whyus', cat: 'motive', kind: 'ok', cost: 2, src: 'motive.whyus', text: '為什麼會想應徵我們這個職位？' },
  { id: 'm_leave', cat: 'motive', kind: 'good', cost: 2, src: 'motive.leave', text: '可以談談你離開上一份工作的原因嗎？' },
  { id: 'm_salary', cat: 'motive', kind: 'ok', cost: 1, src: 'motive.salary', text: '你對這個職位的薪資期待是多少？' },
  { id: 'm_gap', cat: 'motive', kind: 'good', cost: 2, src: 'motive.gap', tpl: 'nogap', text: '履歷上有一段空白期間，那段時間你在做什麼？' },
  { id: 'm_marriage', cat: 'motive', kind: 'red', legal: 'marriage', cost: 1, text: '你結婚了嗎？未來幾年有打算生小孩嗎？', better: '這個職位需要配合輪班與偶爾加班，時間安排上有沒有需要我們了解的地方？' },
  { id: 'm_religion', cat: 'motive', kind: 'red', legal: 'religion', cost: 1, text: '你有沒有宗教信仰？週末會不會常去參加宗教活動？', better: '這個職位每月約有兩個週末需要值班，你可以配合嗎？' },
  { id: 'm_family', cat: 'motive', kind: 'yellow', legal: 'privacy', cost: 1, text: '你爸媽是做什麼的？家裡經濟狀況還可以嗎？', better: '你為什麼會對這個產業感興趣？' },
  { id: 'm_health', cat: 'motive', kind: 'yellow', legal: 'health', cost: 1, text: '你有沒有什麼病史，或身體上的毛病？', better: '這個職位需要長時間站立與搬運約 10 公斤的物品，執行上有沒有需要我們協助調整的地方？' },

  { id: 'c_sell', cat: 'close', kind: 'good', cost: 2, text: '我介紹一下團隊，以及這個職位未來的發展方向。', effect: { interest: 12 }, tpl: 'sell' },
  { id: 'c_qa', cat: 'close', kind: 'good', cost: 2, text: '你有沒有什麼問題想問我們？', action: 'candidateAsk' },
  { id: 'c_next', cat: 'close', kind: 'good', cost: 1, text: '我說明一下後續流程，我們會在一週內通知你結果。', effect: { comfort: 5, interest: 5 }, tpl: 'next' },
];

// Probes always follow up on the most recent answer topic
TII.probes = [
  { id: 'p_role', key: 'role', text: '你在裡面具體負責哪些部分？你個人做了什麼？' },
  { id: 'p_result', key: 'result', text: '最後的結果如何？有沒有具體的數字或回饋？' },
  { id: 'p_reflect', key: 'reflect', text: '如果重來一次，你會怎麼做得不一樣？' },
  { id: 'p_more', key: 'more', text: '可以再多說一點當時的情況嗎？' },
];
TII.PROBE_COST = 2;

// Effects of risky or weak questions on the candidate
TII.kindEffects = {
  red: { comfort: -15, interest: -25 },
  yellow: { comfort: -10, interest: -12 },
  poor: { interest: -2 },
};

// Teaching references only; always check the latest official text
TII.legal = {
  age: { topic: '年齡', law: '就業服務法第 5 條第 1 項', penalty: '同法第 65 條：新臺幣 30 萬元以上 150 萬元以下罰鍰' },
  origin: { topic: '籍貫、出生地', law: '就業服務法第 5 條第 1 項', penalty: '同法第 65 條：新臺幣 30 萬元以上 150 萬元以下罰鍰' },
  zodiac: { topic: '星座、血型', law: '就業服務法第 5 條第 1 項', penalty: '同法第 65 條：新臺幣 30 萬元以上 150 萬元以下罰鍰' },
  religion: { topic: '宗教', law: '就業服務法第 5 條第 1 項', penalty: '同法第 65 條：新臺幣 30 萬元以上 150 萬元以下罰鍰' },
  marriage: { topic: '婚姻、懷孕、育兒', law: '就業服務法第 5 條第 1 項；性別平等工作法第 7 條、第 11 條', penalty: '就業服務法第 65 條、性別平等工作法第 38-1 條：新臺幣 30 萬元以上 150 萬元以下罰鍰' },
  privacy: { topic: '非屬就業所需之隱私資料（家庭背景、經濟狀況）', law: '就業服務法第 5 條第 2 項第 2 款', penalty: '同法第 67 條：新臺幣 6 萬元以上 30 萬元以下罰鍰' },
  health: { topic: '病史等生理隱私（並可能涉及身心障礙歧視）', law: '就業服務法第 5 條第 1 項、第 2 項第 2 款', penalty: '依情節適用同法第 65 條或第 67 條罰鍰' },
};

// Archetype templates cover every answer a candidate does not author explicitly
TII.archetypes = {
  polished: {
    label: '能言善道', comfort: 60, interest: 70,
    process: '好的，謝謝您先說明流程，我準備好了。',
    ice: '很順利，謝謝！公司環境很棒，一進來就感受到很有活力。',
    generic: ['這方面我一直表現得不錯，主管和同事都滿肯定我的。', '我認為這是職場上非常重要的能力，我也一直有意識地在培養。'],
    closed: ['當然！這絕對是我的強項。', '是的，完全沒問題，我很有自信。'],
    weakness: '我的缺點大概是太追求完美，常常會多花時間把細節做到最好。',
    red: ['（笑容僵了一下）這個……應該跟工作表現沒有直接關係吧？不過我可以全心投入工作。', '呃，這題有點私人，我想先專注在工作相關的部分可以嗎？'],
    yellow: ['（停頓）家裡都還好，不會影響工作的。', '這部分比較私人，但我保證不會影響工作。'],
    guard: ['嗯，主要是個人生涯規劃的考量，想尋求更好的發展。', '這個說來話長，總之是想挑戰更大的舞台。'],
    noProbe: '就像我剛剛說的，整體來說執行得非常順利。',
    nogap: '我的經歷應該都是連續的喔，沒有空窗期。',
    sell: '聽起來很棒！這正是我想要的發展方向。',
    next: '好的，非常感謝您今天的時間，期待您的好消息！',
  },
  humble: {
    label: '低調務實', comfort: 45, interest: 65,
    process: '好的，謝謝。',
    ice: '還好，有提早出門，謝謝您。',
    generic: ['這個……我覺得我還有很多要學的地方，不太敢說自己很厲害。', '應該算是可以吧，就是盡量把該做的事做好。'],
    closed: ['嗯……應該算是吧。', '我會盡力。'],
    weakness: '我比較不擅長主動表現自己，有時候做了很多但別人不知道。',
    red: ['（愣住）呃……這個需要回答嗎？', '（低頭）這個……我不太確定要怎麼回答。'],
    yellow: ['（有點不自在）家裡……還好，就普通家庭。', '嗯……這個我想保留一下，可以嗎？'],
    guard: ['嗯……就是一些個人因素。', '其實也沒什麼特別的，就是想換個環境。'],
    noProbe: '嗯……大概就是剛剛說的那樣。',
    nogap: '我的工作經歷應該是連續的，沒有中斷。',
    sell: '聽起來很不錯，謝謝您的介紹。',
    next: '好的，謝謝您，我會等通知。',
  },
  nervous: {
    label: '緊張生澀', comfort: 30, interest: 70,
    process: '好、好的！謝謝您，我有比較放鬆一點了。',
    ice: '還、還算順利，謝謝！我有點緊張，不好意思。',
    generic: ['呃……我覺得我、我應該還可以……', '這個……我之前好像沒有特別遇到，不好意思。'],
    closed: ['是、是的！', '對，我可以！'],
    weakness: '我的缺點是……容易緊張，像現在這樣，不好意思。',
    red: ['啊……我、我是……（不知所措，雙手緊握）', '這、這個……一定要說嗎？（明顯更緊張了）'],
    yellow: ['呃……我爸媽……（聲音越來越小）', '那個……我、我身體還好……'],
    guard: ['就……一些原因……不好意思。', '嗯……那時候狀況比較複雜……'],
    noProbe: '呃，就、就是剛剛說的那樣……',
    nogap: '我、我應該沒有空窗期……',
    sell: '哇，聽起來真的很好！謝謝您！',
    next: '好的！謝謝您，今天真的很謝謝！',
  },
  direct: {
    label: '直率坦白', comfort: 50, interest: 60,
    process: '好，了解。',
    ice: '順利，捷運直達很方便。',
    generic: ['這方面我沒有特別突出，但該做的都有做到。', '老實說，這不是我最強的部分。'],
    closed: ['是。', '可以，這沒什麼問題。'],
    weakness: '我講話比較直，有時候會讓別人覺得不夠委婉。',
    red: ['請問這跟職位有什麼關係？我不太想回答這個問題。', '這題我不回答，我覺得不太適合在面試問。'],
    yellow: ['我家裡的狀況跟工作能力應該沒有關係吧。', '這個我覺得沒有必要說明。'],
    guard: ['就是理念不合，我不想多說前公司的事。', '有一些狀況，但我覺得現在說不太適合。'],
    noProbe: '我剛剛已經說完了，就是那樣。',
    nogap: '我沒有空窗期。',
    sell: '嗯，聽起來不錯，我會考慮看看。',
    next: '好，謝謝，等你們通知。',
  },
};

// Questions candidates ask back; each option teaches honest employer branding
TII.candidateAsks = {
  overtime: {
    text: '這個職位平常會常加班嗎？',
    options: [
      { type: 'honest', text: '旺季大概一週會加班一兩天，有加班費或補休，平常大多可以準時下班。', interest: 6, note: '誠實說明，候選人能做出知情的決定' },
      { type: 'oversell', text: '完全不會加班啦，我們很重視生活平衡！', interest: 8, note: '過度承諾，到職後落差大，容易造成早期離職' },
      { type: 'evasive', text: '這個進來之後就會知道了。', interest: -10, note: '迴避問題，候選人會懷疑公司有隱情' },
    ],
  },
  growth: {
    text: '這個職位未來有什麼發展或升遷機會？',
    options: [
      { type: 'honest', text: '表現好的同仁大約兩到三年有機會升任小組長，我們每半年會做一次職涯面談。', interest: 6, note: '具體說明發展路徑，建立信任' },
      { type: 'oversell', text: '只要你夠努力，一年內就能當主管！', interest: 8, note: '開出做不到的支票，會傷害雇主信譽' },
      { type: 'evasive', text: '這要看你自己的表現。', interest: -8, note: '回答空泛，候選人得不到有用資訊' },
    ],
  },
  team: {
    text: '我會跟什麼樣的團隊一起工作？',
    options: [
      { type: 'honest', text: '團隊有六個人，年資從一年到十年都有，大家習慣每天早上花十分鐘對齊進度。', interest: 6, note: '描述具體，候選人能想像工作情境' },
      { type: 'oversell', text: '我們團隊超棒，從來沒有任何衝突！', interest: 6, note: '不切實際的描述，候選人反而會起疑' },
      { type: 'evasive', text: '就是一般的團隊啊。', interest: -8, note: '錯失吸引候選人的機會' },
    ],
  },
  training: {
    text: '公司有新人訓練或教育訓練嗎？',
    options: [
      { type: 'honest', text: '前三個月有學長姐帶，第一週有完整的新人訓練，之後每年有教育訓練預算。', interest: 6, note: '具體說明培訓安排，降低候選人不安' },
      { type: 'oversell', text: '我們的訓練是業界最完整的，保證讓你脫胎換骨！', interest: 6, note: '誇大承諾，到職後容易失望' },
      { type: 'evasive', text: '大部分都是做中學啦。', interest: -6, note: '讓候選人擔心進來後沒人帶' },
    ],
  },
  flexible: {
    text: '請問有沒有彈性上班或遠距的可能？',
    options: [
      { type: 'honest', text: '上班時間可以在八點到十點之間彈性打卡，遠距目前沒有，主要是工作性質需要在現場。', interest: 5, note: '清楚說明可以與不可以的部分' },
      { type: 'oversell', text: '都可以談，想怎麼上班都沒問題！', interest: 7, note: '承諾超出權限，到職後會產生糾紛' },
      { type: 'evasive', text: '這個要問 HR，我不清楚。', interest: -6, note: '面試官對基本制度不熟，降低專業感' },
    ],
  },
  whyopen: {
    text: '這個職缺為什麼會開出來？是有人離職嗎？',
    options: [
      { type: 'honest', text: '前一位同仁內部轉調到其他部門，另外今年業務成長，也需要補人力。', interest: 6, note: '坦白說明原因，展現開放的組織文化' },
      { type: 'oversell', text: '因為公司發展太快了，大家都搶著進來！', interest: 4, note: '答非所問，候選人會覺得被敷衍' },
      { type: 'evasive', text: '這個不方便透露。', interest: -8, note: '過度保密，候選人會猜測是不是流動率很高' },
    ],
  },
  evaluation: {
    text: '公司怎麼評估這個職位的表現？',
    options: [
      { type: 'honest', text: '我們每季會用三到四個具體指標檢視，主管會跟你一對一討論，年底再做整體考核。', interest: 6, note: '說明評估標準，讓候選人知道怎麼被期待' },
      { type: 'oversell', text: '我們很彈性，不太看績效的。', interest: 4, note: '不實描述，未來考核時會產生衝突' },
      { type: 'evasive', text: '就主管覺得好就好。', interest: -8, note: '標準不透明，候選人會擔心不公平' },
    ],
  },
  salaryrange: {
    text: '請問這個職位的薪資範圍大概是多少？',
    options: [
      { type: 'honest', text: '這個職位的範圍是職缺公告上的區間，最後會依你的經驗與面試表現決定，第二輪會跟你詳細討論。', interest: 6, note: '透明但保留彈性，符合公開薪資的趨勢' },
      { type: 'oversell', text: '沒問題，你開多少我們都可以給！', interest: 6, note: '承諾超出權限，談薪時會失信' },
      { type: 'evasive', text: '你先說你要多少。', interest: -8, note: '迴避問題，讓候選人覺得被當成議價對象' },
    ],
  },
};

TII.sprites = {
  m_young_suit: '年輕男性・深藍西裝',
  m_young_casual: '年輕男性・休閒襯衫',
  m_young_glasses: '年輕男性・眼鏡毛衣',
  m_young_tech: '年輕男性・連帽外套',
  m_mid_suit: '中年男性・灰西裝',
  m_mid_shirt: '中年男性・捲袖襯衫',
  m_mid_glasses: '中年男性・眼鏡西裝外套',
  m_senior: '資深男性・灰髮西裝',
  f_young_suit: '年輕女性・黑色套裝',
  f_young_casual: '年輕女性・針織衫',
  f_young_ponytail: '年輕女性・馬尾白襯衫',
  f_young_bob: '年輕女性・鮑伯頭',
  f_mid_blazer: '中年女性・西裝外套',
  f_mid_short: '中年女性・短髮襯衫',
  f_mid_glasses: '中年女性・眼鏡',
  f_senior: '資深女性・套裝',
  m_young_vest: '年輕男性・毛衣背心',
  m_young_curly: '年輕男性・捲髮 POLO 衫',
  m_young_jacket: '年輕男性・工作夾克',
  m_young_blazer: '年輕男性・休閒西裝外套',
  m_young_stripe: '年輕男性・條紋襯衫',
  f_young_long: '年輕女性・長髮襯衫',
  f_young_glasses: '年輕女性・圓眼鏡毛衣',
  f_young_bun: '年輕女性・丸子頭',
  f_young_short: '年輕女性・短髮牛仔外套',
  f_young_braid: '年輕女性・側編髮',
  m_mid_beard: '中年男性・短鬍休閒外套',
  m_mid_polo: '中年男性・POLO 衫',
  m_mid_vest: '中年男性・背心領帶',
  m_mid_navy: '中年男性・深藍雙排扣西裝',
  m_mid_sweater: '中年男性・高領毛衣',
  f_mid_long: '中年女性・長髮窄裙',
  f_mid_bun: '中年女性・盤髮灰套裝',
  f_mid_scarf: '中年女性・絲巾風衣',
  f_mid_cardigan: '中年女性・開襟衫',
  f_mid_suit: '中年女性・深藍褲裝',
  m_senior_glasses: '資深男性・眼鏡開襟衫',
  m_senior_jacket: '資深男性・深藍夾克',
  f_senior_glasses: '資深女性・眼鏡短髮',
  f_senior_bun: '資深女性・盤髮西裝外套',
};

TII.spritePath = function (key) {
  return 'assets/chars/' + key + '.webp';
};
