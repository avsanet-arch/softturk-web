import type { Ayarlar, Referans, Yazi } from "./veri";
import ILK_REFERANSLAR from "./referanslar-ilk.json";

// İlk kurulumda kullanılan değerler. Hepsi Yönetim › Ayarlar ekranından değiştirilir.
export const VARSAYILAN_AYARLAR: Ayarlar = {
  firmaAdi: "Softturk",
  slogan: "Otel programı ve web tasarımı",
  telefon: "",
  whatsapp: "",
  eposta: "",
  adres: "",
  il: "Balıkesir",
  ilce: "Marmara",
  calismaSaatleri: "Her gün 09:00 – 21:00",
  instagram: "",
  facebook: "",
  linkedin: "",
  gaOlcumKimligi: "",
  adsKimligi: "",
  adsFormEtiketi: "",
  adsTelefonEtiketi: "",
  searchConsoleKodu: "",
  programAdresi: "https://otel.avsa.com",
  paketler: [
    { ad: "Pansiyon", odalar: "1–10 oda", aylik: "900 ₺", yillik: "9.000 ₺", eskiAylik: "1.500 ₺", eskiYillik: "18.000 ₺" },
    { ad: "Butik", odalar: "11–20 oda", aylik: "1.200 ₺", yillik: "12.000 ₺", eskiAylik: "2.000 ₺", eskiYillik: "24.000 ₺", one_cikan: true },
    { ad: "Otel", odalar: "21–30 oda", aylik: "1.500 ₺", yillik: "15.000 ₺", eskiAylik: "2.500 ₺", eskiYillik: "30.000 ₺" },
    { ad: "Büyük otel", odalar: "31–50 oda", aylik: "1.950 ₺", yillik: "19.500 ₺", eskiAylik: "3.250 ₺", eskiYillik: "39.000 ₺" },
  ],
  fiyatNotu: "Tüm paketlerde bütün özellikler, telefon ve bilgisayardan kullanım, kurulum ve eğitim desteği vardır. 50 odadan büyük tesisler için teklif hazırlıyoruz.",
  fiyatKdv: "KDV hariç",
  kampanyaAcik: true,
  kampanyaBaslik: "Lansman kampanyası",
  kampanyaMetni: "31 Mart 2027'ye kadar başlayan otel ve pansiyonlara kampanyalı fiyat. Yıllık ödemede 2 ay bizden.",
  kampanyaBitis: "2027-03-31",
  denemeGun: "15",
  ekModuller: [
    { ad: "Yapay zekâ asistanı", aciklama: "“Bu hafta kaç oda boş?” diye yazın, program cevaplasın. Raporları sohbetle alın.", fiyat: "250 ₺ / ay", ikon: "sihir" },
    { ad: "Kimlik ve pasaport okuma", aciklama: "Kimliğin fotoğrafını çekin, misafir bilgileri forma kendiliğinden dolsun.", fiyat: "250 ₺ / ay", ikon: "kimlik" },
    { ad: "POS ve restoran", aciklama: "Masa ve adisyon takibi, odaya hesap aktarma, restoran raporu.", fiyat: "400 ₺ / ay", ikon: "kasa" },
    { ad: "QR menü ve sipariş", aciklama: "Masadaki QR kodu okutan misafir menüyü görür, siparişi telefondan verir.", fiyat: "200 ₺ / ay", ikon: "qr" },
    { ad: "Depo ve stok", aciklama: "Satışta stoktan otomatik düşüm, kritik stok uyarısı, stok giriş ve sayım.", fiyat: "200 ₺ / ay", ikon: "kutu" },
    { ad: "Misafir Wi‑Fi", aciklama: "Odaya ve resepsiyona basılacak Wi‑Fi QR kartları, şifre yönetimi.", fiyat: "150 ₺ / ay", ikon: "wifi" },
    { ad: "Online kanal e-postaları", aciklama: "Hotels.com ve Expedia rezervasyon e-postaları programa kendiliğinden rezervasyon olarak düşer.", fiyat: "250 ₺ / ay", ikon: "posta" },
  ],
  kullananlar: [
    { ad: "Anı Motel", tur: "Motel", yer: "Avşa Adası, Marmara / Balıkesir", oda: "30 oda", baslangic: "Kasım 2026", url: "", yorum: "", kisi: "" },
  ],
  bildirimEpostasi: "",
};

// İlk referanslar: kendi ürünümüz + yaptığımız siteler (referanslar-ilk.json). Sonrakiler yönetim panelinden eklenir.
export const ORNEK_REFERANSLAR: Referans[] = [
  {
    id: "softturk-otel",
    slug: "softturk-otel-programi",
    baslik: "Softturk Otel Programı",
    musteri: "Anı Motel, Avşa",
    sektor: "Konaklama",
    url: "",
    ozet: "30 odalı bir motel için geliştirdiğimiz, bugün başka otellere de sunduğumuz web tabanlı otel yönetim programı.",
    aciklama:
      "Program bir otelin günlük ihtiyacından doğdu: rezervasyonları renkli bir oda planında görmek, misafir bildirimini (KBS) elle yapmamak, kasayı her akşam kuruşu kuruşuna kapatmak.\n\n## Neler yaptık\n- Sürükle bırak oda planı (Room Plan), rezervasyon ve oda değişimi\n- KBS ve turizm veri bildirimi\n- Kasa, tahsilat, makbuz ve gün sonu\n- QR menüden sipariş, restoran ve stok\n- Telefona kurulabilen uygulama (PWA)\n\n## Sonuç\nOtel, her yıl lisans ödediği hazır program yerine kendi ihtiyacına göre şekillenen bir programa geçiyor. Program bugün başka otellere de sunuluyor.",
    resim: "/ekran/room-plan.webp",
    etiketler: ["Next.js", "Web uygulaması", "SaaS"],
    yil: "2026",
    durum: "yayinda",
    oneCikan: true,
    yayinda: true,
    sira: 0,
    olusturma: "2026-11-26T00:00:00.000Z",
  },
  ...(ILK_REFERANSLAR as Referans[]),
];

export const ORNEK_YAZILAR: Yazi[] = [
  {
    id: "kbs-nedir",
    slug: "kbs-kimlik-bildirim-sistemi-nedir",
    baslik: "KBS (Kimlik Bildirim Sistemi) nedir? Oteller ve pansiyonlar için kısa rehber",
    ozet: "Konaklama tesislerinin misafir bilgilerini emniyet ve jandarmaya bildirdiği KBS'yi, sık yapılan hataları ve bildirimi otomatik yapmanın yolunu anlattık.",
    icerik:
      "Türkiye'de otel, motel, pansiyon ve apart gibi konaklama tesisleri, misafirlerinin kimlik bilgilerini yetkili kolluk birimine bildirmek zorundadır. Bu bildirim **KBS (Kimlik Bildirim Sistemi)** üzerinden yapılır. Tesis bulunduğu yere göre polis ya da jandarma sistemine bağlıdır.\n\n## Hangi bilgiler bildirilir?\n- Misafirin adı soyadı ve kimlik ya da pasaport numarası\n- Uyruk, doğum tarihi gibi kimlik bilgileri\n- Giriş ve çıkış tarihi, kaldığı oda\n\n## En sık yapılan hatalar\n- Misafir girişi yapıldığı hâlde bildirimin unutulması\n- Çıkışların sisteme işlenmemesi\n- Yoğun sezonda kimlik bilgilerinin elle, hatalı yazılması\n\n## Bildirimi otomatik yapmak\nSoftturk Otel Programı'nda misafir girişi yapıldığında bildirim kendiliğinden hazırlanır ve gönderilir; çıkışlar da aynı şekilde işlenir. Kimlik okuyucu ile bilgiler kimlik kartının fotoğrafından doldurulur, yazım hatası riski azalır.\n\nProgramı kendi tesisinizde denemek için [ücretsiz demo isteyebilirsiniz](/demo).",
    resim: "/ekran/kbs.webp",
    etiketler: ["KBS", "Mevzuat", "Otel programı"],
    yayinda: true,
    tarih: "2026-11-26T08:00:00.000Z",
    guncelleme: "2026-11-26T08:00:00.000Z",
  },
  {
    id: "pansiyon-programi-secimi",
    slug: "pansiyon-programi-secerken-dikkat-edilecekler",
    baslik: "Pansiyon ve butik otel programı seçerken dikkat edilecek 7 şey",
    ozet: "Küçük bir tesis için doğru programı seçerken bakmanız gerekenler: oda planı, telefondan kullanım, KBS, kasa, fiyat ve destek.",
    icerik:
      "Küçük bir tesiste programın işi kolaylaştırması gerekir, zorlaştırması değil. Seçim yaparken şu yedi noktaya bakmanızı öneriyoruz.\n\n## 1. Oda planı tek bakışta anlaşılıyor mu?\nResepsiyonda en çok kullanılan ekran oda planıdır. Rezervasyonları renkli şeritler hâlinde görmek, sürükleyip başka odaya taşımak zaman kazandırır.\n\n## 2. Telefondan rahat kullanılıyor mu?\nSezonda resepsiyonda olmadığınız anlar çoktur. Programın telefonda da tam çalışması gerekir.\n\n## 3. KBS bildirimi otomatik mi?\nMisafir bildirimini elle yapmak hem zaman alır hem hata riskini artırır.\n\n## 4. Kasa ve gün sonu net mi?\nHer kullanıcının aldığı ödemeyi, ödeme türüne göre ayrı ayrı görebilmelisiniz.\n\n## 5. Fiyat ve müsaitlik kolay güncelleniyor mu?\nSezon fiyatlarını toplu ve hızlı değiştirebilmek, rezervasyonda fiyatın kendiliğinden gelmesi önemlidir.\n\n## 6. Aynı kaydı iki kişi aynı anda bozabiliyor mu?\nBirden fazla kişi çalışıyorsa kayıt kilidi olmalı: biri düzenlerken diğeri değiştirememeli.\n\n## 7. Destek ve fiyat şeffaf mı?\nYıllık ücretin ne kadar artacağını ve sorun olduğunda kime ulaşacağınızı önceden bilin.\n\nSoftturk Otel Programı bu ihtiyaçlar düşünülerek, bir otelin içinden geliştirildi. [Ayrıntılar için ürün sayfasına göz atın](/otel-programi).",
    resim: "/ekran/ana-ekran.webp",
    etiketler: ["Pansiyon programı", "Rehber"],
    yayinda: true,
    tarih: "2026-11-25T08:00:00.000Z",
    guncelleme: "2026-11-25T08:00:00.000Z",
  },
];
