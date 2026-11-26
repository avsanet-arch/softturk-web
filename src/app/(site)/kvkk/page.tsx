import { ayarlariGetir } from "@/lib/veri";
import { sayfaMeta } from "@/lib/site";
import { SayfaUst } from "@/components/bolumler";

export const revalidate = 300;
export const metadata = sayfaMeta({ baslik: "KVKK Aydınlatma Metni", aciklama: "Softturk kişisel verilerin korunması aydınlatma metni.", yol: "/kvkk" });

export default async function Kvkk() {
  const a = await ayarlariGetir();
  return (
    <>
      <SayfaUst baslik="KVKK Aydınlatma Metni" yol={[{ ad: "KVKK", yol: "/kvkk" }]} />
      <section className="bolum bolum-beyaz">
        <article className="kap makale">
          <p>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, veri sorumlusu sıfatıyla {a.firmaAdi} olarak kişisel verilerinizi aşağıda açıklanan çerçevede işliyoruz.</p>
          <h2>İşlenen veriler</h2>
          <p>İletişim ve demo formlarında paylaştığınız ad soyad, telefon, e-posta, işletme adı, oda sayısı ve mesajınız; sitemizi ziyaretinize ilişkin teknik bilgiler (IP adresi, tarayıcı bilgisi, çerez tercihleri).</p>
          <h2>İşleme amaçları</h2>
          <ul>
            <li>Talebinize dönüş yapmak, demo ve teklif sunmak</li>
            <li>Hizmetlerimizi geliştirmek ve sitemizin güvenliğini sağlamak</li>
            <li>Onay vermeniz hâlinde reklam ve ziyaret ölçümü yapmak</li>
          </ul>
          <h2>Hukuki sebep</h2>
          <p>Verileriniz KVKK 5. maddesindeki bir sözleşmenin kurulması için gerekli olması, meşru menfaat ve açık rıza (ölçüm çerezleri için) hukuki sebeplerine dayanılarak işlenir.</p>
          <h2>Aktarım</h2>
          <p>Verileriniz yalnız hizmet aldığımız barındırma ve e-posta sağlayıcılarıyla, ölçüm çerezlerine izin vermeniz hâlinde Google ile paylaşılabilir. Yasal zorunluluk dışında başka üçüncü kişilere aktarılmaz.</p>
          <h2>Haklarınız</h2>
          <p>KVKK 11. madde kapsamında verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme ve itiraz etme haklarına sahipsiniz. Başvurularınızı {a.eposta ? <a href={`mailto:${a.eposta}`}>{a.eposta}</a> : "iletişim sayfamızdaki kanallar"} üzerinden iletebilirsiniz.</p>
        </article>
      </section>
    </>
  );
}
