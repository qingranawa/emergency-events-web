import { useEffect, useState } from "react";

export function useSectionSpy(sectionIds) {
  const idsKey = sectionIds.join("|");
  const [activeId, setActiveId] = useState(sectionIds[0] || "");

  useEffect(() => {
    const ids = idsKey ? idsKey.split("|") : [];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const visibleSections = new Map();
    const updateActive = () => {
      const next = [...visibleSections.entries()]
        .sort(([, first], [, second]) => second.ratio - first.ratio || first.top - second.top)[0]?.[0];
      if (next) setActiveId(next);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.set(entry.target.id, {
          ratio: entry.intersectionRatio,
          top: entry.boundingClientRect.top,
        });
        else visibleSections.delete(entry.target.id);
      });
      updateActive();
    }, { rootMargin: "-22% 0px -58% 0px", threshold: [0, 0.18, 0.45, 0.75] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
