import { createFileRoute, Link } from "@tanstack/react-router";
import { topics, filmsByTopic } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/topics/")({
  head: () => ({
    meta: [
      { title: "Topics — Docuverse" },
      {
        name: "description",
        content: "Documentaries organised by meaningful themes: climate, oceans, culture, science, people and place.",
      },
      { property: "og:title", content: "Topics — Docuverse" },
      { property: "og:description", content: "Cinematic topic pages for documentary lovers." },
    ],
  }),
  component: Topics,
});

function Topics() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10">
      <Reveal>
        <p className="label-mono text-muted-foreground">Organised by meaning</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">Topics</h1>
        <p className="mt-4 max-w-lg text-sm text-muted-foreground">
          Not genres. Subjects. Each topic page is edited like a magazine issue.
        </p>
      </Reveal>

      <div className="mt-14 flex flex-col">
        {topics.map((t, i) => (
          <Reveal key={t.slug} delay={i * 60}>
            <Link
              to="/topics/$slug"
              params={{ slug: t.slug }}
              className="media-zoom group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 border-t border-border py-8 last:border-b md:grid-cols-[6rem_1fr_18rem_auto]"
            >
              <span className="label-mono hidden text-muted-foreground md:block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-3xl transition-colors group-hover:text-primary md:text-4xl">
                  {t.name}
                </h2>
                <p className="label-mono mt-2 text-muted-foreground">{filmsByTopic(t.slug).length} films</p>
              </div>
              <p className="hidden text-sm leading-relaxed text-muted-foreground md:block">{t.blurb}</p>
              <div className="h-20 w-28 shrink-0 overflow-hidden bg-muted md:h-24 md:w-40">
                <img src={t.image} alt={t.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
