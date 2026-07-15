// src/app/page.js

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GununMesajiCard from "@/components/GununMesajiCard";
import { gunlukDilDestekliMesajlariGetir } from "@/data/GununMesaji";
import { AutoTranslate, useLang } from "@/data/lang-sistem";
import styles from "./page.module.css";

// Client component wrapper for translation
function ClientAutoTranslate({ children }) {
  return <AutoTranslate>{children}</AutoTranslate>;
}

export default function Anasayfa() {
  const { lang } = useLang();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dailyMessages, setDailyMessages] = useState([]);

  const slides = [
    {
      id: 1,
      image: "/img/slider-6.jpg",
      title: "Kendi İçsel Gücünü Keşfet",
      subtitle: "Ruhsal gelişim, numeroloji analizleri ve bireysel seanslarla hayatını dönüştürme zamanı."
    }
  ];

  useEffect(() => {
    // Günün mesajlarından ilk 3 tanesini al
    try {
      const messages = gunlukDilDestekliMesajlariGetir(lang);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDailyMessages(messages.slice(0, 3));
    } catch (error) {
      console.error("Günün mesajları yüklenirken hata:", error);
    }
  }, [lang]);

  useEffect(() => {
    const i = setInterval(() => {
      setCurrentSlide(0);
    }, 15000);
    return () => clearInterval(i);
  }, []);

  return (
    <main className={styles.mainContainer}>
      <Header />

      <ClientAutoTranslate>
        {/* HERO SECTION */}
        <div className={styles.sliderContainer}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${styles.slide} ${index === currentSlide ? styles.slideActive : ""
                }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className={styles.heroOverlay}>
                <div className={styles.heroContent}>
                  <h1 className={styles.heroTitle}>{slide.title}</h1>
                  <p className={styles.heroSubtitle}>{slide.subtitle}</p>
                  <div className={styles.heroButtons}>
                    <Link href="/hizmetler" className={styles.primaryBtn}>
                      Hizmetleri İncele
                    </Link>
                    <Link href="/numeroloji" className={styles.secondaryBtn}>
                      Numeroloji Analizi Yap
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* QUICK NAVIGATION / KEŞFET SECTION */}
        <section className={styles.exploreSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Mucizevi Gelişim Dünyası</h2>
            <p className={styles.sectionSubtitle}>Hayatınızın haritasını birlikte çıkaralım ve potansiyelinizi uyandıralım.</p>
          </div>

          <div className={styles.gridContainer}>
            <Link href="/hizmetler" className={styles.exploreCard}>
              <div className={styles.cardIcon}>🌸</div>
              <h3>Bireysel Hizmetler</h3>
              <p>Ruhsal seanslar, bioenerji uygulamaları ve danışmanlık hizmetleriyle şifalanın.</p>
              <span className={styles.cardLinkText}>Keşfet &rarr;</span>
            </Link>

            <Link href="/egitimler" className={styles.exploreCard}>
              <div className={styles.cardIcon}>🎓</div>
              <h3>Eğitimler</h3>
              <p>Zihinsel ve ruhsal farkındalığınızı artıracak profesyonel eğitim programları.</p>
              <span className={styles.cardLinkText}>İncele &rarr;</span>
            </Link>

            <Link href="/numeroloji" className={styles.exploreCard}>
              <div className={styles.cardIcon}>🔢</div>
              <h3>Numeroloji Analizi</h3>
              <p>Doğum tarihiniz ve isminizin ardındaki gizli sayısal şifreleri çözün.</p>
              <span className={styles.cardLinkText}>Analiz Et &rarr;</span>
            </Link>

            <Link href="/blog" className={styles.exploreCard}>
              <div className={styles.cardIcon}>✍️</div>
              <h3>Blog Yazıları</h3>
              <p>Kişisel gelişim, zihinsel dönüşüm ve ruhsal rehberlik üzerine güncel yazılar.</p>
              <span className={styles.cardLinkText}>Oku &rarr;</span>
            </Link>
          </div>
        </section>

        {/* DAILY MESSAGES SECTION */}
        {dailyMessages.length > 0 && (
          <section className={styles.dailyMessageSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Günün Rehberliği</h2>
              <p className={styles.sectionSubtitle}>Kartlara tıklayarak bugünkü ilham verici rehber mesajınızı açın.</p>
            </div>

            <div className={styles.messagesGrid}>
              {dailyMessages.map((mesaj, index) => (
                <GununMesajiCard
                  key={mesaj.id}
                  mesaj={mesaj}
                  index={index + 1}
                />
              ))}
            </div>
          </section>
        )}

        {/* BRIEF ABOUT SECTION */}
        <section className={styles.aboutIntroSection}>
          <div className={styles.aboutIntroContainer}>
            <div className={styles.aboutIntroContent}>
              <span className={styles.aboutIntroTag}>MUCİZEVİ GELİŞİM</span>
              <h2>Ruhsal ve Zihinsel Dönüşüm Yolculuğu</h2>
              <p>
                Her insan kendi içinde muazzam bir potansiyel ve mucize barındırır. Hayat yolculuğunda karşılaştığımız zorluklar, zihnimizdeki engeller ve enerjisel tıkanıklıklar bazen bu mucizeyi görmemizi zorlaştırabilir.
              </p>
              <p>
                Numeroloji analizleri, bilinçaltı çalışmaları, bioenerji uygulamaları ve kişiye özel danışmanlık hizmetlerimizle hayatınızın rotasını yeniden çizmenize ve ruhsal dengenizi bulmanıza rehberlik ediyoruz.
              </p>
              <div className={styles.aboutButtons}>
                <Link href="/hakkimda" className={styles.aboutBtn}>
                  Daha Fazla Bilgi
                </Link>
              </div>
            </div>
            <div className={styles.aboutIntroImageWrapper}>
              <div className={styles.aboutIntroImageGlow}></div>
              <div className={styles.aboutIntroImage}>
                {/* Estetik bir kişisel gelişim resmi/ikonu */}
                <div className={styles.mysticSymbol}>✨🧘‍♀️✨</div>
              </div>
            </div>
          </div>
        </section>
      </ClientAutoTranslate>

      <div className={styles.fixedAdminBtn}>
        <Link href="/admin">Admin Girişi</Link>
      </div>

      <Footer />
    </main>
  );
}
