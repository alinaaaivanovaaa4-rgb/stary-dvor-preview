"use client";
import { useEffect, useRef, useState } from "react";
const foods = [{ name: "Мангал", family: "grill" }, { name: "Хачапури", family: "khachapuri" }, { name: "Садж", family: "sadj" }, { name: "Долма", family: "dolma" }, { name: "Бозбаш", family: "bozbash" }, { name: "Чкмерули", menu: "hot" }];
export default function FoodRibbon() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => { setActive(visible && !document.hidden); setReduced(media.matches); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    if (ref.current) observer.observe(ref.current);
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); media.removeEventListener("change", sync); };
  }, []);
  useEffect(() => { track.current?.getAnimations().forEach(animation => animation.updatePlaybackRate(hovered ? .28 : 1)); }, [hovered]);
  return <div onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false); }} ref={ref} className="kitchen-ribbon">
    <div ref={track} className="ribbon-track" style={{ animationPlayState: active && !focused && !reduced ? "running" : "paused" }}>{[0, 1].map(copy => <div className="ribbon-group" aria-hidden={copy === 1 ? true : undefined} key={copy}>{foods.map(food => <a key={food.name} tabIndex={copy ? -1 : 0} href={food.family ? "#kitchen" : "#menu"} onClick={() => window.dispatchEvent(new CustomEvent("cafe:food-select", { detail: food }))}>{food.name}</a>)}</div>)}</div>
  </div>;
}
