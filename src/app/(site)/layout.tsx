import Link from "next/link";
import { Logo } from "@/components/logo";
import { Ikon, WhatsappIkon } from "@/components/ikon";
import { Olcum } from "@/components/olcum";
import { ayarlariGetir } from "@/lib/veri";
import { firmaJsonLd, siteJsonLd, telefonLink, whatsappLink } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";

const MENU = [
  { ad: "Otel Programı", yol: "/otel-programi" },
  { ad: "Fiyatlar", yol: "/fiyatlar" },
  { ad: "Web Tasarım", yol: "/web-tasarim" },
  { ad: "Referanslar", yol: "/referanslar" },
  { ad: "Blog", yol: "/blog" },
  { ad: "İletişim", yol: "/iletisim" },
];

export default async function SiteSablon({ children }: { children: React.ReactNode }) {
  const a = await ayarlariGetir();
  const wa = whatsappLink(a.whatsapp);
  const tel = telefonLink(a.telefon);
  const yil = new Date().getFullYear();
  return (
    <>
      <JsonLd veri={[firmaJsonLd(a), siteJsonLd(a)]} />
      <a href="#icerik" className="atla">İçeriğe geç</a>
      <header className="ust">
        <div className="kap ust-ic">
          <Link href="/" aria-label="Softturk ana sayfa"><Logo /></Link>
          <nav className="ust-menu" aria-label="Ana menü">
            {MENU.map((m) => <Link key={m.yol} href={m.yol}>{m.ad}</Link>)}
          </nav>
          <div className="ust-sag">
            {tel && <a className="ust-tel" href={tel}><Ikon ad="telefon" boyut={18} /> {a.telefon}</a>}
            <Link className="btn btn-ana" href="/demo">Ücretsiz demo</Link>
            <details className="mobil-menu">
              <summary aria-label="Menüyü aç"><Ikon ad="menu" /></summary>
              <nav aria-label="Mobil menü">
                {MENU.map((m) => <Link key={m.yol} href={m.yol}>{m.ad}</Link>)}
                <Link href="/demo" className="btn btn-ana">Ücretsiz demo</Link>
              </nav>
            </details>
          </div>
        </div>
      </header>
      <main id="icerik">{children}</main>
      <footer className="alt">
        <div className="kap alt-izgara">
          <div>
            <Logo />
            <p className="alt-yazi">Otel ve pansiyonlar için yönetim programı, işletmeler için hızlı ve arama motoruna uygun web siteleri.</p>
          </div>
          <div>
            <h4>Ürün</h4>
            <Link href="/otel-programi">Otel programı</Link>
            <Link href="/otel-programi#ozellikler">Özellikler</Link>
            <Link href="/fiyatlar">Fiyatlar ve paketler</Link>
            <Link href="/demo">Ücretsiz demo</Link>
          </div>
          <div>
            <h4>Çözümler</h4>
            <Link href="/cozumler/pansiyon-programi">Pansiyon programı</Link>
            <Link href="/cozumler/butik-otel-programi">Butik otel programı</Link>
            <Link href="/cozumler/kbs-bildirim-programi">KBS bildirim programı</Link>
            <Link href="/cozumler/otel-rezervasyon-programi">Rezervasyon programı</Link>
          </div>
          <div>
            <h4>Kurumsal</h4>
            <Link href="/web-tasarim">Web tasarım</Link>
            <Link href="/referanslar">Referanslar</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/iletisim">İletişim</Link>
          </div>
          <div>
            <h4>İletişim</h4>
            {tel && <a href={tel}>{a.telefon}</a>}
            {a.eposta && <a href={`mailto:${a.eposta}`}>{a.eposta}</a>}
            {(a.ilce || a.il) && <span>{[a.ilce, a.il].filter(Boolean).join(" / ")}</span>}
            {a.calismaSaatleri && <span>{a.calismaSaatleri}</span>}
          </div>
        </div>
        <div className="kap alt-son">
          <span>© {yil} {a.firmaAdi}. Tüm hakları saklıdır.</span>
          <span><Link href="/kvkk">KVKK</Link> · <Link href="/cerez-politikasi">Çerez politikası</Link></span>
        </div>
      </footer>
      {wa && (
        <a className="wa-dugme" href={wa} target="_blank" rel="noopener" aria-label="WhatsApp ile yazın">
          <WhatsappIkon boyut={30} />
        </a>
      )}
      <Olcum a={{ ga: a.gaOlcumKimligi, ads: a.adsKimligi, adsForm: a.adsFormEtiketi, adsTel: a.adsTelefonEtiketi }} />
    </>
  );
}
