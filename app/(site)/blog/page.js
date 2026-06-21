// src/app/blog/page.js

"use client";

import { useEffect, useState } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogAnimasyon from '@/components/BlogAnimasyon';
import { AutoTranslate } from "../../../data/lang-sistem";

// Client component wrapper for translations
function ClientAutoTranslate({ children }) {
  return <AutoTranslate>{children}</AutoTranslate>;
}

export default function Blog() {
  const [allContent, setAllContent] = useState([]);

  useEffect(() => {
    let storedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    
    // Eğer localStorage boş ise veya varsayılanlar yüklenecekse
    if (storedPosts.length === 0) {
      storedPosts = [
        {
          id: 'zima',
          type: 'author',
          name: "Zima Mavisi",
          title: "Hikaye robot geliştiren bir kadının, havuzunu temizleyen robotu geliştirmek istemesiyle başlıyor.",
          link: "/basari/page",
          image: "/img/slider2.jpg"
        },
        {
          id: 'cakralar',
          type: 'author',
          name: "Çakralar",
          title: "Hindu gelenekleri ve bazı inanç sistemleri, insanda bulunan enerjiyi tüm vücuda dağıtan enerji noktalarını çakra olarak adlandırır.",
          link: "/cakralar/page",
          image: "/img/zima.jpg"
        },
        {
          id: 'okul',
          type: 'author',
          name: "Bilinçaltı",
          title: "Bu süreçlerden biri de 'bilinçaltı'dır. Bilinçaltı, bilinç hali dışında zihinsel durumların oluşması şeklinde tanımlanabilir.",
          link: "/bilincalti/page"
        }
      ];
      localStorage.setItem('blogPosts', JSON.stringify(storedPosts));
    } else {
      // Mevcut localStorage verilerinin görsellerini kullanıcının isteğine göre güncelle
      let updated = false;
      if (storedPosts[0]) {
        storedPosts[0].image = "/img/slider2.jpg";
        updated = true;
      }
      if (storedPosts[1]) {
        storedPosts[1].image = "/img/zima.jpg";
        updated = true;
      }
      if (updated) {
        localStorage.setItem('blogPosts', JSON.stringify(storedPosts));
      }
    }
    
    setAllContent(storedPosts);
  }, []);

  return (
    <>
      <Header />
      
      <ClientAutoTranslate>
        <main className="min-h-screen bg-slate-50/50 pb-20">
          
          {/* Blog Yazıları Grid */}
          <div className="max-w-7xl mx-auto px-6 pt-12">
            {allContent.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allContent.map((item) => (
                  <div key={item.id} className="flex">
                    <BlogAnimasyon 
                      name={item.type === 'author' ? item.name : item.title}
                      title={item.type === 'author' ? item.title : item.content}
                      imageSrc={item.image}
                      link={item.link || "#"}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="text-4xl mb-4">✍️</div>
                <h3 className="font-bold text-lg text-slate-700">Henüz Yazı Eklenmemiş</h3>
                <p className="text-slate-400 mt-2">Daha sonra tekrar ziyaret edin veya admin panelinden yeni yazılar ekleyin.</p>
              </div>
            )}
          </div>

        </main>
      </ClientAutoTranslate>

      <Footer />
    </>
  );
}
