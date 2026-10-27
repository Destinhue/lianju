/* ============================================================
   core/vocab.js — 词汇记忆核心（多词库 + 纯函数优先，可被 selftest 断言）

   词库：
     core    核心 1000（data/vocab-1000.js）——阅读高频骨架词
     writing 写作升级 240（data/vocab-writing.js）
     phrase  短语搭配 160（data/vocab-phrase.js）
     idiom   熟词生义 100（data/vocab-idiom2.js）

   词条字段：i=id w=单词 p=音标 k=词性 m=释义 c=搭配 e=例句 z=译文
             l=级别 t=分类 s=★真题已考 d=同词义项数

   记忆排期复用 core/scheduler.js，进度存在 state.wordItems（与句子训练隔离）。
   ============================================================ */
window.SF = window.SF || {};
(function (SF) {
  'use strict';
  var U = SF.util;

  var LEVELS = ['A', 'B', 'C1', 'C2'];
  var LEVEL_LABEL = { A: 'A 级 · 精背', B: 'B 级 · 认得', C1: 'C1 · 熟词生义', C2: 'C2 · 高频派生' };
  var LEVEL_DESC = {
    A: '阅读骨架词，要求会读、会译、会用',
    B: '中频实词，看见能反应出中文即可',
    C1: '熟词的第二个意思，阅读最大的坑',
    C2: '认识词根却认不得变形，靠构词法记'
  };

  /* ---------- 词库定义（惰性读取 window 上的数据，未加载时安全降级） ---------- */
  var BANK_DEF = [
    { id: 'core', name: '核心 1000', short: '核心', desc: '阅读高频骨架词', color: 'var(--brand)',
      get: function () { return (typeof window !== 'undefined' && Array.isArray(window.SF_VOCAB)) ? window.SF_VOCAB : []; } },
    { id: 'writing', name: '写作升级 240', short: '写作', desc: '读后续写与应用文的高分词', color: 'var(--ok)',
      get: function () { return ((window.SF_VOCAB_EXTRA || {}).writing) || []; } },
    { id: 'phrase', name: '短语搭配 160', short: '短语', desc: '动词短语与介词搭配', color: 'var(--warn)',
      get: function () { return ((window.SF_VOCAB_EXTRA || {}).phrase) || []; } },
    { id: 'idiom', name: '熟词生义 100', short: '生义', desc: '熟词的第二个意思', color: 'var(--l3)',
      get: function () { return ((window.SF_VOCAB_EXTRA || {}).idiom) || []; } }
  ];

  var _cache = {};      // bankId -> words
  var _override = null; // 测试注入
  var _lookup = null;   // 全库索引

  function bankId() {
    var b = SF.store.state.settings && SF.store.state.settings.vocabBank;
    for (var i = 0; i < BANK_DEF.length; i++) if (BANK_DEF[i].id === b) return b;
    return 'core';
  }

  function setBank(id) {
    SF.store.state.settings.vocabBank = id;
    SF.store.save();
    _lookup = null;
    return id;
  }

  function wordsOfBank(id) {
    if (id === 'core' && _override) return _override;
    if (_cache[id]) return _cache[id];
    var def = null;
    for (var i = 0; i < BANK_DEF.length; i++) if (BANK_DEF[i].id === id) def = BANK_DEF[i];
    var raw = def ? def.get() : [];
    _cache[id] = Array.isArray(raw) ? raw : [];
    return _cache[id];
  }

  function banks() {
    return BANK_DEF.map(function (b) {
      return { id: b.id, name: b.name, short: b.short, desc: b.desc,
               color: b.color, total: wordsOfBank(b.id).length };
    });
  }

  /** 当前词库 */
  function all() { return wordsOfBank(bankId()); }

  /** 全部词库合并（精读查词用） */
  function allAcross() {
    var out = [];
    BANK_DEF.forEach(function (b) { out = out.concat(wordsOfBank(b.id)); });
    return out;
  }

  function ready() { return wordsOfBank('core').length > 0; }
  function meta() { return (typeof window !== 'undefined' && window.SF_VOCAB_META) || {}; }
  function byId(id) {
    var allw = allAcross();
    for (var i = 0; i < allw.length; i++) if (allw[i].i === id) return allw[i];
    return null;
  }
  function byLevel(l) { return all().filter(function (w) { return w.l === l; }); }
  function topics() {
    var seen = {}, out = [];
    all().forEach(function (w) { if (!seen[w.t]) { seen[w.t] = 1; out.push(w.t); } });
    return out;
  }

  function levelLabel(l) { return LEVEL_LABEL[l] || l; }
  function levelDesc(l) { return LEVEL_DESC[l] || ''; }

  /* ---------- 全库查词（供精读模块使用） ---------- */
  function variants(w) {
    var base = String(w).toLowerCase().replace(/[^a-z'\-]/g, '');
    var out = [base];
    var rules = [['ies', 'y'], ['ied', 'y'], ['ing', ''], ['ed', ''], ['es', ''],
                 ['s', ''], ['ly', ''], ['er', ''], ['est', '']];
    rules.forEach(function (r) {
      var suf = r[0];
      if (base.length > suf.length + 2 && base.slice(-suf.length) === suf) {
        var stem = base.slice(0, -suf.length) + r[1];
        out.push(stem);
        if (stem.length > 3 && stem[stem.length - 1] === stem[stem.length - 2]) {
          out.push(stem.slice(0, -1));
        }
      }
    });
    return out;
  }

  function buildLookup() {
    var idx = {};
    BANK_DEF.forEach(function (b) {
      wordsOfBank(b.id).forEach(function (w) {
        if (!w || !w.w) return;
        var key = String(w.w).toLowerCase();
        if (!idx[key]) idx[key] = { bank: b.id, entry: w };
      });
    });
    _lookup = idx;
    return idx;
  }

  /** 查一个词（含常见词形变化），返回 {bank, entry} 或 null */
  function lookup(word) {
    if (!_lookup) buildLookup();
    var vs = variants(word);
    for (var i = 0; i < vs.length; i++) {
      if (_lookup[vs[i]]) return _lookup[vs[i]];
    }
    return null;
  }

  /** 精读模块调用：把正文里点到的词排进背单词队列（当天到期） */
  function enroll(word) {
    var hit = lookup(word);
    if (!hit) return null;
    if (!wordState(hit.entry.i)) {
      setWordState(hit.entry.i, SF.scheduler.newState(U.today()));
    }
    return hit;
  }

  /* ---------- 进度存取 ---------- */
  function wordState(id) {
    var s = SF.store.state;
    if (!s.wordItems) s.wordItems = {};
    return s.wordItems[id] || null;
  }

  function setWordState(id, st) {
    var s = SF.store.state;
    if (!s.wordItems) s.wordItems = {};
    s.wordItems[id] = st;
    SF.store.save();
    return st;
  }

  function applyResult(id, result, today) {
    var t = today || U.today();
    var st = wordState(id);
    var ns = SF.scheduler.applyResult(st, result, t);
    setWordState(id, ns);
    SF.store.touchStreak(t);
    return ns;
  }

  /* ---------- 队列（按当前词库） ---------- */
  function dueList(today) {
    var t = today || U.today();
    var out = [];
    all().forEach(function (w) {
      var st = wordState(w.i);
      if (!st || st.state !== 'learning') return;
      var od = U.diffDays(st.due, t);
      if (od >= 0) out.push({ word: w, st: st, overdue: od });
    });
    out.sort(function (a, b) {
      if (b.overdue !== a.overdue) return b.overdue - a.overdue;
      return (a.st.updatedAt || 0) - (b.st.updatedAt || 0);
    });
    return out;
  }

  function newWords(limit, levels) {
    var pool = all().filter(function (w) {
      if (levels && levels.length && levels.indexOf(w.l) < 0) return false;
      return !wordState(w.i);
    });
    return limit ? pool.slice(0, limit) : pool;
  }

  function goal() {
    var g = Number(SF.store.state.settings && SF.store.state.settings.wordGoal);
    return g > 0 ? g : 20;
  }

  function setGoal(n) {
    var v = Math.max(5, Math.min(100, Number(n) || 20));
    SF.store.state.settings.wordGoal = v;
    SF.store.save();
    return v;
  }

  function dayQueue(goalCount, today, levels) {
    var g = goalCount || goal();
    var due = dueList(today).map(function (x) { return x.word; });
    if (levels && levels.length) {
      due = due.filter(function (w) { return levels.indexOf(w.l) >= 0; });
    }
    var out = due.slice(0, g);
    if (out.length < g) out = out.concat(newWords(g - out.length, levels));
    return out;
  }

  /* ---------- 选择题干扰项 ---------- */
  function quizOptions(word, n) {
    n = Math.max(2, n || 4);
    var pool = all().filter(function (w) {
      return w.i !== word.i && w.m !== word.m && String(w.m).trim() !== '';
    });
    var same = pool.filter(function (w) { return w.l === word.l; });
    var use = same.length >= n - 1 ? same : pool;

    var shuffled = U.shuffleSeed(use, 'vq-' + word.i);
    var opts = [{ m: word.m, ok: true }];
    for (var i = 0; i < shuffled.length && opts.length < n; i++) {
      var m = shuffled[i].m, dup = false;
      for (var j = 0; j < opts.length; j++) if (opts[j].m === m) { dup = true; break; }
      if (!dup) opts.push({ m: m, ok: false });
    }
    return U.shuffleSeed(opts, 'vo-' + word.i);
  }

  /* ---------- 统计 ---------- */
  function statsFor(words, items) {
    var seen = 0, learning = 0, mastered = 0;
    words.forEach(function (w) {
      var st = items[w.i];
      if (!st) return;
      seen += 1;
      if (st.state === 'mastered') mastered += 1; else learning += 1;
    });
    return { total: words.length, seen: seen, learning: learning,
             mastered: mastered, untouched: words.length - seen };
  }

  function stats() {
    var items = SF.store.state.wordItems || {};
    var cur = all();
    var base = statsFor(cur, items);

    var byLevel = {};
    LEVELS.forEach(function (l) {
      var sub = cur.filter(function (w) { return w.l === l; });
      byLevel[l] = statsFor(sub, items);
    });

    var global = statsFor(allAcross(), items);

    return {
      bank: bankId(),
      total: base.total, seen: base.seen, learning: base.learning,
      mastered: base.mastered, untouched: base.untouched,
      due: dueList(U.today()).length,
      byLevel: byLevel, goal: goal(),
      global: global,
      banks: banks().map(function (b) {
        var st2 = statsFor(wordsOfBank(b.id), items);
        st2.id = b.id; st2.name = b.name; st2.color = b.color;
        return st2;
      })
    };
  }

  /* ---------- 测试钩子 ---------- */
  function __setList(arr) {
    _override = Array.isArray(arr) ? arr : null;
    _cache = {};
    _lookup = null;
    return all();
  }

  SF.vocab = {
    LEVELS: LEVELS,
    levelLabel: levelLabel, levelDesc: levelDesc,
    ready: ready, meta: meta, all: all, allAcross: allAcross, byId: byId,
    byLevel: byLevel, topics: topics,
    bank: bankId, setBank: setBank, banks: banks,
    lookup: lookup, enroll: enroll,
    wordState: wordState, setWordState: setWordState, applyResult: applyResult,
    dueList: dueList, newWords: newWords, dayQueue: dayQueue,
    goal: goal, setGoal: setGoal,
    quizOptions: quizOptions, stats: stats,
    __setList: __setList
  };
})(window.SF);
