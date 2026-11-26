"use client";
import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

type Sonuc = { hata?: string; tamam?: string } | undefined;

function KaydetDugmesi({ yazi }: { yazi: string }) {
  const { pending } = useFormStatus();
  return <button className="btn btn-ana" disabled={pending}>{pending ? "Kaydediliyor…" : yazi}</button>;
}

/** Kaydetme formu: hata / başarı mesajını gösterir */
export function EylemFormu({ eylem, children, dugme = "Kaydet", ek }: { eylem: (s: Sonuc, f: FormData) => Promise<Sonuc>; children: React.ReactNode; dugme?: string; ek?: React.ReactNode }) {
  const [durum, calistir] = useActionState(eylem, undefined);
  return (
    <form action={calistir} className="yon-form">
      {durum?.hata && <div className="form-hata" role="alert">{durum.hata}</div>}
      {durum?.tamam && <div className="basari" role="status">{durum.tamam}</div>}
      {children}
      <div className="yon-dugmeler">
        <KaydetDugmesi yazi={dugme} />
        {ek}
      </div>
    </form>
  );
}

/** Resim seçimi: tarayıcıda en fazla 1600 px genişliğe küçültülüp WebP'ye çevrilir (site hızlı kalsın) */
export function ResimSec({ mevcut }: { mevcut: string }) {
  const [onizleme, setOnizleme] = useState(mevcut);
  const [sil, setSil] = useState(false);
  const [bilgi, setBilgi] = useState("");
  const girdi = useRef<HTMLInputElement>(null);

  async function secildi(e: React.ChangeEvent<HTMLInputElement>) {
    const d = e.target.files?.[0];
    if (!d) return;
    setSil(false);
    try {
      const bmp = await createImageBitmap(d);
      const oran = Math.min(1, 1600 / bmp.width);
      const c = document.createElement("canvas");
      c.width = Math.round(bmp.width * oran);
      c.height = Math.round(bmp.height * oran);
      c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
      const blob: Blob | null = await new Promise((r) => c.toBlob(r, "image/webp", 0.82));
      if (blob && blob.type === "image/webp") {
        const yeni = new File([blob], d.name.replace(/\.\w+$/, "") + ".webp", { type: "image/webp" });
        const dt = new DataTransfer();
        dt.items.add(yeni);
        e.target.files = dt.files;
        setBilgi(`${c.width}×${c.height}, ${Math.round(yeni.size / 1024)} KB (küçültüldü)`);
        setOnizleme(URL.createObjectURL(yeni));
        return;
      }
    } catch {}
    setBilgi(`${Math.round(d.size / 1024)} KB`);
    setOnizleme(URL.createObjectURL(d));
  }

  return (
    <div className="resim-sec">
      {onizleme && !sil ? <img src={onizleme} alt="" /> : <img alt="" />}
      <div style={{ display: "grid", gap: 8 }}>
        <input type="hidden" name="resim" value={mevcut} />
        <input type="hidden" name="resimSil" value={sil ? "1" : ""} />
        <input ref={girdi} type="file" name="resimDosya" accept="image/png,image/jpeg,image/webp,image/avif" onChange={secildi} />
        {bilgi && <small>{bilgi}</small>}
        {(mevcut || onizleme) && !sil && (
          <button type="button" className="btn btn-ince" onClick={() => { setSil(true); setOnizleme(""); if (girdi.current) girdi.current.value = ""; }}>
            Resmi kaldır
          </button>
        )}
        <small>Öneri: 1600×1000 piksel yatay ekran görüntüsü.</small>
      </div>
    </div>
  );
}

export function GirisFormu({ eylem }: { eylem: (s: Sonuc, f: FormData) => Promise<Sonuc> }) {
  const [durum, calistir] = useActionState(eylem, undefined);
  return (
    <form action={calistir} className="form-kutu">
      <h3>Yönetim paneli</h3>
      <p className="form-aciklama">Softturk web sitesi yönetimi</p>
      {durum?.hata && <div className="form-hata" role="alert">{durum.hata}</div>}
      <div className="alanlar" style={{ gridTemplateColumns: "1fr" }}>
        <label><span>Şifre</span><input name="sifre" type="password" required autoFocus autoComplete="current-password" /></label>
      </div>
      <KaydetDugmesi yazi="Giriş yap" />
    </form>
  );
}
