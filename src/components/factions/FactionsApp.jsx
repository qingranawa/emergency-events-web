import { useRef } from "react";
import { Background } from "../layout/Background";
import { Footer } from "../layout/Footer";
import { SiteNav } from "../layout/SiteNav";
import { useTheme } from "../../hooks/useTheme";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { FactionHero } from "./FactionHero";
import { FactionIndex } from "./FactionIndex";
import { FactionRelationshipMap } from "./FactionRelationshipMap";
import { FoundationSection } from "./FoundationSection";
import { MtfSection } from "./MtfSection";
import { ChaosSection } from "./ChaosSection";
import { GocSection } from "./GocSection";
import { UiuSection } from "./UiuSection";
import { AnomalySection } from "./AnomalySection";
import { FactionComparison } from "./FactionComparison";
import { FactionSources } from "./FactionSources";

export function FactionsApp() {
  const { theme, toggleTheme } = useTheme();
  const mainRef = useRef(null);
  useScrollReveal(mainRef);
  return <><Background /><SiteNav page="factions" theme={theme} onToggleTheme={toggleTheme} /><main ref={mainRef} className="factions-page" id="top"><FactionHero /><FactionIndex /><div className="factions-content"><FactionRelationshipMap /><FoundationSection /><MtfSection /><ChaosSection /><GocSection /><UiuSection /><AnomalySection /><FactionComparison /><FactionSources /></div></main><Footer factions /></>;
}
