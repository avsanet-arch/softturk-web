# Softturk web sitesi

Şirket sitesi: otel programı tanıtımı, web tasarım hizmeti, referanslar / projeler, blog, iletişim ve demo formları, yönetim paneli (`/yonetim`).

- Next.js 15 (App Router), veritabanı yok: içerik `veri/*.json` (VERI_KLASORU ile değişir)
- `npm run dev` → http://localhost:3100
- Yönetim şifresi: `node scripts/sifre.mjs`
- Sunucu kurulumu, Google Search Console / Analytics / Ads: `deploy/KURULUM.md`

Klasörler: `src/app/(site)` herkese açık sayfalar, `src/app/yonetim` yönetim paneli, `src/lib/urun.ts` otel programı tanıtım metinleri, `src/lib/varsayilan.ts` ilk içerik ve ayarlar.
