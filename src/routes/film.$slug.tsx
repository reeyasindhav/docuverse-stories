import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, Star, Play } from "lucide-react";
import { toast } from "sonner";
import { getFilm, getFilmmaker, filmsByTopic } from "@/lib/data";
import { FilmCard } from "@/components/FilmCard";
import { Reveal } from "@/components/Reveal";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/film/$slug")({
  loader: ({ params }) => {
    const film = getFilm(params.slug);
    if (!film) throw notFound();
    const filmmaker = getFilmmaker(film.filmmakerSlug);
    const related = filmsByTopic(film.topicSlug).filter((f) => f.slug !== film.slug);
    return { film, filmmaker, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Film not found — Docuverse" }, { name: "robots", content: "noindex" }] };
    const { film } = loaderData;
    return {
      meta: [
        { title: `${film.title} — Docuverse` },
        { name: "description", content: film.synopsis },
        { property: "og:title", content: `${film.title} — Docuverse` },
        { property: "og:description", content: film.synopsis },
        { property: "og:image", content: film.still },
      ],
    };
  },
  component: FilmPage,
});

function FilmPage() {
  const { film, filmmaker, related } = Route.useLoaderData();
  const { isSaved, toggleSave } = useStore();
  const saved = isSaved(film.slug);

  return (
    <div>
      <section className="relative">
        <div className="aspect-[21/9] bg-muted">
          <img src={film.still} alt={film.title} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-10 md:px-10">
          <Reveal>
            <Link to="/browse" className="label-mono text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 inline h-3.5 w-3.5" />
              Back to browse
            </Link>
            <h1 className="mt-6 font-display text-5xl md:text-7xl">{film.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="label-mono rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wide">
                {film.kind}
              </span>
              <span className="label-mono text-muted-foreground">
                {film.runtime} · {film.year} · {film.topic}
              </span>
              <span className="flex items-center gap-1 label-mono text-primary">
                <Star className="h-3.5 w-3.5 fill-current" />
                {film.rating}
              </span>
              <Link
                to="/watch/$slug"
                params={{ slug: film.slug }}
                className="label-mono inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-primary-foreground transition-opacity hover:opacity-85"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                Play now
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-12 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="label-mono text-xs uppercase tracking-wide text-muted-foreground">Synopsis</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/90">{film.synopsis}</p>
            <p className="label-mono mt-8 text-xs uppercase tracking-wide text-muted-foreground">Tagline</p>
            <p className="mt-2 font-display text-2xl italic text-foreground/90">&ldquo;{film.tagline}&rdquo;</p>

            {film.chapters.length > 0 && (
              <>
                <p className="label-mono mt-10 text-xs uppercase tracking-wide text-muted-foreground">Chapters</p>
                <div className="mt-4 grid gap-3">
                  {film.chapters.map((ch, idx) => (
                    <Link
                      key={ch.id}
                      to="/watch/$slug"
                      params={{ slug: film.slug }}
                      search={{ chapter: idx }}
                      className="flex items-start gap-4 border-b border-border pb-3 last:border-0 transition-colors hover:text-primary"
                    >
                      <span className="label-mono mt-0.5 min-w-[3rem] text-right text-xs text-muted-foreground">
                        {ch.start}
                      </span>
                      <div>
                        <p className="font-display text-sm">{ch.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{ch.summary}</p>
                      </div>
                      <span className="label-mono ml-auto text-xs text-muted-foreground">{ch.duration}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {film.awards.length > 0 && (
              <>
                <p className="label-mono mt-10 text-xs uppercase tracking-wide text-muted-foreground">Awards</p>
                <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-foreground/90">
                  {film.awards.map((award) => (
                    <li key={award}>{award}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <button
                onClick={() => {
                  const willSave = !saved;
                  toggleSave(film.slug);
                  toast.success(willSave ? `Saved "${film.title}" to watchlist` : `Removed "${film.title}" from watchlist`);
                }}
                className={cn(
                  "label-mono flex items-center gap-2 border px-4 py-2.5 transition-all duration-300",
                  saved ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground",
                )}
              >
                <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
                {saved ? "Saved to watchlist" : "Save to watchlist"}
              </button>
            </div>

            {filmmaker && (
              <div>
                <p className="label-mono text-xs uppercase tracking-wide text-muted-foreground">Filmmaker</p>
                <Link
                  to="/filmmakers/$slug"
                  params={{ slug: filmmaker.slug }}
                  className="mt-2 flex items-center gap-4 group"
                >
                  <div className="h-16 w-16 overflow-hidden rounded-full bg-muted">
                    <img src={filmmaker.portrait} alt={filmmaker.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-display text-lg group-hover:text-primary">{filmmaker.name}</p>
                    <p className="label-mono text-xs text-muted-foreground">{filmmaker.role}</p>
                    <p className="label-mono text-xs text-muted-foreground">{filmmaker.based}</p>
                  </div>
                </Link>
                <p className="mt-4 text-sm leading-relaxed text-foreground/90">{filmmaker.bio}</p>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <p className="label-mono text-xs uppercase tracking-wide text-muted-foreground">More in {film.topic}</p>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {related.slice(0, 4).map((f, i) => (
                <Reveal key={f.slug} delay={i * 80}>
                  <FilmCard film={f} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
