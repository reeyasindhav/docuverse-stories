import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/Reveal";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Docuverse" },
      { name: "description", content: "Manage your Docuverse preferences." },
      { property: "og:title", content: "Settings — Docuverse" },
      { property: "og:description", content: "Playback, notifications, and display preferences." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { settings, updateSettings } = useStore();
  const navigate = useNavigate();

  const toggle = (key: keyof typeof settings) =>
    updateSettings({ [key]: !settings[key] });

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <Link to="/dashboard" className="label-mono inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to dashboard
          </Link>
          <h1 className="mt-6 font-display text-5xl md:text-7xl">Settings</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Manage your playback, notifications, and display preferences.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8">
          <Reveal>
            <section>
              <p className="label-mono text-xs uppercase tracking-wide text-muted-foreground">Playback</p>
              <div className="mt-4 grid gap-4">
                <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                  <div>
                    <p className="font-display text-sm">Autoplay next chapter</p>
                    <p className="label-mono mt-1 text-xs text-muted-foreground">Automatically play the next chapter when one ends</p>
                  </div>
                  <Switch checked={settings.autoplayNext} onCheckedChange={() => toggle("autoplayNext")} />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                  <div>
                    <p className="font-display text-sm">Default quality</p>
                    <p className="label-mono mt-1 text-xs text-muted-foreground">Choose your preferred streaming quality</p>
                  </div>
                  <select
                    value={settings.defaultQuality}
                    onChange={(e) => updateSettings({ defaultQuality: e.target.value })}
                    className="border border-border bg-background px-3 py-1.5 font-mono text-xs outline-none focus:border-foreground"
                  >
                    <option value="auto">Auto</option>
                    <option value="1080p">1080p</option>
                    <option value="720p">720p</option>
                    <option value="480p">480p</option>
                  </select>
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal delay={80}>
            <section>
              <p className="label-mono text-xs uppercase tracking-wide text-muted-foreground">Notifications</p>
              <div className="mt-4 grid gap-4">
                <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                  <div>
                    <p className="font-display text-sm">Watchlist updates</p>
                    <p className="label-mono mt-1 text-xs text-muted-foreground">Get notified when saved films are updated</p>
                  </div>
                  <Switch checked={settings.notifyWatchlist} onCheckedChange={() => toggle("notifyWatchlist")} />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                  <div>
                    <p className="font-display text-sm">New releases</p>
                    <p className="label-mono mt-1 text-xs text-muted-foreground">Receive alerts when new films are added</p>
                  </div>
                  <Switch checked={settings.notifyNewFilms} onCheckedChange={() => toggle("notifyNewFilms")} />
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal delay={160}>
            <section>
              <p className="label-mono text-xs uppercase tracking-wide text-muted-foreground">Display</p>
              <div className="mt-4 grid gap-4">
                <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                  <div>
                    <p className="font-display text-sm">Reduced motion</p>
                    <p className="label-mono mt-1 text-xs text-muted-foreground">Minimise animations across the interface</p>
                  </div>
                  <Switch checked={settings.reducedMotion} onCheckedChange={() => toggle("reducedMotion")} />
                </div>
              </div>
            </section>
          </Reveal>
        </div>

        <Reveal delay={240}>
          <div className="mt-16">
            <button
              onClick={() => navigate({ to: "/" })}
              className="label-mono inline-flex items-center gap-2 border border-foreground px-6 py-3 transition-colors hover:bg-foreground hover:text-background"
            >
              Back to home
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
