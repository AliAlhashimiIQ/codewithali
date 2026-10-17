import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "CodeWithAli | مواقع تفتح بأقل من ثانية وتحوّل الإعلان إلى مبيعات",
  description:
    "أبني مواقع Next.js تفتح بأقل من ثانية على الموبايل وتحوّل الضغطة إلى رسالة واتساب. تتبع دقيق لـ Meta Pixel و Conversion API وسرعة 92+ على PageSpeed.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=Noto+Kufi+Arabic:wght@700;800&display=swap"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
