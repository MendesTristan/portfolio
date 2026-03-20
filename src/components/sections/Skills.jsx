import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../i18n";
import SectionWrapper from "../ui/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

const CLOUD_TITLES = ["Google Cloud (GCP)", "Microsoft Azure"];

const CLOUD_COLORS = {
  "Google Cloud (GCP)": "#4285f4",
  "Microsoft Azure": "#0078d4",
};

const CORE_COLORS = ["#8b5cf6", "#6366f1", "#10b981", "#f59e0b", "#ec4899", "#f97316", "#22d3ee"];

const ICONS = {
  code: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>),
  database: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>),
  cloud: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>),
  rocket: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>),
  brain: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>),
  globe: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9 9 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>),
  link: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.686-4.514a4.5 4.5 0 00-6.364-6.364L4.5 6.545a4.5 4.5 0 001.242 7.244" /></svg>),
  wrench: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" /></svg>),
};

const CheckBadge = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SubsectionTitle = ({ children }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-8 h-px bg-gradient-to-r from-primary to-transparent" />
    <h3 className="text-xs font-semibold text-text-muted tracking-[0.15em] uppercase font-mono">{children}</h3>
  </div>
);

const CloudCard = ({ cat, certLabel, certName }) => {
  const color = CLOUD_COLORS[cat.title];
  return (
    <div className="skill-cloud-card h-full flex flex-col" style={{ "--cloud-color": color, "--cloud-color-dim": `${color}15` }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex-center shrink-0" style={{ background: `${color}15`, color }}>{ICONS[cat.icon]}</div>
          <div>
            <h4 className="font-semibold text-text-primary text-sm sm:text-base leading-tight">{cat.title}</h4>
            <p className="text-xs font-mono text-text-muted mt-0.5">{certName}</p>
          </div>
        </div>
        <span className="skill-cert-badge shrink-0 self-start sm:self-auto" style={{ borderColor: `${color}40`, color }}><CheckBadge />{certLabel}</span>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2 content-start mt-auto">
        {cat.skills.map((skill) => (<span key={skill} className="skill-tag" style={{ "--tag-color": color }}>{skill}</span>))}
      </div>
    </div>
  );
};

const CoreCard = ({ cat, color }) => (
  <div className="h-full flex flex-col rounded-xl p-4 sm:p-5 bg-white/[0.02] border border-white/[0.05] transition-all duration-300 hover:border-[var(--card-color)]" style={{ "--card-color": color }}>
    <div className="flex items-center gap-2.5 mb-3">
      <span style={{ color }} className="shrink-0">{ICONS[cat.icon]}</span>
      <h4 className="text-xs font-bold tracking-[0.08em] uppercase" style={{ color }}>{cat.title}</h4>
    </div>
    <div className="flex flex-wrap gap-1.5 sm:gap-2 content-start mt-auto">
      {cat.skills.map((skill) => (
        <span key={skill} className="text-xs font-mono px-2 sm:px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-text-muted transition-colors duration-200 hover:text-[var(--card-color)] hover:border-[var(--card-color)]" style={{ "--card-color": color }}>{skill}</span>
      ))}
    </div>
  </div>
);

const Skills = () => {
  const ref = useRef(null);
  const { t } = useLanguage();

  const skillsT = t("skills");
  const categories = t("skillCategories");
  const cloudConfigT = t("cloudConfig");

  const cloudSkills = categories.filter((c) => CLOUD_TITLES.includes(c.title));
  const coreSkills = categories.filter((c) => !CLOUD_TITLES.includes(c.title));

  useGSAP(() => {
    gsap.from(".skill-cloud-card", {
      y: 40, duration: 0.6, stagger: 0.15, ease: "power3.out",
      immediateRender: false,
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
    gsap.from(".skill-core-item", {
      y: 30, duration: 0.4, stagger: 0.06, ease: "power3.out",
      immediateRender: false,
      scrollTrigger: { trigger: ".skill-core-grid", start: "top 90%" },
    });
  }, { scope: ref });

  return (
    <SectionWrapper id="skills" title={skillsT.title} subtitle={skillsT.subtitle}>
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="mb-14">
          <SubsectionTitle>{skillsT.cloudPlatforms}</SubsectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
            {cloudSkills.map((cat) => (
              <CloudCard key={cat.title} cat={cat} certLabel={skillsT.certified} certName={cloudConfigT[cat.title]?.certName || ""} />
            ))}
          </div>
        </div>
        <div>
          <SubsectionTitle>{skillsT.technicalSkills}</SubsectionTitle>
          <div className="skill-core-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {coreSkills.map((cat, i) => (
              <div key={cat.title} data-gsap className="skill-core-item h-full">
                <CoreCard cat={cat} color={CORE_COLORS[i % CORE_COLORS.length]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;
