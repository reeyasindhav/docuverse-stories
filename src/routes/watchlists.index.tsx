import { createFileRoute, Link } from "@tanstack/react-router";
import { watchlists } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/watchlists/")({
  head: () => ({
    meta: [
      { title: "Watchlists — Docuverse" },
      {
        name: "description",
        content: "Curated collections from Docuverse editors and guest curators.",
      },
      { property: "og:title", content: "Watchlists — Docuverse" },
      { property: "og:description", content: "Curated documentary collections." },
    ],
  }),
  component: Watchlists,
});

function Watchlists() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10">
      <Reveal>
        <p className="label-mono text-muted-foreground">Curated collections</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">Watchlists</h1>
        <p className="mt-4 max-w-lg text-sm text-muted-foreground">
          Editor's picks and guest-curated collections for every mood.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {watchlists.map((w, i) => (
          <Reveal key={w.slug} delay={i * 80}>
            <Link
              to="/watchlists/$slug"
              params={{ slug: w.slug }}
              className="media-zoom group flex flex-col"
            >
              <div className="aspect-[16/9] bg-muted">
                <img src={w.cover} alt={w.title} className="h-full w-full object-cover" />
              </div>
              <div className="mt-4">
                <p className="label-mono text-xs text-muted-foreground">{w.curator}</p>
                <h2 className="mt-2 font-display text-2xl transition-colors group-hover:text-primary">
                  {w.title}
                </h2>
                <p className="label-mono mt-2 text-muted-foreground">{w.films.length} films</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
