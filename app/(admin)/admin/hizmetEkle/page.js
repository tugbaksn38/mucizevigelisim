// src/app/admin/hizmetEkle/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getHizmetler, saveHizmetler, resetHizmetler, baslangicHizmetler } from "@/data/hizmet";

export default function HizmetEkle() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [hizmetler, setHizmetler] = useState([]);
    const [newHizmet, setNewHizmet] = useState({
        title: "",
        description: "",
        price: "",
        discountedPrice: "",
        url: "",
        image: "", // Base64 resim verisi
        stock: "",
        showcase: true
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [editingId, setEditingId] = useState(null);
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

    // ⚡ Verileri Yükle
    useEffect(() => {
        const list = getHizmetler();
        setHizmetler(list);
        setIsLoaded(true);
    }, []);

    // ⚡ Değişiklikleri Kaydet
    useEffect(() => {
        if (isLoaded) {
            saveHizmetler(hizmetler);
        }
    }, [hizmetler, isLoaded]);

    // Görsel Yükleme (Dosyayı Base64'e çevirir)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1.5 * 1024 * 1024) {
                alert("Görsel boyutu çok büyük! Lütfen 1.5MB'den küçük bir görsel yükleyin.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewHizmet(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Kart içindeki görseli değiştirme (Inline edit)
    const handleCardImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1.5 * 1024 * 1024) {
                alert("Görsel boyutu çok büyük! Lütfen 1.5MB'den küçük bir görsel yükleyin.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const updated = [...hizmetler];
                updated[index].media = [{ url: reader.result }];
                setHizmetler(updated);
            };
            reader.readAsDataURL(file);
        }
    };

    // Yeni Hizmet Ekleme
    const addHizmet = () => {
        if (!newHizmet.title || !newHizmet.description || !newHizmet.price) {
            alert("Lütfen Ürün Adı, Açıklama ve Fiyat alanlarını doldurunuz.");
            return;
        }

        const itemToAdd = {
            id: "hizmet-" + Date.now(),
            title: newHizmet.title,
            description: newHizmet.description,
            price: newHizmet.price,
            discountedPrice: newHizmet.discountedPrice || null,
            media: [
                {
                    url: newHizmet.image || "/placeholder-product.jpg"
                }
            ],
            url: newHizmet.url || "#",
            stock: newHizmet.stock === "" ? null : parseInt(newHizmet.stock, 10),
            showcase: newHizmet.showcase
        };

        setHizmetler(prev => [...prev, itemToAdd]);
        setNewHizmet({
            title: "",
            description: "",
            price: "",
            discountedPrice: "",
            url: "",
            image: "",
            stock: "",
            showcase: true
        });

        // File input elemanını temizlemek için
        const fileInput = document.getElementById("product-image-file");
        if (fileInput) fileInput.value = "";
    };

    // Hizmet Silme
    const deleteHizmet = (id) => {
        if (confirm("Bu hizmeti silmek istediğinize emin misiniz?")) {
            setHizmetler(prev => prev.filter(item => item.id !== id));
        }
    };

    // Mevcut Hizmet Güncelleme
    const updateHizmet = (index, field, value) => {
        const updated = [...hizmetler];
        updated[index][field] = value;
        setHizmetler(updated);
    };

    // Sıralama Değiştirme (Yukarı Taşı)
    const moveUp = (index) => {
        if (index === 0) return;
        const updated = [...hizmetler];
        const temp = updated[index];
        updated[index] = updated[index - 1];
        updated[index - 1] = temp;
        setHizmetler(updated);
    };

    // Sıralama Değiştirme (Aşağı Taşı)
    const moveDown = (index) => {
        if (index === hizmetler.length - 1) return;
        const updated = [...hizmetler];
        const temp = updated[index];
        updated[index] = updated[index + 1];
        updated[index + 1] = temp;
        setHizmetler(updated);
    };

    // Başlangıç verilerini ekleme
    const loadDefaultData = () => {
        if (confirm("Varsayılan başlangıç hizmetlerini listeye eklemek istiyor musunuz?")) {
            const merged = [...hizmetler];
            baslangicHizmetler.forEach(defItem => {
                if (!hizmetler.some(item => item.title.toLowerCase() === defItem.title.toLowerCase())) {
                    merged.push(defItem);
                }
            });
            setHizmetler(merged);
            alert("Başlangıç hizmetleri başarıyla eklendi.");
        }
    };

    // Tümünü Sıfırlama
    const resetToDefaults = () => {
        if (confirm("Tüm hizmetleri sıfırlayıp başlangıç durumuna dönmek istediğinize emin misiniz? Tüm özel eklediğiniz ürünler silinecektir!")) {
            const resetList = resetHizmetler();
            setHizmetler(resetList);
            alert("Hizmetler başlangıç durumuna sıfırlandı.");
        }
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
                                    className={`nav-link ${item.href === "/admin/hizmetEkle" ? "active" : ""
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
                    <h1>Hizmet (Ürün) Yönetimi</h1>
                    <div className="admin-actions">
                        <Link href="/hizmetler" className="site-view-btn">
                            👁️ Hizmetler Sayfasına Git
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
                            <button onClick={loadDefaultData} className="btn-emerald">
                                📥 Başlangıç Verilerini Ekle
                            </button>
                            <button onClick={resetToDefaults} className="btn-amber">
                                🔄 Sıfırla
                            </button>
                            <button
                                onClick={() => {
                                    if (confirm("Tüm hizmetleri silmek istediğinize emin misiniz?")) {
                                        setHizmetler([]);
                                    }
                                }}
                                className="btn-rose"
                            >
                                🗑️ Tümünü Sil
                            </button>
                        </div>
                        <span className="total-badge">
                            Toplam: <strong>{hizmetler.length}</strong> Hizmet / Ürün
                        </span>
                    </div>

                    {/* Yeni Hizmet Formu */}
                    <div className="add-service-card">
                        <h2>➕ Yeni Hizmet/Ürün Ekle</h2>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Hizmet (Ürün) Adı *</label>
                                <input
                                    type="text"
                                    placeholder="Örn: Kişisel Numeroloji Analizi"
                                    value={newHizmet.title}
                                    onChange={(e) => setNewHizmet({ ...newHizmet, title: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Fiyat (TL) *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Örn: 249.99"
                                    value={newHizmet.price}
                                    onChange={(e) => setNewHizmet({ ...newHizmet, price: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>İndirimli Fiyat (TL) (İsteğe Bağlı)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Örn: 199.99"
                                    value={newHizmet.discountedPrice}
                                    onChange={(e) => setNewHizmet({ ...newHizmet, discountedPrice: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Satın Alma (Shopier) Linki</label>
                                <input
                                    type="text"
                                    placeholder="Örn: https://www.shopier.com/123456"
                                    value={newHizmet.url}
                                    onChange={(e) => setNewHizmet({ ...newHizmet, url: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Stok Adeti (Boş = Sınırsız)</label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="Örn: 10"
                                    value={newHizmet.stock}
                                    onChange={(e) => setNewHizmet({ ...newHizmet, stock: e.target.value })}
                                />
                            </div>

                            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                <input
                                    type="checkbox"
                                    id="new-showcase"
                                    checked={newHizmet.showcase}
                                    onChange={(e) => setNewHizmet({ ...newHizmet, showcase: e.target.checked })}
                                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                />
                                <label htmlFor="new-showcase" style={{ cursor: 'pointer', userSelect: 'none', color: '#6b7280', fontSize: '0.9rem', fontWeight: 600 }}>Vitrinde Göster (Hizmetler Sayfasında Yayınla)</label>
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label>Açıklama *</label>
                            <textarea
                                placeholder="Hizmet detayları ve açıklamaları..."
                                value={newHizmet.description}
                                onChange={(e) => setNewHizmet({ ...newHizmet, description: e.target.value })}
                                rows={3}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Ürün Görseli</label>
                            <div className="file-upload-wrapper">
                                <input
                                    id="product-image-file"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {newHizmet.image && (
                                    <div className="preview-image-wrapper">
                                        <img src={newHizmet.image} alt="Önizleme" className="preview-img" />
                                        <button
                                            type="button"
                                            onClick={() => setNewHizmet(prev => ({ ...prev, image: "" }))}
                                            className="btn-remove-img"
                                        >
                                            Kaldır
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button onClick={addHizmet} className="btn-add-submit">
                            Hizmet Ekle
                        </button>
                    </div>

                    {/* Hizmet Listesi Grid */}
                    <h2>📦 Mevcut Hizmetler / Ürünler</h2>
                    <div className="service-grid">
                        {hizmetler.map((h, index) => {
                            // İndirim Yüzdesi Hesapla
                            const p = parseFloat(h.price);
                            const dp = parseFloat(h.discountedPrice);
                            const showDiscount = dp && p && dp < p;
                            const discountPercentage = showDiscount ? Math.round(((p - dp) / p) * 100) : 0;
                            const isEditing = editingId === h.id;

                            return (
                                <div key={h.id || index} className={`service-card ${isEditing ? "editing" : "collapsed"}`}>
                                    {showDiscount && (
                                        <div className="discount-tag">%{discountPercentage} İNDİRİM</div>
                                    )}

                                    {!isEditing ? (
                                        /* KAPALI (DAR) MOD - RESIMLER NORMAL BOYUTTA */
                                        <div className="card-collapsed-content">
                                            <div className="card-image-section">
                                                <img
                                                    src={h.media?.[0]?.url || "/placeholder-product.jpg"}
                                                    alt={h.title}
                                                    className="card-img"
                                                />
                                            </div>

                                            <div className="card-collapsed-info">
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                                                    <span className="order-badge-static">Sıra: #{index + 1}</span>
                                                    <span className="order-badge-static" style={{ background: '#fef3c7', color: '#d97706' }}>
                                                        Stok: {h.stock === null || h.stock === undefined ? "Sınırsız" : h.stock}
                                                    </span>
                                                    <label className="collapsed-showcase-toggle" style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        fontSize: '0.8rem',
                                                        fontWeight: 700,
                                                        background: h.showcase !== false ? '#d1fae5' : '#fee2e2',
                                                        color: h.showcase !== false ? '#065f46' : '#991b1b',
                                                        padding: '4px 8px',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        userSelect: 'none'
                                                    }}>
                                                        <input
                                                            type="checkbox"
                                                            checked={h.showcase !== false}
                                                            onChange={(e) => updateHizmet(index, "showcase", e.target.checked)}
                                                            style={{ cursor: 'pointer', width: '14px', height: '14px', margin: 0 }}
                                                        />
                                                        {h.showcase !== false ? "Vitrinde" : "Gizli 🚫"}
                                                    </label>
                                                </div>
                                                <h3 className="collapsed-title">{h.title}</h3>
                                                <p className="collapsed-desc">{h.description}</p>

                                                <div className="collapsed-details">
                                                    <div className="collapsed-detail-item">
                                                        <label>Fiyat</label>
                                                        <span>
                                                            {h.discountedPrice ? (
                                                                <>
                                                                    <span className="price-strike">{h.price} TL</span>{" "}
                                                                    <span className="price-current">{h.discountedPrice} TL</span>
                                                                </>
                                                            ) : (
                                                                <span className="price-current" style={{ color: '#ff85a2' }}>{h.price} TL</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                    {h.url && h.url !== "#" && (
                                                        <div className="collapsed-detail-item">
                                                            <label>Satın Alma Linki</label>
                                                            <a href={h.url} target="_blank" rel="noopener noreferrer" className="collapsed-link">Git 🔗</a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="collapsed-actions-footer">
                                                <button
                                                    onClick={() => setEditingId(h.id)}
                                                    className="btn-card-edit-full"
                                                >
                                                    ✏️ Güncelle (Düzenle)
                                                </button>
                                                <button
                                                    onClick={() => deleteHizmet(h.id)}
                                                    className="btn-card-delete-collapsed"
                                                >
                                                    🗑️ Sil
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* AÇIK (DÜZENLEME) MODU */
                                        <div className="card-expanded-content">
                                            <div className="card-order-controls">
                                                <span className="order-badge">Sıra: #{index + 1}</span>
                                                <div className="order-buttons">
                                                    <button
                                                        type="button"
                                                        onClick={() => moveUp(index)}
                                                        disabled={index === 0}
                                                        className="btn-order-move"
                                                        title="Yukarı Taşı"
                                                    >
                                                        ▲
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => moveDown(index)}
                                                        disabled={index === hizmetler.length - 1}
                                                        className="btn-order-move"
                                                        title="Aşağı Taşı"
                                                    >
                                                        ▼
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="card-image-section">
                                                <img
                                                    src={h.media?.[0]?.url || "/placeholder-product.jpg"}
                                                    alt={h.title}
                                                    className="card-img"
                                                />
                                                <div className="change-img-overlay">
                                                    <label htmlFor={`file-edit-${index}`} className="btn-change-img">Görseli Değiştir</label>
                                                    <input
                                                        id={`file-edit-${index}`}
                                                        type="file"
                                                        accept="image/*"
                                                        style={{ display: 'none' }}
                                                        onChange={(e) => handleCardImageChange(e, index)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="card-input-group">
                                                <label>Hizmet Adı</label>
                                                <input
                                                    type="text"
                                                    value={h.title}
                                                    onChange={(e) => updateHizmet(index, "title", e.target.value)}
                                                    className="service-title-input"
                                                />
                                            </div>

                                            <div className="card-input-group">
                                                <label>Açıklama</label>
                                                <textarea
                                                    value={h.description}
                                                    onChange={(e) => updateHizmet(index, "description", e.target.value)}
                                                    className="service-desc-input"
                                                    rows={3}
                                                />
                                            </div>

                                            <div className="price-inputs">
                                                <div className="card-input-group">
                                                    <label>Normal Fiyat (TL)</label>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={h.price || ""}
                                                        onChange={(e) => updateHizmet(index, "price", e.target.value)}
                                                        className="service-price-input"
                                                    />
                                                </div>
                                                <div className="card-input-group">
                                                    <label>İndirimli Fiyat (TL)</label>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={h.discountedPrice || ""}
                                                        placeholder="İndirim yok"
                                                        onChange={(e) => updateHizmet(index, "discountedPrice", e.target.value)}
                                                        className="service-price-input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="card-input-group">
                                                <label>Satın Alma URL'si</label>
                                                <input
                                                    type="text"
                                                    value={h.url || ""}
                                                    onChange={(e) => updateHizmet(index, "url", e.target.value)}
                                                    className="service-url-input"
                                                />
                                            </div>

                                            <div className="card-input-group">
                                                <label>Stok Adeti (Boş = Sınırsız)</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={h.stock === null || h.stock === undefined ? "" : h.stock}
                                                    placeholder="Sınırsız"
                                                    onChange={(e) => updateHizmet(index, "stock", e.target.value === "" ? null : parseInt(e.target.value, 10))}
                                                    className="service-url-input"
                                                />
                                            </div>

                                            <div className="card-input-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
                                                <input
                                                    type="checkbox"
                                                    id={`edit-showcase-${index}`}
                                                    checked={h.showcase !== false}
                                                    onChange={(e) => updateHizmet(index, "showcase", e.target.checked)}
                                                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                                />
                                                <label htmlFor={`edit-showcase-${index}`} style={{ cursor: 'pointer', userSelect: 'none', textTransform: 'none', letterSpacing: 'normal', color: '#4a3e56', fontSize: '0.9rem', fontWeight: 600 }}>Vitrinde Göster (Hizmetler Sayfasında Yayınla)</label>
                                            </div>

                                            <div className="card-edit-actions">
                                                <button
                                                    onClick={() => setEditingId(null)}
                                                    className="btn-card-close"
                                                >
                                                    ✓ Tamam (Kapat)
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        deleteHizmet(h.id);
                                                        setEditingId(null);
                                                    }}
                                                    className="btn-card-delete"
                                                >
                                                    Sil
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {hizmetler.length === 0 && (
                            <div className="empty-state">
                                📭 Henüz hiç hizmet eklenmemiş. "Başlangıç Verilerini Ekle" butonuyla varsayılan ürünleri yükleyebilirsiniz.
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <style jsx>{`
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

        .admin-content {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }

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

        .add-service-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(124, 58, 237, 0.08);
          box-shadow: 0 8px 24px rgba(124, 58, 237, 0.04);
          margin-bottom: 35px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .add-service-card h2 {
          margin: 0 0 6px 0;
          font-size: 1.15rem;
          font-weight: 700;
          color: #4c1d95;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
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
          background: #ffffff;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
        }

        .file-upload-wrapper {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .preview-image-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f5f3ff;
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid rgba(124, 58, 237, 0.1);
        }

        .preview-img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid rgba(124, 58, 237, 0.1);
        }

        .btn-remove-img {
          padding: 4px 10px;
          background: #fee2e2;
          color: #ef4444;
          border: 1px solid #fecaca;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .btn-remove-img:hover {
          background: #fca5a5;
          color: #b91c1c;
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

        /* Hizmet Kartları Izgarası */
        .service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 20px;
        }

        .service-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(124, 58, 237, 0.08);
          box-shadow: 0 8px 20px rgba(124, 58, 237, 0.04);
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(124, 58, 237, 0.08);
          border-color: rgba(124, 58, 237, 0.2);
        }

        .discount-tag {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #ef4444;
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          z-index: 10;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.25);
        }

        .card-image-section {
          position: relative;
          width: 100%;
          height: 180px;
          border-radius: 12px;
          overflow: hidden;
          background: #f5f3ff;
          border: 1px solid rgba(124, 58, 237, 0.05);
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .change-img-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .card-image-section:hover .change-img-overlay {
          opacity: 1;
        }

        .btn-change-img {
          background: white;
          color: #7c3aed;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .btn-change-img:hover {
          transform: scale(1.05);
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

        .service-title-input {
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

        .service-title-input:focus {
          border-bottom-color: #7c3aed;
          padding-left: 4px;
        }

        .service-desc-input {
          font-size: 0.9rem;
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

        .service-desc-input:focus {
          border-bottom-color: #7c3aed;
          padding-left: 4px;
        }

        .price-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .service-price-input {
          font-size: 0.95rem;
          font-weight: 600;
          color: #10b981;
          border: 1px solid transparent;
          border-bottom: 1px solid rgba(124, 58, 237, 0.1);
          padding: 4px 0;
          outline: none;
          transition: all 0.3s;
          background: transparent;
        }

        .service-price-input:focus {
          border-bottom-color: #7c3aed;
          padding-left: 4px;
        }

        .service-url-input {
          font-size: 0.85rem;
          color: #4b5563;
          border: 1px solid transparent;
          border-bottom: 1px solid rgba(124, 58, 237, 0.1);
          padding: 4px 0;
          outline: none;
          transition: all 0.3s;
          background: transparent;
        }

        .service-url-input:focus {
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
          grid-column: 1 / -1;
          text-align: center;
          padding: 40px;
          color: #9ca3af;
          background: white;
          border-radius: 16px;
          border: 1px dashed rgba(124, 58, 237, 0.2);
          font-size: 1rem;
        }

        .card-order-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f5f3ff;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid rgba(124, 58, 237, 0.1);
        }

        .order-badge {
          font-size: 0.85rem;
          font-weight: 700;
          color: #7c3aed;
        }

        .order-buttons {
          display: flex;
          gap: 6px;
        }

        .btn-order-move {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 1px solid rgba(124, 58, 237, 0.2);
          color: #7c3aed;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.75rem;
          transition: all 0.2s;
        }

        .btn-order-move:hover:not(:disabled) {
          background: #7c3aed;
          color: white;
          transform: translateY(-1px);
        }

        .btn-order-move:disabled {
          opacity: 0.4;
          cursor: not-allowed;
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
        }

        /* Daraltılmış/Açılmış Kart Stilleri */
        .card-collapsed-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
          height: 100%;
        }

        .card-collapsed-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .collapsed-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #4c1d95;
          margin: 10px 0 6px 0;
          line-height: 1.3;
        }

        .collapsed-desc {
          font-size: 0.85rem;
          color: #6b7280;
          line-height: 1.5;
          margin: 0 0 10px 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .collapsed-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: #fdfcff;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid rgba(124, 58, 237, 0.05);
          margin-bottom: 8px;
        }

        .collapsed-detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }

        .collapsed-detail-item label {
          font-weight: 600;
          color: #9ca3af;
        }

        .collapsed-detail-item span {
          font-weight: 600;
          color: #4a3e56;
        }

        .price-strike {
          text-decoration: line-through;
          color: #9ca3af;
          font-size: 0.8rem;
          margin-right: 4px;
        }

        .price-current {
          color: #10b981;
          font-weight: 700;
        }

        .collapsed-link {
          color: #7c3aed;
          text-decoration: none;
          font-weight: 600;
        }

        .collapsed-link:hover {
          text-decoration: underline;
        }

        .collapsed-actions-footer {
          display: flex;
          gap: 10px;
          margin-top: auto;
          padding-top: 10px;
          border-top: 1px solid rgba(124, 58, 237, 0.05);
        }

        .btn-card-edit-full {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 10px rgba(124, 58, 237, 0.15);
          text-align: center;
        }

        .btn-card-edit-full:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(124, 58, 237, 0.25);
        }

        .order-badge-static {
          font-size: 0.8rem;
          font-weight: 700;
          color: #7c3aed;
          background: #f5f3ff;
          padding: 4px 8px;
          border-radius: 6px;
          display: inline-block;
        }

        .card-expanded-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .card-edit-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(124, 58, 237, 0.08);
          padding-top: 14px;
          margin-top: 4px;
        }

        .btn-card-close {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 2px 6px rgba(16, 185, 129, 0.15);
        }

        .btn-card-close:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(16, 185, 129, 0.25);
        }

        .btn-card-delete-collapsed {
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 700;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.06);
          border: 1px solid rgba(239, 68, 68, 0.1);
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-card-delete-collapsed:hover {
          background: #ef4444;
          color: white;
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.15);
        }
      `}</style>
        </div>
    );
}
