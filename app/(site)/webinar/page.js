//src/app/webinar/page.js
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WebinarPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [participantCount, setParticipantCount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [targetCount, setTargetCount] = useState(500);
  
  // Canlı Yayın Zamanlama State'leri
  const [settings, setSettings] = useState({
    videoUrl: "",
    startTime: "",
    duration: 60
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const chatEndRef = useRef(null);

  // 🔐 Yetki Kontrolü ve Ayarların Yüklenmesi
  useEffect(() => {
    const access = localStorage.getItem("webinarAccess");
    if (access !== "true") {
      router.push("/webinar/login");
    } else {
      setAuthorized(true);
    }

    const storedSettings = localStorage.getItem("webinarSettings");
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
      } catch (e) {}
    }
  }, [router]);

  // ⏳ 1 Saniyelik Saat & Süre Sayacı
  useEffect(() => {
    if (!authorized) return;

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [authorized]);

  // ⏱️ Geçen Sürenin (elapsedSeconds) Gerçek Zamanlı Hesaplanması
  useEffect(() => {
    if (!authorized || !settings.startTime) return;

    const startTimeDate = new Date(settings.startTime);
    const diffSec = Math.floor((currentTime - startTimeDate) / 1000);
    
    // Yayın devam ediyorsa saniyeyi güncelle
    if (diffSec >= 0) {
      setElapsedSeconds(diffSec);
    } else {
      setElapsedSeconds(0);
    }
  }, [authorized, settings.startTime, currentTime]);

  // 📈 Dinamik Katılımcı Sayısı Algoritması (Rastgele 1-10 Arası Artış)
  useEffect(() => {
    if (!authorized) return;

    // Hedef izleyici sayısını başlangıçta belirle
    const stored = localStorage.getItem("webinarTargetCount");
    let target = 500;
    if (stored) {
      target = parseInt(stored, 10);
    } else {
      target = Math.floor(Math.random() * 200) + 400;
      localStorage.setItem("webinarTargetCount", target.toString());
    }
    setTargetCount(target);

    // O saniyedeki teorik hedefi hesaplayan yardımcı fonksiyon
    const getTheoreticalTarget = (sec, tCount) => {
      if (sec < 300) {
        return (sec / 300) * (tCount * 0.75);
      } else if (sec < 900) {
        const ratio = (sec - 300) / 600;
        return (tCount * 0.75) + ratio * (tCount * 0.25);
      } else {
        const wave = Math.sin(sec / 45) * 6 + Math.cos(sec / 90) * 4;
        return tCount + wave;
      }
    };

    const theoretical = getTheoreticalTarget(elapsedSeconds, target);

    setParticipantCount(prev => {
      const diff = theoretical - prev;
      if (diff > 0) {
        const randStep = Math.floor(Math.random() * 10) + 1; // 1-10 arası
        const step = Math.min(diff, randStep);
        return Math.floor(prev + step);
      } else if (diff < 0) {
        const randStep = Math.floor(Math.random() * 3) + 1; // 1-3 arası
        const step = Math.min(Math.abs(diff), randStep);
        return Math.floor(prev - step);
      }
      return prev;
    });
  }, [authorized, elapsedSeconds]);

  // 💬 Otomatik Yorum Akışı Simülasyonu
  useEffect(() => {
    if (!authorized || elapsedSeconds === 0) return;

    // İlk 10 dakikadaki selamlama yorumları
    const welcomeComments = [
      { user: "Fatma Yılmaz", text: "Selamlar herkese, hayırlı yayınlar dilerim." },
      { user: "Hüseyin Kaya", text: "Merhabalar, İzmir'den katılıyorum. İyi yayınlar." },
      { user: "Zehra Demir", text: "Hoş geldiniz Tuğba Hanım, yayını sabırsızlıkla bekliyorduk." },
      { user: "Murat Çelik", text: "Merhaba, ses ve görüntü bende çok net geliyor." },
      { user: "Sibel Şahin", text: "Hayırlı yayınlar, kolaylıklar dilerim." },
      { user: "Kadir Öztürk", text: "Selamlar, yayında emeği geçen herkese teşekkürler." },
      { user: "Büşra Yıldız", text: "Harika bir konu başlığı, sabırsızlanıyorum." },
      { user: "Aylin Aslan", text: "Selamlar Tuğba Hanım, iyi yayınlar dilerim." },
      { user: "Mustafa Bulut", text: "Herkese iyi akşamlar, hayırlı yayınlar." }
    ];

    // 10. dakikadan sonraki konuyla alakalı yorumlar
    const topicComments = [
      { user: "Ayşe Çetin", text: "Sunum ve bilgiler harika gidiyor Tuğba Hanım, çok teşekkürler! 👏" },
      { user: "Mehmet Şen", text: "Bu farkındalık konusu hayata bakış açımı değiştirdi resmen." },
      { user: "Zeynep Koç", text: "Eğitim sonundaki PDF notlarını nerede paylaşacaksınız?" },
      { user: "Ali Güler", text: "Gerçekten çok derin ve kıymetli bilgiler paylaşıyorsunuz." },
      { user: "Elif Kaplan", text: "Jean Adrienne seanslarınıza katılan var mı aranızda?" },
      { user: "Hasan Polat", text: "Uygulamalı numeroloji analizini ne zaman yapacağız?" },
      { user: "Merve Acar", text: "Verdiğiniz örnekler zihnimde çok iyi oturdu, teşekkür ederim." },
      { user: "Derya Aydın", text: "Harika gidiyor, nefesimi tutarak dinliyorum." },
      { user: "Serkan Yurt", text: "Kitap önerilerinizi yayın sonunda listenize ekler misiniz?" }
    ];

    // Her 15 saniyede bir yeni yorum düşsün
    const interval = setInterval(() => {
      const elapsedMinutes = elapsedSeconds / 60;
      let selectedComments = welcomeComments;

      if (elapsedMinutes >= 10) {
        selectedComments = topicComments;
      }

      const randomItem = selectedComments[Math.floor(Math.random() * selectedComments.length)];
      
      const lastComments = comments.slice(-3);
      if (lastComments.some(c => c.text === randomItem.text)) {
        return;
      }

      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      setComments(prev => [...prev, {
        user: randomItem.user,
        text: randomItem.text,
        time: timeStr
      }]);
    }, 15000);

    return () => clearInterval(interval);
  }, [authorized, elapsedSeconds, comments]);

  // 💬 Yorumlar Otomatik Kaydırma
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  // Yorum Gönderme
  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setComments((prev) => [...prev, { user: "Siz", text: newComment, time: timeStr, isSelf: true }]);
      setNewComment("");
    }
  };

  // Video URL'sini Embed Formatına Dönüştüren Yardımcı Fonksiyon
  const getEmbedUrl = (url) => {
    if (!url) return "";
    try {
      if (url.includes("youtube.com/embed/") || url.includes("player.vimeo.com/video/")) {
        return url;
      }
      if (url.includes("youtube.com/watch")) {
        const urlObj = new URL(url);
        const v = urlObj.searchParams.get("v");
        return `https://www.youtube.com/embed/${v}?autoplay=1&mute=0`;
      }
      if (url.includes("youtu.be/")) {
        const parts = url.split("youtu.be/");
        const id = parts[1]?.split("?")[0]?.split("/")[0];
        return `https://www.youtube.com/embed/${id}?autoplay=1&mute=0`;
      }
      if (url.includes("vimeo.com/")) {
        const parts = url.split("/");
        const id = parts[parts.length - 1]?.split("?")[0];
        return `https://player.vimeo.com/video/${id}?autoplay=1`;
      }
      return url;
    } catch (e) {
      return url;
    }
  };

  // 🔐 Sayfa Yüklenirken Loading Aşaması
  if (!authorized) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Yayın doğrulanıyor...</p>
        <style jsx>{`
          .loading-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: #0f172a;
            color: white;
            font-family: 'Poppins', sans-serif;
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top-color: #7c3aed;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
          }
          @keyframes spin {
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Zaman Parametreleri
  const start = settings.startTime ? new Date(settings.startTime) : null;
  const durationMs = (settings.duration || 60) * 60 * 1000;
  const end = start ? new Date(start.getTime() + durationMs) : null;

  const isNotStartedYet = start && currentTime < start;
  const isEnded = end && currentTime > end;

  // ======================= DURUM 1: YAYIN SONLANDI =======================
  if (isEnded) {
    return (
      <div className="ended-screen">
        <div className="ended-card">
          <div className="ended-icon">🏁</div>
          <h1>Yayın Sonlandırıldı</h1>
          <p>Katılımınız ve katkılarınız için çok teşekkür ederiz.</p>
          <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '10px' }}>Mucizevi Gelişim Akademisi</p>
        </div>
        <style jsx>{`
          .ended-screen {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: #ffffff;
            font-family: 'Poppins', 'Inter', sans-serif;
            padding: 20px;
          }
          .ended-card {
            text-align: center;
            max-width: 450px;
            padding: 40px;
            border-radius: 24px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
            border: 1px solid #f0f0f0;
            animation: fadeIn 0.8s ease;
          }
          .ended-icon {
            font-size: 3.5rem;
            margin-bottom: 16px;
          }
          .ended-card h1 {
            font-size: 2rem;
            font-weight: 800;
            color: #1e1b4b;
            margin: 0 0 12px 0;
          }
          .ended-card p {
            font-size: 1.05rem;
            color: #555;
            margin: 0;
            line-height: 1.6;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  // ======================= DURUM 2: YAYIN BAŞLAMADI =======================
  if (isNotStartedYet) {
    const formattedStartTime = start ? start.toLocaleString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) : "";

    return (
      <>
        <Header />
        <div className="not-started-screen">
          <div className="not-started-card">
            <div className="live-badge-offline">YAYIN YAKINDA</div>
            <div className="countdown-icon">⏳</div>
            <h1>Canlı Yayın Yakında Başlayacak</h1>
            <p>Eğitimimiz belirlenen saatte otomatik olarak başlayacaktır. Lütfen tarayıcı pencerenizi açık tutunuz.</p>
            <div className="time-info-box">
              <span className="time-label">Yayın Başlangıç Saati</span>
              <strong className="time-value">{formattedStartTime}</strong>
            </div>
          </div>
          <style jsx>{`
            .not-started-screen {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: calc(100vh - 180px);
              background: radial-gradient(circle at center, #1e1b4b 0%, #09090b 100%);
              font-family: 'Poppins', sans-serif;
              padding: 40px 20px;
            }
            .not-started-card {
              width: 100%;
              max-width: 550px;
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.08);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              border-radius: 24px;
              padding: 40px;
              text-align: center;
              box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 20px;
            }
            .countdown-icon {
              font-size: 3rem;
              animation: rotate-icon 4s infinite linear;
            }
            @keyframes rotate-icon {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .live-badge-offline {
              background: rgba(245, 158, 11, 0.2);
              color: #f59e0b;
              border: 1px solid rgba(245, 158, 11, 0.3);
              font-size: 0.8rem;
              font-weight: 700;
              padding: 6px 14px;
              border-radius: 20px;
              letter-spacing: 1px;
            }
            .not-started-card h1 {
              font-size: 1.6rem;
              font-weight: 800;
              color: white;
              margin: 0;
            }
            .not-started-card p {
              font-size: 0.95rem;
              color: #a1a1aa;
              margin: 0;
              line-height: 1.6;
            }
            .time-info-box {
              width: 100%;
              background: rgba(0, 0, 0, 0.3);
              border-radius: 12px;
              padding: 16px;
              border: 1px solid rgba(255, 255, 255, 0.04);
              display: flex;
              flex-direction: column;
              gap: 6px;
            }
            .time-label {
              font-size: 0.75rem;
              color: #71717a;
              text-transform: uppercase;
              letter-spacing: 1px;
              font-weight: 600;
            }
            .time-value {
              font-size: 1.3rem;
              color: #a78bfa;
              font-weight: 700;
            }
          `}</style>
        </div>
        <Footer />
      </>
    );
  }

  // ======================= DURUM 3: YAYIN DEVAM EDİYOR =======================
  return (
    <>
      <Header />
      <div className="webinar-layout">
        <div className="webinar-container-main">
          {/* Sol: Video Yayını */}
          <div className="video-section">
            <div className="video-header">
              <div className="live-status">
                <span className="live-dot"></span>
                <span>CANLI YAYIN</span>
              </div>
              <div className="participant-badge">
                <span className="badge-icon">👥</span>
                <span>{participantCount} İzleyici</span>
              </div>
            </div>

            <div className="player-wrapper">
              {settings.videoUrl ? (
                <iframe
                  src={getEmbedUrl(settings.videoUrl)}
                  title="Webinar Live Stream"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="player-iframe"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                ></iframe>
              ) : (
                <div className="player-placeholder">
                  <div className="placeholder-icon">📺</div>
                  <h3>Yayın Başlatılıyor...</h3>
                  <p>Yönetici yayını başlattığında video otomatik olarak burada belirecektir.</p>
                </div>
              )}
            </div>

            <div className="video-info">
              <h1>Mucizevi Gelişim İnteraktif Canlı Eğitim</h1>
              <p>Kendinizi tanıma, hayattaki potansiyelinizi keşfetme ve farkındalık yolculuğuna dair interaktif canlı webinar.</p>
            </div>
          </div>

          {/* Sağ: Sohbet Paneli */}
          <div className="chat-section">
            <div className="chat-header">
              <h2>Canlı Sohbet</h2>
              <span className="chat-subtitle">Yayına katılanlarla sohbet edin</span>
            </div>

            <div className="chat-history">
              {comments.map((c, i) => (
                <div key={i} className={`message-wrapper ${c.isSelf ? 'self' : ''}`}>
                  <div className="message-header">
                    <span className="msg-user">{c.user}</span>
                    <span className="msg-time">{c.time}</span>
                  </div>
                  <div className="message-bubble">
                    <p>{c.text}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="chat-input-wrapper">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Bir mesaj yazın..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCommentSubmit();
                }}
                className="chat-input"
              />
              <button onClick={handleCommentSubmit} className="btn-send">
                Gönder
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .webinar-layout {
          background-color: #f8fafc;
          padding: 40px 20px;
          min-height: calc(100vh - 180px);
          font-family: 'Poppins', 'Inter', sans-serif;
        }

        .webinar-container-main {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 30px;
        }

        /* Sol Video Alanı */
        .video-section {
          background: white;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid rgba(124, 58, 237, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .video-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .live-status {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fee2e2;
          color: #ef4444;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 6px 12px;
          border-radius: 20px;
          letter-spacing: 0.5px;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          background-color: #ef4444;
          border-radius: 50%;
          animation: pulse-dot 1.5s infinite ease-in-out;
        }

        @keyframes pulse-dot {
          0% { transform: scale(0.9); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.4; }
          100% { transform: scale(0.9); opacity: 1; }
        }

        .participant-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f1f5f9;
          color: #475569;
          font-weight: 600;
          font-size: 0.85rem;
          padding: 6px 12px;
          border-radius: 20px;
        }

        .player-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #0f172a;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: inset 0 0 40px rgba(0,0,0,0.6);
        }

        .player-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          text-align: center;
          padding: 20px;
        }

        .placeholder-icon {
          font-size: 3.5rem;
          margin-bottom: 12px;
          animation: bounce-icon 2s infinite ease-in-out;
        }

        @keyframes bounce-icon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .player-placeholder h3 {
          margin: 0 0 6px 0;
          color: white;
          font-weight: 700;
          font-size: 1.3rem;
        }

        .player-placeholder p {
          margin: 0;
          font-size: 0.9rem;
          max-width: 400px;
          line-height: 1.5;
        }

        .video-info h1 {
          font-size: 1.6rem;
          font-weight: 800;
          color: #1e1b4b;
          margin: 10px 0 6px 0;
          line-height: 1.3;
        }

        .video-info p {
          margin: 0;
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.6;
        }

        /* Sağ Sohbet Alanı */
        .chat-section {
          background: white;
          border-radius: 20px;
          border: 1px solid rgba(124, 58, 237, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          height: 600px;
        }

        .chat-header {
          padding: 20px;
          border-bottom: 1px solid #f1f5f9;
        }

        .chat-header h2 {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 700;
          color: #1e1b4b;
        }

        .chat-subtitle {
          font-size: 0.75rem;
          color: #94a3b8;
          display: block;
          margin-top: 4px;
        }

        .chat-history {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: #fafafb;
        }

        .message-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 85%;
        }

        .message-wrapper.self {
          align-self: flex-end;
          align-items: flex-end;
        }

        .message-header {
          display: flex;
          gap: 8px;
          font-size: 0.75rem;
          margin-bottom: 4px;
          padding: 0 4px;
        }

        .msg-user {
          font-weight: 700;
          color: #475569;
        }

        .message-wrapper.self .msg-user {
          color: #7c3aed;
        }

        .msg-time {
          color: #94a3b8;
        }

        .message-bubble {
          background: white;
          padding: 10px 14px;
          border-radius: 4px 16px 16px 16px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }

        .message-wrapper.self .message-bubble {
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
          color: white;
          border: none;
          border-radius: 16px 4px 16px 16px;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.15);
        }

        .message-bubble p {
          margin: 0;
          font-size: 0.85rem;
          line-height: 1.5;
        }

        .chat-input-wrapper {
          padding: 16px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          gap: 10px;
        }

        .chat-input {
          flex: 1;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          outline: none;
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        .chat-input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
        }

        .btn-send {
          padding: 0 20px;
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-send:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }

        /* Mobil Uyumluluk */
        @media (max-width: 968px) {
          .webinar-container-main {
            grid-template-columns: 1fr;
          }
          .chat-section {
            height: 500px;
          }
        }
      `}</style>
    </>
  );
}
