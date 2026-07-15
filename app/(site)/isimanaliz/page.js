//src\app\isimanaliz\page.js
//src\app\isimanaliz\page.js

"use client";
import { useState, useRef, useEffect } from "react";
import { HARF_ACIKLAMALARI, HARF_SAYILARI } from "@/data/numeroloji/harfler";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import erkekIsimler from "../../../data/tum-isimler/erkek.json";
import kizIsimler from "../../../data/tum-isimler/kiz.json";
import unisexIsimler from "../../../data/tum-isimler/unisex.json";

// Çakra bilgilerini tanımlıyoruz
const CAKRA_BILGILERI = {
  1: { isim: "Kök Çakra", renk: "Kırmızı", anlam: "Güvenlik, temel ihtiyaçlar, topraklanma" },
  2: { isim: "Sakral Çakra", renk: "Turuncu", anlam: "Yaratıcılık, duygular, cinsellik" },
  3: { isim: "Solar Pleksus Çakrası", renk: "Sarı", anlam: "İrade gücü, özgüven, kişisel güç" },
  4: { isim: "Kalp Çakrası", renk: "Yeşil", anlam: "Sevgi, şefkat, bağlılık" },
  5: { isim: "Boğaz Çakrası", renk: "Mavi", anlam: "İletişim, ifade, dürüstlük" },
  6: { isim: "Üçüncü Göz Çakrası", renk: "Çivit Mavi", anlam: "Sezgi, içgörü, hayal gücü" },
  7: { isim: "Taç Çakra", renk: "Mor", anlam: "Spiritüellik, bütünlük, ilham" },
  8: { isim: "Aura", renk: "Altın", anlam: "Enerji alanı, koruma, manyetik alan" },
  9: { isim: "Ruh Çakrası", renk: "Şeffaf", anlam: "Evrensel bağ, yüksek bilinç" },
};

const getCakraColor = (sayi) => {
  switch (sayi) {
    case 1: return "#ef4444"; // red
    case 2: return "#f97316"; // orange
    case 3: return "#eab308"; // yellow
    case 4: return "#22c55e"; // green
    case 5: return "#3b82f6"; // blue
    case 6: return "#6366f1"; // indigo
    case 7: return "#a855f7"; // purple
    case 8: return "#d97706"; // amber
    case 9: return "#06b6d4"; // cyan
    default: return "#cccccc";
  }
};

export default function IsimAnaliz() {
  const [formData, setFormData] = useState({ ad: "", soyad: "" });
  const [cinsiyet, setCinsiyet] = useState("kiz");
  const [sonuc, setSonuc] = useState(null);
  const [araMetin, setAraMetin] = useState("");
  const [filtrelenmisIsimler, setFiltrelenmisIsimler] = useState([]);
  const oneriListRef = useRef(null);

  // Klavye olayları için ref
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.toUpperCase() });
  };

  const analizEt = () => {
    const tamIsim = (formData.ad + formData.soyad).replace(/\s+/g, "");
    const harfDizisi = tamIsim.split("").map((harf, i) => ({
      index: i + 1,
      harf,
      aciklama: HARF_ACIKLAMALARI[harf] || "Açıklama bulunamadı",
      sayi: HARF_SAYILARI[harf] || 0,
    }));

    // Sayısal değerler gruplanıyor (1-9 arası sayılar için)
    const sayiSayaci = {};
    for (let i = 1; i <= 9; i++) {
      sayiSayaci[i] = 0;
    }

    harfDizisi.forEach((h) => {
      if (h.sayi >= 1 && h.sayi <= 9) {
        sayiSayaci[h.sayi] = (sayiSayaci[h.sayi] || 0) + 1;
      }
    });

    // Çakra yorumları (0-2 Eksik, 3-6 Dengeli, 7+ Fazla)
    const cakraDurum = [];
    const eksikSayilar = [];
    for (let sayi = 1; sayi <= 9; sayi++) {
      const adet = sayiSayaci[sayi] || 0;
      let durum = "";
      if (adet === 0) {
        durum = "❌ Eksik";
        eksikSayilar.push(sayi);
      } else if (adet === 1) {
        durum = "⚠️ Zayıf";
      } else if (adet === 2) {
        durum = "✅ Dengeli";
      } else if (adet >= 3) {
        durum = "💪 Güçlü";
      }

      cakraDurum.push({ 
        sayi, 
        adet, 
        durum,
        ...CAKRA_BILGILERI[sayi]
      });
    }

    // Seçilen cinsiyete göre isim havuzunu belirle
    let isimHavuzu = [];
    let cinsiyetAdi = "";
    if (cinsiyet === "erkek") {
      isimHavuzu = erkekIsimler;
      cinsiyetAdi = "Erkek";
    } else if (cinsiyet === "kiz") {
      isimHavuzu = kizIsimler;
      cinsiyetAdi = "Kız";
    } else {
      isimHavuzu = unisexIsimler;
      cinsiyetAdi = "Unisex";
    }

    const onerilenIsimler = [];

    if (eksikSayilar.length > 0) {
      isimHavuzu.forEach((item) => {
        const isim = item.isim;
        const anlam = item.anlam;
        const isimHarfleri = isim.replace(/\s+/g, "").split("");
        const sayiDegerleri = isimHarfleri
          .map((char) => HARF_SAYILARI[char.toUpperCase()] || 0)
          .filter((val) => val > 0);
        
        const benzersizSayilar = [...new Set(sayiDegerleri)];
        
        const kapatilanlar = benzersizSayilar.filter((val) =>
          eksikSayilar.includes(val)
        );

        if (kapatilanlar.length > 0) {
          onerilenIsimler.push({
            isim,
            anlam,
            kapatilanlar,
            oran: kapatilanlar.length / eksikSayilar.length,
          });
        }
      });

      // Kapatma oranına göre büyükten küçüğe sırala
      onerilenIsimler.sort((a, b) => b.oran - a.oran);
    }

    setSonuc({ 
      harfDizisi, 
      cakraDurum, 
      eksikSayilar, 
      onerilenIsimler,
      cinsiyetAdi,
      toplamIsim: isimHavuzu.length 
    });
    setFiltrelenmisIsimler(onerilenIsimler);
    setAraMetin("");
  };

  // Arama fonksiyonu
  const handleAra = (e) => {
    const metin = e.target.value.toLowerCase();
    setAraMetin(metin);
    if (sonuc) {
      const filtrelenmis = sonuc.onerilenIsimler.filter(item => 
        item.isim.toLowerCase().includes(metin) || 
        item.anlam.toLowerCase().includes(metin)
      );
      setFiltrelenmisIsimler(filtrelenmis);
    }
  };

  // Klavye olayları
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (oneriListRef.current) {
          const scrollAmount = e.key === "ArrowDown" ? 100 : -100;
          oneriListRef.current.scrollBy({ top: scrollAmount, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 max-w-6xl mx-auto min-h-screen pt-16">
        {!sonuc && <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-800">İsim Analizi & İsim Öneri Motoru</h1>}

        {/* Dinamik Form Yapısı */}
        <div className={sonuc ? "form-row-container" : "form-card-container"}>
          <div className="form-group-horizontal">
            <div className="form-field">
              <label className="text-sm font-bold text-gray-700">Adınız:</label>
              <input
                type="text"
                name="ad"
                placeholder="Adınız"
                value={formData.ad}
                onChange={handleChange}
                className="border p-2 rounded-lg text-gray-800 w-full text-base"
                ref={inputRef}
              />
            </div>
            <div className="form-field">
              <label className="text-sm font-bold text-gray-700">Soyadınız:</label>
              <input
                type="text"
                name="soyad"
                placeholder="Soyadınız"
                value={formData.soyad}
                onChange={handleChange}
                className="border p-2 rounded-lg text-gray-800 w-full text-base"
              />
            </div>
            <div className="form-field">
              <label className="text-sm font-bold text-gray-700">Cinsiyet:</label>
              <select
                value={cinsiyet}
                onChange={(e) => setCinsiyet(e.target.value)}
                className="border p-2 rounded-lg text-gray-800 bg-white w-full text-base"
              >
                <option value="kiz">Kız</option>
                <option value="erkek">Erkek</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
            <button
              onClick={analizEt}
              className="bg-indigo-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md text-base whitespace-nowrap btn-submit"
            >
              Analiz Et & İsim Öner
            </button>
          </div>
        </div>

        {sonuc && (
          <div className="mt-6 space-y-6">
            
            {/* İki Bölümlü Layout (Sol: Excel Tablosu, Sağ: İsim Önerileri) */}
            <div className="analysis-grid">
              
              {/* SOL TARAF: Excel Çakra Dağılımı */}
              <div className="analysis-left">
                <div className="sayi-tablosu-container bg-white p-6 rounded-xl border border-gray-100 shadow-md h-full">
                  <h2 className="text-xl font-extrabold mb-1 text-gray-800">Kişisel Harf-Sayı Dağılımı Tablosu</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Harflerinizin sayısal frekans dağılımları Excel hücresi modeliyle boyanmıştır.
                  </p>
                  
                  {/* Excel Dikey Tablo */}
                  <div className="excel-table">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((sayi) => {
                      const cakra = sonuc.cakraDurum.find(c => c.sayi === sayi);
                      const adet = cakra ? cakra.adet : 0;
                      const maxSatir = 6; // Maksimum dikey boyama limiti
                      
                      return (
                        <div key={sayi} className="excel-column">
                          {Array.from({ length: maxSatir }).map((_, idx) => {
                            const satirIndex = maxSatir - idx;
                            const isFilled = adet >= satirIndex;
                            return (
                              <div 
                                key={idx} 
                                className={`excel-cell ${isFilled ? 'filled' : ''}`}
                                style={{
                                  backgroundColor: isFilled ? getCakraColor(sayi) : 'transparent'
                                }}
                              />
                            );
                          })}
                          <div 
                            className={`excel-header-cell ${adet <= 1 ? 'is-eksik' : ''} ${sayi === 3 ? 'is-cakra-3' : ''} ${sayi === 7 ? 'is-cakra-7' : ''}`}
                            style={{
                              '--cakra-color': getCakraColor(sayi),
                              borderColor: adet <= 1 ? getCakraColor(sayi) : 'transparent',
                              backgroundColor: adet <= 1 ? `${getCakraColor(sayi)}15` : 'transparent'
                            }}
                          >
                            <div className="excel-num">{sayi}</div>
                            <div className="excel-name text-[10px] font-bold text-gray-600 mt-1 uppercase">
                              {cakra ? cakra.isim.split(" ")[0] : ""}
                            </div>
                            <div className="excel-count text-[11px] text-gray-500 font-bold mt-1">{adet} Harf</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Eksik çakra uyarı bilgisi */}
                  {sonuc.eksikSayilar.length > 0 ? (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                      İsminizde <strong>{sonuc.eksikSayilar.join(", ")}</strong> numaralı çakra/harf değerleri eksiktir. Bu eksiklikleri gidermek için sağdaki isim önerilerini kullanabilirsiniz.
                    </div>
                  ) : (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                      Tebrikler! İsminizde tüm çakra sayı frekansları doludur, eksik harf bulunmamaktadır.
                    </div>
                  )}
                </div>
              </div>

              {/* SAĞ TARAF: Anlamlı İsim Önerileri */}
              <div className="analysis-right">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md h-full flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-xl font-extrabold text-gray-800">Numerolojik İsim Önerileri</h2>
                      <p className="text-sm text-gray-500">
                        {sonuc.cinsiyetAdi} isimleri arasından öneriler
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-indigo-600">
                        {sonuc.toplamIsim} {sonuc.cinsiyetAdi} ismi
                      </span>
                    </div>
                  </div>

                  {/* Arama Kutusu */}
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="🔍 İsim veya anlamda ara..."
                      value={araMetin}
                      onChange={handleAra}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  {/* İsim Sayısı Göstergesi */}
                  <div className="text-xs text-gray-500 mb-2">
                    {filtrelenmisIsimler.length} isim gösteriliyor
                    {araMetin && ` (Aranan: "${araMetin}")`}
                  </div>

                  <div 
                    ref={oneriListRef}
                    className="flex-1 overflow-y-auto max-h-90 space-y-3 pr-2"
                    style={{ maxHeight: '500px' }}
                  >
                    {sonuc.eksikSayilar.length === 0 ? (
                      <p className="text-green-600 text-sm font-bold">Karmik eksik harfiniz olmadığı için öneriye gerek yoktur.</p>
                    ) : filtrelenmisIsimler.length === 0 ? (
                      <p className="text-gray-400 italic text-sm">Aramanıza uygun isim bulunamadı.</p>
                    ) : (
                      filtrelenmisIsimler.map((item, idx) => {
                        const tamKapatir = item.oran === 1;
                        return (
                          <div 
                            key={idx} 
                            className={`p-3 rounded-lg border-2 transition-all text-sm ${
                              tamKapatir 
                                ? "bg-green-50 border-green-300" 
                                : "bg-indigo-50 border-indigo-200"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-base font-extrabold text-gray-800">{item.isim}</span>
                              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                                tamKapatir 
                                  ? "bg-green-200 text-green-800" 
                                  : "bg-indigo-200 text-indigo-800"
                              }`}>
                                {tamKapatir ? "Tam Tamamlayan" : `Kısmi (%${Math.round(item.oran * 100)})`}
                              </span>
                            </div>
                            <p className="text-gray-800 leading-relaxed">
                              <strong>Anlamı:</strong> {item.anlam}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {tamKapatir 
                                ? `Tüm eksiklerinizi (${item.kapatilanlar.join(", ")}) dengeler.`
                                : `Eksiklerinizden sadece (${item.kapatilanlar.join(", ")}) değerlerini kapatır.`
                              }
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Klavye kullanım ipucu */}
                  <div className="text-xs text-gray-400 mt-2 text-center border-t pt-2">
                    ⬆⬇ Ok tuşlarıyla kaydırın
                  </div>
                </div>
              </div>

            </div>

            {/* Alt Kısım: Detaylı Analiz & Kompakt Çakra Durumları */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md">
              <h2 className="text-2xl font-extrabold mb-3 border-b pb-2 text-gray-800">Çakra Durumu & Yorumlar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {sonuc.cakraDurum.map((c, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border flex justify-between items-center bg-gray-50 text-sm"
                  >
                    <div>
                      <div className="font-bold text-gray-800 text-sm">
                        {c.sayi}. Çakra ({c.isim.split(" ")[0]})
                      </div>
                      <div className="text-xs text-gray-500">{c.anlam}</div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        c.durum.includes("Eksik")
                          ? "bg-red-100 text-red-800"
                          : c.durum.includes("Zayıf")
                          ? "bg-yellow-100 text-yellow-800"
                          : c.durum.includes("Dengeli")
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {c.durum}
                      </span>
                      <div className="text-xs text-gray-400 mt-1">{c.adet} Harf</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold mb-3 border-b pb-2 text-gray-800">Detaylı Harf Analizi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sonuc.harfDizisi.map((h, i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm">
                    <p className="font-bold text-gray-800 text-base">{h.index}. Harf: {h.harf}</p>
                    <p className="text-gray-700 mt-1 leading-relaxed">{h.aciklama}</p>
                    <p className="text-indigo-600 mt-1 font-bold text-sm">Sayısal Değer: {h.sayi}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
      <Footer />

      {/* 🔹 STYLES */}
      <style jsx>{`
        .form-card-container {
          background: white;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid #eaeaea;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          margin-bottom: 24px;
          transition: all 0.3s ease;
        }
        .form-card-container .form-group-horizontal {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-card-container .form-field {
          display: flex;
          flex-direction: column;
        }
        .form-card-container input, .form-card-container select {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .form-row-container {
          background: white;
          padding: 12px 24px;
          border-radius: 12px;
          border: 1px solid #eaeaea;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin-bottom: 24px;
          position: sticky;
          top: 70px;
          z-index: 10;
          transition: all 0.3s ease;
        }
        .form-row-container .form-group-horizontal {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
        }
        .form-row-container .form-field {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .form-row-container input, .form-row-container select {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
        }
        .form-row-container button {
          height: 38px;
          white-space: nowrap;
          font-size: 15px;
        }

        .analysis-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 24px;
          align-items: stretch;
        }

        .excel-table {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          background: #fdfdfd;
          border: 1px solid #ddd;
          padding: 12px;
          border-radius: 8px;
          gap: 8px;
        }
        .excel-column {
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 4px;
        }
        .excel-cell {
          height: 25px;
          border: 1px solid #eee;
          border-radius: 3px;
          background-color: transparent;
          transition: all 0.3s ease;
        }
        .excel-cell.filled {
          border-color: rgba(0,0,0,0.05);
        }
        .excel-header-cell {
          margin-top: 8px;
          border-top: 1px solid #ddd;
          border-left: 1px solid transparent;
          border-right: 1px solid transparent;
          border-bottom: 1px solid transparent;
          padding: 8px 2px;
          text-align: center;
          min-height: 75px;
          border-radius: 6px;
          transition: all 0.3s ease;
        }
        .excel-header-cell.is-eksik {
          border: 2px solid var(--cakra-color);
        }

        
        .excel-num {
          font-size: 24px;
          font-weight: 800;
          color: #333;
        }

        /* Scrollbar Styling */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c4b5fd;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #8b5cf6;
        }

        @media (max-width: 1024px) {
          .analysis-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .form-row-container {
            position: static !important;
            margin-bottom: 16px;
          }
          .form-row-container .form-group-horizontal {
            flex-direction: column;
            align-items: stretch;
          }
          .form-row-container button {
            width: 100%;
            height: auto;
            padding: 10px;
          }
        }
      `}</style>
    </>
  );
}