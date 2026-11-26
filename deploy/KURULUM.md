# Softturk web sitesi – sunucuya kurulum

Site, otel programından ayrı bir Node.js uygulamasıdır. GitHub'da derlenir, sunucu hazır paketi indirir.
İçerik (referanslar, blog yazıları, gelen talepler, ayarlar, yüklenen resimler) site klasöründeki `veri` klasöründe JSON dosyası olarak durur; veritabanı gerekmez.

## 1. Alan adı (Squarespace DNS)
`softturk.com` Squarespace'te kayıtlı. Squarespace › Domains › softturk.com › **DNS** › Custom records:

| Tür | Host | Değer |
|---|---|---|
| A | `@` | `89.252.187.118` (otel programıyla aynı sunucu) |
| CNAME | `www` | `softturk.com` |

Squarespace'in varsayılan "Squarespace Defaults" kayıtlarını (site yönlendirmesi) silin. Kayıtların yayılması birkaç dakika ile birkaç saat sürebilir.
cPanel'de alan adını **Domains › Create A New Domain** ile ekleyin (Squarespace'teki NS kayıtları değişmez, yalnız A kaydı sunucumuzu gösterir).

## 2. cPanel'de Node.js uygulaması
cPanel › **Setup Node.js App** › **Create Application**:

| Alan | Değer |
|---|---|
| Node.js version | 20 veya üstü |
| Application mode | Production |
| Application root | `softturk-site` |
| Application URL | `softturk.com` |
| Application startup file | `server.js` |

**Environment variables** bölümüne ekleyin:

| Ad | Değer |
|---|---|
| `SITE_URL` | `https://www.softturk.com` |
| `NODE_OPTIONS` | `--disable-wasm-trap-handler --v8-pool-size=2` |
| `MALLOC_ARENA_MAX` | `2` |

İsteğe bağlı (yeni talep gelince e-posta): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`.

Kaydedin (uygulama henüz boş, hata vermesi normal).

`softturk-site` klasöründe zaten gerçek bir `node_modules` klasörü varsa cPanel uygulamayı oluşturmaz ("application should not contain folder/file with such name" hatası). Önce kenara alın, oluşturduktan sonra `guncelle.sh`'yi yeniden çalıştırın; betik modülleri cPanel'in bağladığı klasöre koyar:

```sh
mv ~/softturk-site/node_modules ~/softturk-site/node_modules.gecici
# cPanel'de Create, sonra:
sh ~/softturk-web-kod/deploy/guncelle.sh && rm -rf ~/softturk-site/node_modules.gecici
```

Site açılmazsa hata kaydı: `~/softturk-site/stderr.log`.

## 3. Siteyi indirin
Terminal'de:

İlk seferde kodu sunucuya alın (otel programının GitHub anahtarı kullanılır; anahtar yalnız otel-yazilimi deposuna izinliyse GitHub'da anahtarın erişimine softturk-web deposunu da ekleyin):

```sh
git clone "https://x-access-token:$(cat ~/.github-token)@github.com/avsanet-arch/softturk-web.git" ~/softturk-web-kod
sh ~/softturk-web-kod/deploy/guncelle.sh
```

## 4. Yönetim şifresi
```sh
cd ~/softturk-site && node scripts/sifre.mjs
```
Şifreyi iki kez sorar (ekranda görünmez). Sonra `https://www.softturk.com/yonetim` adresinden girin.

## 5. SSL ve yönlendirme
cPanel › **SSL/TLS Status** › softturk.com ve www için **Run AutoSSL**.
cPanel › **Domains** › softturk.com › **Force HTTPS Redirect** açık olsun.

## 6. İlk ayarlar (Yönetim › Ayarlar)
- Telefon, WhatsApp, e-posta, adres
- Paket fiyatları (boş bırakılırsa "Teklif alın" yazar)
- Google Search Console doğrulama kodu, Analytics ve Ads kimlikleri (aşağıda)

## 7. Google Search Console
1. https://search.google.com/search-console › Mülk ekle › **URL öneki** › `https://www.softturk.com`
2. Doğrulama yöntemi **HTML etiketi** › `content="..."` içindeki kodu kopyalayıp Yönetim › Ayarlar › Search Console alanına yapıştırın, kaydedin, Google'da **Doğrula**.
3. **Site haritaları** › `sitemap.xml` gönderin.

## 8. Google Analytics 4
analytics.google.com › Yönetici › Mülk oluştur › Web veri akışı (`https://www.softturk.com`) › **Ölçüm kimliği** (`G-...`) › Yönetim › Ayarlar'a girin.
Site otomatik olarak şu olayları gönderir: `generate_lead` (form gönderildi), `contact` (telefon / WhatsApp / e-posta tıklaması).
Analytics'te `generate_lead`'i **Önemli etkinlik** olarak işaretleyin.

## 9. Google Ads dönüşüm takibi
ads.google.com › Hedefler › Dönüşümler › **Yeni dönüşüm işlemi** › Web sitesi › manuel kurulum, iki dönüşüm oluşturun:
1. **Demo / iletişim formu** (kategori: Potansiyel müşteri formu gönderme)
2. **Telefon / WhatsApp tıklaması** (kategori: İletişim)

Her biri için "Google etiketi"ni seçtiğinizde `send_to: 'AW-123456789/AbCdEf...'` görünür:
- `AW-123456789` → Ayarlar › **Google Ads kimliği**
- `/` işaretinden sonrası → ilgili **dönüşüm etiketi** alanı

Reklam için açılış sayfası: `https://www.softturk.com/reklam/otel-programi` (menüsüz, tek hedef: demo formu; Google aramalarında görünmez).
Gelen talepler hangi reklamdan geldiğini (utm / gclid) Yönetim › Talepler'de gösterir.

Ziyaretçi çerez bandında "Kabul et" demezse Google'a çerezsiz (Consent Mode) sinyal gider; Ads bunu modelleyerek sayar.

## Güncelleme
Kod değişip GitHub'da derleme bitince (Actions › Softturk web sitesi):
```sh
cd ~/softturk-web-kod && git pull && sh deploy/guncelle.sh
```

## Yedek
`~/softturk-site/veri` klasörünü yedekleyin (otel programının yedek betiğine eklenebilir).
