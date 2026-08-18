import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { filmsByTopic, getTopic, topics } from "@/lib/data";
import { FilmCard } from "@/components/FilmCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/topics/$slug")({
  loader: ({ params }) => {
    const topic = getTopic(params.slug);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Topic not found — Docuverse" }, { name: "robots", content: "noindex" }] };
    const { topic } = loaderData;
    return {
      meta: [
        { title: `${topic.name} documentaries — Docuverse` },
        { name: "description", content: topic.blurb },
        { property: "og:title", content: `${topic.name} documentaries — Docuverse` },
        { property: "og:description", content: topic.blurb },
        { property: "og:image", content: topic.image },
        { name: "twitter:image", content: topic.image },
      ],
    };
  },
  component: TopicPage,
});

function TopicPage() {
  const { topic } = Route.useLoaderData();
  const list = filmsByTopic(topic.slug);
  const lead = list[0];

  return (
    <div>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={topic.image} alt={topic.name} className="h-full w-full animate-soft-fade object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-12 md:px-10">
          <p className="label-mono animate-soft-fade text-muted-foreground">Topic</p>
          <h1 className="display-serif mt-3 animate-rise text-6xl md:text-8xl">{topic.name}</h1>
          <p className="mt-5 max-w-xl animate-rise text-sm leading-relaxed text-muted-foreground">{topic.blurb}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
        {lead && (
          <Reveal>
            <Link
              to="/film/$slug"
              params={{ slug: lead.slug }}
              className="media-zoom group grid gap-8 border-y border-border py-10 lg:grid-cols-[1.2fr_1fr] lg:items-center"
            >
              <div className="aspect-[16/9] bg-muted">
                <img src={lead.still} alt={lead.title} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="label-mono text-primary">Editor's pick</p>
                <h2 className="mt-3 font-display text-4xl md:text-5xl">{lead.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{lead.synopsis}</p>
                <p className="label-mono mt-6 text-muted-foreground">
                  {lead.runtime} · {lead.year} · Dir. {lead.filmmaker}
                </p>
              </div>
            </Link>
          </Reveal>
        )}

        <h2 className="mt-16 font-display text-3xl">All in {topic.name}</h2>
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((f, i) => (
            <Reveal key={f.slug} delay={i * 80}>
              <FilmCard film={f} />
            </Reveal>
          ))}
        </div>

        <div className="mt-20 border-t border-border pt-8">
          <p className="label-mono text-muted-foreground">Other topics</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {topics
              .filter((t) => t.slug !== topic.slug)
              .map((t) => (
                <Link
                  key={t.slug}
                  to="/topics/$slug"
                  params={{ slug: t.slug }}
                  className="label-mono border border-border px-4 py-2.5 transition-colors hover:border-foreground"
                >
                  {t.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
