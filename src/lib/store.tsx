import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type User = { name: string; email: string };
type Progress = Record<string, { chapter: number; percent: number; updatedAt: number }>;
type Settings = {
  autoplayNext: boolean;
  defaultQuality: string;
  notifyWatchlist: boolean;
  notifyNewFilms: boolean;
  reducedMotion: boolean;
};

const defaultSettings: Settings = {
  autoplayNext: true,
  defaultQuality: "auto",
  notifyWatchlist: true,
  notifyNewFilms: false,
  reducedMotion: false,
};

type Store = {
  ready: boolean;
  user: User | null;
  saved: string[];
  progress: Progress;
  settings: Settings;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  toggleSave: (slug: string) => void;
  isSaved: (slug: string) => boolean;
  setProgress: (slug: string, chapter: number, percent: number) => void;
  updateSettings: (patch: Partial<Settings>) => void;
};

const KEY = "docuverse.state.v1";
const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [progress, setProgressState] = useState<Progress>({});
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed.user ?? null);
        setSaved(parsed.saved ?? []);
        setProgressState(parsed.progress ?? {});
        if (parsed.settings) {
          setSettings({ ...defaultSettings, ...parsed.settings });
        }
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify({ user, saved, progress, settings }));
  }, [ready, user, saved, progress, settings]);

  const signIn = useCallback((email: string, name?: string) => {
    const fallback = (email.split("@")[0] ?? "viewer").replace(/[._-]/g, " ");
    setUser({ email, name: name || fallback });
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const toggleSave = useCallback((slug: string) => {
    setSaved((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [slug, ...s]));
  }, []);

  const setProgress = useCallback((slug: string, chapter: number, percent: number) => {
    setProgressState((p) => ({ ...p, [slug]: { chapter, percent, updatedAt: Date.now() } }));
  }, []);

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((s) => ({ ...s, ...patch }));
  }, []);

  const value = useMemo<Store>(
    () => ({
      ready,
      user,
      saved,
      progress,
      settings,
      signIn,
      signOut,
      toggleSave,
      isSaved: (slug: string) => saved.includes(slug),
      setProgress,
      updateSettings,
    }),
    [ready, user, saved, progress, settings, signIn, signOut, toggleSave, setProgress, updateSettings],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
