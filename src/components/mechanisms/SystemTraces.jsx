import { systemTraces } from "../../data/mechanisms";

export function SystemTraces() {
  return <div className="system-traces">
    {systemTraces.map((trace) => <article className="system-trace" key={trace.id}>
      <div className="system-trace-heading"><span className="mono">TRACE {trace.id}</span><strong>{trace.title}</strong></div>
      <ol>{trace.steps.map((step, index) => <li key={step}>
        <span className="mono">{String(index + 1).padStart(2, "0")}</span>
        <strong>{step}</strong>
        {index < trace.steps.length - 1 && <i aria-hidden="true">→</i>}
      </li>)}</ol>
    </article>)}
  </div>;
}
