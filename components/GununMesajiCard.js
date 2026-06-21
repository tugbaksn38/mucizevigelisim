// components/GununMesajiCard.js
'use client';

import { useState } from 'react';
import { useLang } from '@/data/lang-sistem';
import styles from './GununMesajiCard.module.css';

const GununMesajiCard = ({ mesaj, index }) => {
  const [dondurulmus, setDondurulmus] = useState(false);
  const { dict } = useLang();

  // Eğer mesaj prop'u tanımsızsa, bileşenin hata vermemesi için kontrol
  if (!mesaj) {
    return (
      <div className={styles.gununMesajiKartWrapper}>
        <div className={styles.gununMesajiKarti}>
          <div className={styles.kartOnYuz}>
            <div className={styles.kartNumarasi}>{index}</div>
            <div className={styles.kartIkon}></div>
            <p className={styles.kartYazi}>{dict["Mesaj yükleniyor..."] || "Mesaj yükleniyor..."}</p>
          </div>
        </div>
      </div>
    );
  }

  const kartCevir = () => {
    setDondurulmus(!dondurulmus);
  };

  return (
    <div className={styles.gununMesajiKartWrapper} onClick={kartCevir}>
      <div className={`${styles.gununMesajiKarti} ${dondurulmus ? styles.kartDondurulmus : ''}`}>
        <div className={styles.kartOnYuz}>
          <div className={styles.kartNumarasi}>{index}</div>
          <div className={styles.kartIkon}></div>
          <p className={styles.kartYazi}>{dict["Günün Mesajı"] || "Günün Mesajı"}</p>
        </div>
        
        <div className={styles.kartArkaYuz}>
          <div className={styles.mesajIcerik}>
            <p className={styles.mesajMetin}>&quot;{mesaj.mesaj}&quot;</p>
            <p className={styles.ayetKaynak}>{mesaj.ayet}</p>
            <p className={styles.ayetAciklama}>{mesaj.aciklama}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GununMesajiCard;