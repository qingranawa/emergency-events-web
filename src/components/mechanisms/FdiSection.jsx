import { useState } from "react";
import { fdiDemoFacts, fdiMechanismFacts } from "../../data/mechanisms";

const clamp = (value) => Math.max(0, Math.min(100, value));
const bandFor = (value) => value < 30 ? "LOW" : value < 60 ? "MEDIUM" : "HIGH";
const bandLabel = { LOW: "低", MEDIUM: "中", HIGH: "高" };
const formatDelta = (value) => value > 0 ? `+${value}` : String(value);

export function FdiSection() {
  const [settledValue, setSettledValue] = useState(fdiDemoFacts.startingValue);
  const [pendingDelta, setPendingDelta] = useState(0);
  const [recoveryReady, setRecoveryReady] = useState(false);
  const [notice, setNotice] = useState("待结算变化为 0。记录事件后，数值会先进入待结算栏。 ");
  const currentBand = bandFor(settledValue);

  const recordIncident = () => {
    setPendingDelta((value) => value + fdiDemoFacts.incident.delta);
    setRecoveryReady(false);
    setNotice(`已记录一次“${fdiDemoFacts.incident.label}”。变化先累计，尚未计入已结算 FDI。`);
  };

  const prepareRecovery = () => {
    if (pendingDelta !== 0) return;
    setRecoveryReady(true);
    setNotice("演示条件已设为满足：静默窗口已达到默认值，且无活动危机、强敌对压力或其他普通变化。实际周期仍需正式结算。 ");
  };

  const settle = () => {
    if (pendingDelta !== 0) {
      const nextValue = clamp(settledValue + pendingDelta);
      setSettledValue(nextValue);
      setPendingDelta(0);
      setRecoveryReady(false);
      setNotice(`正式周期结算演示：${settledValue} ${formatDelta(nextValue - settledValue)} = ${nextValue}。`);
      return;
    }
    if (recoveryReady) {
      const configuredDelta = fdiDemoFacts.recovery.deltas[currentBand];
      const nextValue = clamp(settledValue + configuredDelta);
      setSettledValue(nextValue);
      setRecoveryReady(false);
      setNotice(configuredDelta === 0
        ? `当前为低档，默认恢复变化是 0；结算后仍为 ${nextValue}。`
        : `恢复条件满足后进入正式周期结算：${settledValue} ${formatDelta(configuredDelta)} = ${nextValue}。`);
      return;
    }
    setNotice("没有待结算变化，也没有满足恢复条件的演示状态；本次周期结算不改变 FDI。 ");
  };

  const reset = () => {
    setSettledValue(fdiDemoFacts.startingValue);
    setPendingDelta(0);
    setRecoveryReady(false);
    setNotice("演示已重置。等待记录变化。");
  };

  return <div className="fdi-history">
    <div className="fdi-intro-row">
      <div><strong>FDI = 设施当前累计混乱程度</strong><p>它记录一段时间内设施秩序的变化，不等同于 D-LRC 响应等级或危机数量。</p></div>
      <span className="fdi-range-label mono">0–100</span>
    </div>

    <div className="fdi-demo" aria-label="FDI 周期结算机制演示">
      <div className="fdi-demo-heading"><span className="mono">FDI 周期结算 · 机制演示</span><span>{fdiDemoFacts.disclaimer}</span></div>
      <div className="fdi-ledger" aria-live="polite" aria-atomic="true">
        <div className="fdi-ledger-settled"><span>已结算 FDI</span><strong key={settledValue} className="fdi-value-number">{settledValue}<small> / 100</small></strong><span className="fdi-band-current">{currentBand} · {bandLabel[currentBand]}</span></div>
        <div className="fdi-ledger-equation" aria-hidden="true">+</div>
        <div className="fdi-ledger-pending"><span>待结算变化</span><strong>{formatDelta(pendingDelta)}</strong><span>{recoveryReady ? "恢复条件已模拟满足" : "尚未计入已结算值"}</span></div>
      </div>

      <div className="fdi-band-scale" aria-label="FDI 档位：0 至 29 为低，30 至 59 为中，60 至 100 为高">
        <div className="fdi-band-track"><span className="fdi-band-low" /><span className="fdi-band-medium" /><span className="fdi-band-high" /><i className="fdi-band-marker" style={{ left: `${settledValue}%` }} aria-hidden="true" /></div>
        <div className="fdi-band-labels"><span>0–29 · LOW<small>低</small></span><span>30–59 · MEDIUM<small>中</small></span><span>60–100 · HIGH<small>高</small></span></div>
      </div>

      <div className="fdi-demo-actions">
        <button type="button" data-action="fdi-record-incident" onClick={recordIncident}>记录一次基金会成员被 SCP 击杀（{formatDelta(fdiDemoFacts.incident.delta)}）</button>
        <button type="button" data-action="fdi-recovery" disabled={pendingDelta !== 0} onClick={prepareRecovery}>模拟恢复条件满足</button>
        <button type="button" className="fdi-settle-button" data-action="fdi-settle" onClick={settle}>推进一次正式周期结算</button>
        <button type="button" data-action="fdi-reset" onClick={reset}>重置演示</button>
      </div>
      <p className="fdi-demo-notice" role="status" aria-live="polite">{notice}</p>
      <p className="fdi-demo-config">{fdiDemoFacts.incident.configNote} 恢复默认静默窗口 {fdiDemoFacts.recovery.quietWindowSeconds} 秒；服务器配置可以调整。</p>
    </div>

    <div className="fdi-band-explanation">
      <h4>档位与恢复条件</h4>
      <div className="fdi-band-labels-copy"><span>0–29 · 低</span><span>30–59 · 中</span><span>60–100 · 高</span></div>
      <p><b>哪些情况会升高：</b>{fdiMechanismFacts.increase}</p>
      <p><b>哪些情况会下降：</b>{fdiMechanismFacts.decrease}</p>
      <p><b>恢复不是定时自动扣分。</b>{fdiDemoFacts.recovery.timing}</p>
      <ul className="fdi-recovery-gates">{fdiDemoFacts.recovery.gates.map((gate) => <li key={gate}>{gate}</li>)}</ul>
    </div>

    <div className="fdi-settlement-trace">
      <article><span className="mono">首次正式结算</span><strong>约 06:31</strong><p>与第一次正式局势评估同时进行。</p></article>
      <span className="fdi-trace-arrow" aria-hidden="true">→</span>
      <article><span className="mono">之后</span><strong>PERIODIC 周期</strong><p>累计上次结算后的变化，并检查是否满足恢复条件。</p></article>
    </div>

    <p className="fdi-settlement-guards"><b>正式结算边界：</b>{fdiMechanismFacts.timing}</p>
    <p className="fdi-relation"><b>FDI 会影响什么：</b>只临时影响 Event Director 对普通支援来源的权重，不决定专业危机响应。</p>
  </div>;
}
