//src/app/admin/jeanadrienne/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { generateNumerologyEmail } from "@/data/jean/JeanEmail";
import { getJeanContent } from "@/data/jean/JeanDosyalar";
import "./jeanadrienne.css";

export default function JeanAdriennePage() {
  const [form, setForm] = useState({ name: "", email: "", seans: "", konu: "" });
  const [customMessage, setCustomMessage] = useState("");
  const [sendingClient, setSendingClient] = useState(false);
  const [message, setMessage] = useState("");
  const [parsedResults, setParsedResults] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const parseSeans = (seans) => {
    const results = [];
    const chars = seans.split("");

    for (let i = 0; i < chars.length; i += 2) {
      const file = chars[i];
      const line = chars[i + 1];
      if (file && line) {
        results.push(getJeanContent(file, line));
      }
    }
    return results;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    const results = parseSeans(form.seans);
    if (results.length === 0) {
      setMessage("Hata: Geçersiz veya boş seans kodu girdiniz ❌");
      setParsedResults([]);
    } else {
      // En başa "Konu" bilgisini ekliyoruz
      const finalResults = [
        { fileName: "Konu", line: "Genel", text: form.konu },
        ...results
      ];
      setParsedResults(finalResults);
    }
  };

  const handleSendMail = async () => {
    setSendingClient(true);
    setMessage("");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_JEAN_SERVICE,
        process.env.NEXT_PUBLIC_JEAN_TEMPLATE,
        {
          from_name: "Jean Adrienne Sistemi",
          to_name: form.name,
          to_email: form.email,
          message: generateNumerologyEmail({ 
            name: form.name, 
            results: parsedResults, 
            konu: form.konu, 
            customMessage: customMessage 
          }),
        },
        process.env.NEXT_PUBLIC_JEAN_KEY
      );

      setMessage(`Mail başarıyla danışana (${form.email}) gönderildi ✅`);
    } catch (error) {
      console.error("EmailJS error details:", error?.text || error?.message || error);
      const errMsg = error?.text || error?.message || "Bağlantı hatası veya geçersiz parametreler";
      setMessage(`Mail gönderme hatası: ${errMsg} ❌`);
    } finally {
      setSendingClient(false);
    }
  };

  return (
    <div className="jean-container">
      {/* Geri Dönüş Linki */}
      <Link href="/admin" className="back-link">
        ← Admin Paneli'ne Dön
      </Link>

      <div className="jean-card-wrapper">
        
        {/* Sol Kolon: Form */}
        <div className="jean-card">
          <div className="card-header">
            <span className="card-icon">🧘‍♀️</span>
            <h1>Jean Adrienne Seansı</h1>
            <p>Danışan bilgileri, seans konusu ve seans kodunu girerek çözümleme yapın.</p>
          </div>

          <form onSubmit={handleSubmit} className="jean-form">
            <div className="form-group">
              <label>Danışan Adı Soyadı</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ad ve Soyad girin"
                required
              />
            </div>

            <div className="form-group">
              <label>E-posta Adresi</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ornek@eposta.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Seans Konusu</label>
              <input
                type="text"
                name="konu"
                value={form.konu}
                onChange={handleChange}
                placeholder="Örn: Bolluk Bereket, İlişki Şifası"
                required
              />
            </div>

            <div className="form-group">
              <label>Seans Kodu</label>
              <input
                type="text"
                name="seans"
                value={form.seans}
                onChange={handleChange}
                placeholder="Örn: 133245"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              🔮 Seansı Çözümle & Sonuçları Göster
            </button>
          </form>

          {message && !parsedResults.length && (
            <p className="message error">
              {message}
            </p>
          )}
        </div>

        {/* Sağ Kolon: Sonuçlar & Mail Butonları */}
        {parsedResults.length > 0 ? (
          <div className="results-card">
            <h2>🔮 Seans Çözümleme Sonuçları</h2>
            <ul>
              {parsedResults.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.fileName}{item.line && item.line !== "Genel" ? ` - Satır ${item.line}` : ""}:</strong> {item.text}
                </li>
              ))}
            </ul>

            {/* Danışana Gönderilecek Özel Mesaj Alanı */}
            <div className="form-group" style={{ marginTop: '15px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: '600', color: '#6b5c73' }}>
                Danışana Özel Mesaj/Not Yaz (İsteğe Bağlı)
              </label>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Danışanınıza iletmek istediğiniz özel açıklamayı veya notu yazın..."
                rows="3"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(236, 72, 153, 0.18)',
                  outline: 'none',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  color: '#4a3854',
                  backgroundColor: '#fff'
                }}
              />
            </div>

            <div className="mail-actions-group">
              <button 
                onClick={handleSendMail} 
                className="mail-btn btn-send-client"
                disabled={sendingClient}
              >
                {sendingClient ? "📨 Danışana Gönderiliyor..." : `✉️ Danışana Mail Gönder (${form.email})`}
              </button>
            </div>

            {message && (
              <p className={`message ${message.includes("hatası") || message.includes("Hata") ? "error" : "success"}`}>
                {message}
              </p>
            )}
          </div>
        ) : (
          <div className="results-placeholder-card">
            <span className="placeholder-icon-pulse">🔮</span>
            <h3>Henüz Çözümlenmiş Seans Yok</h3>
            <p>Soldaki formu eksiksiz doldurup "Seansı Çözümle" butonuna basarak seans kodlarını açabilir ve mail gönderme paneline ulaşabilirsiniz.</p>
          </div>
        )}

      </div>
    </div>
  );
}
