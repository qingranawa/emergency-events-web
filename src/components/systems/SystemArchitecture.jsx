function Node({ item }) { return <article className="architecture-node"><div className="system-mark mono">{item.code}</div><strong>{item.title}</strong><span>{item.description}</span><small className="architecture-node-status mono">{item.status}</small></article>; }

export function SystemArchitecture({ groups }) {
  return <div className="architecture-map" aria-label="系统关系图"><div className="architecture-column">{groups.input.map((item) => <Node key={item.title} item={item} />)}</div><div className="architecture-link" aria-hidden="true" /><article className="architecture-center"><div className="system-mark mono">响应判断 + 事件筛选</div><h3>当前局势<br />下一步候选</h3><p>读取响应等级、危机、人数档位和事件条件，再决定哪些内容可以进入候选。</p><div className="architecture-center-status mono">响应判断 · 已接入<br />事件筛选 · 框架已完成</div></article><div className="architecture-link" aria-hidden="true" /><div className="architecture-column">{groups.output.map((item) => <Node key={item.title} item={item} />)}</div></div>;
}
