import { useRef } from "react";
import { useCarouselFocus } from "../../hooks/useCarouselFocus";
import { FactionCard } from "./FactionCard";

export function FactionCarousel({ factions }) {
  const trackRef = useRef(null);
  const { activeIndex, isPaused, edgeSpace, move, togglePaused, setInteraction } = useCarouselFocus(trackRef, factions.length);
  return <div className="faction-carousel"><div className="carousel-toolbar"><span className="carousel-count mono" aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(factions.length).padStart(2, "0")}</span><div className="carousel-controls" aria-label="阵营卡片切换"><button className="carousel-btn" type="button" onClick={() => move(-1)} disabled={activeIndex === 0} aria-label="上一张阵营卡片">←</button><button className="carousel-btn" type="button" onClick={togglePaused} aria-label={isPaused ? "继续自动播放" : "暂停自动播放"} aria-pressed={isPaused}>{isPaused ? "▶" : "Ⅱ"}</button><button className="carousel-btn" type="button" onClick={() => move(1)} disabled={activeIndex === factions.length - 1} aria-label="下一张阵营卡片">→</button></div></div><div ref={trackRef} className="faction-track" style={{ "--carousel-edge-space": `${edgeSpace}px` }} tabIndex="0" role="region" aria-label="阵营卡片列表" onPointerEnter={() => setInteraction(true)} onPointerLeave={() => setInteraction(false)} onFocus={() => setInteraction(true)} onBlur={() => setInteraction(false)}>{factions.map((faction) => <FactionCard key={faction.id} faction={faction} />)}</div></div>;
}
