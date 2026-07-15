// src/app/admin/weblogin/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function WebLoginAdmin() {
  const [passwords, setPasswords] = useState([]);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null); 
  const [newCopied, setNewCopied] = useState(false); 

  // Webinar Yayın Ayarları
  const [webinarSettings, setWebinarSettings] = useState({
    videoUrl: "",
    startTime: "",
    duration: 60
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Verileri yükle
  useEffect(() => {
    const storedPasswords = localStorage.getItem("webinarPasswords");
    if (storedPasswords) {
      try {
        setPasswords(JSON.parse(storedPasswords));
      } catch (e) {
        setPasswords([]);
      }
    }

    const storedSettings = localStorage.getItem("webinarSettings");
    if (storedSettings) {
      try {
        setWebinarSettings(JSON.parse(storedSettings));
      } catch (e) {}
    }
  }, []);

  // Şifre üret ve ekle
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let pass = "";
    for (let i = 0; i < 8; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    if (passwords.includes(pass)) {
      generatePassword();
      return;
    }

    const updated = [pass, ...passwords];
    setPasswords(updated);
    localStorage.setItem("webinarPasswords", JSON.stringify(updated));
    setGeneratedPassword(pass);
    setNewCopied(false);
  };

  // Tek şifre sil
  const deletePassword = (p) => {
    if (confirm("Bu şifreyi iptal etmek istediğinize emin misiniz? Bu şifreye sahip kullanıcı yayına giremeyecektir.")) {
      const updated = passwords.filter(item => item !== p);
      setPasswords(updated);
      localStorage.setItem("webinarPasswords", JSON.stringify(updated));
      if (generatedPassword === p) {
        setGeneratedPassword("");
      }
    }
  };

  // Tüm şifreleri sil
  const clearAllPasswords = () => {
    if (confirm("Tüm aktif şifreleri silmek istediğinize emin misiniz? Şu anki tüm katılımcı giriş yetkileri sonlandırılacaktır!")) {
      setPasswords([]);
      localStorage.setItem("webinarPasswords", JSON.stringify([]));
      setGeneratedPassword("");
    }
  };

  // Şifre kopyala
  const copyToClipboard = (text, index = null) => {
    navigator.clipboard.writeText(text).then(() => {
      if (index === null) {
        setNewCopied(true);
        setTimeout(() => setNewCopied(false), 2000);
      } else {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      }
    });
  };

  // Yayın ayarlarını kaydet
  const saveSettings = () => {
    localStorage.setItem("webinarSettings", JSON.stringify(webinarSettings));
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  return (
    <div className="webinar-container">
      {/* Geri Dönüş Linki */}
      <Link href="/admin" className="back-link">
        ← Admin Paneli'ne Dön
      </Link>

      <div className="webinar-card-wrapper">
        
        {/* Sol Kart: Şifre Yönetimi */}
        <div className="webinar-card">
          <div className="card-header">
            <span className="card-icon">🔑</span>
            <h1>Webinar Şifre Yönetimi</h1>
            <p>Katılımcılar için giriş şifreleri üretin ve silin.</p>
          </div>

          <button onClick={generatePassword} className="generate-btn">
            ✨ Yeni Katılımcı Şifresi Üret
          </button>

          {generatedPassword && (
            <div className="password-display-box">
              <span className="box-label">Son Üretilen Şifre</span>
              <strong className="password-text">{generatedPassword}</strong>
              <button 
                onClick={() => copyToClipboard(generatedPassword)} 
                className={`copy-btn ${newCopied ? "copied" : ""}`}
              >
                {newCopied ? "✅ Kopyalandı!" : "📋 Kopyala (Kullanıcıya Gönder)"}
              </button>
            </div>
          )}
        </div>

        {/* Sağ Kart: Yayın & Video Ayarları */}
        <div className="webinar-card">
          <div className="card-header">
            <span className="card-icon">📺</span>
            <h1>Yayın & Video Ayarları</h1>
            <p>Webinar yayın videosunu, başlangıç zamanını ve süresini belirleyin.</p>
          </div>

          <div className="settings-form">
            <div className="form-group-custom">
              <label>Yayın Videosu URL (YouTube / Vimeo veya Video Linki)</label>
              <input
                type="text"
                placeholder="Örn: https://www.youtube.com/watch?v=..."
                value={webinarSettings.videoUrl}
                onChange={(e) => setWebinarSettings({ ...webinarSettings, videoUrl: e.target.value })}
                className="form-input-dark"
              />
            </div>

            <div className="form-group-custom">
              <label>Başlangıç Tarihi & Saati</label>
              <input
                type="datetime-local"
                value={webinarSettings.startTime}
                onChange={(e) => setWebinarSettings({ ...webinarSettings, startTime: e.target.value })}
                className="form-input-dark"
              />
            </div>

            <div className="form-group-custom">
              <label>Yayın Süresi (Dakika)</label>
              <input
                type="number"
                min="1"
                value={webinarSettings.duration}
                onChange={(e) => setWebinarSettings({ ...webinarSettings, duration: parseInt(e.target.value, 10) || 0 })}
                className="form-input-dark"
              />
            </div>

            <button onClick={saveSettings} className={`save-settings-btn ${settingsSaved ? "saved" : ""}`}>
              {settingsSaved ? "✅ Ayarlar Kaydedildi!" : "💾 Yayın Ayarlarını Kaydet"}
            </button>
          </div>
        </div>

        {/* Alt Bölüm: Aktif Şifreler Listesi */}
        <div className="webinar-list-card">
          <div className="list-header">
            <h2>Aktif Katılımcı Şifreleri ({passwords.length})</h2>
            {passwords.length > 0 && (
              <button onClick={clearAllPasswords} className="btn-clear-all">
                🗑️ Tümünü Temizle
              </button>
            )}
          </div>

          <div className="passwords-table-wrapper">
            {passwords.length > 0 ? (
              <table className="passwords-table">
                <thead>
                  <tr>
                    <th>Sıra</th>
                    <th>Giriş Şifresi</th>
                    <th style={{ textAlign: "right" }}>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {passwords.map((p, idx) => (
                    <tr key={p}>
                      <td>#{passwords.length - idx}</td>
                      <td>
                        <code className="password-code">{p}</code>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="table-actions">
                          <button 
                            onClick={() => copyToClipboard(p, idx)} 
                            className={`btn-table-copy ${copiedIndex === idx ? "copied" : ""}`}
                          >
                            {copiedIndex === idx ? "Kopyalandı" : "Kopyala"}
                          </button>
                          <button 
                            onClick={() => deletePassword(p)} 
                            className="btn-table-delete"
                          >
                            İptal Et
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                📭 Henüz üretilmiş aktif bir şifre bulunmuyor. Sol taraftaki butondan yeni şifre oluşturabilirsiniz.
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(body) {
          padding-top: 0 !important;
          background-color: #080b11 !important;
          font-family: 'Poppins', 'Inter', sans-serif !important;
          color: #e2e8f0 !important;
          overflow-y: auto !important;
        }

        .webinar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          min-height: 100vh;
          background: radial-gradient(circle at 50% 50%, #0f172a 0%, #070a0f 100%);
          position: relative;
          padding: 80px 20px 40px 20px;
        }

        .back-link {
          position: absolute;
          top: 30px;
          left: 30px;
          color: #94a3b8;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          z-index: 20;
        }

        .back-link:hover {
          color: #f8fafc;
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(-3px);
        }

        .webinar-card-wrapper {
          width: 100%;
          max-width: 960px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          z-index: 5;
        }

        /* Cam kart */
        .webinar-card, .webinar-list-card {
          width: 100%;
          background: rgba(22, 30, 49, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 35px 30px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .webinar-list-card {
          grid-column: 1 / -1;
        }

        .card-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
        }

        .card-icon {
          font-size: 2.2rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 65px;
          height: 65px;
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 20px;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.15);
        }

        .card-header h1 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #f8fafc;
          margin: 0;
        }

        .card-header p {
          font-size: 0.85rem;
          color: #94a3b8;
          margin: 0;
          line-height: 1.5;
        }

        /* Şifre Üretme Butonu */
        .generate-btn {
          width: 100%;
          padding: 13px 20px;
          font-size: 0.95rem;
          font-weight: 700;
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
          box-shadow: 0 4px 15px rgba(168, 85, 247, 0.35);
          transition: all 0.3s;
        }

        .generate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(168, 85, 247, 0.5);
          filter: brightness(1.1);
        }

        /* Şifre Gösterim Kutusu */
        .password-display-box {
          background: rgba(13, 18, 30, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .box-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .password-text {
          font-size: 1.5rem;
          color: #22d3ee;
          letter-spacing: 1px;
          word-break: break-all;
          text-shadow: 0 0 10px rgba(34, 211, 238, 0.2);
        }

        .copy-btn {
          width: 100%;
          padding: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          transition: all 0.3s;
        }

        .copy-btn:hover {
          transform: translateY(-1px);
        }

        .copy-btn.copied {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        }

        /* Form Stilleri */
        .settings-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-align: left;
        }

        .form-group-custom {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group-custom label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #94a3b8;
        }

        .form-input-dark {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(13, 18, 30, 0.6);
          color: white;
          outline: none;
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        .form-input-dark:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .save-settings-btn {
          width: 100%;
          padding: 13px 20px;
          font-size: 0.95rem;
          font-weight: 700;
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
          transition: all 0.3s;
          margin-top: 10px;
        }

        .save-settings-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(16, 185, 129, 0.45);
        }

        .save-settings-btn.saved {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
        }

        /* Liste Bölümü */
        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .list-header h2 {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0;
          color: #f8fafc;
        }

        .btn-clear-all {
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #f87171;
          background: rgba(248, 113, 113, 0.08);
          border: 1px solid rgba(248, 113, 113, 0.15);
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-clear-all:hover {
          background: #ef4444;
          color: white;
        }

        .passwords-table-wrapper {
          background: rgba(13, 18, 30, 0.3);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.04);
          overflow: hidden;
        }

        .passwords-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.9rem;
        }

        .passwords-table th {
          background: rgba(255, 255, 255, 0.03);
          padding: 12px 16px;
          font-weight: 600;
          color: #64748b;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .passwords-table td {
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          color: #e2e8f0;
          vertical-align: middle;
        }

        .password-code {
          font-family: monospace;
          background: rgba(255, 255, 255, 0.06);
          padding: 4px 8px;
          border-radius: 6px;
          color: #38bdf8;
          font-size: 1rem;
        }

        .table-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }

        .btn-table-copy, .btn-table-delete {
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }

        .btn-table-copy {
          background: #38bdf8;
          color: #0f172a;
        }

        .btn-table-copy:hover {
          background: #0ea5e9;
        }

        .btn-table-copy.copied {
          background: #10b981;
          color: white;
        }

        .btn-table-delete {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .btn-table-delete:hover {
          background: #ef4444;
          color: white;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #64748b;
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .webinar-card-wrapper {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .webinar-container {
            padding-top: 100px;
          }
          .webinar-card, .webinar-list-card {
            padding: 25px 20px;
          }
          .back-link {
            top: 20px;
            left: 20px;
          }
        }
      `}</style>
    </div>
  );
}
