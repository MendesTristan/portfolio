import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMousePosition } from "../../hooks";
import { useLanguage } from "../../i18n";
import SectionWrapper from "../ui/SectionWrapper";
import SceneBg from "../three/SceneBg";

gsap.registerPlugin(ScrollTrigger);

const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];

const DATA_TOKENS = [
  "0x4F2A", "10110", ">>", "SELECT", "</>", "async",
  "deploy", "0xFF", "{}", "push", "BUILD", "▶ test",
  "npm run", "λ", "::pipe", "ETL", "API", "SQL",
  "0b1010", "merge", "→", "∞", "docker", "k8s",
];

/* ═══════════════════════════════════════════════
   VISUALIZATION DATA PER PROJECT
   ═══════════════════════════════════════════════ */
const VIZ_CONFIGS = [
  {
    radar: {
      axes: ["Europe", "APAC", "Poland", "Fortis", "NAR"],
      values: [98, 95, 100, 92, 97],
    },
    bars: [
      { label: "TradObl", v: 100 },
      { label: "ClearObl", v: 100 },
      { label: "Elig.", v: 95 },
      { label: "Daily", v: 100 },
      { label: "Monthly", v: 90 },
      { label: "Exclus.", v: 85 },
    ],
    gauge: { value: 100 },
    metrics: [
      { value: 6, suffix: "", key: "scenarios" },
      { value: 5, suffix: "", key: "zones" },
      { value: 100, suffix: "%", key: "compliance" },
    ],
  },
  {
    timeline: [
      { label: "Nov", v: 25 },
      { label: "Dec", v: 55 },
      { label: "Jan", v: 82 },
      { label: "Feb", v: 100 },
    ],
    gauge: { value: 100 },
    metrics: [
      { value: 4, suffix: " mo", key: "delivery" },
      { value: 5, suffix: "", key: "team" },
    ],
  },
  {
    comparison: { before: 100, after: 20 },
    stages: ["Build", "Test", "Deploy", "Monitor"],
    gauge: { value: 80 },
    metrics: [
      { value: 80, suffix: "%", key: "reduction" },
      { value: 0, suffix: "", key: "errors" },
      { value: 1, suffix: "-click", key: "deploy" },
    ],
  },
  {
    models: [
      { name: "RF", full: "Random Forest", acc: 87 },
      { name: "kNN", full: "k-Nearest N.", acc: 78 },
      { name: "SVM", full: "Support Vec.", acc: 82 },
    ],
    scatter: true,
    gauge: { value: 85 },
    metrics: [
      { value: 0.85, suffix: "", key: "score", decimal: true },
      { value: 87, suffix: "%", key: "bestModel" },
      { value: 3, suffix: "", key: "models" },
    ],
  },
];

/* ═══════════════════════════════════════════════
   CINEMATIC SOUND ENGINE
   ═══════════════════════════════════════════════ */
const playCinematicOpen = (idx) => {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const now = ctx.currentTime;

    const sub = ctx.createOscillator();
    const sg = ctx.createGain();
    sub.type = "sine";
    sub.frequency.setValueAtTime(40 + idx * 12, now);
    sub.frequency.exponentialRampToValueAtTime(80 + idx * 15, now + 0.15);
    sub.frequency.exponentialRampToValueAtTime(28, now + 0.45);
    sg.gain.setValueAtTime(0.07, now);
    sg.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    sub.connect(sg).connect(ctx.destination);
    sub.start(now);
    sub.stop(now + 0.55);

    const sh = ctx.createOscillator();
    const shg = ctx.createGain();
    sh.type = "triangle";
    sh.frequency.setValueAtTime(280 + idx * 110, now);
    sh.frequency.exponentialRampToValueAtTime(1400 + idx * 60, now + 0.1);
    sh.frequency.exponentialRampToValueAtTime(500, now + 0.3);
    shg.gain.setValueAtTime(0.018, now);
    shg.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    sh.connect(shg).connect(ctx.destination);
    sh.start(now);
    sh.stop(now + 0.4);

    const p = ctx.createOscillator();
    const pg = ctx.createGain();
    p.type = "sine";
    p.frequency.setValueAtTime(1800 + idx * 220, now + 0.04);
    p.frequency.exponentialRampToValueAtTime(800, now + 0.14);
    pg.gain.setValueAtTime(0.012, now + 0.04);
    pg.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    p.connect(pg).connect(ctx.destination);
    p.start(now + 0.04);
    p.stop(now + 0.25);

    const bs = ctx.sampleRate * 0.08;
    const buf = ctx.createBuffer(1, bs, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bs; i++) d[i] = (Math.random() * 2 - 1) * 0.25;
    const ns = ctx.createBufferSource();
    ns.buffer = buf;
    const ng = ctx.createGain();
    const nf = ctx.createBiquadFilter();
    nf.type = "bandpass";
    nf.frequency.value = 2200 + idx * 400;
    nf.Q.value = 4;
    ng.gain.setValueAtTime(0.008, now);
    ng.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    ns.connect(nf).connect(ng).connect(ctx.destination);
    ns.start(now);
    setTimeout(() => ctx.close(), 900);
  } catch (_) { /* noop */ }
};

const playDataTick = (idx, delay = 0) => {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const now = ctx.currentTime + delay;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(900 + idx * 150, now);
    o.frequency.exponentialRampToValueAtTime(1500 + idx * 100, now + 0.03);
    o.frequency.exponentialRampToValueAtTime(500, now + 0.1);
    g.gain.setValueAtTime(0.006, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    o.connect(g).connect(ctx.destination);
    o.start(now);
    o.stop(now + 0.15);
    setTimeout(() => ctx.close(), 400 + delay * 1000);
  } catch (_) { /* noop */ }
};

/* ═══════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════ */
const AnimCounter = ({ value, suffix = "", decimal = false, color, active }) => {
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    if (active && !done.current && ref.current) {
      done.current = true;
      const o = { v: 0 };
      gsap.to(o, {
        v: value,
        duration: 1.6,
        ease: "power2.out",
        delay: 0.3,
        onUpdate: () => {
          if (ref.current) ref.current.textContent = (decimal ? o.v.toFixed(2) : Math.round(o.v)) + suffix;
        },
      });
    }
    if (!active) done.current = false;
  }, [active, value, suffix, decimal]);

  return <span ref={ref} style={{ color }} className="text-xl sm:text-2xl md:text-3xl font-black tabular-nums">0{suffix}</span>;
};

/* ═══════════════════════════════════════════════
   SVG: RADAR CHART
   ═══════════════════════════════════════════════ */
const radarPt = (cx, cy, r, i, n) => {
  const a = (2 * Math.PI * i) / n - Math.PI / 2;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};

const RadarChart = ({ axes, values, color, active }) => {
  const polyRef = useRef(null);
  const n = axes.length;
  const cx = 100, cy = 100, R = 78;

  const grids = [0.33, 0.66, 1].map((s) =>
    Array.from({ length: n }, (_, i) => radarPt(cx, cy, R * s, i, n)).map((p) => p.join(",")).join(" ")
  );

  const dataPoints = values.map((v, i) => radarPt(cx, cy, R * (v / 100), i, n));
  const dataPoly = dataPoints.map((p) => p.join(",")).join(" ");

  useEffect(() => {
    if (active && polyRef.current) {
      gsap.fromTo(polyRef.current,
        { opacity: 0, scale: 0.3, transformOrigin: "100px 100px" },
        { opacity: 1, scale: 1, duration: 1.2, ease: "elastic.out(1,0.5)", delay: 0.4 }
      );
    }
  }, [active]);

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[200px] mx-auto">
      {grids.map((pts, gi) => (
        <polygon key={gi} points={pts} fill="none" stroke={`${color}15`} strokeWidth={0.5} />
      ))}
      {Array.from({ length: n }, (_, i) => {
        const [x, y] = radarPt(cx, cy, R, i, n);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={`${color}12`} strokeWidth={0.5} />;
      })}
      <polygon ref={polyRef} points={dataPoly} fill={`${color}18`} stroke={color} strokeWidth={1.5} opacity={0} />
      {dataPoints.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={3} fill={color} opacity={active ? 1 : 0} className="transition-opacity duration-500 delay-700" />
          <text
            x={radarPt(cx, cy, R + 14, i, n)[0]}
            y={radarPt(cx, cy, R + 14, i, n)[1]}
            textAnchor="middle"
            dominantBaseline="central"
            fill={`${color}cc`}
            fontSize={7}
            fontFamily="JetBrains Mono, monospace"
          >
            {axes[i]}
          </text>
        </g>
      ))}
    </svg>
  );
};

/* ═══════════════════════════════════════════════
   SVG: BAR CHART
   ═══════════════════════════════════════════════ */
const BarChart = ({ bars, color, active }) => {
  const barsRef = useRef([]);
  const w = 26, gap = 6, h = 80, base = 95;

  useEffect(() => {
    if (active) {
      barsRef.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(el, { scaleY: 0 }, {
            scaleY: 1,
            duration: 0.8,
            ease: "back.out(1.5)",
            delay: 0.5 + i * 0.08,
            transformOrigin: "bottom",
          });
          playDataTick(i, 0.5 + i * 0.08);
        }
      });
    }
  }, [active]);

  const totalW = bars.length * w + (bars.length - 1) * gap;
  const startX = (200 - totalW) / 2;

  return (
    <svg viewBox="0 0 200 110" className="w-full h-full max-w-[260px] mx-auto">
      <line x1={startX - 4} y1={base} x2={startX + totalW + 4} y2={base} stroke={`${color}20`} strokeWidth={0.5} />
      {bars.map((b, i) => {
        const x = startX + i * (w + gap);
        const barH = (b.v / 100) * h;
        return (
          <g key={i}>
            <rect x={x} y={base - barH} width={w} height={barH} rx={3}
              ref={(el) => { barsRef.current[i] = el; }}
              fill={`url(#barG${i})`} opacity={active ? 1 : 0}
            />
            <defs>
              <linearGradient id={`barG${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                <stop offset="100%" stopColor={color} stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <text x={x + w / 2} y={base - barH - 5} textAnchor="middle" fill={color} fontSize={6.5} fontWeight="bold" fontFamily="JetBrains Mono, monospace" opacity={active ? 1 : 0} className="transition-opacity duration-500 delay-1000">
              {b.v}%
            </text>
            <text x={x + w / 2} y={base + 10} textAnchor="middle" fill={`${color}80`} fontSize={5.5} fontFamily="JetBrains Mono, monospace">
              {b.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* ═══════════════════════════════════════════════
   SVG: CIRCULAR GAUGE
   ═══════════════════════════════════════════════ */
const Gauge = ({ value, label, color, active, size = 90 }) => {
  const ref = useRef(null);
  const r = 34, cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    if (active && ref.current) {
      gsap.fromTo(ref.current,
        { strokeDashoffset: circ },
        { strokeDashoffset: circ - (value / 100) * circ, duration: 1.8, ease: "power3.out", delay: 0.6 }
      );
    }
  }, [active, circ, value]);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full max-w-[90px] mx-auto">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={`${color}12`} strokeWidth={4} />
      <circle
        ref={ref}
        cx={cx} cy={cy} r={r}
        fill="none" stroke={color} strokeWidth={4} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={circ}
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
      />
      <text x={cx} y={cy - 4} textAnchor="middle" fill={color} fontSize={14} fontWeight="900" fontFamily="JetBrains Mono, monospace">
        {active ? value : 0}{value <= 100 && value > 1 ? "%" : ""}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill={`${color}88`} fontSize={6} fontFamily="JetBrains Mono, monospace">
        {label}
      </text>
    </svg>
  );
};

/* ═══════════════════════════════════════════════
   SVG: TIMELINE CHART (Signo'Lib)
   ═══════════════════════════════════════════════ */
const TimelineChart = ({ data, color, active }) => {
  const pathRef = useRef(null);
  const dotsRef = useRef([]);
  const w = 220, h = 80, px = 30, py = 10;

  const points = data.map((d, i) => ({
    x: px + (i / (data.length - 1)) * (w - 2 * px),
    y: h - py - (d.v / 100) * (h - 2 * py),
  }));

  const pathD = points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");

  useEffect(() => {
    if (active && pathRef.current) {
      const len = pathRef.current.getTotalLength();
      gsap.fromTo(pathRef.current,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 1.5, ease: "power2.out", delay: 0.4 }
      );
      dotsRef.current.forEach((el, i) => {
        if (el) gsap.fromTo(el, { scale: 0, transformOrigin: "center" }, { scale: 1, duration: 0.5, ease: "back.out(3)", delay: 0.6 + i * 0.2 });
      });
    }
  }, [active]);

  return (
    <svg viewBox={`0 0 ${w} ${h + 16}`} className="w-full h-full max-w-[280px] mx-auto">
      <line x1={px} y1={h - py} x2={w - px} y2={h - py} stroke={`${color}15`} strokeWidth={0.5} />
      {[25, 50, 75, 100].map((v) => {
        const y = h - py - (v / 100) * (h - 2 * py);
        return <line key={v} x1={px} y1={y} x2={w - px} y2={y} stroke={`${color}08`} strokeWidth={0.5} strokeDasharray="2,3" />;
      })}
      <defs>
        <linearGradient id="tlGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={1} />
        </linearGradient>
      </defs>
      <path ref={pathRef} d={pathD} fill="none" stroke="url(#tlGrad)" strokeWidth={2.5} strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 4px ${color}50)` }}
      />
      {points.map((p, i) => (
        <g key={i}>
          <circle ref={(el) => { dotsRef.current[i] = el; }} cx={p.x} cy={p.y} r={4.5} fill={color}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }} opacity={active ? 1 : 0}
          />
          <text x={p.x} y={p.y - 9} textAnchor="middle" fill={color} fontSize={7} fontWeight="bold" fontFamily="JetBrains Mono, monospace" opacity={active ? 1 : 0} className="transition-opacity duration-500 delay-1000">
            {data[i].v}%
          </text>
          <text x={p.x} y={h + 8} textAnchor="middle" fill={`${color}80`} fontSize={7} fontFamily="JetBrains Mono, monospace">
            {data[i].label}
          </text>
        </g>
      ))}
    </svg>
  );
};

/* ═══════════════════════════════════════════════
   SVG: BEFORE/AFTER COMPARISON (CI/CD)
   ═══════════════════════════════════════════════ */
const ComparisonChart = ({ before, after, color, active, labels }) => {
  const beforeRef = useRef(null);
  const afterRef = useRef(null);
  const arrowRef = useRef(null);
  const maxH = 70, barW = 50, base = 90;

  useEffect(() => {
    if (active) {
      if (beforeRef.current) gsap.fromTo(beforeRef.current, { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: "power3.out", delay: 0.4, transformOrigin: "bottom" });
      if (afterRef.current) gsap.fromTo(afterRef.current, { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: "back.out(2)", delay: 0.7, transformOrigin: "bottom" });
      if (arrowRef.current) gsap.fromTo(arrowRef.current, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.6, delay: 1.2 });
    }
  }, [active]);

  const bH = (before / 100) * maxH;
  const aH = (after / 100) * maxH;

  return (
    <svg viewBox="0 0 220 120" className="w-full h-full max-w-[260px] mx-auto">
      <line x1={30} y1={base} x2={190} y2={base} stroke={`${color}15`} strokeWidth={0.5} />
      <rect ref={beforeRef} x={45} y={base - bH} width={barW} height={bH} rx={4} fill="#ef4444" opacity={0.7} />
      <rect ref={afterRef} x={125} y={base - aH} width={barW} height={aH} rx={4} fill={color} opacity={0.85}
        style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
      />
      <text x={70} y={base - bH - 6} textAnchor="middle" fill="#ef4444" fontSize={9} fontWeight="bold" fontFamily="JetBrains Mono, monospace" opacity={active ? 0.8 : 0} className="transition-opacity duration-500 delay-700">
        100%
      </text>
      <text x={150} y={base - aH - 6} textAnchor="middle" fill={color} fontSize={9} fontWeight="bold" fontFamily="JetBrains Mono, monospace" opacity={active ? 1 : 0} className="transition-opacity duration-500 delay-1000">
        20%
      </text>
      <text x={70} y={base + 12} textAnchor="middle" fill="#ef444499" fontSize={7} fontFamily="JetBrains Mono, monospace">{labels?.before}</text>
      <text x={150} y={base + 12} textAnchor="middle" fill={`${color}99`} fontSize={7} fontFamily="JetBrains Mono, monospace">{labels?.after}</text>
      <g ref={arrowRef} opacity={0}>
        <line x1={100} y1={35} x2={120} y2={35} stroke={color} strokeWidth={1.5} markerEnd="url(#arrowM)" />
        <defs><marker id="arrowM" viewBox="0 0 10 10" refX="9" refY="5" markerWidth={5} markerHeight={5} orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={color} /></marker></defs>
        <text x={110} y={28} textAnchor="middle" fill={color} fontSize={10} fontWeight="900" fontFamily="JetBrains Mono, monospace">−80%</text>
      </g>
    </svg>
  );
};

/* ═══════════════════════════════════════════════
   SVG: MODEL ACCURACY BARS (ML)
   ═══════════════════════════════════════════════ */
const ModelBars = ({ models, color, active }) => {
  const barsRef = useRef([]);
  const barH = 16, gap = 10, labelW = 38, maxW = 130;

  useEffect(() => {
    if (active) {
      barsRef.current.forEach((el, i) => {
        if (el) gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.out", delay: 0.5 + i * 0.15, transformOrigin: "left" });
      });
    }
  }, [active]);

  const modelColors = ["#8b5cf6", "#06b6d4", "#f59e0b"];

  return (
    <svg viewBox={`0 0 220 ${models.length * (barH + gap) + 10}`} className="w-full h-full max-w-[280px] mx-auto">
      {models.map((m, i) => {
        const y = 6 + i * (barH + gap);
        const w = (m.acc / 100) * maxW;
        const mc = modelColors[i % modelColors.length];
        return (
          <g key={i}>
            <text x={labelW - 4} y={y + barH / 2 + 1} textAnchor="end" dominantBaseline="central" fill={`${mc}cc`} fontSize={7} fontWeight="600" fontFamily="JetBrains Mono, monospace">
              {m.name}
            </text>
            <rect x={labelW + 2} y={y} width={maxW} height={barH} rx={3} fill={`${mc}10`} />
            <rect ref={(el) => { barsRef.current[i] = el; }} x={labelW + 2} y={y} width={w} height={barH} rx={3}
              fill={mc} opacity={0.75}
              style={{ filter: `drop-shadow(0 0 4px ${mc}50)` }}
            />
            <text x={labelW + w + 8} y={y + barH / 2 + 1} dominantBaseline="central" fill={mc} fontSize={7.5} fontWeight="bold" fontFamily="JetBrains Mono, monospace" opacity={active ? 1 : 0} className="transition-opacity duration-500 delay-1000">
              {m.acc}%
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* ═══════════════════════════════════════════════
   SVG: SCATTER CLUSTER (ML)
   ═══════════════════════════════════════════════ */
const ScatterCluster = ({ active, color }) => {
  const dotsRef = useRef([]);
  const clusters = useMemo(() => {
    const pts = [];
    const centers = [{ x: 55, y: 35, c: "#8b5cf6" }, { x: 130, y: 60, c: "#06b6d4" }, { x: 90, y: 85, c: "#f59e0b" }];
    centers.forEach((center, ci) => {
      for (let j = 0; j < 12; j++) {
        pts.push({
          x: center.x + (Math.random() - 0.5) * 40,
          y: center.y + (Math.random() - 0.5) * 30,
          c: center.c,
          r: 2 + Math.random() * 2,
          ci,
        });
      }
    });
    return pts;
  }, []);

  useEffect(() => {
    if (active) {
      dotsRef.current.forEach((el, i) => {
        if (el) gsap.fromTo(el, { scale: 0, transformOrigin: "center" }, { scale: 1, duration: 0.4, ease: "back.out(3)", delay: 0.6 + i * 0.02 });
      });
    }
  }, [active]);

  return (
    <svg viewBox="0 0 180 110" className="w-full h-full max-w-[220px] mx-auto">
      {[0.25, 0.5, 0.75, 1].map((v) => (
        <line key={v} x1={10} y1={v * 100 + 5} x2={170} y2={v * 100 + 5} stroke={`${color}08`} strokeWidth={0.5} />
      ))}
      {clusters.map((p, i) => (
        <circle key={i} ref={(el) => { dotsRef.current[i] = el; }}
          cx={p.x} cy={p.y} r={p.r} fill={p.c} opacity={0.7}
          style={{ filter: `drop-shadow(0 0 3px ${p.c}80)` }}
        />
      ))}
    </svg>
  );
};

/* ═══════════════════════════════════════════════
   HOLOGRAPHIC GRID BACKGROUND
   ═══════════════════════════════════════════════ */
const HoloGrid = ({ color }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
    <svg className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <pattern id="hgrid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0L0 0 0 24" fill="none" stroke={`${color}15`} strokeWidth={0.5} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hgrid)" />
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════
   METRIC PILL
   ═══════════════════════════════════════════════ */
const MetricPill = ({ m, color, active, vizLabels }) => (
  <div className="flex flex-col items-center p-2 sm:p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
    <AnimCounter value={m.value} suffix={m.suffix} decimal={m.decimal} color={color} active={active} />
    <span className="text-[10px] sm:text-xs text-text-muted font-mono mt-1">{vizLabels?.[m.key] || m.key}</span>
  </div>
);

/* ═══════════════════════════════════════════════
   VISUALIZATION PANEL (dispatches per project)
   ═══════════════════════════════════════════════ */
const VizPanel = ({ idx, color, active, projT }) => {
  const cfg = VIZ_CONFIGS[idx];
  if (!cfg) return null;

  const vizLabels = projT.vizLabels || {};

  return (
    <div className="relative mt-4 sm:mt-6 rounded-xl overflow-hidden" style={{ background: `${color}04`, border: `1px solid ${color}10` }}>
      <HoloGrid color={color} />
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }} />

      <div className="relative z-10 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4 sm:mb-5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
          <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: `${color}90` }}>
            {projT.impactMetrics}
          </span>
        </div>

        {idx === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-center mb-5">
            <RadarChart axes={cfg.radar.axes} values={cfg.radar.values} color={color} active={active} />
            <BarChart bars={cfg.bars} color={color} active={active} />
            <Gauge value={cfg.gauge.value} label="Compliance" color={color} active={active} />
          </div>
        )}

        {idx === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4 sm:gap-6 items-center mb-5">
            <TimelineChart data={cfg.timeline} color={color} active={active} />
            <Gauge value={cfg.gauge.value} label="MVP" color={color} active={active} />
          </div>
        )}

        {idx === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4 sm:gap-6 items-center mb-5">
            <ComparisonChart before={cfg.comparison.before} after={cfg.comparison.after} color={color} active={active} labels={{ before: vizLabels.before, after: vizLabels.after }} />
            <Gauge value={cfg.gauge.value} label={`−${cfg.gauge.value}%`} color={color} active={active} />
          </div>
        )}

        {idx === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-center mb-5">
            <ModelBars models={cfg.models} color={color} active={active} />
            <ScatterCluster active={active} color={color} />
            <Gauge value={cfg.gauge.value} label="R²" color={color} active={active} />
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {cfg.metrics.map((m, i) => (
            <MetricPill key={i} m={m} color={color} active={active} vizLabels={vizLabels} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   IMPACT BADGE
   ═══════════════════════════════════════════════ */
const ImpactBadge = ({ text, color }) => (
  <span
    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold whitespace-nowrap"
    style={{ color, background: `${color}0c`, border: `1px solid ${color}20` }}
  >
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
    {text}
  </span>
);

const Tag = ({ name, color }) => (
  <span
    className="proj-tag text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-1 rounded-lg cursor-default transition-all duration-300 hover:scale-105"
    style={{ background: `${color}0c`, border: `1px solid ${color}1a`, color: `${color}cc` }}
  >
    {name}
  </span>
);

/* ═══════════════════════════════════════════════
   MAIN PROJECTS SECTION
   ═══════════════════════════════════════════════ */
const Projects = () => {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const mouse = useMousePosition(0.02);
  const { t } = useLanguage();

  const projT = t("projects");
  const projects = t("projectsList");

  const toggle = useCallback((idx) => {
    const opening = active !== idx;
    if (opening) playCinematicOpen(idx);
    setActive((a) => (a === idx ? null : idx));
  }, [active]);

  useGSAP(() => {
    gsap.to(".pipeline-rail", { backgroundPositionY: "200%", duration: 4, repeat: -1, ease: "none" });

    gsap.utils.toArray(".data-tok").forEach((el, i) => {
      const tl = gsap.timeline({ repeat: -1, delay: i * 0.55 });
      tl.fromTo(el, { y: 30, opacity: 0 }, { y: -100, opacity: 0.2, duration: 2.5, ease: "none" });
      tl.to(el, { y: -200, opacity: 0, duration: 1.5, ease: "none" });
    });

    gsap.from(".proj-row", { x: -50, duration: 0.7, stagger: 0.15, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: ref.current, start: "top 82%" } });
    gsap.from(".pipe-dot", { scale: 0, duration: 0.5, stagger: 0.12, ease: "back.out(3)", immediateRender: false, scrollTrigger: { trigger: ref.current, start: "top 85%" } });
  }, { scope: ref });

  return (
    <SectionWrapper id="projects" title={projT.title} subtitle={projT.subtitle}>
      <SceneBg mouseX={mouse.x} mouseY={mouse.y} variant="pipeline" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {DATA_TOKENS.map((tk, i) => (
          <span key={i} className="data-tok absolute text-[10px] font-mono select-none"
            style={{ color: `${COLORS[i % COLORS.length]}18`, left: `${2 + ((i * 4.3) % 93)}%`, top: `${8 + ((i * 7.7) % 82)}%` }}
          >{tk}</span>
        ))}
      </div>

      <div ref={ref} className="max-w-5xl mx-auto relative" style={{ zIndex: 5 }}>
        <div className="hidden md:block absolute left-5 top-4 bottom-4 w-px overflow-hidden">
          <div className="pipeline-rail w-full h-full"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.35), rgba(99,102,241,0.2), rgba(6,182,212,0.3), transparent)", backgroundSize: "100% 50%" }}
          />
        </div>

        <div className="space-y-4 sm:space-y-5">
          {projects.map((p, i) => {
            const color = COLORS[i % COLORS.length];
            const isOpen = active === i;

            return (
              <div key={i} className="proj-row relative md:pl-16">
                <button onClick={() => toggle(i)}
                  className="pipe-dot absolute left-5 top-8 z-20 hidden md:flex items-center justify-center w-8 h-8 -translate-x-1/2"
                  aria-label={`Toggle ${p.title}`}
                >
                  <div className="rounded-full transition-all duration-400"
                    style={{ width: isOpen ? 16 : 12, height: isOpen ? 16 : 12, background: color,
                      boxShadow: isOpen ? `0 0 24px ${color}, 0 0 48px ${color}40` : `0 0 8px ${color}50` }}
                  />
                </button>

                <div
                  className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
                  style={{
                    perspective: "1200px",
                    background: isOpen ? `${color}06` : "rgba(255,255,255,0.015)",
                    border: `1px solid ${isOpen ? `${color}22` : "rgba(255,255,255,0.05)"}`,
                    boxShadow: isOpen ? `0 0 60px ${color}0c, inset 0 0 30px ${color}04` : "none",
                  }}
                  onClick={() => toggle(i)}
                >
                  <div className="h-[2px] transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: isOpen ? 1 : 0.25 }}
                  />

                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                        <span className="text-[10px] sm:text-xs font-mono font-bold px-2 sm:px-2.5 py-1 rounded-lg shrink-0 mt-0.5"
                          style={{ color, background: `${color}10`, border: `1px solid ${color}20` }}
                        >{String(i + 1).padStart(2, "0")}</span>
                        <div className="min-w-0">
                          <h3 className="text-sm sm:text-base font-bold text-text-primary group-hover:text-primary-light transition-colors truncate">{p.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-1">
                            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded-full"
                              style={{ color: `${color}bb`, background: `${color}08`, border: `1px solid ${color}12` }}
                            >{p.type}</span>
                            <span className="text-[11px] sm:text-xs font-mono text-text-muted">{p.period}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        {p.impact && <ImpactBadge text={p.impact} color={color} />}
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-300"
                          style={{ background: `${color}10`, transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
                        >
                          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed md:ml-10">{p.description}</p>

                    <div className="overflow-hidden transition-all duration-700 ease-in-out md:ml-10"
                      style={{ maxHeight: isOpen ? "1200px" : "0px", opacity: isOpen ? 1 : 0, marginTop: isOpen ? "12px" : "0px" }}
                    >
                      <VizPanel idx={i} color={color} active={isOpen} projT={projT} />

                      <div className="pt-4 mt-4" style={{ borderTop: `1px solid ${color}12` }}>
                        <span className="text-[10px] font-mono uppercase tracking-widest block mb-3" style={{ color: `${color}90` }}>
                          {projT.techStack}
                        </span>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {p.stack.map((tech, j) => <Tag key={j} name={tech} color={color} />)}
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
