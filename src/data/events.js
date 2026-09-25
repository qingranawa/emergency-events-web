export const events = [
  { id: "E01", code: "PROFESSIONAL RESPONSE", title: "专业危机响应", description: "只有人数、响应等级和危机条件都合适时，专业响应才会进入候选。当前有框架，没有正式事件内容。", status: "框架已完成", visual: ["响应状态 / 已读取", "危机条件 / 已检查", "专业响应 / 待命"], mark: "BIO" },
  { id: "E02", code: "FACTION INTERVENTION", title: "阵营介入", description: "未来可以让不同组织带着自己的目标进入回合；具体内容还没有发布。", status: "内容开发中", visual: ["组织来源 / 预留", "人数条件 / 待查", "介入内容 / 待制作"], mark: "GOI" },
  { id: "E03", code: "FACILITY INCIDENT", title: "设施异常", description: "设施失序会留在回合记录里，给后续的响应和来源选择提供参考。", status: "内容开发中", visual: ["设施记录 / 保留", "秩序恢复 / 观察", "异常内容 / 待制作"], mark: "FDI" },
  { id: "E04", code: "STRATEGIC EVENT", title: "战略事件", description: "围绕设施、资源和增援窗口的事件类型已经预留，实际执行内容还没开始。", status: "内容开发中", visual: ["设施状态 / 读取", "资源窗口 / 待查", "事件内容 / 待制作"], mark: "STR" },
  { id: "E05", code: "CHAIN EVENT", title: "连续响应", description: "前一个响应的结果会留在回合记录里，给下一次判断继续使用。", status: "框架已完成", visual: ["上一结果 / 已保留", "当前状态 / 已读取", "下一判断 / 待命"], mark: "CHN" },
  { id: "E06", code: "ADAPTIVE POPULATION", title: "按人数调整", description: "同一类事件可以按人数档位调整规模和人员计划，不必复制五套事件。", status: "架构已完成", visual: ["人数档位 / 已锁定", "人员计划 / 可调整", "执行内容 / 待制作"], mark: "POP" },
];
