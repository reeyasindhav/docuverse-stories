import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getFilmmaker, filmsByMaker } from "@/lib/data";
import { FilmCard } from "@/components/FilmCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/filmmakers/$slug")({
  loader: ({ params }) => {
    const filmmaker = getFilmmaker(params.slug);
    if (!filmmaker) throw notFound();
    const filmList = filmsByMaker(filmmaker.slug);
    return { filmmaker, filmList };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Filmmaker not found — Docuverse" }, { name: "robots", content: "noindex" }] };
    const { filmmaker } = loaderData;
    return {
      meta: [
        { title: `${filmmaker.name} — Docuverse` },
        { name: "description", content: filmmaker.bio },
        { property: "og:title", content: `${filmmaker.name} — Docuverse` },
        { property: "og:description", content: filmmaker.bio },
        { property: "og:image", content: filmmaker.cover },
      ],
    };
  },
  component: FilmmakerPage,
});

function FilmmakerPage() {
  const { filmmaker, filmList } = Route.useLoaderData();

  return (
    <div>
      <section className="relative">
        <div className="aspect-[21/9] bg-muted">
          <img src={filmmaker.cover} alt={filmmaker.name} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-10 md:px-10">
          <Reveal>
            <Link to="/filmmakers" className="label-mono text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 inline h-3.5 w-3.5" />
              All filmmakers
            </Link>
            <div className="mt-6 flex items-end gap-6">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-muted md:h-32 md:w-32">
                <img src={filmmaker.portrait} alt={filmmaker.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <h1 className="font-display text-5xl md:text-7xl">{filmmaker.name}</h1>
                <p className="label-mono mt-2 text-muted-foreground">{filmmaker.role} · {filmmaker.based}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-12 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="label-mono text-xs uppercase tracking-wide text-muted-foreground">About</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/90">{filmmaker.bio}</p>
            <p className="label-mono mt-8 text-xs uppercase tracking-wide text-muted-foreground">Statement</p>
            <p className="mt-2 font-display text-xl italic text-foreground/90">&ldquo;{filmmaker.statement}&rdquo;</p>
          </div>

          <div>
            <p className="label-mono text-xs uppercase tracking-wide text-muted-foreground">Awards</p>
            {filmmaker.awards.length > 0 ? (
              <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-foreground/90">
                {filmmaker.awards.map((award) => (
                  <li key={award}>{award}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">No awards listed yet.</p>
            )}
          </div>
        </div>

        {filmList.length > 0 && (
          <div className="mt-20">
            <p className="label-mono text-xs uppercase tracking-wide text-muted-foreground">Films</p>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {filmList.map((f, i) => (
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
