// test-endpoints-expanded.js
// Bu dosyayı çalıştırmak için: node test-endpoints-expanded.js
// Önce .env.local dosyasını oluşturupSHOPIER_API_TOKEN eklemeyi unutmayın!

require('dotenv').config();

const token = process.env.SHOPIER_API_TOKEN;
const apiUrl = process.env.SHOPIER_API_URL;

async function testAll() {
  console.log('Token check:', token ? 'Exists' : 'Missing');

  const endpoints = [
    `${apiUrl}/shop`,
    `${apiUrl}/orders`,
    `${apiUrl}/products`,
    `${apiUrl}/discounts`,
    `${apiUrl}/payouts`,
    `${apiUrl}/refunds`,
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`\nTesting: ${endpoint}`);
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      });
      console.log(`Status: ${response.status}`);
      const text = await response.text();
      console.log(`Response: ${text.substring(0, 500)}`);
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  }
}

testAll();
