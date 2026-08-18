import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Docuverse" },
      { name: "description", content: "Terms of service for using Docuverse." },
      { property: "og:title", content: "Terms — Docuverse" },
      { property: "og:description", content: "Terms and conditions for Docuverse users." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="label-mono text-muted-foreground">Legal</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">Terms</h1>
          <p className="mt-6 text-sm leading-relaxed text-foreground/90">
            By using Docuverse, you agree to these terms. Please read them carefully.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl">Acceptance of terms</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                These terms apply to all visitors, users, and others who access or use the service. By accessing or using Docuverse, you agree to be bound by these terms.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h2 className="font-display text-2xl">Use of the service</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                Docuverse is provided for personal, non-commercial use only. You may not reproduce, distribute, or create derivative works from the content without permission.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h2 className="font-display text-2xl">Accounts</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                You are responsible for safeguarding the password and for all activities under your account. Notify us immediately of any unauthorised use.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h2 className="font-display text-2xl">Limitation of liability</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                Docuverse is provided on an as-is basis without warranties of any kind. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h2 className="font-display text-2xl">Changes</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.
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
