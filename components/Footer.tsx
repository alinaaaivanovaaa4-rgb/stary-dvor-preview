import { assetPath } from "@/lib/assets";
import Image from "next/image";
import { site } from "@/data/site";
export default function Footer() {
  return <footer className="footer dark-section"><div className="container"><div className="footer-music"><h2>Вечера с живой музыкой.</h2><p>Уютный зал, любимые блюда и время для своих. Программу ближайшего вечера уточните <a href={site.phoneHref}>по телефону</a>.</p></div><a className="footer-signature" href="#main" aria-label="Старый Двор — наверх"><Image src={assetPath("/menu/wordmark-light.svg")} width={1200} height={423} alt="Старый Двор" style={{ height: "auto" }} loading="eager" /></a><div className="footer-inner"><p>Кавказская кухня.<br />Щедрый стол. Тверь.</p><a href={site.phoneHref}>{site.phone}</a><a href={assetPath("/menu/stary-dvor-menu.pdf")} target="_blank" rel="noopener noreferrer" className="text-link">Меню в PDF<span className="sr-only"> — открыть в новой вкладке</span><span className="arrow-icon" aria-hidden="true" /></a></div></div></footer>;
}
