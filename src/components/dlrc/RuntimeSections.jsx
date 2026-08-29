import { fdiFacts, evaluationCycle, qualificationSteps, directorBoundary, vanillaIntegration, runtimeFallback } from "../../data/dlrcPage";

export function CrisisRelation() {
  return <div className="crisis-relation"><div className="relation-demo mono">模拟关系 / ILLUSTRATIVE</div><div className="relation-card relation-global"><span className="mono">整体响应</span><strong>L4</strong><small>示例响应等级</small></div><div className="relation-symbol">≠</div><div className="relation-card relation-crisis"><span className="mono">Crisis 标签</span><div><b>BIO</b><i>■■■</i></div><div><b>SYS</b><i>■</i></div><div><b>SEC</b><i>■■</i></div><small>各 Detector 独立判断 Active 状态。</small></div><div className="relation-symbol">≠</div><div className="relation-card relation-fdi"><span className="mono">设施失序</span><strong>62</strong><small>示例 FDI 数值</small></div></div>;
}

export function FdiFlow() {
  return <div className="fdi-flow"><div className="fdi-equation"><span>上次 FDI</span><b>+</b><span>事件 Delta</span><b>−</b><span>秩序恢复</span><b>→</b><strong>当前 FDI</strong></div><div className="fdi-details"><div><span className="mono">首次结算</span><p>{fdiFacts.initial}</p></div><div><span className="mono">后续结算</span><p>{fdiFacts.later}</p></div><div><span className="mono">区间</span><p>{fdiFacts.bands.join(" / ")} · 范围 {fdiFacts.range}</p></div><div><span className="mono">恢复条件</span><p>{fdiFacts.recovery}</p></div></div></div>;
}

export function SystemRelationship() {
  return <div className="system-relationship"><div className="system-layer"><span className="system-node">Round Core</span><span className="system-node">FDI</span><span className="system-node">Crisis</span></div><div className="system-connector">↓</div><div className="system-layer"><span className="system-node accent">D-LRC</span><span className="system-node accent">Event Director</span></div><div className="system-connector">↓</div><div className="system-layer"><span className="system-node">Population Plan</span><span className="system-node">Event Pack</span><span className="system-node">Telemetry</span></div><p className="section-note">上游数据进入 D-LRC 和 Event Director，下游分别处理人口计划、事件内容和只读记录。</p></div>;
}

export function EvaluationCycle() {
  return <div className="evaluation-cycle">{evaluationCycle.map((step, index) => <div className="cycle-step" key={step.label}><span className="cycle-index mono">0{index + 1}</span><div><b>{step.label}</b><p>{step.detail}</p></div>{index < evaluationCycle.length - 1 && <span className="cycle-arrow" aria-hidden="true">→</span>}</div>)}</div>;
}

export function QualificationFlow() {
  return <div className="qualification-flow">{qualificationSteps.map(([label, detail], index) => <div className="qualification-step" key={label}><span className="qualification-index mono">0{index + 1}</span><b>{label}</b><p>{detail}</p>{index < qualificationSteps.length - 1 && <span className="qualification-arrow" aria-hidden="true">↓</span>}</div>)}</div>;
}

export function DirectorBoundary() {
  return <div className="director-boundary">{directorBoundary.map((item) => <div className="director-side" key={item.side}><span className="mono">{item.side}</span><strong>{item.question}</strong><p>{item.detail}</p></div>)}</div>;
}

export function VanillaIntegration() {
  return <div className="vanilla-integration"><div className="integration-column"><span className="mono">原版 / 保留</span>{vanillaIntegration.retained.map((item) => <p key={item}><b>✓</b>{item}</p>)}</div><div className="integration-column"><span className="mono">Emergency Events / 调整范围</span>{vanillaIntegration.constrained.map((item) => <p key={item}><b>→</b>{item}</p>)}</div><div className="integration-column disabled"><span className="mono">已关闭</span>{vanillaIntegration.disabled.map((item) => <p key={item}><b>×</b>{item}</p>)}</div></div>;
}

export function RuntimeFallback() {
  return <div className="runtime-fallback"><div className="fallback-state"><strong>15</strong><span>玩家</span><b>回到原版流程</b></div><div className="fallback-arrow">⇄</div><div className="fallback-state active"><strong>16+</strong><span>玩家</span><b>Emergency Events 已启用</b></div><p>{runtimeFallback.detail}</p></div>;
}
