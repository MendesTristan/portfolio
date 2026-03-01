import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useMousePosition from "../ui/useMousePosition";
import SectionWrapper from "../ui/SectionWrapper";
import SceneBg from "../three/SceneBg";
import { stats, aboutExtras, formations, certifications } from "../../constants/data";

gsap.registerPlugin(ScrollTrigger);

const extraIcons = {
  globe: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9 9 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  dumbbell: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  bitcoin: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
  languages: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
    </svg>
  ),
};

const About = () => {
  const inner = useRef(null);
  const mouse = useMousePosition(0.02);

  useGSAP(() => {
    gsap.from(".about-p", { y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: inner.current, start: "top 80%" } });
    gsap.from(".stat-card", { y: 50, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".stat-card", start: "top 85%" } });
    gsap.from(".highlight-badge", { y: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".highlight-badge", start: "top 88%" } });
    gsap.from(".extra-card", { y: 30, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ".extra-card", start: "top 88%" } });
    gsap.from(".edu-item", { x: 30, opacity: 0, duration: 0.5, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".edu-timeline", start: "top 80%" } });
  }, { scope: inner });

  return (
    <SectionWrapper id="about" title="À propos" subtitle="Data Engineering, cloud, et bien plus.">
      <SceneBg mouseX={mouse.x} mouseY={mouse.y} variant="particles" />

      <div ref={inner}>
        {/* Top row: bio left, education timeline right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Left column: bio text */}
          <div className="space-y-6">
            <p className="about-p text-text-secondary leading-relaxed">
              Ingénieur <span className="text-primary-light font-medium">Data &amp; Cloud</span> (EFREI Paris, Bac+5), je conçois et industrialise des <span className="text-primary-light font-medium">pipelines ETL/ELT</span>, des architectures <span className="text-primary-light font-medium">data lake</span> et des workflows d&apos;orchestration sur environnements <span className="text-primary-light font-medium">multi-cloud</span>. Forgé chez <span className="text-primary-light font-medium">BNP Paribas CIB</span>, je maîtrise les contraintes de volumétrie, de qualité de données et de conformité propres à la finance de marché.
            </p>
            <p className="about-p text-text-secondary leading-relaxed">
              Certifié <span className="text-primary-light font-medium">Microsoft Azure AZ-900</span> et en cours de certification <span className="text-primary-light font-medium">GCP Associate Data Practitioner</span>, je m&apos;appuie sur les standards du secteur pour livrer des solutions fiables et scalables.
            </p>

            {/* Highlight badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="highlight-badge glass rounded-xl p-4 text-center glow-hover transition-all duration-300">
                <div className="text-2xl font-bold gradient-text">2</div>
                <div className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Certifications</div>
              </div>
              <div className="highlight-badge glass rounded-xl p-4 text-center glow-hover transition-all duration-300">
                <div className="text-[10px] text-text-muted uppercase tracking-widest">Stack</div>
                <div className="text-base font-bold text-text-primary mt-1">Multi-Cloud</div>
              </div>

            </div>

            {/* Extras */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {aboutExtras.map((item, i) => (
                <div key={i} className="extra-card glass rounded-lg p-4 flex items-start gap-3 glow-hover transition-all duration-300">
                  <div className="text-primary-light mt-0.5 shrink-0">{extraIcons[item.icon]}</div>
                  <div>
                    <span className="text-xs text-text-muted uppercase tracking-wider">{item.label}</span>
                    <p className="text-text-primary text-sm font-medium mt-0.5">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {stats.map(({ value, label }, i) => (
                <div key={i} className="stat-card glass rounded-xl p-4 text-center glow-hover transition-all duration-300">
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">{value}</div>
                  <div className="text-text-muted text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: vertical education timeline */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-8 flex items-center gap-2">
              <div className="w-8 h-0.5 bg-primary rounded-full" />
              Formation
            </h3>

            <div className="edu-timeline relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-primary/50 via-primary/25 to-transparent" />

              {formations.map((f, i) => (
                <div key={i} className="edu-item relative mb-10 last:mb-0">
                  {/* Dot */}
                  <div className="absolute -left-8 top-1 w-[15px] h-[15px] rounded-full bg-primary border-[3px] border-background z-10" />

                  {/* Period */}
                  <span className="text-xs font-mono text-text-muted">{f.period}</span>

                  {/* Title */}
                  <h4 className="text-base font-bold text-text-primary mt-1">{f.title}</h4>

                  {/* School */}
                  <p className="text-primary-light text-sm font-medium mt-0.5">{f.school}</p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
                <div className="w-8 h-0.5 bg-primary rounded-full" />
                Certifications
              </h3>

              <div className="space-y-4">
                {certifications.map((c, i) => (
                  <div key={i} className="cert-card glass rounded-xl p-4 flex items-center gap-4 glow-hover transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-primary/15 flex-center shrink-0">
                      <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-text-primary">{c.name}</h4>
                      <p className="text-text-muted text-xs mt-0.5">{c.issuer}</p>
                      <span className={`inline-block mt-1 text-xs font-mono px-2 py-0.5 rounded ${c.status === "obtained" ? "bg-green-500/15 text-green-400" : "bg-primary/15 text-primary-light"}`}>
                        {c.status === "obtained" ? "Obtenue" : "En cours"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
