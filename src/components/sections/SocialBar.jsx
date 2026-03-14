import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { socialLinks } from "../../constants/data";

const ICONS = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
};

const SocialIcon = ({ link }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = ((e.clientY - cy) / (rect.height / 2)) * -12;
    const y = ((e.clientX - cx) / (rect.width / 2)) * 12;
    setTilt({ x, y });
  }, []);

  const handleLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <a
      ref={cardRef}
      href={link.url}
      target={link.url.startsWith("mailto") ? undefined : "_blank"}
      rel="noreferrer"
      className="social-icon-card group relative block"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        perspective: "600px",
      }}
    >
      <div
        className="relative flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/[0.06] transition-all duration-300 group-hover:border-[var(--sc)] group-hover:shadow-[0_0_30px_var(--sg)]"
        style={{
          "--sc": `${link.color}50`,
          "--sg": `${link.color}20`,
          background: "rgba(255,255,255,0.02)",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s, background 0.3s",
        }}
      >
        {/* Glow ring behind icon */}
        <div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 50%, ${link.color}12, transparent 70%)` }}
        />

        {/* Icon */}
        <div
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            background: `${link.color}15`,
            color: link.color,
            boxShadow: `0 0 0 0 ${link.color}00`,
          }}
        >
          {ICONS[link.name]}
          {/* Pulse ring on hover */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none"
            style={{ border: `1.5px solid ${link.color}40` }}
          />
        </div>

        {/* Label */}
        <span className="relative text-xs font-semibold text-text-muted group-hover:text-text-primary transition-colors duration-300 tracking-wide">
          {link.name}
        </span>

        {/* Arrow indicator */}
        <svg
          className="relative w-3.5 h-3.5 text-text-muted/40 group-hover:text-[var(--ac)] group-hover:translate-x-0.5 transition-all duration-300 ml-1"
          fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
          style={{ "--ac": link.color }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </div>
    </a>
  );
};

const SocialBar = () => {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.from(".social-icon-card", {
      y: 30, scale: 0.9, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)",
      immediateRender: false, delay: 1.8,
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="relative z-20 mt-6 mb-6 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-start gap-4">
          {socialLinks.map((link) => (
            <SocialIcon key={link.name} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialBar;
