// Candidate voice: text cleanup, sentence chunks, voice ranking and saved-voice fallback (js/voice.js).
// Usage: node tests/voice.test.js
const path = require('path');
const assert = require('assert');

globalThis.TII = globalThis.TII || {};
require(path.join(__dirname, '..', 'js', 'voice.js'));
const voice = globalThis.TII.voice;

let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`✓ ${name}`); } catch (e) { failures++; console.log(`✗ ${name}\n  ${e.message}`); }
}
const v = (name, lang, localService) => ({ name, lang, localService });
const names = (list) => list.map((x) => x.name);

// Voice lists as reported by getVoices(); names follow each platform's naming, not captured from real devices
const WINDOWS = [
  v('Microsoft David - English (United States)', 'en-US', true),
  v('Microsoft Hanhan - Chinese (Traditional, Taiwan)', 'zh-TW', true),
  v('Microsoft Zhiwei - Chinese (Traditional, Taiwan)', 'zh-TW', true),
  v('Microsoft Tracy - Chinese (Traditional, Hong Kong SAR)', 'zh-HK', true),
  v('Microsoft Kangkang - Chinese (Simplified, PRC)', 'zh-CN', true),
  v('Google 國語（臺灣）', 'zh-TW', false),
];
const APPLE = [
  v('Grandpa (中文（台灣）)', 'zh-TW', true),
  v('Flo (中文（台灣）)', 'zh-TW', true),
  v('Meijia', 'zh-TW', true),
  v('Eddy (中文（台灣）)', 'zh-TW', true),
  v('Tingting', 'zh-CN', true),
];

check('clean：舞台指示不念', () => {
  assert.strictEqual(voice.clean('（停頓）嗯，我想想(笑)。'), '嗯，我想想。');
});

check('chunks：依句號切句，標點不單獨成句', () => {
  assert.deepStrictEqual(voice.chunks('你好。我叫小明！……'), ['你好。', '我叫小明！']);
});

check('chunks：長句在逗號處切到 80 字內', () => {
  const long = Array(12).fill('這是一段十個字的子句，').join('') + '結束。';
  const out = voice.chunks(long);
  assert.ok(out.length > 1, '應切成多段');
  out.forEach((s) => assert.ok(s.length <= 80, `超過 80 字：${s.length}`));
  assert.strictEqual(out.join(''), long);
});

check('rankVoices：排除粵語與英文', () => {
  const all = names(voice.rankVoices(WINDOWS, false));
  assert.ok(!all.some((n) => /Hong Kong|English/.test(n)), all.join(' / '));
  assert.strictEqual(all.length, 4);
});

check('rankVoices：Windows 男性候選人用 Zhiwei，女性用 Hanhan', () => {
  assert.match(voice.rankVoices(WINDOWS, true)[0].name, /Zhiwei/);
  assert.match(voice.rankVoices(WINDOWS, false)[0].name, /Hanhan/);
});

check('rankVoices：Apple 男性用 Eddy（不用 Grandpa），女性用 Meijia（不用 Flo）', () => {
  assert.match(voice.rankVoices(APPLE, true)[0].name, /^Eddy/);
  assert.strictEqual(voice.rankVoices(APPLE, false)[0].name, 'Meijia');
});

check('rankVoices：只有女聲時男性候選人仍有聲音可用', () => {
  const onlyFemale = [v('Google 國語（臺灣）', 'zh-TW', false)];
  assert.strictEqual(voice.rankVoices(onlyFemale, true)[0].name, 'Google 國語（臺灣）');
});

check('choose：設定過的聲音優先，裝置沒有時改回自動', () => {
  const kept = voice.choose(WINDOWS, true, 'Google 國語（臺灣）');
  assert.strictEqual(kept.voice.name, 'Google 國語（臺灣）');
  assert.strictEqual(kept.auto, false);
  const gone = voice.choose(WINDOWS, true, 'Microsoft Yunjhe Online');
  assert.match(gone.voice.name, /Zhiwei/);
  assert.strictEqual(gone.auto, true);
  assert.strictEqual(voice.choose([], false, '').voice, null);
});

console.log(failures ? `\n${failures} 個失敗` : '\n0 個失敗');
process.exitCode = failures ? 1 : 0;
