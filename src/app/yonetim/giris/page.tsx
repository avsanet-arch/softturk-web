import { redirect } from "next/navigation";
import { oturumVarMi, sifreTanimliMi } from "@/lib/oturum";
import { girisEylemi } from "../eylemler";
import { GirisFormu } from "@/components/yonetim-istemci";
import { Logo } from "@/components/logo";

export default async function Giris() {
  if (await oturumVarMi()) redirect("/yonetim");
  const tanimli = await sifreTanimliMi();
  return (
    <div className="giris-kap">
      <div style={{ width: "100%", maxWidth: 400, display: "grid", gap: 20, justifyItems: "center" }}>
        <span style={{ filter: "brightness(1.6)" }}><Logo /></span>
        {tanimli ? (
          <GirisFormu eylem={girisEylemi} />
        ) : (
          <div className="form-kutu">
            <h3>Şifre henüz belirlenmemiş</h3>
            <p className="form-aciklama">Sunucuda site klasöründe şu komutu çalıştırın:</p>
            <pre style={{ background: "#0b2a3c", color: "#7fe3ea", padding: 12, borderRadius: 10, overflowX: "auto" }}>node scripts/sifre.mjs</pre>
          </div>
        )}
      </div>
    </div>
  );
}
