import { useRef } from "react";

const SectionWrapper = ({ id, title, subtitle, children, className = "" }) => {
  const ref = useRef(null);

  return (
    <section id={id} ref={ref} className={`relative py-24 md:py-32 px-6 md:px-8 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-gradient-to-r from-primary to-transparent" />
            <span className="text-xs font-mono text-primary-light uppercase tracking-[0.2em]">{id}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-3">{title}</h2>
          {subtitle && <p className="text-text-muted text-base max-w-xl">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
