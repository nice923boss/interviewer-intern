// Content validator for industry data files and their extra candidate files.
// Usage: node tests/validate.js [industryId ...]   (default: all industries)
//   loads data/industries/<id>.js, then data/cands/<id>-*.js
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
require(path.join(root, 'data', 'common.js'));
const TII = globalThis.TII;

const indDir = path.join(root, 'data', 'industries');
const candDir = path.join(root, 'data', 'cands');
const args = process.argv.slice(2);
const ids = args.length ? args : fs.readdirSync(indDir).filter((f) => f.endsWith('.js')).map((f) => f.slice(0, -3));
const candFiles = fs.existsSync(candDir) ? fs.readdirSync(candDir).filter((f) => f.endsWith('.js')) : [];
const files = [];
ids.forEach((id) => {
  const f = path.join(indDir, id + '.js');
  if (!fs.existsSync(f)) { console.log(`[錯誤] 找不到產業檔 ${f}`); process.exit(1); }
  files.push(f);
});
ids.forEach((id) => candFiles.filter((f) => f.startsWith(id + '-')).sort().forEach((f) => files.push(path.join(candDir, f))));

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`[錯誤] ${where}：${msg}`);
const warn = (where, msg) => warnings.push(`[提醒] ${where}：${msg}`);

const DASHES = /[\u2014\u2015]/;
for (const f of files) {
  const raw = fs.readFileSync(f, 'utf8');
  raw.split(/\r?\n/).forEach((line, i) => {
    if (DASHES.test(line)) err(path.basename(f) + ':' + (i + 1), '含破折號（U+2014 或 U+2015），請改用逗號、冒號或括號');
  });
  require(f);
}

const COMP_KEYS = Object.keys(TII.competencies);
const ARCHES = Object.keys(TII.archetypes);
const FITS = ['hire', 'maybe', 'nohire'];
const PROBE_KEYS = TII.probes.map((p) => p.key);
const CANDS_PER_LEVEL = 10;
const seenIds = new Set();
const seenNames = new Set(TII.industries.map((i) => i.interviewer && i.interviewer.name));
const uniq = (where, id) => {
  if (!id) return err(where, '缺少 id');
  if (seenIds.has(id)) err(where, `id 重複：${id}`);
  seenIds.add(id);
};
const isStr = (s) => typeof s === 'string' && s.trim().length > 0;
const len = (where, s, max) => {
  if (isStr(s) && s.length > max) warn(where, `文字 ${s.length} 字，超過建議上限 ${max} 字`);
};

function checkTopic(where, t, traitIds, revealed) {
  if (!t || typeof t !== 'object') return err(where, '缺少回答物件');
  if (!isStr(t.a)) err(where, '缺少回答文字 a');
  len(where, t.a, 140);
  if (t.ev !== undefined && (typeof t.ev !== 'number' || t.ev < -2 || t.ev > 2)) err(where, 'ev 必須是 -2 到 2');
  if (t.vague && !t.p) warn(where, '標記 vague 卻沒有任何追問回答 p');
  if (t.p) {
    for (const [k, p] of Object.entries(t.p)) {
      const w = `${where}.p.${k}`;
      if (!PROBE_KEYS.includes(k)) err(w, `追問鍵只能是 ${PROBE_KEYS.join('/')}`);
      if (!isStr(p.a)) err(w, '缺少追問回答 a');
      len(w, p.a, 140);
      if (p.ev !== undefined && (typeof p.ev !== 'number' || p.ev < -2 || p.ev > 2)) err(w, 'ev 必須是 -2 到 2');
      if (p.need !== undefined && (typeof p.need !== 'number' || p.need < 0 || p.need > 100)) err(w, 'need 必須是 0 到 100');
      if (p.reveal) {
        if (!traitIds.includes(p.reveal)) err(w, `reveal 指向不存在的特質 ${p.reveal}`);
        revealed.push(p.reveal);
      }
    }
  }
}

for (const ind of TII.industries) {
  const iw = `產業 ${ind.id}`;
  uniq(iw, ind.id);
  ['name', 'icon', 'color', 'bg'].forEach((k) => { if (!isStr(ind[k])) err(iw, `缺少 ${k}`); });
  if (!ind.interviewer || !isStr(ind.interviewer.name) || !isStr(ind.interviewer.title) || !isStr(ind.interviewer.sprite)) err(iw, 'interviewer 需含 name、title、sprite');
  if (!Array.isArray(ind.levels) || ind.levels.length !== 3) err(iw, '必須剛好 3 個關卡');

  (ind.levels || []).forEach((lv, li) => {
    const lw = `${iw} 關卡 ${lv.id || li}`;
    uniq(lw, lv.id);
    if (lv.difficulty !== li + 1) err(lw, `difficulty 應為 ${li + 1}`);
    ['position', 'company', 'jd'].forEach((k) => { if (!isStr(lv[k])) err(lw, `缺少 ${k}`); });
    len(lw + '.jd', lv.jd, 90);
    if (!Array.isArray(lv.competencies) || lv.competencies.length !== 3) err(lw, 'competencies 必須剛好 3 項');
    (lv.competencies || []).forEach((c) => { if (!COMP_KEYS.includes(c)) err(lw, `未知職能 ${c}`); });

    const goodQs = [];
    (lv.questions || []).forEach((q) => {
      const qw = `${lw} 題目 ${q.id}`;
      uniq(qw, q.id);
      if (!['situ', 'tech'].includes(q.cat)) err(qw, 'cat 只能是 situ 或 tech');
      if (!['good', 'poor'].includes(q.kind)) err(qw, 'kind 只能是 good 或 poor');
      if (typeof q.cost !== 'number') err(qw, '缺少 cost');
      if (!isStr(q.text)) err(qw, '缺少 text');
      len(qw, q.text, 70);
      if (q.kind === 'good') {
        if (!COMP_KEYS.includes(q.comp)) err(qw, 'good 題目必須有有效的 comp');
        else if (!lv.competencies.includes(q.comp)) warn(qw, `comp ${q.comp} 不在本關職能內`);
        goodQs.push(q.id);
      } else {
        if (!isStr(q.note) || !isStr(q.better)) err(qw, 'poor 題目需要 note 與 better');
        if (q.tpl !== 'closed') err(qw, 'poor 題目 tpl 應為 closed');
      }
    });
    if (goodQs.length !== 4) err(lw, `good 題目應為 4 題（目前 ${goodQs.length}）`);
    const covered = new Set((lv.questions || []).filter((q) => q.kind === 'good').map((q) => q.comp));
    lv.competencies.forEach((c) => { if (!covered.has(c)) warn(lw, `職能 ${c} 沒有任何專屬題目`); });

    if (!Array.isArray(lv.candidates) || lv.candidates.length !== CANDS_PER_LEVEL) err(lw, `必須剛好 ${CANDS_PER_LEVEL} 位候選人（目前 ${(lv.candidates || []).length}）`);
    const fitCount = { hire: 0, maybe: 0, nohire: 0 };
    const arches = new Set();
    const genders = { m: 0, f: 0 };
    const sprites = new Set();
    (lv.candidates || []).forEach((c) => {
      const cw = `${lw} 候選人 ${c.id || c.name}`;
      uniq(cw, c.id);
      if (!isStr(c.name)) err(cw, '缺少 name');
      else if (seenNames.has(c.name)) err(cw, `姓名與其他角色重複：${c.name}`);
      seenNames.add(c.name);
      if (c.sprite) genders[c.sprite[0]] = (genders[c.sprite[0]] || 0) + 1;
      if (!TII.sprites[c.sprite]) err(cw, `未知 sprite ${c.sprite}`);
      if (sprites.has(c.sprite)) err(cw, '同一關候選人 sprite 重複');
      sprites.add(c.sprite);
      if (!ARCHES.includes(c.archetype)) err(cw, `未知 archetype ${c.archetype}`);
      arches.add(c.archetype);
      if (!FITS.includes(c.fit)) err(cw, `fit 只能是 ${FITS.join('/')}`);
      else fitCount[c.fit]++;
      if (!isStr(c.profile)) err(cw, '缺少 profile');
      if (!isStr(c.intro)) err(cw, '缺少 intro');
      len(cw + '.intro', c.intro, 150);
      const r = c.resume || {};
      if (!isStr(r.headline) || !isStr(r.education) || !Array.isArray(r.experience) || !r.experience.length) err(cw, 'resume 需含 headline、education、experience');

      lv.competencies.forEach((k) => {
        const v = (c.truth || {})[k];
        if (![1, 2, 3].includes(v)) err(cw, `truth.${k} 必須是 1、2、3`);
      });
      const traitIds = (c.traits || []).map((t) => t.id);
      if (!traitIds.length || traitIds.length > 2) err(cw, 'traits 需 1 到 2 個');
      (c.traits || []).forEach((t) => {
        if (!isStr(t.id) || !isStr(t.name) || !isStr(t.desc) || typeof t.positive !== 'boolean') err(cw, `特質 ${t.id} 需含 id、name、desc、positive`);
      });
      const revealed = [];
      const m = c.motive || {};
      ['whyus', 'leave', 'salary'].forEach((k) => checkTopic(`${cw}.motive.${k}`, m[k], traitIds, revealed));
      if (m.gap) checkTopic(`${cw}.motive.gap`, m.gap, traitIds, revealed);
      lv.competencies.forEach((k) => checkTopic(`${cw}.stories.${k}`, (c.stories || {})[k], traitIds, revealed));
      goodQs.forEach((qid) => checkTopic(`${cw}.answers.${qid}`, (c.answers || {})[qid], traitIds, revealed));
      traitIds.forEach((t) => { if (!revealed.includes(t)) err(cw, `特質 ${t} 沒有任何追問可以揭露`); });
      if (!Array.isArray(c.asks) || !c.asks.length) err(cw, 'asks 至少 1 個');
      (c.asks || []).forEach((a) => { if (!TII.candidateAsks[a]) err(cw, `未知 asks ${a}`); });
    });
    FITS.forEach((f) => { if (fitCount[f] < 2) err(lw, `fit「${f}」至少要 2 位（目前 ${fitCount[f]}）`); });
    if (arches.size < ARCHES.length) warn(lw, `只用到 ${arches.size} 種 archetype，建議四種都用`);
    if (genders.m < 3 || genders.f < 3) warn(lw, `性別比例懸殊（男 ${genders.m}、女 ${genders.f}）`);
  });
}

warnings.forEach((w) => console.log(w));
errors.forEach((e) => console.log(e));
const total = TII.industries.reduce((n, i) => n + (i.levels || []).reduce((m, l) => m + (l.candidates || []).length, 0), 0);
console.log(`\n檢查 ${files.length} 個檔案、${TII.industries.length} 個產業、${total} 位候選人：${errors.length} 個錯誤、${warnings.length} 個提醒`);
process.exit(errors.length ? 1 : 0);
