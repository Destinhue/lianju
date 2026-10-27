// sentence-forge 种子库 · 高级句式专项 第二批（12 题）
// 数据契约：docs/DATA_SPEC.md v1（冻结版）
// 与 bank-seed-sent.js 互补：补齐 1~2 星入门题与 4~5 星高阶题，
// 覆盖 非谓语完成式 / with 加形容词与介词短语补语 / 独立主格双挂与完成式 /
// 强调 not until / Never 与 so 句首倒装 / 主语从句加同位语从句 / 混合时间虚拟。
window.SF_BANK = window.SF_BANK || [];
window.SF_BANK.push(
  {
    id: "SENT-NONFIN-0003",
    track: "高级句式",
    scene: "非谓语状语",
    topics: ["校园生活", "学习"],
    cn: "看到老师走进教室，我们马上安静下来。",
    difficulty: 1,
    difficultyWhy: "句子短、词汇全是常见词，只要把看到的动作压成句首的 -ing 短语、并让它的逻辑主语与主句主语一致就成立，是非谓语作状语最简单的入门题。",
    hint: "这题练的是非谓语作状语里的现在分词，用它能把看到老师走进教室这一串动作压成一个句首短语，主句只留我们马上安静下来，句子立刻紧起来。先写主干：我们马上安静下来；再把看的动作改成句首的 -ing 形式，注意看见老师的人必须就是主句主语。",
    keyPhrases: [
      { en: "see sb come into the classroom", zh: "看到某人走进教室" },
      { en: "fall silent", zh: "安静下来" },
      { en: "at once", zh: "马上" }
    ],
    scaffold: ["Seeing ..., we ...", "When we saw ..., we ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "when 时间状语从句 + 简单句",
        versions: [
          "When we saw our teacher come into the classroom, we fell silent at once."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（which 指代整个主句）",
        versions: [
          "Our teacher came into the classroom, which made us fall silent at once."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（句首现在分词）",
        versions: [
          "Seeing our teacher come into the classroom, we fell silent at once.",
          "Seeing our teacher walk into the classroom, we kept quiet at once."
        ]
      }
    ],
    grammarPoints: ["非谓语作状语", "状语从句", "非限制性定语从句"],
    traps: [
      {
        zh: "看到老师走进教室",
        bad: "Seeing our teacher come into the classroom, silence fell in the room.",
        good: "Seeing our teacher come into the classroom, we fell silent.",
        why: "分词作状语时它的逻辑主语必须和主句主语一致。看得见老师的只能是人，主句主语就不能换成 silence，否则就成了悬垂分词。"
      },
      {
        zh: "看到老师走进教室",
        bad: "See our teacher come into the classroom, we fell silent.",
        good: "Seeing our teacher come into the classroom, we fell silent.",
        why: "句首状语只能用非谓语形式；用动词原形 see 会让一个句子里出现两个谓语。"
      }
    ],
    upgrade: [
      { basic: "very quiet", better: "silent" },
      { basic: "looked at", better: "caught sight of" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/非谓语状语/非谓语作状语/1"
  },
  {
    id: "SENT-NONFIN-0004",
    track: "高级句式",
    scene: "非谓语状语",
    topics: ["城市生活", "情感"],
    cn: "在城里住了十年，她仍然觉得自己是个外地人。",
    difficulty: 2,
    difficultyWhy: "两个动作共用一个主语，英语要把先发生的那个压成句首的 having done；学生容易漏掉 having 直接用过去分词，把主动写成被动，所以比单纯 -ing 难一档。",
    hint: "这题练的是非谓语作状语里的完成式，用它能把先发生的住十年收进一个句首短语，主句直接落到她仍然觉得自己是外地人上，主次分明。先写主干：她仍然觉得自己是个外地人；再把住十年改成句首的 Having done，注意这个动作是她主动发出的。",
    keyPhrases: [
      { en: "live in the city for ten years", zh: "在城里住十年" },
      { en: "feel like a stranger", zh: "觉得自己是外地人" },
      { en: "Having done ..., sb ...", zh: "做了……之后，某人……" }
    ],
    scaffold: ["Having lived ..., she still ...", "Although she had lived ..., she still ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "although 让步状语从句 + 过去完成时",
        versions: [
          "Although she had lived in the city for ten years, she still felt like a stranger there."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "介词短语作状语（even after + 名词短语）",
        versions: [
          "Even after ten years in the city, she still felt like a stranger there."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（句首现在分词完成式 Having done）",
        versions: [
          "Having lived in the city for ten years, she still felt like a stranger there.",
          "Having spent ten years in the city, she still felt like a stranger there."
        ]
      }
    ],
    grammarPoints: ["非谓语作状语", "状语从句", "介词短语"],
    traps: [
      {
        zh: "在城里住了十年",
        bad: "Lived in the city for ten years, she still felt like a stranger there.",
        good: "Having lived in the city for ten years, she still felt like a stranger there.",
        why: "住这个动作是主语主动做的，而且先于主句发生，要用完成式 having lived；直接用过去分词 lived 会被理解成被动，好像她是被住在城里。"
      },
      {
        zh: "虽然……但是……",
        bad: "Although she had lived in the city for ten years, but she still felt like a stranger.",
        good: "Although she had lived in the city for ten years, she still felt like a stranger.",
        why: "汉语的虽然和但是要成对出现，英语里 although 和 but 只能留一个；两个都写上就多出一个连接词，句子结构被破坏。"
      }
    ],
    upgrade: [
      { basic: "very strange", better: "unfamiliar" },
      { basic: "lived in", better: "settled in" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/非谓语状语/非谓语作状语/2"
  },
  {
    id: "SENT-WITH-0003",
    track: "高级句式",
    scene: "with 复合结构",
    topics: ["天气", "生活"],
    cn: "窗户开着，冷风一直往屋里吹。",
    difficulty: 2,
    difficultyWhy: "结构只有一条规则，with 加宾语加形容词补语，词汇也很常见；难点是分清开着是状态而不是动作，还要守住 with 后面不再出现谓语动词。",
    hint: "这题练的是 with 复合结构，用它能把窗户开着这个背景挂在主句上，主句只留冷风往屋里吹。公式是 with 加宾语加补语，开着是状态，所以补语用形容词 open，注意 with 后面不能出现 was 这样的谓语。",
    keyPhrases: [
      { en: "the window is open", zh: "窗户开着" },
      { en: "cold air", zh: "冷风" },
      { en: "keep pouring into the room", zh: "不停地往屋里灌" }
    ],
    scaffold: ["With ... open, ...", "Because ..., ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（so）+ keep doing 结构",
        versions: [
          "The window was open, so cold air kept coming into the room."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "as 原因状语从句 + 高级动词短语",
        versions: [
          "As the window was open, cold air kept pouring into the room."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "with 复合结构（with + 宾语 + 形容词）",
        versions: [
          "With the window open, cold air kept pouring into the room.",
          "With the window wide open, cold air kept pouring in."
        ]
      }
    ],
    grammarPoints: ["with 复合结构", "状语从句", "介词短语"],
    traps: [
      {
        zh: "窗户开着",
        bad: "With the window was open, cold air kept coming into the room.",
        good: "With the window open, cold air kept coming into the room.",
        why: "with 复合结构后面只能跟宾语加补语，不能跟一个完整的句子，was 必须去掉，只留形容词 open 作补语。"
      },
      {
        zh: "窗户开着",
        bad: "With the window opening, cold air kept coming into the room.",
        good: "With the window open, cold air kept coming into the room.",
        why: "窗户开着是持续的状态，不是正在打开的动作，要用形容词 open 作补语；opening 表示窗户正在被打开，意思就变了。"
      }
    ],
    upgrade: [
      { basic: "very cold", better: "freezing" },
      { basic: "came in", better: "poured in" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/with 复合结构/with 复合结构/2"
  },
  {
    id: "SENT-WITH-0004",
    track: "高级句式",
    scene: "with 复合结构",
    topics: ["校园生活", "心理"],
    cn: "心里惦记着明天的考试，他翻来覆去怎么也睡不着。",
    difficulty: 3,
    difficultyWhy: "要把中文里的惦记转成 with 加宾语加介词短语的静态背景，还要守住 with 后面不出现谓语、主句只留一个核心动作，同时对翻来覆去这种口语化表达要换成地道的英文说法。",
    hint: "这题练的是 with 复合结构里补语用介词短语的写法，用它能把心里惦记着考试这种心理背景挂到主句前面，主句只留他睡不着，读起来更有画面感。先写主干：他睡不着；再用 with 加宾语加 on ... 的短语把惦记考试交代清楚，注意 with 后面不能再出现 was。",
    keyPhrases: [
      { en: "have sth on one's mind", zh: "心里惦记着某事" },
      { en: "lie awake all night", zh: "整夜睡不着" },
      { en: "fall asleep", zh: "睡着" }
    ],
    scaffold: ["With his mind on ..., he ...", "Because he kept thinking about ..., he ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（so）+ keep doing 结构",
        versions: [
          "He kept thinking about tomorrow's exam, so he could not fall asleep."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "定语从句（省略关系代词）+ keep sb awake",
        versions: [
          "The exam he would take the next day kept him awake for a long time."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "with 复合结构（with + 宾语 + 介词短语）",
        versions: [
          "With his mind on tomorrow's exam, he lay awake all night.",
          "With his mind on tomorrow's exam, he could not fall asleep at all."
        ]
      }
    ],
    grammarPoints: ["with 复合结构", "定语从句", "介词短语"],
    traps: [
      {
        zh: "心里惦记着明天的考试",
        bad: "With his mind was on tomorrow's exam, he lay awake all night.",
        good: "With his mind on tomorrow's exam, he lay awake all night.",
        why: "with 后面是宾语加补语的结构，不是从句，所以不能再有谓语 was；on tomorrow's exam 本身就是补语。"
      },
      {
        zh: "心里惦记着考试，他睡不着",
        bad: "His mind was on tomorrow's exam, he lay awake all night.",
        good: "With his mind on tomorrow's exam, he lay awake all night.",
        why: "逗号不能连接两个完整的句子，这是逗号粘连；把前一句改成 with 复合结构，前因后果立刻有了主次。"
      }
    ],
    upgrade: [
      { basic: "very worried", better: "anxious" },
      { basic: "thought about it a lot", better: "had it on his mind" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/with 复合结构/with 复合结构/3"
  },
  {
    id: "SENT-ABSOLUTE-0003",
    track: "高级句式",
    scene: "独立主格",
    topics: ["校园生活", "动作"],
    cn: "铃声一响，学生们就冲出了教室。",
    difficulty: 2,
    difficultyWhy: "公式只有名词加现在分词一条，词汇都常见；但学生容易把整句写成两个谓语用逗号连起来，或者把自带主语的 ringing 误当成主句谓语。",
    hint: "这题练的是独立主格，用它能把铃声一响这个背景压成一个自带主语的短语挂在句首，主句只留学生们冲出教室，句子更有节奏。先写主干：学生们冲出了教室；再把铃声一响里的 the bell 保留下来，动词变成非谓语，前面不加 with。",
    keyPhrases: [
      { en: "the bell ringing", zh: "铃声响起" },
      { en: "rush out of the classroom", zh: "冲出教室" },
      { en: "at the sound of the bell", zh: "听到铃声" }
    ],
    scaffold: ["The bell ringing, ...", "As soon as the bell rang, ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "as soon as 时间状语从句 + 简单句",
        versions: [
          "As soon as the bell rang, the students rushed out of the classroom."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "介词短语作状语（at the sound of）",
        versions: [
          "At the sound of the bell, the students rushed out of the classroom."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "独立主格（名词 + 现在分词）",
        versions: [
          "The bell ringing, the students rushed out of the classroom.",
          "The bell having rung, the students rushed out of the classroom."
        ]
      }
    ],
    grammarPoints: ["独立主格", "非谓语作状语", "状语从句"],
    traps: [
      {
        zh: "铃声一响",
        bad: "The bell rang, the students rushed out of the classroom.",
        good: "The bell ringing, the students rushed out of the classroom.",
        why: "两个完整的句子不能只用逗号连接。把其中一个谓语改成非谓语 ringing，第一部分就变成独立主格，句子才有主次。"
      },
      {
        zh: "铃声一响，学生们就冲出了教室",
        bad: "The bell ringing, so the students rushed out of the classroom.",
        good: "The bell ringing, the students rushed out of the classroom.",
        why: "独立主格本身已经是状语，表示时间或原因，不能再加 so 引出主句；一个句子里只能有一套主谓结构。"
      }
    ],
    upgrade: [
      { basic: "very fast", better: "in a flash" },
      { basic: "went out", better: "rushed out" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/独立主格/独立主格/2"
  },
  {
    id: "SENT-ABSOLUTE-0004",
    track: "高级句式",
    scene: "独立主格",
    topics: ["自然", "生活"],
    cn: "雨停了，太阳也出来了，街上很快热闹起来。",
    difficulty: 4,
    difficultyWhy: "要同时挂两个独立主格，其中一个先发生还得用完成式 having stopped，另一个用现在分词 coming out；再叠上主谓一致的干扰，属于独立主格的高阶用法。",
    hint: "这题练的是两个独立主格并列，用它能把雨停和太阳出来两个背景并排挂在句首，主句只留街上热闹起来，画面感更强。先写主干：街上很快热闹起来；再把雨先用完成式、太阳出来用现在分词，各自带着自己的主语放到句首。",
    keyPhrases: [
      { en: "the rain having stopped", zh: "雨已经停了" },
      { en: "the sun coming out", zh: "太阳出来了" },
      { en: "come to life", zh: "热闹起来" }
    ],
    scaffold: ["The rain having stopped and the sun coming out, ...", "After the rain stopped, ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（and + so）+ 简单句",
        versions: [
          "The rain stopped and the sun came out, so the streets soon became busy again."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "with 复合结构（with + 宾语 + 副词补语）",
        versions: [
          "With the rain over and the sun out, the streets soon came to life."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "独立主格（名词 + 现在分词完成式 + and + 名词 + 现在分词）",
        versions: [
          "The rain having stopped and the sun coming out, the streets soon came to life.",
          "The rain having stopped, the streets soon came to life."
        ]
      }
    ],
    grammarPoints: ["独立主格", "with 复合结构", "非谓语作状语"],
    traps: [
      {
        zh: "雨停了，太阳也出来了，街上就热闹起来",
        bad: "The rain stopped and the sun came out, the streets soon came to life.",
        good: "The rain having stopped and the sun coming out, the streets soon came to life.",
        why: "三个主谓结构不能只用逗号连成一串。把前两个降为非谓语，也就是把两个独立主格并列起来，句子才有主次。"
      },
      {
        zh: "街上很快热闹起来",
        bad: "The rain having stopped, the streets soon was full of people.",
        good: "The rain having stopped, the streets soon came to life.",
        why: "独立主格只是状语，句子的真正主语是 the streets，谓语要用复数 came；被紧挨着的 the rain 带成单数 was 是独立主格里最典型的失分点。"
      }
    ],
    upgrade: [
      { basic: "very busy", better: "lively" },
      { basic: "became busy", better: "came to life" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/独立主格/独立主格/4"
  },
  {
    id: "SENT-EMPHASIS-0003",
    track: "高级句式",
    scene: "强调句",
    topics: ["家庭", "成长"],
    cn: "是妈妈的鼓励让我坚持下来的。",
    difficulty: 1,
    difficultyWhy: "被强调部分只有几个词，公式固定，词汇也简单；只要连接词写对、be 动词时态跟原句一致就能拿分，是强调句的入门题。",
    hint: "这题练的是强调句，用它能把正是……的那口气说出来，把功劳落在妈妈的鼓励上。公式是 It was 加被强调部分加 that 加句子其余部分，被强调的放在前面，其余部分照抄原来的句子。先写平铺版：妈妈的鼓励让我坚持下来。",
    keyPhrases: [
      { en: "my mother's encouragement", zh: "妈妈的鼓励" },
      { en: "keep sb going", zh: "让某人坚持下来" },
      { en: "hold on", zh: "坚持住" }
    ],
    scaffold: ["It was ... that ...", "What ... was ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "介词短语作原因状语（because of）",
        versions: [
          "I kept going because of my mother's encouragement."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "主语从句（What 引导）+ 表语",
        versions: [
          "What kept me going was my mother's encouragement."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句（It was ... that ...）",
        versions: [
          "It was my mother's encouragement that kept me going.",
          "It was my mother's encouragement that helped me hold on."
        ]
      }
    ],
    grammarPoints: ["强调句", "主语从句"],
    traps: [
      {
        zh: "是妈妈的鼓励让我坚持下来",
        bad: "It was my mother's encouragement kept me going.",
        good: "It was my mother's encouragement that kept me going.",
        why: "强调句的 that 不能省略；省掉之后 It was 和 kept 两个谓语挤在一起，句子就不成立了。"
      },
      {
        zh: "让我坚持下来",
        bad: "It was my mother's encouragement that made me to keep going.",
        good: "It was my mother's encouragement that made me keep going.",
        why: "make 表示使某人做某事时后面接动词原形，即 make sb do sth，不能加 to。"
      }
    ],
    upgrade: [
      { basic: "very moved", better: "deeply encouraged" },
      { basic: "go on", better: "hold on" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/强调句/强调句/1"
  },
  {
    id: "SENT-EMPHASIS-0004",
    track: "高级句式",
    scene: "强调句",
    topics: ["家庭", "成长"],
    cn: "直到妈妈病倒，我才意识到自己该长大了。",
    difficulty: 3,
    difficultyWhy: "强调 not until 结构要把 not 和 until 一起搬到 It was 后面，连接词只能用 that；句子里再套一个宾语从句，时态也要跟原句保持一致。",
    hint: "这题练的是强调句强调时间，用它能把直到……才这个转折点敲得很响。做法是把 not until 加时间从句整体放到 It was 后面，再用 that 接原来的主句。先写平铺版：妈妈病倒之前我都没意识到自己该长大了。",
    keyPhrases: [
      { en: "fall ill", zh: "病倒" },
      { en: "come to realize", zh: "慢慢意识到" },
      { en: "grow up", zh: "长大" }
    ],
    scaffold: ["It was not until ... that ...", "Only when ... did I ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "not ... until 时间状语从句 + 宾语从句",
        versions: [
          "I did not realize I had to grow up until my mother fell ill."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "倒装句（only when 句首部分倒装）+ 宾语从句",
        versions: [
          "Only when my mother fell ill did I realize I had to grow up."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句（It was not until ... that ...）",
        versions: [
          "It was not until my mother fell ill that I realized I had to grow up.",
          "It was not until my mother fell ill that I came to realize I had to grow up."
        ]
      }
    ],
    grammarPoints: ["强调句", "倒装句", "宾语从句"],
    traps: [
      {
        zh: "直到妈妈病倒",
        bad: "It was until my mother fell ill that I realized I had to grow up.",
        good: "It was not until my mother fell ill that I realized I had to grow up.",
        why: "not until 是一个整体，强调时 not 必须跟着 until 一起放到 It was 后面；漏掉 not 就把直到……才的意思写反了。"
      },
      {
        zh: "我才意识到",
        bad: "Only when my mother fell ill I realized I had to grow up.",
        good: "Only when my mother fell ill did I realize I had to grow up.",
        why: "only 引导的状语从句放到句首后，主句必须部分倒装：助动词 did 提到主语前，实义动词回到原形 realize。"
      }
    ],
    upgrade: [
      { basic: "very worried", better: "anxious" },
      { basic: "I knew", better: "I came to realize" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/强调句/强调句/3"
  },
  {
    id: "SENT-INVERSION-0003",
    track: "高级句式",
    scene: "倒装",
    topics: ["自然", "情感"],
    cn: "她从未见过这么美的日落，一时间竟说不出话来。",
    difficulty: 3,
    difficultyWhy: "否定词 never 提到句首要部分倒装，时态还要在过去完成时与一般过去时之间分配清楚；学生常漏掉助动词，或把 had 后面的动词又写成过去式。",
    hint: "这题练的是否定词开头的部分倒装，用它能把从未见过这种惊讶的语气顶到句首，比平铺的说法更有强调味。先写正常语序：她以前从没见过这么美的日落，所以说不出话；再把 never 挪到句首，助动词提到主语前面，实义动词用过去分词。",
    keyPhrases: [
      { en: "such a beautiful sunset", zh: "这么美的日落" },
      { en: "be speechless", zh: "说不出话来" },
      { en: "for a moment", zh: "一时间" }
    ],
    scaffold: ["Never had she ...", "She had never seen ..., so ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（so）+ 过去完成时",
        versions: [
          "She had never seen such a beautiful sunset before, so she could not say a word."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "定语从句（省略关系代词）+ 非限制性定语从句",
        versions: [
          "It was the most beautiful sunset she had ever seen, which left her speechless."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "倒装句（否定词 Never 句首，部分倒装）",
        versions: [
          "Never had she seen such a beautiful sunset, and she was speechless for a moment.",
          "Never had she seen such a beautiful sunset before."
        ]
      }
    ],
    grammarPoints: ["倒装句", "非限制性定语从句", "时态（完成时）"],
    traps: [
      {
        zh: "她从未见过",
        bad: "Never she had seen such a beautiful sunset.",
        good: "Never had she seen such a beautiful sunset.",
        why: "never 等否定词位于句首时，主句要部分倒装，助动词 had 必须提到主语 she 前面，只把 never 提前却不倒装是最典型的失分点。"
      },
      {
        zh: "她从未见过",
        bad: "Never had she saw such a beautiful sunset.",
        good: "Never had she seen such a beautiful sunset.",
        why: "用了助动词 had 之后，实义动词要用过去分词 seen；再写过去式 saw，一个句子里就等于出现了两处时态标记。"
      }
    ],
    upgrade: [
      { basic: "very beautiful", better: "breathtaking" },
      { basic: "could not speak", better: "was speechless" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/倒装/倒装句/3"
  },
  {
    id: "SENT-INVERSION-0004",
    track: "高级句式",
    scene: "倒装",
    topics: ["校园生活", "学习"],
    cn: "他太专心看书了，连下课铃响了都没听见。",
    difficulty: 4,
    difficultyWhy: "要把 so 加形容词提到句首引起完全倒装，be 动词必须提到主语前，后面还得接 that 结果状语从句；so 与 such 的选择也是常见失分点。",
    hint: "这题练的是 so 加形容词置于句首引起的倒装，用它能把太专心了这个程度推到最前面，比正常语序更有强调味。公式是 so 加形容词加 be 动词加主语加 that 从句。先写正常语序：他太专心看书，所以没听见铃声；再把 so absorbed 提到句首，把 was 挪到主语前面。",
    keyPhrases: [
      { en: "be absorbed in", zh: "专心于" },
      { en: "so ... that ...", zh: "如此……以至于……" },
      { en: "hear the bell ring", zh: "听见铃响" }
    ],
    scaffold: ["So absorbed was he that ...", "He was so absorbed ... that ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "so ... that 结果状语从句（正常语序）",
        versions: [
          "He was so interested in his book that he did not hear the bell."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（which is why）+ 表语从句",
        versions: [
          "He was completely absorbed in his book, which is why he did not hear the bell at all."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "倒装句（so + 形容词句首，完全倒装）+ that 从句",
        versions: [
          "So absorbed was he in his book that he did not hear the bell at all.",
          "So absorbed was he in his book that he did not even hear the bell ring."
        ]
      }
    ],
    grammarPoints: ["倒装句", "结果状语从句", "非限制性定语从句"],
    traps: [
      {
        zh: "他太专心看书了",
        bad: "So absorbed he was in his book that he did not hear the bell.",
        good: "So absorbed was he in his book that he did not hear the bell.",
        why: "so 加形容词放到句首要引起完全倒装，be 动词必须提到主语前面；写成 so absorbed he was 就没有倒装，语法不成立。"
      },
      {
        zh: "太专心了",
        bad: "Such absorbed was he in his book that he did not hear the bell.",
        good: "So absorbed was he in his book that he did not hear the bell.",
        why: "so 后面跟形容词或副词，such 后面跟名词短语，比如 such a good book；absorbed 是形容词，只能用 so。"
      }
    ],
    upgrade: [
      { basic: "very interested in", better: "absorbed in" },
      { basic: "did not hear", better: "missed the sound of" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/倒装/倒装句/4"
  },
  {
    id: "SENT-CLAUSE-0003",
    track: "高级句式",
    scene: "名词性从句",
    topics: ["成长", "励志"],
    cn: "他之所以成功，并不是因为运气好，而是因为他从不放弃。",
    difficulty: 4,
    difficultyWhy: "要把之所以成功压成 what 引导的主语从句，还要同时处理好 the fact 后面的同位语从句和 not ... but 的并列结构，两个名词性从句嵌套，容易写成 because 或 which。",
    hint: "这题练的是名词性从句，用它能把之所以成功变成一个整体当主语，再说清楚原因，句子比平铺的因果句更紧凑。先写主干：让他成功的是从不放弃这件事，而不是运气；再用 the fact 加从句把从不放弃说完整。",
    keyPhrases: [
      { en: "make sb successful", zh: "使某人成功" },
      { en: "the fact that ...", zh: "……这一事实" },
      { en: "give up", zh: "放弃" }
    ],
    scaffold: ["What made him successful was ...", "The reason why ... is that ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "not ... but 并列原因状语从句",
        versions: [
          "He succeeded not because he was lucky, but because he never gave up."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "介词短语并列 + 同位语从句",
        versions: [
          "His success came not from good luck but from the fact that he never gave up."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "名词性从句（主语从句 What ... + 同位语从句）",
        versions: [
          "What made him successful was not good luck but the fact that he never gave up.",
          "What counted most in his success was not good luck but the fact that he never gave up."
        ]
      }
    ],
    grammarPoints: ["名词性从句", "主语从句", "同位语从句"],
    traps: [
      {
        zh: "他之所以成功，是因为他从不放弃",
        bad: "What made him successful was because he never gave up.",
        good: "What made him successful was that he never gave up.",
        why: "主语从句作主语时，后面要用 that 引导表语从句；把中文的因为直接搬成 because，就成了两个原因表达叠在一起。"
      },
      {
        zh: "他从不放弃这一事实",
        bad: "What made him successful was not good luck but the fact which he never gave up.",
        good: "What made him successful was not good luck but the fact that he never gave up.",
        why: "解释 fact 内容的是同位语从句，从句意思完整、不缺成分，只能用 that；用 which 会被读成定语从句，而从句里并没有需要 which 顶替的成分。"
      }
    ],
    upgrade: [
      { basic: "very lucky", better: "fortunate" },
      { basic: "succeed", better: "achieve success" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/名词性从句/名词性从句/4"
  },
  {
    id: "SENT-SUBJUNCTIVE-0003",
    track: "高级句式",
    scene: "虚拟语气",
    topics: ["旅行", "情感"],
    cn: "要是昨天没错过那班车，我现在就在海边了。",
    difficulty: 5,
    difficultyWhy: "这是混合时间的虚拟：条件句与过去事实相反要用 had done，主句与现在事实相反只能用 would 加动词原形，两条时间线同时写对才成立，是虚拟语气里最容易写混的高阶结构。",
    hint: "这题练的是虚拟语气里的混合时间，用它能把本来可以怎样但现在如何这种遗憾一次说清，比单纯陈述因果更有味道。方法是分两半：昨天的事放进 if 从句用 had done，现在的事放进主句用 would 加动词原形，两条时间线各走各的。先写事实版：我昨天错过了那班车，所以现在不在海边。",
    keyPhrases: [
      { en: "miss the bus", zh: "错过班车" },
      { en: "at the seaside", zh: "在海边" },
      { en: "If sb had done ..., sb would do ...", zh: "要是当初……现在就……" }
    ],
    scaffold: ["If I had not ..., I would be ... now.", "Had I not ..., I would be ... now."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "because 原因状语从句 + 一般过去时与一般现在时",
        versions: [
          "Because I missed the bus yesterday, I am not at the seaside now."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（which is why）+ 表语从句",
        versions: [
          "I missed the bus yesterday, which is why I am not at the seaside now."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "虚拟语气（混合时间：从句与过去相反 + 主句与现在相反）",
        versions: [
          "If I had not missed the bus yesterday, I would be at the seaside now.",
          "Had I not missed the bus yesterday, I would be lying on the beach now."
        ]
      }
    ],
    grammarPoints: ["虚拟语气", "非限制性定语从句", "状语从句"],
    traps: [
      {
        zh: "要是昨天没错过那班车",
        bad: "If I did not miss the bus yesterday, I would be at the seaside now.",
        good: "If I had not missed the bus yesterday, I would be at the seaside now.",
        why: "与过去事实相反的条件从句必须用过去完成时 had not missed；用 did not miss 是与现在相反的写法，把昨天的事说成了现在的状态。"
      },
      {
        zh: "我现在就在海边了",
        bad: "If I had not missed the bus yesterday, I would have been at the seaside now.",
        good: "If I had not missed the bus yesterday, I would be at the seaside now.",
        why: "主句说的是现在，要用 would 加动词原形；用 would have been 就变成对过去的虚拟，和句尾的 now 自相矛盾。"
      }
    ],
    upgrade: [
      { basic: "very sad", better: "full of regret" },
      { basic: "get on the bus", better: "make the bus" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "高级句式/虚拟语气/虚拟语气/5"
  }
);
