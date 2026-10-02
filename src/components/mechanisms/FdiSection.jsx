import { fdiMechanismFacts } from "../../data/mechanisms";

export function FdiSection() {
  return <div className="fdi-history">
    <div className="fdi-intro-row">
      <div><strong>FDI = 设施当前累计混乱程度</strong><p>它记录一段时间内设施秩序的变化，不等同于 D-LRC 响应等级或危机数量。</p></div>
      <span className="fdi-range-label mono">0–100</span>
    </div>

    <div className="fdi-band-scale" aria-label="FDI 混乱程度：0 至 29 为低，30 至 59 为中，60 至 100 为高">
      <div className="fdi-band-track"><span className="fdi-band-low" /><span className="fdi-band-medium" /><span className="fdi-band-high" /></div>
      <div className="fdi-band-labels"><span>0–29 · 低</span><span>30–59 · 中</span><span>60–100 · 高</span></div>
    </div>

    <div className="fdi-change-columns">
      <article><h4>哪些情况会升高</h4><p>{fdiMechanismFacts.increase}</p></article>
      <article><h4>哪些情况会下降</h4><p>{fdiMechanismFacts.decrease}</p></article>
    </div>

    <div className="fdi-settlement-trace">
      <article><span className="mono">首次正式结算</span><strong>约 06:31</strong><p>与第一次正式局势评估同时进行。</p></article>
      <span className="fdi-trace-arrow" aria-hidden="true">→</span>
      <article><span className="mono">之后</span><strong>固定周期结算</strong><p>累计上次结算后的新变化，并检查是否满足恢复条件。</p></article>
    </div>

    <div className="fdi-settlement-guards">
      <p><b>正式结算：</b>{fdiMechanismFacts.timing}</p>
      <p><b>自然恢复：</b>{fdiMechanismFacts.recovery}</p>
    </div>
    <p className="fdi-relation"><b>FDI 会影响什么：</b>只临时影响 Event Director 对普通支援来源的权重，不决定专业危机响应。</p>
  </div>;
}
