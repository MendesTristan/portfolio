import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionWrapper = ({ id, title, subtitle, children, className = "" }) => {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.from(ref.current.querySelectorAll(".section-header > *"), {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
  }, { scope: ref });

  return (
    <section id={id} ref={ref} className={`relative py-24 md:py-32 px-6 overflow-hidden ${className}`}>
      {/* Fade overlay so 3D bg blends */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/90 to-background pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="section-header text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">{title}</h2>
          {subtitle && <p className="text-text-secondary text-lg max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
