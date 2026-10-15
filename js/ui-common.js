// Shared UI helpers: escaping, screen switching, toasts, overlay queue, delegated click actions.
(function () {
  var TII = globalThis.TII;
  var ui = (TII.ui = {});
  var actions = {};
  var overlayQueue = [];
  var overlayOpen = null;

  // Current play state shared by all screens
  TII.app = { mode: 'campaign', industryId: null, levelId: null, candId: null, session: null, report: null };

  var ESC_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  ui.esc = function (v) {
    return String(v === null || v === undefined ? '' : v).replace(/[&<>"']/g, function (c) { return ESC_MAP[c]; });
  };

  ui.screen = function (name) { return document.getElementById('screen-' + name); };

  ui.show = function (name) {
    document.querySelectorAll('.screen').forEach(function (el) {
      el.classList.toggle('active', el.id === 'screen-' + name);
    });
    ui.current = name;
    window.scrollTo(0, 0);
  };

  ui.on = function (name, fn) { actions[name] = fn; };

  ui.toast = function (text, kind) {
    var box = document.getElementById('toasts');
    var el = document.createElement('div');
    el.className = 'toast' + (kind ? ' ' + kind : '');
    el.textContent = text;
    box.appendChild(el);
    setTimeout(function () { el.remove(); }, 3000);
  };

  // Overlays are queued so a critical-hit screen and an end-of-interview modal never overlap
  ui.overlay = function (html, onClose, onShow) {
    overlayQueue.push({ html: html, onClose: onClose, onShow: onShow });
    if (!overlayOpen) nextOverlay();
  };
  ui.modal = function (title, bodyHtml, buttonsHtml, onClose) {
    ui.overlay(
      '<div class="panel modal" role="dialog" aria-modal="true"><h2>' + ui.esc(title) + '</h2>' + bodyHtml +
      '<div class="modal-actions">' + (buttonsHtml || '<button class="btn btn-primary" data-action="overlay-close">知道了</button>') + '</div></div>',
      onClose
    );
  };
  function nextOverlay() {
    var el = document.getElementById('overlay');
    overlayOpen = overlayQueue.shift() || null;
    if (!overlayOpen) { el.classList.add('hidden'); el.innerHTML = ''; return; }
    el.innerHTML = overlayOpen.html;
    el.classList.remove('hidden');
    if (overlayOpen.onShow) overlayOpen.onShow(el);
  }
  ui.closeOverlay = function () {
    var done = overlayOpen;
    nextOverlay();
    if (done && done.onClose) done.onClose();
  };
  ui.clearOverlays = function () {
    overlayQueue = [];
    overlayOpen = null;
    nextOverlay();
  };

  ui.stars = function (n, max) {
    var out = '';
    for (var i = 0; i < (max || 3); i++) out += i < n ? '★' : '<span class="off">★</span>';
    return '<span class="stars">' + out + '</span>';
  };

  ui.img = function (src, cls, alt) {
    return '<img class="' + (cls || '') + '" src="' + ui.esc(src) + '" alt="' + ui.esc(alt || '') +
      '" onerror="this.style.visibility=\'hidden\'">';
  };

  ui.diffLabel = function (d) { return { 1: '新手', 2: '進階', 3: '主管' }[d] || ''; };
  ui.diffDesc = function (d) {
    return { 1: '初階：候選人配合度高、回答清楚', 2: '資深：回答包裝完整，需要深入追問', 3: '難纏：迴避、模糊、前後矛盾，藏著弱點' }[d] || '';
  };

  ui.totalStars = function () {
    var n = 0;
    var max = 0;
    TII.industries.forEach(function (ind) {
      ind.levels.forEach(function (lv) { n += TII.store.stars(lv.id); max += 3; });
    });
    return { n: n, max: max };
  };

  // One transcript entry, shared by the live log and the report transcript
  ui.logItem = function (ev, candName) {
    var e = ui.esc;
    switch (ev.type) {
      case 'question':
        return '<div class="log-item me"><span class="who">你' + (ev.label ? '・追問' + e(ev.label) : '') + '</span>' + e(ev.text) + '</div>';
      case 'reply':
        return '<div class="log-item me"><span class="who">你的回覆</span>' + e(ev.text) + '</div>';
      case 'answer':
        return '<div class="log-item"><span class="who">' + e(candName) + '</span>' + e(ev.text) + '</div>';
      case 'candidateAsk':
        return '<div class="log-item"><span class="who">' + e(candName) + '・提問</span>' + e(ev.text) + '</div>';
      case 'hint':
        return '<div class="log-item hint"><span class="who">🎓 教練筆記</span>' + e(ev.text) + '</div>';
      case 'warn': {
        var title = ev.level === 'red' ? '⚠️ 法規風險' : ev.level === 'yellow' ? '⚠️ 隱私疑慮' : '💡 問法提醒';
        return '<div class="log-item warn ' + e(ev.level) + '"><span class="who">' + title + '</span>' + e(ev.text) +
          (ev.law ? '<span class="better">' + e(ev.law) + '</span>' : '') +
          (ev.better ? '<span class="better">更好的問法：' + e(ev.better) + '</span>' : '') + '</div>';
      }
      case 'crit': {
        var good = ev.trait.positive;
        return '<div class="log-item crit' + (good ? ' good' : '') + '"><span class="who">' + (good ? '✨ 發掘潛力' : '🔥 看穿真相') +
          '</span><b>' + e(ev.trait.name) + '</b>：' + e(ev.trait.desc) + '</div>';
      }
      case 'walkout':
        return '<div class="log-item warn"><span class="who">🚪 候選人離席</span>' + e(ev.text) + '</div>';
      case 'timeup':
        return '<div class="log-item hint"><span class="who">⏰ 時間到</span>面試時間已用完。</div>';
      default:
        return '';
    }
  };

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el || el.disabled) return;
    var fn = actions[el.dataset.action];
    if (!fn) return;
    e.preventDefault();
    fn(el.dataset, el, e);
  });

  ui.on('overlay-close', function () { ui.closeOverlay(); });
})();
