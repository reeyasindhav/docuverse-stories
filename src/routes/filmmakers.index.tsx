import { createFileRoute, Link } from "@tanstack/react-router";
import { filmmakers } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/filmmakers/")({
  head: () => ({
    meta: [
      { title: "Filmmakers — Docuverse" },
      {
        name: "description",
        content: "Meet the directors behind the documentaries.",
      },
      { property: "og:title", content: "Filmmakers — Docuverse" },
      { property: "og:description", content: "Director profiles and filmmaker stories." },
    ],
  }),
  component: Filmmakers,
});

function Filmmakers() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10">
      <Reveal>
        <p className="label-mono text-muted-foreground">The people behind the lens</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">Filmmakers</h1>
        <p className="mt-4 max-w-lg text-sm text-muted-foreground">
          Directors, cinematographers and observers who chose to stay long enough to understand.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {filmmakers.map((fm, i) => (
          <Reveal key={fm.slug} delay={i * 80}>
            <Link
              to="/filmmakers/$slug"
              params={{ slug: fm.slug }}
              className="media-zoom group flex flex-col"
            >
              <div className="aspect-[4/5] bg-muted">
                <img src={fm.portrait} alt={fm.name} className="h-full w-full object-cover" />
              </div>
              <div className="mt-4">
                <h2 className="font-display text-xl transition-colors group-hover:text-primary">{fm.name}</h2>
                <p className="label-mono mt-1 text-xs text-muted-foreground">{fm.role}</p>
                <p className="label-mono mt-1 text-xs text-muted-foreground">{fm.based}</p>
                <p className="label-mono mt-2 text-xs text-muted-foreground">{fm.films.length} films</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
