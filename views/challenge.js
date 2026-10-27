/* ============================================================
   views/challenge.js — 今日挑战 / 自由刷题
   流程：中文题干 → 思路提示 → 分层逐步展开 → 自评 → 下一题
   ============================================================ */
window.SF = window.SF || {};
SF.views = SF.views || {};
(function (SF) {
  'use strict';
  var U = SF.util, E = U.esc;

  var S = {
    queue: [], idx: 0, revealed: 0,
    mode: 'daily',               // daily | free | review
    requeued: {},
    answered: {},                // 本次会话已作答，防止重复计数
    genTried: false,             // 本次会话是否已尝试过 AI 补题（失败后不再自动重试，避免烧额度）
    finished: false,             // ★ 这一组是否已练完（决定渲染结算页，而不是"题库为空"）
    title: ''
  };

  function item(id) { return SF.app.itemMap[id] || null; }

  /* ---------- 组题 ---------- */
  function pendingOfSet(d) {
    return (d.setIds || []).filter(function (id) {
      return d.doneIds.indexOf(id) < 0 && SF.app.itemMap[id];
    });
  }

  function ensureDailySet(forceNew) {
    var t = U.today();
    var d = SF.store.day(t);
    var pending = pendingOfSet(d);
    if (forceNew || pending.length === 0) {
      var goal = SF.store.state.settings.dailyGoal;
      var setNo = (d.setCount || 0) + 1;
      // seedExtra 让"再加练一组"每次都换一批题，而不是重复同一套
      var res = SF.picker.buildDailySet(SF.app.bank, goal, t, {
        excludeIds: d.doneIds, seedExtra: 'set' + setNo
      });
      // 题库被刷完时，允许重复出题 —— 保证「再加练一组」永远有内容，而不是给出一个空集
      if (!res.ids.length && SF.app.bank.length) {
        res = SF.picker.buildDailySet(SF.app.bank, goal, t, { seedExtra: 'set' + setNo });
      }
      d.setIds = res.ids;
      d.setCount = setNo;
      SF.store.saveDay(d);
      pending = res.ids;
    }
    return pending;
  }

  function startDaily(forceNew) {
    SF.speech.stop();
    S.mode = 'daily'; S.title = '';

    var t = U.today();
    var d = SF.store.day(t);
    var goal = SF.store.state.settings.dailyGoal;
    var pending = pendingOfSet(d);
    var needNewSet = forceNew || pending.length === 0;
    var needed = goal + d.doneIds.length;   // 今天已练过的题尽量不再重复，所以要留出余量

    if (needNewSet && !S.genTried && SF.generator.shouldGenerate(needed)) {
      S.genTried = true;
      return generateThenStart(needed);
    }

    S.queue = ensureDailySet(forceNew);
    S.idx = 0; S.revealed = 0; S.requeued = {}; S.answered = {};
    S.finished = false;
    render();
  }

  /** 题库不足时先让 AI 出题，出完再开始（失败则用现有题库兜底，不打断使用） */
  function generateThenStart(needed) {
    S.mode = 'daily'; S.title = '';
    renderGenerating({ available: SF.app.bank.length, target: needed, added: 0, round: 0 });
    SF.generator.ensurePool(needed, function (info) { renderGenerating(info); })
      .then(function (r) {
        S.genTried = false;   // 成功过就允许以后再补题
        if (r.added) U.toast('AI 新出了 ' + r.added + ' 道题', 2200);
        startDaily(true);
      })
      .catch(function (e) {
        // 失败不阻塞：退回现有题库继续练，并且本次会话不再自动重试（避免反复失败烧额度）
        U.toast(e.message + '（先用现有题库练习）', 3600);
        S.queue = ensureDailySet(true);
        S.idx = 0; S.revealed = 0; S.requeued = {}; S.answered = {};
        S.finished = false;
        render();
      });
  }

  function renderGenerating(info) {
    var root = document.getElementById('view');
    if (!root) return;
    var target = info.target || 1;
    var pct = Math.max(4, Math.min(98, Math.round((info.available || 0) / target * 100)));
    root.innerHTML =
      '<div class="card">' +
      '<div class="row" style="gap:10px"><span class="loading"></span><b>正在用 AI 出新题…</b></div>' +
      '<div class="muted mt12">题库还不够支撑今天的练习量，正在按「场景配方」生成新题，' +
      '每一道都要通过结构 / 内容两道校验才会进入你的题库。</div>' +
      '<div class="progress mt16"><i style="width:' + pct + '%"></i></div>' +
      '<div class="faint mt8">已新增 ' + (info.added || 0) + ' 题 · 可用 ' + (info.available || 0) +
      ' / 目标 ' + target + (info.round ? '（第 ' + info.round + ' 轮）' : '') + '</div>' +
      '<div class="faint mt12">首次生成通常需要 10~30 秒，请保持网络畅通。' +
      '不合格的题会被直接丢弃，不会污染题库。</div>' +
      '</div>';
  }

  /** 自由刷题 / 专项训练：按给定题号开一组（标题要在 render 之前设好，否则首次渲染显示不出来） */
  function startList(ids, title) {
    SF.speech.stop();
    S.mode = 'free';
    S.title = title || '';
    S.queue = (ids || []).slice();
    S.idx = 0; S.revealed = 0; S.requeued = {}; S.answered = {};
    S.finished = false;
    render();
  }

  function startFree(ids) { startList(ids, '自由刷题'); }

  /* ---------- 作答 ---------- */
  function answer(result) {
    var id = S.queue[S.idx];
    if (!id) return;

    // 同步禁用自评按钮：防止连点导致同一题重复计数
    U.$$('[data-act="ans"]').forEach(function (b) { b.disabled = true; });

    var st = SF.store.itemState(id);
    SF.store.setItemState(id, SF.scheduler.applyResult(st, result, U.today()));

    var t = U.today();
    var d = SF.store.day(t);
    if (d.doneIds.indexOf(id) < 0) d.doneIds.push(id);
    SF.store.touchStreak(t);
    SF.store.saveDay(d);

    // 「需要加强」→ 把本题挪到当天队尾重练一次。
    // 注意：requeueEnd 会把当前元素从数组中移除，其后的元素整体前移一位，
    // 所以此时 idx 不能自增，否则会跳过下一道题。
    SF.speech.stop();
    S.revealed = 0;
    if (result === 'need_more' && !S.requeued[id] && S.queue.length > 1) {
      S.requeued[id] = true;
      S.queue = SF.picker.requeueEnd(S.queue, id);
      return render();
    }
    S.idx += 1;
    render();
  }

  function summarize() {
    var d = SF.store.day(U.today());
    var m = 0, n = 0;
    d.doneIds.forEach(function (id) {
      var st = SF.store.itemState(id);
      if (!st) return;
      if (st.state === 'mastered') m += 1;
      else if (st.state === 'learning') n += 1;
    });
    return { mastered: m, needMore: n, done: d.doneIds.length, fav: d.addedFav || 0 };
  }

  /* ---------- 渲染 ---------- */
  function render() {
    var root = document.getElementById('view');
    if (!root) return;

    // ★ 判断顺序很重要：先判"这一组已练完"，再判"队列为空"。
    //   之前的顺序会让"练完一组后重新进入今日挑战"走到 renderEmpty，
    //   错误地显示成"题库为空"，而不是带「再加练一组」的结算页。
    if (S.finished || (S.queue.length && S.idx >= S.queue.length)) {
      S.finished = true;
      renderDone(root);
      return;
    }
    if (!S.queue.length) { renderNoQuestion(root); return; }

    var it = item(S.queue[S.idx]);
    if (!it) { S.idx += 1; return render(); }

    var total = S.queue.length;
    var done = Math.min(S.idx, total);
    var M = window.SF_META;

    var html = '';

    // 进度
    html += '<div class="row between" style="margin-bottom:8px">' +
      '<span class="faint">' + (S.title ? E(S.title) : '今日挑战') + ' · 第 ' + (S.idx + 1) + ' / ' + total + ' 题</span>' +
      '<span class="faint">' + (S.mode === 'daily' ? '今日已完成 ' + summarize().done + ' 题' : '') + '</span>' +
      '</div>' +
      '<div class="progress" style="margin-bottom:14px"><i style="width:' +
      (total ? Math.round(done / total * 100) : 0) + '%"></i></div>';

    // 题卡
    html += '<div class="card">';
    html += '<div class="qmeta">' +
      '<span class="tag">' + E(it.track) + '</span>' +
      '<span class="tag gray">' + E(it.scene) + '</span>' +
      '<span class="stars" title="难度">' + U.stars(it.difficulty) + '</span>' +
      '</div>';
    html += '<div class="qcn">' + E(it.cn) + '</div>';
    if (it.difficultyWhy) {
      html += '<div class="faint mt8">难度依据：' + E(it.difficultyWhy) + '</div>';
    }

    // 提示折叠
    html += disclose('hint', '中文思路拆解（没思路先看这里）', hintBody(it), S.hintOpen);

    // 答案区：只有一个门槛（展开按钮），不再套一层折叠，避免"点了没反应"
    html += '<div class="disclose">' +
      '<div class="head" style="cursor:default">' +
      '<span class="t">分层参考译文（' + S.revealed + '/3 已展开）</span>' +
      '</div>' +
      '<div class="body">' + answerBody(it) + '</div>' +
      '</div>';
    html += '</div>';   // card

    root.innerHTML = html;
    bind(root);
  }

  function disclose(key, title, body, open) {
    return '<div class="disclose">' +
      '<div class="head" data-act="toggle-' + key + '">' +
      '<span class="t">' + E(title) + '</span>' +
      '<span class="faint">' + (open ? '收起 ▲' : '展开 ▼') + '</span>' +
      '</div>' +
      (open ? '<div class="body">' + body + '</div>' : '') +
      '</div>';
  }

  function hintBody(it) {
    var M = window.SF_META;
    var h = '<div class="hintbox">';
    h += '<div>' + E(it.hint || '') + '</div>';
    if (M.sceneHint[it.scene]) {
      h += '<div class="faint mt8">场景套路：' + E(M.sceneHint[it.scene]) + '</div>';
    }
    if (it.scaffold && it.scaffold.length) {
      h += '<div class="scaffold">' + it.scaffold.map(function (s) {
        return '<code>' + E(s) + '</code>';
      }).join('') + '</div>';
    }
    h += '</div>';
    if (it.keyPhrases && it.keyPhrases.length) {
      h += '<div class="mt12">' + it.keyPhrases.map(function (k) {
        return '<div class="kp"><span class="en">' + E(k.en) + '</span><span class="zh">' + E(k.zh) + '</span></div>';
      }).join('') + '</div>';
    }
    return h;
  }

  function answerBody(it) {
    var h = '';
    var shown = Math.max(1, S.revealed);
    if (!S.revealed) {
      h += '<button class="btn block" data-act="reveal">展开 L1「合格」表达</button>';
      h += '<div class="faint center mt8">建议先自己在心里（或纸上）说一遍，再展开对照。</div>';
      return h;
    }

    for (var i = 0; i < shown; i++) {
      var L = it.levels[i];
      if (!L) continue;
      h += '<div class="level lv-' + L.level + '">' +
        '<div class="lv-head"><span class="lv-dot"></span>' +
        '<span>L' + L.level + ' · ' + E(L.label) + '</span>' +
        '<span class="lv-struct">' + E(L.structure || '') + '</span>' +
        '</div><div class="lv-body">';
      (L.versions || []).forEach(function (en, vi) {
        var on = SF.store.isFav(it.id, L.level, vi);
        h += '<div class="enline">' +
          '<span class="txt">' + E(en) + '</span>' +
          (SF.speech.supported() ? '<button class="speak-btn" data-act="speak" data-en="' + E(en) + '" title="朗读">🔊</button>' : '') +
          '<button class="fav-btn' + (on ? ' on' : '') + '" data-act="fav" data-level="' + L.level +
          '" data-vi="' + vi + '" title="收藏好句">' + (on ? '★' : '☆') + '</button>' +
          '</div>';
      });
      h += '</div></div>';
    }

    // 中式英语预警
    if (S.revealed >= 1 && it.traps && it.traps.length) {
      it.traps.forEach(function (t) {
        h += '<div class="trap">' +
          '<div><b>中式英语预警</b>：' + E(t.zh) + '</div>' +
          '<div>✗ <span class="bad-en">' + E(t.bad) + '</span></div>' +
          '<div>✓ <span class="good-en">' + E(t.good) + '</span></div>' +
          '<div class="why">' + E(t.why) + '</div>' +
          '</div>';
      });
    }

    // 词汇升级
    if (S.revealed >= 2 && it.upgrade && it.upgrade.length) {
      h += '<div class="mt12"><div class="faint" style="margin-bottom:4px">词汇升级</div>';
      it.upgrade.forEach(function (u) {
        h += '<div class="upgrade"><span class="tag gray">' + E(u.basic) + '</span>→ ' +
          '<span class="tag ok">' + E(u.better) + '</span></div>';
      });
      h += '</div>';
    }

    // 展开下一层 / 收起
    var nextLv = S.revealed + 1;
    if (nextLv <= 3) {
      var names = { 2: 'L2「良好」表达', 3: 'L3「优秀」表达' };
      h += '<button class="btn ghost block mt12" data-act="reveal">再展开 ' + names[nextLv] + '</button>';
    } else {
      h += '<div class="faint center mt12">三层表达已全部展开</div>';
    }

    // 自评
    h += '<div class="selfcheck">' +
      '<div class="ask">这句你能自己写出来吗？</div>' +
      '<div class="two">' +
      '<button class="btn bad" data-act="ans" data-r="need_more">需要加强</button>' +
      '<button class="btn ok" data-act="ans" data-r="mastered">熟练掌握</button>' +
      '</div>' +
      '<div class="faint center mt8">选「需要加强」会进复习回顾，按 1 → 3 → 7 → 15 天排期回来找你</div>' +
      '</div>';

    return h;
  }

  /**
   * 没有可出的题时。要区分两种完全不同的情况：
   *   a) 题库真的是空的（数据没加载出来）→ 提示去检查题库文件
   *   b) 题库有题，只是今天没有没练过的了 → 给「再练一组 / 自由刷题」出口
   * 以前这两种都显示"题库为空"，会把用户吓一跳。
   */
  function renderNoQuestion(root) {
    var bank = SF.app.bank.length;

    if (!bank) {
      root.innerHTML = '<div class="empty"><span class="big">📭</span>' +
        '<div>没有加载到任何题目</div>' +
        '<div class="faint mt8">请确认 data/ 下的 bank-*.js 文件存在，并且 index.html 里引用了它们。</div>' +
        '<div class="mt16"><button class="btn ghost" data-act="reload">重新加载</button></div>' +
        '</div>';
      root.onclick = function (ev) {
        var el = ev.target.closest('[data-act]');
        if (el && el.getAttribute('data-act') === 'reload') location.reload();
      };
      return;
    }

    root.innerHTML = '<div class="empty"><span class="big">🎯</span>' +
      '<div>今天的题都练完了</div>' +
      '<div class="faint mt8">题库里一共 ' + bank + ' 题，今天已经没有没练过的了。' +
      '可以再练一组（会重复出现练过的题），或者挑个场景自由刷题。</div>' +
      '<div style="display:grid;gap:10px;max-width:320px;margin:18px auto 0">' +
      '<button class="btn block" data-act="more">再练一组</button>' +
      '<button class="btn ghost block" data-act="free">自由刷题</button>' +
      '<button class="btn gray block" data-act="go-review">去复习回顾</button>' +
      '</div></div>';
    bind(root);
  }

  function renderDone(root) {
    var s = summarize();
    var streak = SF.store.state.streak.count || 0;
    root.innerHTML =
      '<div class="card done-card">' +
      '<div class="em">🎉</div>' +
      '<h2 class="mt12">这一组练完了</h2>' +
      '<div class="muted">今日累计完成 ' + s.done + ' 题</div>' +
      '<div class="done-stats">' +
      '<div><div class="n" style="color:var(--ok)">' + s.mastered + '</div><div class="l">已掌握</div></div>' +
      '<div><div class="n" style="color:var(--bad)">' + s.needMore + '</div><div class="l">待加强</div></div>' +
      '<div><div class="n" style="color:var(--warn)">' + s.fav + '</div><div class="l">新增好句</div></div>' +
      '</div>' +
      '<div class="muted">连续打卡 <b style="color:var(--warn)">' + streak + '</b> 天' +
      (s.needMore ? ' · 待加强的题已进入复习队列' : '') + '</div>' +
      '<div class="mt16" style="display:grid;gap:10px">' +
      '<button class="btn block" data-act="more">再加练一组</button>' +
      '<button class="btn ghost block" data-act="free">自由刷题（换个场景）</button>' +
      (s.needMore ? '<button class="btn ghost block" data-act="go-review">去复习回顾（' + s.needMore + ' 题）</button>' : '') +
      '<button class="btn gray block" data-act="go-fav">看好句积累</button>' +
      '</div>' +
      '</div>';
    bind(root);
  }

  /* ---------- 事件 ---------- */
  function bind(root) {
    root.onclick = function (ev) {
      var el = ev.target.closest('[data-act]');
      if (!el) return;
      var act = el.getAttribute('data-act');

      if (act === 'toggle-hint') { S.hintOpen = !S.hintOpen; return render(); }

      if (act === 'reveal') {
        S.revealed = Math.min(3, S.revealed + 1);
        return render();
      }

      if (act === 'speak') { SF.speech.speak(el.getAttribute('data-en')); return; }

      if (act === 'fav') {
        var it = item(S.queue[S.idx]);
        if (!it) return;
        var level = Number(el.getAttribute('data-level'));
        var vi = Number(el.getAttribute('data-vi'));
        var L = it.levels[level - 1];
        var added = SF.store.toggleFav({
          itemId: it.id, level: level, versionIndex: vi,
          en: L.versions[vi], cn: it.cn, scene: it.scene,
          track: it.track, structure: L.structure
        });
        if (added) {
          var d = SF.store.day(U.today());
          d.addedFav = (d.addedFav || 0) + 1;
          SF.store.saveDay(d);
          U.toast('已加入好句积累');
        } else {
          U.toast('已取消收藏');
        }
        return render();
      }

      if (act === 'ans') { return answer(el.getAttribute('data-r')); }
      if (act === 'more') { return startDaily(true); }
      if (act === 'free') {
        var need = SF.store.state.settings.dailyGoal;
        var pick = SF.picker.buildFreeSet(SF.app.bank, need, { seed: Date.now() });
        if (!pick.ids.length) return U.toast('题库里暂时没有题目');
        return startList(pick.ids, '自由刷题');
      }
      if (act === 'go-review') { return SF.app.go('review'); }
      if (act === 'go-fav') { return SF.app.go('favorites'); }
    };
  }

  /* ---------- 进入 ---------- */
  function enter() {
    var d = SF.store.day(U.today());
    var pending = pendingOfSet(d);

    // 保留进行中的进度
    if (!S.finished && S.idx > 0 && S.idx < S.queue.length) { render(); return; }

    if (pending.length) {
      S.queue = pending; S.idx = 0; S.revealed = 0; S.finished = false;
      render();
      return;
    }

    // 今日已完成 → 结算页（★ 不要清空队列，render 会因此误判成"题库为空"）
    if (d.doneIds.length) {
      S.queue = []; S.idx = 0; S.revealed = 0; S.finished = true;
      render();
      return;
    }

    startDaily(false);
  }

  SF.views.challenge = {
    enter: enter,
    startDaily: startDaily,
    startList: startList,
    render: render,
    renderDone: renderDone,
    _state: S
  };
})(window.SF);
