import Link from "next/link";
import { referanslar, talepler, yazilar, ayarlariGetir } from "@/lib/veri";

const TUR: Record<string, string> = { demo: "Demo", reklam: "Demo (reklam)", web: "Web teklifi", iletisim: "İletişim" };

export default async function Ozet() {
  const [t, r, y, a] = await Promise.all([talepler(), referanslar(true), yazilar(true), ayarlariGetir()]);
  const otuzGun = Date.now() - 30 * 864e5;
  const son30 = t.filter((x) => Date.parse(x.tarih) > otuzGun);
  const eksik = [
    !a.telefon && "telefon",
    !a.whatsapp && "WhatsApp",
    !a.eposta && "e-posta",
    !a.gaOlcumKimligi && "Google Analytics",
    !a.adsKimligi && "Google Ads",
    !a.searchConsoleKodu && "Search Console",
  ].filter(Boolean);
  return (
    <>
      <div className="yon-baslik"><h1>Özet</h1></div>
      {eksik.length > 0 && (
        <p className="uyari" style={{ marginBottom: 20 }}>
          Henüz girilmemiş: {eksik.join(", ")}. <Link href="/yonetim/ayarlar">Ayarlar</Link>'dan ekleyin.
        </p>
      )}
      <div className="ozet-kartlar">
        <div className="kart"><b>{t.filter((x) => !x.okundu).length}</b>Okunmamış talep</div>
        <div className="kart"><b>{son30.length}</b>Son 30 gün talep</div>
        <div className="kart"><b>{r.length}</b>Referans / proje</div>
        <div className="kart"><b>{y.length}</b>Blog yazısı</div>
      </div>
      <h2 style={{ fontSize: "1.2rem" }}>Son talepler</h2>
      {t.length === 0 ? (
        <div className="bos-kutu">Henüz talep yok. Sitedeki formlardan gelenler burada görünür.</div>
      ) : (
        <table className="tablo">
          <thead><tr><th>Tarih</th><th>Tür</th><th>Ad</th><th>Telefon</th><th>İşletme</th></tr></thead>
          <tbody>
            {t.slice(0, 8).map((x) => (
              <tr key={x.id} className={x.okundu ? "" : "yeni"}>
                <td>{new Date(x.tarih).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul", dateStyle: "short", timeStyle: "short" })}</td>
                <td>{TUR[x.tur]}</td>
                <td>{x.ad}</td>
                <td><a href={`tel:${x.telefon}`}>{x.telefon}</a></td>
                <td>{x.isletme}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p style={{ marginTop: 16 }}><Link href="/yonetim/talepler">Tüm talepler</Link></p>
    </>
  );
}
