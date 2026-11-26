import Link from "next/link";
import { notFound } from "next/navigation";
import { ayarlariGetir, referans, referanslar } from "@/lib/veri";
import { sayfaMeta, yolJsonLd, tam, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { Metin, duzMetin } from "@/components/metin";
import { CagriBandi, ReferansKart, SayfaUst } from "@/components/bolumler";
import { Ikon } from "@/components/ikon";

export const revalidate = 300;
export const generateStaticParams = async () => (await referanslar()).map((r) => ({ slug: r.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const r = await referans((await params).slug);
  if (!r) return {};
  return sayfaMeta({ baslik: `${r.baslik} – Referans`, aciklama: duzMetin(r.ozet || r.aciklama), yol: `/referanslar/${r.slug}`, resim: r.resim || undefined, tur: "article" });
}

export default async function ReferansDetay({ params }: { params: Promise<{ slug: string }> }) {
  const r = await referans((await params).slug);
  if (!r) notFound();
  const [a, tum] = await Promise.all([ayarlariGetir(), referanslar()]);
  const digerleri = tum.filter((x) => x.id !== r.id).slice(0, 3);
  const is = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: r.baslik,
    description: r.ozet,
    ...(r.resim ? { image: tam(r.resim) } : {}),
    ...(r.url ? { url: r.url } : {}),
    creator: { "@id": `${SITE_URL}/#firma` },
    ...(r.yil ? { dateCreated: r.yil } : {}),
    keywords: r.etiketler.join(", "),
  };
  return (
    <>
      <JsonLd veri={[is, yolJsonLd([{ ad: "Referanslar", yol: "/referanslar" }, { ad: r.baslik, yol: `/referanslar/${r.slug}` }])]} />
      <SayfaUst baslik={r.baslik} metin={r.ozet} yol={[{ ad: "Referanslar", yol: "/referanslar" }, { ad: r.baslik, yol: `/referanslar/${r.slug}` }]} />
      <section className="bolum bolum-beyaz" style={{ paddingTop: 0 }}>
        <article className="kap makale">
          {r.resim && <img className="kapak" src={r.resim} alt={`${r.baslik} ekran görüntüsü`} width={1400} height={875} />}
          <div className="makale-bilgi" style={{ display: "flex", gap: 18, flexWrap: "wrap", marginTop: r.resim ? 0 : 36 }}>
            {r.musteri && <span><b>Müşteri:</b> {r.musteri}</span>}
            {r.sektor && <span><b>Sektör:</b> {r.sektor}</span>}
            {r.yil && <span><b>Yıl:</b> {r.yil}</span>}
            {r.durum === "devam" && <span className="durum-devam">Yapım aşamasında</span>}
          </div>
          <Metin metin={r.aciklama} />
          {r.etiketler.length > 0 && <div className="etiketler">{r.etiketler.map((e) => <span key={e}>{e}</span>)}</div>}
          {r.url && (
            <p style={{ marginTop: 28 }}>
              <a className="btn btn-ana" href={r.url} target="_blank" rel="noopener">Siteyi ziyaret edin <Ikon ad="ok" boyut={18} /></a>
            </p>
          )}
        </article>
      </section>
      {digerleri.length > 0 && (
        <section className="bolum">
          <div className="kap">
            <h2>Diğer referanslar</h2>
            <div className="izgara izgara-3">{digerleri.map((x) => <ReferansKart key={x.id} r={x} />)}</div>
            <p style={{ marginTop: 24 }}><Link href="/referanslar">Tümünü görün</Link></p>
          </div>
        </section>
      )}
      <CagriBandi a={a} baslik="Sizin için de yapalım" metin="İşletmeniz için hızlı, Google'da bulunan bir web sitesi ya da size özel bir yazılım için bize ulaşın." />
    </>
  );
}
