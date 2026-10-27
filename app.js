/* ============================================================
   app.js — 启动 / 题库装载 / 路由 / 外观
   ============================================================ */
window.SF = window.SF || {};
(function (SF) {
  'use strict';
  var U = SF.util;

  var TABS = ['challenge', 'vocab', 'reading', 'review', 'favorites', 'me'];
  var current = 'challenge';

  var app = SF.app = SF.app || {};
  app.bank = [];
  app.itemMap = {};
  app.badItems = [];

  /* ---------- 题库装载 ---------- */
  var bankStats = { seed: 0, cached: 0 };

  function ingest(raw, label, seen, ok, bad, map) {
    raw.forEach(function (it) {
      if (!it || typeof it !== 'object') return;
      if (!it.id) { bad.push({ id: '(无 id)', errors: ['缺 id'], from: label }); return; }
      if (seen[it.id]) { bad.push({ id: it.id, errors: ['id 重复'], from: label }); return; }
      seen[it.id] = true;

      var v;
      try { v = SF.validator.validateItem(it); }
      catch (e) { v = { ok: false, errors: ['校验抛错：' + e.message] }; }

      map[it.id] = it;
      if (v.ok) ok.push(it);
      else bad.push({ id: it.id, errors: v.errors, from: label });
    });
  }

  function loadBank() {
    var seed = (typeof window.SF_BANK !== 'undefined' && Array.isArray(window.SF_BANK)) ? window.SF_BANK : [];
    var cached = (SF.cache && SF.cache.all) ? SF.cache.all() : [];

    var seen = {}, ok = [], bad = [], map = {};
    ingest(seed, 'seed', seen, ok, bad, map);
    bankStats.seed = ok.length;
    ingest(cached, 'cache', seen, ok, bad, map);
    bankStats.cached = ok.length - bankStats.seed;

    app.bank = ok;
    app.itemMap = map;
    app.badItems = bad;

    if (window.console) {
      console.log('[炼句] 题库加载：种子 ' + bankStats.seed + ' 题，AI 缓存 ' + bankStats.cached +
        ' 题，可用合计 ' + ok.length + ' 题；校验未通过 ' + bad.length + ' 题');
      if (bad.length) console.warn('[炼句] 未通过的题：', bad);
    }
  }

  /** 运行时把新生成的题注册进内存题库（缓存写入由 generator 负责） */
  app.registerItems = function (list) {
    var added = 0;
    (list || []).forEach(function (it) {
      if (!it || !it.id || app.itemMap[it.id]) return;
      var v;
      try { v = SF.validator.validateItem(it); }
      catch (e) { v = { ok: false, errors: [e.message] }; }
      app.itemMap[it.id] = it;
      if (v.ok) { app.bank.push(it); bankStats.cached += 1; added += 1; }
      else app.badItems.push({ id: it.id, errors: v.errors, from: 'runtime' });
    });
    return added;
  };

  app.bankStats = function () {
    return { seed: bankStats.seed, cached: bankStats.cached, total: app.bank.length };
  };

  /** 题库结构变化后重新装载（清空 AI 题库 / 从备份恢复后调用） */
  app.reloadBank = loadBank;

  /* ---------- 外观 ---------- */
  app.applyAppearance = function () {
    var se = SF.store.state.settings;
    var el = document.documentElement;
    var theme = se.theme;
    if (theme === 'auto') {
      var dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      el.setAttribute('data-theme', dark ? 'dark' : 'light');
    } else {
      el.setAttribute('data-theme', theme);
    }
    el.setAttribute('data-fs', se.fontSize || 'm');
  };

  /* ---------- 路由 ---------- */
  function go(tab) {
    if (TABS.indexOf(tab) < 0) tab = 'challenge';
    current = tab;
    if (location.hash !== '#/' + tab) {
      try { history.replaceState(null, '', '#/' + tab); } catch (e) { location.hash = '#/' + tab; }
    }
    renderCurrent();
  }

  function renderCurrent() {
    SF.speech.stop();
    var v = SF.views[current];
    if (!v) { current = 'challenge'; v = SF.views.challenge; }
    v.enter();
    updateTabbar();
    window.scrollTo(0, 0);
    document.getElementById('view').focus({ preventScroll: true });
  }

  function updateTabbar() {
    U.$$('.tab').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-tab') === current);
    });

    var st = SF.store.stats();
    var streakEl = document.getElementById('streak');
    if (streakEl) {
      if (st.streak > 0) {
        streakEl.textContent = '🔥 ' + st.streak + ' 天';
        streakEl.classList.remove('hidden');
      } else {
        streakEl.classList.add('hidden');
      }
    }

    var badge = document.getElementById('tab-badge-review');
    if (badge) {
      var due = SF.scheduler.dueList(app.bank, U.today()).length;
      if (due > 0) {
        badge.textContent = due > 99 ? '99+' : due;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }

    var vbadge = document.getElementById('tab-badge-vocab');
    if (vbadge) {
      var vdue = (SF.vocab && SF.vocab.ready()) ? SF.vocab.stats().due : 0;
      if (vdue > 0) {
        vbadge.textContent = vdue > 99 ? '99+' : vdue;
        vbadge.classList.remove('hidden');
      } else {
        vbadge.classList.add('hidden');
      }
    }
  }
  app.refreshBadges = updateTabbar;
  app.go = go;
  app.renderCurrent = renderCurrent;
  app.currentTab = function () { return current; };

  /* ---------- 启动 ---------- */
  function boot() {
    SF.store.load();
    loadBank();
    app.applyAppearance();

    // 离线模式标记
    if (navigator.onLine === false) {
      var ob = document.getElementById('offline-badge');
      if (ob) ob.classList.remove('hidden');
    }
    window.addEventListener('online', function () {
      var ob = document.getElementById('offline-badge');
      if (ob) ob.classList.add('hidden');
    });
    window.addEventListener('offline', function () {
      var ob = document.getElementById('offline-badge');
      if (ob) ob.classList.remove('hidden');
    });

    document.getElementById('btn-settings').onclick = function () { go('me'); };
    U.$$('.tab').forEach(function (b) {
      b.onclick = function () { go(b.getAttribute('data-tab')); };
    });

    if (window.matchMedia) {
      try {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
          if (SF.store.state.settings.theme === 'auto') app.applyAppearance();
        });
      } catch (e) { }
    }

    var m = /^#\/(\w+)/.exec(location.hash || '');
    go(m && TABS.indexOf(m[1]) >= 0 ? m[1] : 'challenge');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window.SF);
