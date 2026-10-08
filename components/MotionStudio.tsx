"use client";

import { useEffect } from "react";

export default function MotionStudio() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const hero = document.querySelector<HTMLElement>(".hero-stage");
    const plate = document.querySelector<HTMLElement>(".plate-parallax");
    const logo = document.querySelector<HTMLImageElement>(".hero-wordmark");
    const engraving = document.querySelector<HTMLImageElement>(".hero-plate .engraving");
    const action = document.querySelector<HTMLAnchorElement>(".hero-action");
    const disc = document.querySelector<HTMLElement>(".action-disc");
    const invitation = document.querySelector<HTMLElement>(".hero-invitation");
    const footer = document.querySelector<HTMLImageElement>(".footer-signature img");
    const progressLine = document.querySelector<HTMLElement>(".reading-progress");
    let tilted: HTMLElement | null = null;
    let footerPrinted = false;
    let disposed = false;
    let frame = 0;
    let pointerFrame = 0;
    let tiltFrame = 0;
    let heroVisible = true;
    let introduced = false;
    const animations: Animation[] = [];
    const easing = "cubic-bezier(.16,1,.3,1)";

    const reset = () => {
      animations.forEach(a => a.cancel());
      tilted?.style.removeProperty("--tilt-x");
      tilted?.style.removeProperty("--tilt-y");
      plate?.style.removeProperty("--plate-y");
      plate?.style.removeProperty("--plate-turn");
      disc?.style.removeProperty("--magnet-x");
      disc?.style.removeProperty("--magnet-y");
    };
    const updateScroll = () => {
      frame = 0;
      if (document.hidden) return;
      const length = document.documentElement.scrollHeight - window.innerHeight;
      progressLine?.style.setProperty("--reading", `${length > 0 ? Math.min(1, window.scrollY / length) : 0}`);
      if (reduced.matches) return;
      if (fine.matches && heroVisible && hero && plate) {
        const progress = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / hero.offsetHeight));
        plate.style.setProperty("--plate-y", `${progress * -24}px`);
        plate.style.setProperty("--plate-turn", `0deg`);
      }

    };
    const queueScroll = () => { if (!frame) frame = requestAnimationFrame(updateScroll); };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
      });
      queueScroll();
    }, { rootMargin: "80px 0px" });
    if (hero) observer.observe(hero);
    const footerObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || footerPrinted || reduced.matches || document.hidden || !footer) return;
      footerPrinted = true;
      animations.push(footer.animate([{ opacity: .35, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 650, easing }));
    }, { threshold: .25 });
    if (footer) footerObserver.observe(footer);
    const sizeObserver = new ResizeObserver(queueScroll);
    sizeObserver.observe(document.body);
    queueScroll();
    const tiltPointer = (event: PointerEvent) => {
      if (reduced.matches || !fine.matches || document.hidden) return;
      const surface = (event.target as Element).closest<HTMLElement>(".hero-plate, .cuisine-art");
      cancelAnimationFrame(tiltFrame);
      tiltFrame = requestAnimationFrame(() => {
        if (tilted && tilted !== surface) { tilted.style.setProperty("--tilt-x", "0deg"); tilted.style.setProperty("--tilt-y", "0deg"); }
        tilted = surface;
        if (!surface) return;
        const box = surface.getBoundingClientRect();
        surface.style.setProperty("--tilt-x", `${(event.clientY - box.top - box.height / 2) / box.height * -2}deg`);
        surface.style.setProperty("--tilt-y", `${(event.clientX - box.left - box.width / 2) / box.width * 2}deg`);
      });
    };

    const introduce = async () => {
      if (introduced || disposed || reduced.matches || document.hidden) return;
      introduced = true;
      await Promise.all([logo, engraving].filter(Boolean).map(img => img!.decode().catch(() => undefined)));
      if (disposed || reduced.matches || document.hidden || !heroVisible) return;
      if (invitation) animations.push(invitation.animate([{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 850, delay: 400, easing: "cubic-bezier(.4,0,.2,1)", fill: "backwards" }));
      if (logo) animations.push(logo.animate([
        { opacity: .25, transform: "translateY(12px)" },
        { opacity: 1, transform: "translateY(0)" }
      ], { duration: 760, easing }));
      if (engraving) animations.push(engraving.animate([
        { opacity: .25, transform: "translateY(16px)" },
        { opacity: 1, transform: "translateY(0)" }
      ], { duration: 760, delay: 120, easing, fill: "backwards" }));
    };
    const movePointer = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches || !action || !disc || document.hidden) return;
      const box = action.getBoundingClientRect();
      const x = (event.clientX - box.left - box.width / 2) / box.width * 12;
      const y = (event.clientY - box.top - box.height / 2) / box.height * 12;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        disc.style.setProperty("--magnet-x", `${x}px`);
        disc.style.setProperty("--magnet-y", `${y}px`);
      });
    };
    const leavePointer = () => {
      cancelAnimationFrame(pointerFrame);
      disc?.style.setProperty("--magnet-x", "0px");
      disc?.style.setProperty("--magnet-y", "0px");
    };
    const preferenceChanged = () => { if (reduced.matches) reset(); else { queueScroll(); void introduce(); } };
    const visibilityChanged = () => {
      if (document.hidden) {
        animations.forEach(a => { if (a.playState === "running") a.pause(); });
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (!reduced.matches) {
        animations.forEach(a => { if (a.playState === "paused") a.play(); });
        queueScroll();
        void introduce();
      }
    };
    document.addEventListener("pointermove", tiltPointer, { passive: true });
    window.addEventListener("scroll", queueScroll, { passive: true });
    window.addEventListener("resize", queueScroll, { passive: true });
    document.addEventListener("visibilitychange", visibilityChanged);
    reduced.addEventListener("change", preferenceChanged);
    action?.addEventListener("pointermove", movePointer);
    action?.addEventListener("pointerleave", leavePointer);
    const pageReady = () => { void introduce(); };
    window.addEventListener("cafe:ready", pageReady);
    if (!document.querySelector(".site-loader")) void introduce();
    return () => {
      disposed = true;
      window.removeEventListener("cafe:ready", pageReady);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
      cancelAnimationFrame(tiltFrame);
      observer.disconnect();
      footerObserver.disconnect();
      sizeObserver.disconnect();
      document.removeEventListener("pointermove", tiltPointer);
      reset();
      window.removeEventListener("scroll", queueScroll);
      window.removeEventListener("resize", queueScroll);
      document.removeEventListener("visibilitychange", visibilityChanged);
      reduced.removeEventListener("change", preferenceChanged);
      action?.removeEventListener("pointermove", movePointer);
      action?.removeEventListener("pointerleave", leavePointer);
    };
  }, []);
  return <div className="reading-progress" aria-hidden="true" />;
}
