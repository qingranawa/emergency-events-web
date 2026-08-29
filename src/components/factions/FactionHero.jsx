import { factionIndex } from "../../data/factionsArchive";

export function FactionHero() {
  return <section className="factions-hero" data-scroll-reveal>
    <div className="container factions-hero-grid">
      <div>
        <span className="eyebrow mono">FACTION ARCHIVE / WORLDVIEW INDEX</span>
        <h1>阵营<span>与行动单位</span></h1>
        <p className="hero-desc">来自 SCP 世界观中的组织、行动单位与异常势力。这里记录它们如何介入一局游戏，以及哪些关系只是常见设定而非固定答案。</p>
      </div>
      <div className="factions-index-panel" aria-label="阵营索引">
        <span className="mono panel-label">ARCHIVE INDEX</span>
        {factionIndex.map(({ id, code, label }) => <a href={`#${id}`} key={id}><small className="mono">{code}</small><strong>{label}</strong><span>↗</span></a>)}
      </div>
    </div>
  </section>;
}
