import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useLanguage } from "../../i18n";

const Login = () => {
  const { login, isFirebaseConfigured } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const adminT = t("admin.login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch {
      setError(adminT.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(180deg, #020024 0%, #030014 40%, #0a0118 100%)" }}>
      <div className="w-full max-w-md">
        <div className="rounded-2xl p-8 md:p-10 bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl">
          <div className="w-14 h-14 rounded-xl bg-primary/[0.08] flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-center gradient-text mb-1">{adminT.title}</h1>
          <p className="text-text-muted text-sm text-center mb-8">{adminT.subtitle}</p>

          {!isFirebaseConfigured && (
            <div className="mb-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-mono leading-relaxed">
              Firebase is not configured. Add your Firebase credentials to a <code className="bg-white/10 px-1 rounded">.env</code> file. See <code className="bg-white/10 px-1 rounded">.env.example</code>.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">{adminT.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-text-primary text-sm outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-text-muted/40"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">{adminT.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-text-primary text-sm outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-text-muted/40"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs font-mono bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !isFirebaseConfigured}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "..." : adminT.submit}
            </button>
          </form>

          <Link
            to="/"
            className="block text-center text-text-muted text-xs mt-8 hover:text-primary-light transition-colors"
          >
            &larr; {adminT.back}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
