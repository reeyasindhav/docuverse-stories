import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { films, topics, watchlists } from "@/lib/data";
import { FilmCard } from "@/components/FilmCard";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Docuverse — Watch the world unfold" },
      {
        name: "description",
        content:
          "Documentaries with depth. Discover films that stay with you, organised by theme, filmmaker and chapter.",
      },
      { property: "og:title", content: "Docuverse — Watch the world unfold" },
      {
        property: "og:description",
        content: "A home for real stories: cinematic topic pages, filmmaker profiles and curated watchlists.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = films[0]!;
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? films.slice(0, 4) : films.filter((f) => f.topicSlug === filter).slice(0, 4);
  const spotlight = watchlists[0]!;

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto grid max-w-[1400px] gap-10 px-5 pb-20 pt-8 md:px-10 lg:grid-cols-2 lg:gap-14 lg:pt-14">
        <div className="flex flex-col justify-between">
          <div>
            <p className="label-mono animate-soft-fade text-muted-foreground">A home for real stories</p>
            <h1 className="display-serif mt-6 animate-rise text-[3.4rem] leading-[0.92] sm:text-7xl lg:text-[6.2rem]">
              Watch
              <br />
              <em className="not-italic text-primary" style={{ fontStyle: "italic" }}>
                <span className="italic">the world</span>
              </em>
              <br />
              unfold.
            </h1>
          </div>
          <div className="mt-12 border-t border-border pt-6">
            <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                Documentaries with depth. Discover films that stay with you, from the people who made them.
              </p>
              <p className="label-mono leading-relaxed text-muted-foreground">
                Est. 2026
                <br />
                Independently
                <br />
                curated
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/browse"
                className="label-mono bg-foreground px-6 py-3.5 text-background transition-opacity hover:opacity-85"
              >
                Start browsing
              </Link>
              <Link
                to="/topics"
                className="label-mono border border-border px-6 py-3.5 transition-colors hover:border-foreground"
              >
                Explore topics
              </Link>
            </div>
          </div>
        </div>

        <Link
          to="/film/$slug"
          params={{ slug: featured.slug }}
          className="media-zoom group relative block aspect-[4/3] animate-reveal bg-muted lg:aspect-auto lg:min-h-[600px]"
        >
          <img src={featured.image} alt={featured.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
            <div className="min-w-0">
              <p className="label-mono text-white/80">Featured film · New release</p>
              <h2 className="mt-2 font-display text-3xl text-white md:text-4xl">{featured.title}</h2>
            </div>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:scale-110">
              <Play className="h-5 w-5 fill-current" />
            </span>
          </div>
        </Link>
      </section>

      {/* Archive */}
      <section className="border-y border-border bg-sand">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10">
          <SectionHead eyebrow="Explore the archive" title="Find your next story" linkTo="/browse" />

          <Reveal delay={80}>
            <div className="mt-10 flex flex-wrap gap-2">
              <FilterChip active={filter === "all"} onClick={() => setFilter("all")} label="All films" />
              {topics.map((t) => (
                <FilterChip
                  key={t.slug}
                  active={filter === t.slug}
                  onClick={() => setFilter(t.slug)}
                  label={t.name}
                />
              ))}
            </div>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((film, i) => (
              <Reveal key={film.slug} delay={i * 90}>
                <FilmCard film={film} />
              </Reveal>
            ))}
            {list.length === 0 && (
              <p className="text-sm text-muted-foreground">No films in this topic yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Watchlist spotlight */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="label-mono text-muted-foreground">Curated watchlist</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              For when you need to feel <span className="italic text-primary">small.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">{spotlight.blurb}</p>
            <Link
              to="/watchlists/$slug"
              params={{ slug: spotlight.slug }}
              className="label-mono rule-link mt-8 inline-flex items-center gap-2"
            >
              Explore collection <ArrowRight className="h-3 w-3" />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative h-[420px]">
              <div className="media-zoom absolute left-0 top-0 h-[62%] w-[62%]">
                <img src={films[5]!.image} alt={films[5]!.title} className="h-full w-full object-cover" />
              </div>
              <div className="media-zoom absolute bottom-0 right-0 h-[62%] w-[62%] border-8 border-background">
                <img src={films[3]!.image} alt={films[3]!.title} className="h-full w-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Topics strip */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10">
          <SectionHead eyebrow="Organised by meaning" title="Topic pages" linkTo="/topics" />
          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {topics.map((t, i) => (
              <Reveal key={t.slug} delay={i * 70}>
                <Link
                  to="/topics/$slug"
                  params={{ slug: t.slug }}
                  className="media-zoom group relative flex h-56 items-end bg-background p-5"
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-25 transition-opacity duration-500 group-hover:opacity-45"
                  />
                  <div className="relative">
                    <h3 className="font-display text-2xl">{t.name}</h3>
                    <p className="label-mono mt-2 text-muted-foreground">Explore →</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={
        "label-mono border px-4 py-2.5 transition-all duration-300 " +
        (active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground")
      }
    >
      {label}
    </button>
  );
}
