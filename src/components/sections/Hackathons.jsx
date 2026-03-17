import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../ui/SectionWrapper";
import { hackathons } from "../../constants/data";

gsap.registerPlugin(ScrollTrigger);

/* ── Brand color palettes ── */
const THEMES = {
  google: {
    dots: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"],
    gradient: "linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335)",
    accentA: "#4285F4",
    accentB: "#34A853",
    cardBg: "rgba(66,133,244,0.02)",
    cardBorder: "rgba(66,133,244,0.08)",
    tagBg: "rgba(66,133,244,0.08)",
    tagBorder: "rgba(66,133,244,0.18)",
    tagText: "#93b4f4",
    orgBg: "rgba(66,133,244,0.06)",
    orgBorder: "rgba(66,133,244,0.12)",
    orgText: "#79aef7",
    overlay: "linear-gradient(to top, rgba(3,0,20,0.8), transparent 55%)",
  },
  ey: {
    dots: ["#FFE600", "#29B5E8", "#00A651"],
    gradient: "linear-gradient(135deg, #FFE600, #29B5E8, #00A651)",
    accentA: "#FFE600",
    accentB: "#29B5E8",
    cardBg: "rgba(255,230,0,0.012)",
    cardBorder: "rgba(255,230,0,0.06)",
    tagBg: "rgba(255,230,0,0.06)",
    tagBorder: "rgba(255,230,0,0.14)",
    tagText: "#ffe566",
    orgBg: "rgba(255,230,0,0.06)",
    orgBorder: "rgba(255,230,0,0.1)",
    orgText: "#ffe566",
    overlay: "linear-gradient(to top, rgba(3,0,20,0.85), transparent 50%, rgba(255,230,0,0.02))",
  },
};

/* ── Decorative floating orbs ── */
const FloatingOrbs = ({ colors }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {colors.map((c, i) => (
      <div
        key={i}
        className="hack-orb absolute rounded-full blur-3xl"
        style={{
          width: 90 + i * 35,
          height: 90 + i * 35,
          background: `radial-gradient(circle, ${c}20, transparent 70%)`,
          top: `${8 + i * 30}%`,
          [i % 2 === 0 ? "left" : "right"]: `${3 + i * 14}%`,
        }}
      />
    ))}
  </div>
);

/* ── Colored dot rail ── */
const BrandRail = ({ colors }) => (
  <div className="flex items-center gap-2.5 mb-6">
    {colors.map((c, i) => (
      <div
        key={i}
        className="hack-dot w-2 h-2 rounded-full"
        style={{ background: c, boxShadow: `0 0 10px ${c}50` }}
      />
    ))}
    <div
      className="h-px flex-1 ml-3"
      style={{ background: `linear-gradient(90deg, ${colors[0]}35, transparent)` }}
    />
  </div>
);

/* ── Organizer pills ── */
const OrgPills = ({ organizers, theme }) => (
  <div className="flex flex-wrap gap-2 mb-2">
    {organizers.map((o) => (
      <span
        key={o}
        className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full"
        style={{ color: theme.orgText, background: theme.orgBg, border: `1px solid ${theme.orgBorder}` }}
      >
        {o}
      </span>
    ))}
  </div>
);

/* ── Date / location meta ── */
const Meta = ({ date, location, colors }) => (
  <div className="flex flex-wrap gap-4">
    <span className="flex items-center gap-2 text-xs font-mono text-text-muted">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: colors[0] }} />
      {date}
    </span>
    <span className="flex items-center gap-2 text-xs font-mono text-text-muted">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: colors[1] || colors[0] }} />
      {location}
    </span>
  </div>
);

/* ── Highlight bullet ── */
const Bullet = ({ text, color }) => (
  <li className="hack-hl flex gap-3 group">
    <span
      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 group-hover:scale-[2] transition-transform duration-300"
      style={{ background: color, boxShadow: `0 0 8px ${color}50` }}
    />
    <span className="text-sm text-text-secondary leading-relaxed">{text}</span>
  </li>
);

/* ── Tech tag ── */
const Tag = ({ name, theme }) => (
  <span
    className="hack-tag text-xs font-mono px-2.5 py-1 rounded-lg cursor-default hover:scale-105 transition-transform duration-300"
    style={{ background: theme.tagBg, border: `1px solid ${theme.tagBorder}`, color: theme.tagText }}
  >
    {name}
  </span>
);

/* ══════════════════════════════════════════════════════
   3D PHOTO STACK – navigable stacked cards
   ══════════════════════════════════════════════════════ */
const PhotoStack = ({ photos, title, theme }) => {
  const [cur, setCur] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const box = useRef(null);

  const onMove = useCallback((e) => {
    if (!box.current) return;
    const r = box.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -5,
      y: ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 5,
    });
  }, []);

  const step = useCallback(
    (d) => (e) => {
      e?.stopPropagation();
      setCur((c) => (c + d + photos.length) % photos.length);
    },
    [photos.length],
  );

  return (
    <div
      ref={box}
      className="relative w-full aspect-[4/3] cursor-pointer select-none"
      style={{ perspective: "1000px" }}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={step(1)}
    >
      {photos.map((p, i) => {
        const off = i - cur;
        const abs = Math.abs(off);
        const active = i === cur;
        return (
          <div
            key={i}
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              transform: [
                `rotateX(${active ? tilt.x : 0}deg)`,
                `rotateY(${active ? tilt.y : 0}deg)`,
                `translateZ(${active ? 0 : -35 * abs}px)`,
                `translateX(${off * 10}px)`,
                `translateY(${off * 5}px)`,
                `scale(${active ? 1 : 0.94 - abs * 0.02})`,
              ].join(" "),
              transition: "transform .5s cubic-bezier(.4,0,.2,1), opacity .4s, filter .4s",
              zIndex: photos.length - abs,
              opacity: abs > 2 ? 0 : 1 - abs * 0.25,
              filter: active ? "none" : `brightness(${0.55 - abs * 0.08})`,
            }}
          >
            <img src={p} alt={`${title} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            {active && <div className="absolute inset-0" style={{ background: theme.overlay }} />}
          </div>
        );
      })}

      {photos.length > 1 && (
        <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-center gap-3">
          <button onClick={step(-1)} className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCur(i); }}
                className="h-1 rounded-full transition-all duration-300"
                style={{ width: i === cur ? 18 : 6, background: i === cur ? theme.accentA : "rgba(255,255,255,0.3)" }}
              />
            ))}
          </div>
          <button onClick={step(1)} className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}

      <span className="absolute top-3 right-3 z-20 text-[10px] font-mono text-white/40 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-md">
        {String(cur + 1).padStart(2, "0")}/{String(photos.length).padStart(2, "0")}
      </span>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   3D BANNER – tilt-on-hover hero image
   ══════════════════════════════════════════════════════ */
const Banner3D = ({ src, title, theme }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -3,
      y: ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 3,
    });
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full h-52 sm:h-64 md:h-80 overflow-hidden"
      style={{ perspective: "1200px" }}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <img src={src} alt={title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: theme.overlay }} />
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   LAYOUT A — Split: 3D photo stack left + content right
   (Deloitte x Google Cloud)
   ══════════════════════════════════════════════════════ */
const LayoutSplit = ({ hack, theme, num }) => (
  <article
    className="hack-card relative rounded-3xl overflow-hidden"
    style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}
  >
    <FloatingOrbs colors={theme.dots} />
    <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: theme.gradient }} />

    <span
      className="absolute top-4 right-6 text-[80px] md:text-[120px] font-black leading-none select-none pointer-events-none opacity-[0.03]"
      style={{ color: theme.accentA }}
    >
      {num}
    </span>

    <div className="relative z-10 p-6 md:p-10">
      <BrandRail colors={theme.dots} />
      <OrgPills organizers={hack.organizers} theme={theme} />
      <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-1">{hack.title}</h3>
      <div className="mb-8">
        <Meta date={hack.date} location={hack.location} colors={theme.dots} />
      </div>

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-start mb-8">
        <PhotoStack photos={hack.photos} title={hack.title} theme={theme} />
        <div className="space-y-5">
          <p className="text-sm text-text-secondary leading-relaxed">{hack.description}</p>
          <ul className="space-y-3">
            {hack.highlights.map((h, i) => (
              <Bullet key={i} text={h} color={theme.dots[i % theme.dots.length]} />
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-6" style={{ borderTop: `1px solid ${theme.cardBorder}` }}>
        {hack.stack.map((t, i) => (
          <Tag key={i} name={t} theme={theme} />
        ))}
      </div>
    </div>
  </article>
);

/* ══════════════════════════════════════════════════════
   LAYOUT B — Cinematic: banner hero + floating overlay
   (EY Open Science Challenge)
   ══════════════════════════════════════════════════════ */
const LayoutCinematic = ({ hack, theme, num }) => (
  <article
    className="hack-card relative rounded-3xl overflow-hidden"
    style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}
  >
    <FloatingOrbs colors={theme.dots} />
    <div className="absolute top-0 inset-x-0 h-[2px] z-20" style={{ background: theme.gradient }} />

    <Banner3D src={hack.photos[0]} title={hack.title} theme={theme} />

    <div className="relative z-10 -mt-20 mx-4 md:mx-8 mb-6 md:mb-10">
      <div
        className="rounded-2xl p-6 md:p-8"
        style={{
          background: "rgba(3,0,20,0.88)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${theme.cardBorder}`,
        }}
      >
        <span
          className="absolute top-4 right-6 text-[70px] md:text-[100px] font-black leading-none select-none pointer-events-none opacity-[0.03]"
          style={{ color: theme.accentA }}
        >
          {num}
        </span>

        <BrandRail colors={theme.dots} />
        <OrgPills organizers={hack.organizers} theme={theme} />
        <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-1">{hack.title}</h3>
        <div className="mb-6">
          <Meta date={hack.date} location={hack.location} colors={theme.dots} />
        </div>

        <p className="text-sm text-text-secondary leading-relaxed mb-8">{hack.description}</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4
              className="text-[10px] font-mono uppercase tracking-widest mb-4 flex items-center gap-2"
              style={{ color: theme.accentA }}
            >
              <span className="w-4 h-px" style={{ background: theme.accentA }} />
              Contributions
            </h4>
            <ul className="space-y-3">
              {hack.highlights.map((h, i) => (
                <Bullet key={i} text={h} color={theme.dots[i % theme.dots.length]} />
              ))}
            </ul>
          </div>
          <div>
            <h4
              className="text-[10px] font-mono uppercase tracking-widest mb-4 flex items-center gap-2"
              style={{ color: theme.accentB }}
            >
              <span className="w-4 h-px" style={{ background: theme.accentB }} />
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {hack.stack.map((t, i) => (
                <Tag key={i} name={t} theme={theme} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
);

/* ══════════════════════════════════════════════════════
   SECTION
   ══════════════════════════════════════════════════════ */
const LAYOUTS = { google: LayoutSplit, ey: LayoutCinematic };

const Hackathons = () => {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.from(".hack-card", {
      y: 80,
      scale: 0.96,
      duration: 0.9,
      stagger: 0.35,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: { trigger: ref.current, start: "top 82%" },
    });

    gsap.utils.toArray(".hack-orb").forEach((orb, i) => {
      gsap.to(orb, {
        y: "random(-30, 30)",
        x: "random(-25, 25)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.4,
      });
    });

    gsap.utils.toArray(".hack-dot").forEach((dot) => {
      gsap.to(dot, { scale: 1.5, duration: 0.8, repeat: -1, yoyo: true, ease: "power1.inOut" });
    });

    gsap.from(".hack-hl", {
      x: -20,
      duration: 0.4,
      stagger: 0.07,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: { trigger: ".hack-hl", start: "top 90%" },
    });

    gsap.from(".hack-tag", {
      scale: 0.85,
      duration: 0.3,
      stagger: 0.03,
      ease: "back.out(2)",
      immediateRender: false,
      scrollTrigger: { trigger: ".hack-tag", start: "top 92%" },
    });
  }, { scope: ref });

  return (
    <SectionWrapper id="hackathons" title="Concours & Hackathons" subtitle="Challenges techniques et moments forts.">
      <div ref={ref} className="max-w-5xl mx-auto space-y-16">
        {hackathons.map((hack, idx) => {
          const key = hack.theme || "google";
          const Layout = LAYOUTS[key] || LayoutSplit;
          return (
            <Layout
              key={idx}
              hack={hack}
              theme={THEMES[key] || THEMES.google}
              num={String(idx + 1).padStart(2, "0")}
            />
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default Hackathons;
