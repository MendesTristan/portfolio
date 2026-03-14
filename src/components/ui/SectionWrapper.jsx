import { useRef } from "react";

const SectionWrapper = ({ id, title, subtitle, children, className = "" }) => {
  const ref = useRef(null);

  return (
    <section id={id} ref={ref} className={`relative py-20 md:py-28 px-6 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-gradient-to-r from-primary to-transparent" />
            <span className="text-[10px] font-mono text-primary-light uppercase tracking-[0.2em]">{id}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">{title}</h2>
          {subtitle && <p className="text-text-muted text-sm max-w-lg">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
