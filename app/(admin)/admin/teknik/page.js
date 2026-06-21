"use client";

import { useState, useEffect } from "react";
import "./teknik-style.css";

export default function TeknikAnaliz() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    burc: "",
    hedef: "",
  });

  useEffect(() => {
    document.body.classList.add("admin-teknik-page");
    return () => {
      document.body.classList.remove("admin-teknik-page");
    };
  }, []);

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "TEKNİK ANALİZ FORMU";
      case 2:
        return "GENEL NİYET BAŞLIK";
      case 3:
        return "ADIM 3: SORUN İÇİN NİYET";
      case 4:
        return "ADIM 4: ARINMA VE İPTAL";
      case 5:
        return "İZİN VE ONAY";
      case 6:
        return "FREKANS ÖLÇÜMÜ";
      case 7:
        return "DUYGU ÖLÇÜMÜ";
      case 8:
        return "HEDEF SEÇİMİ";
      case 9:
        return "HEDEF SEÇİMİ";
      case 10:
        return "SONUÇ";
      default:
        return "MEGA CODE TEKNİĞİ SEANSI";
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="wizard-container">
      <div className="left-vertical-text">
        <span>M</span>
        <span>E</span>
        <span>G</span>
        <span>A</span>
      </div>
      <div className="right-vertical-text">
        <span>C</span>
        <span>O</span>
        <span>D</span>
        <span>E</span>
        <span>S</span>
      </div>
      <h1 className="teknik-sayfa-basligi">{getStepTitle()}</h1>
      <div className="wizard-card">
        {/* ADIM 1 */}
        {step === 1 && (
          <div className="wizard-step">
            <label>Adınız Soyadınız:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Adınızı girin"
              className="text-input"
            />
            <div className="button-group">
              <button
                onClick={nextStep}
                className="teknik-btn teknik-btn-primary"
              >
                Devam Et
              </button>
            </div>
          </div>
        )}
        {/* ADIM 2 */}
        {step === 2 && (
          <div className="wizard-step">
            <p style={{ textAlign: "left", whiteSpace: "pre-line" }}>
              Alemlerin rabbi olan Allah'ın izniyle,
              {"\n"}Bildiğim ve ya bilmediğim, tüm zamanlarda tüm mekanlarda,
              geçmişte veya gelecekte bilinçaltına Kodlanan Negatif kayıtları
              çözmeye niyet ediyorum.
              {"\n"}Gölgelerime ışık tutana şükürler olsun.
              {"\n"}Bugün bu çalışmada tüm hücrelerimin şifa bulmasına niyet
              ediyorum.
              {"\n"}Her bir hücrem her bir atomum her bir noktam ruhumun tüm
              parçacıkları ışıkla buluşturmaya niyet ediyorum.
              {"\n"}Işıkla karşılaştığım noktada, kendi gölgelerimi görme
              cesaretindeyim.
              {"\n"}Ruhsal rehberlerim aracılığıyla bugün enerjisel olarak
              arınmayı ve şifalanmayı seçiyorum.
              {"\n"}Alanıma hiçbir negatif enerji giremez.
              {"\n"}Alanımda ışığa hizmet etmeyen ne varsa şifalanmasına niyet
              ediyorum.
              {"\n\n"}▪️Ya Fettah ismi enerjisini aktive ederek, hayatımdaki tüm
              blokajları iptal ediyorum.
              {"\n\n"}✴️ Hayatımın her anı, her alanda, her koşulda harika,
              ışıltılı, kolaylıkla ilerliyor.
              {"\n"}👑Teşekkürler oldu oldu oldu
            </p>
            <div className="button-group">
              <button
                onClick={prevStep}
                className="teknik-btn teknik-btn-secondary"
              >
                Geri
              </button>
              <button
                onClick={nextStep}
                className="teknik-btn teknik-btn-primary"
              >
                Devam Et
              </button>
            </div>
          </div>
        )}
        {/* ADIM 3 */}
        {step === 3 && (
          <div className="wizard-step">
            <p style={{ textAlign: "left", whiteSpace: "pre-line" }}>
              "Alemlerin Rabbi olan Allahın izniyle,
              {"\n"}........................ (Kişinin adı), yükselişe giden
              yolunu engelleyen konunun kaynağına götürülmeye niyet ediyorum.
              {"\n"}........................ (Kişinin adı), yaşamış olduğu
              {"\n"}........................ (Sorunun adı) sorununun veya
              hastalığının
              {"\n"}negatif etkilerinin, duygu ve travmalarının kaynağına
              götürülmeyi talep ediyorum.
              {"\n\n"}Bugün, farkında olmadığım tüm karmik blokajlarımdan, tüm
              engellerimden arınmaya niyet ediyorum.
              {"\n"}Onları yaratıldıkları yerde,
              {"\n"}Önümde, arkamda,
              {"\n"}Sağımda, solumda,
              {"\n"}Geçmişimde, geleceğimde,
              {"\n"}Bildiğim, bilmediğim,
              {"\n"}Duyduğum, duymadığım,
              {"\n"}Gördüğüm, görmediğim
              {"\n"}tüm negatif enerjileri iptal ediyorum."
            </p>
            <div className="button-group">
              <button
                onClick={prevStep}
                className="teknik-btn teknik-btn-secondary"
              >
                Geri
              </button>
              <button
                onClick={nextStep}
                className="teknik-btn teknik-btn-primary"
              >
                Devam Et
              </button>
            </div>
          </div>
        )}
        {/* ADIM 4 */}
        {step === 4 && (
          <div className="wizard-step">
            <p style={{ textAlign: "left", whiteSpace: "pre-line" }}>
              "Geçmişte ve gelecekte,
              {"\n"}Tüm zaman, mekan ve boyutlarda,
              {"\n"}Zihnimden,
              {"\n"}Bedenimden,
              {"\n"}Ruhumdan,
              {"\n"}Hücrelerimden,
              {"\n"}DNA'mdan,
              {"\n"}Organlarımdan,
              {"\n"}Kalbimden ✴️,
              {"\n"}Omurgamdan ✴️,
              {"\n"}Enerji alanımdan,
              {"\n"}Zihinsel bedenimden,
              {"\n"}Duygusal bedenimden,
              {"\n"}Fiziksel bedenimden,
              {"\n"}Tüm organlarımdan,
              {"\n\n"}........................ (Kişinin adı), ruhunun en yüksek
              iyiliği için, tüm var olanın en yüksek iyiliği için
              arındırılabilmesi adına niyet ediyorum."
            </p>
            <div className="button-group">
              <button
                onClick={prevStep}
                className="teknik-btn teknik-btn-secondary"
              >
                Geri
              </button>
              <button
                onClick={nextStep}
                className="teknik-btn teknik-btn-primary"
              >
                Devam Et
              </button>
            </div>
          </div>
        )}
        {/* ADIM 5 */}
        {step === 5 && (
          <div className="wizard-step">
            <p style={{ textAlign: "left", whiteSpace: "pre-line" }}>
              Şu an (….... için) "Mega Codes" yapmaya izin var mı?
              {"\n\n"}✅ Sarkaç ile CEVAP AL
              {"\n\n"}▶️ Mega Codes seansını almaya niyet ediyorum.
              {"\n\n"}3️⃣🟧 ENERJİ AKTİVE EDİLMESİ
              {"\n"}Şimdi gözlerini kapat. Avuç içlerin yukarı bakacak şekilde
              dursun. Derin bir nefes al.
              {"\n"}Yavaşça ver. Tekrardan derin bir nefes al.
              {"\n"}Ve yavaşça ver.
              {"\n"}Avuç içlerine baskı uygula.
              {"\n"}Şimdi avuç içlerinden yukarı doğru çıkan yoğun bir enerji
              var. Bu enerjinin taç çakrandan içeri girip tüm vücuduna
              yayıldığını hisset. Ve kök çakrandan çıkarak dünyanın çekirdeğine
              kadar uzanıyor. Bedeninden çıkan kökler dünyayı tamamen sarıyor.
              {"\n"}Şimdi niyet ediyoruz.
              {"\n\n"}▪️Prana Enerjisini en iyi en yüce şekilde aktive ediyorum.
              {"\n"}▪️Hay ismi ile yaşam enerjimi aktive ediyorum.
            </p>
            <div className="button-group">
              <button
                onClick={prevStep}
                className="teknik-btn teknik-btn-secondary"
              >
                Geri
              </button>
              <button
                onClick={nextStep}
                className="teknik-btn teknik-btn-primary"
              >
                Devam Et
              </button>
            </div>
          </div>
        )}
        {/* ADIM 6 */}
        {step === 6 && (
          <div className="wizard-step">
            {/* Resim ortada */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0",
              }}
            >
              <img
                src="/img/bowis.jpg"
                alt="Frekans Ölçümü"
                style={{ maxWidth: "650px", borderRadius: "12px" }}
              />
            </div>

            {/* Input ortada */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <label
                style={{
                  marginBottom: "2px",
                  fontWeight: "600",
                  color: "#444",
                }}
              >
                Frekans değerini giriniz
              </label>

              <input
                type="number"
                value={formData.frekans || ""}
                onChange={(e) =>
                  setFormData({ ...formData, frekans: e.target.value })
                }
                className="teknik-input"
                style={{
                  textAlign: "center",
                  width: "200px",
                  padding: "5px",
                  border: "2px solid #2196F3",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
              />
            </div>

            {/* Butonlar */}
            <div className="button-group">
              <button
                onClick={prevStep}
                className="teknik-btn teknik-btn-secondary"
              >
                Geri
              </button>
              <button
                onClick={nextStep}
                className="teknik-btn teknik-btn-primary"
              >
                Devam Et
              </button>
            </div>
          </div>
        )}
        {/* ADIM 7 */}
        {step === 7 && (
          <div className="wizard-step">
            {/* Resim ortada */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0",
              }}
            >
              <img
                src="/img/frekans.jpg"
                alt="Duygu Frekans Ölçümü"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  borderRadius: "12px",
                }}
              />
            </div>

            {/* Input üstünde açıklama */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <label
                style={{
                  marginBottom: "2px",
                  fontWeight: "600",
                  color: "#444",
                }}
              >
                Duygu Frekans değerini giriniz
              </label>
              <input
                type="number"
                value={formData.duygu || ""}
                onChange={(e) =>
                  setFormData({ ...formData, duygu: e.target.value })
                }
                className="teknik-input"
                style={{
                  textAlign: "center",
                  width: "200px",
                  padding: "5px",
                  border: "2px solid #2196F3",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
              />
            </div>

            {/* Butonlar */}
            <div className="button-group">
              <button
                onClick={prevStep}
                className="teknik-btn teknik-btn-secondary"
              >
                Geri
              </button>
              <button
                onClick={nextStep}
                className="teknik-btn teknik-btn-primary"
              >
                Devam Et
              </button>
            </div>
          </div>
        )}
        {/* ADIM 8 */}
        {step === 8 && (
          <div className="wizard-step">
            <label>Hedefiniz:</label>
            <select
              name="hedef"
              value={formData.hedef}
              onChange={handleChange}
              className="dropdown-select"
            >
              <option value="">Seçiniz</option>
              <option value="Kariyer">Kariyer</option>
              <option value="Aşk">Aşk</option>
              <option value="Sağlık">Sağlık</option>
              <option value="Para">Para</option>
            </select>
            <div className="button-group">
              <button
                onClick={prevStep}
                className="teknik-btn teknik-btn-secondary"
              >
                Geri
              </button>
              <button
                onClick={nextStep}
                className="teknik-btn teknik-btn-primary"
              >
                Devam Et
              </button>
            </div>
          </div>
        )}
        {/* ADIM 9 */}
        {step === 9 && (
          <div className="wizard-step">
            <label>Hedefiniz:</label>
            <select
              name="hedef"
              value={formData.hedef}
              onChange={handleChange}
              className="dropdown-select"
            >
              <option value="">Seçiniz</option>
              <option value="Kariyer">Kariyer</option>
              <option value="Aşk">Aşk</option>
              <option value="Sağlık">Sağlık</option>
              <option value="Para">Para</option>
            </select>
            <div className="button-group">
              <button
                onClick={prevStep}
                className="teknik-btn teknik-btn-secondary"
              >
                Geri
              </button>
              <button
                onClick={nextStep}
                className="teknik-btn teknik-btn-primary"
              >
                Sonuçları Gör
              </button>
            </div>
          </div>
        )}

        {/* SONUÇ */}
        {step === 10 && (
          <div className="wizard-step">
            <p className="result-item">
              <strong>Adınız:</strong> {formData.name}
            </p>
            <p className="result-item">
              <strong>Burcunuz:</strong> {formData.burc}
            </p>
            <p className="result-item">
              <strong>Hedefiniz:</strong> {formData.hedef}
            </p>
            <p className="result-item">
              <strong>Frekans Ölçümü:</strong> {formData.frekans}
            </p>
            <p className="result-item">
              <strong>Duygu Frekans Ölçümü:</strong> {formData.duygu}
            </p>
            <div className="button-group">
              <button
                onClick={() => setStep(1)}
                className="teknik-btn teknik-btn-secondary"
              >
                Baştan Başla
              </button>
            </div>
          </div>
        )}
      </div>
      {/* 🔹 STYLES */}
      <style jsx>{`
        .wizard-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(to right, #6a11cb, #2575fc);
          padding: 20px;
        }

        .wizard-card {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 850px;
          text-align: center;
        }

        .wizard-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #333;
        }

        .wizard-step label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: #444;
          text-align: center;
        }

        .text-input,
        .dropdown-select {
          width: 100%;
          padding: 12px;
          margin-bottom: 20px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: border 0.3s ease;
          text-align: center;
        }

        .text-input:focus,
        .dropdown-select:focus {
          border-color: #6a11cb;
          outline: none;
        }

        .button-group {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }

        /* 🔹 Modern buton stilleri */
        .teknik-btn {
          padding: 12px 25px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 140px;
          font-weight: 600;
        }

        .teknik-btn-primary {
          background: linear-gradient(90deg, #2196f3, #1976d2); /* Mavi ton */
          color: white;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        .teknik-btn-primary:hover {
          transform: translateY(-2px);
          opacity: 0.95;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
        }

        .teknik-btn-secondary {
          background: linear-gradient(
            90deg,
            #ff9800,
            #f57c00
          ); /* Turuncu ton */
          color: white;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        .teknik-btn-secondary:hover {
          transform: translateY(-2px);
          opacity: 0.95;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
        }

        .result-item {
          margin: 10px 0;
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
