import { createContext, useContext, useState, useCallback } from "react";
import translations from "./translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("portfolio-lang") || "fr";
    } catch {
      return "fr";
    }
  });

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "fr" ? "en" : "fr";
      try { localStorage.setItem("portfolio-lang", next); } catch { /* noop */ }
      return next;
    });
  }, []);

  const t = useCallback(
    (key) => {
      const keys = key.split(".");
      let val = translations[lang];
      for (const k of keys) {
        val = val?.[k];
        if (val === undefined) return key;
      }
      return val;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
