"use client";
import { useEffect, useRef } from "react";
export default function DishExplanation({ name, text }: { name: string; text: string }) {
  const details = useRef<HTMLDetailsElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const targetOpen = useRef(false);
  useEffect(() => () => animation.current?.cancel(), []);
  return <details ref={details} className="dish-explanation"><summary onClick={event => {
    const node = details.current, body = content.current;
    if (!node || !body) return;
    event.preventDefault();
    animation.current?.cancel();
    targetOpen.current = !targetOpen.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { node.open = targetOpen.current; return; }
    node.open = true;
    const height = body.scrollHeight;
    const opening = targetOpen.current;
    const current = body.animate([{ height: `${opening ? 0 : height}px`, opacity: opening ? 0 : 1 }, { height: `${opening ? height : 0}px`, opacity: opening ? 1 : 0 }], { duration: opening ? 260 : 180, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" });
    animation.current = current;
    current.finished.then(() => { if (animation.current !== current) return; node.open = opening; current.cancel(); animation.current = null; }).catch(() => undefined);
  }}><span>Что это?<span className="sr-only"> {name}</span></span><span className="plus-icon" aria-hidden="true" /></summary><div ref={content} className="dish-explanation-content"><p>{text}</p></div></details>;
}
