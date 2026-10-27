/* ============================================================
   views/favorites.js — 好句积累（摘句级收藏 / 搜索 / 分组 / 导出）
   ============================================================ */
window.SF = window.SF || {};
SF.views = SF.views || {};
(function (SF) {
  'use strict';
  var U = SF.util, E = U.esc;

  var S = { q: '', group: 'all', sort: 'new' };

  function filtered() {
    var list = SF.store.state.favorites.slice();
    if (S.group !== 'all') {
      list = list.filter(function (f) { return f.track === S.group; });
    }
    if (S.q) {
      var q = S.q.toLowerCase();
      list = list.filter(function (f) {
        return (f.en || '').toLowerCase().indexOf(q) >= 0 ||
          (f.cn || '').toLowerCase().indexOf(q) >= 0 ||
          (f.scene || '').toLowerCase().indexOf(q) >= 0 ||
          (f.structure || '').toLowerCase().indexOf(q) >= 0;
      });
    }
    if (S.sort === 'new') list.sort(function (a, b) { return b.addedAt - a.addedAt; });
    else if (S.sort === 'scene') list.sort(function (a, b) { return (a.scene || '').localeCompare(b.scene || ''); });
    else if (S.sort === 'level') list.sort(function (a, b) { return b.level - a.level; });
    return list;
  }

  function render() {
    var root = document.getElementById('view');
    if (!root) return;
    var all = SF.store.state.favorites;
    var list = filtered();

    var html = '';
    html += '<h2>好句积累</h2>' +
      '<div class="muted">共 ' + all.length + ' 句' +
      (list.length !== all.length ? '（筛选出 ' + list.length + ' 句）' : '') + '</div>';

    if (all.length) {
      html += '<div class="mt12"><input type="text" id="fav-q" placeholder="搜索中文 / 英文 / 场景…" value="' + E(S.q) + '"></div>';
      html += '<div class="filters mt12">' +
        chip('all', '全部', S.group) + chip('应用文', '应用文', S.group) +
        chip('读后续写', '读后续写', S.group) + chip('高级句式', '高级句式', S.group) +
        '</div>';
      html += '<div class="filters">' +
        '<button class="chip' + (S.sort === 'new' ? ' on' : '') + '" data-act="sort" data-v="new">最新收藏</button>' +
        '<button class="chip' + (S.sort === 'scene' ? ' on' : '') + '" data-act="sort" data-v="scene">按场景</button>' +
        '<button class="chip' + (S.sort === 'level' ? ' on' : '') + '" data-act="sort" data-v="level">按层级</button>' +
        '<button class="chip" data-act="export">导出 Markdown</button>' +
        '<button class="chip" data-act="print">打印背诵版</button>' +
        '</div>';
    }

    if (!all.length) {
      html += '<div class="empty"><span class="big">⭐</span>' +
        '<div>还没有收藏的好句</div>' +
        '<div class="faint mt8">在今日挑战里展开答案后，点句子右侧的 ☆ 就能摘进这里。</div>' +
        '<div class="mt16"><button class="btn ghost" data-act="go-challenge">去做今日挑战</button></div>' +
        '</div>';
    } else if (!list.length) {
      html += '<div class="empty"><span class="big">🔍</span><div>没有匹配的好句</div></div>';
    } else {
      html += '<div class="card">';
      list.forEach(function (f, i) {
        var idx = all.indexOf(f);
        html += '<div class="list-item">' +
          '<div class="body">' +
          '<div class="en">' + E(f.en) + '</div>' +
          '<div class="cn">' + E(f.cn) + '</div>' +
          '<div class="row wrap" style="gap:6px;margin-top:6px">' +
          '<span class="tag">L' + f.level + '</span>' +
          '<span class="tag gray">' + E(f.scene || '') + '</span>' +
          (f.structure ? '<span class="tag plain">' + E(f.structure) + '</span>' : '') +
          '</div></div>' +
          '<div style="display:flex;flex-direction:column;gap:6px">' +
          (SF.speech.supported() ? '<button class="speak-btn" data-act="speak" data-en="' + E(f.en) + '">🔊</button>' : '') +
          '<button class="fav-btn on" data-act="del" data-i="' + idx + '" title="移除">★</button>' +
          '</div></div>';
      });
      html += '</div>';

      // 仿写变式
      var scenes = {};
      list.forEach(function (f) { if (f.scene) scenes[f.scene] = true; });
      var sceneList = Object.keys(scenes);
      if (sceneList.length) {
        html += '<div class="card tight"><div class="row between wrap">' +
          '<div><b>把好句用出去</b><div class="faint">挑一个场景，立刻再练几道同款</div></div>' +
          '<div class="row wrap" style="gap:6px">' +
          sceneList.slice(0, 4).map(function (sc) {
            return '<button class="chip" data-act="drill" data-scene="' + E(sc) + '">' + E(sc) + '</button>';
          }).join('') +
          '</div></div></div>';
      }
    }

    root.innerHTML = html;
    bind(root);
  }

  function chip(v, label, cur) {
    return '<button class="chip' + (cur === v ? ' on' : '') + '" data-act="group" data-v="' + E(v) + '">' + E(label) + '</button>';
  }

  function exportMarkdown() {
    var list = SF.store.state.favorites;
    if (!list.length) return U.toast('还没有收藏的好句');
    var lines = ['# 好句积累（共 ' + list.length + ' 句）', '', '> 导出于 ' + U.today() + ' · 炼句', ''];
    var byScene = {};
    list.forEach(function (f) { (byScene[f.scene] = byScene[f.scene] || []).push(f); });
    Object.keys(byScene).forEach(function (sc) {
      lines.push('## ' + sc);
      lines.push('');
      byScene[sc].forEach(function (f) {
        lines.push('- **' + f.en + '**');
        lines.push('  - 中文：' + (f.cn || ''));
        lines.push('  - 层级：L' + f.level + (f.structure ? ' · ' + f.structure : ''));
      });
      lines.push('');
    });
    var text = lines.join('\n');
    U.copyOrDownload(text, '好句积累-' + U.today() + '.md');
  }

  function printVersion() {
    var list = SF.store.state.favorites;
    if (!list.length) return U.toast('还没有收藏的好句');
    var w = window.open('', '_blank');
    if (!w) return U.toast('浏览器拦截了打印窗口');
    var body = '<h1>好句背诵版</h1>';
    var byScene = {};
    list.forEach(function (f) { (byScene[f.scene] = byScene[f.scene] || []).push(f); });
    Object.keys(byScene).forEach(function (sc) {
      body += '<h2>' + E(sc) + '</h2><ul>';
      byScene[sc].forEach(function (f) {
        body += '<li><b>' + E(f.en) + '</b><br><small>' + E(f.cn || '') + '</small></li>';
      });
      body += '</ul>';
    });
    w.document.write('<html><head><meta charset="utf-8"><title>好句背诵版</title><style>' +
      'body{font-family:Georgia,"Songti SC",serif;max-width:800px;margin:20px auto;line-height:1.7}' +
      'h1{font-size:20px}h2{font-size:15px;border-bottom:1px solid #ccc;padding-bottom:4px;margin-top:18px}' +
      'li{margin-bottom:8px}small{color:#666}' +
      '@media print{body{margin:0}}</style></head><body>' + body + '</body></html>');
    w.document.close();
    setTimeout(function () { w.print(); }, 350);
  }

  function bind(root) {
    var qi = root.querySelector('#fav-q');
    if (qi) {
      qi.oninput = function () {
        S.q = this.value;
        var pos = this.selectionStart;
        render();
        var nq = document.getElementById('fav-q');
        if (nq) { nq.focus(); try { nq.setSelectionRange(pos, pos); } catch (e) { } }
      };
    }
    root.onclick = function (ev) {
      var el = ev.target.closest('[data-act]');
      if (!el) return;
      var act = el.getAttribute('data-act');
      if (act === 'group') { S.group = el.getAttribute('data-v'); return render(); }
      if (act === 'sort') { S.sort = el.getAttribute('data-v'); return render(); }
      if (act === 'speak') { return SF.speech.speak(el.getAttribute('data-en')); }
      if (act === 'del') {
        SF.store.removeFav(Number(el.getAttribute('data-i')));
        U.toast('已移除');
        return render();
      }
      if (act === 'export') { return exportMarkdown(); }
      if (act === 'print') { return printVersion(); }
      if (act === 'go-challenge') { return SF.app.go('challenge'); }
      if (act === 'drill') {
        var sc = el.getAttribute('data-scene');
        var res = SF.picker.buildFreeSet(SF.app.bank, 6, { scene: sc, seed: Date.now() });
        if (!res.ids.length) return U.toast('该场景暂无更多题目');
        SF.app.go('challenge');
        SF.views.challenge.startList(res.ids, '好句仿写 · ' + sc);
        return;
      }
    };
  }

  function enter() { render(); }

  SF.views.favorites = { enter: enter, render: render, _state: S, exportMarkdown: exportMarkdown };
})(window.SF);
