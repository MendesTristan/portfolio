import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useMousePosition from "../ui/useMousePosition";
import SectionWrapper from "../ui/SectionWrapper";
import SceneBg from "../three/SceneBg";
import { projects } from "../../constants/data";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const inner = useRef(null);
  const mouse = useMousePosition(0.02);

  useGSAP(() => {
    gsap.from(".proj-card", {
      y: 60, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: inner.current, start: "top 80%" },
    });
  }, { scope: inner });

  return (
    <SectionWrapper id="projects" title="Projets" subtitle="Data Engineering, mobile et DevOps.">
      <SceneBg mouseX={mouse.x} mouseY={mouse.y} variant="particles" />

      <div ref={inner} className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <div key={i} className="proj-card glass rounded-xl overflow-hidden glow-hover transition-all duration-300 group hover:-translate-y-1">
            <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary-light" />
            <div className="p-6">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-base font-bold text-text-primary group-hover:text-primary-light transition-colors">{p.title}</h3>
              </div>
              {p.period && <span className="text-text-muted text-xs font-mono">{p.period}</span>}
              <p className="text-text-secondary text-sm leading-relaxed mt-3 mb-5">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((t, j) => (
                  <span key={j} className="text-xs font-mono px-2 py-1 rounded-md bg-primary/10 text-primary-light border border-primary/20">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Projects;
