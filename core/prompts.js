/* ============================================================
   core/prompts.js — 生成提示词框架（本项目的核心资产之一）

   设计要点：
   1. 严格 JSON schema + 明确负面清单，让模型"没有发挥空间地"产出合规结构。
   2. ★ 把内置种子题当作 few-shot 范例注入 —— 这是压住"AI 生成风格漂移"
      这个最大风险的关键：范例直接锚定分层逻辑、trap 写法、中文题干语感。
   3. 带上"已出过的中文题干"清单，避免重复出题。
   ============================================================ */
window.SF = window.SF || {};
(function (SF) {
  'use strict';

  var GRAMMAR_DICT = [
    '宾语从句', '定语从句', '非限制性定语从句', '状语从句', '目的状语从句', '结果状语从句',
    '让步状语从句', '名词性从句', '主语从句', '表语从句', '同位语从句',
    '非谓语作状语', '非谓语作定语', '非谓语作主语', 'with 复合结构', '独立主格',
    '强调句', '倒装句', '虚拟语气', '被动语态', '时态（完成时）', '时态（过去进行）',
    '情态动词', '介词短语', 'there be 句型', '词性转换', '高级词汇替换'
  ];

  var LEVEL_LABELS = {
    1: '合格·语法正确意思完整',
    2: '良好·结构多样用词准确',
    3: '优秀·高级句式阅卷加分'
  };

  var SYSTEM = [
    '你是中国高中英语教研员，专门为高中生编写「中文思路 → 优质英文句子」的翻译训练题。',
    '',
    '【输出格式】只输出一个 JSON 对象本身：不要解释文字，不要 markdown 代码围栏。',
    '{"items":[ {题目1}, {题目2} ]}',
    '',
    '【每道题的字段】',
    '{',
    '  "cn": "中文题干。必须像高中生心里冒出来的那句话，口语化、有真实校园或生活语境，12~45 字，禁止翻译腔。",',
    '  "topics": ["校园生活"],',
    '  "difficulty": 3,',
    '  "difficultyWhy": "为什么是这个难度（结构 / 词汇 / 陷阱），一句话。",',
    '  "hint": "中文思路拆解：先搭什么主干、再补什么修饰。绝对不能出现完整英文句子。",',
    '  "keyPhrases": [{"en":"fix a regular time for","zh":"把……的时间固定下来"}],',
    '  "scaffold": ["I\'m writing to suggest that ...","... so that ..."],',
    '  "levels": [',
    '    {"level":1,"label":"' + LEVEL_LABELS[1] + '","structure":"宾语从句 + so that 目的状语从句","versions":["英文句子"]},',
    '    {"level":2,"label":"' + LEVEL_LABELS[2] + '","structure":"非限制性定语从句","versions":["英文句子","英文句子"]},',
    '    {"level":3,"label":"' + LEVEL_LABELS[3] + '","structure":"with 复合结构","versions":["英文句子"]}',
    '  ],',
    '  "grammarPoints": ["目的状语从句"],',
    '  "traps": [{"zh":"效率更高","bad":"more efficient","good":"study more efficiently","why":"用中文讲清为什么错"}],',
    '  "upgrade": [{"basic":"very good","better":"rewarding"}]',
    '}',
    '',
    '【硬性规则：违反任何一条这道题就作废】',
    '1. levels 必须恰好 3 个；三层的 structure 必须互不相同 —— 不许只是同义改写堆砌，必须句式结构真的变了。',
    '2. L3 必须真正写出高级句式，且只能从这些里选：非谓语作状语、with 复合结构、独立主格、强调句（It is/was ... that/who）、倒装（Never / Not only / Only then / Hardly ... 置句首）、名词性从句、虚拟语气、非限制性定语从句。',
    '3. 英文句子里绝对不能出现中文标点和汉字（，。；：！？、（）《》）。ASCII 撇号 \' 和引号 " 是合法英文排版，要正常使用（mother\'s、don\'t、"I\'m sorry," he said）。',
    '4. 词汇必须控制在高考 3500 词以内，禁止生僻词、禁止堆砌难词。',
    '5. 每句英文 8~45 词；首字母大写；结尾有标点。',
    '6. traps 的 bad 与 good 必须真的不同，并写出学生真会犯的错（词性错误、搭配错误、时态错误、中式思维直译）。',
    '7. upgrade 的 basic 必须是明显低级的表达（very / really / good / bad / 简单动词），better 给更高级且地道的替代。',
    '8. 每道题的中文题干必须不同，且不得与本条消息里列出的"已出过的中文题干"重复。',
    '9. grammarPoints 只能从给定字典里选；recipeKey 由程序填写，你不用写。',
    '',
    '【语法点字典】' + GRAMMAR_DICT.join(' / ')
  ].join('\n');

  /** 去掉生产字段，只留模型需要模仿的内容字段 */
  function compact(it) {
    return {
      cn: it.cn,
      topics: it.topics,
      difficulty: it.difficulty,
      difficultyWhy: it.difficultyWhy,
      hint: it.hint,
      keyPhrases: it.keyPhrases,
      scaffold: it.scaffold,
      levels: (it.levels || []).map(function (L) {
        return { level: L.level, label: L.label, structure: L.structure, versions: L.versions };
      }),
      grammarPoints: it.grammarPoints,
      traps: it.traps,
      upgrade: it.upgrade
    };
  }

  function seedBank() {
    var b = (SF.app && SF.app.bank && SF.app.bank.length) ? SF.app.bank : (window.SF_BANK || []);
    return b.filter(function (it) { return it && it.source === 'seed'; });
  }

  /** 精选 few-shot 范例：同轨道优先，最多 2 条（一条完整、一条精简） */
  function pickExamples(track, n) {
    var seeds = seedBank().filter(function (it) { return it.track === track; });
    if (!seeds.length) seeds = seedBank();
    seeds.sort(function (a, b) { return (a.difficulty || 0) - (b.difficulty || 0); });
    var picked = [];
    // 取一道中等难度 + 一道较难的，覆盖两个层次
    var mid = seeds.filter(function (x) { return x.difficulty === 3; })[0] || seeds[0];
    var hard = seeds.filter(function (x) { return x.difficulty >= 4; })[0] || seeds[seeds.length - 1];
    [mid, hard].forEach(function (x) {
      if (x && picked.indexOf(x) < 0) picked.push(x);
    });
    return picked.slice(0, n || 2);
  }

  /**
   * 组装一次批量生成请求。
   * @param {object} recipe {track, scene, grammarPoint, difficulty, count}
   * @param {object} opt    {avoidCn:[], examples:2, extraRules:''}
   * @returns {{system:string, user:string}}
   */
  function buildBatch(recipe, opt) {
    opt = opt || {};
    var r = recipe || {};
    var count = Math.max(1, Math.min(8, r.count || 5));

    var lines = [];
    lines.push('请按上面的规则，出 ' + count + ' 道题。');
    lines.push('');
    lines.push('【本次出题配方】');
    lines.push('- 类型：' + r.track);
    lines.push('- 具体场景：' + r.scene);
    lines.push('- 目标难度：' + r.difficulty + ' 星（1=最简单，5=最难）');
    if (r.grammarPoint) lines.push('- 希望重点练的语法点：' + r.grammarPoint + '（每道题请围绕它设计，并写进 grammarPoints）');
    lines.push('');
    lines.push('【本批要求】');
    lines.push('- 这 ' + count + ' 道题的中文题干必须彼此不同，且难度都贴近 ' + r.difficulty + ' 星。');
    lines.push('- 场景是「' + r.scene + '」，要写成这个场景里真正会用到的功能句，不要 $count 道都是同一种功能（例如全是开头句）。'.replace('$count', count));
    lines.push('- 难度分布：至少一半必须是 ' + r.difficulty + ' 星，其余可在相邻星级浮动。');

    var avoid = (opt.avoidCn || []).filter(Boolean).slice(0, 80);
    if (avoid.length) {
      lines.push('');
      lines.push('【已出过的中文题干，绝对不能重复】');
      avoid.forEach(function (c, i) { lines.push((i + 1) + '. ' + c); });
    }

    var examples = pickExamples(r.track, opt.examples == null ? 2 : opt.examples);
    if (examples.length) {
      lines.push('');
      lines.push('【风格范例：请严格模仿这个结构、颗粒度和中文语感，但内容必须全新】');
      examples.forEach(function (ex, i) {
        lines.push('范例 ' + (i + 1) + '：');
        lines.push(JSON.stringify(compact(ex), null, 1));
      });
    }

    if (opt.extraRules) {
      lines.push('');
      lines.push('【额外要求】');
      lines.push(opt.extraRules);
    }

    lines.push('');
    lines.push('现在只输出 JSON：{"items":[ ... ]}');

    return { system: SYSTEM, user: lines.join('\n') };
  }

  /**
   * 校验失败后的重试提示词：把具体错误回喂给模型，要求只重写不合格的题。
   */
  function buildRepair(recipe, failed) {
    var lines = [];
    lines.push('你上一次生成的题目有 ' + failed.length + ' 道不符合硬性规则，请重写这些题。');
    lines.push('');
    failed.forEach(function (f, i) {
      lines.push('--- 第 ' + (i + 1) + ' 道（中文题干：' + (f.cn || '(缺)') + '）---');
      lines.push('问题：');
      f.errors.slice(0, 6).forEach(function (e) { lines.push('  · ' + e); });
      if (f.raw) lines.push('原题 JSON：' + JSON.stringify(compact(f.raw)));
    });
    lines.push('');
    lines.push('请针对上面每一道题给出修正版，仍然按同样的 JSON 结构输出 {"items":[...]}，');
    lines.push('数量与上面一致，顺序一致。特别注意：L3 必须真正写出高级句式；三层 structure 必须互不相同；');
    lines.push('英文里不能有中文标点或汉字。');
    return { system: SYSTEM, user: lines.join('\n') };
  }

  SF.prompts = {
    SYSTEM: SYSTEM,
    GRAMMAR_DICT: GRAMMAR_DICT,
    LEVEL_LABELS: LEVEL_LABELS,
    compact: compact,
    pickExamples: pickExamples,
    buildBatch: buildBatch,
    buildRepair: buildRepair
  };
})(window.SF);
