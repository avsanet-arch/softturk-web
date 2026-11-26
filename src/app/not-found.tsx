import Link from "next/link";

export default function Bulunamadi() {
  return (
    <div className="giris-kap" style={{ color: "#cfe2ea", textAlign: "center" }}>
      <div>
        <h1 style={{ color: "#fff" }}>Sayfa bulunamadı</h1>
        <p>Aradığınız sayfa taşınmış ya da kaldırılmış olabilir.</p>
        <Link href="/" className="btn btn-ana btn-buyuk">Ana sayfaya dönün</Link>
      </div>
    </div>
  );
}
