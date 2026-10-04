import { directorFacts } from "../../data/mechanisms";

export function DirectorSection() {
  return <div className="director-mechanism">
    <div className="director-funnel" aria-label="Event Director candidate funnel">
      {directorFacts.pipeline.map(([label, detail], index) => <article className="director-funnel-step" key={label}>
        <span className="mono">{String(index + 1).padStart(2, "0")}</span>
        <strong>{label}</strong><p>{detail}</p>
      </article>)}
    </div>
    <div className="director-eligibility">
      <span className="mono">ELIGIBILITY INPUTS</span>
      <ul>{directorFacts.eligibility.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
    <div className="director-boundary-wide">
      <article><span className="mono">M05 / DECISION</span><h3>Event Director</h3><p>输出 Candidate 与 Selected plan；执行前 TryStart 会用最新 context revalidate，再由 Commit 提交。</p></article>
      <article className="director-pack-boundary"><span className="mono">EVENT PACK / EXECUTION</span><h3>Actual gameplay</h3><p>Spawn、Role、Equipment、Abilities、Objectives、Lifecycle、Rollback 与 Cleanup 由内容层实现。</p></article>
    </div>
    <div className="director-failure-path">
      <span className="mono">REVALIDATE / EXECUTION FAILURE</span>
      <div>{directorFacts.failure.map((state) => <strong key={state}>{state}</strong>)}</div>
    </div>
    <div className="director-event2-branch">
      <div className="module-panel-heading"><span className="mono">EVENT #2 · SEPARATE BRANCH</span><strong>{directorFacts.event2Note}</strong></div>
      <div className="event2-timeline">{directorFacts.event2.map(([label, detail]) => <article key={label}><span className="mono">{detail}</span><strong>{label}</strong></article>)}</div>
    </div>
    <p className="source-line mono">源码入口：{directorFacts.source}</p>
  </div>;
}
