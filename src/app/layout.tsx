import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./site.css";
import { SITE_URL, MARKA } from "@/lib/site";
import { ayarlariGetir } from "@/lib/veri";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--yazi-govde", display: "swap" });
const manrope = Manrope({ subsets: ["latin", "latin-ext"], weight: ["600", "700", "800"], variable: "--yazi-baslik", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const a = await ayarlariGetir();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${MARKA} | Otel Programı ve Web Tasarım`, template: `%s | ${MARKA}` },
    description: "Otel, motel ve pansiyonlar için web tabanlı otel yönetim programı: oda planı, rezervasyon, otomatik KBS, kasa ve raporlar. Kurumsal web sitesi tasarımı ve SEO.",
    applicationName: MARKA,
    icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }], apple: "/apple-icon.png" },
    ...(a.searchConsoleKodu ? { verification: { google: a.searchConsoleKodu } } : {}),
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b2a3c" };

export default function KokSablon({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
