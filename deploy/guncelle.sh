#!/bin/sh
# Softturk web sitesini sunucuda kurar / günceller.
# Site sunucuda derlenmez: GitHub'da derlenen hazır paket indirilir (bkz. .github/workflows/softturk-web.yml).
#
# Kullanım (Terminal'de):
#   sh ~/otel-yazilimi/softturk-web/deploy/guncelle.sh
#
# Site klasörü varsayılan ~/softturk-site (SITE_KLASORU ile değişir).
# Klasördeki "veri" (referanslar, yazılar, talepler, yüklenen resimler) ve ".env" dosyasına dokunulmaz.
set -e

HEDEF="${SITE_KLASORU:-$HOME/softturk-site}"
API="https://api.github.com/repos/avsanet-arch/otel-yazilimi/releases/tags/softturk-web-derleme"
TOKEN_FILE="${GITHUB_TOKEN_FILE:-$HOME/.github-token}"
if [ ! -s "$TOKEN_FILE" ]; then
  echo "GitHub anahtarı bulunamadı: $TOKEN_FILE (otel programı kurulumundaki anahtar kullanılır)"
  exit 1
fi
TOKEN=$(cat "$TOKEN_FILE")

echo "1/3 Hazır derleme indiriliyor"
TMP=$(mktemp -d)
ASSET=$(curl -fsSL -H "Authorization: Bearer $TOKEN" "$API" | grep -o '"url": *"https://api.github.com/repos/[^"]*/releases/assets/[0-9]*"' | head -1 | sed 's/.*"\(https[^"]*\)"/\1/')
if [ -z "$ASSET" ]; then echo "Hazır derleme bulunamadı (GitHub > Actions > Softturk web sitesi)."; rm -rf "$TMP"; exit 1; fi
LOC=$(curl -fsS -o /dev/null -w '%{redirect_url}' -H "Authorization: Bearer $TOKEN" -H "Accept: application/octet-stream" "$ASSET")
if [ -z "$LOC" ]; then echo "Hazır derleme indirilemedi."; rm -rf "$TMP"; exit 1; fi
curl -fsSL -o "$TMP/s.tgz" "$LOC"
mkdir "$TMP/yeni"
tar xzf "$TMP/s.tgz" -C "$TMP/yeni"
echo "   Derleme: $(cat "$TMP/yeni/KAYNAK" 2>/dev/null || echo bilinmiyor)"

echo "2/3 Dosyalar yerleştiriliyor: $HEDEF"
mkdir -p "$HEDEF/veri" "$HEDEF/tmp"
for f in .next node_modules public scripts server.js package.json KAYNAK; do
  rm -rf "$HEDEF/$f.eski"
  [ -e "$HEDEF/$f" ] && mv "$HEDEF/$f" "$HEDEF/$f.eski"
  [ -e "$TMP/yeni/$f" ] && mv "$TMP/yeni/$f" "$HEDEF/$f"
done
for f in .next node_modules public scripts server.js package.json KAYNAK; do rm -rf "$HEDEF/$f.eski"; done
rm -rf "$TMP"
chmod 700 "$HEDEF/veri"

echo "3/3 Site yeniden başlatılıyor"
# cPanel (Passenger) uygulamayı bu dosyanın tarihi değişince yeniden başlatır
touch "$HEDEF/tmp/restart.txt"
if [ ! -s "$HEDEF/veri/yonetici.json" ]; then
  echo
  echo "Yönetim şifresi henüz yok. Belirlemek için:"
  echo "  cd $HEDEF && node scripts/sifre.mjs"
fi
echo "Tamam."
