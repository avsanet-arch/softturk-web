// Otel programının tanıtım metinleri (ürün sayfası, çözüm sayfaları, reklam sayfası ortak kullanır)

export type Ozellik = { baslik: string; metin: string; maddeler: string[]; resim: string; alt: string; tel?: boolean; ikon: string };

export const ANA_OZELLIKLER: Ozellik[] = [
  {
    ikon: "takvim",
    baslik: "Oda planı: bütün oteli tek ekranda görün",
    metin: "Rezervasyonlar renkli şeritler hâlinde odaların üzerinde durur. Bir bakışta kim nerede kalıyor, hangi oda boş, kimin bakiyesi var görürsünüz.",
    maddeler: ["Sürükle bırak ile oda değiştirme ve tarih uzatma", "Ödeme durumuna göre renkler, siz belirlersiniz", "Günlük doluluk ve fiyat satırı", "İki tıkla yeni rezervasyon"],
    resim: "/ekran/room-plan.webp",
    alt: "Softturk oda planı ekranı: odalar ve rezervasyon şeritleri",
  },
  {
    ikon: "kalkan",
    baslik: "KBS bildirimi kendiliğinden gider",
    metin: "Misafir girişini yaptığınızda kimlik bildirimi hazırlanır ve gönderilir, çıkışta da kapatılır. Akşam elle bildirim yapma derdi biter.",
    maddeler: ["Jandarma KBS web servisi ile bağlantı", "Kimlik kartından fotoğrafla bilgi doldurma", "Gönderilmeyen bildirim için uyarı", "Turizm veri bildirimi (aylık rapor)"],
    resim: "/ekran/kbs.webp",
    alt: "Otomatik KBS bildirim ekranı",
  },
  {
    ikon: "kasa",
    baslik: "Kasa, tahsilat ve gün sonu kuruşu kuruşuna",
    metin: "Her kullanıcının hangi ödeme türüyle ne kadar tahsilat yaptığını görün. Gün sonunda kasa teslim fişini yazdırın.",
    maddeler: ["Nakit, kart, havale ve döviz ile tahsilat", "Makbuz, fatura ve iade", "Kullanıcı ve ödeme türüne göre rapor", "Silme işlemleri şifreli ve kayıtlı"],
    resim: "/ekran/kasa.webp",
    alt: "Kasa ve tahsilat ekranı",
  },
  {
    ikon: "etiket",
    baslik: "Fiyat ve müsaitlik: sezon fiyatları dakikalar içinde",
    metin: "Oda tipine ve tarihe göre fiyatları toplu güncelleyin. Rezervasyonda fiyat kendiliğinden gelir; en az konaklama gibi kısıtlamalar da tanımlanır.",
    maddeler: ["Hızlı toplu fiyat güncelleme", "Oda başı veya kişi başı fiyat", "Kahvaltılı / yalnız oda seçenekleri", "Kısıtlamalar ve özel günler"],
    resim: "/ekran/fiyat.webp",
    alt: "Fiyat ve müsaitlik takvimi",
  },
  {
    ikon: "telefon",
    baslik: "Telefondan da tam çalışır",
    metin: "Sahilde, yolda ya da evde olun: rezervasyon girin, kasaya bakın, oda planını görün. Program telefona uygulama gibi kurulur.",
    maddeler: ["Telefon, tablet ve bilgisayarda aynı program", "Ana ekrana kurulabilir", "Kat hizmetleri için ayrı telefon ekranı", "Gece modu"],
    resim: "/ekran/tel-room-plan.webp",
    alt: "Telefonda oda planı",
    tel: true,
  },
  {
    ikon: "grafik",
    baslik: "Raporlar: doluluk, gelir, oda ve kullanıcı performansı",
    metin: "Ön büro ve kasa raporlarının hepsi hazır. Geçen yılla karşılaştırın, hangi odanın ne kazandırdığını görün, hepsini yazdırın.",
    maddeler: ["Doluluk ve ortalama oda fiyatı", "Geçen yıl karşılaştırması", "Oda performansı", "Kullanıcı bazında satış ve tahsilat"],
    resim: "/ekran/rapor-doluluk.webp",
    alt: "Doluluk raporu",
  },
];

export const DIGER_OZELLIKLER = [
  { ikon: "qr", baslik: "QR menüden sipariş", metin: "Misafir masadaki QR kodu okutur, sipariş ekranınıza ve odasının hesabına düşer." },
  { ikon: "menu", baslik: "Restoran ve stok", metin: "Adisyon, odaya yazma, depo ve kritik stok uyarısı." },
  { ikon: "supurge", baslik: "Kat hizmetleri", metin: "Temizlenecek odalar telefondan işaretlenir, resepsiyon anında görür." },
  { ikon: "kimlik", baslik: "Kimlik okuyucu", metin: "Kimlik kartının fotoğrafını çekin, misafir bilgileri kendiliğinden dolsun." },
  { ikon: "mesaj", baslik: "WhatsApp ve online ön kayıt", metin: "Misafire bağlantı gönderin, bilgilerini gelmeden önce kendisi doldursun." },
  { ikon: "zil", baslik: "Bildirimler ve hatırlatmalar", metin: "Opsiyonu dolan rezervasyon, doğum günü, gelmeyen misafir için uyarı." },
  { ikon: "kilit", baslik: "Kayıt kilidi ve yetkiler", metin: "Biri düzenlerken diğeri değiştiremez. Her kullanıcıya ayrı yetki." },
  { ikon: "kalkan", baslik: "İki aşamalı doğrulama", metin: "Giriş kilidi, güvenlik günlüğü ve isteğe bağlı doğrulama kodu." },
  { ikon: "fatura", baslik: "Fatura ve makbuz", metin: "Konaklama vergisi dahil fatura çıktısı ve numaralı tahsilat makbuzu." },
  { ikon: "posta", baslik: "Satış kanalı e-postaları", metin: "Online kanallardan gelen rezervasyon e-postaları kendiliğinden işlenir." },
  { ikon: "dunya", baslik: "Türkçe ve İngilizce", metin: "Yabancı personel için program İngilizce de kullanılabilir." },
  { ikon: "bulut", baslik: "Yedek ve güncelleme bizde", metin: "Verileriniz düzenli yedeklenir, yeni özellikler ek ücret olmadan gelir." },
];

export const SSS = [
  { s: "Programı kurmak için bilgisayara bir şey yüklemem gerekiyor mu?", c: "Hayır. Softturk Otel Programı web tabanlıdır; internet tarayıcısından girersiniz. İsterseniz telefonunuza ve bilgisayarınıza uygulama gibi kurabilirsiniz." },
  { s: "KBS bildirimi gerçekten otomatik mi?", c: "Evet. Tesisinizin KBS bilgilerini bir kez tanımlarsınız; misafir girişi ve çıkışı yapıldıkça bildirimler program tarafından gönderilir. Gönderilemeyen bir bildirim olursa ekranda uyarı görürsünüz." },
  { s: "Kaç kullanıcı aynı anda çalışabilir?", c: "Paketlerde kullanıcı sınırı yoktur. Resepsiyon, sahip ve kat görevlisi aynı anda farklı cihazlardan çalışabilir. Aynı kaydı iki kişinin aynı anda bozmaması için kayıt kilidi vardır." },
  { s: "Eski programımdaki rezervasyonları aktarabilir miyim?", c: "Evet. Gelecek tarihli rezervasyonlarınızı CSV / Excel dosyasıyla toplu olarak aktarabilirsiniz; aktarım sırasında size yardımcı oluyoruz." },
  { s: "İnternet kesilirse ne olur?", c: "Veriler güvenli sunucularda tutulduğu için cihazınıza bir şey olsa da kaybolmaz. İnternet kesildiğinde telefonunuzun mobil verisiyle çalışmaya devam edebilirsiniz." },
  { s: "Verilerim güvende mi?", c: "Bağlantılar şifrelidir, veriler düzenli olarak yedeklenir. Hatalı girişlerde hesap kilitlenir, isteğe bağlı iki aşamalı doğrulama ve tüm işlemlerin kaydı tutulur." },
  { s: "Denemek için ücret ödemem gerekir mi?", c: "Hayır. Demo talebi bırakın, sizi arayıp programı kendi odalarınızla birlikte gösterelim ve deneme hesabı açalım." },
];

export type Cozum = { slug: string; baslik: string; h1: string; aciklama: string; giris: string; maddeler: { b: string; m: string }[]; resim: string };

// Arama motorunda farklı aramalara karşılık gelen çözüm sayfaları (her biri ayrı, özgün içerikli)
export const COZUMLER: Cozum[] = [
  {
    slug: "pansiyon-programi",
    baslik: "Pansiyon Programı",
    h1: "Pansiyonlar için sade ve kolay pansiyon programı",
    aciklama: "Pansiyonlar için web tabanlı pansiyon programı: oda planı, rezervasyon, otomatik KBS bildirimi, kasa ve raporlar. Telefondan kullanılır, kurulum gerektirmez.",
    giris: "Pansiyonda çoğu zaman resepsiyon, kasa ve misafir ilişkileri aynı kişidedir. Programın da o kadar sade olması gerekir: bir ekranda odaları görün, rezervasyonu iki tıkla girin, kimlik bildirimini unutun.",
    maddeler: [
      { b: "Bir ekranda tüm odalar", m: "Oda planında hangi odanın dolu, hangisinin boş olduğunu ve kimin ödemesinin kaldığını renklerden anlarsınız." },
      { b: "Otomatik KBS", m: "Misafir girişini yaptığınızda bildirim kendiliğinden gider. Akşamları ayrıca uğraşmazsınız." },
      { b: "Telefonda tam program", m: "Pansiyon sahibi çoğu zaman resepsiyonda değildir. Telefondan rezervasyon girin, kasaya bakın." },
      { b: "Uygun fiyat", m: "Oda sayınıza göre paket seçersiniz; küçük pansiyon büyük otel kadar ödemez." },
    ],
    resim: "/ekran/ana-ekran.webp",
  },
  {
    slug: "butik-otel-programi",
    baslik: "Butik Otel Programı",
    h1: "Butik oteller için modern otel yönetim programı",
    aciklama: "Butik oteller için oda planı, rezervasyon, fiyat ve müsaitlik, kasa, restoran, QR menü ve raporlar tek programda. Web tabanlı, telefondan kullanılabilir.",
    giris: "Butik otelde misafir deneyimi her şeydir. Softturk; rezervasyondan restorana, kat hizmetlerinden gün sonuna kadar işleri tek yerde toplar, size misafirle ilgilenecek zaman bırakır.",
    maddeler: [
      { b: "Fiyat ve müsaitlik", m: "Sezon fiyatlarını toplu güncelleyin; kısıtlama ve özel günler tanımlayın." },
      { b: "Restoran ve QR menü", m: "Misafir siparişi QR menüden verir, adisyon odasının hesabına yazılır." },
      { b: "Tekrar gelen misafir", m: "Daha önce kalmış misafiri program tanır, notlarını ve tercihlerini gösterir." },
      { b: "Kat hizmetleri", m: "Temizlik durumu telefondan güncellenir, resepsiyon anında görür." },
    ],
    resim: "/ekran/pos.webp",
  },
  {
    slug: "kbs-bildirim-programi",
    baslik: "KBS Bildirim Programı",
    h1: "Otomatik KBS bildirimi yapan otel programı",
    aciklama: "Kimlik Bildirim Sistemi (KBS) bildirimini otomatik yapan otel ve pansiyon programı. Misafir girişi ve çıkışı yapıldıkça bildirim kendiliğinden gönderilir.",
    giris: "Konaklama tesisleri misafirlerinin kimlik bilgilerini KBS üzerinden bildirmek zorundadır. Bunu her gün elle yapmak hem zaman alır hem de unutulma riski taşır. Softturk bu işi sizin yerinize yapar.",
    maddeler: [
      { b: "Girişte otomatik bildirim", m: "Misafir girişini kaydettiğiniz anda bildirim hazırlanır ve gönderilir." },
      { b: "Çıkışta otomatik kapanış", m: "Çıkış yapan misafirin bildirimi de program tarafından işlenir." },
      { b: "Hata ve eksik uyarısı", m: "Gönderilemeyen ya da eksik bilgili bir kayıt olursa ekranda uyarı görürsünüz." },
      { b: "Kimlikten bilgi doldurma", m: "Kimlik kartının fotoğrafından ad, numara ve doğum tarihi kendiliğinden doldurulur." },
    ],
    resim: "/ekran/kbs.webp",
  },
  {
    slug: "otel-rezervasyon-programi",
    baslik: "Otel Rezervasyon Programı",
    h1: "Otel rezervasyon programı: oda planı, opsiyon, kapora ve hatırlatmalar",
    aciklama: "Otel ve pansiyonlar için rezervasyon programı. Sürükle bırak oda planı, opsiyon ve kapora takibi, boş oda bulma, oda değişimli konaklama önerisi.",
    giris: "Telefonla gelen rezervasyonu saniyeler içinde girmek, uygun odayı hemen bulmak ve kaporası gelmeyeni kaçırmamak... Softturk'un rezervasyon ekranları bunun için tasarlandı.",
    maddeler: [
      { b: "Boş oda bul", m: "Tarih ve kişi sayısını yazın, uygun odalar fiyatıyla listelensin." },
      { b: "Oda değişimli konaklama", m: "Tek oda yetmiyorsa program iki odada kalma önerisi çıkarır." },
      { b: "Opsiyon ve kapora takibi", m: "Opsiyon süresi dolan rezervasyonlar için ana ekranda uyarı." },
      { b: "Satış kanalları", m: "Online kanallardan gelen rezervasyon e-postaları sisteme kendiliğinden işlenir." },
    ],
    resim: "/ekran/bos-oda-oneri.webp",
  },
];
