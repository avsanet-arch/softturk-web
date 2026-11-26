import { sayfaMeta } from "@/lib/site";
import { SayfaUst } from "@/components/bolumler";

export const metadata = sayfaMeta({ baslik: "Çerez Politikası", aciklama: "Softturk web sitesinde kullanılan çerezler ve tercihlerinizi nasıl değiştireceğiniz.", yol: "/cerez-politikasi" });

export default function Cerez() {
  return (
    <>
      <SayfaUst baslik="Çerez Politikası" yol={[{ ad: "Çerez politikası", yol: "/cerez-politikasi" }]} />
      <section className="bolum bolum-beyaz">
        <article className="kap makale">
          <p>Çerezler, ziyaret ettiğiniz sitenin tarayıcınıza kaydettiği küçük metin dosyalarıdır.</p>
          <h2>Kullandığımız çerezler</h2>
          <ul>
            <li><strong>Zorunlu:</strong> Sitenin çalışması ve çerez tercihinizin hatırlanması için.</li>
            <li><strong>Ölçüm (Google Analytics):</strong> Sitemizin nasıl kullanıldığını anlamak için. Yalnız onay verirseniz çalışır.</li>
            <li><strong>Reklam (Google Ads):</strong> Reklamlarımızın sonuç verip vermediğini ölçmek için. Yalnız onay verirseniz çalışır.</li>
          </ul>
          <h2>Tercihinizi değiştirmek</h2>
          <p>Tarayıcınızın ayarlarından bu sitenin verilerini silerek çerez tercihinizi sıfırlayabilirsiniz; bir sonraki ziyaretinizde tekrar sorulur.</p>
        </article>
      </section>
    </>
  );
}
