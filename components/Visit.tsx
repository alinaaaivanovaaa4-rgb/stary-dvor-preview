import { site } from "@/data/site";

export default function Visit() {
  return <section className="visit dark-section" id="contacts" aria-labelledby="visit-title"><div className="container">
    <div className="section-opening visit-opening"><h2 id="visit-title">Приходите.<br />Будем рады.</h2><p>Здесь вас ждёт домашняя атмосфера: для семейных ужинов, встреч с друзьями и душевных разговоров без спешки.</p></div>
    <div className="visit-layout">
      <div className="contact-details">
        <h3>Ждём в Твери</h3><p className="address">ул. Орджоникидзе, 48В</p>
        <a className="button button-light route-button" href={site.mapUrl} target="_blank" rel="noopener noreferrer">Построить маршрут<span className="arrow-icon" aria-hidden="true" /></a>
        <dl className="hours"><div><dt>Пн–Чт, Вс</dt><dd>12:00–00:00</dd></div><div><dt>Пт–Сб</dt><dd>12:00–02:00</dd></div></dl>
        <a href={site.vkUrl} className="text-link" target="_blank" rel="noopener noreferrer">Мы ВКонтакте<span className="arrow-icon" aria-hidden="true" /></a>
        <details className="banquets"><summary>Банкеты и праздники<span className="plus-icon" aria-hidden="true" /></summary><p>Принимаем заказы на банкеты, дни рождения, свадьбы и другие мероприятия.</p><p>Уютные залы, живая музыка, приятная атмосфера и вкусные блюда — всё для вашего праздника.</p><p>Позвоните нам — обсудим дату, количество гостей и меню для вашего стола.</p><a href={site.phoneHref} className="text-link">Обсудить банкет<span className="arrow-icon" aria-hidden="true" /></a></details>
      </div>
      <div id="reservation" className="phone-booking">
        <h3>Бронируем<br />по звонку.</h3>
        <p>Назовите дату, время и количество гостей.<br />Обсудим детали и оставим для вас стол.</p>
        <a className="booking-number" href={site.phoneHref}>{site.phone}</a>
        <a className="button button-light booking-call" href={site.phoneHref}>Позвонить и забронировать<span className="arrow-icon" aria-hidden="true" /></a>
        <p className="booking-alternative">Или позвоните на второй номер:<br /><a href={site.secondPhoneHref}>{site.secondPhone}</a></p>
      </div>
    </div>
  </div></section>;
}
