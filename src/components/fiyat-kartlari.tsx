"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Ikon } from "./ikon";
import type { Paket } from "@/lib/veri";
import { bedavaAy, indirimYuzdesi, paraBirimi, sayiOku, sayiYaz } from "@/lib/fiyat";

const DAHIL = ["Tüm özellikler", "Sınırsız kullanıcı", "Otomatik KBS bildirimi", "Telefon ve bilgisayardan", "Kurulum ve eğitim"];

/** Aylık / yıllık seçmeli paket kartları (kampanyalı, üstü çizili fiyatla) */
export function FiyatKartlari({ paketler, kdv, kampanya }: { paketler: Paket[]; kdv: string; kampanya: boolean }) {
  const yillikVar = paketler.some((p) => p.yillik);
  const [donem, setDonem] = useState<"aylik" | "yillik">("aylik");
  const enCokBedava = Math.max(0, ...paketler.map((p) => bedavaAy(p.aylik, p.yillik) ?? 0));
  return (
    <>
      {yillikVar && (
        <div className="donem-sec" role="radiogroup" aria-label="Ödeme şekli">
          <button type="button" role="radio" aria-checked={donem === "aylik"} className={donem === "aylik" ? "secili" : ""} onClick={() => setDonem("aylik")}>Aylık</button>
          <button type="button" role="radio" aria-checked={donem === "yillik"} className={donem === "yillik" ? "secili" : ""} onClick={() => setDonem("yillik")}>
            Yıllık {enCokBedava > 0 && <span className="donem-rozet">{enCokBedava} ay bedava</span>}
          </button>
        </div>
      )}
      <div className={`izgara izgara-${Math.min(4, Math.max(2, paketler.length))} paketler`}>
        {paketler.map((p) => {
          const yillik = donem === "yillik" && !!p.yillik;
          const fiyat = yillik ? p.yillik : p.aylik;
          const eski = kampanya ? (yillik ? p.eskiYillik : p.eskiAylik) : "";
          const indirim = indirimYuzdesi(eski, fiyat);
          const bedava = bedavaAy(p.aylik, p.yillik);
          const yillikSayi = sayiOku(p.yillik);
          return (
            <div key={p.ad} className={`kart paket${p.one_cikan ? " one" : ""}`}>
              {p.one_cikan && <span className="etiket">En çok tercih edilen</span>}
              <div className="paket-ust">
                <h3>{p.ad}</h3>
                {indirim && <span className="indirim">%{indirim} indirim</span>}
              </div>
              <div className="oda">{p.odalar}</div>
              {fiyat ? (
                <>
                  <div className="eski-fiyat">{indirim ? <s>{eski}</s> : " "}</div>
                  <div className="fiyat">{fiyat} <small>/ {yillik ? "yıl" : "ay"}</small></div>
                  <div className="yillik">
                    {yillik && yillikSayi
                      ? `Aylık ortalama ${sayiYaz(yillikSayi / 12)} ${paraBirimi(p.yillik)}${kdv ? ` · ${kdv}` : ""}`
                      : p.yillik && bedava
                        ? `Yıllık ödemede ${bedava} ay bedava${kdv ? ` · ${kdv}` : ""}`
                        : kdv}
                  </div>
                </>
              ) : (
                <>
                  <div className="eski-fiyat">{" "}</div>
                  <div className="fiyat" style={{ fontSize: "1.35rem" }}>Size özel fiyat</div>
                  <div className="yillik">Oda sayınıza göre teklif</div>
                </>
              )}
              <ul className="maddeler">
                {DAHIL.map((m) => <li key={m}><Ikon ad="tik" boyut={18} /> {m}</li>)}
              </ul>
              <Link href="/demo" className={`btn ${p.one_cikan ? "btn-ana" : "btn-ince"}`}>
                {fiyat ? "Ücretsiz deneyin" : "Teklif alın"}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

/** Kampanya bitişine geri sayım; sunucuda boş, tarayıcıda dolar (hidrasyon farkı olmasın) */
export function Gerisayim({ bitis }: { bitis: string }) {
  const [kalan, setKalan] = useState<number | null>(null);
  useEffect(() => {
    const hedef = new Date(`${bitis}T23:59:59+03:00`).getTime();
    if (!Number.isFinite(hedef)) return;
    const hesapla = () => setKalan(Math.max(0, hedef - Date.now()));
    hesapla();
    const z = setInterval(hesapla, 1000);
    return () => clearInterval(z);
  }, [bitis]);
  if (kalan === null || kalan <= 0) return null;
  const g = Math.floor(kalan / 864e5), s = Math.floor((kalan % 864e5) / 36e5), d = Math.floor((kalan % 36e5) / 6e4), sn = Math.floor((kalan % 6e4) / 1e3);
  return (
    <div className="gerisayim" aria-label={`Kampanyanın bitmesine ${g} gün kaldı`}>
      {[[g, "gün"], [s, "saat"], [d, "dakika"], [sn, "saniye"]].map(([n, e]) => (
        <span key={e as string}><b>{String(n).padStart(2, "0")}</b><small>{e}</small></span>
      ))}
    </div>
  );
}
