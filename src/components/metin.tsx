import type { ReactNode } from "react";

/*
 * Yönetim panelinde yazılan basit metni sayfaya çevirir (HTML kabul etmez, güvenli):
 *   ## Başlık      ### Alt başlık
 *   - madde        1. numaralı madde
 *   **kalın**      [bağlantı metni](https://adres)
 *   Boş satır = yeni paragraf
 */
function satirIci(metin: string, anahtar: string): ReactNode[] {
  const sonuc: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let son = 0, m: RegExpExecArray | null, i = 0;
  while ((m = re.exec(metin))) {
    if (m.index > son) sonuc.push(metin.slice(son, m.index));
    if (m[1]) sonuc.push(<strong key={`${anahtar}-${i++}`}>{m[1]}</strong>);
    else {
      const adres = m[3];
      const guvenli = /^(https?:\/\/|\/|mailto:|tel:)/.test(adres) ? adres : "#";
      const dis = guvenli.startsWith("http");
      sonuc.push(
        <a key={`${anahtar}-${i++}`} href={guvenli} {...(dis ? { target: "_blank", rel: "noopener" } : {})}>
          {m[2]}
        </a>,
      );
    }
    son = re.lastIndex;
  }
  if (son < metin.length) sonuc.push(metin.slice(son));
  return sonuc;
}

export function Metin({ metin }: { metin: string }) {
  const bloklar = metin.replace(/\r/g, "").split(/\n{2,}/);
  return (
    <>
      {bloklar.map((b, i) => {
        const satirlar = b.split("\n").filter((s) => s.trim());
        if (!satirlar.length) return null;
        const k = `b${i}`;
        if (satirlar.length === 1 && satirlar[0].startsWith("### ")) return <h3 key={k}>{satirIci(satirlar[0].slice(4), k)}</h3>;
        if (satirlar[0].startsWith("## ")) {
          const geri = satirlar.slice(1);
          return (
            <div key={k}>
              <h2>{satirIci(satirlar[0].slice(3), k)}</h2>
              {geri.length > 0 && <Metin metin={geri.join("\n")} />}
            </div>
          );
        }
        if (satirlar.every((s) => /^[-*] /.test(s))) return <ul key={k}>{satirlar.map((s, j) => <li key={j}>{satirIci(s.slice(2), `${k}${j}`)}</li>)}</ul>;
        if (satirlar.every((s) => /^\d+[.)] /.test(s))) return <ol key={k}>{satirlar.map((s, j) => <li key={j}>{satirIci(s.replace(/^\d+[.)] /, ""), `${k}${j}`)}</li>)}</ol>;
        return <p key={k}>{satirlar.map((s, j) => (j ? [<br key={`br${j}`} />, ...satirIci(s, `${k}${j}`)] : satirIci(s, `${k}${j}`)))}</p>;
      })}
    </>
  );
}

/** Arama motoru açıklaması için düz metin */
export function duzMetin(metin: string, uzunluk = 160) {
  const d = metin.replace(/[#*>\-]+ ?/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s+/g, " ").trim();
  return d.length > uzunluk ? d.slice(0, uzunluk - 1).replace(/\s\S*$/, "") + "…" : d;
}
