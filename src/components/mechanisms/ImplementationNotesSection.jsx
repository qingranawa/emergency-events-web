import { mechanismFacts, mechanismStatus } from "../../data/mechanisms";
import { m07ImplementationNotes, m07Validation } from "../../data/m07";

export function ImplementationNotesSection() {
  return <div className="implementation-notes">
    <div className="mechanism-status-table">
      <div className="mechanism-status-row mechanism-status-head"><span>MODULE</span><span>STATUS</span><span>BOUNDARY</span></div>
      {mechanismStatus.map(([module, name, status, detail]) => <div className="mechanism-status-row" key={module + name}>
        <span><b className="mono">{module}</b>{name}</span>
        <div className="status-tag-list">{status.map((item) => <span className="status-tag" key={item}>{item}</span>)}</div>
        <p>{detail}</p>
      </div>)}
    </div>
    <div className="m07-validation-panel">
      <div><span className="mono">M07 LOGIC SUITE</span><strong>{mechanismFacts.testBaseline}</strong><small>{m07Validation.logic}</small></div>
      <div><span className="mono">PLUGIN / HARNESS BUILD</span><strong>BLOCKED</strong><small>{m07Validation.build}</small></div>
      <div><span className="mono">LIVE SERVER</span><strong>LIVE VALIDATION PENDING</strong><small>{m07Validation.live}</small></div>
    </div>
    <div className="m07-phase-refs"><span className="mono">M07 PHASE REFERENCES</span>{m07Validation.phaseCommits.map((commit) => <code key={commit}>{commit}</code>)}</div>
    <div className="implementation-blockers">
      <div className="module-panel-heading"><span className="mono">M07 IMPLEMENTATION NOTES</span><strong>Capability 与实服验证状态</strong></div>
      {m07ImplementationNotes.map(([item, status, detail]) => <article key={item}>
        <strong>{item}</strong><span className="status-tag">{status}</span><p>{detail}</p>
      </article>)}
    </div>
  </div>;
}
