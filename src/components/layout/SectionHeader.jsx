export function SectionHeader({ kicker, title, description }) {
  return <div className="section-head"><div><div className="section-kicker mono">{kicker}</div><h2 className="section-title">{title}</h2></div><p className="section-desc">{description}</p></div>;
}

