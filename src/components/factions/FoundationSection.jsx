import { foundationConcepts } from "../../data/factionsArchive";

export function FoundationSection() {
  return <section id="foundation" className="faction-section" data-scroll-reveal>
    <div className="container"><div className="dossier-layout">
      <div className="dossier-lead"><div className="section-kicker mono">01 / FOUNDATION</div><h2>基金会</h2><p>一个以研究、收容和安保为核心的秘密组织。页面采用稳定的世界观共识，不把单篇作品的部门设定当作完整组织图。</p><span className="dossier-stamp mono">SECURE · CONTAIN · PROTECT</span></div>
      <div className="dossier-structure"><div className="dossier-structure-head"><span className="mono">CONCEPTUAL STRUCTURE</span><em>非穷尽示意</em></div>{foundationConcepts.map((item) => <article key={item.code}><span className="mono">{item.code}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><b>↗</b></article>)}</div>
    </div></div>
  </section>;
}
