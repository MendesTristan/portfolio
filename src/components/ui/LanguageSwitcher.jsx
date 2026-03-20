import { useLanguage } from "../../i18n";

const LanguageSwitcher = () => {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 bg-white/[0.04] border border-white/[0.08] hover:border-primary/30 hover:bg-white/[0.06] text-text-secondary hover:text-text-primary"
      aria-label="Switch language"
    >
      <svg className="w-3.5 h-3.5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
      </svg>
      <span className="uppercase">{lang === "fr" ? "EN" : "FR"}</span>
    </button>
  );
};

export default LanguageSwitcher;
