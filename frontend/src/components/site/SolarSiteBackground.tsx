import solarWatermark from "@/assets/solar-watermark-bg.jpg";

export function SolarSiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      {/* 1. Base Warm Light Solar Tint Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9] via-[#FFF9F2] to-[#FFF6EC]" />

      {/* 2. Top-Right Golden Sun Flare & Light Orange Ambient Radiance */}
      <div className="absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#FF6A1A]/12 via-[#F59E0B]/08 to-transparent blur-3xl pointer-events-none" />

      {/* 3. Top-Left Morning Amber Dawn Glow */}
      <div className="absolute top-1/4 -left-36 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#EA580C]/07 via-[#FBAA19]/04 to-transparent blur-3xl pointer-events-none" />

      {/* 4. Center-Bottom Soft Warm Solar Reflection */}
      <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-t from-[#FB923C]/08 via-[#FEF08A]/04 to-transparent blur-3xl pointer-events-none" />

      {/* 5. Authentic Solar Panel Watermark Image Texture (Ultra-subtle, clean-tech, 12-16% opacity) */}
      <div
        className="absolute inset-0 bg-repeat bg-top opacity-[0.14] sm:opacity-[0.18] mix-blend-multiply transition-opacity duration-700"
        style={{
          backgroundImage: `url(${solarWatermark})`,
          backgroundSize: "1600px auto",
        }}
      />

      {/* 6. Geometric Photovoltaic Solar Wafer & Busbar Vector Lattice Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] sm:opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="solar-wafer-pattern"
            width="96"
            height="96"
            patternUnits="userSpaceOnUse"
          >
            {/* Solar Cell Outer Border */}
            <rect
              x="2"
              y="2"
              width="92"
              height="92"
              rx="4"
              fill="none"
              stroke="#D9410E"
              strokeWidth="0.75"
              strokeDasharray="4 2"
            />
            {/* Horizontal Busbars */}
            <line x1="2" y1="25" x2="94" y2="25" stroke="#E04F16" strokeWidth="0.5" />
            <line x1="2" y1="48" x2="94" y2="48" stroke="#E04F16" strokeWidth="0.7" />
            <line x1="2" y1="71" x2="94" y2="71" stroke="#E04F16" strokeWidth="0.5" />
            {/* Fine Vertical Contact Fingers */}
            <line x1="25" y1="2" x2="25" y2="94" stroke="#F97316" strokeWidth="0.3" strokeOpacity="0.8" />
            <line x1="48" y1="2" x2="48" y2="94" stroke="#F97316" strokeWidth="0.4" strokeOpacity="0.8" />
            <line x1="71" y1="2" x2="71" y2="94" stroke="#F97316" strokeWidth="0.3" strokeOpacity="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#solar-wafer-pattern)" />
      </svg>

      {/* 7. Subtle Radiant Solar Rays in the Top Right Angle */}
      <svg
        className="absolute -top-10 -right-10 w-[500px] h-[500px] opacity-[0.07] pointer-events-none"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="500" cy="0" r="100" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="6 4" />
        <circle cx="500" cy="0" r="180" stroke="#F97316" strokeWidth="1" strokeDasharray="8 6" />
        <circle cx="500" cy="0" r="280" stroke="#F59E0B" strokeWidth="0.75" strokeDasharray="12 8" />
        <circle cx="500" cy="0" r="390" stroke="#F97316" strokeWidth="0.5" strokeDasharray="16 10" />
        <line x1="500" y1="0" x2="100" y2="400" stroke="#EA580C" strokeWidth="0.8" strokeDasharray="5 5" />
        <line x1="500" y1="0" x2="200" y2="480" stroke="#EA580C" strokeWidth="0.8" strokeDasharray="5 5" />
        <line x1="500" y1="0" x2="320" y2="500" stroke="#EA580C" strokeWidth="0.8" strokeDasharray="5 5" />
        <line x1="500" y1="0" x2="40" y2="300" stroke="#EA580C" strokeWidth="0.8" strokeDasharray="5 5" />
      </svg>
    </div>
  );
}

