import { dlrcResponseLevels, dlrcThresholds, dlrcPopulationProfiles, responseScoreInputs, controlStates } from "../../data/dlrcPage";

export function CodeAnatomy() {
  return <div className="code-anatomy"><div className="anatomy-code" aria-label="DLRC-A4-BIO 代码拆解"><span>DLRC</span><i>-</i><b>A</b><i>4</i><em>-</em><strong>BIO</strong></div><div className="anatomy-grid"><div><span className="mono">前缀</span><b>DLRC</b><p>正式响应代码使用 DLRC，不写成 D-LRC-A4-BIO。</p></div><div><span className="mono">人口档位</span><b>A</b><p>回合开始锁定的 Population Profile，决定编制和阈值组。</p></div><div><span className="mono">响应等级</span><b>4</b><p>当前 Response Level，取值范围为 0–5。</p></div><div><span className="mono">危机标签</span><b>BIO</b><p>同一次评估中的 Crisis 标签，也可以组合成 BIO+SYS。</p></div></div></div>;
}

export function PopulationScale() {
  return <div className="population-scale"><div className="population-axis" aria-hidden="true"><span>16</span><span>20</span><span>26</span><span>32</span><span>38</span><span>45</span></div><div className="population-track">{dlrcPopulationProfiles.map((profile) => <div className="population-segment" key={profile.code}><div className="population-segment-bar"><b>{profile.code}</b><span>{profile.min}–{profile.max}</span></div><small>{profile.label}</small><small>Primary Wave cap：{profile.cap}</small></div>)}</div><p className="section-note">Population Profile 只调整规模、编制和人数上限，各档位共用同一套 Event Definition。</p></div>;
}

export function ResponseLadder() {
  return <div className="response-ladder"><div className="level-steps">{dlrcResponseLevels.map(({ level, label, detail }) => <div className={`level-step level-${level}`} key={level}><span className="mono">L{level}</span><strong>{label}</strong><small>{detail}</small></div>)}</div><ThresholdMatrix /></div>;
}

export function ThresholdMatrix() {
  return <div className="threshold-wrap"><div className="threshold-heading"><span className="mono">阈值表 / SCORE ≥</span><span>每个 Population Profile 使用自己的 Level 门槛。</span></div><div className="threshold-scroll"><table className="threshold-matrix"><thead><tr><th>档位</th>{dlrcResponseLevels.map(({ level }) => <th key={level}>L{level}</th>)}</tr></thead><tbody>{Object.entries(dlrcThresholds).map(([profile, values]) => <tr key={profile}><th>{profile}</th>{values.map((value, index) => <td key={`${profile}-${index}`}>{value}</td>)}</tr>)}</tbody></table></div></div>;
}

export function ScoreFlow() {
  return <div className="score-flow"><div className="score-flow-column"><span className="flow-node-label mono">回合数据</span>{responseScoreInputs.map((input) => <div className="score-input" key={input.label}><b>{input.label}</b><p>{input.detail}</p></div>)}</div><div className="score-flow-arrow" aria-hidden="true">→</div><div className="score-result"><span className="flow-node-label mono">RESPONSE SCORE</span><strong>0—100</strong><p>各项分数先合成 NaturalResponseScore，再加上 PersistentAdjustment，最后限制在 0–100。</p><div className="score-flow-arrow down" aria-hidden="true">↓</div><span className="flow-node-label mono">等级阈值</span><strong>0—5</strong></div></div>;
}

export function ControlStatePanel() {
  return <div className="control-panel"><div className="control-axis"><span className="mono">CONTROL ASSESSMENT</span><b>ControlState 会限制最终响应等级。</b><p>它读取威胁趋势、基金会强度、波次表现和战场动量，计算 Control Level Cap。</p></div><div className="control-state-list">{controlStates.map((state) => <div key={state.key}><span className="mono">{state.key}</span><b>CAP L{state.cap}</b><p>{state.detail}</p></div>)}</div></div>;
}
