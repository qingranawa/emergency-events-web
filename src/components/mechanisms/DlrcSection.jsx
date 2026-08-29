import { useState } from "react";
import { dlrcMechanismFacts } from "../../data/mechanisms";

const codeParts = [
  { id: "population", value: "A", label: "POPULATION", detail: "PopulationTier：A，人数范围 38–45。" },
  { id: "level", value: "4", label: "RESPONSE LEVEL", detail: "FinalLevel：4，已经应用 ControlLevelCap。" },
  { id: "crisis", value: "BIO", label: "CRISIS", detail: "当前示例带有 BIO Crisis 标签。" },
];

export function DlrcSection() {
  const [activePart, setActivePart] = useState("level");
  const selectedPart = codeParts.find((part) => part.id === activePart) || codeParts[1];

  return <div className="dlrc-spotlight" data-scroll-reveal>
    <div className="dlrc-code-stage">
      <span className="dlrc-code-kicker mono">FORMAT EXAMPLE · SCHEMATIC</span>
      <div className="dlrc-code-display" aria-label="D-LRC 代码示例">
        <span className="dlrc-code-prefix mono">DLRC-</span>
        {codeParts.map((part, index) => <span key={part.id}><button type="button" className={`dlrc-code-token ${part.id} ${activePart === part.id ? "is-active" : ""}`} onClick={() => setActivePart(part.id)} onFocus={() => setActivePart(part.id)} aria-pressed={activePart === part.id} aria-label={`${part.label} ${part.value}`}>{part.value}</button>{index < codeParts.length - 1 && <span className="dlrc-code-separator">{index === 0 ? "" : "-"}</span>}</span>)}
      </div>
      <div className="dlrc-code-caption"><span className="mono">{selectedPart.label}</span><p>{selectedPart.detail}</p></div>
      <div className="dlrc-code-transition mono" aria-label="代码状态变化"><span>DLRC-A3</span><i aria-hidden="true">→</i><strong>DLRC-A4-BIO</strong></div>
    </div>
    <div className="dlrc-explanation-grid">
      <div className="dlrc-explanation-block"><span className="mono">RESPONSE SCORE</span><strong>0–100</strong><p>{dlrcMechanismFacts.formula}</p></div>
      <div className="dlrc-explanation-block"><span className="mono">CONTROL STATE</span><strong>L0–L5</strong><p>{dlrcMechanismFacts.level}</p></div>
      <div className="dlrc-explanation-block"><span className="mono">EVALUATION TRIGGER</span>{dlrcMechanismFacts.schedule.map((item) => <p key={item}>{item}</p>)}</div>
    </div>
    <div className="threshold-mini dlrc-thresholds"><span className="mono">THRESHOLD MATRIX · SCORE ≥</span><div className="threshold-mini-scroll"><table><thead><tr><th>档位</th>{dlrcMechanismFacts.thresholds.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{dlrcMechanismFacts.thresholds.rows.map((row) => <tr key={row[0]}>{row.map((value, index) => index === 0 ? <th key={`${row[0]}-${index}`}>{value}</th> : <td key={`${row[0]}-${index}`}>{value}</td>)}</tr>)}</tbody></table></div></div>
    <p className="source-line mono">{dlrcMechanismFacts.source}</p>
    <a className="text-link" href="dlrc.html">查看完整 D-LRC 页面 →</a>
  </div>;
}
