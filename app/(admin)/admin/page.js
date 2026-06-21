// src/app/admin/page.js
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
//import { commitToGithub } from "../actions/github"; // ✅ commit fonksiyonu

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Kullanıcılar", href: "/admin/users", icon: "👥" },
    { name: "İçerikler", href: "/admin/blogyonet", icon: "📝" },
    { name: "Eğitimler", href: "/admin/courses", icon: "🎓" },
    { name: "MEGA CODES", href: "/admin/teknik", icon: "🌟" },
    { name: "Jean Adrinne", href: "/admin/jeanadrienne", icon: "🧘‍♀️" },
    { name: "Hastalık Düzenle", href: "/admin/hastalikEkle", icon: "🧘‍♀️" },
    { name: "Webinar", href: "/admin/weblogin", icon: "▶️" },
    { name: "Ayarlar", href: "/admin/settings", icon: "⚙️" },
  ];

  // Siteye dön butonu işlevi
  const goToSite = () => {
    router.push("/");
  };

  // ✅ Commit butonu işlevi
  const handleCommit = () => {
    startTransition(async () => {
      try {
        await commitToGithub({
          filePath: "data/test.txt",
          content: "Admin panelinden commit 🚀 " + new Date().toISOString(),
          message: "Admin panelinden commit",
        });
        alert("✅ Commit başarıyla gönderildi!");
      } catch (e) {
        alert("❌ Hata: " + e.message);
      }
    });
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          {sidebarOpen && <h2 className="sidebar-title">Admin Paneli</h2>}
          <button
            className="toggle-sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? "Menüyü Daralt" : "Menüyü Genişlet"}
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`nav-link ${
                    pathname === item.href ? "active" : ""
                  }`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {sidebarOpen && <span className="nav-text">{item.name}</span>}
                </Link>
              </li>
            ))}
            {/* Çıkış butonu */}
            <li>
              <Link
                href="/"
                className="nav-link nav-exit"
                onClick={(e) => {
                  e.preventDefault();
                  goToSite();
                }}
              >
                <span className="nav-icon">🚪</span>
                {sidebarOpen && <span className="nav-text">Siteye Dön</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Ana içerik alanı */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>Yönetim Paneli</h1>
          <div className="admin-actions">
            {/* Siteye Dön butonu */}
            <button
              className="site-button"
              onClick={goToSite}
              title="Siteye Dön"
            >
              🌐 Siteye Dön
            </button>

            <button className="btn-notification" title="Bildirimler">🔔</button>
            <div className="admin-profile">
              <span>Admin</span>
              <div className="profile-avatar">A</div>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <div className="dashboard-grid">
            {/* İstatistik kartları */}
            <div className="stat-card card-blue">
              <div className="stat-header">
                <h3>Toplam Kullanıcı</h3>
                <span className="stat-icon">👥</span>
              </div>
              <p className="stat-number">1,245</p>
              <span className="stat-trend trend-up">↑ 12% Bu ay</span>
            </div>

            <div className="stat-card card-purple">
              <div className="stat-header">
                <h3>Toplam Eğitim</h3>
                <span className="stat-icon">🎓</span>
              </div>
              <p className="stat-number">42</p>
              <span className="stat-trend trend-up">↑ 5% Bu hafta</span>
            </div>

            <div className="stat-card card-cyan">
              <div className="stat-header">
                <h3>Toplam Görüntüleme</h3>
                <span className="stat-icon">👁️</span>
              </div>
              <p className="stat-number">24,872</p>
              <span className="stat-trend trend-up">↑ 23% Düne göre</span>
            </div>

            <div className="stat-card card-pink">
              <div className="stat-header">
                <h3>Tamamlanan Dersler</h3>
                <span className="stat-icon">✅</span>
              </div>
              <p className="stat-number">3,541</p>
              <span className="stat-trend trend-up">↑ 8% Toplam</span>
            </div>

            {/* Son etkinlikler */}
            <div className="activity-card">
              <h3>Son Etkinlikler</h3>
              <ul className="activity-list">
                <li>
                  <span className="activity-icon icon-user">👤</span>
                  <div className="activity-details">
                    <p>Ahmet Yılmaz yeni bir hesap oluşturdu</p>
                    <span className="activity-time">2 dakika önce</span>
                  </div>
                </li>
                <li>
                  <span className="activity-icon icon-course">🎓</span>
                  <div className="activity-details">
                    <p>Biyoenerji 101 eğitimi güncellendi</p>
                    <span className="activity-time">15 dakika önce</span>
                  </div>
                </li>
                <li>
                  <span className="activity-icon icon-check">✅</span>
                  <div className="activity-details">
                    <p>Ayşe Kaya bir eğitimi tamamladı</p>
                    <span className="activity-time">1 saat önce</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Hızlı işlemler */}
            <div className="quick-actions">
              <h3>Hızlı İşlemler</h3>
              <div className="action-buttons">
                <button className="action-btn btn-cyan-neon">
                  <span className="action-btn-icon">➕</span>
                  Yeni İçerik Ekle
                </button>
                <button className="action-btn btn-pink-neon">
                  <span className="action-btn-icon">📧</span>
                  Toplu E-posta Gönder
                </button>
                <button className="action-btn btn-emerald-neon">
                  <span className="action-btn-icon">📊</span>
                  Rapor Al
                </button>

                {/* ✅ Yeni Commit Butonu */}
                <button
                  className="action-btn btn-amber-neon"
                  onClick={handleCommit}
                  disabled={isPending}
                >
                  <span className="action-btn-icon">⬆️</span>
                  {isPending ? "Commit atılıyor..." : "GitHub'a Commit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        /* Global override: Admin sayfasındayken body üst boşluğunu sıfırlar ve açık arka planı dayatır */
        :global(body) {
          padding-top: 0 !important;
          background-color: #f4f6f9 !important;
          font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          color: #1e293b !important;
          overflow-x: hidden;
        }

        .admin-container {
          display: flex;
          min-height: 100vh;
          background: #f4f6f9;
          color: #1e293b;
        }

        /* Sidebar - Zengin Gece Mavisi & Zümrüt Yeşili Gradyanı */
        .admin-sidebar {
          width: 260px;
          background: linear-gradient(180deg, #111827 0%, #065f46 100%);
          color: #e2e8f0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          z-index: 50;
          box-shadow: 4px 0 15px rgba(0, 0, 0, 0.05);
        }

        .admin-sidebar.closed {
          width: 80px;
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          min-height: 80px;
        }

        .sidebar-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          background: linear-gradient(135deg, #34d399 0%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        .toggle-sidebar {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          border-radius: 8px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .toggle-sidebar:hover {
          background: rgba(52, 211, 153, 0.2);
          border-color: rgba(52, 211, 153, 0.4);
          color: #a7f3d0;
          transform: scale(1.05);
        }

        .sidebar-nav {
          flex: 1;
          padding: 20px 12px;
        }

        .sidebar-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          color: #94a3b8;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.03);
          padding-left: 20px;
        }

        .nav-link.active {
          color: #ffffff;
          background: linear-gradient(90deg, rgba(52, 211, 153, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%);
          font-weight: 600;
          border: 1px solid rgba(52, 211, 153, 0.2);
        }

        .nav-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 15%;
          height: 70%;
          width: 4px;
          background: linear-gradient(180deg, #34d399, #3b82f6);
          box-shadow: 0 0 10px rgba(52, 211, 153, 0.8);
          border-radius: 0 4px 4px 0;
        }

        .nav-icon {
          margin-right: 14px;
          font-size: 1.3rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
        }

        .admin-sidebar.closed .nav-icon {
          margin-right: 0;
          width: 100%;
        }

        .nav-text {
          white-space: nowrap;
          font-size: 0.95rem;
        }

        .nav-exit:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.15);
        }

        /* Ana İçerik Alanı */
        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* Header - Yarı Şeffaf Beyaz Cam Panel */
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
          height: 80px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .admin-header h1 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.5px;
        }

        .admin-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        /* Siteye Dön Butonu - Açık Tema Cam Tasarım */
        .site-button {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: #475569;
          border-radius: 10px;
          padding: 8px 18px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
        }

        .site-button:hover {
          background: #f8fafc;
          border-color: rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .site-button:active {
          transform: translateY(0);
        }

        .btn-notification {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          width: 40px;
          height: 40px;
          border-radius: 10px;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          color: #64748b;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
        }

        .btn-notification:hover {
          background: #f8fafc;
          color: #334155;
          transform: scale(1.05);
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-profile span {
          font-weight: 600;
          font-size: 0.95rem;
          color: #475569;
        }

        .profile-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25);
          border: 2px solid white;
        }

        /* İçerik Alanı */
        .admin-content {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        /* İstatistik Kartları - Beyaz Cam Tasarımı */
        .stat-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(139, 92, 246, 0.08);
          box-shadow: 0 8px 20px rgba(139, 92, 246, 0.02);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .stat-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
        }

        .stat-card.card-blue::after { background: #3b82f6; }
        .stat-card.card-purple::after { background: #a855f7; }
        .stat-card.card-cyan::after { background: #06b6d4; }
        .stat-card.card-pink::after { background: #ec4899; }

        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(139, 92, 246, 0.08);
          border-color: rgba(139, 92, 246, 0.2);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .stat-header h3 {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-icon {
          font-size: 1.4rem;
          background: rgba(139, 92, 246, 0.05);
          border-radius: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(139, 92, 246, 0.1);
        }

        .stat-number {
          font-size: 2.25rem;
          font-weight: 800;
          margin: 0 0 10px 0;
          color: #1e293b;
          letter-spacing: -1px;
        }

        .stat-trend {
          font-weight: 700;
          font-size: 0.85rem;
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .trend-up {
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }

        /* Etkinlikler ve Hızlı İşlemler Kartları */
        .activity-card,
        .quick-actions {
          background: #ffffff;
          border-radius: 20px;
          padding: 28px;
          border: 1px solid rgba(139, 92, 246, 0.08);
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.03);
          grid-column: span 2;
        }

        .activity-card h3,
        .quick-actions h3 {
          margin: 0 0 20px 0;
          font-size: 1.2rem;
          font-weight: 800;
          color: #1e293b;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding-bottom: 12px;
        }

        /* Zaman Çizgili Son Etkinlikler */
        .activity-list {
          list-style: none;
          padding: 0;
          margin: 0;
          position: relative;
        }

        .activity-list::before {
          content: '';
          position: absolute;
          left: 19px;
          top: 10px;
          bottom: 10px;
          width: 2px;
          background: rgba(139, 92, 246, 0.1);
        }

        .activity-list li {
          display: flex;
          align-items: flex-start;
          padding: 16px 0;
          position: relative;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
          z-index: 10;
          border: 2px solid #ffffff;
          font-size: 1.1rem;
          box-shadow: 0 4px 10px rgba(139, 92, 246, 0.1);
        }

        .icon-user {
          background: rgba(139, 92, 246, 0.1);
          color: #7c3aed;
        }

        .icon-course {
          background: rgba(168, 85, 247, 0.1);
          color: #a855f7;
        }

        .icon-check {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .activity-details {
          flex: 1;
        }

        .activity-details p {
          margin: 0 0 4px 0;
          font-size: 0.95rem;
          color: #334155;
          font-weight: 600;
        }

        .activity-time {
          font-size: 0.8rem;
          color: #94a3b8;
        }

        /* Hızlı İşlemler Butonları - Tamamı Havalı Mor Neon */
        .action-buttons {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 20px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .action-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: 0.5s;
        }

        .action-btn:hover::before {
          left: 100%;
        }

        .action-btn:hover {
          transform: translateY(-3px);
          filter: brightness(1.05);
        }

        .action-btn:active {
          transform: translateY(-1px);
        }

        .action-btn-icon {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }

        .action-btn:hover .action-btn-icon {
          transform: scale(1.2) rotate(10deg);
        }

        /* Tüm Butonları Mor Neon Yapıyoruz */
        .btn-cyan-neon,
        .btn-pink-neon,
        .btn-emerald-neon,
        .btn-amber-neon {
          background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.25);
        }

        .btn-cyan-neon:hover,
        .btn-pink-neon:hover,
        .btn-emerald-neon:hover,
        .btn-amber-neon:hover {
          box-shadow: 0 8px 22px rgba(139, 92, 246, 0.4);
        }

        .action-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }

        /* Duyarlı Tasarım */
        @media (max-width: 1200px) {
          .dashboard-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            width: 80px;
          }

          .admin-sidebar.open {
            width: 260px;
            position: absolute;
            height: 100%;
            z-index: 100;
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .activity-card,
          .quick-actions {
            grid-column: span 1;
          }

          .action-buttons {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

    </div>
  );
}
