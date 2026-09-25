import { dlrcResponseLevels, dlrcThresholds, dlrcPopulationProfiles, responseScoreInputs, controlStates } from "../../data/dlrcPage";

export function CodeAnatomy() {
  return <div className="code-anatomy"><div className="anatomy-code" aria-label="DLRC-A4-BIO 代码拆解"><span>DLRC</span><i>-</i><b>A</b><i>4</i><em>-</em><strong>BIO</strong></div><div className="anatomy-grid"><div><span className="mono">代码前缀</span><b>DLRC</b><p>这是 Emergency Events 的状态代码前缀，完整代码示例是 DLRC-A4-BIO。</p></div><div><span className="mono">人数档位</span><b>A</b><p>表示开局锁定的是 38–45 人档位。</p></div><div><span className="mono">响应等级</span><b>4</b><p>表示当前响应等级为 L4，不代表危机等级。</p></div><div><span className="mono">当前危机</span><b>BIO</b><p>表示 BIO 条件正在成立，也可以同时出现多个标签。</p></div></div></div>;
}

export function PopulationScale() {
  return <div className="population-scale"><div className="population-axis" aria-hidden="true"><span>16</span><span>20</span><span>26</span><span>32</span><span>38</span><span>45</span></div><div className="population-track">{dlrcPopulationProfiles.map((profile) => <div className="population-segment" key={profile.code}><div className="population-segment-bar"><b>{profile.code}</b><span>{profile.min}–{profile.max}</span></div><small>{profile.label}</small><small>原版大波次上限：{profile.cap}</small></div>)}</div><p className="section-note">人数档位只调整规模、编制和人数上限；所有档位共用同一套事件规则。</p></div>;
}

export function ResponseLadder() {
  return <div className="response-ladder"><div className="level-steps">{dlrcResponseLevels.map(({ level, label, detail }) => <div className={`level-step level-${level}`} key={level}><span className="mono">L{level}</span><strong>{label}</strong><small>{detail}</small></div>)}</div><ThresholdMatrix /></div>;
}

export function ThresholdMatrix() {
  return <div className="threshold-wrap"><div className="threshold-heading"><span className="mono">分数门槛 / SCORE ≥</span><span>不同人数档位使用不同的响应门槛。</span></div><div className="threshold-scroll"><table className="threshold-matrix"><thead><tr><th>档位</th>{dlrcResponseLevels.map(({ level }) => <th key={level}>L{level}</th>)}</tr></thead><tbody>{Object.entries(dlrcThresholds).map(([profile, values]) => <tr key={profile}><th>{profile}</th>{values.map((value, index) => <td key={`${profile}-${index}`}>{value}</td>)}</tr>)}</tbody></table></div></div>;
}

export function ScoreFlow() {
  return <div className="score-flow"><div className="score-flow-column"><span className="flow-node-label mono">回合数据</span>{responseScoreInputs.map((input) => <div className="score-input" key={input.label}><b>{input.label}</b><p>{input.detail}</p></div>)}</div><div className="score-flow-arrow" aria-hidden="true">→</div><div className="score-result"><span className="flow-node-label mono">响应分数</span><strong>0—100</strong><p>系统先把各项局势分数合起来，再叠加历史调整，最后限制在 0–100。</p><div className="score-flow-arrow down" aria-hidden="true">↓</div><span className="flow-node-label mono">响应等级</span><strong>0—5</strong></div></div>;
}

export function ControlStatePanel() {
  return <div className="control-panel"><div className="control-axis"><span className="mono">局面控制</span><b>它会给最终响应等级设上限。</b><p>系统会看威胁趋势、基金会强度、波次表现和战场动量，避免单个信号把结果推得过高。</p></div><div className="control-state-list">{controlStates.map((state) => <div key={state.key}><span className="mono">{state.key}</span><b>最高 L{state.cap}</b><p>{state.detail}</p></div>)}</div></div>;
}
