// JeanEmail.js
export function generateNumerologyEmail({ name, results }) {
  return `
    <div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:20px;">
      <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
        
        <div style="background:linear-gradient(90deg,#3a7bd5,#00d2ff); padding:20px; text-align:center; color:white;">
          <h1 style="margin:0; font-size:24px;">JEAN ADRIENNE SEANSI</h1>
        </div>
        
        <div style="padding:20px;">
          <h2 style="font-size:20px; margin:0 0 10px 0; color:#333;">Merhaba ${name},</h2>
          <p style="font-size:16px; color:#555;">Seansınızın sonuçları aşağıdaki gibidir:</p>
          
          <ol style="margin-top:15px; padding-left:20px;">
            ${results
              .map(
                (item) =>
                  `<li style="margin-bottom:8px; font-size:16px; color:#333;">
                     ${item.fileName}= ${item.text} 
                   </li>`
              )
              .join("")}
          </ol>
        </div>
        
        <div style="background:#f9f9f9; padding:15px; text-align:center; font-size:12px; color:#888;">
          Bu mail otomatik olarak Jean Adrienne sistemi tarafından gönderilmiştir.
        </div>
      </div>
    </div>
  `;
}
