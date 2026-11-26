import type { MetadataRoute } from "next";
import { referanslar, yazilar } from "@/lib/veri";
import { COZUMLER } from "@/lib/urun";
import { tam } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [r, y] = await Promise.all([referanslar(), yazilar()]);
  const sabit: [string, number][] = [
    ["/", 1], ["/otel-programi", 0.9], ["/fiyatlar", 0.9], ["/demo", 0.8], ["/web-tasarim", 0.8], ["/referanslar", 0.7], ["/blog", 0.6], ["/iletisim", 0.6], ["/kvkk", 0.2], ["/cerez-politikasi", 0.2],
  ];
  return [
    ...sabit.map(([yol, priority]) => ({ url: tam(yol), priority })),
    ...COZUMLER.map((c) => ({ url: tam(`/cozumler/${c.slug}`), priority: 0.8 })),
    ...r.map((x) => ({ url: tam(`/referanslar/${x.slug}`), lastModified: x.olusturma, priority: 0.5, ...(x.resim ? { images: [tam(x.resim)] } : {}) })),
    ...y.map((x) => ({ url: tam(`/blog/${x.slug}`), lastModified: x.guncelleme, priority: 0.6, ...(x.resim ? { images: [tam(x.resim)] } : {}) })),
  ];
}
