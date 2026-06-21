//src/app/admin/jeanadrienne/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { generateNumerologyEmail } from "@/utils/JeanEmail";
import { getJeanContent } from "@/utils/JeanDosyalar";
import "./jeanadrienne.css";

export default function JeanAdriennePage() {
  const [form, setForm] = useState({ name: "", email: "", seans: "" });
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setParsedResults([]);

    const results = parseSeans(form.seans);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_JEAN_SERVICE,
        process.env.NEXT_PUBLIC_JEAN_TEMPLATE,
        {
          from_name: "Jean Adrienne Sistemi",
          to_name: form.name,
          to_email: form.email,
          message: generateNumerologyEmail({ name: form.name, results }),
        },
        process.env.NEXT_PUBLIC_JEAN_KEY
      );

      setParsedResults(results);
      setMessage("Mail başarıyla gönderildi ✅");
    } catch (error) {
      console.error("EmailJS error:", error);
      setMessage("Hata oluştu ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="jean-container">
      {/* Geri Dönüş Linki */}
      <Link href="/admin" className="back-link">
        ← Admin Paneli'ne Dön
      </Link>

      <div className="jean-card">
        <div className="card-header">
          <span className="card-icon">🧘‍♀️</span>
          <h1>Jean Adrienne Seansı</h1>
          <p>Danışan bilgileri ve seans kodunu girerek çözümleme yapın ve sonuçları e-posta ile gönderin.</p>
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

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Gönderiliyor..." : "Mail Gönder 🚀"}
          </button>
        </form>

        {message && (
          <p className={`message ${message.includes("Hata") ? "error" : "success"}`}>
            {message}
          </p>
        )}
      </div>

      {parsedResults.length > 0 && (
        <div className="results-card">
          <h2>🔮 Seans Çözümleme Sonuçları</h2>
          <ul>
            {parsedResults.map((item, idx) => (
              <li key={idx}>
                <strong>{item.fileName} - Satır {item.line}:</strong> {item.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
