import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMousePosition } from "../../hooks";
import SectionWrapper from "../ui/SectionWrapper";
import SceneBg from "../three/SceneBg";
import { projects } from "../../constants/data";

gsap.registerPlugin(ScrollTrigger);

const ACCENT_COLORS = ["#8b5cf6", "#6366f1", "#06b6d4", "#10b981", "#f59e0b"];
const TAG_CLS = "text-xs font-mono px-2.5 py-1 rounded-md bg-primary/[0.08] text-primary-light border border-primary/15";

const Projects = () => {
  const inner = useRef(null);
  const mouse = useMousePosition(0.02);

  useGSAP(() => {
    gsap.from(".proj-card", {
      y: 40, duration: 0.5, stagger: 0.12, ease: "power3.out",
      immediateRender: false,
      scrollTrigger: { trigger: inner.current, start: "top 85%" },
    });
  }, { scope: inner });

  return (
    <SectionWrapper id="projects" title="Projets" subtitle="Sélection de réalisations techniques.">
      <SceneBg mouseX={mouse.x} mouseY={mouse.y} variant="particles" />

      <div ref={inner} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => {
          const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
          return (
            <div key={i} data-gsap className="proj-card rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.05] transition-all duration-300 hover:border-primary/20 hover:-translate-y-0.5 group">
              <div className="h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md" style={{ color, background: `${color}12`, border: `1px solid ${color}20` }}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-base font-bold text-text-primary group-hover:text-primary-light transition-colors">{p.title}</h3>
                  </div>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="text-text-muted hover:text-primary-light transition-colors shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-2">{p.stack.map((t, j) => <span key={j} className={TAG_CLS}>{t}</span>)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default Projects;
