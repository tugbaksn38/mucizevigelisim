// src/app/hakkimda/page.js

'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { AutoTranslate } from "../../../data/lang-sistem"; // AutoTranslate'i import edin

// Client component wrapper
function ClientAutoTranslate({ children }) {
  return <AutoTranslate>{children}</AutoTranslate>;
}

export default function Hakkimda() {
  return (
    <>
      <Header />
      
       <ClientAutoTranslate>
        <main className="hakkimda-container">
          <section className="hero-section">
            <div className="hero-content">
              <h1>Benim Hikayem</h1>
              <p>Spiritüel yolculuğuma hoş geldiniz</p>
            </div>
          </section>

          <section className="about-content">
            <div className="about-wrapper">
              <div className="about-image">
                <Image
                  src="/img/hero.jpg"
                  alt="Profil Fotoğrafı"
                  width={400}
                  height={500}
                  className="profile-img"
                />
              </div>
              
              <div className="about-text">
                <h2>Merhaba, Ben Tuğba Kusun</h2>
                <p>
                  10 yılı aşkın süredir spiritüel şifa ve kişisel dönüşüm alanında 
                  çalışmalar yapmaktayım. Biyoenerji, reiki, regresyon ve bilinçaltı 
                  dönüşüm teknikleri konularında uzmanlığım bulunmaktadır.
                </p>
                
                <p>
                  Amacım, insanların içsel potansiyellerini keşfetmelerine ve 
                  yaşamlarında pozitif dönüşümler gerçekleştirmelerine rehberlik etmektir.
                  Her bir bireyin kendi içinde mükemel şifa kaynağına sahip olduğuna inanıyorum.
                </p>
                
                <div className="expertise-areas">
                  <h3>Uzmanlık Alanlarım</h3>
                  <ul>
                    <li>Biyoenerji ve Enerji Şifası</li>
                    <li>Regresyon Terapisi</li>
                    <li>Bilinçaltı Yeniden Programlama</li>
                    <li>Reiki ve Enerji Dengeleme</li>
                    <li>Spiritüel Danışmanlık</li>
                  </ul>
                </div>
                
                <div className="cta-buttons">
                  <a href="/egitimler" className="btn primary">Eğitimlerimi İncele</a>
                  <a href="/iletisim" className="btn secondary">İletişime Geç</a>
                </div>
              </div>
            </div>
          </section>

          <section className="mission-section">
            <h2>Vizyonum ve Misyonum</h2>
            <div className="mission-content">
              <div className="mission-card">
                <h3>Vizyonum</h3>
                <p>
                  İnsanların içsel huzuru ve bütünlüğü keşfederek, daha bilinçli ve 
                  anlamlı yaşamlar sürmelerine katkıda bulunmak.
                </p>
              </div>
              <div className="mission-card">
                <h3>Misyonum</h3>
                <p>
                  Spiritüel şifa tekniklerini herkesin erişebileceği şekilde öğreterek, 
                  bireylerin kendi kendine yetebilme becerilerini geliştirmek.
                </p>
              </div>
            </div>
          </section>
        </main>
      </ClientAutoTranslate>

      <Footer />
    </>
  );
}