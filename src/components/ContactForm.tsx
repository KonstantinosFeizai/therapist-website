"use client";
import { useState } from "react";

interface ContactDict {
  contact: {
    form_name: string;
    form_email: string;
    form_phone: string;
    form_message: string;
    form_send: string;
  };
}

export default function ContactForm({ dict }: { dict: ContactDict }) {
  const [status, setStatus] = useState<
    "IDLE" | "SENDING" | "SUCCESS" | "ERROR"
  >("IDLE");
  const formspreeFormId = process.env.NEXT_PUBLIC_FORMSPREE_KEY;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formspreeFormId) {
      setStatus("ERROR");
      return;
    }

    setStatus("SENDING");

    const formData = new FormData(e.currentTarget);

    const response = await fetch(`https://formspree.io/f/${formspreeFormId}`, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setStatus("SUCCESS");
    } else {
      setStatus("ERROR");
    }
  }

  if (status === "SUCCESS") {
    return (
      <div className="text-center p-10 bg-sky-50 rounded-3xl border border-sky-100 animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-sky-500 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Το μήνυμα εστάλη!
        </h3>
        <p className="text-slate-500">
          Θα επικοινωνήσω μαζί σας το συντομότερο δυνατόν.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="hidden"
        name="_subject"
        value="Νέο μήνυμα από τη φόρμα επικοινωνίας"
      />
      {/* Πεδίο Όνομα */}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
          {dict.contact.form_name}
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-100 focus:bg-white transition-all text-slate-600"
        />
      </div>

      {/* Πεδίο Email */}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
          {dict.contact.form_email}
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-100 focus:bg-white transition-all text-slate-600"
        />
      </div>

      {/* Πεδίο Τηλέφωνο */}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
          {dict.contact.form_phone}
        </label>
        <input
          type="tel"
          name="phone"
          required
          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-100 focus:bg-white transition-all text-slate-600"
        />
      </div>

      {/* Πεδίο Μήνυμα */}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
          {dict.contact.form_message}
        </label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-100 focus:bg-white transition-all text-slate-600 resize-none"
        ></textarea>
      </div>

      {/* Κουμπί Αποστολής */}
      <button
        type="submit"
        disabled={status === "SENDING"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-slate-800 px-8 py-4 text-sm font-medium tracking-wide text-white shadow-sm shadow-slate-300/40 transition-all hover:bg-slate-700 hover:cursor-pointer active:scale-[0.99] disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 11.5l17-7-7 17-2.5-6.5L3 11.5Z"
          />
        </svg>
        {status === "SENDING" ? "Αποστολή..." : dict.contact.form_send}
      </button>

      {status === "ERROR" && (
        <p className="text-rose-500 text-sm text-center font-medium animate-pulse">
          Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.
        </p>
      )}
    </form>
  );
}
