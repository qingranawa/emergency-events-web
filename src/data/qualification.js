export const qualificationStages = [
  { id: "01", code: "观察 / 回合数据", title: "读取当前回合", description: "读取玩家、阵营、SCP、FDI 和危机信号。", kind: "observe", rows: [["玩家人数", "--"], ["基金会", "--"], ["混沌", "--"], ["SCP 状态", "--"], ["FDI", "--"], ["危机信号", "--"]] },
  { id: "02", code: "评估", title: "计算响应状态", description: "把回合数据整理成 Director 可以读取的结果。", kind: "evaluate", rows: [["D-LRC", "--"], ["响应等级", "--"], ["危机标签", "--"], ["Population Profile", "E–A"]] },
  { id: "03", code: "资格 / 筛选", title: "筛出符合条件的事件", description: "按等级、危机和人员条件生成候选。", kind: "qualify" },
  { id: "04", code: "再次确认", title: "事件开始前复核", description: "条件发生变化时，候选会退出，不会带着旧判断继续。", kind: "revalidate", rows: [["人口", "重新检查"], ["危机", "重新检查"], ["D-LRC", "重新检查"], ["回合状态", "重新检查"]] },
  { id: "05", code: "提交", title: "提交事件或取消", description: "条件仍然满足才提交；否则安全取消。", kind: "commit" },
];
