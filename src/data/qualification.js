export const qualificationStages = [
  { id: "01", code: "读取回合", title: "先看当前局势", description: "读取人数、阵营、SCP、FDI 和危机状态。", kind: "observe", rows: [["玩家人数", "--"], ["基金会", "--"], ["混沌", "--"], ["SCP 状态", "--"], ["设施失序", "--"], ["危机状态", "--"]] },
  { id: "02", code: "整理判断", title: "得到响应状态", description: "把这一局整理成事件筛选器可以使用的状态。", kind: "evaluate", rows: [["D-LRC", "--"], ["响应等级", "--"], ["危机标签", "--"], ["人数档位", "E–A"]] },
  { id: "03", code: "筛选候选", title: "找出可能介入的事件", description: "按人数档位、响应等级、危机和可用人员筛选。", kind: "qualify" },
  { id: "04", code: "开始前复核", title: "条件变了就退出", description: "候选启动前重新检查；条件失效，就不拿旧判断继续。", kind: "revalidate", rows: [["人数", "重新检查"], ["危机", "重新检查"], ["响应状态", "重新检查"], ["回合编号", "重新检查"]] },
  { id: "05", code: "最终提交", title: "满足条件才开始", description: "条件仍然满足才提交；否则取消这次介入。", kind: "commit" },
];
