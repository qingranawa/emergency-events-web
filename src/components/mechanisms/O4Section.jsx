import { o4Facts } from "../../data/mechanisms";

export function O4Section() {
  return <div className="o4-panel-section">
    <div className="o4-status-line">
      <span className="mono">M06 / O4 PANEL</span>
      <div>{o4Facts.status.map((status) => <span className="status-tag" key={status}>{status}</span>)}</div>
    </div>
    <div className="o4-boundary-diagram">
      <article><span className="mono">M05</span><strong>已排序的合法 shortlist</strong><small>仅 Foundation normal SUPPORT 的多个候选</small></article>
      <span className="o4-boundary-arrow" aria-hidden="true">↔</span>
      <article><span className="mono">M06</span><strong>最多 2 个有限候选</strong><small>O4 返回选择结果；M05 仍 revalidate</small></article>
    </div>
    <div className="o4-facts-list">
      {o4Facts.current.map((item) => <p key={item}>{item}</p>)}
      <p>{o4Facts.input}</p>
      <p>{o4Facts.interaction}</p>
    </div>
    <p className="source-line mono">{o4Facts.source}</p>
  </div>;
}
