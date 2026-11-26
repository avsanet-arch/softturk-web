import type { Metadata } from "next";

export const metadata: Metadata = { title: "Yönetim", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function YonetimKok({ children }: { children: React.ReactNode }) {
  return children;
}
