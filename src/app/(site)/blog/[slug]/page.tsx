import Link from "next/link";
import { notFound } from "next/navigation";
import { ayarlariGetir, yazi, yazilar } from "@/lib/veri";
import { sayfaMeta, yolJsonLd, tam, tarihYaz, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { Metin, duzMetin } from "@/components/metin";
import { CagriBandi, SayfaUst, YaziKart } from "@/components/bolumler";

export const revalidate = 300;
export const generateStaticParams = async () => (await yazilar()).map((y) => ({ slug: y.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const y = await yazi((await params).slug);
  if (!y) return {};
  return sayfaMeta({ baslik: y.baslik, aciklama: duzMetin(y.ozet || y.icerik), yol: `/blog/${y.slug}`, resim: y.resim || undefined, tur: "article" });
}

export default async function YaziSayfasi({ params }: { params: Promise<{ slug: string }> }) {
  const y = await yazi((await params).slug);
  if (!y) notFound();
  const [a, tum] = await Promise.all([ayarlariGetir(), yazilar()]);
  const diger = tum.filter((x) => x.id !== y.id).slice(0, 3);
  const makale = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: y.baslik,
    description: y.ozet,
    ...(y.resim ? { image: tam(y.resim) } : {}),
    datePublished: y.tarih,
    dateModified: y.guncelleme,
    author: { "@type": "Organization", name: a.firmaAdi, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#firma` },
    mainEntityOfPage: tam(`/blog/${y.slug}`),
    inLanguage: "tr-TR",
    keywords: y.etiketler.join(", "),
  };
  return (
    <>
      <JsonLd veri={[makale, yolJsonLd([{ ad: "Blog", yol: "/blog" }, { ad: y.baslik, yol: `/blog/${y.slug}` }])]} />
      <SayfaUst baslik={y.baslik} metin={y.ozet} yol={[{ ad: "Blog", yol: "/blog" }, { ad: y.baslik, yol: `/blog/${y.slug}` }]} />
      <section className="bolum bolum-beyaz" style={{ paddingTop: 0 }}>
        <article className="kap makale">
          {y.resim && <img className="kapak" src={y.resim} alt="" width={1400} height={875} />}
          <p className="makale-bilgi" style={{ marginTop: y.resim ? 0 : 36 }}>
            <time dateTime={y.tarih}>{tarihYaz(y.tarih)}</time>
            {y.etiketler.length > 0 && <> · {y.etiketler.join(", ")}</>}
          </p>
          <Metin metin={y.icerik} />
        </article>
      </section>
      {diger.length > 0 && (
        <section className="bolum">
          <div className="kap">
            <h2>Diğer yazılar</h2>
            <div className="izgara izgara-3">{diger.map((x) => <YaziKart key={x.id} y={x} />)}</div>
            <p style={{ marginTop: 24 }}><Link href="/blog">Tüm yazılar</Link></p>
          </div>
        </section>
      )}
      <CagriBandi a={a} />
    </>
  );
}
