import { useSectionSpy } from "../../hooks/useSectionSpy";

export function RuntimeBackbone({ sections }) {
  const activeId = useSectionSpy(sections.map(({ id }) => id));
  const activeIndex = Math.max(0, sections.findIndex(({ id }) => id === activeId));
  const activeSection = sections[activeIndex] || sections[0];

  return <>
    <aside className="runtime-backbone" aria-label="Runtime 主干导航">
      <div className="backbone-label mono">RUNTIME</div>
      <ol>
        {sections.map(({ id, label, code, pending }, index) => <li className={`${pending ? "is-pending" : ""} ${index === activeIndex ? "is-current" : index < activeIndex ? "is-past" : ""}`} key={id}>
          <a href={`#${id}`} aria-current={index === activeIndex ? "step" : undefined}><span className="backbone-node" aria-hidden="true" /> <span><b className="mono">{code}</b>{label}</span></a>
        </li>)}
      </ol>
    </aside>
    <div className="runtime-backbone-mobile" aria-label="当前 Runtime 章节">
      <span className="mono">{activeSection?.code || "01"}</span>
      <strong>{activeSection?.label || "Runtime"}</strong>
      <span className="backbone-mobile-progress mono">{String(activeIndex + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}</span>
    </div>
  </>;
}
