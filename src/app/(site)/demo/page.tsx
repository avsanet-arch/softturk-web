import { sayfaMeta } from "@/lib/site";
import { Ikon } from "@/components/ikon";
import { SayfaUst } from "@/components/bolumler";
import { TalepFormu } from "@/components/talep-formu";

export const metadata = sayfaMeta({
  baslik: "Ücretsiz Demo İste | Otel Programı",
  aciklama: "Softturk Otel Programı'nı kendi odalarınızla görün. Formu doldurun, sizi arayalım ve ücretsiz deneme hesabınızı açalım.",
  yol: "/demo",
});

export default function Demo() {
  return (
    <>
      <SayfaUst baslik="Ücretsiz demo isteyin" metin="Programı kendi odalarınızla birlikte gösterelim. Formu doldurun, genellikle aynı gün içinde arıyoruz." yol={[{ ad: "Ücretsiz demo", yol: "/demo" }]} />
      <section className="bolum">
        <div className="kap izgara izgara-2" style={{ gap: 48, alignItems: "start" }}>
          <div>
            <h2>Demoda neler olacak?</h2>
            <div className="izgara" style={{ gap: 18, marginTop: 20 }}>
              {[
                { i: "takvim", b: "Oda planınızı birlikte kuralım", m: "Oda tiplerinizi ve odalarınızı tanımlayıp programı kendi otelinizle görün." },
                { i: "kalkan", b: "KBS ve kasa", m: "Misafir girişinden bildirime, tahsilattan gün sonuna kadar akışı gösterelim." },
                { i: "telefon", b: "Telefonunuza kuralım", m: "Programı telefonunuza uygulama gibi ekleyelim." },
                { i: "bulut", b: "Deneme hesabı", m: "Hiçbir ödeme bilgisi istemeden deneme hesabınızı açalım." },
              ].map((x) => (
                <div key={x.b} className="mini">
                  <div className="ikon-kutu"><Ikon ad={x.i} boyut={20} /></div>
                  <div><h3>{x.b}</h3><p>{x.m}</p></div>
                </div>
              ))}
            </div>
          </div>
          <TalepFormu tur="demo" />
        </div>
      </section>
    </>
  );
}
