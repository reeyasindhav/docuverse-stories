import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Docuverse" },
      { name: "description", content: "How Docuverse handles your data and protects your privacy." },
      { property: "og:title", content: "Privacy — Docuverse" },
      { property: "og:description", content: "Your privacy matters. Learn how Docuverse collects, uses, and protects your data." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="label-mono text-muted-foreground">Your data</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">Privacy</h1>
          <p className="mt-6 text-sm leading-relaxed text-foreground/90">
            Your privacy matters. This page explains what data Docuverse collects, how we use it, and the choices you have.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl">What we collect</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                We collect only the information needed to run the service: watchlist selections, viewing progress, and basic account details such as your email address. We do not sell this data to third parties.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h2 className="font-display text-2xl">How we use it</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                Your data is used solely to personalise your experience — saving watchlists, resuming where you left off, and improving catalogue recommendations. Analytics are aggregated and anonymised.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h2 className="font-display text-2xl">Your choices</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                You can clear your watchlist and viewing history at any time from your dashboard. Account deletion requests can be sent to privacy@docuverse.example.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h2 className="font-display text-2xl">Cookies</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                We use essential cookies to keep you signed in and remember your preferences. Optional analytics cookies can be disabled in your browser settings.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-16">
            <Link
              to="/"
              className="label-mono inline-flex items-center gap-2 border border-foreground px-6 py-3 transition-colors hover:bg-foreground hover:text-background"
            >
              Back to home
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
