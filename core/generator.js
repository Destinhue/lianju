/* ============================================================
   core/generator.js — 生成编排：配方 → 调用 → 四道质量闸门 → 落盘

   四道闸门（生成内容绝不未经验证就进题库）：
     ① 结构闸门：JSON 解析 + 必填字段 / 枚举 / levels 数量
     ② 内容闸门：L3 必须含高级句式、三层结构不得重复、无全角标点、
                 词数区间、traps.bad≠good
     ③ 修复重试：把具体错误回喂给模型重写一次
     ④ 去重落盘：contentHash / 中文题干查重后写入本地缓存
   任何一关没过 → 丢弃并记录，绝不让坏数据污染题库。
   ============================================================ */
window.SF = window.SF || {};
(function (SF) {
  'use strict';
  var U = SF.util;

  var BATCH = 5;            // 单次请求生成的题量
  var MAX_ROUNDS = 8;       // ensurePool 最多循环几次，防止无限调用
  var running = false;
  var lastError = null;

  function sceneCode(track, scene) {
    var M = window.SF_META || {};
    var map = M.sceneCode || {};
    return map[scene] || ('GEN' + (track || '').slice(0, 2));
  }

  /* ---------- 覆盖账本：优先补"出得最少"的场景 ---------- */
  function coverage() {
    var st = SF.store.state;
    if (!st.coverage) st.coverage = {};
    return st.coverage;
  }

  function bumpCoverage(track, scene, n) {
    var c = coverage();
    var k = track + '/' + scene;
    c[k] = (c[k] || 0) + n;
    SF.store.save();
  }

  /** 选一个最欠采样的场景（同覆盖率下用日期做确定性轮转，避免总是同一个） */
  function pickRecipe(opt) {
    opt = opt || {};
    var M = window.SF_META || {};
    var scenes = M.scenes || {};
    var c = coverage();
    var cands = [];
    Object.keys(scenes).forEach(function (track) {
      if (opt.track && opt.track !== track) return;
      scenes[track].forEach(function (scene) {
        cands.push({ track: track, scene: scene, n: c[track + '/' + scene] || 0 });
      });
    });
    if (!cands.length) return { track: '应用文', scene: '建议信', difficulty: 3, count: BATCH };

    var min = Math.min.apply(null, cands.map(function (x) { return x.n; }));
    var pool = cands.filter(function (x) { return x.n === min; });
    var idx = Math.floor(U.seedFrom('recipe|' + U.today())() * pool.length) % pool.length;
    var chosen = pool[idx];

    // 难度：围绕设置的中位值浮动，Seed 决定当天倾向
    var diff = opt.difficulty || (2 + Math.floor(U.seedFrom('diff|' + U.today() + chosen.scene)() * 4)); // 2~5
    return {
      track: chosen.track,
      scene: chosen.scene,
      difficulty: U.clamp(diff, 1, 5),
      grammarPoint: opt.grammarPoint || '',
      count: opt.count || BATCH
    };
  }

  /* ---------- 规格化：补齐程序字段 ---------- */
  function normalize(raw, recipe, seq) {
    var it = {};
    for (var k in raw) it[k] = raw[k];
    it.track = recipe.track;
    it.scene = recipe.scene;
    it.variantOf = null;
    it.source = 'api';
    it.id = 'AI-' + sceneCode(recipe.track, recipe.scene) + '-' + String(seq).padStart(4, '0');
    it.recipeKey = recipe.track + '/' + recipe.scene + '/' +
      ((it.grammarPoints && it.grammarPoints[0]) || recipe.grammarPoint || '综合') + '/' + (it.difficulty || recipe.difficulty);
    it.contentHash = U.hash(U.normalizeCn(it.cn || ''));
    it.quality = { validated: false, warnings: [], generatedAt: Date.now() };
    return it;
  }

  /** 已存在的中文题干（种子库 + 缓存），用于避免重复出题 */
  function existingCn(limit) {
    var bank = (SF.app && SF.app.bank) ? SF.app.bank : [];
    return bank.slice(-120).map(function (it) { return it.cn; }).filter(Boolean).slice(0, limit || 60);
  }

  function seenCn() {
    var bank = (SF.app && SF.app.bank) ? SF.app.bank : [];
    var s = {};
    bank.forEach(function (it) {
      if (it && it.cn) s[U.normalizeCn(it.cn)] = true;
      if (it && it.contentHash) s[it.contentHash] = true;
    });
    return s;
  }

  /* ---------- 单批生成 ---------- */
  function generateBatch(recipe, opt) {
    opt = opt || {};
    if (!SF.api.isConfigured()) {
      return Promise.reject(Object.assign(new Error('还没填写 API Key，去「我的 → DeepSeek 生成」里填一下。'), { code: 'no_key' }));
    }

    var prompt = SF.prompts.buildBatch(recipe, { avoidCn: existingCn(60) });
    var stats = { added: [], dropped: [], duplicated: 0, repaired: 0, usage: null };

    return SF.api.chatJSON(prompt.system, prompt.user, { maxTokens: 8000 })
      .then(function (res) {
        stats.usage = res.usage;
        var items = (res.data && (res.data.items || res.data.questions)) || [];
        if (!Array.isArray(items) || !items.length) {
          throw Object.assign(new Error('模型没有返回题目数组'), { code: 'empty' });
        }
        return items.slice(0, recipe.count + 2);
      })
      .then(function (raws) {
        // 闸门 ①②
        var pass = [], fail = [];
        raws.forEach(function (raw, i) {
          var it = normalize(raw, recipe, Date.now() % 9000 + i);
          var v = SF.validator.validateItem(it);
          if (v.ok) pass.push({ it: it, warnings: v.warnings });
          else fail.push({ cn: raw.cn, errors: v.errors, raw: raw, index: i });
        });

        if (!fail.length) return pass;

        // 闸门 ③：把错误回喂，重写一次
        var repair = SF.prompts.buildRepair(recipe, fail);
        return SF.api.chatJSON(repair.system, repair.user, { maxTokens: 8000 })
          .then(function (r2) {
            var items2 = (r2.data && r2.data.items) || [];
            stats.repaired = 0;
            fail.forEach(function (f, i) {
              var raw2 = items2[i];
              if (!raw2) { stats.dropped.push(f); return; }
              var it2 = normalize(raw2, recipe, Date.now() % 9000 + 500 + i);
              var v2 = SF.validator.validateItem(it2);
              if (v2.ok) { pass.push({ it: it2, warnings: v2.warnings }); stats.repaired += 1; }
              else { f.errors = v2.errors; stats.dropped.push(f); }
            });
            return pass;
          })
          .catch(function () {
            // 修复这轮自己失败了，也把原来的失败记为丢弃，绝不放进题库
            fail.forEach(function (f) { stats.dropped.push(f); });
            return pass;
          });
      })
      .then(function (pass) {
        // 闸门 ④：去重后落盘
        var seen = seenCn();
        var fresh = [];
        pass.forEach(function (p) {
          var key = p.it.contentHash;
          var cnKey = U.normalizeCn(p.it.cn);
          if (seen[key] || seen[cnKey]) { stats.duplicated += 1; return; }
          seen[key] = true; seen[cnKey] = true;
          p.it.quality = { validated: true, warnings: p.warnings || [], generatedAt: Date.now() };
          fresh.push(p.it);
        });

        var res = SF.cache.add(fresh);
        stats.added = fresh;
        if (res.quota) stats.quotaWarning = true;

        if (fresh.length) {
          bumpCoverage(recipe.track, recipe.scene, fresh.length);
          if (SF.app && SF.app.registerItems) SF.app.registerItems(fresh);
        }
        return stats;
      });
  }

  /* ---------- 池子够不够 ---------- */
  function availableCount() {
    return (SF.app && SF.app.bank) ? SF.app.bank.length : 0;
  }

  function shouldGenerate(need) {
    var se = SF.store.state.settings;
    if (se.apiEnabled === false) return false;
    if (!SF.api.isConfigured()) return false;
    return availableCount() < need;
  }

  /**
   * 循环生成直到题目数达到 target（或失败/到达轮次上限）。
   * @param {number} target 期望的题库总量
   * @param {function} [onProgress] (info) => void
   */
  function ensurePool(target, onProgress) {
    if (running) {
      return Promise.reject(Object.assign(new Error('已有生成任务在进行中'), { code: 'busy' }));
    }
    running = true;
    lastError = null;
    var added = 0, rounds = 0, droppedAll = [];

    function report(extra) {
      if (onProgress) {
        try {
          onProgress(Object.assign({
            available: availableCount(), target: target, added: added, round: rounds
          }, extra || {}));
        } catch (e) { }
      }
    }

    function step() {
      if (availableCount() >= target) return Promise.resolve();
      if (rounds >= MAX_ROUNDS) return Promise.resolve();
      rounds += 1;
      report({ phase: 'requesting' });
      var recipe = pickRecipe({ count: BATCH });
      return generateBatch(recipe).then(function (st) {
        added += st.added.length;
        droppedAll = droppedAll.concat(st.dropped);
        SF.generator.lastStats = st;
        report({ phase: 'done', lastScene: recipe.scene });
        if (!st.added.length && st.dropped.length) {
          // 这一批全军覆没，继续下一轮（换场景再试）
          return step();
        }
        return step();
      });
    }

    return step()
      .then(function () {
        running = false;
        return { added: added, rounds: rounds, available: availableCount(), dropped: droppedAll };
      })
      .catch(function (e) {
        running = false;
        lastError = e;
        var err = Object.assign(new Error(e.message || '生成失败'), { code: e.code || 'fail', added: added, rounds: rounds });
        throw err;
      });
  }

  /** 离线预热包：在家 WiFi 下预生成 N 题，之后断网也能用 */
  function prefetch(n, onProgress) {
    return ensurePool(availableCount() + (n || 60), onProgress);
  }

  /** 针对某个语法点/场景专项补题 */
  function ensureForFilter(opt, n) {
    var need = n || BATCH;
    var rounds = 0;
    var addedTotal = 0;
    function step() {
      if (addedTotal >= need || rounds >= 4) return Promise.resolve({ added: addedTotal });
      rounds += 1;
      var recipe = {
        track: opt.track || '高级句式',
        scene: opt.scene || '非谓语状语',
        grammarPoint: opt.grammarPoint || '',
        difficulty: opt.difficulty || 4,
        count: Math.min(BATCH, need - addedTotal)
      };
      return generateBatch(recipe).then(function (st) {
        addedTotal += st.added.length;
        return step();
      });
    }
    return step();
  }

  SF.generator = {
    BATCH: BATCH,
    MAX_ROUNDS: MAX_ROUNDS,
    pickRecipe: pickRecipe,
    normalize: normalize,
    generateBatch: generateBatch,
    ensurePool: ensurePool,
    prefetch: prefetch,
    ensureForFilter: ensureForFilter,
    shouldGenerate: shouldGenerate,
    availableCount: availableCount,
    coverage: coverage,
    isRunning: function () { return running; },
    lastError: function () { return lastError; },
    lastStats: null
  };
})(window.SF);
