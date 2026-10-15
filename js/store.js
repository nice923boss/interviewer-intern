// Progress storage in localStorage; every access is guarded so private mode still plays.
(function () {
  var TII = globalThis.TII;
  var KEY = 'tii.progress.v1';
  var PREF_KEY = 'tii.prefs.v1';
  var HISTORY_LIMIT = 30;

  function empty() { return { best: {}, seen: {}, history: [] }; }

  function load() {
    try {
      var raw = globalThis.localStorage && localStorage.getItem(KEY);
      var data = raw ? JSON.parse(raw) : null;
      return data && data.best ? data : empty();
    } catch (e) {
      console.warn('讀取進度失敗，使用空白進度', e);
      return empty();
    }
  }

  function save(data) {
    try {
      if (globalThis.localStorage) localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('儲存進度失敗（可能是無痕模式）', e);
    }
  }

  TII.store = {
    get: load,

    stars: function (levelId) {
      var b = load().best[levelId];
      return b ? b.stars : 0;
    },

    // A level is open when it is the first of its industry or the previous one has at least 1 star
    isUnlocked: function (industry, index) {
      return index === 0 || this.stars(industry.levels[index - 1].id) > 0;
    },

    // Prefer candidates the player has not met yet
    nextCandidate: function (level) {
      var seen = load().seen[level.id] || [];
      var fresh = level.candidates.filter(function (c) { return seen.indexOf(c.id) === -1; });
      var pool = fresh.length ? fresh : level.candidates;
      return pool[Math.floor(Math.random() * pool.length)];
    },

    record: function (levelId, candId, report) {
      var data = load();
      var seen = data.seen[levelId] || [];
      if (seen.indexOf(candId) === -1) seen = seen.concat(candId);
      var found = TII.findLevel(levelId);
      if (found && seen.length >= found.level.candidates.length) seen = [candId];
      var prev = data.best[levelId];
      var best = !prev || report.total > prev.score
        ? { score: report.total, grade: report.grade, stars: Math.max(report.stars, prev ? prev.stars : 0) }
        : Object.assign({}, prev, { stars: Math.max(prev.stars, report.stars) });
      var entry = { at: new Date().toISOString(), levelId: levelId, candId: candId, score: report.total, grade: report.grade };
      var next = {
        best: Object.assign({}, data.best, { [levelId]: best }),
        seen: Object.assign({}, data.seen, { [levelId]: seen }),
        history: [entry].concat(data.history).slice(0, HISTORY_LIMIT),
      };
      save(next);
      return { isBest: !prev || report.total > prev.score, prev: prev || null };
    },

    reset: function () { save(empty()); },

    // Player preferences live under their own key so a progress reset keeps them
    getPref: function (name) {
      try {
        var raw = globalThis.localStorage && localStorage.getItem(PREF_KEY);
        return raw ? JSON.parse(raw)[name] : undefined;
      } catch (e) {
        console.warn('讀取偏好設定失敗', e);
        return undefined;
      }
    },

    setPref: function (name, value) {
      try {
        if (!globalThis.localStorage) return;
        var raw = localStorage.getItem(PREF_KEY);
        var prefs = Object.assign({}, raw ? JSON.parse(raw) : {}, { [name]: value });
        localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
      } catch (e) {
        console.warn('儲存偏好設定失敗（可能是無痕模式）', e);
      }
    },
  };
})();
