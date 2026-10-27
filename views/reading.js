/* ============================================================
   views/reading.js — 精读工作台

   列表：按难度/已读筛选，显示每篇的生词数（对照词库实时计算）
   阅读：正文逐词可点，查不到的词标虚线下划线；点词出释义条，
        已收录的可一键排进背单词队列，未收录的可选 AI 查词
   辅助：本文生词清单、长难句与结构提示、标记已精读
   ============================================================ */
window.SF = window.SF || {};
SF.views = SF.views || {};
(function (SF) {
  'use strict';
  var U = SF.util, E = U.esc;

  var S = {
    mode: 'list',
    filter: 0,          // 0 全部 / 1,2,3 难度 / 'read' 已读
    article: null,
    sheet: null,        // {word, hit, ai:{k,m}|null, loading:bool}
    showUnk: true,      // 生词高亮
    showHard: false,    // 长难句面板
    showUnknowns: false
  };

  function cov(a) {
    if (!a.__cov) a.__cov = SF.reading.coverage(a);
    return a.__cov;
  }

  /* ---------------- 列表 ---------------- */
  function renderList(root) {
    var st = SF.reading.readStats();
    var h = '';
    h += '<div class="row between" style="margin-bottom:10px">' +
      '<h2 style="margin:0;font-size:1.22em">精读</h2>' +
      '<span class="faint">' + st.total + ' 篇 · 已读 ' + st.read + '</span></div>';
    h += '<div class="faint" style="margin-bottom:10px">全部来自本地 70 份高三英语模拟卷（2025.02–2026.03），' +
      '正文为原卷 A–D 篇原文，未改写。</div>';

    // 筛选
    h += '<div class="filters" style="padding-bottom:10px">';
    [[0, '全部'], [1, '入门'], [2, '进阶'], [3, '挑战'], ['read', '已读']].forEach(function (f) {
      var on = String(S.filter) === String(f[0]);
      h += '<button class="chip' + (on ? ' on' : '') + '" data-act="filter" data-f="' + f[0] + '">' + f[1] + '</button>';
    });
    h += '</div>';

    var items = SF.reading.all();
    if (S.filter === 'read') items = items.filter(function (a) { return SF.reading.isRead(a.i); });
    else if (S.filter) items = items.filter(function (a) { return a.lv === S.filter; });

    if (!items.length) {
      h += '<div class="empty"><span class="big">📖</span><h2>这里还没有文章</h2>' +
        '<div class="muted mt8">换个筛选条件试试。</div></div>';
    } else {
      h += '<div class="list">';
      items.forEach(function (a) {
        var c = cov(a);
        var read = SF.reading.isRead(a.i);
        h += '<div class="list-item rd-item" data-act="open" data-id="' + E(a.i) + '">' +
          '<div class="body">' +
          '<div class="row" style="gap:6px;flex-wrap:wrap">' +
          '<span class="tag ' + (a.lv === 1 ? 'ok' : a.lv === 2 ? '' : 'warn') + '">' +
          E(SF.reading.levelName(a.lv)) + '</span>' +
          '<span class="faint">' + E(a.lt) + ' 篇 · ' + a.w + ' 词 · 生词 ' + c.unknownCount + '</span>' +
          (read ? '<span class="tag gray">已读</span>' : '') +
          '</div>' +
          '<div class="cn" style="margin-top:4px">' + E(a.src) + '</div>' +
          '</div>' +
          '<div class="faint" style="align-self:center">›</div>' +
          '</div>';
      });
      h += '</div>';
    }

    root.innerHTML = h;
    root.onclick = function (ev) {
      var el = ev.target.closest('[data-act]');
      if (!el) return;
      var a = el.getAttribute('data-act');
      if (a === 'filter') {
        var f = el.getAttribute('data-f');
        S.filter = (f === 'read') ? 'read' : Number(f);
        return render();
      }
      if (a === 'open') { return openArticle(el.getAttribute('data-id')); }
    };
  }

  /* ---------------- 阅读器 ---------------- */
  function openArticle(id) {
    var a = SF.reading.byId(id);
    if (!a) return;
    S.article = a;
    S.mode = 'read';
    S.sheet = null;
    S.showHard = false;
    S.showUnknowns = false;
    render();
    window.scrollTo(0, 0);
  }

  function wordClass(w) {
    if (!S.showUnk) return 'rw';
    // 词库收录 或 卷面常用词，都不标生词
    return (SF.vocab.lookup(w) || SF.reading.isCommon(w)) ? 'rw' : 'rw rw-unk';
  }

  function renderText(a) {
    var h = '';
    SF.reading.paragraphs(a).forEach(function (p) {
      h += '<p class="rd-p">';
      SF.reading.tokens(p).forEach(function (tk) {
        if (tk.t === 'x') { h += E(tk.v); return; }
        h += '<span class="' + wordClass(tk.v) + '" data-act="word" data-w="' + E(tk.v) + '">' + E(tk.v) + '</span>';
      });
      h += '</p>';
    });
    return h;
  }

  function renderSheet() {
    var s = S.sheet;
    if (!s) return '';
    var h = '<div class="wr-sheet" id="wr-sheet">';
    if (s.hit) {
      var w = s.hit.entry;
      h += '<div class="row between"><b class="wr-word">' + E(w.w) + '</b>' +
        '<span class="tag">' + E((SF.vocab.banks().filter(function (b) { return b.id === s.hit.bank; })[0] || {}).name || '') + '</span></div>';
      h += '<div class="mt8"><span class="wpos">' + E(w.k || '') + '</span> ' +
        '<b>' + E(w.m) + '</b></div>';
      if (w.c) h += '<div class="wcoll mt8">' + E(w.c) + '</div>';
      if (w.e) h += '<div class="wex mt8">' + E(w.e) + '</div>';
      if (w.z) h += '<div class="wexz">' + E(w.z) + '</div>';
      h += '<div class="row mt12" style="gap:8px">' +
        '<button class="btn sm" data-act="enroll">加入背单词</button>' +
        (SF.speech.supported() ? '<button class="btn sm gray" data-act="speak">🔊 读一下</button>' : '') +
        '</div>';
    } else {
      h += '<div class="row between"><b class="wr-word">' + E(s.word) + '</b>' +
        '<span class="tag gray">词库未收录</span></div>';
      if (s.ai) {
        h += '<div class="mt8"><span class="wpos">' + E(s.ai.k || '') + '</span> <b>' + E(s.ai.m || '') + '</b></div>';
      } else if (s.loading) {
        h += '<div class="mt8 faint"><span class="loading"></span> 正在查…</div>';
      } else {
        h += '<div class="mt8 faint">这个词不在四个词库里。' +
          (SF.api && SF.api.isConfigured() ? '可以让 AI 查一下释义。' : '到「我的」配置 DeepSeek Key 后可让 AI 查词。') +
          '</div>';
        if (SF.api && SF.api.isConfigured()) {
          h += '<div class="mt12"><button class="btn sm" data-act="ai">AI 查词</button></div>';
        }
      }
    }
    h += '<button class="btn gray sm mt12" data-act="close-sheet">收起</button>';
    h += '</div>';
    return h;
  }

  function renderReader(root) {
    var a = S.article;
    var c = cov(a);
    var h = '';

    h += '<div class="row between" style="margin-bottom:6px">' +
      '<button class="btn gray sm" data-act="back">‹ 返回</button>' +
      '<span class="faint">' + E(SF.reading.levelName(a.lv)) + ' · ' + a.w + ' 词 · 生词 ' + c.unknownCount + '</span>' +
      '</div>';
    h += '<div class="faint" style="margin-bottom:10px">' + E(a.src) + ' · ' + E(a.lt) + ' 篇</div>';

    h += '<div class="filters" style="padding-bottom:8px">' +
      '<button class="chip' + (S.showUnk ? ' on' : '') + '" data-act="toggle-unk">生词高亮</button>' +
      '<button class="chip' + (S.showUnknowns ? ' on' : '') + '" data-act="toggle-unknowns">生词清单 ' + c.unknownCount + '</button>' +
      '<button class="chip' + (S.showHard ? ' on' : '') + '" data-act="toggle-hard">长难句</button>' +
      '</div>';

    if (S.showUnknowns) {
      h += '<div class="card tight" style="margin-bottom:10px">';
      if (!c.unknowns.length) {
        h += '<div class="muted">这篇没有超出词库的词，可以直接当复习材料。</div>';
      } else {
        h += '<div class="muted" style="margin-bottom:8px">不在四个词库里的词（按出现次数）</div><div class="row wrap" style="gap:6px">';
        c.unknowns.slice(0, 60).forEach(function (u) {
          h += '<button class="chip" data-act="word" data-w="' + E(u.w) + '">' + E(u.w) +
            (u.n > 1 ? ' ×' + u.n : '') + '</button>';
        });
        h += '</div>';
      }
      h += '</div>';
    }

    if (S.showHard) {
      var hard = SF.reading.hardSentences(a, 3);
      h += '<div class="card tight" style="margin-bottom:10px">' +
        '<div class="muted" style="margin-bottom:8px">长难句拆解提示（按长度取前 3 句）</div>';
      hard.forEach(function (s, i) {
        h += '<div class="rd-hard">' +
          '<div class="faint">第 ' + (i + 1) + ' 句 · ' + s.words + ' 词</div>' +
          '<div class="rd-hard-en">' + E(s.text) + '</div>' +
          '<div class="mt8">' + s.hints.map(function (x) { return '<span class="tag warn" style="margin-right:6px">' + E(x) + '</span>'; }).join('') + '</div>' +
          '</div>';
      });
      h += '</div>';
    }

    h += '<div class="card rd-text">' + renderText(a) + '</div>';

    h += '<div class="row between mt12">' +
      '<span class="faint">点任意英文词看释义</span>' +
      '<button class="btn sm ' + (SF.reading.isRead(a.i) ? 'gray' : '') + '" data-act="mark">' +
      (SF.reading.isRead(a.i) ? '已精读' : '标记已精读') + '</button></div>';

    h += renderSheet();
    root.innerHTML = h;
    bindReader(root);
  }

  function bindReader(root) {
    root.onclick = function (ev) {
      var el = ev.target.closest('[data-act]');
      if (!el) return;
      var act = el.getAttribute('data-act');

      if (act === 'back') { S.mode = 'list'; S.article = null; S.sheet = null; return render(); }
      if (act === 'toggle-unk') { S.showUnk = !S.showUnk; return render(); }
      if (act === 'toggle-unknowns') { S.showUnknowns = !S.showUnknowns; return render(); }
      if (act === 'toggle-hard') { S.showHard = !S.showHard; return render(); }
      if (act === 'mark') {
        SF.reading.markRead(S.article.i);
        U.toast('已记为精读');
        return render();
      }
      if (act === 'speak') {
        if (S.sheet) SF.speech.speak(S.sheet.word);
        return;
      }
      if (act === 'close-sheet') { S.sheet = null; return render(); }
      if (act === 'enroll') {
        var hit = S.sheet && S.sheet.hit;
        if (!hit) return;
        SF.vocab.enroll(hit.entry.w);
        U.toast('已加入背单词队列');
        return;
      }
      if (act === 'ai') {
        return aiLookup(S.sheet.word);
      }
      if (act === 'word') {
        var w = el.getAttribute('data-w');
        var hit2 = SF.vocab.lookup(w);
        S.sheet = { word: w, hit: hit2, ai: null, loading: false };
        return render();
      }
    };
  }

  function aiLookup(word) {
    if (!SF.api || !SF.api.isConfigured()) return U.toast('未配置 DeepSeek Key');
    S.sheet = { word: word, hit: null, ai: null, loading: true };
    render();
    var sys = '你是高考英语词典。只输出 JSON，不要解释。';
    var user = '给出单词 "' + word + '" 在高考英语阅读里的词性和最常考中文释义。' +
      '严格返回：{"k":"词性缩写，如 n./v./adj.","m":"中文释义，不超过18个汉字"}';
    Promise.resolve()
      .then(function () { return SF.api.chatJSON(sys, user, { temperature: 0.2 }); })
      .then(function (r) {
        var d = (r && r.data) || {};
        S.sheet = { word: word, hit: null, ai: { k: d.k || '', m: d.m || '' }, loading: false };
        render();
      })
      .catch(function (e) {
        S.sheet = { word: word, hit: null, ai: null, loading: false };
        U.toast('查词失败：' + ((e && e.message) || '未知错误'));
        render();
      });
  }

  /* ---------------- 入口 ---------------- */
  function render() {
    var root = document.getElementById('view');
    if (!root) return;
    if (!SF.reading.ready()) {
      root.innerHTML = '<div class="empty"><span class="big">📖</span><h2>文章库没有加载</h2>' +
        '<div class="muted mt8">请确认 index.html 引用了 <code>data/reading-bank.js</code>。</div></div>';
      return;
    }
    if (S.mode === 'read' && S.article) return renderReader(root);
    return renderList(root);
  }

  function enter() {
    S.mode = 'list';
    S.article = null;
    S.sheet = null;
    render();
  }

  SF.views.reading = { enter: enter, render: render, _state: S, openArticle: openArticle };
})(window.SF);
