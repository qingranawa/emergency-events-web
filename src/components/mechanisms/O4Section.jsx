import { o4Facts } from "../../data/mechanisms";

export function O4Section() {
  return <div className="o4-panel-section">
    <p className="o4-status-line"><b>当前状态：</b>{o4Facts.status}</p>
    <div className="o4-boundary-diagram">
      <article><span className="mono">Event Director</span><strong>提供已筛选候选</strong><p>只有多个合格的基金会普通支援计划同时存在时才进入此边界。</p></article>
      <span className="o4-boundary-arrow" aria-hidden="true">→</span>
      <article><span className="mono">O4 观察员</span><strong>在有限候选中选择</strong><p>结果返回 Event Director；计划仍需最新局势复核后才能尝试启动。</p></article>
    </div>
    <ul className="o4-facts-list">{o4Facts.rules.map((item) => <li key={item}>{item}</li>)}</ul>
    <a className="text-link" href="#director-o4-branch">查看候选筛选中的 O4 选择演示 →</a>
  </div>;
}
