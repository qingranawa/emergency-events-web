import { fdiMechanismFacts } from "../../data/mechanisms";

export function FdiSection() {
  return <div className="fdi-history" data-scroll-reveal>
    <div className="fdi-trace" aria-label="FDI 历史状态流程">
      <div className="fdi-trace-line" aria-hidden="true" />
      {fdiMechanismFacts.formula.filter((item) => !["+", "−", "→"].includes(item)).map((item, index) => <div className={`fdi-trace-point point-${index + 1}`} data-scroll-reveal key={item}><span className="fdi-trace-marker" aria-hidden="true" /><strong>{item}</strong><small className="mono">{index === 0 ? "HISTORY" : index === 1 ? "DELTA" : index === 2 ? "RECOVERY" : "CURRENT"}</small></div>)}
    </div>
    <div className="fdi-history-grid">
      <article><span className="mono">首次结算</span><p>{fdiMechanismFacts.initial}</p></article>
      <article><span className="mono">后续结算</span><p>{fdiMechanismFacts.later}</p></article>
      <article><span className="mono">DISORDER BAND</span>{fdiMechanismFacts.bands.map(([band, range, delta]) => <div className="fdi-band" key={band}><b>{band}</b><span>{range}</span><small>{delta}</small></div>)}</article>
      <article><span className="mono">ORDER RECOVERY</span><p>{fdiMechanismFacts.recovery}</p></article>
    </div>
    <div className="fdi-relation"><strong>FDI</strong><span>临时影响普通 SUPPORT 来源仲裁</span><i aria-hidden="true">≠</i><span>不改写 D-LRC、Crisis 或 Professional Response 资格</span></div>
    <p className="source-line mono">{fdiMechanismFacts.source}</p>
  </div>;
}
