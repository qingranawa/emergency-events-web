import { crisisDefinitions } from "../../data/dlrcPage";

export function CrisisAccordion() {
  return <div className="crisis-accordion">{crisisDefinitions.map((crisis, index) => <details className="crisis-detail" key={crisis.code} open={index === 0}><summary><span className="crisis-detail-code mono">{crisis.code}</span><strong>{crisis.name}</strong><span className="crisis-detail-toggle mono">OPEN / CLOSE</span></summary><div className="crisis-detail-body"><div><span className="mono">TRIGGER</span><p>{crisis.trigger}</p></div><div><span className="mono">ESCALATION</span><p>{crisis.escalation}</p></div><div><span className="mono">RESOLUTION</span><p>{crisis.resolution}</p></div><div><span className="mono">READ BY</span><p>{crisis.readers}</p></div></div></details>)}</div>;
}
