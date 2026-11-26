import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { slugYap } from "./slug";
export { slugYap };
import { VARSAYILAN_AYARLAR, ORNEK_REFERANSLAR, ORNEK_YAZILAR } from "./varsayilan";

/*
 * Site içeriği küçük JSON dosyalarında tutulur (veritabanı kurmaya gerek yok).
 * Klasör: VERI_KLASORU ortam değişkeni, yoksa uygulama klasöründeki "veri".
 * Güncellemede derleme klasörü değişir ama veri klasörü yerinde kalır.
 */
export const VERI_KLASORU = process.env.VERI_KLASORU || path.join(process.cwd(), "veri");
export const YUKLEME_KLASORU = path.join(VERI_KLASORU, "yuklenenler");

export type Paket = { ad: string; odalar: string; aylik: string; yillik: string; one_cikan?: boolean };

export type Ayarlar = {
  firmaAdi: string;
  slogan: string;
  telefon: string;
  whatsapp: string; // yalnız rakam, ülke koduyla: 905xxxxxxxxx
  eposta: string;
  adres: string;
  il: string;
  ilce: string;
  calismaSaatleri: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  // Google
  gaOlcumKimligi: string; // G-XXXXXXX
  adsKimligi: string; // AW-XXXXXXX
  adsFormEtiketi: string; // dönüşüm etiketi (form gönderme)
  adsTelefonEtiketi: string; // dönüşüm etiketi (telefon / WhatsApp tıklaması)
  searchConsoleKodu: string; // google-site-verification içeriği
  // Otel programı
  programAdresi: string; // https://otel.avsa.com
  paketler: Paket[];
  fiyatNotu: string;
  bildirimEpostasi: string; // yeni talep gelince haber verilecek adres
};

export type Referans = {
  id: string;
  slug: string;
  baslik: string;
  musteri: string;
  sektor: string;
  url: string;
  ozet: string;
  aciklama: string; // basit metin; ## başlık, - liste, **kalın**, [bağlantı](adres)
  resim: string; // /dosya/xxx.webp veya /ekran/xxx.webp
  etiketler: string[];
  yil: string;
  durum: "yayinda" | "devam"; // devam = yeni / yapım aşamasında proje
  oneCikan: boolean;
  yayinda: boolean;
  sira: number;
  olusturma: string;
};

export type Yazi = {
  id: string;
  slug: string;
  baslik: string;
  ozet: string;
  icerik: string;
  resim: string;
  etiketler: string[];
  yayinda: boolean;
  tarih: string; // ISO
  guncelleme: string;
};

export type Talep = {
  id: string;
  tur: "demo" | "iletisim" | "web" | "reklam";
  ad: string;
  telefon: string;
  eposta: string;
  isletme: string;
  odaSayisi: string;
  mesaj: string;
  sayfa: string;
  kaynak: string; // utm_source / gclid bilgisi
  tarih: string;
  okundu: boolean;
};

type Dosyalar = {
  ayarlar: Ayarlar;
  referanslar: Referans[];
  yazilar: Yazi[];
  talepler: Talep[];
};

const varsayilan: { [K in keyof Dosyalar]: () => Dosyalar[K] } = {
  ayarlar: () => structuredClone(VARSAYILAN_AYARLAR),
  referanslar: () => structuredClone(ORNEK_REFERANSLAR),
  yazilar: () => structuredClone(ORNEK_YAZILAR),
  talepler: () => [],
};

// Aynı dosyaya aynı anda iki yazma olmasın diye basit sıra
const kuyruk = new Map<string, Promise<unknown>>();

async function oku<K extends keyof Dosyalar>(ad: K): Promise<Dosyalar[K]> {
  try {
    const metin = await fs.readFile(path.join(VERI_KLASORU, `${ad}.json`), "utf8");
    const deger = JSON.parse(metin);
    if (ad === "ayarlar") return { ...VARSAYILAN_AYARLAR, ...deger } as Dosyalar[K];
    return deger;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return varsayilan[ad]();
    throw e;
  }
}

async function yaz<K extends keyof Dosyalar>(ad: K, deger: Dosyalar[K]) {
  await fs.mkdir(VERI_KLASORU, { recursive: true });
  const hedef = path.join(VERI_KLASORU, `${ad}.json`);
  const gecici = `${hedef}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(gecici, JSON.stringify(deger, null, 2), "utf8");
  await fs.rename(gecici, hedef); // yarım yazılmış dosya kalmasın
}

/** Oku → değiştir → yaz (sıralı) */
async function degistir<K extends keyof Dosyalar, R>(ad: K, fn: (d: Dosyalar[K]) => R | Promise<R>): Promise<R> {
  const onceki = kuyruk.get(ad) ?? Promise.resolve();
  let sonuc!: R;
  const is = onceki.catch(() => {}).then(async () => {
    const d = await oku(ad);
    sonuc = await fn(d);
    await yaz(ad, d);
  });
  kuyruk.set(ad, is);
  await is;
  return sonuc;
}

export const yeniId = () => crypto.randomBytes(8).toString("hex");

function benzersizSlug(slug: string, mevcut: { slug: string; id: string }[], id: string) {
  let s = slug, i = 2;
  while (mevcut.some((x) => x.slug === s && x.id !== id)) s = `${slug}-${i++}`;
  return s;
}

// ---- Ayarlar
export const ayarlariGetir = () => oku("ayarlar");
export const ayarlariKaydet = (yeni: Partial<Ayarlar>) => degistir("ayarlar", (d) => { Object.assign(d, yeni); });

// ---- Referanslar
export async function referanslar(tumu = false) {
  const l = await oku("referanslar");
  return l.filter((r) => tumu || r.yayinda).sort((a, b) => a.sira - b.sira || b.olusturma.localeCompare(a.olusturma));
}
export async function referans(slug: string) {
  return (await oku("referanslar")).find((r) => r.slug === slug && r.yayinda) ?? null;
}
export async function referansId(id: string) {
  return (await oku("referanslar")).find((r) => r.id === id) ?? null;
}
export function referansKaydet(r: Omit<Referans, "id" | "olusturma" | "slug"> & { id?: string; slug?: string }) {
  return degistir("referanslar", (l) => {
    const id = r.id || yeniId();
    const slug = benzersizSlug(slugYap(r.slug || r.baslik), l, id);
    const i = l.findIndex((x) => x.id === id);
    const kayit: Referans = { ...r, id, slug, olusturma: i >= 0 ? l[i].olusturma : new Date().toISOString() } as Referans;
    if (i >= 0) l[i] = kayit; else l.push(kayit);
    return kayit;
  });
}
export const referansSil = (id: string) => degistir("referanslar", (l) => { const i = l.findIndex((x) => x.id === id); if (i >= 0) l.splice(i, 1); });

// ---- Yazılar
export async function yazilar(tumu = false) {
  const l = await oku("yazilar");
  return l.filter((y) => tumu || y.yayinda).sort((a, b) => b.tarih.localeCompare(a.tarih));
}
export async function yazi(slug: string) {
  return (await oku("yazilar")).find((y) => y.slug === slug && y.yayinda) ?? null;
}
export async function yaziId(id: string) {
  return (await oku("yazilar")).find((y) => y.id === id) ?? null;
}
export function yaziKaydet(y: Omit<Yazi, "id" | "guncelleme" | "slug"> & { id?: string; slug?: string }) {
  return degistir("yazilar", (l) => {
    const id = y.id || yeniId();
    const slug = benzersizSlug(slugYap(y.slug || y.baslik), l, id);
    const kayit: Yazi = { ...y, id, slug, guncelleme: new Date().toISOString() } as Yazi;
    const i = l.findIndex((x) => x.id === id);
    if (i >= 0) l[i] = kayit; else l.push(kayit);
    return kayit;
  });
}
export const yaziSil = (id: string) => degistir("yazilar", (l) => { const i = l.findIndex((x) => x.id === id); if (i >= 0) l.splice(i, 1); });

// ---- Talepler (form başvuruları)
export const talepler = async () => (await oku("talepler")).sort((a, b) => b.tarih.localeCompare(a.tarih));
export const talepEkle = (t: Omit<Talep, "id" | "tarih" | "okundu">) =>
  degistir("talepler", (l) => {
    const kayit: Talep = { ...t, id: yeniId(), tarih: new Date().toISOString(), okundu: false };
    l.push(kayit);
    if (l.length > 5000) l.splice(0, l.length - 5000);
    return kayit;
  });
export const talepIsaretle = (id: string, okundu: boolean) => degistir("talepler", (l) => { const t = l.find((x) => x.id === id); if (t) t.okundu = okundu; });
export const talepSil = (id: string) => degistir("talepler", (l) => { const i = l.findIndex((x) => x.id === id); if (i >= 0) l.splice(i, 1); });

// ---- Yüklenen resimler
const IZINLI: Record<string, string> = { "image/webp": "webp", "image/jpeg": "jpg", "image/png": "png", "image/avif": "avif" };
export async function resimKaydet(dosya: File): Promise<string> {
  const uzanti = IZINLI[dosya.type];
  if (!uzanti) throw new Error("Yalnız JPG, PNG, WebP veya AVIF resim yüklenebilir.");
  if (dosya.size > 6 * 1024 * 1024) throw new Error("Resim 6 MB'tan büyük olamaz.");
  const tampon = Buffer.from(await dosya.arrayBuffer());
  // Dosya imzası kontrolü (uzantı taklidine karşı)
  const b = tampon;
  const gecerli =
    (uzanti === "png" && b[0] === 0x89 && b[1] === 0x50) ||
    (uzanti === "jpg" && b[0] === 0xff && b[1] === 0xd8) ||
    (uzanti === "webp" && b.subarray(8, 12).toString() === "WEBP") ||
    (uzanti === "avif" && b.subarray(4, 12).toString().startsWith("ftyp"));
  if (!gecerli) throw new Error("Dosya geçerli bir resim değil.");
  await fs.mkdir(YUKLEME_KLASORU, { recursive: true });
  const ad = `${Date.now().toString(36)}-${crypto.randomBytes(4).toString("hex")}.${uzanti}`;
  await fs.writeFile(path.join(YUKLEME_KLASORU, ad), tampon);
  return `/dosya/${ad}`;
}
