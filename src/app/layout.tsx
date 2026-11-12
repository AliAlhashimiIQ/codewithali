import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./fonts.css";
import "./motion.css";
import {
  PHONE,
  SERVICE_NAMES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "../lib/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "only light",
  themeColor: "#f2f3ed",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

// Describes the business to search engines. Only facts already shown on the page.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.png`,
  description: SITE_DESCRIPTION,
  telephone: `+${PHONE}`,
  areaServed: { "@type": "Country", name: "Iraq" },
  availableLanguage: ["ar"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: `+${PHONE}`,
    url: `https://wa.me/${PHONE}`,
    availableLanguage: ["ar"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "الخدمات",
    itemListElement: SERVICE_NAMES.map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="rd">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
