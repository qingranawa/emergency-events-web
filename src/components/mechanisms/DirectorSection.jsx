import { directorFacts } from "../../data/mechanisms";

export function DirectorSection() {
  return <div className="director-mechanism">
    <ol className="director-funnel" aria-label="事件计划筛选和启动流程">
      {directorFacts.pipeline.map(([label, detail], index) => <li className="director-funnel-step" key={label}>
        <span className="mono">{String(index + 1).padStart(2, "0")}</span>
        <div><strong>{label}</strong><p>{detail}</p></div>
      </li>)}
    </ol>

    <div className="director-boundary-wide">
      <article><span className="mono">决定事件计划</span><h3>Event Director</h3><p>候选和选中结果都只是计划；只有复核通过并确认后，事件才进入启动阶段。</p></article>
      <article className="director-pack-boundary"><span className="mono">执行实际玩法</span><h3>事件内容包</h3><p>事件内容包负责生成角色和装备、提供目标与玩法，并在结束或失败后清理场景。</p></article>
    </div>

    <div className="director-principles">
      <p><b>响应顺序：</b>专业危机响应优先。只有普通支援事件才会按基金会、混沌分裂者、第三方等来源进行仲裁；FDI 只会临时影响普通支援的来源权重。</p>
    </div>

    <div className="director-failure-path">
      <strong>复核或启动失败</strong>
      <div>{directorFacts.failure.map((state) => <span key={state}>{state}</span>)}</div>
    </div>

    <div className="director-event2-branch">
      <div className="module-panel-heading"><span className="mono">第二个事件</span><strong>{directorFacts.event2Note}</strong></div>
      <ol className="event2-timeline">{directorFacts.event2.map(([label, detail]) => <li key={label}><span>{detail}</span><strong>{label}</strong></li>)}</ol>
    </div>
  </div>;
}
