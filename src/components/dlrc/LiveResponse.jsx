import { useEffect, useState } from "react";

export function LiveResponse({ states, demoLabel = "SIMULATED" }) {
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const current = states[index];
  useEffect(() => { const timer = window.setInterval(() => { setTransitioning(true); window.setTimeout(() => { setIndex((value) => (value + 1) % states.length); setTransitioning(false); }, 220); }, 4600); return () => window.clearInterval(timer); }, [states.length]);
  return <section className="live-code-section"><div className="container"><div className="demo-ribbon mono">{demoLabel}</div><div className={`live-code ${transitioning ? "is-transitioning" : ""}`}><div className="code-panel"><div className="label mono">当前响应代码</div><div className="dlrc-code mono" aria-live="polite">{current.code}</div><div className="code-detail"><div className="tag">人口档位 · {current.population}</div><div className="tag">响应等级 · {current.response}</div><div className="tag bio">Crisis · {current.primary}</div><div className="tag sys">Crisis · {current.secondary}</div></div></div><div className="metric-panel"><div><div className="label mono">Response Score</div><div className="score mono"><span className="score-value">{current.score}</span><small>/ 100</small></div><div className="progress" aria-label="响应分数进度"><div style={{ width: `${current.score}%` }} /></div></div><div><div className="label">ControlState</div><div className="control-state">{current.state}</div></div></div></div></div></section>;
}
