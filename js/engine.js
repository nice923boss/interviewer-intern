// Interview engine: pure game rules, no DOM.
// Every action returns { session, events } with a fresh session object.
(function () {
  var TII = globalThis.TII;

  TII.PROBE_NAMES = { role: '個人角色', result: '結果數據', reflect: '反思改進', more: '情境細節' };
  var COMBO_MILESTONES = [3, 5, 7, 9];
  var DEEP_PROBE_LIMIT = 2;

  // ---------- lookups ----------
  TII.findLevel = function (levelId) {
    for (var i = 0; i < TII.industries.length; i++) {
      var ind = TII.industries[i];
      for (var j = 0; j < ind.levels.length; j++) {
        if (ind.levels[j].id === levelId) return { industry: ind, level: ind.levels[j] };
      }
    }
    return null;
  };

  TII.findCandidate = function (levelId, candId) {
    var found = TII.findLevel(levelId);
    if (!found) return null;
    return found.level.candidates.filter(function (c) { return c.id === candId; })[0] || null;
  };

  function ctx(s) {
    var found = TII.findLevel(s.levelId);
    return { industry: found.industry, level: found.level, cand: TII.findCandidate(s.levelId, s.candId) };
  }

  function arch(cand) { return TII.archetypes[cand.archetype]; }

  function findQuestion(level, qid) {
    var all = TII.commonQuestions.concat(level.questions);
    for (var i = 0; i < all.length; i++) if (all[i].id === qid) return all[i];
    for (var j = 0; j < TII.probes.length; j++) {
      if (TII.probes[j].id === qid) return Object.assign({ cat: 'probe', kind: 'probe', cost: TII.PROBE_COST }, TII.probes[j]);
    }
    return null;
  }
  TII.findQuestion = findQuestion;

  // Topic keys look like 'intro', 'motive.leave', 'stories.teamwork', 'answers.tech1_t1'
  TII.resolveTopic = function (cand, key) {
    if (!key) return null;
    if (key === 'intro') return { a: cand.intro, ev: 0 };
    var parts = key.split('.');
    var node = cand;
    for (var i = 0; i < parts.length; i++) {
      node = node ? node[parts[i]] : null;
    }
    return node || null;
  };

  // Which competency a topic key gives evidence for
  function topicComp(level, key) {
    if (!key) return null;
    var parts = key.split('.');
    if (parts[0] === 'stories') return parts[1];
    if (parts[0] === 'answers') {
      var q = findQuestion(level, parts[1]);
      return q ? q.comp : null;
    }
    return null;
  }

  // ---------- random (seeded, stored in session so runs are reproducible) ----------
  function rand(s) {
    var t = (s.rng = (s.rng + 0x6d2b79f5) >>> 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  function pick(s, list) { return list[Math.floor(rand(s) * list.length)]; }

  function clone(s) { return JSON.parse(JSON.stringify(s)); }
  function clamp(v) { return Math.max(0, Math.min(100, v)); }

  // ---------- session ----------
  TII.createSession = function (levelId, candId, seed) {
    var found = TII.findLevel(levelId);
    var cand = TII.findCandidate(levelId, candId);
    var a = arch(cand);
    var evidence = {};
    found.level.competencies.forEach(function (c) { evidence[c] = []; });
    return {
      levelId: levelId,
      candId: candId,
      rng: (seed === undefined ? Date.now() : seed) >>> 0,
      timeLeft: TII.TIME_LIMIT,
      comfort: cand.comfort !== undefined ? cand.comfort : a.comfort,
      interest: cand.interest !== undefined ? cand.interest : a.interest,
      asked: [],
      lastTopic: null,
      probed: {},
      evidence: evidence,
      revealed: [],
      pendingAsks: [],
      combo: 0,
      warnedTime: false,
      ended: false,
      endReason: null,
      log: [],
      stats: {
        good: 0, ok: 0, poor: 0, yellow: 0, red: 0,
        offTarget: 0, probesUseful: 0, probesWasted: 0, guarded: 0,
        vagueSeen: [], vagueProbed: [], legal: [], issues: [], asks: [],
        usedProcess: false, usedIce: false, usedNext: false, usedSell: false, usedQa: false,
        maxCombo: 0,
      },
    };
  };

  // ---------- question menu ----------
  TII.availableQuestions = function (s) {
    var c = ctx(s);
    var list = [];
    TII.commonQuestions.concat(c.level.questions).forEach(function (q) {
      if (s.asked.indexOf(q.id) !== -1) return;
      list.push({ id: q.id, cat: q.cat, text: q.text, cost: q.cost });
    });
    if (s.lastTopic) {
      var used = s.probed[s.lastTopic] || [];
      TII.probes.forEach(function (p) {
        list.push({
          id: p.id, cat: 'probe', text: p.text, cost: TII.PROBE_COST,
          label: TII.PROBE_NAMES[p.key], disabled: used.indexOf(p.key) !== -1,
        });
      });
    }
    return list;
  };

  TII.probeTargetText = function (s) {
    if (!s.lastTopic) return '';
    var t = TII.resolveTopic(ctx(s).cand, s.lastTopic);
    return t ? t.a : '';
  };

  // ---------- core action ----------
  TII.ask = function (session, qid) {
    var s = clone(session);
    var events = [];
    if (s.ended || s.pendingAsks.length) return { session: s, events: events };
    var c = ctx(s);
    var q = findQuestion(c.level, qid);
    if (!q) return { session: s, events: events };
    var a = arch(c.cand);
    var before = { comfort: s.comfort, interest: s.interest };

    function emit(ev) { events.push(ev); s.log.push(ev); }
    function answer(text, mood) { emit({ type: 'answer', text: text, mood: mood || 'neutral' }); }
    function hint(text) { emit({ type: 'hint', text: text }); }
    function bumpCombo() {
      s.combo += 1;
      s.stats.maxCombo = Math.max(s.stats.maxCombo, s.combo);
      if (COMBO_MILESTONES.indexOf(s.combo) !== -1) {
        s.interest = clamp(s.interest + 3);
        emit({ type: 'combo', n: s.combo });
      }
    }
    function breakCombo() { s.combo = 0; }

    s.timeLeft = Math.max(0, s.timeLeft - q.cost);
    emit({ type: 'question', id: q.id, cat: q.cat, text: q.text, label: q.cat === 'probe' ? TII.PROBE_NAMES[q.key] : '' });

    if (q.cat === 'probe') {
      handleProbe(s, c, a, q, { answer: answer, hint: hint, emit: emit, bumpCombo: bumpCombo, breakCombo: breakCombo });
    } else {
      s.asked.push(q.id);
      if (q.kind === 'red' || q.kind === 'yellow') {
        var eff = TII.kindEffects[q.kind];
        s.comfort = clamp(s.comfort + eff.comfort);
        s.interest = clamp(s.interest + eff.interest);
        s.stats[q.kind] += 1;
        s.stats.legal.push(q.legal);
        s.stats.issues.push(q.id);
        breakCombo();
        answer(pick(s, a[q.kind]), 'uneasy');
        var law = TII.legal[q.legal];
        emit({ type: 'warn', level: q.kind, text: '詢問「' + law.topic + '」可能違法', law: law.law, penalty: law.penalty, better: q.better });
      } else if (q.kind === 'poor') {
        s.interest = clamp(s.interest + TII.kindEffects.poor.interest);
        s.stats.poor += 1;
        s.stats.issues.push(q.id);
        breakCombo();
        answer(q.tpl === 'weakness' ? a.weakness : pick(s, a.closed), 'neutral');
        s.lastTopic = 'tpl.' + q.id;
        emit({ type: 'warn', level: 'poor', text: q.note, better: q.better });
      } else {
        handleGood(s, c, a, q, { answer: answer, hint: hint, emit: emit, bumpCombo: bumpCombo, breakCombo: breakCombo });
      }
    }

    if (!s.warnedTime && s.timeLeft > 0 && s.timeLeft <= 5) {
      s.warnedTime = true;
      hint('剩下 ' + s.timeLeft + ' 分鐘，記得留時間讓候選人提問，並說明後續流程。');
    }
    finishTurn(s, before, emit);
    return { session: s, events: events };
  };

  function handleGood(s, c, a, q, h) {
    if (q.kind === 'good') s.stats.good += 1; else s.stats.ok += 1;
    if (q.effect) {
      s.comfort = clamp(s.comfort + (q.effect.comfort || 0));
      s.interest = clamp(s.interest + (q.effect.interest || 0));
    }
    if (q.id === 'o_process') s.stats.usedProcess = true;
    if (q.id === 'o_ice') s.stats.usedIce = true;
    if (q.id === 'c_sell') s.stats.usedSell = true;
    if (q.id === 'c_next') s.stats.usedNext = true;

    if (q.action === 'candidateAsk') {
      s.stats.usedQa = true;
      s.pendingAsks = (c.cand.asks || []).slice();
      if (!s.pendingAsks.length) { h.answer('目前沒有其他問題了，謝謝您。'); return; }
      emitAsk(s, h.emit);
      return;
    }

    // Template-only answers keep the previous probe target
    if (q.tpl && q.tpl !== 'nogap') { h.answer(a[q.tpl], 'happy'); return; }

    var key = null;
    if (q.src) key = q.src;
    else if (q.cat === 'star') key = 'stories.' + q.comp;
    else if (q.cat === 'situ' || q.cat === 'tech') key = 'answers.' + q.id;
    var topic = TII.resolveTopic(c.cand, key);

    if (!topic) {
      // Off-target: no authored content for this candidate (e.g. no resume gap, competency outside the JD)
      s.stats.offTarget += 1;
      h.breakCombo();
      if (q.tpl === 'nogap') {
        h.answer(a.nogap, 'neutral');
        h.hint('履歷上其實沒有空白期，問之前先仔細看過履歷，時間很寶貴。');
      } else {
        h.answer(pick(s, a.generic), 'neutral');
        h.hint('「' + TII.competencies[q.comp].name + '」不是這個職缺的關鍵職能，時間有限，優先驗證 JD 上的重點。');
      }
      s.lastTopic = 'tpl.' + q.id;
      return;
    }

    if (q.kind === 'good') s.comfort = clamp(s.comfort + 2);
    s.lastTopic = key;
    h.answer(topic.a, topic.ev > 0 ? 'happy' : topic.ev < 0 ? 'uneasy' : 'neutral');
    addEvidence(s, c.level, key, topic.ev || 0);
    if (topic.vague && s.stats.vagueSeen.indexOf(key) === -1) s.stats.vagueSeen.push(key);
    if (topic.hint) h.hint(topic.hint);
    if (q.kind === 'good') h.bumpCombo();
  }

  function handleProbe(s, c, a, q, h) {
    var key = s.lastTopic;
    var topic = TII.resolveTopic(c.cand, key);
    var p = topic && topic.p ? topic.p[q.key] : null;
    var used = s.probed[key] || [];

    if (p && p.need !== undefined && s.comfort < p.need) {
      // Not relaxed enough: guarded reply, probe stays available for later
      s.stats.guarded += 1;
      h.answer(topic.guard || pick(s, a.guard), 'guarded');
      h.hint('候選人似乎有所保留。氣氛還不夠放鬆，可以先聊些輕鬆的、說明流程，或多問幾題好問題再回來追問。');
      return;
    }

    used.push(q.key);
    s.probed[key] = used;
    if (used.length > DEEP_PROBE_LIMIT) s.comfort = clamp(s.comfort - 4);

    if (!p) {
      s.stats.probesWasted += 1;
      h.breakCombo();
      h.answer(a.noProbe, 'neutral');
      return;
    }

    s.stats.probesUseful += 1;
    if (topic.vague && s.stats.vagueProbed.indexOf(key) === -1) s.stats.vagueProbed.push(key);
    h.answer(p.a, p.ev > 0 ? 'happy' : p.ev < 0 ? 'uneasy' : 'neutral');
    addEvidence(s, c.level, key, p.ev || 0, q.key);
    if (p.reveal && s.revealed.indexOf(p.reveal) === -1) {
      s.revealed.push(p.reveal);
      var trait = c.cand.traits.filter(function (t) { return t.id === p.reveal; })[0];
      h.emit({ type: 'crit', trait: trait, react: p.react || '' });
    }
    h.bumpCombo();
  }

  // probeKey is set when the evidence came from a follow-up probe
  function addEvidence(s, level, key, ev, probeKey) {
    var comp = topicComp(level, key);
    if (!comp || !s.evidence[comp]) return;
    s.evidence[comp].push({ ev: ev, key: key, probe: !!probeKey, pk: probeKey || null });
  }

  function emitAsk(s, emit) {
    var askId = s.pendingAsks[0];
    var ask = TII.candidateAsks[askId];
    emit({ type: 'candidateAsk', askId: askId, text: ask.text, options: ask.options });
  }

  function finishTurn(s, before, emit) {
    var dc = s.comfort - before.comfort;
    var di = s.interest - before.interest;
    if (dc || di) emit({ type: 'meter', comfort: s.comfort, interest: s.interest, dComfort: dc, dInterest: di });
    if (s.interest <= 0) {
      s.ended = true;
      s.endReason = 'walkout';
      s.pendingAsks = [];
      emit({ type: 'walkout', text: '（候選人站起身）不好意思，我覺得今天的面試不太適合我，先告辭了。' });
    } else if (s.timeLeft <= 0 && !s.pendingAsks.length) {
      s.ended = true;
      s.endReason = 'timeup';
      emit({ type: 'timeup' });
    }
  }

  TII.ASK_REACTIONS = {
    honest: '了解，謝謝您這麼坦白。',
    oversell: '哇，真的嗎？聽起來太好了！',
    evasive: '喔……好的。（表情有點保留）',
  };

  // Player answers the candidate's question; optionIndex refers to the ask's options
  TII.respondToAsk = function (session, optionIndex) {
    var s = clone(session);
    var events = [];
    if (!s.pendingAsks.length) return { session: s, events: events };
    function emit(ev) { events.push(ev); s.log.push(ev); }
    var before = { comfort: s.comfort, interest: s.interest };
    var askId = s.pendingAsks.shift();
    var opt = TII.candidateAsks[askId].options[optionIndex];
    s.interest = clamp(s.interest + opt.interest);
    s.stats.asks.push({ askId: askId, type: opt.type });
    emit({ type: 'reply', text: opt.text, optionType: opt.type });
    emit({ type: 'answer', text: TII.ASK_REACTIONS[opt.type], mood: opt.type === 'evasive' ? 'uneasy' : 'happy' });
    if (s.pendingAsks.length) emitAsk(s, emit);
    finishTurn(s, before, emit);
    return { session: s, events: events };
  };

  TII.endInterview = function (session) {
    var s = clone(session);
    if (!s.ended) {
      s.ended = true;
      s.endReason = 'finished';
      s.pendingAsks = [];
    }
    return { session: s, events: [] };
  };
})();
