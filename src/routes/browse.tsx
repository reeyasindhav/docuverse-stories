import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { films, topics } from "@/lib/data";
import { FilmCard } from "@/components/FilmCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse the archive — Docuverse" },
      {
        name: "description",
        content: "Search and filter the full Docuverse catalogue by topic, format and release year.",
      },
      { property: "og:title", content: "Browse the archive — Docuverse" },
      { property: "og:description", content: "Filter documentaries by topic, format and year." },
    ],
  }),
  component: Browse,
});

const kinds = ["All formats", "Feature", "Series", "Short"] as const;
const sorts = ["Newest", "Highest rated", "A–Z"] as const;

function Browse() {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState("all");
  const [kind, setKind] = useState<string>("All formats");
  const [sort, setSort] = useState<string>("Newest");

  const results = useMemo(() => {
    let out = films.filter((f) => {
      const matchQ =
        !q ||
        f.title.toLowerCase().includes(q.toLowerCase()) ||
        f.filmmaker.toLowerCase().includes(q.toLowerCase()) ||
        f.tagline.toLowerCase().includes(q.toLowerCase());
      const matchTopic = topic === "all" || f.topicSlug === topic;
      const matchKind = kind === "All formats" || f.kind === kind;
      return matchQ && matchTopic && matchKind;
    });
    out = [...out].sort((a, b) =>
      sort === "Newest" ? b.year - a.year : sort === "Highest rated" ? b.rating - a.rating : a.title.localeCompare(b.title),
    );
    return out;
  }, [q, topic, kind, sort]);

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10">
      <Reveal>
        <p className="label-mono text-muted-foreground">The full archive</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">Browse</h1>
        <p className="mt-4 max-w-lg text-sm text-muted-foreground">
          {films.length} films, no reality TV. Filter by what you actually want to think about.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-10 border-y border-border py-5">
          <div className="flex items-center gap-3 border-b border-border pb-5">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search titles, filmmakers, subjects…"
              className="w-full bg-transparent font-display text-2xl outline-none placeholder:text-muted-foreground/60 md:text-3xl"
            />
          </div>

          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <Chip active={topic === "all"} onClick={() => setTopic("all")}>
                All topics
              </Chip>
              {topics.map((t) => (
                <Chip key={t.slug} active={topic === t.slug} onClick={() => setTopic(t.slug)}>
                  {t.name}
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {kinds.map((k) => (
                <Chip key={k} active={kind === k} onClick={() => setKind(k)}>
                  {k}
                </Chip>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="label-mono text-muted-foreground">Sort</span>
            {sorts.map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={
                  "label-mono transition-colors " +
                  (sort === s ? "text-foreground underline underline-offset-4" : "text-muted-foreground hover:text-foreground")
                }
              >
                {s}
              </button>
            ))}
            <span className="label-mono ml-auto text-muted-foreground">{results.length} results</span>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {results.map((film, i) => (
          <Reveal key={film.slug} delay={(i % 4) * 80}>
            <FilmCard film={film} />
          </Reveal>
        ))}
      </div>

      {results.length === 0 && (
        <div className="py-24 text-center">
          <h2 className="font-display text-3xl">Nothing matched.</h2>
          <p className="mt-3 text-sm text-muted-foreground">Try a broader topic or clear the search field.</p>
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={
        "label-mono border px-3.5 py-2 transition-all duration-300 " +
        (active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}
