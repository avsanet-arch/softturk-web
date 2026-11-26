// Türkçe başlıktan adres (URL) parçası üretir: "Çeşme Otel Sitesi" → "cesme-otel-sitesi"
export function slugYap(metin: string) {
  const tr: Record<string, string> = { ç: "c", ğ: "g", ı: "i", İ: "i", ö: "o", ş: "s", ü: "u", Ç: "c", Ğ: "g", Ö: "o", Ş: "s", Ü: "u" };
  return metin
    .replace(/[çğıİöşüÇĞÖŞÜ]/g, (h) => tr[h] ?? h)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "kayit";
}
