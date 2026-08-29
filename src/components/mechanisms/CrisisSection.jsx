import { crisisFacts } from "../../data/mechanisms";

const crisisLabels = { BIO: "生化", SYS: "系统控制", CON: "收容", SEC: "安全", GOI: "外部组织", WAR: "核设施", END: "终局状态" };

export function CrisisSection() {
  return <div className="crisis-console" data-scroll-reveal data-motion="console">
    <div className="crisis-console-head"><span className="mono">CRISIS DETECTOR CONSOLE</span><span className="mono">STATE / ACTIVE OR INACTIVE</span></div>
    <div className="crisis-detector-flow"><span>RoundSnapshot</span><i aria-hidden="true">→</i><strong>CrisisManager</strong><i aria-hidden="true">→</i><span>ActiveTags + EpisodeIds</span></div>
    <div className="crisis-accordion" aria-label="Crisis Detector 详情">{crisisFacts.map(([code, trigger], index) => <details className="mechanism-disclosure" key={code} open={index === 0}><summary><span className="crisis-detector-dot" aria-hidden="true" /><span className="mono">{code}</span><strong>{crisisLabels[code]}</strong><small className="mono">ACTIVE / INACTIVE</small></summary><div><p>{trigger}</p><span className="mono">状态关系</span><p>Inactive → Active 创建新的 EpisodeId；Active → Active 保持当前 Episode；Active → Inactive 结束 Episode，再次激活会创建新的 Episode。</p></div></details>)}</div>
    <p className="section-note">Crisis 没有独立 Severity 轴，L4 只表示 EventResponseLevel，不表示某类危机的等级。</p>
  </div>;
}
