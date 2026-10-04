import { commandRows, configurationRows, lifecycleStages, sourceWalkthrough, telemetryRows } from "../../data/mechanisms";

export function LifecycleSection() {
  return <div className="lifecycle-timeline">{lifecycleStages.map(([stage, detail], index) => <article key={stage}>
    <span className="mono">{String(index + 1).padStart(2, "0")}</span>
    <div><strong>{stage}</strong><p>{detail}</p></div>
  </article>)}</div>;
}

export function ConfigurationSection() {
  return <div className="mechanism-table-wrap" tabIndex="0" aria-label="配置项，可横向滚动"><table className="mechanism-table">
    <thead><tr><th scope="col">CONFIG</th><th scope="col">DEFAULT</th><th scope="col">PURPOSE</th><th scope="col">SOURCE</th></tr></thead>
    <tbody>{configurationRows.map(([name, value, purpose, source]) => <tr key={name}>
      <th scope="row">{name}</th><td className="mono">{value}</td><td>{purpose}</td><td className="mono">{source}</td>
    </tr>)}</tbody>
  </table></div>;
}

export function CommandsSection() {
  return <div className="commands-layout">
    <div className="command-terminal-large"><span className="mono">REMOTE ADMIN / ee</span><code>ee dlrc stage full</code><code>ee fdi explain</code><code>ee wave cap</code><code>ee o4 status</code><small>用于只读检查运行时状态；测试命令不代表 production event。</small></div>
    <div className="command-list-large">{commandRows.map(([command, purpose]) => <div key={command}>
      <code>{command}</code><span>{purpose}</span><b className="mono">AVAILABLE</b>
    </div>)}</div>
  </div>;
}

export function TelemetrySection() {
  return <div className="telemetry-stream">
    <div className="telemetry-stream-head"><span className="mono">RUNTIME FACTS · READ ONLY</span><p>记录判断和状态迁移，不重算上游结果。</p></div>
    {telemetryRows.map(([type, detail], index) => <div className="telemetry-row" key={type}>
      <time className="mono">{String(index + 1).padStart(2, "0")}</time><strong className="mono">{type}</strong><span>{detail}</span>
    </div>)}
  </div>;
}

export function SourceSection() {
  return <div className="source-walkthrough">{sourceWalkthrough.map(([method, path, detail], index) => <article key={method}>
    <div className="source-step mono">{String(index + 1).padStart(2, "0")}</div>
    <div><code>{method}</code><span className="mono">{path}</span><p>{detail}</p></div>
  </article>)}</div>;
}
