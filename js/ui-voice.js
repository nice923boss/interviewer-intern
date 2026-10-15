// Voice settings modal (ListenUp Quiz style): reading on/off, female / male candidate voice, speaking rate, preview, rescan.
(function () {
  var TII = globalThis.TII;
  var ui = TII.ui;
  var e = ui.esc;
  var SAMPLE = '您好，我是今天來應徵的候選人，很高興有這個機會。';
  var ROLES = [
    { key: 'f', pref: 'voiceF', male: false, label: '女性候選人的聲音' },
    { key: 'm', pref: 'voiceM', male: true, label: '男性候選人的聲音' }
  ];
  var HOW_TO_ADD = 'Windows：設定 > 時間與語言 > 語音，新增「中文（台灣）」；iPhone：設定 > 輔助使用 > 朗讀內容 > 聲音 > 中文。新增後按「重新偵測」。';

  // "Microsoft Hanhan - Chinese (Traditional, Taiwan)" → "Hanhan" so the name fits a phone-width select
  function shortName(v) {
    return v.name.replace(/^Microsoft\s+/, '').replace(/\s+-\s+.*$/, '');
  }

  function label(v) {
    return shortName(v) + '（' + v.lang + (TII.voice.isMale(v) ? '，男聲' : '') + (v.localService ? '' : '，需要網路') + '）';
  }

  function optionsHtml(role) {
    var list = TII.voice.ranked(role.male);
    var auto = list[0];
    var saved = TII.voice.prefName(role.male);
    var autoText = !auto ? '自動（這台裝置沒有中文語音）'
      : '自動（目前是 ' + shortName(auto) + (role.male && !TII.voice.isMale(auto) ? '，降低音調' : '') + '）';
    var html = '<option value="">' + e(autoText) + '</option>';
    if (saved && !list.some(function (v) { return v.name === saved; })) {
      html += '<option value="' + e(saved) + '">' + e(saved + '（這台裝置沒有，暫時改用自動）') + '</option>';
    }
    [['本機語音（離線可用）', true], ['線上語音（需要網路）', false]].forEach(function (g) {
      var group = list.filter(function (v) { return !!v.localService === g[1]; });
      if (group.length) {
        html += '<optgroup label="' + g[0] + '">' + group.map(function (v) {
          return '<option value="' + e(v.name) + '">' + e(label(v)) + '</option>';
        }).join('') + '</optgroup>';
      }
    });
    return html;
  }

  function statusHtml() {
    var all = TII.voice.ranked(false);
    if (!all.length) return '<p class="voice-note">這台裝置沒有偵測到中文語音，無法朗讀。' + HOW_TO_ADD + '</p>';
    var local = all.filter(function (v) { return v.localService; }).length;
    var males = all.filter(TII.voice.isMale).length;
    return '<p class="voice-scan">偵測到 <b>' + all.length + '</b> 個中文語音（本機 ' + local + '、線上 ' + (all.length - local) + '），其中男聲 ' + males + ' 個。</p>' +
      (males ? '' : '<p class="voice-note">沒有偵測到男聲，男性候選人會用女聲降低音調朗讀。想要男聲可另外安裝。' + HOW_TO_ADD + '</p>');
  }

  function bodyHtml() {
    var rate = TII.voice.rate();
    return '<div class="voice-form">' +
      '<label class="voice-switch"><input type="checkbox" id="vs-on"' + (TII.voice.enabled() ? ' checked' : '') + '> 朗讀候選人的回答</label>' +
      '<div id="vs-status"></div>' +
      ROLES.map(function (role) {
        return '<div class="voice-row"><label for="vs-' + role.key + '">' + role.label + '</label>' +
          '<div class="voice-pick"><select id="vs-' + role.key + '"></select>' +
          '<button class="btn btn-sm" data-action="voice-preview" data-role="' + role.key + '">▶ 試聽</button></div></div>';
      }).join('') +
      '<div class="voice-row"><label for="vs-rate">語速 <b id="vs-rate-val">' + rate.toFixed(1) + '</b> 倍（' +
        TII.voice.RATE_MIN + '～' + TII.voice.RATE_MAX + '）</label>' +
        '<input type="range" id="vs-rate" min="' + TII.voice.RATE_MIN + '" max="' + TII.voice.RATE_MAX + '" step="0.1" value="' + rate + '"></div>' +
      '<p class="voice-hint muted">「自動」依候選人性別挑聲音：台灣中文優先、本機語音優先。設定存在這台裝置的瀏覽器。</p>' +
    '</div>';
  }

  function fill(el) {
    el.querySelector('#vs-status').innerHTML = statusHtml();
    ROLES.forEach(function (role) {
      var sel = el.querySelector('#vs-' + role.key);
      sel.innerHTML = optionsHtml(role);
      sel.value = TII.voice.prefName(role.male);
    });
  }

  function open() {
    ui.modal('🔊 語音設定', bodyHtml(),
      '<button class="btn" data-action="voice-rescan">↻ 重新偵測</button><button class="btn btn-primary" data-action="overlay-close">完成</button>',
      function () {
        var btn = document.getElementById('iv-voice');
        if (btn) btn.textContent = TII.voice.enabled() ? '🔊' : '🔇';
      },
      function (el) {
        fill(el);
        el.querySelector('#vs-on').addEventListener('change', function (ev) { TII.voice.setEnabled(ev.target.checked); });
        ROLES.forEach(function (role) {
          el.querySelector('#vs-' + role.key).addEventListener('change', function (ev) { TII.store.setPref(role.pref, ev.target.value); });
        });
        el.querySelector('#vs-rate').addEventListener('input', function (ev) {
          var rate = Number(ev.target.value);
          TII.store.setPref('voiceRate', rate);
          el.querySelector('#vs-rate-val').textContent = rate.toFixed(1);
        });
      });
  }

  ui.on('voice-settings', open);
  ui.on('voice-preview', function (d) {
    TII.voice.speak(SAMPLE, { male: d.role === 'm', force: true });
  });
  ui.on('voice-rescan', function () {
    TII.voice.rescan();
    fill(document.getElementById('overlay'));
    ui.toast('已重新偵測：' + TII.voice.ranked(false).length + ' 個中文語音');
  });
})();
