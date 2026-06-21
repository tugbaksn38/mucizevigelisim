// src/app/api/shopier/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Shopier API endpoint'i - gerçek endpoint'i kontrol edin
    const apiUrl = process.env.SHOPIER_API_URL || 'https://api.shopier.com/v1';
    
    const response = await fetch(`${apiUrl}/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.SHOPIER_API_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error('Shopier API error:', response.status, response.statusText);
      throw new Error(`Shopier API error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Shopier API response:', data);

    return NextResponse.json({
      products: data.products || data || [],
    });
  } catch (error) {
    console.error('Shopier API catch error:', error);
    return NextResponse.json(
      {
        products: [
          {
            id: 999,
            name: "Demo Ürün",
            description: "Bu bir demo üründür. API bağlantısı kurulamadı.",
            price: 99.99,
            image_url: "https://cdn.shopier.app/pictures_large/gelisimokulu_3fa373ede19729a90366cfee62979caf.png",
            url: "#",
          },
        ],
        error: error.message,
      },
      { status: 500 }
    );
  }
}