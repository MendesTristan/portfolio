import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMousePosition } from "../../hooks";
import SectionWrapper from "../ui/SectionWrapper";
import SceneBg from "../three/SceneBg";
import { experiences } from "../../constants/data";

gsap.registerPlugin(ScrollTrigger);

const TAG_CLS = "text-[10px] font-mono px-2 py-0.5 rounded-md bg-primary/[0.08] text-primary-light border border-primary/15";

const CheckIcon = () => (
  <svg className="w-3 h-3 text-primary-light shrink-0 mt-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const MissionList = ({ missions }) => (
  <div className="mb-4">
    <h4 className="text-[10px] font-mono uppercase tracking-[0.15em] text-text-muted mb-2">Missions</h4>
    <ul className="space-y-1.5">
      {missions.map((m, i) => (
        <li key={i} className="flex gap-2 text-xs text-text-secondary leading-relaxed"><CheckIcon /><span>{m}</span></li>
      ))}
    </ul>
  </div>
);

const HighlightBar = ({ highlights }) => (
  <div className="mb-4">
    <h4 className="text-[10px] font-mono uppercase tracking-[0.15em] text-text-muted mb-2">Impact</h4>
    <div className={`grid grid-cols-1 gap-2 ${highlights.length <= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
      {highlights.map((h, i) => (
        <div key={i} className="rounded-xl px-3 py-2.5 bg-primary/[0.05] border border-primary/10 transition-all duration-300 hover:border-primary/20">
          <p className="text-lg font-bold gradient-text leading-none mb-0.5">{h.metric}</p>
          <p className="text-[10px] font-semibold text-text-primary">{h.label}</p>
          <p className="text-[10px] text-text-muted leading-snug">{h.detail}</p>
        </div>
      ))}
    </div>
  </div>
);

const EnrichedCard = ({ exp }) => (
  <>
    <p className="text-text-secondary text-xs leading-relaxed mb-4 border-l-2 border-primary/20 pl-3 italic">{exp.context}</p>
    {exp.missions && <MissionList missions={exp.missions} />}
    {exp.highlights && <HighlightBar highlights={exp.highlights} />}
    <div className="flex flex-wrap gap-1.5">{exp.stack.map((t, j) => <span key={j} className={TAG_CLS}>{t}</span>)}</div>
  </>
);

const SimpleCard = ({ exp }) => (
  <>
    <p className="text-text-secondary text-xs leading-relaxed mb-3">{exp.description}</p>
    <div className="flex flex-wrap gap-1.5">{exp.stack.map((t, j) => <span key={j} className={TAG_CLS}>{t}</span>)}</div>
  </>
);

const Experience = () => {
  const inner = useRef(null);
  const mouse = useMousePosition(0.02);

  useGSAP(() => {
    gsap.from(".exp-card", {
      x: -40, duration: 0.5, stagger: 0.15, ease: "power3.out",
      immediateRender: false,
      scrollTrigger: { trigger: inner.current, start: "top 85%" },
    });
  }, { scope: inner });

  return (
    <SectionWrapper id="experience" title="Expérience professionnelle" subtitle="Parcours en finance de marché, data et développement.">
      <SceneBg mouseX={mouse.x} mouseY={mouse.y} variant="both" />

      <div ref={inner} className="max-w-5xl mx-auto relative">
        <div className="hidden md:block absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-primary/15 to-transparent" />

        {experiences.map((exp, i) => {
          const isEnriched = !!exp.missions;
          return (
            <div key={i} data-gsap className="exp-card relative flex gap-5 md:gap-7 mb-6 last:mb-0">
              <div className="hidden md:flex flex-col items-center pt-1.5">
                <div className={`rounded-full ring-4 ring-background z-10 shrink-0 ${isEnriched ? "w-[13px] h-[13px] bg-primary-light" : "w-[9px] h-[9px] bg-primary"}`} />
              </div>
              <div className="flex-1 rounded-xl p-5 bg-white/[0.02] border border-white/[0.05] transition-all duration-300 hover:border-primary/20 group">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-text-primary group-hover:text-primary-light transition-colors">{exp.title}</h3>
                    <p className="text-primary-light text-xs font-medium">{exp.company}{exp.location && ` · ${exp.location}`}</p>
                  </div>
                  <span className="text-text-muted text-[10px] font-mono bg-white/[0.04] px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">{exp.period}</span>
                </div>
                {isEnriched ? <EnrichedCard exp={exp} /> : <SimpleCard exp={exp} />}
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default Experience;
