import { useState, useEffect } from "react";
import { navLinks } from "../../constants/data";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { threshold: 0.3 }
    );
    navLinks.forEach(({ href }) => { const el = document.querySelector(href); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-card-border shadow-lg shadow-black/10" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <a href="#" className="text-lg font-bold tracking-tight gradient-text">TMV<span className="text-primary">.</span></a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`relative text-xs font-medium px-3.5 py-2 rounded-lg transition-all duration-200 ${active === href ? "text-primary-light bg-primary/10" : "text-text-muted hover:text-text-primary hover:bg-white/[0.03]"}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button onClick={() => setOpen(!open)} className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5" aria-label="Menu">
          <span className={`w-5 h-0.5 bg-text-primary transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 bg-text-primary transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-text-primary transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
        <ul className="px-6 pb-5 space-y-1 bg-background/95 backdrop-blur-xl">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                className={`block text-sm font-medium px-3 py-2.5 rounded-lg transition-all ${active === href ? "text-primary-light bg-primary/10" : "text-text-secondary"}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
