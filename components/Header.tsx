import { site } from "@/data/site";
export default function Header() {
  return <header className="header"><div className="container header-inner">
    <a href="#main" className="header-brand" aria-label="Старый Двор — на главную">Кафе «Старый Двор»</a>
    <nav aria-label="Основная навигация"><a href="#kitchen">Кухня</a><a href="#menu">Меню</a><a href="#contacts">Как нас найти</a></nav>
    <a href={site.phoneHref} className="header-book">Забронировать стол <span aria-hidden="true" className="arrow-icon" /></a>
    <a href={site.phoneHref} className="header-phone">Позвонить</a>
  </div></header>;
}
