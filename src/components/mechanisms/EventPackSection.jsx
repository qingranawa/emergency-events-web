import { eventPackFacts } from "../../data/mechanisms";

export function EventPackSection() {
  return <div className="event-pack-boundary"><div className="event-pack-side director-side"><span className="mono">EVENT DIRECTOR</span><strong>选择与调度</strong><p>输出资格结果、候选、来源、Population Plan、生命周期和提交边界。</p></div><div className="event-pack-interface"><span className="mono">INTERFACE</span><div>{["EventId / Provider", "Eligibility", "Population Plan", "Role / Spawn / Loadout", "Runtime hook"].map((item) => <b key={item}>{item}</b>)}</div></div><div className="event-pack-side pack-side"><span className="mono">EVENT PACK</span><strong>内容与执行</strong><p>负责角色、装备、出生点、事件执行、专属清理和失败回滚。</p></div><div className="event-pack-status"><b>当前边界</b><span>{eventPackFacts.status}</span><small className="mono">{eventPackFacts.source}</small></div></div>;
}
