import Link from "next/link";
import { ayarlariGetir } from "@/lib/veri";
import { sayfaMeta, sssJsonLd, yolJsonLd, SITE_URL, tam } from "@/lib/site";
import { SSS } from "@/lib/urun";
import { Ikon } from "@/components/ikon";
import { JsonLd } from "@/components/json-ld";
import { CagriBandi, Dalga, DigerOzellikler, OzellikListesi, Paketler, Sss } from "@/components/bolumler";
import { TalepFormu } from "@/components/talep-formu";

export const revalidate = 300;

export const metadata = sayfaMeta({
  baslik: "Otel Programı | Web Tabanlı Otel Yönetim Yazılımı",
  aciklama: "Softturk Otel Programı: sürükle bırak oda planı, rezervasyon, otomatik KBS bildirimi, fiyat ve müsaitlik, kasa, gün sonu ve raporlar. Otel, motel ve pansiyonlar için, telefondan da kullanılır.",
  yol: "/otel-programi",
  resim: "/ekran/room-plan.webp",
});

export default async function OtelProgrami() {
  const a = await ayarlariGetir();
  const fiyatli = a.paketler.filter((p) => p.aylik);
  const urun = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Softturk Otel Programı",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Otel yönetim programı (PMS)",
    operatingSystem: "Web, Android, iOS, Windows, macOS",
    inLanguage: ["tr", "en"],
    url: `${SITE_URL}/otel-programi`,
    image: tam("/ekran/room-plan.webp"),
    screenshot: [tam("/ekran/room-plan.webp"), tam("/ekran/kbs.webp"), tam("/ekran/kasa.webp")],
    description: "Otel, motel ve pansiyonlar için web tabanlı ön büro programı: oda planı, rezervasyon, otomatik KBS, kasa ve raporlar.",
    publisher: { "@id": `${SITE_URL}/#firma` },
    featureList: ["Oda planı", "Rezervasyon", "Otomatik KBS bildirimi", "Fiyat ve müsaitlik", "Kasa ve gün sonu", "Raporlar", "QR menü", "Kat hizmetleri"],
    ...(fiyatli.length
      ? { offers: fiyatli.map((p) => ({ "@type": "Offer", name: `${p.ad} (${p.odalar})`, description: `Aylık ${p.aylik}`, availability: "https://schema.org/InStock" })) }
      : {}),
  };
  return (
    <>
      <JsonLd veri={[urun, sssJsonLd(SSS), yolJsonLd([{ ad: "Otel Programı", yol: "/otel-programi" }])]} />
      <section className="kahraman">
        <div className="kap kahraman-ic">
          <div className="kahraman-yazi">
            <span className="rozet">Softturk Otel Programı</span>
            <h1>Otel, motel ve pansiyonlar için <em>kolay otel programı</em></h1>
            <p>Oda planı, rezervasyon, otomatik KBS, kasa ve raporlar tek programda. Bilgisayardan da telefondan da kullanın, hiçbir şey kurmayın.</p>
            <div className="kahraman-dugmeler">
              <Link href="/demo" className="btn btn-ana btn-buyuk">Ücretsiz demo iste <Ikon ad="ok" boyut={18} /></Link>
              <a href="#ozellikler" className="btn btn-cizgi btn-buyuk">Özellikleri görün</a>
            </div>
            <ul className="kahraman-maddeler">
              <li><Ikon ad="tik" boyut={16} /> Sınırsız kullanıcı</li>
              <li><Ikon ad="tik" boyut={16} /> Eski kayıtları aktarma</li>
              <li><Ikon ad="tik" boyut={16} /> Türkçe destek</li>
            </ul>
          </div>
          <div className="kahraman-gorsel">
            <div className="ekran-cerceve">
              <div className="cubuk"><i /><i /><i /></div>
              <img src="/ekran/ana-ekran.webp" alt="Otel programı ana ekranı: bugün giriş ve çıkış yapacaklar, doluluk" width={1400} height={875} fetchPriority="high" />
            </div>
            <div className="telefon-cerceve">
              <img src="/ekran/tel-room-plan.webp" alt="Telefonda oda planı" width={560} height={1212} />
            </div>
          </div>
        </div>
        <Dalga renk="#ffffff" />
      </section>

      <section className="bolum bolum-beyaz" id="ozellikler" style={{ paddingTop: 48 }}>
        <div className="ust-baslik kap">
          <span className="rozet">Özellikler</span>
          <h2>Resepsiyonun her gün yaptığı işler, daha kısa yoldan</h2>
          <p>Her ekran gerçek bir otelin ihtiyacıyla tasarlandı. Gereksiz menü yok, en sık yapılan işler en önde.</p>
        </div>
        <OzellikListesi />
      </section>

      <section className="bolum">
        <div className="kap">
          <div className="ust-baslik">
            <span className="rozet">Ve dahası</span>
            <h2>Büyüdükçe ihtiyaç duyacağınız her şey</h2>
          </div>
          <DigerOzellikler />
        </div>
      </section>

      <section className="bolum bolum-beyaz" id="paketler">
        <div className="kap">
          <div className="ust-baslik">
            <span className="rozet">Paketler</span>
            <h2>Oda sayınıza göre paket</h2>
            <p>Bütün özellikler her pakette var. Sadece oda sayınıza göre ödersiniz.</p>
          </div>
          <Paketler a={a} />
        </div>
      </section>

      <section className="bolum" id="sss">
        <div className="kap">
          <div className="ust-baslik">
            <span className="rozet">Sık sorulan sorular</span>
            <h2>Aklınıza takılanlar</h2>
          </div>
          <Sss />
        </div>
      </section>

      <section className="bolum bolum-koyu" id="demo">
        <div className="kap izgara izgara-2" style={{ alignItems: "center", gap: 48 }}>
          <div>
            <span className="rozet">Ücretsiz demo</span>
            <h2>Programı kendi odalarınızla görün</h2>
            <p>Formu doldurun, sizi arayalım. Odalarınızı birlikte tanımlayalım, programı canlı gösterelim ve deneme hesabınızı açalım. Hiçbir ödeme bilgisi istemiyoruz.</p>
            <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 10, marginTop: 18 }}>
              {["Aynı gün dönüş", "Kurulum ve eğitim bizden", "Eski rezervasyonlarınızı aktarma desteği"].map((m) => (
                <li key={m} style={{ display: "flex", gap: 8, alignItems: "center", color: "#d7e5ec" }}><Ikon ad="tik" boyut={18} /> {m}</li>
              ))}
            </ul>
          </div>
          <TalepFormu tur="demo" />
        </div>
      </section>
    </>
  );
}
