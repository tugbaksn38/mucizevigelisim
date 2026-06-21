// src/app/admin/weblogin/page.js
"use client";

import { useState } from "react";
import Link from "next/link";

export default function WebLoginAdmin() {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copied, setCopied] = useState(false); // Kopyalandı mesajı için

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$^*()";
    let pass = "";
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(pass);

    // Şifreyi localStorage'a kaydet
    localStorage.setItem("webinarPassword", pass);

    setCopied(false); // Yeni şifre üretildiğinde kopyalandı mesajını sıfırla
  };

  const copyToClipboard = () => {
    if (!generatedPassword) return;

    navigator.clipboard.writeText(generatedPassword).then(() => {
      setCopied(true);

      // Mesajı 2 saniye sonra gizle
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="webinar-container">
      {/* Geri Dönüş Linki */}
      <Link href="/admin" className="back-link">
        ← Admin Paneli'ne Dön
      </Link>

      <div className="webinar-card">
        <div className="card-header">
          <span className="card-icon">🔑</span>
          <h1>Webinar Şifre Üret</h1>
          <p>Webinar yayınları için tek kullanımlık veya kalıcı güvenli şifreler oluşturun.</p>
        </div>

        <button onClick={generatePassword} className="generate-btn">
          ✨ Yeni Şifre Üret
        </button>

        {generatedPassword && (
          <div className="password-display-box">
            <span className="box-label">Üretilen Şifre</span>
            <strong className="password-text">{generatedPassword}</strong>
            <button onClick={copyToClipboard} className={`copy-btn ${copied ? "copied" : ""}`}>
              {copied ? "✅ Kopyalandı!" : "📋 Kopyala"}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Global body overrides */
        :global(body) {
          padding-top: 0 !important;
          background-color: #080b11 !important;
          font-family: 'Poppins', 'Inter', sans-serif !important;
          color: #e2e8f0 !important;
          overflow: hidden;
        }

        .webinar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: radial-gradient(circle at 50% 50%, #0f172a 0%, #070a0f 100%);
          position: relative;
          padding: 20px;
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
        }

        .back-link:hover {
          color: #f8fafc;
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(-3px);
        }

        /* Cam kart */
        .webinar-card {
          width: 100%;
          max-width: 450px;
          background: rgba(22, 30, 49, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 40px 30px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .card-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 20px;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.15);
        }

        .card-header h1 {
          font-size: 1.6rem;
          font-weight: 700;
          color: #f8fafc;
          margin: 0;
        }

        .card-header p {
          font-size: 0.9rem;
          color: #94a3b8;
          margin: 0;
          line-height: 1.5;
        }

        /* Şifre Üretme Butonu - Neon */
        .generate-btn {
          width: 100%;
          padding: 14px 20px;
          font-size: 1rem;
          font-weight: 700;
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
          box-shadow: 0 4px 15px rgba(168, 85, 247, 0.35);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .generate-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(168, 85, 247, 0.5);
          filter: brightness(1.1);
        }

        .generate-btn:active {
          transform: translateY(-1px);
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
          position: relative;
        }

        .box-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .password-text {
          font-size: 1.4rem;
          color: #22d3ee;
          letter-spacing: 1px;
          word-break: break-all;
          text-shadow: 0 0 10px rgba(34, 211, 238, 0.2);
        }

        /* Kopyala Butonu - Neon Yeşil */
        .copy-btn {
          width: 100%;
          padding: 10px 20px;
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
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(16, 185, 129, 0.45);
        }

        .copy-btn.copied {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        @media (max-width: 480px) {
          .webinar-card {
            padding: 30px 20px;
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
