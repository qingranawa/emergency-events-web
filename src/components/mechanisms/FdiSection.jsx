import { fdiMechanismFacts } from "../../data/mechanisms";

export function FdiSection() {
  return <div className="fdi-history">
    <div className="fdi-range-heading"><span className="mono">FACILITY DISORDER INDEX</span><strong>0 — 100</strong></div>
    <div className="fdi-value-scale" aria-label="FDI value range from 0 to 100"><span className="mono">0</span><i /><span className="mono">100</span></div>
    <div className="fdi-settlement-trace">
      {fdiMechanismFacts.initial[0].map((item, index) => <article key={item}>
        <span className="fdi-trace-marker" aria-hidden="true" />
        <small className="mono">{index === 0 ? "INITIAL BASE" : index === 1 ? "CURRENT STOCK" : "RECENT WINDOW"}</small>
        <strong>{item}</strong>
      </article>)}
      <div className="fdi-trace-arrow" aria-hidden="true">→</div>
      <article className="fdi-first-settlement"><span className="mono">FIRST SETTLEMENT</span><strong>06:31</strong><small>与系统第一次正式评估同步</small></article>
    </div>
    <div className="fdi-periodic-model">
      <article><span className="mono">INITIAL</span><strong>InitialBase + CurrentStockAdjustment + Recent120sTransientDelta</strong><p>{fdiMechanismFacts.initial[1]}</p></article>
      <article><span className="mono">LATER</span><strong>{fdiMechanismFacts.later}</strong><p>只将上次结算后的新变化并入历史值。</p></article>
    </div>
    <div className="fdi-settlement-guards">
      {fdiMechanismFacts.settlement.map(([trigger, effect]) => <article key={trigger}>
        <strong className="mono">{trigger}</strong><span>{effect}</span>
      </article>)}
    </div>
    <div className="fdi-recovery-row">
      <span className="mono">RECOVERY</span><strong>90 seconds default</strong><p>{fdiMechanismFacts.recovery}</p>
    </div>
    <div className="fdi-state-fields">
      <span className="mono">RUNTIME STATE FIELDS</span>
      <div>{fdiMechanismFacts.stateFields.map(([field, detail]) => <article key={field}><code>{field}</code><small>{detail}</small></article>)}</div>
      <p>官网没有连接实时服务器；这些字段描述运行状态结构，不是当前某局的实时数值。</p>
    </div>
    <div className="fdi-relation">
      <strong>FDI</strong><span>{fdiMechanismFacts.relation}</span>
    </div>
    <p className="fdi-separation-note">FDI 是 historical facility disorder state，与 D-LRC response evaluation 分开保存，也没有 Crisis Severity 语义。</p>
    <p className="source-line mono">源码入口：{fdiMechanismFacts.source}</p>
  </div>;
}
