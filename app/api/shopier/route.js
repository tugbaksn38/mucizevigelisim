// src/app/api/shopier/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = process.env.SHOPIER_API_URL || 'https://api.shopier.com/v1';
    const token = process.env.SHOPIER_API_TOKEN;

    if (!token) {
      console.warn("⚠️ API: Token bulunamadı, demo ürünler gönderiliyor");
      return NextResponse.json({
        success: false,
        isDemo: true,
        message: "Shopier API Token bulunamadı, demo ürünler gösteriliyor.",
        products: getDemoProducts(),
      });
    }

    const response = await fetch(`${apiUrl}/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error('Shopier API error status:', response.status);
      throw new Error(`Shopier API error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Shopier API response loaded successfully');

    // API'den gelen verileri normalize et
    const rawProducts = data.products || data || [];
    const products = Array.isArray(rawProducts) ? rawProducts.map(normalizeProduct) : [];

    return NextResponse.json({
      success: true,
      isDemo: false,
      products: products.length > 0 ? products : getDemoProducts(),
    });

  } catch (error) {
    console.error('Shopier API catch error:', error.message);
    
    // Hata durumunda (örneğin 403 Yetkisiz erişim) 200 dönüp demo ürünleri listele
    return NextResponse.json({
      success: false,
      isDemo: true,
      message: `Shopier API bağlantısı kurulamadı (${error.message}), demo ürünler gösteriliyor.`,
      products: getDemoProducts(),
    });
  }
}

// Ürün verilerini projenin bileşen yapısına göre normalize eden yardımcı fonksiyon
function normalizeProduct(product) {
  const title = product.title || product.name || "İsimsiz Hizmet";
  const description = product.description || "Açıklama bulunmuyor.";
  
  // Fiyat bilgisini parse et
  let price = "0.00";
  let discountedPrice = null;
  
  if (product.priceData) {
    price = product.priceData.price || price;
    discountedPrice = product.priceData.discountedPrice || null;
  } else if (typeof product.price === 'object' && product.price !== null) {
    price = product.price.amount || price;
  } else if (product.price) {
    price = product.price.toString();
  }

  // Görsel URL'sini ayarla
  let mediaUrl = "/placeholder-product.jpg";
  if (product.media && Array.isArray(product.media) && product.media.length > 0) {
    mediaUrl = product.media[0].url || mediaUrl;
  } else if (product.image_url) {
    mediaUrl = product.image_url;
  }

  return {
    id: product.id || Math.random().toString(),
    title,
    description,
    priceData: {
      price,
      discountedPrice
    },
    media: [
      {
        url: mediaUrl
      }
    ],
    url: product.url || `https://www.shopier.com/Product?productId=${product.id}`
  };
}

// Mucizevi Gelişim / Konforlu Girişimci Mağazasına uygun kaliteli yedek demo ürünler
function getDemoProducts() {
  return [
    {
      id: "demo-1",
      title: "Kişisel Numeroloji Analizi",
      description: "Doğum tarihinize ve tam isminize göre hazırlanan kapsamlı numeroloji analizi ile hayat yolculuğunuzu, kader sayınızı ve potansiyelinizi keşfedin.",
      priceData: {
        price: "249.99",
        discountedPrice: "199.99"
      },
      media: [
        {
          url: "https://cdn.shopier.app/pictures_large/gelisimokulu_3fa373ede19729a90366cfee62979caf.png"
        }
      ],
      url: "#"
    },
    {
      id: "demo-2",
      title: "Detaylı İsim Analizi",
      description: "İsminizin taşıdığı harflerin enerjisini, numerolojik değerlerini ve hayatınıza olan etkilerini inceleyen profesyonel analiz raporu.",
      priceData: {
        price: "149.99",
        discountedPrice: null
      },
      media: [
        {
          url: "https://cdn.shopier.app/pictures_large/gelisimokulu_3fa373ede19729a90366cfee62979caf.png"
        }
      ],
      url: "#"
    },
    {
      id: "demo-3",
      title: "Jean Adrienne Arınma Sistemi (JAAS) Seansı",
      description: "Blokajlarınızı, bilinçaltı engellerinizi ve geçmişten gelen yüklerinizi arındırmaya yönelik birebir online JAAS seansı.",
      priceData: {
        price: "450.00",
        discountedPrice: "399.99"
      },
      media: [
        {
          url: "https://cdn.shopier.app/pictures_large/gelisimokulu_3fa373ede19729a90366cfee62979caf.png"
        }
      ],
      url: "#"
    },
    {
      id: "demo-4",
      title: "Hastalıkların Ruhsal ve Zihinsel Nedenleri Analizi",
      description: "Yaşadığınız fiziksel rahatsızlıkların temelinde yatan zihinsel inanç kalıplarını ve ruhsal sebepleri çözümleyen rehberlik çalışması.",
      priceData: {
        price: "299.99",
        discountedPrice: "249.99"
      },
      media: [
        {
          url: "https://cdn.shopier.app/pictures_large/gelisimokulu_3fa373ede19729a90366cfee62979caf.png"
        }
      ],
      url: "#"
    }
  ];
}