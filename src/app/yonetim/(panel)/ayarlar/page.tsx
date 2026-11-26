import { ayarlariGetir } from "@/lib/veri";
import { ayarKaydetEylemi } from "../../eylemler";
import { EylemFormu } from "@/components/yonetim-istemci";

const SIMGELER: [string, string][] = [
  ["sihir", "Yapay zekâ"], ["kimlik", "Kimlik"], ["kasa", "Kasa / POS"], ["qr", "QR"], ["kutu", "Depo"], ["wifi", "Wi‑Fi"],
  ["posta", "E-posta"], ["mesaj", "Mesaj"], ["takvim", "Takvim"], ["grafik", "Grafik"], ["kalkan", "Kalkan"], ["dunya", "Dünya"],
  ["bina", "Bina"], ["fatura", "Fatura"], ["zil", "Zil"], ["yildiz", "Yıldız"],
];

export default async function Ayarlar() {
  const a = await ayarlariGetir();
  const bosluk = <T,>(l: T[], n: number): (T | null)[] => [...l, ...Array(Math.max(0, n - l.length)).fill(null)].slice(0, n);
  const paketler = bosluk(a.paketler, 6);
  const moduller = bosluk(a.ekModuller, Math.max(10, a.ekModuller.length + 2));
  const kullananlar = bosluk(a.kullananlar, Math.max(6, a.kullananlar.length + 3));
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
          <p className="ipucu">Fiyat boş bırakılırsa “Size özel fiyat / Teklif alın” yazar. Örnek: “900 ₺” veya “20 €”. Eski fiyat doluysa ve kampanya açıksa üstü çizili görünür, indirim yüzdesi kendiliğinden hesaplanır.</p>
          {paketler.map((p, i) => (
            <div key={i} className="satir" style={{ gridTemplateColumns: "1.1fr 1fr .9fr .9fr .9fr .9fr auto", alignItems: "end" }}>
              <label>Paket adı<input className="girdi" name={`paket${i}_ad`} defaultValue={p?.ad} /></label>
              <label>Oda aralığı<input className="girdi" name={`paket${i}_odalar`} defaultValue={p?.odalar} /></label>
              <label>Aylık fiyat<input className="girdi" name={`paket${i}_aylik`} defaultValue={p?.aylik} /></label>
              <label>Eski aylık<input className="girdi" name={`paket${i}_eskiAylik`} defaultValue={p?.eskiAylik} /></label>
              <label>Yıllık fiyat<input className="girdi" name={`paket${i}_yillik`} defaultValue={p?.yillik} /></label>
              <label>Eski yıllık<input className="girdi" name={`paket${i}_eskiYillik`} defaultValue={p?.eskiYillik} /></label>
              <label className="kutu-satir"><input type="checkbox" name={`paket${i}_one`} defaultChecked={p?.one_cikan} /> Öne çıkar</label>
            </div>
          ))}
          <div className="satir">{A("fiyatKdv", "Fiyatların yanındaki not", "ör. KDV hariç / KDV dahil")}{A("denemeGun", "Ücretsiz deneme (gün)", "Boşsa yazılmaz")}</div>
          <label>Paketlerin altındaki not<input className="girdi" name="fiyatNotu" defaultValue={a.fiyatNotu} /></label>
          {A("programAdresi", "Otel programının adresi", "Giriş bağlantısı için")}
        </fieldset>
        <fieldset>
          <legend>Kampanya</legend>
          <label className="kutu-satir"><input type="checkbox" name="kampanyaAcik" defaultChecked={a.kampanyaAcik} /> Kampanya açık (eski fiyatlar üstü çizili, fiyatlar sayfasında kampanya bandı)</label>
          <div className="satir">{A("kampanyaBaslik", "Kampanya adı", "", "Lansman kampanyası")}<label>Bitiş tarihi <small>Geri sayım için, boşsa sayım yok</small><input className="girdi" type="date" name="kampanyaBitis" defaultValue={a.kampanyaBitis} /></label></div>
          {A("kampanyaMetni", "Kampanya metni")}
        </fieldset>
        <fieldset>
          <legend>Ek modüller (fiyatlar sayfası)</legend>
          <p className="ipucu">Adı boş satırlar silinir. Fiyat boşsa “Fiyat sorunuz” yazar.</p>
          {moduller.map((m, i) => (
            <div key={i} className="satir" style={{ gridTemplateColumns: "1fr 2fr .8fr .7fr", alignItems: "end" }}>
              <label>Modül adı<input className="girdi" name={`modul${i}_ad`} defaultValue={m?.ad} /></label>
              <label>Açıklama<input className="girdi" name={`modul${i}_aciklama`} defaultValue={m?.aciklama} /></label>
              <label>Fiyat<input className="girdi" name={`modul${i}_fiyat`} defaultValue={m?.fiyat} placeholder="250 ₺ / ay" /></label>
              <label>Simge
                <select className="girdi" name={`modul${i}_ikon`} defaultValue={m?.ikon || "yildiz"}>
                  {SIMGELER.map(([d, ad]) => <option key={d} value={d}>{ad}</option>)}
                </select>
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset>
          <legend>Programı kullanan işletmeler</legend>
          <p className="ipucu">Fiyatlar ve Otel Programı sayfalarında görünür. Adı boş satırlar silinir. Yorumu yalnızca işletme izin verdiyse yazın.</p>
          {kullananlar.map((k, i) => (
            <div key={i} className="kullanan-satir">
              <div className="satir" style={{ gridTemplateColumns: "1.2fr .8fr 1.6fr .7fr .9fr", alignItems: "end" }}>
                <label>İşletme adı<input className="girdi" name={`kul${i}_ad`} defaultValue={k?.ad} /></label>
                <label>Türü<input className="girdi" name={`kul${i}_tur`} defaultValue={k?.tur} placeholder="Otel, motel, pansiyon" /></label>
                <label>Yer<input className="girdi" name={`kul${i}_yer`} defaultValue={k?.yer} placeholder="Avşa Adası, Marmara / Balıkesir" /></label>
                <label>Oda<input className="girdi" name={`kul${i}_oda`} defaultValue={k?.oda} placeholder="30 oda" /></label>
                <label>Başlangıç<input className="girdi" name={`kul${i}_baslangic`} defaultValue={k?.baslangic} placeholder="Kasım 2026" /></label>
              </div>
              <div className="satir" style={{ gridTemplateColumns: "1fr 2fr 1fr", alignItems: "end" }}>
                <label>Web sitesi<input className="girdi" name={`kul${i}_url`} defaultValue={k?.url} placeholder="https://" /></label>
                <label>Yorum<input className="girdi" name={`kul${i}_yorum`} defaultValue={k?.yorum} /></label>
                <label>Yorumu yapan<input className="girdi" name={`kul${i}_kisi`} defaultValue={k?.kisi} placeholder="Ad Soyad, işletme sahibi" /></label>
              </div>
            </div>
          ))}
        </fieldset>
      </EylemFormu>
    </>
  );
}
