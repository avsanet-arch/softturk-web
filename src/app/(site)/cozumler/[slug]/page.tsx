import Link from "next/link";
import { notFound } from "next/navigation";
import { ayarlariGetir } from "@/lib/veri";
import { COZUMLER } from "@/lib/urun";
import { sayfaMeta, yolJsonLd } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { CagriBandi, DigerOzellikler, SayfaUst } from "@/components/bolumler";
import { Ikon } from "@/components/ikon";

export const revalidate = 300;
export const generateStaticParams = () => COZUMLER.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = COZUMLER.find((x) => x.slug === slug);
  if (!c) return {};
  return sayfaMeta({ baslik: `${c.baslik} | Web Tabanlı, Otomatik KBS`, aciklama: c.aciklama, yol: `/cozumler/${c.slug}`, resim: c.resim });
}

export default async function CozumSayfasi({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = COZUMLER.find((x) => x.slug === slug);
  if (!c) notFound();
  const a = await ayarlariGetir();
  return (
    <>
      <JsonLd veri={yolJsonLd([{ ad: "Otel Programı", yol: "/otel-programi" }, { ad: c.baslik, yol: `/cozumler/${c.slug}` }])} />
      <SayfaUst baslik={c.h1} metin={c.giris} yol={[{ ad: "Otel Programı", yol: "/otel-programi" }, { ad: c.baslik, yol: `/cozumler/${c.slug}` }]} />
      <section className="bolum bolum-beyaz">
        <div className="kap izgara izgara-2" style={{ alignItems: "center", gap: 48 }}>
          <div className="izgara" style={{ gap: 18 }}>
            {c.maddeler.map((m) => (
              <div key={m.b} className="mini">
                <div className="ikon-kutu"><Ikon ad="tik" boyut={20} /></div>
                <div><h2 style={{ fontSize: "1.15rem", marginBottom: 4 }}>{m.b}</h2><p>{m.m}</p></div>
              </div>
            ))}
            <div><Link href="/demo" className="btn btn-ana btn-buyuk">Ücretsiz demo iste</Link></div>
          </div>
          <div className="ozellik-resim"><img src={c.resim} alt={`${c.baslik} ekranı`} width={1400} height={875} /></div>
        </div>
      </section>
      <section className="bolum">
        <div className="kap">
          <div className="ust-baslik"><h2>Programdaki diğer özellikler</h2><p><Link href="/otel-programi">Tüm özellikleri ve paketleri görün</Link></p></div>
          <DigerOzellikler />
        </div>
      </section>
      <CagriBandi a={a} />
    </>
  );
}
