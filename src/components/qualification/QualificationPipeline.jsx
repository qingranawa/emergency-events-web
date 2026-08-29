import { Fragment } from "react";

function StageRows({ rows, className = "fact-list" }) {
  return <div className={`${className} mono`}>{rows.map(([label, value]) => <div className={`${className === "condition-list" ? "condition" : className === "evaluation-list" ? "evaluation" : "fact"}-row`} key={label}><span>{label}</span><b>{value}</b></div>)}</div>;
}

function Stage({ stage }) {
  if (stage.kind === "qualify") return <article className="pipeline-stage qualify"><div className="pipeline-stage-head mono"><span className="stage-no">{stage.id}</span><span>{stage.code}</span></div><h3>{stage.title}</h3><p>{stage.description}</p><div className="pool-label mono"><span>EVENT POOL</span><span>FILTERING</span></div><div className="pool-label mono"><span>AVAILABLE</span><span>INPUT SET</span></div><div className="pool-bars" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <span key={index} />)}</div><div className="pool-label mono"><span>QUALIFIED</span><span>FEW MATCHES</span></div><div className="pool-bars qualified" aria-hidden="true">{Array.from({ length: 3 }, (_, index) => <span key={index} />)}</div></article>;
  if (stage.kind === "commit") return <article className="pipeline-stage commit"><div className="pipeline-stage-head mono"><span className="stage-no">{stage.id}</span><span>{stage.code}</span></div><h3>{stage.title}</h3><div className="commit-state"><span className="status-dot" aria-hidden="true" /><div><strong>EVENT QUALIFIED</strong><small className="mono">INTERVENTION READY</small></div></div><p>{stage.description}</p></article>;
  const listClass = stage.kind === "evaluate" ? "evaluation-list" : stage.kind === "revalidate" ? "condition-list" : "fact-list";
  return <article className={`pipeline-stage ${stage.kind}`}><div className="pipeline-stage-head mono"><span className="stage-no">{stage.id}</span><span>{stage.code}</span></div><h3>{stage.title}</h3><p>{stage.description}</p><StageRows rows={stage.rows} className={listClass} /></article>;
}

export function QualificationPipeline({ stages }) {
  return <div className="qualification-pipeline" aria-label="事件资格判断管线">{stages.map((stage, index) => <Fragment key={stage.id}><Stage stage={stage} />{index < stages.length - 1 && <div className={`pipeline-flow ${index === 0 ? "flow-many" : index === stages.length - 2 ? "flow-single" : "flow-filter"}`} aria-hidden="true">{Array.from({ length: index === 0 ? 4 : index === stages.length - 2 ? 1 : 3 }, (_, flowIndex) => <span key={flowIndex} />)}</div>}</Fragment>)}</div>;
}
