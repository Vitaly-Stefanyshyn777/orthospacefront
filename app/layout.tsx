import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OrthoSpace Dental Clinic - Стоматологія в Долині | Ортодонтія, Терапія, Імплантація",
  description: "Професійна стоматологічна клініка OrthoSpace в Долині. Ортодонтія, терапія, імплантація зубів, професійна гігієна. Безкоштовна консультація. Записатися онлайн.",
  keywords: [
    "стоматологія Долина",
    "ортодонтія",
    "імплантація зубів",
    "стоматолог Долина",
    "професійна гігієна зубів",
    "ортопедія стоматологічна",
    "ендодонтія",
    "хірургія зубів",
    "терапія зубів",
    "брекети",
    "вініри",
    "коронки зубів",
    "чищення зубів",
    "стоматологічна клініка",
    "лікар стоматолог",
    "OrthoSpace",
    "стоматологія Івано-Франківськ",
    "лікування зубів"
  ],
  authors: [{ name: "OrthoSpace Dental Clinic" }],
  creator: "OrthoSpace Dental Clinic",
  publisher: "OrthoSpace Dental Clinic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://orthospacefront.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "OrthoSpace Dental Clinic - Професійна стоматологія в Долині",
    description: "Сучасна стоматологічна клініка OrthoSpace. Ортодонтія, терапія, імплантація. Безкоштовна консультація. Тел: 050 511 58 10",
    url: "https://orthospacefront.vercel.app",
    siteName: "OrthoSpace Dental Clinic",
    images: [
      {
        url: "/Frame44.png",
        width: 1200,
        height: 630,
        alt: "OrthoSpace Dental Clinic - Сучасна стоматологія в Долині",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OrthoSpace Dental Clinic - Стоматологія в Долині",
    description: "Професійна стоматологічна клініка OrthoSpace. Ортодонтія, терапія, імплантація зубів. Записатися онлайн.",
    images: ["/Frame44.png"],
    creator: "@orthospace",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  icons: {
    icon: "/Vector3.svg",
    shortcut: "/Vector3.svg",
    apple: "/Vector3.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        {/* Additional meta tags for social media */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="OrthoSpace Dental Clinic - Сучасна стоматологія в Долині" />

        {/* Facebook specific */}
        <meta property="fb:app_id" content="your-facebook-app-id" />

        {/* Telegram specific */}
        <meta property="telegram:channel" content="@orthospace" />

        {/* Additional SEO tags */}
        <meta name="theme-color" content="#00d4aa" />
        <meta name="msapplication-TileColor" content="#00d4aa" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="OrthoSpace" />

        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              "name": "OrthoSpace Dental Clinic",
              "description": "Професійна стоматологічна клініка OrthoSpace в Долині. Ортодонтія, терапія, імплантація зубів.",
              "url": "https://orthospacefront.vercel.app",
              "telephone": "+380505115810",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "вул. Обліски 115В",
                "addressLocality": "Долина",
                "addressRegion": "Івано-Франківська область",
                "addressCountry": "UA"
              },
              "openingHours": [
                "Mo-Fr 08:00-20:00",
                "Sa-Su 09:00-18:00"
              ],
              "priceRange": "$$",
              "image": "https://orthospacefront.vercel.app/Frame44.png",
              "sameAs": [
                "https://www.facebook.com/orthospace",
                "https://www.instagram.com/orthospace",
                "https://t.me/orthospace"
              ]
            })
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

