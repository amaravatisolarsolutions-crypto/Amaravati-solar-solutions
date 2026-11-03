import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Disable body scroll while loading
    document.body.style.overflow = "hidden";

    // Progress animation timeline
    const startTime = performance.now();
    const duration = 1400; // 1.4 seconds total load experience

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawProgress);

      if (rawProgress >= 100) {
        clearInterval(interval);
        // Start exit animation
        setTimeout(() => {
          setIsExiting(true);
          document.body.style.overflow = "";
          if (window.location.pathname === "/") {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
          }
          // Unmount after exit transition finishes
          setTimeout(() => {
            setIsMounted(false);
          }, 650);
        }, 200);
      }
    }, 25);

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
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#041525] transition-all duration-700 ease-out select-none ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Golden sun flare - top left */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-amber-400/20 via-orange-500/15 to-transparent blur-3xl animate-pulse" />
        {/* Solar sky flare - bottom right */}
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-tl from-sky-400/25 via-blue-600/15 to-transparent blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Main card */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-md w-full">
        {/* Logo Card with glassmorphism */}
        <div className="relative overflow-hidden rounded-3xl bg-white/95 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(245,166,35,0.25)] border border-white/40 transform transition-transform duration-500 hover:scale-[1.02]">
          {/* Shimmer sweep effect */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          {/* 3D Logo Image */}
          <img
            src={logo}
            alt="Amaravati Solar Solutions"
            width={1016}
            height={307}
            className="h-16 sm:h-20 w-auto object-contain md:h-24 drop-shadow-md"
            loading="eager"
          />
        </div>

        {/* Progress & Status */}
        <div className="mt-8 flex flex-col items-center w-full max-w-xs">
          {/* Progress bar container */}
          <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden p-[1px] shadow-inner backdrop-blur">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-sky-400 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(245,166,35,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Loading details */}
          <div className="mt-3 flex w-full items-center justify-between text-xs font-semibold text-white/70">
            <span className="flex items-center gap-1.5 text-amber-300">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
              Powering clean energy...
            </span>
            <span className="font-mono text-white/90">{progress}%</span>
          </div>
        </div>

        {/* Bottom Tagline */}
        <p className="mt-6 text-xs tracking-wider text-white/40 uppercase font-medium">
          Clean Energy • Brighter Tomorrow
        </p>
      </div>
    </div>
  );
}
