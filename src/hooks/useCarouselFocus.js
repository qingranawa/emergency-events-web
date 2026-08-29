import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useCarouselFocus(trackRef, cardCount) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [edgeSpace, setEdgeSpace] = useState(2);
  const reducedMotion = useReducedMotion();
  const userPaused = useRef(false);
  const interactionPaused = useRef(false);
  const visible = useRef(false);
  const timer = useRef(null);
  const frame = useRef(null);

  const cards = useCallback(() => [...(trackRef.current?.querySelectorAll(".system-card") || [])], [trackRef]);
  const maxScroll = useCallback(() => {
    const track = trackRef.current;
    return track ? Math.max(0, track.scrollWidth - track.clientWidth) : 0;
  }, [trackRef]);
  const syncEdgeSpace = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector(".system-card");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0");
    setEdgeSpace(Math.max(0, (track.clientWidth - card.offsetWidth) / 2 - gap));
  }, [trackRef]);
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const list = cards();
    const trackRect = track.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;
    const maxDistance = Math.max(track.clientWidth * 0.8, 1);
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    list.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      const normalized = Math.min(distance / maxDistance, 1);
      card.style.setProperty("--carousel-distance", normalized.toFixed(4));
      card.style.setProperty("--carousel-border-strength", `${Math.round((1 - normalized) * 100)}%`);
      if (distance < nearestDistance) { nearest = index; nearestDistance = distance; }
    });
    setActiveIndex(nearest);
  }, [cards, trackRef]);
  const scheduleMeasure = useCallback(() => {
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => { frame.current = null; measure(); });
  }, [measure]);
  const scrollToIndex = useCallback((index) => {
    const track = trackRef.current;
    const card = cards()[index];
    if (!track || !card) return;
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const target = Math.max(0, Math.min(maxScroll(), track.scrollLeft + (cardRect.left - trackRect.left + cardRect.width / 2) - track.clientWidth / 2));
    track.scrollTo({ left: target, behavior: reducedMotion ? "auto" : "smooth" });
  }, [cards, maxScroll, reducedMotion, trackRef]);
  const move = useCallback((direction, wrap = false) => {
    const current = activeIndex;
    let target = current + direction;
    if (target < 0 || target >= cardCount) { if (!wrap) return; target = target < 0 ? cardCount - 1 : 0; }
    scrollToIndex(target);
  }, [activeIndex, cardCount, scrollToIndex]);
  const syncTimer = useCallback(() => {
    window.clearInterval(timer.current);
    timer.current = null;
    if (reducedMotion || userPaused.current || interactionPaused.current || !visible.current || cardCount < 2) return;
    timer.current = window.setInterval(() => move(1, true), 3000);
  }, [cardCount, move, reducedMotion]);
  const setInteraction = useCallback((paused) => { interactionPaused.current = paused; syncTimer(); }, [syncTimer]);
  const togglePaused = useCallback(() => { userPaused.current = !userPaused.current; setIsPaused(userPaused.current); syncTimer(); }, [syncTimer]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      const entering = entry.isIntersecting && !visible.current;
      visible.current = entry.isIntersecting;
      if (entering && cardCount > 1) move(1, true);
      syncTimer();
    }, { threshold: [0, 0.2] });
    observer.observe(track);
    const resize = new ResizeObserver(() => { syncEdgeSpace(); scheduleMeasure(); });
    resize.observe(track);
    cards().forEach((card) => resize.observe(card));
    const onScroll = () => scheduleMeasure();
    const onResize = () => { syncEdgeSpace(); scheduleMeasure(); };
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    syncEdgeSpace(); scheduleMeasure();
    return () => { observer.disconnect(); resize.disconnect(); track.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); window.clearInterval(timer.current); if (frame.current !== null) cancelAnimationFrame(frame.current); };
  }, [cardCount, cards, move, scheduleMeasure, syncEdgeSpace, syncTimer, trackRef]);

  return { activeIndex, isPaused, edgeSpace, move, togglePaused, setInteraction };
}
