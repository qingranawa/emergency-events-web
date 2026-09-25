import { eventPackFacts } from "../../data/mechanisms";

export function EventPackSection() {
  return <div className="event-pack-boundary"><div className="event-pack-side director-side"><span className="mono">事件筛选器</span><strong>选择与调度</strong><p>检查资格、安排人数、生成候选，并管理开始前复核和回滚。</p></div><div className="event-pack-interface"><span className="mono">未来需要接上的内容</span><div>{["事件编号 / 来源", "资格条件", "人数计划", "角色 / 出生 / 装备", "运行时接入"].map((item) => <b key={item}>{item}</b>)}</div></div><div className="event-pack-side pack-side"><span className="mono">事件内容包</span><strong>内容与执行</strong><p>未来负责角色、装备、出生点、事件执行、专属清理和失败回滚。</p></div><div className="event-pack-status"><b>当前边界</b><span>{eventPackFacts.status}</span><small className="mono">{eventPackFacts.source}</small></div></div>;
}
