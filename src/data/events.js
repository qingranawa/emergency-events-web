export const events = [
  { id: "E01", code: "PROFESSIONAL RESPONSE", title: "专业危机响应", description: "针对特定危机的专业单位，只在 D-LRC 等级与危机标签同时匹配时出现。", status: "FRAMEWORK READY", visual: ["D-LRC / CRISIS TAG", "QUALIFICATION / MATCHED", "RESPONSE / PROFESSIONAL"], mark: "BIO" },
  { id: "E02", code: "FACTION INTERVENTION", title: "阵营介入", description: "不同组织以不同目标加入回合，让力量关系出现新的变量。", status: "CONTENT IN DEVELOPMENT", visual: ["FOUNDATION / WEAK", "GOI WINDOW / OPEN", "INTERVENTION / QUALIFIED"], mark: "GOI" },
  { id: "E03", code: "FACILITY INCIDENT", title: "设施异常", description: "设施失序、区域故障与内部异常会改变后续事件的资格与节奏。", status: "CONTENT IN DEVELOPMENT", visual: ["FDI / HIGH", "ORDER RECOVERY / PAUSED", "INCIDENT MEMORY / ACTIVE"], mark: "FDI" },
  { id: "E04", code: "STRATEGIC EVENT", title: "战略事件", description: "不是单点战斗，而是围绕设施控制、资源与增援窗口改变战局。", status: "CONTENT IN DEVELOPMENT", visual: ["FACILITY CONTROL / ACTIVE", "RESOURCE WINDOW / OPEN", "STRATEGY / QUALIFIED"], mark: "STR" },
  { id: "E05", code: "CHAIN EVENT", title: "连续响应", description: "一次事件可以留下后续影响，下一次判断会读取前一阶段的结果。", status: "FRAMEWORK READY", visual: ["EVENT CHAIN / ACTIVE", "PREVIOUS RESULT / CARRIED", "NEXT JUDGEMENT / ARMED"], mark: "CHN" },
  { id: "E06", code: "ADAPTIVE POPULATION", title: "人口自适应", description: "同一事件由 Population Profile 调整规模、编制与装备，不复制五份事件定义。", status: "ARCHITECTURE READY", visual: ["POPULATION PROFILE / ACTIVE", "E–A RANGE / SELECTED", "EQUIPMENT PLAN / READY"], mark: "POP" },
];
