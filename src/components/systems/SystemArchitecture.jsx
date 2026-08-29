function Node({ item }) { return <article className="architecture-node"><div className="system-mark mono">{item.code}</div><strong>{item.title}</strong><span>{item.description}</span><small className="architecture-node-status mono">{item.status}</small></article>; }

export function SystemArchitecture({ groups }) {
  return <div className="architecture-map" aria-label="系统关系图"><div className="architecture-column">{groups.input.map((item) => <Node key={item.title} item={item} />)}</div><div className="architecture-link" aria-hidden="true" /><article className="architecture-center"><div className="system-mark mono">M03 + M06 / DECISION CORE</div><h3>D-LRC<br />Event Director</h3><p>综合当前响应等级、危机标签、人口档位与事件资格，决定哪些内容可以进入候选。</p><div className="architecture-center-status mono">D-LRC · PAGE COMING SOON<br />EVENT DIRECTOR · FRAMEWORK READY</div></article><div className="architecture-link" aria-hidden="true" /><div className="architecture-column">{groups.output.map((item) => <Node key={item.title} item={item} />)}</div></div>;
}

