import type { NextConfig } from "next";

// Güvenlik başlıkları. Google Analytics / Ads betikleri için izin verilen adresler eklidir.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://googleads.g.doubleclick.net https://www.google.com https://www.googleadservices.com",
  "frame-src https://www.googletagmanager.com https://td.doubleclick.net https://www.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Sunucuda npm kurulumu gerekmesin: derleme kendi içinde çalışır (bkz. deploy/guncelle.sh)
  output: "standalone",
  // Üst klasördeki otel programına karışmasın
  outputFileTracingRoot: __dirname,
  // Resimler zaten küçültülmüş WebP; sunucuda sharp gerekmesin
  images: { unoptimized: true },
  // Yönetim panelinden resim yükleme (tarayıcıda küçültülür, yine de pay bırakıldı)
  experimental: { serverActions: { bodySizeLimit: "8mb" } },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/ekran/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [{ source: "/admin", destination: "/yonetim", permanent: false }];
  },
};

export default nextConfig;
