export function FactionRelationshipMap() {
  return <section id="relationship" className="faction-section faction-map-section" data-scroll-reveal>
    <div className="container">
      <div className="section-head"><div><div className="section-kicker mono">00 / RELATIONSHIP MAP</div><h2 className="section-title">关系网</h2></div><p className="section-desc">这是一张类型与上下游关系图，不是阵营强弱榜。边线表示常见组织关系，异常实体保持分散。</p></div>
      <div className="faction-map" role="img" aria-label="基金会、行动单位、政府机构、混沌、GOC 与异常实体之间的关系图">
        <div className="faction-map-column map-column-left"><a href="#foundation" className="map-node node-foundation"><small className="mono">CONTAINMENT</small><strong>基金会</strong><span>研究 · 收容 · 安保</span></a><a href="#chaos" className="map-node node-chaos"><small className="mono">DECENTRALIZED</small><strong>混沌</strong><span>独立单元网络</span></a></div>
        <div className="faction-map-bridge" aria-hidden="true"><i>↘</i><i>→</i><i>↗</i></div>
        <div className="faction-map-column map-column-center"><a href="#mtf" className="map-node node-unit"><small className="mono">DEPLOYMENT</small><strong>MTF / AMTF</strong><span>特定威胁行动单位</span></a><a href="#goc" className="map-node node-goc"><small className="mono">COALITION</small><strong>GOC</strong><span>国际超自然联盟</span></a><a href="#uiu" className="map-node node-uiu"><small className="mono">FEDERAL</small><strong>FBI / UIU</strong><span>联邦异常事件组</span></a></div>
        <div className="faction-map-bridge" aria-hidden="true"><i>→</i><i>→</i><i>→</i></div>
        <div className="faction-map-column map-column-right"><a href="#anomalies" className="map-node node-anomaly"><small className="mono">NO COMMAND</small><strong>异常实体</strong><span>现象 · 对象 · 生物</span></a></div>
      </div>
    </div>
  </section>;
}
