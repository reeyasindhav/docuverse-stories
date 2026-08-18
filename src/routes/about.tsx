import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Docuverse" },
      { name: "description", content: "Docuverse is a specialised streaming home for documentary lovers." },
      { property: "og:title", content: "About — Docuverse" },
      { property: "og:description", content: "Cinematic topic pages, filmmaker profiles, chapter-based viewing and curated watchlists." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="label-mono text-muted-foreground">Our mission</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">About Docuverse</h1>
          <p className="mt-6 text-sm leading-relaxed text-foreground/90">
            Docuverse is a specialised streaming home for documentary lovers. We believe the best nonfiction films
            deserve the same cinematic presentation as the finest fiction.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/90">
            From immersive nature essays to hard-hitting investigative work, every title is chosen for craft,
            clarity and emotional impact.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <Reveal delay={0}>
            <div>
              <p className="label-mono text-xs uppercase tracking-wide text-muted-foreground">Curated</p>
              <p className="mt-2 font-display text-xl">Editorial collections</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Watchlists built around mood, place and theme — not just popularity.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <p className="label-mono text-xs uppercase tracking-wide text-muted-foreground">Focused</p>
              <p className="mt-2 font-display text-xl">Chapter-based viewing</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Break long docs into chapters so you can watch at your own pace.
              </p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div>
              <p className="label-mono text-xs uppercase tracking-wide text-muted-foreground">Human</p>
              <p className="mt-2 font-display text-xl">Filmmaker-first</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Profiles and interviews that put the director’s vision centre stage.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={240}>
          <div className="mt-16">
            <Link
              to="/browse"
              className="label-mono inline-flex items-center gap-2 border border-foreground px-6 py-3 transition-colors hover:bg-foreground hover:text-background"
            >
              Start browsing
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
