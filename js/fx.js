// p5.js animation layer for every screen with people: idle breathing, mood reactions and particles.
// p5 loads from a CDN. Offline, blocked, or with prefers-reduced-motion, every scene is a no-op and the static images stay.
(function () {
  var TII = globalThis.TII;
  var P5_URL = 'https://cdn.jsdelivr.net/npm/p5@1.11.1/lib/p5.min.js';
  var NOOP = { react: function () {}, burst: function () {}, exit: function () {}, setState: function () {} };
  var DUR = { happy: 0.7, uneasy: 0.6, guarded: 1.1, exit: 1.4 };
  var CONFETTI = ['#ffd23f', '#ff6b9a', '#6be4ff', '#9cff8a', '#ffffff'];
  // Title art is 1280x720: centres of the two blank speech bubbles (x, y, size) and the coffee cup
  var HERO = { w: 1280, h: 720, bubbles: [[642, 108, 1], [1158, 142, 0.85]], cup: [716, 480] };

  var reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var pending = [];
  var fx = (TII.fx = {});

  // Returns a controller right away; calls made before p5 has loaded are dropped.
  fx.scene = function (host, opts) {
    if (reduced || !host) return NOOP;
    var ctl = { impl: null };
    Object.keys(NOOP).forEach(function (k) {
      ctl[k] = function (a, b) { if (ctl.impl) ctl.impl[k](a, b); };
    });
    if (window.p5) mount(host, opts || {}, ctl);
    else pending.push([host, opts || {}, ctl]);
    return ctl;
  };

  if (!reduced) {
    var tag = document.createElement('script');
    tag.src = P5_URL;
    tag.async = true;
    tag.onload = function () {
      pending.splice(0).forEach(function (args) { mount(args[0], args[1], args[2]); });
    };
    tag.onerror = function () {
      pending = [];
      console.warn('p5.js 無法載入（' + P5_URL + '），動畫停用，畫面維持靜態。');
    };
    document.head.appendChild(tag);
  }

  function mount(host, opts, ctl) {
    if (!host.isConnected) return;
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    host.classList.add('fx-on');
    new window.p5(function (p) { sketch(p, host, opts, ctl); }, host);
  }

  function pct(v) {
    var n = parseFloat(v);
    return isNaN(n) ? 0.5 : n / 100;
  }

  function sketch(p, host, opts, ctl) {
    var tint = opts.color || '#ffd23f';
    var actors = (opts.actors || []).filter(Boolean).map(function (el, i) {
      el.style.transformOrigin = '50% 100%';
      return { el: el, phase: i * 2.1 + Math.random(), react: null, t0: 0 };
    });
    var parts = [];
    var flash = null;
    var speed = 1;
    var nextTwinkle = 0.8;

    p.setup = function () {
      p.createCanvas(host.clientWidth || 1, host.clientHeight || 1).addClass('fx-canvas');
      p.pixelDensity(Math.min(2, window.devicePixelRatio || 1));
      p.frameRate(30);
      for (var i = 0; i < (opts.ambient || 0); i++) parts.push(mote(true));
      ctl.impl = { react: react, burst: burst, exit: exit, setState: setState };
      if (opts.intro) burst(opts.intro);
    };

    p.draw = function () {
      if (!host.isConnected) { p.remove(); return; }
      if (!host.getClientRects().length) return; // screen is hidden
      if (p.width !== host.clientWidth || p.height !== host.clientHeight) p.resizeCanvas(host.clientWidth, host.clientHeight);
      var t = p.millis() / 1000;
      var dt = Math.min(0.1, p.deltaTime / 1000);
      p.clear();
      actors.forEach(function (a) { pose(a, t); });
      if (opts.kind === 'hero') drawHero(t);
      if (!opts.ambient && actors.length && t > nextTwinkle) {
        twinkle(actors[Math.floor(Math.random() * actors.length)]);
        nextTwinkle = t + 1.1 + Math.random() * 1.4;
      }
      parts = parts.filter(function (q) { return step(q, dt); });
      var motes = parts.filter(function (q) { return q.kind === 'mote'; }).length;
      for (; motes < (opts.ambient || 0); motes++) parts.push(mote(false));
      if (flash) drawFlash(t);
    };

    // ---------- actors (DOM images moved by transform, layout untouched) ----------
    function pose(a, t) {
      var h = a.el.offsetHeight || 100;
      var b = Math.sin(t * 2.2 * speed + a.phase);
      var sx = 1 - 0.006 * b;
      var sy = 1 + 0.014 * b;
      var rot = 0.8 * Math.sin(t * 0.7 + a.phase * 1.3);
      var dx = 0;
      var dy = 0;
      var op = 1;
      if (a.react) {
        var e = Math.min(1, (t - a.t0) / DUR[a.react]);
        if (a.react === 'happy') dy = -Math.min(16, 0.08 * h) * Math.abs(Math.sin(e * Math.PI * 2)) * (1 - e);
        else if (a.react === 'uneasy') {
          var w = Math.sin(e * Math.PI * 8) * (1 - e);
          dx = Math.min(8, 0.06 * h) * w;
          rot += 2.5 * w;
        } else if (a.react === 'guarded') {
          var k = Math.sin(e * Math.PI);
          sx *= 1 - 0.05 * k;
          sy *= 1 - 0.09 * k;
        } else if (a.react === 'exit') {
          dx = e * e * p.width * 0.6;
          op = 1 - e;
        }
        if (e >= 1 && a.react !== 'exit') a.react = null;
      }
      a.el.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px) rotate(' + rot.toFixed(2) + 'deg) scale(' + sx.toFixed(4) + ',' + sy.toFixed(4) + ')';
      a.el.style.opacity = op;
    }

    // Visible picture area of an actor in canvas coordinates (accounts for object-fit: contain)
    function box(a) {
      var hr = host.getBoundingClientRect();
      var r = a.el.getBoundingClientRect();
      var out = { x: r.left - hr.left - host.clientLeft, y: r.top - hr.top - host.clientTop, w: r.width, h: r.height };
      var nw = a.el.naturalWidth;
      var nh = a.el.naturalHeight;
      var cs = getComputedStyle(a.el);
      if (nw && nh && cs.objectFit === 'contain') {
        var s = Math.min(out.w / nw, out.h / nh);
        var pos = (cs.objectPosition || '50% 50%').split(' ');
        out.x += (out.w - nw * s) * pct(pos[0]);
        out.y += (out.h - nh * s) * pct(pos[1]);
        out.w = nw * s;
        out.h = nh * s;
      }
      return out;
    }

    function react(mood, which, quiet) {
      if (!DUR[mood]) return;
      var list = which === 'others' ? actors.slice(1) : actors.slice(0, 1);
      list.forEach(function (a) {
        if (a.react === 'exit') return;
        a.react = mood;
        a.t0 = p.millis() / 1000;
        if (!quiet && which !== 'others') emit(mood, box(a));
      });
    }

    function emit(mood, b) {
      var hx = b.x + b.w * 0.5;
      var hy = b.y + b.h * 0.14;
      var i;
      if (mood === 'happy') {
        for (i = 0; i < 4; i++) spawn('heart', hx + p.random(-0.4, 0.4) * b.w, hy, { vx: p.random(-15, 15), vy: p.random(-70, -40), size: p.random(10, 16), col: '#ff6b9a', life: 1.3 });
        for (i = 0; i < 4; i++) spawn('sparkle', hx + p.random(-0.5, 0.5) * b.w, hy + p.random(-10, 30), { vy: -20, size: p.random(6, 10), col: '#ffd23f', vr: 2, life: 0.9, fade: 'in-out' });
      } else if (mood === 'uneasy') {
        for (i = 0; i < 3; i++) spawn('drop', hx + b.w * p.random(0.15, 0.35), hy + p.random(-5, 15), { vx: p.random(10, 30), vy: p.random(-30, 0), g: 220, size: p.random(5, 8), col: '#8fd3ff', life: 0.9 });
      } else if (mood === 'guarded') {
        for (i = 0; i < 3; i++) spawn('cloud', hx + p.random(-0.3, 0.3) * b.w, hy - 10, { vy: p.random(-25, -12), size: p.random(10, 16), col: '#b9bfd6', life: 1.5, fade: 'in-out' });
      }
    }

    function twinkle(a) {
      var b = box(a);
      spawn('sparkle', b.x + Math.random() * b.w, b.y + Math.random() * b.h * 0.6, {
        size: p.random(5, 9), col: Math.random() < 0.5 ? tint : '#fff3c4', vr: 1.5, life: 1, fade: 'in-out',
      });
    }

    function burst(kind) {
      var i;
      if (kind === 'combo') {
        var cols = [tint].concat(CONFETTI);
        for (i = 0; i < 36; i++) {
          spawn('confetti', Math.random() * p.width, -10 - Math.random() * 40, {
            vx: p.random(-30, 30), vy: p.random(40, 120), g: 160, size: p.random(6, 10), col: cols[i % cols.length], vr: p.random(-6, 6), life: p.random(1.8, 2.6),
          });
        }
        react('happy', 'others');
      } else if (kind === 'red' || kind === 'yellow') {
        flash = { rgb: kind === 'red' ? '255,40,60' : '255,180,40', t0: p.millis() / 1000 };
        react('uneasy', 'others');
      } else if ((kind === 'crit' || kind === 'crit-good') && actors.length) {
        var b = box(actors[0]);
        var palette = kind === 'crit-good' ? ['#8af0c4', '#ffffff', '#ffd23f'] : ['#ffd23f', '#ff9a1f', '#ffffff'];
        for (i = 0; i < 28; i++) {
          var ang = Math.random() * Math.PI * 2;
          var v = p.random(120, 260);
          spawn('sparkle', b.x + b.w / 2, b.y + b.h / 2, { vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, drag: 2.5, size: p.random(6, 12), col: palette[i % 3], vr: 3, life: p.random(1, 1.6) });
        }
        react('happy', null, true);
      }
    }

    function exit() { react('exit'); }

    function setState(s) {
      speed = 1 + (1 - Math.max(0, Math.min(100, s.comfort)) / 100) * 0.9;
    }

    // ---------- particles ----------
    function spawn(kind, x, y, o) {
      var q = { kind: kind, x: x, y: y, vx: 0, vy: 0, g: 0, drag: 0, age: 0, life: 1, size: 8, col: '#ffffff', rot: Math.random() * 6.28, vr: 0, fade: 'out' };
      for (var k in o) q[k] = o[k];
      parts.push(q);
    }

    function mote(initial) {
      return {
        kind: 'mote', x: Math.random() * p.width, y: initial ? Math.random() * p.height : p.height + 10,
        vx: 0, vy: -p.random(8, 20), g: 0, drag: 0, age: 0, life: p.random(5, 9), size: p.random(3, 8),
        col: tint, rot: Math.random() * 6.28, vr: 0, fade: 'in-out',
      };
    }

    function fillA(hex, a) {
      var c = p.color(hex);
      c.setAlpha(a * 255);
      p.fill(c);
    }

    function step(q, dt) {
      q.age += dt;
      if (q.age >= q.life) return false;
      q.vy += q.g * dt;
      q.vx *= 1 - q.drag * dt;
      q.vy *= 1 - q.drag * dt;
      q.x += q.vx * dt;
      q.y += q.vy * dt;
      q.rot += q.vr * dt;
      var f = q.age / q.life;
      var a = q.fade === 'in-out' ? Math.sin(f * Math.PI) : 1 - f * f;
      p.noStroke();
      p.push();
      p.translate(q.kind === 'mote' ? q.x + Math.sin(q.age * 1.5 + q.rot) * 6 : q.x, q.y);
      if (q.kind === 'mote') {
        fillA(q.col, a * 0.08);
        p.circle(0, 0, q.size * 2.6);
        fillA(q.col, a * 0.35);
        p.circle(0, 0, q.size);
      } else if (q.kind === 'sparkle') {
        p.rotate(q.rot);
        fillA(q.col, a);
        star(q.size);
      } else if (q.kind === 'heart') {
        p.scale(q.size / 20);
        fillA(q.col, a);
        p.beginShape();
        p.vertex(0, 6);
        p.bezierVertex(-14, -4, -8, -16, 0, -8);
        p.bezierVertex(8, -16, 14, -4, 0, 6);
        p.endShape(p.CLOSE);
      } else if (q.kind === 'drop') {
        var s = q.size;
        fillA(q.col, a);
        p.beginShape();
        p.vertex(0, -s);
        p.bezierVertex(s * 0.8, 0, s * 0.6, s, 0, s);
        p.bezierVertex(-s * 0.6, s, -s * 0.8, 0, 0, -s);
        p.endShape(p.CLOSE);
      } else if (q.kind === 'cloud') {
        fillA(q.col, a * 0.8);
        p.circle(-q.size * 0.5, 0, q.size);
        p.circle(q.size * 0.5, 0, q.size);
        p.circle(0, -q.size * 0.35, q.size * 1.2);
      } else if (q.kind === 'confetti') {
        p.rotate(q.rot);
        p.scale(1, Math.cos(q.rot * 2));
        fillA(q.col, a);
        p.rect(-q.size / 2, -q.size / 4, q.size, q.size / 2);
      }
      p.pop();
      return true;
    }

    function star(r) {
      p.beginShape();
      for (var i = 0; i < 8; i++) {
        var rr = i % 2 ? r * 0.35 : r;
        p.vertex(Math.cos(i * Math.PI / 4) * rr, Math.sin(i * Math.PI / 4) * rr);
      }
      p.endShape(p.CLOSE);
    }

    // Two red or amber pulses around the stage edge
    function drawFlash(t) {
      var e = (t - flash.t0) / 1.2;
      if (e >= 1) { flash = null; return; }
      var a = 0.5 * Math.abs(Math.sin(e * Math.PI * 2)) * (1 - e * 0.5);
      var ctx = p.drawingContext;
      var w = p.width;
      var h = p.height;
      var g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.max(w, h) * 0.7);
      g.addColorStop(0, 'rgba(' + flash.rgb + ',0)');
      g.addColorStop(1, 'rgba(' + flash.rgb + ',' + a.toFixed(3) + ')');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }

    // Title art: typing dots take turns in the two speech bubbles, steam rises from the cup
    function drawHero(t) {
      var s = Math.max(p.width / HERO.w, p.height / HERO.h);
      var ox = (p.width - HERO.w * s) / 2;
      var oy = (p.height - HERO.h * s) / 2;
      var turn = Math.floor(t / 2.6) % 2;
      p.noStroke();
      HERO.bubbles.forEach(function (bb, i) {
        var size = s * bb[2];
        for (var k = 0; k < 3; k++) {
          var lift = i === turn ? Math.max(0, Math.sin(t * 7 - k * 0.8)) * 8 * size : 0;
          fillA('#3b3f5c', i === turn ? 0.85 : 0.22);
          p.circle(ox + bb[0] * s + (k - 1) * 28 * size, oy + bb[1] * s - lift, 18 * size);
        }
      });
      var cx = ox + HERO.cup[0] * s;
      var cy = oy + HERO.cup[1] * s;
      p.noFill();
      p.strokeWeight(Math.max(1.5, 4 * s));
      for (var i = 0; i < 3; i++) {
        var px = null;
        var py = null;
        var pulse = 0.6 + 0.4 * Math.sin(t * 1.3 + i * 2);
        for (var j = 0; j <= 14; j++) {
          var f = j / 14;
          var xx = cx + (i - 1) * 12 * s + Math.sin(j * 0.5 - t * 2.4 + i * 2) * 6 * s * f;
          var yy = cy - j * 5 * s;
          if (px !== null) {
            p.stroke(255, 255, 255, 150 * pulse * (1 - f) * Math.min(1, j / 3));
            p.line(px, py, xx, yy);
          }
          px = xx;
          py = yy;
        }
      }
      p.noStroke();
    }
  }
})();
