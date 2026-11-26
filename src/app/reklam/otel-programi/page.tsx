import Link from "next/link";
import { ayarlariGetir } from "@/lib/veri";
import { sayfaMeta, telefonLink, whatsappLink } from "@/lib/site";
import { Logo } from "@/components/logo";
import { Ikon, WhatsappIkon } from "@/components/ikon";
import { Olcum } from "@/components/olcum";
import { Dalga, DigerOzellikler, OzellikListesi, Paketler, Sss } from "@/components/bolumler";
import { TalepFormu } from "@/components/talep-formu";

export const revalidate = 300;

// Google Ads açılış sayfası: tek hedef (demo formu), menü yok, arama sonuçlarında çıkmaz
export const metadata = sayfaMeta({
  baslik: "Otel Programı – Ücretsiz Demo",
  aciklama: "Otel ve pansiyonlar için kolay otel programı. Otomatik KBS, oda planı, kasa ve raporlar. Ücretsiz demo isteyin.",
  yol: "/reklam/otel-programi",
  indeksleme: false,
});

export default async function ReklamSayfasi() {
  const a = await ayarlariGetir();
  const tel = telefonLink(a.telefon);
  const wa = whatsappLink(a.whatsapp, "Merhaba, otel programı için demo istiyorum.");
  return (
    <>
      <div className="reklam-ust">
        <div className="kap">
          <Link href="/" aria-label="Softturk"><Logo /></Link>
          {tel ? <a className="btn btn-cizgi" href={tel}><Ikon ad="telefon" boyut={18} /> {a.telefon}</a> : <a className="btn btn-cizgi" href="#form">Demo iste</a>}
        </div>
      </div>
      <main>
        <section className="kahraman" style={{ paddingTop: 48 }}>
          <div className="kap kahraman-ic">
            <div className="kahraman-yazi">
              <span className="rozet">Otel · Motel · Pansiyon</span>
              <h1>KBS'si otomatik, kullanımı <em>kolay otel programı</em></h1>
              <p>Oda planı, rezervasyon, kasa ve raporlar tek ekranda. Telefondan da kullanın. Kurulum ve eğitim bizden.</p>
              <ul className="kahraman-maddeler" style={{ margin: "18px 0 0" }}>
                <li><Ikon ad="tik" boyut={16} /> Sınırsız kullanıcı</li>
                <li><Ikon ad="tik" boyut={16} /> Ücretsiz deneme</li>
                <li><Ikon ad="tik" boyut={16} /> Aynı gün dönüş</li>
              </ul>
              <div className="ekran-cerceve" style={{ marginTop: 28 }}>
                <div className="cubuk"><i /><i /><i /></div>
                <img src="/ekran/room-plan.webp" alt="Otel programı oda planı" width={1400} height={875} fetchPriority="high" />
              </div>
            </div>
            <div id="form">
              <TalepFormu tur="reklam" baslik="Ücretsiz demo isteyin" aciklama="Bilgilerinizi bırakın, sizi arayıp programı kendi odalarınızla gösterelim." />
            </div>
          </div>
          <Dalga renk="#ffffff" />
        </section>
        <section className="bolum bolum-beyaz" style={{ paddingTop: 32 }}>
          <OzellikListesi />
        </section>
        <section className="bolum"><div className="kap"><DigerOzellikler /></div></section>
        <section className="bolum bolum-beyaz"><div className="kap"><div className="ust-baslik"><h2>Oda sayınıza göre paket</h2></div><Paketler a={a} /></div></section>
        <section className="bolum"><div className="kap"><div className="ust-baslik"><h2>Sık sorulan sorular</h2></div><Sss /></div></section>
        <section className="bolum bolum-koyu" style={{ textAlign: "center" }}>
          <div className="kap">
            <h2>Hemen deneyin</h2>
            <p>Formu doldurun ya da bize doğrudan ulaşın.</p>
            <div className="kahraman-dugmeler" style={{ justifyContent: "center" }}>
              <a href="#form" className="btn btn-ana btn-buyuk">Demo iste</a>
              {wa && <a href={wa} target="_blank" rel="noopener" className="btn btn-wa btn-buyuk"><WhatsappIkon boyut={20} /> WhatsApp</a>}
            </div>
          </div>
        </section>
      </main>
      <footer className="alt" style={{ padding: "24px 0" }}>
        <div className="kap alt-son" style={{ border: 0, margin: 0, padding: 0 }}>
          <span>© {new Date().getFullYear()} {a.firmaAdi}</span>
          <span><Link href="/kvkk">KVKK</Link> · <Link href="/cerez-politikasi">Çerez politikası</Link></span>
        </div>
      </footer>
      {wa && <a className="wa-dugme" href={wa} target="_blank" rel="noopener" aria-label="WhatsApp"><WhatsappIkon boyut={30} /></a>}
      <Olcum a={{ ga: a.gaOlcumKimligi, ads: a.adsKimligi, adsForm: a.adsFormEtiketi, adsTel: a.adsTelefonEtiketi }} />
    </>
  );
}
