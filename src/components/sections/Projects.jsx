import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMousePosition } from "../../hooks";
import SectionWrapper from "../ui/SectionWrapper";
import SceneBg from "../three/SceneBg";
import { projects } from "../../constants/data";

gsap.registerPlugin(ScrollTrigger);

const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];

const DATA_TOKENS = [
  "0x4F2A", "10110", ">>", "SELECT", "</>", "async",
  "deploy", "0xFF", "{}", "push", "BUILD", "▶ test",
  "npm run", "λ", "::pipe", "ETL", "API", "SQL",
  "0b1010", "merge", "→", "∞", "docker", "k8s",
];

/* ── Futuristic sound via Web Audio API ── */
const playPulse = (idx) => {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const g1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(220 + idx * 80, now);
    osc1.frequency.exponentialRampToValueAtTime(660 + idx * 50, now + 0.07);
    osc1.frequency.exponentialRampToValueAtTime(140, now + 0.22);
    g1.gain.setValueAtTime(0.06, now);
    g1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc1.connect(g1).connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.25);

    const osc2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    osc2.type = "square";
    osc2.frequency.setValueAtTime(1100 + idx * 180, now);
    osc2.frequency.exponentialRampToValueAtTime(700, now + 0.1);
    g2.gain.setValueAtTime(0.012, now);
    g2.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc2.connect(g2).connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.15);

    setTimeout(() => ctx.close(), 600);
  } catch (_) { /* Audio API unavailable */ }
};

/* ── Impact badge ── */
const ImpactBadge = ({ text, color }) => (
  <span
    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold whitespace-nowrap"
    style={{ color, background: `${color}0c`, border: `1px solid ${color}20` }}
  >
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
    {text}
  </span>
);

/* ── Tech tag ── */
const Tag = ({ name, color }) => (
  <span
    className="proj-tag text-[11px] font-mono px-2.5 py-1 rounded-lg cursor-default transition-all duration-300 hover:scale-105"
    style={{ background: `${color}0c`, border: `1px solid ${color}1a`, color: `${color}cc` }}
  >
    {name}
  </span>
);

/* ── Main component ── */
const Projects = () => {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const mouse = useMousePosition(0.02);

  const toggle = useCallback((idx) => {
    playPulse(idx);
    setActive((a) => (a === idx ? null : idx));
  }, []);

  useGSAP(() => {
    gsap.to(".pipeline-rail", {
      backgroundPositionY: "200%",
      duration: 4,
      repeat: -1,
      ease: "none",
    });

    gsap.utils.toArray(".data-tok").forEach((el, i) => {
      const tl = gsap.timeline({ repeat: -1, delay: i * 0.55 });
      tl.fromTo(el, { y: 30, opacity: 0 }, { y: -100, opacity: 0.2, duration: 2.5, ease: "none" });
      tl.to(el, { y: -200, opacity: 0, duration: 1.5, ease: "none" });
    });

    gsap.from(".proj-row", {
      x: -50,
      duration: 0.7,
      stagger: 0.15,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: { trigger: ref.current, start: "top 82%" },
    });

    gsap.from(".pipe-dot", {
      scale: 0,
      duration: 0.5,
      stagger: 0.12,
      ease: "back.out(3)",
      immediateRender: false,
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });

    gsap.from(".proj-tag", {
      scale: 0.8,
      duration: 0.3,
      stagger: 0.03,
      ease: "back.out(2)",
      immediateRender: false,
      scrollTrigger: { trigger: ".proj-tag", start: "top 92%" },
    });
  }, { scope: ref });

  return (
    <SectionWrapper id="projects" title="Projets" subtitle="Réalisations techniques à fort impact.">
      <SceneBg mouseX={mouse.x} mouseY={mouse.y} variant="pipeline" />

      {/* Floating data tokens */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {DATA_TOKENS.map((t, i) => (
          <span
            key={i}
            className="data-tok absolute text-[10px] font-mono select-none"
            style={{
              color: `${COLORS[i % COLORS.length]}18`,
              left: `${2 + ((i * 4.3) % 93)}%`,
              top: `${8 + ((i * 7.7) % 82)}%`,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div ref={ref} className="max-w-5xl mx-auto relative" style={{ zIndex: 5 }}>
        {/* Pipeline rail (desktop) */}
        <div className="hidden md:block absolute left-5 top-4 bottom-4 w-px overflow-hidden">
          <div
            className="pipeline-rail w-full h-full"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.35), rgba(99,102,241,0.2), rgba(6,182,212,0.3), transparent)",
              backgroundSize: "100% 50%",
            }}
          />
        </div>

        {/* Project rows */}
        <div className="space-y-5">
          {projects.map((p, i) => {
            const color = COLORS[i % COLORS.length];
            const isOpen = active === i;

            return (
              <div key={i} className="proj-row relative md:pl-16">
                {/* Pipeline dot */}
                <button
                  onClick={() => toggle(i)}
                  className="pipe-dot absolute left-5 top-8 z-20 hidden md:flex items-center justify-center w-8 h-8 -translate-x-1/2"
                  aria-label={`Toggle ${p.title}`}
                >
                  <div
                    className="rounded-full transition-all duration-400"
                    style={{
                      width: isOpen ? 16 : 12,
                      height: isOpen ? 16 : 12,
                      background: color,
                      boxShadow: isOpen
                        ? `0 0 24px ${color}, 0 0 48px ${color}40`
                        : `0 0 8px ${color}50`,
                    }}
                  />
                </button>

                {/* Card */}
                <div
                  className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
                  style={{
                    background: isOpen ? `${color}06` : "rgba(255,255,255,0.015)",
                    border: `1px solid ${isOpen ? `${color}22` : "rgba(255,255,255,0.05)"}`,
                    boxShadow: isOpen ? `0 0 40px ${color}08` : "none",
                  }}
                  onClick={() => toggle(i)}
                >
                  {/* Accent bar */}
                  <div
                    className="h-[2px] transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                      opacity: isOpen ? 1 : 0.25,
                    }}
                  />

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <span
                          className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg shrink-0 mt-0.5"
                          style={{ color, background: `${color}10`, border: `1px solid ${color}20` }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-text-primary group-hover:text-primary-light transition-colors truncate">
                            {p.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2.5 mt-1">
                            <span
                              className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full"
                              style={{ color: `${color}bb`, background: `${color}08`, border: `1px solid ${color}12` }}
                            >
                              {p.type}
                            </span>
                            <span className="text-xs font-mono text-text-muted">{p.period}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {p.impact && <ImpactBadge text={p.impact} color={color} />}
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                          style={{
                            background: `${color}10`,
                            transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                          }}
                        >
                          <svg className="w-3 h-3" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-text-secondary leading-relaxed md:ml-10">{p.description}</p>

                    {/* Expandable tech stack */}
                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out md:ml-10"
                      style={{
                        maxHeight: isOpen ? "200px" : "0px",
                        opacity: isOpen ? 1 : 0,
                        marginTop: isOpen ? "16px" : "0px",
                      }}
                    >
                      <div className="pt-4" style={{ borderTop: `1px solid ${color}12` }}>
                        <span
                          className="text-[10px] font-mono uppercase tracking-widest block mb-3"
                          style={{ color: `${color}90` }}
                        >
                          stack technique
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {p.stack.map((t, j) => (
                            <Tag key={j} name={t} color={color} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;
