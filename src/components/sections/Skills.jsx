import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useMousePosition from "../ui/useMousePosition";
import SectionWrapper from "../ui/SectionWrapper";
import SceneBg from "../three/SceneBg";
import { skillCategories } from "../../constants/data";

gsap.registerPlugin(ScrollTrigger);

const iconPaths = {
  code: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
  database: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375",
  cloud: "M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z",
  rocket: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  globe: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582",
  link: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.822a4.5 4.5 0 00-6.364-6.364L4.5 8.25a4.5 4.5 0 006.364 6.364l1.757-1.757",
  wrench: "M11.42 15.17l-5.384 5.383a2.625 2.625 0 01-3.712-3.712l5.383-5.383m3.713 3.712a9.003 9.003 0 005.5-14.862 9.003 9.003 0 00-14.862 5.5m9.362 9.362l3.712 3.712a2.625 2.625 0 003.712-3.712l-3.712-3.712",
};

const Skills = () => {
  const inner = useRef(null);
  const mouse = useMousePosition(0.02);

  useGSAP(() => {
    gsap.from(".skill-row", {
      x: -40, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: inner.current, start: "top 80%" },
    });
  }, { scope: inner });

  return (
    <SectionWrapper id="skills" title="Compétences" subtitle="Stack technique & méthodologie.">
      <SceneBg mouseX={mouse.x} mouseY={mouse.y} variant="geometry" />

      <div ref={inner} className="max-w-4xl mx-auto">
        {/* Stack technique */}
        <div className="glass rounded-2xl p-6 md:p-8 glow mb-10">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-primary-light mb-8">
            Stack technique & méthodologie
          </h3>

          <div className="space-y-6">
            {skillCategories.map((cat, i) => (
              <div key={i} className="skill-row flex items-start gap-4 group">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/15 flex-center shrink-0 mt-0.5 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                  <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={iconPaths[cat.icon]} />
                  </svg>
                </div>

                {/* Title + skills inline */}
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary leading-relaxed">
                    <span className="font-bold">{cat.title}</span>
                    <span className="text-text-muted mx-1.5">—</span>
                    <span className="text-text-secondary">
                      {cat.skills.join(", ")}.
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default Skills;
