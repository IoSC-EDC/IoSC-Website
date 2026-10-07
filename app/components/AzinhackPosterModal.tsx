"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trophy, Calendar, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import { event } from "../../lib/event";

function PixelStar({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={`w-6 h-6 flex-shrink-0 ${className}`} viewBox="0 0 32 32">
      <path
        fill="currentColor"
        d="M14 0h4v8h4v4h4v2h6v4h-6v2h-4v4h-4v8h-4v-8h-4v-4H6v-2H0v-4h6v-2h4V8h4z"
      />
    </svg>
  );
}

export default function AzinhackPosterModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open the poster 2 seconds after page mounts (after boot screen / load completes)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
      style={{ backgroundColor: "rgba(10, 13, 20, 0.85)", backdropFilter: "blur(10px)" }}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-lg bg-[#eff5ff] text-[#161712] border-2 border-[#161712] rounded-2xl shadow-[0_20px_60px_rgba(61,67,255,0.35)] overflow-hidden transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {/* Top Announcement Bar */}
        <div className="bg-[#3d43ff] text-white px-4 py-2 flex items-center justify-between text-xs font-mono tracking-wider font-semibold">
          <div className="flex items-center gap-2">
            <PixelStar className="text-[#ff6700] w-4 h-4" />
            <span>OFFICIAL ANNOUNCEMENT</span>
          </div>
          <span className="bg-[#ff6700] text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase">
            National Hackathon
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-10 right-4 z-10 w-9 h-9 rounded-full bg-[#161712] text-white flex items-center justify-center hover:bg-[#3d43ff] transition-colors focus:outline-none"
          aria-label="Close poster"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Poster Header Visual */}
        <div className="relative bg-gradient-to-b from-[#e5eefb] to-[#eff5ff] p-6 pb-2 text-center overflow-hidden border-b border-[#cbd6e6]">
          {/* Background Decorative Graphic */}
          <div className="absolute right-[-20px] top-[-20px] opacity-20 pointer-events-none">
            <Image
              src="/art/hand-star.webp"
              alt="AZINHACK Art"
              width={220}
              height={220}
              className="object-contain"
            />
          </div>

          <div className="font-mono text-xs text-[#3d43ff] tracking-widest font-bold mb-1">
            IoSC × GGSIPU USAR PRESENTS
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#161712] leading-none mb-2">
            AZIN<span className="text-[#3d43ff]">HACK</span>
            <span className="text-[#ff6700] text-2xl sm:text-3xl align-top font-bold">’26</span>
          </h2>

          <p className="text-sm text-[#515b6b] max-w-sm mx-auto font-medium">
            24 Hours of Open Innovation. Turn curiosity into code.
          </p>

          {/* Prize Badge */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#ff6700] text-[#161712] rounded-full border border-[#161712] shadow-sm font-bold text-sm sm:text-base">
            <Trophy className="w-5 h-5 text-[#161712]" />
            <span>TOTAL PRIZE POOL: ₹1,00,000</span>
          </div>
        </div>

        {/* Key Event Details Grid */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3 bg-white/80 rounded-xl border border-[#cbd6e6] flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-[#3d43ff] font-mono text-[11px] font-bold mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>SAVE THE DATE</span>
              </div>
              <div className="font-bold text-[#161712] text-sm sm:text-base">21—22 Oct 2026</div>
              <div className="text-[11px] text-[#515b6b]">24-Hour Overnight Hack</div>
            </div>

            <div className="p-3 bg-white/80 rounded-xl border border-[#cbd6e6] flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-[#3d43ff] font-mono text-[11px] font-bold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>VENUE</span>
              </div>
              <div className="font-bold text-[#161712] text-sm sm:text-base">GGSIPU USAR</div>
              <div className="text-[11px] text-[#515b6b]">East Delhi Campus</div>
            </div>
          </div>

          {/* TinyFish Sponsor Note */}
          <div className="p-3 bg-[#161712] text-white rounded-xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Image src="/sponsors/tinyfish.svg" alt="TinyFish" width={85} height={20} className="invert brightness-200 object-contain" />
              <span className="text-[#a6b5ca]">Title Sponsor & Mandatory Integration</span>
            </div>
            <span className="text-[#ff6700] font-mono text-[10px] font-bold">POWERED BY</span>
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <Link
              href="/azinhack-2026"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-3 px-4 bg-[#3d43ff] hover:bg-[#292fc6] text-white font-bold text-center rounded-xl flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 active:translate-y-0 text-sm shadow-md"
            >
              <span>Explore AZINHACK ’26</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 bg-[#ff6700] hover:bg-[#e95d00] text-[#161712] font-bold text-center rounded-xl flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 active:translate-y-0 text-sm shadow-md"
            >
              <span>Register on Unstop</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Footer note */}
          <div className="text-center pt-1">
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-[#606b7a] underline hover:text-[#161712] font-mono"
            >
              Continue to website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
