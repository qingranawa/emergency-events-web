import { anomalyTypes } from "../../data/factionsArchive";

export function AnomalySection() {
  return <section id="anomalies" className="faction-section" data-scroll-reveal><div className="container"><div className="section-head"><div><div className="section-kicker mono">06 / 无统一阵营</div><h2 className="section-title">异常实体</h2></div><p className="section-desc">异常实体各自独立出现，系统按对象和现象分别识别。</p></div><div className="anomaly-field"><div className="anomaly-center"><span className="mono">无统一指挥</span><strong>异常<br />实体</strong><small>按对象与现象识别</small></div>{anomalyTypes.map((type, index) => <span className={`anomaly-tag anomaly-tag-${index + 1}`} key={type}>{type}</span>)}</div></div></section>;
}
