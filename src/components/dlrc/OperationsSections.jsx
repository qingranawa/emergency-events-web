import { useState } from "react";
import { roundExample, operatorCommands, architectureStatus, designPrinciples } from "../../data/dlrcPage";

export function RoundExample() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = roundExample[activeIndex];
  return <div className="round-example"><div className="round-example-steps">{roundExample.map((item, index) => <button className={activeIndex === index ? "is-active" : ""} type="button" key={item.label} onClick={() => setActiveIndex(index)}><span className="mono">0{index + 1}</span><b>{item.label}</b></button>)}</div><div className="round-example-detail"><span className="mono">模拟示例 / SIMULATED</span><h3>{active.code}</h3><p>{active.facts}</p><strong>{active.result}</strong></div></div>;
}

export function OperatorCommands() {
  return <div className="command-interface"><div className="command-terminal"><span className="mono">服主查询 / ee</span><b className="command-demo-label mono">模拟输出 / 不是实时数据</b><code>ee dlrc evaluate</code><code>人数档位：B · 响应等级：L3</code><code>局面状态：受控 · 危机：BIO</code><code>代码：DLRC-B3-BIO</code></div><div className="command-list">{operatorCommands.map(([command, purpose, status]) => <div key={command}><code>{command}</code><span>{purpose}</span><b className="mono">{status}</b></div>)}</div></div>;
}

export function TelemetryPanel() {
  return <div className="telemetry-panel"><div className="telemetry-lead"><span className="mono">运行记录</span><h3>系统为什么这样判断</h3><p>运行记录只负责保存结果，不会重新计算状态，也不会改变回合。服主和开发者可以用它回看响应、危机、增援和设施记录。</p></div><div className="telemetry-events">{["DLRC_EVALUATION", "PRIMARY_WAVE", "CRISIS_TRANSITION", "FDI_SETTLEMENT", "ROUND_BALANCE_SUMMARY"].map((event) => <span className="mono" key={event}>{event}</span>)}<small>只记录回合内安全编号，不记录 SteamId、IP、Nickname</small></div></div>;
}

export function ArchitectureStatus() {
  return <div className="architecture-status"><div className="status-table" role="table" aria-label="当前实现状态"><div className="status-row status-head" role="row"><span>模块</span><span>状态</span><span>说明</span></div>{architectureStatus.map(([index, module, status, detail]) => <div className="status-row" role="row" key={`${index}-${module}`}><span><i className="mono">{index}</i>{module}</span><b className="mono">{status}</b><small>{detail}</small></div>)}</div></div>;
}

export function PrinciplesWall() {
  return <div className="principles-wall">{designPrinciples.map((principle, index) => <span className={`principle principle-${index + 1}`} key={principle}>{principle}</span>)}</div>;
}
