"use client";
import { assetPath } from "@/lib/assets";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MenuPreview from "@/components/MenuPreview";
import { menuCategories } from "@/data/menu";
import { formatPrice } from "@/lib/utils";
import { changeView } from "@/lib/transitions";

const families = [
  { id: "grill", category: "grill", generated: false, alt: "Иллюстрация: шашлык и люля-кебаб с овощами", label: "На мангале", title: "Мангал.", image: "grill", intro: "Баранина, свинина, курица. Шашлык и люля-кебаб, а к ним — овощи с мангала и соусы.", names: ["Баранина корейка", "Люля-кебаб из баранины"], cta: "Выбрать с мангала" },
  { id: "khachapuri", category: "khachapuri", generated: false, alt: "Иллюстрация: хачапури по-аджарски", label: "Хачапури", title: "Хачапури.", image: "khachapuri", intro: "По-мегрельски — с сулугуни и брынзой. По-аджарски — с яйцом, шпинатом или беконом. Разломить и поделиться.", names: ["По-мегрельски", "По-аджарски с сулугуни"], cta: "Выбрать хачапури" },
  { id: "sadj", category: "sadj", generated: false, alt: "Иллюстрация: садж с мясом и овощами", label: "Садж", title: "Садж.", image: "sadj", intro: "Свинина, телятина и курица, жареные овощи, грибы и картофель. Одно большое горячее блюдо на весь стол.", names: ["Садж на три персоны", "Садж на пять персон"], cta: "Выбрать садж" },
  { id: "dolma", category: "second", generated: true, alt: "Иллюстрация: долма из телятины", label: "Долма", title: "Долма.", image: "dolma-coarse", intro: "Мясная начинка с рисом в виноградных листьях. К ней — сметана.", names: ["Долма из телятины"], cta: "Выбрать второе" },
  { id: "bozbash", category: "soups", generated: true, alt: "Иллюстрация: бозбаш", label: "Бозбаш", title: "Бозбаш.", image: "bozbash-coarse", intro: "Баранина на кости, нут, картофель, зелень и специи. Начните с горячего.", names: ["Бозбаш"], cta: "Выбрать суп" }
];

export default function FoodExperience() {
  const [familyId, setFamilyId] = useState("khachapuri");
  const [menuId, setMenuId] = useState("khachapuri");
  const [query, setQuery] = useState("");
  const swipe = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const select = (event: Event) => { const { family, menu } = (event as CustomEvent<{ family?: string; menu?: string }>).detail; if (family && families.some(f => f.id === family)) changeView(() => setFamilyId(family)); if (menu) { setMenuId(menu); setQuery(""); } };
    window.addEventListener("cafe:food-select", select);
    return () => window.removeEventListener("cafe:food-select", select);
  }, []);
  const stepFamily = (direction: number) => { const index = families.findIndex(f => f.id === familyId); changeView(() => setFamilyId(families[(index + direction + families.length) % families.length].id)); };
  const chooseMenu = (id: string) => { setMenuId(id); setQuery(""); };
  const family = families.find(f => f.id === familyId)!;
  const category = menuCategories.find(c => c.id === family.category)!;
  return <>
    {families.map(f => <link key={f.id} rel="preload" as="image" href={assetPath(f.generated ? `/menu/generated/${f.image}.png` : `/menu/${f.image}-light.svg`)} fetchPriority="low" />)}
    <section id="kitchen" className="kitchen dark-section" aria-labelledby="kitchen-title"><div className="container">
      <div className="section-opening kitchen-opening"><h2 id="kitchen-title">Добро<br />пожаловать.</h2><p>Мы верим, что еда объединяет.<br />Особенно та, что приготовлена с душой.</p></div>
      <div className="cuisine-tabs" role="tablist" aria-label="Наша кухня">
        {families.map((f, index) => <button type="button" key={f.id} id={`cuisine-tab-${f.id}`} role="tab" tabIndex={family.id === f.id ? 0 : -1} aria-selected={family.id === f.id} aria-controls="cuisine-panel" onClick={() => changeView(() => setFamilyId(f.id))} onKeyDown={e => {
          if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
          e.preventDefault();
          const next = e.key === "Home" ? 0 : e.key === "End" ? families.length - 1 : (index + (e.key === "ArrowRight" ? 1 : families.length - 1)) % families.length;
          changeView(() => setFamilyId(families[next].id));
          document.getElementById(`cuisine-tab-${families[next].id}`)?.focus();
        }}>{f.label}<span className="arrow-icon" aria-hidden="true" /></button>)}
      </div>
      <div className="cuisine-panel" role="tabpanel" tabIndex={0} id="cuisine-panel" aria-labelledby={`cuisine-tab-${family.id}`}>
        <div className="cuisine-detail"><h3 className="cuisine-title">{family.title}</h3><p>{family.intro}</p>
          <ul className="featured-dishes">{family.names.map(name => { const item = category.items.find(i => i.name === name)!; return <li key={name}><div><span>{item.name}</span><small>{item.weight}</small></div><strong>{formatPrice(item.price)} ₽</strong></li>; })}</ul>
          <a className="text-link" href="#menu" onClick={() => chooseMenu(family.category)}>{family.cta}<span className="arrow-icon" aria-hidden="true" /></a>
        </div>
        <div onPointerDown={e => { if (e.pointerType === "mouse" && e.button !== 0) return; swipe.current = { x: e.clientX, y: e.clientY }; e.currentTarget.setPointerCapture(e.pointerId); }} onPointerCancel={() => { swipe.current = null; }} onPointerUp={e => { const start = swipe.current; swipe.current = null; if (!start) return; const x = e.clientX - start.x, y = e.clientY - start.y; if (Math.abs(x) > 50 && Math.abs(x) > Math.abs(y) * 1.4) stepFamily(x < 0 ? 1 : -1); }} className={`cuisine-art cuisine-art-${family.image}${family.generated ? " cuisine-art-generated" : ""}`}><Image key={family.image} src={assetPath(family.generated ? `/menu/generated/${family.image}.png` : `/menu/${family.image}-light.svg`)} alt={family.alt} width={family.generated ? 1536 : 720} height={family.generated ? 1024 : 500} sizes="(max-width: 760px) 100vw, 55vw" loading="eager" unoptimized={family.generated} draggable={false} className="engraving" /></div>
      </div>
      <div className="cuisine-swipe-controls"><button type="button" onClick={() => stepFamily(-1)} aria-label="Предыдущее блюдо"><span className="arrow-icon" aria-hidden="true" /></button><span>Листайте блюда</span><button type="button" onClick={() => stepFamily(1)} aria-label="Следующее блюдо"><span className="arrow-icon" aria-hidden="true" /></button></div>
      <p className="kitchen-tail">Готовим так, будто ждём в гости близких — просто, щедро и с любовью.<a href="#menu" onClick={() => chooseMenu("all")}>Все блюда и цены<span className="arrow-icon" aria-hidden="true" /></a></p>
    </div></section>
    <MenuPreview activeId={menuId} onCategoryChange={chooseMenu} query={query} onQueryChange={setQuery} />
  </>;
}
