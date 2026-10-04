import { sysCrisisTrigger } from "./crisisRules.js";

export const dlrcPopulationProfiles = [
  { code: "E", min: 16, max: 19, label: "最低人数档", cap: 6 },
  { code: "D", min: 20, max: 25, label: "低人数档", cap: 6 },
  { code: "C", min: 26, max: 31, label: "标准人数档", cap: 8 },
  { code: "B", min: 32, max: 37, label: "高人数档", cap: 14 },
  { code: "A", min: 38, max: 45, label: "满员档", cap: 18 },
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
  { level: 0, label: "等级 0", detail: "等待评估。" },
  { level: 1, label: "等级 1", detail: "局面压力较低。" },
  { level: 2, label: "等级 2", detail: "局面压力上升。" },
  { level: 3, label: "等级 3", detail: "可以进入支援资格判断。" },
  { level: 4, label: "等级 4", detail: "局面压力较高，最终等级仍受局面状态限制。" },
  { level: 5, label: "等级 5", detail: "局面压力最高，仍受 Control Level Cap 限制。" },
];

export const responseScoreInputs = [
  { label: "SCP 数量", detail: "存活 SCP 占开局 SCP 的比例，最高 20 分。" },
  { label: "SCP 生命值", detail: "当前可用 SCP 的生命值和休谟护盾值，最高 10 分。" },
  { label: "049-2 压力", detail: "SCP-049-2 越多，压力分越高，最高 4 分。" },
  { label: "SCP-079 压力", detail: "SCP-079 的控制等级越高，压力分越高，最高 6 分。" },
  { label: "基金会压力", detail: "基金会有效战斗人员越少，压力分越高，最高 20 分。" },
  { label: "增援结果", detail: "基金会支援波次完成得越差，压力分越高，最高 20 分。" },
  { label: "时间压力", detail: "回合持续时间越长，这一项的分数越高。" },
  { label: "战略危险", detail: "核弹等战略危险会增加这一项的分数。" },
];

export const controlStates = [
  { key: "ADVANTAGE", label: "优势", cap: 2, detail: "至少出现两项正向信号，而且没有负向信号。" },
  { key: "CONTROLLED", label: "受控", cap: 3, detail: "默认状态。" },
  { key: "UNCONTROLLED", label: "失控", cap: 4, detail: "至少出现两项负向信号。" },
  { key: "COLLAPSE", label: "崩溃", cap: 5, detail: "基金会全员阵亡、低战斗占比高压或连续灾难波次等条件会触发。" },
];

export const crisisDefinitions = [
  { code: "BIO", name: "生化危机", trigger: "SCP-049-2 数量达到当前人数档位的阈值。", escalation: "数量达到阈值后，生化危机会保持发生。", resolution: "数量降回阈值以下，下一次合法评估会解除。", readers: "响应判断和需要 BIO 条件的候选会读取。" },
  { code: "SYS", name: "系统控制危机", trigger: sysCrisisTrigger, escalation: "控制等级继续上升时，危机保持发生。", resolution: "SCP-079 消失、控制等级无效或低于 3 级。", readers: "响应判断和需要 SYS 条件的候选会读取。" },
  { code: "CON", name: "收容危机", trigger: "第二个基金会支援波次完成后，后续收容检查连续失败。", escalation: "每 300 秒检查一次当前 SCP 压力和之前的基准。", resolution: "检查通过、还没有第二个波次，或没有可用基准。", readers: "响应判断和需要 CON 条件的候选会读取。" },
  { code: "SEC", name: "安全危机", trigger: "存在敌对威胁，基金会有效战斗人员又低于当前人数档位的安全阈值。", escalation: "基金会有效战斗人员继续减少时，危机保持发生。", resolution: "敌对威胁消失，或基金会人数回到阈值以上。", readers: "响应判断和需要 SEC 条件的候选会读取。" },
  { code: "GOI", name: "外部组织介入", trigger: "外部敌对组织有战斗人员、响应等级至少为 3，且基金会处于弱势。", escalation: "外部敌对力量和基金会劣势同时持续。", resolution: "任一条件消失；正式第三方运行来源仍未接入。", readers: "响应判断会读取，但不自动让 GOI 事件获得资格。" },
  { code: "WAR", name: "核设施危机", trigger: "CrisisWarEnabled 开启时：Alpha Warhead 已解锁且未 detonated。", escalation: "倒计时作为 reason / fact。", resolution: "核弹 detonated 或未解锁。", readers: "当前配置默认关闭；开启后由有效评估消费。" },
  { code: "END", name: "终局状态", trigger: "核弹已经爆炸，地表敌对僵持持续达到默认 300 秒。", escalation: "僵持达到窗口后进入终局状态。", resolution: "核弹事实、时间或地表敌对僵持条件消失。", readers: "响应判断和需要终局条件的候选会读取。" },
];

export const fdiFacts = {
  range: "0–100",
  initial: "第一次记录发生在开局约 06:31：先看当前设施状态，再补上最近 120 秒内的新变化。",
  later: "后续记录只把新发生的变化加到上一笔结果，避免同一件事重复计算。",
  recovery: "只有局面安静、没有新的普通事件或活动危机，且设施没有被摧毁时，静默 90 秒后才检查恢复。",
  bands: ["LOW", "MEDIUM", "HIGH"],
};

export const evaluationCycle = [
  { label: "回合开始", detail: "回合核心锁定人数档位，并确认人数是否达到最低要求 16 人。" },
  { label: "首次评估", detail: "回合开始 391 秒后做第一次响应判断。" },
  { label: "周期评估", detail: "第一次评估后每 30 秒更新一次正式结果。" },
  { label: "事件 / 波次", detail: "原版增援和其他回合变化会带来新的记录。" },
  { label: "重新计算", detail: "下一次合法判断会重新计算响应、危机、设施记录和候选上下文。" },
];

export const qualificationSteps = [
  ["读取", "读取同一份回合记录中的人数、波次、设施和危机事实。"],
  ["判断", "算出响应分数、最终等级、局面状态和危机结果。"],
  ["筛选", "按响应等级、危机、人数计划、设施状态和可用人员生成候选。"],
  ["复核", "真正开始前重新确认人员、危机、响应等级、人数计划和回合编号。"],
  ["提交", "条件仍满足才提交；否则安全取消，不扣成本，也不消费资格。"],
];

export const directorBoundary = [
  { side: "M05 · Event Director", question: "哪些计划可以进入候选？", detail: "负责资格、来源仲裁、Candidate / Selected plan、Revalidate、Commit 与生命周期决策。当前 production EventDefinition 数量为 0。" },
  { side: "Event Pack", question: "提交后的玩法如何执行？", detail: "负责 Spawn、Role、Equipment、Ability、Objective、Lifecycle、Rollback 和 Cleanup；生产事件内容仍在开发。" },
];

export const vanillaIntegration = {
  retained: ["MTF/CI 阵营决定", "原版影响力和增援令牌", "原版计时和玩家选择", "职业组成、装备和出生流程"],
  constrained: ["对原版大波次结果套用 E6/D6/C8/B14/A18 人数上限", "记录实际出生成员、阵营、完成时间和波次历史", "在规定边界内延长一次计时"],
  disabled: ["小波次策略已关闭"],
};

export const runtimeFallback = {
  threshold: 16,
  active: "16 人以上 · 插件已启用",
  fallback: "少于 16 人 · 回到原版流程",
  detail: "开局少于 16 人时不启用；活动回合降到 16 人以下后，本局会暂停，之后即使人数回到 16 人，也不会重新启用。",
};

export const roundExample = [
  { label: "回合开始", code: "DLRC-B0", facts: "模拟 · 人数档位=B · 响应分数=18 · 当前没有危机", result: "锁定 B 档，开始记录这一局。" },
  { label: "周期评估", code: "DLRC-B2", facts: "模拟 · 响应分数=40 · 当前没有危机 · 局面受控", result: "达到 B 档 L2，先不启动候选。" },
  { label: "危机出现", code: "DLRC-B3-BIO", facts: "模拟 · SCP-049-2 达到 BIO 阈值 · 响应分数=56", result: "BIO 危机开始，重新筛选专业响应。" },
  { label: "开始前复核", code: "DLRC-B3-BIO", facts: "示例 · 可用人员满足人数计划 · 回合编号一致", result: "候选通过最新局势复核。" },
  { label: "提交", code: "DLRC-B3-BIO", facts: "示例 · 候选已提交 · 正式事件内容尚未制作", result: "这里只展示判断链，正式事件还没有执行。" },
];

export const operatorCommands = [
  ["ee status", "查看插件当前状态", "可用"], ["ee modules", "查看各模块状态", "可用"], ["ee round state", "查看当前回合", "可用"],
  ["ee wave state", "查看当前增援波次", "可用"], ["ee wave history 5", "查看最近波次记录", "可用"], ["ee wave cap", "查看人数上限", "可用"],
  ["ee dlrc", "查看当前响应状态", "可用"], ["ee dlrc evaluate", "手动触发一次判断", "可用"], ["ee dlrc stage full", "查看完整判断过程", "可用"],
  ["ee dlrc breakdown", "查看响应分数明细", "可用"], ["ee dlrc control", "查看局面状态", "可用"], ["ee dlrc history 5", "查看最近判断记录", "可用"],
  ["ee crisis list", "列出危机类型", "可用"], ["ee crisis check BIO", "检查指定危机", "可用"], ["ee disorder state", "查看设施记录", "可用"],
  ["ee disorder history 5", "查看设施变化记录", "可用"], ["ee disorder explain", "查看设施记录解释", "可用"], ["ee cleanup", "清理本局运行状态", "可用"],
];

export const architectureStatus = [
  ["M01", "Round Core", "IMPLEMENTED", "接管资格、PopulationTier、RoundId 与 opening slot quantities。"],
  ["M02", "Reinforcement Integration", "IMPLEMENTED", "保留 Vanilla reinforcement，记录实际波次并应用 cap ceiling。"],
  ["M03", "D-LRC Evaluator", "IMPLEMENTED · BALANCE VALIDATION PENDING", "评估逻辑与默认门槛存在；平衡验证仍待真实运行数据。"],
  ["M04", "Crisis System", "IMPLEMENTED", "七类 Crisis Tags 与 Episode transition。"],
  ["M04.5", "Facility Disorder Index", "IMPLEMENTED · LIVE VALIDATION PENDING", "历史失序、SettlementWindow 与 90 秒恢复策略。"],
  ["M05", "Event Director", "IMPLEMENTED", "候选、来源仲裁、Revalidate、Commit 框架；production definitions 为 0。"],
  ["M06", "O4 Panel", "IMPLEMENTED · LIVE VALIDATION PENDING", "Hint shortlist 与 selector runtime 已实现；投票输入和实服行为待验证。"],
  ["M07", "Opening Role & Ability", "LOGIC TESTED · LIVE VALIDATION PENDING", "313 / 313 custom logic tests；官方插件 build 缺少服务端程序集。"],
  ["—", "Event Pack", "IN DEVELOPMENT", "生产 EventDefinition、Executor 与事件玩法尚未完成。"],
  ["—", "Live server smoke", "BLOCKED / PENDING", "缺少完整 SCP:SL Managed assemblies；目前没有正式实服验证。"],
];

export const designPrinciples = ["先看局势", "人数分档", "保留原版", "开始前复核", "过程可查", "数据判断", "各管一块"];

export const dlrcRuntimeFacts = {
  minimumPlayers: 16,
  evaluationStartSeconds: 391,
  evaluationIntervalSeconds: 30,
  demoLabel: "模拟示例 / SIMULATED",
  o4Status: "IMPLEMENTED · LIVE VALIDATION PENDING",
};
