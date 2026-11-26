import type { Metadata } from "next";
import type { Ayarlar } from "./veri";

/** Sitenin kalıcı adresi (canonical, sitemap, yapısal veri için). Sunucuda SITE_URL ile değiştirilir. */
export const SITE_URL = (process.env.SITE_URL || "https://www.softturk.com").replace(/\/$/, "");
export const MARKA = "Softturk";

export const tam = (yol: string) => (yol.startsWith("http") ? yol : `${SITE_URL}${yol.startsWith("/") ? "" : "/"}${yol}`);

/** Sayfa başlığı, açıklaması, canonical ve sosyal medya kartı tek yerden */
export function sayfaMeta(o: { baslik: string; aciklama: string; yol: string; resim?: string; indeksleme?: boolean; tur?: "website" | "article" }): Metadata {
  const resim = tam(o.resim || "/og.jpg");
  return {
    title: o.baslik,
    description: o.aciklama,
    alternates: { canonical: tam(o.yol) },
    robots: o.indeksleme === false ? { index: false, follow: true } : undefined,
    openGraph: {
      type: o.tur ?? "website",
      locale: "tr_TR",
      siteName: MARKA,
      url: tam(o.yol),
      title: o.baslik,
      description: o.aciklama,
      images: [{ url: resim }],
    },
    twitter: { card: "summary_large_image", title: o.baslik, description: o.aciklama, images: [resim] },
  };
}

export function telefonLink(t: string) {
  const r = t.replace(/[^\d+]/g, "");
  return r ? `tel:${r}` : "";
}

export function whatsappLink(numara: string, mesaj = "Merhaba, Softturk hakkında bilgi almak istiyorum.") {
  const r = numara.replace(/\D/g, "");
  return r ? `https://wa.me/${r}?text=${encodeURIComponent(mesaj)}` : "";
}

/** Firma bilgisi (Google'ın "Organization / LocalBusiness" yapısal verisi) */
export function firmaJsonLd(a: Ayarlar) {
  const sosyal = [a.instagram, a.facebook, a.linkedin].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#firma`,
    name: a.firmaAdi,
    url: SITE_URL,
    logo: tam("/logo.png"),
    description: "Otel ve pansiyonlar için web tabanlı otel yönetim programı, kurumsal web sitesi tasarımı ve dijital çözümler.",
    ...(a.eposta ? { email: a.eposta } : {}),
    ...(a.telefon ? { telephone: a.telefon } : {}),
    ...(a.adres || a.il
      ? { address: { "@type": "PostalAddress", streetAddress: a.adres || undefined, addressLocality: a.ilce || undefined, addressRegion: a.il || undefined, addressCountry: "TR" } }
      : {}),
    ...(sosyal.length ? { sameAs: sosyal } : {}),
  };
}

export function siteJsonLd(a: Ayarlar) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#site`,
    url: SITE_URL,
    name: a.firmaAdi,
    inLanguage: "tr-TR",
    publisher: { "@id": `${SITE_URL}/#firma` },
  };
}

export function yolJsonLd(parcalar: { ad: string; yol: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ ad: "Ana sayfa", yol: "/" }, ...parcalar].map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.ad, item: tam(p.yol) })),
  };
}

export function sssJsonLd(sorular: { s: string; c: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sorular.map((x) => ({ "@type": "Question", name: x.s, acceptedAnswer: { "@type": "Answer", text: x.c } })),
  };
}

export function tarihYaz(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Istanbul" });
}
