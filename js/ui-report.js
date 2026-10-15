// Post-interview rating form and coaching report.
(function () {
  var TII = globalThis.TII;
  var ui = TII.ui;
  var e = ui.esc;

  var VERDICT_CLASS = { '準確': 'v-ok', '接近': 'v-near', '誤判': 'v-miss', '未判斷': 'v-none' };
  var MATCH_TEXT = { match: '✅ 判斷一致', near: '🟡 接近', miss: '❌ 判斷相反' };
  var END_TEXT = { finished: '正常結束', timeup: '時間用完', walkout: '候選人離席' };
  var ASK_TYPE = { honest: '誠實具體', oversell: '過度承諾', evasive: '迴避含糊' };
  var COMPLIANCE = {
    pass: { cls: 'ok', label: '✅ 合格', desc: '沒有出現與職務無關、可能涉及就業歧視的提問。' },
    risk: { cls: 'warn', label: '⚠️ 有風險', desc: '出現涉及個人隱私的提問，不一定違法，但容易讓候選人覺得被冒犯。' },
    violation: { cls: 'bad', label: '❌ 嚴重違規', desc: '出現可能違反就業服務法的提問，實務上可能遭到裁罰。' },
  };
  var LEVEL_CLASS = { '高': 'hi', '中': 'mid', '低': 'lo' };

  function ctx() {
    var found = TII.findLevel(TII.app.levelId);
    return { industry: found.industry, level: found.level, cand: TII.findCandidate(found.level.id, TII.app.candId) };
  }

  // What the player actually heard for one evidence entry
  function heardText(cand, item) {
    var topic = TII.resolveTopic(cand, item.key);
    if (!topic) return '';
    return item.pk && topic.p && topic.p[item.pk] ? topic.p[item.pk].a : topic.a;
  }

  // ---------- rating ----------
  ui.renderRating = function () {
    var c = ctx();
    var s = TII.app.session;
    TII.app.ratings = TII.app.ratings || {};
    var rows = c.level.competencies.map(function (k) {
      var comp = TII.competencies[k];
      var heard = (s.evidence[k] || []).map(function (item) {
        return '<li' + (item.probe ? ' class="deep"' : '') + '>' +
          (item.probe ? '<span class="tag">追問' + e(TII.PROBE_NAMES[item.pk]) + '</span>' : '') + e(heardText(c.cand, item)) + '</li>';
      }).join('');
      var seg = [0, 1, 2, 3].map(function (v) {
        return '<button class="' + (TII.app.ratings[k] === v ? 'active' : '') + '" data-action="rate" data-comp="' + k + '" data-val="' + v + '">' +
          e(TII.ratingLabels[v]) + '</button>';
      }).join('');
      return '<div class="panel rate-row"><h3>' + comp.icon + ' ' + e(comp.name) + '</h3>' +
        (heard ? '<ul class="heard">' + heard + '</ul>' : '<div class="heard-empty">面試中沒有聽到這項職能的具體證據。</div>') +
        '<div class="seg">' + seg + '</div></div>';
    }).join('');

    var traits = s.revealed.map(function (id) {
      var t = c.cand.traits.filter(function (x) { return x.id === id; })[0];
      return '<div class="trait-found' + (t.positive ? ' good' : '') + '"><b>' + (t.positive ? '✨ ' : '🔥 ') + e(t.name) + '</b>：' + e(t.desc) + '</div>';
    }).join('');

    var decision = ['hire', 'maybe', 'nohire'].map(function (v) {
      return '<button class="' + (TII.app.decision === v ? 'active' : '') + '" data-action="decide" data-val="' + v + '">' + e(TII.decisionLabels[v]) + '</button>';
    }).join('');

    ui.screen('rating').innerHTML =
      '<div class="topnav"><span class="brand-mini">面試後評分</span><span class="spacer"></span>' +
        '<span class="chip">' + e(c.level.position) + '</span></div>' +
      '<div class="rate-wrap">' +
        '<div class="panel rate-intro">' + ui.img(TII.spritePath(c.cand.sprite), '', c.cand.name) +
          '<div><h2>替 ' + e(c.cand.name) + ' 評分</h2><p>根據面試中聽到的回答，替每項關鍵職能打分，再給出錄用結論。沒有聽到足夠證據的職能，可以選「無法判斷」。</p></div></div>' +
        rows +
        (traits ? '<div class="panel rate-row"><h3>🔍 你看穿的特質</h3>' + traits + '</div>' : '') +
        '<div class="panel rate-row"><h3>📝 錄用結論</h3><div class="seg decision">' + decision + '</div></div>' +
        '<div class="rate-actions"><button class="btn btn-primary" id="rate-submit" data-action="submit-rating">送出評分，查看報告 ▶</button></div>' +
        '<p class="disclaimer" id="rate-note"></p>' +
      '</div>';
    ui.show('rating');
    var intro = ui.screen('rating').querySelector('.rate-intro');
    TII.fx.scene(intro, { actors: [intro.querySelector('img')], color: c.industry.color });
    updateSubmit();
  };

  function updateSubmit() {
    var lv = ctx().level;
    var missing = lv.competencies.filter(function (k) { return TII.app.ratings[k] === undefined; }).length + (TII.app.decision ? 0 : 1);
    document.getElementById('rate-submit').disabled = missing > 0;
    document.getElementById('rate-note').textContent = missing ? '還有 ' + missing + ' 項沒有選。' : '';
  }

  function markActive(el) {
    el.parentElement.querySelectorAll('button').forEach(function (b) { b.classList.toggle('active', b === el); });
  }

  ui.on('rate', function (d, el) { TII.app.ratings[d.comp] = Number(d.val); markActive(el); updateSubmit(); });
  ui.on('decide', function (d, el) { TII.app.decision = d.val; markActive(el); updateSubmit(); });

  ui.on('submit-rating', function () {
    var c = ctx();
    var report = TII.evaluate(TII.app.session, TII.app.ratings, TII.app.decision);
    TII.app.report = report;
    TII.app.recordInfo = TII.store.record(c.level.id, c.cand.id, report);
    ui.renderReport();
  });

  // ---------- report ----------
  ui.renderReport = function () {
    var c = ctx();
    var r = TII.app.report;
    var rec = TII.app.recordInfo || {};
    var s = TII.app.session;
    var dl = TII.decisionLabels;

    var dims = r.dims.map(function (d) {
      return '<div class="dim"><span>' + e(d.name) + '</span><div class="bar"><div class="fill" data-w="' + (d.score / d.max * 100) + '"></div></div>' +
        '<span class="pts">' + d.score + ' / ' + d.max + '</span></div>';
    }).join('');

    var compRows = r.comps.map(function (x) {
      return '<tr><td>' + x.icon + ' ' + e(x.name) + '</td><td>' + e(TII.ratingLabels[x.rating || 0]) + '</td>' +
        '<td>' + e(TII.ratingLabels[x.truth]) + '</td><td class="verdict ' + VERDICT_CLASS[x.verdict] + '">' + e(x.verdict) + '</td></tr>';
    }).join('');

    var traits = r.traits.map(function (t) {
      return '<div class="trait-row' + (t.found ? '' : ' missed') + '"><span class="ic">' + (t.found ? (t.positive ? '✨' : '🔥') : '❔') + '</span><div>' +
        '<b>' + e(t.name) + (t.found ? '' : '（沒有挖到）') + '</b>' + e(t.desc) +
        (t.howTo ? '<div class="how">💡 ' + e(t.howTo) + '</div>' : '') + '</div></div>';
    }).join('');

    var comp = COMPLIANCE[r.compliance.status];
    var riskLog = r.compliance.log.map(function (x) {
      return '<div class="issue ' + e(x.kind) + '"><div class="q">違規問題：「' + e(x.text) + '」</div>' +
        '<div>觸法風險：' + e(x.note) + '</div>' +
        (x.law ? '<div class="law">' + e(x.law) + (x.penalty ? '，' + e(x.penalty) : '') + '</div>' : '') +
        (x.better ? '<div class="better">修正建議：' + e(x.better) + '</div>' : '') + '</div>';
    }).join('');
    var compliance = '<div class="comp-status ' + comp.cls + '"><b>' + comp.label + '</b><span>' + comp.desc + '</span></div>' + riskLog;

    var t = r.technique;
    var focusNote = (t.focus.missing.length ? '未蒐集到：' + t.focus.missing.join('、') : '關鍵職能全部有問到') +
      (t.focus.offTarget ? '；' + t.focus.offTarget + ' 題偏離 JD' : '');
    var goodList = t.goodAsks.length ? t.goodAsks.map(function (x) {
      return '<li>「' + e(x.text) + '」' + (x.probed ? '<span class="tag">有追問</span>' : '') + '</li>';
    }).join('') : '<li class="none">這次沒有問到對準 JD 職能、能讓候選人講出具體經歷的行為事件題或情境題，試著針對關鍵職能請對方舉一個真實發生過的例子。</li>';
    var missedList = t.missed.length ? t.missed.map(function (x) {
      return '<li><b>' + e(x.label) + '</b>：候選人說「' + e(x.heard) + '」' +
        (x.probe ? '，可以用「' + e(x.probeName) + '」追問：「' + e(x.probe) + '」' : '') + '</li>';
    }).join('') : '<li class="none">沒有發現漏掉追問的含糊回答。</li>';
    var rewriteList = t.rewrites.length ? t.rewrites.map(function (x) {
      return '<li><div class="q">原問法：「' + e(x.text) + '」</div><div class="better">優化後：「' + e(x.better) + '」</div>' +
        '<div class="how">' + e(x.note) + '</div></li>';
    }).join('') : '<li class="none">' + (r.compliance.log.length ?
      '沒有封閉式或誘導式的問法；違法提問的修正建議見上方「法律合規性檢測」。' : '這次沒有需要改寫的問法。') + '</li>';
    var technique =
      '<div class="tech-grid">' +
        '<div class="tech-item"><span class="lbl">結構化程度</span><b class="lv lv-' + LEVEL_CLASS[t.structure] + '">' + t.structure + '</b><span>' + e(t.structureNote) + '</span></div>' +
        '<div class="tech-item"><span class="lbl">職能對焦</span><b>' + t.focus.covered + ' / ' + t.focus.total + '（' + t.focus.pct + '%）</b><span>' + e(focusNote) + '</span></div>' +
      '</div>' +
      '<h4 class="star-title">STAR 檢核</h4>' +
      '<div class="star-block good"><div class="lbl">✅ 好的提問</div><ul>' + goodList + '</ul></div>' +
      '<div class="star-block miss"><div class="lbl">🕳️ 錯失的追問機會</div><ul>' + missedList + '</ul></div>' +
      '<div class="star-block fix"><div class="lbl">✏️ 優化範例</div><ul>' + rewriteList + '</ul></div>';

    var asks = r.asks.map(function (x) {
      return '<div class="ask-row"><div>🙋 「' + e(x.text) + '」</div><div><span class="type ' + e(x.type) + '">' + ASK_TYPE[x.type] + '</span>' +
        e(x.reply) + '</div>' + (x.note ? '<div class="how" style="color:var(--muted)">' + e(x.note) + '</div>' : '') + '</div>';
    }).join('');

    var found = TII.findLevel(c.level.id);
    var idx = found.industry.levels.indexOf(found.level);
    var next = found.industry.levels[idx + 1];
    var nextOpen = next && TII.store.isUnlocked(found.industry, idx + 1);
    var logItems = s.log.map(function (ev) { return ui.logItem(ev, c.cand.name); }).filter(Boolean);
    var transcript = logItems.join('');

    ui.screen('report').innerHTML =
      '<div class="topnav"><button class="btn btn-sm" data-action="home">🏠 首頁</button><span class="brand-mini">教練報告</span><span class="spacer"></span></div>' +
      '<div class="report-wrap">' +
        '<div class="panel report-hero"><div class="grade g-' + e(r.grade) + '">' + e(r.grade) + '<small>等第</small></div>' +
          '<div class="hero-info"><h2>' + e(c.level.position) + '・' + e(c.cand.name) + '</h2>' +
            '<div class="score">' + r.total + '<small> / 100 分</small></div>' + ui.stars(r.stars) +
            '<p class="summary">總評：' + e(r.summary) + '</p>' +
            '<div class="hero-badges">' +
              (rec.isBest ? '<span class="chip badge-new">🏆 新紀錄</span>' : '') +
              (TII.app.realMode ? '<span class="chip">🎯 實戰模式</span>' : '') +
              (r.legalFlag ? '<span class="chip badge-legal">⚖️ 出現可能違法的提問，等第最高 C</span>' : '') +
              '<span class="chip">' + e(END_TEXT[r.endReason] || '') + '</span>' +
              '<span class="chip">剩餘 ' + s.timeLeft + ' 分鐘</span>' +
            '</div></div></div>' +
        '<div class="panel dims"><h3 class="panel-title">📊 五大面向</h3>' + dims + '</div>' +
        '<div class="panel r-section"><h3>🚨 法律合規性檢測</h3>' + compliance + '</div>' +
        '<div class="panel r-section"><h3>🗣️ 提問技巧分析</h3>' + technique + '</div>' +
        '<div class="panel r-section"><h3>💡 下一步改進建議</h3><ul class="tips">' + r.tips.map(function (x) { return '<li>' + e(x) + '</li>'; }).join('') + '</ul></div>' +
        '<div class="panel r-section"><h3>🎯 職能判斷對照</h3>' +
          '<table class="r-table"><thead><tr><th>職能</th><th>你的評分</th><th>實際程度</th><th>判定</th></tr></thead><tbody>' + compRows + '</tbody></table>' +
          '<div class="decision-line" style="margin-top:12px"><span class="chip">你的結論：' + e(dl[r.decision.mine]) + '</span>' +
            '<span class="chip">適合的結論：' + e(dl[r.decision.fit]) + '</span><span class="chip">' + MATCH_TEXT[r.decision.match] + '</span></div></div>' +
        '<div class="panel r-section"><h3>🪪 候選人真實狀況</h3><div class="truth-box">' + e(r.profile) + '</div></div>' +
        '<div class="panel r-section"><h3>🔍 隱藏特質</h3>' + traits + '</div>' +
        (asks ? '<div class="panel r-section"><h3>🙋 回答候選人提問</h3>' + asks + '</div>' : '') +
        '<div class="panel r-section"><details class="transcript"><summary>📝 面試逐字稿（' + logItems.length + ' 則）</summary><div class="log">' + transcript + '</div></details></div>' +
        '<div class="report-actions">' +
          '<button class="btn btn-primary" data-action="again">🔄 同職缺再面試一位</button>' +
          (TII.app.mode === 'campaign' && nextOpen ? '<button class="btn" data-action="pick-level" data-id="' + e(next.id) + '">下一關 ▶</button>' : '') +
          '<button class="btn btn-ghost" data-action="go-levels">回關卡列表</button>' +
          '<button class="btn btn-ghost" data-action="print">🖨️ 列印／存成 PDF</button>' +
        '</div>' +
        '<p class="disclaimer">本遊戲的人物、公司與對話皆為虛構，法規說明僅供教育訓練參考，實際適用請以最新法令與主管機關解釋為準。</p>' +
      '</div>';
    ui.show('report');
    requestAnimationFrame(function () {
      document.querySelectorAll('#screen-report .dim .fill').forEach(function (f) { f.style.width = f.dataset.w + '%'; });
    });
  };

  ui.on('again', function () { ui.openLevel(TII.app.levelId); });
  ui.on('print', function () {
    var log = document.querySelector('#screen-report details.transcript');
    if (log) log.open = true;
    window.print();
  });
})();
