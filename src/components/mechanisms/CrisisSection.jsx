import { crisisFacts } from "../../data/mechanisms";

const crisisLabels = { BIO: "生化", SYS: "系统控制", CON: "收容", SEC: "安全", GOI: "外部组织", WAR: "核设施", END: "终局状态" };

export function CrisisSection() {
  return <div className="crisis-console" data-scroll-reveal data-motion="console">
    <div className="crisis-console-head"><span className="mono">危机识别</span><span className="mono">状态 / 发生或未发生</span></div>
    <div className="crisis-detector-flow"><span>同一份回合记录</span><i aria-hidden="true">→</i><strong>危机判断器</strong><i aria-hidden="true">→</i><span>当前危机 + 危机编号</span></div>
    <div className="crisis-accordion" aria-label="危机详情">{crisisFacts.map(([code, trigger], index) => <details className="mechanism-disclosure" key={code} open={index === 0}><summary><span className="crisis-detector-dot" aria-hidden="true" /><span className="mono">{code}</span><strong>{crisisLabels[code]}</strong><small className="mono">当前状态</small><span className="crisis-disclosure-hint" aria-hidden="true">&gt;</span></summary><div><p>{trigger}</p><span className="mono">状态怎么变化</span><p>危机从未发生变成发生时，会创建新的危机编号；持续发生时保持原编号；解除后结束这次危机，下次再发生会重新编号。</p></div></details>)}</div>
    <p className="section-note crisis-note"><span className="crisis-note-label mono">请这样理解</span><span>危机没有自己的 L3/L4 等级；页面里的 L4 只表示整体响应等级。</span></p>
  </div>;
}
