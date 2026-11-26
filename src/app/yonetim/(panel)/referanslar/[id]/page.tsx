import Link from "next/link";
import { notFound } from "next/navigation";
import { referansId } from "@/lib/veri";
import { referansKaydetEylemi, referansSilEylemi } from "../../../eylemler";
import { EylemFormu, ResimSec } from "@/components/yonetim-istemci";

export default async function ReferansDuzenle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = id === "yeni" ? null : await referansId(id);
  if (id !== "yeni" && !r) notFound();
  return (
    <>
      <div className="yon-baslik">
        <h1>{r ? "Referansı düzenle" : "Yeni referans / proje"}</h1>
        <Link href="/yonetim/referanslar" className="btn btn-ince">Listeye dön</Link>
      </div>
      <EylemFormu eylem={referansKaydetEylemi}>
        <input type="hidden" name="id" value={r?.id ?? ""} />
        <fieldset>
          <legend>Temel bilgiler</legend>
          <label>Başlık * <small>Örn. “Avşa Deniz Otel web sitesi”</small><input className="girdi" name="baslik" defaultValue={r?.baslik} required maxLength={120} /></label>
          <div className="satir">
            <label>Müşteri<input className="girdi" name="musteri" defaultValue={r?.musteri} /></label>
            <label>Sektör<input className="girdi" name="sektor" defaultValue={r?.sektor} placeholder="Konaklama, restoran, inşaat…" /></label>
          </div>
          <div className="satir">
            <label>Site adresi<input className="girdi" name="url" defaultValue={r?.url} placeholder="https://" /></label>
            <label>Yıl<input className="girdi" name="yil" defaultValue={r?.yil ?? String(new Date().getFullYear())} /></label>
          </div>
          <label>Kısa özet <small>Kartta ve Google açıklamasında görünür (en fazla 300 karakter)</small><textarea className="girdi" name="ozet" defaultValue={r?.ozet} maxLength={300} style={{ minHeight: 70 }} /></label>
        </fieldset>
        <fieldset>
          <legend>Resim</legend>
          <ResimSec mevcut={r?.resim ?? ""} />
        </fieldset>
        <fieldset>
          <legend>Ayrıntılı açıklama</legend>
          <label>
            Metin
            <small>Boş satır = yeni paragraf · “## Başlık” · “- madde” · **kalın** · [bağlantı](https://adres)</small>
            <textarea className="girdi" name="aciklama" defaultValue={r?.aciklama} style={{ minHeight: 260 }} />
          </label>
          <label>Etiketler <small>Virgülle ayırın: WordPress, SEO, Otel sitesi</small><input className="girdi" name="etiketler" defaultValue={r?.etiketler.join(", ")} /></label>
        </fieldset>
        <fieldset>
          <legend>Yayın</legend>
          <div className="satir">
            <label>Durum
              <select className="girdi" name="durum" defaultValue={r?.durum ?? "yayinda"}>
                <option value="yayinda">Tamamlandı</option>
                <option value="devam">Yeni proje / yapım aşamasında</option>
              </select>
            </label>
            <label>Sıra <small>Küçük sayı önce gösterilir</small><input className="girdi" name="sira" type="number" defaultValue={r?.sira ?? 10} /></label>
          </div>
          <label>Adres (URL) <small>Boş bırakırsanız başlıktan oluşur</small><input className="girdi" name="slug" defaultValue={r?.slug} /></label>
          <label className="kutu-satir"><input type="checkbox" name="yayinda" defaultChecked={r?.yayinda ?? true} /> Sitede yayında</label>
          <label className="kutu-satir"><input type="checkbox" name="oneCikan" defaultChecked={r?.oneCikan ?? false} /> Ana sayfada öne çıkar</label>
        </fieldset>
      </EylemFormu>
      {r && (
        <form action={referansSilEylemi} style={{ marginTop: 24 }}>
          <input type="hidden" name="id" value={r.id} />
          <button className="btn btn-sil">Bu referansı sil</button>
        </form>
      )}
    </>
  );
}
