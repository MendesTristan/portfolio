import { useRef, useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useMousePosition from "../ui/useMousePosition";
import HeroScene from "../three/HeroScene";
import Button from "../ui/Button";

const ROLES = [
  "Data Engineer",
  "AI Builder",
  "Future Founder",
];

const useTypingEffect = (strings, typingSpeed = 80, deletingSpeed = 40, pauseMs = 2200) => {
  const [display, setDisplay] = useState("");
  const [strIdx, setStrIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = strings[strIdx];
    if (!isDeleting) {
      if (charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
        return typingSpeed + Math.random() * 40;
      }
      return pauseMs;
    }
    if (charIdx > 0) {
      setDisplay(current.slice(0, charIdx - 1));
      setCharIdx((c) => c - 1);
      return deletingSpeed;
    }
    setIsDeleting(false);
    setStrIdx((s) => (s + 1) % strings.length);
    return typingSpeed;
  }, [strings, strIdx, charIdx, isDeleting, typingSpeed, deletingSpeed, pauseMs]);

  useEffect(() => {
    let timeout;
    const run = () => {
      const delay = tick();
      if (delay === pauseMs) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
          timeout = setTimeout(run, deletingSpeed);
        }, delay);
      } else {
        timeout = setTimeout(run, delay);
      }
    };
    timeout = setTimeout(run, 600);
    return () => clearTimeout(timeout);
  }, [tick, pauseMs, deletingSpeed]);

  return display;
};

const Hero = () => {
  const container = useRef(null);
  const mouse = useMousePosition(0.03);
  const typed = useTypingEffect(ROLES);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".hero-left", { x: -60, opacity: 0, duration: 1.2, delay: 0.2 })
      .from(".hero-label", { y: 20, opacity: 0, duration: 0.6 }, "-=0.6")
      .from(".hero-name", { y: 40, opacity: 0, duration: 1, ease: "expo.out" }, "-=0.4")
      .from(".hero-typing-row", { y: 20, opacity: 0, duration: 0.6 }, "-=0.5")
      .from(".hero-desc", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
      .from(".hero-btn", { y: 20, opacity: 0, duration: 0.5, stagger: 0.12 }, "-=0.3")
      .from(".hero-socials a", { y: 15, opacity: 0, duration: 0.4, stagger: 0.08 }, "-=0.2")
      .from(".hero-photo", { x: 60, opacity: 0, duration: 1.2, ease: "expo.out" }, 0.3)
      .from(".hero-scroll", { opacity: 0, duration: 0.8 }, "-=0.2");
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative w-full h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020024 0%, #030014 40%, #0a0118 100%)" }}
    >
      {/* 3D neural network background */}
      <div className="absolute inset-0 hidden md:block">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 40 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <HeroScene mouseX={mouse.x} mouseY={mouse.y} />
        </Canvas>
      </div>

      {/* Mobile gradient fallback */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-b from-[#0a0030] via-background to-background" />

      {/* Mouse-following volumetric glow */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background: `radial-gradient(800px circle at ${mouse.cx}px ${mouse.cy}px, rgba(139,92,246,0.07), transparent 45%)`,
        }}
      />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,var(--color-background)_75%)]" />

      {/* Rim light top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* ── Split Layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* ── Left: Text Content ── */}
        <div className="hero-left text-left">
          <p className="hero-label text-primary-light font-mono text-xs md:text-sm mb-5 tracking-[0.25em] uppercase">
            Data Engineering &amp; Cloud Architecture
          </p>

          <h1 className="hero-name text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black mb-4 leading-[0.95] tracking-tight">
            <span className="hero-name-glow gradient-text">Tristan</span>
            <br />
            <span className="text-text-primary">Mendes</span>
          </h1>

          {/* Typing effect */}
          <div className="hero-typing-row flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gradient-to-r from-primary/60 to-transparent" />
            <p className="text-base md:text-lg text-text-secondary font-light min-h-[1.5rem]">
              <span>{typed}</span>
              <span className="hero-cursor inline-block w-[2px] h-5 bg-primary-light ml-0.5 align-middle" />
            </p>
          </div>

          <p className="hero-desc text-text-muted text-sm mb-8 font-mono max-w-md leading-relaxed">
          Passionné par l’innovation technologique, j’utilise l’IA et l’automatisation des pipelines de données pour résoudre des problèmes complexes et livrer des solutions fiables.
            <br />
            <span className="text-text-secondary">BNP Paribas CIB</span>
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
            <Button href="#projects" className="hero-btn">
              Voir mes projets
            </Button>
            <Button href="#contact" variant="outline" className="hero-btn">
              Me contacter
            </Button>
          </div>

          {/* Social links */}
          <div className="hero-socials flex items-center gap-4">
            <a href="mailto:mendesvoufo.pro@gmail.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex-center glow-hover transition-all duration-300 text-text-muted hover:text-primary-light" aria-label="Email">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            </a>
            <a href="tel:+33784086957" className="w-10 h-10 rounded-full glass flex-center glow-hover transition-all duration-300 text-text-muted hover:text-primary-light" aria-label="Téléphone">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/tristanmendes-v/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex-center glow-hover transition-all duration-300 text-text-muted hover:text-primary-light" aria-label="LinkedIn">
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a href="https://github.com/MendesTristan" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex-center glow-hover transition-all duration-300 text-text-muted hover:text-primary-light" aria-label="GitHub">
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
            </a>
          </div>
        </div>

        {/* ── Right: Profile Photo ── */}
        <div className="hero-photo flex justify-center lg:justify-end">
          <div className="relative group">
            {/* Outer glow ring */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-primary-dark/20 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

            {/* Border ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/30 via-transparent to-accent/20 p-px">
              <div className="w-full h-full rounded-full bg-background" />
            </div>

            {/* Photo */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] rounded-full overflow-hidden border border-primary/15">
              <img
                src="/assets/profile.png"
                alt="Tristan Mendes"
                className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              {/* Overlay gradient for blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>

            {/* Decorative accent dots */}
            <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-primary/40 blur-[2px]" />
            <div className="absolute -bottom-1 -left-3 w-2 h-2 rounded-full bg-accent/30 blur-[1px]" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] text-text-muted tracking-[0.25em] uppercase font-mono">
          Scroll
        </span>
        <div className="w-5 h-8 border border-text-muted/25 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-primary-light rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
