//src/app/webinar/login/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

export default function WebinarLogin() {
  const router = useRouter();
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    // Admin tarafından kaydedilen şifreleri al
    const stored = localStorage.getItem("webinarPasswords");
    if (stored) {
      try {
        setPasswords(JSON.parse(stored));
      } catch (e) {
        setPasswords([]);
      }
    }
  }, []);

  const handleLogin = () => {
    if (inputPassword.trim() === "") {
      setError("Lütfen giriş şifrenizi yazın.");
      return;
    }
    // Girilen şifrenin aktif şifreler listesinde olup olmadığını kontrol et
    if (passwords.includes(inputPassword.trim())) {
      localStorage.setItem("webinarAccess", "true");
      router.push("/webinar");
    } else {
      setError("Girdiğiniz şifre geçersiz veya süresi dolmuş!");
    }
  };

  return (
    <>
      <Header />
      <div className="webinar-login-container">

      <div className="login-card">
        <div className="brand-section">
          <div className="brand-icon">🎥</div>
          <h1>MUCİZEVİ GELİŞİM</h1>
          <p>Özel Canlı Yayın & Webinar Portalı</p>
        </div>

        <div className="form-section">
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Katılım Şifresi"
              value={inputPassword}
              onChange={(e) => {
                setInputPassword(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
              className="password-input"
            />
            <span className="input-icon">🔑</span>
          </div>

          <button onClick={handleLogin} className="btn-login">
            Yayına Katıl ➔
          </button>

          {error && (
            <div className="error-alert">
              <span className="error-icon">⚠️</span>
              <p className="error-text">{error}</p>
            </div>
          )}
        </div>

        <div className="card-footer">
          <p>Bu yayın şifrelidir. Giriş yapabilmek için lütfen webinar yöneticisinden edindiğiniz şifreyi giriniz.</p>
        </div>
      </div>

      <style jsx>{`
        .webinar-login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 80px);
          background: radial-gradient(circle at center, #1e1b4b 0%, #09090b 100%);
          font-family: 'Poppins', 'Inter', sans-serif;
          position: relative;
          padding: 80px 20px 20px 20px;
          overflow: hidden;
        }

        /* Dekoratif Arka Plan Işıkları */
        .webinar-login-container::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: rgba(124, 58, 237, 0.15);
          filter: blur(100px);
          border-radius: 50%;
          top: 15%;
          left: 15%;
          z-index: 1;
        }

        .webinar-login-container::after {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: rgba(236, 72, 153, 0.1);
          filter: blur(100px);
          border-radius: 50%;
          bottom: 15%;
          right: 15%;
          z-index: 1;
        }



        .login-card {
          width: 100%;
          max-width: 440px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          z-index: 5;
          display: flex;
          flex-direction: column;
          gap: 30px;
          animation: card-appear 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes card-appear {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .brand-section {
          text-align: center;
        }

        .brand-icon {
          font-size: 3rem;
          margin-bottom: 12px;
          animation: pulse-icon 2s infinite ease-in-out;
        }

        @keyframes pulse-icon {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .brand-section h1 {
          font-size: 1.6rem;
          font-weight: 800;
          color: white;
          margin: 0;
          letter-spacing: 1px;
          background: linear-gradient(135deg, #ffffff 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-section p {
          font-size: 0.9rem;
          color: #a1a1aa;
          margin: 6px 0 0 0;
          font-weight: 500;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input-wrapper {
          position: relative;
          width: 100%;
        }

        .password-input {
          width: 100%;
          padding: 14px 16px 14px 46px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          outline: none;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .password-input:focus {
          border-color: #8b5cf6;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.25);
        }

        .password-input::placeholder {
          color: #71717a;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.1rem;
          opacity: 0.7;
        }

        .btn-login {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #7c3aed 0%, #db2777 100%);
          color: white;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
        }

        .btn-login:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(124, 58, 237, 0.45);
          filter: brightness(1.05);
        }

        .btn-login:active {
          transform: translateY(0);
        }

        .error-alert {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 12px 16px;
          border-radius: 12px;
          animation: shake 0.4s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .error-icon {
          font-size: 1.1rem;
        }

        .error-text {
          font-size: 0.85rem;
          color: #fca5a5;
          margin: 0;
          line-height: 1.4;
          font-weight: 500;
        }

        .card-footer {
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 20px;
        }

        .card-footer p {
          font-size: 0.75rem;
          color: #71717a;
          margin: 0;
          line-height: 1.5;
        }
      `}</style>
    </div>
    </>
  );
}
