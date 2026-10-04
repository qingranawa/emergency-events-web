import { useState } from "react";
import { crisisFacts, dlrcMechanismFacts, populationProfiles } from "../../data/mechanisms";

export function DlrcSection() {
  const [selectedPart, setSelectedPart] = useState("population");
  const code = dlrcMechanismFacts.code;
  const bio = crisisFacts.find(({ tag }) => tag === code.crisis);
  const populationRange = populationProfiles.find(({ tier }) => tier === code.population)?.range;
  const responseLevel = Number(code.level);
  const descriptions = {
    population: { title: `${code.population} · 人数档位`, detail: `${populationRange} 人；人数档位在开局锁定。` },
    level: { title: `${code.level} · 最终响应等级 L${code.level}`, detail: `局势最终响应等级为 L${code.level}；实际等级受当前控制状态限制。` },
    crisis: { title: "BIO · 生物危机", detail: `${bio?.rule} 该标签说明当前威胁类型。` },
  };
  const selectedMeaning = descriptions[selectedPart];

  return <div className="dlrc-spotlight">
    <div className="dlrc-code-stage">
      <span className="mono">响应代码示例 · 点击代码片段查看含义</span>
      <div className="dlrc-code-display" role="group" aria-label="DLRC-C4-BIO 代码解读">
        <span className="dlrc-code-prefix">{code.prefix}-</span>
        <button className={`dlrc-code-part ${selectedPart === "population" ? "is-selected" : ""}`} type="button" aria-label="查看人数档位 C" aria-pressed={selectedPart === "population"} onClick={() => setSelectedPart("population")}>{code.population}</button>
        <button className={`dlrc-code-part ${selectedPart === "level" ? "is-selected" : ""}`} type="button" aria-label="查看响应等级 4" aria-pressed={selectedPart === "level"} onClick={() => setSelectedPart("level")}>{code.level}</button>
        <span className="dlrc-code-separator">-</span>
        <button className={`dlrc-code-part ${selectedPart === "crisis" ? "is-selected" : ""}`} type="button" aria-label="查看危机标签 BIO" aria-pressed={selectedPart === "crisis"} onClick={() => setSelectedPart("crisis")}>{code.crisis}</button>
      </div>
      <div className="dlrc-code-meaning" aria-live="polite" aria-atomic="true">
        <strong>{selectedMeaning.title}</strong><p>{selectedMeaning.detail}</p>
      </div>
      <div className="dlrc-level-row" aria-label="响应等级 0 至 5，当前示例为 L4">
        <span>最终响应等级</span>
        <ol className="dlrc-level-ruler">
          {Array.from({ length: 6 }, (_, level) => <li className={level === responseLevel ? "is-current" : ""} aria-current={level === responseLevel ? "step" : undefined} key={level}>L{level}</li>)}
        </ol>
      </div>
    </div>

    <div className="dlrc-inputs">
      <h3>五类局势输入</h3>
      <ul>{dlrcMechanismFacts.inputs.map((input) => <li key={input}>{input}</li>)}</ul>
      <p>增援失败只根据基金会（MTF）主要增援判断。混沌分裂者（Chaos）增援不会建立基金会增援失败基准。</p>
    </div>

    <ol className="dlrc-score-pipeline" aria-label="D-LRC 从局势输入到响应代码的判断过程">
      {dlrcMechanismFacts.stages.map(([stage, detail], index) => <li className="dlrc-pipeline-stage" key={stage}>
        <span className="mono">{String(index + 1).padStart(2, "0")}</span>
        <div><strong>{stage}</strong><p>{detail}</p></div>
      </li>)}
      <li className="dlrc-pipeline-stage dlrc-code-output">
        <span className="mono">05</span>
        <div><strong>生成 D-LRC 代码</strong><p>例如 {code.full}。无效评估不会交给后续机制使用。</p></div>
      </li>
    </ol>

    <div className="dlrc-detail-grid">
      <div className="dlrc-timing">
        <h3>评估频率</h3>
        {dlrcMechanismFacts.schedule.map((item) => <p key={item}>{item}</p>)}
      </div>
      <details className="threshold-table-block">
        <summary>查看当前默认阈值</summary>
        <div className="threshold-table-content">
          <div className="threshold-table-heading">
            <div><h3>当前响应阈值</h3><p>不同人数档位使用不同的分数门槛。</p></div>
            <span>当前默认值 · 平衡验证待完成</span>
          </div>
          <div className="threshold-mini-scroll">
            <table className="threshold-mini">
              <thead><tr><th scope="col">人数档位</th>{["L0", "L1", "L2", "L3", "L4", "L5"].map((level) => <th scope="col" key={level}>{level}</th>)}</tr></thead>
              <tbody>{dlrcMechanismFacts.thresholds.map((row) => <tr key={row[0]}>{row.map((value, index) => index === 0 ? <th scope="row" key={index}>{value} 档</th> : <td key={index}>{value}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>
      </details>
    </div>
    <a className="text-link" href="dlrc.html">查看 D-LRC 的详细计算说明 →</a>
  </div>;
}
