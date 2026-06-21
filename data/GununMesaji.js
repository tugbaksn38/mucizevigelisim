// C:\Users\sifre\Desktop\mucizevigelisim\data\GununMesaji.js


// Günün mesajlarını ve ayetleri içeren yardımcı fonksiyonlar
const mesajlar = [
  {
    id: 1,
    mesaj: {
      tr: "Allah, size kolaylık diler, zorluk dilemez.",
      en: "Allah intends ease for you, and does not want to make things difficult for you.",
      fr: "Allah veut la facilité pour vous, et ne veut pas vous imposer de difficultés.",
      ar: "يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ"
    },
    ayet: {
      tr: "Bakara Suresi, 185. Ayet",
      en: "Surah Al-Baqarah, Verse 185",
      fr: "Sourate Al-Baqarah, Verset 185",
      ar: "سورة البقرة، الآية 185"
    },
    aciklama: {
      tr: "Allah sizin için dini yaşamayı kolaylaştırmak ister, zorlaştırmak istemez.",
      en: "Allah wants to make religion easy for you to practice, not difficult.",
      fr: "Allah veut rendre la religion facile à pratiquer pour vous, pas difficile.",
      ar: "الله يريد أن يجعل الدين سهلاً لك لممارسته، وليس صعباً."
    }
  },
  {
    id: 2,
    mesaj: {
      tr: "Şüphesiz ki zorlukla beraber bir kolaylık vardır.",
      en: "Indeed, with hardship comes ease.",
      fr: "Certes, avec la difficulté vient la facilité.",
      ar: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا"
    },
    ayet: {
      tr: "İnşirah Suresi, 5. Ayet",
      en: "Surah Ash-Sharh, Verse 5",
      fr: "Sourate Ash-Sharh, Verset 5",
      ar: "سورة الشرح، الآية 5"
    },
    aciklama: {
      tr: "Her zorluğun ardından mutlaka bir kolaylık vardır.",
      en: "After every difficulty, there is certainly ease.",
      fr: "Après chaque difficulté, il y a certainement de la facilité.",
      ar: "بعد كل صعوبة، هناك بالتأكيد سهولة."
    }
  },
  {
    id: 3,
    mesaj: {
      tr: "Sabır ve namaz ile Allah'tan yardım isteyin.",
      en: "Seek help from Allah through patience and prayer.",
      fr: "Demandez de l'aide à Allah par la patience et la prière.",
      ar: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ"
    },
    ayet: {
      tr: "Bakara Suresi, 45. Ayet",
      en: "Surah Al-Baqarah, Verse 45",
      fr: "Sourate Al-Baqarah, Verset 45",
      ar: "سورة البقرة، الآية 45"
    },
    aciklama: {
      tr: "Zorluklara karşı sabırlı olun ve namazla Allah'a yönelin.",
      en: "Be patient in the face of difficulties and turn to Allah through prayer.",
      fr: "Soyez patient face aux difficultés et tournez-vous vers Allah par la prière.",
      ar: "كن صبوراً في وجه الصعوبات والتوجه إلى الله من خلال الصلاة."
    }
  },
  {
    id: 4,
    mesaj: {
      tr: "Hiç şüphesiz, Allah adaletli davrananları sever.",
      en: "Indeed, Allah loves those who act justly.",
      fr: "Certes, Allah aime ceux qui agissent avec justice.",
      ar: "إِنَّ اللَّهَ يُحِبُّ الْمُقْسِطِينَ"
    },
    ayet: {
      tr: "Hucurat Suresi, 9. Ayet",
      en: "Surah Al-Hujurat, Verse 9",
      fr: "Sourate Al-Hujurat, Verset 9",
      ar: "سورة الحجرات، الآية 9"
    },
    aciklama: {
      tr: "Adalet her koşulda gözetilmesi gereken bir erdemdir.",
      en: "Justice is a virtue that must be observed under all circumstances.",
      fr: "La justice est une vertu qui doit être observée en toutes circonstances.",
      ar: "العدالة فضيلة يجب مراعاتها في جميع الظروف."
    }
  },
  {
    id: 5,
    mesaj: {
      tr: "İnsanlara teşekkür etmeyen, Allah'a da şükretmez.",
      en: "He who does not thank people, does not thank Allah.",
      fr: "Celui qui ne remercie pas les gens, ne remercie pas Allah.",
      ar: "لا يَشْكُرُ اللَّهَ مَنْ لا يَشْكُرُ النَّاسَ"
    },
    ayet: {
      tr: "Hadis-i Şerif",
      en: "Hadith",
      fr: "Hadith",
      ar: "حديث"
    },
    aciklama: {
      tr: "Küçük büyük demeden tüm iyiliklere teşekkür etmek gerekir.",
      en: "One should be thankful for all favors, big and small.",
      fr: "Il faut être reconnaissant pour toutes les faveurs, grandes et petites.",
      ar: "يجب أن يكون المرء ممتناً لجميع الفضائل، الكبيرة والصغيرة."
    }
  },
  {
    id: 6,
    mesaj: {
      tr: "İman edenler ve salih amel işleyenler için Rahman, (gönüllere) bir sevgi koyacaktır.",
      en: "For those who believe and do righteous deeds, the Most Merciful will appoint love.",
      fr: "Pour ceux qui croient et accomplissent de bonnes actions, le Tout Miséricordieux établira l'amour.",
      ar: "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ سَيَجْعَلُ لَهُمُ الرَّحْمَٰنُ وُدًّا"
    },
    ayet: {
      tr: "Meryem Suresi, 96. Ayet",
      en: "Surah Maryam, Verse 96",
      fr: "Sourate Maryam, Verset 96",
      ar: "سورة مريم، الآية 96"
    },
    aciklama: {
      tr: "İnanç ve iyi davranışlar insanların sevgisini kazanmanın yoludur.",
      en: "Faith and good deeds are the way to gain people's love.",
      fr: "La foi et les bonnes actions sont le moyen de gagner l'amour des gens.",
      ar: "الإيمان والأعمال الصالحة هي طريق لكسب محبة الناس."
    }
  },
  {
    id: 7,
    mesaj: {
      tr: "Bir hayır işleyene, ondan daha iyisiyle karşılık verilir.",
      en: "Whoever does a good deed will be rewarded with something better.",
      fr: "Quiconque fait une bonne action sera récompensé par quelque chose de mieux.",
      ar: "مَنْ جَاءَ بِالْحَسَنَةِ فَلَهُ خَيْرٌ مِنْهَا"
    },
    ayet: {
      tr: "Kasas Suresi, 84. Ayet",
      en: "Surah Al-Qasas, Verse 84",
      fr: "Sourate Al-Qasas, Verset 84",
      ar: "سورة القصص، الآية 84"
    },
    aciklama: {
      tr: "Yaptığınız iyilikler size katlanarak geri dönecektir.",
      en: "The good you do will come back to you multiplied.",
      fr: "Le bien que vous faites vous reviendra multiplié.",
      ar: "الخير الذي تفعله سيعود إليك مضاعفاً."
    }
  },
  {
    id: 8,
    mesaj: {
      tr: "Allah, sizin içinizden iman edenlere ve salih amel işleyenlere mağfiret ve büyük bir mükâfat vaat etmiştir.",
      en: "Allah has promised those who believe and do righteous deeds forgiveness and a great reward.",
      fr: "Allah a promis à ceux qui croient et accomplissent de bonnes actions le pardon et une grande récompense.",
      ar: "وَعَدَ اللَّهُ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ لَهُمْ مَغْفِرَةٌ وَأَجْرٌ عَظِيمٌ"
    },
    ayet: {
      tr: "Fetih Suresi, 29. Ayet",
      en: "Surah Al-Fath, Verse 29",
      fr: "Sourate Al-Fath, Verset 29",
      ar: "سورة الفتح، الآية 29"
    },
    aciklama: {
      tr: "İman ve iyi davranışlar büyük ödüllere gebedir.",
      en: "Faith and good deeds lead to great rewards.",
      fr: "La foi et les bonnes actions mènent à de grandes récompenses.",
      ar: "الإيمان والأعمال الصالحة تؤدي إلى مكافآت عظيمة."
    }
  },
  {
    id: 9,
    mesaj: {
      tr: "Ey iman edenler! Allah'a karşı gelmekten sakının ve doğrularla beraber olun.",
      en: "O you who have believed, fear Allah and be with those who are true.",
      fr: "Ô vous qui avez cru, craignez Allah et soyez avec ceux qui sont véridiques.",
      ar: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَكُونُوا مَعَ الصَّادِقِينَ"
    },
    ayet: {
      tr: "Tevbe Suresi, 119. Ayet",
      en: "Surah At-Tawbah, Verse 119",
      fr: "Sourate At-Tawbah, Verset 119",
      ar: "سورة التوبة، الآية 119"
    },
    aciklama: {
      tr: "Daima doğru insanlarla birlikte olmak önemlidir.",
      en: "It is important to always be with truthful people.",
      fr: "Il est important de toujours être avec des personnes véridiques.",
      ar: "من المهم أن تكون دائماً مع الأشخاص الصادقين."
    }
  },
  {
    id: 10,
    mesaj: {
      tr: "Muhakkak ki Allah, adaleti, iyiliği, akrabaya yardım etmeyi emreder.",
      en: "Indeed, Allah orders justice and good conduct and giving to relatives.",
      fr: "Certes, Allah ordonne la justice, la bonne conduite et l'aide aux proches.",
      ar: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ"
    },
    ayet: {
      tr: "Nahl Suresi, 90. Ayet",
      en: "Surah An-Nahl, Verse 90",
      fr: "Sourate An-Nahl, Verset 90",
      ar: "سورة النحل، الآية 90"
    },
    aciklama: {
      tr: "Adalet ve iyilik hayatın temel prensipleridir.",
      en: "Justice and goodness are the fundamental principles of life.",
      fr: "La justice et la bonté sont les principes fondamentaux de la vie.",
      ar: "العدالة والخير هما المبادئ الأساسية للحياة."
    }
  },
  {
    id: 11,
    mesaj: {
      tr: "Allah, hiç kimseye gücünün yettiğinden başka yük yüklemez.",
      en: "Allah does not burden a soul beyond that it can bear.",
      fr: "Allah n'impose à aucune âme une charge supérieure à sa capacité.",
      ar: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا"
    },
    ayet: {
      tr: "Bakara Suresi, 286. Ayet",
      en: "Surah Al-Baqarah, Verse 286",
      fr: "Sourate Al-Baqarah, Verset 286",
      ar: "سورة البقرة، الآية 286"
    },
    aciklama: {
      tr: "Allah kullarına asla taşıyamayacakları yükü yüklemez.",
      en: "Allah never burdens His servants with more than they can bear.",
      fr: "Allah ne charge jamais Ses serviteurs de plus qu'ils ne peuvent supporter.",
      ar: "الله لا يثقل عباده أبداً بأكثر مما يستطيعون تحمله."
    }
  },
  {
    id: 12,
    mesaj: {
      tr: "Öfkeye kapıldığınız zaman hemen affedici olun.",
      en: "When you become angry, immediately be forgiving.",
      fr: "Lorsque vous vous mettez en colère, soyez immédiatement indulgent.",
      ar: "وَإِذَا مَا غَضِبُوا هُمْ يَغْفِرُونَ"
    },
    ayet: {
      tr: "Şura Suresi, 37. Ayet",
      en: "Surah Ash-Shura, Verse 37",
      fr: "Sourate Ash-Shura, Verset 37",
      ar: "سورة الشورى، الآية 37"
    },
    aciklama: {
      tr: "Öfke anında sabırlı ve affedici olmak erdemdir.",
      en: "It is a virtue to be patient and forgiving in moments of anger.",
      fr: "C'est une vertu d'être patient et indulgent dans les moments de colère.",
      ar: "إنها فضيلة أن تكون صبوراً ومتسامحاً في لحظات الغضب."
    }
  },
  {
    id: 13,
    mesaj: {
      tr: "Rabbiniz, kendine zulmedenleri affetmeyi kabul etmiştir.",
      en: "Your Lord has accepted to forgive those who wrong themselves.",
      fr: "Votre Seigneur a accepté de pardonner à ceux qui se font du tort à eux-mêmes.",
      ar: "وَإِنَّ رَبَّكَ لَذُو مَغْفِرَةٍ لِلنَّاسِ عَلَىٰ ظُلْمِهِمْ"
    },
    ayet: {
      tr: "En'am Suresi, 54. Ayet",
      en: "Surah Al-An'am, Verse 54",
      fr: "Sourate Al-An'am, Verset 54",
      ar: "سورة الأنعام، الآية 54"
    },
    aciklama: {
      tr: "Allah, hata yapan kullarını affetmeye hazırdır; yeter ki samimi bir dönüş olsun.",
      en: "Allah is ready to forgive His servants who make mistakes; as long as there is sincere repentance.",
      fr: "Allah est prêt à pardonner à Ses serviteurs qui font des erreurs; pourvu qu'il y ait un repentir sincère.",
      ar: "الله مستعد ليغفر لعباده الذين يخطئون؛ طالما هناك توبة صادقة."
    }
  },
  {
    id: 14,
    mesaj: {
      tr: "Kalpler ancak Allah'ı anmakla huzur bulur.",
      en: "Hearts find peace only in the remembrance of Allah.",
      fr: "Les cœurs ne trouvent la paix que dans le souvenir d'Allah.",
      ar: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ"
    },
    ayet: {
      tr: "Ra'd Suresi, 28. Ayet",
      en: "Surah Ar-Ra'd, Verse 28",
      fr: "Sourate Ar-Ra'd, Verset 28",
      ar: "سورة الرعد، الآية 28"
    },
    aciklama: {
      tr: "Gerçek huzur, Allah'a yönelmekle ve O'nu anmakla gelir.",
      en: "True peace comes from turning to Allah and remembering Him.",
      fr: "La vraie paix vient en se tournant vers Allah et en se souvenant de Lui.",
      ar: "السلام الحقيقي يأتي من التوجه إلى الله وذكره."
    }
  },
  {
    id: 15,
    mesaj: {
      tr: "De ki: Ey kendilerine zulmeden kullarım! Allah'ın rahmetinden ümit kesmeyin.",
      en: "Say: O My servants who have transgressed against themselves, do not despair of the mercy of Allah.",
      fr: "Dis: Ô Mes serviteurs qui avez transgressé contre vous-mêmes, ne désespérez pas de la miséricorde d'Allah.",
      ar: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنْفُسِهِمْ لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ"
    },
    ayet: {
      tr: "Zümer Suresi, 53. Ayet",
      en: "Surah Az-Zumar, Verse 53",
      fr: "Sourate Az-Zumar, Verset 53",
      ar: "سورة الزمر، الآية 53"
    },
    aciklama: {
      tr: "Ne kadar hata yapılmış olursa olsun, Allah'ın rahmeti her şeyden büyüktür.",
      en: "No matter how many mistakes have been made, Allah's mercy is greater than anything.",
      fr: "Peu importe le nombre d'erreurs commises, la miséricorde d'Allah est plus grande que tout.",
      ar: "بغض النظر عن عدد الأخطاء المرتكبة، رحمة الله أكبر من أي شيء."
    }
  },
  {
    id: 16,
    mesaj: {
      tr: "Kim Allah'a tevekkül ederse, O ona yeter.",
      en: "Whoever relies upon Allah - then He is sufficient for him.",
      fr: "Quiconque place sa confiance en Allah - alors Il lui suffit.",
      ar: "وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ"
    },
    ayet: {
      tr: "Talak Suresi, 3. Ayet",
      en: "Surah At-Talaq, Verse 3",
      fr: "Sourate At-Talaq, Verset 3",
      ar: "سورة الطلاق، الآية 3"
    },
    aciklama: {
      tr: "Güvenini Allah'a bırakan kişi, en sağlam desteği bulur.",
      en: "The person who places their trust in Allah finds the strongest support.",
      fr: "La personne qui place sa confiance en Allah trouve le soutien le plus fort.",
      ar: "الشخص الذي يضع ثقته في الله يجد أقوى دعم."
    }
  },
  {
    id: 17,
    mesaj: {
      tr: "Allah sabredenlerle beraberdir.",
      en: "Allah is with the patient.",
      fr: "Allah est avec les patients.",
      ar: "وَإِنَّ اللَّهَ مَعَ الصَّابِرِينَ"
    },
    ayet: {
      tr: "Bakara Suresi, 153. Ayet",
      en: "Surah Al-Baqarah, Verse 153",
      fr: "Sourate Al-Baqarah, Verset 153",
      ar: "سورة البقرة، الآية 153"
    },
    aciklama: {
      tr: "Sabır gösterenler, Allah'ın özel desteğini ve yakınlığını hisseder.",
      en: "Those who show patience feel Allah's special support and closeness.",
      fr: "Ceux qui font preuve de patience ressentent le soutien spécial et la proximité d'Allah.",
      ar: "أولئك الذين يظهرون الصبر يشعرون بالدعم الخاص والقرب من الله."
    }
  },
  {
    id: 18,
    mesaj: {
      tr: "Gecenin bir kısmında uyanıp dua edenleri Rabbin övgüyle anar.",
      en: "Your Lord praises those who wake up at night to pray.",
      fr: "Votre Seigneur loue ceux qui se réveillent la nuit pour prier.",
      ar: "كَانُوا قَلِيلًا مِنَ اللَّيْلِ مَا يَهْجَعُونَ وَبِالْأَسْحَارِ هُمْ يَسْتَغْفِرُونَ"
    },
    ayet: {
      tr: "Zariyat Suresi, 17-18. Ayetler",
      en: "Surah Adh-Dhariyat, Verses 17-18",
      fr: "Sourate Adh-Dhariyat, Versets 17-18",
      ar: "سورة الذاريات، الآيات 17-18"
    },
    aciklama: {
      tr: "Sessiz gecelerde edilen dualar, Allah katında çok kıymetlidir.",
      en: "Prayers made in the quiet of the night are very valuable in the sight of Allah.",
      fr: "Les prières faites dans le calme de la nuit sont très précieuses aux yeux d'Allah.",
      ar: "الصلوات التي تتم في هدوء الليل ثمينة جداً في نظر الله."
    }
  }
];
// Dil desteği için mesaj getirme fonksiyonu
export const dilDestekliMesajGetir = (dil = 'tr') => {
  return mesajlar.map(mesaj => ({
    id: mesaj.id,
    mesaj: mesaj.mesaj[dil] || mesaj.mesaj.tr,
    ayet: mesaj.ayet[dil] || mesaj.ayet.tr,
    aciklama: mesaj.aciklama[dil] || mesaj.aciklama.tr
  }));
};

// Günlük rastgele sıralanmış mesajları getirme fonksiyonu (dil desteği ile)
export const gunlukDilDestekliMesajlariGetir = (dil = 'tr') => {
  const dilMesajlari = dilDestekliMesajGetir(dil);
  
  // Bugünün tarihini al (sadece gün, ay ve yıl kısmı)
  const bugun = new Date();
  const bugunString = `${bugun.getDate()}-${bugun.getMonth()}-${bugun.getFullYear()}-${dil}`;
  
  // localStorage'dan kayıtlı tarihi ve sıralamayı al
  let kayitliTarih = null;
  let kayitliSiralama = null;
  
  if (typeof window !== 'undefined') {
    try {
      kayitliTarih = localStorage.getItem('mesajTarih');
      kayitliSiralama = localStorage.getItem('mesajSiralama');
    } catch (e) {
      console.error("localStorage erişim hatası:", e);
    }
  }
  
  // Eğer bugünün tarihi kayıtlı tarihle aynıysa ve kayıtlı sıralama varsa onu kullan
  if (kayitliTarih === bugunString && kayitliSiralama) {
    try {
      const siralamaIndeksleri = JSON.parse(kayitliSiralama);
      return siralamaIndeksleri.map(index => dilMesajlari[index]);
    } catch (e) {
      console.error("Kayıtlı sıralama parse hatası:", e);
    }
  }
  
  // Yeni bir rastgele sıralama oluştur
  const indeksler = Array.from({ length: dilMesajlari.length }, (_, i) => i);
  karistirDizi(indeksler);
  
  // Yeni sıralamayı localStorage'a kaydet
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('mesajTarih', bugunString);
      localStorage.setItem('mesajSiralama', JSON.stringify(indeksler));
    } catch (e) {
      console.error("localStorage kayıt hatası:", e);
    }
  }
  
  // Sıralanmış mesajları döndür
  return indeksler.map(index => dilMesajlari[index]);
};

// Diziyi karıştırma fonksiyonu (Fisher-Yates shuffle algorithm)
export function karistirDizi(dizi) {
  for (let i = dizi.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dizi[i], dizi[j]] = [dizi[j], dizi[i]];
  }
  return dizi;
}

// ID'ye göre mesaj bulma fonksiyonu (dil desteği ile)
export const idIleDilDestekliMesajBul = (id, dil = 'tr') => {
  if (!id) return null;
  const bulunanMesaj = mesajlar.find(mesaj => mesaj.id === parseInt(id));
  
  if (!bulunanMesaj) return null;
  
  return {
    id: bulunanMesaj.id,
    mesaj: bulunanMesaj.mesaj[dil] || bulunanMesaj.mesaj.tr,
    ayet: bulunanMesaj.ayet[dil] || bulunanMesaj.ayet.tr,
    aciklama: bulunanMesaj.aciklama[dil] || bulunanMesaj.aciklama.tr
  };
};

// Tüm mesajları getirme fonksiyonu (orijinal sıralama) - Geriye uyumluluk için
export const tumMesajlariGetir = () => {
  return dilDestekliMesajGetir('tr');
};

// Günlük mesajları getirme fonksiyonu - Geriye uyumluluk için
export const gunlukMesajlariGetir = () => {
  return gunlukDilDestekliMesajlariGetir('tr');
};

// ID'ye göre mesaj bulma fonksiyonu - Geriye uyumluluk için
export const idIleMesajBul = (id) => {
  return idIleDilDestekliMesajBul(id, 'tr');
};

/*
const mesajlar = [
  {
    id: 1,
    mesaj: "Allah, size kolaylık diler, zorluk dilemez.",
    ayet: "Bakara Suresi, 185. Ayet",
    aciklama: "Allah sizin için dini yaşamayı kolaylaştırmak ister, zorlaştırmak istemez."
  },
  {
    id: 2,
    mesaj: "Şüphesiz ki zorlukla beraber bir kolaylık vardır.",
    ayet: "İnşirah Suresi, 5. Ayet",
    aciklama: "Her zorluğun ardından mutlaka bir kolaylık vardır."
  },
  {
    id: 3,
    mesaj: "Sabır ve namaz ile Allah'tan yardım isteyin.",
    ayet: "Bakara Suresi, 45. Ayet",
    aciklama: "Zorluklara karşı sabırlı olun ve namazla Allah'a yönelin."
  },
  {
    id: 4,
    mesaj: "Hiç şüphesiz, Allah adaletli davrananları sever.",
    ayet: "Hucurat Suresi, 9. Ayet",
    aciklama: "Adalet her koşulda gözetilmesi gereken bir erdemdir."
  },
  {
    id: 5,
    mesaj: "İnsanlara teşekkür etmeyen, Allah'a da şükretmez.",
    ayet: "Hadis-i Şerif",
    aciklama: "Küçük büyük demeden tüm iyiliklere teşekkür etmek gerekir."
  },
  {
    id: 6,
    mesaj: "İman edenler ve salih amel işleyenler için Rahman, (gönüllere) bir sevgi koyacaktır.",
    ayet: "Meryem Suresi, 96. Ayet",
    aciklama: "İnanç ve iyi davranışlar insanların sevgisini kazanmanın yoludur."
  },
  {
    id: 7,
    mesaj: "Bir hayır işleyene, ondan daha iyisiyle karşılık verilir.",
    ayet: "Kasas Suresi, 84. Ayet",
    aciklama: "Yaptığınız iyilikler size katlanarak geri dönecektir."
  },
  {
    id: 8,
    mesaj: "Allah, sizin içinizden iman edenlere ve salih amel işleyenlere mağfiret ve büyük bir mükâfat vaat etmiştir.",
    ayet: "Fetih Suresi, 29. Ayet",
    aciklama: "İman ve iyi davranışlar büyük ödüllere gebedir."
  },
  {
    id: 9,
    mesaj: "Ey iman edenler! Allah'a karşı gelmekten sakının ve doğrularla beraber olun.",
    ayet: "Tevbe Suresi, 119. Ayet",
    aciklama: "Daima doğru insanlarla birlikte olmak önemlidir."
  },
  {
    id: 10,
    mesaj: "Muhakkak ki Allah, adaleti, iyiliği, akrabaya yardım etmeyi emreder.",
    ayet: "Nahl Suresi, 90. Ayet",
    aciklama: "Adalet ve iyilik hayatın temel prensipleridir."
  },
  {
    id: 11,
    mesaj: "Allah, hiç kimseye gücünün yettiğinden başka yük yüklemez.",
    ayet: "Bakara Suresi, 286. Ayet",
    aciklama: "Allah kullarına asla taşıyamayacakları yükü yüklemez."
  },
  {
    id: 12,
    mesaj: "Öfkeye kapıldığınız zaman hemen affedici olun.",
    ayet: "Şura Suresi, 37. Ayet",
    aciklama: "Öfke anında sabırlı ve affedici olmak erdemdir."
  },

  {
  id: 13,
  mesaj: "Rabbiniz, kendine zulmedenleri affetmeyi kabul etmiştir.",
  ayet: "En'am Suresi, 54. Ayet",
  aciklama: "Allah, hata yapan kullarını affetmeye hazırdır; yeter ki samimi bir dönüş olsun."
},
{
  id: 14,
  mesaj: "Kalpler ancak Allah’ı anmakla huzur bulur.",
  ayet: "Ra’d Suresi, 28. Ayet",
  aciklama: "Gerçek huzur, Allah’a yönelmekle ve O’nu anmakla gelir."
},
{
  id: 15,
  mesaj: "De ki: Ey kendilerine zulmeden kullarım! Allah’ın rahmetinden ümit kesmeyin.",
  ayet: "Zümer Suresi, 53. Ayet",
  aciklama: "Ne kadar hata yapılmış olursa olsun, Allah’ın rahmeti her şeyden büyüktür."
},
{
  id: 16,
  mesaj: "Kim Allah’a tevekkül ederse, O ona yeter.",
  ayet: "Talak Suresi, 3. Ayet",
  aciklama: "Güvenini Allah’a bırakan kişi, en sağlam desteği bulur."
},
{
  id: 17,
  mesaj: "Allah sabredenlerle beraberdir.",
  ayet: "Bakara Suresi, 153. Ayet",
  aciklama: "Sabır gösterenler, Allah’ın özel desteğini ve yakınlığını hisseder."
},
{
  id: 18,
  mesaj: "Gecenin bir kısmında uyanıp dua edenleri Rabbin övgüyle anar.",
  ayet: "Zariyat Suresi, 17-18. Ayetler",
  aciklama: "Sessiz gecelerde edilen dualar, Allah katında çok kıymetlidir."
}

];

// Günlük rastgele sıralanmış mesajları getirme fonksiyonu
export const gunlukMesajlariGetir = () => {
  // Bugünün tarihini al (sadece gün, ay ve yıl kısmı)
  const bugun = new Date();
  const bugunString = `${bugun.getDate()}-${bugun.getMonth()}-${bugun.getFullYear()}`;
  
  // localStorage'dan kayıtlı tarihi ve sıralamayı al
  let kayitliTarih = null;
  let kayitliSiralama = null;
  
  if (typeof window !== 'undefined') {
    try {
      kayitliTarih = localStorage.getItem('mesajTarih');
      kayitliSiralama = localStorage.getItem('mesajSiralama');
    } catch (e) {
      console.error("localStorage erişim hatası:", e);
    }
  }
  
  // Eğer bugünün tarihi kayıtlı tarihle aynıysa ve kayıtlı sıralama varsa onu kullan
  if (kayitliTarih === bugunString && kayitliSiralama) {
    try {
      const siralamaIndeksleri = JSON.parse(kayitliSiralama);
      return siralamaIndeksleri.map(index => mesajlar[index]);
    } catch (e) {
      console.error("Kayıtlı sıralama parse hatası:", e);
    }
  }
  
  // Yeni bir rastgele sıralama oluştur
  const indeksler = Array.from({ length: mesajlar.length }, (_, i) => i);
  karistirDizi(indeksler);
  
  // Yeni sıralamayı localStorage'a kaydet
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('mesajTarih', bugunString);
      localStorage.setItem('mesajSiralama', JSON.stringify(indeksler));
    } catch (e) {
      console.error("localStorage kayıt hatası:", e);
    }
  }
  
  // Sıralanmış mesajları döndür
  return indeksler.map(index => mesajlar[index]);
};

// Diziyi karıştırma fonksiyonu (Fisher-Yates shuffle algorithm)
export function karistirDizi(dizi) {
  for (let i = dizi.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dizi[i], dizi[j]] = [dizi[j], dizi[i]];
  }
  return dizi;
}


// ID'ye göre mesaj bulma fonksiyonu
export const idIleMesajBul = (id) => {
  if (!id) return null;
  return mesajlar.find(mesaj => mesaj.id === parseInt(id));
};

// Tüm mesajları getirme fonksiyonu (orijinal sıralama)
export const tumMesajlariGetir = () => {
  return mesajlar;
};
*/