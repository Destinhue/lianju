// sentence-forge 种子库 · 高级句式专项（14 题 / 7 场景 × 2）
// 数据契约：docs/DATA_SPEC.md v1（冻结版）
// 设计意图：同一句中文思路，用越来越高级的句式说 —— 练的是句式选择能力。
window.SF_BANK = window.SF_BANK || [];
window.SF_BANK.push(
  {
    id: "SENT-NONFIN-0001",
    track: "高级句式",
    scene: "非谓语状语",
    topics: ["旅行", "自然"],
    cn: "站在山顶往下看，我才发现整个小镇都盖着雪。",
    difficulty: 3,
    difficultyWhy: "三个动作同属一个主语，要把前两个压成句首的现在分词短语，还要判断分词与主语的主动关系，属于非谓语作状语的入门易错题。",
    hint: "这题练的是非谓语作状语，用它可以把站在山顶往下看这一串动作压成一个句首短语，让主句直接落到发现上，句子立刻紧起来。先写主干：我发现整个小镇盖着雪；再把站、往下看改成句首的 -ing 短语，注意这个动作必须是主语发出的。",
    keyPhrases: [
      { en: "stand on the top of the hill", zh: "站在山顶" },
      { en: "look down", zh: "往下看" },
      { en: "be covered with snow", zh: "被雪覆盖" }
    ],
    scaffold: ["Standing ... and looking ..., I found that ...", "When I ..., I found that ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "when 时间状语从句 + 宾语从句",
        versions: [
          "When I stood on the top of the hill and looked down, I found that the whole town was covered with snow."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句 + 时间状语从句",
        versions: [
          "The whole town lay under a blanket of snow, which I only realized when I stood on the top of the hill and looked down."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "现在分词作状语（句首）+ 宾语从句",
        versions: [
          "Standing on the top of the hill and looking down, I found that the whole town was covered with snow.",
          "Standing on the top of the hill and looking down, I saw the whole town lying under a blanket of snow."
        ]
      }
    ],
    grammarPoints: ["非谓语作状语", "宾语从句", "被动语态"],
    traps: [
      {
        zh: "站在山顶往下看",
        bad: "Standing on the top of the hill, the whole town was covered with snow.",
        good: "Standing on the top of the hill, I found the whole town covered with snow.",
        why: "分词作状语时，它的逻辑主语必须和主句主语一致。句首的 standing 是人的动作，主句主语就不能换成小镇，否则就成了悬垂分词。"
      },
      {
        zh: "盖着雪",
        bad: "the whole town was covered by snow",
        good: "the whole town was covered with snow",
        why: "be covered with 表示表面覆盖的状态，是描写雪景最自然的搭配；be covered by 强调被什么盖住的被动动作，用在这里不地道。"
      }
    ],
    upgrade: [
      { basic: "very surprised", better: "amazed" },
      { basic: "a lot of snow", better: "a thick blanket of snow" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/非谓语状语/非谓语作状语/3"
  },
  {
    id: "SENT-NONFIN-0002",
    track: "高级句式",
    scene: "非谓语状语",
    topics: ["校园生活", "情感"],
    cn: "被同学们的话深深打动，他终于决定留下来把比赛比完。",
    difficulty: 5,
    difficultyWhy: "难点在主动还是被动的判断：他被打动要用过去分词，句首又要让分词紧贴主句主语；还牵涉 decide to do 的固定搭配和平行结构，综合难度高。",
    hint: "这题练的是非谓语作状语里的过去分词。被打动对主语来说是被动的，所以句首要用 -ed 形式，而不是 -ing；主句直接落到决定上。先写主干：他决定留下来把比赛比完；再把被同学们的话打动压成句首的过去分词短语。",
    keyPhrases: [
      { en: "be moved by", zh: "被……打动" },
      { en: "decide to stay", zh: "决定留下来" },
      { en: "finish the match", zh: "把比赛比完" }
    ],
    scaffold: ["Touched by ..., he decided to ...", "Because he was ..., he decided to ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "because 原因状语从句 + 不定式作宾语",
        versions: [
          "Because he was deeply moved by his classmates' words, he finally decided to stay and finish the match."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句 + make sb do sth",
        versions: [
          "His classmates' words, which moved him deeply, made him decide to stay and finish the match."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "过去分词作状语（句首）+ 宾语从句",
        versions: [
          "Touched deeply by what his classmates said, he finally decided to stay and finish the match.",
          "Moved by what his classmates said, he finally made up his mind to stay and finish the match."
        ]
      }
    ],
    grammarPoints: ["非谓语作状语", "非限制性定语从句", "宾语从句"],
    traps: [
      {
        zh: "被同学们的话深深打动",
        bad: "Moving deeply by his classmates' words, he decided to stay.",
        good: "Moved by his classmates' words, he decided to stay.",
        why: "他是被感动的，和 move 之间是被动关系，要用过去分词 moved；用 moving 就变成他在感动别人，逻辑正好反了。"
      },
      {
        zh: "决定留下来把比赛比完",
        bad: "decide staying and finish the match",
        good: "decide to stay and finish the match",
        why: "decide 后面只能接不定式 to do，不能接动名词；and 两边也要同为动词原形，保持结构平行。"
      }
    ],
    upgrade: [
      { basic: "very moved", better: "deeply touched" },
      { basic: "decided", better: "made up his mind" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/非谓语状语/非谓语作状语/5"
  },
  {
    id: "SENT-WITH-0001",
    track: "高级句式",
    scene: "with 复合结构",
    topics: ["校园生活", "学习"],
    cn: "作业都写完了，她终于能安心看会儿小说了。",
    difficulty: 3,
    difficultyWhy: "要判断作业与 finish 的被动关系，还要记住 with 后面接宾语加分词而不是完整句子，是 with 复合结构最常见的两个坑。",
    hint: "这题练的是 with 复合结构：with 加宾语加过去分词。作业是被写完的，所以后面跟 finished 或 done，绝不能跟一个完整句子。先写主干：她终于能安心看小说了；再把作业写完了塞进 with 短语当背景。",
    keyPhrases: [
      { en: "finish all the homework", zh: "把作业全写完" },
      { en: "settle down to read", zh: "安心读起来" },
      { en: "in peace", zh: "安安静静地" }
    ],
    scaffold: ["With ... finished, she could ...", "After she had finished ..., she could ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（so）+ 情态动词 could",
        versions: [
          "She finished all her homework, so she could finally enjoy reading a novel."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "after 时间状语从句 + 过去完成时",
        versions: [
          "After she had finished all her homework, she could finally settle down to read a novel."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "with 复合结构（with + 宾语 + 过去分词）+ 情态动词",
        versions: [
          "With all her homework finished, she could finally settle down to read a novel.",
          "With her homework finished, she could finally read her novel in peace."
        ]
      }
    ],
    grammarPoints: ["with 复合结构", "时态（完成时）", "状语从句"],
    traps: [
      {
        zh: "作业都写完了",
        bad: "With all her homework was finished, she could read a novel.",
        good: "With all her homework finished, she could read a novel.",
        why: "with 复合结构后面只能跟宾语加补语，补语可以是分词、形容词或介词短语，不能跟一个完整的句子，was 必须去掉。"
      },
      {
        zh: "作业被写完",
        bad: "With all her homework finishing, she could read a novel.",
        good: "With all her homework finished, she could read a novel.",
        why: "作业不会主动去 finish，它只能被完成，所以补语要用过去分词 finished 表示被动完成；用 finishing 就等于说作业在自己写自己。"
      }
    ],
    upgrade: [
      { basic: "very tired", better: "exhausted" },
      { basic: "write my homework", better: "get my homework done" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/with 复合结构/with 复合结构/3"
  },
  {
    id: "SENT-WITH-0002",
    track: "高级句式",
    scene: "with 复合结构",
    topics: ["学习", "家庭"],
    cn: "灯还亮着，他趴在桌上睡着了，书还摊在手里。",
    difficulty: 4,
    difficultyWhy: "要把两处背景（灯亮、书摊）同时挂到 with 后面，一个用现在分词、一个用介词短语，还要避免在 with 后面写出谓语动词，综合性强。",
    hint: "这题练的是 with 复合结构，它最擅长把背景打包挂在主句上，主句只留一个核心动作他睡着了。先写主干：他趴在桌上睡着了；再用 with 加宾语加现在分词或介词短语补出灯和书这两个背景。灯是自己亮着的，所以用 burning。",
    keyPhrases: [
      { en: "the light is still on", zh: "灯还亮着" },
      { en: "fall asleep at one's desk", zh: "趴在桌上睡着" },
      { en: "an open book lying in front of sb", zh: "一本打开的书摊在某人面前" }
    ],
    scaffold: ["With ... still burning and ... in front of him, he fell asleep.", "He fell asleep at his desk, with ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（and）+ while 时间状语从句",
        versions: [
          "The light was still on and he fell asleep at his desk while an open book lay in front of him."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句 + as 时间状语从句",
        versions: [
          "The light, which was still burning, shone on the open book in front of him as he slept at his desk."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "with 复合结构（with + 宾语 + 现在分词 + 介词短语）",
        versions: [
          "With the light still burning and an open book in front of him, he fell asleep at his desk.",
          "He fell asleep at his desk, with the light still burning and an open book lying in front of him."
        ]
      }
    ],
    grammarPoints: ["with 复合结构", "非限制性定语从句", "状语从句"],
    traps: [
      {
        zh: "书还摊在他面前",
        bad: "with an open book lay in front of him",
        good: "with an open book lying in front of him",
        why: "with 后面没有第二个谓语的位置，lay 这类动词必须变成非谓语 lying，否则一个句子里出现两个谓语。"
      },
      {
        zh: "灯还亮着",
        bad: "with the light is on",
        good: "with the light still on",
        why: "with 后面是宾语加补语的结构，不能塞进 be 动词；on 是副词，可以直接作补语，前面加 still 表示还。"
      }
    ],
    upgrade: [
      { basic: "very tired", better: "exhausted" },
      { basic: "fall asleep", better: "fall into a deep sleep" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/with 复合结构/with 复合结构/4"
  },
  {
    id: "SENT-ABSOLUTE-0001",
    track: "高级句式",
    scene: "独立主格",
    topics: ["校园生活", "运动"],
    cn: "天渐渐黑下来，孩子们还在操场上跑个不停。",
    difficulty: 4,
    difficultyWhy: "独立主格自带主语，和主句主语不同，还要避免写成逗号粘连；同时谓语单复数容易被前面的 night 干扰，是隐性失分点。",
    hint: "这题练的是独立主格：把天黑了里面的 night 这个主语直接留下，动词变成 falling，前面不加 with、也不加 be 动词，就得到一个自带主语的状语。先写主干：孩子们还在操场上跑；再把天黑压成句首的独立主格。",
    keyPhrases: [
      { en: "it is getting dark", zh: "天渐渐黑了" },
      { en: "run on the playground", zh: "在操场上跑" },
      { en: "laugh and shout", zh: "又笑又喊" }
    ],
    scaffold: ["Night falling, ...", "As ..., ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（and）+ 过去进行时",
        versions: [
          "It was getting dark, and the children were still running on the playground."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "as 时间状语从句 + 现在分词作伴随状语",
        versions: [
          "As darkness fell, the children were still running on the playground, laughing and shouting."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "独立主格（名词 + 现在分词）+ 现在分词作伴随状语",
        versions: [
          "Night falling, the children were still running on the playground, laughing and shouting.",
          "The sun having set, the children were still running about on the playground."
        ]
      }
    ],
    grammarPoints: ["独立主格", "非谓语作状语", "状语从句"],
    traps: [
      {
        zh: "天渐渐黑下来",
        bad: "Night was falling, the children were still running on the playground.",
        good: "Night falling, the children were still running on the playground.",
        why: "两个完整句子之间只用逗号连接是逗号粘连。要么把第一个谓语改成非谓语 falling 变成独立主格，要么用 and 把两句并列起来。"
      },
      {
        zh: "孩子们还在操场上跑",
        bad: "Night falling, the children was still running on the playground.",
        good: "Night falling, the children were still running on the playground.",
        why: "独立主格只是状语，不是句子的主语；真正的主语是 the children，谓语必须跟着用复数 were，不能被前面的 night 带跑。"
      }
    ],
    upgrade: [
      { basic: "very dark", better: "growing dark" },
      { basic: "run", better: "dash about" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/独立主格/独立主格/4"
  },
  {
    id: "SENT-ABSOLUTE-0002",
    track: "高级句式",
    scene: "独立主格",
    topics: ["校园生活", "运动"],
    cn: "因为天气太糟，运动会只好推迟到下周。",
    difficulty: 3,
    difficultyWhy: "结构本身只有名词加 being 加形容词这一条公式，但学生容易在独立主格前再套 because，也容易漏掉运动会的被动语态。",
    hint: "这题练的是独立主格，用来说明原因。把天气太糟里面的 the weather 保留下来，动词 was 变成 being，前面不要加 with 也不要加 because，就得到一个自带主语的状语。先写主干：运动会只好推迟到下周。",
    keyPhrases: [
      { en: "the weather being too bad", zh: "天气太糟" },
      { en: "be put off until next week", zh: "被推迟到下周" },
      { en: "the sports meeting", zh: "运动会" }
    ],
    scaffold: ["The weather being too bad, ...", "Because ..., the sports meeting ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "because 原因状语从句 + 被动语态",
        versions: [
          "Because the weather was too bad, the sports meeting had to be put off until next week."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句 + force sb to do sth",
        versions: [
          "The weather was too bad, which forced us to put off the sports meeting until next week."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "独立主格（名词 + being + 形容词）+ 被动语态",
        versions: [
          "The weather being too bad, the sports meeting had to be put off until next week.",
          "It being such bad weather, the sports meeting had to be put off until next week."
        ]
      }
    ],
    grammarPoints: ["独立主格", "非限制性定语从句", "被动语态"],
    traps: [
      {
        zh: "因为天气太糟",
        bad: "Because the weather being too bad, the sports meeting had to be put off.",
        good: "The weather being too bad, the sports meeting had to be put off.",
        why: "独立主格本身就表示原因，不能再套 because；because 后面必须接完整句子，两者只能选一个。"
      },
      {
        zh: "运动会推迟",
        bad: "the sports meeting had to put off until next week",
        good: "the sports meeting had to be put off until next week",
        why: "运动会是被推迟的，要用被动 be put off；put off 是及物短语，后面没有宾语时不能保持主动形式。"
      }
    ],
    upgrade: [
      { basic: "very bad", better: "terrible" },
      { basic: "put off", better: "postpone" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/独立主格/独立主格/3"
  },
  {
    id: "SENT-EMPHASIS-0001",
    track: "高级句式",
    scene: "强调句",
    topics: ["成长", "学习"],
    cn: "正是因为那次失败，我才决定重新开始的。",
    difficulty: 3,
    difficultyWhy: "强调句公式固定，但学生常把连接词写成 which，也容易在 make 后面多写一个 to，属于会背公式却拿不到分的中等题。",
    hint: "这题练的是强调句，专门用来把正是……的那口气说出来。公式是 It is 或 It was 加被强调部分加 that 加句子其余部分；这里要强调那次失败，所以把它放在 It was 后面，后面照抄原来的句子。先写平铺版：那次失败让我决定重新开始。",
    keyPhrases: [
      { en: "start all over again", zh: "重新开始" },
      { en: "that failure", zh: "那次失败" },
      { en: "make sb do sth", zh: "使某人做某事" }
    ],
    scaffold: ["It was ... that ...", "What ... was ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "介词短语作原因状语 + 不定式作宾语",
        versions: [
          "Because of that failure, I decided to start all over again."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "主语从句 + 表语",
        versions: [
          "What made me decide to start all over again was that failure."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句（It was ... that ...）+ make sb do sth",
        versions: [
          "It was that failure that made me decide to start all over again.",
          "It was that failure that finally drove me to start all over again."
        ]
      }
    ],
    grammarPoints: ["强调句", "主语从句"],
    traps: [
      {
        zh: "正是那次失败",
        bad: "It was that failure which made me decide to start all over again.",
        good: "It was that failure that made me decide to start all over again.",
        why: "强调句的连接词一律用 that，只有强调人作主语时才可以用 who；这里用 which 是把它当成定语从句了。"
      },
      {
        zh: "让我决定重新开始",
        bad: "It was that failure that made me to decide to start all over again.",
        good: "It was that failure that made me decide to start all over again.",
        why: "make 后面接宾语补足语要用动词原形，即 make sb do sth，不能加 to。"
      }
    ],
    upgrade: [
      { basic: "very sad", better: "discouraged" },
      { basic: "failure", better: "heavy blow" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/强调句/强调句/3"
  },
  {
    id: "SENT-EMPHASIS-0002",
    track: "高级句式",
    scene: "强调句",
    topics: ["成长", "情感"],
    cn: "就是在那个下大雨的晚上，我学会了什么叫坚持。",
    difficulty: 5,
    difficultyWhy: "要强调时间状语，连接词只能用 that 而不能用 when；句子里再套一个 what 引导的宾语从句，时态还要跟原句一致，三重难点叠加。",
    hint: "这题练的是强调句强调时间状语。公式是 It was 加时间状语加 that 加句子其余部分，连接词只能用 that，不能用 when。先写平铺版：在那个下大雨的晚上，我慢慢明白了什么叫坚持。",
    keyPhrases: [
      { en: "come to understand", zh: "慢慢明白" },
      { en: "on that rainy night", zh: "在那个下大雨的晚上" },
      { en: "what persistence means", zh: "什么叫坚持" }
    ],
    scaffold: ["It was on that rainy night that ...", "On that rainy night, ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "介词短语前置 + 宾语从句",
        versions: [
          "On that rainy night, I learned what persistence really means."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "定语从句（关系副词 when）+ 宾语从句",
        versions: [
          "That rainy night was the time when I came to understand what persistence means."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句（强调时间状语 It was ... that ...）+ 宾语从句",
        versions: [
          "It was on that rainy night that I came to understand what persistence really means.",
          "It was on that rainy night that I finally understood the true meaning of persistence."
        ]
      }
    ],
    grammarPoints: ["强调句", "宾语从句", "定语从句"],
    traps: [
      {
        zh: "就是在那个晚上",
        bad: "It was on that rainy night when I learned what persistence means.",
        good: "It was on that rainy night that I learned what persistence means.",
        why: "强调句的连接词只能用 that。看到 on that night 就想用 when，是受定语从句思维影响，这里并不是定语从句。"
      },
      {
        zh: "强调过去发生的事",
        bad: "It is on that rainy night that I learned what persistence means.",
        good: "It was on that rainy night that I learned what persistence means.",
        why: "强调句里的 be 动词要和原句时态一致。原句讲的是过去的事，必须用 It was，用 It is 就把时间搞乱了。"
      }
    ],
    upgrade: [
      { basic: "very important", better: "what really counts" },
      { basic: "learn", better: "come to understand" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/强调句/强调句/5"
  },
  {
    id: "SENT-INVERSION-0001",
    track: "高级句式",
    scene: "倒装",
    topics: ["学习", "成长"],
    cn: "只有自己真正试过，我才明白这有多难。",
    difficulty: 3,
    difficultyWhy: "公式清晰但极易漏做：only 加状语从句提到句首后主句必须部分倒装，还要记得 did 之后动词回原形，属于一学就会一写就错的题型。",
    hint: "这题练的是 only 加状语前置的部分倒装：only 开头的状语提到句首后，主句要倒过来，把助动词 did 提到主语前面，实义动词回到原形。先写正常语序：我是自己试过之后才明白的；再把 only after 那个从句挪到句首，然后倒装主句。",
    keyPhrases: [
      { en: "try it myself", zh: "自己试过" },
      { en: "how difficult it was", zh: "这有多难" },
      { en: "only after ... did I understand", zh: "直到……我才明白" }
    ],
    scaffold: ["Only after ... did I ...", "It was only after ... that I ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "after 时间状语从句 + 宾语从句",
        versions: [
          "After I tried it myself, I understood how difficult it was."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "强调句（It was only after ... that ...）",
        versions: [
          "It was only after I tried it myself that I understood how difficult it really was."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "only + 状语从句句首（部分倒装）",
        versions: [
          "Only after I tried it myself did I understand how difficult it was.",
          "Only when I tried it myself did I realize how hard it really was."
        ]
      }
    ],
    grammarPoints: ["倒装句", "状语从句", "宾语从句"],
    traps: [
      {
        zh: "只有自己试过我才明白",
        bad: "Only after I tried it myself I understood how difficult it was.",
        good: "Only after I tried it myself did I understand how difficult it was.",
        why: "only 加状语放在句首，主句必须部分倒装，把助动词 did 提到主语前面；只把 only 提前却不倒装是最典型的失分点。"
      },
      {
        zh: "我才明白",
        bad: "did I understood how difficult it was",
        good: "did I understand how difficult it was",
        why: "用了助动词 did 之后，实义动词必须回到原形 understand，一个句子里不能出现两处时态标记。"
      }
    ],
    upgrade: [
      { basic: "very hard", better: "far from easy" },
      { basic: "know", better: "realize" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/倒装/倒装句/3"
  },
  {
    id: "SENT-INVERSION-0002",
    track: "高级句式",
    scene: "倒装",
    topics: ["校园生活", "友谊"],
    cn: "他不仅学习好，还特别爱帮同学。",
    difficulty: 5,
    difficultyWhy: "not only 前置后前半句倒装、后半句不倒装，两条规则方向相反；还要处理 does 后动词原形、be 动词提前等细节，是倒装里最容易写乱的句型。",
    hint: "这题练的是 not only 前置的倒装：not only 提到句首后，紧跟着的那个分句要部分倒装，but 后面的分句用正常语序，而且 also 通常放在主语后面。先写平铺版：他不仅学习好，而且乐于帮同学；再把 not only 挪到句首倒装前半句。",
    keyPhrases: [
      { en: "do well in one's studies", zh: "学习好" },
      { en: "be ready to help others", zh: "乐于帮助别人" },
      { en: "not only ... but also ...", zh: "不仅……而且……" }
    ],
    scaffold: ["Not only does ..., but ... also ...", "He not only ... but also ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "简单句 + and 并列谓语",
        versions: [
          "He does well in his studies and is always ready to help his classmates."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "not only ... but also 并列（正常语序）",
        versions: [
          "He not only does well in his studies but also takes great pleasure in helping his classmates."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "not only 句首部分倒装 + but 分句正常语序",
        versions: [
          "Not only does he do well in his studies, but he is also always ready to help his classmates.",
          "Not only is he a top student, but he also takes delight in helping others."
        ]
      }
    ],
    grammarPoints: ["倒装句", "介词短语"],
    traps: [
      {
        zh: "他不仅学习好",
        bad: "Not only he does well in his studies, but he is also ready to help.",
        good: "Not only does he do well in his studies, but he is also ready to help.",
        why: "not only 位于句首时，它所在的分句要部分倒装，助动词 does 必须放到主语前面，动词回到原形 do。"
      },
      {
        zh: "而且他也乐于助人",
        bad: "but also he is always ready to help his classmates",
        good: "but he is also always ready to help his classmates",
        why: "not only 引起倒装时，后半句不倒装，正常语序是 but 加主语再加 also；写成 but also he is 是把并列连词当成了句首状语，语序全错。"
      }
    ],
    upgrade: [
      { basic: "very good", better: "outstanding" },
      { basic: "like helping", better: "take pleasure in helping" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/倒装/倒装句/5"
  },
  {
    id: "SENT-CLAUSE-0001",
    track: "高级句式",
    scene: "名词性从句",
    topics: ["校园生活", "友谊"],
    cn: "我最难忘的，是全班一起熬夜做板报的那一晚。",
    difficulty: 3,
    difficultyWhy: "要把最难忘的换成 what 引导的主语从句，还要注意 what 在从句里充当宾语、主句谓语用单数，属于名词性从句的基础易错题。",
    hint: "这题练的是名词性从句里的主语从句：把我最难忘的变成一个 what 开头的主语从句，后面用 is 接真正要说的内容。先找主干：难忘的是那一晚；再把我最难忘的改写成 what 加主语加谓语的形式。",
    keyPhrases: [
      { en: "stay up to make the class bulletin board", zh: "熬夜做板报" },
      { en: "what I remember most clearly", zh: "我最难忘的" },
      { en: "the night when ...", zh: "……的那一晚" }
    ],
    scaffold: ["What ... is the night when ...", "I will never forget the night when ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "简单句 + 定语从句（关系副词 when）",
        versions: [
          "I will never forget the night when our class stayed up to make the class bulletin board."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "动名词作主语（非谓语作主语）+ 定语从句",
        versions: [
          "Staying up with my classmates to make the class bulletin board is something I will never forget."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "主语从句（名词性从句）+ 定语从句",
        versions: [
          "What I remember most clearly is the night when our whole class stayed up to make the class bulletin board.",
          "What I can never forget is that night when we stayed up together to make the class bulletin board."
        ]
      }
    ],
    grammarPoints: ["名词性从句", "主语从句", "定语从句"],
    traps: [
      {
        zh: "我最难忘的",
        bad: "That I remember most clearly is the night when our class stayed up.",
        good: "What I remember most clearly is the night when our class stayed up.",
        why: "主语从句里表示什么的事物要用 what，它同时充当从句里 remember 的宾语；用 that 从句就缺了宾语，意思也变成那件事。"
      },
      {
        zh: "我最难忘的是那一晚",
        bad: "What I remember most clearly are the night when our class stayed up.",
        good: "What I remember most clearly is the night when our class stayed up.",
        why: "what 引导的主语从句作主语时，谓语通常用单数 is；不要因为后面说的是好几个人的事就改成 are。"
      }
    ],
    upgrade: [
      { basic: "very moving", better: "unforgettable" },
      { basic: "make the board", better: "design the class bulletin board" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/名词性从句/名词性从句/3"
  },
  {
    id: "SENT-CLAUSE-0002",
    track: "高级句式",
    scene: "名词性从句",
    topics: ["校园生活", "情感"],
    cn: "我们班拿了第一，这个消息让所有人都跳了起来。",
    difficulty: 4,
    difficultyWhy: "要判断从句意思完整从而用 that 引导同位语从句，还要把它塞进 what 引导的主语从句后面，两个名词性从句嵌套，容易写成定语从句。",
    hint: "这题练的是名词性从句里的同位语从句：消息的内容由 that 从句解释，从句本身意思完整、不缺成分，所以只能用 that。先把消息让所有人跳起来立成主干，再补上我们班拿了第一这件事。",
    keyPhrases: [
      { en: "win first prize", zh: "拿了第一" },
      { en: "jump with joy", zh: "高兴得跳起来" },
      { en: "the news that ...", zh: "……的消息" }
    ],
    scaffold: ["What ... was the news that ...", "The news that ... made ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（and）+ 简单句",
        versions: [
          "Our class won first prize, and everyone jumped with joy."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句 + make sb do sth",
        versions: [
          "Our class had won first prize, which made everyone jump with joy."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "主语从句 + 同位语从句（名词性从句）",
        versions: [
          "What made everyone jump with joy was the news that our class had won first prize.",
          "What excited the whole class was the news that our class had taken first place."
        ]
      }
    ],
    grammarPoints: ["名词性从句", "主语从句", "同位语从句"],
    traps: [
      {
        zh: "我们班拿了第一这个消息",
        bad: "The news which our class had won first prize made everyone jump.",
        good: "The news that our class had won first prize made everyone jump.",
        why: "从句意思完整、不缺任何成分，说明它是解释 news 内容的同位语从句，只能用 that 引导；用 which 就会被读成定语从句，意思也说不通。"
      },
      {
        zh: "让所有人都跳了起来",
        bad: "made everyone to jump with joy",
        good: "made everyone jump with joy",
        why: "make 表示使某人做某事时，后面用动词原形作宾语补足语，不能加 to。"
      }
    ],
    upgrade: [
      { basic: "very happy", better: "wild with joy" },
      { basic: "get first", better: "take first place" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/名词性从句/名词性从句/4"
  },
  {
    id: "SENT-SUBJUNCTIVE-0001",
    track: "高级句式",
    scene: "虚拟语气",
    topics: ["成长", "情感"],
    cn: "要是当时听你的，我就不会错过那场比赛了。",
    difficulty: 4,
    difficultyWhy: "与过去事实相反的虚拟要同时管住从句的 had done 和主句的 would have done，任一处漏掉都会变成与现在相反，是虚拟语气的核心易错点。",
    hint: "这题练的是虚拟语气里与过去相反的情况：从句用 had done，主句用 would have done。先定时间，两件事都发生在过去且没有发生；再套公式。如果省略 if，还可以把 had 提到句首变成倒装。",
    keyPhrases: [
      { en: "take one's advice", zh: "听某人的建议" },
      { en: "miss the match", zh: "错过比赛" },
      { en: "if I had done ...", zh: "要是我当初……" }
    ],
    scaffold: ["If I had ..., I would have ...", "Had I ..., I would have ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（so）+ 一般过去时",
        versions: [
          "I didn't take your advice, so I missed the match."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "because 原因状语从句 + 过去完成时",
        versions: [
          "Because I hadn't taken your advice, I missed that match."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "虚拟语气（与过去相反的 if 条件句 + 倒装省略 if）",
        versions: [
          "If I had taken your advice, I would not have missed that match.",
          "Had I taken your advice, I would not have missed that match."
        ]
      }
    ],
    grammarPoints: ["虚拟语气", "时态（完成时）", "状语从句"],
    traps: [
      {
        zh: "要是当时听你的",
        bad: "If I listened to you, I would not have missed that match.",
        good: "If I had listened to you, I would not have missed that match.",
        why: "与过去事实相反，if 从句必须用过去完成时 had done；用 listened 表达的是与现在相反，时间线就错位了。"
      },
      {
        zh: "我就不会错过那场比赛",
        bad: "I would not miss that match.",
        good: "I would not have missed that match.",
        why: "主句要用 would have done，才能表示本来不会错过可实际上已经错过了；would not miss 说的是将来或习惯，意思完全不同。"
      }
    ],
    upgrade: [
      { basic: "very sorry", better: "regret it deeply" },
      { basic: "listen to you", better: "take your advice" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/虚拟语气/虚拟语气/4"
  },
  {
    id: "SENT-SUBJUNCTIVE-0002",
    track: "高级句式",
    scene: "虚拟语气",
    topics: ["校园生活", "成长"],
    cn: "要是我是你，我就先跟老师聊聊。",
    difficulty: 3,
    difficultyWhy: "与现在相反的虚拟只有两条规则：if 从句 be 动词一律用 were，主句用 would 加动词原形；规则少但学生极容易写成 was 和 will。",
    hint: "这题练的是虚拟语气里与现在相反的 if 从句：不管主语是谁，be 动词一律用 were，主句用 would 加动词原形。三层其实在比哪一种说法更有商量的口气，最后再上虚拟。",
    keyPhrases: [
      { en: "have a word with", zh: "跟……聊两句" },
      { en: "if I were you", zh: "要是我是你" },
      { en: "talk to the teacher first", zh: "先跟老师聊聊" }
    ],
    scaffold: ["If I were you, I would ...", "I think you should ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句（should 表建议）",
        versions: [
          "I think you should talk to your teacher first."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "动名词作主语（非谓语作主语）+ 简单句",
        versions: [
          "Talking to your teacher first would be a wise choice."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "虚拟语气（与现在相反的 if 条件句 + 倒装省略 if）",
        versions: [
          "If I were you, I would talk to my teacher first.",
          "Were I you, I would have a word with my teacher first."
        ]
      }
    ],
    grammarPoints: ["虚拟语气", "非谓语作主语", "宾语从句"],
    traps: [
      {
        zh: "要是我是你",
        bad: "If I was you, I would talk to my teacher first.",
        good: "If I were you, I would talk to my teacher first.",
        why: "虚拟语气里 be 动词一律用 were，这是固定用法；was 是真实语气的形式，放在虚拟条件句里就是错误。"
      },
      {
        zh: "我就先跟老师聊聊",
        bad: "If I were you, I will talk to my teacher first.",
        good: "If I were you, I would talk to my teacher first.",
        why: "虚拟语气的主句要用 would 加动词原形，不能用 will；will 表示真实的将来，和虚拟从句不配套。"
      }
    ],
    upgrade: [
      { basic: "very good", better: "wise" },
      { basic: "talk to", better: "have a word with" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/虚拟语气/虚拟语气/3"
  }
);
