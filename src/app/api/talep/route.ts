import { NextResponse } from "next/server";
import { ayarlariGetir, talepEkle, type Talep } from "@/lib/veri";
import { epostaGonder } from "@/lib/eposta";

// IP başına 10 dakikada en çok 5 talep (form spamına karşı)
const sayac = new Map<string, number[]>();
const TURLER = ["demo", "iletisim", "web", "reklam"] as const;

const kirp = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "yerel";
  const simdi = Date.now();
  const l = (sayac.get(ip) || []).filter((t) => simdi - t < 10 * 60_000);
  if (l.length >= 5) return NextResponse.json({ hata: "Çok fazla deneme yapıldı. Lütfen biraz sonra tekrar deneyin veya bizi arayın." }, { status: 429 });

  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return NextResponse.json({ hata: "Geçersiz istek." }, { status: 403 });

  let g: Record<string, unknown>;
  try {
    g = await req.json();
  } catch {
    return NextResponse.json({ hata: "Geçersiz istek." }, { status: 400 });
  }
  // Tuzak alan doluysa bot: başarılı gibi davran, kaydetme
  if (kirp(g.website, 200)) return NextResponse.json({ tamam: true });

  const ad = kirp(g.ad, 80);
  const telefon = kirp(g.telefon, 30);
  if (ad.length < 2) return NextResponse.json({ hata: "Lütfen adınızı yazın." }, { status: 400 });
  if (telefon.replace(/\D/g, "").length < 10) return NextResponse.json({ hata: "Lütfen geçerli bir telefon numarası yazın." }, { status: 400 });
  const eposta = kirp(g.eposta, 120);
  if (eposta && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta)) return NextResponse.json({ hata: "E-posta adresi geçerli değil." }, { status: 400 });

  const tur = (TURLER as readonly string[]).includes(g.tur as string) ? (g.tur as Talep["tur"]) : "iletisim";
  l.push(simdi);
  sayac.set(ip, l);

  const t = await talepEkle({
    tur,
    ad,
    telefon,
    eposta,
    isletme: kirp(g.isletme, 120),
    odaSayisi: kirp(g.odaSayisi, 20),
    mesaj: kirp(g.mesaj, 2000),
    sayfa: kirp(g.sayfa, 200),
    kaynak: kirp(g.kaynak, 300),
  });

  const a = await ayarlariGetir();
  const turAdi = { demo: "Demo talebi", reklam: "Demo talebi (reklam)", web: "Web sitesi teklifi", iletisim: "İletişim mesajı" }[tur];
  epostaGonder(
    a.bildirimEpostasi,
    `Softturk: ${turAdi} – ${t.ad}`,
    [`${turAdi}`, `Ad: ${t.ad}`, `Telefon: ${t.telefon}`, `E-posta: ${t.eposta || "-"}`, `İşletme: ${t.isletme || "-"}`, `Oda sayısı: ${t.odaSayisi || "-"}`, `Sayfa: ${t.sayfa}`, `Kaynak: ${t.kaynak || "-"}`, "", t.mesaj].join("\n"),
  ).catch((e) => console.error("Talep e-postası gönderilemedi:", e));

  return NextResponse.json({ tamam: true });
}
