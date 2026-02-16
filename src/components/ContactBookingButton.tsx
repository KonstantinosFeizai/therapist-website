"use client";

import { useCalendly } from "./CalendlyProvider";

export default function ContactBookingButton({ text }: { text: string }) {
  const { openBooking } = useCalendly();

  return (
    <button
      onClick={openBooking}
      className="inline-block w-full text-center px-8 py-4 bg-rose-400 text-white rounded-2xl hover:bg-rose-500 transition-colors font-medium shadow-lg shadow-rose-200"
    >
      {text}
    </button>
  );
}
