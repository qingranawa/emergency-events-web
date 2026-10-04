import { useSectionSpy } from "../../hooks/useSectionSpy";

export function MechanismsNav({ groups }) {
  const sectionIds = groups.flatMap((group) => group.items.map((item) => item.id));
  const activeId = useSectionSpy(sectionIds);
  return <nav className="mechanisms-nav" aria-label="Mechanism modules">
    {groups.map((group) => <div className="mechanisms-nav-group" key={group.label}>
      <span className="mechanisms-nav-group-label mono">{group.label}</span>
      <div className="mechanisms-nav-links">{group.items.map(({ id, label }) => <a
        className={id === activeId ? "is-current" : ""}
        href={"#" + id}
        aria-current={id === activeId ? "location" : undefined}
        key={id}
      ><i aria-hidden="true" />{label}</a>)}</div>
    </div>)}
  </nav>;
}
