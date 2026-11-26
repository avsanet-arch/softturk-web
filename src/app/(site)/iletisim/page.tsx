import { ayarlariGetir } from "@/lib/veri";
import { sayfaMeta, telefonLink, whatsappLink, yolJsonLd } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { Ikon, WhatsappIkon } from "@/components/ikon";
import { SayfaUst } from "@/components/bolumler";
import { TalepFormu } from "@/components/talep-formu";

export const revalidate = 300;

export const metadata = sayfaMeta({
  baslik: "İletişim",
  aciklama: "Softturk ile iletişime geçin: otel programı demosu, web sitesi teklifi ve destek için telefon, WhatsApp, e-posta ve iletişim formu.",
  yol: "/iletisim",
});

export default async function Iletisim() {
  const a = await ayarlariGetir();
  const tel = telefonLink(a.telefon);
  const wa = whatsappLink(a.whatsapp);
  return (
    <>
      <JsonLd veri={yolJsonLd([{ ad: "İletişim", yol: "/iletisim" }])} />
      <SayfaUst baslik="İletişim" metin="Sorunuz, demo talebiniz ya da yeni bir proje fikriniz mi var? Yazın, aynı gün dönelim." yol={[{ ad: "İletişim", yol: "/iletisim" }]} />
      <section className="bolum">
        <div className="kap izgara izgara-2" style={{ gap: 40, alignItems: "start" }}>
          <div className="iletisim-liste">
            {tel && <a href={tel}><span className="ikon-kutu" style={{ margin: 0 }}><Ikon ad="telefon" /></span><span><small>Telefon</small><b>{a.telefon}</b></span></a>}
            {wa && <a href={wa} target="_blank" rel="noopener"><span className="ikon-kutu" style={{ margin: 0, color: "#128c4b", background: "#e3f8ee" }}><WhatsappIkon /></span><span><small>WhatsApp</small><b>Mesaj gönderin</b></span></a>}
            {a.eposta && <a href={`mailto:${a.eposta}`}><span className="ikon-kutu" style={{ margin: 0 }}><Ikon ad="posta" /></span><span><small>E-posta</small><b>{a.eposta}</b></span></a>}
            {(a.adres || a.il) && <div><span className="ikon-kutu" style={{ margin: 0 }}><Ikon ad="konum" /></span><span><small>Adres</small><b>{[a.adres, a.ilce, a.il].filter(Boolean).join(", ")}</b></span></div>}
            {a.calismaSaatleri && <div><span className="ikon-kutu" style={{ margin: 0 }}><Ikon ad="saat" /></span><span><small>Çalışma saatleri</small><b>{a.calismaSaatleri}</b></span></div>}
          </div>
          <TalepFormu tur="iletisim" />
        </div>
      </section>
    </>
  );
}
