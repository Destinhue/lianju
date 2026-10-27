/* ============================================================
   data/bank-seed-app.js — 应用文种子库（12 场景 × 1 题）
   契约：docs/DATA_SPEC.md v1
   校验：core/validator.js（L3 必须命中高级结构正则）
   ============================================================ */
window.SF_BANK = window.SF_BANK || [];
window.SF_BANK.push(
  {
    id: "APP-LETTER-0001",
    track: "应用文",
    scene: "建议信",
    topics: ["校园生活", "健康"],
    cn: "你要是每天抽半小时运动，上课就不容易犯困了。",
    difficulty: 3,
    difficultyWhy: "两个分句之间有条件和结果的逻辑，抽时间要用 spend time doing 的搭配，犯困不能直译成形容词；L3 还要求 with 复合结构，属于中高级。",
    hint: "先搭主干：你每天抽半小时运动，结果就是上课不容易犯困。抽时间按固定安排来说，犯困是身体状态，别写成形容词。",
    keyPhrases: [
      { en: "spend half an hour exercising every day", zh: "每天抽半小时运动" },
      { en: "feel sleepy in class", zh: "上课犯困" },
      { en: "stay focused", zh: "保持专注" }
    ],
    scaffold: ["If you ... every day, you will ...", "With your ... arranged ..., you will ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "if 条件状语从句 + 主句（一般将来时）",
        versions: [
          "If you spend half an hour exercising every day, you will not feel sleepy in class."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（现在分词短语置于句首）",
        versions: [
          "Spending half an hour on exercise every day, you will find it much easier to stay focused in class."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "with 复合结构（with + 宾语 + 过去分词）",
        versions: [
          "With your exercise arranged at a fixed time every day, you will not feel sleepy in class."
        ]
      }
    ],
    grammarPoints: ["状语从句", "非谓语作状语", "with 复合结构"],
    traps: [
      {
        zh: "每天抽半小时运动",
        bad: "spend half an hour to exercise every day",
        good: "spend half an hour exercising every day",
        why: "spend time 后面接动名词，这是固定搭配；学生受 take time to do 的影响写成不定式，属于搭配错误。"
      },
      {
        zh: "上课不容易犯困",
        bad: "in class you will not easy feel sleepy",
        good: "you will not easily feel sleepy in class",
        why: "修饰动词 feel 要用副词 easily，形容词 easy 不能作状语；中文的容易是形容词，直译成 easy 就错了。"
      }
    ],
    upgrade: [
      { basic: "feel very sleepy", better: "find it hard to stay focused" },
      { basic: "good for you", better: "pay off in the long run" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/建议信/with 复合结构/3"
  },
  {
    id: "APP-APPLY-0001",
    track: "应用文",
    scene: "申请信",
    topics: ["校园生活", "志愿服务"],
    cn: "我看到你们在招志愿者，我特别想报名。",
    difficulty: 2,
    difficultyWhy: "句型是本场景最常见的开头句，L1 用宾语从句加并列句就能写清；难点只在 apply for 的介词搭配和逗号连句，属于入门偏易。",
    hint: "先搭主干：我看到你们在招志愿者；再接上我特别想报名，两件事用连词连起来，别用逗号硬连。",
    keyPhrases: [
      { en: "look for volunteers", zh: "招募志愿者" },
      { en: "sign up for", zh: "报名参加" },
      { en: "be eager to apply", zh: "很想申请" }
    ],
    scaffold: ["I saw that you ...", "I am eager to ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句 + 并列句",
        versions: [
          "I saw that you are looking for volunteers, and I am eager to sign up."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（现在分词完成式置于句首）",
        versions: [
          "Having read your notice for volunteers, I would like to apply for the position."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句 It is ... that ...",
        versions: [
          "It is the volunteer work you are offering that I am eager to sign up for."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "非谓语作状语", "强调句"],
    traps: [
      {
        zh: "想报名这个志愿工作",
        bad: "want to apply the volunteer work",
        good: "want to apply for the volunteer work",
        why: "apply 表示申请时是不及物动词，必须接介词 for；中文的报名某事是及物说法，直译就会漏掉介词。"
      },
      {
        zh: "我看到你们在招志愿者，我特别想报名",
        bad: "I saw you are looking for volunteers, I want to sign up.",
        good: "I saw that you are looking for volunteers, and I want to sign up.",
        why: "英语不能用逗号连接两个完整的句子，这叫流水句；中文习惯的逗号连句直接搬过去就错，要用连词 or 从句。"
      }
    ],
    upgrade: [
      { basic: "very want to join", better: "am eager to apply for" },
      { basic: "good student", better: "well qualified candidate" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/申请信/强调句/2"
  },
  {
    id: "APP-INVITE-0001",
    track: "应用文",
    scene: "邀请信",
    topics: ["校园生活", "文化交流"],
    cn: "下周六我们学校要办中文节，你能来吗？",
    difficulty: 3,
    difficultyWhy: "要先交代活动的时间和地点，再发出邀请，两件事合并需要从句或非谓语；时间状语前的介词容易多写，L3 还要用非限制性定语从句补充活动意义。",
    hint: "先交代事情：下周六我们学校办中文节；再用一个客气的疑问句邀请对方。别在时间状语前面加介词。",
    keyPhrases: [
      { en: "hold a Chinese Festival", zh: "举办中文节" },
      { en: "next Saturday", zh: "下周六" },
      { en: "learn about Chinese culture", zh: "了解中国文化" }
    ],
    scaffold: ["We are going to hold ... next Saturday.", "Would you like to ...?"],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句 + 宾语从句",
        versions: [
          "Our school is going to hold a Chinese Festival next Saturday, and I wonder if you can come."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "不定式作定语 + 一般疑问句",
        versions: [
          "Would you like to join the Chinese Festival to be held in our school next Saturday?"
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非限制性定语从句（which 补充说明）",
        versions: [
          "Our school is holding a Chinese Festival next Saturday, which I believe will be a great chance for you to learn about Chinese culture."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "非谓语作定语", "非限制性定语从句"],
    traps: [
      {
        zh: "下周六",
        bad: "in next Saturday",
        good: "next Saturday",
        why: "next, last, this 修饰的时间状语前不加介词；中文说在下周六，英语里这个介词是多余的。"
      },
      {
        zh: "你能来吗",
        bad: "I hope you can come truly.",
        good: "I do hope you can make it.",
        why: "英语表强调用助动词 do，不用副词 truly；truly 意思是真实地，含义和位置都不对。"
      }
    ],
    upgrade: [
      { basic: "very interesting", better: "fascinating" },
      { basic: "have a good time", better: "enjoy every minute of it" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/邀请信/非限制性定语从句/3"
  },
  {
    id: "APP-THANKS-0001",
    track: "应用文",
    scene: "感谢信",
    topics: ["校园生活", "学习"],
    cn: "谢谢你上次帮我改作文，我现在写作好多了。",
    difficulty: 1,
    difficultyWhy: "主干就是感谢信的固定句型，词汇都是初中范围，只要注意 progress 不可数和改作文的动词选择即可，属于最基础的一星句。",
    hint: "先搭主干：谢谢你上次帮我改作文；再补结果：我现在写作好多了。进步和更大是两个不同的词，别混。",
    keyPhrases: [
      { en: "help me revise my essay", zh: "帮我改作文" },
      { en: "make great progress", zh: "取得很大进步" },
      { en: "thanks to your help", zh: "多亏你的帮助" }
    ],
    scaffold: ["Thank you for ...", "Thanks to ..., I have ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "感谢固定句型 + 并列句",
        versions: [
          "Thank you for helping me revise my essay last time, and my writing is much better now."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "介词短语作状语 + 现在完成时",
        versions: [
          "Thanks to your help with my essay last time, I have made great progress in writing."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（完成式分词置于句首）",
        versions: [
          "Having helped me revise my essay last time, you have made a real difference to my writing."
        ]
      }
    ],
    grammarPoints: ["时态（完成时）", "介词短语", "非谓语作状语"],
    traps: [
      {
        zh: "我进步很大",
        bad: "I have made very big progress",
        good: "I have made great progress",
        why: "progress 是不可数名词，不能用 very big 修饰，固定搭配是 make great progress；中文的很大直译过去就不地道。"
      },
      {
        zh: "帮我改作文",
        bad: "help me change my essay",
        good: "help me revise my essay",
        why: "change 是换成另一个东西，这里是修改润色的意思，要用 revise 或 polish，属于动词语义搭配不当。"
      }
    ],
    upgrade: [
      { basic: "thank you very much", better: "I really appreciate your help" },
      { basic: "very good", better: "make a real difference" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/感谢信/非谓语作状语/1"
  },
  {
    id: "APP-APOLOGY-0001",
    track: "应用文",
    scene: "道歉信",
    topics: ["校园生活", "人际交往"],
    cn: "真对不起，昨天临时有事，没能去你的生日会。",
    difficulty: 4,
    difficultyWhy: "要把没能去的原因写成与过去事实相反的假设，L3 需要 had done 加 would have done 的虚拟结构；时态和语气双重易错，而且道歉语气要够诚恳，属于四星。",
    hint: "先道歉，再说原因，最后落到结果上。想更高级可以把原因写成与过去事实相反的假设：如果我当时……，我就会……。",
    keyPhrases: [
      { en: "something urgent came up", zh: "临时有急事" },
      { en: "miss your birthday party", zh: "错过你的生日会" },
      { en: "make it to", zh: "赶到、参加成" }
    ],
    scaffold: ["I am terribly sorry that ...", "If I had ..., I would have ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句（形容词后 that 从句）+ 原因状语从句",
        versions: [
          "I am very sorry that I missed your birthday party yesterday because I had something urgent to do."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（which 补充说明）",
        versions: [
          "I feel terribly sorry for missing your birthday party yesterday, which I really wanted to attend."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "虚拟语气（if 引导的与过去事实相反条件句）",
        versions: [
          "If I had planned my time better, I would have been at your birthday party yesterday.",
          "Had it not been for something urgent, I would have been at your birthday party yesterday."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "非限制性定语从句", "虚拟语气"],
    traps: [
      {
        zh: "真对不起",
        bad: "I very sorry.",
        good: "I am terribly sorry.",
        why: "sorry 是形容词，句子必须有系动词 be；中文的真对不起里没有是，学生容易把 am 漏掉。"
      },
      {
        zh: "昨天没能去",
        bad: "I can not go to your party yesterday.",
        good: "I could not make it to your party yesterday.",
        why: "yesterday 是过去时间，情态动词要用过去式 could，can 与过去时间状语冲突；时态不一致是中式作文的高频错。"
      }
    ],
    upgrade: [
      { basic: "very sorry", better: "terribly sorry" },
      { basic: "I was very busy", better: "something urgent came up" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/道歉信/虚拟语气/4"
  },
  {
    id: "APP-HELP-0001",
    track: "应用文",
    scene: "求助信",
    topics: ["校园生活", "学习"],
    cn: "你能给我点建议吗？我的英语听力总是提不上去。",
    difficulty: 3,
    difficultyWhy: "要先把困难说清再提出请求，听力提不上去需要意译成提高听力；L3 用主语从句加表语从句把困难突出，属于中级偏难。",
    hint: "先提出请求：你能给我点建议吗；再补困难：我的英语听力总是提不上去。语序要用陈述语序，别保留疑问语序。",
    keyPhrases: [
      { en: "ask for your advice", zh: "向你请教" },
      { en: "improve my English listening", zh: "提高英语听力" },
      { en: "have trouble with", zh: "在……方面有困难" }
    ],
    scaffold: ["Could you tell me how ...?", "What troubles me most is that ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句（how 引导）+ 一般疑问句",
        versions: [
          "Could you tell me how I can improve my English listening?"
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（现在分词短语）+ 宾语从句",
        versions: [
          "I am writing to ask for your advice, hoping that you can tell me how to improve my English listening."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "名词性从句（主语从句 + 表语从句）",
        versions: [
          "What troubles me most is that I have no idea how to improve my English listening."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "非谓语作状语", "名词性从句"],
    traps: [
      {
        zh: "提高英语听力",
        bad: "raise my English listening",
        good: "improve my English listening",
        why: "提高抽象的能力、水平用 improve；raise 多指把具体的东西举起或提高数量价格，这是中式思维直译提高的典型错误。"
      },
      {
        zh: "你能告诉我怎么提高吗",
        bad: "Can you tell me how can I improve my listening?",
        good: "Could you tell me how I can improve my listening?",
        why: "宾语从句必须用陈述语序，不能保留疑问语序；另外求助信里用 Could you 比 Can you 更客气。"
      }
    ],
    upgrade: [
      { basic: "very poor at listening", better: "have trouble with listening" },
      { basic: "give me some help", better: "offer me some practical advice" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/求助信/名词性从句/3"
  },
  {
    id: "APP-NOTICE-0001",
    track: "应用文",
    scene: "通知",
    topics: ["校园生活", "集体活动"],
    cn: "请同学们周五下午三点到操场集合。",
    difficulty: 2,
    difficultyWhy: "通知句的核心是把时间地点人物交代清楚，句式简单；难点在具体某天下午的介词和祈使句的主语位置，属于二星。",
    hint: "先想清楚要素：谁、几点、哪天、在哪、做什么。通知里常用被动语态，这样更客观，也不用操心祈使句的主语。",
    keyPhrases: [
      { en: "gather on the playground", zh: "到操场集合" },
      { en: "at three on Friday afternoon", zh: "周五下午三点" },
      { en: "be expected to", zh: "被要求、应该" }
    ],
    scaffold: ["All students are asked to ...", "It is ... that ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "被动语态（be asked to do）",
        versions: [
          "All students are asked to gather on the playground at three on Friday afternoon."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "祈使句 + 呼语",
        versions: [
          "Everyone, please gather on the playground at three this Friday afternoon."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句 It is ... that ... + 被动语态",
        versions: [
          "It is at three on Friday afternoon that all students are expected to gather on the playground."
        ]
      }
    ],
    grammarPoints: ["被动语态", "强调句", "介词短语"],
    traps: [
      {
        zh: "在周五下午",
        bad: "in Friday afternoon",
        good: "on Friday afternoon",
        why: "具体某一天的上午、下午要用介词 on；in 只用于泛指的 in the morning 这类说法。"
      },
      {
        zh: "请同学们集合",
        bad: "Please students gather on the playground.",
        good: "All students are asked to gather on the playground.",
        why: "please 后面直接跟动词原形，中间不能插主语；通知里用被动语态更客观，也避免了祈使句主语的问题。"
      }
    ],
    upgrade: [
      { basic: "come to the playground", better: "gather on the playground" },
      { basic: "very important", better: "of great importance" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/通知/被动语态/2"
  },
  {
    id: "APP-SPEECH-0001",
    track: "应用文",
    scene: "演讲稿",
    topics: ["校园生活", "健康"],
    cn: "同学们，让我们一起行动，别让手机偷走我们的时间。",
    difficulty: 4,
    difficultyWhy: "演讲稿结尾要有号召力，语气的强弱全靠句式；别让某物做某事要换成 stop ... from doing，L3 用强调句把方式突出来，属于四星。",
    hint: "先呼告同学，再发出号召：一起行动；最后说清目的：别让手机偷走时间。语气要强，可以用强调句把方式突出来。",
    keyPhrases: [
      { en: "take action together", zh: "一起行动" },
      { en: "stop phones from stealing our time", zh: "别让手机偷走我们的时间" },
      { en: "make a difference", zh: "带来改变" }
    ],
    scaffold: ["Dear classmates, let us ...", "It is by ... that we can ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "祈使句 + so that 目的状语从句",
        versions: [
          "Dear classmates, let us take action together so that phones will not steal our time."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（which 评述）",
        versions: [
          "Let us take action together, which is the only way to stop phones from stealing our time."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句 It is ... that ...（强调方式状语）",
        versions: [
          "It is by taking action together that we can stop phones from stealing our time."
        ]
      }
    ],
    grammarPoints: ["目的状语从句", "非限制性定语从句", "强调句"],
    traps: [
      {
        zh: "别让手机偷走我们的时间",
        bad: "make phones not steal our time",
        good: "stop phones from stealing our time",
        why: "中文的让某物不做某事直译成 make sth not do 很不地道；英语固定用 stop sb from doing sth 表示阻止。"
      },
      {
        zh: "一起行动",
        bad: "take actions together",
        good: "take action together",
        why: "take action 是固定搭配，这里的 action 不可数；加 s 表示多个动作，和采取行动这个整体意思不符。"
      }
    ],
    upgrade: [
      { basic: "very bad for us", better: "harmful to us" },
      { basic: "good idea", better: "a wise choice" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/演讲稿/强调句/4"
  },
  {
    id: "APP-PROPOSAL-0001",
    track: "应用文",
    scene: "倡议书",
    topics: ["环保", "校园生活"],
    cn: "咱们每个人都该为节约用水出点力。",
    difficulty: 4,
    difficultyWhy: "倡议句要写出人人有责的语气，出力必须意译成 do one's part 或 make a contribution；L3 用 Only when 引导的部分倒装来加强号召，属于四星。",
    hint: "先搭主干：每个人都该出点力；再补目的：为了节约用水。想出彩可以把表示只有的连词短语提到句首，让主语和情态动词倒过来。",
    keyPhrases: [
      { en: "do our part", zh: "出一份力" },
      { en: "save water", zh: "节约用水" },
      { en: "make a contribution", zh: "作出贡献" }
    ],
    scaffold: ["Everyone should ...", "Only when ... can we ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句 + 情态动词",
        versions: [
          "I think all of us should do something to save water."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "it 作形式主语 + 不定式（非谓语作主语）",
        versions: [
          "It is our duty to do something to save water in our daily life."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "Only when 引导的部分倒装",
        versions: [
          "Only when everyone does their part can we really save water in our daily life."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "非谓语作主语", "倒装句"],
    traps: [
      {
        zh: "出一份力",
        bad: "give a force",
        good: "do our part",
        why: "出力是中文的固定说法，英语用 do one's part 或 make a contribution；force 是力量、武力，搭配完全不对。"
      },
      {
        zh: "节约用水",
        bad: "save the water",
        good: "save water",
        why: "表示泛指的水资源不加定冠词；中文没有冠词，学生常随手加 the，属于冠词误用。"
      }
    ],
    upgrade: [
      { basic: "do something good", better: "make a contribution" },
      { basic: "a lot of", better: "a great deal of" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/倡议书/倒装句/4"
  },
  {
    id: "APP-CONTRIB-0001",
    track: "应用文",
    scene: "投稿",
    topics: ["阅读", "校园生活"],
    cn: "更重要的是，读书让我学会了独立思考。",
    difficulty: 3,
    difficultyWhy: "过渡句要承上启下，更重要的是有副词短语和主语从句两种写法；独立思考的介词选择容易错，L3 还要用句首分词短语，属于三星。",
    hint: "先加过渡词开篇：更重要的是；再说主干：读书让我学会独立思考。注意独立思考强调不盲从别人，不是一个人待着。",
    keyPhrases: [
      { en: "more importantly", zh: "更重要的是" },
      { en: "think for myself", zh: "独立思考" },
      { en: "get into the habit of reading", zh: "养成读书的习惯" }
    ],
    scaffold: ["More importantly, ... has taught me to ...", "...ing widely, I have ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "副词短语作状语 + 现在完成时",
        versions: [
          "More importantly, reading has taught me to think for myself."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "名词性从句（主语从句 + 表语从句）",
        versions: [
          "What is more important is that reading has taught me to think on my own."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（现在分词短语置于句首）",
        versions: [
          "Reading widely, I have gradually learned to think for myself instead of just following others."
        ]
      }
    ],
    grammarPoints: ["时态（完成时）", "名词性从句", "非谓语作状语"],
    traps: [
      {
        zh: "独立思考",
        bad: "think by myself",
        good: "think for myself",
        why: "think by myself 是独自一个人思考，没人陪；独立思考强调不盲从别人，要用 think for oneself，介词选错意思就偏了。"
      },
      {
        zh: "读书让我学会了思考",
        bad: "Reading books let me learn to think.",
        good: "Reading has taught me to think.",
        why: "动名词短语作主语视为单数，谓语要用 lets 或 has taught；另外让某人学会用 teach sb to do 比 let sb learn 更准确。"
      }
    ],
    upgrade: [
      { basic: "very important", better: "what matters most" },
      { basic: "learn a lot", better: "gain a deeper understanding" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/投稿/非谓语作状语/3"
  },
  {
    id: "APP-INTRO-0001",
    track: "应用文",
    scene: "人物介绍",
    topics: ["校园生活", "人物"],
    cn: "我们的英语老师虽然五十多了，可她的课比年轻老师的还热闹。",
    difficulty: 5,
    difficultyWhy: "一句里要同时处理让步关系、省略式比较（those of 或所有格）和年龄表达；L3 还要用 Never 前置倒装，比较对象不对等是最常见的逻辑错误，属于五星。",
    hint: "先让步：虽然她已经五十多岁；再对比：她的课比年轻老师的更有活力。注意比较对象要对等，拿课跟课比，别跟人比。",
    keyPhrases: [
      { en: "in her fifties", zh: "五十多岁" },
      { en: "livelier than those of young teachers", zh: "比年轻老师的更热闹" },
      { en: "full of energy", zh: "精力充沛" }
    ],
    scaffold: ["Although she is ..., her classes are ...", "Never have I ... a teacher who ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "让步状语从句 + 比较级主句",
        versions: [
          "Although our English teacher is in her fifties, her classes are livelier than those of young teachers."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "并列句 + 定语从句（that）+ 比较级",
        versions: [
          "Our English teacher is over fifty now, but she gives classes that are much livelier than young teachers'."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "Never 前置的部分倒装 + 定语从句",
        versions: [
          "Never have I seen a teacher in her fifties whose classes are so lively and full of energy."
        ]
      }
    ],
    grammarPoints: ["让步状语从句", "定语从句", "倒装句"],
    traps: [
      {
        zh: "比年轻老师的课更热闹",
        bad: "her classes are livelier than young teachers.",
        good: "her classes are livelier than those of young teachers.",
        why: "比较对象必须对等：要拿课和课比，用 those 代替 the classes；直接跟 young teachers 比较就成了人和课相比，逻辑不成立。"
      },
      {
        zh: "虽然她五十多了，但她的课很热闹",
        bad: "Although she is in her fifties, but her classes are lively.",
        good: "Although she is in her fifties, her classes are lively.",
        why: "although 和 but 不能同时出现在一个句子里；中文的虽然但是成对使用，直译就会多出一个 but。"
      }
    ],
    upgrade: [
      { basic: "very lively", better: "full of energy" },
      { basic: "old", better: "in her fifties" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/人物介绍/倒装句/5"
  },
  {
    id: "APP-CHART-0001",
    track: "应用文",
    scene: "图表描述",
    topics: ["校园生活", "健康"],
    cn: "从表上看，每周锻炼三次以上的学生占了大约六成。",
    difficulty: 5,
    difficultyWhy: "图表句既要把数据读准，又要选对占比动词（account for 或 make up）；三次以上要理解成三次及以上；L3 用 with 复合结构承载数据，还要保证主句谓语完整，属于五星。",
    hint: "先交代图表显示的内容；再把学生群体和百分比连起来。占比用专门的动词，别用占据空间的那个词；以上要理解成三次及以上。",
    keyPhrases: [
      { en: "as is shown in the chart", zh: "如图表所示" },
      { en: "account for about sixty percent", zh: "占大约百分之六十" },
      { en: "exercise at least three times a week", zh: "每周至少锻炼三次" }
    ],
    scaffold: ["The chart shows that ...", "With the percentage ..., students who ... are ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句（转述图表数据）",
        versions: [
          "The chart shows that about sixty percent of the students exercise at least three times a week."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（as is shown）+ 定语从句（who）",
        versions: [
          "As is shown in the chart, students who exercise at least three times a week account for about sixty percent."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "with 复合结构（with + 宾语 + 现在分词）",
        versions: [
          "With the percentage rising to about sixty, students who exercise three times a week or more are clearly in the majority."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "非限制性定语从句", "with 复合结构"],
    traps: [
      {
        zh: "占了大约六成",
        bad: "occupy about sixty percent",
        good: "account for about sixty percent",
        why: "图表里表示占比要用 account for 或 make up；occupy 是占据空间、职位，属于典型的搭配错误。"
      },
      {
        zh: "每周锻炼三次以上",
        bad: "exercise more than three times every week",
        good: "exercise at least three times a week",
        why: "中文的三次以上在图表题里通常表示三次及以上，要用 at least；more than three 是多于三次，不含三次，数据就报错了。"
      }
    ],
    upgrade: [
      { basic: "a lot of students", better: "a large proportion of students" },
      { basic: "show very clearly", better: "clearly reveal" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/图表描述/with 复合结构/5"
  }
);
