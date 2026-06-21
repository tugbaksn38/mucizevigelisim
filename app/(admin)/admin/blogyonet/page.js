// src/app/admin/blogyonet/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function BlogYonet() {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    type: "author",
    name: "",
    title: "",
    content: "",
    image: "",
    link: ""
  });

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

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [
      {
        id: 'zima',
        type: 'author',
        name: "Zima Mavisi",
        title: "Hikaye robot geliştiren bir kadının, havuzunu temizleyen robotu geliştirmek istemesiyle başlıyor.",
        link: "/basari/page",
        image: "/img/slider2.jpg"
      },
      {
        id: 'cakralar',
        type: 'author',
        name: "Çakralar",
        title: "Hindu gelenekleri ve bazı inanç sistemleri, insanda bulunan enerjiyi tüm vücuda dağıtan enerji noktalarını çakra olarak adlandırır.",
        link: "/cakralar/page",
        image: "/img/zima.jpg"
      },
      {
        id: 'okul',
        type: 'author',
        name: "Bilinçaltı",
        title: "Bu süreçlerden biri de 'bilinçaltı'dır. Bilinçaltı, bilinç hali dışında zihinsel durumların oluşması şeklinde tanımlanabilir.",
        link: "/bilincalti/page"
      }
    ];
    setBlogPosts(storedPosts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openAddModal = () => {
    setFormData({ id: "", type: "author", name: "", title: "", content: "", image: "", link: "" });
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const openEditModal = (post) => {
    setFormData({
      id: post.id,
      type: post.type,
      name: post.name,
      title: post.title,
      content: post.content || "",
      image: post.image || "",
      link: post.link || ""
    });
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const savePost = (e) => {
    e.preventDefault();
    const newPost = {
      id: formData.id || `post-${Date.now()}`,
      type: formData.type,
      name: formData.name,
      title: formData.title,
      content: formData.content,
      image: formData.image,
      link: formData.link
    };
    const updatedPosts = editingPost
      ? blogPosts.map(post => post.id === editingPost.id ? newPost : post)
      : [...blogPosts, newPost];

    setBlogPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    closeModal();
  };

  const deletePost = (id) => {
    if (confirm("Bu yazıyı silmek istediğinize emin misiniz?")) {
      const updatedPosts = blogPosts.filter(post => post.id !== id);
      setBlogPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    }
  };

  const goToSite = () => {
    router.push("/");
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
              <button className="nav-link nav-exit-btn" onClick={goToSite}>
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
          <h1>Blog Yazıları Yönetimi</h1>
          <div className="admin-actions">
            <button className="site-button" onClick={() => router.push('/blog')}>
              📝 Blog Sayfasına Git
            </button>
            <div className="admin-profile">
              <span>Admin</span>
              <div className="profile-avatar">A</div>
            </div>
          </div>
        </header>

        <div className="admin-content">
          {/* Üst İşlem Çubuğu */}
          <div className="control-bar">
            <button onClick={openAddModal} className="btn-add-post">
              ➕ Yeni Yazı Ekle
            </button>
            <span className="total-badge">
              Toplam: <strong>{blogPosts.length}</strong> Blog Yazısı
            </span>
          </div>

          {/* Blog Yazıları Izgarası */}
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <div key={post.id} className="blog-card">
                {post.image && (
                  <div className="card-image-wrapper">
                    <img src={post.image} alt={post.name} />
                  </div>
                )}
                <div className="card-body">
                  <h3 className="card-title">{post.name}</h3>
                  <p className="card-subtitle">{post.title}</p>
                  {post.link && <span className="card-link-badge">🔗 {post.link}</span>}
                </div>
                <div className="card-actions">
                  <button onClick={() => openEditModal(post)} className="btn-edit">
                    ✏️ Düzenle
                  </button>
                  <button onClick={() => deletePost(post.id)} className="btn-delete">
                    🗑️ Sil
                  </button>
                </div>
              </div>
            ))}

            {blogPosts.length === 0 && (
              <div className="empty-state">
                📭 Henüz hiç blog yazısı eklenmemiş. Yeni yazı ekleyerek başlayın.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal - Şık Koyu Cam Form */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingPost ? '📝 Yazıyı Düzenle' : '➕ Yeni Yazı Ekle'}</h3>
              <button onClick={closeModal} className="btn-close-modal">✕</button>
            </div>

            <form onSubmit={savePost} className="modal-form">
              <div className="form-group">
                <label>Yazar Adı / Kart Başlığı</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Yazar adı veya başlık girin"
                  required
                />
              </div>

              <div className="form-group">
                <label>Özet / Kart Açıklaması</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Yazı hakkında kısa özet bilgi"
                  required
                />
              </div>

              <div className="form-group">
                <label>Yazı İçeriği (Detay)</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Blog detay içeriği..."
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Kapak Görseli</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData((prev) => ({ ...prev, image: reader.result }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="file-input"
                />
                {formData.image && (
                  <div className="preview-image-box">
                    <img src={formData.image} alt="Önizleme" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Detay Sayfa Linki (İsteğe Bağlı)</label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  placeholder="Örn: /bilincalti/page"
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={closeModal} className="btn-cancel">
                  İptal
                </button>
                <button type="submit" className="btn-submit">
                  {editingPost ? 'Güncelle' : 'Yazıyı Yayınla'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

        /* Sidebar - Cam Efekti */
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

        .sidebar-nav button.nav-link {
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
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

        .nav-exit-btn:hover {
          background: rgba(239, 68, 68, 0.1) !important;
          color: #f87171 !important;
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
          font-weight: 600;
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

        .admin-content {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }

        /* Kontrol Barı */
        .control-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .btn-add-post {
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          color: white;
          font-weight: 700;
          padding: 12px 24px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
        }

        .btn-add-post:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(6, 182, 212, 0.45);
        }

        .total-badge {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 8px 16px;
          border-radius: 10px;
          color: #94a3b8;
        }

        /* Blog Grid */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 28px;
        }

        .blog-card {
          background: rgba(22, 30, 49, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.3s;
        }

        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(168, 85, 247, 0.1);
          border-color: rgba(168, 85, 247, 0.2);
        }

        .card-image-wrapper {
          height: 180px;
          overflow: hidden;
          position: relative;
        }

        .card-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .blog-card:hover .card-image-wrapper img {
          transform: scale(1.05);
        }

        .card-body {
          padding: 20px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #f8fafc;
          margin: 0;
        }

        .card-subtitle {
          font-size: 0.9rem;
          color: #94a3b8;
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-link-badge {
          display: inline-flex;
          align-self: flex-start;
          font-size: 0.8rem;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.1);
          padding: 4px 8px;
          border-radius: 6px;
          margin-top: auto;
        }

        .card-actions {
          padding: 16px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          background: rgba(13, 18, 30, 0.2);
        }

        .btn-edit,
        .btn-delete {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-edit {
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.1);
        }

        .btn-edit:hover {
          background: #38bdf8;
          color: white;
        }

        .btn-delete {
          color: #f87171;
          background: rgba(248, 113, 113, 0.1);
        }

        .btn-delete:hover {
          background: #f87171;
          color: white;
        }

        .empty-state {
          grid-column: span 3;
          text-align: center;
          padding: 50px;
          background: rgba(22, 30, 49, 0.2);
          border-radius: 18px;
          border: 1px dashed rgba(255, 255, 255, 0.1);
          color: #64748b;
        }

        /* Modal Backdrop */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 20px;
        }

        .modal-content {
          width: 100%;
          max-width: 600px;
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          max-height: 90vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 15px;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.25rem;
          color: #f8fafc;
        }

        .btn-close-modal {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 1.2rem;
          cursor: pointer;
        }

        .btn-close-modal:hover {
          color: white;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #94a3b8;
        }

        .form-group input,
        .form-group textarea {
          background: rgba(13, 18, 30, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 12px;
          color: white;
          outline: none;
          transition: all 0.3s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #06b6d4;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.2);
        }

        .file-input {
          cursor: pointer;
        }

        .preview-image-box {
          height: 120px;
          border-radius: 10px;
          overflow: hidden;
          margin-top: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .preview-image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 15px;
        }

        .btn-cancel,
        .btn-submit {
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-cancel {
          background: rgba(255, 255, 255, 0.05);
          color: #cbd5e1;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .btn-cancel:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .btn-submit {
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          color: white;
          border: none;
          box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
        }

        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(6, 182, 212, 0.45);
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
            gap: 12px;
          }

          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
