import Link from "next/link";
import { yazilar } from "@/lib/veri";
import { tarihYaz } from "@/lib/site";

export default async function YaziListesi({ searchParams }: { searchParams: Promise<{ kaydedildi?: string }> }) {
  const [l, { kaydedildi }] = await Promise.all([yazilar(true), searchParams]);
  return (
    <>
      <div className="yon-baslik">
        <h1>Blog yazıları</h1>
        <Link href="/yonetim/yazilar/yeni" className="btn btn-ana">+ Yeni yazı</Link>
      </div>
      {kaydedildi && <p className="basari" style={{ marginBottom: 16 }}>Kaydedildi. <a href={`/blog/${kaydedildi}`} target="_blank" rel="noopener">Sitede görün</a></p>}
      {l.length === 0 ? <div className="bos-kutu">Henüz yazı yok.</div> : (
        <table className="tablo">
          <thead><tr><th></th><th>Başlık</th><th>Tarih</th><th>Durum</th></tr></thead>
          <tbody>
            {l.map((y) => (
              <tr key={y.id}>
                <td>{y.resim ? <img className="kucuk-resim" src={y.resim} alt="" /> : null}</td>
                <td><Link href={`/yonetim/yazilar/${y.id}`}><b>{y.baslik}</b></Link></td>
                <td>{tarihYaz(y.tarih)}</td>
                <td>{y.yayinda ? "Yayında" : "Taslak"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
