import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/dictionary";
import CalendlyProvider from "@/components/CalendlyProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Psychologist Website",
  description: "Personal website of a professional psychologist",
};

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
        {/* Τυλίγουμε τα πάντα με τον Provider */}
        <CalendlyProvider>
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
        </CalendlyProvider>
      </body>
    </html>
  );
}
