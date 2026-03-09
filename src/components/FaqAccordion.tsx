"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FaqItem = {
  q: string;
  a: string;
};

export default function FaqAccordion({ questions }: { questions: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {questions.map((item, index) => (
        <div
          key={index}
          className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
          >
            <span className="font-medium text-slate-800">{item.q}</span>
            <span
              className={`transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${openIndex === index ? "rotate-180" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  opacity: {
                    duration: 0.35,
                    ease: [0.33, 1, 0.68, 1],
                  },
                }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 text-slate-600 font-light leading-relaxed">
                  {item.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
