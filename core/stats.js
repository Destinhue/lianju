/* ============================================================
   core/stats.js — 弱点画像（纯函数）
   把"感觉不行"变成"知道补哪里"。
   ============================================================ */
window.SF = window.SF || {};
(function (SF) {
  'use strict';

  /**
   * 按维度统计掌握情况。
   * @param {Array} items 全库题目
   * @param {'grammarPoints'|'scene'|'track'} dim
   * @returns {Array<{key, attempts, needMore, mastered, rate}>} rate = needMore / attempts
   */
  function byDimension(items, dim) {
    var map = {};
    items.forEach(function (it) {
      var st = SF.store.itemState(it.id);
      if (!st || !st.seen) return;
      var keys = (dim === 'scene' || dim === 'track') ? [it[dim]] : (it[dim] || []);
      keys.forEach(function (k) {
        if (!k) return;
        if (!map[k]) map[k] = { key: k, attempts: 0, needMore: 0, mastered: 0 };
        map[k].attempts += 1;
        if (st.lastResult === 'need_more') map[k].needMore += 1;
        if (st.state === 'mastered') map[k].mastered += 1;
      });
    });
    var arr = Object.keys(map).map(function (k) { return map[k]; });
    arr.forEach(function (r) {
      r.rate = r.attempts ? r.needMore / r.attempts : 0;
    });
    arr.sort(function (a, b) {
      if (b.rate !== a.rate) return b.rate - a.rate;
      return b.attempts - a.attempts;
    });
    return arr;
  }

  /** 薄弱点 Top N：至少练过 2 次才算，避免一次偶然失误被当成弱点 */
  function weakPoints(items, n) {
    var arr = byDimension(items, 'grammarPoints').filter(function (r) {
      return r.attempts >= 2 && r.rate > 0;
    });
    return arr.slice(0, n || 3);
  }

  /** 总览 */
  function overview(items) {
    var res = { total: 0, touched: 0, mastered: 0, learning: 0, untouched: 0, accuracy: 0 };
    res.total = items.length;
    var needMore = 0, attempts = 0;
    items.forEach(function (it) {
      var st = SF.store.itemState(it.id);
      if (!st || !st.seen) { res.untouched += 1; return; }
      res.touched += 1;
      attempts += 1;
      if (st.state === 'mastered') res.mastered += 1;
      if (st.state === 'learning') res.learning += 1;
      if (st.lastResult === 'need_more') needMore += 1;
    });
    res.accuracy = attempts ? (attempts - needMore) / attempts : 0;
    return res;
  }

  /** 近 N 天每日完成量（画简易柱状） */
  function recentDays(n) {
    var out = [];
    var t = SF.util.today();
    for (var i = n - 1; i >= 0; i--) {
      var d = SF.util.addDays(t, -i);
      var day = SF.store.state.daily[d];
      out.push({
        date: d,
        done: day ? (day.doneIds || []).length : 0,
        mastered: day ? (day.mastered || 0) : 0,
        needMore: day ? (day.needMore || 0) : 0
      });
    }
    return out;
  }

  SF.stats = {
    byDimension: byDimension,
    weakPoints: weakPoints,
    overview: overview,
    recentDays: recentDays
  };
})(window.SF);
