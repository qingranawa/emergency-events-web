import { eventPackFacts } from "../../data/mechanisms";

export function EventPackSection() {
  return <div className="event-pack-boundary">
    <div className="event-pack-title-row">
      <div><span className="mono">M05 SELECTS A PLAN</span><strong>Event Pack executes gameplay</strong></div>
      <span className="status-tag">IN DEVELOPMENT</span>
    </div>
    <div className="event-pack-responsibilities">
      {eventPackFacts.responsibilities.map((item, index) => <span key={item}><small className="mono">{String(index + 1).padStart(2, "0")}</small>{item}</span>)}
    </div>
    <div className="event-pack-status"><strong>{eventPackFacts.status}</strong><span>EventDefinition 接口和测试定义不等于已完成 production content。</span></div>
    <p className="source-line mono">{eventPackFacts.source}</p>
  </div>;
}
