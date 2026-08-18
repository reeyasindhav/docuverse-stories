import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getWatchlist, films } from "@/lib/data";
import { FilmCard } from "@/components/FilmCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/watchlists/$slug")({
  loader: ({ params }) => {
    const watchlist = getWatchlist(params.slug);
    if (!watchlist) throw notFound();
    const items = watchlist.films.map((slug) => films.find((f) => f.slug === slug)).filter(Boolean);
    return { watchlist, items };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Watchlist not found — Docuverse" }, { name: "robots", content: "noindex" }] };
    const { watchlist } = loaderData;
    return {
      meta: [
        { title: `${watchlist.title} — Docuverse` },
        { name: "description", content: watchlist.blurb },
        { property: "og:title", content: `${watchlist.title} — Docuverse` },
        { property: "og:description", content: watchlist.blurb },
        { property: "og:image", content: watchlist.cover },
      ],
    };
  },
  component: WatchlistPage,
});

function WatchlistPage() {
  const { watchlist, items } = Route.useLoaderData();

  return (
    <div>
      <section className="relative">
        <div className="aspect-[21/9] bg-muted">
          <img src={watchlist.cover} alt={watchlist.title} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-10 md:px-10">
          <Reveal>
            <Link to="/watchlists" className="label-mono text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 inline h-3.5 w-3.5" />
              All watchlists
            </Link>
            <h1 className="mt-6 font-display text-5xl md:text-7xl">{watchlist.title}</h1>
            <p className="label-mono mt-3 text-muted-foreground">Curated by {watchlist.curator}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/90">{watchlist.blurb}</p>
            {watchlist.note && (
              <p className="mt-4 max-w-2xl text-sm italic leading-relaxed text-muted-foreground">{watchlist.note}</p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-12 md:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((film, i) => (
            <Reveal key={film!.slug} delay={(i % 4) * 80}>
              <FilmCard film={film!} />
            </Reveal>
          ))}
        </div>

        {items.length === 0 && (
          <div className="py-24 text-center">
            <h2 className="font-display text-3xl">No films in this collection yet.</h2>
          </div>
        )}
      </section>
    </div>
  );
}
