// src/app/egitimler/page.js
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EgitimCard from "@/components/EgitimCard";
import { AutoTranslate } from "../../../data/lang-sistem";

export default function Egitimler() {
  const egitimler = [
    { title: "Biyoenerji Eğitimi", description: "Enerji dengeleme tekniklerini öğrenin.", href: "/biyoenerji" },
    { title: "Regresyon Eğitimi", description: "Geçmiş yaşamların etkilerini keşfedin.", href: "/regresyon" },
    { title: "Nöro-DNA Eğitimi", description: "Bilinçaltı kalıplarınızı dönüştürün.", href: "/norodna" },
    { title: "Jean Adrienne Eğitimi", description: "Spiritüel arınma ve blokaj çözme teknikleri.", href: "/jeanadrienne" },
    { title: "Bilinçaltı Eğitimi", description: "Zihinsel kayıtları keşfedin ve dönüştürün.", href: "/bilincalti" },
    { title: "Spiritüel Dowsing Eğitimi", description: "Enerji alanlarını ölçmeyi öğrenin.", href: "/dowsingegitimi" },
    { title: "Pandül Eğitimi", description: "Pandül ile enerji okumaları yapmayı öğrenin.", href: "/pandul" },
    { title: "Yaşam Koçluğu Eğitimi", description: "Motivasyon ve hedef belirleme teknikleri.", href: "/yasamkoclugu" },
    { title: "Kundalini Reiki Eğitimi", description: "Şifa ve enerji dengeleme yöntemleri.", href: "/reiki" },
    { title: "Esmaül Hüsna Eğitimi", description: "Esmaül Hüsna enerjileriyle dönüşüm.", href: "/esma" },
  ];

  return (
    <>
      <Header />

      <AutoTranslate>
        <main className="container my-10 max-w-6xl mx-auto">
          <h2 className="text-center mb-12 text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
            Eğitimlerim
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {egitimler.map((egitim, i) => (
              <EgitimCard
                key={i}
                title={egitim.title}
                description={egitim.description}
                href={egitim.href}
              />
            ))}
          </div>
        </main>
      </AutoTranslate>

      <Footer />
    </>
  );
}