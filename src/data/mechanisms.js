export const mechanismSections = [
  { id: "overview", label: "总览" },
  { id: "round-core", label: "Round Core" },
  { id: "reinforcement", label: "Reinforcement" },
  { id: "dlrc", label: "D-LRC" },
  { id: "crisis", label: "Crisis" },
  { id: "fdi", label: "FDI" },
  { id: "director", label: "Director" },
  { id: "event-pack", label: "Event Pack" },
  { id: "architecture", label: "模块关系" },
  { id: "lifecycle", label: "运行周期" },
  { id: "configuration", label: "配置" },
  { id: "commands", label: "命令" },
  { id: "telemetry", label: "Telemetry" },
  { id: "source", label: "源码路径" },
  { id: "status", label: "状态" },
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
  { code: "01", title: "Round Start", owner: "Plugin / Runtime", detail: "Plugin.OnRoundStarted() 先观察开局人数，Runtime 决定本局是否接管。" },
  { code: "02", title: "Round Core", owner: "M01", detail: "CaptureRoundStart() 锁定 RoundId、开局人数、PopulationTier 与编制。" },
  { code: "03", title: "Reinforcement", owner: "M02", detail: "围绕原版 Primary Wave 记录实际出生、阵营、成员与波次历史。" },
  { code: "04", title: "Round Facts", owner: "M01 + M02", detail: "回合快照汇总人口、SCP、人员、波次、死亡窗口与核弹事实。" },
  { code: "05", title: "Evaluation", owner: "M03", detail: "DlrcEvaluatorService 发布一次绑定 RoundId 的 DlrcEvaluationCompletedEvent。" },
  { code: "06", title: "Crisis / FDI", owner: "M04 + M04.5", detail: "CrisisManager 评估七类 Detector，FDI 在合法 PERIODIC 上结算设施失序。" },
  { code: "07", title: "Director", owner: "M05", detail: "Event Director 读取已发布事实，执行资格、候选、来源和 Population Plan。" },
  { code: "08", title: "Revalidate", owner: "M05", detail: "Start 与 Commit 前重新验证最新上下文，失效候选安全回滚。" },
  { code: "09", title: "Event Pack", owner: "内容边界", detail: "正式 Event Pack 负责角色、装备、出生点和实际事件执行，目前尚未注册。" },
  { code: "10", title: "Telemetry", owner: "只读观察器", detail: "BalanceTelemetryService 记录评估、危机、FDI、波次和回合摘要。" },
];

export const roundCoreFacts = {
  lifecycle: [
    ["STANDBY", "等待玩家或开局人数不足，保持原版流程。"],
    ["ACTIVE", "达到 MinimumPlayers 后锁定本局 RoundId、人口档位和开局编制。"],
    ["LOW_POPULATION_SUSPENDED", "活动回合降到最低人数以下，本回合不可逆暂停 Emergency Events。"],
    ["ROUND_ENDED", "回合结束，Round Core 与下游模块清理回合状态。"],
  ],
  responsibilities: [
    "CaptureRoundStart() 记录 RoundId、开局人数、PopulationTier 和开局玩家 ID。",
    "ApplyOpeningComposition() 按 CompositionTable 应用已支持人数的开局编制。",
    "低于 16 人不接管本局；高于 45 人标记 unsupported，不强行套用组成表。",
    "回合结束、重启或 WaitingForPlayers 时恢复徽章并清理运行时状态。",
  ],
  source: "RoundCore/RoundCoreManager.cs · RoundCore/CompositionResolver.cs · Runtime/PluginRuntimeCoordinator.cs",
};

export const populationProfiles = [
  { tier: "E", range: "16–19", cap: 6, note: "低人数档" },
  { tier: "D", range: "20–25", cap: 6, note: "小规模档" },
  { tier: "C", range: "26–31", cap: 8, note: "标准档" },
  { tier: "B", range: "32–37", cap: 14, note: "扩展档" },
  { tier: "A", range: "38–45", cap: 18, note: "高人数档" },
];

export const reinforcementFacts = {
  retained: ["MTF / CI 阵营决定", "Influence 与 Respawn Token", "原版计时器和玩家选择", "职业组成、装备与实际出生流程"],
  emergency: ["禁用 Mini-Wave", "按 PopulationTier 对 Primary Wave 结果做人数 cap", "记录实际出生、成员、阵营、完成时间和波次历史", "成功波次完成后应用一次 Timer Extension，并发布 POST_MAJOR_WAVE"],
  capNote: "Cap 是最多允许进入这一波的人数，不是补足目标；原版只选择 4 人时，cap=8 也仍然只出生 4 人。",
  timerNote: "默认刷新方 +60 秒、对方 +15 秒，只作用于当前 timer reset/recalculation，不永久改变下一波基础间隔。",
  source: "Reinforcement/ReinforcementManager.cs · Reinforcement/PrimaryWavePolicy.cs · Reinforcement/MajorWaveHistory.cs",
};

export const dlrcMechanismFacts = {
  input: ["PopulationTier", "SCP Threat", "Foundation Pressure", "Foundation Reinforcement Failure", "Time Pressure", "Strategic Hazard"],
  formula: "NaturalResponseScore + PersistentAdjustment → EffectiveResponseScore → 0–100",
  level: "LevelResolver 使用当前 PopulationTier 对应的 L0–L5 阈值，最终 FinalLevel = min(TheoreticalLevel, ControlLevelCap)。",
  code: "DLRC-{PopulationTier}{FinalLevel}，带活动 Crisis 标签时展示为 DLRC-A4-BIO。",
  schedule: ["首次评估：391 秒（约 06:31）", "周期评估：首次评估后每 30 秒", "POST_MAJOR_WAVE：Primary Wave 完成后即时重算，不重置周期", "MANUAL_RA：管理员手动评估，不重置周期"],
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
  ["BIO", "SCP-049-2 数量达到当前 PopulationTier 的阈值；默认 E/D=3、C/B=4、A=5。"],
  ["SYS", "SCP-079 存在且 Tier 数据有效，Tier ≥ 3。"],
  ["CON", "第二个 Foundation/MTF Primary Wave 完成后，后续 containment checkpoint 出现失败 streak。"],
  ["SEC", "存在敌对威胁，且 Foundation combatants 不超过当前档位安全阈值。"],
  ["GOI", "HostileThirdPartyActive、有外部战斗人员、FinalLevel ≥ 3，且 Foundation 为 WEAK/CRITICAL；生产 provider 仍为 provisional。"],
  ["WAR", "核弹已解锁且尚未爆炸。"],
  ["END", "核弹已爆炸，且地表敌对僵持持续达到默认 300 秒。"],
];

export const fdiMechanismFacts = {
  formula: ["Previous FDI", "+", "New Event Delta", "−", "Order Recovery", "→", "Current FDI"],
  initial: "首次合法 PERIODIC 结算（约 06:31）：InitialBase + CurrentStockAdjustment + Recent120sTransientDelta。默认 InitialBase=50，瞬时窗口=120 秒。",
  later: "首次结算后只使用 PreviousFDI + NewEventDelta，窗口从 LastProcessedAt 之后开始，避免重复消费。",
  bands: [["LOW", "0–29", "恢复 Delta 0"], ["MEDIUM", "30–59", "恢复 Delta -1"], ["HIGH", "60–100", "恢复 Delta -2"]],
  recovery: "只有正常 PERIODIC、上游有效、无普通事件 Delta、无 Active Crisis、无 Chaos/Hostile 存量、设施未 Destroyed 且静默达到 90 秒时才恢复。",
  relation: "FDI 是独立设施秩序事实，只临时影响普通 SUPPORT 来源仲裁，不改写 D-LRC、Crisis 或 Professional Crisis Response 资格。",
  source: "Disorder/FacilityDisorderService.cs · Disorder/FacilityDisorderRuntimeManager.cs · Disorder/FacilityDisorderRecoveryDecision.cs",
};

export const directorFacts = {
  boundary: [
    ["EVENT DIRECTOR", "资格、候选与调度", "读取 M01–M04.5 的官方事实，执行 Eligibility、Population Plan、来源仲裁、选择、成本和生命周期。"],
    ["EVENT PACK", "内容与执行", "提供 EventId 对应的角色、枪械、弹药、护甲、医疗、出生点、运行时 Hook 和实际事件行为。"],
  ],
  pipeline: [
    ["OBSERVE", "读取最新 RoundSnapshot、Evaluation、CrisisAssessment、FDI 与人员事实。"],
    ["EVALUATE", "确认 Evaluation 有效、RoundId 一致、FinalLevel 和 FacilityState 可用。"],
    ["ELIGIBILITY", "按 RequiredCrisisTags（AND）、Episode、人口计划、设施状态和人员数量筛选。"],
    ["CANDIDATE POOL", "专业响应优先；普通 SUPPORT 才使用 FDI 临时来源仲裁。"],
    ["REVALIDATE", "TryStart 与 RevalidateBeforeCommit 重新检查人员、危机 Episode、Level、Population Plan 和 RoundId。"],
    ["COMMIT / ROLLBACK", "只有最新上下文仍满足才提交并消费成本；失效则回滚，不消费资格。"],
  ],
  lifecycle: ["Scheduled", "Evaluating", "Selected", "Prepared", "Started", "Committed", "Completed", "Failed", "RolledBack"],
  status: "M05 框架已加载，但生产 EventDefinition 数量为 0，默认不自动创建生产事件周期。",
  source: "Director/EventDirector.cs · Director/EventDirectorRuntimeManager.cs · Director/EventEligibilityService.cs · Director/EventSelectionService.cs",
};

export const eventPackFacts = {
  interface: ["EventId / Provider", "Eligibility 与 Population Profile", "Population Plan", "Role / Spawn / Loadout", "Runtime hook 与清理"],
  status: "正式 Event Pack 尚未制作，仓库中的 TestEventDefinitions 只用于自动化验证，不是生产内容。",
  source: "Director/EventDefinition.cs · Director/EventPopulationProfile.cs · Director/TestEvents/TestEventDefinitions.cs",
};

export const architectureLayers = [
  { label: "事实来源", nodes: ["M01 Round Core", "M02 Reinforcement", "RoundSnapshot"] },
  { label: "评估层", nodes: ["M03 D-LRC Evaluator", "M04 Crisis System", "M04.5 FDI"] },
  { label: "决策层", nodes: ["M05 Event Director", "Population Plan", "O4 fallback"] },
  { label: "执行与观察", nodes: ["Event Pack（未制作）", "Runtime result", "Telemetry"] },
];

export const lifecycleStages = [
  ["Plugin enable", "OnEnabled() 创建 Runtime、M01–M05、Telemetry，并注册 EXILED 事件。"],
  ["Waiting for players", "清理上一局的 D-LRC、FDI、Crisis、Director、Reinforcement 和 Round Core 状态。"],
  ["Round start", "Runtime 观察人数；满足 16 人才 CaptureRoundStart() 并启动下游模块。"],
  ["Initial setup", "AllPlayersSpawned 后应用开局编制，并安排 FDI opening force baseline。"],
  ["Evaluation", "M03 按 391 秒首评、30 秒周期，POST_MAJOR_WAVE 与 MANUAL_RA 可即时触发。"],
  ["Event / observation", "M04、FDI、M05 消费评估结果；Telemetry 只读记录官方结果。"],
  ["Round end / restart", "完成回合摘要并清理所有模块状态，下一局重新判断人口。"],
  ["Plugin disable", "注销事件、清理服务和运行时引用，恢复插件边界。"],
];

export const configurationRows = [
  ["MinimumPlayers", "16", "开局与运行中最低人数；低于时回退或暂停。", "Config.cs"],
  ["DlrcEvaluatorStartTimeSeconds", "391", "首次 D-LRC 评估时间。", "Config.cs"],
  ["DlrcEvaluatorIntervalSeconds", "30", "周期评估间隔。", "Config.cs"],
  ["PrimaryWaveCaps", "E6 / D6 / C8 / B14 / A18", "Primary Wave 截断上限，不主动补足名单。", "Config.cs"],
  ["InitialLookbackSeconds", "120", "FDI 首次结算的瞬时事件窗口。", "Disorder/FacilityDisorderConfig.cs"],
  ["QuietWindowSeconds", "90", "FDI Order Recovery 默认静默窗口。", "Disorder/FacilityDisorderConfig.cs"],
  ["CrisisEndActivationSeconds", "300", "END 地表敌对僵持激活窗口。", "Config.cs"],
  ["BalanceTelemetry.RecentRecordCapacity", "2048", "Telemetry 有界记录容量。", "Telemetry/BalanceTelemetryConfig.cs"],
];

export const commandRows = [
  ["ee help / status / health", "查看命令帮助、Runtime 状态和健康信息。"],
  ["ee modules / module <name>", "查看模块摘要或单个模块详情。"],
  ["ee round state", "查看当前回合状态。"],
  ["ee wave state|current|last|previous", "查看当前、最近或上一波 Primary Wave。"],
  ["ee wave history <n> / detail", "查看波次历史或指定波次详情。"],
  ["ee wave timers|cap|survival", "查看原版计时器、Population cap 和生存观察。"],
  ["ee dlrc state|evaluate", "查询或手动触发一次 D-LRC 评估。"],
  ["ee dlrc stage [full|raw]", "查看 D-LRC 阶段报告；raw 需要 debug 权限。"],
  ["ee dlrc breakdown|control|snapshot|history <n>", "查看评分分项、Control、快照或历史。"],
  ["ee crisis state|list|check <tag>", "查看危机状态、标签列表或指定 Detector。"],
  ["ee disorder|fdi state|events|history <n>|explain", "查看 FDI 当前状态、事件、历史或解释。"],
  ["ee enable / disable / config / version", "切换下一局介入开关或查看配置、版本。"],
  ["ee cleanup", "清理回合运行时状态。"],
];

export const telemetryRows = [
  ["DLRC_EVALUATION", "评估输入、Natural/Effective Score、Theoretical/Final Level、Control、Crisis 与 FDI。"],
  ["PRIMARY_WAVE", "Primary Wave 阵营、档位、实际人数、成员、时间与波次事实。"],
  ["CRISIS_TRANSITION", "Crisis Active、Activated、Resolved 与 Episode 变化。"],
  ["FDI_SETTLEMENT", "FDI 前后值、窗口、事件 Delta、Recovery Gate 与 DisorderBand。"],
  ["SPECTATOR_WAIT", "配置开启时记录 Spectator wait 观察。"],
  ["ROUND_BALANCE_SUMMARY", "回合结束时的平衡观察摘要。"],
];

export const sourceWalkthrough = [
  ["RoundCoreManager.CaptureRoundStart()", "RoundCore/RoundCoreManager.cs", "锁定 RoundId、开局人口、PopulationTier 与 roster。"],
  ["CompositionResolver.GetComposition()", "RoundCore/CompositionResolver.cs", "把 16–45 人映射到 E–A 档和 CompositionTable。"],
  ["DlrcEvaluatorService.RunScheduledEvaluation()", "Evaluation/DlrcEvaluatorService.cs", "按 391 秒首评、30 秒周期发布评估事件。"],
  ["ResponseScoreCalculator.Calculate()", "Evaluation/ResponseScoreCalculator.cs", "合成五组压力分数并限制在 0–100。"],
  ["CrisisManager.Evaluate()", "Crisis/CrisisManager.cs", "调用七个无状态 Detector，维护 ActiveTags 与 Episode。"],
  ["FacilityDisorderService.Settle()", "Disorder/FacilityDisorderService.cs", "执行首次库存/窗口结算或后续增量结算。"],
  ["EventDirector.SelectCycle()", "Director/EventDirector.cs", "按资格、人口计划和来源仲裁选择声明式周期。"],
  ["Plugin.OnDlrcEvaluationCompleted()", "Plugin.cs", "串联 Crisis、FDI、Telemetry 和 Event Director 的消费顺序。"],
];

export const mechanismStatus = [
  ["M01", "Round Core", "已完成", "回合资格、PopulationTier、开局编制和清理边界。"],
  ["M02", "Reinforcement Integration", "已完成", "保留原版 Primary Wave，加入 cap、Mini-Wave 禁用和波次事实。"],
  ["M03", "D-LRC Evaluator", "框架完成", "评分、等级、Control 与历史接口存在，平衡仍需真人数据。"],
  ["M04", "Crisis System", "已完成", "七类 Detector、Active/Inactive 和 Episode。"],
  ["M04.5", "Facility Disorder Index", "框架完成", "FDI 结算与恢复逻辑存在，参数仍需真人数据校准。"],
  ["M05", "Event Director", "框架完成", "资格、候选和生命周期边界存在，生产 Event Pack 尚未开始。"],
  ["M06", "O4 Panel", "按设计暂缓", "DEFERRED BY DESIGN；不实现 HUD、投票、玩家资格或 Observer UX。"],
  ["—", "Event Pack", "开发中", "正式生产事件内容和执行器尚未制作。"],
  ["—", "Telemetry", "已完成", "JSONL observer 已实现，仍等待真人运行数据。"],
  ["—", "Live Validation", "等待验证", "没有可以在官网宣称的真人实服结果。"],
];
