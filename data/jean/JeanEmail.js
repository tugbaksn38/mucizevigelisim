// C:\Users\sifre\Desktop\mucizevigelisim\data\jean\JeanEmail.js
export function generateNumerologyEmail({ name, results, konu, customMessage }) {
  return `
    <div style="font-family: Arial, sans-serif; background-color:#f8f4fc; padding:20px; margin: 0;">
      <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 15px rgba(128, 0, 128, 0.1);">
        
        <div style="background:linear-gradient(135deg, #b388d4, #9c6bc4, #7b4aa8); padding:25px; text-align:center; color:white;">
          <h1 style="margin:0; font-size:24px; letter-spacing:1px;">🧘‍♀️ JEAN ADRIENNE SEANSI</h1>
        </div>
        
        <div style="padding:25px;">
          <h2 style="font-size:20px; margin:0 0 5px 0; color:#6a3a8a;">Merhaba ${name},</h2>
          ${konu ? `<p style="font-size:16px; color:#7a5a8a; margin: 0 0 15px 0; font-weight: bold;">Seans Konusu: ${konu}</p>` : ""}
          ${customMessage ? `
          <div style="margin: 15px 0; padding: 15px; background: #faf8fc; border: 1px dashed #b388d4; border-radius: 8px; color: #5a3a6a; font-size: 15px; line-height: 1.5; font-style: italic;">
            <strong>Size Özel Not:</strong><br/>
            ${customMessage.replace(/\n/g, '<br/>')}
          </div>
          ` : ""}

          <p style="font-size:16px; color:#7a5a8a; margin: 0 0 15px 0;">Seansınızın sonuçları aşağıdaki gibidir:</p>

          <div style="margin-top:15px;">
            <ul style="padding-left:0; list-style-type: none; margin: 0;">
              ${results
      .map(
        (item) =>
          `<li style="margin-bottom:15px; padding:12px 15px; background:#f3edf8; border-radius:8px; border-left:4px solid #9c6bc4; text-align: left;">
                        <div style="font-weight:bold; color:#6a3a8a; font-size:15px; margin-bottom:4px;">
                          📁 ${item.fileName}${item.line && item.line !== "Genel" ? ` - Satır ${item.line}` : ""}
                        </div>
                        <div style="color:#5a3a6a; font-size:16px; padding-left:5px;">
                          ${item.text}
                        </div>
                      </li>`
      )
      .join("")}
            </ul>
          </div>
          
          <p style="margin-top:25px; font-size:14px; color:#8a6a9a; text-align:center;">
            🌟 Işık ve sevgiyle,<br>
            <strong style="color:#6a3a8a;">Jean Adrienne Sistemi</strong>
          </p>
        </div>
        
        <div style="background:#f3edf8; padding:15px; text-align:center; font-size:12px; color:#9a7aaa;">
          Bu mail otomatik olarak Jean Adrienne sistemi tarafından gönderilmiştir.
        </div>
      </div>
    </div>
  `;
}
