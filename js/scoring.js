// Scoring: turns a finished session plus the player's ratings into a coaching report.
(function () {
  var TII = globalThis.TII;

  TII.DIMENSIONS = [
    { key: 'quality', name: '提問品質', max: 25 },
    { key: 'coverage', name: '職能覆蓋', max: 20 },
    { key: 'depth', name: '追問深度', max: 20 },
    { key: 'accuracy', name: '判斷準確', max: 25 },
    { key: 'experience', name: '候選人體驗', max: 10 },
  ];

  function clampTo(v, max) { return Math.max(0, Math.min(max, Math.round(v))); }
  function short(text, n) { return text.length > n ? text.slice(0, n) + '…' : text; }

  // Human-readable description of where a topic key came from
  function topicLabel(level, key) {
    if (key === 'intro') return '自我介紹';
    var parts = key.split('.');
    if (parts[0] === 'stories') return TII.competencies[parts[1]].name + '的行為事件題';
    if (parts[0] === 'answers') {
      var q = TII.findQuestion(level, parts[1]);
      return q ? '「' + short(q.text, 16) + '」' : '專屬題';
    }
    if (parts[0] === 'motive') {
      var m = { whyus: '應徵動機', leave: '離職原因', salary: '薪資期待', gap: '空白期' };
      return m[parts[1]] + '的問題';
    }
    return '回答';
  }

  // Locate the probe that reveals a trait, for "how you could have found it" tips
  function findReveal(cand, level, traitId) {
    var spots = ['intro'];
    ['whyus', 'leave', 'salary', 'gap'].forEach(function (k) { spots.push('motive.' + k); });
    Object.keys(cand.stories || {}).forEach(function (k) { spots.push('stories.' + k); });
    Object.keys(cand.answers || {}).forEach(function (k) { spots.push('answers.' + k); });
    for (var i = 0; i < spots.length; i++) {
      var key = spots[i];
      var topic = TII.resolveTopic(cand, key);
      if (!topic || !topic.p) continue;
      for (var pk in topic.p) {
        if (topic.p[pk].reveal === traitId) {
          return '在' + topicLabel(level, key) + '之後，用「' + TII.PROBE_NAMES[pk] + '」追問' +
            (topic.p[pk].need ? '（需要候選人夠放鬆）' : '');
        }
      }
    }
    return '';
  }

  TII.evaluate = function (s, ratings, decision) {
    var found = TII.findLevel(s.levelId);
    var level = found.level;
    var cand = TII.findCandidate(s.levelId, s.candId);
    var st = s.stats;
    var comps = level.competencies;

    // 1. Question quality
    var asked = st.good + st.ok + st.poor + st.yellow + st.red;
    var ratio = asked ? (st.good + 0.5 * st.ok) / asked : 0;
    var quality = clampTo(25 * ratio - 8 * st.red - 4 * st.yellow - 2 * st.poor - 1 * st.offTarget, 25);

    // 2. Competency coverage
    var covered = comps.filter(function (k) { return s.evidence[k].length > 0; });
    var deep = comps.filter(function (k) { return s.evidence[k].some(function (e) { return e.probe; }); });
    var coverage = clampTo(14 * covered.length / comps.length + 6 * deep.length / comps.length, 20);

    // 3. Probing depth
    var vagueRate = st.vagueSeen.length ? st.vagueProbed.length / st.vagueSeen.length : (st.probesUseful ? 1 : 0.5);
    var traitRate = cand.traits.length ? s.revealed.length / cand.traits.length : 1;
    var depth = clampTo(12 * vagueRate + 8 * traitRate - Math.min(6, st.probesWasted), 20);

    // 4. Judgement accuracy
    var compRows = comps.map(function (k) {
      var r = ratings[k] || 0;
      var truth = cand.truth[k];
      var pts;
      var verdict;
      if (!r) { pts = 1; verdict = '未判斷'; }
      else if (r === truth) { pts = 6; verdict = '準確'; }
      else if (Math.abs(r - truth) === 1) { pts = 3; verdict = '接近'; }
      else { pts = 0; verdict = '誤判'; }
      var ev = s.evidence[k].map(function (e) { return e.ev; });
      return { key: k, name: TII.competencies[k].name, icon: TII.competencies[k].icon, rating: r, truth: truth, verdict: verdict, pts: pts, signals: ev };
    });
    var decisionMatch = decision === cand.fit ? 'match' : (decision === 'maybe' || cand.fit === 'maybe') ? 'near' : 'miss';
    var accuracy = clampTo(compRows.reduce(function (n, r) { return n + r.pts; }, 0) + { match: 7, near: 3, miss: 0 }[decisionMatch], 25);

    // 5. Candidate experience
    var honest = st.asks.filter(function (x) { return x.type === 'honest'; }).length;
    var evasive = st.asks.filter(function (x) { return x.type === 'evasive'; }).length;
    var experience = s.endReason === 'walkout' ? 0 : clampTo(
      5 * s.interest / 100 + ((st.usedProcess || st.usedIce) ? 2 : 0) + (honest ? 2 : 0) - evasive + (st.usedNext ? 1 : 0), 10);

    var dimScores = { quality: quality, coverage: coverage, depth: depth, accuracy: accuracy, experience: experience };
    var total = TII.DIMENSIONS.reduce(function (n, d) { return n + dimScores[d.key]; }, 0);
    var legalFlag = st.red > 0;
    var grade = total >= 90 ? 'S' : total >= 80 ? 'A' : total >= 65 ? 'B' : total >= 50 ? 'C' : 'D';
    if (legalFlag && 'SAB'.indexOf(grade) !== -1) grade = 'C';
    var stars = { S: 3, A: 3, B: 2, C: 1, D: 0 }[grade];

    var traits = cand.traits.map(function (t) {
      var got = s.revealed.indexOf(t.id) !== -1;
      return Object.assign({}, t, { found: got, howTo: got ? '' : findReveal(cand, level, t.id) });
    });

    var issues = st.issues.map(function (qid) {
      var q = TII.findQuestion(level, qid);
      var law = q.legal ? TII.legal[q.legal] : null;
      return {
        text: q.text, kind: q.kind, better: q.better,
        note: law ? '詢問「' + law.topic + '」' : q.note,
        law: law ? law.law : '', penalty: law ? law.penalty : '',
      };
    });
    var legalIssues = issues.filter(function (x) { return x.kind === 'red' || x.kind === 'yellow'; });

    var asks = st.asks.map(function (x) {
      var ask = TII.candidateAsks[x.askId];
      var opt = ask.options.filter(function (o) { return o.type === x.type; })[0];
      return { text: ask.text, type: x.type, reply: opt.text, note: opt.note };
    });

    var report = {
      total: total, grade: grade, stars: stars, legalFlag: legalFlag,
      endReason: s.endReason,
      dims: TII.DIMENSIONS.map(function (d) { return { key: d.key, name: d.name, max: d.max, score: dimScores[d.key] }; }),
      comps: compRows,
      decision: { mine: decision, fit: cand.fit, match: decisionMatch },
      traits: traits,
      asks: asks,
      profile: cand.profile,
      compliance: { status: st.red ? 'violation' : st.yellow ? 'risk' : 'pass', log: legalIssues },
      technique: buildTechnique(s, level, cand, ratio, covered, issues),
      tips: [],
    };
    report.summary = buildSummary(report);
    report.tips = buildTips(s, level, cand, report, covered);
    return report;
  };

  // ---------- report sections adapted from the v1 LLM coaching template ----------
  var STRENGTH = { quality: '提問品質穩定', coverage: '關鍵職能都有蒐集到證據', depth: '追問有挖到細節', accuracy: '判斷貼近真實', experience: '候選人體驗良好' };
  var WEAKNESS = { quality: '提問品質有待加強', coverage: '職能覆蓋不足', depth: '追問深度不夠', accuracy: '判斷與真實落差大', experience: '候選人體驗不佳' };

  // One-line overall comment built from the strongest and weakest dimensions
  function buildSummary(report) {
    var dims = report.dims.map(function (d) { return { key: d.key, r: d.score / d.max }; });
    var best = dims.reduce(function (a, b) { return b.r > a.r ? b : a; });
    var worst = dims.reduce(function (a, b) { return b.r < a.r ? b : a; });
    var parts = [];
    if (report.legalFlag) parts.push('出現可能違法的提問，等第上限為 C。');
    if (worst.r >= 0.8) parts.push('等第 ' + report.grade + '，各面向表現均衡，' + STRENGTH[best.key] + '。');
    else if (best.r < 0.5) parts.push('等第 ' + report.grade + '，各面向都有進步空間，建議先從結構化提問與追問練起。');
    else parts.push('等第 ' + report.grade + '，' + STRENGTH[best.key] + '，但' + WEAKNESS[worst.key] + '。');
    if (report.decision.match === 'miss') parts.push('錄用結論與真實適配度相反。');
    return parts.join('');
  }

  function buildTechnique(s, level, cand, ratio, covered, issues) {
    var st = s.stats;
    var asked = st.good + st.ok + st.poor + st.yellow + st.red;
    var opened = st.usedProcess || st.usedIce;
    var closed = st.usedQa || st.usedNext;
    var risky = st.poor + st.yellow + st.red;

    var level3 = !asked || ratio < 0.45 || st.red ? '低' : ratio >= 0.7 && opened && closed && !risky ? '高' : '中';
    var notes = [];
    if (!opened) notes.push('缺少開場說明或破冰');
    if (!closed) notes.push('缺少收尾提問或後續說明');
    if (risky) notes.push(risky + ' 題封閉、誘導或可能違法的提問');
    if (st.offTarget) notes.push(st.offTarget + ' 題偏離 JD');
    if (!notes.length) notes.push('開場、提問、收尾的結構完整');

    var missing = level.competencies.filter(function (k) { return covered.indexOf(k) === -1; });
    return {
      structure: level3,
      structureNote: notes.join('；'),
      focus: {
        covered: covered.length, total: level.competencies.length,
        pct: Math.round(covered.length / level.competencies.length * 100),
        missing: missing.map(function (k) { return TII.competencies[k].name; }),
        offTarget: st.offTarget,
      },
      goodAsks: goodAsks(s, level, cand),
      missed: missedProbes(s, level, cand),
      rewrites: issues.filter(function (x) { return x.kind === 'poor'; }),
    };
  }

  // Behavioural or situational questions the player asked, preferring ones they followed up
  function goodAsks(s, level, cand) {
    var list = [];
    s.asked.forEach(function (qid) {
      var q = TII.findQuestion(level, qid);
      if (!q || q.kind !== 'good' || ['star', 'situ', 'tech'].indexOf(q.cat) === -1) return;
      var key = q.cat === 'star' ? 'stories.' + q.comp : 'answers.' + q.id;
      if (!TII.resolveTopic(cand, key)) return;
      list.push({ text: q.text, probed: (s.probed[key] || []).length > 0 });
    });
    list.sort(function (a, b) { return Number(b.probed) - Number(a.probed); });
    return list.slice(0, 2);
  }

  // Vague answers left without a follow-up, with the probe that would have opened them up
  function missedProbes(s, level, cand) {
    var st = s.stats;
    return st.vagueSeen.filter(function (k) { return st.vagueProbed.indexOf(k) === -1; }).map(function (key) {
      var topic = TII.resolveTopic(cand, key);
      var probe = TII.probes.filter(function (p) { return topic.p && topic.p[p.key]; })[0];
      return { label: topicLabel(level, key), heard: short(topic.a, 40), probe: probe ? probe.text : '', probeName: probe ? TII.PROBE_NAMES[probe.key] : '' };
    });
  }

  function buildTips(s, level, cand, report, covered) {
    var st = s.stats;
    var tips = [];
    if (st.red || st.yellow) {
      var topics = st.legal.map(function (k) { return TII.legal[k].topic; });
      tips.push('避免詢問' + topics.join('、') + '。想確認的是工作條件，就直接問「能否配合輪班、出差」等與職務相關的事。');
    }
    if (s.endReason === 'walkout') tips.push('候選人中途離席了。冒犯或與職務無關的問題會快速消耗候選人的意願。');
    var missing = level.competencies.filter(function (k) { return covered.indexOf(k) === -1; });
    if (missing.length) {
      tips.push('這次沒有蒐集到「' + missing.map(function (k) { return TII.competencies[k].name; }).join('、') +
        '」的任何證據。開始前先依 JD 的關鍵職能分配時間，每項至少問一題。');
    }
    var unprobed = st.vagueSeen.filter(function (k) { return st.vagueProbed.indexOf(k) === -1; });
    if (unprobed.length) {
      tips.push('有 ' + unprobed.length + ' 段含糊或包裝過的回答沒有追問（例如' + topicLabel(level, unprobed[0]) +
        '）。聽到「主導」「大幅提升」「跟大家處得很好」時，用「你個人做了什麼」「具體數字」追下去。');
    }
    var misjudged = report.comps.filter(function (r) { return r.verdict === '誤判'; });
    if (misjudged.length) {
      tips.push('「' + misjudged.map(function (r) { return r.name; }).join('、') + '」的評分與真實程度落差很大。表面回答常常是包裝過的，評分前確認自己有沒有聽到「追問後」的證據。');
    }
    if (st.poor) {
      var poorAsked = report.technique.rewrites[0];
      tips.push('少用封閉或誘導式問題（例如「' + (poorAsked ? poorAsked.text : '你應該很抗壓吧？') + '」），改用行為事件題請對方舉真實例子。');
    }
    var missed = report.traits.filter(function (t) { return !t.found; });
    if (missed.length && tips.length < 4) tips.push('還有 ' + missed.length + ' 個隱藏特質沒有挖到，報告下方有提示可以從哪裡追問。');
    if (st.probesWasted >= 2) tips.push('追問前先判斷回答還有沒有可挖的細節，已經講完的回答，換題比硬追更有效率。');
    if (st.guarded) tips.push('有 ' + st.guarded + ' 次候選人因為還不夠放鬆而保留。開場先說明流程、破冰，對方才願意講真話。');
    if (!st.usedProcess && !st.usedIce && tips.length < 4) tips.push('開場可以先說明面試流程或簡單寒暄，讓候選人放鬆，後面更容易聽到真實的回答。');
    if (!st.usedQa) tips.push('記得留時間讓候選人提問，這是了解對方在意什麼的機會，也是雇主品牌的一部分。');
    if (st.asks.some(function (x) { return x.type === 'oversell'; })) tips.push('回答候選人的問題時避免過度承諾，到職後的落差是早期離職的主因之一。');
    if (st.asks.some(function (x) { return x.type === 'evasive'; })) tips.push('候選人提問時盡量具體回答，迴避會讓對方懷疑公司有隱情。');
    if (st.offTarget >= 2) tips.push('有 ' + st.offTarget + ' 題問的內容和職缺重點無關，面試時間有限，題目要對準 JD。');
    if (report.decision.match === 'miss') tips.push('錄用結論與候選人的真實適配度相反，回頭檢查你的判斷是根據表面印象還是具體證據。');
    if (!tips.length) tips.push('表現很好！你兼顧了結構化提問、追問與候選人體驗。試試更高難度的關卡吧。');
    return tips.slice(0, 5);
  }
})();
