import Link from "next/link";
import { notFound } from "next/navigation";
import { yaziId } from "@/lib/veri";
import { yaziKaydetEylemi, yaziSilEylemi } from "../../../eylemler";
import { EylemFormu, ResimSec } from "@/components/yonetim-istemci";

export default async function YaziDuzenle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const y = id === "yeni" ? null : await yaziId(id);
  if (id !== "yeni" && !y) notFound();
  const tarih = (y ? new Date(y.tarih) : new Date()).toLocaleDateString("sv-SE", { timeZone: "Europe/Istanbul" });
  return (
    <>
      <div className="yon-baslik">
        <h1>{y ? "Yazıyı düzenle" : "Yeni yazı"}</h1>
        <Link href="/yonetim/yazilar" className="btn btn-ince">Listeye dön</Link>
      </div>
      <EylemFormu eylem={yaziKaydetEylemi}>
        <input type="hidden" name="id" value={y?.id ?? ""} />
        <fieldset>
          <legend>Yazı</legend>
          <label>Başlık * <small>Google'da aranan ifadeyi içersin, ör. “Pansiyon programı nasıl seçilir?”</small><input className="girdi" name="baslik" defaultValue={y?.baslik} required maxLength={160} /></label>
          <label>Özet <small>Google açıklaması olarak da kullanılır (150–160 karakter ideal)</small><textarea className="girdi" name="ozet" defaultValue={y?.ozet} maxLength={300} style={{ minHeight: 70 }} /></label>
          <label>
            İçerik
            <small>Boş satır = yeni paragraf · “## Başlık” · “- madde” · **kalın** · [bağlantı](/otel-programi)</small>
            <textarea className="girdi" name="icerik" defaultValue={y?.icerik} style={{ minHeight: 380 }} />
          </label>
          <label>Etiketler <small>Virgülle ayırın</small><input className="girdi" name="etiketler" defaultValue={y?.etiketler.join(", ")} /></label>
        </fieldset>
        <fieldset>
          <legend>Kapak resmi</legend>
          <ResimSec mevcut={y?.resim ?? ""} />
        </fieldset>
        <fieldset>
          <legend>Yayın</legend>
          <div className="satir">
            <label>Tarih<input className="girdi" type="date" name="tarih" defaultValue={tarih} /></label>
            <label>Adres (URL) <small>Boşsa başlıktan oluşur</small><input className="girdi" name="slug" defaultValue={y?.slug} /></label>
          </div>
          <label className="kutu-satir"><input type="checkbox" name="yayinda" defaultChecked={y?.yayinda ?? true} /> Yayında (işaretsizse taslak)</label>
        </fieldset>
      </EylemFormu>
      {y && (
        <form action={yaziSilEylemi} style={{ marginTop: 24 }}>
          <input type="hidden" name="id" value={y.id} />
          <button className="btn btn-sil">Bu yazıyı sil</button>
        </form>
      )}
    </>
  );
}
