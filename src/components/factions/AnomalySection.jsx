import { anomalyTypes } from "../../data/factionsArchive";

export function AnomalySection() {
  return <section id="anomalies" className="faction-section" data-scroll-reveal><div className="container"><div className="section-head"><div><div className="section-kicker mono">06 / 无统一阵营</div><h2 className="section-title">异常实体</h2></div><p className="section-desc">异常实体不是一个阵营，没有统一指挥、共同目标或固定组织。响应系统只按它们的类型分别识别。</p></div><div className="anomaly-field"><div className="anomaly-center"><span className="mono">无统一指挥</span><strong>异常<br />实体</strong><small>按对象与现象识别</small></div>{anomalyTypes.map((type, index) => <span className={`anomaly-tag anomaly-tag-${index + 1}`} key={type}>{type}</span>)}</div></div></section>;
}
