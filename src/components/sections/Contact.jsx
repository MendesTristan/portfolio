import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../ui/SectionWrapper";
import Button from "../ui/Button";
import { contactInfo } from "../../constants/data";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const inner = useRef(null);

  useGSAP(() => {
    gsap.from(".contact-box", {
      y: 30, duration: 0.6, ease: "power3.out",
      immediateRender: false,
      scrollTrigger: { trigger: inner.current, start: "top 85%" },
    });
  }, { scope: inner });

  return (
    <SectionWrapper id="contact" title="Contact" subtitle="Discutons de votre prochain projet.">
      <div ref={inner} className="max-w-xl mx-auto">
        <div data-gsap className="contact-box rounded-xl p-8 md:p-10 text-center bg-white/[0.02] border border-white/[0.05]">
          <div className="w-12 h-12 rounded-xl bg-primary/[0.08] flex-center mx-auto mb-5">
            <svg className="w-6 h-6 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>

          <p className="text-text-secondary text-sm mb-3 leading-relaxed max-w-md mx-auto">
            Ouvert aux opportunités en data engineering, projets cloud ou collaboration technique.
          </p>

          <p className="text-text-muted text-xs mb-6 flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {contactInfo.location}
          </p>

          <Button href={`mailto:${contactInfo.email}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            Me contacter
          </Button>

          <p className="text-text-muted text-[10px] font-mono mt-5">{contactInfo.email}</p>
        </div>

        <p className="text-center text-text-muted text-[11px] mt-14">
          Conçu &amp; développé par <span className="text-primary-light">Tristan Mendes V.</span>
        </p>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
