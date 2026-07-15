// C:\Users\sifre\Desktop\mucizevigelisim\data\hizmet.js

export const baslangicHizmetler = [
  {
    id: "hizmet-1",
    title: "Kişisel Numeroloji Analizi",
    description: "Doğum tarihinize ve tam isminize göre hazırlanan kapsamlı numeroloji analizi ile hayat yolculuğunuzu, kader sayınızı ve potansiyelinizi keşfedin.",
    price: "249.99",
    discountedPrice: "199.99",
    media: [
      {
        url: "https://cdn.shopier.app/pictures_large/gelisimokulu_3fa373ede19729a90366cfee62979caf.png"
      }
    ],
    url: "#"
  },
  {
    id: "hizmet-2",
    title: "Detaylı İsim Analizi",
    description: "İsminizin taşıdığı harflerin enerjisini, numerolojik değerlerini ve hayatınıza olan etkilerini inceleyen profesyonel analiz raporu.",
    price: "149.99",
    discountedPrice: null,
    media: [
      {
        url: "https://cdn.shopier.app/pictures_large/gelisimokulu_3fa373ede19729a90366cfee62979caf.png"
      }
    ],
    url: "#"
  },
  {
    id: "hizmet-3",
    title: "Jean Adrienne Arınma Sistemi (JAAS) Seansı",
    description: "Blokajlarınızı, bilinçaltı engellerinizi ve geçmişten gelen yüklerinizi arındırmaya yönelik birebir online JAAS seansı.",
    price: "450.00",
    discountedPrice: "399.99",
    media: [
      {
        url: "https://cdn.shopier.app/pictures_large/gelisimokulu_3fa373ede19729a90366cfee62979caf.png"
      }
    ],
    url: "#"
  },
  {
    id: "hizmet-4",
    title: "Hastalıkların Ruhsal ve Zihinsel Nedenleri Analizi",
    description: "Yaşadığınız fiziksel rahatsızlıkların temelinde yatan zihinsel inanç kalıplarını ve ruhsal sebepleri çözümleyen rehberlik çalışması.",
    price: "299.99",
    discountedPrice: "249.99",
    media: [
      {
        url: "https://cdn.shopier.app/pictures_large/gelisimokulu_3fa373ede19729a90366cfee62979caf.png"
      }
    ],
    url: "#"
  }
];

// LocalStorage'dan hizmetleri alır, yoksa başlangıç verilerini yazar
export const getHizmetler = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem("hizmetler");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === 0) {
          localStorage.setItem("hizmetler", JSON.stringify(baslangicHizmetler));
          return baslangicHizmetler;
        }
        return parsed;
      }
      localStorage.setItem("hizmetler", JSON.stringify(baslangicHizmetler));
      return baslangicHizmetler;
    } catch (error) {
      console.error("Hizmetler LocalStorage okuma hatası:", error);
      return baslangicHizmetler;
    }
  }
  return baslangicHizmetler;
};

// Hizmetler listesini LocalStorage'a kaydeder
export const saveHizmetler = (hizmetler) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem("hizmetler", JSON.stringify(hizmetler));
      return true;
    } catch (error) {
      console.error("Hizmetler LocalStorage yazma hatası:", error);
      return false;
    }
  }
  return false;
};

// LocalStorage'ı başlangıç verileriyle sıfırlar
export const resetHizmetler = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("hizmetler", JSON.stringify(baslangicHizmetler));
  }
  return baslangicHizmetler;
};
