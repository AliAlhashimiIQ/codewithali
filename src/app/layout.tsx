import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./fonts.css";
import "./motion.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "only light",
  themeColor: "#f2f3ed",
};

export const metadata: Metadata = {
  title: "CodeWithAli | موقع يوضّح عرضك ويسهّل التواصل",
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
      <body className="rd">{children}</body>
    </html>
  );
}
