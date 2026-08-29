import { useState } from "react";
import { runtimeFlow, runtimeTopology } from "../../data/mechanisms";

function TopologyNode({ node, index, focusId, setFocusId }) {
  const isDimmed = Boolean(focusId && !node.related.includes(focusId));
  return <a className={`topology-node topology-${node.id} ${isDimmed ? "is-dimmed" : ""}`} href={`#${node.target}`} style={{ "--motion-delay": `${index * 72}ms` }} onMouseEnter={() => setFocusId(node.id)} onMouseLeave={() => setFocusId(null)} onFocus={() => setFocusId(node.id)} onBlur={() => setFocusId(null)}>
    <span className="topology-owner mono">{node.owner}</span>
    <strong>{node.label}</strong>
    <small>{node.detail}</small>
  </a>;
}

export function RuntimeFlow() {
  const [focusId, setFocusId] = useState(null);
  const getNode = (id) => runtimeTopology.find((node) => node.id === id);
  const renderNode = (id, index) => <TopologyNode node={getNode(id)} index={index} focusId={focusId} setFocusId={setFocusId} />;
  const renderConnector = (index) => <div className="topology-connector" style={{ "--motion-delay": `${index * 72 + 34}ms` }} aria-hidden="true" />;

  return <div className="runtime-overview" data-scroll-reveal data-motion="topology">
    <div className={`runtime-topology ${focusId ? "has-focus" : ""}`} aria-label="Emergency Events Runtime Topology">
      <div className="topology-row">{renderNode("round-start", 0)}</div>
      {renderConnector(0)}
      <div className="topology-row">{renderNode("round-core", 1)}</div>
      {renderConnector(1)}
      <div className="topology-row">{renderNode("reinforcement", 2)}</div>
      {renderConnector(2)}
      <div className="topology-row">{renderNode("round-facts", 3)}</div>
      {renderConnector(3)}
      <div className="topology-row topology-row-focus">{renderNode("dlrc", 4)}</div>
      <div className="topology-branch" style={{ "--motion-delay": "322ms" }} aria-hidden="true"><span /><span /></div>
      <div className="topology-row topology-row-branch"><div>{renderNode("crisis-node", 5)}</div><div>{renderNode("fdi-node", 5)}</div></div>
      {renderConnector(5)}
      <div className="topology-row topology-row-focus">{renderNode("director", 6)}</div>
      {renderConnector(6)}
      <div className="topology-row">{renderNode("event-pack", 7)}</div>
    </div>
    <ol className="runtime-trace" aria-label="Runtime 流程索引">
      {runtimeFlow.map((step) => <li data-scroll-reveal key={step.code}><span className="mono">{step.code}</span><strong>{step.title}</strong><small className="mono">{step.owner}</small></li>)}
    </ol>
  </div>;
}
