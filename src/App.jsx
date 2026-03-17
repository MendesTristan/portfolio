import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./components/ui";
import { Hero, SocialBar, CertBanner, About, Skills, Experience, Projects, Hackathons, Contact } from "./components/sections";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(true), 500);
    const t2 = setTimeout(() => ScrollTrigger.refresh(true), 1500);
    const t3 = setTimeout(() => ScrollTrigger.refresh(true), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <SocialBar />
        <CertBanner />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Hackathons />
        <Contact />
      </main>
    </>
  );
};

export default App;
