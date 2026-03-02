"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroAnimation() {
  return (
    <div className="relative flex items-center justify-center min-h-[400px] sm:min-h-[550px]">
      {/* 1. Το Lottie Animation */}
      <div className="absolute w-[380px] h-[380px] sm:w-[650px] sm:h-[650px] z-0 opacity-70 mix-blend-multiply">
        <DotLottieReact src="/animations/blob.json" loop autoplay />
      </div>

      {/* 2. Η Φωτογραφία */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <div className="relative h-[340px] w-[250px] rotate-[-2deg] sm:h-[410px] sm:w-[290px]">
          {/* Το container της εικόνας */}
          <div className="relative h-full w-full overflow-hidden rounded-[50%] bg-transparent shadow-[0_18px_40px_rgba(100,116,139,0.25)] transition-all duration-700">
            {/* Overlay Gradient για ομαλή μετάβαση στις άκρες */}
            <div className="absolute inset-0 z-20 shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] rounded-[50%]" />

            <Image
              src="/images/melisa.png"
              alt="Melisa"
              fill
              className="object-cover scale-[1.02]" // Μικρό scale για να μην φαίνονται τυχόν ατέλειες στις άκρες
              priority
            />

            {/* Ένα απαλό gradient στο κάτω μέρος για να "σβήνει" */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-100/10 via-transparent to-transparent z-10" />
          </div>

          {/* Απαλό shadow αντί για border */}
          <div className="absolute inset-0 -z-10 rounded-[50%] blur-2xl bg-slate-400/20 scale-95 translate-y-5" />
        </div>
      </motion.div>
    </div>
  );
}
