import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Softturk",
    short_name: "Softturk",
    lang: "tr",
    start_url: "/",
    display: "standalone",
    background_color: "#0b2a3c",
    theme_color: "#0b2a3c",
    icons: [{ src: "/icon.svg", type: "image/svg+xml", sizes: "any" }, { src: "/logo.png", type: "image/png", sizes: "512x512" }],
  };
}
