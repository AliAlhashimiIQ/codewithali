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

const title = "CodeWithAli | أتمتة الأعمال وحلول الذكاء الاصطناعي في العراق";
const description =
  "نبني وكلاء ذكاء اصطناعي، حلول أتمتة وأنظمة أعمال مخصصة للعيادات والعقارات والمتاجر وشركات الخدمات في العراق، لتنظيم العمليات ومتابعة الزبائن وتقليل العمل المتكرر.";

export const metadata: Metadata = {
  metadataBase: new URL("https://codewithali.tech"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    url: "/",
    siteName: "CodeWithAli",
    title,
    description,
  },
  twitter: { card: "summary", title, description },
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
