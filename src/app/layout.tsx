import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { PwaRegister } from "@/components/PwaRegister";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const SITE = "Melisa Eryiğit Kişisel Web Sitesi";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE,
  title: {
    default: SITE,
    template: `%s · ${SITE}`,
  },
  description: `${SITE} — projeler, yazılar ve iletişim.`,
  manifest: "/manifest.webmanifest?v=mev7",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Melisa Eryiğit",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/brand/me-v7-32.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/me-v7-48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
    ],
    apple: [
      { url: "/brand/me-v7-180.png", type: "image/png", sizes: "180x180" },
    ],
    shortcut: [{ url: "/brand/me-v7-32.png", type: "image/png" }],
  },
  openGraph: {
    title: SITE,
    description: `${SITE} — projeler, yazılar ve iletişim.`,
    type: "website",
    locale: "tr_TR",
    siteName: SITE,
    images: [
      {
        url: "/og-cover.png?v=mev7",
        width: 1200,
        height: 630,
        alt: "Melisa Eryiğit — pembe zemin, mauve kartane",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE,
    description: `${SITE} — projeler, yazılar ve iletişim.`,
    images: ["/og-cover.png?v=mev7"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fceef3" },
    { media: "(prefers-color-scheme: dark)", color: "#2a1820" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('me-theme');if(t==='night'||t==='day')document.documentElement.dataset.theme=t;}catch(e){}try{if(location.pathname.indexOf('/admin')===0)document.documentElement.dataset.boot='off';}catch(e){}})();`,
          }}
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Melisa Eryiğit" />
        <link rel="apple-touch-icon" href="/brand/me-v7-180.png" sizes="180x180" type="image/png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/brand/me-v7-32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/brand/me-v7-48.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link rel="manifest" href="/manifest.webmanifest?v=mev7" />
      </head>
      <body className={`${fraunces.variable} ${manrope.variable} antialiased`}>
        {/* İlk boyama: pembe kapak React’ten önce — PageSplash kaldırır */}
        <div id="me-boot-splash" aria-hidden="true" />
        <style
          dangerouslySetInnerHTML={{
            __html: `#me-boot-splash{position:fixed;inset:0;z-index:95;pointer-events:none;background:radial-gradient(ellipse 55% 45% at 50% 42%,#ffe4ee 0%,transparent 70%),linear-gradient(170deg,#fff7f9 0%,#fceef3 42%,#f5d6e2 100%)}#me-boot-splash[data-done="1"],html[data-boot="off"] #me-boot-splash{display:none!important}html[data-theme="night"] #me-boot-splash{background:radial-gradient(ellipse 55% 45% at 50% 42%,#3a2430 0%,transparent 70%),linear-gradient(170deg,#2a1820 0%,#24141c 42%,#1c1016 100%)}@media (prefers-reduced-motion:reduce){#me-boot-splash{display:none}}`,
          }}
        />
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
