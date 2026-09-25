import { reinforcementFacts } from "../../data/mechanisms";

export function ReinforcementSection() {
  return <div className="reinforcement-layout"><div className="reinforcement-column retained"><span className="mono">原版负责</span><h3>原版继续负责</h3>{reinforcementFacts.retained.map((item) => <p key={item}><b>✓</b>{item}</p>)}</div><div className="reinforcement-bridge"><span className="mono">插件记录边界</span><strong>原版增援波次</strong><small>原版结果 → 插件记录</small></div><div className="reinforcement-column adjusted"><span className="mono">插件调整</span><h3>插件只调整这些</h3>{reinforcementFacts.emergency.map((item) => <p key={item}><b>→</b>{item}</p>)}</div><div className="reinforcement-foot"><strong>人数上限不是刷满目标</strong><span>{reinforcementFacts.capNote}</span><span>{reinforcementFacts.timerNote}</span><small className="mono">{reinforcementFacts.source}</small></div></div>;
}
