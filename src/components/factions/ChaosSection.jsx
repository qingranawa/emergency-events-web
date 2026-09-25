import { chaosCells } from "../../data/factionsArchive";

export function ChaosSection() {
  return <section id="chaos" className="faction-section" data-scroll-reveal><div className="container"><div className="section-head"><div><div className="section-kicker mono">03 / 分散网络</div><h2 className="section-title">混沌不是一条指挥链</h2></div><p className="section-desc">常见设定会把混沌写成由协调层和多个独立单元组成的网络；具体起源和内部结构会随作品变化。</p></div><div className="chaos-network"><div className="chaos-core"><span className="mono">协调层</span><strong>DELTA<br />COMMAND</strong><small>常见设定节点</small></div><div className="chaos-orbits">{chaosCells.slice(1).map((cell, index) => <article className={`chaos-cell chaos-cell-${index + 1}`} key={cell.code}><span className="mono">{cell.code}</span><strong>{cell.title}</strong><p>{cell.text}</p></article>)}</div></div><div className="canon-note"><span className="mono">设定说明</span><p>混沌的起源、目标和组织方式有多种写法。这里只保留“分散、适应性强、按单元行动”这些共同轮廓，不把某条故事线当成唯一答案。</p></div></div></section>;
}
