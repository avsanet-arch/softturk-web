"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cikisYap, girisEngelliMi, girisYap, yoneticiGerekli } from "@/lib/oturum";
import {
  ayarlariKaydet, referansKaydet, referansSil, resimKaydet, talepIsaretle, talepSil, yaziKaydet, yaziSil, type Paket,
} from "@/lib/veri";

const m = (f: FormData, k: string, n = 500) => String(f.get(k) ?? "").trim().slice(0, n);
const etiketler = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean).slice(0, 12);
const yenile = () => revalidatePath("/", "layout");

export async function girisEylemi(_: unknown, f: FormData) {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") || "").split(",")[0].trim() || "yerel";
  if (girisEngelliMi(ip)) return { hata: "Çok fazla hatalı deneme. 15 dakika sonra tekrar deneyin." };
  const ok = await girisYap(String(f.get("sifre") ?? ""), ip);
  if (!ok) return { hata: "Şifre yanlış." };
  redirect("/yonetim");
}

export async function cikisEylemi() {
  await cikisYap();
  redirect("/yonetim/giris");
}

async function resimAl(f: FormData): Promise<string> {
  const dosya = f.get("resimDosya");
  if (dosya instanceof File && dosya.size > 0) return resimKaydet(dosya);
  return f.get("resimSil") === "1" ? "" : m(f, "resim", 300);
}

export async function referansKaydetEylemi(_: unknown, f: FormData) {
  await yoneticiGerekli();
  const baslik = m(f, "baslik", 120);
  if (!baslik) return { hata: "Başlık zorunlu." };
  const url = m(f, "url", 300);
  if (url && !/^https?:\/\//.test(url)) return { hata: "Site adresi https:// ile başlamalı." };
  let resim: string;
  try { resim = await resimAl(f); } catch (e) { return { hata: (e as Error).message }; }
  const r = await referansKaydet({
    id: m(f, "id", 40) || undefined,
    slug: m(f, "slug", 80) || undefined,
    baslik,
    musteri: m(f, "musteri", 120),
    sektor: m(f, "sektor", 60),
    url,
    ozet: m(f, "ozet", 300),
    aciklama: m(f, "aciklama", 20000),
    resim,
    etiketler: etiketler(m(f, "etiketler", 300)),
    yil: m(f, "yil", 10),
    durum: f.get("durum") === "devam" ? "devam" : "yayinda",
    oneCikan: f.get("oneCikan") === "on",
    yayinda: f.get("yayinda") === "on",
    sira: Number(m(f, "sira", 6)) || 0,
  });
  yenile();
  redirect(`/yonetim/referanslar?kaydedildi=${r.slug}`);
}

export async function referansSilEylemi(f: FormData) {
  await yoneticiGerekli();
  await referansSil(m(f, "id", 40));
  yenile();
  redirect("/yonetim/referanslar");
}

export async function yaziKaydetEylemi(_: unknown, f: FormData) {
  await yoneticiGerekli();
  const baslik = m(f, "baslik", 160);
  if (!baslik) return { hata: "Başlık zorunlu." };
  let resim: string;
  try { resim = await resimAl(f); } catch (e) { return { hata: (e as Error).message }; }
  const tarihGirdi = m(f, "tarih", 20);
  const tarih = tarihGirdi && !isNaN(Date.parse(tarihGirdi)) ? new Date(`${tarihGirdi}T09:00:00+03:00`).toISOString() : new Date().toISOString();
  const y = await yaziKaydet({
    id: m(f, "id", 40) || undefined,
    slug: m(f, "slug", 80) || undefined,
    baslik,
    ozet: m(f, "ozet", 300),
    icerik: m(f, "icerik", 50000),
    resim,
    etiketler: etiketler(m(f, "etiketler", 300)),
    yayinda: f.get("yayinda") === "on",
    tarih,
  });
  yenile();
  redirect(`/yonetim/yazilar?kaydedildi=${y.slug}`);
}

export async function yaziSilEylemi(f: FormData) {
  await yoneticiGerekli();
  await yaziSil(m(f, "id", 40));
  yenile();
  redirect("/yonetim/yazilar");
}

export async function talepEylemi(f: FormData) {
  await yoneticiGerekli();
  const id = m(f, "id", 40);
  const islem = m(f, "islem", 10);
  if (islem === "sil") await talepSil(id);
  else await talepIsaretle(id, islem === "okundu");
  revalidatePath("/yonetim", "layout");
}

export async function ayarKaydetEylemi(_: unknown, f: FormData) {
  await yoneticiGerekli();
  const paketler: Paket[] = [];
  for (let i = 0; i < 6; i++) {
    const ad = m(f, `paket${i}_ad`, 40);
    if (!ad) continue;
    paketler.push({ ad, odalar: m(f, `paket${i}_odalar`, 40), aylik: m(f, `paket${i}_aylik`, 30), yillik: m(f, `paket${i}_yillik`, 30), one_cikan: f.get(`paket${i}_one`) === "on" });
  }
  const ga = m(f, "gaOlcumKimligi", 30), ads = m(f, "adsKimligi", 30);
  if (ga && !/^G-[A-Z0-9]+$/.test(ga)) return { hata: "Analytics ölçüm kimliği G- ile başlamalı (ör. G-ABC123XYZ)." };
  if (ads && !/^AW-\d+$/.test(ads)) return { hata: "Google Ads kimliği AW- ile başlamalı (ör. AW-123456789)." };
  const sc = m(f, "searchConsoleKodu", 200).replace(/.*content="([^"]+)".*/, "$1");
  await ayarlariKaydet({
    firmaAdi: m(f, "firmaAdi", 80) || "Softturk",
    slogan: m(f, "slogan", 120),
    telefon: m(f, "telefon", 30),
    whatsapp: m(f, "whatsapp", 20).replace(/\D/g, ""),
    eposta: m(f, "eposta", 120),
    adres: m(f, "adres", 200),
    il: m(f, "il", 40),
    ilce: m(f, "ilce", 40),
    calismaSaatleri: m(f, "calismaSaatleri", 80),
    instagram: m(f, "instagram", 200),
    facebook: m(f, "facebook", 200),
    linkedin: m(f, "linkedin", 200),
    gaOlcumKimligi: ga,
    adsKimligi: ads,
    adsFormEtiketi: m(f, "adsFormEtiketi", 60),
    adsTelefonEtiketi: m(f, "adsTelefonEtiketi", 60),
    searchConsoleKodu: sc,
    programAdresi: m(f, "programAdresi", 200),
    paketler,
    fiyatNotu: m(f, "fiyatNotu", 300),
    bildirimEpostasi: m(f, "bildirimEpostasi", 120),
  });
  yenile();
  return { tamam: "Ayarlar kaydedildi." };
}
