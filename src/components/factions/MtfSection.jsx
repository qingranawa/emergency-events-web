import { mtfRows } from "../../data/factionsArchive";

export function MtfSection() {
  return <section id="mtf" className="faction-section" data-scroll-reveal><div className="container"><div className="section-head"><div><div className="section-kicker mono">02 / FIELD UNITS</div><h2 className="section-title">行动单位</h2></div><p className="section-desc">MTF 是跨文章都常见的基金会行动单位概念；AMTF 只在部分设定中出现，不能当成统一层级。</p></div><div className="mtf-rail">{mtfRows.map((row, index) => <article key={row.code}><span className="mtf-index mono">0{index + 1}</span><div><small className="mono">{row.code}</small><h3>{row.title}</h3><p>{row.text}</p></div></article>)}</div></div></section>;
}
