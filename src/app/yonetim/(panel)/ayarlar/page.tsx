import { ayarlariGetir } from "@/lib/veri";
import { ayarKaydetEylemi } from "../../eylemler";
import { EylemFormu } from "@/components/yonetim-istemci";

export default async function Ayarlar() {
  const a = await ayarlariGetir();
  const paketler = [...a.paketler, ...Array(Math.max(0, 6 - a.paketler.length)).fill(null)].slice(0, 6);
  const A = (ad: keyof typeof a, etiket: string, ipucu?: string, yer?: string) => (
    <label>{etiket} {ipucu && <small>{ipucu}</small>}<input className="girdi" name={ad} defaultValue={String(a[ad] ?? "")} placeholder={yer} /></label>
  );
  return (
    <>
      <div className="yon-baslik"><h1>Ayarlar</h1></div>
      <EylemFormu eylem={ayarKaydetEylemi}>
        <fieldset>
          <legend>Firma ve iletişim</legend>
          <div className="satir">{A("firmaAdi", "Firma adı")}{A("slogan", "Slogan")}</div>
          <div className="satir">{A("telefon", "Telefon", "Sitede görünür", "0532 000 00 00")}{A("whatsapp", "WhatsApp numarası", "Ülke koduyla, ör. 905320000000")}</div>
          <div className="satir">{A("eposta", "E-posta")}{A("calismaSaatleri", "Çalışma saatleri")}</div>
          {A("adres", "Adres")}
          <div className="satir">{A("ilce", "İlçe")}{A("il", "İl")}</div>
          <div className="satir">{A("instagram", "Instagram adresi", "", "https://instagram.com/...")}{A("facebook", "Facebook adresi")}</div>
          {A("linkedin", "LinkedIn adresi")}
          {A("bildirimEpostasi", "Yeni talep bildirimi gidecek e-posta", "Sunucuda SMTP ayarı varsa e-posta gelir")}
        </fieldset>
        <fieldset>
          <legend>Google (SEO ve reklam)</legend>
          {A("searchConsoleKodu", "Search Console doğrulama kodu", "HTML etiketi yöntemindeki content değeri ya da etiketin tamamı")}
          <div className="satir">{A("gaOlcumKimligi", "Google Analytics 4 ölçüm kimliği", "", "G-XXXXXXXXXX")}{A("adsKimligi", "Google Ads kimliği", "", "AW-123456789")}</div>
          <div className="satir">
            {A("adsFormEtiketi", "Ads dönüşüm etiketi: form gönderme", "send_to'daki / işaretinden sonraki kısım")}
            {A("adsTelefonEtiketi", "Ads dönüşüm etiketi: telefon / WhatsApp tıklaması")}
          </div>
        </fieldset>
        <fieldset>
          <legend>Otel programı paketleri</legend>
          <p style={{ margin: 0, color: "var(--soluk)", fontSize: ".9rem" }}>Fiyat boş bırakılırsa “Size özel fiyat / Teklif alın” yazar. Örnek: “1.250 ₺” veya “20 €”.</p>
          {paketler.map((p, i) => (
            <div key={i} className="satir" style={{ gridTemplateColumns: "1.2fr 1fr 1fr 1fr auto", alignItems: "end" }}>
              <label>Paket adı<input className="girdi" name={`paket${i}_ad`} defaultValue={p?.ad} /></label>
              <label>Oda aralığı<input className="girdi" name={`paket${i}_odalar`} defaultValue={p?.odalar} /></label>
              <label>Aylık fiyat<input className="girdi" name={`paket${i}_aylik`} defaultValue={p?.aylik} /></label>
              <label>Yıllık fiyat<input className="girdi" name={`paket${i}_yillik`} defaultValue={p?.yillik} /></label>
              <label className="kutu-satir"><input type="checkbox" name={`paket${i}_one`} defaultChecked={p?.one_cikan} /> Öne çıkar</label>
            </div>
          ))}
          <label>Paketlerin altındaki not<input className="girdi" name="fiyatNotu" defaultValue={a.fiyatNotu} /></label>
          {A("programAdresi", "Otel programının adresi", "Giriş bağlantısı için")}
        </fieldset>
      </EylemFormu>
    </>
  );
}
