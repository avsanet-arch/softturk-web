// Fiyat metinlerinden ("1.250 ₺", "20 €") sayı çıkarma ve indirim hesapları. Saf fonksiyonlar, testli.

/** "1.250,50 ₺" → 1250.5 ; sayı yoksa null */
export function sayiOku(metin?: string): number | null {
  if (!metin) return null;
  const m = metin.replace(/\s/g, "").match(/\d[\d.,]*/);
  if (!m) return null;
  let s = m[0];
  // Türkçe yazım: nokta binlik, virgül ondalık
  if (/,\d{1,2}$/.test(s)) s = s.replace(/\./g, "").replace(",", ".");
  else s = s.replace(/[.,]/g, "");
  const n = Number(s);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Eski ve yeni fiyata göre indirim yüzdesi (yuvarlanmış); anlamsızsa null */
export function indirimYuzdesi(eski?: string, yeni?: string): number | null {
  const e = sayiOku(eski), y = sayiOku(yeni);
  if (!e || !y || y >= e) return null;
  const yuzde = Math.round((1 - y / e) * 100);
  return yuzde >= 1 ? yuzde : null;
}

/** Yıllık ödemede kaç ay bedava (12 - yıllık/aylık), en az 1 ay ise */
export function bedavaAy(aylik?: string, yillik?: string): number | null {
  const a = sayiOku(aylik), y = sayiOku(yillik);
  if (!a || !y) return null;
  const ay = Math.round(12 - y / a);
  return ay >= 1 && ay < 12 ? ay : null;
}

/** Para birimini metinden al (₺, €, $, TL); yoksa ₺ */
export function paraBirimi(metin?: string) {
  const m = metin?.match(/₺|€|\$|TL/i);
  return m ? (m[0].toUpperCase() === "TL" ? "₺" : m[0]) : "₺";
}

/** 12345 → "12.345" */
export const sayiYaz = (n: number) => Math.round(n).toLocaleString("tr-TR");

export const ISO_PARA: Record<string, string> = { "₺": "TRY", "€": "EUR", $: "USD" };
