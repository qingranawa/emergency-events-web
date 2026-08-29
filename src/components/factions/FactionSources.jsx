import { factionSources } from "../../data/factionsArchive";

export function FactionSources() {
  return <section id="sources" className="faction-section faction-sources-section" data-scroll-reveal><div className="container"><div className="sources-layout"><div><div className="section-kicker mono">08 / SOURCE NOTES</div><h2 className="section-title">来源与边界</h2></div><div><p className="section-desc">本页文字为基于官方 SCP Wiki 资料的中文转述，优先保留跨文章稳定概念。没有使用 SCP Wiki 图片或未授权素材；引用页面的原作者与授权信息请以原站为准。</p><div className="source-links">{factionSources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><span className="mono">↗</span>{source.label}</a>)}</div></div></div></div></section>;
}
