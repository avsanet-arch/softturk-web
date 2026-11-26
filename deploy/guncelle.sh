#!/bin/sh
# Softturk web sitesini sunucuda kurar / günceller.
# Site sunucuda derlenmez: GitHub'da derlenen hazır paket indirilir (bkz. .github/workflows/derleme.yml).
#
# Kullanım (Terminal'de):
#   sh ~/softturk-web-kod/deploy/guncelle.sh
#
# Site klasörü varsayılan ~/softturk-site (SITE_KLASORU ile değişir).
# Klasördeki "veri" (referanslar, yazılar, talepler, yüklenen resimler) ve ".env" dosyasına dokunulmaz.
set -e

HEDEF="${SITE_KLASORU:-$HOME/softturk-site}"
UYGULAMA=$(basename "$HEDEF")   # cPanel > Setup Node.js App'teki "Application root"
API="https://api.github.com/repos/avsanet-arch/softturk-web/releases/tags/softturk-web-derleme"
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
# cPanel (CloudLinux) node_modules'u ~/nodevenv içine bağlantı (symlink) olarak ister.
# Bağlantı varsa paketin modülleri bağlantının gösterdiği klasöre konur, bağlantı korunur.
if [ -L "$HEDEF/node_modules" ]; then
  NM=$(readlink -f "$HEDEF/node_modules")
  echo "   node_modules -> $NM"
  rm -rf "$NM.eski"
  [ -e "$NM" ] && mv "$NM" "$NM.eski"
  mv "$TMP/yeni/node_modules" "$NM"
  rm -rf "$NM.eski"
fi
for f in .next node_modules public scripts server.js package.json KAYNAK; do
  rm -rf "$HEDEF/$f.eski"
  [ -e "$TMP/yeni/$f" ] || continue
  [ -e "$HEDEF/$f" ] && mv "$HEDEF/$f" "$HEDEF/$f.eski"
  mv "$TMP/yeni/$f" "$HEDEF/$f"
done
for f in .next node_modules public scripts server.js package.json KAYNAK; do rm -rf "$HEDEF/$f.eski"; done
rm -rf "$TMP"
chmod 700 "$HEDEF/veri"

echo "3/3 Site yeniden başlatılıyor"
# Node'u bul: önce PATH, sonra cPanel uygulamasının sanal ortamı, sonra CloudLinux'un hazır sürümleri
NODE=$(command -v node 2>/dev/null || true)
if [ -z "$NODE" ]; then
  for n in "$HOME/nodevenv/$UYGULAMA"/*/bin/node /opt/alt/alt-nodejs24/root/usr/bin/node /opt/alt/alt-nodejs22/root/usr/bin/node /opt/alt/alt-nodejs20/root/usr/bin/node; do
    if [ -x "$n" ]; then NODE="$n"; break; fi
  done
fi
if [ -n "$NODE" ]; then echo "   Node: $NODE ($("$NODE" -v 2>/dev/null))"; else echo "   Uyarı: Node bulunamadı."; fi

KAYITLI=1
[ -d "$HOME/nodevenv/$UYGULAMA" ] || KAYITLI=0
if [ "$KAYITLI" = 1 ] && command -v cloudlinux-selector >/dev/null 2>&1; then
  cloudlinux-selector restart --json --interpreter nodejs --app-root "$UYGULAMA" >/dev/null 2>&1 \
    && echo "   cPanel uygulaması yeniden başlatıldı." \
    || echo "   cloudlinux-selector restart başarısız; restart.txt ile denendi."
fi
# cPanel (Passenger) uygulamayı bu dosyanın tarihi değişince yeniden başlatır
touch "$HEDEF/tmp/restart.txt"

if [ "$KAYITLI" = 0 ]; then
  echo
  echo "DİKKAT: '$UYGULAMA' cPanel'de Node.js uygulaması olarak kayıtlı değil, site çalışmaz."
  echo "cPanel > Setup Node.js App > Create Application (bkz. deploy/KURULUM.md, 2. adım):"
  echo "  Node.js version 20+, Application root: $UYGULAMA, startup file: server.js"
  if [ -d "$HEDEF/node_modules" ] && [ ! -L "$HEDEF/node_modules" ]; then
    echo "Oluşturmadan önce:  mv $HEDEF/node_modules $HEDEF/node_modules.gecici"
    echo "Oluşturduktan sonra bu betiği yeniden çalıştırın."
  fi
fi
if [ ! -s "$HEDEF/veri/yonetici.json" ]; then
  echo
  echo "Yönetim şifresi henüz yok. Belirlemek için:"
  echo "  cd $HEDEF && ${NODE:-node} scripts/sifre.mjs"
fi
echo "Tamam."
