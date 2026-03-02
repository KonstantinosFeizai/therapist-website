"use client";
import { PopupButton } from "react-calendly";
import { useEffect, useState } from "react";

interface CalendlyButtonProps {
  lang: string;
  text: string;
  className?: string;
}

export default function CalendlyButton({
  text,
  className,
}: CalendlyButtonProps) {
  const [mounted, setMounted] = useState(false);

  // Διασφαλίζουμε ότι το component φορτώνει μόνο στον client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <PopupButton
      url="https://calendly.com/buffon-feizai/45min" /* ΑΝΤΙΚΑΤΑΣΤΗΣΕ ΜΕ ΤΟ LINK ΤΗΣ ΜΕΛΙΣΑΣ */
      rootElement={document.body}
      text={text}
      className={className}
      pageSettings={{
        backgroundColor: "ffffff",
        hideEventTypeDetails: false,
        hideLandingPageDetails: false,
        primaryColor: "38bdf8", // Το sky-400 σου
        textColor: "475569", // Slate-600
      }}
      /* Εδώ ρυθμίζουμε τη γλώσσα αυτόματα! */
      utm={{
        utmMedium: "Website",
        utmSource: "Navbar",
      }}
    />
  );
}
