import { promises as fs } from "node:fs";
import path from "node:path";
import { YUKLEME_KLASORU } from "@/lib/veri";

const TURLER: Record<string, string> = { webp: "image/webp", jpg: "image/jpeg", png: "image/png", avif: "image/avif" };

// Yönetim panelinden yüklenen resimler (veri/yuklenenler)
export async function GET(_: Request, { params }: { params: Promise<{ ad: string }> }) {
  const { ad } = await params;
  if (!/^[a-z0-9-]+\.(webp|jpg|png|avif)$/.test(ad)) return new Response("Bulunamadı", { status: 404 });
  try {
    const veri = await fs.readFile(path.join(YUKLEME_KLASORU, ad));
    return new Response(new Uint8Array(veri), {
      headers: { "Content-Type": TURLER[ad.split(".").pop()!], "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new Response("Bulunamadı", { status: 404 });
  }
}
