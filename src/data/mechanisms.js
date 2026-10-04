export const mechanismNavGroups = [
  {
    label: "ARCHITECTURE",
    items: [
      { id: "system-architecture", label: "系统架构" },
      { id: "responsibilities", label: "职责矩阵" },
    ],
  },
  {
    label: "RUNTIME BACKBONE",
    items: [
      { id: "round-core", label: "M01 · Round Core" },
      { id: "reinforcement", label: "M02 · Reinforcement" },
    ],
  },
  {
    label: "STATE & EVALUATION",
    items: [
      { id: "dlrc", label: "M03 · D-LRC" },
      { id: "crisis", label: "M04 · Crisis" },
      { id: "fdi", label: "M04.5 · FDI" },
    ],
  },
  {
    label: "DECISION & CONTENT",
    items: [
      { id: "director", label: "M05 · Event Director" },
      { id: "event-pack", label: "Event Pack" },
      { id: "o4", label: "M06 · O4 Panel" },
    ],
  },
  {
    label: "GAMEPLAY LAYER",
    items: [
      { id: "m07", label: "M07 · Opening Roles" },
      { id: "traces", label: "System Traces" },
      { id: "implementation-status", label: "Implementation Notes" },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      { id: "lifecycle", label: "Runtime Lifecycle" },
      { id: "configuration", label: "Configuration" },
      { id: "commands", label: "RemoteAdmin" },
      { id: "telemetry", label: "Telemetry" },
      { id: "source", label: "Source & Tests" },
    ],
  },
];

export const responsibilityRows = [
  {
    module: "M01",
    name: "Round Core",
    owns: "Round lifecycle; population tier; opening slot quantities; RoundId.",
    consumes: "Round start, plugin enable state, current player population.",
    produces: "Runtime state; locked PopulationTier; opening Composition.",
    excludes: "Concrete role Variant; SCP roster selection; Event selection.",
    status: ["IMPLEMENTED"],
  },
  {
    module: "M02",
    name: "Reinforcement Integration",
    owns: "Mini-Wave policy; Primary Wave ceiling; actual wave facts; timer extension.",
    consumes: "Vanilla respawn decision, eligible roster, timer reset and wave events.",
    produces: "MajorWaveCompletedEvent; POST_MAJOR_WAVE; wave history.",
    excludes: "Opening roles; forced faction choice; custom respawn timer.",
    status: ["IMPLEMENTED"],
  },
  {
    module: "M03",
    name: "D-LRC Evaluator",
    owns: "Response score; Control assessment; L0–L5; DLRC Code.",
    consumes: "Round snapshot, SCP and personnel state, Foundation wave facts, time and hazards.",
    produces: "DlrcEvaluationResult; ResponseBreakdown; validity and evaluation history.",
    excludes: "Crisis severity; event or role generation.",
    status: ["IMPLEMENTED", "LIVE VALIDATION PENDING"],
  },
  {
    module: "M04",
    name: "Crisis System",
    owns: "BIO/SYS/CON/SEC/GOI/WAR/END tags and Episode lifecycle.",
    consumes: "Valid D-LRC evaluation and same-round facts.",
    produces: "CrisisAssessment; ActiveTags; Episode IDs; transition events.",
    excludes: "Crisis Severity; event selection; role generation.",
    status: ["IMPLEMENTED"],
  },
  {
    module: "M04.5",
    name: "Facility Disorder Index",
    owns: "0–100 historical facility disorder state and settlement history.",
    consumes: "PERIODIC evaluation, facility stock and recent DisorderEvent deltas.",
    produces: "FDI value/band; settlement and recovery facts for normal SUPPORT weighting.",
    excludes: "D-LRC; Crisis state; professional response eligibility.",
    status: ["IMPLEMENTED", "LIVE VALIDATION PENDING"],
  },
  {
    module: "M05",
    name: "Event Director",
    owns: "Eligibility; source arbitration; Candidate/Selected plans; Revalidate and Commit.",
    consumes: "M01, M02, valid M03, M04 and M04.5 facts.",
    produces: "DirectorContext; EventCandidate; lifecycle decisions; Event #2 DueAt.",
    excludes: "Event gameplay execution; spawn, equipment or ability implementation.",
    status: ["IMPLEMENTED"],
  },
  {
    module: "M06",
    name: "O4 Panel",
    owns: "Observer Hint panel and finite selection session for an M05 shortlist.",
    consumes: "M05 eligible Foundation normal SUPPORT shortlist; current O4 eligibility.",
    produces: "Bound O4SelectionResult for M05 to validate and resolve.",
    excludes: "Candidate creation; source selection; Chaos/GOI control; professional response.",
    status: ["IMPLEMENTED", "LIVE VALIDATION PENDING"],
  },
  {
    module: "M07",
    name: "Opening Role & Ability",
    owns: "Opening identities; Role Variants; SCP augmentation; ability runtime; HUD, Badge and WorldEffect.",
    consumes: "M01 opening slots and each player's current role/lifecycle.",
    produces: "Concrete opening assignments; abilities; shared HUD fragments; Badge projection; WorldEffects.",
    excludes: "Mid-round reinforcement; Event scheduling; Event Pack execution.",
    status: ["IMPLEMENTED", "LOGIC TESTED", "LIVE VALIDATION PENDING"],
  },
  {
    module: "—",
    name: "Event Pack",
    owns: "EventDefinition implementation; Executor; spawn; roles; equipment; objectives; lifecycle and cleanup.",
    consumes: "M05 committed plan and resolved population profile.",
    produces: "Actual event gameplay and rollback/cleanup.",
    excludes: "Decision policy; D-LRC; Round Core; Reinforcement.",
    status: ["IN DEVELOPMENT"],
  },
];

export const mechanismFacts = {
  minimumPlayers: 16,
  evaluationStartSeconds: 391,
  evaluationIntervalSeconds: 30,
  primaryWaveCaps: { E: 6, D: 6, C: 8, B: 14, A: 18 },
  fdiRange: "0–100",
  fdiRecoverySeconds: 90,
  testBaseline: "313 / 313",
};

export const populationProfiles = [
  { tier: "E", range: "16–19", cap: 6 },
  { tier: "D", range: "20–25", cap: 6 },
  { tier: "C", range: "26–31", cap: 8 },
  { tier: "B", range: "32–37", cap: 14 },
  { tier: "A", range: "38–45", cap: 18 },
];

export const roundCoreFacts = {
  states: [
    ["DISABLED", "Emergency Events 已关闭。"],
    ["STANDBY", "开局人数低于 16；本局继续原版流程。"],
    ["ACTIVE", "达到最低开局人数，RoundId、PopulationTier 和槽位数量已锁定。"],
    ["LOW_POPULATION_SUSPENDED", "ACTIVE 后人数低于 16；本局接管永久暂停。"],
    ["ROUND_ENDED", "本局结束并清理回合状态。"],
    ["ERROR", "运行时进入错误状态。"],
  ],
  transitions: [
    ["Round Start < 16", "STANDBY", "Vanilla behavior"],
    ["Round Start ≥ 16", "ACTIVE", "Lock RoundId + tier + slots"],
    ["ACTIVE population < 16", "LOW_POPULATION_SUSPENDED", "No reactivation this round"],
  ],
  slots: [
    ["D-Class", "8 slots"],
    ["Scientist", "3 slots"],
    ["Security", "4 slots"],
    ["SCP", "4 slots"],
  ],
  source: "RoundCore/RoundCoreManager.cs · RoundCore/CompositionResolver.cs · Runtime/PluginRuntimeCoordinator.cs",
};

export const reinforcementFacts = {
  vanillaStages: ["Faction choice", "Player selection", "Role composition", "Equipment", "Spawn"],
  intervention: [
    ["Mini-Wave", "EE takeover 时关闭 Mini-Wave。"],
    ["Primary Wave cap", "按人口档位设置 MaximumRespawnAmount ceiling。"],
    ["Wave facts", "记录真实阵营、玩家、实际人数和完成时间。"],
    ["Timer extension", "Vanilla reset 后 snapshot → qualification → 每阵营幂等 → apply → client timer → telemetry。"],
  ],
  caps: populationProfiles.map(({ tier, cap }) => [tier, cap]),
  capNote: "cap 是上限。Vanilla 只准备 5 人时，B 档 cap 14 仍只生成 5 人，不补足到 14。",
  outputs: ["MajorWaveCompletedEvent", "POST_MAJOR_WAVE"],
  source: "Reinforcement/ReinforcementManager.cs · Reinforcement/PrimaryWavePolicy.cs · Reinforcement/PrimaryWaveTimerExtensionPolicy.cs",
};

export const dlrcMechanismFacts = {
  inputs: [
    "SCP Threat",
    "Foundation Pressure",
    "Foundation Reinforcement Failure",
    "Time Pressure",
    "Strategic Hazard",
  ],
  stages: [
    ["EffectiveResponseScore", "有效响应分"],
    ["TheoreticalLevel", "理论等级"],
    ["ControlLevelCap", "局面等级上限"],
    ["FinalLevel", "最终等级"],
  ],
  resultFields: [
    "NaturalResponseScore", "PersistentAdjustment", "EffectiveResponseScore", "ResponseBreakdown",
    "TheoreticalLevel", "ControlState", "ControlLevelCap", "FinalLevel", "IsValid", "Code",
  ],
  schedule: [
    "首次正式评估：391 秒（约 06:31）。",
    "之后每 30 秒计算一次。",
    "Major Wave 完成后可立即观察；不重置 PERIODIC 周期。",
  ],
  code: {
    prefix: "DLRC",
    population: "A",
    level: "4",
    crisis: "BIO",
    full: "DLRC-A4-BIO",
  },
  thresholds: [
    ["E", 0, 18, 32, 48, 65, 82],
    ["D", 0, 20, 34, 50, 67, 84],
    ["C", 0, 22, 36, 52, 69, 86],
    ["B", 0, 24, 38, 54, 71, 88],
    ["A", 0, 26, 40, 56, 73, 90],
  ],
  source: "Evaluation/DlrcEvaluator.cs · Evaluation/ResponseScoreCalculator.cs · Evaluation/LevelResolver.cs · Config.cs",
};

export const crisisFacts = [
  {
    tag: "BIO",
    signal: "049-2 数量",
    rule: "E/D ≥ 3；C/B ≥ 4；A ≥ 5。",
    note: "使用当前 PopulationTier 的默认 ActivationThreshold。",
  },
  {
    tag: "SYS",
    signal: "SCP-079 与有效层级",
    rule: "SCP-079 存在，且有效层级 ≥ 3。",
    note: "读取同一份有效 D-LRC evaluation。",
  },
  {
    tag: "CON",
    signal: "Foundation checkpoint",
    rule: "第二次已完成 Foundation/MTF Major Wave 后，checkpoint failure streak 成立。",
    note: "Chaos Wave 不建立 Foundation checkpoint baseline。",
  },
  {
    tag: "SEC",
    signal: "敌对威胁 + Foundation combatants",
    rule: "人数不高于阈值：E 1 · D 2 · C 2 · B 4 · A 5。",
    note: "hostile threat 可来自存活 SCP、Chaos 或已登记第三方。",
  },
  {
    tag: "GOI",
    signal: "第三方战斗人员、D-LRC 与 Foundation state",
    rule: "已登记敌对人员 > 0；FinalLevel ≥ 3；Foundation WEAK/CRITICAL。",
    note: "GOI 输入仍标为 provisional；未来第三方来源不可一概视为已接入。",
  },
  {
    tag: "WAR",
    signal: "Warhead facts",
    rule: "启用时：Warhead unlocked 且未 detonated；countdown 作为 reason/fact。",
    note: "CrisisWarEnabled 默认关闭。",
  },
  {
    tag: "END",
    signal: "爆炸后的地表僵持",
    rule: "Warhead detonated + hostile surface standoff ≥ 300 秒。",
    note: "300 秒为当前默认值。",
  },
];

export const crisisEpisodeLifecycle = [
  ["Inactive → Active", "NEW EPISODE"],
  ["Active → Active", "SAME EPISODE"],
  ["Active → Inactive", "RESOLVED"],
  ["Inactive → Active again", "NEW EPISODE"],
];

export const fdiMechanismFacts = {
  meaning: "0–100 的历史设施失序状态。",
  initial: [
    ["InitialBase", "当前存量调整", "最近 120 秒 transient delta"],
    "首次正式结算与第一次正式评估同时发生，约 06:31。",
  ],
  later: "PreviousFDI + NewEventDelta",
  recovery: "FacilityDisorderRecoveryPolicy 默认 90 秒；满足周期恢复条件后回落。",
  settlement: [
    ["PERIODIC", "推进正式 Settlement Window"],
    ["POST_MAJOR_WAVE", "只观察；不推进结算窗口"],
    ["MANUAL_RA", "只观察；不推进结算窗口"],
  ],
  relation: "FDI 仅临时影响 M05 normal SUPPORT 的 Foundation / Chaos / GOI 来源权重；不决定 Professional Crisis Response。",
  stateFields: [
    ["CurrentFacilityDisorder", "0–100 runtime value"],
    ["DisorderBand", "LOW / MEDIUM / HIGH"],
    ["LastSettlementAt", "最近一次正式结算时间"],
    ["LastSettlement", "最近一次结算详情"],
  ],
  source: "Disorder/FacilityDisorderService.cs · Disorder/FacilityDisorderRecoveryDecision.cs · Disorder/FacilityDisorderRuntimeManager.cs",
};

export const directorFacts = {
  eligibility: [
    "Enabled",
    "Valid Evaluation + matching RoundId",
    "Required Response Level",
    "Required Crisis Tags（AND）+ Episode state",
    "Population plan",
    "FacilityState",
    "Available personnel",
  ],
  pipeline: [
    ["All Definitions", "注册的事件定义进入筛选。"],
    ["Eligibility", "检查当前有效上下文与定义条件。"],
    ["Professional Priority", "Professional Crisis Response 优先于普通 SUPPORT。"],
    ["Source Arbitration", "只有 normal SUPPORT 进入 Foundation / Chaos / GOI 等来源仲裁；FDI 只临时调权。"],
    ["Candidate", "形成候选计划，尚未执行。"],
    ["Selected", "选中的仍是计划，不代表已经生成。"],
    ["TryStart", "对已选中的 Plan 发起启动尝试。"],
    ["Revalidate", "开始前读取最新 context，复核资格、RoundId 与可用人员。"],
    ["Commit", "验证通过后提交；失败走 Rollback。"],
  ],
  failure: ["Rollback", "No cost", "No professional consumption", "No Event #2"],
  event2: [
    ["Event #1 actual spawn", "起算点"],
    ["+ 60 seconds", "DueAt"],
    ["Runtime polling", "到期后安排"],
  ],
  event2Note: "Event #2 只允许 NON_SUPPORT。Event #1 未真正开始时跳过第二槽。",
  source: "Director/EventDirector.cs · Director/EventEligibilityService.cs · Director/EventSelectionService.cs · Director/EventDirectorScheduler.cs",
};

export const eventPackFacts = {
  responsibilities: [
    "EventDefinition",
    "Executor",
    "Spawn",
    "Role",
    "Equipment",
    "Abilities",
    "Objectives",
    "Lifecycle",
    "Rollback",
    "Cleanup",
  ],
  status: "IN DEVELOPMENT · 当前没有注册的 production EventDefinition。",
  source: "docs/EVENT_PACK_DEVELOPMENT.md · Director/EventDefinition.cs · Director/TestEvents/TestEventDefinitions.cs",
};

export const o4Facts = {
  status: ["IMPLEMENTED", "LIVE VALIDATION PENDING"],
  current: [
    "M06 运行 Hint 面板，并向 M05 提供有限选择接口。",
    "只接收 M05 已完成 source arbitration 后的 Foundation normal SUPPORT shortlist，最多 2 个候选。",
    "O4 不创建或重排候选，也不选择来源、不消费 Professional Response。",
    "当前生产 EventDefinition 数量为 0，因此还没有生产候选触发该选择链。",
    "多个候选需要 O4、但当前没有合法 O4 时，跳过当前 O4-required SUPPORT，不自动替代来源。",
  ],
  input: "当前合法 Spectator/Overwatch；动态资格随投票会话变化。",
  interaction: "ClientCommandHandler 命令为 o4vote <1|2>；输入 UX 与实时 Hint 仍待实服验证。",
  source: "O4/O4PanelRuntimeService.cs · O4/O4VoteCommand.cs · Director/IO4EventSelector.cs · docs/O4_PANEL.md",
};

export const systemTraces = [
  {
    id: "A",
    title: "ROUND START",
    steps: ["Population", "M01 Round Core", "Composition Slots", "M07", "Concrete Roles", "Abilities / HUD / Badge"],
  },
  {
    id: "B",
    title: "MAJOR WAVE",
    steps: ["Vanilla Reinforcement", "M02", "MajorWaveCompletedEvent", "M03 + M04 + M04.5", "M05", "Possible Event Plan"],
  },
  {
    id: "C",
    title: "BIOHAZARD",
    steps: ["SCP-049", "M07 Ability", "Room WorldEffect", "Biohazard Tags", "Future BIO / allowed Event", "Cleanse API"],
  },
  {
    id: "D",
    title: "EVENT",
    steps: ["M03 + M04 + M04.5", "DirectorContext", "M05 Candidate", "Revalidate", "Commit", "Event Pack Executor"],
  },
];

export const lifecycleStages = [
  ["Plugin load", "创建模块服务，并注册各自负责的运行时与清理入口。"],
  ["Waiting for players", "清理上一局状态，保持原版流程。"],
  ["Round start", "M01 根据开局人数决定 STANDBY 或 ACTIVE，并锁定槽位数量。"],
  ["Opening roles", "M07 消费 M01 slots，分配具体角色身份与开局能力。"],
  ["Mid-round", "M02 围绕原版 Primary Wave 采集事实；M03/M04/M04.5 根据有效上下文更新。"],
  ["Decision", "M05 检查候选并在启动前 revalidate；Event Pack 提供已提交计划的执行内容。"],
  ["Round end / restart", "各模块清理自己的回合状态；下局重新评估。"],
];

export const configurationRows = [
  ["MinimumPlayers", "16", "开局与运行中的接管下限。", "Config.cs"],
  ["Population tiers", "E16–19 / D20–25 / C26–31 / B32–37 / A38–45", "开局锁定的人数档位。", "RoundCore/CompositionTable.cs"],
  ["D-LRC first / interval", "391s / 30s", "首次正式评估与后续周期。", "Config.cs"],
  ["Primary Wave caps", "E6 / D6 / C8 / B14 / A18", "原版 Primary Wave 的 maximum ceiling。", "Config.cs"],
  ["FDI lookback / recovery", "120s / 90s", "首次 transient window 与默认恢复周期。", "Disorder/FacilityDisorderConfig.cs"],
  ["END standoff", "300s", "地表敌对僵持默认激活窗口。", "Config.cs"],
  ["CrisisWarEnabled", "false", "WAR 检测器默认关闭。", "Config.cs"],
];

export const commandRows = [
  ["ee help / status / health", "查看命令帮助、插件状态和健康信息。"],
  ["ee modules / module <name>", "查看模块概览或指定模块详情。"],
  ["ee round state", "查看当前 Round Core 状态。"],
  ["ee wave state|current|last|previous", "查看当前、最近或上一波原版增援。"],
  ["ee wave history <n> / detail", "查看波次历史或某一波详情。"],
  ["ee wave timers|cap|survival", "查看原版计时器、人数上限和存活观察。"],
  ["ee dlrc state|evaluate|stage|breakdown", "查询或检查 D-LRC 计算过程。"],
  ["ee crisis state|list|check <tag>", "查看危机 Episode 或检查指定 tag。"],
  ["ee disorder|fdi state|events|history|explain", "查看设施失序、结算与事件历史。"],
  ["ee o4 status", "查看 M06 O4 Panel 与选择会话状态。"],
  ["ee enable / disable / config / version", "切换下一局接管开关，或查看配置与版本。"],
];

export const telemetryRows = [
  ["DLRC_EVALUATION", "记录响应分数、最终等级、Control、危机和 FDI 输入。"],
  ["PRIMARY_WAVE", "记录原版增援阵营、实际人数、成员、时间和 wave facts。"],
  ["CRISIS_TRANSITION", "记录 Crisis Episode 开始、持续和解决。"],
  ["FDI_SETTLEMENT", "记录设施失序结算、增量与恢复结果。"],
  ["O4_SELECTION", "记录有界选择会话结果，不保存玩家身份列表。"],
  ["ROUND_BALANCE_SUMMARY", "记录回合结束的平衡观察摘要。"],
];

export const sourceWalkthrough = [
  ["RoundCoreManager.CaptureRoundStart()", "RoundCore/RoundCoreManager.cs", "M01 锁定 RoundId、PopulationTier 和 Composition slots。"],
  ["RoundCoreManager.AssignOpeningRoles()", "RoundCore/RoundCoreManager.cs", "M07 用开局槽位分配 D-Class、Scientist、Security 与 SCP roster。"],
  ["ReinforcementManager.OnPrimaryWaveCompleted()", "Reinforcement/ReinforcementManager.cs", "记录真实 Primary Wave facts 并发布完成事件。"],
  ["DlrcEvaluatorService.RunScheduledEvaluation()", "Evaluation/DlrcEvaluatorService.cs", "按首次 391 秒与 30 秒周期运行有效评估。"],
  ["CrisisManager.Evaluate()", "Crisis/CrisisManager.cs", "调用 Crisis detectors 并维护 Episode ID。"],
  ["FacilityDisorderService.SettlePeriodic()", "Disorder/FacilityDisorderService.cs", "只在 PERIODIC 推进正式 FDI settlement。"],
  ["EventDirector.SelectCycle()", "Director/EventDirector.cs", "按有效 context 筛选、仲裁并复核候选计划。"],
  ["O4PanelRuntimeService.RequestSelection()", "O4/O4PanelRuntimeService.cs", "对 M05 传入的有限 Foundation shortlist 提供选择会话。"],
];

export const mechanismStatus = [
  ["M01", "Round Core", ["IMPLEMENTED"], "Round lifecycle、人口档位、槽位数量和暂停边界。"],
  ["M02", "Reinforcement", ["IMPLEMENTED"], "保留 Vanilla Primary Wave 流程，记录事实并应用 cap。"],
  ["M03", "D-LRC", ["IMPLEMENTED", "LIVE VALIDATION PENDING"], "当前 threshold 是 defaults；balance validation pending。"],
  ["M04", "Crisis", ["IMPLEMENTED"], "七类 Crisis Tags 与 Episode lifecycle。WAR 默认配置关闭。"],
  ["M04.5", "FDI", ["IMPLEMENTED", "LIVE VALIDATION PENDING"], "包含 90 秒 recovery policy；平衡校准待验证。"],
  ["M05", "Event Director", ["IMPLEMENTED"], "决策与生命周期框架已存在；生产事件定义为 0。"],
  ["M06", "O4 Panel", ["IMPLEMENTED", "LIVE VALIDATION PENDING"], "Hint 与 shortlist selector 已接入；客户端投票/实服仍待验证。"],
  ["M07", "Opening Role & Ability", ["IMPLEMENTED", "LOGIC TESTED", "LIVE VALIDATION PENDING"], "Phase 1–3；自定义逻辑套件 313/313。"],
  ["—", "Event Pack", ["IN DEVELOPMENT"], "正式 EventDefinition、Executor 和 gameplay content 尚未注册。"],
];
