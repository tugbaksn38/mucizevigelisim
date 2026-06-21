// src/app/admin/settings/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Form State'leri
  const [siteName, setSiteName] = useState("Mucizevi Gelişim Dünyası");
  const [siteDesc, setSiteDesc] = useState("Hayatınızın haritasını birlikte çıkaralım ve potansiyelinizi uyandıralım.");
  const [contactEmail, setContactEmail] = useState("info@mucizevigelisim.com");
  const [contactPhone, setContactPhone] = useState("+90 555 123 45 67");
  const [instagramUrl, setInstagramUrl] = useState("https://instagram.com/mucizevigelisim");
  const [youtubeUrl, setYoutubeUrl] = useState("https://youtube.com/mucizevigelisim");
  const [defaultLang, setDefaultLang] = useState("tr");
  const [isSaving, setIsSaving] = useState(false);

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

  const goToSite = () => {
    router.push("/");
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("✅ Ayarlar başarıyla kaydedildi!");
    }, 1000);
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

      {/* Ana İçerik */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>Sistem Ayarları</h1>
          <div className="admin-actions">
            <button className="site-button" onClick={goToSite}>
              🌐 Siteye Dön
            </button>
            <div className="admin-profile">
              <span>Admin</span>
              <div className="profile-avatar">A</div>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <form onSubmit={handleSave} className="settings-form-container">
            {/* Genel Ayarlar Grubu */}
            <div className="settings-card">
              <h3>🌐 Genel Site Ayarları</h3>
              <div className="form-group">
                <label>Site Adı</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="Site başlığını girin"
                  required
                />
              </div>
              <div className="form-group">
                <label>Site Açıklaması (Slogan)</label>
                <textarea
                  value={siteDesc}
                  onChange={(e) => setSiteDesc(e.target.value)}
                  placeholder="Site açıklamasını girin"
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* İletişim Ayarları */}
            <div className="settings-card">
              <h3>📞 İletişim Bilgileri</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>E-posta Adresi</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="iletisim@siteniz.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Telefon Numarası</label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+90 5xx xxx xx xx"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Sosyal Medya */}
            <div className="settings-card">
              <h3>📱 Sosyal Medya Linkleri</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Instagram URL</label>
                  <input
                    type="url"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="https://instagram.com/kullaniciadi"
                  />
                </div>
                <div className="form-group">
                  <label>YouTube URL</label>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://youtube.com/kanal"
                  />
                </div>
              </div>
            </div>

            {/* Dil ve Tema */}
            <div className="settings-card">
              <h3>⚙️ Bölgesel ve Dil Ayarları</h3>
              <div className="form-group max-w-xs">
                <label>Varsayılan Dil</label>
                <select
                  value={defaultLang}
                  onChange={(e) => setDefaultLang(e.target.value)}
                >
                  <option value="tr">Türkçe (TR)</option>
                  <option value="en">English (EN)</option>
                  <option value="fr">Français (FR)</option>
                  <option value="ar">العربية (AR)</option>
                </select>
              </div>
            </div>

            {/* Kaydetme Butonu */}
            <div className="form-actions">
              <button type="submit" className="save-btn" disabled={isSaving}>
                <span>💾</span>
                {isSaving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <style jsx>{`
        :global(body) {
          padding-top: 0 !important;
          background-color: #080b11 !important;
          font-family: 'Poppins', 'Inter', sans-serif !important;
          color: #e2e8f0 !important;
          overflow-x: hidden;
        }

        .admin-container {
          display: flex;
          min-height: 100vh;
          background: radial-gradient(circle at 50% 50%, #0f172a 0%, #070a0f 100%);
          color: #f1f5f9;
        }

        /* Sidebar - Glassmorphism */
        .admin-sidebar {
          width: 260px;
          background: rgba(13, 18, 30, 0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          z-index: 50;
        }

        .admin-sidebar.closed {
          width: 80px;
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          min-height: 80px;
        }

        .sidebar-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        .toggle-sidebar {
          background: rgba(255, 255, 255, 0.03);
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
          background: rgba(168, 85, 247, 0.2);
          border-color: rgba(168, 85, 247, 0.4);
          color: #d8b4fe;
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
          color: #f1f5f9;
          background: rgba(255, 255, 255, 0.03);
          padding-left: 20px;
        }

        .nav-link.active {
          color: #ffffff;
          background: linear-gradient(90deg, rgba(168, 85, 247, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%);
          font-weight: 600;
          border: 1px solid rgba(168, 85, 247, 0.2);
        }

        .nav-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 15%;
          height: 70%;
          width: 4px;
          background: linear-gradient(180deg, #a855f7, #3b82f6);
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.8);
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

        /* Ana İçerik */
        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
          height: 80px;
          background: rgba(13, 18, 30, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .admin-header h1 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #f8fafc;
        }

        .admin-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .site-button {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
          border-radius: 10px;
          padding: 8px 18px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }

        .site-button:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-profile span {
          font-weight: 500;
          font-size: 0.95rem;
          color: #cbd5e1;
        }

        .profile-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        /* İçerik Alanı ve Form Elemanları */
        .admin-content {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }

        .settings-form-container {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .settings-card {
          background: rgba(22, 30, 49, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .settings-card h3 {
          margin: 0 0 20px 0;
          font-size: 1.15rem;
          font-weight: 700;
          color: #f1f5f9;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 12px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .form-group:last-child {
          margin-bottom: 0;
        }

        .form-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #94a3b8;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          background: rgba(13, 18, 30, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 12px 16px;
          color: #f8fafc;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          border-color: rgba(168, 85, 247, 0.6);
          background: rgba(13, 18, 30, 0.8);
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.2);
        }

        .form-group textarea {
          resize: vertical;
        }

        .max-w-xs {
          max-width: 320px;
        }

        /* Kaydet Butonu - Havalı Neon */
        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 10px;
        }

        .save-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          color: white;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
          box-shadow: 0 4px 20px rgba(168, 85, 247, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .save-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(168, 85, 247, 0.6);
          filter: brightness(1.1);
        }

        .save-btn:active {
          transform: translateY(-1px);
        }

        .save-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
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

          .form-grid {
            grid-template-columns: 1fr;
          }

          .settings-form-container {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
}
