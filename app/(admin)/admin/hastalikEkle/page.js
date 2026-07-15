// src/app/admin/hastalikEkle/page.js

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getHastaliklar, baslangicHastaliklar, addBaslangicHastaliklar, resetHastaliklar } from "@/utils/hastalik";

export default function HastalikEkle() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hastaliklar, setHastaliklar] = useState([]);
  const [search, setSearch] = useState("");
  const [newHastalik, setNewHastalik] = useState({ ad: "", ruhsalNedenler: "" });
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  // Sidebar menü
  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Kullanıcılar", href: "/admin/users", icon: "👥" },
    { name: "İçerikler", href: "/admin/blogyonet", icon: "📝" },
    { name: "Eğitimler", href: "/admin/courses", icon: "🎓" },
    { name: "MEGA CODES", href: "/admin/teknik", icon: "🌟" },
    { name: "Jean Adrinne", href: "/admin/jeanadrienne", icon: "🧘‍♀️" },
    { name: "Hastalık Düzenle", href: "/admin/hastalikEkle", icon: "🧘‍♀️" },
    { name: "Hizmet Düzenle", href: "/admin/hizmetEkle", icon: "🛍️" },
    { name: "Webinar", href: "/admin/weblogin", icon: "▶️" },
    { name: "Ayarlar", href: "/admin/settings", icon: "⚙️" },
  ];

  // ⚡ LocalStorage'dan yükle veya başlangıç verilerini kullan
  useEffect(() => {
    const storedHastaliklar = getHastaliklar();
    setHastaliklar(storedHastaliklar);
    setIsLoaded(true);
  }, []);

  // ⚡ Hastalık değişikliklerini localStorage'a kaydet
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("hastaliklar", JSON.stringify(hastaliklar));
    }
  }, [hastaliklar, isLoaded]);

  // Başlangıç verilerini mevcut verilere ekleme fonksiyonu
  const loadDefaultHastaliklar = () => {
    if (confirm("Başlangıç hastalık verilerini mevcut listeye eklemek istediğinize emin misiniz? Sadece yeni hastalıklar eklenecektir.")) {
      const yeniListe = addBaslangicHastaliklar(hastaliklar);
      setHastaliklar(yeniListe);
      
      // Kaç yeni hastalık eklendiğini göster
      const eklenenSayisi = yeniListe.length - hastaliklar.length;
      if (eklenenSayisi > 0) {
        alert(`${eklenenSayisi} yeni hastalık eklendi!`);
      } else {
        alert("Tüm başlangıç hastalıkları zaten listede mevcut.");
      }
    }
  };

  // LocalStorage'ı sıfırlama fonksiyonu
  const resetToDefault = () => {
    if (confirm("Tüm verileri sıfırlayıp başlangıç verilerine dönmek istediğinize emin misiniz? Bu işlem geri alınamaz!")) {
      const resetData = resetHastaliklar();
      setHastaliklar(resetData);
      alert("Veriler başlangıç durumuna sıfırlandı!");
    }
  };

  const filteredHastaliklar = hastaliklar.filter(h =>
    h.ad.toLowerCase().includes(search.toLowerCase())
  );

  const addHastalik = () => {
    if (!newHastalik.ad || !newHastalik.ruhsalNedenler) {
      alert("Lütfen hastalık adı ve ruhsal nedenleri giriniz.");
      return;
    }
    
    // Aynı isimde hastalık var mı kontrol et
    const hastalikVarMi = hastaliklar.some(
      h => h.ad.toLowerCase() === newHastalik.ad.toLowerCase()
    );
    
    if (hastalikVarMi) {
      alert("Bu isimde bir hastalık zaten mevcut!");
      return;
    }
    
    setHastaliklar(prev => [...prev, newHastalik]);
    setNewHastalik({ ad: "", ruhsalNedenler: "" });
  };

  const deleteHastalik = (ad) => {
    if (confirm("Bu hastalığı silmek istediğinize emin misiniz?")) {
      setHastaliklar(prev => prev.filter(h => h.ad !== ad));
    }
  };

  const updateHastalik = (index, field, value) => {
    const updated = [...hastaliklar];
    
    // Eğer ad değiştiriliyorsa ve bu isimde başka bir hastalık var mı kontrol et
    if (field === "ad") {
      const hastalikVarMi = hastaliklar.some(
        (h, i) => i !== index && h.ad.toLowerCase() === value.toLowerCase()
      );
      
      if (hastalikVarMi) {
        alert("Bu isimde bir hastalık zaten mevcut!");
        return;
      }
    }
    
    updated[index][field] = value;
    setHastaliklar(updated);
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
                    router.pathname === item.href || (item.href === "/admin/hastalikEkle") ? "active" : ""
                  }`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {sidebarOpen && <span className="nav-text">{item.name}</span>}
                </Link>
              </li>
            ))}
            <li>
              <button
                className="nav-link nav-exit-btn"
                onClick={() => router.push("/")}
              >
                <span className="nav-icon">🚪</span>
                {sidebarOpen && <span className="nav-text">Siteye Dön</span>}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Ana İçerik */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>Hastalık Yönetimi</h1>
          <div className="admin-actions">
            <Link href="/hastalik" className="site-view-btn">
              👁️ Hastalık Sayfasına Git
            </Link>
            <div className="admin-profile">
              <span>Admin</span>
              <div className="profile-avatar">A</div>
            </div>
          </div>
        </header>

        <div className="admin-content">
          {/* Kontrol Butonları */}
          <div className="control-bar">
            <div className="action-buttons">
              <button onClick={loadDefaultHastaliklar} className="btn-emerald">
                📥 Başlangıç Verilerini Ekle
              </button>
              <button onClick={resetToDefault} className="btn-amber">
                🔄 Sıfırla
              </button>
              <button
                onClick={() => {
                  if (confirm("Tüm hastalık verilerini silmek istediğinize emin misiniz?")) {
                    setHastaliklar([]);
                  }
                }}
                className="btn-rose"
              >
                🗑️ Tümünü Sil
              </button>
            </div>
            <span className="total-badge">
              Toplam: <strong>{hastaliklar.length}</strong> Hastalık
            </span>
          </div>

          {/* Arama Kutusu */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Hastalık adı ile hızlı ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Yeni Hastalık Ekleme Formu */}
          <div className="add-disease-card">
            <h2>➕ Yeni Hastalık Ekle</h2>
            <div className="form-group">
              <label>Hastalık Adı</label>
              <input
                type="text"
                placeholder="Örn: Migren, Boyun Fıtığı..."
                value={newHastalik.ad}
                onChange={(e) => setNewHastalik({ ...newHastalik, ad: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Ruhsal ve Duygusal Nedenleri</label>
              <textarea
                placeholder="Hastalığın ardındaki olası zihinsel/duygusal blokajlar..."
                value={newHastalik.ruhsalNedenler}
                onChange={(e) => setNewHastalik({ ...newHastalik, ruhsalNedenler: e.target.value })}
                rows={3}
              />
            </div>
            <button onClick={addHastalik} className="btn-add-submit">
              Hastalık Ekle
            </button>
          </div>

          {/* Hastalık Grid Listesi */}
          <div className="disease-grid">
            {filteredHastaliklar.map((h, index) => (
              <div key={index} className="disease-card">
                <div className="card-input-group">
                  <label>Hastalık Adı</label>
                  <input
                    type="text"
                    value={h.ad}
                    onChange={(e) => updateHastalik(index, "ad", e.target.value)}
                    className="disease-name-input"
                  />
                </div>
                <div className="card-input-group">
                  <label>Ruhsal Nedenler</label>
                  <textarea
                    value={h.ruhsalNedenler}
                    onChange={(e) => updateHastalik(index, "ruhsalNedenler", e.target.value)}
                    className="disease-desc-textarea"
                    rows={4}
                  />
                </div>
                <button
                  onClick={() => deleteHastalik(h.ad)}
                  className="btn-card-delete"
                >
                  SİL
                </button>
              </div>
            ))}

            {filteredHastaliklar.length === 0 && (
              <div className="empty-state">
                {search ? "🔍 Aradığınız isimde bir hastalık bulunamadı." : "📭 Henüz hiç hastalık eklenmemiş."}
              </div>
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        /* Global Body Stili: Üst boşluğu sıfırlar ve yumuşak lila/lavanta tonu dayatır */
        :global(body) {
          padding-top: 0 !important;
          background-color: #f7f5fa !important;
          font-family: 'Poppins', 'Inter', sans-serif !important;
          color: #4a3e56 !important;
          overflow-x: hidden;
        }

        .admin-container {
          display: flex;
          min-height: 100vh;
          background: #f7f5fa;
        }

        /* Sidebar - Lila/Mor Modern Gradyan */
        .admin-sidebar {
          width: 260px;
          background: linear-gradient(180deg, #7c3aed 0%, #a78bfa 100%);
          color: white;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          z-index: 50;
          box-shadow: 4px 0 15px rgba(124, 58, 237, 0.1);
        }

        .admin-sidebar.closed {
          width: 80px;
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          min-height: 80px;
        }

        .sidebar-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.5px;
          white-space: nowrap;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .toggle-sidebar {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
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
          background: white;
          color: #7c3aed;
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
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.3s ease;
          position: relative;
        }

        .sidebar-nav button.nav-link {
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          padding-left: 20px;
        }

        .nav-link.active {
          color: #7c3aed;
          background: #ffffff;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.15);
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

        .nav-exit-btn:hover {
          background: rgba(239, 68, 68, 0.2) !important;
          color: #fee2e2 !important;
        }

        /* Ana İçerik Alanı */
        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* Header - Temiz Açık Lila Cam Görünümü */
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
          height: 80px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(124, 58, 237, 0.08);
          box-shadow: 0 2px 10px rgba(124, 58, 237, 0.03);
        }

        .admin-header h1 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #4c1d95;
          letter-spacing: -0.5px;
        }

        .admin-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .site-view-btn {
          background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
          color: white;
          border-radius: 10px;
          padding: 8px 18px;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2);
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .site-view-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(124, 58, 237, 0.35);
          filter: brightness(1.05);
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-profile span {
          font-weight: 500;
          font-size: 0.95rem;
          color: #6b7280;
        }

        .profile-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          border: 2px solid white;
          box-shadow: 0 4px 10px rgba(124, 58, 237, 0.15);
        }

        /* İçerik Alanı */
        .admin-content {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }

        /* Kontrol Paneli Butonları */
        .control-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
        }

        .control-bar .action-buttons {
          display: flex;
          gap: 12px;
        }

        .control-bar button {
          padding: 10px 18px;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-emerald {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
        }
        .btn-emerald:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
        }

        .btn-amber {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);
        }
        .btn-amber:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(245, 158, 11, 0.3);
        }

        .btn-rose {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
        }
        .btn-rose:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
        }

        .total-badge {
          font-size: 0.95rem;
          color: #6b7280;
          background: white;
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid rgba(124, 58, 237, 0.08);
          box-shadow: 0 2px 6px rgba(124, 58, 237, 0.02);
        }

        /* Arama Kutusu */
        .search-bar {
          margin-bottom: 24px;
        }

        .search-bar input {
          width: 100%;
          max-width: 480px;
          padding: 12px 18px;
          border-radius: 12px;
          border: 1px solid rgba(124, 58, 237, 0.15);
          background: white;
          color: #4a3e56;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(124, 58, 237, 0.02);
        }

        .search-bar input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
        }

        /* Yeni Ekleme Kartı */
        .add-disease-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(124, 58, 237, 0.08);
          box-shadow: 0 8px 24px rgba(124, 58, 237, 0.04);
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .add-disease-card h2 {
          margin: 0 0 6px 0;
          font-size: 1.15rem;
          font-weight: 700;
          color: #4c1d95;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #6b7280;
        }

        .form-group input,
        .form-group textarea {
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid rgba(124, 58, 237, 0.15);
          outline: none;
          transition: all 0.3s;
          color: #4a3e56;
          font-size: 0.95rem;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
        }

        .btn-add-submit {
          align-self: flex-start;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 700;
          color: white;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.25);
          transition: all 0.3s;
        }

        .btn-add-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(124, 58, 237, 0.35);
          filter: brightness(1.05);
        }

        /* Hastalık Kartları Izgarası */
        .disease-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .disease-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(124, 58, 237, 0.08);
          box-shadow: 0 8px 20px rgba(124, 58, 237, 0.04);
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all 0.3s;
        }

        .disease-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(124, 58, 237, 0.08);
          border-color: rgba(124, 58, 237, 0.2);
        }

        .card-input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .card-input-group label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .disease-name-input {
          font-size: 1.05rem;
          font-weight: 700;
          color: #4c1d95;
          border: 1px solid transparent;
          border-bottom: 1px solid rgba(124, 58, 237, 0.1);
          padding: 4px 0;
          outline: none;
          transition: all 0.3s;
          background: transparent;
        }

        .disease-name-input:focus {
          border-bottom-color: #7c3aed;
          padding-left: 4px;
        }

        .disease-desc-textarea {
          font-size: 0.92rem;
          color: #5c4e6c;
          line-height: 1.5;
          border: 1px solid transparent;
          border-bottom: 1px solid rgba(124, 58, 237, 0.1);
          padding: 6px 0;
          outline: none;
          transition: all 0.3s;
          resize: vertical;
          background: transparent;
        }

        .disease-desc-textarea:focus {
          border-bottom-color: #7c3aed;
          padding-left: 4px;
        }

        .btn-card-delete {
          align-self: flex-end;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.06);
          border: 1px solid rgba(239, 68, 68, 0.1);
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-card-delete:hover {
          background: #ef4444;
          color: white;
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.2);
        }

        .empty-state {
          grid-column: span 3;
          text-align: center;
          padding: 40px;
          color: #9ca3af;
          background: white;
          border-radius: 16px;
          border: 1px dashed rgba(124, 58, 237, 0.2);
          font-size: 1rem;
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

          .control-bar {
            flex-direction: column;
            align-items: flex-start;
          }

          .control-bar .action-buttons {
            width: 100%;
            flex-direction: column;
          }

          .empty-state {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
}