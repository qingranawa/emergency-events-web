import { reinforcementFacts } from "../../data/mechanisms";

export function ReinforcementSection() {
  return <div className="reinforcement-system">
    <div className="reinforcement-comparison">
      <section className="vanilla-pipeline">
        <div className="module-panel-heading">
          <span className="mono">原版负责</span>
          <strong>保留原版增援流程</strong>
        </div>
        <ol className="vanilla-stage-list">{reinforcementFacts.vanillaStages.map((stage) => <li className="vanilla-stage" key={stage}>{stage}</li>)}</ol>
      </section>
      <section className="ee-intervention">
        <div className="module-panel-heading">
          <span className="mono">M02 接入范围</span>
          <strong>只控制这些增援边界</strong>
        </div>
        <div className="intervention-list">{reinforcementFacts.intervention.map(([label, detail]) => <article key={label}>
          <strong>{label}</strong><p>{detail}</p>
        </article>)}</div>
      </section>
    </div>

    <div className="primary-cap-panel">
      <div className="module-panel-heading">
        <span className="mono">主要增援人数上限</span>
        <strong>上限不是目标人数</strong>
      </div>
      <div className="wave-cap-ruler">{reinforcementFacts.caps.map(([tier, cap]) => <div key={tier}>
        <span className="mono">{tier} 档</span><strong>{cap} 人</strong>
      </div>)}</div>
      <p>{reinforcementFacts.capNote}</p>
    </div>

    <div className="major-wave-output">
      <strong>每次增援后记录真实结果</strong>
      <p>包括实际阵营、参与玩家、生成人数和增援完成时间。后续局势评估会使用这些记录。</p>
    </div>
    <p className="reinforcement-boundary-note">M02 不会强制选择阵营或补足人数，也不重写原版增援计时；只有符合条件时，才会在原版计时重置后进行一次阵营计时延长。</p>
  </div>;
}
