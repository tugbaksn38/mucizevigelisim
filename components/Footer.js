// src/components/Footer.js


'use client';


import Link from "next/link";
import { useLang, AutoTranslate }from "@/data/lang-sistem";

export default function Footer() {
  const { lang } = useLang();

  return (
    <AutoTranslate>
      <footer className="footer">
        <div className="footer-content">
          
          {/* Sol Kısım - Logo & Açıklama */}
          <div className="footer-col">
            <h4 className="footer-title">MUCİZEVİ GELİŞİM</h4>
            <p>
              Mucizevi Gelişim ile 10 YILLIK bilgi ve deneyimlerle bilinçaltı inançlarını değiştirerek 
              hayatınızı daha iyi hale getirmeniz için rehberlik ediyorum.
            </p>
          </div>

          {/* Orta Kısım - Hizmetler */}
          <div className="footer-col text-center">
            <h4 className="footer-title">Hizmetler</h4>
            <ul>
              <li><Link href="/">Anasayfa</Link></li>
              <li><Link href="/hizmetler">Hizmetler</Link></li>
              <li><Link href="/egitimler">Eğitimlerim</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/numeroloji">Numeroloji</Link></li>
              <li><Link href="/mesaj">Günün Ayeti</Link></li>
              <li><Link href="/hakkimda">Hakkımda</Link></li>
              <li><Link href="/iletisim">İletişim</Link></li>
            </ul>
          </div>

          {/* Sağ Kısım - İletişim ve Dil Değiştirici */}
          <div className="footer-col">
            <h4 className="footer-title">İletişim Bilgileri</h4>
            <p>İletişim: mucizevigelisim@gmail.com</p>
            <p>Tel: +90 551 960 09 69</p>

            <div className="social-icons">
              <a href="https://www.instagram.com/mucizevigelisim" target="_blank">
                <img src="/img/instagram.png" alt="Instagram" />
              </a>
              <a href="https://www.youtube.com/@MucizeviGelisim" target="_blank">
                <img src="/img/youtube.png" alt="YouTube" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </AutoTranslate>
  );
}