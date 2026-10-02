import { o4Facts } from "../../data/mechanisms";

export function O4Section() {
  return <div className="o4-panel-section">
    <p className="o4-status-line"><b>当前状态：</b>按设计暂缓，尚未实现。</p>
    <div className="o4-boundary-diagram">
      <article><span className="mono">Event Director</span><strong>提供有限候选</strong><p>仅在多个合格的基金会普通支援计划之间开启选择。</p></article>
      <span className="o4-boundary-arrow" aria-hidden="true">→</span>
      <article><span className="mono">O4 观察员</span><strong>从候选中选择</strong><p>选择结果返回 Event Director，仍需再次确认局势。</p></article>
    </div>
    <ul className="o4-facts-list">{o4Facts.current.slice(1).map((item) => <li key={item}>{item}</li>)}</ul>
  </div>;
}
