import { useSectionSpy } from "../../hooks/useSectionSpy";

export function MechanismsNav({ groups }) {
  const items = groups.flatMap((group) => group.items);
  const sectionIds = items.map(({ id }) => id);
  const activeId = useSectionSpy(sectionIds);
  return <nav className="mechanisms-nav" aria-label="机制页主要章节">
    <span className="mechanisms-nav-title mono">本页章节</span>
    <div className="mechanisms-nav-links">
      {items.map(({ id, label }) => <a
        className={id === activeId ? "is-current" : ""}
        href={`#${id}`}
        aria-current={id === activeId ? "location" : undefined}
        key={id}
      >{label}</a>)}
    </div>
  </nav>;
}
