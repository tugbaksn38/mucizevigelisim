// C:\Users\sifre\Desktop\mucizevigelisim\data\email.js

export function generateNumerologyEmail(data) {
  const {
    firstName,
    lastName,
    email,
    birthDate,
    currentDate,
    lifePathNumber,
    lifePathMeaning,
    expressionNumber,
    expressionMeaning,
    soulUrgeNumber,
    soulUrgeMeaning,
    personalityNumber,
    personalityMeaning,
    karmicDebts,
    karmicLessons,
    chakraAnalysis
  } = data;

  return `
<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<title>Numeroloji Analiz Raporu</title>
<style>
  body { font-family: 'Segoe UI', sans-serif; background: #f5f7fa; color: #333; margin: 0; padding: 0; }
  .container { max-width: 650px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.08); }
  .header { background: linear-gradient(135deg, #6a11cb 0%, #e59ce2 100%); padding: 30px; text-align: center; color: white; }
  .body { padding: 30px; }
  .section { margin-bottom: 25px; }
  .section h3 { color: #6a11cb; margin-bottom: 10px; }
  .card { background: #f8f9fc; padding: 15px; border-radius: 8px; border: 1px solid #eaeef2; margin-bottom: 10px; }
  .number { font-size: 28px; font-weight: bold; color: #6a11cb; text-align: center; margin-bottom: 5px; }
  .footer { background: #2c3e50; color: #ecf0f1; padding: 25px; text-align: center; font-size: 14px; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Numeroloji Analiz Raporu</h1>
      <p>Doğum bilgilerinizle hazırlanan kişisel analiziniz</p>
    </div>
    <div class="body">
      <div class="section">
        <h3>Kişisel Bilgiler</h3>
        <div class="card">
          <p><strong>Ad Soyad:</strong> ${firstName} ${lastName}</p>
          <p><strong>Doğum Tarihi:</strong> ${birthDate}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Rapor Tarihi:</strong> ${currentDate}</p>
        </div>
      </div>

      <div class="section">
        <h3>Yaşam Yolu Sayısı</h3>
        <div class="card">
          <div class="number">${lifePathNumber}</div>
          <p>${lifePathMeaning}</p>
        </div>
      </div>

      <div class="section">
        <h3>İfade / İsim Sayısı</h3>
        <div class="card">
          <div class="number">${expressionNumber}</div>
          <p>${expressionMeaning}</p>
        </div>
      </div>

      <div class="section">
        <h3>Ruh Arzusu Sayısı</h3>
        <div class="card">
          <div class="number">${soulUrgeNumber}</div>
          <p>${soulUrgeMeaning}</p>
        </div>
      </div>

      <div class="section">
        <h3>Kişilik Sayısı</h3>
        <div class="card">
          <div class="number">${personalityNumber}</div>
          <p>${personalityMeaning}</p>
        </div>
      </div>

      <div class="section">
        <h3>Karmik Borçlar</h3>
        <div class="card">
          <p>${karmicDebts}</p>
        </div>
      </div>

      <div class="section">
        <h3>Karmik Dersler</h3>
        <div class="card">
          <p>${karmicLessons}</p>
        </div>
      </div>

      <div class="section">
        <h3>Çakra Analiziniz</h3>
        <div class="card">
          <pre>${chakraAnalysis}</pre>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>Bu e-posta ${firstName} ${lastName} için özel olarak hazırlanmıştır.</p>
      <p>© 2025 Numeroloji Analiz. Tüm hakları saklıdır.</p>
    </div>
  </div>
</body>
</html>
  `;
}
