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
  openGraph: { title: site.seo.title, description: site.seo.description, type: "website", locale: "ru_RU" },
  alternates: { canonical: site.url }, icons: { icon: assetPath("/favicon.svg") },
  robots: process.env.NEXT_PUBLIC_PREVIEW === "true" ? { index: false, follow: false } : undefined
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="ru" className={`${golos.variable} ${oswald.variable} ${handwritten.variable}`}><body>{children}</body></html>;
}
