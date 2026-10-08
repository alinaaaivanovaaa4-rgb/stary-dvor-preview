import { assetPath } from "@/lib/assets";
import Image from "next/image";
import FoodRibbon from "@/components/FoodRibbon";
import { site } from "@/data/site";
export default function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="container hero-stage">
      <div className="hero-copy">
        <h1 id="hero-title"><Image src={assetPath("/menu/wordmark.svg")} alt="Старый Двор" width={720} height={254} priority className="hero-wordmark" /></h1>
        <p className="hero-cuisine">Кавказская кухня. Мангал. Тверь.</p>
        <p className="hero-statement">Хачапури с пылу,<br />шашлык с огня.<br /><span className="hero-invitation">И все свои за столом.</span></p>
        <div className="hero-actions"><a className="hero-action" href="#menu"><span>Открыть меню</span><span className="action-disc" aria-hidden="true"><span className="arrow-icon" /></span></a><a className="hero-kitchen-link text-link" href="#kitchen">Что подать к столу?<span className="arrow-icon" aria-hidden="true" /></a></div>
      </div>
      <figure className="hero-plate"><div className="plate-parallax"><Image src={assetPath("/menu/grill.svg")} alt="Шашлык на шампурах с овощами — рисунок из нашего меню" width={740} height={588} priority className="engraving" /></div><figcaption>Шашлык, люля-кебаб<br />и овощи на мангале</figcaption></figure>
    </div>
    <div className="container hero-bottom">
      <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">{site.address}<span className="arrow-icon" aria-hidden="true" /></a>
      <p>Пн–Чт, Вс 12:00–00:00 <span>Пт–Сб 12:00–02:00</span></p>
      <a href={site.phoneHref}>{site.phone}</a>
    </div>
    <FoodRibbon />
  </section>;
}
