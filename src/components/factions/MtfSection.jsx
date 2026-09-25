import { mtfRows } from "../../data/factionsArchive";

export function MtfSection() {
  return <section id="mtf" className="faction-section" data-scroll-reveal><div className="container"><div className="section-head"><div><div className="section-kicker mono">02 / 行动单位</div><h2 className="section-title">行动单位</h2></div><p className="section-desc">MTF 是许多文章都会出现的基金会行动单位概念；不同作品里的名称、编号和职责可能不一样。</p></div><div className="mtf-rail">{mtfRows.map((row, index) => <article key={row.code}><span className="mtf-index mono">0{index + 1}</span><div><small className="mono">{row.code}</small><h3>{row.title}</h3><p>{row.text}</p></div></article>)}</div></div></section>;
}
