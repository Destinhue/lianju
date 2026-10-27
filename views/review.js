/* ============================================================
   views/review.js — 复习回顾（Leitner 到期队列 + 卡片翻转 + 抽样复核）
   ============================================================ */
window.SF = window.SF || {};
SF.views = SF.views || {};
(function (SF) {
  'use strict';
  var U = SF.util, E = U.esc;

  var S = { queue: [], idx: 0, flipped: false, revealed: 0, kind: 'due' };

  function item(id) { return SF.app.itemMap[id] || null; }

  function build() {
    var due = SF.scheduler.dueList(SF.app.bank, U.today());
    var checkups = SF.scheduler.checkupList(SF.app.bank, U.today());
    S.queue = due.map(function (r) { return r.item.id; })
      .concat(checkups.map(function (r) { return r.item.id; }));
    S.idx = 0; S.flipped = false; S.revealed = 0;
    S.kind = due.length ? 'due' : (checkups.length ? 'checkup' : 'none');
  }

  function answer(result) {
    var id = S.queue[S.idx];
    if (!id) return;
    var st = SF.store.itemState(id);
    SF.store.setItemState(id, SF.scheduler.applyResult(st, result, U.today()));
    SF.store.touchStreak(U.today());
    SF.speech.stop();
    S.idx += 1; S.flipped = false; S.revealed = 0;
    render();
  }

  function render() {
    var root = document.getElementById('view');
    if (!root) return;

    if (!S.queue.length || S.idx >= S.queue.length) return renderEmpty(root, S.idx >= S.queue.length && S.queue.length > 0);

    var it = item(S.queue[S.idx]);
    if (!it) { S.idx += 1; return render(); }

    var st = SF.store.itemState(it.id) || {};
    var isCheck = st.state === 'mastered';
    var total = S.queue.length;

    var html = '';
    html += '<div class="row between" style="margin-bottom:8px">' +
      '<span class="faint">' + (isCheck ? '抽样复核' : '到期复习') + ' · 第 ' + (S.idx + 1) + ' / ' + total + ' 题</span>' +
      '<span class="tag warn">' + E(SF.scheduler.boxLabel(st.box, st.state)) + '</span>' +
      '</div>';
    html += '<div class="progress" style="margin-bottom:14px"><i style="width:' +
      Math.round(S.idx / total * 100) + '%"></i></div>';

    // 卡片
    html += '<div class="card">';
    if (!S.flipped) {
      html += '<div class="card-flip" data-act="flip">' +
        '<div class="faint" style="margin-bottom:10px">先自己说一遍，再点卡片看答案</div>' +
        '<div class="front">' + E(it.cn) + '</div>' +
        '<div class="faint mt12">轻触卡片翻面 ↓</div>' +
        '</div>';
    } else {
      html += '<div class="qmeta"><span class="tag">' + E(it.track) + '</span>' +
        '<span class="tag gray">' + E(it.scene) + '</span>' +
        '<span class="stars">' + U.stars(it.difficulty) + '</span></div>';
      html += '<div class="qcn" style="font-size:1.06em">' + E(it.cn) + '</div>';
      html += '<div class="disclose"><div class="body" style="padding-top:12px">';
      var shown = Math.max(1, S.revealed);
      for (var i = 0; i < shown; i++) {
        var L = it.levels[i];
        if (!L) continue;
        html += '<div class="level lv-' + L.level + '">' +
          '<div class="lv-head"><span class="lv-dot"></span><span>L' + L.level + ' · ' + E(L.label) + '</span>' +
          '<span class="lv-struct">' + E(L.structure || '') + '</span></div><div class="lv-body">';
        (L.versions || []).forEach(function (en, vi) {
          var on = SF.store.isFav(it.id, L.level, vi);
          html += '<div class="enline"><span class="txt">' + E(en) + '</span>' +
            (SF.speech.supported() ? '<button class="speak-btn" data-act="speak" data-en="' + E(en) + '">🔊</button>' : '') +
            '<button class="fav-btn' + (on ? ' on' : '') + '" data-act="fav" data-level="' + L.level +
            '" data-vi="' + vi + '">' + (on ? '★' : '☆') + '</button></div>';
        });
        html += '</div></div>';
      }
      if (S.revealed < 3) {
        html += '<button class="btn ghost block mt12" data-act="reveal">再展开一层更优表达</button>';
      }
      html += '</div></div>';

      html += '<div class="selfcheck">' +
        '<div class="ask">这次默写出来了吗？</div>' +
        '<div class="two">' +
        '<button class="btn bad" data-act="ans" data-r="need_more">还是不会</button>' +
        '<button class="btn ok" data-act="ans" data-r="mastered">写出来了</button>' +
        '</div>' +
        '<div class="faint center mt8">答对会升级到下一个记忆盒（1 → 3 → 7 → 15 天），连续 4 次就毕业</div>' +
        '</div>';
    }
    html += '</div>';
    root.innerHTML = html;
    bind(root);
  }

  function renderEmpty(root, justFinished) {
    var due = SF.scheduler.dueList(SF.app.bank, U.today()).length;
    var learning = SF.store.stats().learning;
    root.innerHTML = '<div class="empty"><span class="big">' + (justFinished ? '✅' : '🌤') + '</span>' +
      '<h2>' + (justFinished ? '复习完成' : (due ? '还有 ' + due + ' 题待复习' : '今天没有要复习的题')) + '</h2>' +
      '<div class="muted mt8">' +
      (learning ? '复习队列里还有 <b>' + learning + '</b> 道题在按排期等待。' : '练过的题选「需要加强」后，会按 1 → 3 → 7 → 15 天的节奏回来找你。') +
      '</div>' +
      '<div class="mt16"><button class="btn ghost" data-act="go-challenge">去做今日挑战</button></div>' +
      '</div>';
    root.onclick = function (ev) {
      var el = ev.target.closest('[data-act]');
      if (el && el.getAttribute('data-act') === 'go-challenge') SF.app.go('challenge');
      else if (el && el.getAttribute('data-act') === 'refresh') { build(); render(); }
    };
    if (!justFinished) {
      root.innerHTML = root.innerHTML.replace('</div>',
        '<div class="mt8"><button class="btn gray sm" data-act="refresh">刷新队列</button></div></div>');
      root.onclick = function (ev) {
        var el = ev.target.closest('[data-act]');
        if (!el) return;
        var a = el.getAttribute('data-act');
        if (a === 'go-challenge') SF.app.go('challenge');
        if (a === 'refresh') { build(); render(); }
      };
    }
  }

  function bind(root) {
    root.onclick = function (ev) {
      var el = ev.target.closest('[data-act]');
      if (!el) return;
      var act = el.getAttribute('data-act');
      if (act === 'flip') { S.flipped = true; S.revealed = 0; return render(); }
      if (act === 'reveal') { S.revealed = Math.min(3, S.revealed + 1); return render(); }
      if (act === 'speak') { SF.speech.speak(el.getAttribute('data-en')); return; }
      if (act === 'ans') { return answer(el.getAttribute('data-r')); }
      if (act === 'fav') {
        var it = item(S.queue[S.idx]);
        var level = Number(el.getAttribute('data-level'));
        var vi = Number(el.getAttribute('data-vi'));
        var L = it.levels[level - 1];
        var added = SF.store.toggleFav({
          itemId: it.id, level: level, versionIndex: vi, en: L.versions[vi],
          cn: it.cn, scene: it.scene, track: it.track, structure: L.structure
        });
        U.toast(added ? '已加入好句积累' : '已取消收藏');
        return render();
      }
    };
  }

  function enter() { build(); render(); }

  SF.views.review = { enter: enter, render: render, build: build, _state: S };
})(window.SF);
