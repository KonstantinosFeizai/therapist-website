"use client";

import { useEffect, useState } from "react";

type ScrollToTopButtonProps = {
  label: string;
};

export default function ScrollToTopButton({ label }: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hasLongContent =
        document.documentElement.scrollHeight > window.innerHeight * 1.8;
      const passedThreshold = window.scrollY > 1050;

      setIsVisible(hasLongContent && passedThreshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      className={`fixed right-4 bottom-5 z-40 flex h-24 w-12 flex-col items-center justify-center gap-1.5 rounded-[999px] border-2 border-[#183f80] bg-white/95 text-slate-800 shadow-[0_10px_24px_rgba(15,23,42,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#183f80] hover:opacity-100 hover:shadow-[0_12px_28px_rgba(15,23,42,0.16)] active:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 sm:right-6 sm:bottom-6 sm:h-30 sm:w-14 sm:gap-2 ${
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-70"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <span
        aria-hidden="true"
        className="block text-xl leading-none font-semibold sm:text-2xl"
      >
        ↑
      </span>
      <span
        aria-hidden="true"
        className="text-xs font-semibold leading-none tracking-wide [writing-mode:vertical-rl] rotate-180 sm:text-sm"
      >
        To Top
      </span>
    </button>
  );
}
