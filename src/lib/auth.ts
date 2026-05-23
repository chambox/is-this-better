import { useEffect, useState } from "react";

export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string; // single letter
  createdAt: string;
};

const STORAGE_KEY = "givehope:auth:v1";
const USERS_KEY = "givehope:users:v1";

export const DEMO_USER: User = {
  id: "user_demo",
  email: "demo@givehope.org",
  name: "Demo Organizer",
  avatar: "D",
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
};

let current: User | null | undefined; // undefined = not yet hydrated
const listeners = new Set<() => void>();

function readUsers(): User[] {
  if (typeof window === "undefined") return [DEMO_USER];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as User[];
      if (!parsed.some((u) => u.id === DEMO_USER.id)) parsed.push(DEMO_USER);
      return parsed;
    }
  } catch {
    /* ignore */
  }
  const seed = [DEMO_USER];
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(seed));
  } catch {
    /* ignore */
  }
  return seed;
}

function writeUsers(users: User[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* ignore */
  }
}

function load(): User | null {
  if (current !== undefined) return current;
  if (typeof window === "undefined") {
    current = null;
    return null;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    current = raw ? (JSON.parse(raw) as User) : null;
  } catch {
    current = null;
  }
  return current;
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    if (current) localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

function emit() {
  listeners.forEach((l) => l());
}

export function getCurrentUser(): User | null {
  return load();
}

export function signIn(email: string): { ok: true; user: User } | { ok: false; error: string } {
  const e = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return { ok: false, error: "Enter a valid email." };
  const users = readUsers();
  const user = users.find((u) => u.email === e);
  if (!user) return { ok: false, error: "No account found. Create one below." };
  current = user;
  persist();
  emit();
  return { ok: true, user };
}

export function signUp(name: string, email: string): { ok: true; user: User } | { ok: false; error: string } {
  const n = name.trim();
  const e = email.trim().toLowerCase();
  if (n.length < 2) return { ok: false, error: "Enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return { ok: false, error: "Enter a valid email." };
  const users = readUsers();
  if (users.some((u) => u.email === e)) return { ok: false, error: "An account already exists for that email." };
  const user: User = {
    id: `user_${Date.now().toString(36)}`,
    email: e,
    name: n,
    avatar: n.charAt(0).toUpperCase(),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  current = user;
  persist();
  emit();
  return { ok: true, user };
}

export function signInAsDemo(): User {
  current = DEMO_USER;
  // Make sure demo exists in users list
  const users = readUsers();
  if (!users.some((u) => u.id === DEMO_USER.id)) {
    users.push(DEMO_USER);
    writeUsers(users);
  }
  persist();
  emit();
  return DEMO_USER;
}

export function signOut() {
  current = null;
  persist();
  emit();
}

export function useAuth(): User | null {
  const [, setTick] = useState(0);
  useEffect(() => {
    const l = () => setTick((t) => t + 1);
    listeners.add(l);
    // Re-read on mount in case of SSR-vs-client mismatch
    current = undefined;
    load();
    setTick((t) => t + 1);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return load();
}
