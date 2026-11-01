import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechYard | Digital businesses from Bangladesh",
  description:
    "TechYard is the parent company behind DropDoor, Hullor Shop and our B2B digital agency.",
  metadataBase: new URL("https://techyard.asia"),
  openGraph: {
    title: "TechYard | Digital businesses from Bangladesh",
    description:
      "TechYard is the parent company behind DropDoor, Hullor Shop and our B2B digital agency.",
    images: ["/assets/icon-512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0A2645",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Outfit:wght@500;600;700&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
