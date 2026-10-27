// data/bank-seed-cont.js
// 读后续写专项种子题 12 道：动作 / 情绪 / 环境 / 心理 / 对话 / 情节转折，每场景 2 题
// 契约见 docs/DATA_SPEC.md v1
window.SF_BANK = window.SF_BANK || [];
window.SF_BANK.push(
  {
    id: "CONT-ACTION-0001",
    track: "读后续写",
    scene: "动作描写",
    topics: ["突发场面", "雨天"],
    cn: "门刚一开，他就一头冲进雨里，头也不回，书包在背后一下下撞着他的背。",
    difficulty: 3,
    difficultyWhy: "四个连续动作要挤进一个句子，必须分清主次：主句用并列谓语，其余细节用分词或 with 结构挂在后面。学生容易写成 and 连成的流水句，或者前半句用过去时、后半句又滑到现在时。",
    hint: "先搭主干：门一开，他冲进雨里；再把头也不回、书包撞背这两处细节改成修饰成分接在主干后面，不要另起一句。",
    keyPhrases: [
      { en: "push the door open", zh: "把门推开" },
      { en: "rush into the rain", zh: "冲进雨里" },
      { en: "without looking back", zh: "头也不回" },
      { en: "bump against his back", zh: "一下下撞着他的背" }
    ],
    scaffold: ["As soon as ..., he ... and ...", "Pushing the door open, he ...", "Never did he ..., with ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "as soon as 引导的时间状语从句 + 并列谓语",
        versions: [
          "As soon as the door opened, he rushed into the rain and did not look back."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（句首现在分词）+ 独立主格",
        versions: [
          "Pushing the door open, he dashed into the rain, his schoolbag bumping against his back."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "Never 引导的部分倒装 + with 复合结构",
        versions: [
          "Never did he look back as he dashed into the rain, with his schoolbag swinging against his back."
        ]
      }
    ],
    grammarPoints: ["非谓语作状语", "独立主格", "with 复合结构"],
    traps: [
      {
        zh: "他冲进雨里，头也不回（写的是已经发生的事）",
        bad: "He rushes into the rain and does not look back.",
        good: "He rushed into the rain and did not look back.",
        why: "续写正文的叙述时态是过去时。中文动词没有时态标记，很多学生照着中文一口气写下来，就把整句写成了现在时，一段之内时态来回跳会直接扣语言准确性分。"
      },
      {
        zh: "门刚一开，他就冲了出去",
        bad: "The door just opened, he rushed out.",
        good: "As soon as the door opened, he rushed out.",
        why: "逗号不能连接两个各自独立的句子，这是最典型的流水句错误。要么用 as soon as 把前一半降为从句，要么用句号断开，或者用 and 并列。"
      }
    ],
    upgrade: [
      { basic: "ran very fast", better: "dashed / rushed" },
      { basic: "did not look back at all", better: "never looked back" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/动作描写/非谓语作状语/3"
  },
  {
    id: "CONT-ACTION-0002",
    track: "读后续写",
    scene: "动作描写",
    topics: ["旧屋探索", "紧张氛围"],
    cn: "他猛地推开那扇旧木门，门轴发出一声长长的吱呀声，灰尘簌簌从门框上落下来。",
    difficulty: 4,
    difficultyWhy: "难点不在动词本身，而在于让环境回应动作：一个动作带出两个环境反应，需要用非限制性定语从句或 with 结构把三个画面缝在一起，还要处理不及物动词不能被动、拟声词不能硬造这些坑。",
    hint: "先写主句动作：他推开那扇旧木门；再让环境接住这个动作，吱呀声和落下的灰尘都用修饰成分挂在后面，不要写成三个平行的短句。",
    keyPhrases: [
      { en: "push the old wooden door open", zh: "推开那扇旧木门" },
      { en: "give a long creak", zh: "发出一声长长的吱呀声" },
      { en: "fall from the door frame", zh: "从门框上落下来" },
      { en: "break the silence", zh: "打破寂静" }
    ],
    scaffold: ["When he pushed ... open, ... and ...", "Pushing ... open, he heard ..., which ...", "Only when ... did ..., with ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "when 引导的时间状语从句 + 并列句",
        versions: [
          "When he pushed the old wooden door open, he heard a long creak and dust fell from the frame."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（句首现在分词）+ 非限制性定语从句",
        versions: [
          "Pushing the old wooden door open, he heard a long creak, which sent dust falling from the frame."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "Only 引导的部分倒装 + with 复合结构",
        versions: [
          "Only when he pushed the old wooden door open did the long creak break the silence, with dust falling from the frame."
        ]
      }
    ],
    grammarPoints: ["非限制性定语从句", "倒装句", "with 复合结构"],
    traps: [
      {
        zh: "灰尘从门框上落下来",
        bad: "The dust was fallen from the frame.",
        good: "The dust fell from the frame.",
        why: "fall 是不及物动词，没有被动语态。学生看到中文里灰尘是被震下来的，就顺手写成 be done 形式，其实这里只能主动表达。"
      },
      {
        zh: "门发出一声长长的吱呀声",
        bad: "The door sent out a creak sound.",
        good: "The door gave a long creak.",
        why: "两个问题：表示发出声音，英语习惯说 give a creak 或 let out a creak，不用 send out；另外 creak 本身就是吱呀声，后面再加 sound 属于重复。"
      }
    ],
    upgrade: [
      { basic: "a very loud sound", better: "a long creak" },
      { basic: "pushed it hard", better: "pushed it open with a shove" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/动作描写/倒装句/4"
  },
  {
    id: "CONT-EMOTION-0001",
    track: "读后续写",
    scene: "情绪描写",
    topics: ["课堂被点名", "害羞"],
    cn: "听到有人叫自己的名字，她的脸一下子红了，心咚咚直跳，手指一直绞着衣角。",
    difficulty: 2,
    difficultyWhy: "结构本身不难，一个时间状语从句加并列句就能写完；难点在词汇选择上——脸红、心跳、绞衣角都要用英语里固定的搭配，不能用中文拟声词或形容词硬套。",
    hint: "先写触发点：听到有人叫她的名字；再把情绪化成三个看得见的身体反应——脸红、心跳、绞衣角，按先后顺序往下排。",
    keyPhrases: [
      { en: "hear one's name called", zh: "听到有人叫自己的名字" },
      { en: "her face turned red", zh: "她的脸红了" },
      { en: "her heart pounding", zh: "心咚咚直跳" },
      { en: "twist the corner of her coat", zh: "绞着衣角" }
    ],
    scaffold: ["When she heard ..., her face ... and her heart ...", "Hearing ..., she felt ...", "With her face ... and her heart ..., she ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "when 引导的时间状语从句 + 并列句",
        versions: [
          "When she heard her name called, her face turned red and her heart beat fast."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（句首现在分词）+ 复合宾语（feel + 宾语 + doing）",
        versions: [
          "Hearing her name called, she felt her face burning and her fingers twisting the corner of her coat."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "with 复合结构 + 形容词短语作状语",
        versions: [
          "With her face burning and her heart pounding, she twisted the corner of her coat, too nervous to speak."
        ]
      }
    ],
    grammarPoints: ["with 复合结构", "非谓语作状语", "状语从句"],
    traps: [
      {
        zh: "心咚咚直跳",
        bad: "Her heart jumped dong dong.",
        good: "Her heart was pounding.",
        why: "中文的拟声词不能音译成英文。英语用 pound / beat fast / race 这类动词表示心跳得厉害，写成 dong dong 之后整句就不是英语了。"
      },
      {
        zh: "她的脸一下子红了",
        bad: "Her face turned to red at once.",
        good: "Her face turned red at once.",
        why: "turn 作系动词时后面直接接形容词，不能加介词 to。学生按中文的变成红色逐字搬，就会多写一个 to。"
      }
    ],
    upgrade: [
      { basic: "she was very nervous", better: "her heart was pounding" },
      { basic: "her face got red", better: "her face burning" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/情绪描写/with 复合结构/2"
  },
  {
    id: "CONT-EMOTION-0002",
    track: "读后续写",
    scene: "情绪描写",
    topics: ["考试紧张", "强作镇定"],
    cn: "他努力让声音保持平稳，可手心里的汗已经把那张纸条浸软，指尖抖个不停。",
    difficulty: 5,
    difficultyWhy: "要同时处理三层信息：表面上的控制、掌心的汗这个细节、指尖的失控，还要用强调句把最想突出的那一点顶到句首，并让让步从句的时态和主句一致。写不好就会变成三个短句的流水账。",
    hint: "先立起反差：表面上他努力让声音平稳；再用两个身体细节打破它——汗把纸条浸软、指尖一直抖。注意努力和让都要用过去时，保持和叙述时态一致。",
    keyPhrases: [
      { en: "keep one's voice steady", zh: "让声音保持平稳" },
      { en: "the sweat in his palm", zh: "手心里的汗" },
      { en: "soften the note", zh: "把纸条浸软" },
      { en: "keep trembling", zh: "抖个不停" }
    ],
    scaffold: ["Although he tried to ..., ... and ...", "Trying hard to ..., he could feel ...", "It was ... that ..., though ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "although 引导的让步状语从句 + 并列句",
        versions: [
          "Although he tried to keep his voice steady, his palm was wet with sweat and his fingers kept trembling."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（句首现在分词）+ 复合宾语（feel + 宾语 + doing）",
        versions: [
          "Trying hard to keep his voice steady, he could feel the sweat in his palm softening the note in his hand."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句（It was ... that）+ 让步状语从句",
        versions: [
          "It was his trembling fingers that gave him away, though his voice stayed steady and the sweat had softened the note in his palm."
        ]
      }
    ],
    grammarPoints: ["强调句", "让步状语从句", "非谓语作状语"],
    traps: [
      {
        zh: "指尖抖个不停",
        bad: "His fingers were always trembling.",
        good: "His fingers wouldn't stop trembling.",
        why: "always 表示总是、一向，说的是长期习惯；这里写的是此刻控制不住的连续动作，应该用 kept trembling 或 would not stop trembling。"
      },
      {
        zh: "努力让声音保持平稳",
        bad: "He tried to let his voice keep steady.",
        good: "He tried to keep his voice steady.",
        why: "let 的意思是允许，不表示努力使某事保持；而且 keep 后接形容词时前面必须有自己的宾语，写成 keep his voice steady 才对。"
      }
    ],
    upgrade: [
      { basic: "he was very calm outside", better: "he kept his voice steady" },
      { basic: "he shook a lot", better: "he kept trembling" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/情绪描写/强调句/5"
  },
  {
    id: "CONT-SCENE-0001",
    track: "读后续写",
    scene: "环境描写",
    topics: ["乡间清晨", "安静氛围"],
    cn: "天刚蒙蒙亮，雾气贴着地面慢慢移动，远处传来一两声狗叫，草叶上挂满了露水。",
    difficulty: 3,
    difficultyWhy: "四个画面要按由近到远的顺序铺开，还要选对动词——雾用 creep 这类拟人动词才生动，而传来在英语里没有主语，必须重新找主语。句子一长，学生就爱用逗号一路连下去。",
    hint: "先把时间点立住：天刚蒙蒙亮；再按由近到远排画面——雾、狗叫、露水。后面三个画面用从句或 with 结构挂在主干上，别写成四个并列短句。",
    keyPhrases: [
      { en: "at dawn", zh: "天刚蒙蒙亮" },
      { en: "the fog crept along the ground", zh: "雾气贴着地面移动" },
      { en: "a dog barked far away", zh: "远处传来狗叫" },
      { en: "dew drops hung on the grass", zh: "草叶上挂着露水" }
    ],
    scaffold: ["It was ..., and ..., while ...", "At dawn, ..., where ...", "With ... , the fog ..., dew drops ... and a dog ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "it 句型 + 并列句 + while 时间状语从句",
        versions: [
          "It was just dawn, and the fog moved slowly over the ground while a dog barked in the distance."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非限制性定语从句（where）+ 并列句",
        versions: [
          "At dawn, the fog crept slowly along the ground, where dew drops hung heavily on the grass and a dog barked far away."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "with 复合结构 + 独立主格",
        versions: [
          "With dawn just breaking, the fog crept low along the ground, dew drops hanging heavily on the grass and a dog barking far away."
        ]
      }
    ],
    grammarPoints: ["独立主格", "with 复合结构", "非限制性定语从句"],
    traps: [
      {
        zh: "天刚蒙蒙亮",
        bad: "The sky just bright bright.",
        good: "The day was just breaking.",
        why: "中文口语里的叠词不能逐字翻译，英语里用 at dawn、at first light 或 the day was just breaking 表示天刚亮，写成 bright bright 完全不成句。"
      },
      {
        zh: "远处传来一两声狗叫",
        bad: "Far away sent one or two dog barks.",
        good: "A dog barked far away.",
        why: "中文的传来是没有主语的，英语句子必须有主语。要把真正做事的东西找出来当主语，比如 a dog barked far away 或 the sound of a dog barking came from the distance。"
      }
    ],
    upgrade: [
      { basic: "it was very foggy", better: "the fog crept low over the ground" },
      { basic: "there was a lot of dew", better: "dew drops hung heavily" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/环境描写/with 复合结构/3"
  },
  {
    id: "CONT-SCENE-0002",
    track: "读后续写",
    scene: "环境描写",
    topics: ["暴风雨夜", "独自一人"],
    cn: "风把窗子吹得哐当作响，灯忽明忽暗，他一个人坐着，觉得整间屋子都在晃。",
    difficulty: 4,
    difficultyWhy: "要写出环境对心情的烘托，就得让风、灯两个画面都动起来，并且用倒装把屋子在晃这种主观错觉推到最前面。忽明忽暗、哐当作响在英语里都没有现成对应词，必须换成 flicker 和 rattle。",
    hint: "先写风对窗子的作用：风把窗子吹得哐当作响；再补灯的变化和他一个人的状态；最后把屋子在晃这个主观感受单独收一句，可以用否定词提前的倒装来加重语气。",
    keyPhrases: [
      { en: "make the window rattle", zh: "把窗子吹得哐当作响" },
      { en: "the light flickered", zh: "灯忽明忽暗" },
      { en: "sit there alone", zh: "一个人坐着" },
      { en: "feel unsteady", zh: "觉得在晃" }
    ],
    scaffold: ["The wind ..., and the light ..., while he ...", "Shaking ..., the wind made ... as he ...", "Never had ..., with ... and ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句 + while 时间状语从句",
        versions: [
          "The wind made the window rattle and the light kept going on and off while he sat there alone."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（句首现在分词）+ as 时间状语从句",
        versions: [
          "Shaking the window with a loud rattle, the wind made the light flicker on and off as he sat there alone."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "Never 引导的部分倒装 + with 复合结构",
        versions: [
          "Never had the room felt so unsteady, with the wind rattling the window and the light flickering above his head."
        ]
      }
    ],
    grammarPoints: ["倒装句", "with 复合结构", "非谓语作状语"],
    traps: [
      {
        zh: "灯忽明忽暗",
        bad: "The light was bright and dark.",
        good: "The light flickered on and off.",
        why: "bright 和 dark 是形容词，只能说明状态，写不出一亮一暗的变化过程。英语里这种忽明忽暗用 flicker 或 keep going on and off 表达。"
      },
      {
        zh: "风把窗子吹得哐当作响",
        bad: "The wind blowed the window and made kuangdang sound.",
        good: "The wind rattled the window.",
        why: "三处错：blow 的过去式是 blew，不是 blowed；拟声词不能音译；哐当作响在英语里就是 rattle 一个词，不需要再造一个声音名词出来。"
      }
    ],
    upgrade: [
      { basic: "it was very noisy", better: "with a loud rattle" },
      { basic: "the light changed", better: "the light flickered" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/环境描写/倒装句/4"
  },
  {
    id: "CONT-MIND-0001",
    track: "读后续写",
    scene: "心理描写",
    topics: ["勇气与犹豫", "内心冲突"],
    cn: "他站在那里，反复问自己：要不要走上前去，万一被拒绝，又该怎么办。",
    difficulty: 3,
    difficultyWhy: "中文里要不要和怎么办都是疑问的说法，一进英语就必须改成陈述语序的从句，还要处理万一被拒绝时的时态呼应。写成两个疑问句直接拼在一起是最常见的错法。",
    hint: "先搭主干：他站在那里反复问自己；再把两个问题变成从句——要不要走上前去、被拒绝了怎么办。从句里一律用陈述语序，时态跟着主句走。",
    keyPhrases: [
      { en: "ask oneself again and again", zh: "反复问自己" },
      { en: "step forward to her", zh: "走上前去" },
      { en: "be refused", zh: "被拒绝" },
      { en: "what he should do", zh: "该怎么办" }
    ],
    scaffold: ["He stood there and asked himself if ...", "As he stood there, the question ... was whether ...", "Never before had he ..., wondering whether ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "简单句 + 宾语从句（if 引导）",
        versions: [
          "He stood there and asked himself if he should step forward to her."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "as 时间状语从句 + 定语从句 + 表语从句",
        versions: [
          "As he stood there, the question that kept running through his mind was whether he should step forward, and what he should do if she refused him."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "Never 引导的部分倒装 + 非谓语作状语",
        versions: [
          "Never before had he felt so unsure of himself as he stood there, wondering whether he should step forward or turn away."
        ]
      }
    ],
    grammarPoints: ["倒装句", "非谓语作状语", "表语从句"],
    traps: [
      {
        zh: "要不要走上前去",
        bad: "He did not know should he walk up to her.",
        good: "He did not know whether he should walk up to her.",
        why: "疑问句不能原样塞进句子里作宾语。宾语从句必须用陈述语序，把助动词放回主语后面，并且用 whether 或 if 引导。"
      },
      {
        zh: "万一被拒绝怎么办",
        bad: "What to do if she refuses him.",
        good: "He wondered what he would do if she refused him.",
        why: "疑问词加不定式不能单独充当从句，写成 What to do 就不是一个完整句子了；另外续写的叙述是过去时，条件句里也要跟着用过去时 refused 和过去将来时 would do。"
      }
    ],
    upgrade: [
      { basic: "he thought a lot", better: "the question kept running through his mind" },
      { basic: "he was very afraid", better: "he felt unsure of himself" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/心理描写/倒装句/3"
  },
  {
    id: "CONT-MIND-0002",
    track: "读后续写",
    scene: "心理描写",
    topics: ["亲情回忆", "离别"],
    cn: "他忽然想起三年前母亲也是这样站在门口看他离开，于是咬了咬牙，把刚到嘴边的话咽了回去。",
    difficulty: 5,
    difficultyWhy: "句子里有两个时间层：三年前的回忆和此刻的反应。回忆部分要用过去完成时，时间状语也要从 three years ago 换成 three years before；还要用强调句把这段回忆顶到句首，作为他改变主意的原因。",
    hint: "先点出回忆：他想起三年前母亲站在门口看他离开；再写现在的反应——咬牙、把话咽回去。回忆里的动作比主句更早，要用过去完成时；三年前要说 three years before。",
    keyPhrases: [
      { en: "his mother's eyes at the door", zh: "母亲站在门口的眼神" },
      { en: "three years before", zh: "三年前（相对过去而言）" },
      { en: "bite his lip", zh: "咬了咬牙" },
      { en: "swallow the words", zh: "把话咽回去" }
    ],
    scaffold: ["He suddenly remembered that ..., so ...", "Remembering how ..., he swallowed ...", "It was ... that made him ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "宾语从句（过去完成时）+ so 结果并列句",
        versions: [
          "He suddenly remembered that his mother had stood at the door watching him leave three years before, so he bit his lip and said nothing."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（句首现在分词）+ 定语从句（省略关系代词）",
        versions: [
          "Remembering how his mother had stood at the door three years before, he swallowed the words he was about to say."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句（It was ... that）+ 定语从句",
        versions: [
          "It was his mother's eyes at the door three years before, watching him leave, that made him bite his lip and swallow the words he was about to say."
        ]
      }
    ],
    grammarPoints: ["强调句", "非谓语作状语", "时态（完成时）"],
    traps: [
      {
        zh: "他想起三年前母亲站在门口",
        bad: "He remembered that his mother stood at the door three years ago.",
        good: "He remembered that his mother had stood at the door three years before.",
        why: "两处要改：一是回忆里的动作比主句 remembered 更早，必须用过去完成时 had stood；二是主句已经是过去时，时间参照点也跟着后移，three years ago 要改成 three years before。"
      },
      {
        zh: "把话咽了回去",
        bad: "He swallowed his words back into his stomach.",
        good: "He swallowed the words he was about to say.",
        why: "中文习惯说咽回肚子里，英语里没有这个搭配。直接说 swallow the words 或 hold back the words 就够了，加 into his stomach 反而不像英语。"
      }
    ],
    upgrade: [
      { basic: "he was very sad", better: "his throat tightened" },
      { basic: "he said nothing", better: "he swallowed the words" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/心理描写/强调句/5"
  },
  {
    id: "CONT-DIALOGUE-0001",
    track: "读后续写",
    scene: "对话描写",
    topics: ["道歉与坦诚", "朋友之间"],
    cn: "她低下头，不敢看他的眼睛，小声说：对不起，我不该瞒着你。",
    difficulty: 2,
    difficultyWhy: "结构简单，一个并列谓语加直接引语就能交代清楚。难点在标点和时态：表示用什么样的声音说要用 in a low voice 这类固定搭配，不该做而做了要用 should not have done；引语放到句首时，逗号必须写在引号里面。",
    hint: "先写说话的样子：她低下头、不敢看他的眼睛、声音很低；再把她说的话原样放进引号。引语放句末最省事，想更有画面感就把它提到句首，让说话人跟在后面。",
    keyPhrases: [
      { en: "lower one's head", zh: "低下头" },
      { en: "in a low voice", zh: "小声地" },
      { en: "keep sth from sb", zh: "瞒着某人" },
      { en: "should not have done", zh: "本不该做（却做了）" }
    ],
    scaffold: ["She lowered her head and said in a low voice, \"...\"", "\"...\", she whispered, lowering her head.", "It was with ... that she whispered, \"...\""],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列谓语 + 直接引语（引语置于句末）",
        versions: [
          "She lowered her head and said in a low voice, \"I am sorry that I hid it from you.\""
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "直接引语前置 + 非谓语作状语（现在分词）",
        versions: [
          "\"I should not have kept it from you,\" she whispered, lowering her head."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句（It was ... that）+ 直接引语",
        versions: [
          "It was with her head lowered that she whispered, \"I should not have kept the truth from you.\""
        ]
      }
    ],
    grammarPoints: ["强调句", "宾语从句", "非谓语作状语"],
    traps: [
      {
        zh: "小声说",
        bad: "She said with a low voice.",
        good: "She said in a low voice.",
        why: "表示用什么样的声音说，介词要用 in，也就是 in a low voice 或 in a whisper，不能用 with。但 with 后面接表情名词是对的，比如 with a smile，所以关键是记住搭配，而不是一律避开 with。"
      },
      {
        zh: "我不该瞒着你（引语放句首）",
        bad: "\"I should not hide it from you\". she whispered.",
        good: "\"I should not have kept it from you,\" she whispered.",
        why: "两处都要改：一是已经做过的事，表示本不该做要用 should not have done，不能只写 should not do；二是引语放在句首时，引语末尾的句号要改成逗号，而且这个逗号必须写在引号里面，整句的句号留到最后一个词后面。"
      }
    ],
    upgrade: [
      { basic: "she said very quietly", better: "she whispered" },
      { basic: "I am very sorry", better: "I should not have kept it from you" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/对话描写/强调句/2"
  },
  {
    id: "CONT-DIALOGUE-0002",
    track: "读后续写",
    scene: "对话描写",
    topics: ["争执与解释", "坚持等待"],
    cn: "他打断她，声音一下子高了起来：我等这一天，已经等了整整五年了。",
    difficulty: 4,
    difficultyWhy: "要把打断和音量升高这两个动作写得连贯，还要让直接引语的标点位置正确——引语放在句首时，逗号得写在引号里面。等了五年这层时间关系要用完成时，高分句可以用 Only then 提前的倒装把动作顶到句首。",
    hint: "先把动作写出来：他打断她、声音一下子高了起来；再把他说的话原样放进引号。引语放句末最稳，想更有画面感就把它提到句首，让说话人和动作跟在后面。等他开口时，那个等已经持续了五年，要用完成时。",
    keyPhrases: [
      { en: "cut sb short", zh: "打断某人" },
      { en: "raise one's voice", zh: "提高声音" },
      { en: "wait for this day", zh: "等这一天" },
      { en: "for five whole years", zh: "整整五年" }
    ],
    scaffold: ["He cut her short and raised his voice, \"...\"", "\"...\", he cut her short, raising his voice.", "Only then did he ..., saying, \"...\""],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列谓语 + 直接引语（引语置于句末，现在完成时）",
        versions: [
          "He cut her short and raised his voice, \"I have waited for this day for five whole years.\""
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "直接引语前置 + 非谓语作状语（现在分词）+ 现在完成进行时",
        versions: [
          "\"I've been waiting for this day for five whole years,\" he cut her short, raising his voice."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "Only then 引导的部分倒装 + 直接引语",
        versions: [
          "Only then did he cut her short and raise his voice, saying, \"I have waited for this day for five whole years.\""
        ]
      }
    ],
    grammarPoints: ["倒装句", "时态（完成时）", "非谓语作状语"],
    traps: [
      {
        zh: "声音一下子高了起来",
        bad: "His voice suddenly became high.",
        good: "He suddenly raised his voice.",
        why: "中文说声音高，指的是音量大，不是音调高。英语不用 become high，而用 his voice rose 或 he raised his voice，写引语时通常和 said 一起出现。"
      },
      {
        zh: "他打断她",
        bad: "He broke her words.",
        good: "He cut her short.",
        why: "打断某人英语是 cut sb short 或 interrupt sb。break one's words 是把中文的打断逐字翻译，英语里没有这个搭配。"
      }
    ],
    upgrade: [
      { basic: "he said very loudly", better: "he raised his voice" },
      { basic: "waited a long time", better: "have been waiting for five whole years" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/对话描写/倒装句/4"
  },
  {
    id: "CONT-PLOT-0001",
    track: "读后续写",
    scene: "情节转折",
    topics: ["转机出现", "等待与希望"],
    cn: "就在他快要放弃的时候，那扇他敲了无数次的门突然从里面打开了。",
    difficulty: 4,
    difficultyWhy: "转折要落在主句上，前半段必须降为从句或非谓语，否则两个重点并排出现，转折的味道就没了。还要处理 knock 作不及物动词要加介词，以及逗号不能连接两个独立句。",
    hint: "先把临界点写出来：他快要放弃了；再把门突然打开作为转折点放在主句。前面那段用一个从句或完成式分词压住，全句只有一个重心。",
    keyPhrases: [
      { en: "be about to give up", zh: "快要放弃" },
      { en: "knock on the door", zh: "敲门" },
      { en: "time after time", zh: "无数次" },
      { en: "swing open", zh: "猛地打开" }
    ],
    scaffold: ["He was about to ... when ...", "Having ... in vain, he was about to ... when ...", "Only when ... did ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "be about to ... when 句型 + 定语从句",
        versions: [
          "He was about to give up when the door he had knocked on many times suddenly opened from inside."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（完成式分词）+ be about to ... when 句型",
        versions: [
          "Having knocked on the door time after time in vain, he was about to give up when it suddenly opened from inside."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "Only 引导的部分倒装 + 定语从句",
        versions: [
          "Only when he had almost given up did the door that he had knocked on so many times open slowly from inside."
        ]
      }
    ],
    grammarPoints: ["倒装句", "定语从句", "非谓语作状语"],
    traps: [
      {
        zh: "敲门",
        bad: "knocked the door",
        good: "knocked on the door",
        why: "knock 表示敲门时是不及物动词，后面要加介词 on 或 at。学生把中文的敲当成及物动词，直接接宾语，就写成了中式搭配。"
      },
      {
        zh: "就在他快要放弃的时候，门开了",
        bad: "He was about to give up, the door opened.",
        good: "He was about to give up when the door opened.",
        why: "逗号不能连接两个各自独立的句子。这种地方正好是转折句，用 be about to ... when 的句型最自然，也可以把两句用句号断开。"
      }
    ],
    upgrade: [
      { basic: "very many times", better: "time after time" },
      { basic: "opened suddenly", better: "swung open" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/情节转折/倒装句/4"
  },
  {
    id: "CONT-PLOT-0002",
    track: "读后续写",
    scene: "情节转折",
    topics: ["寻人", "意外重逢"],
    cn: "他冲进人群抓住那只小手，可当他转过身，才看清那只手的主人竟是他的女儿。",
    difficulty: 5,
    difficultyWhy: "前面的动作要快，后面的发现要慢，重心必须压在才看清那一下。中文的才是直到那时才的意思，需要 not until 的强调句式才能译出这层转折，普通时态写出来会平淡，也容易把那一瞬间的意外感丢掉。",
    hint: "先写两个动作：冲进人群、抓住小手；再用转折带出意外——转过身才发现那竟是自己的女儿。才表示直到那一刻才发现，可以用 not until 的强调句式把这份意外感顶出来。",
    keyPhrases: [
      { en: "rush into the crowd", zh: "冲进人群" },
      { en: "seize the small hand", zh: "抓住那只小手" },
      { en: "turn around", zh: "转过身" },
      { en: "belong to", zh: "属于" }
    ],
    scaffold: ["He rushed into ... and seized ..., but when he ..., he found ...", "Rushing into ..., he seized ..., only to find ...", "It was not until ... that he realized that ..."],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列谓语 + when 时间状语从句 + 宾语从句",
        versions: [
          "He rushed into the crowd and seized the small hand, but when he turned around, he found it was his daughter."
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "非谓语作状语（句首现在分词）+ only to do 结果状语 + 宾语从句",
        versions: [
          "Rushing into the crowd, he seized the small hand, only to find, when he turned around, that it belonged to his own daughter."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句（It was not until ... that）+ 定语从句",
        versions: [
          "It was not until he turned around that he realized that the small hand he had caught belonged to his own daughter."
        ]
      }
    ],
    grammarPoints: ["强调句", "非谓语作状语", "定语从句"],
    traps: [
      {
        zh: "才看清竟是他的女儿",
        bad: "He just found it was his daughter unexpectedly.",
        good: "He only found out later that the girl was his own daughter.",
        why: "中文的才在这里是直到那时才，不是 just；竟是他对意外感的表达，英语靠 only to find that 或 it turned out that 这类结构带出来，不能把 unexpectedly 直接丢在句尾当补丁。"
      },
      {
        zh: "当他转过身，才看清那是他的女儿",
        bad: "When he turns around, he has realized that she is his daughter.",
        good: "When he turned around, he realized that she was his daughter.",
        why: "续写的叙述时态是过去时。学生写到关键处常不自觉切回现在时或现在完成时，一句之内时态前后不一，属于最容易被扣分的硬伤。"
      }
    ],
    upgrade: [
      { basic: "he was very surprised", better: "only to find that ..." },
      { basic: "ran into", better: "rushed into / dashed into" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/情节转折/强调句/5"
  },
  {
    id: "CONT-DIALOGUE-0003",
    track: "读后续写",
    scene: "对话描写",
    topics: ["离别", "亲情"],
    cn: "奶奶把热汤推到他面前，手抖了一下，还是笑着说：路上小心，到了给我们打个电话。",
    difficulty: 4,
    difficultyWhy: "要在一句话里安排三层：动作、说话人、被动作和停顿分成两半的引语。引语被隔开时，前半句末尾的句号要改成逗号并写在引号内，多数学生在这里丢分；还要用分词把动作穿插进去，不能写成三个并排的短句。",
    hint: "先写她把汤推过来这个动作，再把她说的话放进引号。第一句说完不要用句号，改用逗号并放在引号里面，让说话人插进来，停顿之后再把话接下去。动作和神态可以放在说话人前后，别全堆在句首。",
    keyPhrases: [
      { en: "push the soup toward sb", zh: "把汤推到某人面前" },
      { en: "with a shaky smile", zh: "勉强笑着" },
      { en: "be careful on the road", zh: "路上小心" },
      { en: "call us when you arrive", zh: "到了给我们打个电话" }
    ],
    scaffold: ["... pushed the soup toward him and said, \"...\"", "As ..., she said with a shaky smile, \"...\"", "Pushing ..., his grandmother said ..., \"...\", and after a short pause, \"...\""],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列谓语 + 直接引语（引语置于句末）",
        versions: [
          "His grandmother pushed the hot soup toward him and said, \"Be careful on the road and call us when you arrive.\""
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "as 引导的时间状语从句 + 直接引语（带说话神态）",
        versions: [
          "As his grandmother pushed the hot soup toward him, she said with a shaky smile, \"Be careful on the road and call us when you arrive.\""
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "非谓语作状语（句首现在分词）+ 分割式直接引语（停顿插入引语中间）",
        versions: [
          "Pushing the hot soup toward him, his grandmother said with a shaky smile, \"Be careful on the road,\" and then, after a short pause, \"call us when you arrive.\""
        ]
      }
    ],
    grammarPoints: ["非谓语作状语", "宾语从句", "高级词汇替换"],
    traps: [
      {
        zh: "引语被说话人隔成两半时的标点",
        bad: "\"Be careful on the road.\" his grandmother said, \"call us when you arrive.\"",
        good: "\"Be careful on the road,\" his grandmother said, \"and call us when you arrive.\"",
        why: "引语分成前后两半时，前半句末尾的句号要改成逗号，而且这个逗号必须放在引号里面；两半仍然是同一句话，整句的句号留到最后。用句号把引语截断，说话人就变成了独立句子，语流全断了。"
      },
      {
        zh: "还是笑着说",
        bad: "She said with laughing.",
        good: "She said with a shaky smile.",
        why: "with 后面要接名词或名词短语，表示带着某种表情；laugh 是动词，不能直接跟在 with 后面。要么写成 with a smile，要么用 smiling 作状语。"
      }
    ],
    upgrade: [
      { basic: "said with a very big smile", better: "said with a shaky smile" },
      { basic: "her hand moved a lot", better: "with a shaking hand" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/对话描写/非谓语作状语/4"
  },
  {
    id: "CONT-DIALOGUE-0004",
    track: "读后续写",
    scene: "对话描写",
    topics: ["父子关系", "支持与理解"],
    cn: "他以为父亲会拦他，父亲却把那张揉皱的报名表一点点抚平，只说了句：去吧，家里的事有我。",
    difficulty: 5,
    difficultyWhy: "一句话要完成三层任务：压住他的预判、写父亲抚平报名表的动作、再用父亲的一句话完成转折。宾语从句的时态呼应、引语在长句末尾的归属是否清楚、以及强调句里插入成分的位置，都是容易失手的地方。",
    hint: "先立起他的预判：他以为父亲会拦他；再用转折接出父亲的动作和那句话。父亲的话是整段的转折点，可以让它落在句尾，前面用强调句式把父亲的声音顶出来，让读者先感到意外再听到内容。",
    keyPhrases: [
      { en: "smooth the crumpled form", zh: "把揉皱的报名表抚平" },
      { en: "take care of things at home", zh: "家里的事由他来管" },
      { en: "the words he had never expected", zh: "他从没想到会听到的话" },
      { en: "break the silence", zh: "打破沉默" }
    ],
    scaffold: ["He thought ..., but his father ... and said, \"...\"", "\"...\", his father said, smoothing ...", "It was ... that ..., saying the words he had never expected, \"...\""],
    levels: [
      {
        level: 1,
        label: "合格·语法正确意思完整",
        structure: "并列句（but 表转折）+ 直接引语（引语置于句末）",
        versions: [
          "He thought his father would stop him, but his father smoothed the crumpled form and said, \"Go, and I will take care of things at home.\""
        ]
      },
      {
        level: 2,
        label: "良好·结构多样用词准确",
        structure: "直接引语前置 + 说话人后置 + 非谓语作状语（现在分词）",
        versions: [
          "\"Go, and I will take care of things at home,\" his father said, smoothing the crumpled form slowly in his hands."
        ]
      },
      {
        level: 3,
        label: "优秀·高级句式阅卷加分",
        structure: "强调句（It was ... that）+ 非谓语作状语 + 直接引语",
        versions: [
          "It was his father's quiet voice that broke the silence, saying the words he had never expected, \"Go, and I will take care of things at home.\""
        ]
      }
    ],
    grammarPoints: ["强调句", "非谓语作状语", "宾语从句"],
    traps: [
      {
        zh: "他以为父亲会拦他",
        bad: "He thought his father will stop him.",
        good: "He thought his father would stop him.",
        why: "主句是过去时，宾语从句里表示将来要用过去将来时 would，不能保持 will。续写里写人物的心理预期时，这是最高频的时态呼应错误。"
      },
      {
        zh: "家里的事有我",
        bad: "Go, the things at home have me.",
        good: "Go, and I will take care of things at home.",
        why: "家里的事有我是中文的固定说法，意思是家里的事由我来管。英语要说 I will take care of things at home 或 leave the rest to me，不能把有事逐字译成 have，那样整句意思完全反了。"
      }
    ],
    upgrade: [
      { basic: "he was very surprised", better: "the words he had never expected" },
      { basic: "said quietly", better: "broke the silence" }
    ],
    variantOf: null,
    source: "seed",
    recipeKey: "读后续写/对话描写/强调句/5"
  }
);
