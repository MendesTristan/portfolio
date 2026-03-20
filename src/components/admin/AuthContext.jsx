import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, isFirebaseConfigured } from "../../firebase/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = async (email, password) => {
    if (!auth) throw new Error("Firebase not configured");
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (!auth) return;
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isFirebaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
