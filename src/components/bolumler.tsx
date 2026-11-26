import Link from "next/link";
import { Ikon, WhatsappIkon } from "./ikon";
import type { Ayarlar, Referans, Yazi } from "@/lib/veri";
import { ANA_OZELLIKLER, DIGER_OZELLIKLER, SSS, type Ozellik } from "@/lib/urun";
import { telefonLink, whatsappLink, tarihYaz } from "@/lib/site";

export function Maddeler({ liste }: { liste: string[] }) {
  return (
    <ul className="maddeler">
      {liste.map((m) => (
        <li key={m}><Ikon ad="tik" boyut={18} /> {m}</li>
      ))}
    </ul>
  );
}

export function OzellikSatiri({ o, ilk }: { o: Ozellik; ilk?: boolean }) {
  return (
    <div className="ozellik">
      <div className="ozellik-yazi">
        <div className="ikon-kutu"><Ikon ad={o.ikon} /></div>
        <h3 style={{ fontSize: "1.6rem" }}>{o.baslik}</h3>
        <p>{o.metin}</p>
        <Maddeler liste={o.maddeler} />
      </div>
      <div className={`ozellik-resim${o.tel ? " tel" : ""}`}>
        <img src={o.resim} alt={o.alt} width={o.tel ? 560 : 1400} height={o.tel ? 1212 : 875} loading={ilk ? "eager" : "lazy"} decoding="async" />
      </div>
    </div>
  );
}

export function OzellikListesi() {
  return (
    <div className="kap">
      {ANA_OZELLIKLER.map((o, i) => <OzellikSatiri key={o.baslik} o={o} ilk={i === 0} />)}
    </div>
  );
}

export function DigerOzellikler() {
  return (
    <div className="izgara izgara-3">
      {DIGER_OZELLIKLER.map((o) => (
        <div key={o.baslik} className="mini">
          <div className="ikon-kutu"><Ikon ad={o.ikon} boyut={20} /></div>
          <div>
            <h3>{o.baslik}</h3>
            <p>{o.metin}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Paketler({ a }: { a: Ayarlar }) {
  return (
    <>
      <div className="izgara izgara-4">
        {a.paketler.map((p) => (
          <div key={p.ad} className={`kart paket${p.one_cikan ? " one" : ""}`}>
            {p.one_cikan && <span className="etiket">En çok tercih edilen</span>}
            <h3>{p.ad}</h3>
            <div className="oda">{p.odalar}</div>
            {p.aylik ? (
              <div className="fiyat">{p.aylik} <small>/ ay</small></div>
            ) : (
              <div className="fiyat" style={{ fontSize: "1.35rem" }}>Size özel fiyat</div>
            )}
            <div className="yillik">{p.yillik ? `Yıllık ödemede ${p.yillik}` : "Oda sayınıza göre teklif"}</div>
            <Maddeler liste={["Tüm özellikler dahil", "Sınırsız kullanıcı", "Otomatik KBS", "Kurulum ve eğitim"]} />
            <Link href="/demo" className={`btn ${p.one_cikan ? "btn-ana" : "btn-ince"}`}>
              {p.aylik ? "Hemen başlayın" : "Teklif alın"}
            </Link>
          </div>
        ))}
      </div>
      {a.fiyatNotu && <p className="fiyat-notu">{a.fiyatNotu}</p>}
    </>
  );
}

export function Sss({ liste = SSS }: { liste?: { s: string; c: string }[] }) {
  return (
    <div className="sss">
      {liste.map((x, i) => (
        <details key={x.s} open={i === 0}>
          <summary>{x.s}</summary>
          <p>{x.c}</p>
        </details>
      ))}
    </div>
  );
}

export function CagriBandi({ a, baslik, metin }: { a: Ayarlar; baslik?: string; metin?: string }) {
  const wa = whatsappLink(a.whatsapp);
  const tel = telefonLink(a.telefon);
  return (
    <section className="bolum" style={{ paddingTop: 24 }}>
      <div className="kap">
        <div className="cagri">
          <div>
            <h2>{baslik ?? "Programı kendi otelinizle görün"}</h2>
            <p>{metin ?? "Demo talebi bırakın; sizi arayalım, programı odalarınızla birlikte gösterelim ve ücretsiz deneme hesabınızı açalım."}</p>
          </div>
          <div className="cagri-dugmeler">
            <Link href="/demo" className="btn btn-beyaz btn-buyuk">Ücretsiz demo iste <Ikon ad="ok" boyut={18} /></Link>
            {wa ? (
              <a href={wa} target="_blank" rel="noopener" className="btn btn-cizgi btn-buyuk"><WhatsappIkon boyut={20} /> WhatsApp</a>
            ) : tel ? (
              <a href={tel} className="btn btn-cizgi btn-buyuk"><Ikon ad="telefon" boyut={18} /> Hemen arayın</a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReferansKart({ r, baslikSeviye = 3 }: { r: Referans; baslikSeviye?: 2 | 3 }) {
  const B = baslikSeviye === 2 ? "h2" : "h3";
  return (
    <Link href={`/referanslar/${r.slug}`} className="kart ref">
      <div className="ref-resim">
        {r.resim ? <img src={r.resim} alt={`${r.baslik} ekran görüntüsü`} loading="lazy" decoding="async" width={800} height={500} /> : <span className="yer">{r.baslik}</span>}
      </div>
      <div className="ref-govde">
        <div className="ref-ust">
          <span>{[r.sektor, r.yil].filter(Boolean).join(" · ")}</span>
          {r.durum === "devam" && <span className="durum-devam">Yapım aşamasında</span>}
        </div>
        <B style={{ fontSize: "1.15rem" }}>{r.baslik}</B>
        <p>{r.ozet}</p>
        {r.etiketler.length > 0 && <div className="etiketler">{r.etiketler.slice(0, 4).map((e) => <span key={e}>{e}</span>)}</div>}
      </div>
    </Link>
  );
}

export function YaziKart({ y }: { y: Yazi }) {
  return (
    <Link href={`/blog/${y.slug}`} className="kart ref">
      <div className="ref-resim">
        {y.resim ? <img src={y.resim} alt="" loading="lazy" decoding="async" width={800} height={500} /> : <span className="yer">Blog</span>}
      </div>
      <div className="ref-govde">
        <div className="ref-ust"><span>{tarihYaz(y.tarih)}</span></div>
        <h3 style={{ fontSize: "1.12rem" }}>{y.baslik}</h3>
        <p>{y.ozet}</p>
      </div>
    </Link>
  );
}

export function SayfaUst({ baslik, metin, yol }: { baslik: string; metin?: string; yol: { ad: string; yol: string }[] }) {
  return (
    <section className="sayfa-ust">
      <div className="kap">
        <nav className="yol" aria-label="Sayfa yolu">
          <Link href="/">Ana sayfa</Link>
          {yol.map((p, i) => (
            <span key={p.yol}> / {i === yol.length - 1 ? p.ad : <Link href={p.yol}>{p.ad}</Link>}</span>
          ))}
        </nav>
        <h1>{baslik}</h1>
        {metin && <p>{metin}</p>}
      </div>
    </section>
  );
}

export function Dalga({ renk = "#f5f8fa" }: { renk?: string }) {
  return (
    <svg className="dalga" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 30c120 20 240 30 360 20S600 10 720 14s240 30 360 30 240-24 360-24v40H0z" fill={renk} />
    </svg>
  );
}
