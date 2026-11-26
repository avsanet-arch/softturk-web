"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

/*
 * Google Analytics 4 + Google Ads dönüşüm takibi (Consent Mode v2).
 * Kimlikler Yönetim › Ayarlar'dan girilir; boşsa hiçbir Google betiği yüklenmez.
 * Dönüşümler:
 *   - Form gönderildi  → generate_lead + Ads "form" etiketi
 *   - Telefon / WhatsApp bağlantısına tıklandı → contact + Ads "telefon" etiketi
 */
export type OlcumAyar = { ga: string; ads: string; adsForm: string; adsTel: string };

type Gtag = (...a: unknown[]) => void;
const g = (): Gtag | undefined => (typeof window !== "undefined" ? (window as unknown as { gtag?: Gtag }).gtag : undefined);

let ayar: OlcumAyar | null = null;

export function donusumFormu(tur: string) {
  const gt = g();
  if (!gt || !ayar) return;
  gt("event", "generate_lead", { form_turu: tur });
  if (ayar.ads && ayar.adsForm) gt("event", "conversion", { send_to: `${ayar.ads}/${ayar.adsForm}` });
}

const IZIN_ANAHTARI = "gs_cerez";

function izinOku(): "evet" | "hayir" | null {
  try {
    const v = localStorage.getItem(IZIN_ANAHTARI);
    return v === "evet" || v === "hayir" ? v : null;
  } catch {
    return null;
  }
}

function izinUygula(v: "evet" | "hayir") {
  const d = v === "evet" ? "granted" : "denied";
  g()?.("consent", "update", { ad_storage: d, ad_user_data: d, ad_personalization: d, analytics_storage: d });
}

export function Olcum({ a }: { a: OlcumAyar }) {
  ayar = a;
  const etkin = !!(a.ga || a.ads);
  const [bant, setBant] = useState(false);

  useEffect(() => {
    if (!etkin) return;
    setBant(izinOku() === null);
    const tik = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("a");
      const href = el?.getAttribute("href") || "";
      const tur = href.startsWith("tel:") ? "telefon" : href.includes("wa.me/") ? "whatsapp" : href.startsWith("mailto:") ? "eposta" : "";
      if (!tur) return;
      const gt = g();
      if (!gt) return;
      gt("event", "contact", { yontem: tur });
      if (tur !== "eposta" && a.ads && a.adsTel) gt("event", "conversion", { send_to: `${a.ads}/${a.adsTel}` });
    };
    document.addEventListener("click", tik, true);
    return () => document.removeEventListener("click", tik, true);
  }, [etkin, a.ads, a.adsTel]);

  if (!etkin) return null;
  const ilk = a.ga || a.ads;
  const kurulum = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
var iz=null;try{iz=localStorage.getItem('${IZIN_ANAHTARI}')}catch(e){}
var d=iz==='evet'?'granted':'denied';
gtag('consent','default',{ad_storage:d,ad_user_data:d,ad_personalization:d,analytics_storage:d,wait_for_update:500});
gtag('set','url_passthrough',true);gtag('set','ads_data_redaction',true);
gtag('js',new Date());
${a.ga ? `gtag('config',${JSON.stringify(a.ga)});` : ""}
${a.ads ? `gtag('config',${JSON.stringify(a.ads)});` : ""}`;

  return (
    <>
      <Script id="gtag-kurulum" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: kurulum }} />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ilk)}`} strategy="afterInteractive" />
      {bant && (
        <div className="cerez" role="dialog" aria-label="Çerez tercihi">
          <p>
            Sitemizi geliştirmek ve reklamlarımızın etkisini ölçmek için çerez kullanıyoruz. Ayrıntılar: <a href="/cerez-politikasi">Çerez politikası</a>.
          </p>
          <div className="cerez-dugmeler">
            <button className="btn btn-ince" onClick={() => { try { localStorage.setItem(IZIN_ANAHTARI, "hayir"); } catch {} izinUygula("hayir"); setBant(false); }}>
              Yalnız gerekli
            </button>
            <button className="btn btn-ana" onClick={() => { try { localStorage.setItem(IZIN_ANAHTARI, "evet"); } catch {} izinUygula("evet"); setBant(false); }}>
              Kabul et
            </button>
          </div>
        </div>
      )}
    </>
  );
}
