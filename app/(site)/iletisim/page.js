//src/app/iletisim/page.js

// src/app/iletisim/page.js
"use client";

import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AutoTranslate } from "../../../data/lang-sistem"; // AutoTranslate'i import edin

// Client component wrapper
function ClientAutoTranslate({ children }) {
  return <AutoTranslate>{children}</AutoTranslate>;
}


export default function Iletisim() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <ClientAutoTranslate>
      
      <main className="iletisim-container">
        {/* Hero Section */}
        <section className="iletisim-hero">
          <div className="hero-content">
            <h1>İletişime Geçin</h1>
            <p>Size nasıl yardımcı olabileceğimizi konuşalım</p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="contact-content">
          <div className="contact-wrapper">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Mesaj Gönderin</h2>
              <p className="form-description">
                Aşağıdaki formu doldurarak bana ulaşabilirsiniz. 
                En kısa sürede size dönüş yapacağım.
              </p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Adınız Soyadınız *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">E-posta Adresiniz *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Telefon Numaranız</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="05XX XXX XX XX"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Konu *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Konu seçin</option>
                      <option value="danismanlik">Danışmanlık</option>
                      <option value="egitim">Eğitim</option>
                      <option value="seans">Bireysel Seans</option>
                      <option value="genel">Genel Soru</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mesajınız *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Mesajınızı buraya yazın..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                </button>

                {submitStatus === 'success' && (
                  <div className="success-message">
                    ✅ Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğim.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="error-message">
                    ❌ Bir hata oluştu. Lütfen daha sonra tekrar deneyin veya doğrudan e-posta gönderin.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-section">
              <div className="contact-info-card">
                <h3>İletişim Bilgilerim</h3>
                
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div className="contact-details">
                    <h4>E-posta</h4>
                    <p>mucizevigelisim@gmail.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📱</div>
                  <div className="contact-details">
                    <h4>Telefon</h4>
                    <p>+90 551 689 08 88</p>
                  </div>
                </div>



                <div className="contact-item">
                  <div className="contact-icon">🕒</div>
                  <div className="contact-details">
                    <h4>Çalışma Saatleri</h4>
                    <p>Pazartesi - Cuma: 09:00 - 18:00<br />Cumartesi: 10:00 - 16:00</p>
                  </div>
                </div>

                <div className="social-links">
                  <h4>Sosyal Medya</h4>
                  <div className="social-icons">
                    <a href="#" className="social-link">📘</a>
                    <a href="#" className="social-link">📸</a>
                    <a href="#" className="social-link">🐦</a>
                    <a href="#" className="social-link">📺</a>
                  </div>
                </div>
              </div>

             
             
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="faq-container">
            <h2>Sıkça Sorulan Sorular</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h4>Seanslar ne kadar sürer?</h4>
                <p>Bireysel seanslar genellikle 60-90 dakika arasında sürmektedir.</p>
              </div>
              
              <div className="faq-item">
                <h4>Online seans yapıyor musunuz?</h4>
                <p>Evet, sadece online seanslar yapmaktayım.</p>
              </div>
               
              <div className="faq-item">
                <h4>Ödeme yöntemleri nelerdir?</h4>
                <p>Shopier üzerinden güvenli bir şekilde ödeme yapabilirsiniz. </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      </ClientAutoTranslate>


      
      <Footer />

      <style jsx>{`
        .iletisim-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .iletisim-hero {
          background: linear-gradient(135deg, #ffd6e7 0%, #c2e9fb 100%);
          color: #333;
          padding: 4rem 2rem;
          text-align: center;
          margin-bottom: 3rem;
          border-radius: 0 0 20px 20px;
        }

        .hero-content h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-content p {
          font-size: 1.2rem;
          opacity: 0.8;
        }

        .contact-content {
          padding: 2rem 0;
          margin-bottom: 4rem;
        }

        .contact-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .contact-form-section {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .contact-form-section h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #333;
        }

        .form-description {
          color: #666;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 1rem;
          border: 2px solid #e1e5e9;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #ff85a2;
          box-shadow: 0 0 0 3px rgba(255, 133, 162, 0.1);
        }

        .submit-btn {
          background: linear-gradient(135deg, #ff85a2 0%, #ffacc7 100%);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 133, 162, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .success-message,
        .error-message {
          padding: 1rem;
          border-radius: 10px;
          margin-top: 1rem;
          font-weight: 500;
        }

        .success-message {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .error-message {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .contact-info-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .contact-info-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .contact-info-card h3 {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          color: #333;
          text-align: center;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .contact-icon {
          font-size: 1.5rem;
          background: linear-gradient(135deg, #ff85a2 0%, #c2e9fb 100%);
          padding: 0.5rem;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact-details h4 {
          margin: 0 0 0.5rem 0;
          color: #333;
          font-size: 1rem;
        }

        .contact-details p {
          margin: 0;
          color: #666;
          line-height: 1.5;
        }

        .social-links {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #dee2e6;
        }

        .social-links h4 {
          margin-bottom: 1rem;
          color: #333;
        }

        .social-icons {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          background: white;
          border-radius: 50%;
          text-decoration: none;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .social-link:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .map-placeholder {
          background: linear-gradient(135deg, #e0f7fa 0%, #bbdefb 100%);
          border-radius: 20px;
          padding: 3rem;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .map-content {
          color: #666;
        }

        .map-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
        }

        .faq-section {
          background: #f8f9fa;
          padding: 4rem 2rem;
          border-radius: 20px;
          margin-bottom: 4rem;
        }

        .faq-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .faq-container h2 {
          text-align: center;
          font-size: 2.2rem;
          margin-bottom: 3rem;
          color: #333;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .faq-item {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .faq-item:hover {
          transform: translateY(-5px);
        }

        .faq-item h4 {
          color: #ff85a2;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .faq-item p {
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 968px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .faq-grid {
            grid-template-columns: 1fr;
          }
          
          .hero-content h1 {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .contact-form-section,
          .contact-info-card {
            padding: 1.5rem;
          }
          
          .hero-content h1 {
            font-size: 2rem;
          }
          
          .social-icons {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}