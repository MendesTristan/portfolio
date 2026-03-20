import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../i18n";
import SectionWrapper from "../ui/SectionWrapper";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const inner = useRef(null);
  const { t } = useLanguage();

  const contactT = t("contact");
  const contactInfoT = t("contactInfo");

  useGSAP(() => {
    gsap.from(".contact-box", {
      y: 30, duration: 0.6, ease: "power3.out",
      immediateRender: false,
      scrollTrigger: { trigger: inner.current, start: "top 85%" },
    });
  }, { scope: inner });

  return (
    <SectionWrapper id="contact" title={contactT.title} subtitle={contactT.subtitle}>
      <div ref={inner} className="max-w-xl mx-auto">
        <div data-gsap className="contact-box rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 text-center bg-white/[0.02] border border-white/[0.05]">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/[0.08] flex-center mx-auto mb-5 sm:mb-6">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>

          <p className="text-text-secondary text-sm sm:text-base mb-4 leading-relaxed max-w-md mx-auto">
            {contactT.description}
          </p>

          <p className="text-text-muted text-xs sm:text-sm mb-6 sm:mb-8 flex items-center justify-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {contactInfoT.location}
          </p>

          <Button href={`mailto:${contactInfoT.email}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            {contactT.button}
          </Button>

          <p className="text-text-muted text-xs font-mono mt-5 sm:mt-6">{contactInfoT.email}</p>
        </div>

        <p className="text-center text-text-muted text-xs mt-10 sm:mt-14">
          {contactT.footer} <span className="text-primary-light">Tristan Mendes V.</span>
        </p>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
