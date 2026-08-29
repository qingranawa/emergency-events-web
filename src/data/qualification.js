export const qualificationStages = [
  { id: "01", code: "OBSERVE / FACT INPUT", title: "观察当前战局", description: "读取回合正在发生的事实与力量变化。", kind: "observe", rows: [["PLAYERS", "--"], ["FOUNDATION", "--"], ["CHAOS", "--"], ["SCP ACTIVE", "--"], ["FDI", "--"], ["CRISIS SIGNALS", "--"]] },
  { id: "02", code: "EVALUATE", title: "判断当前响应与危机", description: "把原始事实整理成可供 Director 判断的结构。", kind: "evaluate", rows: [["D-LRC", "--"], ["RESPONSE LEVEL", "--"], ["CRISIS TAGS", "--"], ["POPULATION PROFILE", "E–A"]] },
  { id: "03", code: "QUALIFY / FILTER", title: "找出适合的事件", description: "让真正匹配当前局势的内容进入候选。", kind: "qualify" },
  { id: "04", code: "REVALIDATE", title: "事件开始前再次确认", description: "条件变化就退出候选，不把过期判断带入回合。", kind: "revalidate", rows: [["POPULATION", "RECHECK"], ["CRISIS", "RECHECK"], ["D-LRC", "RECHECK"], ["ROUND STATE", "RECHECK"]] },
  { id: "05", code: "COMMIT", title: "正式介入或安全取消", description: "只有确认提交的事件才会改变战局。", kind: "commit" },
];
