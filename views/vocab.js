/* ============================================================
   views/vocab.js — 背单词（卡片记忆 / 选择自测 / 结算）

   数据与排期来自 core/vocab.js；盒位规则复用 scheduler.js：
   不熟 → 当天重练；记住 → 1 → 3 → 7 → 15 天，连续 4 次毕业。
   ============================================================ */
window.SF = window.SF || {};
SF.views = SF.views || {};
(function (SF) {
  'use strict';
  var U = SF.util, E = U.esc;

  var S = {
    mode: 'home',      // home | card | quiz | done
    queue: [],
    idx: 0,
    flipped: false,
    answered: false,
    picked: -1,
    okNow: false,
    ok: 0,
    again: 0,
    finishedKind: ''
  };

  function cur() { return S.queue[S.idx] || null; }

  function reset(mode) {
    S.mode = mode;
    S.queue = [];
    S.idx = 0;
    S.flipped = false;
    S.answered = false;
    S.picked = -1;
    S.okNow = false;
    S.ok = 0;
    S.again = 0;
  }

  function start(kind) {
    var q = SF.vocab.dayQueue();
    if (!q.length) { U.toast('没有待学的词了，明天再来'); return; }
    reset(kind);
    S.queue = q;
    render();
  }

  function record(result) {
    var w = cur();
    if (!w) return;
    SF.vocab.applyResult(w.i, result, U.today());
    if (result === 'mastered') S.ok += 1; else S.again += 1;
  }

  function advance() {
    S.idx += 1;
    S.flipped = false;
    S.answered = false;
    S.picked = -1;
    S.okNow = false;
    if (S.idx >= S.queue.length) {
      S.finishedKind = S.mode;
      S.mode = 'done';
    }
    render();
  }

  /* ---------------- 首页 ---------------- */
  function renderHome(root) {
    var st = SF.vocab.stats();
    var banks = st.banks;
    var curInfo = banks.filter(function (b) { return b.id === st.bank; })[0] || banks[0];
    var h = '';

    h += '<div class="row between" style="margin-bottom:10px">' +
      '<h2 style="margin:0;font-size:1.22em">背单词</h2>' +
      '<span class="faint">全库已掌握 ' + st.global.mastered + ' / ' + st.global.total + '</span></div>';

    // 词库切换
    h += '<div class="row wrap" style="gap:7px;padding-bottom:8px">';
    banks.forEach(function (b) {
      if (!b.total) return;
      h += '<button class="chip' + (b.id === st.bank ? ' on' : '') + '" data-act="bank" data-b="' +
        E(b.id) + '">' + E(b.name) + '</button>';
    });
    h += '</div>';
    h += '<div class="faint" style="margin-bottom:10px">' + E(curInfo.name) + '：' + E(curInfo.desc || '') + '</div>';

    // 今日概况
    h += '<div class="card tight" style="margin-bottom:12px">' +
      '<div class="row between"><span class="muted">今天 · 本词库</span>' +
      '<span class="faint">目标 ' + st.goal + ' 词</span></div>' +
      '<div class="done-stats" style="grid-template-columns:repeat(3,1fr);margin:10px 0 2px">' +
      '<div><div class="n" style="color:var(--warn)">' + st.due + '</div><div class="l">待复习</div></div>' +
      '<div><div class="n">' + st.untouched + '</div><div class="l">未学</div></div>' +
      '<div><div class="n" style="color:var(--ok)">' + st.mastered + '</div><div class="l">已掌握</div></div>' +
      '</div></div>';

    // 目标选择
    h += '<div class="filters" style="padding-bottom:8px">';
    [10, 20, 30, 50].forEach(function (g) {
      h += '<button class="chip' + (st.goal === g ? ' on' : '') + '" data-act="goal" data-g="' + g + '">' +
        g + ' 词/天</button>';
    });
    h += '</div>';

    // 启动按钮
    h += '<button class="btn block" data-act="start-card" style="margin-bottom:10px">' +
      '开始卡片记忆 · ' + Math.min(st.goal, st.due + st.untouched) + ' 词</button>';
    h += '<button class="btn ghost block" data-act="start-quiz" style="margin-bottom:14px">' +
      '开始选择自测 · 4 选 1</button>';

    // 进度
    h += '<div class="card tight">';
    if (st.bank === 'core') {
      h += '<div class="muted" style="margin-bottom:10px">分级进度</div>';
      SF.vocab.LEVELS.forEach(function (l) {
        var b = st.byLevel[l];
        if (!b || !b.total) return;
        var pc = Math.round(b.mastered / b.total * 100);
        h += '<div class="bar-row"><span class="nm">' + E(SF.vocab.levelLabel(l)) + '</span>' +
          '<span class="bg"><i style="width:' + pc + '%;background:' + lvColor(l) + '"></i></span>' +
          '<span class="pc">' + b.mastered + '/' + b.total + '</span></div>';
      });
    } else {
      var pc2 = Math.round(st.mastered / Math.max(1, st.total) * 100);
      h += '<div class="bar-row"><span class="nm">' + E(curInfo.name) + '</span>' +
        '<span class="bg"><i style="width:' + pc2 + '%;background:' + (curInfo.color || 'var(--brand)') + '"></i></span>' +
        '<span class="pc">' + st.mastered + '/' + st.total + '</span></div>';
    }
    h += '<div class="faint mt8">本词库已掌握 ' + st.mastered + ' / ' + st.total +
      '（' + Math.round(st.mastered / Math.max(1, st.total) * 100) + '%）' +
      ' · 复习中 ' + st.learning + '</div>';
    h += '</div>';

    root.innerHTML = h;
    root.onclick = function (ev) {
      var el = ev.target.closest('[data-act]');
      if (!el) return;
      var a = el.getAttribute('data-act');
      if (a === 'bank') { SF.vocab.setBank(el.getAttribute('data-b')); return render(); }
      if (a === 'goal') { SF.vocab.setGoal(el.getAttribute('data-g')); return render(); }
      if (a === 'start-card') return start('card');
      if (a === 'start-quiz') return start('quiz');
    };
  }

  function lvColor(l) {
    return l === 'A' ? 'var(--brand)' : l === 'B' ? 'var(--ok)' : l === 'C1' ? 'var(--warn)' : 'var(--l3)';
  }

  /* ---------------- 卡片记忆 ---------------- */
  function cardFront(w) {
    var h = '';
    h += '<div class="word-card" data-act="flip">';
    h += '<div class="wbig">' + E(w.w) + '</div>';
    if (w.p) h += '<div class="wipa">' + E(w.p) + '</div>';
    h += '<div class="wpos">' + E(w.k || '') + '</div>';
    h += '<div class="faint mt16">轻触卡片看释义 ↓</div>';
    h += '</div>';
    return h;
  }

  function cardBack(w) {
    var h = '';
    h += '<div class="word-card">';
    h += '<div class="row between"><div class="wbig">' + E(w.w) + '</div>';
    if (SF.speech.supported()) {
      h += '<button class="speak-btn" data-act="speak" data-w="' + E(w.w) + '" aria-label="朗读">🔊</button>';
    }
    h += '</div>';
    if (w.p) h += '<div class="wipa">' + E(w.p) + '</div>';
    h += '<div class="wpos">' + E(w.k || '') + '</div>';

    h += '<div class="wsec"><div class="wmean">' + E(w.m) + '</div></div>';
    if (w.c) h += '<div class="wcoll">搭配：' + E(w.c) + '</div>';
    if (w.e) {
      h += '<div class="wex">' + E(w.e) + '</div>';
      if (w.z) h += '<div class="wexz">' + E(w.z) + '</div>';
    }
    if (w.d > 0) {
      h += '<div class="faint mt8">这个词还有另一个义项也在这份词表里，别把两个意思混在一起。</div>';
    }
    h += '</div>';
    return h;
  }

  function renderSession(root) {
    var w = cur();
    if (!w) { S.mode = 'done'; return render(); }
    var total = S.queue.length;
    var isQuiz = S.mode === 'quiz';
    var h = '';

    h += '<div class="row between" style="margin-bottom:8px">' +
      '<span class="faint">' + (isQuiz ? '选择自测' : '卡片记忆') + ' · 第 ' +
      (S.idx + 1) + ' / ' + total + ' 词</span>' +
      '<span class="tag">' + E(SF.vocab.levelLabel(w.l)) + '</span></div>';

    h += '<div class="progress" style="margin-bottom:14px"><i style="width:' +
      Math.round(S.idx / total * 100) + '%"></i></div>';

    // 词头信息
    h += '<div class="qmeta"><span class="tag gray">' + E(w.t || '') + '</span>' +
      (w.s ? '<span class="tag bad">★ 真题已考</span>' : '') + '</div>';

    if (!isQuiz) {
      h += S.flipped ? cardBack(w) : cardFront(w);

      if (S.flipped) {
        h += '<div class="selfcheck">' +
          '<div class="ask">这个意思，刚才想到了吗？</div>' +
          '<div class="two">' +
          '<button class="btn bad" data-act="ans" data-r="need_more">不熟</button>' +
          '<button class="btn ok" data-act="ans" data-r="mastered">记住了</button>' +
          '</div>' +
          '<div class="faint center mt8">记住会升级到下一个记忆盒（1 → 3 → 7 → 15 天），连续 4 次就毕业</div>' +
          '</div>';
      }
    } else {
      // 选择自测：只给单词，选中文释义
      h += '<div class="word-card" style="padding-bottom:8px">' +
        '<div class="wbig">' + E(w.w) + '</div>' +
        (w.p ? '<div class="wipa">' + E(w.p) + '</div>' : '') +
        '<div class="wpos">' + E(w.k || '') + '</div></div>';

      var opts = SF.vocab.quizOptions(w, 4);
      h += '<div class="mt16">';
      opts.forEach(function (o, i) {
        var cls = 'opt';
        if (S.answered) {
          if (o.ok) cls += ' opt-ok';
          else if (i === S.picked) cls += ' opt-bad';
        }
        h += '<button class="' + cls + '" data-act="pick" data-i="' + i + '" data-ok="' +
          (o.ok ? 1 : 0) + '">' + E(o.m) + '</button>';
      });
      h += '</div>';

      if (S.answered) {
        h += '<div class="' + (S.okNow ? 'tag ok' : 'tag bad') + '" style="display:inline-block">' +
          (S.okNow ? '选对了' : '正确答案：' + E(w.m)) + '</div>';
        h += '<button class="btn block mt12" data-act="next">下一题</button>';
      }
    }

    // 退出
    h += '<div class="center mt16"><button class="btn gray sm" data-act="quit">结束本组</button></div>';

    root.innerHTML = h;
    bindSession(root);
  }

  function bindSession(root) {
    root.onclick = function (ev) {
      var el = ev.target.closest('[data-act]');
      if (!el) return;
      var a = el.getAttribute('data-act');

      if (a === 'flip') { S.flipped = true; return render(); }
      if (a === 'speak') { SF.speech.speak(el.getAttribute('data-w')); return; }
      if (a === 'ans') { record(el.getAttribute('data-r')); return advance(); }
      if (a === 'quit') {
        S.finishedKind = S.mode;
        S.mode = 'done';
        return render();
      }
      if (a === 'pick') {
        if (S.answered) return;
        S.picked = Number(el.getAttribute('data-i'));
        S.okNow = el.getAttribute('data-ok') === '1';
        S.answered = true;
        record(S.okNow ? 'mastered' : 'need_more');
        return render();
      }
      if (a === 'next') { return advance(); }
    };
  }

  /* ---------------- 结算 ---------------- */
  function renderDone(root) {
    var st = SF.vocab.stats();
    var h = '';
    h += '<div class="card done-card">';
    h += '<div class="em">' + (S.ok + S.again ? '✅' : '🌤') + '</div>';
    h += '<h2 style="margin:10px 0 4px">' + (S.finishedKind === 'quiz' ? '自测完成' : '本组完成') + '</h2>';
    h += '<div class="muted">' + (S.ok + S.again) + ' 个词，按遗忘曲线排好了下一次复习时间</div>';
    h += '<div class="done-stats">' +
      '<div><div class="n" style="color:var(--ok)">' + S.ok + '</div><div class="l">记住了</div></div>' +
      '<div><div class="n" style="color:var(--bad)">' + S.again + '</div><div class="l">待加强</div></div>' +
      '<div><div class="n">' + st.mastered + '</div><div class="l">累计掌握</div></div>' +
      '</div>';
    h += '<button class="btn block" data-act="again" style="margin-bottom:10px">再来一组</button>';
    h += '<button class="btn ghost block" data-act="home">回到单词首页</button>';
    h += '</div>';

    h += '<div class="card tight mt12"><div class="muted" style="margin-bottom:8px">整体进度</div>';
    h += '<div class="progress"><i style="width:' +
      Math.round(st.mastered / Math.max(1, st.total) * 100) + '%"></i></div>';
    h += '<div class="faint mt8">已掌握 ' + st.mastered + ' / ' + st.total +
      ' · 待复习 ' + st.due + ' · 未学 ' + st.untouched + '</div></div>';

    root.innerHTML = h;
    root.onclick = function (ev) {
      var el = ev.target.closest('[data-act]');
      if (!el) return;
      var a = el.getAttribute('data-act');
      if (a === 'again') return start(S.finishedKind === 'quiz' ? 'quiz' : 'card');
      if (a === 'home') { reset('home'); return render(); }
    };
  }

  /* ---------------- 入口 ---------------- */
  function render() {
    var root = document.getElementById('view');
    if (!root) return;

    if (!SF.vocab.ready()) {
      root.innerHTML = '<div class="empty"><span class="big">📚</span><h2>词库没有加载</h2>' +
        '<div class="muted mt8">请确认 index.html 引用了 <code>data/vocab-1000.js</code>。</div></div>';
      return;
    }
    if (S.mode === 'home') return renderHome(root);
    if (S.mode === 'done') return renderDone(root);
    return renderSession(root);
  }

  function enter() {
    reset('home');
    render();
  }

  SF.views.vocab = { enter: enter, render: render, _state: S, start: start };
})(window.SF);
