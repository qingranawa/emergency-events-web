import { factionSources } from "../../data/factionsArchive";

export function FactionSources() {
  return <section id="sources" className="faction-section faction-sources-section" data-scroll-reveal><div className="container"><div className="sources-layout"><div><div className="section-kicker mono">08 / 来源说明</div><h2 className="section-title">来源与边界</h2></div><div><p className="section-desc">本页内容根据官方 SCP Wiki 资料整理成中文，优先保留不同文章里都比较稳定的概念。页面没有使用 SCP Wiki 图片或未授权素材；原作者和授权信息请以原站为准。</p><div className="source-links">{factionSources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><span className="mono">↗</span>{source.label}</a>)}</div></div></div></div></section>;
}
