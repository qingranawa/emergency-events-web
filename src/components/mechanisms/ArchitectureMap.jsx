const roundFlow = [
  { title: "开局", detail: "新一局开始，确认是否由 Emergency Events 接管。" },
  { title: "M01 锁定人数档位", detail: "按开局人数确定 E–A 档，并决定各职业有多少开局槽位。" },
  { title: "生成开局角色槽位", detail: "先确定 D 级人员、科学家、安保人员和 SCP 的名额。" },
  { title: "M07 分配具体身份", detail: "把槽位分配给具体职业、变体、SCP 强化与技能。" },
  { title: "原版增援继续运行", detail: "M02 只在中途接入原版增援，并记录实际生成结果。" },
  { title: "判断局势", detail: "D-LRC 计算响应等级；危机系统识别威胁；FDI 记录设施混乱变化。" },
  { title: "Event Director 选择事件", detail: "筛选并复核事件计划；O4 选择边界目前尚未开放。" },
  { title: "事件发生", detail: "事件内容包负责具体玩法、目标、结束与清理。" },
];

export function ArchitectureMap() {
  return <div className="system-map" aria-label="一局 Emergency Events 的运行流程">
    <ol className="system-map-flow">
      {roundFlow.map((step, index) => <li className="system-map-step" key={step.title}>
        <span className="system-map-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <strong>{step.title}</strong>
        <p>{step.detail}</p>
      </li>)}
    </ol>
    <div className="system-map-side-notes">
      <p><b>M07 开局与玩法层：</b>横跨开局身份分配和玩家在场内使用的技能、状态栏、徽章与场景效果。</p>
      <p><b>O4 观察员：</b>未来只在有限事件候选中提供选择，不创建事件，也不控制事件来源。</p>
    </div>
  </div>;
}
