import { anomalyTypes } from "../../data/factionsArchive";

export function AnomalySection() {
  return <section id="anomalies" className="faction-section" data-scroll-reveal><div className="container"><div className="section-head"><div><div className="section-kicker mono">06 / UNALIGNED FIELD</div><h2 className="section-title">异常实体</h2></div><p className="section-desc">异常实体不是一个阵营，也没有统一指挥、共享目标或共同组织。它们只是在响应系统中被识别为不同类型的异常对象。</p></div><div className="anomaly-field"><div className="anomaly-center"><span className="mono">NO UNIFIED COMMAND</span><strong>ANOMALOUS<br />ENTITIES</strong><small>按对象与现象识别</small></div>{anomalyTypes.map((type, index) => <span className={`anomaly-tag anomaly-tag-${index + 1}`} key={type}>{type}</span>)}</div></div></section>;
}
