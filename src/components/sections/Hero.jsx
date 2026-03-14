import { useRef, useState, useEffect, useCallback, Component } from "react";
import { Canvas } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMousePosition } from "../../hooks";
import HeroScene from "../three/HeroScene";
import Button from "../ui/Button";

const ROLES = [
  "Data Engineer",
  "AI Builder",
  "Future Founder",
];

class CanvasErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

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

const FallbackAvatar = () => (
  <div className="absolute inset-0 flex-center bg-gradient-to-br from-primary/20 via-surface to-primary-dark/20">
    <span className="text-4xl md:text-5xl font-black gradient-text select-none">TM</span>
  </div>
);

const Hero = () => {
  const container = useRef(null);
  const mouse = useMousePosition(0.03);
  const typed = useTypingEffect(ROLES);
  const [imgFailed, setImgFailed] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".hero-left", { x: -60, opacity: 0, duration: 1.2, delay: 0.2 })
      .from(".hero-label", { y: 20, opacity: 0, duration: 0.6 }, "-=0.6")
      .from(".hero-name", { y: 40, opacity: 0, duration: 1, ease: "expo.out" }, "-=0.4")
      .from(".hero-typing-row", { y: 20, opacity: 0, duration: 0.6 }, "-=0.5")
      .from(".hero-desc", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
      .from(".hero-btn", { y: 20, opacity: 0, duration: 0.5, stagger: 0.12 }, "-=0.3")
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
        <CanvasErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 7], fov: 40 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <HeroScene mouseX={mouse.x} mouseY={mouse.y} />
          </Canvas>
        </CanvasErrorBoundary>
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

      {/* Split Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Left: Text Content */}
        <div className="hero-left text-left">
          <p className="hero-label text-primary-light font-mono text-xs md:text-sm mb-5 tracking-[0.25em] uppercase">
            Data Engineering &amp; Cloud Architecture
          </p>

          <h1 className="hero-name text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black mb-3 leading-[0.95] tracking-tight">
            <span className="hero-name-glow gradient-text">Tristan</span>
            <br />
            <span className="text-text-primary">Mendes</span>
          </h1>

          {/* Typing effect */}
          <div className="hero-typing-row flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gradient-to-r from-primary/60 to-transparent" />
            <p className="text-sm md:text-base text-text-secondary font-light min-h-[1.5rem]">
              <span>{typed}</span>
              <span className="hero-cursor inline-block w-[2px] h-5 bg-primary-light ml-0.5 align-middle" />
            </p>
          </div>

          <p className="hero-desc text-text-muted text-xs mb-7 font-mono max-w-md leading-relaxed">
            Passionné par l&apos;innovation technologique, j&apos;utilise l&apos;IA et l&apos;automatisation des pipelines de données pour résoudre des problèmes complexes et livrer des solutions fiables.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button href="#projects" className="hero-btn">
              Voir mes projets
            </Button>
            <Button href="#contact" variant="outline" className="hero-btn">
              Me contacter
            </Button>
          </div>

        </div>

        {/* Right: Profile Photo */}
        <div className="hero-photo flex justify-center lg:justify-end">
          <div className="relative group">
            {/* Outer glow ring */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-primary-dark/20 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

            {/* Border ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/30 via-transparent to-accent/20 p-px">
              <div className="w-full h-full rounded-full bg-background" />
            </div>

            {/* Photo with fallback */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border border-primary/15">
              <FallbackAvatar />
              {!imgFailed && (
                <img
                  src="/assets/profile.png"
                  alt="Tristan Mendes"
                  className="relative z-10 w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={() => setImgFailed(true)}
                />
              )}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
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
