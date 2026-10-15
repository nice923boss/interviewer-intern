// Interview screen: meters, transcript, stage with typewriter speech, side panel and question deck.
(function () {
  var TII = globalThis.TII;
  var ui = TII.ui;
  var e = ui.esc;

  var TYPE_MS = 22;
  var ALERT_MS = 6500;
  var MOOD_ICON = { happy: '😊', uneasy: '😰', guarded: '🤐' };

  // Screen-local state, reset on every new interview
  var st = null;

  function ctx() {
    var found = TII.findLevel(TII.app.levelId);
    return { industry: found.industry, level: found.level, cand: TII.findCandidate(found.level.id, TII.app.candId) };
  }
  function $(id) { return document.getElementById(id); }

  // ---------- build ----------
  ui.startInterview = function () {
    var c = ctx();
    stopTimers();
    TII.app.session = TII.createSession(c.level.id, c.cand.id);
    TII.app.ratings = {};
    TII.app.decision = null;
    st = { tab: 'open', side: 'resume', probeSeen: null, replyOrder: null, typing: null, after: [], alertTimer: null, moodTimer: null };

    var ind = c.industry;
    var real = TII.app.realMode;
    var meter = function (id, cls, label) {
      return '<div class="meter ' + cls + '" id="' + id + '"><label>' + label + '</label><div class="bar"><div class="fill"></div></div><span class="val"></span></div>';
    };
    var scr = ui.screen('interview');
    scr.className = 'screen';
    scr.innerHTML =
      '<div class="panel iv-top">' +
        '<button class="btn btn-sm" data-action="iv-quit" title="離開面試">🏠</button>' +
        '<div class="iv-title">' + e(c.level.position) + '<small>候選人 ' + e(c.cand.name) + (real ? '・實戰模式' : '') + '</small></div>' +
        meter('m-time', 'time', '⏱ 時間') + meter('m-comfort', 'comfort', '😌 放鬆度') + meter('m-interest', 'interest', '💗 意願度') +
        (real ? '' : '<span class="risk" id="iv-risk" title="可能違法或涉及隱私的提問次數">⚖️ 風險 0</span>') +
        '<div class="drawer-btns"><button class="btn btn-sm" data-action="drawer" data-which="log">📝 紀錄</button>' +
          '<button class="btn btn-sm" data-action="drawer" data-which="side">📄 資料</button></div>' +
        '<button class="btn btn-sm btn-danger" data-action="iv-end">結束面試</button>' +
      '</div>' +
      '<div class="iv-main">' +
        '<div class="panel iv-side iv-left"><h3 class="panel-title">📝 面試紀錄<button class="btn btn-sm drawer-close" data-action="drawer-close">✕</button></h3>' +
          '<div class="log" id="iv-log"></div></div>' +
        '<div class="iv-center">' +
          '<div class="panel speech" id="iv-speech" data-action="skip-type"><span class="tag" id="sp-tag"></span>' +
            '<div class="q-echo" id="sp-q"></div><div class="text" id="sp-text"></div><span class="more hidden" id="sp-more">點一下顯示全文 ▼</span></div>' +
          '<div class="stage" style="background-image:url(' + e(ind.bg) + ')">' +
            '<div class="interviewer-mini">' + ui.img(TII.spritePath(ind.interviewer.sprite), '', ind.interviewer.name) +
              '<span>' + e(ind.interviewer.name) + e(ind.interviewer.title) + '<br>旁聽中</span></div>' +
            '<div class="combo-badge hidden" id="iv-combo"></div>' +
            '<div class="alert-banner hidden" id="iv-alert" data-action="dismiss-alert"></div>' +
            '<div class="sprite-box">' + ui.img(TII.spritePath(c.cand.sprite), 'sprite', c.cand.name).replace('<img ', '<img id="iv-sprite" ') +
              '<span class="mood-bubble" id="iv-mood"></span><span class="nameplate">' + e(c.cand.name) + '</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="panel iv-side iv-right"><div class="side-tabs">' +
          '<button data-action="side-tab" data-tab="resume">📄 履歷</button>' +
          '<button data-action="side-tab" data-tab="jd">📋 職缺</button>' +
          '<button data-action="side-tab" data-tab="evidence">🔍 證據</button>' +
          '<button class="btn-sm drawer-close" data-action="drawer-close">✕</button>' +
        '</div><div class="side-body" id="iv-sidebody"></div></div>' +
      '</div>' +
      '<div class="panel deck" id="iv-deck"></div>';

    ui.show('interview');
    st.fx = TII.fx.scene(scr.querySelector('.stage'), { actors: [$('iv-sprite'), scr.querySelector('.interviewer-mini img')], color: ind.color, ambient: 14 });
    updateMeters(TII.app.session, null);
    renderSide();
    renderDeck();
    say(c.cand.name, '', '（' + c.cand.name + '敲門走進會議室，在你對面坐下）您好，我是' + c.cand.name + '，今天請多多指教。', null);
    if (c.level.difficulty === 1 && !real) {
      showAlert('hint', '🎓 教練筆記', '先從「開場破冰」開始：說明面試流程或簡單寒暄，候選人放鬆後比較願意說真話。');
    }
  };

  // ---------- meters ----------
  function setMeter(id, value, max, delta, text) {
    var el = $(id);
    el.querySelector('.fill').style.width = Math.max(0, Math.min(100, (value / max) * 100)) + '%';
    el.querySelector('.val').textContent = text;
    if (delta) {
      var f = document.createElement('span');
      f.className = 'float-delta ' + (delta > 0 ? 'up' : 'down');
      f.textContent = (delta > 0 ? '+' : '') + delta;
      el.appendChild(f);
      setTimeout(function () { f.remove(); }, 1400);
    }
  }

  function updateMeters(s, prev) {
    setMeter('m-time', s.timeLeft, TII.TIME_LIMIT, prev ? s.timeLeft - prev.timeLeft : 0, s.timeLeft + ' 分');
    $('m-time').classList.toggle('low', s.timeLeft <= 5);
    setMeter('m-comfort', s.comfort, 100, prev ? s.comfort - prev.comfort : 0, String(s.comfort));
    setMeter('m-interest', s.interest, 100, prev ? s.interest - prev.interest : 0, String(s.interest));
    var risk = s.stats.red + s.stats.yellow;
    var r = $('iv-risk');
    if (r) {
      r.textContent = '⚖️ 風險 ' + risk;
      r.classList.toggle('on', risk > 0);
    }
    var combo = $('iv-combo');
    combo.textContent = '🔥 好問題連擊 ×' + s.combo;
    combo.classList.toggle('hidden', s.combo < 2);
    st.fx.setState({ comfort: s.comfort });
  }

  // ---------- speech (typewriter) ----------
  function say(tag, question, text, onDone) {
    finishTyping();
    $('sp-tag').textContent = tag;
    $('sp-q').textContent = question ? '你：' + question : '';
    $('sp-q').classList.toggle('hidden', !question);
    $('sp-text').textContent = '';
    $('sp-more').classList.remove('hidden');
    st.typing = { full: text, i: 0, onDone: onDone };
    st.typing.timer = setInterval(function () {
      st.typing.i += 1;
      $('sp-text').textContent = st.typing.full.slice(0, st.typing.i);
      if (st.typing.i >= st.typing.full.length) finishTyping();
    }, TYPE_MS);
  }

  function finishTyping() {
    if (!st || !st.typing) return;
    var t = st.typing;
    st.typing = null;
    clearInterval(t.timer);
    $('sp-text').textContent = t.full;
    $('sp-more').classList.add('hidden');
    if (t.onDone) t.onDone();
  }

  function setMood(mood) {
    var sp = $('iv-sprite');
    var bubble = $('iv-mood');
    if (!sp) return;
    sp.classList.remove('happy', 'uneasy', 'guarded');
    void sp.offsetWidth; // restart the CSS animation
    if (MOOD_ICON[mood]) sp.classList.add(mood);
    st.fx.react(mood);
    bubble.textContent = MOOD_ICON[mood] || '';
    bubble.classList.toggle('show', !!MOOD_ICON[mood]);
    clearTimeout(st.moodTimer);
    st.moodTimer = setTimeout(function () { bubble.classList.remove('show'); }, 1800);
  }

  function showAlert(kind, title, body) {
    var el = $('iv-alert');
    el.className = 'alert-banner' + (kind ? ' ' + kind : '');
    el.innerHTML = '<b>' + e(title) + '</b>' + body;
    clearTimeout(st.alertTimer);
    st.alertTimer = setTimeout(function () { el.classList.add('hidden'); }, ALERT_MS);
  }

  function stopTimers() {
    if (!st) return;
    if (st.typing) clearInterval(st.typing.timer);
    st.typing = null;
    clearTimeout(st.alertTimer);
    clearTimeout(st.moodTimer);
  }

  // ---------- events ----------
  function play(result, prev) {
    var c = ctx();
    var s = result.session;
    TII.app.session = s;
    var log = $('iv-log');
    var question = '';
    var lines = [];
    var mood = 'neutral';
    var warn = null;
    var hint = null;
    var after = [];

    var real = TII.app.realMode;
    result.events.forEach(function (ev) {
      // Real mode keeps coaching feedback out of the live log; the report transcript still shows it
      var html = real && (ev.type === 'hint' || ev.type === 'warn') ? '' : ui.logItem(ev, c.cand.name);
      if (html) log.insertAdjacentHTML('beforeend', html);
      switch (ev.type) {
        case 'question': question = (ev.label ? '（追問' + ev.label + '）' : '') + ev.text; break;
        case 'reply': question = ev.text; break;
        case 'answer': lines.push(ev.text); mood = ev.mood; break;
        case 'candidateAsk':
          lines.push(ev.text);
          st.replyOrder = shuffle(ev.options.map(function (o, i) { return i; }));
          break;
        case 'hint': hint = ev; break;
        case 'warn': warn = ev; break;
        case 'crit': after.push(function () { showCrit(ev, c.cand); }); break;
        case 'combo': ui.toast('🔥 好問題連擊 ×' + ev.n + '！意願度 +3', 'combo'); st.fx.burst('combo'); break;
        case 'walkout': lines.push(ev.text); mood = 'uneasy'; after.push(function () { st.fx.exit(); }); break;
        default: break;
      }
    });
    log.scrollTop = log.scrollHeight;

    if (real) {
      // no live feedback in real mode
    } else if (warn) {
      var title = warn.level === 'red' ? '⚠️ 法規風險' : warn.level === 'yellow' ? '⚠️ 隱私疑慮' : '💡 問法提醒';
      if (warn.level !== 'poor') st.fx.burst(warn.level);
      showAlert(warn.level === 'poor' ? 'poor' : '', title, e(warn.text) +
        (warn.law ? '<br><small>' + e(warn.law) + '</small>' : '') +
        (warn.better ? '<br>更好的問法：' + e(warn.better) : ''));
    } else if (hint) {
      showAlert('hint', '🎓 教練筆記', e(hint.text));
    }

    if (s.ended) after.push(function () { showEnd(s); });
    updateMeters(s, prev);
    setMood(mood);
    say(c.cand.name, question, lines.join('\n'), function () { after.forEach(function (fn) { fn(); }); });
    renderSide();
    renderDeck();
  }

  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function showCrit(ev, cand) {
    var good = ev.trait.positive;
    ui.overlay(
      '<div class="crit-wrap' + (good ? ' good' : '') + '" data-action="overlay-close">' +
        '<div class="crit-rays"></div><div class="crit-small">CRITICAL HIT</div>' +
        '<div class="crit-title">' + (good ? '發掘潛力！' : '看穿真相！') + '</div>' +
        '<div class="crit-trait">' + (good ? '✨ ' : '🔥 ') + e(ev.trait.name) + '</div>' +
        '<div class="crit-desc">' + e(ev.trait.desc) + '</div>' +
        '<div class="crit-card">' + ui.img(TII.spritePath(cand.sprite), '', cand.name) +
          (ev.react ? '<div class="react">' + e(ev.react) + '</div>' : '') + '</div>' +
        '<div class="crit-hint">點一下繼續</div>' +
      '</div>',
      null,
      function (el) {
        TII.fx.scene(el.querySelector('.crit-wrap'), { actors: [el.querySelector('.crit-card img')], color: good ? '#8af0c4' : '#ffd23f', intro: good ? 'crit-good' : 'crit' });
      }
    );
  }

  function showEnd(s) {
    var walk = s.endReason === 'walkout';
    ui.modal(walk ? '🚪 候選人離席' : '⏰ 時間到',
      '<p>' + (walk
        ? '候選人的意願度歸零，提前結束了面試。接下來根據你目前聽到的內容評分。'
        : '30 分鐘的面試時間用完了。接下來根據你聽到的內容，替候選人評分。') + '</p>',
      '<button class="btn btn-primary" data-action="go-rating">進入評分 ▶</button>');
  }

  // ---------- side panel ----------
  function renderSide() {
    var c = ctx();
    var s = TII.app.session;
    var r = c.cand.resume;
    document.querySelectorAll('#screen-interview .side-tabs [data-tab]').forEach(function (b) {
      b.classList.toggle('active', b.dataset.tab === st.side);
    });
    var html = '';
    if (st.side === 'resume') {
      html = '<b>' + e(c.cand.name) + '</b><div>' + e(r.headline) + '</div>' +
        '<h4>學歷</h4><div>' + e(r.education) + '</div>' +
        '<h4>經歷</h4><ul class="resume-list">' + r.experience.map(function (x) { return '<li>' + e(x) + '</li>'; }).join('') + '</ul>' +
        '<h4>技能</h4><div>' + e((r.skills || []).join('、')) + '</div>' +
        (r.note ? '<h4>備註</h4><div>' + e(r.note) + '</div>' : '');
    } else if (st.side === 'jd') {
      html = '<b>' + e(c.level.position) + '</b><div>' + e(c.level.company) + '</div>' +
        '<h4>工作內容</h4><div>' + e(c.level.jd) + '</div>' +
        '<h4>關鍵職能</h4>' + c.level.competencies.map(function (k) {
          return '<div>' + TII.competencies[k].icon + ' ' + e(TII.competencies[k].name) + '</div>';
        }).join('');
    } else {
      html = '<div class="ev-empty" style="margin-bottom:8px">每個點代表一段聽到的回答，發亮的點是追問後取得的。</div>' +
        c.level.competencies.map(function (k) {
          var list = s.evidence[k] || [];
          return '<div class="ev-row"><div class="name"><span>' + TII.competencies[k].icon + ' ' + e(TII.competencies[k].name) +
            '</span><span>' + list.length + '</span></div>' +
            (list.length
              ? '<div class="ev-dots">' + list.map(function (x) { return '<span class="ev-dot' + (x.probe ? ' deep' : '') + '"></span>'; }).join('') + '</div>'
              : '<div class="ev-empty">尚未取得證據</div>') + '</div>';
        }).join('');
      if (s.revealed.length) {
        html += '<h4>已看穿的特質</h4>' + s.revealed.map(function (id) {
          var t = c.cand.traits.filter(function (x) { return x.id === id; })[0];
          return '<div class="trait-found' + (t.positive ? ' good' : '') + '"><b>' + (t.positive ? '✨ ' : '🔥 ') + e(t.name) + '</b><br>' + e(t.desc) + '</div>';
        }).join('');
      }
    }
    $('iv-sidebody').innerHTML = html;
  }

  // ---------- deck ----------
  function renderDeck() {
    var s = TII.app.session;
    var deck = $('iv-deck');
    if (s.ended) {
      deck.innerHTML = '<div class="deck-empty">面試已結束。<button class="btn btn-primary btn-sm" data-action="go-rating">進入評分 ▶</button></div>';
      return;
    }
    if (s.pendingAsks.length) {
      var ask = TII.candidateAsks[s.pendingAsks[0]];
      deck.innerHTML = '<div class="deck-note">🙋 候選人提問：「' + e(ask.text) + '」請選擇你的回覆</div>' +
        '<div class="reply-row">' + st.replyOrder.map(function (i) {
          return '<button class="qcard" data-action="reply" data-index="' + i + '">' + e(ask.options[i].text) + '</button>';
        }).join('') + '</div>';
      return;
    }

    var all = TII.availableQuestions(s);
    var probeTopic = s.lastTopic && s.lastTopic.indexOf('tpl.') !== 0 ? s.lastTopic : null;
    if (st.tab === 'probe') st.probeSeen = s.lastTopic;
    var tabs = TII.categories.map(function (cat) {
      var n = all.filter(function (q) { return q.cat === cat.key && !q.disabled; }).length;
      var pulse = cat.key === 'probe' && probeTopic && st.tab !== 'probe' && st.probeSeen !== s.lastTopic;
      return '<button class="cat-tab' + (st.tab === cat.key ? ' active' : '') + (pulse ? ' pulse' : '') +
        '" data-action="deck-tab" data-tab="' + cat.key + '">' + cat.icon + ' ' + e(cat.name) + '<span class="n">' + n + '</span></button>';
    }).join('');

    var body;
    var list = all.filter(function (q) { return q.cat === st.tab; });
    if (st.tab === 'probe' && !s.lastTopic) {
      body = '<div class="deck-empty">先問一題，才能針對候選人的回答追問。</div>';
    } else if (!list.length) {
      body = '<div class="deck-empty">這一類的題目都問過了，換個分類吧。</div>';
    } else {
      var target = '';
      if (st.tab === 'probe') {
        var text = TII.probeTargetText(s) || lastAnswer(s);
        target = '<div class="probe-target">🔍 針對上一個回答：「' + e(text.length > 90 ? text.slice(0, 90) + '……' : text) + '」</div>';
      }
      body = target + '<div class="cards">' + list.map(function (q) {
        return '<button class="qcard" data-action="ask" data-id="' + e(q.id) + '"' + (q.disabled ? ' disabled title="這個回答已經追問過這個角度"' : '') + '>' +
          '<span class="q-meta"><span class="q-label">' + e(q.label || '') + '</span><span class="cost">⏱ ' + q.cost + ' 分</span></span>' +
          e(q.text) + '</button>';
      }).join('') + '</div>';
    }
    deck.innerHTML = '<div class="deck-head">' + tabs + '</div>' + body;
  }

  function lastAnswer(s) {
    for (var i = s.log.length - 1; i >= 0; i--) if (s.log[i].type === 'answer') return s.log[i].text;
    return '';
  }

  // ---------- actions ----------
  ui.on('start', function () { ui.startInterview(); });

  ui.on('ask', function (d) {
    var s = TII.app.session;
    if (!s || s.ended) return;
    finishTyping();
    play(TII.ask(s, d.id), s);
  });

  ui.on('reply', function (d) {
    var s = TII.app.session;
    finishTyping();
    play(TII.respondToAsk(s, Number(d.index)), s);
  });

  ui.on('deck-tab', function (d) { st.tab = d.tab; renderDeck(); });
  ui.on('side-tab', function (d) { st.side = d.tab; renderSide(); });
  ui.on('skip-type', function () { finishTyping(); });
  ui.on('dismiss-alert', function () { $('iv-alert').classList.add('hidden'); });

  ui.on('drawer', function (d) {
    var scr = ui.screen('interview');
    var cls = d.which === 'log' ? 'show-log' : 'show-side';
    var open = scr.classList.contains(cls);
    scr.classList.remove('show-log', 'show-side');
    if (!open) scr.classList.add(cls);
  });
  ui.on('drawer-close', function () { ui.screen('interview').classList.remove('show-log', 'show-side'); });

  ui.on('iv-end', function () {
    var s = TII.app.session;
    ui.modal('結束面試？', '<p>還剩 ' + s.timeLeft + ' 分鐘。結束後會進入評分，無法再提問。' +
      (s.stats.usedQa ? '' : '<br>你還沒讓候選人提問。') + '</p>',
      '<button class="btn" data-action="overlay-close">繼續面試</button><button class="btn btn-primary" data-action="iv-end-confirm">結束並評分</button>');
  });
  ui.on('iv-end-confirm', function () {
    TII.app.session = TII.endInterview(TII.app.session).session;
    goRating();
  });

  ui.on('iv-quit', function () {
    ui.modal('離開面試？', '<p>這場面試不會計分，也不會保存紀錄。</p>',
      '<button class="btn" data-action="overlay-close">繼續面試</button><button class="btn btn-danger" data-action="iv-quit-confirm">離開</button>');
  });
  ui.on('iv-quit-confirm', function () {
    stopTimers();
    ui.clearOverlays();
    TII.app.session = null;
    if (TII.app.mode === 'random') ui.renderHome(); else ui.renderLevels();
  });

  function goRating() {
    stopTimers();
    ui.clearOverlays();
    ui.screen('interview').classList.remove('show-log', 'show-side');
    ui.renderRating();
  }
  ui.on('go-rating', goRating);
})();
