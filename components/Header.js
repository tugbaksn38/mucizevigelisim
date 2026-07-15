//src\components\Header.js

"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { useLang, AutoTranslate } from "@/data/lang-sistem";

export default function Header() {
  const { lang, setLang } = useLang();

  const toggleLang = () => {
    const order = ["tr", "en", "fr", "ar"];
    setLang(order[(order.indexOf(lang) + 1) % order.length]);
  };

  return (
    <AutoTranslate>
      <header className={styles.header}>
        <div className={styles.logo}>MUCİZEVİ GELİŞİM</div>

        <nav className={styles.nav}>
          <Link href="/">Anasayfa</Link>
          <Link href="/hizmetler">Hizmetler</Link>
          <Link href="/egitimler">Eğitimler</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/numeroloji">Numeroloji</Link>
          <Link href="/isimanaliz">İsim Analizi</Link>
          <Link href="/hastalik">Hastalıklar</Link>
          <Link href="/webinar/login">Webinar</Link>
          <Link href="/mesaj">Günün Ayeti</Link>
          <Link href="/hakkimda">Hakkımda</Link>
          <Link href="/iletisim">İletişim</Link>
        </nav>

        <button className={styles.langBtn} onClick={toggleLang}>
          {lang.toUpperCase()}
        </button>
      </header>
    </AutoTranslate>
  );
}
