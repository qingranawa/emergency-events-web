import { architectureLayers, commandRows, configurationRows, lifecycleStages, mechanismStatus, sourceWalkthrough, telemetryRows } from "../../data/mechanisms";

export function ArchitectureSection() {
  return <div className="architecture-stack" data-scroll-reveal data-motion="layers" aria-label="Emergency Events 模块关系图">{architectureLayers.map((layer, index) => <div className="architecture-layer" style={{ "--motion-delay": `${index * 95}ms` }} key={layer.label}><div className="architecture-layer-label mono">{layer.label}</div><div className="architecture-layer-nodes">{layer.nodes.map((node) => <span key={node}>{node}</span>)}</div>{index < architectureLayers.length - 1 && <div className="architecture-down" aria-hidden="true">↓</div>}</div>)}</div>;
}

export function LifecycleSection() {
  return <div className="lifecycle-timeline">{lifecycleStages.map(([stage, detail], index) => <article key={stage}><span className="mono">{String(index + 1).padStart(2, "0")}</span><div><strong>{stage}</strong><p>{detail}</p></div></article>)}</div>;
}

export function ConfigurationSection() {
  return <div className="mechanism-table-wrap"><table className="mechanism-table"><thead><tr><th>配置项</th><th>默认值</th><th>作用</th><th>源码</th></tr></thead><tbody>{configurationRows.map(([name, value, purpose, source]) => <tr key={name}><th>{name}</th><td className="mono">{value}</td><td>{purpose}</td><td className="mono">{source}</td></tr>)}</tbody></table></div>;
}

export function CommandsSection() {
  return <div className="commands-layout"><div className="command-terminal-large"><span className="mono">服主查询 / ee</span><code>ee dlrc stage full</code><code>ee disorder explain</code><code>ee wave cap</code><small>需要服主权限；`ee test` 仅用于诊断，正式事件由生产内容提供。</small></div><div className="command-list-large">{commandRows.map(([command, purpose]) => <div key={command}><code>{command}</code><span>{purpose}</span><b className="mono">可用</b></div>)}</div></div>;
}

export function TelemetrySection() {
  return <div className="telemetry-stream"><div className="telemetry-stream-head"><span className="mono">运行记录 · 只读</span><p>只记录回合内安全编号和状态，不参与回合决策。</p></div>{telemetryRows.map(([type, detail], index) => <div className="telemetry-row" key={type}><time className="mono">0{index + 1}:00</time><strong className="mono">{type}</strong><span>{detail}</span></div>)}</div>;
}

export function SourceSection() {
  return <div className="source-walkthrough">{sourceWalkthrough.map(([method, path, detail], index) => <article key={method}><div className="source-step mono">{String(index + 1).padStart(2, "0")}</div><div><code>{method}</code><span className="mono">{path}</span><p>{detail}</p></div>{index < sourceWalkthrough.length - 1 && <i aria-hidden="true">↓</i>}</article>)}</div>;
}

export function StatusSection() {
  return <div className="mechanism-status-table"><div className="mechanism-status-row mechanism-status-head"><span>模块</span><span>状态</span><span>当前边界</span></div>{mechanismStatus.map(([index, module, status, detail]) => <div className="mechanism-status-row" key={`${index}-${module}`}><span><b className="mono">{index}</b>{module}</span><strong className={`status-${status === "已完成" ? "ready" : status === "按设计暂缓" ? "deferred" : status === "开发中" ? "progress" : "pending"}`}>{status}</strong><p>{detail}</p></div>)}</div>;
}
