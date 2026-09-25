import { crisisDefinitions } from "../../data/dlrcPage";

export function CrisisAccordion() {
  return <div className="crisis-accordion">{crisisDefinitions.map((crisis, index) => <details className="crisis-detail" key={crisis.code} open={index === 0}><summary><span className="crisis-detail-code mono">{crisis.code}</span><strong>{crisis.name}</strong><span className="crisis-detail-toggle mono">展开 / 收起</span></summary><div className="crisis-detail-body"><div><span className="mono">发生条件</span><p>{crisis.trigger}</p></div><div><span className="mono">持续情况</span><p>{crisis.escalation}</p></div><div><span className="mono">解除条件</span><p>{crisis.resolution}</p></div><div><span className="mono">谁会读取</span><p>{crisis.readers}</p></div></div></details>)}</div>;
}
