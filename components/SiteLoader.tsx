"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { assetPath } from "@/lib/assets";

export default function SiteLoader() {
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let alive = true;
    let removal: ReturnType<typeof setTimeout>;
    let minimum: ReturnType<typeof setTimeout>;
    let deadline: ReturnType<typeof setTimeout>;
    const images = Array.from(document.querySelectorAll<HTMLImageElement>(".hero-wordmark, .hero-plate img"));
    const assets = Promise.all([document.fonts.ready, ...images.map(img => img.decode().catch(() => undefined))]);
    const bounded = Promise.race([assets, new Promise<void>(resolve => { deadline = setTimeout(resolve, 2000); })]);
    const brief = new Promise<void>(resolve => { minimum = setTimeout(resolve, 250); });
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
  return <div className={`site-loader${ready ? " site-loader-ready" : ""}`} aria-hidden="true"><div className="site-loader-content"><Image src={assetPath("/menu/wordmark.svg")} alt="" width={720} height={254} priority /><p>И все свои за столом.</p><span className="site-loader-line" /></div></div>;
}
