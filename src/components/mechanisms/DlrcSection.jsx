import { dlrcMechanismFacts } from "../../data/mechanisms";

export function DlrcSection() {
  return <div className="dlrc-spotlight">
    <div className="dlrc-code-stage">
      <span className="mono">响应代码示例</span>
      <strong className="dlrc-code-display">{dlrcMechanismFacts.code.full}</strong>
      <div className="dlrc-code-breakdown">
        <p><b>C</b><span>人数档位：26–31 人</span></p>
        <p><b>4</b><span>最终响应等级：L4</span></p>
        <p><b>BIO</b><span>当前生物危机标签</span></p>
      </div>
    </div>

    <div className="dlrc-inputs">
      <h3>五类局势输入</h3>
      <ul>{dlrcMechanismFacts.inputs.map((input) => <li key={input}>{input}</li>)}</ul>
      <p>基金会增援失败只根据基金会（MTF）主要增援判断。混沌分裂者（Chaos）增援不会建立基金会增援失败基准。</p>
    </div>

    <ol className="dlrc-score-pipeline" aria-label="D-LRC 响应等级的计算步骤">
      {dlrcMechanismFacts.stages.map(([stage, detail], index) => <li className="dlrc-pipeline-stage" key={stage}>
        <span className="mono">{String(index + 1).padStart(2, "0")}</span>
        <div><strong>{stage}</strong><p>{detail}</p></div>
      </li>)}
      <li className="dlrc-pipeline-stage dlrc-code-output">
        <span className="mono">05</span>
        <div><strong>生成 D-LRC 代码</strong><p>例如 {dlrcMechanismFacts.code.full}。无效评估不会交给后续机制使用。</p></div>
      </li>
    </ol>

    <div className="dlrc-detail-grid">
      <div className="dlrc-timing">
        <h3>评估频率</h3>
        {dlrcMechanismFacts.schedule.map((item) => <p key={item}>{item}</p>)}
      </div>
      <section className="threshold-table-block">
        <div className="threshold-table-heading">
          <div><h3>当前响应阈值</h3><p>不同人数档位使用不同的分数门槛。</p></div>
          <span>当前默认值 · 平衡验证待完成</span>
        </div>
        <div className="threshold-mini-scroll">
          <table>
            <thead><tr><th scope="col">人数档位</th>{["L0", "L1", "L2", "L3", "L4", "L5"].map((level) => <th scope="col" key={level}>{level}</th>)}</tr></thead>
            <tbody>{dlrcMechanismFacts.thresholds.map((row) => <tr key={row[0]}>{row.map((value, index) => index === 0 ? <th scope="row" key={index}>{value} 档</th> : <td key={index}>{value}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>
    </div>
    <a className="text-link" href="dlrc.html">查看 D-LRC 的详细计算说明 →</a>
  </div>;
}
