// Home, level select and pre-interview briefing screens.
(function () {
  var TII = globalThis.TII;
  var ui = TII.ui;
  var e = ui.esc;

  function industryById(id) {
    return TII.industries.filter(function (i) { return i.id === id; })[0] || TII.industries[0];
  }

  function industryStars(ind) {
    return ind.levels.reduce(function (n, lv) { return n + TII.store.stars(lv.id); }, 0);
  }

  function unlockedLevels() {
    var list = [];
    TII.industries.forEach(function (ind) {
      ind.levels.forEach(function (lv, i) { if (TII.store.isUnlocked(ind, i)) list.push(lv); });
    });
    return list;
  }

  // ---------- home ----------
  ui.renderHome = function () {
    var total = ui.totalStars();
    var open = unlockedLevels().length;
    var count = TII.industries.reduce(function (n, i) {
      i.levels.forEach(function (lv) { n.levels += 1; n.cands += lv.candidates.length; });
      return n;
    }, { levels: 0, cands: 0 });
    var features = [
      ['結構化提問', '行為事件、情境模擬、專業驗證題混在題庫裡，也藏著封閉式與可能違法的問題。'],
      ['追問深挖', '針對上一個回答追問個人角色、結果數據、反思改進與情境細節。'],
      ['看穿真相', '每位候選人都藏著特質，追問到位就會觸發會心一擊。'],
      ['教練報告', '總評、法律合規性檢測、提問技巧分析（STAR 檢核），加上五大面向評分與改進建議。'],
    ];
    ui.screen('home').innerHTML =
      '<div class="home-wrap">' +
        '<div class="hero" style="background-image:url(assets/ui/title.webp)">' +
          '<div class="hero-text"><span class="hero-badge">💼 面試官對練</span>' +
          '<h1>面試官<em>實習生</em></h1><div class="en">THE INTERVIEWER INTERN</div></div>' +
        '</div>' +
        '<p class="tagline">' + TII.industries.length + ' 大產業、' + count.levels + ' 個職缺、' + count.cands + ' 位候選人，<br class="br-mobile">每次坐在你對面的人都不一樣。<br>問對問題、追到細節、看穿包裝，<br class="br-mobile">結束後取得評分與教練建議。</p>' +
        '<div class="mode-row">' +
          '<button class="mode-card" data-action="go-levels"><span class="icon">🎯</span><h2>實習關卡</h2>' +
            '<p>依產業逐關挑戰，從新人職缺一路到主管職。拿到星星就能解鎖下一關。</p>' +
            '<span class="meta">⭐ ' + total.n + ' / ' + total.max + '</span></button>' +
          '<button class="mode-card" data-action="random"><span class="icon">🎲</span><h2>隨機面試</h2>' +
            '<p>從已解鎖的職缺隨機抽一位候選人，模擬真實面試的不確定感。</p>' +
            '<span class="meta">已解鎖 ' + open + ' 個職缺</span></button>' +
        '</div>' +
        '<div class="home-links">' +
          '<button class="btn btn-ghost btn-sm" data-action="how">📖 玩法說明</button>' +
          (TII.voice.supported ? '<button class="btn btn-ghost btn-sm" data-action="voice-settings">🔊 語音設定</button>' : '') +
          '<button class="btn btn-ghost btn-sm" data-action="reset">↺ 重置進度</button>' +
        '</div>' +
        '<div class="feature-row">' + features.map(function (f) {
          return '<div class="panel feature"><b>' + e(f[0]) + '</b><span>' + e(f[1]) + '</span></div>';
        }).join('') + '</div>' +
      '</div>';
    ui.show('home');
    TII.fx.scene(ui.screen('home').querySelector('.hero'), { kind: 'hero', ambient: 10, color: '#fff3c4' });
  };

  // ---------- level select ----------
  ui.renderLevels = function (industryId) {
    var ind = industryById(industryId || TII.app.industryId);
    TII.app.industryId = ind.id;
    var total = ui.totalStars();
    var tabs = TII.industries.map(function (i) {
      return '<button class="industry-tab' + (i.id === ind.id ? ' active' : '') + '" data-action="pick-industry" data-id="' + e(i.id) + '">' +
        e(i.icon) + ' ' + e(i.name) + ' <small>⭐ ' + industryStars(i) + '/' + i.levels.length * 3 + '</small></button>';
    }).join('');
    var cards = ind.levels.map(function (lv, idx) {
      var open = TII.store.isUnlocked(ind, idx);
      var best = TII.store.get().best[lv.id];
      return '<button class="level-card' + (open ? '' : ' locked') + '" style="--lv-color:' + e(ind.color) + '"' +
        (open ? ' data-action="pick-level" data-id="' + e(lv.id) + '"' : ' disabled') + '>' +
        '<span class="diff">' + ui.stars(lv.difficulty) + ' ' + ui.diffLabel(lv.difficulty) + '</span>' +
        '<span class="diff-desc">' + e(ui.diffDesc(lv.difficulty)) + '</span>' +
        '<h3>' + e(lv.position) + '</h3><span class="company">🏢 ' + e(lv.company) + '</span>' +
        '<span class="jd">' + e(lv.jd) + '</span>' +
        '<span class="foot">' + (open
          ? '<span class="best">' + (best ? '最佳 ' + e(best.grade) + '・' + best.score + ' 分' : '尚未挑戰') + '</span>' + ui.stars(TII.store.stars(lv.id))
          : '<span class="lock-note">🔒 前一關取得 1 顆星解鎖</span>') + '</span>' +
        '</button>';
    }).join('');
    ui.screen('levels').innerHTML =
      '<div class="topnav"><button class="btn btn-sm" data-action="home">🏠 首頁</button>' +
        '<span class="brand-mini">實習關卡</span><span class="spacer"></span>' +
        '<span class="chip chip-accent">⭐ ' + total.n + ' / ' + total.max + '</span></div>' +
      '<div class="levels-wrap">' +
        '<div class="industry-tabs">' + tabs + '</div>' +
        '<div class="panel industry-head">' + ui.img(TII.spritePath(ind.interviewer.sprite), '', ind.interviewer.name) +
          '<div><h2>' + e(ind.icon) + ' ' + e(ind.name) + '</h2>' +
          '<p>主考官：' + e(ind.interviewer.name) + '（' + e(ind.interviewer.title) + '）。你以實習面試官的身分坐在他旁邊，負責主導提問。</p></div></div>' +
        '<div class="level-grid">' + cards + '</div>' +
      '</div>';
    ui.show('levels');
    var head = ui.screen('levels').querySelector('.industry-head');
    TII.fx.scene(head, { actors: [head.querySelector('img')], color: ind.color });
  };

  // ---------- briefing ----------
  var TIPS = {
    1: [
      '面試時間 30 分鐘，每個問題都會花時間，題目卡上的「⏱ N 分」是預估耗時。',
      '先說明流程或寒暄，候選人越放鬆，越願意說真話。',
      '聽到「主導」「大幅提升」這類漂亮話，用「追問深挖」問個人角色與具體數字。',
      '題庫裡混了封閉式、誘導式，甚至可能違法的問題，問出口前先想一想。',
      '最後留時間讓候選人提問，並說明後續流程。',
    ],
    2: [
      '這一關的教練筆記變少了，含糊的回答要靠自己聽出來。',
      '有些真相要候選人夠放鬆才會說，先把氣氛顧好再追問。',
      '不要只看表面：會講話不一定是包裝，講得含糊也不一定沒料。',
    ],
    3: [
      '主管職候選人更會包裝，教練筆記非常少。',
      '深層的真相多半要用「反思改進」或「情境細節」追問，而且候選人要夠放鬆。',
      '領導職能要問到「怎麼帶人」的具體做法，而不只是團隊成果。',
    ],
  };

  ui.renderBrief = function () {
    var found = TII.findLevel(TII.app.levelId);
    var ind = found.industry;
    var lv = found.level;
    var c = TII.findCandidate(lv.id, TII.app.candId);
    var r = c.resume;
    var comps = lv.competencies.map(function (k) {
      return '<span class="chip">' + TII.competencies[k].icon + ' ' + e(TII.competencies[k].name) + '</span>';
    }).join('');
    ui.screen('brief').innerHTML =
      '<div class="topnav"><button class="btn btn-sm" data-action="go-levels">← 返回關卡</button>' +
        '<span class="brand-mini">' + (TII.app.mode === 'random' ? '🎲 隨機面試' : '面試前準備') + '</span><span class="spacer"></span></div>' +
      '<div class="brief-wrap"><div class="brief-grid">' +
        '<div class="panel brief-card"><h3 class="panel-title">📋 職缺資訊</h3>' +
          '<div class="person">' + ui.img(TII.spritePath(ind.interviewer.sprite), '', ind.interviewer.name) +
            '<div><h3>' + e(lv.position) + '</h3><div class="sub">' + e(ind.icon) + ' ' + e(ind.name) + '・' + ui.stars(lv.difficulty) + ' ' + ui.diffLabel(lv.difficulty) + '</div>' +
            '<div class="sub">' + e(ui.diffDesc(lv.difficulty)) + '</div>' +
            '<div class="sub">主考官 ' + e(ind.interviewer.name) + '（' + e(ind.interviewer.title) + '）</div></div></div>' +
          '<dl class="kv"><dt>公司</dt><dd>' + e(lv.company) + '</dd>' +
            '<dt>工作內容</dt><dd>' + e(lv.jd) + '</dd>' +
            '<dt>關鍵職能</dt><dd><div class="comp-chips">' + comps + '</div></dd></dl>' +
        '</div>' +
        '<div class="panel brief-card"><h3 class="panel-title">📄 候選人履歷</h3>' +
          '<div class="person">' + ui.img(TII.spritePath(c.sprite), '', c.name) +
            '<div><h3>' + e(c.name) + '</h3><div class="sub">' + e(r.headline) + '</div></div></div>' +
          '<dl class="kv"><dt>學歷</dt><dd>' + e(r.education) + '</dd>' +
            '<dt>經歷</dt><dd><ul class="resume-list">' + r.experience.map(function (x) { return '<li>' + e(x) + '</li>'; }).join('') + '</ul></dd>' +
            '<dt>技能</dt><dd><div class="comp-chips">' + (r.skills || []).map(function (x) { return '<span class="chip">' + e(x) + '</span>'; }).join('') + '</div></dd></dl>' +
          (r.note ? '<div class="resume-note">' + e(r.note) + '</div>' : '') +
        '</div>' +
      '</div>' +
      '<div class="panel tips-box"><h3 class="panel-title">🎓 面試前提醒</h3><ul>' +
        (TIPS[lv.difficulty] || TIPS[1]).map(function (t) { return '<li>' + e(t) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="panel real-box' + (TII.app.realMode ? ' on' : '') + '">' +
        '<button class="btn btn-sm' + (TII.app.realMode ? ' btn-primary' : '') + '" data-action="toggle-real" aria-pressed="' + !!TII.app.realMode + '">🎯 實戰模式：' + (TII.app.realMode ? '開' : '關') + '</button>' +
        '<span>開啟後，面試中不顯示教練筆記、法規提醒與風險計數，所有回饋集中到結束後的報告，模擬真實面試。</span></div>' +
      '<div class="brief-actions">' +
        (lv.candidates.length > 1 ? '<button class="btn" data-action="reroll">🔄 換一位候選人</button>' : '') +
        '<button class="btn btn-primary" data-action="start">開始面試 ▶</button>' +
      '</div></div>';
    ui.show('brief');
    ui.screen('brief').querySelectorAll('.person').forEach(function (el) {
      TII.fx.scene(el, { actors: [el.querySelector('img')], color: ind.color });
    });
  };

  ui.openLevel = function (levelId, candId) {
    var found = TII.findLevel(levelId);
    TII.app.levelId = levelId;
    TII.app.industryId = found.industry.id;
    TII.app.candId = candId || TII.store.nextCandidate(found.level).id;
    ui.renderBrief();
  };

  // ---------- actions ----------
  ui.on('home', function () { ui.renderHome(); });
  ui.on('go-levels', function () { TII.app.mode = 'campaign'; ui.renderLevels(); });
  ui.on('pick-industry', function (d) { ui.renderLevels(d.id); });
  ui.on('pick-level', function (d) { TII.app.mode = 'campaign'; ui.openLevel(d.id); });

  ui.on('random', function () {
    var pool = unlockedLevels();
    var lv = pool[Math.floor(Math.random() * pool.length)];
    TII.app.mode = 'random';
    ui.openLevel(lv.id, lv.candidates[Math.floor(Math.random() * lv.candidates.length)].id);
  });

  ui.on('reroll', function () {
    var lv = TII.findLevel(TII.app.levelId).level;
    var others = lv.candidates.filter(function (c) { return c.id !== TII.app.candId; });
    TII.app.candId = others[Math.floor(Math.random() * others.length)].id;
    ui.renderBrief();
  });

  ui.on('toggle-real', function () {
    TII.app.realMode = !TII.app.realMode;
    TII.store.setPref('realMode', TII.app.realMode);
    ui.renderBrief();
  });

  ui.on('how', function () {
    var items = [
      '你是主考官身邊的實習面試官，要在 30 分鐘內面試一位候選人。',
      '題目分成開場破冰、行為事件、情境模擬、專業驗證、追問深挖、動機背景、收尾說明七類，每題都會花時間。',
      '題庫裡混了封閉式、誘導式，甚至可能違法的問題，要自己判斷。',
      '😌 放鬆度：候選人越放鬆，越願意講真話，部分真相要放鬆度夠高才問得出來。',
      '💗 意願度：冒犯或無關的問題會讓意願度下降，歸零時候選人會離席。',
      '🔍 追問深挖：針對上一個回答追問個人角色、結果數據、反思改進或情境細節，追到關鍵會觸發「看穿真相」。',
      '面試結束後，替每項關鍵職能評分並給出錄用結論，系統會對照候選人的真實狀況回饋。',
      '評分五大面向：提問品質 25、職能覆蓋 20、追問深度 20、判斷準確 25、候選人體驗 10。問了違法問題，等第最高只有 C。',
      '教練報告包含總評、法律合規性檢測、提問技巧分析（結構化程度、職能對焦、STAR 檢核）與下一步改進建議，可以列印或存成 PDF。',
      '🎯 實戰模式：在面試前準備畫面開啟，面試中不顯示教練筆記、法規提醒與風險計數，回饋全部留到報告。',
    ];
    ui.modal('📖 玩法說明', '<ul>' + items.map(function (t) { return '<li>' + e(t) + '</li>'; }).join('') + '</ul>');
  });

  ui.on('reset', function () {
    ui.modal('重置進度', '<p>所有關卡的星星、最佳成績與遇過的候選人都會清除，確定要重置嗎？</p>',
      '<button class="btn" data-action="overlay-close">取消</button><button class="btn btn-danger" data-action="reset-confirm">確定重置</button>');
  });
  ui.on('reset-confirm', function () {
    TII.store.reset();
    ui.clearOverlays();
    ui.renderHome();
    ui.toast('進度已重置');
  });
})();
