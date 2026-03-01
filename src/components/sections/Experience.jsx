import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useMousePosition from "../ui/useMousePosition";
import SectionWrapper from "../ui/SectionWrapper";
import SceneBg from "../three/SceneBg";
import { experiences } from "../../constants/data";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const inner = useRef(null);
  const mouse = useMousePosition(0.02);

  useGSAP(() => {
    gsap.from(".exp-card", {
      x: -50, opacity: 0, duration: 0.6, stagger: 0.18, ease: "power3.out",
      scrollTrigger: { trigger: inner.current, start: "top 80%" },
    });
  }, { scope: inner });

  return (
    <SectionWrapper id="experience" title="Expériences" subtitle="Parcours en finance de marché, data et développement.">
      <SceneBg mouseX={mouse.x} mouseY={mouse.y} variant="both" />

      <div ref={inner} className="max-w-3xl mx-auto relative">
        {/* Vertical line */}
        <div className="hidden md:block absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-primary/15 to-transparent" />

        {experiences.map((exp, i) => (
          <div key={i} className="exp-card relative flex gap-6 md:gap-8 mb-8 last:mb-0">
            {/* Dot */}
            <div className="hidden md:flex flex-col items-center pt-1.5">
              <div className="w-[10px] h-[10px] rounded-full bg-primary ring-4 ring-background z-10 shrink-0" />
            </div>

            {/* Card */}
            <div className="flex-1 glass rounded-xl p-6 glow-hover transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-base font-bold text-text-primary group-hover:text-primary-light transition-colors">{exp.title}</h3>
                  <p className="text-primary-light text-sm font-medium">{exp.company}{exp.location && ` · ${exp.location}`}</p>
                </div>
                <span className="text-text-muted text-xs font-mono bg-white/5 px-3 py-1 rounded-full whitespace-nowrap shrink-0">{exp.period}</span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.stack.map((t, j) => (
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

export default Experience;
