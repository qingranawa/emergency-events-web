import { useSectionSpy } from "../../hooks/useSectionSpy";

export function MechanismsNav({ sections }) {
  const activeId = useSectionSpy(sections.map(({ id }) => id));
  return <nav className="mechanisms-nav" aria-label="机制页章节目录"><div className="container mechanisms-nav-track">{sections.map(({ id, label }) => <a className={id === activeId ? "is-current" : ""} href={`#${id}`} aria-current={id === activeId ? "location" : undefined} key={id}>{label}</a>)}</div></nav>;
}
