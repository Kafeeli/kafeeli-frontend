import kafeeliLogo from "../assets/title.png";

export function Diamond(props) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      role="status"
      aria-label="Loading"
      {...props}
    >
      <style>
        {`
            @keyframes spin-pixel {
              0% { opacity: 0; }
              1% { opacity: 1; }
              100% { opacity: 0; }
            }
            .pixel-1 { animation: spin-pixel 0.8s ease-in-out 0s infinite; }
            .pixel-2 { animation: spin-pixel 0.8s ease-in-out 0.1s infinite; }
            .pixel-3 { animation: spin-pixel 0.8s ease-in-out 0.2s infinite; }
            .pixel-4 { animation: spin-pixel 0.8s ease-in-out 0.3s infinite; }
            .pixel-5 { animation: spin-pixel 0.8s ease-in-out 0.4s infinite; }
            .pixel-6 { animation: spin-pixel 0.8s ease-in-out 0.5s infinite; }
            .pixel-7 { animation: spin-pixel 0.8s ease-in-out 0.6s infinite; }
            .pixel-8 { animation: spin-pixel 0.8s ease-in-out 0.7s infinite; }
          `}
      </style>
      {/* Top */}
      <rect className="pixel-1" x="8" y="0" width="4" height="4" />
      {/* Top Right */}
      <rect className="pixel-2" x="12" y="4" width="4" height="4" />
      {/* Right */}
      <rect className="pixel-3" x="16" y="8" width="4" height="4" />
      {/* Bottom Right */}
      <rect className="pixel-4" x="12" y="12" width="4" height="4" />
      {/* Bottom */}
      <rect className="pixel-5" x="8" y="16" width="4" height="4" />
      {/* Bottom Left */}
      <rect className="pixel-6" x="4" y="12" width="4" height="4" />
      {/* Left */}
      <rect className="pixel-7" x="0" y="8" width="4" height="4" />
      {/* Top Left */}
      <rect className="pixel-8" x="4" y="4" width="4" height="4" />
    </svg>
  );
}

export default function KafeeliLoader({
  text = "منصة كفيلي .. انتظر قليلاً",
  fullScreen = true,
  className = "",
}) {
  return (
    <div
      dir="rtl"
      className={`flex flex-col items-center justify-center gap-4 font-[Cairo] text-[#003469] ${
        fullScreen
          ? "fixed inset-0 z-50 min-h-screen bg-slate-50/95 backdrop-blur-sm"
          : "w-full py-16"
      } ${className}`}
    >
      <div className="flex flex-col items-center">
        {/* Kafeeli Logo */}
        <img
          src={kafeeliLogo}
          alt="شعار منصة كفيلي"
          className="h-24 w-auto object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105 sm:h-32 md:h-36"
        />
        {/* Diamond SVG Animation */}
        <div className="mt-5 text-[#0D4B8E]">
          <Diamond className="h-10 w-10 text-[#0D4B8E]" />
        </div>
      </div>
      <p className="mt-2 animate-pulse text-base font-bold text-[#003469] sm:text-lg">
        {text}
      </p>
    </div>
  );
}
