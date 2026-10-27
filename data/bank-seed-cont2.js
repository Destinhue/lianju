// data/bank-seed-cont2.js
// 读后续写专项种子题（第二批）10 道：与 bank-seed-cont.js 技法互补
// 难度配额：1星 2 题 / 2星 3 题 / 3星 2 题 / 4星 1 题 / 5星 2 题
// 契约见 docs/DATA_SPEC.md v1
window.SF_BANK = window.SF_BANK || [];
window.SF_BANK.push(
  {
    id: "CONT-ACTION-0003",
    track: "读后续写",
    scene: "动作描写",
    topics: ["清晨日常", "简单动作"],
    cn: "她推开窗，把窗台上的花盆搬了进来。",
    difficulty: 1,
    difficultyWhy: "只要求两个连续的小动作，用一般过去时并列谓语就能写完，不涉及从句、分词和时态呼应。真正的分值是守住时态一致，以及把搬进来这个方向补语写对，属于续写最基础的句子。",
    hint: "先写第一个动作：她把窗推开；再用 and 接上第二个动作：把窗台上的花盆搬进来。两件事都发生在过去，两个动词都要用过去式。",
    keyPhrases: [
      { en: "push the window open", zh: "把窗推开" },
      { en: "carry the flower pot in", zh: "把花盆搬进来" },
      { en: "the flower pot on the windowsill", zh: "窗台上的花盆" }
    ],
    scaffold: ["She ... and ...", "..., she ...", "Having ..., she ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列谓语（两个过去式动词用 and 连接）",
        versions: [
          "She pushed the window open and carried the flower pot in from the windowsill."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（句首现在分词）+ 简单句",
        versions: [
          "Pushing the window open, she carried the flower pot in from the windowsill."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "完成式非谓语作状语（Having done）+ 简单句",
        versions: [
          "Having pushed the window open, she carried the flower pot in from the windowsill and set it on the table."
        ]
      }
    ],
    grammarPoints: ["非谓语作状语", "时态（完成时）"],
    traps: [
      {
        zh: "她推开窗，把花盆搬了进来（写的是已经发生的事）",
        bad: "She pushes the window open and carries the flower pot in.",
        good: "She pushed the window open and carried the flower pot in.",
        why: "续写的叙述时态是过去时。中文动词没有时态标记，学生照着中文一路写下来就成了现在时；两个并列动词里只要有一个时态不对，一句话内时态来回跳，语言准确性分就丢了。"
      },
      {
        zh: "把花盆搬进来",
        bad: "She carried the flower pot come in.",
        good: "She carried the flower pot in.",
        why: "汉语的进来、出去是方向补语，英语里直接用副词 in、out、up、down 就够了，不能再加 come 或 go。写成 come in 之后一句里出现了两个谓语动词，属于硬伤。"
      }
    ],
    upgrade: [
      { basic: "opened the window", better: "pushed the window open" },
      { basic: "moved the flower pot", better: "carried the flower pot in" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/动作描写/非谓语作状语/1"
  },
  {
    id: "CONT-ACTION-0004",
    track: "读后续写",
    scene: "动作描写",
    topics: ["赶时间", "出门"],
    cn: "他套上外套，抓起钥匙，然后冲下楼梯。",
    difficulty: 2,
    difficultyWhy: "三个动作连成一串，要用并列谓语顺次排开，只用最后一项前的一个 and 收尾，并且三项时态必须一致。进阶写法是把 then 换成 before 加动名词，或用 with 结构把穿戴状态提到句首，考验的是动作主次的安排。",
    hint: "先按顺序把三个动作排出来：套上外套、抓起钥匙、冲下楼梯；中间用逗号隔开，只在最后一项前面加 and。想让句子更有层次，就把穿戴的状态用 with 提到句首，主句只留冲下楼这一个动作。",
    keyPhrases: [
      { en: "pull on his coat", zh: "套上外套" },
      { en: "grab his keys", zh: "抓起钥匙" },
      { en: "rush down the stairs", zh: "冲下楼梯" }
    ],
    scaffold: ["He ..., ... and ...", "He ... and ... before ...", "With ..., he ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列谓语（三个过去式动词顺次连接，只在最后一项前加 and）",
        versions: [
          "He pulled on his coat, grabbed his keys and rushed down the stairs."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "并列谓语 + before 介词短语（介词 + 动名词）",
        versions: [
          "He pulled on his coat and grabbed his keys before rushing down the stairs."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "with 复合结构 + 非谓语作状语（现在分词）",
        versions: [
          "With his coat on and his keys in his hand, he rushed down the stairs, taking two steps at a time."
        ]
      }
    ],
    grammarPoints: ["with 复合结构", "非谓语作状语", "介词短语"],
    traps: [
      {
        zh: "他套上外套，抓起钥匙，冲下楼梯（一整句叙述）",
        bad: "He pulls on his coat, grabbed his keys and rushes down the stairs.",
        good: "He pulled on his coat, grabbed his keys and rushed down the stairs.",
        why: "并列谓语必须时态一致。学生写到中间顺手切回现在时，一句话里既有 pulled 又有 pulls，这种一句话内时态不一致是最容易被阅卷抓到的硬伤。"
      },
      {
        zh: "他套上外套，抓起钥匙",
        bad: "He put his coat on his body and caught the keys.",
        good: "He pulled on his coat and grabbed his keys.",
        why: "两处中式表达：put on 后面不需要再说 on his body，汉语的身上是多余的；抓起钥匙用 grab 或 snatch，不能用 catch，catch 是接住飞过来的东西，和从桌上抓起来不是一回事。"
      }
    ],
    upgrade: [
      { basic: "put on his clothes very fast", better: "pulled on his coat" },
      { basic: "ran down quickly", better: "rushed down the stairs" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/动作描写/with 复合结构/2"
  },
  {
    id: "CONT-EMOTION-0003",
    track: "读后续写",
    scene: "情绪描写",
    topics: ["临场紧张", "身体反应"],
    cn: "他的手心全是汗，湿得连笔都握不住。",
    difficulty: 1,
    difficultyWhy: "内容只有两个身体反应：手心出汗、握不住笔，一个并列句就能交代完，词汇也都是课本里的常见词。难度只在搭配上：手心全是汗在英语里是 be wet with sweat，不能用 full of 硬套。",
    hint: "先写第一个身体反应：他的手心全是汗；再接上结果：连笔都握不住。两句话之间用 and 并列，或者用 so ... that 把结果接上去，动词都用过去时。",
    keyPhrases: [
      { en: "his palm was wet with sweat", zh: "手心全是汗" },
      { en: "hold his pen", zh: "握着笔" },
      { en: "slip from his fingers", zh: "从指间滑下去" }
    ],
    scaffold: ["His palm ... and he ...", "His palm was so ... that ...", "It was ... that ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（and 连接两个简单句）",
        versions: [
          "His palm was wet with sweat and he could not hold his pen."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "so ... that 引导的结果状语从句",
        versions: [
          "His palm was so wet with sweat that he could hardly hold his pen."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句（It was ... that）",
        versions: [
          "It was the sweat on his palm that made the pen slip from his fingers."
        ]
      }
    ],
    grammarPoints: ["强调句", "结果状语从句"],
    traps: [
      {
        zh: "他的手心全是汗",
        bad: "His hand was full of sweat water.",
        good: "His palm was wet with sweat.",
        why: "sweat 在英语里是不可数名词，既不加 a，也不需要再补一个 water。表示某处全是汗，习惯说 be wet with sweat；写成 full of sweat water 是把汉语的汗水和全是的逐字搬过来。"
      },
      {
        zh: "他的手心全是汗，握不住笔",
        bad: "His palm was wet with sweat, he couldn't hold his pen.",
        good: "His palm was wet with sweat, so he couldn't hold his pen.",
        why: "逗号不能连接两个各自独立的句子，这是最典型的流水句。要么加 so 或 and 把两句接起来，要么把其中一句改成分词状语，比如 With his palm wet with sweat, he could hardly hold his pen。"
      }
    ],
    upgrade: [
      { basic: "his hand was very wet", better: "his palm was wet with sweat" },
      { basic: "he couldn't hold the pen at all", better: "the pen slipped from his fingers" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/情绪描写/强调句/1"
  },
  {
    id: "CONT-EMOTION-0004",
    track: "读后续写",
    scene: "情绪描写",
    topics: ["亲情回忆", "一首老歌"],
    cn: "她的眼睛红了，因为那是爸爸常唱的歌。",
    difficulty: 2,
    difficultyWhy: "身体反应加一个 because 原因状语从句，结构不难；难点在两处：一是 because 从句的时态必须跟着主句用过去时，二是常唱的歌要用 used to sing 表达过去的习惯。L3 再把原因从句和句首分词搭配起来。",
    hint: "先写身体反应：她的眼睛红了；再用 because 说明原因：那是爸爸常唱的歌。叙的是当时的事，两个分句都要用过去时；表示过去常做某事用 used to do。",
    keyPhrases: [
      { en: "her eyes turned red", zh: "她的眼睛红了" },
      { en: "the song her father used to sing", zh: "爸爸常唱的那首歌" },
      { en: "her eyes filled with tears", zh: "她眼里涌上泪水" }
    ],
    scaffold: ["Her eyes ... because ...", "Because ..., she ... and ...", "Hearing ..., she felt ..., because ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "主句（身体反应）+ because 原因状语从句（内含定语从句）",
        versions: [
          "Her eyes turned red because it was the song her father used to sing."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "because 原因状语从句前置 + 并列主句",
        versions: [
          "Because it was the song her father used to sing, her eyes turned red and she could not say a word."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（句首现在分词）+ because 原因状语从句",
        versions: [
          "Hearing the song her father used to sing, she felt her eyes burning, because the memory came back all at once."
        ]
      }
    ],
    grammarPoints: ["状语从句", "非谓语作状语", "定语从句"],
    traps: [
      {
        zh: "她的眼睛红了，因为那是爸爸常唱的歌（写的是当时）",
        bad: "Her eyes turned red because it is the song her father often sang.",
        good: "Her eyes turned red because it was the song her father used to sing.",
        why: "主句用了过去时，because 从句也必须跟着用过去时。学生写原因时容易切回现在时，一句话里时态前后不一，是续写最常见的扣分点；常唱用 used to sing 还能顺便交代出爸爸可能已经不在唱了的意味。"
      },
      {
        zh: "她的眼睛红了（其实是快要哭出来）",
        bad: "Her eyes became hot at once.",
        good: "Her eyes filled with tears.",
        why: "汉语用热、酸来形容想哭的感觉，英语不和 eyes 这样搭配。表示眼泪要涌出来，说 her eyes filled with tears 或 tears came to her eyes，写成 become hot 是逐字翻译，英语读者不知道在说什么。"
      }
    ],
    upgrade: [
      { basic: "she was very moved", better: "her eyes filled with tears" },
      { basic: "an old song", better: "the song her father used to sing" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/情绪描写/非谓语作状语/2"
  },
  {
    id: "CONT-SCENE-0003",
    track: "读后续写",
    scene: "环境描写",
    topics: ["雪后放晴", "光线变化"],
    cn: "太阳钻出云层，雪地亮得刺眼。",
    difficulty: 2,
    difficultyWhy: "两个画面一先一后，用最简单的时间顺序并列就能写完，词汇也都在课本范围内。真正的考点是刺眼的表达——英语没有对应动词，必须换成 too ... to 或 so ... that 这类结构。",
    hint: "先写太阳钻出云层这个变化，再写雪地的反应：亮得让人看不清。两个画面用 and 并列即可；想把效果写足，就用 which 从句或 so ... that 把亮和刺眼连起来。",
    keyPhrases: [
      { en: "break through the clouds", zh: "钻出云层" },
      { en: "the snow on the ground", zh: "地上的雪" },
      { en: "too bright to look at", zh: "亮得刺眼" }
    ],
    scaffold: ["..., and ...", "..., which made ... so ... that ...", "... breaking through the clouds, ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（and 连接两个简单句）",
        versions: [
          "The sun came out from behind the clouds and the snow on the ground was bright."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（which）+ so ... that 结果状语从句",
        versions: [
          "The sun broke through the clouds, which made the snow on the ground shine so brightly that it was hard to look at."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "独立主格（The sun breaking through the clouds）+ too ... to 不定式",
        versions: [
          "The sun breaking through the clouds, the snow on the ground shone too brightly to look at."
        ]
      }
    ],
    grammarPoints: ["结果状语从句", "非限制性定语从句", "独立主格"],
    traps: [
      {
        zh: "太阳钻出云层，雪地很亮",
        bad: "The sun came out, the snow was very bright.",
        good: "The sun came out and the snow on the ground was very bright.",
        why: "逗号不能连接两个各自独立的句子。写景时学生最爱用逗号把画面一路排下去，正确做法是用 and、分号，或者把其中一个画面降为从句、分词。"
      },
      {
        zh: "雪地亮得刺眼",
        bad: "The snow was bright to hurt eyes.",
        good: "The snow was too bright to look at.",
        why: "刺眼在英语里不是一个动词，而是亮到没法看的意思，要用 too ... to 结构或 so ... that 从句来表达。把刺直接译成 hurt 再接 eyes，就成了英语里不存在的搭配。"
      }
    ],
    upgrade: [
      { basic: "the sun appeared", better: "the sun broke through the clouds" },
      { basic: "very bright", better: "too bright to look at" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/环境描写/独立主格/2"
  },
  {
    id: "CONT-SCENE-0004",
    track: "读后续写",
    scene: "环境描写",
    topics: ["夜晚车站", "孤独等待"],
    cn: "路灯一盏盏亮起，雨丝在灯光里飘，他站在空荡荡的站台上，觉得这个夜晚格外长。",
    difficulty: 3,
    difficultyWhy: "环境不能只是背景，要托住夜晚格外长这种主观感受。三个画面得靠非谓语和定语从句拴在同一个主句上，还要让过去时和过去进行时搭配得当；一旦写成四个并列短句，画面就散了，情绪也托不住。",
    hint: "先把两个最亮的画面写出来：路灯一盏盏亮起、雨在灯光里飘；再把独自站在空站台上作为主句，最后用 which 从句点出夜晚显得更长这个感受，让环境落到心情上。",
    keyPhrases: [
      { en: "come on one by one", zh: "一盏盏亮起" },
      { en: "drift in the light", zh: "在灯光里飘" },
      { en: "stand alone on the empty platform", zh: "独自站在空荡荡的站台上" },
      { en: "much longer than usual", zh: "比平时长得多" }
    ],
    scaffold: ["..., and ... as ...", "As ..., ... and ...", "Standing ..., he watched ..., which ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句 + as 时间状语从句（过去进行时）",
        versions: [
          "The street lights came on one by one and the rain was falling as he stood alone on the empty platform."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "as 时间状语从句前置 + 并列主句（含宾语从句）",
        versions: [
          "As the street lights came on one by one, the rain drifted in the light and he felt the night was much longer than usual."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（句首现在分词）+ 非限制性定语从句",
        versions: [
          "Standing alone on the empty platform, he watched the rain drifting in the light of the street lamps, which made the night seem even longer."
        ]
      }
    ],
    grammarPoints: ["非谓语作状语", "非限制性定语从句", "时态（过去进行）"],
    traps: [
      {
        zh: "雨丝在灯光里飘",
        bad: "The rain silk floated in the light.",
        good: "The rain drifted in the light.",
        why: "汉语的雨丝是形象说法，英语里没有 rain silk 这个词。直接说 the rain 或 the drizzle，配 drift、fall 这类动词就够了，硬译成 silk 读者完全看不懂。"
      },
      {
        zh: "路灯一盏盏亮起，雨在灯光里飘（写景段）",
        bad: "The street lights come on one by one and the rain is falling.",
        good: "The street lights came on one by one and the rain was falling.",
        why: "续写的叙述时态是过去时；描写当时正在进行的画面用过去进行时。写景段最容易整段滑到现在时，一带就是一片错误。"
      }
    ],
    upgrade: [
      { basic: "the lights turned on", better: "the street lights came on one by one" },
      { basic: "a very long night", better: "the night seemed even longer" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/环境描写/非谓语作状语/3"
  },
  {
    id: "CONT-MIND-0003",
    track: "读后续写",
    scene: "心理描写",
    topics: ["两难抉择", "一封信"],
    cn: "他把信捏在手里翻来覆去，指尖停在封口上：到底要不要拆开。",
    difficulty: 3,
    difficultyWhy: "核心是 whether 从句。汉语的要……不要……一进英语就必须改成陈述语序的从句，还要和 or 搭配完整写出两难；L3 更要把整个 whether 从句提到句首作主语，语序一变，学生就很容易写错。",
    hint: "先写手上的动作：他把信捏在手里翻来覆去；再把心里的两难写成一个 whether 从句——要不要拆开，还是干脆收起来。想拿高分，就把这个从句整体提到句首当主语。",
    keyPhrases: [
      { en: "turn the letter over and over in his hand", zh: "把信捏在手里翻来覆去" },
      { en: "whether he should open it or put it away", zh: "要不要拆开还是收起来" },
      { en: "the sealed letter", zh: "那封封好的信" },
      { en: "could not decide", zh: "拿不定主意" }
    ],
    scaffold: ["He ..., wondering whether ...", "Turning ..., he could not decide whether ... or ...", "Whether ... was a question he could not answer."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "简单句 + whether 引导的宾语从句",
        versions: [
          "He held the letter in his hand and wondered whether he should open it."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（句首现在分词）+ whether ... or ... 不定式宾语",
        versions: [
          "Turning the letter over and over in his hand, he could not decide whether to open it or put it away."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "主语从句（Whether ... was ...）+ 定语从句",
        versions: [
          "Whether he should open the letter or put it away was a question he could not answer."
        ]
      }
    ],
    grammarPoints: ["宾语从句", "主语从句", "非谓语作状语"],
    traps: [
      {
        zh: "他想着要不要拆开这封信",
        bad: "He wondered should he open the letter.",
        good: "He wondered whether he should open the letter.",
        why: "疑问句不能原样塞进句子里作宾语。whether 或 if 引导的宾语从句必须用陈述语序，把助动词放回主语后面，并把句末的问号改成句号。"
      },
      {
        zh: "要不要拆开，他拿不定主意",
        bad: "Whether to open the letter or not, he couldn't decide it.",
        good: "He could not decide whether to open the letter or not.",
        why: "whether 加不定式可以作 decide 的宾语，但不能悬在句首再另起一个主句；另外 decide 后面已经有宾语从句或不定式，句尾不能再补一个 it 重复宾语。"
      }
    ],
    upgrade: [
      { basic: "he thought about it a lot", better: "he turned the letter over and over in his hand" },
      { basic: "he didn't know what to do", better: "he could not decide whether to open it or put it away" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/心理描写/主语从句/3"
  },
  {
    id: "CONT-MIND-0004",
    track: "读后续写",
    scene: "心理描写",
    topics: ["内心挣扎", "进退两难"],
    cn: "他一遍遍告诉自己该转身离开，可脚像钉在地上一样，怎么也迈不出那一步。",
    difficulty: 4,
    difficultyWhy: "要写出想走却走不动的撕扯：前面是反复的自我劝说，后面是不受控制的脚步。让步从句负责压住前一半，强调句把僵住的脚顶出来当焦点，还要处理像……一样这种比喻说法在英语里必须用 seem 或 as if 来标记。",
    hint: "先写自我劝说：他一遍遍告诉自己该转身离开；再用转折接出身体的抗拒——脚像钉在地上，怎么也迈不动。像……一样不是真的被钉住，要用 seem 或 as if 表示好像。",
    keyPhrases: [
      { en: "tell oneself again and again", zh: "一遍遍告诉自己" },
      { en: "turn and leave", zh: "转身离开" },
      { en: "be nailed to the ground", zh: "像钉在地上一样" },
      { en: "move one's feet", zh: "迈开脚步" }
    ],
    scaffold: ["He told himself that ..., but ...", "Although ..., he could not ..., as if ...", "However hard ..., it was ... that ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句 + but 并列句",
        versions: [
          "He told himself again and again that he should turn and leave, but his feet seemed nailed to the ground."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "Although 让步状语从句 + as if 方式状语从句",
        versions: [
          "Although he kept telling himself to turn and leave, he could not move his feet, as if they were nailed to the ground."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "However 引导的让步状语从句 + 强调句（It was ... that）",
        versions: [
          "However hard he tried to turn and leave, it was his own feet that would not move, as if they were nailed to the ground."
        ]
      }
    ],
    grammarPoints: ["让步状语从句", "强调句", "宾语从句"],
    traps: [
      {
        zh: "他告诉自己该离开，可脚像钉在地上",
        bad: "He told himself that he should leave, his feet were nailed to the ground.",
        good: "He told himself that he should leave, but his feet seemed nailed to the ground.",
        why: "逗号不能连接两个各自独立的句子；这里前后是转折关系，要用 but 或 yet，也可以把后半句改成独立主格 his feet seeming nailed to the ground。"
      },
      {
        zh: "脚像钉在地上一样",
        bad: "His feet were nailed on the ground by something.",
        good: "His feet seemed nailed to the ground.",
        why: "汉语的像……一样是比喻，不是真的被钉住，英语要用 seem、as if 或 as though 才能把这层好像写出来；介词也是固定的 to，be nailed to the ground 不能换成 on。"
      }
    ],
    upgrade: [
      { basic: "he thought again and again", better: "he told himself again and again" },
      { basic: "he could not move at all", better: "he could not move his feet, as if they were nailed to the ground" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/心理描写/强调句/4"
  },
  {
    id: "CONT-DIALOGUE-0005",
    track: "读后续写",
    scene: "对话描写",
    topics: ["道歉", "被打断"],
    cn: "他张了张嘴，声音抖得厉害：我……我不是故意的——话没说完，她已经转身走了。",
    difficulty: 5,
    difficultyWhy: "五个难点叠在一句里：省略号写停顿、破折号写被打断、引语被中断后说话人的位置、声音发抖不能写成 his voice said、还要用倒装把最失控的那一刻顶出来。标点或主语错位一处就会掉档。",
    hint: "先写动作和声音：他张了张嘴、声音抖得厉害；再把那半句话放进引号——停顿用省略号，没说完就用破折号收住，引语后面不要再加句号。最后可以另起一句，用 Never 开头的倒装写出他此刻的无力。",
    keyPhrases: [
      { en: "in a shaking voice", zh: "声音发抖地" },
      { en: "not mean to do sth", zh: "不是故意做某事" },
      { en: "cut sb short", zh: "打断某人" },
      { en: "turn and walk away", zh: "转身走了" }
    ],
    scaffold: ["He ... and said in a shaking voice, \"...\"", "\"...\" he began, his voice shaking, but ...", "\"...\" Never had he felt so ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列谓语 + 直接引语（省略号写停顿，破折号写被打断）",
        versions: [
          "He opened his mouth and said in a shaking voice, \"I... I didn't mean to\u2014\" but she had already turned away."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "直接引语前置（被破折号打断）+ 独立主格 + before 时间状语从句",
        versions: [
          "\"I... I didn't mean to\u2014\" he began, his voice shaking, but she turned and walked away before he could finish."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "被打断的直接引语 + Never 引导的部分倒装 + 非谓语作状语",
        versions: [
          "He opened his mouth, but only a shaking whisper came out. \"I... I didn't mean to\u2014\" Never had he felt so helpless as he watched her walk away."
        ]
      }
    ],
    grammarPoints: ["倒装句", "独立主格", "非谓语作状语"],
    traps: [
      {
        zh: "话没说完就被打断的引语，末尾的标点",
        bad: "\"I... I didn't mean to.\" he said, shaking.",
        good: "\"I... I didn't mean to\u2014\" he said, his voice shaking.",
        why: "话没说完要用破折号收住引语，不能写句号，否则读者以为他说完了；引语后面跟说话人时也不能用句号断开，要么用逗号写在引号里面，要么在破折号处停住、让说话人直接跟上。"
      },
      {
        zh: "声音抖得厉害",
        bad: "He opened his mouth, his voice shaking, and his voice said, \"...\"",
        good: "He opened his mouth and said in a shaking voice, \"...\"",
        why: "汉语说声音发抖，发抖的是声音，说话的是人。英语里主语必须是人，写成 his voice said 就是主语错位；正确的写法是 he said in a shaking voice，或者用独立主格 his voice shaking 挂在句子后面补充状态。"
      }
    ],
    upgrade: [
      { basic: "he said very quietly", better: "he said in a shaking voice" },
      { basic: "she left quickly", better: "she turned and walked away" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/对话描写/倒装句/5"
  },
  {
    id: "CONT-PLOT-0003",
    track: "读后续写",
    scene: "情节转折",
    topics: ["意外发现", "绝处逢生"],
    cn: "他绝望地把那个空信封揉成一团，就在这时，一张折好的纸条从里面滑了出来。",
    difficulty: 5,
    difficultyWhy: "反转要落在一瞬间：前面的绝望越足，纸条滑出来才越有冲击力。Hardly 置于句首的部分倒装是高分点，也是高频错点；就在这时不能直译成 at this time，空信封和纸条的逻辑还要靠 from inside 这类小词交代清楚。",
    hint: "先写动作和情绪：他绝望地把空信封揉成一团；再把纸条滑出来作为反转点，用 when 把两件事咬在一起。想加分就让 Hardly 落在句首，主句用部分倒装，把 had 提到主语前面。",
    keyPhrases: [
      { en: "crumple the envelope", zh: "把信封揉成一团" },
      { en: "in despair", zh: "绝望地" },
      { en: "a folded note", zh: "一张折好的纸条" },
      { en: "slip out onto the floor", zh: "滑落到地上" }
    ],
    scaffold: ["He ... in despair, and ...", "Crumpling ..., he was about to ... when ...", "Hardly had ... when ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（and 连接两个简单句）",
        versions: [
          "He crumpled the empty envelope in despair, and a folded note slipped out of it."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（句首现在分词）+ be about to ... when 句型",
        versions: [
          "Crumpling the empty envelope in despair, he was about to throw it away when a folded note slipped out."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "Hardly ... when 部分倒装 + 定语从句",
        versions: [
          "Hardly had he crumpled the empty envelope in despair when a folded note he had never noticed fell out onto the floor."
        ]
      }
    ],
    grammarPoints: ["倒装句", "定语从句", "非谓语作状语"],
    traps: [
      {
        zh: "他刚把信封揉成一团，纸条就掉了出来",
        bad: "Hardly he had crumpled the envelope when a note fell out.",
        good: "Hardly had he crumpled the envelope when a note fell out.",
        why: "hardly 置于句首时主句要部分倒装，把 had 提到主语前面；写成 Hardly he had 就丢掉了倒装。另外 hardly 要和 when 搭配，表示一……就……，不能用 than。"
      },
      {
        zh: "他绝望地揉信封，纸条突然滑了出来",
        bad: "He crumpled the envelope with despair, and a note came out suddenly.",
        good: "He crumpled the envelope in despair, and a folded note slipped out.",
        why: "表示处于某种情绪之中要用 in 加情绪名词，比如 in despair、in anger、in surprise；with 一般接表情或随身状态，比如 with a smile。另外滑出来说 slip out 更准，也比 come out suddenly 简洁。"
      }
    ],
    upgrade: [
      { basic: "he was very hopeless", better: "in despair" },
      { basic: "a piece of paper came out", better: "a folded note slipped out" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/情节转折/倒装句/5"
  }
);
