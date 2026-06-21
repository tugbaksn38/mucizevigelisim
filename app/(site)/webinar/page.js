//src/app/webinar/page.js

"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Link from 'next/link';
import Image from 'next/image';


const fakeComments = [
  { user: "Ayşe", text: "Sunum harika gidiyor 👏" },
  { user: "Mehmet", text: "Bu konuya bayılıyorum!" },
  { user: "Zeynep", text: "PDF paylaşılacak mı?" },
  { user: "Ali", text: "Ses net geliyor mu size de?" },
];

export default function WebinarPage() {
  const [comments, setComments] = useState([...fakeComments]);
  const [newComment, setNewComment] = useState("");
  const [participantCount, setParticipantCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

useEffect(() => {
  const updateParticipantCount = () => {
    const stored = localStorage.getItem("webinarParticipantData");
    const now = new Date();
    const today20 = new Date();
    today20.setHours(20, 0, 0, 0);

    let newCount;

    if (stored) {
      const parsed = JSON.parse(stored);
      const lastUpdate = new Date(parsed.timestamp);

      if (now > today20 && lastUpdate < today20) {
        // Her gün 20:00'de yeni sayı
        newCount = Math.floor(Math.random() * 700) + 100;
        localStorage.setItem(
          "webinarParticipantData",
          JSON.stringify({ count: newCount, timestamp: now.toISOString() })
        );
      } else {
        newCount = JSON.parse(stored).count;
      }
    } else {
      newCount = Math.floor(Math.random() * 700) + 100;
      localStorage.setItem(
        "webinarParticipantData",
        JSON.stringify({ count: newCount, timestamp: now.toISOString() })
      );
    }

    // Animasyonla sayıyı arttır - YENİ YAVAŞ VERSİYON
    setParticipantCount(0); // sıfırdan başlat
    let current = 0;
    const target = newCount;
    
    // Daha uzun süre ve daha küçük adımlarla
    const duration = 8000; // 8 saniye sürsün
    const steps = 100; // 100 adımda tamamlansın
    const stepDuration = duration / steps;
    const baseIncrement = target / steps;

    const interval = setInterval(() => {
      // Çok daha küçük rastgele artış: 0 ile 3 arası
      const randomStep = Math.floor(Math.random() * 4);
      current += baseIncrement + randomStep;

      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setParticipantCount(Math.floor(current));
    }, stepDuration); // Her adım arası 80ms
  };

  updateParticipantCount();

  // Sonraki gün için kontrol
  const dailyInterval = setInterval(updateParticipantCount, 60 * 1000); // her dakika kontrol
  return () => clearInterval(dailyInterval);
}, []);


  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments((prev) => [...prev, { user: "Sen", text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Daralmış Header */}
      <header className="header-scrolled">
        <div className="header-single-row">
          <div className="logo-title-container">
            <div className="logo-container">
            <Image
  src="/img/logo.png"
  alt="Mucizevi Gelişim Logo"
  width={80}
  height={80}
  priority
  className="logo-img"
/>


            </div>
            <h1 className="site-title">MUCİZEVİ GELİŞİM</h1>
          </div>

          {/* Menü - yanyana */}
          <nav className={`desktop-menu ${isMenuOpen ? "active" : ""}`}>
            <ul>
              <li><Link href="/">Anasayfa</Link></li>
              <li><Link href="/hizmetler">Hizmetler</Link></li>
              <li><Link href="/egitimler">Eğitimlerim</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/numeroloji">Numeroloji</Link></li>
              <li><Link href="/webinar/login">WEBİNAR</Link></li>
              <li><Link href="/hakkimda">Hakkımda</Link></li>
              <li><Link href="/iletisim">İletişim</Link></li>
            </ul>
          </nav>

          {/* Hamburger Buton - Mobil */}
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Menüyü Aç/Kapat"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobil Menü */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}></div>
      <nav className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li><Link href="/">Anasayfa</Link></li>
          <li><Link href="/hizmetler">Hizmetler</Link></li>
          <li><Link href="/egitimler">Eğitimlerim</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/numeroloji">Numeroloji</Link></li>
          <li><Link href="/webinar/login">WEBİNAR</Link></li>
          <li><Link href="/hakkimda">Hakkımda</Link></li>
          <li><Link href="/iletisim">İletişim</Link></li>
        </ul>
      </nav>

      <div className="flex flex-1">
        {/* Video alanı */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Webinar Başladı 🎥</h1>
          <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center text-white">
            <p className="text-lg">[Kayıtlı video burada oynatılıyor]</p>
          </div>
          <p className="text-gray-600">Katılımcı sayısı: {participantCount}</p>
        </div>

        {/* Sohbet alanı */}
        <div className="w-1/3 border-l border-gray-300 p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Sohbet</h2>
          <div className="h-96 overflow-y-auto mb-4 bg-white p-2 rounded shadow">
            {comments.map((c, i) => (
              <div key={i} className="mb-2">
                <strong>{c.user}:</strong> <span>{c.text}</span>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Yorum yaz..."
              className="flex-1 px-3 py-2 border rounded-l"
            />
            <button
              onClick={handleCommentSubmit}
              className="px-4 bg-blue-600 text-white rounded-r"
            >
              Gönder
            </button>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .header-scrolled {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: linear-gradient(135deg, #74b4beff 0%, #74b4beff 100%);
          padding: 5px 20px;
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
        }

        .header-single-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 70px;
        }

        .logo-title-container {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .logo-img {
          width: 80px;
          height: auto;
          transition: all 0.4s ease;
        }

        .site-title {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          color: #322064ff;
        }

        .desktop-menu ul {
          display: flex;
          list-style: none;
          gap: 20px;
          margin: 0;
          padding: 0;
        }

        .desktop-menu a {
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          padding: 8px 12px;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .desktop-menu a:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          width: 40px;
          height: 30px;
          justify-content: space-between;
        }

        .hamburger span {
          height: 4px;
          width: 100%;
          background: white;
          border-radius: 3px;
          transition: all 0.4s ease;
        }

        /* Mobil için */
        @media (max-width: 968px) {
          .desktop-menu {
            display: none;
          }
          .hamburger {
            display: flex;
          }
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s ease;
        }

        .mobile-menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: -100%;
          width: 80%;
          max-width: 300px;
          height: 100%;
          background: #e4bedeff;
          z-index: 1000;
          padding: 25px;
          transition: left 0.4s ease;
          display: flex;
          flex-direction: column;
        }

        .mobile-menu.active {
          left: 0;
        }

        .mobile-menu ul {
          list-style: none;
          padding: 0;
        }

        .mobile-menu li {
          margin-bottom: 20px;
        }

        .mobile-menu a {
          color: white;
          text-decoration: none;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

