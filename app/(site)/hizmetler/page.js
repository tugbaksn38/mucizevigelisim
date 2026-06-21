// src/app/hizmetler/page.js
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AutoTranslate } from "../../../data/lang-sistem";
import "./hizmetler.css";


// ======================= BİLEŞEN TANIMI ============================
export default function Hizmetler() {

  // ======================= DURUM YÖNETİMİ ==========================
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ======================= VERİ ÇEKME İŞLEMİ =======================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/shopier", { cache: "no-store" });
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message || "Ürünler yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  // ======================= YÜKLENİYOR DURUMU =======================
  if (loading) {
    return (
      <div className="loading-container">
        <p>Ürünler yükleniyor...</p>
      </div>
    );
  }
  // ======================= HATA DURUMU =============================
  if (error) {
    return (
      <div className="error-container">
        {" "}
        <h2>Hata</h2> <p>{error}</p>{" "}
        <button onClick={() => window.location.reload()}>Tekrar Dene</button>{" "}
      </div>
    );
  }


  // ======================= ANA GÖRÜNÜM =============================
  return (
    <>
      {" "}
      <Header />{" "}
      <AutoTranslate>
        <div className="hizmetler-container">
          {" "}
          <h1 className="section-title">
            {" "}
            <span className="bb8-icon">⚙️</span> Mağazamızdaki Hizmetler{" "}
          </h1>{" "}
          <div className="products-grid">
            {" "}
            {products.map((product) => (
              <div key={product.id} className="product-card">
                {" "}
                <div className="product-image">
                  {" "}
                  <Image
                    src={
                      product.media?.[0]?.url?.startsWith("http")
                        ? product.media[0].url
                        : "/placeholder-product.jpg"
                    }
                    alt={product.title || "Ürün resmi"}
                    fill
                    className="image-cover"
                  />{" "}
                </div>{" "}
                <div className="product-info">
                  {" "}
                  <h3>{product.title}</h3>{" "}
                  <div
                    className="product-description"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  ></div>{" "}
                  <div className="product-price">
                    {product.priceData?.discountedPrice || product.priceData?.price || "Fiyat bilgisi yok"} TL
                  </div>
                  {" "}
                  <a
                    href={
                      product.url ||
                      `https://www.shopier.com/Product?productId=${product.id}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="buy-button"
                  >
                    {" "}
                    Satın Al{" "}
                  </a>{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </AutoTranslate>
      <Footer />{" "}
    </>
  );
}
