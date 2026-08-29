import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useScrollReveal(rootRef) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return undefined;

    const targets = [...root.querySelectorAll("[data-scroll-reveal]")];
    if (!targets.length) return undefined;
    targets.forEach((target, index) => {
      target.classList.add("scroll-reveal-ready");
      target.style.setProperty("--reveal-delay", `${Math.min(index, 8) * 35}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("scroll-reveal-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [reducedMotion, rootRef]);
}
