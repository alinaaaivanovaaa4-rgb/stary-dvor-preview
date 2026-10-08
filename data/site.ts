export const site = {
  name: "Старый Двор",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://старый-двор.рф",
  phone: "+7 903 803-31-31",
  phoneHref: "tel:+79038033131",
  secondPhone: "+7 903 033-31-59",
  secondPhoneHref: "tel:+79030333159",
  address: "Тверь, ул. Орджоникидзе, 48В",
  mapUrl: "https://yandex.ru/maps/?pt=35.922713,56.833187&z=16&l=map",
  vkUrl: "https://vk.com/public153287082",
  seo: {
    title: "Старый Двор — мангал, хачапури и кавказская кухня в Твери",
    description: "Шашлык, люля-кебаб, хачапури, долма и садж на компанию. Полное меню кафе «Старый Двор», Тверь, ул. Орджоникидзе, 48В. Бронирование по телефону."
  }
};

export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  description: site.seo.description,
  telephone: site.phone,
  address: { "@type": "PostalAddress", streetAddress: "ул. Орджоникидзе, 48В", addressLocality: "Тверь", addressCountry: "RU" },
  geo: { "@type": "GeoCoordinates", latitude: 56.833187, longitude: 35.922713 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"], opens: "12:00", closes: "00:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "12:00", closes: "02:00" }
  ],
  servesCuisine: ["Кавказская", "Грузинская", "Русская", "Европейская"],
  acceptsReservations: true,
  hasMenu: `${site.url}/#menu`,
  sameAs: [site.vkUrl],
  url: site.url
};
