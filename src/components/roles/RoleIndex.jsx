export function RoleIndex({ dossiers, label = "本组角色索引" }) {
  return <nav className="role-index" aria-label={label}>
    {dossiers.map((dossier, index) => <a href={`#${dossier.id}`} key={dossier.id}>
      <span className="role-index-number mono">{String(index + 1).padStart(2, "0")}</span>
      <span>{dossier.name}</span>
      <span className="role-index-arrow" aria-hidden="true">↘</span>
    </a>)}
  </nav>;
}
