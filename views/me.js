/* ============================================================
   views/me.js — 我的：总览 / 弱点画像 / 设置 / 数据与备份 / 题库自检
   ============================================================ */
window.SF = window.SF || {};
SF.views = SF.views || {};
(function (SF) {
  'use strict';
  var U = SF.util, E = U.esc;

  function render() {
    var root = document.getElementById('view');
    if (!root) return;
    var st = SF.store.stats();
    var ov = SF.stats.overview(SF.app.bank);
    var weak = SF.stats.weakPoints(SF.app.bank, 3);
    var days = SF.stats.recentDays(7);
    var maxDone = Math.max(1, Math.max.apply(null, days.map(function (d) { return d.done; })));

    var html = '';

    /* ---------- 总览 ---------- */
    html += '<h2>我的</h2>';
    html += '<div class="stat-grid mt12">' +
      box(st.touched, '练过的题') +
      box(st.mastered, '已掌握', 'var(--ok)') +
      box(st.learning, '复习中', 'var(--bad)') +
      box(st.favorites, '收藏好句', 'var(--warn)') +
      '</div>';
    html += '<div class="card mt12">' +
      '<div class="row between"><span>连续打卡</span><b style="color:var(--warn)">' + st.streak + ' 天</b></div>' +
      '<div class="row between mt8"><span>最长连续</span><span class="muted">' + st.best + ' 天</span></div>' +
      '<div class="row between mt8"><span>使用天数</span><span class="muted">' + st.days + ' 天</span></div>' +
      '</div>';

    /* ---------- 背单词进度（与 1000 词表联动） ---------- */
    if (SF.vocab && SF.vocab.ready()) {
      var vs = SF.vocab.stats();
      var vpct = Math.round(vs.mastered / Math.max(1, vs.total) * 100);
      html += '<div class="card mt12">' +
        '<div class="row between"><h3 style="margin:0">背单词</h3>' +
        '<button class="btn sm gray" data-act="go-vocab">去背单词</button></div>' +
        '<div class="row between mt8"><span>已掌握</span><b style="color:var(--ok)">' +
        vs.mastered + ' / ' + vs.total + '</b></div>' +
        '<div class="progress mt8"><i style="width:' + vpct + '%"></i></div>' +
        '<div class="row between mt8"><span>今天待复习</span><span class="muted">' + vs.due + ' 个</span></div>' +
        '<div class="row between mt8"><span>还没学过</span><span class="muted">' + vs.untouched + ' 个</span></div>' +
        '</div>';
    }

    /* ---------- 近 7 天 ---------- */
    html += '<div class="card"><h3>近 7 天</h3><div class="row" style="align-items:flex-end;gap:8px;height:88px">';
    days.forEach(function (d) {
      var hpct = Math.round(d.done / maxDone * 100);
      var isToday = d.date === U.today();
      html += '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;justify-content:flex-end">' +
        '<div class="faint" style="font-size:.68em">' + (d.done || '') + '</div>' +
        '<div style="width:100%;height:' + Math.max(3, hpct) + '%;border-radius:5px 5px 0 0;' +
        'background:' + (isToday ? 'var(--brand)' : 'var(--brand-soft)') + '"></div>' +
        '<div class="faint" style="font-size:.66em">' + d.date.slice(5) + '</div>' +
        '</div>';
    });
    html += '</div></div>';

    /* ---------- 弱点画像 ---------- */
    html += '<div class="card"><h3>薄弱点</h3>';
    if (!weak.length) {
      html += '<div class="muted">至少练过 2 道题后，这里会按语法点统计出你最需要补的地方。</div>';
    } else {
      weak.forEach(function (w) {
        var pct = Math.round(w.rate * 100);
        var color = pct >= 60 ? 'var(--bad)' : (pct >= 30 ? 'var(--warn)' : 'var(--ok)');
        html += '<div class="bar-row">' +
          '<span class="nm">' + E(w.key) + '</span>' +
          '<span class="bg"><i style="width:' + pct + '%;background:' + color + '"></i></span>' +
          '<span class="pc">' + pct + '%</span>' +
          '</div>';
      });
      html += '<div class="faint mt8">百分比 = 该语法点下选「需要加强」的比例（练过 ' +
        weak[0].attempts + ' 次以上才统计）</div>';
      html += '<button class="btn ghost block mt12" data-act="drill" data-g="' + E(weak[0].key) + '">' +
        '专项训练：' + E(weak[0].key) + '（10 题）</button>';
    }
    html += '</div>';

    /* ---------- 自由刷题 ---------- */
    html += '<div class="card"><h3>自由刷题</h3>' +
      '<div class="muted">想多练的时候，按场景挑一组。</div>' +
      '<div class="filters mt12" style="flex-wrap:wrap;overflow:visible">';
    (window.SF_META.tracks || []).forEach(function (t) {
      html += '<button class="chip" data-act="drill-track" data-t="' + E(t) + '">' + E(t) + ' 10 题</button>';
    });
    html += '</div></div>';

    /* ---------- DeepSeek 生成 ---------- */
    var se0 = SF.store.state.settings;
    var configured = SF.api.isConfigured();
    var bk = (SF.app.bankStats && SF.app.bankStats()) || { seed: SF.app.bank.length, cached: 0, total: SF.app.bank.length };
    var usage = SF.store.state.usage || {};
    var cov = SF.generator.coverage();
    var covKeys = Object.keys(cov).sort(function (a, b) { return cov[b] - cov[a]; }).slice(0, 3);

    html += '<div class="card"><h3>DeepSeek 生成</h3>' +
      '<div class="muted">题库不够时自动出题。生成的题会先过四道质量校验，不合格的直接丢弃，不会污染你的题库。</div>' +

      '<div class="mt12">' +
      '<div class="row between"><span>API Key</span><b style="color:' + (configured ? 'var(--ok)' : 'var(--fg-faint)') + '">' +
      (configured ? '已配置 ' + E(SF.api.maskKey()) : '未配置') + '</b></div>' +
      '<div class="row between mt8"><span>题库构成</span><span class="muted">种子 ' + bk.seed + ' + AI 生成 ' + bk.cached + ' = ' + bk.total + ' 题</span></div>' +
      '<div class="row between mt8"><span>今日调用</span><span class="muted">' + SF.api.todayCalls() + ' 次' +
      (Number(se0.dailyGenCap) > 0 ? ' / 上限 ' + se0.dailyGenCap : '') + '</span></div>' +
      '<div class="row between mt8"><span>累计 tokens</span><span class="muted">输入 ' + (usage.tokensIn || 0) + ' · 输出 ' + (usage.tokensOut || 0) + '</span></div>' +
      (covKeys.length ? '<div class="row between mt8"><span>已生成场景</span><span class="muted">' +
        covKeys.map(function (k) { return E(k.split('/')[1]) + ' ' + cov[k]; }).join(' · ') + '</span></div>' : '') +
      '</div>' +

      '<label class="field mt16"><span class="lb">API Key（只存在你自己手机/电脑的浏览器里，不会上传）</span>' +
      '<input type="password" id="api-key" placeholder="sk-..." value="' + E(se0.apiKey || '') + '" autocomplete="off"></label>' +

      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' +
      '<button class="btn" data-act="api-save">保存 Key</button>' +
      '<button class="btn gray" data-act="api-test">测试连接</button>' +
      '</div>' +
      '<div id="api-status" class="faint mt8"></div>' +

      '<label class="field mt16"><span class="lb">自动生成</span><select data-act="set" data-k="apiEnabled">' +
      sel('true', '开启（题库不足时自动出题）', String(se0.apiEnabled !== false)) +
      sel('false', '关闭（只用现有题库）', String(se0.apiEnabled === false)) +
      '</select></label>' +

      '<label class="field"><span class="lb">模型</span><select data-act="set" data-k="model">' +
      sel('deepseek-chat', 'deepseek-chat（快、便宜，推荐）', se0.model) +
      sel('deepseek-reasoner', 'deepseek-reasoner（更慢更贵，题更难）', se0.model) +
      '</select></label>' +

      '<label class="field"><span class="lb">单日调用上限（防止 Key 被盗刷烧钱，0 = 不限制）</span>' +
      '<input type="number" min="0" max="500" data-act="setnum" data-k="dailyGenCap" value="' + Number(se0.dailyGenCap || 0) + '"></label>' +

      '<div class="mt16" style="border-top:1px solid var(--line);padding-top:14px">' +
      '<b>离线预热包</b>' +
      '<div class="muted mt8">在家有 WiFi 时先下载一批题存到本地，之后在教室断网也能照常练。</div>' +
      '<div class="row wrap mt12" style="gap:8px">' +
      '<button class="chip" data-act="prefetch" data-n="30">预下载 30 题</button>' +
      '<button class="chip" data-act="prefetch" data-n="60">预下载 60 题</button>' +
      '<button class="chip" data-act="prefetch" data-n="120">预下载 120 题</button>' +
      '</div>' +
      '<div id="gen-progress" class="faint mt8"></div>' +
      '</div>' +

      (configured ? '<button class="btn gray block mt16" data-act="api-clear">清除 API Key</button>' : '') +
      '<div class="faint mt12">费用以 DeepSeek 官方定价为准，这里只统计 token 用量。生成的题会连同练习记录一起被备份导出。</div>' +
      '</div>';

    /* ---------- 设置 ---------- */
    var se = SF.store.state.settings;
    html += '<div class="card"><h3>设置</h3>' +
      '<label class="field"><span class="lb">每组题量</span><select data-act="set" data-k="dailyGoal">' +
      opt(6, se.dailyGoal) + opt(8, se.dailyGoal) + opt(12, se.dailyGoal) + opt(20, se.dailyGoal) +
      '</select></label>' +
      '<label class="field"><span class="lb">字号</span><select data-act="set" data-k="fontSize">' +
      sel('s', '小', se.fontSize) + sel('m', '标准', se.fontSize) + sel('l', '大', se.fontSize) +
      '</select></label>' +
      '<label class="field"><span class="lb">主题</span><select data-act="set" data-k="theme">' +
      sel('auto', '跟随系统', se.theme) + sel('light', '浅色', se.theme) + sel('dark', '深色', se.theme) +
      '</select></label>' +
      '</div>';

    /* ---------- 数据与备份 ---------- */
    html += '<div class="card"><h3>数据与备份</h3>' +
      '<div class="muted">清浏览器缓存或换手机会丢数据，建议每周导出一次备份。</div>' +
      '<div class="mt12" style="display:grid;gap:8px">' +
      '<button class="btn ghost block" data-act="export">导出备份（复制 / 下载）</button>' +
      '<button class="btn gray block" data-act="import-show">从备份恢复</button>' +
      '</div>' +
      '<div id="import-box" class="hidden mt12">' +
      '<textarea id="import-ta" placeholder="把之前导出的备份 JSON 粘贴到这里"></textarea>' +
      '<button class="btn block mt8" data-act="import-do">确认恢复（会覆盖当前数据）</button>' +
      '</div>' +
      '<div class="faint mt12">存储方式：' + (st.usingLocalStorage ? 'localStorage（正常）' : '内存兜底（浏览器禁用了本地存储，关掉页面会丢数据！）') + '</div>' +
      '</div>';

    /* ---------- 题库自检 ---------- */
    var bad = SF.app.badItems || [];
    html += '<div class="card"><h3>题库自检</h3>' +
      '<div class="row between"><span>可用题目</span><b>' + SF.app.bank.length + ' 题</b></div>' +
      '<div class="row between mt8"><span>其中种子 / AI 生成</span><span class="muted">' + bk.seed + ' / ' + bk.cached + '</span></div>' +
      '<div class="row between mt8"><span>占用本地空间</span><span class="muted">' + (SF.cache.bytes() / 1024).toFixed(0) + ' KB</span></div>' +
      '<div class="row between mt8"><span>校验未通过</span><b style="color:' + (bad.length ? 'var(--bad)' : 'var(--ok)') + '">' + bad.length + ' 题</b></div>';
    if (bad.length) {
      html += '<div class="mt12">';
      bad.slice(0, 8).forEach(function (b) {
        html += '<div class="faint" style="margin-bottom:4px">· <b>' + E(b.id) + '</b>：' + E(b.errors.slice(0, 2).join('；')) + '</div>';
      });
      if (bad.length > 8) html += '<div class="faint">…还有 ' + (bad.length - 8) + ' 题</div>';
      html += '</div>';
    }
    html += '<div class="faint mt12">校验未通过的题不会出现在练习中，避免坏数据影响体验。</div>';
    html += '<div class="mt12" style="display:grid;gap:8px">' +
      '<button class="btn gray block" data-act="reset">清空学习记录（收藏 / 打卡 / 复习进度）</button>' +
      '<button class="btn gray block" data-act="reset-bank">清空 AI 生成题库（释放本地空间）</button>' +
      '</div>';
    html += '</div>';

    html += '<div class="center faint" style="padding:16px 0 8px">炼句 · v0.2 · 本地运行，数据不上传</div>';

    root.innerHTML = html;
    bind(root);
  }

  function box(n, l, color) {
    return '<div class="stat-box"><div class="n"' + (color ? ' style="color:' + color + '"' : '') + '>' + n + '</div>' +
      '<div class="l">' + l + '</div></div>';
  }
  function opt(v, cur) {
    return '<option value="' + v + '"' + (Number(cur) === v ? ' selected' : '') + '>' + v + ' 题</option>';
  }
  function sel(v, label, cur) {
    return '<option value="' + v + '"' + (cur === v ? ' selected' : '') + '>' + label + '</option>';
  }

  function bind(root) {
    root.onchange = function (ev) {
      var el = ev.target.closest('[data-act="set"],[data-act="setnum"]');
      if (!el) return;
      var act = el.getAttribute('data-act');
      var k = el.getAttribute('data-k');
      var v = el.value;
      if (act === 'setnum') v = Number(v) || 0;
      else if (k === 'dailyGoal') v = Number(v);
      else if (k === 'apiEnabled') v = (v === 'true');

      SF.store.state.settings[k] = v;
      SF.store.save();
      SF.app.applyAppearance();
      U.toast('已保存');
    };

    root.onclick = function (ev) {
      var el = ev.target.closest('[data-act]');
      if (!el) return;
      var act = el.getAttribute('data-act');

      if (act === 'go-vocab') { SF.app.go('vocab'); return; }

      /* ---- DeepSeek 相关 ---- */
      if (act === 'api-save' || act === 'api-test') {
        var inp = document.getElementById('api-key');
        var val = ((inp && inp.value) || '').trim();
        if (act === 'api-save') {
          if (!val) return U.toast('请先粘贴 API Key');
          if (val.indexOf('sk-') !== 0) return U.toast('Key 一般以 sk- 开头，请检查是否复制完整', 2800);
          SF.store.state.settings.apiKey = val;
          SF.store.save();
          U.toast('已保存到本机（不会上传）');
          return render();
        }
        // 测试连接：先把输入框里的 Key 存下来再测
        if (val) {
          SF.store.state.settings.apiKey = val;
          SF.store.save();
        }
        var box = document.getElementById('api-status');
        if (box) { box.style.color = ''; box.innerHTML = '<span class="loading"></span> 正在测试连接…'; }
        SF.api.test().then(function (r) {
          var b = document.getElementById('api-status');
          if (!b) return;
          b.style.color = r.ok ? 'var(--ok)' : 'var(--bad)';
          b.textContent = (r.ok ? '✅ ' : '❌ ') + r.message;
        });
        return;
      }

      if (act === 'api-clear') {
        if (!confirm('清除本机保存的 API Key？清除后将无法自动生成新题。')) return;
        SF.store.state.settings.apiKey = '';
        SF.store.save();
        U.toast('已清除');
        return render();
      }

      if (act === 'prefetch') {
        if (SF.generator.isRunning()) return U.toast('已有生成任务在进行中，请稍候');
        if (!SF.api.isConfigured()) return U.toast('先在下面填好 API Key 再预下载', 2800);
        var n = Number(el.getAttribute('data-n')) || 30;
        var pg = document.getElementById('gen-progress');
        if (pg) { pg.style.color = ''; pg.innerHTML = '<span class="loading"></span> 准备中…'; }
        SF.generator.prefetch(n, function (info) {
          var b = document.getElementById('gen-progress');
          if (!b) return;
          b.innerHTML = '<span class="loading"></span> 已新增 ' + info.added + ' 题 · 题库 ' +
            info.available + ' / 目标 ' + info.target + '（第 ' + info.round + ' 轮）';
        }).then(function (r) {
          var b = document.getElementById('gen-progress');
          if (b) {
            b.style.color = 'var(--ok)';
            b.textContent = '✅ 预下载完成：新增 ' + r.added + ' 题，当前题库 ' + r.available + ' 题';
          }
          U.toast('预下载完成，新增 ' + r.added + ' 题', 2600);
        }).catch(function (e) {
          var b = document.getElementById('gen-progress');
          var msg = '⚠️ ' + e.message + (e.added ? '（已新增 ' + e.added + ' 题）' : '');
          if (b) { b.style.color = 'var(--bad)'; b.textContent = msg; }
          else U.toast(e.message, 3200);
        });
        return;
      }

      if (act === 'drill') {
        var g = el.getAttribute('data-g');
        var ids = SF.app.bank.filter(function (it) {
          return (it.grammarPoints || []).indexOf(g) >= 0;
        }).map(function (it) { return it.id; });
        if (!ids.length) return U.toast('暂时没有针对该语法点的题');
        var picked = U.shuffleSeed(ids, 'drill' + Date.now()).slice(0, 10);
        SF.app.go('challenge');
        SF.views.challenge.startList(picked, '专项训练 · ' + g);
        return;
      }
      if (act === 'drill-track') {
        var t = el.getAttribute('data-t');
        var res = SF.picker.buildFreeSet(SF.app.bank, 10, { track: t, seed: Date.now() });
        if (!res.ids.length) return U.toast('该分类暂无题目');
        SF.app.go('challenge');
        SF.views.challenge.startList(res.ids, '自由刷题 · ' + t);
        return;
      }
      if (act === 'export') {
        return U.copyOrDownload(SF.store.exportJSON(), '炼句备份-' + U.today() + '.json');
      }
      if (act === 'import-show') {
        document.getElementById('import-box').classList.toggle('hidden');
        return;
      }
      if (act === 'import-do') {
        var ta = document.getElementById('import-ta');
        if (!ta || !ta.value.trim()) return U.toast('请先粘贴备份内容');
        if (!confirm('确定用备份覆盖当前数据吗？此操作不可撤销。')) return;
        var r = SF.store.importJSON(ta.value.trim());
        if (!r.ok) return U.toast('恢复失败：' + r.error, 3200);
        U.toast('恢复成功' + (r.restoredBank ? '，同时恢复 ' + r.restoredBank + ' 道 AI 生成题' : ''), 2800);
        if (SF.app.reloadBank) SF.app.reloadBank();
        SF.app.refreshBadges();
        return render();
      }
      if (act === 'reset') {
        if (!confirm('将清空练习记录、收藏、打卡与复习进度（AI 生成的题库会保留）。确定吗？')) return;
        SF.store.reset();
        U.toast('学习记录已清空');
        SF.app.refreshBadges();
        return render();
      }
      if (act === 'reset-bank') {
        if (!confirm('将删除所有 AI 生成的题目（种子题库不受影响，收藏的句子仍会保留文字）。确定吗？')) return;
        var n = SF.cache.size();
        SF.cache.clear();
        if (SF.app.reloadBank) SF.app.reloadBank();
        U.toast('已清空 ' + n + ' 道 AI 生成题', 2400);
        return render();
      }
    };
  }

  SF.views.me = { enter: render, render: render };
})(window.SF);
