import { factionIndex } from "../../data/factionsArchive";

export function FactionHero() {
  return <section className="factions-hero" data-scroll-reveal>
    <div className="container factions-hero-grid">
      <div>
        <span className="eyebrow mono">阵营参考 / 世界观资料</span>
        <h1>阵营<span>和行动单位</span></h1>
        <p className="hero-desc">这里介绍 Emergency Events 可能接触到的组织、行动单位和异常实体。资料页不等于已经上线的生产事件。</p>
      </div>
      <div className="factions-index-panel" aria-label="阵营索引">
        <span className="mono panel-label">页面目录</span>
        {factionIndex.map(({ id, code, label }) => <a href={`#${id}`} key={id}><small className="mono">{code}</small><strong>{label}</strong><span>↗</span></a>)}
      </div>
    </div>
  </section>;
}
