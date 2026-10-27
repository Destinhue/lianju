/* ============================================================
   data/bank-seed-app2.js — 应用文种子库扩展（12 场景 × 4 题 = 48 题）
   契约：docs/DATA_SPEC.md v1
   难度配额：每场景 1星/2星/3星 各 1 题 + 4~5星 1 题
   与 bank-seed-app.js 在"功能句"上互补（开头点题 / 补充信息 / 说明理由 / 结尾期待等）
   校验：core/validator.js（L3 必须命中高级结构正则）
   ============================================================ */
window.SF_BANK = window.SF_BANK || [];
window.SF_BANK.push(
  /* ---------------- 建议信 ---------------- */
  {
    id: "APP-LETTER-0002",
    track: "应用文",
    scene: "建议信",
    topics: ["校园生活", "学习"],
    cn: "听说你数学跟不上，我想给你几个建议。",
    difficulty: 1,
    difficultyWhy: "整句只有两件事：听说你数学吃力、想给你建议。L1 用宾语从句加不定式就能写清，词汇都在初中范围，唯一要注意的是建议不可数，属于最基础的一星句。",
    hint: "先搭主干：我听说你数学吃力；再接上我想给你几个建议。吃力别照字面翻，用固定短语；建议这个词永远不加 s。",
    keyPhrases: [
      { en: "have trouble with maths", zh: "数学学得吃力" },
      { en: "keep up with the class", zh: "跟上班级进度" },
      { en: "give you some advice", zh: "给你一些建议" }
    ],
    scaffold: ["I heard that ...", "I'd like to ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句（that 引导）+ 不定式作宾语",
        versions: [
          "I heard that you have trouble with maths, and I'd like to give you some advice."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "原因状语从句（Since）+ 宾语从句",
        versions: [
          "Since you told me maths is getting harder, I want to share a few suggestions with you."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非限制性定语从句（which 补充说明）",
        versions: [
          "I heard that you are having trouble keeping up with maths, which is why I am writing to offer you some advice."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "状语从句", "非限制性定语从句"],
    traps: [
      {
        zh: "数学有点跟不上",
        bad: "you can not follow up the maths",
        good: "you are having trouble keeping up with maths",
        why: "keep up with 表示跟上进度，follow up 表示对某件事继续跟进，两个短语意思不同；把中文的跟上直译成 follow up 就跑偏了。"
      },
      {
        zh: "给你几个建议",
        bad: "give you some advices",
        good: "give you some advice",
        why: "advice 是不可数名词，永远不加 s；想说几条建议要用 a few pieces of advice。"
      }
    ],
    upgrade: [
      { basic: "very difficult", better: "challenging" },
      { basic: "give some help", better: "offer some practical advice" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/建议信/宾语从句/1"
  },
  {
    id: "APP-LETTER-0003",
    track: "应用文",
    scene: "建议信",
    topics: ["校园生活", "学习"],
    cn: "你可以每天背二十个单词，坚持一个月就有效果。",
    difficulty: 2,
    difficultyWhy: "要把建议和结果连起来，条件状语从句和句首分词都能写。主要坑是背单词和坚持两个动词的选择，学生容易用错搭配，属于二星。",
    hint: "先给建议：每天记二十个新单词；再说结果：坚持一个月就看得到变化。背单词强调记住，坚持用一个固定短语。",
    keyPhrases: [
      { en: "learn twenty new words a day", zh: "每天记二十个新单词" },
      { en: "keep it up for a month", zh: "坚持一个月" },
      { en: "pay off", zh: "见成效" }
    ],
    scaffold: ["If you ... every day, you will ...", "...ing it up for a month, you will ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句 + 并列句",
        versions: [
          "I think you should learn twenty new words every day, and it will work in a month."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "if 条件状语从句 + 主句（一般将来时）",
        versions: [
          "If you keep learning twenty new words a day, you will notice the change within a month."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（现在分词短语置于句首）",
        versions: [
          "Keeping it up for a month, you will find those twenty words a day have made a real difference."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "状语从句", "非谓语作状语"],
    traps: [
      {
        zh: "背单词",
        bad: "recite twenty words every day",
        good: "learn twenty new words by heart every day",
        why: "recite 多指背诵篇章、当众朗读；背单词强调记住，用 learn ... by heart 或 memorise 更准确。"
      },
      {
        zh: "坚持一个月就有效果",
        bad: "insist one month will have effect",
        good: "if you keep it up for a month, it will pay off",
        why: "insist 是不及物动词，表示坚持某种主张，不能直接跟时间作宾语；坚持做某事用 keep it up 或 stick with it。"
      }
    ],
    upgrade: [
      { basic: "very useful", better: "rewarding" },
      { basic: "make a good result", better: "make a real difference" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/建议信/状语从句/2"
  },
  {
    id: "APP-LETTER-0004",
    track: "应用文",
    scene: "建议信",
    topics: ["校园生活", "学习"],
    cn: "我建议你多和同学讨论，讲给别人听印象会更深。",
    difficulty: 3,
    difficultyWhy: "既要有建议又要有理由，理由部分要把印象更深意译成记得更牢；L3 还要用强调句突出方式状语。动词搭配和意译双重难点，属于三星。",
    hint: "先给建议：多和同学讨论；再讲理由：给别人讲一遍就记得更牢。印象深是比喻，落到记住这个动作上。",
    keyPhrases: [
      { en: "discuss more with your classmates", zh: "多和同学讨论" },
      { en: "explain things to others", zh: "讲给别人听" },
      { en: "remember things better", zh: "记得更牢" }
    ],
    scaffold: ["I suggest that you ...", "It is by ... that ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句 + 原因状语从句",
        versions: [
          "I suggest that you discuss more with your classmates, because you will remember things better after you explain them."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（which 补充说明）",
        versions: [
          "I suggest that you talk more with your classmates, which helps you remember things much better."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句 It is ... that ...（强调方式状语）+ 并列句",
        versions: [
          "It is by explaining things to others that you can remember them much better, so talk more with your classmates."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "非限制性定语从句", "强调句"],
    traps: [
      {
        zh: "印象会更深",
        bad: "you will get deeper impression",
        good: "you will remember it better",
        why: "印象在英语里说 leave a deeper impression on sb，或直接落到 remember better；把它当主语直译成 get deeper impression 是典型中式表达。"
      },
      {
        zh: "我建议你多和同学讨论",
        bad: "I suggest you to discuss more with classmates",
        good: "I suggest that you discuss more with your classmates",
        why: "suggest 后面不能接 sb to do，只能接 that 从句或动名词，这是 suggest 最经典的搭配错误。"
      }
    ],
    upgrade: [
      { basic: "very helpful", better: "make a lasting difference" },
      { basic: "a good way", better: "an effective approach" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/建议信/强调句/3"
  },
  {
    id: "APP-LETTER-0005",
    track: "应用文",
    scene: "建议信",
    topics: ["校园生活", "人际交往"],
    cn: "希望这些建议帮得上忙；真正管用的是坚持，有事随时找我。",
    difficulty: 4,
    difficultyWhy: "结尾要同时表达祝愿、点出关键并留下联系方式，L3 用强调句把坚持这一关键信息推到前面。三件事合在一句里还要语气自然，属于四星。",
    hint: "先表达希望：这些建议能帮上忙；再强调关键：真正起作用的是坚持；最后收尾：有问题随时找我。管用别用 very good 这类表达。",
    keyPhrases: [
      { en: "be of some help", zh: "帮得上忙" },
      { en: "your own persistence", zh: "你自己的坚持" },
      { en: "come to me anytime", zh: "随时来找我" }
    ],
    scaffold: ["I hope ... will be of some help.", "It is ... that will pay off."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句 + 并列句",
        versions: [
          "I hope these suggestions are helpful, and you can come to me anytime."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "名词性从句（主语从句 + 表语从句）+ 时间状语从句",
        versions: [
          "What I want to say is that you should keep at it, and I am always free whenever you need a talk."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句 It is ... that ...（强调主语）+ 并列句",
        versions: [
          "I hope these suggestions will be of some help, and remember that it is your own persistence that will pay off in the end."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "名词性从句", "强调句"],
    traps: [
      {
        zh: "有问题随时找我",
        bad: "if you have problem find me anytime",
        good: "if you have any problems, come to me anytime",
        why: "problem 是可数名词，泛指时要用复数或加 any；find me 是找到我在哪儿，不是找我帮忙。"
      },
      {
        zh: "真正管用的是坚持",
        bad: "the really useful is insist",
        good: "what really counts is keeping at it",
        why: "中文的的字结构要转成 what 引导的主语从句，坚持也要用动名词 keeping，动词原形不能作主语或表语。"
      }
    ],
    upgrade: [
      { basic: "very helpful", better: "of great help" },
      { basic: "keep doing it", better: "keep at it" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/建议信/强调句/4"
  },

  /* ---------------- 申请信 ---------------- */
  {
    id: "APP-APPLY-0002",
    track: "应用文",
    scene: "申请信",
    topics: ["校园生活", "个人经历"],
    cn: "我英语口语不错，也当过两年校报记者。",
    difficulty: 1,
    difficultyWhy: "两个并列的自我介绍信息，L1 用并列句，L2 用定语从句都很好写。词汇都在初中范围，只有口语的表达方式容易出错，属于一星。",
    hint: "先说口语好，再说当校报记者的经历。口语要说 spoken English，别照着中文说 speaking；身份要说 work as。",
    keyPhrases: [
      { en: "speak English well", zh: "英语说得好" },
      { en: "work as a school reporter", zh: "当校报记者" },
      { en: "spoken English", zh: "英语口语" }
    ],
    scaffold: ["I ... well, and I have ...", "I am a student who ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（and 连接两个简单句）",
        versions: [
          "I speak English well, and I have worked as a school reporter for two years."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "定语从句（who）+ 现在完成时",
        versions: [
          "I am a student who has worked as a school reporter for two years and speaks English well."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（现在分词完成式置于句首）",
        versions: [
          "Having worked as a school reporter for two years, I am confident in my spoken English."
        ]
      }
    ],
    grammarPoints: ["时态（完成时）", "定语从句", "非谓语作状语"],
    traps: [
      {
        zh: "我英语口语不错",
        bad: "my English speaking is very good",
        good: "my spoken English is good",
        why: "speaking 是动作名词，形容口语水平要用 spoken English；用 my ... is good 这种结构也是典型中式表达。"
      },
      {
        zh: "当过两年校报记者",
        bad: "I did school reporter for two years",
        good: "I worked as a school reporter for two years",
        why: "职业身份要用 work as 加职位；职位名词不能直接做 do 的宾语，中文里当记者那个当没有对应动词。"
      }
    ],
    upgrade: [
      { basic: "very good English", better: "a good command of English" },
      { basic: "do the job well", better: "be well qualified for the job" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/申请信/非谓语作状语/1"
  },
  {
    id: "APP-APPLY-0003",
    track: "应用文",
    scene: "申请信",
    topics: ["校园生活", "志愿服务"],
    cn: "我很喜欢和小孩子相处，所以想申请这份支教工作。",
    difficulty: 2,
    difficultyWhy: "要把喜欢孩子和申请工作用因果连起来，L1 用 so 并列即可，L3 用句首分词。和小孩子打交道、支教两处都要意译，属于二星。",
    hint: "先讲原因：我喜欢和孩子相处；再讲结果：所以我想申请这份支教工作。支教是中文简称，要说清是志愿教学。",
    keyPhrases: [
      { en: "enjoy working with children", zh: "喜欢和孩子相处" },
      { en: "apply for the volunteer teaching job", zh: "申请这份支教工作" },
      { en: "be eager to", zh: "渴望做某事" }
    ],
    scaffold: ["I enjoy ..., so I want to ...", "...ing ..., I am eager to ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（so 表结果）",
        versions: [
          "I enjoy working with children, so I want to apply for the volunteer teaching job."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "宾语从句 + 原因状语从句",
        versions: [
          "I am writing to apply for the job because I find that I really enjoy being with children."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（现在分词短语置于句首）",
        versions: [
          "Enjoying working with children, I am eager to apply for this volunteer teaching job."
        ]
      }
    ],
    grammarPoints: ["状语从句", "宾语从句", "非谓语作状语"],
    traps: [
      {
        zh: "和小孩子打交道",
        bad: "play with little children",
        good: "work with children",
        why: "play with 是玩耍，写在申请信里会让人觉得你只是陪玩；打交道要按语境说 work with 或 get along with。"
      },
      {
        zh: "支教工作",
        bad: "teach support work",
        good: "volunteer teaching job",
        why: "支教是中文缩略词，逐字直译不成词；英语要说 volunteer teaching，或在乡村学校教书。"
      }
    ],
    upgrade: [
      { basic: "very like children", better: "be keen on working with children" },
      { basic: "a good chance", better: "a valuable opportunity" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/申请信/非谓语作状语/2"
  },
  {
    id: "APP-APPLY-0004",
    track: "应用文",
    scene: "申请信",
    topics: ["志愿服务", "个人经历"],
    cn: "去年暑假我在社区做了一个月志愿者，教小学生读英语。",
    difficulty: 3,
    difficultyWhy: "时间、地点、时长、具体工作四个信息点要在一个句子里排好，L3 还要用强调句突出地点；教某人做某事的搭配也容易出错，属于三星。",
    hint: "先搭主干：去年暑假我做了一个月志愿者；再补内容：教小学生读英语。时间地点按英语习惯放句末或句首，别堆在中间。",
    keyPhrases: [
      { en: "work as a volunteer in my community", zh: "在社区做志愿者" },
      { en: "teach primary school students to read English", zh: "教小学生读英语" },
      { en: "last summer", zh: "去年暑假" }
    ],
    scaffold: ["Last summer I ... for a month, and I ...", "It was in ... that I ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句 + 一般过去时",
        versions: [
          "Last summer I worked as a volunteer in my community for a month, and I taught primary school students to read English."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（where）+ 一般过去时",
        versions: [
          "Last summer I spent a month as a volunteer in my community, where I taught primary school students to read English."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句 It was ... that ...（强调地点状语）",
        versions: [
          "It was in my community that I spent a month last summer teaching primary school students to read English."
        ]
      }
    ],
    grammarPoints: ["时态（过去进行）", "非限制性定语从句", "强调句"],
    traps: [
      {
        zh: "教小学生读英语",
        bad: "teach primary students read English",
        good: "teach primary students to read English",
        why: "teach sb to do sth 是固定搭配，to 不能省；中文的教某人做某事里没有这个词，漏掉是高频错。"
      },
      {
        zh: "负责教小学生",
        bad: "be responsible to teach primary students",
        good: "be responsible for teaching primary students",
        why: "responsible 后面固定接 for 加名词或动名词，不能接不定式。"
      }
    ],
    upgrade: [
      { basic: "very useful experience", better: "valuable experience" },
      { basic: "help children", better: "give children a hand with their reading" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/申请信/强调句/3"
  },
  {
    id: "APP-APPLY-0005",
    track: "应用文",
    scene: "申请信",
    topics: ["校园生活", "人际交往"],
    cn: "如果能给我这个机会，我一定尽全力做好，期待您的答复。",
    difficulty: 5,
    difficultyWhy: "一句里要同时处理礼貌假设、决心表达和结尾套语。L3 要用虚拟语气写假设，把尽全力写成固定短语，时态和语气双重易错，属于五星。",
    hint: "先提出假设：如果能得到这个机会；再表决心：我会尽全力把工作做好；最后收尾：期待答复。尽全力要用固定短语，别用 try very hard。",
    keyPhrases: [
      { en: "be given this chance", zh: "得到这个机会" },
      { en: "spare no effort to do the job well", zh: "尽全力把工作做好" },
      { en: "look forward to your reply", zh: "期待您的答复" }
    ],
    scaffold: ["If I were ..., I would ...", "What I can promise is that ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "if 条件状语从句 + 并列句",
        versions: [
          "If you give me this chance, I will do my best, and I am looking forward to your reply."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "名词性从句（主语从句 What ... + 表语从句）+ 条件状语从句",
        versions: [
          "What I can promise is that I will spare no effort if I am given this chance."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "虚拟语气（if 引导的与现在事实相反条件句）+ 并列句",
        versions: [
          "If I were given this chance, I would spare no effort to do the job well, and I would really appreciate your early reply.",
          "It is this chance that I would value most, and I am looking forward to your reply."
        ]
      }
    ],
    grammarPoints: ["虚拟语气", "名词性从句", "强调句"],
    traps: [
      {
        zh: "尽全力把工作做好",
        bad: "try my best to make the work good",
        good: "spare no effort to do the job well",
        why: "把工作做好要用副词 well 修饰动词 do，make the work good 是中式直译；尽全力除 try my best 外还可用 spare no effort。"
      },
      {
        zh: "期待您的答复",
        bad: "I look forward to hear from you",
        good: "I look forward to hearing from you",
        why: "look forward to 里的 to 是介词，后面必须接动名词，这是最高频的搭配错误之一。"
      }
    ],
    upgrade: [
      { basic: "very want this chance", better: "value this chance highly" },
      { basic: "do my best", better: "spare no effort" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/申请信/虚拟语气/5"
  },

  /* ---------------- 邀请信 ---------------- */
  {
    id: "APP-INVITE-0002",
    track: "应用文",
    scene: "邀请信",
    topics: ["校园生活", "文化交流"],
    cn: "我想邀请你来当演讲比赛的评委。",
    difficulty: 1,
    difficultyWhy: "一句邀请的话，L1 用 be writing to do 表目的就够了，L3 用强调句突出邀请对象。评委要加不定冠词，属于一星。",
    hint: "先搭主干：我写信是想邀请你；再补身份：当英语演讲比赛的评委。写信的目的用 to do 表示，一个句子只留一个谓语。",
    keyPhrases: [
      { en: "invite you to be a judge", zh: "邀请你当评委" },
      { en: "English speech contest", zh: "英语演讲比赛" },
      { en: "be writing to do sth", zh: "写信来做某事" }
    ],
    scaffold: ["I am writing to invite you to ...", "It is ... that I would like to ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "不定式作状语（be writing to do sth）",
        versions: [
          "I am writing to invite you to be a judge at our English speech contest."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "宾语从句（whether 引导）",
        versions: [
          "I am writing to ask whether you would like to be a judge at our English speech contest."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句 It is ... that ...（强调宾语）",
        versions: [
          "It is you that I would most like to invite to be a judge at our English speech contest."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "非谓语作状语", "强调句"],
    traps: [
      {
        zh: "我写信是想邀请你",
        bad: "I write this letter want to invite you",
        good: "I am writing to invite you",
        why: "一个句子只能有一个谓语；中文的我写信想邀请是流水句，直译会出现两个动词，用 be writing to do 表目的最自然。"
      },
      {
        zh: "演讲比赛",
        bad: "English speech match",
        good: "English speech contest",
        why: "match 多指体育对抗赛；演讲、写作类比赛用 contest 或 competition。"
      }
    ],
    upgrade: [
      { basic: "very happy", better: "delighted" },
      { basic: "I want you to come", better: "would you like to join us" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/邀请信/强调句/1"
  },
  {
    id: "APP-INVITE-0003",
    track: "应用文",
    scene: "邀请信",
    topics: ["校园生活", "集体活动"],
    cn: "比赛下周三下午两点在报告厅举行，有十位选手参加。",
    difficulty: 2,
    difficultyWhy: "时间、地点、人数三个信息点要合并，还要用被动语态；L3 用 with 复合结构把参加者提到句首。选手的用词也是考点，属于二星。",
    hint: "先想清楚要素：什么活动、什么时候、在哪里、谁参加。比赛是被举办，用被动；参加者可以用 with 结构提到句首。",
    keyPhrases: [
      { en: "be held in the lecture hall", zh: "在报告厅举行" },
      { en: "at two next Wednesday afternoon", zh: "下周三下午两点" },
      { en: "take part in", zh: "参加" }
    ],
    scaffold: ["... will be held ...", "With ... taking part, ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "被动语态（一般将来时被动）+ 并列句",
        versions: [
          "The contest will be held in the lecture hall at two next Wednesday afternoon, and ten speakers will take part."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "there be 句型 + 非限制性定语从句",
        versions: [
          "There will be ten speakers in the contest, which will be held in the lecture hall at two next Wednesday afternoon."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "with 复合结构（with + 宾语 + 现在分词）",
        versions: [
          "With ten speakers taking part, the contest will be held in the lecture hall at two next Wednesday afternoon."
        ]
      }
    ],
    grammarPoints: ["被动语态", "there be 句型", "with 复合结构"],
    traps: [
      {
        zh: "比赛在报告厅举行",
        bad: "the contest will hold in the lecture hall",
        good: "the contest will be held in the lecture hall",
        why: "比赛是被举办，hold 要变被动；hold 用主动语态时主语必须是人或机构。"
      },
      {
        zh: "十位选手",
        bad: "ten players",
        good: "ten speakers",
        why: "player 指球类运动员；演讲比赛的选手叫 speaker 或 contestant，用词不当会让评委误以为在办比赛。"
      }
    ],
    upgrade: [
      { basic: "start at two", better: "be scheduled for two" },
      { basic: "many people will come", better: "a large audience is expected" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/邀请信/with 复合结构/2"
  },
  {
    id: "APP-INVITE-0004",
    track: "应用文",
    scene: "邀请信",
    topics: ["校园生活", "文化交流"],
    cn: "您经验丰富，您的点评一定会让同学们获益很多。",
    difficulty: 3,
    difficultyWhy: "要把经验丰富转成形容词或名词表达，还要处理让某人获益的动词搭配，受益的主语不能是中式的无灵主语；L3 用强调句突出主语，属于三星。",
    hint: "先夸对方：您经验丰富；再讲作用：您的点评会让同学获益很多。经验作经验讲是不可数名词，别加 s。",
    keyPhrases: [
      { en: "be very experienced", zh: "经验丰富" },
      { en: "benefit the students a lot", zh: "让同学们获益很多" },
      { en: "valuable comments", zh: "宝贵的点评" }
    ],
    scaffold: ["You are ..., and your comments will ...", "It is your ... that will ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句 + 情态动词表推测",
        versions: [
          "You are very experienced, and your comments will surely help the students a lot."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "原因状语从句（Since）+ 主句",
        versions: [
          "Since you are so experienced, your comments will surely benefit the students a lot."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句 It is ... that ...（强调主语）",
        versions: [
          "It is your rich experience that will make your comments so valuable to our students."
        ]
      }
    ],
    grammarPoints: ["状语从句", "情态动词", "强调句"],
    traps: [
      {
        zh: "让同学们获益很多",
        bad: "let the students get many benefits",
        good: "benefit the students a lot",
        why: "benefit 作动词可直接跟人，表示使受益；let sb get benefits 是把中文拆开逐字译，不地道。"
      },
      {
        zh: "经验丰富",
        bad: "you have many experiences",
        good: "you are very experienced",
        why: "experience 表示经验时不可数，加 s 就变成经历，意思完全不同。"
      }
    ],
    upgrade: [
      { basic: "very good comments", better: "valuable comments" },
      { basic: "help a lot", better: "benefit the students a great deal" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/邀请信/强调句/3"
  },
  {
    id: "APP-INVITE-0005",
    track: "应用文",
    scene: "邀请信",
    topics: ["校园生活", "人际交往"],
    cn: "如果您能来，我们将非常荣幸，希望周五前回复我。",
    difficulty: 4,
    difficultyWhy: "结尾既要表达荣幸又要委婉催复，L3 用 if 加 were 的虚拟语气把客气程度提上去。荣幸不能直译成动词，reply 的搭配也易错，属于四星。",
    hint: "先假设对方能来，再表达荣幸，最后请求回信。荣幸要用 be honoured 这种形容词结构，别把名词直接当谓语。",
    keyPhrases: [
      { en: "feel greatly honoured", zh: "感到非常荣幸" },
      { en: "would be grateful", zh: "将非常感激" },
      { en: "give me an early reply", zh: "尽早回复我" }
    ],
    scaffold: ["If you ..., we will ...", "If you were ..., we would ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "if 条件状语从句 + 并列句",
        versions: [
          "If you can come, we will be very honoured, and I hope you can reply before Friday."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "it 作形式主语 + 并列句",
        versions: [
          "It would be a great honour for us to have you with us, so a reply before Friday would be much appreciated."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "虚拟语气（if 引导的与将来事实相反条件句）+ 并列句",
        versions: [
          "If you were able to come, we would be honoured beyond words, so I would be grateful if you could reply before Friday."
        ]
      }
    ],
    grammarPoints: ["虚拟语气", "非谓语作主语", "被动语态"],
    traps: [
      {
        zh: "我们将非常荣幸",
        bad: "we will very honour",
        good: "we will feel greatly honoured",
        why: "honour 是名词或动词，感到荣幸要用 be 或 feel 加形容词 honoured，程度用副词 greatly 表达。"
      },
      {
        zh: "周五前回复我",
        bad: "reply me before Friday",
        good: "reply to me before Friday",
        why: "reply 是不及物动词，接人时要加介词 to；也可以说 give me a reply。"
      }
    ],
    upgrade: [
      { basic: "very happy", better: "honoured" },
      { basic: "tell me early", better: "give me an early reply" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/邀请信/虚拟语气/4"
  },

  /* ---------------- 感谢信 ---------------- */
  {
    id: "APP-THANKS-0002",
    track: "应用文",
    scene: "感谢信",
    topics: ["校园生活", "人际交往"],
    cn: "谢谢你一家人上周那么热情地招待我。",
    difficulty: 1,
    difficultyWhy: "感谢信的开头句，L1 用 Thank you for 加名词短语就够；难点只在热情修饰动词要用副词，属于一星。",
    hint: "先搭主干：谢谢你一家人的招待；再补时间和程度：上周、特别热情。热情是修饰招待这个动作的，要用副词形式。",
    keyPhrases: [
      { en: "thank you and your family", zh: "谢谢你和你家人" },
      { en: "give me such a warm welcome", zh: "热情地招待我" },
      { en: "last week", zh: "上周" }
    ],
    scaffold: ["Thank you for ... last week.", "Thanks to ..., I ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "Thank you for + 名词短语 + 时间状语",
        versions: [
          "Thank you for your warm welcome last week when I stayed with your family."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "介词短语作状语（Thanks to）+ 一般过去时",
        versions: [
          "Thanks to your warm welcome last week, I felt completely at home in your house."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（过去分词短语置于句首）",
        versions: [
          "Welcomed so warmly by your family last week, I really want to say thank you."
        ]
      }
    ],
    grammarPoints: ["介词短语", "非谓语作状语", "时态（完成时）"],
    traps: [
      {
        zh: "热情地招待我",
        bad: "treat me very warm",
        good: "treat me warmly",
        why: "修饰动词 treat 要用副词 warmly；very warm 是形容词短语，不能作状语。"
      },
      {
        zh: "谢谢你们一家人",
        bad: "thank you family",
        good: "thank you and your family",
        why: "thank 后接人称代词要用宾格 you，你们一家人要另外用 and your family 补出来，两个成分不能直接叠在一起。"
      }
    ],
    upgrade: [
      { basic: "very good", better: "unforgettable" },
      { basic: "thank you very much", better: "I really appreciate it" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/感谢信/非谓语作状语/1"
  },
  {
    id: "APP-THANKS-0003",
    track: "应用文",
    scene: "感谢信",
    topics: ["校园生活", "人际交往"],
    cn: "记得我迷路那天，你专门开车来接我，我一直记着。",
    difficulty: 2,
    difficultyWhy: "要处理时间从句和接人的固定搭配，还要写出一直记着这层情感；L3 用 Never 置于句首的倒装强调难忘，属于二星偏上。",
    hint: "先提起往事：我迷路那天；再说对方做了什么：你专门开车来接我；最后说感受：我一直记着。接人要用固定短语，开车不必再加车。",
    keyPhrases: [
      { en: "the day I got lost", zh: "我迷路那天" },
      { en: "drive all the way to pick me up", zh: "专门开车来接我" },
      { en: "never forget", zh: "永远忘不了" }
    ],
    scaffold: ["I still remember that ...", "Never have I ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句 + 定语从句（省略关系词）",
        versions: [
          "I still remember that you drove to pick me up the day I got lost."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "定语从句（when）+ 并列句",
        versions: [
          "I still remember the day when I got lost, and you drove all the way to pick me up."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "Never 置于句首的部分倒装 + 宾语从句",
        versions: [
          "Never have I forgotten how you drove all the way to pick me up when I got lost."
        ]
      }
    ],
    grammarPoints: ["定语从句", "倒装句", "宾语从句"],
    traps: [
      {
        zh: "你专门开车来接我",
        bad: "you specially drove car to take me",
        good: "you drove all the way to pick me up",
        why: "drive 本身已含开车义，后面不再加 car；接人用 pick sb up，take me 只表示带我去某处。"
      },
      {
        zh: "我一直记着",
        bad: "I always remember it until now",
        good: "I still remember it clearly",
        why: "always 表示一贯如此，和 until now 语义冲突；中文的一直记着对应 still remember。"
      }
    ],
    upgrade: [
      { basic: "thank you very much", better: "I am deeply grateful" },
      { basic: "drive a long way", better: "drive all the way" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/感谢信/倒装句/2"
  },
  {
    id: "APP-THANKS-0004",
    track: "应用文",
    scene: "感谢信",
    topics: ["校园生活", "学习"],
    cn: "要不是你那次鼓励，我可能早就放弃学英语了。",
    difficulty: 3,
    difficultyWhy: "对过去事实的假设必须用虚拟语气，L3 还要写成 Had 置于句首的倒装；放弃后面接动名词也是高频错，属于三星。",
    hint: "把中文要不是转成对过去的假设：如果没有你的鼓励；再说结果：我早就放弃了。放弃了后面接的动作要用动名词。",
    keyPhrases: [
      { en: "without your encouragement", zh: "没有你的鼓励" },
      { en: "give up learning English", zh: "放弃学英语" },
      { en: "long ago", zh: "很久以前" }
    ],
    scaffold: ["Without ..., I might have ...", "Had it not been for ..., I would have ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "介词短语表条件 + 情态动词完成式",
        versions: [
          "Without your encouragement, I might have given up English long ago."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "强调句 It was ... that ...（强调主语）",
        versions: [
          "It was your encouragement that kept me from giving up English."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "虚拟语气（Had 置于句首的倒装条件句）",
        versions: [
          "Had it not been for your encouragement, I would have given up English long ago."
        ]
      }
    ],
    grammarPoints: ["虚拟语气", "强调句", "非谓语作状语"],
    traps: [
      {
        zh: "放弃学英语",
        bad: "give up to learn English",
        good: "give up learning English",
        why: "give up 后面接动名词，不接不定式，这是 give up 最常见的搭配错误。"
      },
      {
        zh: "要不是你鼓励我",
        bad: "if you did not encourage me",
        good: "if you had not encouraged me",
        why: "对过去事实的假设，从句要用过去完成时；did not 只说明过去没做，条件关系就断了。"
      }
    ],
    upgrade: [
      { basic: "very important", better: "make all the difference" },
      { basic: "help me a lot", better: "keep me going" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/感谢信/虚拟语气/3"
  },
  {
    id: "APP-THANKS-0005",
    track: "应用文",
    scene: "感谢信",
    topics: ["人际交往", "校园生活"],
    cn: "以后你需要帮忙，我一定随叫随到；真心感谢你。",
    difficulty: 4,
    difficultyWhy: "结尾要把承诺和感谢合并，随叫随到必须意译；L3 用 Not only 置于句首的倒装加递进，语序和搭配都要处理，属于四星。",
    hint: "先说承诺：以后你需要帮忙我一定在；再说感谢：真心谢谢你。随叫随到要意译成随时愿意帮忙。",
    keyPhrases: [
      { en: "be there for you", zh: "随时支持你" },
      { en: "be at your service", zh: "随时为你效劳" },
      { en: "from the bottom of my heart", zh: "发自内心地" }
    ],
    scaffold: ["If you ..., I will ...", "Not only am I ..., but I will also ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "if 条件状语从句 + 并列句",
        versions: [
          "If you need any help in the future, just call me, and thank you again."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "时间状语从句（whenever）+ 并列句",
        versions: [
          "Whenever you need a hand, I will be there, and my thanks go far beyond words."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "Not only 置于句首的部分倒装（Not only am I ... but ...）",
        versions: [
          "Not only am I grateful for your help, but I will also be there whenever you need me."
        ]
      }
    ],
    grammarPoints: ["状语从句", "倒装句", "介词短语"],
    traps: [
      {
        zh: "随叫随到",
        bad: "you call me I will come at once",
        good: "I will be at your service whenever you call",
        why: "两个分句不能只用逗号或直接并排，必须加连词或从句；随叫随到是成语，要意译成随时愿意效劳。"
      },
      {
        zh: "真心感谢你",
        bad: "thank you again really",
        good: "thank you again from the bottom of my heart",
        why: "really 不能这样单独放在句尾；真心感谢用 from the bottom of my heart 或 sincerely。"
      }
    ],
    upgrade: [
      { basic: "thank you very much", better: "I am sincerely grateful" },
      { basic: "help you", better: "be there for you" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/感谢信/倒装句/4"
  },

  /* ---------------- 道歉信 ---------------- */
  {
    id: "APP-APOLOGY-0002",
    track: "应用文",
    scene: "道歉信",
    topics: ["校园生活", "人际交往"],
    cn: "真抱歉，我把你借我的那本书弄丢了。",
    difficulty: 1,
    difficultyWhy: "道歉信的开头句，L1 用形容词后的 that 从句就能写清；最大的坑是借进借出方向相反，属于一星。",
    hint: "先道歉，再说清事：我把你借给我的那本书丢了。借进和借出方向相反，别搞反。",
    keyPhrases: [
      { en: "the book you lent me", zh: "你借给我的那本书" },
      { en: "lose the book", zh: "把书弄丢" },
      { en: "feel terribly sorry", zh: "感到非常抱歉" }
    ],
    scaffold: ["I am really sorry that ...", "I am writing to say sorry for ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句（形容词后 that 从句）+ 定语从句（省略关系词）",
        versions: [
          "I am really sorry that I have lost the book you lent me."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "介词短语作状语（sorry for doing）+ 定语从句",
        versions: [
          "I feel terribly sorry for losing the book that you lent me."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非限制性定语从句（which 补充说明）",
        versions: [
          "I am writing to say sorry for losing the book you lent me, which I feel really bad about."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "定语从句", "非限制性定语从句"],
    traps: [
      {
        zh: "你借我的书",
        bad: "the book you borrowed me",
        good: "the book you lent me",
        why: "borrow 是借入，搭配 borrow sth from sb；借出是 lend sb sth。中文的借不分方向，直译最容易搞反。"
      },
      {
        zh: "我把书弄丢了",
        bad: "the book was lost by me",
        good: "I lost the book you lent me",
        why: "道歉信里责任在我，主动语态更显诚恳；被动语态听起来像在推卸责任，语气不对。"
      }
    ],
    upgrade: [
      { basic: "very sorry", better: "extremely sorry" },
      { basic: "give you a new book", better: "replace the book" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/道歉信/非限制性定语从句/1"
  },
  {
    id: "APP-APOLOGY-0003",
    track: "应用文",
    scene: "道歉信",
    topics: ["校园生活", "健康"],
    cn: "前天我发烧了，在家躺了一整天，所以没来上课。",
    difficulty: 2,
    difficultyWhy: "三个小信息点要按因果排好，L3 用句首现在分词表原因；发烧和缺课的动词选择都容易出错，属于二星。",
    hint: "先说原因：前天发烧、躺了一整天；再说结果：所以没来上课。发烧是固定说法，缺课用那个更准的动词。",
    keyPhrases: [
      { en: "have a fever", zh: "发烧" },
      { en: "stay in bed all day", zh: "在家躺一整天" },
      { en: "miss your class", zh: "缺你的课" }
    ],
    scaffold: ["I had ..., so I ...", "Because I ..., I ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（so 表因果）",
        versions: [
          "I had a fever the day before yesterday and stayed in bed all day, so I did not come to class."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "原因状语从句（Because）+ 一般过去时",
        versions: [
          "Because I had a fever and had to stay in bed, I missed your class the day before yesterday."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（现在分词短语置于句首，表原因）",
        versions: [
          "Running a high fever the day before yesterday, I had to stay in bed and missed your class."
        ]
      }
    ],
    grammarPoints: ["状语从句", "非谓语作状语", "时态（完成时）"],
    traps: [
      {
        zh: "在家躺了一整天",
        bad: "I lay at home a whole day",
        good: "I stayed in bed all day",
        why: "lay 是躺下的过去式，一般要接具体地点；生病卧床休养用 stay in bed 更准确。"
      },
      {
        zh: "没来上课",
        bad: "I did not go to the class",
        good: "I missed your class",
        why: "用 go 会受说话人位置影响，容易出错；缺课直接用 miss the class 最清楚。"
      }
    ],
    upgrade: [
      { basic: "very ill", better: "run a high fever" },
      { basic: "all the day", better: "the whole day" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/道歉信/非谓语作状语/2"
  },
  {
    id: "APP-APOLOGY-0004",
    track: "应用文",
    scene: "道歉信",
    topics: ["人际交往", "校园生活"],
    cn: "我想周五放学后请你吃饭，就当赔罪，你看行吗？",
    difficulty: 3,
    difficultyWhy: "请客和赔罪都要换成英语固定说法，还要用委婉的疑问征求意见；L3 用强调句把补偿方式提到前面，属于三星。",
    hint: "先提议请客：周五放学后请你吃饭；再说明用意：当作补偿；最后征求意见。请客和补偿都有固定搭配，别逐字直译。",
    keyPhrases: [
      { en: "treat you to dinner", zh: "请你吃饭" },
      { en: "make up for it", zh: "作为弥补" },
      { en: "after school this Friday", zh: "这周五放学后" }
    ],
    scaffold: ["I want to treat you to ..., and ...", "It is ... that I would like to ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句 + 宾语从句",
        versions: [
          "I want to treat you to dinner this Friday after school, and I hope you can come."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（which）+ 情态动词表委婉",
        versions: [
          "May I treat you to dinner after school this Friday, which I hope will make up for it?"
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句 It is ... that ...（强调宾语）+ 条件状语从句",
        versions: [
          "It is a dinner after school this Friday that I would like to offer, if that suits you."
        ]
      }
    ],
    grammarPoints: ["非限制性定语从句", "强调句", "情态动词"],
    traps: [
      {
        zh: "请你吃饭",
        bad: "invite you eat dinner",
        good: "treat you to dinner",
        why: "请客付钱是 treat sb to sth；invite sb to dinner 只是邀请来吃饭，而且 invite 后面不能直接跟动词原形。"
      },
      {
        zh: "就当赔罪",
        bad: "as a compensate to you",
        good: "as a way of making up for it",
        why: "compensate 是动词，不能直接作介词宾语；要改成 make up for it，或用名词 compensation。"
      }
    ],
    upgrade: [
      { basic: "give you a meal", better: "treat you to dinner" },
      { basic: "make you happy", better: "make up for it" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/道歉信/强调句/3"
  },
  {
    id: "APP-APOLOGY-0005",
    track: "应用文",
    scene: "道歉信",
    topics: ["校园生活", "人际交往"],
    cn: "希望你能原谅我这次，以后我一定提前安排好时间。",
    difficulty: 4,
    difficultyWhy: "既要请求原谅又要作保证，保证部分还要处理提前安排时间的状语位置和决心语气；L3 用 Never again 置于句首的倒装，属于四星。",
    hint: "先请求：希望你原谅我这一次；再保证：以后提前安排好时间。提前要用固定短语，决心由 will 本身表达就够。",
    keyPhrases: [
      { en: "forgive me this time", zh: "原谅我这一次" },
      { en: "plan my time in advance", zh: "提前安排好时间" },
      { en: "from now on", zh: "从今往后" }
    ],
    scaffold: ["I hope you can forgive me ...", "Never again will I ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句（hope that）+ 并列句",
        versions: [
          "I hope you can forgive me this time, and I will plan my time better in the future."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "名词性从句（主语从句 + 表语从句）",
        versions: [
          "I do hope you can forgive me this time. What I can promise is that I will arrange my time better from now on."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "Never again 置于句首的部分倒装 + 并列句",
        versions: [
          "Never again will I leave things to the last minute, and I hope you can forgive me this time."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "名词性从句", "倒装句"],
    traps: [
      {
        zh: "原谅我这次",
        bad: "excuse me this time",
        good: "forgive me this time",
        why: "excuse me 是打扰别人时的客套话，多指为小事开脱；请求原谅用 forgive 更庄重得体。"
      },
      {
        zh: "以后我一定提前安排好时间",
        bad: "I will arrange time in advance certainly",
        good: "I will plan my time in advance",
        why: "决心由 will 本身表达，另外加 certainly 语序和语气都不对；提前要说 in advance。"
      }
    ],
    upgrade: [
      { basic: "very sorry", better: "deeply sorry" },
      { basic: "not do it again", better: "make sure it never happens again" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/道歉信/倒装句/4"
  },

  /* ---------------- 求助信 ---------------- */
  {
    id: "APP-HELP-0002",
    track: "应用文",
    scene: "求助信",
    topics: ["校园生活", "人际交往"],
    cn: "我遇到麻烦了，想请你帮我一个忙。",
    difficulty: 1,
    difficultyWhy: "求助信的开头句，L1 用并列句就能写清；遇到麻烦是状态而不是动作，帮一个忙也是固定搭配，属于一星。",
    hint: "先说自己有麻烦，再说想请对方帮忙。麻烦是一种状态，用 be 加介词短语，不要用遇见那个动词。",
    keyPhrases: [
      { en: "be in trouble", zh: "遇到麻烦" },
      { en: "do me a favour", zh: "帮我一个忙" },
      { en: "ask you for help", zh: "向你求助" }
    ],
    scaffold: ["I am in trouble, and ...", "I am writing to ask if ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（and）",
        versions: [
          "I am in trouble now, and I would like to ask you for a favour."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "宾语从句（if 引导）+ 不定式作状语",
        versions: [
          "I am writing to ask if you could do me a favour."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非限制性定语从句（which 补充说明）",
        versions: [
          "I have got into trouble with my project, which is why I am writing to ask for your help."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "非限制性定语从句", "介词短语"],
    traps: [
      {
        zh: "帮我一个忙",
        bad: "help me a favour",
        good: "do me a favour",
        why: "帮忙的固定搭配是 do sb a favour 或 give sb a hand，help 不能和 favour 搭配。"
      },
      {
        zh: "我遇到麻烦了",
        bad: "I meet trouble",
        good: "I am in trouble",
        why: "遇到麻烦是状态，用 be in trouble；meet 只用于 meet a problem 这类碰上具体问题的说法。"
      }
    ],
    upgrade: [
      { basic: "need help very much", better: "be in urgent need of help" },
      { basic: "a big problem", better: "a real challenge" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/求助信/非限制性定语从句/1"
  },
  {
    id: "APP-HELP-0003",
    track: "应用文",
    scene: "求助信",
    topics: ["学习", "校园生活"],
    cn: "我的英语作文总写不长，考试常常凑不够字数。",
    difficulty: 2,
    difficultyWhy: "要写出两个相关的困难，还要把作文写不长这种无灵主语转成英语习惯的说法；L3 用强调句突出困难点，属于二星。",
    hint: "先说困难：英语作文写不长；再说后果：考试凑不够字数。写长的主体是人不是作文，注意换个说法。",
    keyPhrases: [
      { en: "fail to reach the word count", zh: "字数凑不够" },
      { en: "too short", zh: "太短" },
      { en: "in exams", zh: "考试时" }
    ],
    scaffold: ["My essays are ..., and I often ...", "It is ... that troubles me most."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（and）+ 一般现在时",
        versions: [
          "My English essays are always too short, and I often fail to write enough words in exams."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "时间状语从句（whenever）+ it 作形式宾语",
        versions: [
          "Whenever I write an English essay, I find it hard to reach the required number of words."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句 It is ... that ...（强调主语）+ 并列句（for 表原因）",
        versions: [
          "It is the length of my English essays that troubles me most, for they often fall short of the required words in exams."
        ]
      }
    ],
    grammarPoints: ["强调句", "状语从句", "非谓语作主语"],
    traps: [
      {
        zh: "我的作文写不长",
        bad: "my composition can not write long",
        good: "my essay is always too short",
        why: "作文本身不会写，写长的主体是人；中文的无灵主语句直译成 can not write 就错了。"
      },
      {
        zh: "凑不够字数",
        bad: "write not enough words",
        good: "fail to reach the required word count",
        why: "字数说 word count 或 number of words；not enough words 的语序和搭配都不自然。"
      }
    ],
    upgrade: [
      { basic: "very short", better: "fall short of the word limit" },
      { basic: "always", better: "time and again" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/求助信/强调句/2"
  },
  {
    id: "APP-HELP-0004",
    track: "应用文",
    scene: "求助信",
    topics: ["学习", "校园生活"],
    cn: "我背了很多范文，可一到考试还是不知道怎么写开头。",
    difficulty: 3,
    difficultyWhy: "要说清做过什么和仍然不会之间的转折，背范文和范文的选词都要准确；L3 用完成式分词开头表让步，属于三星。",
    hint: "先讲已经做的事：背了不少范文；再讲困难仍在：考试时不会写开头。背诵用固定短语，范文别说成普通文章。",
    keyPhrases: [
      { en: "learn model essays by heart", zh: "背范文" },
      { en: "have no idea how to begin", zh: "不知道怎么开头" },
      { en: "in an exam", zh: "考试时" }
    ],
    scaffold: ["Although I have ..., I still ...", "Having ..., I still find it hard to ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（but）+ 宾语从句（how 引导）",
        versions: [
          "I have learned many model essays by heart, but I still do not know how to begin in exams."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "让步状语从句（Although）+ 宾语从句",
        versions: [
          "Although I have memorised many model essays, I still have no idea how to start my essay in an exam."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（现在分词完成式置于句首）+ 时间状语从句",
        versions: [
          "Having learned many model essays by heart, I still find it hard to begin when the exam comes."
        ]
      }
    ],
    grammarPoints: ["让步状语从句", "非谓语作状语", "宾语从句"],
    traps: [
      {
        zh: "背了很多范文",
        bad: "remember many model essays",
        good: "learn many model essays by heart",
        why: "remember 只是记得，背下来强调熟记，用 learn ... by heart 或 memorise；范文说 model essay。"
      },
      {
        zh: "不知道怎么开头",
        bad: "have no idea how to begin it with",
        good: "have no idea how to begin",
        why: "how to do 后面不再加多余的代词和介词，begin 在这里已经是不及物用法。"
      }
    ],
    upgrade: [
      { basic: "a lot of essays", better: "a wide range of model essays" },
      { basic: "still can not", better: "still find it hard to" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/求助信/非谓语作状语/3"
  },
  {
    id: "APP-HELP-0005",
    track: "应用文",
    scene: "求助信",
    topics: ["人际交往", "校园生活"],
    cn: "你要是有空回我一句，我就很感激了，打扰你了。",
    difficulty: 4,
    difficultyWhy: "结尾要把请求写得客气又不啰嗦，回信、抽空、打扰三处都有固定说法；L3 用 were to 的虚拟语气把客气程度拉满，属于四星。",
    hint: "先提出希望：你能抽空回个信；再表示感谢和歉意：我会很感激，也打扰你了。客气话用固定短语，别字字对译。",
    keyPhrases: [
      { en: "write back to me", zh: "给我回信" },
      { en: "spare a few minutes", zh: "抽空几分钟" },
      { en: "be truly grateful", zh: "非常感激" }
    ],
    scaffold: ["I would appreciate it if ...", "If you were to ..., I would ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句 + 时间状语从句",
        versions: [
          "I hope you can write back to me when you have time, and I really thank you for that."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "it 作形式宾语 + if 条件状语从句",
        versions: [
          "I would really appreciate it if you could spare some time to reply to me."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "虚拟语气（if ... were to do）+ 主句（would）",
        versions: [
          "If you were to spare a few minutes to reply to me, I would be truly grateful."
        ]
      }
    ],
    grammarPoints: ["虚拟语气", "宾语从句", "非谓语作宾语"],
    traps: [
      {
        zh: "我就很感激了",
        bad: "I will very thank you",
        good: "I would be truly grateful",
        why: "thank 是动词，不能用 very 修饰；感激用 be grateful 或 appreciate it，而且 would 比 will 更委婉。"
      },
      {
        zh: "打扰你了",
        bad: "I am sorry to disturb you so much",
        good: "Sorry to have taken up your time",
        why: "disturb 多指打断、干扰别人；书面客套说 Sorry to have taken up your time 更地道。"
      }
    ],
    upgrade: [
      { basic: "thank you very much", better: "I would be truly grateful" },
      { basic: "give me a letter", better: "drop me a line" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/求助信/虚拟语气/4"
  },

  /* ---------------- 通知 ---------------- */
  {
    id: "APP-NOTICE-0002",
    track: "应用文",
    scene: "通知",
    topics: ["校园生活", "集体活动"],
    cn: "下周一学校有消防演练，全体同学都要参加。",
    difficulty: 1,
    difficultyWhy: "通知里交代活动和时间，L1 用并列句、L2 用 there be 都很好写；某天前不加介词是主要坑，属于一星。",
    hint: "先说要做什么：学校办消防演练；再说时间和要求：下周一、全体同学参加。下周一这类时间前不加介词。",
    keyPhrases: [
      { en: "hold a fire drill", zh: "举行消防演练" },
      { en: "take part in", zh: "参加" },
      { en: "next Monday", zh: "下周一" }
    ],
    scaffold: ["Our school will hold ... next Monday.", "All students are expected to ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句 + 情态动词",
        versions: [
          "Our school will hold a fire drill next Monday, and all students must take part."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "there be 句型 + 被动语态",
        versions: [
          "There will be a fire drill in our school next Monday, and all students are expected to take part in it."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非限制性定语从句（which 补充说明）+ 被动语态",
        versions: [
          "Our school will hold a fire drill next Monday, which everyone is required to attend."
        ]
      }
    ],
    grammarPoints: ["there be 句型", "被动语态", "非限制性定语从句"],
    traps: [
      {
        zh: "参加演练",
        bad: "join the drill",
        good: "take part in the drill",
        why: "join 多接组织、团体，如 join the club；参加活动用 take part in 或 attend。"
      },
      {
        zh: "下周一",
        bad: "on next Monday",
        good: "next Monday",
        why: "next、last、this 修饰的时间状语前不加介词，中文的下周一那个下不需要介词。"
      }
    ],
    upgrade: [
      { basic: "very important", better: "of great importance" },
      { basic: "must come", better: "are required to attend" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/通知/被动语态/1"
  },
  {
    id: "APP-NOTICE-0003",
    track: "应用文",
    scene: "通知",
    topics: ["校园生活", "健康"],
    cn: "请每人自带毛巾，穿运动鞋，别带贵重东西。",
    difficulty: 2,
    difficultyWhy: "三条并列的注意事项要写成祈使句或被动句，自带的表达是主要坑；L3 用句首分词短语把三条信息合并，属于二星。",
    hint: "三条要求依次说：自带毛巾、穿运动鞋、别带贵重物品。自带要说清是自己的；否定祈使句写完整更正式。",
    keyPhrases: [
      { en: "bring your own towel", zh: "自带毛巾" },
      { en: "wear sports shoes", zh: "穿运动鞋" },
      { en: "anything valuable", zh: "贵重物品" }
    ],
    scaffold: ["Please bring ... and ..., and do not ...", "Everyone is asked to ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "祈使句 + 并列祈使句",
        versions: [
          "Please bring your own towel and wear sports shoes, and do not bring anything valuable."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "被动语态（be asked to do）+ 并列句",
        versions: [
          "Everyone is asked to bring a towel and wear sports shoes, and valuable things should be left at home."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（现在分词短语置于句首）+ 情态动词",
        versions: [
          "Bringing your own towel and wearing sports shoes, you should leave valuable things at home."
        ]
      }
    ],
    grammarPoints: ["被动语态", "非谓语作状语", "情态动词"],
    traps: [
      {
        zh: "自带毛巾",
        bad: "bring yourself a towel",
        good: "bring your own towel",
        why: "自带是自己准备的意思，用 one's own；bring yourself 是把自己带来，语义完全跑偏。"
      },
      {
        zh: "别带贵重东西",
        bad: "do not take expensive things",
        good: "do not bring anything valuable",
        why: "贵重用 valuable，expensive 只表示价格高；通知里的否定祈使句写完整 do not 更正式。"
      }
    ],
    upgrade: [
      { basic: "very expensive things", better: "valuable belongings" },
      { basic: "take with you", better: "bring along" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/通知/非谓语作状语/2"
  },
  {
    id: "APP-NOTICE-0004",
    track: "应用文",
    scene: "通知",
    topics: ["校园生活", "集体活动"],
    cn: "想参加的同学请在周四前到班长那儿报名。",
    difficulty: 3,
    difficultyWhy: "定语从句和被动语态都能写，报名以及到某人处报名的搭配是主要坑；L3 还要用强调句突出截止时间，属于三星。",
    hint: "先限定对象：想参加的同学；再说做法和时间：周四前到班长那儿报名。报名是固定短语，到某人处用对的介词。",
    keyPhrases: [
      { en: "sign up with the class monitor", zh: "到班长那儿报名" },
      { en: "before Thursday", zh: "周四前" },
      { en: "students who want to take part", zh: "想参加的同学" }
    ],
    scaffold: ["Students who ... should ...", "It is before ... that ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "定语从句（who）+ 情态动词",
        versions: [
          "Students who want to take part should sign up with the class monitor before Thursday."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "定语从句（who）+ 被动语态",
        versions: [
          "Those who are interested are asked to sign up with the class monitor before Thursday."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句 It is ... that ...（强调时间状语）+ 定语从句",
        versions: [
          "It is before Thursday that those who want to take part should sign up with their class monitor."
        ]
      }
    ],
    grammarPoints: ["定语从句", "被动语态", "强调句"],
    traps: [
      {
        zh: "报名",
        bad: "report your name",
        good: "sign up",
        why: "报名是 sign up 或 register，report your name 是中文直译，英语里没有这个搭配。"
      },
      {
        zh: "到班长那儿报名",
        bad: "sign up to the class monitor",
        good: "sign up with the class monitor",
        why: "sign up with sb 表示在某人那里登记，介词要用 with 而不是 to。"
      }
    ],
    upgrade: [
      { basic: "want to join", better: "be keen to take part" },
      { basic: "before Thursday comes", better: "by Thursday at the latest" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/通知/强调句/3"
  },
  {
    id: "APP-NOTICE-0005",
    track: "应用文",
    scene: "通知",
    topics: ["校园生活", "安全"],
    cn: "这次演练关系到大家的安全，请务必准时，别迟到。",
    difficulty: 5,
    difficultyWhy: "要把关系重大和必须准时两层信息合并，并写出正式通知的语气；L3 用 Not only 置于句首的倒装把安全的重要性抬高，属于五星。",
    hint: "先说意义：演练关系到大家安全；再提要求：务必准时、不要迟到。关系到用固定短语，务必别写成 must 加 please。",
    keyPhrases: [
      { en: "be closely related to our safety", zh: "关系到大家的安全" },
      { en: "arrive on time", zh: "准时到场" },
      { en: "be of vital importance", zh: "极为重要" }
    ],
    scaffold: ["As this drill ..., everyone is expected to ...", "Not only does ..., but ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（so）+ 祈使句",
        versions: [
          "This drill is about our safety, so please be on time and do not be late."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "原因状语从句（As）+ 被动语态",
        versions: [
          "As this drill is closely related to our safety, everyone is expected to arrive on time."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "Not only 置于句首的部分倒装（Not only does ... but ...）",
        versions: [
          "Not only does this drill concern our safety, but everyone is also expected to arrive on time.",
          "It is everyone's safety that this drill is about, so being on time is something we should all take seriously."
        ]
      }
    ],
    grammarPoints: ["倒装句", "强调句", "被动语态"],
    traps: [
      {
        zh: "关系到大家的安全",
        bad: "is related with everyone's safe",
        good: "is closely related to everyone's safety",
        why: "relate 与介词 to 搭配；安全作名词是 safety，形容词 safe 不能作宾语。"
      },
      {
        zh: "请务必准时",
        bad: "please must arrive on time",
        good: "please make sure you arrive on time",
        why: "please 后不能直接跟 must，两个语气词叠加就造成语法错误；用 make sure 或 are required to 更稳。"
      }
    ],
    upgrade: [
      { basic: "very important", better: "of vital importance" },
      { basic: "come on time", better: "arrive punctually" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/通知/倒装句/5"
  },

  /* ---------------- 演讲稿 ---------------- */
  {
    id: "APP-SPEECH-0002",
    track: "应用文",
    scene: "演讲稿",
    topics: ["校园生活", "阅读"],
    cn: "老师们、同学们，今天我讲的是读书的好处。",
    difficulty: 1,
    difficultyWhy: "开场句先呼告再点题，L1 用主系表结构就够；好处要用名词 benefit，L3 用强调句把话题提前，属于一星。",
    hint: "先称呼听众，再交代题目：读书的好处。好处是名词，别用 good 当名词用。",
    keyPhrases: [
      { en: "the benefits of reading", zh: "读书的好处" },
      { en: "dear teachers and classmates", zh: "老师们、同学们" },
      { en: "my topic today", zh: "我今天的题目" }
    ],
    scaffold: ["Dear teachers and classmates, ...", "It is ... that I want to talk about today."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "呼语 + 主系表结构",
        versions: [
          "Dear teachers and classmates, today my topic is the benefits of reading."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "it 作形式主语 + 不定式（非谓语作主语）",
        versions: [
          "Dear teachers and classmates, it is a great honour for me to share my views on reading today."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句 It is ... that ...（强调宾语）",
        versions: [
          "Dear teachers and classmates, it is the benefits of reading that I want to talk about today."
        ]
      }
    ],
    grammarPoints: ["非谓语作主语", "强调句", "名词性从句"],
    traps: [
      {
        zh: "读书的好处",
        bad: "the good of reading",
        good: "the benefits of reading",
        why: "好处要用名词 benefits 或 advantages；good 作名词时不表示这个意思。"
      },
      {
        zh: "今天我讲的是",
        bad: "today my speech's title is",
        good: "today my topic is",
        why: "my speech's title is 表达生硬，英语习惯说 the topic of my speech 或 my topic today。"
      }
    ],
    upgrade: [
      { basic: "very good", better: "beneficial" },
      { basic: "talk about", better: "share my views on" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/演讲稿/强调句/1"
  },
  {
    id: "APP-SPEECH-0003",
    track: "应用文",
    scene: "演讲稿",
    topics: ["校园生活", "健康"],
    cn: "现在很多同学一有空就刷手机，作业拖到很晚。",
    difficulty: 2,
    difficultyWhy: "要写出一有空就的时间关系，刷手机要换成地道说法；L3 用 with 复合结构把手机占用时间这层意思提到句首，属于二星。",
    hint: "先说现象：很多同学一有空就玩手机；再说后果：作业拖到很晚。刷手机是网络说法，按玩手机、花时间在手机上改。",
    keyPhrases: [
      { en: "play with their phones", zh: "玩手机" },
      { en: "put off their homework", zh: "把作业往后拖" },
      { en: "in their free time", zh: "一有空的时候" }
    ],
    scaffold: ["... whenever they are free, and ...", "With phones ..., many students ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "时间状语从句（whenever）+ 并列句",
        versions: [
          "Nowadays many students play with their phones whenever they are free, and they put off their homework until late."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "定语从句（who）+ 一般现在时",
        versions: [
          "Many students who play with their phones in their free time leave their homework until late at night."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "with 复合结构（with + 宾语 + 现在分词）",
        versions: [
          "With phones taking up their free time, many students put off their homework until late at night."
        ]
      }
    ],
    grammarPoints: ["with 复合结构", "状语从句", "定语从句"],
    traps: [
      {
        zh: "刷手机",
        bad: "brush the phone",
        good: "play with their phones",
        why: "刷手机是中文新说法，不能逐字译成 brush；英语说 play with 或 spend too much time on their phones。"
      },
      {
        zh: "作业拖到很晚",
        bad: "drag the homework to very late",
        good: "put off their homework until late at night",
        why: "拖是拖延，用 put off 或 postpone；drag 是拖动物体，很晚要说 late at night。"
      }
    ],
    upgrade: [
      { basic: "very bad", better: "harmful" },
      { basic: "spend much time", better: "be glued to their phones" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/演讲稿/with 复合结构/2"
  },
  {
    id: "APP-SPEECH-0004",
    track: "应用文",
    scene: "演讲稿",
    topics: ["校园生活", "健康"],
    cn: "就拿我来说，以前一刷手机就停不下来，成绩也掉了。",
    difficulty: 3,
    difficultyWhy: "要举例并说明后果，一就的顺承关系不能直译；L3 用 Not only 置于句首的倒装把两层后果并列，属于三星。",
    hint: "先用短语引出例子：拿我来说；再讲经历：一玩手机就停不下来；最后说后果：成绩下降。两个后果可以用倒装的递进句式。",
    keyPhrases: [
      { en: "take me as an example", zh: "就拿我来说" },
      { en: "cannot stop playing with my phone", zh: "玩手机停不下来" },
      { en: "my grades dropped", zh: "成绩下降了" }
    ],
    scaffold: ["Take me as an example: ...", "Not only did I ..., but ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "祈使句 Take ... as an example + 并列句",
        versions: [
          "Take me as an example: I could not stop playing with my phone, and my grades dropped."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（过去分词短语置于句首）+ 并列句",
        versions: [
          "Addicted to my phone, I could not stop playing, and my grades dropped."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "Not only 置于句首的部分倒装（Not only did ... but ...）",
        versions: [
          "Not only did I fail to stop playing with my phone, but my grades also dropped."
        ]
      }
    ],
    grammarPoints: ["非谓语作状语", "倒装句", "并列句"],
    traps: [
      {
        zh: "一刷手机就停不下来",
        bad: "I play phone can not stop",
        good: "I could not stop playing with my phone",
        why: "中文的一就表示顺承，英语要用 once 或 when 从句，或者用 can not stop doing；两个谓语直接并排就是语法错误。"
      },
      {
        zh: "成绩也掉了",
        bad: "my score also fell down",
        good: "my grades dropped",
        why: "成绩用 grades 或 marks，score 多指比赛得分；下降用 drop 或 fall，fall down 是摔倒。"
      }
    ],
    upgrade: [
      { basic: "very bad", better: "go from bad to worse" },
      { basic: "a lot of time", better: "hours on end" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/演讲稿/倒装句/3"
  },
  {
    id: "APP-SPEECH-0005",
    track: "应用文",
    scene: "演讲稿",
    topics: ["校园生活", "人际交往"],
    cn: "我的演讲到此结束，谢谢大家，希望你们有收获。",
    difficulty: 4,
    difficultyWhy: "结尾要收束、致谢并留有余味，三件事合并需要分词或从句；聆听要用动名词，收获也要换词，属于四星。",
    hint: "先收束演讲，再致谢，最后表达希望。聆听要用动名词；收获按得到来写，别用收割庄稼那个词。",
    keyPhrases: [
      { en: "thank you for listening", zh: "谢谢大家的聆听" },
      { en: "gain something valuable", zh: "有所收获" },
      { en: "that is all for my speech", zh: "我的演讲到此结束" }
    ],
    scaffold: ["That is all for my speech, ...", "Having ..., I do hope ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（三个分句并列）",
        versions: [
          "That is all for my speech, thank you for listening, and I hope you have learned something."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（which 评述）",
        versions: [
          "That is all for my speech, which I hope has given you something to think about. Thank you for listening."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（现在分词完成式置于句首）+ 强调助动词 do",
        versions: [
          "Having shared my thoughts with you, I do hope you have gained something from my speech. Thank you for listening."
        ]
      }
    ],
    grammarPoints: ["非谓语作状语", "非限制性定语从句", "时态（完成时）"],
    traps: [
      {
        zh: "谢谢大家的聆听",
        bad: "thank you for your listen",
        good: "thank you for listening",
        why: "介词 for 后面要接动名词，listen 是动词原形，不能直接跟在 for 后。"
      },
      {
        zh: "希望你们有所收获",
        bad: "I hope you have harvest",
        good: "I hope you have gained something",
        why: "收获在这里是得到的意思，用 gain 或 benefit；harvest 指收割庄稼，用在这里不搭。"
      }
    ],
    upgrade: [
      { basic: "thank you very much", better: "I am truly grateful for your attention" },
      { basic: "learn something", better: "gain something valuable" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/演讲稿/非谓语作状语/4"
  },

  /* ---------------- 倡议书 ---------------- */
  {
    id: "APP-PROPOSAL-0002",
    track: "应用文",
    scene: "倡议书",
    topics: ["环保", "校园生活"],
    cn: "同学们，我倡议大家一起给教室垃圾分类。",
    difficulty: 1,
    difficultyWhy: "倡议书开头句，L1 用 suggest that 从句就能写清；垃圾分类不能逐字直译，倡议某人做某事也不能漏掉那个 to，属于一星。",
    hint: "先呼告同学，再提出倡议：教室里的垃圾分类。分类要用专门的动词，不要用班级那个词。",
    keyPhrases: [
      { en: "sort the rubbish", zh: "垃圾分类" },
      { en: "in our classroom", zh: "在教室里" },
      { en: "call on everyone to do sth", zh: "倡议大家做某事" }
    ],
    scaffold: ["Dear classmates, I suggest that ...", "Let us ..., which ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句（suggest that）",
        versions: [
          "Dear classmates, I suggest that we sort the rubbish in our classroom together."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "it 作形式主语 + 不定式（非谓语作主语）",
        versions: [
          "Dear classmates, it is a good idea for us to sort the rubbish in our classroom."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非限制性定语从句（which 补充说明）+ 祈使句",
        versions: [
          "Dear classmates, let us start sorting the rubbish in our classroom, which is a small step towards a greener school."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "非谓语作主语", "非限制性定语从句"],
    traps: [
      {
        zh: "垃圾分类",
        bad: "divide the rubbish into classes",
        good: "sort the rubbish",
        why: "class 是班级、课，divide into classes 是分成班级；分类要用 sort 或 classify。"
      },
      {
        zh: "我倡议大家一起分类",
        bad: "I call on everyone sort the rubbish",
        good: "I call on everyone to sort the rubbish",
        why: "call on sb to do sth 中的 to 不能省；中文的让某人做某事没有这个词，最容易漏掉。"
      }
    ],
    upgrade: [
      { basic: "very good", better: "meaningful" },
      { basic: "do it together", better: "join hands" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/倡议书/非限制性定语从句/1"
  },
  {
    id: "APP-PROPOSAL-0003",
    track: "应用文",
    scene: "倡议书",
    topics: ["环保", "校园生活"],
    cn: "废纸和塑料瓶分开扔，每天轮流值日。",
    difficulty: 2,
    difficultyWhy: "两条做法要写成祈使句或被动句，轮流值日以及动副短语的语序都是考点；L3 用 Only by 置于句首的倒装强调方式，属于二星偏上。",
    hint: "第一条做法：废纸和瓶子分开扔；第二条：每天轮流值日。扔东西的短语接代词时要放中间，值日不加冠词。",
    keyPhrases: [
      { en: "put them in different bins", zh: "把它们扔进不同的桶" },
      { en: "take turns to be on duty", zh: "轮流值日" },
      { en: "every day", zh: "每天" }
    ],
    scaffold: ["Let us ... and ...", "Only by ... can we ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "祈使句 Let us + 并列谓语",
        versions: [
          "Let us put waste paper and plastic bottles in different bins and take turns to clean up every day."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "被动语态 + so that 目的状语从句",
        versions: [
          "Waste paper and plastic bottles should be put in different bins so that they can be recycled."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "Only by 置于句首的部分倒装",
        versions: [
          "Only by sorting waste paper and plastic bottles separately can we make recycling easier."
        ]
      }
    ],
    grammarPoints: ["目的状语从句", "被动语态", "倒装句"],
    traps: [
      {
        zh: "轮流值日",
        bad: "take turns to be on the duty",
        good: "take turns to be on duty",
        why: "on duty 是固定搭配，中间不加定冠词 the。"
      },
      {
        zh: "分开扔",
        bad: "throw them separately away",
        good: "throw them away separately",
        why: "throw away 是动副短语，代词要放中间，副词放后面，语序错了就不地道。"
      }
    ],
    upgrade: [
      { basic: "very useful", better: "environmentally friendly" },
      { basic: "do it every day", better: "make it a daily habit" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/倡议书/倒装句/2"
  },
  {
    id: "APP-PROPOSAL-0004",
    track: "应用文",
    scene: "倡议书",
    topics: ["环保", "校园生活"],
    cn: "这样做不仅能省资源，还能让校园更整洁。",
    difficulty: 3,
    difficultyWhy: "既能又能的递进要写成两个形式一致的并列谓语，动词原形也不能作主语；L3 用主语从句把重点前置，属于三星。",
    hint: "两个好处并列：省资源、让校园更整洁。做主语要用动名词；让某物更怎样要用形容词比较级。",
    keyPhrases: [
      { en: "save resources", zh: "节省资源" },
      { en: "make our school cleaner", zh: "让校园更整洁" },
      { en: "do this", zh: "这样做" }
    ],
    scaffold: ["If we do this, we can ... and ...", "What we ... is not just ... but also ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "if 条件状语从句 + 并列谓语",
        versions: [
          "If we do this, we can save resources and make our school cleaner."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（which 递进）",
        versions: [
          "Doing this saves resources, which also makes our school a cleaner place."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "名词性从句（主语从句 What ... + 表语从句）",
        versions: [
          "What we save is not just resources but also the beauty of our campus."
        ]
      }
    ],
    grammarPoints: ["名词性从句", "非限制性定语从句", "非谓语作主语"],
    traps: [
      {
        zh: "这样做能省资源",
        bad: "Do this can save resources",
        good: "Doing this can save resources",
        why: "动词原形不能作主语，要改成动名词 Doing this，这是中文祈使式主语直译的通病。"
      },
      {
        zh: "让校园更整洁",
        bad: "make our campus more cleanly",
        good: "make our campus cleaner",
        why: "make 后面接形容词作宾补，clean 的比较级是 cleaner；cleanly 是副词，意思是干净利落地。"
      }
    ],
    upgrade: [
      { basic: "save a lot", better: "save a great deal of resources" },
      { basic: "good for school", better: "beneficial to our campus" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/倡议书/名词性从句/3"
  },
  {
    id: "APP-PROPOSAL-0005",
    track: "应用文",
    scene: "倡议书",
    topics: ["环保", "校园生活"],
    cn: "让我们从今天开始，从小事做起，一起守护校园。",
    difficulty: 5,
    difficultyWhy: "号召句要短促有力，从什么做起的介词选择和小事的表达都要准；L3 用强调句把方式状语推到句首，语气和结构都有要求，属于五星。",
    hint: "先发出号召：从今天开始、从小事做起；再落到目标：一起守护校园。从某事做起用 start with，守护按照顾来写。",
    keyPhrases: [
      { en: "start with small things", zh: "从小事做起" },
      { en: "take good care of our school", zh: "守护我们的校园" },
      { en: "from today on", zh: "从今天开始" }
    ],
    scaffold: ["Let us ... and ...", "It is by ... that we can ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "祈使句 Let us + 并列谓语",
        versions: [
          "Let us start today with small things and take good care of our school together."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（which 评述）",
        versions: [
          "Let us start from today with small things, which will make a big difference to our school."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句 It is ... that ...（强调方式状语）",
        versions: [
          "It is by starting with small things today that we can take good care of our school."
        ]
      }
    ],
    grammarPoints: ["强调句", "非限制性定语从句", "介词短语"],
    traps: [
      {
        zh: "从小事做起",
        bad: "start from small things",
        good: "start with small things",
        why: "从事着手用 start with；start from 表示从某地或某时出发。"
      },
      {
        zh: "守护我们的校园",
        bad: "guard our school",
        good: "take good care of our school",
        why: "guard 是站岗守卫，用在校园里语气过重；爱护要用 take good care of 或 look after。"
      }
    ],
    upgrade: [
      { basic: "do good things", better: "make a real difference" },
      { basic: "start now", better: "start without delay" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/倡议书/强调句/5"
  },

  /* ---------------- 投稿 ---------------- */
  {
    id: "APP-CONTRIB-0002",
    track: "应用文",
    scene: "投稿",
    topics: ["校园生活", "阅读"],
    cn: "我看到你们征文了，想投一篇写友谊的文章。",
    difficulty: 1,
    difficultyWhy: "投稿开头句，L1 用并列句就能写清；投稿和征文启事的说法容易直译错，L3 用强调句突出稿件主题，属于一星。",
    hint: "先交代信息来源：我看到你们的征文启事；再说打算：投一篇写友谊的文章。投稿用固定短语，别用寄纸那个词。",
    keyPhrases: [
      { en: "send in a piece", zh: "投一篇稿" },
      { en: "your call for articles", zh: "你们的征文启事" },
      { en: "a piece about friendship", zh: "一篇写友谊的文章" }
    ],
    scaffold: ["I saw your ..., and I would like to ...", "It is ... that I would like to send."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句 + 不定式作宾语",
        versions: [
          "I saw your notice about articles, and I would like to send you a piece about friendship."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（现在分词完成式置于句首）",
        versions: [
          "Having read your notice, I am writing to send in a piece about friendship."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句 It is ... that ...（强调宾语）",
        versions: [
          "It is a piece about friendship that I would like to send to your newspaper."
        ]
      }
    ],
    grammarPoints: ["强调句", "非谓语作状语", "宾语从句"],
    traps: [
      {
        zh: "投一篇稿",
        bad: "send a paper to you",
        good: "send in a piece",
        why: "投稿是 send in 或 contribute；paper 多指论文、试卷，指作品时用 piece 或 article。"
      },
      {
        zh: "我看到你们征文了",
        bad: "I see you collect articles",
        good: "I saw your call for articles",
        why: "征文启事说 call for articles；collect 是收集东西，时态和搭配都不对。"
      }
    ],
    upgrade: [
      { basic: "very good", better: "well written" },
      { basic: "write about", better: "share my thoughts on" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/投稿/强调句/1"
  },
  {
    id: "APP-CONTRIB-0003",
    track: "应用文",
    scene: "投稿",
    topics: ["校园生活", "人际交往"],
    cn: "去年我第一次住校，室友帮我熬过了最难的日子。",
    difficulty: 2,
    difficultyWhy: "要交代时间、经历和对方的作用，住校和度过困难都有固定说法；L3 用句首分词短语把背景和结果串起来，属于二星。",
    hint: "先交代背景：去年第一次住校；再说结果：室友帮我度过最难的时候。住校要说清是住宿舍，度过困难用专门的短语。",
    keyPhrases: [
      { en: "live in the school dormitory", zh: "住校" },
      { en: "get through the hardest time", zh: "熬过最难的日子" },
      { en: "my roommates", zh: "我的室友们" }
    ],
    scaffold: ["Last year I ..., and my roommates ...", "...ing in the dormitory, I got through ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句 + 一般过去时",
        versions: [
          "Last year I lived in the school dormitory for the first time, and my roommates helped me through the hardest time."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "时间状语从句（when）+ 一般过去时",
        versions: [
          "Last year, when I first lived in the dormitory, my roommates helped me through the hardest period."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（现在分词短语置于句首）",
        versions: [
          "Living in the dormitory for the first time last year, I got through the hardest time with my roommates' help."
        ]
      }
    ],
    grammarPoints: ["非谓语作状语", "状语从句", "介词短语"],
    traps: [
      {
        zh: "住校",
        bad: "live in school",
        good: "live in the school dormitory",
        why: "住校是住宿舍，要用 dormitory 说清楚；live in school 只表示住在学校里，意思模糊。"
      },
      {
        zh: "熬过最难的日子",
        bad: "spend the hardest time",
        good: "get through the hardest time",
        why: "度过困难时期用 get through 或 go through；spend 只表示花费时间。"
      }
    ],
    upgrade: [
      { basic: "very hard time", better: "a tough period" },
      { basic: "help me a lot", better: "stand by me" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/投稿/非谓语作状语/2"
  },
  {
    id: "APP-CONTRIB-0004",
    track: "应用文",
    scene: "投稿",
    topics: ["人际交往", "校园生活"],
    cn: "在我看来，真正的友谊不是天天聊天，而是互相支持。",
    difficulty: 3,
    difficultyWhy: "不是而是的并列成分必须形式一致，还要把真正的友谊转成抽象名词；L3 用主语从句把观点前置，属于三星。",
    hint: "先给观点：真正的友谊是什么；再用不是而是展开。并列的两部分要用同一种形式，都用动名词。",
    keyPhrases: [
      { en: "real friendship", zh: "真正的友谊" },
      { en: "support each other", zh: "互相支持" },
      { en: "in my view", zh: "在我看来" }
    ],
    scaffold: ["I think real friendship means ..., not ...", "What matters ... is not ... but ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句 + 动名词作宾语",
        versions: [
          "I think real friendship means supporting each other, not just talking every day."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（which 说明）",
        versions: [
          "In my view, real friendship means supporting each other, which matters far more than talking every day."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "名词性从句（主语从句 What ... + 表语从句）",
        versions: [
          "What matters in real friendship is not talking every day but supporting each other."
        ]
      }
    ],
    grammarPoints: ["名词性从句", "非限制性定语从句", "非谓语作主语"],
    traps: [
      {
        zh: "不是天天聊天，而是互相支持",
        bad: "is not talk every day, but support each other",
        good: "is not talking every day but supporting each other",
        why: "并列成分形式要一致：前面用了动名词，后面也得用动名词；中文的不是而是后面接动词，直译就会丢掉一致性。"
      },
      {
        zh: "互相支持",
        bad: "support each other very much",
        good: "support each other",
        why: "support 本身已含支持的力度，加 very much 位置和语气都不对；要强调可以说 strongly support each other。"
      }
    ],
    upgrade: [
      { basic: "very important", better: "count for much" },
      { basic: "good friends", better: "true friends indeed" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/投稿/名词性从句/3"
  },
  {
    id: "APP-CONTRIB-0005",
    track: "应用文",
    scene: "投稿",
    topics: ["校园生活", "阅读"],
    cn: "希望这篇文章能被选上，也欢迎编辑给我提意见。",
    difficulty: 4,
    difficultyWhy: "结尾既要表达希望又要表示接受建议，被选上要用 accepted；L3 用 were to 的虚拟语气把期待写得含蓄得体，属于四星。",
    hint: "先说希望：文章能被采用；再说态度：欢迎编辑提意见。被采用用 accept，提意见用 suggestion，别用个人看法那个词。",
    keyPhrases: [
      { en: "be accepted", zh: "被采用" },
      { en: "be greatly encouraged", zh: "受到极大鼓舞" },
      { en: "offer me some suggestions", zh: "给我提些建议" }
    ],
    scaffold: ["I hope my article will ..., which ...", "If my article were to ..., I would ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句（被动）+ 并列句",
        versions: [
          "I hope this article can be accepted, and I welcome any advice from the editor."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（which 补充）",
        versions: [
          "I hope my article will be accepted, which would be a great encouragement to me."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "虚拟语气（if ... were to do）+ 并列句",
        versions: [
          "If my article were to be chosen, I would be greatly encouraged, and I would welcome any advice from the editor."
        ]
      }
    ],
    grammarPoints: ["虚拟语气", "非限制性定语从句", "被动语态"],
    traps: [
      {
        zh: "被选上",
        bad: "be chosen up",
        good: "be accepted",
        why: "choose 后面不加 up；稿件被采用常用 be accepted 或 be selected。"
      },
      {
        zh: "给我提意见",
        bad: "give me some opinions",
        good: "offer me some suggestions",
        why: "编辑提意见是 suggestions 或 comments on my article；opinions 指个人看法，搭配不当。"
      }
    ],
    upgrade: [
      { basic: "very happy", better: "be greatly encouraged" },
      { basic: "a good article", better: "a well-written piece" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/投稿/虚拟语气/4"
  },

  /* ---------------- 人物介绍 ---------------- */
  {
    id: "APP-INTRO-0002",
    track: "应用文",
    scene: "人物介绍",
    topics: ["校园生活", "人物"],
    cn: "我想介绍我的同桌，她是班里最爱笑的女孩。",
    difficulty: 1,
    difficultyWhy: "介绍句要先点出对象再补充身份，L1 用并列句加定语从句就能写清；同桌不能直译成同一张桌子，属于一星。",
    hint: "先说要介绍谁：我的同桌；再补充她是谁：班里最爱笑的女孩。中文的多个定语要转成从句。",
    keyPhrases: [
      { en: "my deskmate", zh: "我的同桌" },
      { en: "the girl who laughs most", zh: "最爱笑的女孩" },
      { en: "in our class", zh: "在班里" }
    ],
    scaffold: ["I would like to introduce ..., and she is ...", "It is ... that I want to introduce."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句 + 定语从句",
        versions: [
          "I would like to introduce my deskmate, and she is the girl who laughs most in our class."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（who 补充说明）",
        versions: [
          "I would like to introduce my deskmate, who is the girl that laughs most in our class."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句 It is ... that ...（强调宾语）+ 定语从句",
        versions: [
          "It is my deskmate that I want to introduce to you, the girl who laughs most in our class."
        ]
      }
    ],
    grammarPoints: ["定语从句", "非限制性定语从句", "强调句"],
    traps: [
      {
        zh: "同桌",
        bad: "the same table",
        good: "my deskmate",
        why: "同桌是 deskmate，逐字直译成 the same table 就变成同一张桌子了。"
      },
      {
        zh: "最爱笑的女孩",
        bad: "the most like laugh girl",
        good: "the girl who laughs most",
        why: "中文多个定语堆在名词前，英语要用定语从句；like 是动词或介词，不能这样修饰名词。"
      }
    ],
    upgrade: [
      { basic: "very nice", better: "warm-hearted" },
      { basic: "like to laugh", better: "be always smiling" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/人物介绍/强调句/1"
  },
  {
    id: "APP-INTRO-0003",
    track: "应用文",
    scene: "人物介绍",
    topics: ["校园生活", "人物"],
    cn: "她个子不高，但眼睛很亮，说话总是很温柔。",
    difficulty: 2,
    difficultyWhy: "三个特点要合在一句里，还涉及独立主格这种偏高级的写法；温柔修饰说话要用副词或介词短语，属于二星。",
    hint: "先说身高，再说眼睛，最后说说话的语调。个子不高说的是人，不是身体；温柔修饰说话，要用副词或介词短语。",
    keyPhrases: [
      { en: "not tall", zh: "个子不高" },
      { en: "bright eyes", zh: "明亮的眼睛" },
      { en: "in a gentle voice", zh: "用温柔的嗓音" }
    ],
    scaffold: ["She is ..., but her eyes ...", "Her eyes ..., she is ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（but/and 连接）",
        versions: [
          "She is not tall, but her eyes are bright, and she always speaks gently."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "定语从句（whose）+ 并列句",
        versions: [
          "She is a girl whose eyes are bright, and she always speaks in a gentle voice."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "独立主格（Her eyes shining ...）",
        versions: [
          "Her eyes shining with warmth, she is not tall but always speaks in a gentle voice."
        ]
      }
    ],
    grammarPoints: ["独立主格", "定语从句", "介词短语"],
    traps: [
      {
        zh: "个子不高",
        bad: "her body is not tall",
        good: "she is not tall",
        why: "身高直接说人，不用 body；body 一般指身体部位或体格。"
      },
      {
        zh: "说话很温柔",
        bad: "she speaks very gentle",
        good: "she speaks in a gentle voice",
        why: "修饰动词要用副词或介词短语；gentle 是形容词，不能直接修饰 speaks。"
      }
    ],
    upgrade: [
      { basic: "very kind", better: "gentle and considerate" },
      { basic: "she is good", better: "she has a heart of gold" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/人物介绍/独立主格/2"
  },
  {
    id: "APP-INTRO-0004",
    track: "应用文",
    scene: "人物介绍",
    topics: ["校园生活", "人物"],
    cn: "三年来她一直帮班里成绩差的同学补习，从没抱怨过。",
    difficulty: 3,
    difficultyWhy: "要处理持续三年的动作和从未抱怨的否定，成绩差的表达也要化解；L3 用主语从句把最打动人的地方前置，属于三星。",
    hint: "先讲坚持的事：三年来帮成绩落后的同学补习；再讲态度：从来没抱怨。成绩差别说成分数糟糕，从没用完成时。",
    keyPhrases: [
      { en: "fall behind in their studies", zh: "学习上落后" },
      { en: "without ever complaining", zh: "从没抱怨过" },
      { en: "for three years", zh: "三年来" }
    ],
    scaffold: ["For three years she has ..., and she has never ...", "What has impressed us most is that ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "现在完成进行时 + 定语从句",
        versions: [
          "For three years she has been helping classmates who are weak in their studies, and she has never complained."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（现在分词完成式置于句首）+ 现在完成时",
        versions: [
          "Having helped her classmates with their lessons for three years, she has never complained once."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "名词性从句（主语从句 What ... + 表语从句）",
        versions: [
          "What has impressed us most is that she has helped weaker classmates for three years without ever complaining."
        ]
      }
    ],
    grammarPoints: ["名词性从句", "非谓语作状语", "时态（完成时）"],
    traps: [
      {
        zh: "成绩差的同学",
        bad: "the students whose score is bad",
        good: "classmates who fall behind in their studies",
        why: "成绩落后说 fall behind 或 be weak in；bad 太笼统，用在同学身上也不够得体。"
      },
      {
        zh: "从没抱怨过",
        bad: "she never complains from three years",
        good: "she has never complained in the past three years",
        why: "从没做过某事要与完成时搭配，时间段用介词 in 或 for，不能用 from。"
      }
    ],
    upgrade: [
      { basic: "very helpful", better: "always ready to help" },
      { basic: "help a lot", better: "give a helping hand" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/人物介绍/名词性从句/3"
  },
  {
    id: "APP-INTRO-0005",
    track: "应用文",
    scene: "人物介绍",
    topics: ["校园生活", "人物"],
    cn: "多亏她，我才明白优秀不是成绩，而是愿意帮别人。",
    difficulty: 5,
    difficultyWhy: "要把优秀转成名词，还要把不是而是的并列成分写平行；L3 用 Without 引导的含蓄条件虚拟语气收束全文，属于五星。",
    hint: "先归功于她，再说自己的领悟：优秀不是成绩、而是愿意帮人。优秀作主语要用名词；不是而是的两头形式要一致。",
    keyPhrases: [
      { en: "thanks to her", zh: "多亏她" },
      { en: "real excellence", zh: "真正的优秀" },
      { en: "be willing to help others", zh: "愿意帮别人" }
    ],
    scaffold: ["Thanks to her, I understand that ...", "Without her help, I would never have ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "介词短语作状语 + 宾语从句",
        versions: [
          "Thanks to her, I know that real excellence means helping others, not getting good grades."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "宾语从句 + 非限制性定语从句（which 补充说明）",
        versions: [
          "Thanks to her, I now understand that real excellence means helping others, which I once thought was all about grades."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "虚拟语气（Without 引导的含蓄条件句）",
        versions: [
          "Without her help, I would never have understood that real excellence means helping others."
        ]
      }
    ],
    grammarPoints: ["虚拟语气", "非限制性定语从句", "词性转换"],
    traps: [
      {
        zh: "真正的优秀",
        bad: "real excellent",
        good: "real excellence",
        why: "优秀在这里作主语和宾语，要用名词 excellence；形容词 excellent 不能直接充当主语。"
      },
      {
        zh: "不是成绩，而是愿意帮别人",
        bad: "is not grades, but willing to help others",
        good: "is not about grades but about helping others",
        why: "be 动词后并列的成分要形式一致，都用 about 加名词或动名词；willing 是形容词，不能这样并列。"
      }
    ],
    upgrade: [
      { basic: "very good", better: "truly excellent" },
      { basic: "help others", better: "lend others a hand" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/人物介绍/虚拟语气/5"
  },

  /* ---------------- 图表描述 ---------------- */
  {
    id: "APP-CHART-0002",
    track: "应用文",
    scene: "图表描述",
    topics: ["校园生活", "健康"],
    cn: "从图上看，我们班近视的同学越来越多了。",
    difficulty: 1,
    difficultyWhy: "图表趋势句，L1 用 the chart shows that 从句就行；近视不用生僻词，趋势要用进行或完成时表示持续，属于一星。",
    hint: "先交代图表内容，再说趋势：近视的同学越来越多。越来越多要用表示持续上升的说法，别用比较级加 and 硬拼。",
    keyPhrases: [
      { en: "as is shown in the chart", zh: "如图表所示" },
      { en: "students with poor eyesight", zh: "近视的同学" },
      { en: "keep rising", zh: "不断上升" }
    ],
    scaffold: ["The chart shows that ...", "... has been rising, which ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句（The chart shows that）+ 现在完成时",
        versions: [
          "The chart shows that the number of students with poor eyesight in our class has kept rising."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（as 引导）+ 现在完成进行时",
        versions: [
          "As the chart shows, the number of students with poor eyesight in our class has been rising steadily over the past five years."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非限制性定语从句（which 评述）",
        versions: [
          "The number of students with poor eyesight in our class has been rising year after year, which is a warning to all of us."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "非限制性定语从句", "时态（完成时）"],
    traps: [
      {
        zh: "近视的同学",
        bad: "near-sight students",
        good: "students with poor eyesight",
        why: "近视说 poor eyesight 或 short-sighted，不能自己造 near-sight 这样的词。"
      },
      {
        zh: "越来越多",
        bad: "more and more many students",
        good: "a growing number of students",
        why: "more and more 后面不能再加 many；表示人数增长用 a growing number of 更书面。"
      }
    ],
    upgrade: [
      { basic: "more and more", better: "a growing number of" },
      { basic: "very serious", better: "a matter of concern" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/图表描述/非限制性定语从句/1"
  },
  {
    id: "APP-CHART-0003",
    track: "应用文",
    scene: "图表描述",
    topics: ["校园生活", "集体活动"],
    cn: "跟去年比，今年参加社团的同学几乎多了一倍。",
    difficulty: 2,
    difficultyWhy: "倍数表达是这一题的核心，还要处理参加社团的定语形式；L3 用句首过去分词短语开口，属于二星偏上。",
    hint: "先说对比对象：跟去年比；再说数据：今年参加社团的人数几乎翻倍。多一倍要说成是去年的两倍。",
    keyPhrases: [
      { en: "compared with last year", zh: "跟去年比" },
      { en: "almost twice as many as", zh: "几乎是……的两倍" },
      { en: "join school clubs", zh: "参加学校社团" }
    ],
    scaffold: ["This year, more ... than last year, and ...", "Compared with last year, ... has almost doubled."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "比较结构（more ... than）+ 现在完成时",
        versions: [
          "This year, more students have joined school clubs than last year, and the number has nearly doubled."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（which 补充说明）",
        versions: [
          "The number of students joining school clubs has almost doubled, which is a big change from last year."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（过去分词短语置于句首）+ 比较结构",
        versions: [
          "Compared with last year, the number of students joining school clubs has almost doubled."
        ]
      }
    ],
    grammarPoints: ["非谓语作状语", "非限制性定语从句", "时态（完成时）"],
    traps: [
      {
        zh: "多了一倍",
        bad: "more almost one time",
        good: "almost twice as many as last year",
        why: "中文多一倍等于英语的 twice，倍数要用 twice as many as；逐字翻成 more one time 不成立。"
      },
      {
        zh: "参加社团的同学",
        bad: "the students take part in clubs",
        good: "the students who join school clubs",
        why: "两个谓语不能直接放在一个名词后面，要改成定语从句或分词短语。"
      }
    ],
    upgrade: [
      { basic: "very different", better: "a striking change" },
      { basic: "many students", better: "a growing number of students" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/图表描述/非谓语作状语/2"
  },
  {
    id: "APP-CHART-0004",
    track: "应用文",
    scene: "图表描述",
    topics: ["校园生活", "集体活动"],
    cn: "这主要是因为学校今年新开了十多个社团，选择多了。",
    difficulty: 3,
    difficultyWhy: "要把主因和结果都写清，还要避免 because 与 so 连用；L3 用主语从句加非谓语把原因收束，属于三星。",
    hint: "先说原因：主要是学校新开了十多个社团；再说结果：选择变多了。原因用表语从句，选择多要说出谁有选择。",
    keyPhrases: [
      { en: "this is mainly because", zh: "这主要是因为" },
      { en: "set up more than ten new clubs", zh: "新开了十多个社团" },
      { en: "have more choices", zh: "有更多选择" }
    ],
    scaffold: ["This is mainly because ...", "What mainly accounts for the change is that ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "表语从句（This is because ...）+ 并列句",
        versions: [
          "This is mainly because our school set up more than ten new clubs this year, so students have more choices now."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（which 指代原因）",
        versions: [
          "Our school set up more than ten new clubs this year, which explains why so many students have joined them."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "名词性从句（主语从句 What ... + 表语从句）+ 非谓语作状语",
        versions: [
          "What mainly accounts for the change is that our school set up over ten new clubs this year, giving students far more choices."
        ]
      }
    ],
    grammarPoints: ["表语从句", "名词性从句", "非谓语作状语"],
    traps: [
      {
        zh: "这主要是因为",
        bad: "this is because of our school opened new clubs",
        good: "this is because our school set up new clubs",
        why: "because 后面接句子，because of 后面接名词短语，两者混用是高频错误。"
      },
      {
        zh: "选择多了",
        bad: "the choice is more",
        good: "students have more choices",
        why: "choice 是可数名词，选择多用 more choices；中文的选择多是无灵主语，英语要换成人有选择。"
      }
    ],
    upgrade: [
      { basic: "very many clubs", better: "a wide range of clubs" },
      { basic: "make new clubs", better: "set up new clubs" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/图表描述/名词性从句/3"
  },
  {
    id: "APP-CHART-0005",
    track: "应用文",
    scene: "图表描述",
    topics: ["校园生活", "集体活动"],
    cn: "照这个趋势下去，明年参加社团的人可能还会更多。",
    difficulty: 5,
    difficultyWhy: "趋势推断要用将来时的推测，还要处理程度副词的叠加；L3 用 were to 的虚拟语气对将来作推断，属于五星。",
    hint: "先说前提：如果这个趋势继续下去；再作预测：明年人数可能继续增长。照这个趋势别用下降那个词，可能别和 will 叠加。",
    keyPhrases: [
      { en: "if the trend continues", zh: "如果这个趋势继续" },
      { en: "keep growing", zh: "持续增长" },
      { en: "next year", zh: "明年" }
    ],
    scaffold: ["If the trend continues, ...", "If the trend were to ..., ... would ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "if 条件状语从句 + 情态动词表推测",
        versions: [
          "If the trend continues, even more students may join clubs next year."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（which 指代并引出结论）",
        versions: [
          "The number of club members has been rising, which suggests that even more students will join next year."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "虚拟语气（If ... were to do + would 主句）",
        versions: [
          "If the trend were to continue, the number of club members would grow even faster next year."
        ]
      }
    ],
    grammarPoints: ["虚拟语气", "非限制性定语从句", "情态动词"],
    traps: [
      {
        zh: "照这个趋势下去",
        bad: "according to this trend go down",
        good: "if the trend continues",
        why: "趋势下去不是 go down（下降）；照这个趋势表示条件，用 if 从句最自然。"
      },
      {
        zh: "可能还会更多",
        bad: "maybe will be more many",
        good: "there may be even more",
        why: "maybe 与 will 叠加语气重复，more many 也不成立；强调程度要用 even more。"
      }
    ],
    upgrade: [
      { basic: "very possible", better: "highly likely" },
      { basic: "become more", better: "keep growing steadily" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "应用文/图表描述/虚拟语气/5"
  }
);
