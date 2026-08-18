import { createFileRoute, Link, notFound, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowLeft, Play, Pause, X, Maximize } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getFilm } from "@/lib/data";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Search = { chapter?: number };

export const Route = createFileRoute("/watch/$slug")({
  loader: ({ params }) => {
    const film = getFilm(params.slug);
    if (!film) throw notFound();
    return { film };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — Docuverse" }, { name: "robots", content: "noindex" }] };
    const { film } = loaderData;
    return {
      meta: [
        { title: `Watching ${film.title} — Docuverse` },
        { name: "description", content: film.synopsis },
        { property: "og:title", content: `Watching ${film.title} — Docuverse` },
        { property: "og:description", content: film.synopsis },
        { property: "og:image", content: film.still },
      ],
    };
  },
  component: WatchPage,
});

function WatchPage() {
  const { film } = Route.useLoaderData();
  const search = useSearch({ from: "/watch/$slug" }) as Search;
  const { setProgress } = useStore();
  const navigate = useNavigate();
  const [paused, setPaused] = useState(false);
  const [progress, setLocalProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState<number | null>(search.chapter ?? null);
  const [minimized, setMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const filmSlugRef = useRef(film.slug);
  const filmTitleRef = useRef(film.title);

  useEffect(() => {
    filmSlugRef.current = film.slug;
    filmTitleRef.current = film.title;
  }, [film.slug, film.title]);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleStop = () => {
    clearTimer();
    setIsPlaying(false);
    setPaused(false);
    setLocalProgress(0);
    setMinimized(false);
    navigate({ to: "/film/$slug", params: { slug: filmSlugRef.current } });
  };

  const handlePlay = () => {
    clearTimer();
    setIsPlaying(true);
    setPaused(false);
    setLocalProgress(0);
  };

  useEffect(() => {
    if (!isPlaying || paused) return;
    intervalRef.current = setInterval(() => {
      setLocalProgress((prev) => {
        if (prev >= 100) {
          clearTimer();
          setProgress(filmSlugRef.current, currentChapter ?? 0, 100);
          toast.success(`Finished watching ${filmTitleRef.current}`);
          handleStop();
          return 0;
        }
        const next = prev + 1;
        setProgress(filmSlugRef.current, currentChapter ?? 0, next);
        return next;
      });
    }, 300);
    return clearTimer;
  }, [isPlaying, paused, currentChapter, setProgress, handleStop, toast]);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  const effectiveChapter = currentChapter !== null ? film.chapters[currentChapter]! : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className={cn(
          "relative w-full max-w-2xl overflow-hidden rounded-lg border border-border bg-background shadow-xl transition-all duration-300",
          minimized ? "h-auto" : "max-h-[80vh]",
        )}
      >
        <div className="relative aspect-video bg-muted">
          <img src={film.still} alt={film.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
            <div>
              <p className="label-mono text-muted-foreground">Now Playing</p>
              <p className="font-display text-lg text-foreground">
                {effectiveChapter ? effectiveChapter.title : film.title}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMinimized((m) => !m)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition-colors hover:bg-muted"
              >
                <Maximize className="h-4 w-4" />
              </button>
              <Link
                to="/film/$slug"
                params={{ slug: film.slug }}
                onClick={clearTimer}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition-colors hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
          {!minimized && (
            <div className="absolute inset-0 flex items-center justify-center">
              {!isPlaying ? (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-85"
                >
                  <Play className="h-8 w-8 fill-current" />
                </button>
              ) : (
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPaused((p) => !p)}
                      className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-85"
                    >
                      {paused ? <Play className="h-5 w-5 fill-current" /> : <Pause className="h-5 w-5" />}
                    </button>
                    <div className="flex-1">
                      <Progress value={progress} />
                    </div>
                    <span className="label-mono text-xs text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {!minimized && (
          <div className="max-h-[35vh] overflow-y-auto p-4">
            <p className="label-mono text-xs uppercase tracking-wide text-muted-foreground">Chapters</p>
            <div className="mt-2">
              {film.chapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setCurrentChapter(idx)}
                  className={cn(
                    "flex w-full items-center gap-3 border-b border-border pb-2 pt-2 text-left last:border-0 transition-colors",
                    currentChapter === idx ? "text-primary" : "hover:text-primary",
                  )}
                >
                  <span className="label-mono min-w-[2.5rem] text-right text-xs text-muted-foreground">{ch.start}</span>
                  <div className="flex-1">
                    <p className="font-display text-sm">{ch.title}</p>
                    <p className="text-xs text-muted-foreground">{ch.summary}</p>
                  </div>
                  <span className="label-mono text-xs text-muted-foreground">{ch.duration}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
