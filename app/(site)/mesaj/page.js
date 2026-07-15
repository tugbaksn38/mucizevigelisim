// src/app/mesaj/page.js

'use client';

import { useState, useEffect } from 'react';
import GununMesajiCard from '@/components/GununMesajiCard';
import { gunlukDilDestekliMesajlariGetir } from '../../../data/GununMesaji';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from './page.module.css';
//--------------------------------------- dil için bu ikisi eklendi
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { AutoTranslate, useLang } from "../../../data/lang-sistem";


// Client component wrapper
function ClientAutoTranslate({ children }) {
  return <AutoTranslate>{children}</AutoTranslate>;
}

export default function MesajPage() {
  const { lang } = useLang();
  const [mesajlar, setMesajlar] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    const mesajlariYukle = () => {
      try {
        const dilMesajlari = gunlukDilDestekliMesajlariGetir(lang);
        setMesajlar(dilMesajlari);
      } catch (error) {
        console.error("Mesajlar yüklenirken hata oluştu:", error);
      } finally {
        setYukleniyor(false);
      }
    };

    mesajlariYukle();
  }, [lang]);

  return (
    <>
      <Header />

      <ClientAutoTranslate>
        <div className={styles.mesajSayfaContainer}>
          <header className={styles.mesajHeader}>
            <h1>Hayata Yol Gösteren Ayetler</h1>
            <p>Kartlara tıklayarak ilham verici mesajları keşfedin</p>
          </header>

          <main className={styles.mesajMain}>
            {yukleniyor ? (
              <div className={styles.yukleniyor}>
                <p>Mesajlar yükleniyor...</p>
              </div>
            ) : (
              <div className={styles.gununMesajiKartlarContainer}>
                {mesajlar.map((mesaj, index) => (
                  <GununMesajiCard
                    key={mesaj.id}
                    mesaj={mesaj}
                    index={index + 1}
                  />
                ))}
              </div>
            )}
          </main>

          <footer className={styles.mesajFooter}>
            <p>Her kartın arkasında hayatınıza ışık tutacak bir mesaj bulacaksınız</p>
          </footer>
        </div>
      </ClientAutoTranslate>

      <Footer />
    </>
  );
}