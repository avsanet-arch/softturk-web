// Yönetim paneli şifresini belirler / değiştirir.
// Kullanım (sunucuda, site klasöründe):  node scripts/sifre.mjs
// Veri klasörü farklıysa:                 VERI_KLASORU=/yol node scripts/sifre.mjs
import { promises as fs } from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const bcrypt = require("bcryptjs");

const klasor = process.env.VERI_KLASORU || path.join(process.cwd(), "veri");

function gizliSor(soru) {
  return new Promise((coz) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = (s) => { if (s.includes(soru)) rl.output.write(s); };
    rl.question(soru, (cevap) => { rl.close(); process.stdout.write("\n"); coz(cevap); });
  });
}

const s1 = await gizliSor("Yeni yönetim şifresi (en az 10 karakter): ");
if (s1.length < 10) { console.error("Şifre en az 10 karakter olmalı."); process.exit(1); }
const s2 = await gizliSor("Tekrar: ");
if (s1 !== s2) { console.error("Şifreler aynı değil."); process.exit(1); }

await fs.mkdir(klasor, { recursive: true });
await fs.writeFile(path.join(klasor, "yonetici.json"), JSON.stringify({ ozet: bcrypt.hashSync(s1, 12) }), { mode: 0o600 });
console.log(`Şifre kaydedildi (${path.join(klasor, "yonetici.json")}). Eski oturumlar kapandı.`);
