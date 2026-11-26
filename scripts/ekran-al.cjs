// referans-listesi.txt'deki sitelerin ekran görüntüsünü alır → public/referans/<ad>.webp (1600x1000)
// GitHub Actions'ta çalışır (Playwright + sharp yerine Chromium'un kendi WebP çıktısı yok, PNG alınıp Python PIL ile çevrilir)
const { chromium, devices } = require("playwright");
const fs = require("fs");
const path = require("path");
const kok = path.join(__dirname, "..");
const liste = fs.readFileSync(path.join(kok, "referans-listesi.txt"), "utf8").split("\n").map((s) => s.trim()).filter((s) => s && !s.startsWith("#")).map((s) => s.split(/\s+/));
const cikti = path.join(kok, "ekran-gecici");
fs.mkdirSync(cikti, { recursive: true });
(async () => {
  const b = await chromium.launch();
  const rapor = [];
  for (const [ad, url] of liste) {
    try {
      const p = await b.newPage({ viewport: { width: 1440, height: 900 }, locale: "tr-TR" });
      await p.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await p.waitForTimeout(4000);
      // çerez bantlarını kapatmaya çalış
      for (const yazi of ["Kabul", "Tamam", "Accept", "Anladım", "Kabul Et", "Kabul et"]) {
        const d = p.getByRole("button", { name: yazi }).first();
        if (await d.isVisible().catch(() => false)) { await d.click().catch(() => {}); break; }
      }
      await p.waitForTimeout(800);
      await p.screenshot({ path: path.join(cikti, `${ad}.png`) });
      const baslik = await p.title();
      const aciklama = await p.locator('meta[name="description"]').getAttribute("content").catch(() => "");
      await p.close();
      rapor.push({ ad, url, durum: "tamam", baslik, aciklama });
      console.log("tamam", ad, baslik);
    } catch (e) {
      rapor.push({ ad, url, durum: "hata", hata: String(e.message).slice(0, 200) });
      console.log("HATA", ad, e.message);
    }
  }
  fs.writeFileSync(path.join(kok, "ekran-gecici/rapor.json"), JSON.stringify(rapor, null, 2));
  await b.close();
})();
