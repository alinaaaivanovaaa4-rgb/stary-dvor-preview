"use client";
import { assetPath } from "@/lib/assets";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import DishExplanation from "@/components/DishExplanation";
import { menuCategories } from "@/data/menu";
import { categoryIntros, dishExplanations } from "@/data/menu-editorial";
import { formatPrice } from "@/lib/utils";
import { changeView } from "@/lib/transitions";
const displayNames: Record<string, string> = { grill: "На мангале", hot: "Горячие блюда", preorder: "По предзаказу", fry: "Фритюр", drinks: "Напитки" };
const order = ["grill", "khachapuri", "sadj", "soups", "hot", "second", "salads", "cold", "preorder", "pasta", "fry", "sides", "desserts", "drinks", "sauces"];

export default function MenuPreview({ activeId, onCategoryChange, query, onQueryChange: setQuery }: { activeId: string; onCategoryChange: (id: string) => void; query: string; onQueryChange: (query: string) => void }) {
  const nav = useRef<HTMLElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const positions = useRef(new Map<string, number>());
  const lastTerm = useRef("");
  const rowAnimations = useRef<Animation[]>([]);
  const [filterQuery, setFilterQuery] = useState(query);
  useEffect(() => { const timer = window.setTimeout(() => setFilterQuery(query), 120); return () => clearTimeout(timer); }, [query]);
  useEffect(() => () => rowAnimations.current.forEach(a => a.cancel()), []);
  useLayoutEffect(() => {
    const active = nav.current?.querySelector<HTMLElement>("button[aria-pressed=true]");
    if (!marker.current || !nav.current) return;
    marker.current.style.opacity = active ? "1" : "0";
    if (active) { marker.current.style.transform = `translateY(${active.offsetTop}px)`; marker.current.style.height = `${active.offsetHeight}px`; }
    nav.current.dataset.indicatorReady = "true";
  });
  const selected = menuCategories.find(c => c.id === activeId) || menuCategories[0];
  const ordered = order.map(id => menuCategories.find(c => c.id === id)!);
  const term = filterQuery.trim().toLocaleLowerCase("ru").replaceAll("ё", "е");
  const matches = (value: string) => value.toLocaleLowerCase("ru").replaceAll("ё", "е").includes(term);
  const visible = term ? menuCategories.map(c => ({ ...c, items: c.items.filter(i => matches(`${c.name} ${i.name} ${i.description}`)) })).filter(c => c.items.length) : activeId === "all" ? ordered : [selected];
  const count = visible.reduce((sum, c) => sum + c.items.length, 0);
  useLayoutEffect(() => {
    const root = list.current;
    if (!root) return;
    rowAnimations.current.forEach(a => a.cancel());
    rowAnimations.current = [];
    const next = new Map<string, number>();
    const changed = lastTerm.current !== term;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = root.getBoundingClientRect().top;
    root.querySelectorAll<HTMLElement>("li[data-dish-id]").forEach((row, index) => {
      const id = row.dataset.dishId!, y = row.getBoundingClientRect().top - top;
      next.set(id, y);
      if (!changed || reduced) return;
      const old = positions.current.get(id);
      const offset = old === undefined ? 10 : Math.max(-180, Math.min(180, old - y));
      rowAnimations.current.push(row.animate([{ transform: `translateY(${offset}px)`, opacity: old === undefined ? 0 : 1 }, { transform: "translateY(0)", opacity: 1 }], { duration: 220, delay: old === undefined ? Math.min(index, 5) * 16 : 0, easing: "cubic-bezier(.16,1,.3,1)" }));
    });
    positions.current = next; lastTerm.current = term;
  });
  const changeCategory = (id: string) => {
    const start = document.getElementById("menu-list-start");
    const belowHeading = start && start.getBoundingClientRect().top < 0;
    const update = () => { onCategoryChange(id); setQuery(""); };
    changeView(update);
    if (belowHeading) { requestAnimationFrame(() => start.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" })); }
  };
  return <section id="menu" className="menu-section" aria-labelledby="menu-title"><div className="container">
    <div className="section-opening menu-opening"><h2 id="menu-title">Наше меню.</h2><p>Любимые блюда из разных стран: солнечная Италия, уютная Европа, ароматный Кавказ и традиционная русская кухня. Всё, что по-настоящему вкусно и понятно каждому.<br /><a className="text-link menu-pdf-link" href={assetPath("/menu/stary-dvor-menu.pdf")} target="_blank" rel="noopener noreferrer">Меню в PDF<span className="sr-only"> — открыть в новой вкладке</span><span className="arrow-icon" aria-hidden="true" /></a></p></div>
    <div className="menu-layout">
      <aside className="menu-sidebar">
        <nav ref={nav} className="menu-categories" aria-label="Разделы меню"><span ref={marker} className="menu-active-marker" aria-hidden="true" /><button type="button" aria-pressed={!term && activeId === "all"} onClick={() => changeCategory("all")}><span className="category-label">Все блюда</span><span className="arrow-icon" aria-hidden="true" /></button>{order.map(id => { const c = menuCategories.find(c => c.id === id)!; return <button key={id} type="button" aria-pressed={!term && activeId === id} onClick={() => changeCategory(id)}><span className="category-label">{displayNames[id] || c.name}</span><span className="arrow-icon" aria-hidden="true" /></button>; })}</nav>
        <label className="mobile-category" htmlFor="menu-category">Раздел меню<select id="menu-category" value={activeId} onChange={e => changeCategory(e.target.value)}><option value="all">Все блюда и цены</option>{order.map(id => { const c = menuCategories.find(c => c.id === id)!; return <option key={id} value={id}>{displayNames[id] || c.name}</option>; })}</select></label>
      </aside>
      <div className="menu-main">
        <div className="menu-search-row" id="menu-list-start"><label className="menu-search" htmlFor="menu-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m14.5 14.5 5 5" /></svg><input id="menu-search" type="search" placeholder="Название или ингредиент" aria-label="Поиск по всему меню" value={query} onChange={e => setQuery(e.target.value)} autoComplete="off" /></label>{query && <button className="clear-search" type="button" onClick={() => setQuery("")}>Очистить</button>}</div>
        <p className="sr-only" role="status">{term ? `Найдено блюд: ${count}` : `${activeId === "all" ? "Все меню" : selected.name}, позиций: ${count}`}</p>
        <div ref={list} className="menu-list">
          {visible.map(c => <div className="menu-group" key={c.id}><div className="menu-category-heading"><h3>{c.name}</h3><span>{c.items.length} {c.items.length % 10 === 1 && c.items.length !== 11 ? "позиция" : c.items.length % 10 >= 2 && c.items.length % 10 <= 4 && (c.items.length < 12 || c.items.length > 14) ? "позиции" : "позиций"}</span></div><p className="menu-category-intro">{categoryIntros[c.id]}</p>{c.note && <p className="menu-note">{c.note}</p>}<ul>{c.items.map((item, index) => <li className="dish" data-dish-id={`${c.id}:${item.name}`} key={`${c.id}-${index}`}><div className="dish-copy"><h4>{item.name}</h4>{item.description && <p>{item.description}</p>}{dishExplanations[item.name] && <DishExplanation name={item.name} text={dishExplanations[item.name]} />}</div>{item.variants ? <div className="dish-variants">{item.variants.map(v => <div key={v.weight}><span className="dish-weight">{v.weight}</span><strong className="dish-price">{formatPrice(v.price)} <span>₽</span></strong></div>)}</div> : <><span className="dish-weight">{item.weight}</span><strong className="dish-price">{formatPrice(item.price)} <span>₽</span></strong></>}</li>)}</ul></div>)}
          {!count && <div className="menu-empty"><h3>Такого блюда не нашли.</h3><p>Попробуйте другое название или ингредиент.</p><button type="button" className="text-link" onClick={() => setQuery("")}>Вернуться к меню<span className="arrow-icon" aria-hidden="true" /></button></div>}
        </div>
        <p className="menu-footnote">Если у вас есть аллергия, пожалуйста, сообщите об этом при заказе.</p>
      </div>
    </div>
  </div></section>;
}
