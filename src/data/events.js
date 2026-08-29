export const events = [
  { id: "E01", code: "PROFESSIONAL RESPONSE", title: "专业危机响应", description: "D-LRC 等级和危机标签匹配后，指定专业单位才会进入候选。", status: "框架已完成", visual: ["D-LRC / 危机标签", "资格 / 已匹配", "响应 / 专业单位"], mark: "BIO" },
  { id: "E02", code: "FACTION INTERVENTION", title: "阵营介入", description: "不同组织带着各自目标加入回合，力量关系也会随之改变。", status: "内容开发中", visual: ["基金会 / WEAK", "GOI 窗口 / 开启", "介入 / 已获资格"], mark: "GOI" },
  { id: "E03", code: "FACILITY INCIDENT", title: "设施异常", description: "设施失序和区域故障会影响后续事件的资格与时机。", status: "内容开发中", visual: ["FDI / HIGH", "秩序恢复 / 暂停", "异常记忆 / 保留"], mark: "FDI" },
  { id: "E04", code: "STRATEGIC EVENT", title: "战略事件", description: "事件围绕设施控制、资源和增援窗口改变战局。", status: "内容开发中", visual: ["设施控制 / 进行中", "资源窗口 / 开启", "策略 / 已获资格"], mark: "STR" },
  { id: "E05", code: "CHAIN EVENT", title: "连续响应", description: "前一事件的结果会留在回合数据里，供下一次判断读取。", status: "框架已完成", visual: ["事件链 / 进行中", "上一结果 / 已保留", "下一判断 / 待命"], mark: "CHN" },
  { id: "E06", code: "ADAPTIVE POPULATION", title: "人口适配", description: "同一事件由 Population Profile 调整规模、编制和装备，不需要复制五份定义。", status: "架构已完成", visual: ["Population Profile / 已选", "E–A 范围 / 当前档位", "装备方案 / 待命"], mark: "POP" },
];
