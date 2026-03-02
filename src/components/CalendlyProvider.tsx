"use client";
import { PopupModal } from "react-calendly";
import { useState, useEffect, createContext, useContext } from "react";

const CalendlyContext = createContext({ openBooking: () => {} });
export const useCalendly = () => useContext(CalendlyContext);

export default function CalendlyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <CalendlyContext.Provider value={{ openBooking: () => {} }}>
        {children}
      </CalendlyContext.Provider>
    );
  }

  return (
    <CalendlyContext.Provider value={{ openBooking: () => setIsOpen(true) }}>
      {children}
      <PopupModal
        url="https://calendly.com/buffon-feizai/45min" // Εδώ θα μπει το link της Μελίσας
        onModalClose={() => setIsOpen(false)}
        open={isOpen}
        rootElement={document.body}
      />
    </CalendlyContext.Provider>
  );
}
