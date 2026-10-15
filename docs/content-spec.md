# 關卡內容撰寫規格（Content Spec）

每個產業一個關卡檔 `data/industries/<id>.js`，每關另有一個候選人檔 `data/cands/<關卡 id>.js`（例如 `data/cands/tech-1.js`）。每關最終剛好 **10 位**候選人（關卡檔內的 + 候選人檔內的）。

寫完執行以下兩個指令，錯誤與失敗數都必須為 0：

```
node tests/validate.js <id>
node tests/engine.test.js <id>
```

## 1. 遊戲機制摘要（寫腳本前必讀）

玩家扮演**面試官**，在 30 分鐘內從選單挑題目問候選人。每題花費分鐘數，時間用完面試結束。

- **題目來源**：共用題庫（`data/common.js` 的 `commonQuestions`，含破冰、STAR 行為題、動機題、收尾題、違法地雷題）＋每關專屬的 4 題好題（2 題 `tech` 專業驗證、2 題 `situ` 情境模擬）＋ 1 題專屬爛題（`poor`）。
- **追問**（`p_role` 個人角色、`p_result` 結果數字、`p_reflect` 反思、`p_more` 多說一點）永遠針對「上一個回答」。候選人的回答若有寫對應的追問內容，就會給出更深的資訊；沒寫則用性格模板敷衍帶過（算無效追問）。
- **證據值 `ev`**（-2 到 2）：代表「這段回答給面試官的印象」對該職能的加減分訊號。表面印象和真相可以不同，這正是遊戲的核心：
  - 包裝型候選人：第一次回答 `ev: 2` 聽起來很強，追問 `role` 後揭露真相 `ev: -1` 或 `-2`。
  - 低調實力型：第一次回答 `ev: 0` 很含糊，追問 `result` 後才露出 `ev: 2` 的真本事。
- **真相 `truth`**：每個關鍵職能的真實等級（1 不足、2 符合、3 優秀）。面試結束玩家要替每項職能評分，與 `truth` 比對算「判斷準確度」。
- **錄用結論 `fit`**：`hire` 建議錄取、`maybe` 進入下一輪、`nohire` 不錄取。玩家的決定與此比對。
- **隱藏特質 `traits`**：每位候選人 1 到 2 個，藏在某個追問裡（`reveal`）。被挖到時觸發「看穿真相！」會心一擊畫面。
- **放鬆度 comfort**（0 到 100）：破冰題會提高，違法題會降低。追問可以設 `need`（放鬆度門檻），不夠時候選人用 `guard` 敷衍，不會揭露特質。
- **教練筆記 `hint`**：回答後顯示在左側紀錄欄，提示玩家「這段回答哪裡可疑、該怎麼追問」。★1 關多寫，★3 關少寫或不寫。

## 2. 檔案格式

```js
var TII = globalThis.TII;

TII.registerIndustry({
  id: 'tech',                 // 產業代碼（英文小寫）
  name: '科技業',
  icon: '💻',
  color: '#4f8cff',           // 主題色
  bg: 'assets/bg/tech.webp',  // 背景圖路徑：assets/bg/<id>.webp
  interviewer: { name: '林志遠', title: '研發部經理', sprite: 'i_tech' },  // 玩家扮演的面試官；sprite 固定 i_<id>
  levels: [ /* 剛好 3 關，difficulty 依序 1、2、3 */ ],
});
```

### 關卡 Level

```js
{
  id: 'tech-1',
  position: '前端工程師',
  difficulty: 1,
  company: '雲杉科技',        // 虛構公司名
  jd: '負責電商平台前端開發，與設計師及後端工程師協作，需熟悉 React。',   // 90 字內
  competencies: ['professional', 'teamwork', 'learning'],   // 剛好 3 個職能鍵
  questions: [
    { id: 'tech1_t1', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '如果一個頁面載入很慢，你會從哪些方向排查？' },
    { id: 'tech1_t2', cat: 'tech', kind: 'good', cost: 3, comp: 'professional', text: '你在專案裡怎麼管理元件的狀態？遇過什麼問題？' },
    { id: 'tech1_s1', cat: 'situ', kind: 'good', cost: 3, comp: 'teamwork', text: '設計稿在手機上很難實作，離上線只剩三天，你會怎麼做？' },
    { id: 'tech1_s2', cat: 'situ', kind: 'good', cost: 3, comp: 'learning', text: '如果團隊決定改用你沒用過的框架，你會怎麼在兩週內上手？' },
    { id: 'tech1_x1', cat: 'tech', kind: 'poor', cost: 2, tpl: 'closed', text: '你 React 應該很熟吧？',
      note: '誘導式封閉問題，無法驗證真實程度', better: '你在專案裡怎麼管理元件的狀態？遇過什麼問題？' },
  ],
  candidates: [ /* 關卡檔內的候選人；新產業可寫 [] ，全部放在候選人檔 */ ],
}
```

規則：
- `good` 題剛好 4 題，3 個職能每個至少被 1 題涵蓋。題目 70 字內。
- `poor` 題 1 題：誘導式或封閉式的產業題，必須附 `note`（為什麼不好）與 `better`（建議改問）。`tpl` 固定 `'closed'`。
- 題目 id 格式：`<產業><關卡>_t1`、`_t2`、`_s1`、`_s2`、`_x1`，全專案唯一。

### 候選人 Candidate

```js
{
  id: 'tech1_c1',
  name: '陳柏翰',
  sprite: 'm_young_suit',      // 從 common.js 的 TII.sprites 選；同一關 10 人不可重複；m_ 開頭為男性、f_ 開頭為女性
  archetype: 'polished',       // polished 能言善道／humble 低調務實／nervous 緊張生澀／direct 直率坦白
  // comfort: 60, interest: 70 // 選填，省略時用性格預設值
  resume: {
    headline: '前端工程師・3 年經驗',
    education: '私立大學 資訊管理學系',
    experience: ['2023/07 至今　星點電商　前端工程師', '2021/08 至 2023/06　小禾設計　網頁設計助理'],
    skills: ['React', 'TypeScript', 'Tailwind CSS'],          // 選填
    note: '自述：主導電商平台結帳流程重構，轉換率提升 30%',   // 選填，履歷上的亮點（可埋特質線索）
  },
  truth: { professional: 2, teamwork: 1, learning: 2 },   // 鍵必須等於關卡 competencies
  fit: 'maybe',
  profile: '技術能力符合，但重構專案實際只負責付款頁，履歷有灌水；與 PM 衝突後離職，團隊合作需要再確認。',
  intro: '您好，我是陳柏翰，目前在星點電商擔任前端工程師，主導過結帳流程重構，讓轉換率提升 30%。我喜歡把複雜需求做成好用的介面，希望在更有規模的團隊發揮。',
  motive: {
    whyus: { a: '貴公司的產品使用者很多，我想在更大的流量下挑戰自己，也很認同你們重視使用者體驗的文化。', ev: 0 },
    leave: {
      a: '主要是想追求更好的發展，目前公司規模比較小，成長空間有限。', ev: 0, vague: true,
      hint: '「追求更好的發展」很籠統，可以請他多說一點離職當時的情況。',
      p: { more: { a: '（猶豫了一下）其實新來的 PM 常常臨時改需求，我跟他在會議上吵過幾次，後來覺得待不下去。', ev: -1, need: 55, reveal: 'conflict', react: '這個也要講喔……' } },
    },
    salary: { a: '我目前月薪 5 萬 2，希望能有 6 萬 5 左右。', ev: 0 },
    // gap: { ... }   // 只有履歷經歷有明顯空白時才寫
  },
  stories: {          // 鍵必須等於關卡 competencies，回答 STAR 行為題用
    professional: {
      a: '我主導了結帳流程重構，把五個步驟縮成三個，轉換率提升 30%，這是我最有成就感的專案。', ev: 2, vague: true,
      hint: '「主導」和「30%」很亮眼，但個人角色與數字來源都還沒驗證。',
      p: {
        role: { a: '呃，整個專案是資深工程師規劃的，我主要負責付款頁的切版和表單驗證。', ev: -1, reveal: 'inflate', react: '你不要問得這麼細好嗎……' },
        result: { a: '30% 是行銷部那季的整體數字，當時也同步在跑促銷活動，不完全是改版的效果。', ev: -1 },
        reflect: { a: '我會一開始就跟 PM 確認追蹤指標，成效會比較好說明。', ev: 1 },
      },
    },
    teamwork: {
      a: '我跟大家都處得很好，意見不合時我會先聽對方說，再找共識。', ev: 1, vague: true,
      hint: '這是態度宣言，沒有具體事件。試著請他多說一個真實例子。',
      p: {
        more: { a: '例如之前 PM 臨時要加功能，我覺得不合理，就直接在會議上反對，後來是主管出來協調。', ev: -2 },
        reflect: { a: '現在想想，我應該會後私下跟他談，不要當眾讓他下不了台。', ev: 0 },
      },
    },
    learning: {
      a: '去年公司導入 TypeScript，我利用兩個週末看官方文件和線上課程，一個月內就能在專案裡使用。', ev: 1,
      p: {
        result: { a: '後來我負責的模組都改成 TypeScript，型別錯誤造成的 bug 明顯變少。', ev: 1 },
        reflect: { a: '如果重來，我會更早找資深同事幫忙 review，少走一些彎路。', ev: 1 },
      },
    },
  },
  answers: {          // 鍵必須涵蓋本關全部 4 題 good 題
    tech1_t1: { a: '我會先用 Lighthouse 跑分，再看圖片有沒有壓縮、有沒有 lazy loading，必要時做 code splitting。', ev: 1,
      p: { result: { a: '在星點時我把首頁圖片改成 WebP，LCP 從 4 秒降到 2.5 秒左右。', ev: 1 } } },
    tech1_t2: { a: '小專案用 useState 和 Context，大一點會用 Redux Toolkit。', ev: 1,
      p: { more: { a: '之前購物車狀態放在太多地方，常常不同步，後來統一收到 store 才解決。', ev: 1 } } },
    tech1_s1: { a: '我會直接跟設計師說這做不到，請他改稿，不然會來不及。', ev: -1,
      p: { reflect: { a: '嗯，也許可以先做一個簡化版讓他確認，上線後再補完整效果。', ev: 0 } } },
    tech1_s2: { a: '先看官方教學把基本概念跑過一遍，再拿一個小功能練手，有問題就查文件。', ev: 1 },
  },
  traits: [
    { id: 'inflate', name: '履歷灌水', desc: '「主導重構」實際只負責付款頁切版，30% 也不是改版的單一成果。', positive: false },
    { id: 'conflict', name: '離職真相', desc: '與新任 PM 多次當眾衝突後離職。', positive: false },
  ],
  asks: ['growth', 'overtime'],   // 從 TII.candidateAsks 選 1 到 2 個
}
```

### 回答 Topic 欄位

| 欄位 | 必填 | 說明 |
|------|------|------|
| `a` | ✅ | 回答文字，140 字內，口語、像真人講話 |
| `ev` | | -2 到 2，表面印象的證據訊號，預設 0 |
| `vague` | | `true` 代表回答含糊或包裝，玩家應該追問（影響「追問深度」評分） |
| `hint` | | 教練筆記，提示可疑之處與該用哪種追問 |
| `guard` | | 放鬆度不足時的敷衍回答（省略則用性格模板） |
| `p` | | 追問回答，鍵只能是 `role`、`result`、`reflect`、`more` |

追問 `p.xxx` 欄位：`a`（必填）、`ev`、`reveal`（特質 id）、`need`（放鬆度門檻 0 到 100）、`react`（被看穿時的特寫台詞，15 字內，搭配 reveal）。

## 3. 撰寫原則

1. **繁體中文、台灣用語**。全形標點：，。、：「」（）？！……。**禁止破折號（Unicode U+2014、U+2015）**（驗證器會擋）。字串內引用一律用「」，不要用英文雙引號。
2. **人名、公司名全部虛構**，不可用真實企業或名人。
3. **同關 10 位候選人要有差異**：sprite 不可重複；四種 archetype 都要出現；`fit` 三種各至少 2 位（建議 hire 3、maybe 4、nohire 3）；男女各至少 3 位。背景、經歷年資、離職原因、特質都要彼此不同，不要寫成同一個模板換名字。
4. **`truth` 與 `fit` 要一致**：多數職能 3 且沒有 1 → `hire`；有一項 1 或優缺點混合 → `maybe`；兩項以上 1，或有誠信問題特質 → `nohire`。
5. **表面與真相要有落差**：至少一位候選人第一次回答很亮眼、追問後露餡；至少一位第一次很含糊、追問後才露出實力（positive 特質，例如「隱藏實力」）。
6. **特質必須可被挖到**：每個 trait 至少被一個追問 `reveal`。
7. **難度遞進**：
   - ★1：特質用 `role` 或 `result` 直接追問就能挖到，`need` 不設或 ≤ 40，含糊回答都寫 `hint`。
   - ★2：至少一個特質要 `need` 50 左右（要先破冰），`hint` 減半。
   - ★3（主管職）：特質需要 `need` 60 或用 `reflect`、`more` 才挖得到；`hint` 最多 1 到 2 則；候選人更會包裝；職能要含 `leadership`。
8. **sprite 依角色合理挑選**：初階職缺多用 young 系列、主管職多用 mid 或 senior 系列；不可依 sprite 的性別或年齡寫出刻板印象內容。
9. **候選人不要提到自己的年齡、婚姻、宗教、籍貫、政治立場、健康狀況、懷孕或家庭計畫**，避免與違法題的教學衝突。不寫任何政黨或政治相關內容。特質也不可以建立在這些個人隱私上。
10. 專業題與情境題要**真的像該產業面試會問的**，候選人回答要有產業細節（術語、流程、數字）。

## 4. 候選人檔案（data/cands）

```js
var TII = globalThis.TII;

TII.addCandidates('tech-1', [
  { id: 'tech1_c4', name: '…', /* 欄位同上方 Candidate 格式 */ },
  // …
]);
```

- 一個關卡一個檔案，檔名等於關卡 id。只能新增，不改關卡檔內既有的候選人。
- 候選人 id 依序編號：`<產業><關卡>_c4` 到 `_c10`（新產業從 `_c1` 開始）。
- 回答 `answers` 的鍵必須涵蓋該關的 4 題 good 題 id（先讀關卡檔）。
- 姓名只用分配給你的名單，全專案不可重複（驗證器會擋）。

## 5. 立繪分組（同關不可重複）

| 分組 | sprite 鍵 |
|------|-----------|
| 年輕男性 | m_young_suit、m_young_casual、m_young_glasses、m_young_tech、m_young_vest、m_young_curly、m_young_jacket、m_young_blazer、m_young_stripe |
| 年輕女性 | f_young_suit、f_young_casual、f_young_ponytail、f_young_bob、f_young_long、f_young_glasses、f_young_bun、f_young_short、f_young_braid |
| 中年男性 | m_mid_suit、m_mid_shirt、m_mid_glasses、m_mid_beard、m_mid_polo、m_mid_vest、m_mid_navy、m_mid_sweater |
| 中年女性 | f_mid_blazer、f_mid_short、f_mid_glasses、f_mid_long、f_mid_bun、f_mid_scarf、f_mid_cardigan、f_mid_suit |
| 資深 | m_senior、m_senior_glasses、m_senior_jacket、f_senior、f_senior_glasses、f_senior_bun |

★1 以年輕組為主，★2 年輕與中年混合，★3 主管職以中年與資深為主。

## 6. 特質參考清單（同關同名特質最多 2 次）

- 負面：履歷灌水、離職真相、搶功、頻繁跳槽、數據美化、推卸責任、報喜不報憂、技能過時、證照未到手、經驗名不符實、薪資期待落差、只想短期過渡、事必躬親、與前主管衝突、對產業不熟、副業衝突、競業條款限制、溝通強勢、細節粗心。
- 正面：隱藏實力、跨域經驗、自學能力強、危機處理經驗、帶人潛力、客戶口碑、改善提案、數據敏感、抗壓韌性、誠實坦白、長期穩定、主動補位。
- 中性或混合：同時在談其他公司、有明確的工作界線、轉職動機強烈但經驗淺。

清單只是起點，可以依產業自創更貼切的特質名稱。
