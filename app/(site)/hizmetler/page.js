// src/app/hizmetler/page.js
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AutoTranslate } from "@/data/lang-sistem";
import { getHizmetler } from "@/data/hizmet";
import "./hizmetler.css";

export default function Hizmetler() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⚡ Client-side montaj sonrası verileri LocalStorage'dan yükle
  useEffect(() => {
    const list = getHizmetler();
    // Sadece vitrinde gösterilmesi işaretlenmiş ürünleri listele
    const showcaseList = (list || []).filter(product => product.showcase !== false);
    setProducts(showcaseList);
    setLoading(false);
  }, []);

  // ======================= YÜKLENİYOR DURUMU =======================
  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-container">
          <div className="loader"></div>
          <p>Hizmetlerimiz yükleniyor...</p>
        </div>
        <Footer />
      </>
    );
  }

  // ======================= ANA GÖRÜNÜM =============================
  return (
    <>
      <Header />
      <AutoTranslate>
        <div className="hizmetler-container">
          <h1 className="section-title">
            <span className="bb8-icon">⚙️</span> Mağazamızdaki Hizmetler
          </h1>

          <div className="products-grid">
            {products.map((product) => {
              // İndirim Oranı Hesaplama
              const p = parseFloat(product.price);
              const dp = parseFloat(product.discountedPrice);
              const showDiscount = dp && p && dp < p;
              const discountPercentage = showDiscount ? Math.round(((p - dp) / p) * 100) : 0;

              // Stok Durumu Kontrolü
              const stock = product.stock !== undefined && product.stock !== null ? parseInt(product.stock, 10) : null;
              const isOutOfStock = stock === 0;
              const showStockBadge = stock !== null && stock > 0 && stock <= 3;

              return (
                <div key={product.id} className={`product-card ${isOutOfStock ? "out-of-stock" : ""}`}>
                  <div className="product-image">
                    {showDiscount && (
                      <div className="discount-badge">%{discountPercentage} İNDİRİM</div>
                    )}
                    {showStockBadge && (
                      <div className="stock-badge warning">Son {stock} Ürün</div>
                    )}
                    {isOutOfStock && (
                      <div className="stock-badge danger">Tükendi</div>
                    )}
                    <Image
                      src={
                        product.media?.[0]?.url || "/placeholder-product.jpg"
                      }
                      alt={product.title || "Ürün resmi"}
                      fill
                      className="image-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  <div className="product-info">
                    <h3>{product.title}</h3>

                    <div
                      className="product-description"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />

                    <div className="price-container">
                      {showDiscount ? (
                        <>
                          <span className="original-price">{product.price} TL</span>
                          <span className="discounted-price">{product.discountedPrice} TL</span>
                        </>
                      ) : (
                        <span className="normal-price">{product.price} TL</span>
                      )}
                    </div>

                    {isOutOfStock ? (
                      <button className="buy-button disabled" disabled>
                        Tükendi
                      </button>
                    ) : (
                      <a
                        href={product.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="buy-button"
                      >
                        Satın Al
                      </a>
                    )}
                  </div>
                </div>
              );
            })}

            {products.length === 0 && (
              <div className="no-products">
                <p>📦 Henüz eklenmiş bir hizmet bulunmamuyor.</p>
                <p style={{ fontSize: '14px', color: '#999', marginTop: '10px' }}>
                  Lütfen daha sonra tekrar kontrol edin.
                </p>
              </div>
            )}
          </div>
        </div>
      </AutoTranslate>
      <Footer />
    </>
  );
}
