export const dlrcPopulationProfiles = [
  { code: "E", min: 16, max: 19, label: "低人数", cap: 6 },
  { code: "D", min: 20, max: 25, label: "开发档位", cap: 6 },
  { code: "C", min: 26, max: 31, label: "标准档位", cap: 8 },
  { code: "B", min: 32, max: 37, label: "扩展档位", cap: 14 },
  { code: "A", min: 38, max: 45, label: "满员档位", cap: 18 },
];

export const primaryWaveCaps = { E: 6, D: 6, C: 8, B: 14, A: 18 };

export const dlrcThresholds = {
  E: [0, 18, 32, 48, 65, 82],
  D: [0, 20, 34, 50, 67, 84],
  C: [0, 22, 36, 52, 69, 86],
  B: [0, 24, 38, 54, 71, 88],
  A: [0, 26, 40, 56, 73, 90],
};

export const dlrcResponseLevels = [
  { level: 0, label: "等级 0", detail: "分数处于基础阈值，继续观察当前回合。" },
  { level: 1, label: "等级 1", detail: "压力较低，继续收集回合数据。" },
  { level: 2, label: "等级 2", detail: "压力上升，可以使用更高响应等级。" },
  { level: 3, label: "等级 3", detail: "Event Director 重新检查专业响应资格。" },
  { level: 4, label: "等级 4", detail: "压力较高，ControlState 会限制最终等级。" },
  { level: 5, label: "等级 5", detail: "最高响应等级，仍受 Control Level Cap 限制。" },
];

export const responseScoreInputs = [
  { label: "SCP 数量", detail: "存活 SCP 占开局 SCP 的比例，最高贡献 20。" },
  { label: "SCP 生命值", detail: "可用 SCP 的生命值和 Hume 值，最高贡献 10。" },
  { label: "049-2 压力", detail: "僵尸数量按 ZombieFullPressureCount=6 归一化，最高贡献 4。" },
  { label: "SCP-079 压力", detail: "SCP-079 Tier 2–5 分别贡献 1.5、3、4.5、6。" },
  { label: "基金会压力", detail: "基金会战斗占比和 Eligible Spectator 比例共同计算，最高贡献 20。" },
  { label: "增援失败", detail: "只读取已完成的 Foundation/MTF Primary Wave，最高贡献 20。" },
  { label: "时间压力", detail: "回合持续时间越长，这一项的分数越高。" },
  { label: "战略危险", detail: "核弹等战略危险会增加这一项的压力。" },
];

export const controlStates = [
  { key: "ADVANTAGE", label: "优势", cap: 2, detail: "至少有两项正向信号，且没有负向信号。" },
  { key: "CONTROLLED", label: "受控", cap: 3, detail: "默认状态，当前局面仍可管理。" },
  { key: "UNCONTROLLED", label: "失控", cap: 4, detail: "至少有两项负向信号。" },
  { key: "COLLAPSE", label: "崩溃", cap: 5, detail: "Foundation=0、低战斗占比高压或连续灾难波次等条件会触发。" },
];

export const crisisDefinitions = [
  { code: "BIO", name: "生化危机", trigger: "Scp0492Count 达到当前 Population Tier 的 BIO ActivationThreshold。", escalation: "僵尸数量达到配置阈值时保持 Active。", resolution: "数量低于阈值后，在下一次合法 Evaluation 解除。", readers: "CrisisAssessment 与要求 BIO 的 Director 候选。" },
  { code: "SYS", name: "系统控制危机", trigger: "SCP-079 存在、Tier 有效且 Tier≥3。", escalation: "Tier 上升时继续保持 SYS Active，Crisis 不另设 Severity 值。", resolution: "SCP-079 不存在、Tier 无效或低于 3。", readers: "CrisisAssessment 与要求 SYS 的 Director 候选。" },
  { code: "CON", name: "收容危机", trigger: "第二个 Foundation/MTF Primary Wave 完成后，收容 checkpoint 连续失败。", escalation: "每 300 秒 checkpoint 比较当前 SCP combat equivalent 与 baseline。", resolution: "checkpoint 通过、尚无第二个波次或 baseline 不可用。", readers: "CrisisAssessment 与要求 CON 的 Director 候选。" },
  { code: "SEC", name: "安全危机", trigger: "存在 SCP、Chaos 或 hostile third party 威胁，且 Foundation combatants 不超过当前 Tier 阈值。", escalation: "Foundation 有效战斗人数继续下降时保持 Active。", resolution: "没有 hostile threat 或 Foundation 人数超过阈值。", readers: "CrisisAssessment 与要求 SEC 的 Director 候选。" },
  { code: "GOI", name: "外部组织介入", trigger: "HostileThirdPartyActive、外部战斗人数>0、FinalLevel≥3 且 Foundation 为 WEAK/CRITICAL。", escalation: "外部敌对力量和 Foundation disadvantage 同时持续。", resolution: "任一条件消失；正式 GOI runtime provider 仍为 PROVISIONAL。", readers: "CrisisAssessment；不自动等同 GOI Source Event 合法。" },
  { code: "WAR", name: "核设施危机", trigger: "核弹已解锁且尚未爆炸。", escalation: "倒计时 Active 只改变诊断原因，Crisis 不另设 Severity 值。", resolution: "核弹尚未解锁或已经爆炸。", readers: "CrisisAssessment 与要求 WAR 的 Director 候选。" },
  { code: "END", name: "终局状态", trigger: "核弹已爆炸，并且地表存在持续敌对僵持。", escalation: "僵持达到默认 300 秒后 Active。", resolution: "核弹事实、时间戳或地表敌对僵持条件消失。", readers: "CrisisAssessment 与要求 END 的 Director 候选。" },
];

export const fdiFacts = {
  range: "0–100",
  initial: "首次结算（约 06:31）：InitialBase + CurrentStockAdjustment + Recent120sTransientDelta；最后一项读取最近 120 秒瞬时事件窗口。",
  later: "后续结算：PreviousFDI + NewEventDelta；每次只把新事件 Delta 累加到上一结算值。",
  recovery: "有效 PERIODIC、无普通事件 Delta、无 Active Crisis、无 Chaos/Hostile 存量且设施未 Destroyed，静默 90 秒后才检查恢复。",
  bands: ["LOW", "MEDIUM", "HIGH"],
};

export const evaluationCycle = [
  { label: "回合开始", detail: "Round Core 锁定 Population Tier，并确认是否达到 MinimumPlayers=16。" },
  { label: "首次评估", detail: "回合经过 391 秒后执行第一次 D-LRC Evaluation。" },
  { label: "周期评估", detail: "首次评估后每 30 秒计算一次正式结果。" },
  { label: "事件 / 波次", detail: "Primary Wave 和事件执行会产生新的回合数据。" },
  { label: "重新计算", detail: "后续合法 Evaluation 重新计算 D-LRC、Crisis、FDI 和 Director Context。" },
];

export const qualificationSteps = [
  ["OBSERVE", "读取同一 RoundSnapshot 的人口、波次、设施和危机事实。"],
  ["EVALUATE", "计算 Response Score、Final Level、Control State 与 CrisisAssessment。"],
  ["QUALIFY", "按 Level、Crisis Tags、Episode、Population Plan、FacilityState 和人员资格形成候选计划。"],
  ["REVALIDATE", "Start/Commit 前重新确认人员、危机 Episode、Level、Population Plan 和 RoundId。"],
  ["COMMIT", "最新上下文仍满足时提交；否则安全取消，不扣成本、不消费资格。"],
];

export const directorBoundary = [
  { side: "EVENT DIRECTOR", question: "哪些事件可以进入候选？", detail: "负责 Eligibility、Population Plan、Profile、候选筛选、来源仲裁和调度。" },
  { side: "EVENT PACK", question: "事件具体怎么执行？", detail: "负责角色、武器、装备、出生点和正式事件执行；生产内容当前尚未开始。" },
];

export const vanillaIntegration = {
  retained: ["MTF/CI 阵营决定", "Influence", "Respawn Token", "原版计时和玩家选择", "职业组成、装备和出生流程"],
  constrained: ["Emergency Events 对 Primary Wave 结果应用 E6/D6/C8/B14/A18 cap", "记录实际出生成员、阵营、完成时间和波次历史", "应用一次 Timer Extension"],
  disabled: ["Mini-Wave 策略已禁用"],
};

export const runtimeFallback = {
  threshold: 16,
  active: "16+ 玩家 · Emergency Events 已启用",
  fallback: "<16 玩家 · LOW_POPULATION_SUSPENDED",
  detail: "回合开始不足 16 人时不激活；活动回合降到最低人数以下后，本回合会暂停，恢复到 16 人也不会重新启用。",
};

export const roundExample = [
  { label: "回合开始", code: "DLRC-B0", facts: "模拟 · Population=34 · Score=18 · Crisis=NONE", result: "锁定 B 档，开始观察回合。" },
  { label: "周期评估", code: "DLRC-B2", facts: "模拟 · Score=40 · Crisis=NONE · Control=CONTROLLED", result: "达到 B 档 Level 2，继续等待资格条件。" },
  { label: "危机激活", code: "DLRC-B3-BIO", facts: "模拟 · Scp0492Count 达到 BIO 阈值 · Score=56", result: "BIO Episode 激活，重新筛选专业响应候选。" },
  { label: "再次确认", code: "DLRC-B3-BIO", facts: "示例 · 可用人员满足 Population Plan · RoundId 一致", result: "候选通过最新回合数据复核。" },
  { label: "提交", code: "DLRC-B3-BIO", facts: "示例 · Event Director 已提交 · Event Pack 尚无生产内容", result: "这里只展示状态链，不表示正式事件已经执行。" },
];

export const operatorCommands = [
  ["ee status", "查看 Runtime 状态", "可用"], ["ee modules", "查看模块摘要", "可用"], ["ee round state", "查看当前回合状态", "可用"],
  ["ee wave state", "查看当前波次状态", "可用"], ["ee wave history 5", "查看最近波次历史", "可用"], ["ee wave cap", "查看 Primary Wave cap", "可用"],
  ["ee dlrc", "查看当前 D-LRC 状态", "可用"], ["ee dlrc evaluate", "触发一次 D-LRC 评估", "可用"], ["ee dlrc stage full", "查看完整阶段报告", "可用"],
  ["ee dlrc breakdown", "查看 Response Score 分项", "可用"], ["ee dlrc control", "查看 Control Assessment", "可用"], ["ee dlrc history 5", "查看评估历史", "可用"],
  ["ee crisis list", "列出七类 Crisis", "可用"], ["ee crisis check BIO", "检查指定 Crisis", "可用"], ["ee disorder state", "查看 FDI 状态", "可用"],
  ["ee disorder history 5", "查看 FDI 历史", "可用"], ["ee disorder explain", "查看 FDI 解释", "可用"], ["ee cleanup", "清理回合运行时状态", "可用"],
];

export const architectureStatus = [
  ["M01", "Round Core", "已完成", "负责回合资格、人口锁定和生命周期边界。"],
  ["M02", "Reinforcement Integration", "已完成", "保留原版 Primary Wave，补充 cap、Mini-Wave 策略和波次数据。"],
  ["M03", "D-LRC Evaluator", "逻辑完成 · 等待平衡验证", "评分、Level、Control 和历史接口已实现，参数仍需验证。"],
  ["M04", "Crisis System", "已完成", "包含七个 Detector、Active/Inactive 和 Episode。"],
  ["M04.5", "Facility Disorder Index", "逻辑完成 · 等待平衡验证", "FDI 结算和恢复逻辑已实现，参数仍需真人数据校准。"],
  ["M05", "Event Director", "框架已完成", "资格、候选和调度边界已实现，生产 Event Pack 尚未开始。"],
  ["M06", "O4 Panel", "按设计暂缓", "当前不实现 HUD、Panel、Voting UI、Player eligibility 或 Observer UX。"],
  ["—", "Telemetry", "已实现 · 等待实时数据", "JSONL 观察器已实现，Phase 1 仍需要真人数据。"],
  ["—", "Live Player Validation", "等待验证", "目前没有可以在官网中宣称的真人实服结果。"],
];

export const designPrinciples = ["Situation-aware", "Population-aware", "Vanilla-friendly", "Revalidatable", "Observable", "Data-driven", "Modular"];

export const dlrcRuntimeFacts = {
  minimumPlayers: 16,
  evaluationStartSeconds: 391,
  evaluationIntervalSeconds: 30,
  demoLabel: "模拟示例 / SIMULATED",
  o4Status: "DEFERRED BY DESIGN",
};
