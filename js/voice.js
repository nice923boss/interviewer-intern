// Candidate voice: reads candidate lines aloud with the browser's built-in speech synthesis (Web Speech API).
// Follows the ListenUp Quiz spike: local zh-TW voices first, short sentence chunks, keep utterance references.
(function () {
  var TII = globalThis.TII;
  var synth = globalThis.speechSynthesis;
  var Utterance = globalThis.SpeechSynthesisUtterance;
  var supported = !!(synth && Utterance);

  // Known male zh voices (Windows, Edge online, macOS/iOS); anything else is treated as female
  var MALE_RE = /zhiwei|yunjhe|kangkang|danny|yunxi|yunjian|yunyang|yunxia|wanlung|li-mu|eddy|reed|rocko|grandpa|\bmale\b/i;
  // Apple's character voices rank below regular ones of the same gender, the grandparent voices lowest
  var ODD_RE = /\b(eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley)\b/i;
  var MAX_CHUNK = 80; // long single utterances get cut off in Chrome, so speak sentence by sentence
  var RATE_MIN = 0.5;
  var RATE_MAX = 1.5;
  var voices = [];
  var live = []; // Chrome can drop queued utterances that are garbage-collected before they play

  function loadVoices() { voices = synth.getVoices() || []; }
  if (supported) {
    loadVoices();
    if (synth.addEventListener) synth.addEventListener('voiceschanged', loadVoices);
  }

  // Stage directions such as （停頓）（小聲） are shown on screen but not read aloud
  function clean(text) {
    return String(text || '').replace(/（[^）]*）|\([^)]*\)/g, '').trim();
  }

  function chunks(text) {
    var out = [];
    (clean(text).match(/[^。！？!?；\n]+[。！？!?；]*/g) || []).forEach(function (sentence) {
      var buf = '';
      (sentence.match(/[^，,、]+[，,、]*/g) || []).forEach(function (part) {
        if (buf && buf.length + part.length > MAX_CHUNK) { out.push(buf); buf = ''; }
        buf += part;
      });
      out.push(buf);
    });
    return out.map(function (s) { return s.trim(); }).filter(function (s) { return /[^\s，,、。！？!?；…—-]/.test(s); });
  }

  function isMale(voice) { return MALE_RE.test(voice.name); }

  // Mandarin voices only (zh-HK voices read Cantonese); Taiwan first, then on-device, then matching gender
  function rankVoices(list, male) {
    return list.map(function (v) {
      var lang = String(v.lang || '').replace(/_/g, '-').toLowerCase();
      var region = /-tw$|hant/.test(lang) ? 4 : /-cn$|hans|^cmn/.test(lang) ? 1 : lang === 'zh' ? 1 : -1;
      var odd = ODD_RE.test(v.name) ? (/grand/i.test(v.name) ? 1 : 0.5) : 0;
      return { v: v, score: region + (v.localService ? 2 : 0) + (isMale(v) === male ? 1 : 0) - odd, ok: /^(zh|cmn)/.test(lang) && region >= 0 };
    }).filter(function (x) { return x.ok; })
      .sort(function (a, b) { return b.score - a.score; })
      .map(function (x) { return x.v; });
  }

  // A voice picked in the settings wins while this device still has it; otherwise rank automatically
  function choose(list, male, name) {
    var named = name ? list.filter(function (v) { return v.name === name; })[0] : null;
    if (named) return { voice: named, auto: false };
    return { voice: rankVoices(list, male)[0] || null, auto: true };
  }

  function prefName(male) { return TII.store.getPref(male ? 'voiceM' : 'voiceF') || ''; }

  function rate() {
    var r = Number(TII.store.getPref('voiceRate'));
    return r >= RATE_MIN && r <= RATE_MAX ? r : 1;
  }

  function enabled() { return supported && TII.store.getPref('voice') !== false; }

  function stop() {
    if (!supported) return;
    live = [];
    if (synth.speaking || synth.pending) synth.cancel();
  }

  // opts.male picks the candidate's gender; opts.force plays even when reading aloud is off (settings preview)
  function speak(text, opts) {
    if (!supported || !(enabled() || (opts && opts.force))) return;
    stop();
    var list = chunks(text);
    if (!list.length) return;
    if (!voices.length) loadVoices();
    var male = !!(opts && opts.male);
    var picked = choose(voices, male, prefName(male));
    var voice = picked.voice;
    // No male zh voice installed: lower the pitch so a male candidate still sounds different
    var pitch = picked.auto && male && voice && !isMale(voice) ? 0.8 : 1;
    if (synth.paused) synth.resume();
    list.forEach(function (chunk) {
      var u = new Utterance(chunk);
      u.lang = voice ? voice.lang : 'zh-TW';
      if (voice) u.voice = voice;
      u.pitch = pitch;
      u.rate = rate();
      u.onerror = function (ev) {
        if (ev.error !== 'interrupted' && ev.error !== 'canceled') console.warn('[voice] 語音播放失敗：' + ev.error, voice && voice.name, chunk);
      };
      live.push(u);
      synth.speak(u);
    });
  }

  TII.voice = {
    supported: supported,
    enabled: enabled,
    setEnabled: function (on) {
      TII.store.setPref('voice', !!on);
      if (!on) stop();
    },
    speak: speak,
    stop: stop,
    // for the settings modal
    RATE_MIN: RATE_MIN,
    RATE_MAX: RATE_MAX,
    rate: rate,
    prefName: prefName,
    rescan: function () { if (supported) loadVoices(); return voices; },
    ranked: function (male) { return rankVoices(voices, male); },
    current: function (male) { return choose(voices, male, prefName(male)); },
    isMale: isMale,
    // exposed for tests
    clean: clean,
    chunks: chunks,
    rankVoices: rankVoices,
    choose: choose
  };
})();
