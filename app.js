const dataset = {
  name: "campus_survey.dta",
  columns: ["id", "name", "major", "age", "income", "study_hours", "score"],
  rows: [
    { id: 101, name: "林默", major: "Economics", age: 21, income: 3800, study_hours: 8, score: 72 },
    { id: 102, name: "周宁", major: "History", age: 22, income: 5200, study_hours: 11, score: 81 },
    { id: 103, name: "苏禾", major: "Economics", age: 20, income: 4600, study_hours: 9, score: 76 },
    { id: 104, name: "陈屿", major: "Computer", age: 23, income: 7300, study_hours: 14, score: 91 },
    { id: 105, name: "许安", major: "History", age: 21, income: 4100, study_hours: 7, score: 68 },
    { id: 106, name: "秦川", major: "Computer", age: 24, income: 6800, study_hours: 12, score: 86 },
    { id: 107, name: "叶青", major: "Economics", age: 22, income: 5900, study_hours: 10, score: 79 },
    { id: 108, name: "顾言", major: "History", age: 20, income: 3500, study_hours: 6, score: 64 },
    { id: 109, name: "沈舟", major: "Computer", age: 21, income: 4800, study_hours: 9, score: 74 },
    { id: 110, name: "唐梨", major: "Economics", age: 23, income: 6200, study_hours: 13, score: 88 },
    { id: 111, name: "白芷", major: "History", age: 22, income: 4400, study_hours: 8, score: 71 },
    { id: 112, name: "陆野", major: "Computer", age: 25, income: 8100, study_hours: 15, score: 94 },
  ],
};

const levels = [
  {
    id: 1,
    title: "打开调查档案",
    command: "use",
    syntax: "use campus_survey.dta",
    tags: ["数据导入", "基础"],
    story: "校务处把一份调查数据交给了你，但档案还锁在工作目录里。先把案件资料载入，后续所有线索都从这张表开始。",
    objective: "载入 campus_survey.dta 数据集",
    summary: "你学会了 use。当你要打开一个 Stata 数据文件时，先用它把数据载入当前工作区。",
    mistake: "文件名或路径写错时，Stata 找不到数据；正式工作时要留意当前目录。",
    hints: [
      "想要打开一个已经存在的 .dta 文件，需要使用“载入数据”类命令。",
      "命令结构是：use 文件名",
      "完整写法：use campus_survey.dta",
    ],
    preview: "这是一份校园调查样本。先载入它，才能继续查案。",
    validate(command) {
      if (/^use\s+campus_survey(?:\.dta)?\s*$/i.test(command)) {
        return success("数据集已载入。\n\n12 observations loaded\n7 variables loaded\n\n案件档案现在可以检索了。");
      }
      if (/^use\b/i.test(command)) return syntax("命令可以执行，但文件名不对。请检查你要打开的是哪份档案。");
      return unknown("先想想：我们现在需要打开一个数据文件，而不是查看或分析它。");
    },
  },
  {
    id: 2,
    title: "确认变量结构",
    command: "describe",
    syntax: "describe",
    tags: ["数据理解", "基础"],
    story: "档案打开了。你需要先确认这份资料包含哪些变量，以及每个变量大概扮演什么角色，避免一上来就误读数据。",
    objective: "查看数据集的观测数和变量结构",
    summary: "你学会了 describe。拿到任何新数据时，它都是快速建立全局认识的第一步。",
    mistake: "describe 只告诉你结构，不会展示每一行具体数值；要看观测值，下一关会用 browse 或 list。",
    hints: [
      "这一步不需要筛选或计算，只要“描述”数据的结构。",
      "这是一个不需要额外参数的命令。",
      "完整写法：describe",
    ],
    preview: "先看地图，再开始追踪线索。",
    validate(command) {
      if (/^describe\s*$/i.test(command) || /^desc\s*$/i.test(command)) {
        return success("Contains data from memory\n\nObservations: 12\nVariables: 7\n\n              storage   display    value\nvariable name   type    format     label\n────────────────────────────────────────\nid               int     %8.0g\nname             str4    %9s\nmajor            str9    %9s\nage              int     %8.0g\nincome           int     %8.0g\nstudy_hours      int     %8.0g\nscore            int     %8.0g");
      }
      return unknown("试试一个只查看数据结构的命令。你暂时不需要写变量名。");
    },
  },
  {
    id: 3,
    title: "浏览关键观测",
    command: "browse / list",
    syntax: "browse",
    tags: ["数据浏览", "基础"],
    story: "变量名还不够。你发现名单里可能有一条异常记录，需要把真实观测值展开，看看每一行的人和分数是否对应。",
    objective: "打开数据表，浏览每条观测记录",
    summary: "你学会了 browse 和 list。前者适合交互式浏览，后者适合把观测直接打印到结果窗口。",
    mistake: "不要把变量名当成数据值；先浏览原始观测，再决定下一步怎么处理。",
    hints: [
      "想逐行查看数据，可以使用“浏览”或“列出”类命令。",
      "browse 不需要参数；list 也可以直接运行。",
      "完整写法：browse",
    ],
    preview: "名单、专业、收入和成绩都在这里，放大看看。",
    validate(command) {
      if (/^(browse|br|list|li)(\s+.*)?$/i.test(command)) {
        return success("Data Browser opened\n\nid   name   major        age   income   study_hours   score\n101  林默    Economics    21    3800     8             72\n102  周宁    History      22    5200     11            81\n103  苏禾    Economics    20    4600     9             76\n104  陈屿    Computer     23    7300     14            91\n...  8 more observations");
      }
      return unknown("这一步的目标是查看每行观测，不是做统计。可以试试 browse 或 list。");
    },
  },
  {
    id: 4,
    title: "锁定高收入样本",
    command: "keep if",
    syntax: "keep if income > 5000",
    tags: ["筛选", "条件"],
    story: "校务处只想研究月收入超过 5000 元的学生。请保留符合条件的样本，缩小后续调查范围。",
    objective: "只保留 income 大于 5000 的观测",
    summary: "你学会了 keep if。当分析只关心满足某个条件的样本时，可以用它筛选观测。",
    mistake: "keep if 会改变当前数据；如果还需要完整样本，正式分析前应先 preserve 或另存副本。",
    hints: [
      "这次需要留下满足条件的观测，关键词是 keep。",
      "条件写在 if 后面：keep if income > 数字。",
      "完整写法：keep if income > 5000",
    ],
    preview: "门槛已经确定：月收入必须严格大于 5000。",
    validate(command) {
      if (/^(keep|keep\s+if)\s+if\s+income\s*(?:>|>=)\s*5000\s*$/i.test(command) || /^keep\s+if\s+income\s*>\s*5000\s*$/i.test(command)) {
        return success("筛选完成。\n\n(8 observations deleted)\n4 observations remaining\n\n高收入样本已锁定。");
      }
      if (/^(keep|drop)\b/i.test(command)) return syntax("筛选命令可以执行，但条件还没有准确表达“income 大于 5000”。");
      return unknown("这一步需要用条件筛选。想想是保留符合条件的样本，还是删除它们？");
    },
  },
  {
    id: 5,
    title: "制造学习时长指标",
    command: "generate",
    syntax: "generate high_study = study_hours >= 10",
    tags: ["变量创建", "逻辑"],
    story: "你想把“每周学习 10 小时及以上”标记成一个新指标，之后可以快速比较高投入和低投入学生。",
    objective: "创建 high_study，标记 study_hours >= 10 的学生",
    summary: "你学会了 generate（也可简写为 gen）。它能根据已有变量创建新的分析变量。",
    mistake: "新变量名不能和已有变量重复；逻辑表达式会生成 0/1 标记，便于后续分组分析。",
    hints: [
      "你需要创建一个新变量，命令的动作是 generate。",
      "变量表达式可以直接写成：study_hours >= 10。",
      "完整写法：generate high_study = study_hours >= 10",
    ],
    preview: "把模糊的“学习投入高”变成一个可分析的 0/1 指标。",
    validate(command) {
      if (/^(generate|gen)\s+high_study\s*=\s*study_hours\s*>=\s*10\s*$/i.test(command)) {
        return success("变量已生成。\n\nhigh_study\n──────────\n0 = 低于 10 小时\n1 = 10 小时及以上\n\n6 observations marked as high study.");
      }
      if (/^(generate|gen|replace)\b/i.test(command)) return syntax("变量创建动作是对的，但变量名或条件还需要调整。");
      return unknown("这一步要从已有变量生成一个新的标记变量。");
    },
  },
  {
    id: 6,
    title: "绘制专业分布",
    command: "tabulate",
    syntax: "tabulate major",
    tags: ["分类统计", "频数"],
    story: "线索显示，不同专业的样本数量可能并不均衡。先做一张专业频数表，确认调查样本的构成。",
    objective: "统计 major 各类别的观测数量",
    summary: "你学会了 tabulate（也可简写为 tab）。它适合快速查看分类变量的频数和比例。",
    mistake: "tabulate 主要用于分类变量；连续变量如 income 更适合先用 summarize。",
    hints: [
      "你要的是每个专业出现了几次，属于分类频数统计。",
      "把要统计的分类变量写在命令后面。",
      "完整写法：tabulate major",
    ],
    preview: "先知道样本里每个专业有多少人。",
    validate(command) {
      if (/^(tabulate|tab|ta)\s+major\s*$/i.test(command)) {
        return success("             |      Freq.   Percent\n─────────────+────────────────────\nComputer     |          4      33.33\nEconomics    |          4      33.33\nHistory      |          4      33.33\n─────────────+────────────────────\nTotal        |         12     100.00");
      }
      if (/^(tabulate|tab|ta)\b/i.test(command)) return syntax("分类统计命令可以执行，但本关要检查的是 major。");
      return unknown("想查看一个分类变量的频数，可以试试 tabulate major。");
    },
  },
  {
    id: 7,
    title: "测量成绩全貌",
    command: "summarize",
    syntax: "summarize score",
    tags: ["描述统计", "均值"],
    story: "教务老师想知道整体成绩水平。请计算成绩的观测数、均值、标准差、最小值和最大值。",
    objective: "对 score 进行描述统计",
    summary: "你学会了 summarize（也可简写为 sum）。它是探索连续变量分布的高频入口。",
    mistake: "均值只是分布的一部分；看结果时同时关注标准差、最小值和最大值。",
    hints: [
      "这次需要均值和范围，属于描述统计。",
      "连续变量 score 放在 summarize 后面。",
      "完整写法：summarize score",
    ],
    preview: "一眼看懂成绩的中心位置和范围。",
    validate(command) {
      if (/^(summarize|sum|su)\s+score\s*$/i.test(command)) {
        return success("    Variable |        Obs        Mean    Std. dev.       Min        Max\n─────────────+────────────────────────────────────────────────────\n       score |         12    78.6667     9.7999         64         94\n\n成绩均值约为 78.67，最高 94，最低 64。");
      }
      if (/^(summarize|sum|su)\b/i.test(command)) return syntax("描述统计命令可以执行，但这次要观察的变量是 score。");
      return unknown("想计算均值、标准差和范围，可以试试 summarize score。");
    },
  },
  {
    id: 8,
    title: "画出学习与成绩",
    command: "scatter",
    syntax: "scatter score study_hours",
    tags: ["可视化", "关系"],
    story: "现在要找一条更直观的线索：学习时长和成绩之间是否存在关系？把两个连续变量画成散点图。",
    objective: "绘制 score 与 study_hours 的散点图",
    summary: "你学会了 scatter。它适合快速观察两个连续变量之间的方向、集中程度和异常点。",
    mistake: "图形能提示关系，但不能单凭散点图就下因果结论。",
    hints: [
      "两个连续变量的关系，最适合先画散点图。",
      "Stata 写法是：scatter y_variable x_variable。",
      "完整写法：scatter score study_hours",
    ],
    preview: "把数字变成形状，看看线索是否向右上方移动。",
    validate(command) {
      if (/^(scatter|sc)\s+score\s+study_hours\s*$/i.test(command) || /^twoway\s+scatter\s+score\s+study_hours\s*$/i.test(command)) {
        return success("Graph window: scatter score study_hours\n\n12 points plotted.\nVisual signal: positive association\n\n学习时长较高的学生，成绩通常也更高。");
      }
      if (/^(scatter|sc|twoway)\b/i.test(command)) return syntax("图形命令可以执行，但请把 score 放在前面、study_hours 放在后面。");
      return unknown("两个连续变量的初步关系，可以从散点图开始。");
    },
  },
  {
    id: 9,
    title: "估计学习回报",
    command: "regress",
    syntax: "regress score study_hours",
    tags: ["回归", "模型"],
    story: "最后一条数据线索需要被量化：学习时长每增加 1 小时，成绩平均变化多少？运行一个最基础的线性回归。",
    objective: "用 study_hours 解释 score",
    summary: "你学会了 regress（也可简写为 reg）。它是从描述关系走向模型估计的关键一步。",
    mistake: "回归系数描述条件关联，不等于自动证明因果；研究设计和变量选择同样重要。",
    hints: [
      "要估计一个变量和另一个变量的关系，可以使用回归命令。",
      "Stata 写法是：regress 因变量 自变量。",
      "完整写法：regress score study_hours",
    ],
    preview: "把“看起来有关”推进到一个可报告的系数。",
    validate(command) {
      if (/^(regress|reg|regr)\s+score\s+study_hours\s*$/i.test(command)) {
        return success("      Source |       SS           df       MS\n─────────────+──────────────────────────\n       Model |  1286.404          1   1286.404\n    Residual |   115.596         10     11.560\n─────────────+──────────────────────────\n       Total |  1402.000         11    127.455\n\n       score | Coefficient   Std. err.      t    P>|t|\n─────────────+────────────────────────────────────────\n study_hours |     3.124      0.392     7.97   0.000\n       _cons |    48.902      3.781    12.93   0.000\n\nR-squared = 0.918");
      }
      if (/^(regress|reg|regr)\b/i.test(command)) return syntax("回归命令可以执行，但本关的因变量是 score，自变量是 study_hours。");
      return unknown("需要把一个结果变量和一个解释变量放进回归模型。");
    },
  },
  {
    id: 10,
    title: "写下案件结论",
    command: "interpret",
    syntax: "study_hours 的系数为正",
    tags: ["解释", "结案"],
    story: "证据已经齐了。请用一句话解释回归结果：study_hours 的系数为正，代表什么方向的关系？",
    objective: "提交一句正确的结果解释",
    summary: "你完成了从数据导入、探索、筛选到建模和解释的完整调查闭环。",
    mistake: "“系数为正”只能说明关联方向；不要把这句话扩大成“学习时间一定导致成绩提高”。",
    hints: [
      "查看上一关的 study_hours 系数，它是正数。",
      "答案需要表达“学习时长增加，成绩平均更高”的方向。",
      "可提交：study_hours 的系数为正",
    ],
    preview: "最后一步不是再敲命令，而是把结果说清楚。",
    validate(command) {
      const answer = command.toLowerCase().replace(/\s+/g, "");
      const accepted = [
        "study_hours的系数为正",
        "studyhours的系数为正",
        "学习时长增加成绩平均更高",
        "学习时间越多成绩越高",
        "positive",
      ];
      if (accepted.some((item) => answer.includes(item.toLowerCase().replace(/\s+/g, "")))) {
        return success("解释正确。\n\nstudy_hours 的系数为 3.124，方向为正。\n在这份样本中，学习时长更高的学生平均成绩也更高。\n\n案件 #014：结案。");
      }
      return syntax("方向判断还差一点。请明确说出 study_hours 与 score 的关系是正向的。");
    },
  },
];

levels.forEach((level) => {
  level.chapter = 1;
});

const chapters = [
  { id: 1, title: "新手侦探", subtitle: "读懂、浏览并分析一份数据", range: [1, 10] },
  { id: 2, title: "清洗工坊", subtitle: "把原始资料变成可分析数据", range: [11, 15] },
  { id: 3, title: "回归实战", subtitle: "从模型设定走向可信解释", range: [16, 20] },
  { id: 4, title: "综合案件", subtitle: "独立完成一条可复现分析路径", range: [21, 21] },
];

levels.push(
  makeLevel({
    id: 11,
    chapter: 2,
    title: "排除不合格样本",
    command: "drop if",
    syntax: "drop if age < 21",
    tags: ["数据清洗", "条件"],
    story: "调查对象应为 21 岁及以上学生。请从原始资料中移除年龄不足 21 岁的观测，保留可用调查样本。",
    objective: "删除 age 小于 21 的观测",
    summary: "你学会了 drop if。它与 keep if 相反：用条件删除不符合研究范围的观测。",
    mistake: "drop if 会永久改变当前数据；复杂清洗前应保留原始数据副本。",
    hints: [
      "本关是移除不符合条件的观测，而不是保留某一类观测。",
      "条件写在 if 后面：drop if age < 数字。",
      "完整写法：drop if age < 21",
    ],
    preview: "原始问卷包含两名不在研究范围内的受访者。",
    matches: [/^drop if age < 21$/i, /^drop if age <= 20$/i],
    commandStem: /^drop\b/i,
    output: "筛选完成。\n\n(2 observations deleted)\n10 observations remaining\n\n样本年龄范围已经符合调查标准。",
    nearMessage: "删除动作是对的，但本关要求排除 age 小于 21 的观测。",
    fallback: "这一步要删除不符合样本标准的观测。试试从 drop if 开始。",
  }),
  makeLevel({
    id: 12,
    chapter: 2,
    title: "统一变量命名",
    command: "rename",
    syntax: "rename income monthly_income",
    tags: ["数据清洗", "命名"],
    story: "报告模板要求收入变量使用更清晰的名字 monthly_income。请在不改变数值的前提下统一变量名。",
    objective: "把 income 重命名为 monthly_income",
    summary: "你学会了 rename。变量名应该短、清晰且能表达含义，后续写代码和读结果都会轻松很多。",
    mistake: "rename 只改变变量名，不会改变变量值；新名称不能与已有变量重复。",
    hints: [
      "这次不需要生成新变量，只需要给已有变量换名字。",
      "命令结构是：rename 旧变量名 新变量名。",
      "完整写法：rename income monthly_income",
    ],
    preview: "规范的变量命名是可复现分析的第一道防线。",
    matches: [/^rename income monthly_income$/i],
    commandStem: /^rename\b/i,
    output: "Variable renamed.\n\nincome -> monthly_income\n\n变量含义没有变化，代码可读性更高了。",
    nearMessage: "重命名动作是对的，但请检查旧变量和新变量是否准确。",
    fallback: "想一想：怎样在不改变数据值的情况下调整变量名？",
  }),
  makeLevel({
    id: 13,
    chapter: 2,
    title: "编码分类变量",
    command: "encode",
    syntax: "encode major, gen(major_id)",
    tags: ["数据清洗", "编码"],
    story: "major 目前是文字变量。为了让它能进入后续模型，需要把专业名称编码成带标签的数值变量。",
    objective: "把 major 编码为 major_id",
    summary: "你学会了 encode。它会把字符串分类变量转成带值标签的数值变量，适合后续建模。",
    mistake: "encode 适用于字符串类别；如果变量只是“数字被存成文字”，应使用 destring。",
    hints: [
      "文字类别转成带标签的数字类别，需要用 encode。",
      "新变量名写在选项中：gen(major_id)。",
      "完整写法：encode major, gen(major_id)",
    ],
    preview: "专业名称需要保留可读性，也需要被模型识别。",
    matches: [/^encode major,\s*(gen|generate)\(major_id\)$/i],
    commandStem: /^encode\b/i,
    output: "Variable encoded.\n\nmajor -> major_id\n1 Economics\n2 History\n3 Computer\n\n已生成可用于模型的数值分类变量。",
    nearMessage: "编码动作是对的，但请把 major 编码到名为 major_id 的新变量。",
    fallback: "本关需要将文字型专业转换为数值分类变量。",
  }),
  makeLevel({
    id: 14,
    chapter: 2,
    title: "修复文字数字",
    command: "destring",
    syntax: "destring income_text, gen(income)",
    tags: ["数据清洗", "类型"],
    story: "另一份问卷把收入读成了文字变量 income_text。请将它转换为可计算的数值变量 income。",
    objective: "把 income_text 转换为数值变量 income",
    summary: "你学会了 destring。它用于把“看起来像数字、实际却是文字”的变量转换为数值型。",
    mistake: "先检查文字里是否混有逗号、货币符号或其他字符；必要时使用 ignore() 处理。",
    hints: [
      "这不是重新编码类别，而是把文字形式的数字变成数值。",
      "新变量用 gen(income) 指定。",
      "完整写法：destring income_text, gen(income)",
    ],
    preview: "数据导入后，数字常常会被错误识别为文字。",
    matches: [/^destring income_text,\s*(gen|generate)\(income\)$/i],
    commandStem: /^destring\b/i,
    output: "income_text converted to numeric variable income.\n\n12 values converted.\n0 nonnumeric characters found.\n\n收入字段现在可以用于统计和回归。",
    nearMessage: "转换动作是对的，但请把 income_text 转成名为 income 的新变量。",
    fallback: "这一步需要把文字形式的数字转换为真正的数值变量。",
  }),
  makeLevel({
    id: 15,
    chapter: 2,
    title: "检查缺失线索",
    command: "misstable",
    syntax: "misstable summarize",
    tags: ["数据清洗", "缺失值"],
    story: "建模前必须确认哪些变量存在缺失。请先生成一份缺失值概览，判断数据是否需要进一步处理。",
    objective: "查看数据集的缺失值分布",
    summary: "你学会了 misstable summarize。它能快速报告各变量的缺失与非缺失数量。",
    mistake: "缺失值不是自动删除的理由；先理解缺失发生在哪里、为什么发生。",
    hints: [
      "本关不需要修改数据，只需要检查缺失情况。",
      "Stata 有专门的 misstable 命令用于缺失值概览。",
      "完整写法：misstable summarize",
    ],
    preview: "在模型前检查缺失，能避免样本量悄悄变化。",
    matches: [/^misstable summarize$/i, /^misstable sum$/i],
    commandStem: /^misstable\b/i,
    output: "                                               Obs<.\n                                +------------------------------\n               Variable |     Obs=.     Obs<.     Unique values\n------------------------+------------------------------\n                 income |         0        12              12\n                  score |         0        12              12\n            study_hours |         0        12              10\n\n当前核心变量没有缺失值。",
    nearMessage: "缺失值检查命令是对的，但本关需要完整的 summarize 概览。",
    fallback: "先不要删除观测。请使用专门查看缺失情况的命令。",
  }),
  makeLevel({
    id: 16,
    chapter: 3,
    title: "加入年龄控制",
    command: "regress",
    syntax: "regress score study_hours age",
    tags: ["回归", "控制变量"],
    story: "学习时长和年龄都可能与成绩有关。请在模型中同时纳入它们，观察学习时长的条件关联。",
    objective: "估计 score 对 study_hours 和 age 的多元回归",
    summary: "你学会了在 regress 后加入控制变量。多元回归帮助我们在其他变量保持不变时比较目标变量的关联。",
    mistake: "加入控制变量需要理论依据；不是变量越多越好。",
    hints: [
      "因变量仍然是 score，但现在要加入两个解释变量。",
      "控制变量直接跟在主要解释变量后面。",
      "完整写法：regress score study_hours age",
    ],
    preview: "基础模型只能看两变量关系；现在把年龄纳入考虑。",
    matches: [/^(regress|reg)\s+score\s+study_hours\s+age$/i],
    commandStem: /^(regress|reg)\b/i,
    output: "       score | Coefficient   Std. err.      t    P>|t|\n-------------+----------------------------------------\n study_hours |     3.008      0.481     6.25   0.000\n         age |     0.438      0.566     0.77   0.459\n       _cons |    39.224     12.731     3.08   0.012\n\nR-squared = 0.923\n\n控制年龄后，学习时长的正向系数仍然存在。",
    nearMessage: "回归模型需要以 score 为因变量，并同时包含 study_hours 与 age。",
    fallback: "本关需要在基础回归中再加入 age 这个控制变量。",
  }),
  makeLevel({
    id: 17,
    chapter: 3,
    title: "获得稳健标准误",
    command: "robust",
    syntax: "regress score study_hours age, robust",
    tags: ["回归", "稳健性"],
    story: "你担心误差项方差并不恒定。请在多元回归中使用稳健标准误，让推断对异方差更稳健。",
    objective: "使用 robust 选项运行多元回归",
    summary: "你学会了 , robust。它改变的是标准误和显著性检验，不会改变回归系数本身。",
    mistake: "稳健标准误不能自动解决遗漏变量、反向因果或错误模型设定。",
    hints: [
      "先写出上一关的多元回归。",
      "Stata 的选项写在逗号后面。",
      "完整写法：regress score study_hours age, robust",
    ],
    preview: "同一组系数，需要更稳健的标准误来支撑推断。",
    matches: [/^(regress|reg)\s+score\s+study_hours\s+age,\s*robust$/i],
    commandStem: /^(regress|reg)\b/i,
    output: "Linear regression                               Number of obs = 12\n                                                       F(2, 9) = 38.45\n                                                       Prob > F  = 0.0000\n                                                       R-squared = 0.9230\n\n             |               Robust\n       score | Coefficient   std. err.      t    P>|t|\n-------------+----------------------------------------\n study_hours |     3.008      0.531     5.66   0.000\n         age |     0.438      0.614     0.494   0.639",
    nearMessage: "模型主体正确，但请在逗号后加入 robust 选项。",
    fallback: "本关要求在多元回归后启用稳健标准误。",
  }),
  makeLevel({
    id: 18,
    chapter: 3,
    title: "让专业进入模型",
    command: "i.",
    syntax: "regress score study_hours i.major",
    tags: ["回归", "分类变量"],
    story: "不同专业的评分环境可能不同。请使用因子变量写法，将 major 作为分类控制变量纳入模型。",
    objective: "在回归中加入 major 的分类控制",
    summary: "你学会了 i. 前缀。它让 Stata 自动将分类变量展开为虚拟变量，并选择基准组。",
    mistake: "不要手工为每一类都生成虚拟变量后再全部放进模型，否则会产生完全共线性。",
    hints: [
      "major 是分类变量，不能直接像连续变量那样简单放入模型。",
      "Stata 用 i.变量名 表示分类因子变量。",
      "完整写法：regress score study_hours i.major",
    ],
    preview: "让模型识别专业差异，而不是把专业名称当作连续数字。",
    matches: [/^(regress|reg)\s+score\s+study_hours\s+i\.major$/i],
    commandStem: /^(regress|reg)\b/i,
    output: "       score | Coefficient   Std. err.      t    P>|t|\n-------------+----------------------------------------\n study_hours |     2.931      0.536     5.47   0.001\n             |\n       major |\n    History  |    -0.784      2.181    -0.36   0.731\n   Computer  |     1.966      2.234     0.88   0.405\n             |\n       _cons |    49.884      4.882    10.22   0.000\n\nEconomics is the base category.",
    nearMessage: "请让 score 作为因变量，study_hours 为连续变量，并用 i.major 表示专业类别。",
    fallback: "本关要把专业作为分类变量加入回归，不需要手动生成虚拟变量。",
  }),
  makeLevel({
    id: 19,
    chapter: 3,
    title: "检验年龄交互",
    command: "c.##c.",
    syntax: "regress score c.study_hours##c.age",
    tags: ["回归", "交互项"],
    story: "学习时长的作用是否会随年龄变化？请使用连续变量交互项，让模型同时估计主效应和交互效应。",
    objective: "估计 study_hours 与 age 的连续交互模型",
    summary: "你学会了 c.x##c.z。双井号会同时加入两个主效应和它们的交互项。",
    mistake: "交互项系数需要结合主效应解释；不能只看它单独是否显著。",
    hints: [
      "两个连续变量的交互使用 c. 前缀。",
      "双井号 ## 会同时添加主效应与交互项。",
      "完整写法：regress score c.study_hours##c.age",
    ],
    preview: "同样增加一小时学习，对不同年龄的学生影响可能不同。",
    matches: [/^(regress|reg)\s+score\s+c\.study_hours##c\.age$/i],
    commandStem: /^(regress|reg)\b/i,
    output: "       score | Coefficient   Std. err.      t    P>|t|\n-------------+----------------------------------------\n study_hours |     2.337      1.966     1.19   0.268\n         age |    -1.025      1.754    -0.58   0.577\n             |\n c.study_hours#c.age |     0.029      0.081     0.36   0.729\n\n交互项已包含在模型中；下一步可以用 margins 解释不同年龄下的预测值。",
    nearMessage: "本关要求使用连续变量的 ## 交互写法。",
    fallback: "你需要让 study_hours 和 age 同时以连续变量形式进入交互模型。",
  }),
  makeLevel({
    id: 20,
    chapter: 3,
    title: "生成模型预测值",
    command: "predict",
    syntax: "predict score_hat",
    tags: ["回归", "预测"],
    story: "模型已经估计完成。请为每位学生生成预测成绩 score_hat，以便比较模型预测与实际成绩。",
    objective: "生成名为 score_hat 的线性预测值",
    summary: "你学会了 predict。它在模型估计后根据最近一次结果生成预测值、残差或其他统计量。",
    mistake: "predict 依赖最近一次成功估计的模型；运行新模型后，预测结果会跟着改变。",
    hints: [
      "这一步应在回归之后执行，用模型为每条观测生成预测。",
      "新变量名写在 predict 后面。",
      "完整写法：predict score_hat",
    ],
    preview: "把模型系数转化为每位学生的预测结果。",
    matches: [/^predict score_hat$/i],
    commandStem: /^predict\b/i,
    output: "(option xb assumed; fitted values)\n\nVariable score_hat generated.\n\nsummary of score_hat\n  mean = 78.667\n  min  = 64.221\n  max  = 93.821",
    nearMessage: "预测动作是对的，但本关需要生成名为 score_hat 的拟合值。",
    fallback: "回归后，使用 predict 生成每位学生的预测成绩。",
  }),
  {
    id: 21,
    chapter: 4,
    title: "完成研究备忘录",
    command: "workflow",
    syntax: "generate high_study = study_hours >= 10\nsummarize score\nregress score study_hours age, robust",
    tags: ["综合案件", "可复现"],
    story: "你要向导师提交一页研究备忘录。用三步完成：构造学习投入指标、检查成绩概况、再用稳健标准误估计学习时长与成绩的关系。",
    objective: "提交包含变量构造、描述统计与稳健回归的三步 do-file",
    summary: "你完成了一个最小但完整的实证工作流：从变量构造，到描述统计，再到稳健模型推断。",
    mistake: "真实项目中，每一步都应写进 do-file，而不是只在命令窗口里临时运行。",
    hints: [
      "这关可以在终端一次写多行，也可以用分号分隔多条命令。",
      "需要包含 generate high_study、summarize score 和带 robust 的多元回归。",
      "参考写法：generate high_study = study_hours >= 10；summarize score；regress score study_hours age, robust",
    ],
    preview: "这是第一份真正可复现的研究备忘录。",
    validate(command) {
      const steps = command
        .toLowerCase()
        .split(/[;\n]+/)
        .map((step) => step.trim().replace(/\s+/g, " "))
        .filter(Boolean);
      const hasGenerate = steps.some((step) => /^(generate|gen) high_study = study_hours >= 10$/.test(step));
      const hasSummary = steps.some((step) => /^(summarize|sum|su) score$/.test(step));
      const hasRegression = steps.some((step) => /^(regress|reg) score study_hours age, robust$/.test(step));

      if (hasGenerate && hasSummary && hasRegression) {
        return success("Research memo executed.\n\n[1/3] high_study generated\n[2/3] score summarized: mean = 78.67\n[3/3] robust regression estimated\n\n关键结论：控制年龄后，学习时长与成绩仍呈显著正向关联。\n\n你已完成数据侦探学院的首条完整分析路径。");
      }
      if (steps.length > 1 || steps.some((step) => /^(generate|gen|summarize|sum|su|regress|reg)\b/.test(step))) {
        return syntax("研究备忘录还不完整。请检查是否同时包含变量构造、score 的描述统计，以及带 robust 的多元回归。");
      }
      return unknown("本关需要一份三步 do-file。试着在终端输入多行命令，或用分号分隔。");
    },
  }
);

function makeLevel(config) {
  const {
    matches,
    commandStem,
    output,
    nearMessage,
    fallback,
    ...level
  } = config;

  return {
    ...level,
    validate(command) {
      const normalized = command.trim().replace(/\s+/g, " ");
      if (matches.some((pattern) => pattern.test(normalized))) {
        return success(output);
      }
      if (commandStem && commandStem.test(normalized)) {
        return syntax(nearMessage);
      }
      return unknown(fallback);
    },
  };
}

const state = {
  currentLevel: Number(localStorage.getItem("stata-current-level") || 1),
  completed: JSON.parse(localStorage.getItem("stata-completed") || "[]"),
  hintsUsed: Number(localStorage.getItem("stata-hints-used") || 0),
  history: JSON.parse(localStorage.getItem("stata-history") || "[]"),
  lastResult: null,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function persist() {
  localStorage.setItem("stata-current-level", String(state.currentLevel));
  localStorage.setItem("stata-completed", JSON.stringify(state.completed));
  localStorage.setItem("stata-hints-used", String(state.hintsUsed));
  localStorage.setItem("stata-history", JSON.stringify(state.history.slice(-30)));
}

function currentLevel() {
  return levels.find((level) => level.id === state.currentLevel) || levels[0];
}

function success(output) {
  return { type: "success", title: "动作完成", message: "命令执行成功，而且已经完成了本关任务。", output };
}

function syntax(message) {
  return { type: "warning", title: "命令可运行，但还差一步", message, output: "r(198);\n\n" + message };
}

function unknown(message) {
  return { type: "error", title: "线索暂时不对", message, output: "这条命令没有完成当前任务。\n\n" + message };
}

function renderLevels() {
  const list = $("#level-list");
  list.innerHTML = chapters.map((chapter) => {
    const chapterLevels = levels.filter((level) => level.chapter === chapter.id);
    const completedCount = chapterLevels.filter((level) => state.completed.includes(level.id)).length;
    const chapterLocked = chapter.id > 1 && !state.completed.includes(chapter.range[0] - 1);
    return `
      <section class="chapter-group ${chapterLocked ? "locked" : ""}">
        <div class="chapter-heading">
          <div>
            <span class="chapter-index">0${chapter.id}</span>
            <strong>${chapter.title}</strong>
          </div>
          <span class="chapter-count">${completedCount}/${chapterLevels.length}</span>
        </div>
        <p class="chapter-subtitle">${chapter.subtitle}</p>
        <div class="chapter-levels">
          ${chapterLevels.map((level) => {
            const completed = state.completed.includes(level.id);
            const locked = chapterLocked || (level.id > 1 && !state.completed.includes(level.id - 1) && level.id !== state.currentLevel);
            const active = level.id === state.currentLevel;
            return `
              <button class="level-button ${active ? "active" : ""} ${completed ? "completed" : ""}" data-level="${level.id}" type="button" ${locked ? "disabled" : ""}>
                <span class="level-index">${String(level.id).padStart(2, "0")}</span>
                <span class="level-name">${level.title}</span>
                <span class="level-action">${completed ? "SOLVED" : locked ? "LOCKED" : level.command}</span>
              </button>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }).join("");

  $$(".level-button").forEach((button) => {
    button.addEventListener("click", () => {
      selectLevel(Number(button.dataset.level));
    });
  });

  const solved = state.completed.length;
  $("#progress-count").textContent = `${solved} / ${levels.length}`;
  $("#progress-fill").style.width = `${(solved / levels.length) * 100}%`;
  $("#mission-kicker").textContent = `${getChapter(currentLevel()).title.toUpperCase()} / MISSION ${String(state.currentLevel).padStart(2, "0")} / ${levels.length}`;
}

function getChapter(level) {
  return chapters.find((chapter) => chapter.id === level.chapter) || chapters[0];
}

function renderData() {
  const level = currentLevel();
  $("#evidence-title").textContent = dataset.name;
  $("#row-count").textContent = `${dataset.rows.length} obs.`;
  $("#table-caption").textContent = level.preview;
  $("#data-table").innerHTML = `
    <thead><tr>${dataset.columns.map((column) => `<th>${column}</th>`).join("")}</tr></thead>
    <tbody>
      ${dataset.rows.slice(0, 6).map((row) => `
        <tr>${dataset.columns.map((column) => `<td>${row[column] ?? ""}</td>`).join("")}</tr>
      `).join("")}
    </tbody>
  `;
}

function renderHints() {
  const level = currentLevel();
  $("#hint-count").textContent = `${state.hintsUsed} / 3`;
  $("#hint-stack").innerHTML = level.hints
    .map((hint, index) => {
      const visible = index < state.hintsUsed;
      return `<div class="hint-item ${visible ? "" : "locked"}">${visible ? hint : `提示 ${index + 1}：点击后解锁`}</div>`;
    })
    .join("");
  $("#get-hint").disabled = state.hintsUsed >= level.hints.length;
  $("#get-hint").textContent = state.hintsUsed >= level.hints.length ? "提示已全部查看" : "获取下一条提示";
}

function renderLearnCard() {
  const level = currentLevel();
  $("#learn-number").textContent = String(level.id).padStart(2, "0");
  $("#learn-command").textContent = level.command;
  $("#learn-summary").textContent = level.summary;
  $("#learn-mistake").textContent = level.mistake;
}

function renderMission() {
  const level = currentLevel();
  const chapter = getChapter(level);
  $("#mission-kicker").textContent = `${chapter.title.toUpperCase()} / MISSION ${String(level.id).padStart(2, "0")} / ${levels.length}`;
  $("#mission-title").textContent = level.title;
  $("#mission-story").textContent = level.story;
  $("#mission-objective").textContent = level.objective;
  $("#mission-tags").innerHTML = [
    `CHAPTER ${chapter.id}`,
    ...level.tags,
  ].map((tag) => `<span class="tag">${tag}</span>`).join("");
  $("#command-input").placeholder = `输入 Stata 命令，例如：${level.syntax}`;
}

function renderToolbox() {
  const unlocked = [];
  const seen = new Set();
  state.completed.forEach((levelId) => {
    const level = levels.find((item) => item.id === levelId);
    if (!level || seen.has(level.command)) return;
    seen.add(level.command);
    unlocked.push(level.command);
  });

  $("#toolbox-count").textContent = String(unlocked.length).padStart(2, "0");
  $("#toolbox-list").innerHTML = unlocked.length
    ? unlocked.map((command) => `<span class="tool-chip">${command}</span>`).join("")
    : `<span class="tool-chip locked">完成第一关后解锁</span>`;
}

function renderHistory() {
  const history = state.history.filter((item) => item.levelId === state.currentLevel).slice(-4);
  $("#terminal-history").innerHTML = history.length
    ? history.map((item) => `
        <div class="terminal-line"><strong>. ${escapeHtml(item.command)}</strong>${item.output ? `\n${escapeHtml(item.output.split("\n")[0])}` : ""}</div>
      `).join("")
    : `<div class="terminal-line">欢迎来到模拟 Stata 终端。\n当前数据：${dataset.name}</div>`;
}

function renderAll() {
  renderLevels();
  renderMission();
  renderData();
  renderHints();
  renderLearnCard();
  renderToolbox();
  renderHistory();
  if (state.lastResult) {
    renderResult(state.lastResult);
  } else {
    setFeedback("idle", "等待你的第一个动作", "不确定也没关系。先根据简报输入一个你认为可能有用的命令。", "?");
  }
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[character]));
}

function setFeedback(type, title, message, icon) {
  const card = $("#feedback-card");
  card.className = `feedback-card ${type === "idle" ? "" : type}`.trim();
  $("#feedback-icon").textContent = icon;
  $("#feedback-title").textContent = title;
  $("#feedback-message").textContent = message;
}

function renderResult(result) {
  $("#output-console").textContent = result.output;
  $("#output-badge").textContent = result.type === "success" ? "已完成" : result.type === "warning" ? "需修正" : "未命中";
  $("#output-badge").className = `output-badge ${result.type === "success" ? "success" : ""}`;
  setFeedback(result.type, result.title, result.message, result.type === "success" ? "✓" : result.type === "warning" ? "!" : "×");
  activateTab("result");
}

function runCommand() {
  const input = $("#command-input");
  const command = input.value.trim();
  if (!command) {
    setFeedback("warning", "还没有命令", "先输入一个动作。你可以直接尝试，或者获取第一条提示。", "!");
    input.focus();
    return;
  }

  const level = currentLevel();
  const result = level.validate(command);
  state.lastResult = result;
  state.history.push({ levelId: state.currentLevel, command, output: result.output });
  persist();
  renderHistory();
  renderResult(result);
  input.value = "";

  if (result.type === "success") {
    const firstCompletion = !state.completed.includes(level.id);
    if (firstCompletion) {
      state.completed.push(level.id);
      state.completed.sort((a, b) => a - b);
      persist();
      renderLevels();
      showCompletion(level);
    }
  }
}

function showCompletion(level) {
  const stars = Math.max(1, 3 - Math.min(state.hintsUsed, 2));
  $("#modal-title").textContent = level.title;
  $("#modal-summary").textContent = level.summary;
  $("#modal-command").textContent = level.syntax;
  $("#modal-stars").textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
  $("#next-level").textContent = level.id === levels.length ? "查看结案" : "继续调查 →";
  $("#completion-modal").classList.remove("hidden");
}

function closeCompletion() {
  $("#completion-modal").classList.add("hidden");
}

function nextLevel() {
  closeCompletion();
  if (state.currentLevel < levels.length) {
    state.currentLevel += 1;
    state.hintsUsed = 0;
    state.lastResult = null;
    persist();
    renderAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    setFeedback("success", "案件 #014 已结案", "你已经走完了从导入、探索、筛选到回归解释的完整路径。", "✓");
  }
}

function selectLevel(levelId) {
  if (levelId > 1 && !state.completed.includes(levelId - 1) && levelId !== state.currentLevel) return;
  state.currentLevel = levelId;
  state.hintsUsed = 0;
  state.lastResult = null;
  persist();
  renderAll();
}

function getHint() {
  const level = currentLevel();
  if (state.hintsUsed >= level.hints.length) return;
  state.hintsUsed += 1;
  persist();
  renderHints();
  setFeedback("warning", `提示 ${state.hintsUsed} 已解锁`, level.hints[state.hintsUsed - 1], "!");
}

function activateTab(tabName) {
  $$(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
  $("#data-panel").classList.toggle("hidden", tabName !== "data");
  $("#result-panel").classList.toggle("hidden", tabName !== "result");
  $("#learn-panel").classList.toggle("hidden", tabName !== "learn");
}

function resetProgress() {
  const confirmed = window.confirm("确定要清空全部闯关记录吗？");
  if (!confirmed) return;
  state.currentLevel = 1;
  state.completed = [];
  state.hintsUsed = 0;
  state.history = [];
  state.lastResult = null;
  persist();
  renderAll();
}

$("#run-command").addEventListener("click", runCommand);
$("#clear-command").addEventListener("click", () => {
  $("#command-input").value = "";
  $("#command-input").focus();
});
$("#get-hint").addEventListener("click", getHint);
$("#reset-progress").addEventListener("click", resetProgress);
$("#close-modal").addEventListener("click", closeCompletion);
$("#next-level").addEventListener("click", nextLevel);
$(".modal-backdrop").addEventListener("click", closeCompletion);

$("#command-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    runCommand();
  }
});

$$(".tab").forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
});

renderAll();
