// C:\Users\sifre\Desktop\mucizevigelisim\app\(site)\numeroloji\page.js


"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NumerolojiPdf } from "@/data/numeroloji/NumerolojiPdf";
import { generateNumerologyEmail } from "@/data/numeroloji/email";
import { AutoTranslate } from "@/data/lang-sistem";

export default function NumerologyPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    email: "",
    deliveryType: "pdf",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Numeroloji hesaplama fonksiyonları
  const reduceToSingleDigit = (number) => {
    let num = parseInt(number);
    if (isNaN(num)) return 0;

    while (num > 9 && ![11, 22, 33].includes(num)) {
      num = num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit), 0);
    }

    return num;
  };

  // 1️⃣ Yaşam Yolu Sayısı Hesaplama
  const calculateLifePathNumber = (day, month, year) => {
    const dayNum = reduceToSingleDigit(day);
    const monthNum = reduceToSingleDigit(month);
    const yearNum = reduceToSingleDigit(year);

    let lifePath = dayNum + monthNum + yearNum;

    if ([11, 22, 33].includes(lifePath)) {
      return lifePath;
    }

    return reduceToSingleDigit(lifePath);
  };

  // 2️⃣ İfade/İsim Sayısı Hesaplama
  const calculateExpressionNumber = (firstName, lastName) => {
    const fullName = `${firstName} ${lastName}`.toUpperCase();
       const letterValues = {
  A: 1, B: 2, C: 3, Ç: 3, D: 4, E: 5,
  F: 6, G: 7, Ğ: 7, H: 8, I: 9, İ: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6,
  Ö: 6, P: 7, Q: 8, R: 9, S: 1, Ş: 1,
  T: 2, U: 3, Ü: 3, V: 4, W: 5, X: 6,
  Y: 7, Z: 8,
};


    let total = 0;
    for (let char of fullName) {
      if (char !== " " && letterValues[char]) {
        total += letterValues[char];
      }
    }

    return reduceToSingleDigit(total);
  };

// 3️⃣ Ruh Arzusu Sayısı Hesaplama
const calculateSoulUrgeNumber = (firstName, lastName) => {
  const fullName = `${firstName} ${lastName}`.toUpperCase();
  const vowels = new Set(["A", "E", "I", "İ", "O", "Ö", "U", "Ü"]);

  const letterValues = {
    A: 1, B: 2, C: 3, Ç: 3, D: 4, E: 5,
    F: 6, G: 7, Ğ: 7, H: 8, I: 9, İ: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6,
    Ö: 6, P: 7, Q: 8, R: 9, S: 1, Ş: 1,
    T: 2, U: 3, Ü: 3, V: 4, W: 5, X: 6,
    Y: 7, Z: 8,
  };

  let total = 0;
  for (let char of fullName) {
    if (vowels.has(char) && letterValues[char]) { // includes yerine has kullan
      total += letterValues[char];
    }
  }

  return reduceToSingleDigit(total);
};

// 4️⃣ Kişilik Sayısı Hesaplama
const calculatePersonalityNumber = (firstName, lastName) => {
  const fullName = `${firstName} ${lastName}`.toUpperCase();
  const vowels = new Set(["A", "E", "I", "İ", "O", "Ö", "U", "Ü"]);

  const letterValues = {
    A: 1, B: 2, C: 3, Ç: 3, D: 4, E: 5,
    F: 6, G: 7, Ğ: 7, H: 8, I: 9, İ: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6,
    Ö: 6, P: 7, Q: 8, R: 9, S: 1, Ş: 1,
    T: 2, U: 3, Ü: 3, V: 4, W: 5, X: 6,
    Y: 7, Z: 8,
  };

  let total = 0;
  for (let char of fullName) {
    if (char !== " " && !vowels.has(char) && letterValues[char]) { // includes yerine has kullan
      total += letterValues[char];
    }
  }

  return reduceToSingleDigit(total);
};
  //------------------------------------------------------------------------
  const getKarmicDebts = (day, month, year, firstName, lastName) => {
    const karmicNumbers = [13, 14, 16, 19];
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    let debts = [];

    // Doğum tarihinin her bir bölümünü kontrol et
    [dayNum, monthNum, yearNum].forEach((num) => {
      if (karmicNumbers.includes(num)) debts.push(num);
      num
        .toString()
        .split("")
        .forEach((digit) => {
          const digitNum = parseInt(digit);
          if (karmicNumbers.includes(digitNum) && !debts.includes(digitNum))
            debts.push(digitNum);
        });
    });

    // İsimdeki sayıları kontrol et
    const fullName = `${firstName} ${lastName}`.toUpperCase();
       const letterValues = {
  A: 1, B: 2, C: 3, Ç: 3, D: 4, E: 5,
  F: 6, G: 7, Ğ: 7, H: 8, I: 9, İ: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6,
  Ö: 6, P: 7, Q: 8, R: 9, S: 1, Ş: 1,
  T: 2, U: 3, Ü: 3, V: 4, W: 5, X: 6,
  Y: 7, Z: 8,
};


    const presentNumbers = new Set();
    for (let char of fullName) {
      if (char !== " " && letterValues[char]) {
        presentNumbers.add(letterValues[char]);
        if (
          karmicNumbers.includes(letterValues[char]) &&
          !debts.includes(letterValues[char])
        ) {
          debts.push(letterValues[char]);
        }
      }
    }

    // Karmik dersler (eksik sayılar)
    const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const missingNumbers = allNumbers.filter((num) => !presentNumbers.has(num));

    const lessonDescriptions = {
      1: "Bağımsızlık, liderlik ve inisiyatif alma. 1 sayısı eksik olan kişiler, kendi kararlarını almada zorlanabilir, pasif veya bağımlı bir tutum sergileyebilirler. Bu karmik derste, cesur adımlar atmayı, kendi yolunuzu çizmeyi, sorumluluk almayı ve girişimci ruhu geliştirmeyi öğrenmeniz gerekir.",
      2: "İşbirliği, uyum ve diplomasi. 2 sayısı eksikse, ilişkilerde sabırsızlık, çatışmaya meyil veya aşırı bireysellik görülebilir. Bu karmik ders, empati kurmayı, başkalarıyla uyum içinde çalışmayı, duygusal zekayı ve esnekliği geliştirmeyi amaçlar.",
      3: "Yaratıcılık, kendini ifade etme ve neşe. 3 eksik olduğunda, kişi duygularını, fikirlerini veya yeteneklerini ifade etmekte zorlanabilir. Bu karmik ders, sanatsal yetenekleri geliştirmeyi, kendini açıkça ifade etmeyi ve hayatı neşeyle deneyimlemeyi öğretir.",
      4: "Sorumluluk, disiplin ve istikrar. 4 eksikse, düzensizlik, plansızlık veya pratik konularda zorlanma görülebilir. Bu karmik ders, planlama becerilerini, kararlılığı, çalışkanlığı ve güvenilir olmayı öğrenmeyi gerektirir.",
      5: "Özgürlük, esneklik ve değişim yönetimi. 5 eksik olduğunda, kişi değişimlerden korkabilir veya rutine fazla bağlı kalabilir. Bu karmik ders, risk almayı, yeniliklere açık olmayı, özgür düşünmeyi ve esnekliği geliştirmeyi amaçlar.",
      6: "Sorumluluk, şefkat ve hizmet. 6 eksikse, aile ilişkilerinde veya toplumsal sorumluluklarda eksiklikler görülebilir. Bu karmik ders, başkalarına hizmet etmeyi, adalet ve sorumluluk duygusunu geliştirmeyi, sevgi ve koruyuculuk yeteneklerini öğrenmeyi kapsar.",
      7: "İçsel farkındalık, analiz ve spiritüel gelişim. 7 eksikse, kişi derin düşünce ve sezgi yeteneklerini yeterince kullanamayabilir. Bu karmic ders, yalnız kalmayı, meditasyonu, analiz yeteneğini, ruhsal araştırmaları ve gizemli konulara ilgi duymayı öğretir.",
      8: "Güç, maddi denge ve sorumluluk. 8 eksik olduğunda, kişi finansal veya maddi konularda dengesizlik yaşayabilir veya otorite ile sorunlar yaşayabilir. Bu karmik ders, güç ve sorumluluk dengesini öğrenmeyi, kararlı olmayı, hedeflere ulaşmak için disiplin geliştirmeyi kapsar.",
      9: "İdealizm, insanlığa hizmet ve tamamlama. 9 eksikse, kişi başkalarına yardım etme ve evrensel değerlere odaklanmada eksiklik gösterebilir. Bu karmik ders, fedakarlık, empati, idealizm, şefkat ve daha büyük amaçlar için çalışmayı öğretir.",
    };

    const lessonsWithDetails = missingNumbers.map(
      (num) => `${num}: ${lessonDescriptions[num]}`
    );

    return {
      debts:
        debts.length > 0
          ? debts
          : "Karmik borç sayılarınız bulunmamaktadır. Geçmiş yaşamlarınızda dengeli ve sorumlu davranmışsınız.",
      lessons:
        lessonsWithDetails.length > 0
          ? lessonsWithDetails.join("\n")
          : "İsminizde tüm sayılar mevcut. Özel bir karmik dersiniz bulunmamaktadır.",
    };
  };

  //---------------------------

  // 6️⃣ Eksik Çakra Hesaplama
  const analyzeChakras = (
    lifePathNumber,
    expressionNumber,
    soulUrgeNumber,
    personalityNumber
  ) => {
    // Her sayı için çakra ilişkileri
const chakraAssociations = {
  1: "Kök çakra (Muladhara) – Fiziksel varoluş, güvenlik ve temel ihtiyaçlar. 1 sayısı güçlü bir liderlik ve irade enerjisini temsil eder, ancak kök çakrada dengesizlik, güvensizlik ve hayatta kalma korkularına yol açabilir. Bu sayıya sahip bireyler, fiziksel dünyada kendilerini sağlam ve güvende hissetmeyi öğrenmelidir.",
  
  2: "Sakral çakra (Svadhisthana) – Duygusal akış, yaratıcılık ve ilişkiler. 2 sayısı uyum, işbirliği ve duygusal hassasiyet ile bağlantılıdır. Sakral çakrada tıkanıklık, duygusal dengesizlik, bağımlılık veya yaratıcı blokajları tetikleyebilir. Bu enerji, başkalarıyla sağlıklı duygusal bağlar kurmayı ve içsel yaratıcılığı geliştirmeyi gerektirir.",
  
  3: "Solar pleksus çakra (Manipura) – Kişisel güç, özgüven ve ifade yeteneği. 3 sayısı yaratıcılık ve sosyal etkileşim enerjisini temsil eder. Dengesizse, kendini ifade etmede güçlük, özgüvensizlik veya pasif-agresif davranışlar görülebilir. Bu çakra, kişisel yetenekleri ortaya koyma ve sosyal ortamda kendini doğru şekilde ifade etme kapasitesini güçlendirir.",
  
  4: "Kalp çakra (Anahata) – Sevgi, şefkat ve denge. 4 sayısı sorumluluk ve istikrar ile ilişkilidir. Kalp çakrasında dengesizlik, aşırı eleştirellik, duygusal kapanma veya sevdiklerine karşı mesafeli davranma ile ortaya çıkabilir. Bu sayı, sevgiyi koşulsuz kabul etmeyi ve duygusal bağları derinleştirmeyi öğretir.",
  
  5: "Boğaz çakra (Vishuddha) – İletişim, ifade ve özgür irade. 5 sayısı değişim, çeşitlilik ve özgürlük enerjisini taşır. Boğaz çakrasında tıkanıklık, kendini ifade edememe, korkaklık veya yalan söyleme eğilimlerine sebep olabilir. Bu sayı, doğru ve etkili iletişim, içsel doğrularını ifade etme yeteneğini aktive eder.",
  
  6: "Üçüncü göz çakra (Ajna) – Sezgi, içsel farkındalık ve analiz. 6 sayısı sorumluluk ve aile enerjisini taşır, ancak üçüncü göz çakrası ile birleştiğinde sezgisel algı ve bilinçli karar alma becerisi önem kazanır. Dengesizlik durumunda, sezgisel körlük, kafa karışıklığı veya içsel yönelim eksikliği görülebilir.",
  
  7: "Taç çakra (Sahasrara) – Spiritüel bağlantı, yüksek bilinç ve evrensel farkındalık. 7 sayısı analiz, iç gözlem ve spiritüel araştırmayı simgeler. Dengesizlik, manevi kopukluk, yalnızlık veya aşırı entelektüelleşme ile kendini gösterebilir. Bu sayı, ruhsal uyanışı destekler ve evrensel bilgelikle bağlantı kurmayı sağlar.",
  
  8: "Kök ve solar pleksus çakralar – Maddi dünya, güç ve disiplin. 8 sayısı başarı, maddi denge ve otoriteyi temsil eder. Kök çakra ile ilişkilendiğinde güvenlik, solar pleksus ile ilişkilendiğinde güç kullanımı ve kişisel irade ön plana çıkar. Dengesizlik, güç mücadelesi veya kontrol takıntısı yaratabilir.",
  
  9: "Kalp ve taç çakralar – Evrensel sevgi ve yüksek bilinç. 9 sayısı idealizm, fedakarlık ve insanlığa hizmet enerjisini taşır. Kalp çakrası ile sevgi ve şefkat, taç çakrası ile spiritüel farkındalık güçlenir. Dengesizlik durumunda, başkalarına yardım etmede zorlanma veya kişisel sınır sorunları gözlemlenebilir.",
  
  11: "Üçüncü göz ve taç çakralar – Yüksek sezgi ve ilham. 11 sayısı spiritüel aydınlanma ve vizyoner düşünceyi temsil eder. Üçüncü göz çakrası ile sezgi güçlenir, taç çakrası ile evrensel farkındalık artar. Dengesizlik, ilham eksikliği, kafa karışıklığı veya enerji blokajlarına yol açabilir.",
  
  22: "Tüm çakralar dengeli – Büyük vizyon ve pratik manifestasyon. 22 sayısı master builder olarak bilinir, maddi ve manevi dünyalar arasında köprü kurma enerjisi taşır. Enerji dengesi sağlanmışsa, hayaller gerçeğe dönüşür. Dengesizlik, sorumluluk reddi veya vizyon eksikliği olarak ortaya çıkabilir.",
  
  33: "Kalp, üçüncü göz ve taç çakralar – Şefkat, sezgi ve spiritüel rehberlik. 33 sayısı yüksek hizmet ve öğretme enerjisi taşır. Kalp çakrası ile sevgi, üçüncü göz ile sezgi ve taç çakrası ile spiritüel bağ güçlenir. Dengesizlik, hizmette tükenmişlik veya içsel rehberlikten kopukluk yaratabilir."
};


    // Eksik çakraları belirleme
    const allChakras = [1, 2, 3, 4, 5, 6, 7];
    const presentChakras = new Set();

    // Mevcut sayıları çakra değerlerine dönüştür
    const numbers = [
      lifePathNumber,
      expressionNumber,
      soulUrgeNumber,
      personalityNumber,
    ];
    numbers.forEach((num) => {
      if (num <= 7) presentChakras.add(num);
      else if (num === 8) {
        presentChakras.add(1);
        presentChakras.add(3);
      } else if (num === 9) {
        presentChakras.add(4);
        presentChakras.add(7);
      } else if (num === 11) {
        presentChakras.add(6);
        presentChakras.add(7);
      } else if (num === 22) allChakras.forEach((c) => presentChakras.add(c));
      else if (num === 33) {
        presentChakras.add(4);
        presentChakras.add(6);
        presentChakras.add(7);
      }
    });

    // Eksik çakraları bul
    const missingChakras = allChakras.filter(
      (chakra) => !presentChakras.has(chakra)
    );

    let result = "Çakra analiziniz:\n";

    // Her bir sayı için çakra yorumu
    result += `• Yaşam Yolu Sayınız (${lifePathNumber}): ${
      chakraAssociations[lifePathNumber] || "Standart çakra dengesi"
    }\n`;
    result += `• İfade Sayınız (${expressionNumber}): ${
      chakraAssociations[expressionNumber] || "Standart çakra dengesi"
    }\n`;
    result += `• Ruh Arzusu Sayınız (${soulUrgeNumber}): ${
      chakraAssociations[soulUrgeNumber] || "Standart çakra dengesi"
    }\n`;
    result += `• Kişilik Sayınız (${personalityNumber}): ${
      chakraAssociations[personalityNumber] || "Standart çakra dengesi"
    }\n\n`;

    if (missingChakras.length > 0) {
      result += `Dengelemeniz gereken çakralar: ${missingChakras.join(", ")}\n`;
      result +=
        "Bu çakraları meditasyon, yoga ve enerji çalışmaları ile dengeleyebilirsiniz.";
    } else {
      result +=
        "Tüm çakralarınız dengeli görünüyor. Bu harika bir enerji dengesi gösterir!";
    }

    return result;
  };

const getLifePathMeaning = (number) => {
  const meanings = {
    1: `Liderlik, bağımsızlık ve yenilikçilik:
Doğuştan lider bir kişisiniz. Yaratıcı fikirlerinizi cesurca ortaya koyar ve kendi yolunuzu çizersiniz. Karar alma ve sorumluluk alma becerileriniz yüksektir. 
Olumlu yönler: Bağımsız, cesur, girişimci ve vizyoner.
Zorlayıcı yönler: Sabırsızlık, dik kafalılık, tek başına hareket etme eğilimi.
Kariyer: Yönetim, girişimcilik, liderlik gerektiren roller.
İlişkiler: Kendi alanınızı ve özgürlüğünüzü ister, karşı tarafın bağımsızlığına saygı duymalısınız.
Spiritüel misyon: Kendi potansiyelinizi fark ederek başkalarına ilham vermek.
Hayat dersi: Sabır, işbirliği ve esneklik öğrenmek.`,

    2: `Uyum, işbirliği ve denge:
İlişkilerde hassas ve empatik bir kişisiniz. Grup içinde arabulucu rolünü başarıyla üstlenir, çatışmaları yatıştırabilirsiniz.
Olumlu yönler: Diplomatik, uyumlu, sabırlı, sezgisel.
Zorlayıcı yönler: Kararsızlık, aşırı fedakârlık, çatışmalardan kaçınma.
Kariyer: Danışmanlık, diplomasi, insan kaynakları, uyum gerektiren alanlar.
İlişkiler: Derin bağlar kurar, sevdiklerine karşı şefkatli ve anlayışlıdır.
Spiritüel misyon: Barışı ve uyumu yaymak, başkalarına destek olmak.
Hayat dersi: Kendi sınırlarınızı korumayı ve karar vermeyi öğrenmek.`,

    3: `Yaratıcılık, iletişim ve neşe:
Sanatçı ruhlusunuz, kendinizi ifade etme yeteneğiniz yüksek. Sosyal ortamlarda parlayan enerjiniz çevrenize ilham verir.
Olumlu yönler: Neşeli, yaratıcı, sosyal, etkileyici.
Zorlayıcı yönler: Dikkatsizlik, dağınıklık, yüzeysel davranma eğilimi.
Kariyer: Sanat, iletişim, medya, eğitim.
İlişkiler: Pozitif ve eğlenceli, duygularını açık ifade eder.
Spiritüel misyon: İnsanlara ilham ve neşe yaymak.
Hayat dersi: Odaklanmayı ve sorumluluk almayı öğrenmek.`,

    4: `Pratiklik, istikrar ve güvenilirlik:
Detaylara önem veren, disiplinli ve organize bir yapınız var. Güvenilir ve sorumluluk sahibisiniz.
Olumlu yönler: Sistemli, kararlı, güvenilir, sabırlı.
Zorlayıcı yönler: Katılık, inatçılık, yeniliklere direnç.
Kariyer: Mühendislik, finans, yönetim, organizasyon.
İlişkiler: Güvenilir ve sadık, ancak esnek olmayı öğrenmeli.
Spiritüel misyon: Temel değerleri inşa etmek, düzen ve güvenlik sağlamak.
Hayat dersi: Esneklik ve değişime açıklık geliştirmek.`,

    5: `Özgürlük, çeşitlilik ve macera:
Değişimi ve yeniliği seven, enerjik ve uyumlu bir kişisiniz.
Olumlu yönler: Maceracı, yenilikçi, meraklı, uyumlu.
Zorlayıcı yönler: Sabırsızlık, kararsızlık, sorumluluktan kaçma.
Kariyer: Seyahat, medya, girişimcilik, iletişim.
İlişkiler: Özgürlük ister, rutine bağlı kalmakta zorlanır.
Spiritüel misyon: Deneyimleyerek öğrenmek ve başkalarına ilham vermek.
Hayat dersi: Sorumluluk ve odaklanma yeteneğini geliştirmek.`,

    6: `Sorumluluk, aile ve uyum:
Ev ve aile odaklı, şefkatli ve koruyucu bir kişisiniz. Başkalarına destek olmayı önemser.
Olumlu yönler: Sorumluluk sahibi, şefkatli, güvenilir, uyumlu.
Zorlayıcı yönler: Aşırı müdahaleci olma, fedakarlığı abartma, eleştirel tavır.
Kariyer: Eğitim, sağlık, sosyal hizmet, aile ve toplum odaklı işler.
İlişkiler: Sadık, destekleyici ve şefkatli, bazen aşırı koruyucu olabilir.
Spiritüel misyon: Sevgi ve denge yaymak, topluma hizmet etmek.
Hayat dersi: Kendi ihtiyaçlarınızı ihmal etmeden başkalarına yardım etmeyi öğrenmek.`,

    7: `Analiz, spiritüellik ve içgözlem:
Derin düşünen, araştırmacı ve spiritüel bir kişisiniz. Bilgi ve sezgileriniz güçlüdür.
Olumlu yönler: Analitik, sezgisel, derin, meraklı.
Zorlayıcı yönler: İçedönüklük, mesafeli tavır, iletişim eksikliği.
Kariyer: Araştırma, bilim, felsefe, spiritüel rehberlik.
İlişkiler: Duygusal olarak mesafeli olabilir, derin bağ kurar.
Spiritüel misyon: Bilgi ve içsel anlayışı paylaşmak, başkalarına rehberlik.
Hayat dersi: Açık iletişim ve sosyal bağlantılar geliştirmek.`,

    8: `Güç, otorite ve başarı:
Maddi ve manevi dünyada güçlü bir etkiye sahipsiniz. Liderlik ve organizasyon becerileriniz yüksek.
Olumlu yönler: Kararlı, disiplinli, otoriter, etkileyici.
Zorlayıcı yönler: Hırslı, kontrolcü, kibirli olma eğilimi.
Kariyer: İş dünyası, yönetim, girişimcilik, liderlik.
İlişkiler: Güçlü bir kişilik, dengeyi öğrenmek önemli.
Spiritürel misyon: Güç ve kaynakları başkalarına fayda için kullanmak.
Hayat dersi: Gücü paylaşmayı ve alçakgönüllülüğü öğrenmek.`,

    9: `İnsanseverlik, tamamlama ve evrensellik:
İdealist, şefkatli ve yaratıcı bir kişisiniz. İnsanlığa hizmet etmek önemlidir.
Olumlu yönler: Fedakar, idealist, yaratıcı, şefkatli.
Zorlayıcı yönler: Dağılgan, aşırı hassas, realist olmayan beklentiler.
Kariyer: Sosyal hizmet, sanat, yardım kuruluşları, eğitim.
İlişkiler: Sevgi dolu ve destekleyici, bazen kendi sınırlarını ihmal edebilir.
Spiritüel misyon: Evrensel sevgi ve hizmet yaymak.
Hayat dersi: Kendi sınırlarınızı korumayı öğrenmek.`,

    11: `Sezgi, maneviyat ve aydınlanma:
Sezgileri yüksek, hassas ve ilham verici bir kişisiniz. Spiritüel farkındalığınız yüksektir.
Olumlu yönler: Karizmatik, vizyoner, sezgisel, ilham verici.
Zorlayıcı yönler: Aşırı hassasiyet, kaygı, enerji dalgalanmaları.
Kariyer: Spiritüel rehberlik, psikoloji, sanat ve eğitim.
İlişkiler: Derin ve anlamlı bağlar kurar.
Spiritüel misyon: Başkalarına ilham verip, yüksek bilinç seviyelerine hizmet etmek.
Hayat dersi: Enerjiyi dengelemeyi ve kişisel sınırları korumayı öğrenmek.`,

    22: `Üstat inşaatçı, büyük hayaller ve pratiklik:
Büyük idealleri somut sonuçlara dönüştürebilen güçlü bir yapınız var. Vizyon ve organizasyon yetenekleriniz yüksektir.
Olumlu yönler: Pratik, stratejik, lider, vizyoner.
Zorlayıcı yönler: Aşırı yüklenme, stres, kontrolcü tavırlar.
Kariyer: Büyük projeler, girişimcilik, toplumsal değişim.
İlişkiler: Sorumluluk bilinci yüksek, bazen duygusal açıdan mesafeli olabilir.
Spiritüel misyon: Topluma kalıcı katkılar sağlamak, dünyayı dönüştürmek.
Hayat dersi: Büyük sorumluluklarla dengeyi öğrenmek.`,

    33: `Üstat öğretmen, şefkat ve hizmet:
İnsanlığa hizmet etmeye odaklı, son derece şefkatli ve ilham verici bir kişisiniz. Başkalarına rehberlik ve toplumsal fayda ön plandadır.
Olumlu yönler: Şefkatli, ilham verici, fedakar, hizmet odaklı.
Zorlayıcı yönler: Aşırı fedakarlık, tükenmişlik, duygusal yüklenme.
Kariyer: Eğitim, yardım kuruluşları, spiritüel rehberlik.
İlişkiler: Derin bağlılık ve destek sunar, kendi ihtiyaçlarını ihmal etme eğilimi.
Spiritüel misyon: Topluma hizmet ve başkalarına rehberlik sağlamak.
Hayat dersi: Kendi sınırlarını korumayı ve dengeyi öğrenmek.`
  };

  return meanings[number] || "Bu yaşam yolu sayısı için özel bir yorum bulunmamaktadır.";
};

const getExpressionMeaning = (number) => {
  const meanings = {
    1: "Özgün ifade ve liderlik: Bu kişiler doğuştan liderdir. Yaratıcı fikirlerini cesurca ortaya koyar, kendi yolunu çizer ve bağımsız çalışmayı sever. Karar alma ve sorumluluk alma becerileri yüksektir. Sosyal ve profesyonel ortamlarda öncülük rolü üstlenir, vizyoner ve motive edici bir enerji yayarlar.",
    2: "Uyumlu iletişim ve diplomasi: Bu kişiler ilişkilerde hassas ve duyarlıdır. Çatışmaları yatıştırır, işbirlikçi ve diplomatik bir yaklaşım sergiler. Grup içinde arabulucu rolünü başarıyla üstlenir. Başkalarının duygularını anlayabilme ve empati yetenekleri yüksektir, sosyal uyum ve barışçıl ilişkiler ön plandadır.",
    3: "Yaratıcı ifade ve neşe: Sanat, konuşma ve yazı yoluyla kendini ifade etme yeteneği güçlüdür. Enerjik, neşeli ve sosyal bir yapıları vardır. İnsanlara ilham verir, iletişim becerileri kuvvetlidir. Yaratıcı projelerde fark yaratır, sosyal çevrelerinde dikkat çeker ve pozitif enerji yayar.",
    4: "Pratik ve sistematik ifade: Disiplinli, organize ve güvenilirdirler. Detaylara önem verir, planlı ve metodik şekilde hareket ederler. Kendilerini sistematik bir şekilde ifade eder, karmaşık işleri çözmede yeteneklidir. Güvenilir ve sorumluluk sahibi bir izlenim bırakırlar.",
    5: "Çeşitlilik ve özgür ifade: Maceracı, yenilikçi ve uyumlu bir ifade tarzına sahiptirler. Sabit kalmaktan hoşlanmaz, sürekli değişimi ve farklı deneyimleri ararlar. Çok yönlü iletişim becerileri vardır, spontane ve enerjik yapılarıyla insanları etkilerler.",
    6: "Duygusal ve sorumlu ifade: Aile ve ilişkiler odaklıdırlar. Duygularını samimi bir şekilde aktarır, başkalarına destek olmayı önemserler. Sorumluluk duyguları yüksek, şefkatli ve koruyucu bir iletişim tarzına sahiptirler. Sosyal sorumluluk ve toplumsal denge ön plandadır.",
    7: "Analitik ve derin ifade: Felsefi, spiritüel ve araştırmacı bir iletişim tarzına sahiptirler. Derinlemesine düşünür, bilgiyi analiz ederek paylaşır. İçsel sezgileri kuvvetlidir, karmaşık konuları anlaşılır biçimde aktarabilirler. Sessiz ve etkileyici bir derinlikleri vardır.",
    8: "Güçlü ve otoriter ifade: Liderlik ve organizasyon yetenekleri iletişim tarzlarına yansır. Etkili, kararlı ve sonuç odaklıdırlar. İnsanları motive etme ve yönlendirme kabiliyetleri yüksektir. Maddi ve manevi başarı hedeflerini açıkça ifade ederler.",
    9: "İdealist ve evrensel ifade: İnsanlığa hizmet eden, toplumsal sorumluluk bilinci yüksek bir iletişim tarzına sahiptirler. Evrensel değerleri savunur, şefkat ve anlayışla hareket ederler. Sanatsal ve yaratıcı yeteneklerini insanlığa fayda sağlamak için kullanırlar.",
    11: "Sezgisel ve ilham verici ifade: Spiritüel ve ilham verici bir iletişim tarzına sahiptirler. Yüksek sezgi ve içsel bilgelik ile başkalarına yol gösterirler. Karizmatik ve vizyoner bir etki yaratırlar, manevi konularda rehberlik sağlarlar.",
    22: "Pratik idealist ifade: Büyük idealleri somut planlara dönüştürebilen bir iletişim tarzına sahiptirler. Hem maddi hem manevi konularda dengeyi sağlar, organizasyon ve strateji yetenekleri güçlüdür. Toplum üzerinde kalıcı etkiler yaratmayı amaçlarlar.",
    33: "Şefkatli ve hizmet odaklı ifade: Başkalarının yaşamlarını iyileştirmeye odaklıdırlar. Şefkat, sevgi ve spiritüel rehberlik ön plandadır. İnsanlara ilham verir, yüksek ideallerle hareket eder ve toplumsal fayda sağlarlar."
  };

  return meanings[number] || "Bu ifade sayısı için özel bir yorum bulunmamaktadır.";
};



  //-----------------------------------------------------------------------------------------
const getSoulUrgeMeaning = (number) => {
  const meanings = {
    1: `Bağımsızlık ve özgünlük arzusu:
- Psikolojik: Kendi kimliğini güçlü biçimde ortaya koyma ihtiyacı, liderlik ve inisiyatif alma isteği.
- Enerjetik: Güneş enerjisi ile bağlantılı, irade ve özgüveni aktive eder.
- Spiritüel: Kendi yolunu bulma ve kişisel kaderini gerçekleştirme arzusu. 
Dengesizlik: Bencil davranışlar veya yalnızlık hissi.`,

    2: `Uyum ve ilişki arzusu:
- Psikolojik: İşbirliği, empati ve diplomasi ihtiyacı.
- Enerjetik: Ay enerjisi ile ilişkili; duygusal zekayı ve sezgiyi güçlendirir.
- Spiritüel: Başkalarıyla derin, ruhsal bağlar kurma ve evrensel uyumu deneyimleme isteği.
Dengesizlik: Aşırı bağımlılık veya kararsızlık.`,

    3: `Yaratıcı ifade ve neşe arzusu:
- Psikolojik: Sanat, iletişim ve sosyal etkileşim yoluyla kendini ifade etme ihtiyacı.
- Enerjetik: Kreatif enerji ve neşe titreşimleriyle bağlantılı.
- Spiritüel: İçsel potansiyeli yaratıcı biçimde ortaya koyma ve ilham paylaşma arzusu.
Dengesizlik: Yüzeysel davranışlar veya kendini ifade edememe.`,

    4: `İstikrar ve güvenlik arzusu:
- Psikolojik: Düzen, disiplin ve güvenli bir yaşam kurma ihtiyacı.
- Enerjetik: Toprak enerjisi ile ilişkili; fiziksel ve duygusal köklenmeyi destekler.
- Spiritüel: Hayatta sağlam temeller oluşturma ve güvenli bir yaşam alanı yaratma arzusu.
Dengesizlik: Aşırı kontrol veya esneklik eksikliği.`,

    5: `Özgürlük ve çeşitlilik arzusu:
- Psikolojik: Macera, yenilik ve değişim isteği.
- Enerjetik: Hava ve hareket enerjileriyle ilişkili; esneklik ve adaptasyonu destekler.
- Spiritüel: Hayat deneyimlerini çeşitlendirerek büyüme ve dönüşüm arayışı.
Dengesizlik: Kararsızlık, sorumsuzluk veya dağınıklık.`,

    6: `Sorumluluk ve aile arzusu:
- Psikolojik: Sevdiklerine hizmet etme, sorumluluk ve destek verme isteği.
- Enerjetik: Kalp çakrası ile güçlü bağlantı; sevgi ve şefkati aktive eder.
- Spiritüel: Aile ve topluma fayda sağlama, sevgiyi eylemle ifade etme arzusu.
Dengesizlik: Aşırı fedakarlık veya başkalarını kontrol etme eğilimi.`,

    7: `Bilgi ve spiritüel anlayış arzusu:
- Psikolojik: İçsel keşif, analiz ve derin düşünce ihtiyacı.
- Enerjetik: Üçüncü göz ve ruhsal enerjiyle ilişkili; sezgiyi güçlendirir.
- Spiritüel: Gerçeği anlama, bilinç yükseltme ve spiritüel farkındalık geliştirme arzusu.
Dengesizlik: Aşırı izolasyon veya şüphecilik.`,

    8: `Başarı ve maddi güvence arzusu:
- Psikolojik: Güç, kontrol ve etki sahibi olma isteği.
- Enerjetik: Solar pleksus ve kök çakra enerjisi ile bağlantılı; maddi ve kişisel güçleri aktive eder.
- Spiritüel: Kendi değerini gerçekleştirme ve dünyada somut başarı elde etme arzusu.
Dengesizlik: Hırslı, manipülatif veya materyalist eğilimler.`,

    9: `İdealizm ve hizmet arzusu:
- Psikolojik: Evrensel sevgi, fedakarlık ve başkalarına yardım etme isteği.
- Enerjetik: Kalp ve taç çakraları ile ilişkili; yüksek bilinç ve empatiyi aktive eder.
- Spiritüel: İnsanlığa hizmet etme ve manevi misyonu gerçekleştirme arzusu.
Dengesizlik: Kendini ihmal etme veya aşırı idealizm.`,

    11: `Spiritüel aydınlanma arzusu:
- Psikolojik: İlham, vizyon ve sezgisel farkındalık ihtiyacı.
- Enerjetik: Yüksek frekanslı ışık enerjisi ile bağlantılı; yaratıcılığı ve ilhamı aktive eder.
- Spiritüel: Yüksek bilinç ve ruhsal rehberlik arayışı.
Dengesizlik: Gerçekten kopukluk veya kafa karışıklığı.`,

    22: `Pratik idealizm arzusu:
- Psikolojik: Büyük vizyonları gerçeğe dönüştürme ihtiyacı.
- Enerjetik: Tüm çakraların dengeli çalışmasıyla güçlü bir manifestasyon enerjisi taşır.
- Spiritüel: Hem maddi hem manevi dünyada köprü kurma ve liderlik etme arzusu.
Dengesizlik: Sorumluluk reddi veya vizyonu gerçekleştirememe.`,

    33: `Şefkat ve hizmet arzusu:
- Psikolojik: İnsanlara rehberlik etme, şefkat ve fedakarlık isteği.
- Enerjetik: Kalp, üçüncü göz ve taç çakraları ile yüksek uyum; spiritüel sevgi ve içsel rehberliği aktive eder.
- Spiritüel: Yüksek hizmet ve manevi liderlik arayışı.
Dengesizlik: Tükenmişlik veya rehberlikten kopukluk.`
  };

  return (
    meanings[number] ||
    "Bu ruh arzusu sayısı için özel bir yorum bulunmamaktadır."
  );
};
//------------------------------------------------------------------------------------------
const getPersonalityMeaning = (number) => {
  const meanings = {
    1: `Güçlü ve bağımsız kişilik. Liderlik vasıfları ve özgüven ön planda.
- Davranış: Kendi başına hareket etmeyi sever, karar vermede hızlı ve kararlıdır.
- İlişkiler: Bağımsızlığına saygı duyan partnerlerle uyum sağlar, bazen dominant olabilir.
- Enerji/Çakra: Kök çakra ve solar pleksus çakra güçlü; kararlılık ve irade gücü yüksek.
- Zorluklar: Bencilce davranma veya esneklik eksikliği.
- Gelişim Önerisi: Sabır ve işbirliğini öğrenmek, empatiyi güçlendirmek.`,

    2: `Uyumlu ve diplomatik kişilik. Hassas ve işbirlikçi.
- Davranış: İnsan ilişkilerinde denge ve barışı önceler, çatışmalardan kaçınır.
- İlişkiler: Ortaklıklarda başarılı, karşısındakinin ihtiyaçlarını iyi anlar.
- Enerji/Çakra: Sakral çakra dengeli; duygusal zekâ ve empati yüksek.
- Zorluklar: Kararsızlık veya aşırı bağımlılık.
- Gelişim Önerisi: Kendi ihtiyaçlarını ihmal etmeden başkalarına hizmet etmeyi dengelemek.`,

    3: `Yaratıcı, sosyal ve neşeli kişilik. İfade özgürlüğü ön planda.
- Davranış: Enerjik, pozitif ve yaratıcı, iletişim becerileri güçlü.
- İlişkiler: Arkadaş canlısı, sosyal çevresinde ilgi çekici.
- Enerji/Çakra: Boğaz çakra ve solar pleksus çakra aktif; kendini ifade etme gücü yüksek.
- Zorluklar: Dikkatsizlik veya dağınıklık eğilimi.
- Gelişim Önerisi: Disiplin ve odaklanmayı öğrenmek, yaratıcı enerjiyi yapılandırmak.`,

    4: `Pratik ve güvenilir kişilik. Disiplin ve sorumluluk ön planda.
- Davranış: Planlı ve organize, detaylara dikkat eder.
- İlişkiler: Güvenilir ve sorumluluk sahibi; partner ve arkadaşlar tarafından değer görür.
- Enerji/Çakra: Kök çakra dengeli; sağlam temeller ve güven duygusu güçlü.
- Zorluklar: Esneklik eksikliği veya aşırı kontrolcülük.
- Gelişim Önerisi: Esnek düşünceyi geliştirmek ve spontanlığı kabul etmek.`,

    5: `Özgürlükçü ve maceracı kişilik. Yenilik arayışı yüksek.
- Davranış: Yeni deneyimlere açıktır, değişimi sever.
- İlişkiler: Bağımsız partnerlerle iyi anlaşır, monotonluktan çabuk sıkılır.
- Enerji/Çakra: Sakral ve solar pleksus çakralar aktif; cesaret ve yaratıcılık güçlü.
- Zorluklar: Sabırsızlık, sorumsuzluk eğilimi.
- Gelişim Önerisi: Disiplin ve sorumluluk bilincini geliştirmek.`,

    6: `Sorumlu ve şefkatli kişilik. Aile ve toplum odaklı.
- Davranış: Koruyucu, yardımsever ve güvenilir.
- İlişkiler: Aile ve arkadaş ilişkilerinde destekleyici, bazen aşırı fedakâr.
- Enerji/Çakra: Kalp çakra ve kök çakra dengeli; sevgi ve güven enerjisi yüksek.
- Zorluklar: Başkalarının ihtiyaçlarını kendi ihtiyaçlarının önüne koyma.
- Gelişim Önerisi: Kendi sınırlarını belirlemeyi öğrenmek.`,

    7: `Analitik, içe dönük ve spiritüel kişilik.
- Davranış: Derin düşünen, araştıran, gizemli konulara ilgi duyan.
- İlişkiler: Yalnızlığı ve içsel dünyayı seven, seçici iletişim kurar.
- Enerji/Çakra: Üçüncü göz çakrası aktif; sezgi ve bilinç araştırması güçlü.
- Zorluklar: Sosyal izolasyon veya aşırı sorgulama.
- Gelişim Önerisi: Sosyal bağları korumak ve sezgiyi dengelemek.`,

    8: `Güçlü, otoriter ve başarılı kişilik.
- Davranış: Liderlik ve organizasyon becerileri gelişmiş, kararlı.
- İlişkiler: İş ve sosyal çevrede etkili, bazen dominant.
- Enerji/Çakra: Solar pleksus ve kök çakralar güçlü; maddi ve kişisel güç yüksek.
- Zorluklar: Hırs ve kontrolcülük eğilimi.
- Gelişim Önerisi: Gücü sorumlulukla kullanmayı öğrenmek.`,

    9: `İdealist ve şefkatli kişilik.
- Davranış: Yardımsever, evrensel sevgi ve hizmet odaklı.
- İlişkiler: Empatik ve anlayışlı, başkalarına ilham verir.
- Enerji/Çakra: Kalp ve taç çakralar dengeli; sevgi ve spiritüel farkındalık yüksek.
- Zorluklar: Fedakârlıkta aşırılık veya duygusal yüklenme.
- Gelişim Önerisi: Kendi ihtiyaçlarını unutmadan hizmet etmek.`,

    11: `Sezgisel ve ilham verici kişilik.
- Davranış: Yüksek bilinç, vizyon ve yaratıcı sezgi.
- İlişkiler: Spiritüel bağlantı arayan, ilham verici ve hassas.
- Enerji/Çakra: Üçüncü göz ve taç çakralar aktif; yüksek sezgi ve farkındalık.
- Zorluklar: Hassasiyet ve kaygı eğilimi.
- Gelişim Önerisi: Sezgi ile mantığı dengelemek, ilhamı yapılandırmak.`,

    22: `Pratik vizyoner ve güçlü lider kişilik.
- Davranış: Büyük projeleri hayata geçirebilir, stratejik ve organize.
- İlişkiler: Güvenilir, sorumluluk sahibi; toplumsal etkisi yüksek.
- Enerji/Çakra: Tüm çakralar dengeli; maddi ve manevi başarı uyumlu.
- Zorluklar: Aşırı yüklenme ve stres.
- Gelişim Önerisi: Enerjiyi verimli yönetmek ve dengeyi korummak.`,

    33: `Şefkatli, spiritüel rehber kişilik.
- Davranış: İnsanlara ilham ve hizmet sunar, manevi liderlik vasfı güçlü.
- İlişkiler: Empatik ve destekleyici; başkalarının gelişimine katkı sağlar.
- Enerji/Çakra: Kalp, üçüncü göz ve taç çakralar güçlü; sevgi ve sezgi yüksek.
- Zorluklar: Aşırı fedakârlık ve tükenmişlik.
- Gelişim Önerisi: Kendi sınırlarını koruyarak hizmet etmek.`,

  };

  return (
    meanings[number] ||
    "Bu kişilik sayısı için özel bir detaylı yorum bulunmamaktadır."
  );
};
//-----------------------------------------------------------------------------------

  const sendEmail = async (data) => {
    try {
      const templateParams = {
        to_email: data.email,
        message_html: generateNumerologyEmail(data),
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
      };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
      );

      return response;
    } catch (error) {
      console.error("Email gönderim hatası:", error);
      throw new Error("E-posta gönderilirken bir hata oluştu.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setResult(null);

    try {
      // Validasyon
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.birthDay ||
        !formData.birthMonth ||
        !formData.birthYear ||
        !formData.email
      ) {
        throw new Error("Lütfen tüm alanları doldurunuz.");
      }

      // Numeroloji analizi
      const lifePathNumber = calculateLifePathNumber(
        formData.birthDay,
        formData.birthMonth,
        formData.birthYear
      );

      const expressionNumber = calculateExpressionNumber(
        formData.firstName,
        formData.lastName
      );

      const soulUrgeNumber = calculateSoulUrgeNumber(
        formData.firstName,
        formData.lastName
      );

      const personalityNumber = calculatePersonalityNumber(
        formData.firstName,
        formData.lastName
      );

      const karmicAnalysis = getKarmicDebts(
        formData.birthDay,
        formData.birthMonth,
        formData.birthYear,
        formData.firstName,
        formData.lastName
      );

      const chakraAnalysis = analyzeChakras(
        lifePathNumber,
        expressionNumber,
        soulUrgeNumber,
        personalityNumber
      );

      const lifePathMeaning = getLifePathMeaning(lifePathNumber);
      const expressionMeaning = getExpressionMeaning(expressionNumber);
      const soulUrgeMeaning = getSoulUrgeMeaning(soulUrgeNumber);
      const personalityMeaning = getPersonalityMeaning(personalityNumber);

      // Sonuçları state'e kaydet
      const resultData = {
        lifePathNumber,
        lifePathMeaning,
        expressionNumber,
        expressionMeaning,
        soulUrgeNumber,
        soulUrgeMeaning,
        personalityNumber,
        personalityMeaning,
        karmicDebts: karmicAnalysis.debts,
        karmicLessons: karmicAnalysis.lessons,
        chakraAnalysis,
        currentDate: new Date().toLocaleDateString("tr-TR"),
        birthDate: `${formData.birthDay}/${formData.birthMonth}/${formData.birthYear}`,
      };

      setResult(resultData);

      // PDF veya Email gönderimi
      if (formData.deliveryType === "pdf") {
        await NumerolojiPdf({
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthDay: formData.birthDay,
          birthMonth: formData.birthMonth,
          birthYear: formData.birthYear,
          email: formData.email,
          ...resultData,
        });
        setSuccess("PDF raporunuz başarıyla oluşturuldu ve indiriliyor!");
      } else {
        await sendEmail({
          ...formData,
          ...resultData,
        });
        setSuccess("Analiz sonuçları e-posta adresinize gönderildi!");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <AutoTranslate>
        <div className="min-h-screen bg-linear-to-b from-purple-50 to-indigo-100 py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-200">
              <div className="bg-linear-to-r from-purple-600 to-indigo-600 p-6 text-white text-center">
                <h1 className="text-3xl font-bold mb-2">Numeroloji Analizi</h1>
                <p className="opacity-90">
                  Doğum bilgilerinizle yaşam yolunuzu keşfedin
                </p>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Adınız
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Adınız"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Soyadınız
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Soyadınız"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Doğum Tarihi
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <input
                          type="number"
                          name="birthDay"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Gün"
                          min="1"
                          max="31"
                          value={formData.birthDay}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          name="birthMonth"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Ay"
                          min="1"
                          max="12"
                          value={formData.birthMonth}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          name="birthYear"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Yıl"
                          min="1900"
                          max="2100"
                          value={formData.birthYear}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta Adresiniz
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="ornek@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sonuçlar Nasıl İletilsin?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.deliveryType === "pdf"
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryType"
                          value="pdf"
                          checked={formData.deliveryType === "pdf"}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <span className="font-medium">PDF Olarak İndir</span>
                        <span className="text-sm text-gray-500 mt-1">
                          Hemen indirip kaydedin
                        </span>
                      </label>

                      <label
                        className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.deliveryType === "email"
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryType"
                          value="email"
                          checked={formData.deliveryType === "email"}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <span className="font-medium">E-posta ile Gönder</span>
                        <span className="text-sm text-gray-500 mt-1">
                          E-posta adresinize iletilsin
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Analiz Yapılıyor...
                        </>
                      ) : (
                        <>Analiz Et ve Raporu Görüntüle</>
                      )}
                    </button>
                  </div>
                </form>

                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="font-medium">Hata!</span>
                    </div>
                    <p className="mt-1">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="font-medium">Başarılı!</span>
                    </div>
                    <p className="mt-1">{success}</p>
                  </div>
                )}

                {result && (
                  <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <h3 className="text-xl font-bold text-purple-700 mb-4">
                      Numeroloji Analiz Sonuçlarınız
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <svg
                            className="w-5 h-5 mr-2 text-purple-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Yaşam Yolu Sayınız
                        </h4>
                        <div className="mt-2 p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
                          <div className="text-4xl font-bold text-center text-purple-600 mb-2">
                            {result.lifePathNumber}
                          </div>
                          <p className="text-gray-700">
                            {result.lifePathMeaning}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <svg
                            className="w-5 h-5 mr-2 text-purple-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          İfade/İsim Sayınız
                        </h4>
                        <div className="mt-2 p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
                          <div className="text-4xl font-bold text-center text-purple-600 mb-2">
                            {result.expressionNumber}
                          </div>
                          <p className="text-gray-700">
                            {result.expressionMeaning}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <svg
                            className="w-5 h-5 mr-2 text-purple-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Ruh Arzusu Sayınız
                        </h4>
                        <div className="mt-2 p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
                          <div className="text-4xl font-bold text-center text-purple-600 mb-2">
                            {result.soulUrgeNumber}
                          </div>
                          <p className="text-gray-700">
                            {result.soulUrgeMeaning}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <svg
                            className="w-5 h-5 mr-2 text-purple-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Kişilik Sayınız
                        </h4>
                        <div className="mt-2 p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
                          <div className="text-4xl font-bold text-center text-purple-600 mb-2">
                            {result.personalityNumber}
                          </div>
                          <p className="text-gray-700">
                            {result.personalityMeaning}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <svg
                            className="w-5 h-5 mr-2 text-purple-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Karmik Borç Analiziniz
                        </h4>
                        <div className="mt-2 p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
                          <p className="text-gray-700">{result.karmicDebts}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <svg
                            className="w-5 h-5 mr-2 text-purple-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Karmik Dersleriniz
                        </h4>
                        <div className="mt-2 p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
                          <p className="text-gray-700 whitespace-pre-line">
                            {result.karmicLessons}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <svg
                            className="w-5 h-5 mr-2 text-purple-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Çakra Analiziniz
                        </h4>
                        <div className="mt-2 p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
                          <p className="text-gray-700 whitespace-pre-line">
                            {result.chakraAnalysis}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={() => {
                          if (formData.deliveryType === "pdf") {
                            NumerolojiPdf({
                              firstName: formData.firstName,
                              lastName: formData.lastName,
                              birthDay: formData.birthDay,
                              birthMonth: formData.birthMonth,
                              birthYear: formData.birthYear,
                              email: formData.email,
                              ...result,
                            });
                          } else {
                            sendEmail({
                              ...formData,
                              ...result,
                            })
                              .then(() => {
                                setSuccess(
                                  "Analiz sonuçları tekrar e-posta adresinize gönderildi!"
                                );
                              })
                              .catch((err) => {
                                setError(
                                  "E-posta gönderilirken bir hata oluştu: " +
                                    err.message
                                );
                              });
                          }
                        }}
                        className="flex items-center px-4 py-2 bg-white border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {formData.deliveryType === "pdf"
                          ? "PDF'i Tekrar İndir"
                          : "E-postayı Tekrar Gönder"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center text-sm text-gray-500">
                <p>
                  Bu analiz sadece eğlence amaçlıdır. Profesyonel numeroloji
                  danışmanlığı yerine geçmez.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AutoTranslate>
      <Footer />
    </>
  );
}
