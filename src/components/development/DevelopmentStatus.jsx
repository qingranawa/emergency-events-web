export function DevelopmentStatus({ rows }) { return <div className="status-table">{rows.map(([title, description, state, kind]) => <div className="status-row" key={title}><strong>{title}</strong><span>{description}</span><span className={`state ${kind} mono`}>{state}</span></div>)}</div>; }

