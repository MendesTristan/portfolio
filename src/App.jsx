import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./components/ui";
import { Hero, SocialBar, CertBanner, About, Skills, Experience, Projects, Hackathons, Contact } from "./components/sections";
import Login from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";
import { trackVisit } from "./firebase/visitors";

gsap.registerPlugin(ScrollTrigger);

const PortfolioPage = () => {
  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(true), 500);
    const t2 = setTimeout(() => ScrollTrigger.refresh(true), 1500);
    const t3 = setTimeout(() => ScrollTrigger.refresh(true), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    trackVisit("/");
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

const App = () => (
  <Routes>
    <Route path="/" element={<PortfolioPage />} />
    <Route path="/admin" element={<Login />} />
    <Route path="/admin/dashboard" element={<Dashboard />} />
  </Routes>
);

export default App;
