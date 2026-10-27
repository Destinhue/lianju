/* ============================================================
   core/validator.js — 题目质量校验（纯函数，可被 selftest 断言）

   ★ 这里同时是 API 生成内容的「第二道闸门」：
     生成结果必须先过 validateItem()，失败则重试，再失败就丢弃，
     绝不允许未校验的内容进题库。
   ============================================================ */
window.SF = window.SF || {};
(function (SF) {
  'use strict';
  var U = SF.util;

  var TRACKS = ['应用文', '读后续写', '高级句式'];

  var SCENES = {
    '应用文': ['建议信', '申请信', '邀请信', '感谢信', '道歉信', '求助信',
      '通知', '演讲稿', '倡议书', '投稿', '人物介绍', '图表描述'],
    '读后续写': ['动作描写', '情绪描写', '环境描写', '心理描写', '对话描写', '情节转折'],
    '高级句式': ['非谓语状语', 'with 复合结构', '独立主格', '强调句', '倒装',
      '名词性从句', '虚拟语气']
  };

  var LEVEL_LABELS = {
    1: '合格·语法正确意思完整',
    2: '良好·结构多样用词准确',
    3: '优秀·高级句式阅卷加分'
  };

  var REQUIRED = ['id', 'track', 'scene', 'topics', 'cn', 'difficulty', 'difficultyWhy',
    'hint', 'keyPhrases', 'scaffold', 'levels', 'grammarPoints', 'traps', 'upgrade',
    'variantOf', 'source', 'recipeKey'];

  var CJK_RE = /[\u4e00-\u9fff]/;
  // 只禁「中日韩/全角标点」。注意：弯引号 “”‘’ 与 ASCII 撇号 ' 在英文里都是合法排版，
  // 绝不能一并禁掉 —— 否则 mother's / don't / "..." 直接引语全被误杀。
  var CJK_PUNCT_RE = /[\u3000-\u303f\uff00-\uffef]/;
  var ADVANCED_RE = /./; // 占位，见 detectStructures

  /* ---------- 高级结构探测（L3 必须命中其一） ----------
     注意：这是启发式正则，宁可放宽也不要误杀好句子 ——
     误判为"合格"只损失一点严格性，误杀会直接卡掉正确的教学内容。 */
  var STRUCT_PATTERNS = [
    {
      name: '非谓语作状语',
      re: /(?:^|[.!?;]\s+)(?:Having|Being|Faced|Facing|Seeing|Hearing|Realizing|Knowing|Encouraged|Moved|Inspired|Determined|Surprised|Exhausted|Delighted|Worried|Frightened|Making|Turning|Taking|Standing|Holding|Looking|Not\s+knowing)\b[^.!?]{0,80}?,\s*[A-Za-z]/
    },
    {
      name: '非谓语作状语',
      re: /(?:^|[.!?;]\s+)(?:[A-Z][a-z]+ing|[A-Z][a-z]+ed)\b(?:\s+\w+){0,10}?,\s*(?:I|you|he|she|it|we|they|the|his|her|their|my|our)\b/
    },
    {
      // with + 宾语 + 补足语（分词/形容词/介词短语）
      // 兼容：① 宾语无冠词（with dawn just breaking）② 宾语后有副词（with the light still burning）
      //       ③ 介词短语补足（with your study efficiency in mind）
      name: 'with 复合结构',
      re: /(?:\bwith\s+(?:[\w'-]+\s+){1,5}?[\w'-]{2,}(?:ing|ed)\b)|(?:\bwith\s+(?:his|her|their|its|the|my|your|our|a|an)\s+(?:[\w'-]+\s+){0,3}(?:in|on|at|under|around|over|full|wide|open|closed)\b)/i
    },
    {
      name: '独立主格',
      re: /(?:^|[.!?;]\s+|,\s*)(?:(?:His|Her|Their|Its|The|My|Our|A|An)\s+)?[\w'-]+\s+(?:\w+ing|\w+ed)\b[^.!?]{0,70}?,\s*[A-Za-z]/
    },
    {
      // It is/was ... that/who ...；允许 "not until"（合法强调句），但排除普通句子误命中，
      // 因此限制跨度且不允许中间出现并列/从属连词。
      name: '强调句',
      re: /\bIt\s+(?:is|was)\s+(?!not\b(?!\s+until)|only\b)(?:(?!\b(?:and|but|so|because|although|though)\b)[^.!?]){2,120}?\b(?:that|who)\b/i
    },
    {
      // 否定词/Only 置于句首造成的部分倒装；Not only 必须位于句首才算倒装
      name: '倒装',
      re: /(?:\b(?:Never\s+(?:had|have|did|before|again)|Hardly\s+had|No\s+sooner\s+had|Seldom\s+(?:have|had|did|do)|Little\s+did|Rarely\s+(?:have|had|do|did))|(?:^|[.!?;]\s+)(?:Not\s+only\s+\w+|Only\s+(?:then|when|after|by|in|if))|(?:\bSo\s+\w+\s+(?:was|were|did|had)\s+(?:he|she|it|they))|(?:\bSuch\s+was)\b)/i
    },
    {
      name: '名词性从句',
      re: /(?:^|[.!?;]\s+)(?:What|Whether|However|Whatever|Whoever|Why|How)\b[^.!?]{2,70}?\b(?:is|was|matters|counts|remains|makes|meant)\b/i
    },
    {
      name: '名词性从句',
      re: /(?:^|[.!?;]\s+)That\s+[^.!?]{2,60}?\b(?:is|was|made|surprised|matters|counts|shows)\b/
    },
    {
      // 含不规则过去分词（taken/seen/done...），故不能要求 \w+ed
      name: '虚拟语气',
      re: /\b(?:If\s+(?:I|you|he|she|we|they|it)\s+(?:were|had)\b|If\s+\w+\s+were\s+to\b|were\s+to\s+\w+|Had\s+(?:I|you|he|she|we|they|it)\s+\w+|had\s+\w+[^.!?]{0,40}?,\s*(?:I|you|he|she|we|they|it)\s+would|would\s+rather|It(?:'| i)s\s+(?:high|about)\s+time|Without\s+(?:your|his|her|their|the)\b[^.!?]{0,45}?,\s*\w+\s+would|wish\s+(?:I|you|he|she|we|they)\s+\w+)/i
    },
    {
      name: '非限制性定语从句',
      re: /,\s*(?:which|who)\b/i
    }
  ];

  /** 返回英文句中命中的高级结构名（去重） */
  function detectStructures(en) {
    var hits = [];
    for (var i = 0; i < STRUCT_PATTERNS.length; i++) {
      if (STRUCT_PATTERNS[i].re.test(en) && hits.indexOf(STRUCT_PATTERNS[i].name) < 0) {
        hits.push(STRUCT_PATTERNS[i].name);
      }
    }
    return hits;
  }

  function wordCount(en) {
    return String(en).trim().split(/\s+/).filter(function (w) { return w.length > 0; }).length;
  }

  /**
   * 校验单题。
   * @param {object} item
   * @param {object} [opt] {strict:true 用于 API 生成 / 种子入库}
   * @returns {{ok:boolean, errors:string[], warnings:string[]}}
   */
  function validateItem(item, opt) {
    opt = opt || {};
    var errors = [];
    var warnings = [];

    if (!item || typeof item !== 'object') {
      return { ok: false, errors: ['不是对象'], warnings: [] };
    }

    // 1. 必填字段
    REQUIRED.forEach(function (k) {
      var v = item[k];
      if (k === 'variantOf') {
        // variantOf 允许为 null，但字段必须存在
        if (!Object.prototype.hasOwnProperty.call(item, k)) errors.push('缺字段：' + k);
        return;
      }
      if (v === undefined || v === null || v === '') {
        errors.push('缺字段：' + k);
      } else if (Array.isArray(v) && v.length === 0 && k !== 'traps' && k !== 'upgrade') {
        errors.push('空数组：' + k);
      }
    });

    // 2. 枚举
    if (TRACKS.indexOf(item.track) < 0) errors.push('track 非法：' + item.track);
    if (item.track && SCENES[item.track] && SCENES[item.track].indexOf(item.scene) < 0) {
      errors.push('scene 与 track 不匹配：' + item.scene);
    }
    if (['seed', 'api'].indexOf(item.source) < 0) errors.push('source 非法：' + item.source);

    // 3. 难度
    var d = Number(item.difficulty);
    if (!(d >= 1 && d <= 5) || d !== Math.floor(d)) errors.push('difficulty 必须是 1~5 整数');

    // 4. 中文题干
    var cn = String(item.cn || '');
    if (cn) {
      if (!CJK_RE.test(cn)) errors.push('cn 里没有中文');
      // 题干里出现成串英文单词，多半是写成了英文句
      if (/[a-zA-Z]{3,}(\s+[a-zA-Z]{2,}){2,}/.test(cn)) {
        warnings.push('中文题干里含成串英文，请确认是否应为中文思路');
      }
      var cnLen = U.normalizeCn(cn).length;
      if (cnLen < 8) warnings.push('中文题干过短（' + cnLen + ' 字），可能缺少语境');
      if (cnLen > 60) warnings.push('中文题干偏长（' + cnLen + ' 字）');
    }

    // 5. levels
    var lv = item.levels;
    if (!Array.isArray(lv) || lv.length !== 3) {
      errors.push('levels 必须恰好 3 个（当前 ' + (Array.isArray(lv) ? lv.length : '非数组') + '）');
    } else {
      var structs = [];
      lv.forEach(function (L, i) {
        if (!L || typeof L !== 'object') { errors.push('levels[' + i + '] 不是对象'); return; }
        if (Number(L.level) !== i + 1) errors.push('levels[' + i + '].level 应为 ' + (i + 1));
        if (L.label !== LEVEL_LABELS[i + 1]) warnings.push('levels[' + i + '].label 与规范文案不一致');
        if (!L.structure) errors.push('levels[' + i + '] 缺 structure（必须写明句式结构）');
        else {
          structs.push(String(L.structure).trim());
          if (/[A-Za-z]{3,}/.test(L.structure) === false && !/[\u4e00-\u9fff]/.test(L.structure)) {
            errors.push('levels[' + i + '].structure 无效');
          }
        }
        if (!Array.isArray(L.versions) || L.versions.length === 0) {
          errors.push('levels[' + i + '].versions 为空');
        } else {
          L.versions.forEach(function (en, j) {
            if (typeof en !== 'string' || !en.trim()) { errors.push('levels[' + i + '].versions[' + j + '] 为空'); return; }
            checkEnglish(en, 'levels[' + i + '].versions[' + j + ']', errors, warnings);
          });
        }
      });

      // 三层结构必须互不相同（防止"只是同义改写堆砌"）
      var uniq = {};
      structs.forEach(function (s) { uniq[s] = 1; });
      if (structs.length === 3 && Object.keys(uniq).length < 3) {
        errors.push('三层答案的 structure 重复，必须结构不同（不能只是同义改写）');
      }

      // L3 必须含高级结构
      var l3 = lv[2];
      if (l3 && Array.isArray(l3.versions)) {
        var anyAdvanced = l3.versions.some(function (en) {
          return detectStructures(String(en)).length > 0;
        });
        if (!anyAdvanced) {
          errors.push('L3 未命中任何高级结构（非谓语/with复合/独立主格/强调/倒装/名词性从句/虚拟语气/非限制性定语从句）');
        }
      }
    }

    // 6. traps
    if (Array.isArray(item.traps)) {
      item.traps.forEach(function (t, i) {
        if (!t || !t.bad || !t.good || !t.why) { errors.push('traps[' + i + '] 字段不全（需 zh/bad/good/why）'); return; }
        if (String(t.bad).trim().toLowerCase() === String(t.good).trim().toLowerCase()) {
          errors.push('traps[' + i + '] 的 bad 与 good 相同');
        }
        if (!CJK_RE.test(String(t.why))) warnings.push('traps[' + i + '].why 建议用中文讲解');
      });
    }

    // 7. upgrade
    if (Array.isArray(item.upgrade)) {
      item.upgrade.forEach(function (u, i) {
        if (!u || !u.basic || !u.better) errors.push('upgrade[' + i + '] 缺 basic/better');
      });
    }

    // 8. keyPhrases / scaffold / grammarPoints / topics
    if (Array.isArray(item.keyPhrases)) {
      if (item.keyPhrases.length < 2 || item.keyPhrases.length > 4) {
        warnings.push('keyPhrases 建议 2~4 个（当前 ' + item.keyPhrases.length + '）');
      }
      item.keyPhrases.forEach(function (k, i) {
        if (!k || !k.en || !k.zh) errors.push('keyPhrases[' + i + '] 需同时有 en 和 zh');
      });
    }
    if (Array.isArray(item.topics) && (item.topics.length < 1 || item.topics.length > 3)) {
      warnings.push('topics 建议 1~3 个');
    }
    if (Array.isArray(item.grammarPoints) && item.grammarPoints.length === 0) {
      errors.push('grammarPoints 为空');
    }

    // 9. hint 不得直接给出完整英文答案
    if (item.hint && Array.isArray(item.levels) && item.levels[0] && item.levels[0].versions) {
      var hint = String(item.hint);
      var leaked = item.levels[0].versions.some(function (en) {
        var core = String(en).replace(/[.,!?;:'"]/g, '').toLowerCase();
        return wordCount(core) > 5 && hint.toLowerCase().indexOf(core.slice(0, 40)) >= 0;
      });
      if (leaked) warnings.push('hint 疑似泄露了答案原文');
    }

    // 10. recipeKey 与字段一致性
    if (item.recipeKey && item.track && String(item.recipeKey).indexOf(item.track) !== 0) {
      warnings.push('recipeKey 应以 track 开头');
    }

    return { ok: errors.length === 0, errors: errors, warnings: warnings };
  }

  function checkEnglish(en, where, errors, warnings) {
    if (CJK_RE.test(en)) errors.push(where + ' 英文句里混入了汉字');
    if (CJK_PUNCT_RE.test(en)) errors.push(where + ' 英文句里混入了中文标点');
    var wc = wordCount(en);
    if (wc < 6) errors.push(where + ' 词数过少（' + wc + '）');
    if (wc > 45) warnings.push(where + ' 词数偏多（' + wc + '），单句不建议超过 45 词');
    if (/^[a-z]/.test(String(en).trim())) warnings.push(where + ' 首字母未大写');
    if (!/[.!?]"?$/.test(String(en).trim())) warnings.push(where + ' 结尾缺标点');
  }

  /**
   * 校验整库：id 唯一、中文题干去重、场景/难度覆盖报告
   */
  function validateBank(items) {
    var res = {
      total: 0, ok: 0, failed: [],
      idDup: [], cnDup: [],
      byTrack: {}, byScene: {}, byDifficulty: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      warningsTotal: 0, ids: {}
    };
    var cnSeen = {};
    var ids = {};
    items = items || [];
    res.total = items.length;

    items.forEach(function (it) {
      if (!it || !it.id) { res.failed.push({ id: '(无 id)', errors: ['缺 id'] }); return; }
      if (ids[it.id]) res.idDup.push(it.id);
      ids[it.id] = true;

      var key = U.normalizeCn(it.cn);
      if (cnSeen[key]) res.cnDup.push(it.id + ' ↔ ' + cnSeen[key]);
      else cnSeen[key] = it.id;

      var v = validateItem(it);
      if (v.ok) res.ok += 1;
      else res.failed.push({ id: it.id, errors: v.errors });
      res.warningsTotal += v.warnings.length;

      res.byTrack[it.track] = (res.byTrack[it.track] || 0) + 1;
      res.byScene[it.scene] = (res.byScene[it.scene] || 0) + 1;
      if (res.byDifficulty[it.difficulty] != null) res.byDifficulty[it.difficulty] += 1;
    });

    // 悬空 variantOf
    var dangling = [];
    items.forEach(function (it) {
      if (it && it.variantOf && !ids[it.variantOf]) dangling.push(it.id + ' → ' + it.variantOf);
    });
    res.danglingVariant = dangling;
    res.ids = ids;
    return res;
  }

  SF.validator = {
    TRACKS: TRACKS,
    SCENES: SCENES,
    LEVEL_LABELS: LEVEL_LABELS,
    detectStructures: detectStructures,
    wordCount: wordCount,
    validateItem: validateItem,
    validateBank: validateBank
  };
})(window.SF);
