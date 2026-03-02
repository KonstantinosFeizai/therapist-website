"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface BlobLottieProps {
  className?: string;
}

export default function BlobLottie({ className = "" }: BlobLottieProps) {
  return (
    <div className={className}>
      <DotLottieReact
        src="/animations/blob.json"
        loop
        autoplay
        className="h-full w-full"
      />
    </div>
  );
}
