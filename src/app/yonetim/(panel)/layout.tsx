import Link from "next/link";
import { yoneticiGerekli } from "@/lib/oturum";
import { talepler } from "@/lib/veri";
import { Logo } from "@/components/logo";
import { Ikon } from "@/components/ikon";
import { cikisEylemi } from "../eylemler";

export default async function Panel({ children }: { children: React.ReactNode }) {
  await yoneticiGerekli();
  const yeni = (await talepler()).filter((t) => !t.okundu).length;
  return (
    <div className="yon">
      <aside className="yon-yan">
        <Link href="/yonetim"><Logo /></Link>
        <nav>
          <Link href="/yonetim"><Ikon ad="grafik" boyut={18} /> Özet</Link>
          <Link href="/yonetim/talepler"><Ikon ad="mesaj" boyut={18} /> Talepler {yeni > 0 && <span className="sayac">{yeni}</span>}</Link>
          <Link href="/yonetim/referanslar"><Ikon ad="web" boyut={18} /> Referanslar / projeler</Link>
          <Link href="/yonetim/yazilar"><Ikon ad="fatura" boyut={18} /> Blog yazıları</Link>
          <Link href="/yonetim/ayarlar"><Ikon ad="kod" boyut={18} /> Ayarlar</Link>
        </nav>
        <div className="alt-kisim">
          <a href="/" target="_blank" rel="noopener" style={{ display: "flex", gap: 10, padding: "10px 12px", color: "#b8d1dc", textDecoration: "none", fontWeight: 600 }}><Ikon ad="dunya" boyut={18} /> Siteyi aç</a>
          <form action={cikisEylemi}><button><Ikon ad="kilit" boyut={18} /> Çıkış</button></form>
        </div>
      </aside>
      <div className="yon-icerik">{children}</div>
    </div>
  );
}
