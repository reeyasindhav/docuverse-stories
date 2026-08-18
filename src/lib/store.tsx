import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type User = { name: string; email: string };
type Progress = Record<string, { chapter: number; percent: number; updatedAt: number }>;

type Store = {
  ready: boolean;
  user: User | null;
  saved: string[];
  progress: Progress;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  toggleSave: (slug: string) => void;
  isSaved: (slug: string) => boolean;
  setProgress: (slug: string, chapter: number, percent: number) => void;
};

const KEY = "docuverse.state.v1";
const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [progress, setProgressState] = useState<Progress>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed.user ?? null);
        setSaved(parsed.saved ?? []);
        setProgressState(parsed.progress ?? {});
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify({ user, saved, progress }));
  }, [ready, user, saved, progress]);

  const signIn = useCallback((email: string, name?: string) => {
    setUser({ email, name: name || email.split("@")[0].replace(/[._-]/g, " ") });
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const toggleSave = useCallback((slug: string) => {
    setSaved((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [slug, ...s]));
  }, []);

  const setProgress = useCallback((slug: string, chapter: number, percent: number) => {
    setProgressState((p) => ({ ...p, [slug]: { chapter, percent, updatedAt: Date.now() } }));
  }, []);

  const value = useMemo<Store>(
    () => ({
      ready,
      user,
      saved,
      progress,
      signIn,
      signOut,
      toggleSave,
      isSaved: (slug: string) => saved.includes(slug),
      setProgress,
    }),
    [ready, user, saved, progress, signIn, signOut, toggleSave, setProgress],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
