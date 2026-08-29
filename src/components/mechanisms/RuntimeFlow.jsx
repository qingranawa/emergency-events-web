import { useState } from "react";
import { runtimeFlow, runtimeTopology } from "../../data/mechanisms";

function TopologyNode({ node, focusId, setFocusId }) {
  const isDimmed = Boolean(focusId && !node.related.includes(focusId));
  return <a data-scroll-reveal className={`topology-node topology-${node.id} ${isDimmed ? "is-dimmed" : ""}`} href={`#${node.target}`} onMouseEnter={() => setFocusId(node.id)} onMouseLeave={() => setFocusId(null)} onFocus={() => setFocusId(node.id)} onBlur={() => setFocusId(null)}>
    <span className="topology-owner mono">{node.owner}</span>
    <strong>{node.label}</strong>
    <small>{node.detail}</small>
  </a>;
}

export function RuntimeFlow() {
  const [focusId, setFocusId] = useState(null);
  const getNode = (id) => runtimeTopology.find((node) => node.id === id);
  const renderNode = (id) => <TopologyNode node={getNode(id)} focusId={focusId} setFocusId={setFocusId} />;

  return <div className="runtime-overview" data-scroll-reveal>
    <div className={`runtime-topology ${focusId ? "has-focus" : ""}`} aria-label="Emergency Events Runtime Topology">
      <div className="topology-row">{renderNode("round-start")}</div>
      <div className="topology-connector" aria-hidden="true" />
      <div className="topology-row">{renderNode("round-core")}</div>
      <div className="topology-connector" aria-hidden="true" />
      <div className="topology-row">{renderNode("reinforcement")}</div>
      <div className="topology-connector" aria-hidden="true" />
      <div className="topology-row">{renderNode("round-facts")}</div>
      <div className="topology-connector" aria-hidden="true" />
      <div className="topology-row topology-row-focus">{renderNode("dlrc")}</div>
      <div className="topology-branch" aria-hidden="true"><span /><span /></div>
      <div className="topology-row topology-row-branch"><div>{renderNode("crisis-node")}</div><div>{renderNode("fdi-node")}</div></div>
      <div className="topology-connector" aria-hidden="true" />
      <div className="topology-row topology-row-focus">{renderNode("director")}</div>
      <div className="topology-connector" aria-hidden="true" />
      <div className="topology-row">{renderNode("event-pack")}</div>
    </div>
    <ol className="runtime-trace" aria-label="Runtime 流程索引">
      {runtimeFlow.map((step) => <li data-scroll-reveal key={step.code}><span className="mono">{step.code}</span><strong>{step.title}</strong><small className="mono">{step.owner}</small></li>)}
    </ol>
  </div>;
}
