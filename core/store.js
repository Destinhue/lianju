/* ============================================================
   core/store.js — 持久化 / 迁移 / 导入导出
   所有用户状态集中在一个 localStorage key，便于整体备份。
   ============================================================ */
window.SF = window.SF || {};
(function (SF) {
  'use strict';
  var U = SF.util;
  var KEY = 'sf_state_v1';
  var SCHEMA = 1;

  function defaults() {
    return {
      version: SCHEMA,
      createdAt: U.today(),
      items: {},            // id -> {state, box, due, seen, lastResult, updatedAt}
      wordItems: {},        // 单词记忆进度（与句子训练分开，键为 W0001 形式的词 id）
      favorites: [],        // [{itemId, level, versionIndex, en, cn, scene, addedAt, note}]
      favReview: {},        // 好句区独立掌握度，结构同 items
      daily: {},            // 'YYYY-MM-DD' -> {setIds, doneIds, mastered, needMore, addedFav}
      streak: { count: 0, lastDate: '', best: 0 },
      coverage: {},         // 生成账本 'track/scene' -> 已生成题数
      usage: { calls: 0, tokensIn: 0, tokensOut: 0, day: '', todayCalls: 0 },
      settings: {
        dailyGoal: 12,
        wordGoal: 20,
        levelCeiling: 3,
        theme: 'auto',
        fontSize: 'm',
        apiKey: '',
        model: 'deepseek-chat',
        temperature: 1.0,
        dailyGenCap: 60,
        apiEnabled: true
      }
    };
  }

  var memFallback = null;   // localStorage 不可用时的内存兜底
  var state = null;

  function storageOK() {
    try {
      var k = '__sf_probe__';
      window.localStorage.setItem(k, '1');
      window.localStorage.removeItem(k);
      return true;
    } catch (e) { return false; }
  }
  var HAS_LS = storageOK();

  /** 字段级迁移：老版本 state 补齐新字段，永不丢用户数据 */
  function migrate(s) {
    var d = defaults();
    if (!s || typeof s !== 'object') return d;
    s.version = SCHEMA;
    for (var k in d) {
      if (!Object.prototype.hasOwnProperty.call(s, k) || s[k] == null) s[k] = d[k];
    }
    for (var sk in d.settings) {
      if (!Object.prototype.hasOwnProperty.call(s.settings, sk) || s.settings[sk] == null) {
        s.settings[sk] = d.settings[sk];
      }
    }
    if (!s.streak || typeof s.streak !== 'object') s.streak = d.streak;
    if (!Array.isArray(s.favorites)) s.favorites = [];
    return s;
  }

  function load() {
    if (state) return state;
    var raw = null;
    try { raw = HAS_LS ? window.localStorage.getItem(KEY) : memFallback; } catch (e) { raw = null; }
    if (!raw) { state = defaults(); return state; }
    try { state = migrate(JSON.parse(raw)); }
    catch (e) { state = defaults(); }
    return state;
  }

  function save() {
    if (!state) return false;
    var raw = JSON.stringify(state);
    try {
      if (HAS_LS) window.localStorage.setItem(KEY, raw);
      else memFallback = raw;
      return true;
    } catch (e) {
      // 配额写满：降级为内存，并提示用户导出备份
      memFallback = raw;
      if (SF.util && SF.util.toast) SF.util.toast('本地存储写入失败，请到「我的」导出备份');
      return false;
    }
  }

  /* ---------- 题目状态 ---------- */
  function itemState(id) {
    load();
    return state.items[id] || null;
  }

  function setItemState(id, st) {
    load();
    state.items[id] = st;
    save();
  }

  /* ---------- 收藏（摘句级） ---------- */
  function favKey(f) { return f.itemId + '#' + f.level + '#' + f.versionIndex; }

  function isFav(itemId, level, versionIndex) {
    load();
    var k = itemId + '#' + level + '#' + versionIndex;
    return state.favorites.some(function (f) { return favKey(f) === k; });
  }

  function toggleFav(rec) {
    load();
    var k = favKey(rec);
    var i = -1;
    for (var j = 0; j < state.favorites.length; j++) {
      if (favKey(state.favorites[j]) === k) { i = j; break; }
    }
    if (i >= 0) { state.favorites.splice(i, 1); save(); return false; }
    state.favorites.push({
      itemId: rec.itemId, level: rec.level, versionIndex: rec.versionIndex,
      en: rec.en, cn: rec.cn, scene: rec.scene, track: rec.track,
      structure: rec.structure || '', addedAt: Date.now(), note: ''
    });
    save();
    return true;
  }

  function removeFav(index) {
    load();
    state.favorites.splice(index, 1);
    save();
  }

  /* ---------- 今日进度 ---------- */
  function day(dateKey) {
    load();
    var k = dateKey || U.today();
    if (!state.daily[k]) {
      state.daily[k] = { setIds: [], doneIds: [], mastered: 0, needMore: 0, addedFav: 0 };
    }
    return state.daily[k];
  }

  function saveDay(d) { load(); save(); return d; }

  /** 打卡：同日重复练习不重复计数；隔天续签；断签归 1 */
  function touchStreak(dateKey) {
    load();
    var t = dateKey || U.today();
    var s = state.streak;
    if (s.lastDate === t) return s;
    if (!s.lastDate) { s.count = 1; }
    else {
      var gap = U.diffDays(s.lastDate, t);
      s.count = (gap === 1) ? (s.count + 1) : 1;
    }
    s.lastDate = t;
    s.best = Math.max(s.best || 0, s.count);
    save();
    return s;
  }

  /** 今日是否已打卡（有任意完成记录即算） */
  function isCheckedIn(dateKey) {
    load();
    var k = dateKey || U.today();
    return state.streak.lastDate === k;
  }

  /* ---------- 去重登记 ---------- */
  function hasContentHash(hashVal) {
    load();
    return (state._hashes || {})[hashVal] === true;
  }
  function addContentHash(hashVal, id) {
    load();
    if (!state._hashes) state._hashes = {};
    state._hashes[hashVal] = id || true;
    save();
  }

  /* ---------- 导出 / 导入 ----------
     备份里同时带上 AI 生成的题库（genbank），换手机/换电脑后题目和进度一起恢复。
     同时兼容早期只含 state 的旧备份。 */
  function exportJSON() {
    load();
    return JSON.stringify({
      app: 'sentence-forge',
      schema: SCHEMA,
      exportedAt: new Date().toISOString(),
      state: state,
      genbank: (SF.cache && SF.cache.exportList) ? SF.cache.exportList() : []
    }, null, 2);
  }

  function importJSON(text) {
    var parsed;
    try { parsed = JSON.parse(text); }
    catch (e) { return { ok: false, error: '不是合法的 JSON：' + e.message }; }
    if (!parsed || typeof parsed !== 'object') {
      return { ok: false, error: '备份内容不是一个对象' };
    }

    // 新格式：{app, state, genbank}
    if (parsed.app === 'sentence-forge' && parsed.state && typeof parsed.state === 'object') {
      if (!parsed.state.items) return { ok: false, error: '备份缺少 items 字段，可能已损坏' };
      state = migrate(parsed.state);
      save();
      var n = 0;
      if (SF.cache && SF.cache.importList && Array.isArray(parsed.genbank)) {
        n = (SF.cache.importList(parsed.genbank) || {}).added || 0;
      }
      return { ok: true, restoredBank: n };
    }

    // 旧格式：整份就是一个 state
    if (parsed.items) {
      state = migrate(parsed);
      save();
      return { ok: true, restoredBank: 0, legacy: true };
    }

    return { ok: false, error: '缺少必要字段（items / state），可能不是本应用的备份文件' };
  }

  function reset() {
    state = defaults();
    try { if (HAS_LS) window.localStorage.removeItem(KEY); } catch (e) { }
    save();
    return state;
  }

  function stats() {
    load();
    var ids = Object.keys(state.items);
    var learned = ids.filter(function (i) { return state.items[i].state === 'learning'; }).length;
    var mastered = ids.filter(function (i) { return state.items[i].state === 'mastered'; }).length;
    return {
      touched: ids.length, learning: learned, mastered: mastered,
      favorites: state.favorites.length,
      days: Object.keys(state.daily).length,
      streak: state.streak.count || 0,
      best: state.streak.best || 0,
      usingLocalStorage: HAS_LS
    };
  }

  SF.store = {
    KEY: KEY,
    defaults: defaults,
    migrate: migrate,
    load: load, save: save,
    get state() { return load(); },
    itemState: itemState, setItemState: setItemState,
    favKey: favKey, isFav: isFav, toggleFav: toggleFav, removeFav: removeFav,
    day: day, saveDay: saveDay,
    touchStreak: touchStreak, isCheckedIn: isCheckedIn,
    hasContentHash: hasContentHash, addContentHash: addContentHash,
    exportJSON: exportJSON, importJSON: importJSON, reset: reset,
    stats: stats
  };
})(window.SF);
