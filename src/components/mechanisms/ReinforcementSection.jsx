import { reinforcementFacts } from "../../data/mechanisms";

export function ReinforcementSection() {
  return <div className="reinforcement-system">
    <div className="reinforcement-comparison">
      <section className="vanilla-pipeline">
        <div className="module-panel-heading">
          <span className="mono">VANILLA PIPELINE</span>
          <strong>原版仍拥有的流程</strong>
        </div>
        <div className="vanilla-stage-list">{reinforcementFacts.vanillaStages.map((stage, index) => <div className="vanilla-stage" key={stage}>
          <span className="mono">{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong>
        </div>)}</div>
      </section>
      <section className="ee-intervention">
        <div className="module-panel-heading">
          <span className="mono">EE INTERVENTION</span>
          <strong>只改动明确需要的边界</strong>
        </div>
        <div className="intervention-list">{reinforcementFacts.intervention.map(([label, detail]) => <article key={label}>
          <span className="mono">{label}</span><p>{detail}</p>
        </article>)}</div>
      </section>
    </div>

    <div className="primary-cap-panel">
      <div className="module-panel-heading">
        <span className="mono">PRIMARY WAVE MAXIMUMRESPAWNAMOUNT</span>
        <strong>上限是 ceiling，不是目标人数</strong>
      </div>
      <div className="wave-cap-ruler">{reinforcementFacts.caps.map(([tier, cap]) => <div key={tier}>
        <span className="mono">{tier}</span><strong>{cap}</strong><small>max</small>
      </div>)}</div>
      <p>{reinforcementFacts.capNote}</p>
    </div>

    <div className="major-wave-output">
      <div><span className="mono">ACTUAL WAVE FACTS</span><strong>真实生成结果</strong><p>哪一方、哪些玩家、实际人数与完成时间。</p></div>
      <div className="major-wave-events">{reinforcementFacts.outputs.map((event) => <code key={event}>{event}</code>)}</div>
    </div>
    <p className="source-line mono">{reinforcementFacts.source}</p>
  </div>;
}
