import { site } from "@/data/site";
export default function MobileStickyBar() {
  return <nav className="mobile-bar" aria-label="Быстрые действия"><a href="#menu">Открыть меню</a><a href={site.phoneHref} aria-label="Позвонить и забронировать стол">Бронь по звонку<span className="arrow-icon" aria-hidden="true" /></a></nav>;
}
