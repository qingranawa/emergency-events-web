export const architectureGroups = {
  input: [
    { code: "M01 / ROUND CORE", title: "Round Core", description: "管理回合、锁定 Population Profile，并处理开局条件。", status: "已完成" },
    { code: "M05 / FDI", title: "FDI", description: "记录设施失序程度，并在后续评估中保留这段记忆。", status: "已完成" },
    { code: "M04 / CRISIS", title: "Crisis System", description: "识别当前满足条件的 Crisis，让 Event Director 知道要回应什么。", status: "已完成" },
    { code: "M02 / REINFORCEMENT", title: "Reinforcement Integration", description: "接入原版 Primary Wave，禁用 Mini-Wave，并应用 E/D/C/B/A 的 cap。", status: "已完成" },
  ],
  output: [
    { code: "人口输出", title: "Population Plan", description: "Population Profile 决定人数、编制和装备范围，结果留在当前档位内。", status: "E–A 档位" },
    { code: "事件内容", title: "Event Pack", description: "Event Pack 提供职业、武器和出生点，Event Director 不直接写这些内容。", status: "架构已完成" },
    { code: "观察 / Telemetry", title: "Telemetry", description: "记录 D-LRC Evaluation、Crisis Transition、FDI Settlement、Primary Wave 和 Round Summary。", status: "运行时可用" },
  ],
};

export const keywords = [
  ["Multi-Faction", "同一套入口可以承接不同组织和专业单位。", "big"],
  ["Situation-Aware", "事件资格取决于当前回合数据和 Crisis 状态。", "med"],
  ["Population-Aware", "Population Profile 会调整事件规模、编制和装备。", "med"],
  ["Vanilla-Friendly", "保留原版 Primary Wave，只接管插件需要调整的部分。", "small"],
  ["Runtime Safe", "事件开始前再次检查条件，失效就取消。", "small"],
  ["Modular", "Event Pack 和判断逻辑分开，新增内容不用改动 Event Director。", "big"],
  ["Observable", "日志和 Telemetry 会记录系统为什么做出某个决定。", "med"],
  ["Data-Driven", "Balance Harness 覆盖 E–A 档位、Semantic Scenarios 和多 seed。", "feature"],
];
