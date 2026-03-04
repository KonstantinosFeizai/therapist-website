import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/dictionary";

const BASE_URL = new URL("https://www.melisatsela.gr");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const isGreek = lang === "el";
  const pageUrl = `https://www.melisatsela.gr/${lang}`;
  const title = isGreek
    ? "Melisa Tsela | Ψυχολόγος - Ψυχοθεραπεύτρια"
    : "Melisa Tsela | Psychologist - Psychotherapist";
  const description = isGreek
    ? "Η Μελίσα Τσέλα είναι Ψυχολόγος - Ψυχοθεραπεύτρια. Online συνεδρίες ψυχοθεραπείας και συμβουλευτικής με επίκεντρο τον άνθρωπο."
    : "Melisa Tsela is a Psychologist - Psychotherapist offering online psychotherapy and counseling sessions.";

  return {
    metadataBase: BASE_URL,
    title,
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        el: "/el",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: isGreek ? "el_GR" : "en_US",
      url: pageUrl,
      siteName: "Melisa Tsela",
      title,
      description,
      images: [
        {
          url: "/images/logo.png",
          width: 1200,
          height: 630,
          alt: "Melisa Tsela",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/logo.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [{ url: "/images/favicon.ico", type: "image/x-icon" }],
      shortcut: [{ url: "/images/favicon.ico", type: "image/x-icon" }],
      apple: [{ url: "/images/favicon.ico", type: "image/x-icon" }],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "el" | "en");

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div
          className="bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/images/vecteezy_minimalist.jpg')",
          }}
        >
          <Navbar dict={dict} lang={lang} />
          <main className="flex-grow">{children}</main>
        </div>
        <Footer dict={dict} lang={lang} />
      </body>
    </html>
  );
}
