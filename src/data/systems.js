export const architectureGroups = {
  input: [
    { code: "M01 / ROUND CORE", title: "Round Core", description: "管理回合基础、人口档位与开局结构。", status: "READY" },
    { code: "M05 / FDI", title: "FDI", description: "记录设施整体混乱程度与秩序恢复，让失序影响跨越一次判断持续存在。", status: "READY" },
    { code: "M04 / CRISIS", title: "Crisis System", description: "识别当前存在的危机类别，让专业响应知道自己正在回应什么。", status: "READY" },
    { code: "M02 / REINFORCEMENT", title: "Reinforcement Integration", description: "与原版 Primary Wave 协作；Mini-Wave 禁用，并按 E/D/C/B/A 设置 Primary Wave Cap。", status: "READY" },
  ],
  output: [
    { code: "PROFILE OUTPUT", title: "Population Plan", description: "人口差异由 Profile 调整规模、编制和装备，始终留在当前人口档位内。", status: "E–A PROFILES" },
    { code: "EVENT CONTENT", title: "Event Pack", description: "具体职业、武器和 Spawn 由 Event Pack 实现，核心 Director 保持解耦。", status: "ARCHITECTURE READY" },
    { code: "OBSERVER / TELEMETRY", title: "Telemetry", description: "记录 D-LRC Evaluation、Crisis Transition、FDI Settlement、Primary Wave、Round Summary 与匿名 Spectator Wait。", status: "RUNTIME AVAILABLE" },
  ],
};

export const keywords = [
  ["Multi-Faction", "为不同组织与专业单位提供统一事件框架。", "big"],
  ["Situation-Aware", "事件根据当前战况获得资格，而不是固定时间随机抽取。", "med"],
  ["Population-Aware", "同一个事件可以根据人口档位改变规模、编制和装备方案。", "med"],
  ["Vanilla-Friendly", "尽可能与原版 Primary Wave 协作，而不是重新实现整套 Respawn。", "small"],
  ["Runtime Safe", "事件启动前重新检查人数、危机和响应状态，条件失效就安全退出。", "small"],
  ["Modular", "事件内容与核心 Director 分离，新内容不需要改写核心判断。", "big"],
  ["Observable", "日志和 Telemetry 可以解释系统为什么做出某个决定。", "med"],
  ["Data-Driven", "Balance Harness 覆盖 E–A 全档模拟、Semantic Scenarios 与多 seed。", "feature"],
];
