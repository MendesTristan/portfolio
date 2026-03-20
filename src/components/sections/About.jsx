import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMousePosition } from "../../hooks";
import { useLanguage } from "../../i18n";
import SectionWrapper from "../ui/SectionWrapper";
import SceneBg from "../three/SceneBg";

gsap.registerPlugin(ScrollTrigger);

const CARD_CLS = "flex items-center gap-3 px-3 sm:px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] transition-all duration-300 hover:border-primary/20";

const extraIcons = {
  globe: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9 9 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  dumbbell: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  bitcoin: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
  languages: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
    </svg>
  ),
};

const anim = (targets, vars, scope) => {
  gsap.from(targets, {
    y: vars.y ?? 30,
    x: vars.x ?? 0,
    duration: vars.duration ?? 0.6,
    stagger: vars.stagger ?? 0,
    ease: "power3.out",
    immediateRender: false,
    scrollTrigger: {
      trigger: vars.trigger ?? scope,
      start: vars.start ?? "top 85%",
      toggleActions: "play none none none",
    },
  });
};

const RenderBio = ({ html }) => {
  const rendered = html
    .replace(/<hl>/g, '<span class="text-primary-light font-medium">')
    .replace(/<\/hl>/g, "</span>");
  return <p data-gsap className="about-p text-text-secondary text-sm sm:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: rendered }} />;
};

const About = () => {
  const inner = useRef(null);
  const mouse = useMousePosition(0.02);
  const { t } = useLanguage();

  const aboutT = t("about");
  const statsData = t("stats");
  const extras = t("aboutExtras");
  const formationsData = t("formations");
  const certsData = t("certifications");

  useGSAP(() => {
    const s = inner.current;
    anim(".about-p", { stagger: 0.1 }, s);
    anim(".stat-card", { y: 40, stagger: 0.08, trigger: ".stat-card" }, s);
    anim(".extra-card", { y: 25, duration: 0.4, stagger: 0.06, trigger: ".extra-card", start: "top 90%" }, s);
    anim(".edu-item", { x: 25, y: 0, stagger: 0.12, trigger: ".edu-timeline" }, s);
  }, { scope: inner });

  return (
    <SectionWrapper id="about" title={aboutT.title} subtitle={aboutT.subtitle}>
      <SceneBg mouseX={mouse.x} mouseY={mouse.y} variant="particles" />

      <div ref={inner} className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-12 sm:mb-16">
          {statsData.map(({ value, label }, i) => (
            <div key={i} data-gsap className="stat-card rounded-xl p-4 sm:p-5 text-center bg-white/[0.02] border border-white/[0.05] transition-all duration-300 hover:border-primary/20">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text mb-1">{value}</div>
              <div className="text-text-muted text-[10px] sm:text-xs">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-3 space-y-6">
            {aboutT.bio.map((b, i) => <RenderBio key={i} html={b} />)}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4">
              {extras.map((item, i) => (
                <div key={i} data-gsap className={`extra-card ${CARD_CLS}`}>
                  <span className="text-primary-light shrink-0">{extraIcons[item.icon]}</span>
                  <div className="min-w-0">
                    <span className="text-[10px] sm:text-xs text-text-muted uppercase tracking-[0.15em]">{item.label}</span>
                    <p className="text-text-primary text-xs sm:text-sm font-medium truncate">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-text-muted mb-5 flex items-center gap-2">
              <div className="w-6 h-px bg-primary/40" />
              {aboutT.education}
            </h3>

            <div className="edu-timeline relative pl-7 mb-10">
              <div className="absolute left-[5px] top-1 bottom-1 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
              {formationsData.map((f, i) => (
                <div key={i} data-gsap className="edu-item relative mb-8 last:mb-0">
                  <div className="absolute -left-7 top-1.5 w-[13px] h-[13px] rounded-full bg-primary border-2 border-background z-10" />
                  <span className="text-xs font-mono text-text-muted">{f.period}</span>
                  <h4 className="text-sm sm:text-base font-semibold text-text-primary mt-0.5 leading-snug">{f.title}</h4>
                  <p className="text-primary-light text-xs sm:text-sm mt-0.5">{f.school}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-text-muted mb-4 flex items-center gap-2">
              <div className="w-6 h-px bg-primary/40" />
              {aboutT.certifications}
            </h3>

            <div className="space-y-4">
              {certsData.map((c, i) => (
                <div key={i} className={CARD_CLS}>
                  <div className="w-8 h-8 rounded-xl bg-primary/[0.08] flex-center shrink-0">
                    <svg className="w-4 h-4 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-text-primary truncate">{c.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-text-muted">{c.issuer}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-green-500/10 text-green-400">{aboutT.obtained}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
