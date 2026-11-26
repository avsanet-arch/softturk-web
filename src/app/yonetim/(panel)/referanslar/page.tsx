import Link from "next/link";
import { referanslar } from "@/lib/veri";

export default async function ReferansListesi({ searchParams }: { searchParams: Promise<{ kaydedildi?: string }> }) {
  const [l, { kaydedildi }] = await Promise.all([referanslar(true), searchParams]);
  return (
    <>
      <div className="yon-baslik">
        <h1>Referanslar / projeler</h1>
        <Link href="/yonetim/referanslar/yeni" className="btn btn-ana">+ Yeni ekle</Link>
      </div>
      {kaydedildi && <p className="basari" style={{ marginBottom: 16 }}>Kaydedildi. <a href={`/referanslar/${kaydedildi}`} target="_blank" rel="noopener">Sitede görün</a></p>}
      {l.length === 0 ? (
        <div className="bos-kutu">Henüz referans yok. “Yeni ekle” ile ilk işinizi ekleyin.</div>
      ) : (
        <table className="tablo">
          <thead><tr><th></th><th>Başlık</th><th>Sektör / yıl</th><th>Durum</th><th>Sıra</th></tr></thead>
          <tbody>
            {l.map((r) => (
              <tr key={r.id}>
                <td>{r.resim ? <img className="kucuk-resim" src={r.resim} alt="" /> : null}</td>
                <td><Link href={`/yonetim/referanslar/${r.id}`}><b>{r.baslik}</b></Link><br /><small>{r.url}</small></td>
                <td>{[r.sektor, r.yil].filter(Boolean).join(" · ")}</td>
                <td>
                  {r.yayinda ? "Yayında" : "Gizli"}
                  {r.durum === "devam" && <><br /><small>Yapım aşamasında</small></>}
                  {r.oneCikan && <><br /><small>Öne çıkan</small></>}
                </td>
                <td>{r.sira}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
