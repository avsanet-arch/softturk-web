import { referanslar } from "@/lib/veri";
import { sayfaMeta, yolJsonLd, tam } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { ReferansKart, SayfaUst } from "@/components/bolumler";

export const revalidate = 300;

export const metadata = sayfaMeta({
  baslik: "Referanslar | Yaptığımız Web Siteleri ve Projeler",
  aciklama: "Softturk'un tasarladığı web siteleri, geliştirdiği yazılımlar ve yapım aşamasındaki yeni projeler.",
  yol: "/referanslar",
});

export default async function Referanslar() {
  const l = await referanslar();
  const yayinda = l.filter((r) => r.durum !== "devam");
  const devam = l.filter((r) => r.durum === "devam");
  const liste = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: l.map((r, i) => ({ "@type": "ListItem", position: i + 1, url: tam(`/referanslar/${r.slug}`), name: r.baslik })),
  };
  return (
    <>
      <JsonLd veri={[liste, yolJsonLd([{ ad: "Referanslar", yol: "/referanslar" }])]} />
      <SayfaUst baslik="Referanslar" metin="Hayata geçirdiğimiz web siteleri ve yazılımlar. Her birinin arkasında, işini büyütmek isteyen bir işletme var." yol={[{ ad: "Referanslar", yol: "/referanslar" }]} />
      <section className="bolum">
        <div className="kap">
          {yayinda.length ? <div className="izgara izgara-3">{yayinda.map((r) => <ReferansKart key={r.id} r={r} baslikSeviye={2} />)}</div> : <div className="bos-kutu">Referanslarımız çok yakında burada.</div>}
          {devam.length > 0 && (
            <>
              <h2 style={{ marginTop: 64 }}>Yeni projeler</h2>
              <p style={{ color: "var(--soluk)", marginBottom: 24 }}>Şu anda üzerinde çalıştığımız işler.</p>
              <div className="izgara izgara-3">{devam.map((r) => <ReferansKart key={r.id} r={r} />)}</div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
