import { useState } from "react";
import { dlrcMechanismFacts } from "../../data/mechanisms";

const codeParts = [
  { id: "population", value: "A", label: "人数档位", detail: "A 档，对应 38–45 人。" },
  { id: "level", value: "4", label: "响应等级", detail: "当前响应等级为 L4，已经考虑局面上限。" },
  { id: "crisis", value: "BIO", label: "危机状态", detail: "当前示例中，BIO 条件正在成立。" },
];

export function DlrcSection() {
  const [activePart, setActivePart] = useState("level");
  const selectedPart = codeParts.find((part) => part.id === activePart) || codeParts[1];

  return <div className="dlrc-spotlight" data-scroll-reveal data-motion="code">
    <div className="dlrc-code-stage">
      <span className="dlrc-code-kicker mono">代码示例 · 说明</span>
      <div className="dlrc-code-display" aria-label="D-LRC 代码示例">
        <span className="dlrc-code-prefix mono">DLRC-</span>
        {codeParts.map((part, index) => <span key={part.id}><button type="button" className={`dlrc-code-token ${part.id} ${activePart === part.id ? "is-active" : ""}`} onClick={() => setActivePart(part.id)} onFocus={() => setActivePart(part.id)} aria-pressed={activePart === part.id} aria-label={`${part.label} ${part.value}`}>{part.value}</button>{index < codeParts.length - 1 && <span className="dlrc-code-separator">{index === 0 ? "" : "-"}</span>}</span>)}
      </div>
      <div className="dlrc-code-caption"><span className="mono">{selectedPart.label}</span><p>{selectedPart.detail}</p></div>
      <div className="dlrc-code-transition mono" aria-label="代码状态变化"><span>DLRC-A3</span><i aria-hidden="true">→</i><strong>DLRC-A4-BIO</strong></div>
    </div>
      <div className="dlrc-explanation-grid">
      <div className="dlrc-explanation-block"><span className="mono">响应分数</span><strong>0–100</strong><p>多项局势数据合成响应分数，再进入等级判断。</p></div>
      <div className="dlrc-explanation-block"><span className="mono">局面上限</span><strong>L0–L5</strong><p>控制状态会限制最终响应等级。</p></div>
      <div className="dlrc-explanation-block"><span className="mono">什么时候更新</span>{dlrcMechanismFacts.schedule.map((item) => <p key={item}>{item}</p>)}</div>
    </div>
    <div className="threshold-mini dlrc-thresholds"><span className="mono">各档位的分数门槛</span><div className="threshold-mini-scroll"><table><thead><tr><th>档位</th>{dlrcMechanismFacts.thresholds.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{dlrcMechanismFacts.thresholds.rows.map((row) => <tr key={row[0]}>{row.map((value, index) => index === 0 ? <th key={`${row[0]}-${index}`}>{value}</th> : <td key={`${row[0]}-${index}`}>{value}</td>)}</tr>)}</tbody></table></div></div>
    <p className="source-line mono">{dlrcMechanismFacts.source}</p>
    <a className="text-link" href="dlrc.html">打开完整 D-LRC 页面 →</a>
  </div>;
}
