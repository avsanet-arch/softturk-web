import Link from "next/link";
import { ayarlariGetir, type Ayarlar } from "@/lib/veri";
import { sayfaMeta, sssJsonLd, yolJsonLd, SITE_URL, tam } from "@/lib/site";
import { ISO_PARA, paraBirimi, sayiOku } from "@/lib/fiyat";
import { Ikon } from "@/components/ikon";
import { JsonLd } from "@/components/json-ld";
import { CagriBandi, Dalga, EkModuller, Kullananlar, Paketler, Sss } from "@/components/bolumler";
import { Gerisayim } from "@/components/fiyat-kartlari";

export const revalidate = 300;

export const metadata = sayfaMeta({
  baslik: "Otel Programı Fiyatları | Kampanyalı Paketler",
  aciklama: "Softturk Otel Programı fiyatları: oda sayınıza göre aylık veya yıllık paket, lansman kampanyası, ücretsiz deneme. Oda planı, rezervasyon, otomatik KBS, kasa ve raporlar her pakette.",
  yol: "/fiyatlar",
  resim: "/ekran/room-plan.webp",
});

const HER_PAKETTE: { i: string; b: string; m: string }[] = [
  { i: "takvim", b: "Oda planı ve rezervasyon", m: "Sürükle bırak oda planı, oda değişimi, rezervasyon bölme, opsiyon takibi." },
  { i: "kalkan", b: "Otomatik KBS", m: "Misafir girişleri jandarma KBS'ye programdan kendiliğinden bildirilir." },
  { i: "etiket", b: "Fiyat ve müsaitlik", m: "Günlük oda fiyatları, toplu güncelleme, satış kısıtları." },
  { i: "kasa", b: "Kasa, tahsilat, gün sonu", m: "Kullanıcı ve ödeme tipine göre kasa, makbuz, gün sonu raporu." },
  { i: "fatura", b: "Fatura ve folyo", m: "Misafir hesabı, ekstralar, fatura yazdırma." },
  { i: "grafik", b: "Raporlar", m: "Doluluk, ADR, oda performansı, geçen yılla karşılaştırma." },
  { i: "supurge", b: "Kat hizmetleri", m: "Telefondan oda temizlik durumu ve günlük iş listesi." },
  { i: "mesaj", b: "Online ön kayıt", m: "Misafir kimlik bilgilerini gelmeden önce telefondan girer." },
  { i: "zil", b: "Bildirimler ve hatırlatmalar", m: "Opsiyon, ödeme, doğum günü ve günlük rutin uyarıları." },
  { i: "kilit", b: "Güvenlik ve yetkiler", m: "Kullanıcı yetkileri, iki aşamalı doğrulama, işlem kayıtları." },
  { i: "bulut", b: "Bulut ve yedek", m: "Kurulum yok, bilgisayar bozulsa da verileriniz yerinde." },
  { i: "telefon", b: "Telefon ve tablet", m: "Ana ekrana eklenen uygulama gibi çalışır, her yerden erişin." },
];

const KARSILASTIRMA: [string, string, string][] = [
  ["Kurulum", "Yok, tarayıcıdan açılır", "Her bilgisayara ayrı kurulum"],
  ["Telefondan kullanım", "Var, her yerden", "Genelde yok ya da ek ücretli"],
  ["Güncellemeler", "Kendiliğinden, ücretsiz", "Elle, çoğu zaman ücretli"],
  ["Verileriniz", "Sunucuda, her cihazdan erişilir", "O bilgisayarda, yedeği sizde"],
  ["Bilgisayar bozulursa", "Başka cihazdan devam", "Veri kaybı riski"],
  ["KBS bildirimi", "Programın içinde, otomatik", "Ayrı ekran ya da ek modül"],
  ["Aynı anda çalışma", "Sınırsız kullanıcı, kayıt kilidi", "Lisans başına kullanıcı"],
  ["Ödeme", "Aylık veya yıllık, oda sayısına göre", "Peşin lisans + yıllık bakım"],
];

function fiyatSss(a: Ayarlar) {
  const l: { s: string; c: string }[] = [
    { s: "Fiyatlara KDV dahil mi?", c: a.fiyatKdv ? `Sayfadaki fiyatlar ${a.fiyatKdv.toLocaleLowerCase("tr")} fiyatlardır.` : "Fiyat ayrıntıları için bizi arayın." },
    { s: "Hangi paketi seçmeliyim?", c: "Paketler yalnızca oda sayısına göre ayrılır. Özellikler her pakette aynıdır; tesisinizdeki oda sayısının girdiği paketi seçmeniz yeterli. Oda sayınız artarsa paketiniz bir üste geçer." },
    { s: "Yıllık ödemenin avantajı nedir?", c: "Yıllık ödemede aylık ödemeye göre daha az ödersiniz. Kartlardaki “Yıllık” düğmesine basarak farkı görebilirsiniz." },
  ];
  if (a.kampanyaAcik && a.kampanyaMetni) l.push({ s: "Kampanya ne zamana kadar geçerli?", c: a.kampanyaMetni });
  if (a.denemeGun) l.push({ s: "Ücretsiz deneme nasıl işliyor?", c: `${a.denemeGun} gün boyunca programın tamamını ücretsiz kullanırsınız. Deneme için kart ya da ödeme bilgisi istemiyoruz. Beğenmezseniz hiçbir şey ödemezsiniz.` });
  l.push(
    { s: "Ek modülleri sonradan ekleyebilir miyim?", c: "Evet. Yapay zekâ asistanı, kimlik okuma, POS ve restoran gibi modülleri istediğiniz zaman açar ya da kapatırız. Ücreti yalnızca kullandığınız modül için ödersiniz." },
    { s: "Kurulum ve eğitim ücretli mi?", c: "Odalarınızın tanımlanması ve kullanım eğitimi pakete dahildir. Eski programınızdaki rezervasyonları CSV dosyasıyla aktarmanıza da yardımcı oluyoruz." },
    { s: "50 odadan büyük tesisim var, fiyat nedir?", c: "Büyük tesisler ve birden fazla otel işleten firmalar için oda sayısına göre ayrı teklif hazırlıyoruz. Formu doldurun, sizi arayalım." },
  );
  return l;
}

export default async function Fiyatlar() {
  const a = await ayarlariGetir();
  const sss = fiyatSss(a);
  const sayilar = a.paketler.map((p) => sayiOku(p.aylik)).filter((n): n is number => !!n);
  const birim = ISO_PARA[paraBirimi(a.paketler.find((p) => p.aylik)?.aylik)] ?? "TRY";
  const urun = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Softturk Otel Programı",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Android, iOS, Windows, macOS",
    url: `${SITE_URL}/fiyatlar`,
    image: tam("/ekran/room-plan.webp"),
    publisher: { "@id": `${SITE_URL}/#firma` },
    ...(sayilar.length
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: birim,
            lowPrice: Math.min(...sayilar),
            highPrice: Math.max(...sayilar),
            offerCount: sayilar.length,
            offers: a.paketler.filter((p) => sayiOku(p.aylik)).map((p) => ({
              "@type": "Offer",
              name: `${p.ad} (${p.odalar})`,
              price: sayiOku(p.aylik),
              priceCurrency: birim,
              priceSpecification: { "@type": "UnitPriceSpecification", price: sayiOku(p.aylik), priceCurrency: birim, unitCode: "MON", valueAddedTaxIncluded: !/hari/i.test(a.fiyatKdv) },
              availability: "https://schema.org/InStock",
              url: `${SITE_URL}/fiyatlar`,
            })),
          },
        }
      : {}),
  };
  return (
    <>
      <JsonLd veri={[urun, sssJsonLd(sss), yolJsonLd([{ ad: "Fiyatlar", yol: "/fiyatlar" }])]} />
      <section className="kahraman fiyat-kahraman">
        <div className="kap" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          {a.kampanyaAcik && a.kampanyaBaslik ? (
            <span className="rozet rozet-kampanya"><Ikon ad="hediye" boyut={16} /> {a.kampanyaBaslik}</span>
          ) : (
            <span className="rozet">Fiyatlar</span>
          )}
          <h1>Her otele uygun, <em>şeffaf fiyat</em></h1>
          <p className="fiyat-giris">Oda sayınıza göre paket seçin, bütün özellikler her pakette. Gizli ücret, kurulum bedeli ya da kullanıcı sınırı yok.</p>
          {a.kampanyaAcik && a.kampanyaMetni && (
            <div className="kampanya-bant">
              <p>{a.kampanyaMetni}</p>
              {a.kampanyaBitis && <Gerisayim bitis={a.kampanyaBitis} />}
            </div>
          )}
          <ul className="kahraman-maddeler" style={{ justifyContent: "center" }}>
            {a.denemeGun && <li><Ikon ad="tik" boyut={16} /> {a.denemeGun} gün ücretsiz deneme</li>}
            <li><Ikon ad="tik" boyut={16} /> Kart bilgisi istenmez</li>
            <li><Ikon ad="tik" boyut={16} /> Kurulum ve eğitim dahil</li>
          </ul>
        </div>
        <Dalga renk="#ffffff" />
      </section>

      <section className="bolum bolum-beyaz" id="paketler" style={{ paddingTop: 40 }}>
        <div className="kap">
          <div className="ust-baslik">
            <span className="rozet">1. Paketinizi seçin</span>
            <h2>Oda sayınıza göre paket</h2>
            <p>Aylık ya da yıllık ödeyin. Yıllık ödemede daha az ödersiniz.</p>
          </div>
          <Paketler a={a} />
        </div>
      </section>

      <section className="bolum" id="dahil">
        <div className="kap">
          <div className="ust-baslik">
            <span className="rozet">Her pakette</span>
            <h2>Fiyata dahil olanlar</h2>
            <p>Küçük pansiyon da büyük otel de aynı programı kullanır. Aradaki tek fark oda sayısıdır.</p>
          </div>
          <div className="izgara izgara-3">
            {HER_PAKETTE.map((x) => (
              <div key={x.b} className="mini">
                <div className="ikon-kutu"><Ikon ad={x.i} boyut={20} /></div>
                <div><h3>{x.b}</h3><p>{x.m}</p></div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 26 }}><Link href="/otel-programi#ozellikler" className="btn btn-ince">Bütün özellikleri ekranlarıyla görün <Ikon ad="ok" boyut={16} /></Link></p>
        </div>
      </section>

      {a.ekModuller.length > 0 && (
        <section className="bolum bolum-beyaz" id="ek-moduller">
          <div className="kap">
            <div className="ust-baslik">
              <span className="rozet">2. Paketinizi genişletin</span>
              <h2>İsteğe bağlı ek modüller</h2>
              <p>İhtiyacınız olanı ekleyin, olmayanı ödemeyin. Modülleri istediğiniz zaman açıp kapatabiliriz.</p>
            </div>
            <EkModuller a={a} />
            {a.fiyatKdv && <p className="fiyat-notu">Modül fiyatları paket fiyatına eklenir, {a.fiyatKdv.toLocaleLowerCase("tr")}.</p>}
          </div>
        </section>
      )}

      {a.kullananlar.length > 0 && (
        <section className="bolum" id="kullananlar">
          <div className="kap">
            <div className="ust-baslik">
              <span className="rozet">Referanslar</span>
              <h2>Programı kullanan işletmeler</h2>
              <p>Softturk Otel Programı gerçek bir otelin her gün kullandığı ekranlarla geliştirildi.</p>
            </div>
            <Kullananlar a={a} />
          </div>
        </section>
      )}

      <section className="bolum bolum-beyaz" id="karsilastirma">
        <div className="kap">
          <div className="ust-baslik">
            <span className="rozet">Karşılaştırma</span>
            <h2>Bulut otel programı mı, bilgisayara kurulan program mı?</h2>
          </div>
          <div className="tablo-kap">
            <table className="karsilastirma">
              <thead>
                <tr><th scope="col"></th><th scope="col" className="biz">Softturk (bulut)</th><th scope="col">Kurulu masaüstü program</th></tr>
              </thead>
              <tbody>
                {KARSILASTIRMA.map(([k, biz, diger]) => (
                  <tr key={k}><th scope="row">{k}</th><td className="biz"><Ikon ad="tik" boyut={16} /> {biz}</td><td>{diger}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bolum" id="sss">
        <div className="kap">
          <div className="ust-baslik">
            <span className="rozet">Sık sorulan sorular</span>
            <h2>Fiyatlarla ilgili sorular</h2>
          </div>
          <Sss liste={sss} />
        </div>
      </section>

      <CagriBandi a={a} baslik={a.denemeGun ? `${a.denemeGun} gün ücretsiz deneyin` : "Ücretsiz demo isteyin"} metin="Formu doldurun, odalarınızı birlikte tanımlayalım ve programı kendi otelinizle gösterelim." />
    </>
  );
}
