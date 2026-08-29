export function MechanismsNav({ sections }) {
  return <nav className="mechanisms-nav" aria-label="机制页章节导航"><div className="container mechanisms-nav-track">{sections.map(({ id, label }) => <a className="mono" href={`#${id}`} key={id}>{label}</a>)}</div></nav>;
}
