export const mechanismNavGroups = [
  { label: "", items: [{ id: "system-architecture", label: "系统总览" }] },
  { label: "", items: [{ id: "round-reinforcement", label: "回合与增援" }] },
  { label: "", items: [{ id: "dlrc", label: "D-LRC 响应评估" }] },
  { label: "", items: [{ id: "crisis-fdi", label: "危机与 FDI" }] },
  { label: "", items: [{ id: "director", label: "事件调度" }] },
  { label: "", items: [{ id: "o4", label: "O4 观察员选择" }] },
  { label: "", items: [{ id: "configuration", label: "运行与配置" }] },
];

export const responsibilityRows = [
  {
    module: "M01",
    name: "回合核心",
    responsibility: "接管本局、锁定人数档位、确定开局角色槽位。",
    receives: "回合开始信号与当前人数。",
    handsOff: "人数档位和槽位数量交给 M07 分配具体开局身份。",
    statusText: "已实现",
  },
  {
    module: "M02",
    name: "原版增援接入",
    responsibility: "限制原版增援人数上限，记录实际增援结果。",
    receives: "原版增援的阵营、人员与生成结果。",
    handsOff: "增援事实交给局势评估；阵营选择与生成仍由原版处理。",
    statusText: "已实现",
  },
  {
    module: "M03",
    name: "D-LRC 局势评估",
    responsibility: "综合威胁与增援等信号，计算 L0–L5 响应等级。",
    receives: "SCP 威胁、基金会压力、增援结果、时间与战略危险。",
    handsOff: "响应等级与代码交给危机检测和事件调度使用。",
    statusText: "已实现 · 等待实服验证",
  },
  {
    module: "M04",
    name: "危机检测",
    responsibility: "检测七类危机，维持危机阶段直到解除。",
    receives: "有效响应等级与本局威胁、设施事实。",
    handsOff: "当前危机标签交给 Event Director 筛选事件计划。",
    statusText: "已实现",
  },
  {
    module: "M04.5",
    name: "设施混乱度（FDI）",
    responsibility: "记录设施累计混乱程度，并按周期结算与恢复。",
    receives: "设施存量、近期变化和正式结算时机。",
    handsOff: "仅为普通支援来源权重提供参考，不决定专业危机响应。",
    statusText: "已实现 · 等待实服验证",
  },
  {
    module: "M05",
    name: "事件调度（Event Director）",
    responsibility: "筛选符合条件的事件计划，决定先后顺序并复核后启动。",
    receives: "人数档位、增援记录、响应等级、危机标签与 FDI。",
    handsOff: "确认后的计划交给事件内容包执行。",
    statusText: "已实现 · 事件内容开发中",
  },
  {
    module: "M06",
    name: "O4 有限选择边界",
    responsibility: "未来让符合条件的观察员从少量候选计划中选择。",
    receives: "Event Director 已筛选出的有限候选列表。",
    handsOff: "选择结果返回 Event Director 再次复核。",
    statusText: "暂缓设计 · 尚未开放",
  },
  {
    module: "M07",
    name: "开局职业与技能",
    responsibility: "为开局槽位分配具体身份、职业变体、SCP 强化与技能。",
    receives: "M01 提供的槽位，以及玩家当前角色状态。",
    handsOff: "通过共享状态栏、徽章和场景效果呈现玩法；不接管中途增援。",
    statusText: "逻辑已测 · 等待实服验证",
  },
  {
    module: "—",
    name: "事件内容包",
    responsibility: "实现事件本身，包括单位、装备、目标、生命周期与清理。",
    receives: "Event Director 已确认的事件计划。",
    handsOff: "事件实际玩法在此发生；不决定什么时机该选事件。",
    statusText: "开发中",
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
    ["ACTIVE", "本局达到接管人数，档位与开局槽位已锁定。"],
    ["LOW_POPULATION_SUSPENDED", "接管后人数低于 16，本局不会恢复接管。"],
    ["ROUND_ENDED", "本局结束并清理回合状态。"],
    ["ERROR", "运行时进入错误状态。"],
  ],
  transitions: [
    ["开局人数少于 16 人", "STANDBY", "本局沿用原版流程，不接管。"],
    ["开局人数达到 16 人", "ACTIVE", "接管本局并锁定人数档位和槽位。"],
    ["接管后人数降至 16 人以下", "LOW_POPULATION_SUSPENDED", "本局暂停接管，不会重新启用。"],
  ],
  slotExample: {
    population: 19,
    tier: "E",
    slots: [
      ["D 级人员", 8],
      ["科学家", 4],
      ["安保人员", 4],
      ["SCP", 3],
    ],
  },
};

export const reinforcementFacts = {
  vanillaStages: ["原版选择增援阵营", "玩家选择", "职业组成", "装备", "生成"],
  intervention: [
    ["关闭迷你增援波次", "Emergency Events 接管时关闭额外的迷你增援波次。"],
    ["设置人数上限", "按开局人数档位限制主要增援波次的最多人数。"],
    ["记录增援结果", "记录真实阵营、参与玩家、实际人数和完成时间。"],
    ["按条件延长计时", "原版重置计时后检查资格；每个阵营每波最多处理一次，并同步玩家看到的计时。"],
  ],
  caps: populationProfiles.map(({ tier, cap }) => [tier, cap]),
  capNote: "这是人数上限，不是目标人数。原版只准备 5 人时，B 档上限为 14 人，最终仍只生成 5 人，不会补足。",
};

export const dlrcMechanismFacts = {
  inputs: [
    "SCP 威胁",
    "基金会压力",
    "基金会增援受挫",
    "时间压力",
    "战略危险",
  ],
  stages: [
    ["综合响应分数", "汇总当前局势与持续影响"],
    ["理论响应等级", "按分数判断局势需要的响应"],
    ["控制状态限制", "根据当前控制情况限制可用等级"],
    ["最终响应等级", "得到 L0 至 L5 的最终等级"],
  ],
  schedule: [
    "首次正式评估：391 秒（约 06:31）。",
    "之后每 30 秒计算一次。",
    "主要增援完成后可以立即更新观察，但不会重置定时评估周期。",
  ],
  code: {
    prefix: "DLRC",
    population: "A",
    level: "4",
    crisis: "BIO",
    full: "DLRC-C4-BIO",
  },
  thresholds: [
    ["E", 0, 18, 32, 48, 65, 82],
    ["D", 0, 20, 34, 50, 67, 84],
    ["C", 0, 22, 36, 52, 69, 86],
    ["B", 0, 24, 38, 54, 71, 88],
    ["A", 0, 26, 40, 56, 73, 90],
  ],
};

export const crisisFacts = [
  {
    tag: "BIO",
    signal: "049-2 感染者数量",
    rule: "E / D 档达到 3 人；C / B 档达到 4 人；A 档达到 5 人。",
    note: "触发生物污染危机，供事件筛选使用。",
  },
  {
    tag: "SYS",
    signal: "SCP-079 控制设施",
    rule: "SCP-079 存在，且响应等级达到 L3 或以上。",
    note: "标记设施系统控制危机。",
  },
  {
    tag: "CON",
    signal: "基金会增援后的收容表现",
    rule: "第二次基金会（MTF）主要增援完成后，出现连续收容失败。",
    note: "混沌分裂者（Chaos）增援不作为基金会收容能力的基准。",
  },
  {
    tag: "SEC",
    signal: "存在敌对威胁，且基金会人数偏低",
    rule: "基金会人数不高于：E 档 1 人、D / C 档 2 人、B 档 4 人、A 档 5 人。",
    note: "敌对威胁可来自存活 SCP、混沌分裂者或已登记第三方。",
  },
  {
    tag: "GOI",
    signal: "敌对第三方人员介入",
    rule: "存在已登记的敌对人员；响应等级达到 L3；基金会状态为弱势或危急。",
    note: "第三方接入仍在扩展，未来组织不代表都已支持。",
  },
  {
    tag: "WAR",
    signal: "Alpha 核弹状态",
    rule: "核弹已解锁、尚未引爆时满足触发条件。",
    note: "核弹倒计时作为判断背景；该危机默认关闭。",
  },
  {
    tag: "END",
    signal: "核弹引爆后的地表对峙",
    rule: "核弹已引爆，敌对双方仍在地表僵持。",
    note: "默认僵持判定时间为 300 秒。",
  },
];

export const fdiMechanismFacts = {
  meaning: "设施当前累计混乱程度，范围为 0–100。",
  recovery: "连续一段时间没有新的失序事件，且没有活跃危机等阻断条件时会逐步回落；默认静默周期为 90 秒。",
  increase: "基金会伤亡、敌对力量增加、SCP 威胁或危机升级、核弹状态恶化会推高 FDI。",
  decrease: "基金会增援到位、敌对力量减少、SCP 被消灭、危机解除或核弹取消会降低 FDI；满足恢复条件时也会自然回落。",
  timing: "首次结算与约 06:31 的第一次正式局势评估同步；此后由固定周期评估结算。增援完成或管理员查询只读取当前值，不提前推进结算。",
};

export const directorFacts = {
  pipeline: [
    ["筛选可用事件", "检查回合、响应等级、危机、人数、设施状态和可用人员。"],
    ["优先处理危机响应", "专业危机响应先于普通支援事件。"],
    ["选择事件来源", "普通支援再根据基金会、混沌分裂者、第三方等来源权重挑选。"],
    ["形成候选计划", "符合条件的计划仍未生成事件。"],
    ["选定计划", "选中计划仍需再次检查当前局势。"],
    ["复核并确认", "启动前复核最新状态；通过后才提交给事件内容执行。"],
  ],
  failure: ["撤销本次尝试", "不扣除资源", "不消耗危机响应次数", "不安排第二个事件"],
  event2: [
    ["第一个事件真正开始", "开始计时"],
    ["经过 60 秒", "进入第二事件检查"],
    ["运行时定期检查", "符合条件时再安排第二个事件"],
  ],
  event2Note: "第二个事件只允许来自非普通支援来源。第一个事件没能真正开始，就不会安排第二个。",
};

export const eventPackFacts = {
  responsibilities: [
    "事件规则",
    "执行流程",
    "单位生成",
    "角色与装备",
    "技能效果",
    "事件目标",
    "持续与结束",
    "失败回滚",
    "场景清理",
  ],
  statusText: "开发中 · 目前还没有已完成的正式事件内容。",
};

export const o4Facts = {
  current: [
    "目前尚未开放观察员选择。",
    "未来只会在多个基金会普通支援计划都符合条件时，提供少量候选供 O4 选择。",
    "O4 不创建事件、不选择来源、不召唤混沌分裂者（Chaos），也不能阻止 Event Director。",
    "当前事件内容尚在开发，因此还没有正式事件进入这条选择流程。",
    "若该选择流程要求 O4 但没有符合条件的观察员，当前候选会跳过，不会自动换来源。",
  ],
};

export const lifecycleStages = [
  ["等待玩家", "整理上一局状态，继续原版行为。"],
  ["回合开始", "M01 根据人数决定是否接管，并锁定开局槽位。"],
  ["分配开局角色", "M07 根据槽位分配具体身份与开局能力。"],
  ["中途增援与局势评估", "M02 记录原版增援结果；D-LRC、危机检测与 FDI 更新局势。"],
  ["事件调度与执行", "Event Director 筛选并复核计划，事件内容包负责实际玩法。"],
  ["回合结束", "清理本局状态，下局重新开始。"],
];
