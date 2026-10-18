import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "CodeWithAli | مواقع وصفحات هبوط لأصحاب الإعلانات",
  description:
    "أنا علي، أبني صفحات ومواقع للعيادات والمتاجر والشركات اللي تعلن. أوضّح عرضك، أحسّن سرعة الموبايل، وأسهّل وصول الزبون لواتساب.",
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
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Noto+Kufi+Arabic:wght@700;800&display=swap"
        />
      </head>
      <body className="rd">
        {children}
      </body>
    </html>
  );
}
