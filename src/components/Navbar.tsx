"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dictionary } from "@/lib/dictionary";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Θα χρειαστείς το lucide-react για τα εικονίδια
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
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollYRef = useRef(0);
  const scrollYRef = useRef(0);
  const pathname = usePathname();
  const nextLang = lang === "el" ? "en" : "el";
  const getTransformedPath = (targetLang: string) => {
    if (!pathname) return `/${targetLang}`;
    const segments = pathname.split("/");
    segments[1] = targetLang; // Αλλάζει το 'el' σε 'en' ή αντίστροφα
    return segments.join("/");
  };

  const navLinkStyles =
    "text-[16px] font-bold text-slate-500 hover:text-[#fea1a2] transition-all duration-200 ease-out tracking-wide uppercase";
  const activeLinkStyles = "!text-[#183f80] !text-[18px] font-semibold";
  const mobileNavLinkStyles =
    "text-2xl font-light text-slate-500 uppercase hover:text-[#fea1a2] active:text-[#fea1a2] focus-visible:text-[#fea1a2] transition-colors duration-200";
  const normalizedPathname = pathname?.replace(/\/+$/, "") || "";
  const isActiveRoute = (route: string) => {
    const normalizedRoute = route.replace(/\/+$/, "");
    if (normalizedRoute === `/${lang}`) {
      return normalizedPathname === normalizedRoute;
    }
    return (
      normalizedPathname === normalizedRoute ||
      normalizedPathname.startsWith(`${normalizedRoute}/`)
    );
  };

  // Έλεγχος Scroll για εμφάνιση/απόκρυψη Navbar
  useEffect(() => {
    const controlNavbar = () => {
      if (isOpen) return; // Αν το μενού είναι ανοιχτό, μην την κρύβεις
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY <= 0);
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
      <motion.nav
        initial={false}
        animate={{ y: isVisible || isOpen ? 0 : -100 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`sticky top-0 z-50 w-full transition-colors duration-300 will-change-transform ${
          isAtTop
            ? "bg-transparent shadow-none backdrop-blur-0"
            : "bg-gradient-to-r from-[#b1d8e7] via-[#fcf2f0] to-[#d5beae] shadow-sm shadow-slate-300/40 backdrop-blur-md"
        } ${lato.className}`}
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
                  className="animate-soft-pulse-strong transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-10 items-center">
              <Link
                href={`/${lang}`}
                className={`${navLinkStyles} ${isActiveRoute(`/${lang}`) ? activeLinkStyles : ""}`}
              >
                {dict.navigation.home}
              </Link>
              <Link
                href={`/${lang}/bio`}
                className={`${navLinkStyles} ${isActiveRoute(`/${lang}/bio`) ? activeLinkStyles : ""}`}
              >
                {dict.navigation.bio}
              </Link>
              <Link
                href={`/${lang}/blog`}
                className={`${navLinkStyles} ${isActiveRoute(`/${lang}/blog`) ? activeLinkStyles : ""}`}
              >
                {dict.navigation.blog}
              </Link>
              <Link
                href={`/${lang}/contact`}
                className={`${navLinkStyles} ${isActiveRoute(`/${lang}/contact`) ? activeLinkStyles : ""}`}
              >
                {dict.navigation.contact}
              </Link>

              <div className="flex items-center border-l pl-6 border-slate-200">
                <Link
                  href={getTransformedPath(nextLang)}
                  className="text-[11px] font-bold tracking-widest text-slate-400 hover:text-[#fea1a2] uppercase"
                >
                  {lang === "el" ? "EN" : "EL"}
                </Link>
              </div>
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
        {!isAtTop && (
          <div className="pointer-events-none absolute inset-x-0 -bottom-4 h-4 bg-gradient-to-b from-slate-300/20 to-transparent" />
        )}
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`fixed inset-0 z-[9999] flex h-dvh w-screen flex-col overflow-hidden bg-gradient-to-br from-[#b1d8e7] via-[#fcf2f0] to-[#d5beae] md:hidden ${lato.className}`}
          >
            <div className="pointer-events-none absolute inset-0 z-[1] bg-white/10" />

            {/* Header μέσα στο Mobile Menu για να έχουμε το Logo και το X στην ίδια ευθεία */}
            <div className="relative z-10 flex justify-between items-center bg-white/30 h-20 px-4 border-b border-white/30">
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative z-10 flex-grow flex flex-col items-center justify-center space-y-8"
            >
              <Link
                href={`/${lang}`}
                onClick={() => setIsOpen(false)}
                className={`${mobileNavLinkStyles} ${isActiveRoute(`/${lang}`) ? "!text-[#183f80] font-semibold" : ""}`}
              >
                {dict.navigation.home}
              </Link>
              <Link
                href={`/${lang}/bio`}
                onClick={() => setIsOpen(false)}
                className={`${mobileNavLinkStyles} ${isActiveRoute(`/${lang}/bio`) ? "!text-[#183f80] font-semibold" : ""}`}
              >
                {dict.navigation.bio}
              </Link>
              <Link
                href={`/${lang}/blog`}
                onClick={() => setIsOpen(false)}
                className={`${mobileNavLinkStyles} ${isActiveRoute(`/${lang}/blog`) ? "!text-[#183f80] font-semibold" : ""}`}
              >
                {dict.navigation.blog}
              </Link>
              <Link
                href={`/${lang}/contact`}
                onClick={() => setIsOpen(false)}
                className={`${mobileNavLinkStyles} ${isActiveRoute(`/${lang}/contact`) ? "!text-[#183f80] font-semibold" : ""}`}
              >
                {dict.navigation.contact}
              </Link>

              <div className="pt-4">
                <Link
                  href={getTransformedPath(nextLang)}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-[#fea1a2] active:text-[#fea1a2] focus-visible:text-[#fea1a2] transition-colors duration-200 font-bold tracking-widest uppercase"
                >
                  {lang === "el" ? "EN" : "EL"}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
