const variants = {
  primary: "bg-gradient-to-r from-primary to-accent text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105",
  outline: "border border-card-border text-text-primary hover:border-primary hover:text-primary-light hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]",
};

const Button = ({ children, href, variant = "primary", className = "" }) => {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 cursor-pointer ${variants[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Button;
