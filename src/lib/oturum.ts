import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { VERI_KLASORU } from "./veri";

/*
 * Tek yönetici hesabı. Şifre sunucuda bir kez belirlenir:
 *   node scripts/sifre.mjs
 * (veri/yonetici.json içine bcrypt özeti yazar; şifre hiçbir yerde açık durmaz)
 */
const CEREZ = "gs_yonetim";
const SURE_SN = 7 * 24 * 3600;

async function gizliAnahtar(): Promise<Buffer> {
  if (process.env.OTURUM_ANAHTARI) return Buffer.from(process.env.OTURUM_ANAHTARI);
  const dosya = path.join(VERI_KLASORU, "gizli.json");
  try {
    return Buffer.from(JSON.parse(await fs.readFile(dosya, "utf8")).anahtar, "hex");
  } catch {
    const anahtar = crypto.randomBytes(32);
    await fs.mkdir(VERI_KLASORU, { recursive: true });
    await fs.writeFile(dosya, JSON.stringify({ anahtar: anahtar.toString("hex") }), { mode: 0o600 });
    return anahtar;
  }
}

async function yoneticiOzeti(): Promise<string | null> {
  try {
    return JSON.parse(await fs.readFile(path.join(VERI_KLASORU, "yonetici.json"), "utf8")).ozet ?? null;
  } catch {
    return null;
  }
}

export async function sifreTanimliMi() {
  return (await yoneticiOzeti()) !== null;
}

function imzala(veri: string, anahtar: Buffer) {
  return crypto.createHmac("sha256", anahtar).update(veri).digest("base64url");
}

// Kaba kuvvet denemelerine karşı: IP başına 15 dakikada 8 hatalı deneme
const hatalar = new Map<string, { sayi: number; ilk: number }>();
export function girisEngelliMi(ip: string) {
  const h = hatalar.get(ip);
  if (!h) return false;
  if (Date.now() - h.ilk > 15 * 60_000) { hatalar.delete(ip); return false; }
  return h.sayi >= 8;
}

export async function girisYap(sifre: string, ip: string): Promise<boolean> {
  const ozet = await yoneticiOzeti();
  const dogru = !!ozet && (await bcrypt.compare(sifre, ozet));
  if (!dogru) {
    const h = hatalar.get(ip) ?? { sayi: 0, ilk: Date.now() };
    h.sayi++;
    hatalar.set(ip, h);
    return false;
  }
  hatalar.delete(ip);
  const bitis = Math.floor(Date.now() / 1000) + SURE_SN;
  const veri = `${bitis}.${ozet!.slice(-12)}`; // şifre değişince eski oturumlar düşer
  const deger = `${veri}.${imzala(veri, await gizliAnahtar())}`;
  (await cookies()).set(CEREZ, deger, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: SURE_SN });
  return true;
}

export async function cikisYap() {
  (await cookies()).delete(CEREZ);
}

export async function oturumVarMi(): Promise<boolean> {
  const deger = (await cookies()).get(CEREZ)?.value;
  if (!deger) return false;
  const parca = deger.split(".");
  if (parca.length !== 3) return false;
  const [bitis, iz, imza] = parca;
  const beklenen = imzala(`${bitis}.${iz}`, await gizliAnahtar());
  const a = Buffer.from(imza), b = Buffer.from(beklenen);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  if (Number(bitis) < Date.now() / 1000) return false;
  const ozet = await yoneticiOzeti();
  return !!ozet && ozet.slice(-12) === iz;
}

/** Yönetim sayfalarının ve eylemlerinin başında çağrılır */
export async function yoneticiGerekli() {
  if (!(await oturumVarMi())) redirect("/yonetim/giris");
}
