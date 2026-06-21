// Hücre açıklamalarını döndüren yardımcı fonksiyon
//C:\Users\sifre\Desktop\megaproje\src\components\MegaTablo.js


const InancTablosu = (cellId) => {
  const descriptions = {
    'A1': 'A1 hücresinin açıklaması buraya gelecek',
    'A2': 'A2 hücresinin açıklaması buraya gelecek',
    'A3': 'A3 hücresinin açıklaması buraya gelecek',
    'B1': 'Merhaba',
    'B2': 'B2 hücresinin açıklaması buraya gelecek',
    'B3': 'B3 hücresinin açıklaması buraya gelecek',
    'C1': 'C1 hücresinin açıklaması buraya gelecek',
    'C2': 'C2 hücresinin açıklaması buraya gelecek',
    'C3': 'C3 hücresinin açıklaması buraya gelecek',
    'C4': 'C4 hücresinin açıklaması buraya gelecek',
    'C5': 'C5 hücresinin açıklaması buraya gelecek',
    // Diğer tüm hücreler için açıklamaları buraya ekleyin
  };
  
  return descriptions[cellId] || `${cellId} hücresinin açıklaması`;
  
};

export default InancTablosu; // Default export