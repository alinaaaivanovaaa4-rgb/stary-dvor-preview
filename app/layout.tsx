import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";
import { assetPath } from "@/lib/assets";
import { site } from "@/data/site";

const golos = localFont({ src: "../public/fonts/GolosText.ttf", variable: "--font-golos", display: "swap", weight: "400 900" });
const oswald = localFont({ src: "../public/fonts/Oswald.ttf", variable: "--font-oswald", display: "swap", weight: "200 700" });

const handwritten = localFont({ src: "../public/fonts/MarckScript.ttf", variable: "--font-handwritten", display: "swap", weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url), title: site.seo.title, description: site.seo.description,
  openGraph: {
    title: "Кафе «Старый Двор» — Тверь",
    description: "Хачапури с пылу, шашлык с огня. И все свои за столом. Меню, цены и бронирование.",
    url: site.url, siteName: site.name, type: "website", locale: "ru_RU",
    images: [{ url: new URL(assetPath("/social-preview.png"), site.url).toString(), width: 1200, height: 630, alt: "Старый Двор — хачапури с пылу, шашлык с огня. Тверь." }]
  },
  twitter: {
    card: "summary_large_image", title: "Кафе «Старый Двор» — Тверь",
    description: "Хачапури с пылу, шашлык с огня. И все свои за столом.",
    images: [new URL(assetPath("/social-preview.png"), site.url).toString()]
  },
  alternates: { canonical: site.url }, icons: { icon: assetPath("/favicon.svg") },
  robots: process.env.NEXT_PUBLIC_PREVIEW === "true" ? { index: false, follow: false } : undefined
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="ru" className={`${golos.variable} ${oswald.variable} ${handwritten.variable}`}><body>{children}</body></html>;
}
