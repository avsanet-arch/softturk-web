import Link from "next/link";
import { ayarlariGetir, referanslar, yazilar } from "@/lib/veri";
import { sayfaMeta } from "@/lib/site";
import { Ikon } from "@/components/ikon";
import { CagriBandi, Dalga, Maddeler, ReferansKart, YaziKart } from "@/components/bolumler";

export const revalidate = 300;

export const metadata = {
  ...sayfaMeta({
  baslik: "Softturk | Otel Programı ve Web Tasarım",
  aciklama: "Otel, motel ve pansiyonlar için web tabanlı otel yönetim programı: oda planı, rezervasyon, otomatik KBS, kasa ve raporlar. İşletmeler için hızlı, SEO uyumlu web siteleri.",
  yol: "/",
  }),
  title: { absolute: "Softturk | Otel Programı ve Web Tasarım" },
};

export default async function AnaSayfa() {
  const [a, refler, son] = await Promise.all([ayarlariGetir(), referanslar(), yazilar()]);
  const oneCikan = [...refler.filter((r) => r.oneCikan), ...refler.filter((r) => !r.oneCikan)].slice(0, 6);
  return (
    <>
      <section className="kahraman">
        <div className="kap kahraman-ic">
          <div className="kahraman-yazi">
            <span className="rozet">Otelciler için, bir otelin içinden</span>
            <h1>
              Otelinizi <em>tek ekrandan</em> yönetin, işinizi internette büyütün
            </h1>
            <p>
              Softturk; otel, motel ve pansiyonlar için web tabanlı yönetim programı geliştirir, işletmelere hızlı ve Google'da bulunan web siteleri yapar.
            </p>
            <div className="kahraman-dugmeler">
              <Link href="/otel-programi" className="btn btn-ana btn-buyuk">Otel programını inceleyin <Ikon ad="ok" boyut={18} /></Link>
              <Link href="/web-tasarim" className="btn btn-cizgi btn-buyuk">Web sitesi yaptırın</Link>
            </div>
            <ul className="kahraman-maddeler">
              <li><Ikon ad="tik" boyut={16} /> Otomatik KBS</li>
              <li><Ikon ad="tik" boyut={16} /> Telefondan kullanım</li>
              <li><Ikon ad="tik" boyut={16} /> Kurulum gerektirmez</li>
            </ul>
          </div>
          <div className="kahraman-gorsel">
            <div className="ekran-cerceve">
              <div className="cubuk"><i /><i /><i /></div>
              <img src="/ekran/room-plan.webp" alt="Softturk otel programı oda planı ekranı" width={1400} height={875} fetchPriority="high" />
            </div>
            <div className="telefon-cerceve">
              <img src="/ekran/tel-ana-ekran.webp" alt="Telefonda otel programı ana ekranı" width={560} height={1212} />
            </div>
          </div>
        </div>
        <Dalga />
      </section>

      <section className="bolum">
        <div className="kap">
          <div className="ust-baslik">
            <span className="rozet">Ne yapıyoruz?</span>
            <h2>İki işi iyi yapıyoruz</h2>
            <p>Konaklama işletmelerinin günlük işini kolaylaştıran yazılım ve işletmeleri internette görünür kılan web siteleri.</p>
          </div>
          <div className="izgara izgara-2">
            <div className="kart hizmet">
              <div className="ikon-kutu"><Ikon ad="bina" /></div>
              <h3>Softturk Otel Programı</h3>
              <p>Oda planından KBS'ye, kasadan raporlara kadar otelinizin bütün ön büro işleri tek programda.</p>
              <Maddeler liste={["Sürükle bırak oda planı ve rezervasyon", "Otomatik KBS bildirimi", "Kasa, gün sonu ve raporlar", "QR menü, restoran ve stok"]} />
              <Link href="/otel-programi" className="btn btn-ana">Programı inceleyin</Link>
              <div className="hizmet-resim"><img src="/ekran/rezervasyon.webp" alt="Rezervasyon ekranı" width={1400} height={875} loading="lazy" /></div>
            </div>
            <div className="kart hizmet">
              <div className="ikon-kutu"><Ikon ad="web" /></div>
              <h3>Web Tasarım ve SEO</h3>
              <p>Hızlı açılan, telefonda kusursuz görünen ve Google'da üst sıralara çıkmak için kurgulanmış kurumsal web siteleri.</p>
              <Maddeler liste={["Kurumsal site, otel sitesi, tanıtım sayfası", "Arama motoru uyumu (SEO)", "Google Ads ve dönüşüm takibi", "Kolay yönetim paneli"]} />
              <Link href="/web-tasarim" className="btn btn-ana">Web tasarım hizmeti</Link>
              <div className="hizmet-resim" style={{ background: "linear-gradient(135deg,#0b2a3c,#0b4f74)", padding: "26px 26px 0" }}>
                <div className="ekran-cerceve" style={{ borderRadius: "12px 12px 0 0" }}>
                  <div className="cubuk"><i /><i /><i /></div>
                  <img src="/ekran/whatsapp.webp" alt="" width={1400} height={875} loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bolum bolum-koyu">
        <div className="kap">
          <div className="ust-baslik">
            <span className="rozet">Neden Softturk?</span>
            <h2>Masa başında değil, resepsiyonda tasarlandı</h2>
            <p>Otel programımız Avşa Adası'nda 30 odalı bir motelin her gün yaşadığı ihtiyaçlardan doğdu ve orada her gün kullanılarak gelişiyor.</p>
          </div>
          <div className="izgara izgara-3">
            {[
              { i: "hiz", b: "Hızlı ve sade", m: "En çok kullanılan işler iki tıklık. Personelinize program öğretmek bir saati geçmez." },
              { i: "telefon", b: "Her cihazda", m: "Bilgisayar, tablet ve telefonda aynı program. Hiçbir şey kurmanız gerekmez." },
              { i: "mesaj", b: "Ulaşılabilir destek", m: "Sorunuzu çağrı merkezine değil, programı yazan ekibe iletirsiniz." },
            ].map((x) => (
              <div key={x.b} className="kart">
                <div className="ikon-kutu"><Ikon ad={x.i} /></div>
                <h3>{x.b}</h3>
                <p>{x.m}</p>
              </div>
            ))}
          </div>
          <div className="sayilar">
            <div className="sayi"><b>30+</b><span>ekran ve rapor</span></div>
            <div className="sayi"><b>7/24</b><span>her cihazdan erişim</span></div>
            <div className="sayi"><b>%100</b><span>web tabanlı</span></div>
            <div className="sayi"><b>2</b><span>dil: Türkçe ve İngilizce</span></div>
          </div>
        </div>
      </section>

      <section className="bolum bolum-beyaz">
        <div className="kap">
          <div className="ust-baslik">
            <span className="rozet">Referanslar</span>
            <h2>Yaptığımız işler</h2>
            <p>Hayata geçirdiğimiz web siteleri, yazılımlar ve yeni projelerimiz.</p>
          </div>
          {oneCikan.length ? (
            <div className="izgara izgara-3">{oneCikan.map((r) => <ReferansKart key={r.id} r={r} />)}</div>
          ) : (
            <div className="bos-kutu">Referanslarımız çok yakında burada.</div>
          )}
          <p style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/referanslar" className="btn btn-ince">Tüm referanslar <Ikon ad="ok" boyut={18} /></Link>
          </p>
        </div>
      </section>

      {son.length > 0 && (
        <section className="bolum">
          <div className="kap">
            <div className="ust-baslik">
              <span className="rozet">Blog</span>
              <h2>Otelciler için rehberler</h2>
            </div>
            <div className="izgara izgara-3">{son.slice(0, 3).map((y) => <YaziKart key={y.id} y={y} />)}</div>
          </div>
        </section>
      )}

      <CagriBandi a={a} />
    </>
  );
}
