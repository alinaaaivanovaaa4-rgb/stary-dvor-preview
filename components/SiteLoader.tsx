"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { assetPath } from "@/lib/assets";

const cornerDishes = [
  { corner: "top-left", src: "/menu/grill.svg", generated: false },
  { corner: "top-right", src: "/menu/khachapuri.svg", generated: false },
  { corner: "bottom-left", src: "/menu/generated/dolma-coarse.png", generated: true },
  { corner: "bottom-right", src: "/menu/generated/bozbash-coarse.png", generated: true }
];

export default function SiteLoader() {
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let alive = true;
    let removal: ReturnType<typeof setTimeout>;
    let minimum: ReturnType<typeof setTimeout>;
    let deadline: ReturnType<typeof setTimeout>;
    const images = Array.from(document.querySelectorAll<HTMLImageElement>(".hero-wordmark, .hero-plate img, .site-loader-art img"));
    const assets = Promise.all([document.fonts.ready, ...images.map(img => img.decode().catch(() => undefined))]);
    const bounded = Promise.race([assets, new Promise<void>(resolve => { deadline = setTimeout(resolve, 2000); })]);
    const brief = new Promise<void>(resolve => { minimum = setTimeout(resolve, 600); });
    void Promise.all([bounded, brief]).then(() => {
      if (!alive) return;
      clearTimeout(deadline);
      setReady(true);
      window.dispatchEvent(new Event("cafe:ready"));
      removal = setTimeout(() => { if (alive) setHidden(true); }, 320);
    });
    return () => { alive = false; clearTimeout(deadline); clearTimeout(minimum); clearTimeout(removal); };
  }, []);
  if (hidden) return null;
  return <div className={`site-loader${ready ? " site-loader-ready" : ""}`} aria-hidden="true">{cornerDishes.map(dish => <div key={dish.corner} className={`site-loader-art site-loader-${dish.corner}${dish.generated ? " site-loader-art-generated" : ""}`}><Image src={assetPath(dish.src)} alt="" width={dish.generated ? 1536 : 740} height={dish.generated ? 1024 : 588} unoptimized loading="eager" draggable={false} /></div>)}<div className="site-loader-content"><Image src={assetPath("/menu/wordmark.svg")} alt="" width={720} height={254} priority /><p>И все свои за столом.</p><span className="site-loader-line" /></div></div>;
}
