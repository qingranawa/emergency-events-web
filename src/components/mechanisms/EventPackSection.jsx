import { eventPackFacts } from "../../data/mechanisms";

export function EventPackSection() {
  return <div className="event-pack-boundary">
    <div className="event-pack-title-row">
      <p><b>Event Director：</b>决定当前适合安排什么事件。</p>
      <p><b>事件内容包：</b>决定事件真正怎么玩。</p>
      <span className="status-tag">开发中</span>
    </div>
    <ul className="event-pack-responsibilities">
      {eventPackFacts.responsibilities.map((item) => <li key={item}>{item}</li>)}
    </ul>
    <p className="event-pack-status">{eventPackFacts.statusText} 目前的接口或测试示例不代表完整事件玩法已经完成。</p>
  </div>;
}
