# Старый Двор — сайт кафе

Публичная временная версия: https://alinaaaivanovaaa4-rgb.github.io/stary-dvor-preview/

Next.js 16, React 19, TypeScript. Иллюстрации, шрифты и PDF меню размещены локально. Контакты и бронирование — по телефону.

## Локальная разработка

```sh
npm ci
npm run dev -- --port 3002
```

## Проверки

```sh
npm run lint
npm run check:menu
npm run build
```

## Публикация

Каждый push в `main` запускает сборку и публикацию на GitHub Pages. Для статической сборки используются `STATIC_EXPORT=true`, `NEXT_PUBLIC_BASE_PATH=/stary-dvor-preview`, `NEXT_PUBLIC_SITE_URL` и `NEXT_PUBLIC_PREVIEW=true`. Временная версия закрыта от индексации через robots meta. Обычная локальная разработка сохраняет адреса без префикса.

Исходное печатное меню объединено в `public/menu/stary-dvor-menu.pdf`; перечень исходных разделов — `pdf-sources.json`. Происхождение иллюстраций описано в файлах `provenance.json`, лицензии шрифтов — в `public/fonts/`.

Локальные сборки, рабочие снимки и архив исходников исключены из репозитория.
