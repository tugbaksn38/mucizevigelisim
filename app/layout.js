//megaproje/src/app/layout.js

'use client';

import { LangProvider } from "@/data/lang-sistem";
import tr from "../data/genel-ceviri/tr.json";
import "./globals.css";

export default function RootLayout({ children }) {
  const loader = async (lang) => {
    try {
      if (lang === "en") return (await import("../data/genel-ceviri/en.json")).default;
      if (lang === "fr") return (await import("../data/genel-ceviri/fr.json")).default;
      if (lang === "ar") return (await import("../data/genel-ceviri/ar.json")).default;
      return tr;
    } catch {
      return tr;
    }
  };

  return (
    <html lang="tr">
      <body>
        <LangProvider
          initialLang="tr"
          initialTranslations={tr}
          loader={loader}
        >
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
