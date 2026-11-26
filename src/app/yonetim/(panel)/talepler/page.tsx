import { talepler } from "@/lib/veri";
import { talepEylemi } from "../../eylemler";

const TUR: Record<string, string> = { demo: "Demo", reklam: "Demo (reklam)", web: "Web teklifi", iletisim: "İletişim" };

export default async function Talepler() {
  const l = await talepler();
  return (
    <>
      <div className="yon-baslik"><h1>Talepler</h1></div>
      {l.length === 0 ? (
        <div className="bos-kutu">Henüz talep yok.</div>
      ) : (
        <table className="tablo">
          <thead><tr><th>Tarih</th><th>Kişi</th><th>İşletme</th><th>Mesaj</th><th>Kaynak</th><th></th></tr></thead>
          <tbody>
            {l.map((x) => (
              <tr key={x.id} className={x.okundu ? "" : "yeni"}>
                <td style={{ whiteSpace: "nowrap" }}>
                  {new Date(x.tarih).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul", dateStyle: "short", timeStyle: "short" })}
                  <br /><small>{TUR[x.tur]}</small>
                </td>
                <td>
                  <b>{x.ad}</b><br />
                  <a href={`tel:${x.telefon}`}>{x.telefon}</a>
                  {x.eposta && <><br /><a href={`mailto:${x.eposta}`}>{x.eposta}</a></>}
                </td>
                <td>{x.isletme}{x.odaSayisi && <><br /><small>{x.odaSayisi} oda</small></>}</td>
                <td style={{ maxWidth: 320, whiteSpace: "pre-wrap" }}>{x.mesaj}</td>
                <td><small>{x.sayfa}{x.kaynak && <><br />{x.kaynak}</>}</small></td>
                <td>
                  <form action={talepEylemi} style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <input type="hidden" name="id" value={x.id} />
                    <button className="btn btn-ince" name="islem" value={x.okundu ? "yeni" : "okundu"}>{x.okundu ? "Okunmadı yap" : "Okundu"}</button>
                    <button className="btn btn-sil" name="islem" value="sil">Sil</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
