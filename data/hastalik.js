// C:\Users\sifre\Desktop\mucizevigelisim\data\hastalik.js


import trHastaliklar from "../data/hastalik-ceviri/tr.json";
import enHastaliklar from "../data/hastalik-ceviri/en.json";
import frHastaliklar from "../data/hastalik-ceviri/fr.json";
import arHastaliklar from "../data/hastalik-ceviri/ar.json";

export const baslangicHastaliklar = trHastaliklar;

// LocalStorage'dan hastalıkları al, yoksa başlangıç verilerini kullan
export const getHastaliklar = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem("hastaliklar");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === 0) {
          localStorage.setItem("hastaliklar", JSON.stringify(baslangicHastaliklar));
          return baslangicHastaliklar;
        }
        return parsed;
      }
      localStorage.setItem("hastaliklar", JSON.stringify(baslangicHastaliklar));
      return baslangicHastaliklar;
    } catch (error) {
      console.error("LocalStorage okuma hatası:", error);
      return baslangicHastaliklar;
    }
  }
  return baslangicHastaliklar;
};

// Başlangıç verilerini mevcut verilere ekle (tekrarları önleyerek)
export const addBaslangicHastaliklar = (mevcutHastaliklar) => {
  const mevcutHastalikAdlari = mevcutHastaliklar.map(h => h.ad.toLowerCase());
  const yeniHastaliklar = baslangicHastaliklar.filter(
    h => !mevcutHastalikAdlari.includes(h.ad.toLowerCase())
  );
  return [...mevcutHastaliklar, ...yeniHastaliklar];
};

// LocalStorage'ı başlangıç verileriyle sıfırla
export const resetHastaliklar = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("hastaliklar", JSON.stringify(baslangicHastaliklar));
  }
  return baslangicHastaliklar;
};

// Aktif dile göre hastalık listesini dönüştür (Translation Helper)
export const getHastaliklarByLang = (mevcutHastaliklar, lang) => {
  const diller = {
    tr: trHastaliklar,
    en: enHastaliklar,
    fr: frHastaliklar,
    ar: arHastaliklar
  };
  const hedefListe = diller[lang] || trHastaliklar;

  // Çevirilerin boş olması durumunda (geçici placeholders veya eksik yüklemelerde) Türkçe listeyi kullan
  if (!hedefListe || hedefListe.length === 0) {
    return mevcutHastaliklar;
  }

  return mevcutHastaliklar.map(h => {
    // Türkçe başlangıç listesinde bu hastalığın indeksini ara
    const idx = trHastaliklar.findIndex(item => item.ad.toLowerCase() === h.ad.toLowerCase());
    if (idx !== -1 && hedefListe[idx]) {
      return {
        ad: hedefListe[idx].ad || h.ad,
        ruhsalNedenler: hedefListe[idx].ruhsalNedenler || h.ruhsalNedenler
      };
    }
    // Eğer listede yoksa (kullanıcının sonradan eklediği yeniler), kendi değerlerini dön
    return h;
  });
};