// src/components/BlogAnimasyon.jsx

import Image from 'next/image';
import Link from 'next/link';

const BlogAnimasyon = ({ 
  name = "Yazı Başlığı", 
  title = "Yazı açıklaması ve detayları burada yer alır.", 
  imageSrc, 
  link = "#"
}) => {
  return (
    <Link href={link} className="w-full flex">
      <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col cursor-pointer group">
        
        {/* Görsel Alanı */}
        {imageSrc ? (
          <div className="w-full aspect-16/10 overflow-hidden relative">
            <Image 
              src={imageSrc} 
              alt={name} 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-full aspect-16/10 bg-linear-to-br from-pink-50 to-sky-50 flex items-center justify-center relative">
            <div className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">✨🧘‍♀️✨</div>
          </div>
        )}

        {/* İçerik Alanı */}
        <div className="p-6 flex flex-col grow">
          <h3 className="font-bold text-xl text-slate-800 mb-3 group-hover:text-pink-500 transition-colors line-clamp-2">
            {name}
          </h3>
          
          <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 grow">
            {title}
          </p>
          
          <div className="flex items-center text-pink-500 font-semibold text-sm mt-auto">
            <span>Devamını Oku</span>
            <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogAnimasyon;
