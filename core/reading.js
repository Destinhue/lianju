/* ============================================================
   core/reading.js — 精读工作台核心（纯函数优先，可被 selftest 断言）

   文章库 data/reading-bank.js：
     i=id lt=原卷篇号 src=来源卷 w=词数 lv=难度(1入门/2进阶/3挑战)
     u=生词率(按 70 卷语料前 2500 词估算) sg=平均句长 text=正文（含 \n 段落）

   职责：把正文切成可点击的词、判断哪些词不在词库里（生词）、
   挑出长难句并给出结构提示、记录精读进度。
   ============================================================ */
window.SF = window.SF || {};
(function (SF) {
  'use strict';
  var U = SF.util;

  var LEVEL_NAME = { 1: '入门', 2: '进阶', 3: '挑战' };

  var STOP = {};
  ('a an the and or but if of to in on at for from by with as is are was were be been being this that these ' +
   'those it its they them their we our you your he she his her i me my not no more most much many some any ' +
   'all each other such than then there here what which who whom whose when where why how can could may might ' +
   'must shall should will would do does did done have has had having about after before over under up down out ' +
   'into through during between among because so very also only just even still well like one two three four five ' +
   'six seven eight nine ten s t don didn doesn isn aren wasn weren won ll ve re d m').split(' ')
    .forEach(function (w) { if (w) STOP[w] = 1; });

  var _byId = null;
  var _override = null;
  var _common = null;
  function list() {
    if (_override) return _override;
    return (typeof window !== 'undefined' && Array.isArray(window.SF_READING)) ? window.SF_READING : [];
  }
  function meta() { return (typeof window !== 'undefined' && window.SF_READING_META) || {}; }
  function all() { return list(); }
  function ready() { return list().length > 0; }
  function byId(id) {
    if (!_byId) {
      _byId = {};
      list().forEach(function (a) { _byId[a.i] = a; });
    }
    return _byId[id] || null;
  }
  function levelName(l) { return LEVEL_NAME[l] || ('等级 ' + l); }

  function paragraphs(article) {
    return String(article.text || '').split('\n').filter(function (p) { return p.trim(); });
  }

  /** 切成 [ {t:'w', v:'word'} | {t:'x', v:' 标点/空格 '} ]，供前端逐词渲染 */
  function tokens(text) {
    var out = [];
    var re = /([A-Za-z][A-Za-z'\-]*)|([^A-Za-z]+)/g;
    var m;
    while ((m = re.exec(text)) !== null) {
      if (m[1]) out.push({ t: 'w', v: m[1] });
      else if (m[2]) out.push({ t: 'x', v: m[2] });
    }
    return out;
  }

  function norm(w) { return String(w).toLowerCase().replace(/[^a-z'\-]/g, ''); }

  /** 70 份卷子里出现频率最高的 3000 个词形（data/common-words.js） */
  function commonSet() {
    if (_common) return _common;
    var arr = (typeof window !== 'undefined' && Array.isArray(window.SF_COMMON)) ? window.SF_COMMON : [];
    var s = {};
    for (var i = 0; i < arr.length; i++) s[arr[i]] = 1;
    _common = s;
    return s;
  }

  function forms(w) {
    var base = norm(w), out = [base];
    var rules = [['ies', 'y'], ['ied', 'y'], ['ing', ''], ['ed', ''], ['es', ''], ['s', '']];
    for (var i = 0; i < rules.length; i++) {
      var suf = rules[i][0];
      if (base.length > suf.length + 2 && base.slice(-suf.length) === suf) {
        var stem = base.slice(0, -suf.length) + rules[i][1];
        out.push(stem);
        if (stem.length > 3 && stem.slice(-1) === stem.slice(-2, -1)) out.push(stem.slice(0, -1));
      }
    }
    return out;
  }

  /** 卷面常用词：高三基本认识，不算生词 */
  function isCommon(w) {
    var s = commonSet();
    var fs = forms(w);
    for (var i = 0; i < fs.length; i++) if (s[fs[i]]) return true;
    return false;
  }

  /** 统计每篇文章的词频与大小写信息，用于识别专有名词 */
  function analyze(article) {
    if (article.__an) return article.__an;
    var counts = {}, lowerSeen = {}, capSeen = {};
    tokens(String(article.text || '').replace(/\n/g, ' ')).forEach(function (tk, idx) {
      if (tk.t !== 'w') return;
      var low = norm(tk.v);
      if (!low) return;
      counts[low] = (counts[low] || 0) + 1;
      if (tk.v[0] === tk.v[0].toUpperCase() && tk.v.slice(1) !== tk.v.slice(1).toUpperCase()) {
        capSeen[low] = (capSeen[low] || 0) + 1;
      } else if (tk.v === tk.v.toLowerCase()) {
        lowerSeen[low] = (lowerSeen[low] || 0) + 1;
      }
    });
    var an = { counts: counts, lowerSeen: lowerSeen, capSeen: capSeen };
    article.__an = an;
    return an;
  }

  /** 是否是"值得查"的实词（过滤功能词、专有名词、缩写） */
  function isContentWord(low, article) {
    if (low.length < 3) return false;
    if (STOP[low]) return false;
    var an = analyze(article);
    var cap = an.capSeen[low] || 0;
    var lower = an.lowerSeen[low] || 0;
    if (cap > 0 && lower === 0) return false;   // 只以大写出现 → 人名地名
    return true;
  }

  /** 单篇覆盖率与生词表 */
  function coverage(article) {
    var an = analyze(article);
    var total = 0, known = 0, unknownMap = {};
    Object.keys(an.counts).forEach(function (low) {
      if (!isContentWord(low, article)) return;
      var n = an.counts[low];
      total += n;
      var hit = SF.vocab.lookup(low);
      if (hit || isCommon(low)) known += n;
      else unknownMap[low] = (unknownMap[low] || 0) + n;
    });
    var unknowns = Object.keys(unknownMap).map(function (w) {
      return { w: w, n: unknownMap[w] };
    }).sort(function (a, b) { return b.n - a.n || a.w.localeCompare(b.w); });

    return {
      words: total,
      known: known,
      unknownCount: unknowns.length,
      rate: total ? known / total : 0,
      unknowns: unknowns
    };
  }

  function sentences(text) {
    // 卷子里常见 "ISMIR).\u201cWe" 这种丢空格、括号夹在中间的排版。
    // 做法：在"句末标点 + 任意右括号/引号 + 后面紧跟大写字母"处插入分隔符，再按分隔符切。
    var SEP = '\u0001';
    var t = String(text || '').replace(/\n/g, ' ');
    t = t.replace(/([.!?])([)\]"'"\u201c\u201d]*)\s*(?=[A-Z])/g, '$1$2' + SEP);
    return t.split(SEP)
      .map(function (x) { return x.trim(); })
      .filter(function (x) { return x.split(/\s+/).length >= 4; });
  }

  /** 结构提示：用正则识别常见高级/复杂结构，给出中文提示 */
  function hints(sentence) {
    var s = String(sentence);
    var out = [];
    if (/\b(which|who|whom|whose)\b/i.test(s)) out.push('含定语从句（which / who…）');
    if (/\bthat\b/i.test(s) && /^\s*(it|It)\b/.test(s) === false && /\bthat\b/i.test(s)) {
      if (/\b(it|It)\s+(is|was)\b[^.]*\bthat\b/.test(s)) out.push('强调句 It is … that …');
      else out.push('可能有名词性/定语从句（that）');
    }
    if (/\bwith\b[^.]{0,40}\b(a|an|the|his|her|their|its)\b[^.]{0,30}\b(-?ing|ed|done)\b/i.test(s) ||
        /\bwith\s+\w+\s+\w+ing\b/i.test(s)) out.push('with 复合结构');
    if (/^\s*(?:\w+ing|Being|Having|To)\b[^.]*,/.test(s)) out.push('句首非谓语作状语');
    if (/\b(not only|never|only|hardly|seldom)\b[^.]{0,30}\b(did|do|does|is|was|were|had|have|has|can|could|will|would)\b/i.test(s))
      out.push('倒装结构');
    if (/,.*,/.test(s) && s.split(',').length >= 3) out.push('插入语 / 多重修饰');
    if (/\b(although|though|while|whereas|unless|as long as|even if)\b/i.test(s)) out.push('让步/条件状语从句');
    if (/\b(if|whether)\b/i.test(s)) out.push('条件/宾语从句（if / whether）');
    if (/\b(not|no|never)\b/i.test(s) && /\b(but|until)\b/i.test(s)) out.push('否定 + 转折，注意逻辑');
    if (out.length === 0) out.push('结构较平直，重点看主干主谓宾');
    return out;
  }

  /** 长难句：按词数排序取前 n 句，附结构提示 */
  function hardSentences(article, n) {
    var ss = sentences(article.text);
    var scored = ss.map(function (s) {
      return { text: s, words: s.split(/\s+/).length, hints: hints(s) };
    }).filter(function (x) { return x.words >= 14; })
      .sort(function (a, b) { return b.words - a.words; });
    return scored.slice(0, n || 3);
  }

  /* ---------- 精读进度 ---------- */
  function progressMap() {
    var s = SF.store.state;
    if (!s.readArticles) s.readArticles = {};
    return s.readArticles;
  }
  function isRead(id) { return !!progressMap()[id]; }
  function markRead(id) {
    var rec = progressMap()[id] || { at: 0, times: 0 };
    rec.at = Date.now();
    rec.times = (rec.times || 0) + 1;
    SF.store.state.readArticles[id] = rec;
    SF.store.save();
    SF.store.touchStreak(U.today());
    return rec;
  }
  function readStats() {
    var m = progressMap();
    return { read: Object.keys(m).length, total: list().length };
  }
  function listByLevel(lv) {
    return list().filter(function (a) { return !lv || a.lv === lv; });
  }

  SF.reading = {
    ready: ready, meta: meta, all: all, byId: byId, levelName: levelName,
    paragraphs: paragraphs, tokens: tokens, coverage: coverage,
    sentences: sentences, hints: hints, hardSentences: hardSentences,
    isRead: isRead, markRead: markRead, readStats: readStats, listByLevel: listByLevel,
    isCommon: isCommon,
    __setList: function (arr) { _override = Array.isArray(arr) ? arr : null; _byId = null; return list(); }
  };
})(window.SF);
