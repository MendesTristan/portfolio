import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useLanguage } from "../../i18n";
import { getVisitors, getVisitorStats, isFirebaseConfigured } from "../../firebase";

const StatCard = ({ label, value, icon }) => (
  <div className="rounded-xl p-5 bg-white/[0.02] border border-white/[0.06] transition-all duration-300 hover:border-primary/20">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-9 h-9 rounded-lg bg-primary/[0.08] flex items-center justify-center text-primary-light">{icon}</div>
      <span className="text-xs font-mono text-text-muted uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-3xl font-bold gradient-text">{value}</p>
  </div>
);

const Dashboard = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [visitors, setVisitors] = useState([]);
  const [stats, setStats] = useState({ total: 0, today: 0, unique: 0 });
  const [loading, setLoading] = useState(true);

  const dt = t("admin.dashboard");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/admin");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user || !isFirebaseConfigured) return;
    const load = async () => {
      const [v, s] = await Promise.all([getVisitors(200), getVisitorStats()]);
      setVisitors(v);
      setStats(s);
      setLoading(false);
    };
    load();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/admin");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(180deg, #020024 0%, #030014 40%, #0a0118 100%)" }}>
        <div className="text-text-muted font-mono text-sm animate-pulse">{dt.loading}</div>
      </div>
    );
  }

  if (!user) return null;

  const formatDate = (timestamp) => {
    if (!timestamp) return "—";
    const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    }).format(d);
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #020024 0%, #030014 40%, #0a0118 100%)" }}>
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold gradient-text">{dt.title}</h1>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-text-muted hover:text-primary-light transition-colors">{dt.backToSite}</Link>
            <button
              onClick={handleLogout}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-text-muted hover:text-red-400 hover:border-red-400/30 transition-all"
            >
              {dt.logout}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {!isFirebaseConfigured ? (
          <div className="rounded-xl p-8 bg-yellow-500/10 border border-yellow-500/20 text-center">
            <p className="text-yellow-400 text-sm font-mono">Firebase is not configured. Visitor tracking is disabled.</p>
            <p className="text-yellow-400/60 text-xs font-mono mt-2">Add your Firebase credentials to a .env file.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <StatCard
                label={dt.totalVisitors}
                value={loading ? "—" : stats.total}
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>}
              />
              <StatCard
                label={dt.todayVisitors}
                value={loading ? "—" : stats.today}
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>}
              />
              <StatCard
                label={dt.uniqueVisitors}
                value={loading ? "—" : stats.unique}
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>}
              />
            </div>

            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-white/[0.06]">
                <h2 className="text-sm font-semibold text-text-primary">{dt.recentVisitors}</h2>
              </div>

              {loading ? (
                <div className="p-10 text-center text-text-muted text-sm animate-pulse font-mono">{dt.loading}</div>
              ) : visitors.length === 0 ? (
                <div className="p-10 text-center text-text-muted text-sm font-mono">{dt.noVisitors}</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[11px] font-mono uppercase tracking-wider text-text-muted border-b border-white/[0.04]">
                        <th className="px-4 sm:px-6 py-3">{dt.date}</th>
                        <th className="px-4 sm:px-6 py-3">{dt.country}</th>
                        <th className="px-4 sm:px-6 py-3">{dt.city}</th>
                        <th className="px-4 sm:px-6 py-3 hidden sm:table-cell">{dt.device}</th>
                        <th className="px-4 sm:px-6 py-3 hidden md:table-cell">{dt.browser}</th>
                        <th className="px-4 sm:px-6 py-3 hidden lg:table-cell">{dt.os}</th>
                        <th className="px-4 sm:px-6 py-3 hidden lg:table-cell">{dt.page}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visitors.map((v) => (
                        <tr key={v.id} className="border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors">
                          <td className="px-4 sm:px-6 py-3 text-xs font-mono text-text-secondary whitespace-nowrap">{formatDate(v.timestamp)}</td>
                          <td className="px-4 sm:px-6 py-3 text-xs text-text-secondary">{v.country || "—"}</td>
                          <td className="px-4 sm:px-6 py-3 text-xs text-text-secondary">{v.city || "—"}</td>
                          <td className="px-4 sm:px-6 py-3 text-xs text-text-muted hidden sm:table-cell">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono ${v.device === "Mobile" ? "bg-cyan-500/10 text-cyan-400" : "bg-primary/10 text-primary-light"}`}>
                              {v.device || "—"}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 text-xs text-text-muted hidden md:table-cell">{v.browser || "—"}</td>
                          <td className="px-4 sm:px-6 py-3 text-xs text-text-muted hidden lg:table-cell">{v.os || "—"}</td>
                          <td className="px-4 sm:px-6 py-3 text-xs text-text-muted font-mono hidden lg:table-cell">{v.page || "/"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
