// C:\Users\sifre\Desktop\mucizevigelisim\components\LanguageSwitcher.js


'use client';

// components/LanguageSwitcher.js
import { useLang } from "../data/lang-sistem";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  const toggleLang = () => {
    setLang(lang === "tr" ? "en" : "tr");
  };

  return (
    <button onClick={toggleLang}>
      {lang === "tr" ? "English" : "Türkçe"}
    </button>
  );
}
