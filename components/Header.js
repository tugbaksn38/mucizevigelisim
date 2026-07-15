//src\components\Header.js

"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { useLang, AutoTranslate } from "@/data/lang-sistem";

export default function Header() {
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLang = () => {
    const order = ["tr", "en", "fr", "ar"];
    setLang(order[(order.indexOf(lang) + 1) % order.length]);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <AutoTranslate>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          MUCİZEVİ GELİŞİM
        </Link>

        {/* Masaüstü Navigasyonu */}
        <nav className={`${styles.nav} ${styles.desktopNav}`}>
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

        <div className={styles.actions}>
          <button className={styles.langBtn} onClick={toggleLang}>
            {lang.toUpperCase()}
          </button>

          {/* Mobil Hamburger Butonu */}
          <button 
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerActive : ""}`} 
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>

        {/* Mobil Arka Plan Karartması (Overlay) */}
        <div 
          className={`${styles.overlay} ${menuOpen ? styles.overlayActive : ""}`} 
          onClick={closeMenu}
        />

        {/* Mobil Yan Çekmece Menüsü */}
        <div className={`${styles.mobileDrawer} ${menuOpen ? styles.drawerOpen : ""}`}>
          <nav className={styles.mobileNav}>
            <Link href="/" onClick={closeMenu}>Anasayfa</Link>
            <Link href="/hizmetler" onClick={closeMenu}>Hizmetler</Link>
            <Link href="/egitimler" onClick={closeMenu}>Eğitimler</Link>
            <Link href="/blog" onClick={closeMenu}>Blog</Link>
            <Link href="/numeroloji" onClick={closeMenu}>Numeroloji</Link>
            <Link href="/isimanaliz" onClick={closeMenu}>İsim Analizi</Link>
            <Link href="/hastalik" onClick={closeMenu}>Hastalıklar</Link>
            <Link href="/webinar/login" onClick={closeMenu}>Webinar</Link>
            <Link href="/mesaj" onClick={closeMenu}>Günün Ayeti</Link>
            <Link href="/hakkimda" onClick={closeMenu}>Hakkımda</Link>
            <Link href="/iletisim" onClick={closeMenu}>İletişim</Link>
          </nav>
        </div>
      </header>
    </AutoTranslate>
  );
}
