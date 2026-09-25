import { useSectionSpy } from "../../hooks/useSectionSpy";
import { factionIndex } from "../../data/factionsArchive";

export function FactionIndex() {
  const activeId = useSectionSpy(factionIndex.map(({ id }) => id));
  return <nav className="factions-nav" aria-label="阵营页章节导航"><div className="container factions-nav-track"><span className="mono factions-nav-label">目录</span>{factionIndex.map(({ id, label }) => <a className={id === activeId ? "is-current" : ""} href={`#${id}`} aria-current={id === activeId ? "location" : undefined} key={id}>{label}</a>)}</div></nav>;
}
