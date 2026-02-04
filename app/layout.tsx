import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai", "latin"],
  variable: "--font-kanit",
});

// SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "BYD PRIDE AUTO | ศูนย์จำหน่ายรถยนต์ไฟฟ้า BYD อย่างเป็นทางการ",
    template: "%s | BYD PRIDE AUTO",
  },
  description: "ศูนย์จำหน่ายรถยนต์ไฟฟ้า BYD อย่างเป็นทางการ ครบทุกรุ่น ATTO 3, DOLPHIN, SEAL พร้อมบริการหลังการขาย ทดลองขับฟรี สอบถามโปรโมชั่นพิเศษ",
  keywords: [
    "BYD", "รถยนต์ไฟฟ้า", "EV", "ATTO 3", "DOLPHIN", "SEAL", "SEAL U",
    "รถ BYD", "ศูนย์ BYD", "ตัวแทนจำหน่าย BYD", "PRIDE AUTO",
    "รถไฟฟ้า", "รถยนต์พลังงานไฟฟ้า", "EV Thailand", "รถ EV ราคา"
  ],
  authors: [{ name: "PRIDE AUTO" }],
  creator: "PRIDE AUTO",
  publisher: "PRIDE AUTO",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    alternateLocale: "en_US",
    url: "https://bydprideautogroup.online",
    siteName: "BYD PRIDE AUTO",
    title: "BYD PRIDE AUTO | ศูนย์จำหน่ายรถยนต์ไฟฟ้า BYD อย่างเป็นทางการ",
    description: "ศูนย์จำหน่ายรถยนต์ไฟฟ้า BYD ครบทุกรุ่น พร้อมบริการหลังการขาย ทดลองขับฟรี",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BYD PRIDE AUTO - ศูนย์จำหน่ายรถยนต์ไฟฟ้า BYD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BYD PRIDE AUTO | ศูนย์จำหน่ายรถยนต์ไฟฟ้า BYD",
    description: "ศูนย์จำหน่ายรถยนต์ไฟฟ้า BYD ครบทุกรุ่น พร้อมบริการหลังการขาย",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://bydprideautogroup.online",
    languages: {
      "th-TH": "https://bydprideautogroup.online",
      "en-US": "https://bydprideautogroup.online/en",
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "automotive",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              name: "BYD PRIDE AUTO",
              description: "ศูนย์จำหน่ายรถยนต์ไฟฟ้า BYD อย่างเป็นทางการ",
              url: "https://bydprideautogroup.online",
              logo: "https://prideauto.co.th/logo.png",
              priceRange: "฿฿฿",
              address: {
                "@type": "PostalAddress",
                addressCountry: "TH",
              },
              openingHours: "Mo-Su 09:00-18:00",
              sameAs: [
                "https://www.facebook.com/prideauto",
                "https://line.me/prideauto",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${kanit.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

