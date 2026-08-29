import { reinforcementFacts } from "../../data/mechanisms";

export function ReinforcementSection() {
  return <div className="reinforcement-layout"><div className="reinforcement-column retained"><span className="mono">VANILLA-OWNED</span><h3>原版继续负责</h3>{reinforcementFacts.retained.map((item) => <p key={item}><b>✓</b>{item}</p>)}</div><div className="reinforcement-bridge"><span className="mono">PUBLISHED BOUNDARY</span><strong>Primary Wave</strong><small>原版结果 → 插件观察</small></div><div className="reinforcement-column adjusted"><span className="mono">EMERGENCY EVENTS</span><h3>插件处理边界</h3>{reinforcementFacts.emergency.map((item) => <p key={item}><b>→</b>{item}</p>)}</div><div className="reinforcement-foot"><strong>Cap 是截断上限</strong><span>{reinforcementFacts.capNote}</span><span>{reinforcementFacts.timerNote}</span><small className="mono">{reinforcementFacts.source}</small></div></div>;
}
