import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const GCPIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="gcpG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="100%" stopColor="#34A853" />
      </linearGradient>
    </defs>
    <path
      d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13a5 5 0 004.35-4.96 5.002 5.002 0 00-4-4z"
      fill="url(#gcpG)"
    />
    <path
      d="M10.5 14.5l1.5-3 1.5 3m-2.5-1h2"
      stroke="#fff"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.9"
    />
  </svg>
);

const AzureIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
    <path
      d="M13.05 4.24L6.56 18.05a.75.75 0 00.68 1.07h10.4a.75.75 0 00.67-.42l3.2-6.58a.75.75 0 00-.01-.68L15.4 4.24a.75.75 0 00-1.36 0l-1 2.1"
      fill="#0078D4"
    />
    <path
      d="M3.5 19.12h6.08L13.05 4.24a.75.75 0 00-.68-.42H8.6a.75.75 0 00-.68.42L3.5 13.12"
      fill="#0078D4"
      opacity="0.65"
    />
  </svg>
);

const MultiCloudIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
    <path
      d="M16.5 11.04A5.49 5.49 0 0011 7c-2.07 0-3.86 1.14-4.82 2.84A4.494 4.494 0 002 14.25 4.5 4.5 0 006.5 18.5h9a3.75 3.75 0 00.97-7.46z"
      stroke="#a78bfa"
      strokeWidth="1.4"
    />
    <path
      d="M19.85 8.54A4.49 4.49 0 0016 5.5a4.49 4.49 0 00-3.52 1.7"
      stroke="#818cf8"
      strokeWidth="1.3"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M21 9.5a3 3 0 01.5 5.96"
      stroke="#818cf8"
      strokeWidth="1.3"
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);

const BADGES = [
  { name: "GCP Data Practitioner", icon: <GCPIcon />, color: "#34A853", glow: "rgba(52, 168, 83, 0.25)" },
  { name: "Azure AZ-900", icon: <AzureIcon />, color: "#0078D4", glow: "rgba(0, 120, 212, 0.25)" },
  { name: "Multi-Cloud", icon: <MultiCloudIcon />, color: "#8b5cf6", glow: "rgba(139, 92, 246, 0.25)" },
];

const CertBanner = () => {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.from(".cert-banner-card", {
      y: 40, duration: 0.8, ease: "power3.out", delay: 1.6,
    });
    gsap.from(".cert-banner-item", {
      y: 20, duration: 0.5, stagger: 0.12, ease: "power3.out", delay: 2.0,
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="relative z-20 pb-6 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="cert-banner-card">
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-0 py-5 px-6">
            {BADGES.map((badge, i) => (
              <div key={badge.name} className="flex items-center">
                <div className="cert-banner-item group flex items-center gap-3 px-5 py-2 rounded-xl cursor-default transition-all duration-300">
                  <div className="cert-banner-icon" style={{ "--badge-glow": badge.glow }}>{badge.icon}</div>
                  <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors whitespace-nowrap">{badge.name}</span>
                </div>
                {i < BADGES.length - 1 && (
                  <div className="hidden sm:block w-px h-6 bg-gradient-to-b from-transparent via-primary/20 to-transparent mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertBanner;
