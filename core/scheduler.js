/* ============================================================
   core/scheduler.js — Leitner 记忆盒排期（纯函数，可被 selftest 断言）

   盒位与间隔：
     需要加强 → 盒 1（当天末尾重练）
     盒 1 答对 → 盒 2 → +1 天
     盒 2 答对 → 盒 3 → +3 天
     盒 3 答对 → 盒 4 → +7 天
     盒 4 答对 → 盒 5 = 毕业（mastered）→ +15 天后抽样复核
     复习答错 → 回到盒 1

   首次在新题上选「熟练掌握」→ 直接毕业（不进复习区），
   但 7 天后进入抽样复核池，防止一路点"掌握"其实没记住。
   ============================================================ */
window.SF = window.SF || {};
(function (SF) {
  'use strict';
  var U = SF.util;

  var INTERVALS = { 1: 1, 2: 3, 3: 7, 4: 15 };  // 盒 N 答对后，下次到期间隔（天）
  var GRADUATE_BOX = 5;
  var CHECK_DAYS = 7;      // 毕业题抽样复核间隔
  var CHECK_RATE = 0.1;    // 抽样比例 10%

  function newState(dateKey) {
    return {
      state: 'new', box: 0, due: dateKey || U.today(),
      seen: 0, lastResult: '', updatedAt: Date.now()
    };
  }

  /**
   * 应用一次自评结果。
   * @param {object|null} st 旧状态（null = 从未练过）
   * @param {'need_more'|'mastered'} result
   * @param {string} today 'YYYY-MM-DD'
   */
  function applyResult(st, result, today) {
    var t = today || U.today();
    var s = st ? {
      state: st.state, box: st.box || 0, due: st.due,
      seen: st.seen || 0, lastResult: st.lastResult || '', updatedAt: st.updatedAt || 0
    } : newState(t);

    s.seen += 1;
    s.lastResult = result;
    s.updatedAt = Date.now();

    if (result === 'need_more') {
      s.state = 'learning';
      s.box = 1;
      s.due = t;                       // 当天末尾再来一次（由视图排到队尾）
      return s;
    }

    // result === 'mastered'
    if (s.state === 'new' || s.box === 0) {
      s.state = 'mastered';
      s.box = GRADUATE_BOX;
      s.due = U.addDays(t, CHECK_DAYS);   // 抽样复核池
      return s;
    }

    var nb = (s.box || 1) + 1;
    if (nb >= GRADUATE_BOX) {
      s.state = 'mastered';
      s.box = GRADUATE_BOX;
      s.due = U.addDays(t, INTERVALS[4]); // 毕业后 15 天复核
      return s;
    }
    s.state = 'learning';
    s.box = nb;
    s.due = U.addDays(t, INTERVALS[nb]);
    return s;
  }

  /** 是否到期需要复习（learning 且 due <= today） */
  function isDue(st, today) {
    if (!st || st.state !== 'learning') return false;
    return U.diffDays(st.due, today || U.today()) >= 0;
  }

  /** 到期复习队列：逾期的排前面，逾期越久越前 */
  function dueList(items, today) {
    var t = today || U.today();
    var out = [];
    for (var i = 0; i < items.length; i++) {
      var st = SF.store.itemState(items[i].id);
      if (isDue(st, t)) {
        out.push({ item: items[i], st: st, overdue: U.diffDays(st.due, t) });
      }
    }
    out.sort(function (a, b) {
      if (b.overdue !== a.overdue) return b.overdue - a.overdue;
      return (a.st.updatedAt || 0) - (b.st.updatedAt || 0);
    });
    return out;
  }

  /** 毕业题抽样复核：due 到期的 mastered 题里按 id 稳定抽样 */
  function checkupList(items, today) {
    var t = today || U.today();
    var out = [];
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var st = SF.store.itemState(it.id);
      if (!st || st.state !== 'mastered') continue;
      if (U.diffDays(st.due, t) < 0) continue;
      if (SF.util.seedFrom('chk' + it.id + st.due)() < CHECK_RATE) {
        out.push({ item: it, st: st });
      }
    }
    return out;
  }

  /** 盒位 → 人话 */
  function boxLabel(box, state) {
    if (state === 'mastered') return '已掌握';
    if (!box) return '未练';
    return '第 ' + box + ' 次巩固';
  }

  SF.scheduler = {
    INTERVALS: INTERVALS,
    GRADUATE_BOX: GRADUATE_BOX,
    CHECK_DAYS: CHECK_DAYS,
    CHECK_RATE: CHECK_RATE,
    newState: newState,
    applyResult: applyResult,
    isDue: isDue,
    dueList: dueList,
    checkupList: checkupList,
    boxLabel: boxLabel
  };
})(window.SF);
