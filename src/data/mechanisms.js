export const mechanismSections = [
  { id: "overview", label: "总览" },
  { id: "round-core", label: "回合核心" },
  { id: "reinforcement", label: "原版增援" },
  { id: "dlrc", label: "响应判断" },
  { id: "crisis", label: "危机识别" },
  { id: "fdi", label: "设施记录" },
  { id: "director", label: "事件筛选" },
  { id: "event-pack", label: "事件内容" },
  { id: "architecture", label: "模块关系" },
  { id: "lifecycle", label: "一局生命周期" },
  { id: "configuration", label: "配置" },
  { id: "commands", label: "命令" },
  { id: "telemetry", label: "运行记录" },
  { id: "source", label: "源码路径" },
  { id: "status", label: "当前状态" },
];

export const runtimeBackboneSections = [
  { id: "overview", label: "总览", code: "00", pending: false },
  { id: "round-core", label: "回合核心", code: "01", pending: false },
  { id: "reinforcement", label: "原版增援", code: "02", pending: false },
  { id: "dlrc", label: "响应判断", code: "03", pending: false },
  { id: "crisis", label: "危机识别", code: "04", pending: false },
  { id: "fdi", label: "设施记录", code: "04.5", pending: false },
  { id: "director", label: "事件筛选", code: "05", pending: false },
  { id: "event-pack", label: "事件内容", code: "—", pending: true },
];

export const runtimeTopology = [
  { id: "round-start", label: "回合开始", owner: "插件运行时", detail: "先看开局人数，再决定这一局是否接管。", target: "overview", related: ["round-start", "round-core", "reinforcement", "round-facts", "dlrc", "crisis-fdi", "director", "event-pack"] },
  { id: "round-core", label: "回合核心", owner: "M01", detail: "记录回合编号，锁定人数档位和开局编制。", target: "round-core", related: ["round-start", "round-core", "reinforcement", "round-facts", "dlrc", "crisis-fdi", "director", "event-pack"] },
  { id: "reinforcement", label: "原版增援", owner: "M02", detail: "围绕原版增援波次记录实际结果。", target: "reinforcement", related: ["round-core", "reinforcement", "round-facts", "dlrc", "crisis-fdi", "director", "event-pack"] },
  { id: "round-facts", label: "回合事实", owner: "M01 + M02", detail: "汇总人数、SCP、人员、波次和设施状态。", target: "round-core", related: ["round-core", "reinforcement", "round-facts", "dlrc", "crisis-fdi", "director"] },
  { id: "dlrc", label: "响应判断", owner: "M03", detail: "发布带有回合编号的响应判断。", target: "dlrc", related: ["round-facts", "dlrc", "crisis-fdi", "director", "event-pack"] },
  { id: "crisis-node", label: "危机识别", owner: "M04", detail: "维护危机是否发生，以及每次危机的编号。", target: "crisis", related: ["dlrc", "crisis-node", "fdi-node", "director", "event-pack"] },
  { id: "fdi-node", label: "设施记录", owner: "M04.5", detail: "记录设施秩序的持续变化。", target: "fdi", related: ["dlrc", "crisis-node", "fdi-node", "director"] },
  { id: "director", label: "事件筛选", owner: "M05", detail: "按条件、来源和人数计划筛选候选。", target: "director", related: ["dlrc", "crisis-node", "fdi-node", "director", "event-pack"] },
  { id: "event-pack", label: "事件内容", owner: "内容边界", detail: "未来提供角色、装备、出生点和实际执行。", target: "event-pack", related: ["director", "event-pack"] },
];

export const mechanismFacts = {
  minimumPlayers: 16,
  evaluationStartSeconds: 391,
  evaluationIntervalSeconds: 30,
  primaryWaveCaps: { E: 6, D: 6, C: 8, B: 14, A: 18 },
  fdiRange: "0–100",
  fdiQuietWindowSeconds: 90,
};

export const runtimeFlow = [
  { code: "01", title: "回合开始", owner: "插件运行时", detail: "先看开局人数，决定这一局是否接管。" },
  { code: "02", title: "回合核心", owner: "M01", detail: "记录回合编号、开局人数、人数档位和开局编制。" },
  { code: "03", title: "原版增援", owner: "M02", detail: "记录原版增援的实际出生、阵营、成员和波次历史。" },
  { code: "04", title: "回合事实", owner: "M01 + M02", detail: "把人数、SCP、人员、波次、死亡窗口和核弹事实放到同一份记录里。" },
  { code: "05", title: "响应判断", owner: "M03", detail: "根据回合事实发布一次响应判断。" },
  { code: "06", title: "危机与设施", owner: "M04 + M04.5", detail: "检查危机状态，并在正式周期里记录设施失序。" },
  { code: "07", title: "事件筛选", owner: "M05", detail: "读取已确认事实，检查条件并生成候选。" },
  { code: "08", title: "开始前复核", owner: "M05", detail: "开始和提交前重新检查最新局势，失效就安全回滚。" },
  { code: "09", title: "事件内容", owner: "内容边界", detail: "未来负责角色、装备、出生点和实际执行，目前还没有生产内容。" },
  { code: "10", title: "运行记录", owner: "只读记录", detail: "保存响应、危机、设施、波次和回合摘要。" },
];

export const roundCoreFacts = {
  sequence: [
    ["等待中", "等待玩家；人数不足时继续走原版流程。"],
    ["回合开始", "达到最低人数后，记录回合编号和开局玩家信息。"],
    ["锁定人数档位", "锁定本局人数档位，供编制、人数上限和响应门槛使用。"],
    ["套用开局编制", "按当前人数档位安排支持的开局编制。"],
    ["已接管", "进入活动状态后，响应判断和增援记录开始向下游发布。"],
  ],
  lifecycle: [
    ["待命", "等待玩家；人数不足时继续走原版流程。"],
    ["运行中", "达到最低人数后锁定本局回合编号、人数档位和开局编制。"],
    ["人数不足，已暂停", "活动回合降到最低人数以下，本局不可逆地暂停插件。"],
    ["回合结束", "回合结束，回合核心和下游模块清理本局状态。"],
  ],
  responsibilities: [
    "记录回合编号、开局人数、人数档位和开局玩家。",
    "根据人数档位应用支持的开局编制。",
    "低于 16 人不接管本局；高于 45 人不强行套用人数表。",
    "回合结束、重启或回到等待状态时，清理本局运行状态。",
  ],
  source: "RoundCore/RoundCoreManager.cs · RoundCore/CompositionResolver.cs · Runtime/PluginRuntimeCoordinator.cs",
};

export const populationProfiles = [
  { tier: "E", range: "16–19", cap: 6, note: "最低人数档" },
  { tier: "D", range: "20–25", cap: 6, note: "低人数档" },
  { tier: "C", range: "26–31", cap: 8, note: "标准人数档" },
  { tier: "B", range: "32–37", cap: 14, note: "高人数档" },
  { tier: "A", range: "38–45", cap: 18, note: "满员档" },
];

export const reinforcementFacts = {
  retained: ["MTF / CI 阵营决定", "原版影响力和增援令牌", "原版计时和玩家选择", "职业组成、装备和实际出生流程"],
  emergency: ["关闭小波次策略", "给原版增援结果套用人数上限", "记录实际出生成员、阵营、完成时间和波次历史", "成功波次完成后延长一次计时，并通知下游重新观察"],
  capNote: "人数上限只是这一波最多允许进入的人数，不是必须刷满的目标；原版只选出 4 人时，上限是 8 也只会出生 4 人。",
  timerNote: "一次性延长只影响当前计时，不会永久改下一波的基础间隔。",
  source: "Reinforcement/ReinforcementManager.cs · Reinforcement/PrimaryWavePolicy.cs · Reinforcement/MajorWaveHistory.cs",
};

export const dlrcMechanismFacts = {
  input: ["PopulationTier", "SCP Threat", "Foundation Pressure", "Foundation Reinforcement Failure", "Time Pressure", "Strategic Hazard"],
  formula: "NaturalResponseScore + PersistentAdjustment → EffectiveResponseScore → 0–100",
  level: "LevelResolver 使用当前 PopulationTier 对应的 L0–L5 阈值，最终 FinalLevel = min(TheoreticalLevel, ControlLevelCap)。",
  code: "DLRC-{人数档位}{响应等级}；有活动危机时，代码会显示为 DLRC-A4-BIO。",
  schedule: ["首次评估：回合开始 391 秒后（约 06:31）", "周期评估：首次评估后每 30 秒", "增援波次完成后：立即重新观察，不重置周期", "管理员手动查询：不重置周期"],
  thresholds: {
    columns: ["L0", "L1", "L2", "L3", "L4", "L5"],
    rows: [
      ["E", 0, 18, 32, 48, 65, 82],
      ["D", 0, 20, 34, 50, 67, 84],
      ["C", 0, 22, 36, 52, 69, 86],
      ["B", 0, 24, 38, 54, 71, 88],
      ["A", 0, 26, 40, 56, 73, 90],
    ],
  },
  source: "Evaluation/DlrcEvaluator.cs · Evaluation/ResponseScoreCalculator.cs · Evaluation/LevelResolver.cs · Config.cs",
};

export const crisisFacts = [
  ["BIO", "SCP-049-2 数量达到当前人数档位的阈值；默认 E/D=3、C/B=4、A=5。"],
  ["SYS", "SCP-079 存在，控制等级有效且达到 3 级。"],
  ["CON", "第二个基金会支援波次完成后，后续收容检查连续失败。"],
  ["SEC", "存在敌对威胁，基金会有效战斗人员又低于当前档位的安全阈值。"],
  ["GOI", "外部敌对组织有战斗人员、响应等级至少为 3，且基金会处于弱势；正式第三方来源仍未接入。"],
  ["WAR", "当前正式运行默认关闭，等可靠的核弹事实接入后再启用。"],
  ["END", "核弹已经爆炸，地表敌对僵持持续达到默认 300 秒。"],
];

export const fdiMechanismFacts = {
  formula: ["上次记录", "+", "新事件变化", "−", "秩序恢复", "→", "当前记录"],
  initial: "第一次正式记录在约 06:31：以当前设施状态为底，再加入最近 120 秒内的新变化。默认初始值为 50。",
  later: "第一次记录之后，只把上一次记录之后的新变化加进来，避免同一件事重复计算。",
  bands: [["低", "0–29", "恢复 0"], ["中", "30–59", "恢复 -1"], ["高", "60–100", "恢复 -2"]],
  recovery: "只有正常周期、上游记录有效、没有新的普通事件或活动危机，且设施没有被摧毁时，静默达到 90 秒才会恢复。",
  relation: "设施记录只会临时影响普通支援的来源选择，不会改写响应等级、危机状态或专业危机资格。",
  source: "Disorder/FacilityDisorderService.cs · Disorder/FacilityDisorderRuntimeManager.cs · Disorder/FacilityDisorderRecoveryDecision.cs",
};

export const directorFacts = {
  boundary: [
    ["事件筛选器", "资格、候选与调度", "读取已经确认的回合事实，检查条件、人数计划、来源、成本和生命周期。"],
    ["事件内容包", "内容与执行", "未来提供角色、枪械、弹药、护甲、医疗、出生点和实际事件行为。"],
  ],
  pipeline: [
    ["读取事实", "读取最新回合记录、响应结果、危机、设施记录和人员信息。"],
    ["确认状态", "确认记录有效、回合编号一致，响应等级和设施状态可用。"],
    ["筛选资格", "按危机条件、危机编号、人数计划、设施状态和人员数量筛选。"],
    ["形成候选", "优先处理专业响应；普通支援才会参考设施记录选择来源。"],
    ["开始前复核", "重新检查人员、危机、响应等级、人数计划和回合编号。"],
    ["提交或回滚", "最新局势仍满足才提交；失效就回滚，不消费资格。"],
  ],
  lifecycle: ["已排程", "判断中", "已选候选", "准备中", "已开始", "已提交", "已完成", "失败", "已回滚"],
  status: "事件筛选框架已经加载，但正式生产事件数量为 0，默认不会自动创建生产事件周期。",
  source: "Director/EventDirector.cs · Director/EventDirectorRuntimeManager.cs · Director/EventEligibilityService.cs · Director/EventSelectionService.cs",
};

export const eventPackFacts = {
  interface: ["事件编号 / 来源", "资格条件与人数档位", "人数计划", "角色 / 出生 / 装备", "运行时接入与清理"],
  status: "正式事件内容包还没制作；仓库里的测试定义只用于自动化验证，不是生产内容。",
  source: "Director/EventDefinition.cs · Director/EventPopulationProfile.cs · Director/TestEvents/TestEventDefinitions.cs",
};

export const architectureLayers = [
  { label: "记录事实", nodes: ["回合核心", "原版增援", "回合记录"] },
  { label: "判断状态", nodes: ["响应判断", "危机识别", "设施记录"] },
  { label: "筛选候选", nodes: ["事件筛选器", "人数计划"] },
  { label: "执行边界", nodes: ["事件内容（尚未制作）", "观察者面板 · 按设计暂缓", "运行记录"] },
];

export const lifecycleStages = [
  ["插件加载", "创建回合运行、判断、危机、设施记录和运行记录模块。"],
  ["等待玩家", "清理上一局的响应、危机、设施、增援、筛选器和回合核心状态。"],
  ["回合开始", "观察人数；达到 16 人才接管这一局并启动后续模块。"],
  ["开局准备", "玩家出生后应用支持的开局编制，并记录设施初始状态。"],
  ["持续判断", "391 秒首次判断，之后每 30 秒更新；重要增援完成后也会重新观察。"],
  ["事件与记录", "危机、设施记录和事件筛选器读取判断结果；运行记录只保存结果。"],
  ["回合结束 / 重启", "完成回合摘要，清理所有模块，下一局重新判断人数。"],
  ["插件关闭", "注销事件，清理服务和运行时引用，回到插件边界。"],
];

export const configurationRows = [
  ["MinimumPlayers", "16", "开局和运行中的最低人数；低于时回退或暂停。", "Config.cs"],
  ["DlrcEvaluatorStartTimeSeconds", "391", "首次 D-LRC 评估时间。", "Config.cs"],
  ["DlrcEvaluatorIntervalSeconds", "30", "周期评估间隔。", "Config.cs"],
  ["PrimaryWaveCaps", "E6 / D6 / C8 / B14 / A18", "Primary Wave 的截断上限，不主动补足名单。", "Config.cs"],
  ["InitialLookbackSeconds", "120", "FDI 首次结算的瞬时事件窗口。", "Disorder/FacilityDisorderConfig.cs"],
  ["QuietWindowSeconds", "90", "FDI Order Recovery 默认静默窗口。", "Disorder/FacilityDisorderConfig.cs"],
  ["CrisisEndActivationSeconds", "300", "END 地表敌对僵持激活窗口。", "Config.cs"],
  ["BalanceTelemetry.RecentRecordCapacity", "2048", "Telemetry 最多保留的记录数。", "Telemetry/BalanceTelemetryConfig.cs"],
];

export const commandRows = [
  ["ee help / status / health", "查看命令帮助、插件状态和健康信息。"],
  ["ee modules / module <name>", "查看模块概览或某个模块的详情。"],
  ["ee round state", "查看当前回合状态。"],
  ["ee wave state|current|last|previous", "查看当前、最近或上一波原版增援。"],
  ["ee wave history <n> / detail", "查看波次历史或某一波的详情。"],
  ["ee wave timers|cap|survival", "查看原版计时器、人数上限和存活观察。"],
  ["ee dlrc state|evaluate", "查询或手动触发一次响应判断。"],
  ["ee dlrc stage [full|raw]", "查看响应判断过程；raw 需要 debug 权限。"],
  ["ee dlrc breakdown|control|snapshot|history <n>", "查看分数明细、局面状态、快照或历史。"],
  ["ee crisis state|list|check <tag>", "查看危机状态、类型列表或指定危机。"],
  ["ee disorder|fdi state|events|history <n>|explain", "查看设施记录、变化、历史或解释。"],
  ["ee enable / disable / config / version", "切换下一局的介入开关，或查看配置和版本。"],
  ["ee cleanup", "清理回合运行时状态。"],
];

export const telemetryRows = [
  ["DLRC_EVALUATION", "记录响应判断输入、分数、最终等级、局面状态、危机和设施记录。"],
  ["PRIMARY_WAVE", "记录原版增援的阵营、档位、实际人数、成员、时间和波次事实。"],
  ["CRISIS_TRANSITION", "记录危机开始、持续、结束和危机编号变化。"],
  ["FDI_SETTLEMENT", "记录设施记录前后值、时间窗口、新变化和恢复结果。"],
  ["SPECTATOR_WAIT", "配置开启时，记录观察者等待情况。"],
  ["ROUND_BALANCE_SUMMARY", "记录回合结束时的平衡观察摘要。"],
];

export const sourceWalkthrough = [
  ["RoundCoreManager.CaptureRoundStart()", "RoundCore/RoundCoreManager.cs", "锁定 RoundId、开局人口、PopulationTier 和 roster。"],
  ["CompositionResolver.GetComposition()", "RoundCore/CompositionResolver.cs", "把 16–45 人映射到 E–A 档和 CompositionTable。"],
  ["DlrcEvaluatorService.RunScheduledEvaluation()", "Evaluation/DlrcEvaluatorService.cs", "按 391 秒首评、30 秒周期发布评估事件。"],
  ["ResponseScoreCalculator.Calculate()", "Evaluation/ResponseScoreCalculator.cs", "合成五组压力分数，最后限制在 0–100。"],
  ["CrisisManager.Evaluate()", "Crisis/CrisisManager.cs", "调用七个危机检查器，维护当前危机和危机编号。"],
  ["FacilityDisorderService.Settle()", "Disorder/FacilityDisorderService.cs", "执行首次库存/窗口结算，或进行后续增量结算。"],
  ["EventDirector.SelectCycle()", "Director/EventDirector.cs", "按资格、人口计划和来源仲裁，选择声明式周期。"],
  ["Plugin.OnDlrcEvaluationCompleted()", "Plugin.cs", "串起 Crisis、FDI、Telemetry 和 Event Director 的消费顺序。"],
];

export const mechanismStatus = [
  ["M01", "回合核心", "已完成", "回合资格、人数档位、开局编制和清理边界。"],
  ["M02", "原版增援接入", "已完成", "保留原版增援，加入人数上限、关闭小波次和波次记录。"],
  ["M03", "响应判断", "框架完成", "分数、等级、局面状态和历史接口存在，平衡仍需真人数据。"],
  ["M04", "危机识别", "已完成", "七类危机检查、开始/结束状态和危机编号。"],
  ["M04.5", "设施失序记录", "框架完成", "设施记录和恢复逻辑存在，参数仍需真人数据校准。"],
  ["M05", "事件筛选器", "框架完成", "资格、候选和生命周期边界存在，正式事件内容尚未开始。"],
  ["M06", "观察者面板", "按设计暂缓", "不把面板、投票和玩家资格写成正式事件执行能力。"],
  ["—", "事件内容包", "开发中", "正式事件内容和执行器尚未制作。"],
  ["—", "运行记录", "已完成", "只读记录已经实现，仍等待真人运行数据。"],
  ["—", "真人验证", "等待验证", "没有可以在官网宣称的真人实服结果。"],
];
