import { useState } from "react";
import { dlrcMechanismFacts } from "../../data/mechanisms";

const codeParts = [
  { id: "prefix", value: "DLRC", label: "系统名", detail: "Dynamic Lockdown Response Code。" },
  { id: "population", value: "A", label: "Population Tier", detail: "A 档，对应 38–45 人。" },
  { id: "level", value: "4", label: "Final Response Level", detail: "最终响应等级为 L4。" },
  { id: "crisis", value: "BIO", label: "Crisis Tag", detail: "当前示例中的 BIO tag。" },
];

export function DlrcSection() {
  const [activePart, setActivePart] = useState("level");
  const selectedPart = codeParts.find((part) => part.id === activePart) || codeParts[2];

  return <div className="dlrc-spotlight">
    <div className="dlrc-code-stage">
      <span className="dlrc-code-kicker mono">SYSTEM OUTPUT · 示例</span>
      <div className="dlrc-code-display" aria-label="D-LRC 输出示例 DLRC-A4-BIO">
        <span className="dlrc-code-prefix mono">DLRC-</span>
        {codeParts.slice(1).map((part, index) => <span key={part.id}>
          <button type="button" className={"dlrc-code-token " + part.id + (activePart === part.id ? " is-active" : "")} onClick={() => setActivePart(part.id)} onFocus={() => setActivePart(part.id)} aria-pressed={activePart === part.id} aria-label={part.label + " " + part.value}>{part.value}</button>
          {index === 1 && <span className="dlrc-code-separator">-</span>}
        </span>)}
      </div>
      <div className="dlrc-code-caption"><span className="mono">{selectedPart.label}</span><p>{selectedPart.detail}</p></div>
      <div className="dlrc-code-transition mono" aria-label="代码状态变化"><span>DLRC-A3</span><i aria-hidden="true">→</i><strong>DLRC-A4-BIO</strong></div>
    </div>

    <div className="dlrc-inputs">
      <span className="mono">FIVE CORE INPUTS</span>
      <div>{dlrcMechanismFacts.inputs.map((input) => <span key={input}>{input}</span>)}</div>
      <p>Foundation Reinforcement Failure 只使用 Foundation / MTF Primary Wave。Chaos Wave 不建立 Foundation 失败基线。</p>
    </div>

    <div className="dlrc-score-pipeline" aria-label="D-LRC 分数处理流程">
      <div className="dlrc-score-source"><span className="mono">SCORE</span><strong>Natural</strong><i>+</i><strong>Persistent</strong></div>
      {dlrcMechanismFacts.stages.map(([stage, label], index) => <div className="dlrc-pipeline-stage" key={stage}>
        <span className="mono">{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong><small>{label}</small>
      </div>)}
      <div className="dlrc-pipeline-stage dlrc-code-output"><span className="mono">CODE</span><strong>{dlrcMechanismFacts.code.full}</strong><small>Invalid Evaluation 下游不得消费。</small></div>
    </div>
    <div className="dlrc-result-contract">
      <span className="mono">EVALUATION RESULT CONTRACT</span>
      <div>{dlrcMechanismFacts.resultFields.map((field) => <code key={field}>{field}</code>)}</div>
      <p>IsValid = false 时，任何下游模块都不得消费该 Evaluation。</p>
    </div>

    <div className="dlrc-detail-grid">
      <article><span className="mono">EVALUATION SCHEDULE</span>{dlrcMechanismFacts.schedule.map((item) => <p key={item}>{item}</p>)}</article>
      <article className="threshold-table-block">
        <div className="threshold-table-heading"><span className="mono">CURRENT DEFAULTS</span><strong>BALANCE VALIDATION PENDING</strong></div>
        <div className="threshold-mini-scroll"><table>
          <thead><tr><th scope="col">Tier</th>{["L0", "L1", "L2", "L3", "L4", "L5"].map((level) => <th scope="col" key={level}>{level}</th>)}</tr></thead>
          <tbody>{dlrcMechanismFacts.thresholds.map((row) => <tr key={row[0]}>{row.map((value, index) => index === 0 ? <th scope="row" key={index}>{value}</th> : <td key={index}>{value}</td>)}</tr>)}</tbody>
        </table></div>
      </article>
    </div>
    <p className="source-line mono">{dlrcMechanismFacts.source}</p>
    <a className="text-link" href="dlrc.html">打开完整 D-LRC 页面 →</a>
  </div>;
}
