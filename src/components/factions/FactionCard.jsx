export function FactionCard({ faction }) {
  return <article className="system-card"><div className="system-mark mono">{faction.id} / {faction.code}</div><h3>{faction.title}</h3><p>{faction.description}</p><div className="system-status mono">{faction.status}</div></article>;
}

