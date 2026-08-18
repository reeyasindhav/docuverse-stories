import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, Play, LogOut, Flame, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { films } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Docuverse" },
      { name: "description", content: "Your watchlists and viewing progress." },
    ],
  }),
  component: DashboardPage,
});

const featured = films[0]!;

function DashboardPage() {
  const { user, saved, progress, signOut } = useStore();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const savedFilms = films.filter((f) => saved.includes(f.slug));
  const progressEntries = Object.entries(progress)
    .map(([slug, data]) => ({ film: films.find((f) => f.slug === slug), ...data }))
    .filter((entry) => entry.film)
    .sort((a, b) => b.updatedAt - a.updatedAt);

  const confirmSignOut = () => {
    signOut();
    navigate({ to: "/" });
  };

  const inProgress = progressEntries.filter((e) => e.percent > 0 && e.percent < 100).length;
  const completed = progressEntries.filter((e) => e.percent >= 100).length;

  return (
    <div className="min-h-screen">
      <section className="relative h-[320px] md:h-[400px]">
        <div className="absolute inset-0 bg-muted">
          <img
            src={featured.still}
            alt={featured.title}
            className="h-full w-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-8 md:px-10">
          <Link
            to="/"
            className="label-mono inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to browse
          </Link>
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label-mono text-primary">Your space</p>
              <h1 className="mt-3 font-display text-5xl text-white md:text-7xl">Dashboard</h1>
              {user && (
                <div className="mt-4 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-display text-xl text-foreground">{user.name}</p>
                    <p className="label-mono text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/settings"
                className="label-mono border border-border bg-background/80 px-4 py-2.5 text-foreground transition-colors hover:border-foreground hover:bg-background"
              >
                Settings
              </Link>
              <button
                onClick={() => setConfirmOpen(true)}
                className="label-mono inline-flex items-center gap-2 border border-border bg-background/80 px-4 py-2.5 text-foreground transition-colors hover:border-foreground hover:bg-background"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-12 md:px-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Bookmark className="h-5 w-5" />
              </div>
              <div>
                <p className="label-mono text-muted-foreground">Saved</p>
                <p className="font-display text-3xl">{savedFilms.length}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Films in your watchlist</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="label-mono text-muted-foreground">In progress</p>
                <p className="font-display text-3xl">{inProgress}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Films you&apos;re currently watching</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="label-mono text-muted-foreground">Completed</p>
                <p className="font-display text-3xl">{completed}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Films you&apos;ve finished</p>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-center gap-3">
            <Play className="h-4 w-4 text-primary" />
            <p className="label-mono text-xs uppercase tracking-wide text-muted-foreground">
              Continue watching ({progressEntries.length})
            </p>
          </div>
          {progressEntries.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {progressEntries.slice(0, 6).map((entry) => (
                <Link
                  key={entry.film!.slug}
                  to="/film/$slug"
                  params={{ slug: entry.film!.slug }}
                  className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/20"
                >
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={entry.film!.still}
                      alt={entry.film!.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                          {entry.film!.kind}
                        </Badge>
                        <span className="label-mono text-xs text-white/80">{entry.film!.runtime}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
                        <Play className="h-5 w-5 fill-current" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg transition-colors group-hover:text-primary">
                      {entry.film!.title}
                    </h3>
                    <p className="label-mono mt-1 text-xs text-muted-foreground">
                      {entry.percent}% watched · Chapter {entry.chapter + 1}
                    </p>
                    <div className="mt-3">
                      <Progress value={entry.percent} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-border p-12 text-center">
              <Play className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-4 font-display text-xl">Nothing in progress</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Start watching a film and your progress will appear here.
              </p>
              <Link
                to="/browse"
                className="label-mono mt-6 inline-block border border-foreground px-6 py-3 transition-colors hover:bg-foreground hover:text-background"
              >
                Browse films
              </Link>
            </div>
          )}
        </div>

        <div className="mt-16">
          <div className="flex items-center gap-3">
            <Bookmark className="h-4 w-4 text-primary" />
            <p className="label-mono text-xs uppercase tracking-wide text-muted-foreground">
              Saved for later ({savedFilms.length})
            </p>
          </div>
          {savedFilms.length > 0 ? (
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {savedFilms.map((f) => (
                <Link key={f.slug} to="/film/$slug" params={{ slug: f.slug }} className="media-zoom group block">
                  <div className="aspect-[4/5] bg-muted">
                    <img src={f.image} alt={f.title} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="mt-3 font-display text-lg transition-colors group-hover:text-primary">{f.title}</h3>
                  <p className="label-mono mt-1 text-xs text-muted-foreground">
                    {f.runtime} · {f.year} · {f.topic}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-border p-12 text-center">
              <Bookmark className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-4 font-display text-xl">No saved films</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Browse the archive and bookmark films you want to watch.
              </p>
              <Link
                to="/browse"
                className="label-mono mt-6 inline-block border border-foreground px-6 py-3 transition-colors hover:bg-foreground hover:text-background"
              >
                Browse films
              </Link>
            </div>
          )}
        </div>
      </section>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Sign out?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">You can always sign back in to access your watchlist and progress.</p>
          <DialogFooter>
            <button
              onClick={() => setConfirmOpen(false)}
              className="label-mono border border-border px-4 py-2.5 transition-colors hover:border-foreground"
            >
              Cancel
            </button>
            <button
              onClick={confirmSignOut}
              className="label-mono bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-85"
            >
              Sign out
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
