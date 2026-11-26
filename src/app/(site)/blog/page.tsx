import { yazilar } from "@/lib/veri";
import { sayfaMeta, yolJsonLd } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { SayfaUst, YaziKart } from "@/components/bolumler";

export const revalidate = 300;

export const metadata = sayfaMeta({
  baslik: "Blog | Otelciler ve İşletmeler için Rehberler",
  aciklama: "Otel ve pansiyon işletmeciliği, KBS, rezervasyon yönetimi, web sitesi ve dijital pazarlama üzerine rehber yazılar.",
  yol: "/blog",
});

export default async function Blog() {
  const l = await yazilar();
  return (
    <>
      <JsonLd veri={yolJsonLd([{ ad: "Blog", yol: "/blog" }])} />
      <SayfaUst baslik="Blog" metin="Otelciler ve işletme sahipleri için kısa, işe yarar rehberler." yol={[{ ad: "Blog", yol: "/blog" }]} />
      <section className="bolum">
        <div className="kap">
          {l.length ? <div className="izgara izgara-3">{l.map((y) => <YaziKart key={y.id} y={y} />)}</div> : <div className="bos-kutu">Yakında yeni yazılar burada.</div>}
        </div>
      </section>
    </>
  );
}
