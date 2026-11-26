"use client";
import { useEffect, useState } from "react";
import { donusumFormu } from "./olcum";

type Tur = "demo" | "iletisim" | "web" | "reklam";

const BASLIKLAR: Record<Tur, string> = {
  demo: "Ücretsiz demo isteyin",
  iletisim: "Bize yazın",
  web: "Web sitesi teklifi alın",
  reklam: "Ücretsiz demo isteyin",
};

export function TalepFormu({ tur, baslik, aciklama, sade }: { tur: Tur; baslik?: string; aciklama?: string; sade?: boolean }) {
  const [durum, setDurum] = useState<"bos" | "gonderiliyor" | "tamam" | "hata">("bos");
  const [hata, setHata] = useState("");
  const [kaynak, setKaynak] = useState("");
  const otel = tur === "demo" || tur === "reklam";

  useEffect(() => {
    // Reklam kaynağı (utm / gclid) talebe eklensin: hangi reklamdan geldiği görülsün
    try {
      const p = new URLSearchParams(location.search);
      const k = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "gclid"].filter((x) => p.get(x)).map((x) => `${x}=${p.get(x)}`).join("&");
      if (k) sessionStorage.setItem("gs_kaynak", k);
      setKaynak(k || sessionStorage.getItem("gs_kaynak") || "");
    } catch {}
  }, []);

  async function gonder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDurum("gonderiliyor");
    setHata("");
    const f = new FormData(e.currentTarget);
    const veri = Object.fromEntries(f.entries());
    try {
      const r = await fetch("/api/talep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...veri, tur, sayfa: location.pathname, kaynak }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.hata || "Gönderilemedi, lütfen tekrar deneyin.");
      setDurum("tamam");
      donusumFormu(tur);
    } catch (err) {
      setHata((err as Error).message);
      setDurum("hata");
    }
  }

  if (durum === "tamam") {
    return (
      <div className={`form-kutu tamam${sade ? " sade" : ""}`} role="status">
        <div className="tamam-isaret">✓</div>
        <h3>Teşekkürler, talebiniz bize ulaştı.</h3>
        <p>En kısa sürede, genellikle aynı gün içinde sizi arayacağız.</p>
      </div>
    );
  }

  return (
    <form className={`form-kutu${sade ? " sade" : ""}`} onSubmit={gonder}>
      {!sade && <h3>{baslik ?? BASLIKLAR[tur]}</h3>}
      {aciklama && <p className="form-aciklama">{aciklama}</p>}
      <div className="alanlar">
        <label>
          <span>Adınız soyadınız *</span>
          <input name="ad" required maxLength={80} autoComplete="name" />
        </label>
        <label>
          <span>Telefon *</span>
          <input name="telefon" required type="tel" maxLength={30} autoComplete="tel" inputMode="tel" placeholder="05xx xxx xx xx" />
        </label>
        <label>
          <span>E-posta</span>
          <input name="eposta" type="email" maxLength={120} autoComplete="email" />
        </label>
        <label>
          <span>{otel ? "Tesis adı" : "Firma adı"}</span>
          <input name="isletme" maxLength={120} autoComplete="organization" />
        </label>
        {otel && (
          <label>
            <span>Oda sayısı</span>
            <select name="odaSayisi" defaultValue="">
              <option value="">Seçin</option>
              <option>1–10</option>
              <option>11–20</option>
              <option>21–30</option>
              <option>31–50</option>
              <option>50+</option>
            </select>
          </label>
        )}
        <label className="genis">
          <span>Mesajınız</span>
          <textarea name="mesaj" rows={3} maxLength={2000} placeholder={otel ? "Şu an hangi programı kullanıyorsunuz, nelere ihtiyacınız var?" : "Kısaca ihtiyacınızı yazın"} />
        </label>
        {/* Botlar için tuzak alan: insanlar görmez */}
        <label className="tuzak" aria-hidden="true">
          <span>Web sitesi</span>
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="kvkk-not">
        Gönder düğmesine basarak bilgilerinizin size dönüş yapmak amacıyla işlenmesini kabul etmiş olursunuz. <a href="/kvkk">KVKK aydınlatma metni</a>
      </p>
      {durum === "hata" && <p className="form-hata" role="alert">{hata}</p>}
      <button className="btn btn-ana btn-buyuk" disabled={durum === "gonderiliyor"}>
        {durum === "gonderiliyor" ? "Gönderiliyor…" : tur === "iletisim" ? "Gönder" : tur === "web" ? "Teklif iste" : "Demo iste"}
      </button>
    </form>
  );
}
