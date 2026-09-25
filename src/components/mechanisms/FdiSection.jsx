import { fdiMechanismFacts } from "../../data/mechanisms";

export function FdiSection() {
  return <div className="fdi-history" data-scroll-reveal data-motion="signal">
    <div className="fdi-trace" aria-label="FDI 历史状态">
      <div className="fdi-trace-line" aria-hidden="true" />
      {fdiMechanismFacts.formula.filter((item) => !["+", "−", "→"].includes(item)).map((item, index) => <div className={`fdi-trace-point point-${index + 1}`} style={{ "--motion-delay": `${index * 110 + 140}ms` }} key={item}><span className="fdi-trace-marker" aria-hidden="true" /><strong>{item}</strong><small className="mono">{index === 0 ? "上次记录" : index === 1 ? "新变化" : index === 2 ? "秩序恢复" : "当前记录"}</small></div>)}
    </div>
    <div className="fdi-history-grid">
      <article><span className="mono">首次结算</span><p>{fdiMechanismFacts.initial}</p></article>
      <article><span className="mono">后续结算</span><p>{fdiMechanismFacts.later}</p></article>
      <article><span className="mono">失序范围</span>{fdiMechanismFacts.bands.map(([band, range, delta]) => <div className="fdi-band" key={band}><b>{band}</b><span>{range}</span><small>{delta}</small></div>)}</article>
      <article><span className="mono">秩序恢复</span><p>{fdiMechanismFacts.recovery}</p></article>
    </div>
    <div className="fdi-relation"><strong>设施记录</strong><span>只临时影响普通支援从哪个来源产生</span><i aria-hidden="true">≠</i><span>不改写响应等级、危机状态或专业危机资格</span></div>
    <p className="source-line mono">源码入口：{fdiMechanismFacts.source}</p>
  </div>;
}
