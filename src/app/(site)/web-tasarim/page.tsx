import { ayarlariGetir, referanslar } from "@/lib/veri";
import { sayfaMeta, sssJsonLd, yolJsonLd, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { Ikon } from "@/components/ikon";
import { ReferansKart, SayfaUst, Sss } from "@/components/bolumler";
import { TalepFormu } from "@/components/talep-formu";

export const revalidate = 300;

export const metadata = sayfaMeta({
  baslik: "Web Tasarım ve SEO | Kurumsal Web Sitesi",
  aciklama: "Hızlı açılan, telefonda kusursuz görünen, Google'da bulunmak için kurgulanmış kurumsal web siteleri. Otel siteleri, tanıtım sayfaları, SEO ve Google Ads kurulumu.",
  yol: "/web-tasarim",
});

const WEB_SSS = [
  { s: "Web sitesi ne kadar sürede hazır olur?", c: "Kapsama göre değişir; tanıtım sitesi genellikle 1–2 hafta, kapsamlı kurumsal siteler 3–6 hafta içinde yayına alınır." },
  { s: "Siteyi kendim güncelleyebilir miyim?", c: "Evet. Sitelerimizin yönetim paneli vardır; yazı, resim, proje ve iletişim bilgilerini kendiniz değiştirebilirsiniz." },
  { s: "Alan adı ve barındırma (hosting) ile siz mi ilgileniyorsunuz?", c: "İsterseniz alan adı, barındırma, kurumsal e-posta ve SSL sertifikası kurulumunu biz yaparız." },
  { s: "Google'da üst sıralara çıkacak mıyım?", c: "Sitenizi teknik SEO kurallarına göre, hızlı ve doğru yapısal veriyle kurarız; Search Console ve Analytics bağlantısını yaparız. Sıralama zamanla, içerik ve rekabete göre oluşur; reklamla hızlı sonuç için Google Ads kurulumunu da sağlarız." },
];

const ADIMLAR = [
  { b: "Tanışma", m: "İşinizi, müşterinizi ve hedefinizi dinliyoruz." },
  { b: "Tasarım", m: "Size özel tasarım hazırlıyoruz, onayınızla ilerliyoruz." },
  { b: "Geliştirme", m: "Hızlı, güvenli, telefona uyumlu kodluyoruz." },
  { b: "Yayın ve büyüme", m: "SEO, Analytics ve reklam kurulumuyla yayına alıyoruz." },
];

export default async function WebTasarim() {
  const [a, refler] = await Promise.all([ayarlariGetir(), referanslar()]);
  const hizmet = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Web tasarım ve SEO",
    provider: { "@id": `${SITE_URL}/#firma` },
    areaServed: { "@type": "Country", name: "Türkiye" },
    url: `${SITE_URL}/web-tasarim`,
  };
  return (
    <>
      <JsonLd veri={[hizmet, sssJsonLd(WEB_SSS), yolJsonLd([{ ad: "Web Tasarım", yol: "/web-tasarim" }])]} />
      <SayfaUst baslik="Google'da bulunan, müşteri getiren web siteleri" metin="Otel, restoran, mağaza ya da kurumsal firma: işletmenizi internette en iyi şekilde anlatan, hızlı ve ölçülebilir web siteleri yapıyoruz." yol={[{ ad: "Web Tasarım", yol: "/web-tasarim" }]} />
      <section className="bolum bolum-beyaz">
        <div className="kap">
          <div className="izgara izgara-3">
            {[
              { i: "hiz", b: "Çok hızlı", m: "Google'ın hız ölçütlerinde yüksek puan. Ziyaretçi beklemeden siteye girer." },
              { i: "telefon", b: "Telefona uyumlu", m: "Ziyaretçilerin çoğu telefondan gelir; tasarıma telefondan başlıyoruz." },
              { i: "arama", b: "SEO uyumlu", m: "Doğru başlıklar, yapısal veri, site haritası ve Search Console kurulumu." },
              { i: "hedef", b: "Reklama hazır", m: "Google Ads dönüşüm takibi: form, arama ve WhatsApp tıklamaları ölçülür." },
              { i: "kilit", b: "Güvenli", m: "SSL, güvenlik başlıkları, spam korumalı formlar." },
              { i: "kod", b: "Kolay yönetim", m: "Yönetim panelinden içeriği kendiniz güncellersiniz." },
            ].map((x) => (
              <div key={x.b} className="kart">
                <div className="ikon-kutu"><Ikon ad={x.i} /></div>
                <h2 style={{ fontSize: "1.15rem" }}>{x.b}</h2>
                <p>{x.m}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bolum">
        <div className="kap">
          <div className="ust-baslik"><span className="rozet">Nasıl çalışıyoruz?</span><h2>Dört adımda yayında</h2></div>
          <div className="izgara izgara-4">
            {ADIMLAR.map((x, i) => (
              <div key={x.b} className="kart">
                <div className="ikon-kutu" style={{ fontWeight: 800, fontFamily: "var(--yazi-baslik)" }}>{i + 1}</div>
                <h3>{x.b}</h3>
                <p>{x.m}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bolum bolum-beyaz">
        <div className="kap">
          <div className="ust-baslik"><span className="rozet">Referanslar</span><h2>Yaptığımız siteler</h2></div>
          {refler.length ? <div className="izgara izgara-3">{refler.slice(0, 9).map((r) => <ReferansKart key={r.id} r={r} />)}</div> : <div className="bos-kutu">Referanslarımız çok yakında burada.</div>}
        </div>
      </section>
      <section className="bolum">
        <div className="kap"><div className="ust-baslik"><h2>Sık sorulan sorular</h2></div><Sss liste={WEB_SSS} /></div>
      </section>
      <section className="bolum bolum-koyu">
        <div className="kap izgara izgara-2" style={{ alignItems: "center", gap: 48 }}>
          <div>
            <span className="rozet">Teklif</span>
            <h2>Web sitesi için teklif alın</h2>
            <p>Birkaç cümleyle ihtiyacınızı yazın; size uygun çözümü ve fiyatı aynı gün iletelim.</p>
          </div>
          <TalepFormu tur="web" />
        </div>
      </section>
    </>
  );
}
