import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Disable body scroll while loading
    document.body.style.overflow = "hidden";

    // Snappy progress animation timeline (smooth 500ms transition)
    const startTime = performance.now();
    const duration = 500;

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawProgress);

      if (rawProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          document.body.style.overflow = "";
          setTimeout(() => {
            setIsMounted(false);
          }, 400);
        }, 100);
      }
    }, 16);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      id="site-preloader"
      aria-label="Loading Amaravati Solar Solutions"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gradient-to-br from-[#1F0702] via-[#4A1204] to-[#1A0601] transition-all duration-700 ease-out select-none ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background ambient lighting effects in Amaravati Brand Orange & Solar Gold */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radiant Golden/Orange Sunburst - Top Left */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-[#F5A623]/40 via-[#E04F16]/30 to-transparent blur-3xl animate-pulse" />
        
        {/* Solar Flare - Bottom Right */}
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-tl from-[#FF7A00]/35 via-[#E04F16]/25 to-transparent blur-3xl" />
        
        {/* Central Radial Solar Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[400px] w-[400px] rounded-full bg-[#E04F16]/20 blur-3xl" />
        </div>

        {/* Subtle Warm Solar Dot Matrix Pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #F5A623 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Main Content Box */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center max-w-sm w-full">
        {/* Logo Card with sleek warm orange borders and soft glow */}
        <div className="relative overflow-hidden rounded-2xl bg-white px-5 py-2.5 sm:px-6 sm:py-3 shadow-[0_12px_40px_rgba(224,79,22,0.45)] border border-orange-200/90 transform transition-transform duration-500 hover:scale-[1.02]">
          {/* Shimmer sweep effect in warm amber */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-amber-100/50 to-transparent" />

          {/* 3D Logo Image */}
          <img
            src={logo}
            alt="Amaravati Solar Solutions"
            width={1016}
            height={307}
            className="h-11 sm:h-14 w-auto object-contain md:h-16 drop-shadow-sm"
            loading="eager"
          />
        </div>

        {/* Progress Bar & Status (Brand Orange & Solar Gold) */}
        <div className="mt-6 sm:mt-7 flex flex-col items-center w-full max-w-xs">
          {/* Progress bar container */}
          <div className="h-2 w-full rounded-full bg-white/20 overflow-hidden p-[1px] shadow-inner border border-orange-400/35 backdrop-blur-md">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#F5A623] via-[#E04F16] to-[#FF7A00] transition-all duration-150 ease-out shadow-[0_0_16px_rgba(245,166,35,0.9)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Loading details */}
          <div className="mt-3 flex w-full items-center justify-between text-xs font-semibold text-white/90">
            <span className="flex items-center gap-2 text-amber-300 font-bold">
              <span className="inline-block h-2 w-2 rounded-full bg-[#E04F16] shadow-[0_0_8px_#E04F16] animate-ping" />
              Powering clean energy...
            </span>
            <span className="font-mono font-black text-amber-300 text-sm tracking-wider">{progress}%</span>
          </div>
        </div>

        {/* Bottom Tagline */}
        <p className="mt-6 text-[11px] tracking-widest text-orange-200/75 uppercase font-bold">
          Clean Energy • Brighter Tomorrow
        </p>
      </div>
    </div>
  );
}
