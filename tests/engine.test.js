// Engine + scoring simulation over every authored candidate.
// Usage: node tests/engine.test.js [industryId ...]   (default: all industries)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.join(__dirname, '..');
require(path.join(root, 'data', 'common.js'));
const indDir = path.join(root, 'data', 'industries');
const candDir = path.join(root, 'data', 'cands');
const only = process.argv.slice(2);
const ids = only.length ? only : fs.readdirSync(indDir).filter((f) => f.endsWith('.js')).map((f) => f.slice(0, -3));
const candFiles = fs.existsSync(candDir) ? fs.readdirSync(candDir).filter((f) => f.endsWith('.js')) : [];
ids.forEach((id) => require(path.join(indDir, id + '.js')));
ids.forEach((id) => candFiles.filter((f) => f.startsWith(id + '-')).sort().forEach((f) => require(path.join(candDir, f))));
['engine.js', 'scoring.js', 'store.js'].forEach((f) => require(path.join(root, 'js', f)));
const TII = globalThis.TII;

let failures = 0;
const warnings = [];
function check(name, fn) {
  try { fn(); } catch (e) { failures++; console.log(`✗ ${name}\n  ${e.message}`); }
}

function run(levelId, candId, qids, seed = 7) {
  let s = TII.createSession(levelId, candId, seed);
  for (const id of qids) {
    if (s.ended) break;
    s = TII.ask(s, id).session;
    while (s.pendingAsks.length) s = TII.respondToAsk(s, 0).session;
  }
  return s;
}

// Topic key -> question id that opens it
function opener(level, key) {
  if (key === 'intro') return 'o_intro';
  const [kind, sub] = key.split('.');
  if (kind === 'motive') return { whyus: 'm_whyus', leave: 'm_leave', salary: 'm_salary', gap: 'm_gap' }[sub];
  if (kind === 'stories') return 's_' + sub;
  if (kind === 'answers') return sub;
  return null;
}

function topicsOf(cand) {
  const keys = ['intro', 'motive.whyus', 'motive.leave', 'motive.salary'];
  if (cand.motive.gap) keys.push('motive.gap');
  Object.keys(cand.stories).forEach((k) => keys.push('stories.' + k));
  Object.keys(cand.answers).forEach((k) => keys.push('answers.' + k));
  return keys;
}

let candidates = 0;
for (const ind of TII.industries) {
  for (const level of ind.levels) {
    const fillers = level.questions.filter((q) => q.kind === 'good').map((q) => q.id)
      .concat(level.competencies.map((c) => 's_' + c));
    for (const cand of level.candidates) {
      candidates++;
      const tag = `${level.id}/${cand.id}`;

      check(`${tag} 每個特質都挖得到`, () => {
        for (const trait of cand.traits) {
          let found = false;
          for (const key of topicsOf(cand)) {
            const topic = TII.resolveTopic(cand, key);
            if (!topic || !topic.p) continue;
            for (const [pk, p] of Object.entries(topic.p)) {
              if (p.reveal !== trait.id) continue;
              const open = opener(level, key);
              const plan = ['o_process', 'o_ice'];
              // Warm up with other good questions until relaxed enough
              let warm = run(level.id, cand.id, plan);
              for (const f of fillers) {
                if (!p.need || warm.comfort >= p.need) break;
                if (f === open) continue;
                plan.push(f);
                warm = run(level.id, cand.id, plan);
              }
              plan.push(open, 'p_' + pk);
              const s = run(level.id, cand.id, plan);
              if (s.revealed.includes(trait.id)) {
                found = true;
                const cost = plan.reduce((n, id) => n + TII.findQuestion(level, id).cost, 0);
                if (cost > 24) warnings.push(`${tag} 特質 ${trait.id} 需要 ${cost} 分鐘才挖得到`);
              }
            }
          }
          assert(found, `特質 ${trait.id} 在任何合理路徑下都挖不到（可能 need 太高）`);
        }
      });

      check(`${tag} 完美評分得到滿分判斷`, () => {
        const s = TII.endInterview(run(level.id, cand.id, ['o_process'])).session;
        const r = TII.evaluate(s, cand.truth, cand.fit);
        assert.strictEqual(r.dims.find((d) => d.key === 'accuracy').score, 25);
        assert.strictEqual(r.total, r.dims.reduce((n, d) => n + d.score, 0));
      });

      check(`${tag} 好面試分數高於壞面試`, () => {
        const goodPlan = ['o_process', 'o_ice'];
        level.competencies.forEach((c) => goodPlan.push('s_' + c, 'p_role', 'p_result'));
        goodPlan.push('m_leave', 'p_more', 'c_qa', 'c_next');
        const good = TII.endInterview(run(level.id, cand.id, goodPlan)).session;
        const bad = TII.endInterview(run(level.id, cand.id, ['o_age', 's_teamplayer', 'm_marriage', 's_stress', 'o_zodiac', 'm_religion'])).session;
        const ratings = {};
        level.competencies.forEach((c) => { ratings[c] = 2; });
        const rg = TII.evaluate(good, ratings, 'maybe');
        const rb = TII.evaluate(bad, ratings, 'maybe');
        assert(rg.total > rb.total, `好 ${rg.total} 應高於壞 ${rb.total}`);
        assert(rb.legalFlag && 'CD'.includes(rb.grade), '違法提問應被標記且等第最高 C');
        assert(rg.total >= 0 && rg.total <= 100);
        // v1-style report sections
        assert.strictEqual(rb.compliance.status, 'violation');
        assert(rb.compliance.log.length >= 1 && rb.compliance.log.every((x) => x.kind === 'red' || x.kind === 'yellow'));
        assert.strictEqual(rb.technique.structure, '低');
        assert(rb.technique.rewrites.length >= 1, '封閉式問題應出現在優化範例');
        assert.strictEqual(rg.compliance.status, 'pass');
        assert.notStrictEqual(rg.technique.structure, '低');
        assert(rg.technique.goodAsks.length >= 1, '行為事件題應列為好的提問');
        assert(rg.summary && rb.summary.startsWith('出現可能違法的提問'));
      });

      check(`${tag} 同一個 seed 結果可重現`, () => {
        const plan = ['o_intro', 's_teamplayer', 'o_age', 'p_more'];
        assert.deepStrictEqual(run(level.id, cand.id, plan, 99).log, run(level.id, cand.id, plan, 99).log);
      });
    }
  }
}

check('連續違法提問會讓候選人離席', () => {
  const level = TII.industries[0].levels[0];
  const s = run(level.id, level.candidates[0].id, ['o_age', 'o_hometown', 'm_marriage', 'm_religion', 'o_zodiac']);
  assert.strictEqual(s.endReason, 'walkout');
});

check('時間用完會結束面試', () => {
  const level = TII.industries[0].levels[0];
  const ids = TII.commonQuestions.filter((q) => q.kind === 'good' && q.cat === 'star').map((q) => q.id);
  const s = run(level.id, level.candidates[0].id, ids);
  assert(s.ended && s.timeLeft === 0, `ended=${s.ended} timeLeft=${s.timeLeft}`);
});

warnings.forEach((w) => console.log('[提醒] ' + w));
console.log(`\n${TII.industries.length} 個產業、${candidates} 位候選人：${failures} 個失敗、${warnings.length} 個提醒`);
process.exit(failures ? 1 : 0);
