export function RoundTimeline({ timeline }) {
  return <>
    <div className="timeline" aria-label="一局游戏的五个阶段">
      {timeline.map((item) => <div className="time-node" key={item.id}>
        <div className="time-card">
          <div className="system-mark mono">{item.id} / {item.code}</div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      </div>)}
    </div>
    <div className="round-context">
      <article className="round-context-item"><h3>开局槽位与身份</h3><p>M01 决定 D-Class、Scientist、Security、SCP 槽位数量；M07 再分配具体开局身份和能力。</p></article>
      <article className="round-context-item"><h3>中途增援</h3><p>普通 MTF / CI Primary Wave 仍由 M02 接入原版流程；这不是 M07 的角色分配。</p></article>
      <article className="round-context-item"><h3>三类状态输入</h3><p>D-LRC 计算响应等级，Crisis 维护 Tags / Episodes，FDI 保存设施历史状态。</p></article>
      <article className="round-context-item"><h3>决定与执行</h3><p>M05 选择并复核事件计划；Event Pack 才提供实际玩法，当前 production definitions 为 0。</p></article>
    </div>
  </>;
}
