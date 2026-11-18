"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * DEMO AUTH — there is no backend. "Logging in" just remembers the user's
 * name, email and phone in this browser's localStorage. Passwords are never stored.
 * Replace login/signup/logout with real API calls when a backend is added.
 */

export type DemoUser = { name: string; email: string; phone?: string; joined: string };

type AuthCtx = {
  user: DemoUser | null;
  ready: boolean;
  login: (email: string) => DemoUser;
  signup: (u: { name: string; email: string; phone?: string }) => DemoUser;
  logout: () => void;
};

const KEY = "bringyatra-demo-user";
const AuthContext = createContext<AuthCtx | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};

const read = (): DemoUser | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DemoUser) : null;
  } catch {
    return null;
  }
};

const write = (u: DemoUser | null) => {
  try {
    if (u) localStorage.setItem(KEY, JSON.stringify(u));
    else localStorage.removeItem(KEY);
  } catch {
    // storage blocked (private mode) — the session simply won't persist
  }
};

const nameFromEmail = (email: string) => {
  const local = email.split("@")[0].replace(/[._-]+/g, " ").trim();
  return local ? local.replace(/\b\w/g, (c) => c.toUpperCase()) : "Traveller";
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(read());
    setReady(true);
    const sync = (e: StorageEvent) => e.key === KEY && setUser(read());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const save = useCallback((u: DemoUser | null) => {
    write(u);
    setUser(u);
  }, []);

  const login = useCallback(
    (email: string) => {
      const existing = read();
      const u =
        existing && existing.email.toLowerCase() === email.toLowerCase()
          ? existing
          : { name: nameFromEmail(email), email, joined: new Date().toISOString() };
      save(u);
      return u;
    },
    [save],
  );

  const signup = useCallback(
    ({ name, email, phone }: { name: string; email: string; phone?: string }) => {
      const u = { name: name.trim(), email: email.trim(), phone: phone?.trim() || undefined, joined: new Date().toISOString() };
      save(u);
      return u;
    },
    [save],
  );

  const logout = useCallback(() => save(null), [save]);

  return <AuthContext.Provider value={{ user, ready, login, signup, logout }}>{children}</AuthContext.Provider>;
}
