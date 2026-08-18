import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Docuverse" },
      { name: "description", content: "Frequently asked questions about Docuverse." },
      { property: "og:title", content: "FAQ — Docuverse" },
      { property: "og:description", content: "Answers to common questions about accounts, watchlists, playback, and more." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const faqs = [
    {
      question: "What is Docuverse?",
      answer:
        "Docuverse is a specialised streaming home for documentary lovers. We present nonfiction films with the same cinematic quality as the best fiction streaming services.",
    },
    {
      question: "Do I need an account to browse?",
      answer:
        "No. You can browse topics, watchlists, and filmmaker profiles without signing in. Creating an account lets you save films to your watchlist and track viewing progress.",
    },
    {
      question: "How do I save a film?",
      answer:
        "Tap the bookmark icon on any film card, or use the Save to watchlist button on the film detail page. Saved films appear in your dashboard.",
    },
    {
      question: "Can I watch films on mobile?",
      answer:
        "Yes. Docuverse is fully responsive and works on phones, tablets, and desktop browsers. Your progress syncs across devices when you sign in.",
    },
    {
      question: "How does chapter-based viewing work?",
      answer:
        "Long documentaries are broken into chapters so you can watch at your own pace. You can resume from any chapter from the film detail page or your dashboard.",
    },
    {
      question: "How do I cancel my account?",
      answer:
        "You can clear your watchlist and viewing history from your dashboard at any time. For full account deletion, contact us through the Contact page.",
    },
    {
      question: "Are the films free?",
      answer:
        "Docuverse offers both free and premium titles. Free films are clearly marked. Premium content requires an active subscription.",
    },
    {
      question: "How often is the catalogue updated?",
      answer:
        "We add new titles weekly. Watchlists and topic pages are refreshed regularly to highlight new acquisitions and seasonal collections.",
    },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="label-mono text-muted-foreground">Support</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">FAQ</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Answers to common questions about Docuverse.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6">
          {faqs.map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="font-display text-xl">{item.question}</h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">{item.answer}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={faqs.length * 60}>
          <div className="mt-16">
            <Link
              to="/contact"
              className="label-mono inline-flex items-center gap-2 border border-foreground px-6 py-3 transition-colors hover:bg-foreground hover:text-background"
            >
              Still have questions? Contact us
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
