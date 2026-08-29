import { runtimeFlow } from "../../data/mechanisms";

export function RuntimeFlow() {
  return <div className="runtime-flow" aria-label="Emergency Events 运行流程"><div className="runtime-flow-line" aria-hidden="true" />{runtimeFlow.map((step, index) => <article className={`runtime-flow-step flow-${index + 1}`} key={step.code}><div className="runtime-flow-index mono">{step.code}</div><div className="runtime-flow-content"><span className="mono">{step.owner}</span><h3>{step.title}</h3><p>{step.detail}</p></div>{index < runtimeFlow.length - 1 && <span className="runtime-flow-arrow" aria-hidden="true">→</span>}</article>)}</div>;
}
