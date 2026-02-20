"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dictionary } from "@/lib/dictionary";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Θα χρειαστείς το lucide-react για τα εικονίδια
import CalendlyButton from "./CalendlyButton"; // Το κουμπί για το Calendly
import { useCalendly } from "./CalendlyProvider";
import { Lato } from "next/font/google";

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

interface NavbarProps {
  dict: Dictionary;
  lang: string;
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Για το Mobile Menu
  const lastScrollYRef = useRef(0);
  const scrollYRef = useRef(0);
  const { openBooking } = useCalendly();
  const pathname = usePathname();
  const nextLang = lang === "el" ? "en" : "el";
  const getTransformedPath = (targetLang: string) => {
    if (!pathname) return `/${targetLang}`;
    const segments = pathname.split("/");
    segments[1] = targetLang; // Αλλάζει το 'el' σε 'en' ή αντίστροφα
    return segments.join("/");
  };

  const navLinkStyles =
    "text-[16px] font-medium text-slate-500 hover:text-sky-500 transition-colors duration-200 tracking-wide";
  const activeLinkStyles = "text-sky-400 font-semibold";

  // Έλεγχος Scroll για εμφάνιση/απόκρυψη Navbar
  useEffect(() => {
    const controlNavbar = () => {
      if (isOpen) return; // Αν το μενού είναι ανοιχτό, μην την κρύβεις
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    controlNavbar();
    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [isOpen]);

  // Κλειδώνει το scroll όταν το mobile menu είναι ανοιχτό
  useEffect(() => {
    if (isOpen) {
      scrollYRef.current = window.scrollY;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollYRef.current);
    }

    // Cleanup function: αν το component γίνει unmount, επαναφέρουμε το scroll
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {(isVisible || isOpen) && (
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className={`border-slate-50 bg-[#1974D2]/40 backdrop-blur-md sticky top-0 z-50 w-full ${lato.className}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
              <div className="flex justify-between h-20 items-center">
                {/* Logo */}
                <div className="flex-shrink-0 z-50">
                  <Link href={`/${lang}`}>
                    <Image
                      src="/images/logo.png"
                      alt="Logo"
                      width={110}
                      height={35}
                      priority
                      className="transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-10 items-center">
                  <Link
                    href={`/${lang}`}
                    className={`${navLinkStyles} ${pathname === `/${lang}` ? activeLinkStyles : ""}`}
                  >
                    {dict.navigation.home}
                  </Link>
                  <Link
                    href={`/${lang}/bio`}
                    className={`${navLinkStyles} ${pathname === `/${lang}/bio` ? activeLinkStyles : ""}`}
                  >
                    {dict.navigation.bio}
                  </Link>
                  <Link
                    href={`/${lang}/blog`}
                    className={`${navLinkStyles} ${pathname === `/${lang}/blog` ? activeLinkStyles : ""}`}
                  >
                    {dict.navigation.blog}
                  </Link>
                  <Link
                    href={`/${lang}/contact`}
                    className={`${navLinkStyles} ${pathname === `/${lang}/contact` ? activeLinkStyles : ""}`}
                  >
                    {dict.navigation.contact}
                  </Link>

                  <div className="flex items-center border-l pl-6 border-slate-200">
                    <Link
                      href={getTransformedPath(nextLang)}
                      className="text-[11px] font-bold tracking-widest text-slate-400 hover:text-pink-500 uppercase"
                    >
                      {lang === "el" ? "EN" : "EL"}
                    </Link>
                  </div>

                  <CalendlyButton
                    lang={lang}
                    text={dict.navigation.booking}
                    className="ml-4 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-sky-400 hover:bg-sky-500 transition-all shadow-sm"
                  />
                </div>

                {/* Mobile Toggle Button */}
                <div className="md:hidden flex items-center z-50">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-slate-600 p-2"
                  >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 w-screen h-[100dvh] bg-white z-[9999] flex flex-col md:hidden ${lato.className}`}
            style={{
              backgroundImage: "url(/images/mobile_bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Header μέσα στο Mobile Menu για να έχουμε το Logo και το X στην ίδια ευθεία */}
            <div className="flex justify-between items-center bg-[#1974D2]/40 h-20 px-4 border-b border-slate-50">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={110}
                height={35}
              />
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-600 p-2"
              >
                <X size={32} />
              </button>
            </div>

            {/* Τα Links κεντραρισμένα στο υπόλοιπο ύψος */}
            <motion.div
              initial={{ x: 48, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 48, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex-grow flex flex-col items-center justify-center space-y-8"
            >
              <Link
                href={`/${lang}`}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-light text-slate-600"
              >
                {dict.navigation.home}
              </Link>
              <Link
                href={`/${lang}/bio`}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-light text-slate-600"
              >
                {dict.navigation.bio}
              </Link>
              <Link
                href={`/${lang}/blog`}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-light text-slate-600"
              >
                {dict.navigation.blog}
              </Link>
              <Link
                href={`/${lang}/contact`}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-light text-slate-600"
              >
                {dict.navigation.contact}
              </Link>

              <div className="pt-4">
                <Link
                  href={getTransformedPath(nextLang)}
                  onClick={() => setIsOpen(false)}
                  className="text-pink-500 font-bold tracking-widest uppercase"
                >
                  {lang === "el" ? "EN" : "EL"}
                </Link>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false); // Κλείνει το mobile menu
                  openBooking(); // Ανοίγει το Calendly
                }}
                className="ml-4 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-sky-400 hover:bg-sky-500 transition-all shadow-sm"
              >
                {dict.navigation.booking}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
