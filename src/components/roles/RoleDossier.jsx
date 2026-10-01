function FactList({ title, values, className = "" }) {
  if (!values?.length) return null;
  return <div className={`role-fact-group ${className}`}>
    <h4>{title}</h4>
    <ul>{values.map((value, index) => <li key={`${title}-${index}`}>{value}</li>)}</ul>
  </div>;
}

function NoteList({ notes }) {
  if (!notes?.length) return null;
  return <div className="role-notes">
    {notes.map((note, index) => <div className="role-note" key={`${note.status}-${index}`}>
      <span className="role-status mono">{note.status}</span>
      <p>{note.text}</p>
    </div>)}
  </div>;
}

export function RoleDossier({ dossier, id }) {
  return <details className="role-dossier" id={id}>
    <summary>
      <span className="role-dossier-main">
        <span className="role-dossier-type mono">{dossier.roleType}</span>
        <strong>{dossier.name}</strong>
      </span>
      <span className="role-dossier-meta">
        <span>{dossier.baseRole}</span>
        <span>{dossier.faction}</span>
        <b>{dossier.health}</b>
      </span>
      <span className="role-dossier-toggle mono" aria-hidden="true">+</span>
    </summary>
    <div className="role-dossier-content">
      <div className="role-badge-row">
        <span className="mono">BADGE / {dossier.badge.visibility}</span>
        <span>{dossier.badge.overhead}</span>
        <span>{dossier.badge.playerList}</span>
      </div>
      <div className="role-facts-grid">
        <FactList title="被动能力" values={dossier.passives} />
        <div className="role-fact-group">
          <h4>主动技能</h4>
          {dossier.actives.length ? <ul>{dossier.actives.map((active) => <li key={`${active.slot}-${active.name}`}><b>{active.slot} · {active.name}</b><span>{active.detail}</span></li>)}</ul> : <p className="role-empty">当前没有主动技能。</p>}
        </div>
      </div>
      <FactList title="分配与运行规则" values={dossier.mechanics} className="role-mechanics" />
      <NoteList notes={dossier.notes} />
    </div>
  </details>;
}
