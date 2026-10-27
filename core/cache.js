/* ============================================================
   core/cache.js — AI 生成题的本地缓存（落盘）

   ★ 为什么不用 IndexedDB：
     实测 file:// 环境下 indexedDB.open() 超过 1.5 秒才回调（首次探测直接超时），
     而 localStorage 即时可用、容量约 4.75MB。
     600 道生成题约 1MB，余量充足，因此缓存用 localStorage 单独一个 key，
     既避免拖慢高频的 state 写入，也能随备份一起导出。

   ★ 为什么必须落盘：
     动态生成的题如果不持久化，学生今天标记"需要加强"的题明天就复习不到了，
     复习模块会直接失效。
   ============================================================ */
window.SF = window.SF || {};
(function (SF) {
  'use strict';
  var U = SF.util;
  var KEY = 'sf_genbank_v1';
  var DEFAULT_CAP = 600;

  var items = null;      // 内存缓存
  var byHash = null;

  function hasLS() {
    try {
      localStorage.setItem('__sfc__', '1');
      localStorage.removeItem('__sfc__');
      return true;
    } catch (e) { return false; }
  }
  var LS = hasLS();
  var memRaw = null;

  function readRaw() {
    try { return LS ? localStorage.getItem(KEY) : memRaw; } catch (e) { return null; }
  }

  function writeRaw(str) {
    try {
      if (LS) localStorage.setItem(KEY, str);
      else memRaw = str;
      return true;
    } catch (e) {
      return false;   // 多半是配额满，交给 evict 处理
    }
  }

  function load() {
    if (items) return items;
    var raw = readRaw();
    if (!raw) { items = []; byHash = {}; return items; }
    try {
      var arr = JSON.parse(raw);
      items = Array.isArray(arr) ? arr : [];
    } catch (e) { items = []; }
    byHash = {};
    items.forEach(function (it) {
      if (it && it.contentHash) byHash[it.contentHash] = true;
    });
    return items;
  }

  function persist() {
    var str = JSON.stringify(items || []);
    if (writeRaw(str)) return true;
    // 配额满：淘汰后再试一次
    if (evict(60)) return writeRaw(JSON.stringify(items));
    return false;
  }

  function all() { return load().slice(); }

  function size() { return load().length; }

  function has(hash) {
    load();
    return !!byHash[hash];
  }

  /** 该题是否"有价值保留"：正在复习或已被收藏的不能被淘汰 */
  function isPrecious(it) {
    var st = SF.store.itemState(it.id);
    if (st && st.state === 'learning') return true;
    return SF.store.state.favorites.some(function (f) { return f.itemId === it.id; });
  }

  /**
   * 淘汰最老的、且不在复习中/未被收藏的生成题。
   * @returns {number} 实际淘汰条数
   */
  function evict(n) {
    load();
    var victims = [];
    for (var i = 0; i < items.length && victims.length < n; i++) {
      if (!isPrecious(items[i])) victims.push(items[i].id);
    }
    if (!victims.length) return 0;
    var kill = {};
    victims.forEach(function (id) { kill[id] = true; });
    items = items.filter(function (it) { return !kill[it.id]; });
    byHash = {};
    items.forEach(function (it) { if (it.contentHash) byHash[it.contentHash] = true; });
    return victims.length;
  }

  /**
   * 写入生成题。
   * @returns {{added:number, duplicated:number, evicted:number, quota:boolean}}
   */
  function add(list, cap) {
    load();
    cap = cap || DEFAULT_CAP;
    var added = 0, dup = 0;
    (list || []).forEach(function (it) {
      if (!it || !it.id) return;
      if (it.contentHash && byHash[it.contentHash]) { dup += 1; return; }
      items.push(it);
      if (it.contentHash) byHash[it.contentHash] = true;
      added += 1;
    });

    var evictedCount = 0;
    while (items.length > cap) {
      var n = evict(Math.max(20, items.length - cap));
      if (!n) break;
      evictedCount += n;
    }

    var ok = persist();
    return { added: added, duplicated: dup, evicted: evictedCount, quota: !ok };
  }

  function remove(id) {
    load();
    var before = items.length;
    items = items.filter(function (it) { return it.id !== id; });
    if (items.length !== before) { persist(); return true; }
    return false;
  }

  function clear() {
    items = []; byHash = {};
    try { if (LS) localStorage.removeItem(KEY); else memRaw = null; } catch (e) { }
  }

  /** 估算占用（字节，粗略） */
  function bytes() {
    var raw = readRaw();
    return raw ? raw.length * 2 : 0;   // localStorage 按 UTF-16 计
  }

  /** 导入导出：随整体备份一起走，换手机不丢 */
  function exportList() { return all(); }

  function importList(list) {
    if (!Array.isArray(list)) return { added: 0 };
    var res = add(list);
    return res;
  }

  SF.cache = {
    KEY: KEY,
    DEFAULT_CAP: DEFAULT_CAP,
    all: all, size: size, has: has, add: add, remove: remove, clear: clear,
    evict: evict, isPrecious: isPrecious, bytes: bytes,
    exportList: exportList, importList: importList,
    usable: LS
  };
})(window.SF);
