// C:\Users\sifre\Desktop\mucizevigelisim\app\(site)\hastalik\page.js



"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang, AutoTranslate } from "../../../data/lang-sistem";
import { getHastaliklar, getHastaliklarByLang } from "../../../data/hastalik";

export default function HastalikPage() {
  const [search, setSearch] = useState("");
  const [rawHastaliklar, setRawHastaliklar] = useState([]);
  const { lang } = useLang();

  // LocalStorage'dan yükle
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("hastaliklar"));
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRawHastaliklar(stored);
    } else {
      const storedInit = getHastaliklar();
      setRawHastaliklar(storedInit);
    }
  }, []);

  // Aktif dile göre hastalık verilerini çevir
  const hastaliklar = useMemo(() => {
    return getHastaliklarByLang(rawHastaliklar, lang);
  }, [rawHastaliklar, lang]);

  // Filtreleme ve A-Z sıralama
  const filteredHastaliklar = useMemo(() => {
    return hastaliklar
      .filter((h) => h.ad.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.ad.localeCompare(b.ad));
  }, [search, hastaliklar]);

  return (
    <div className="page-container">
      <Header />

      <main className="main-content">
        {/* Sayfa Başlığı */}
        <div className="title-section">
          <AutoTranslate>
            <h1>Ruhsal ve Zihinsel Nedenler Sözlüğü</h1>
            <p>Hastalıkların ve fiziksel rahatsızlıkların ardındaki olası duygusal ve zihinsel blokajları keşfedin.</p>
          </AutoTranslate>
        </div>

        {/* Arama Kutusu */}
        <div className="search-section">
          <AutoTranslate>
            <input
              type="text"
              placeholder="Hastalık adı girin..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </AutoTranslate>
        </div>

        {/* Hastalık Kartları Grid */}
        <div className="disease-grid">
          {filteredHastaliklar.map((h, index) => (
            <div key={index} className="disease-card">
              <h2 className="disease-title">{h.ad}</h2>
              <p className="disease-desc">{h.ruhsalNedenler}</p>
              <span className="card-decor">🧘‍♀️</span>
            </div>
          ))}

          {filteredHastaliklar.length === 0 && (
            <div className="empty-state">
              <AutoTranslate>
                <p>Aradığınız hastalık bulunamadı.</p>
              </AutoTranslate>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style jsx>{`
        /* Üst boşluk hatasını gideren global body override */
        :global(body) {
          padding-top: 0 !important;
          background-color: #f7f5fa !important;
          font-family: 'Poppins', 'Inter', sans-serif !important;
          color: #4a3e56 !important;
        }

        .page-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #f7f5fa;
        }

        .main-content {
          flex-grow: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          width: 100%;
        }

        /* Sayfa Başlığı Bölümü */
        .title-section {
          text-align: center;
          margin-bottom: 40px;
        }

        .title-section h1 {
          font-size: 2.2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }

        .title-section p {
          font-size: 1.05rem;
          color: #7b6f84;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Arama Bölümü */
        .search-section {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }

        .search-section input {
          width: 100%;
          max-width: 500px;
          padding: 14px 20px;
          border-radius: 14px;
          border: 1px solid rgba(124, 58, 237, 0.15);
          background: white;
          color: #4a3e56;
          font-size: 1rem;
          outline: none;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.03);
          transition: all 0.3s;
        }

        .search-section input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.12);
        }

        /* Hastalık Kartları */
        .disease-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
        }

        .disease-card {
          background: white;
          border-radius: 18px;
          padding: 30px;
          border: 1px solid rgba(124, 58, 237, 0.08);
          box-shadow: 0 8px 24px rgba(124, 58, 237, 0.04);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .disease-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(124, 58, 237, 0.08);
          border-color: rgba(124, 58, 237, 0.2);
        }

        .disease-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #4c1d95;
          margin: 0 0 14px 0;
          border-bottom: 2px solid rgba(124, 58, 237, 0.08);
          padding-bottom: 8px;
          transition: all 0.3s;
        }

        .disease-card:hover .disease-title {
          border-bottom-color: #7c3aed;
        }

        .disease-desc {
          font-size: 0.95rem;
          color: #5c4e6c;
          line-height: 1.6;
          margin: 0;
          flex-grow: 1;
        }

        .card-decor {
          position: absolute;
          bottom: 15px;
          right: 15px;
          font-size: 2rem;
          opacity: 0.05;
          transition: all 0.3s;
          pointer-events: none;
        }

        .disease-card:hover .card-decor {
          opacity: 0.15;
          transform: scale(1.1) rotate(5deg);
        }

        .empty-state {
          grid-column: span 3;
          text-align: center;
          padding: 50px;
          color: #887e91;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .main-content {
            padding: 30px 15px;
          }

          .title-section h1 {
            font-size: 1.8rem;
          }

          .empty-state {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
}
