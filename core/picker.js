/* ============================================================
   core/picker.js — 今日题组抽取（纯函数，确定性可测）

   组合优先级：
     1) 到期复习题（≤40%，复习优先是记忆闭环的命根子）
     2) 缓存/题库中「没做过」的新题
     3) 做过但需要再练的题
     4) 仍然不足 → 交给调用方触发 API 生成 / 种子库兜底

   确定性：同一天 + 同一题库 → 同一套题（可和同学讨论同一批题）。
   ============================================================ */
window.SF = window.SF || {};
(function (SF) {
  'use strict';
  var U = SF.util;

  var REVIEW_SHARE = 0.4;

  function isSeen(id) {
    var st = SF.store.itemState(id);
    return !!(st && st.seen > 0);
  }

  /**
   * @param {Array} pool   候选题目数组
   * @param {number} count 需要的题量
   * @param {string} dateKey 'YYYY-MM-DD'
   * @param {object} [opt] {excludeIds:[], reviewShare:0.4, tracks:[]}
   * @returns {{ids:string[], reviewCount:number, newCount:number, shortfall:number}}
   */
  function buildDailySet(pool, count, dateKey, opt) {
    opt = opt || {};
    var date = dateKey || U.today();
    var exclude = {};
    (opt.excludeIds || []).forEach(function (id) { exclude[id] = true; });

    var trackFilter = opt.tracks && opt.tracks.length ? opt.tracks : null;
    var candidates = pool.filter(function (it) {
      if (!it || !it.id || exclude[it.id]) return false;
      if (trackFilter && trackFilter.indexOf(it.track) < 0) return false;
      return true;
    });

    var seedBase = date + '|' + count + '|' + candidates.length + '|' + (opt.seedExtra || '');

    // ---- 1) 到期复习 ----
    var due = SF.scheduler.dueList(candidates, date);
    var reviewQuota = Math.min(Math.ceil(count * (opt.reviewShare == null ? REVIEW_SHARE : opt.reviewShare)), count);
    var reviewPick = due.slice(0, reviewQuota).map(function (r) { return r.item.id; });

    var chosen = {};
    reviewPick.forEach(function (id) { chosen[id] = true; });

    // ---- 2) 没做过的新题（种子确定性洗牌） ----
    var unseen = candidates.filter(function (it) { return !chosen[it.id] && !isSeen(it.id); });
    unseen = U.shuffleSeed(unseen, 'new|' + seedBase);
    var newPick = [];
    for (var i = 0; i < unseen.length && (reviewPick.length + newPick.length) < count; i++) {
      newPick.push(unseen[i].id);
      chosen[unseen[i].id] = true;
    }

    // ---- 3) 做过但未毕业的题 ----
    var rest = candidates.filter(function (it) {
      if (chosen[it.id]) return false;
      var st = SF.store.itemState(it.id);
      return st && st.state === 'learning';
    });
    rest = U.shuffleSeed(rest, 'rest|' + seedBase);
    var restPick = [];
    for (var j = 0; j < rest.length && (reviewPick.length + newPick.length + restPick.length) < count; j++) {
      restPick.push(rest[j].id);
      chosen[rest[j].id] = true;
    }

    // ---- 4) 仍然不足：任何未选中的题（已掌握的可再练） ----
    var filler = U.shuffleSeed(candidates.filter(function (it) { return !chosen[it.id]; }), 'fill|' + seedBase);
    var fillPick = [];
    for (var k = 0; k < filler.length && (reviewPick.length + newPick.length + restPick.length + fillPick.length) < count; k++) {
      fillPick.push(filler[k].id);
      chosen[filler[k].id] = true;
    }

    var ids = reviewPick.concat(newPick, restPick, fillPick);
    return {
      ids: ids,
      reviewCount: reviewPick.length,
      newCount: newPick.length,
      shortfall: Math.max(0, count - ids.length)
    };
  }

  /** 自由刷题：按场景/难度/轨筛选，确定性但每次换种子（seed 传入即可复现） */
  function buildFreeSet(pool, count, opt) {
    opt = opt || {};
    var track = opt.track || null;
    var scene = opt.scene || null;
    var minD = opt.minDifficulty || 1;
    var maxD = opt.maxDifficulty || 5;

    var cands = pool.filter(function (it) {
      if (!it || !it.id) return false;
      if (track && it.track !== track) return false;
      if (scene && it.scene !== scene) return false;
      if (it.difficulty < minD || it.difficulty > maxD) return false;
      return true;
    });

    cands = U.shuffleSeed(cands, 'free|' + (opt.seed || Date.now()) + '|' + cands.length);
    return { ids: cands.slice(0, count).map(function (it) { return it.id; }), shortfall: Math.max(0, count - cands.length) };
  }

  /** 把某题重新排到当前队列末尾（用于"需要加强"即时重练） */
  function requeueEnd(queue, id) {
    var q = queue.slice();
    var i = q.indexOf(id);
    if (i >= 0) q.splice(i, 1);
    q.push(id);
    return q;
  }

  SF.picker = {
    REVIEW_SHARE: REVIEW_SHARE,
    buildDailySet: buildDailySet,
    buildFreeSet: buildFreeSet,
    requeueEnd: requeueEnd
  };
})(window.SF);
