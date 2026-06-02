import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { localStore, StoredUser } from "../lib/localStore";

interface AuthUser {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function toAuthUser(u: StoredUser): AuthUser {
  return { id: u.id, username: u.username, email: u.email, roles: u.roles };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = localStore.getSession();
    if (sessionId) {
      const stored = localStore.findUserById(sessionId);
      if (stored) setUser(toAuthUser(stored));
      else localStore.clearSession();
    }
    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const result = localStore.loginUser(email, password);
    if ("error" in result) throw new Error(result.error);
    localStore.setSession(result.id);
    setUser(toAuthUser(result));
  }

  async function register(username: string, email: string, password: string) {
    if (!username.trim()) throw new Error("Username is required.");
    if (!email.trim()) throw new Error("Email address is required.");
    const result = localStore.registerUser(username.trim(), email.trim(), password);
    if ("error" in result) throw new Error(result.error);
    localStore.setSession(result.id);
    setUser(toAuthUser(result));
  }

  function logout() {
    localStore.clearSession();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
