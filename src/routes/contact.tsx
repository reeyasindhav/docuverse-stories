import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Docuverse" },
      { name: "description", content: "Get in touch with the Docuverse team." },
      { property: "og:title", content: "Contact — Docuverse" },
      { property: "og:description", content: "Questions, feedback, or partnership enquiries." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Message sent. We'll get back to you soon.");
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="label-mono text-muted-foreground">Get in touch</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">Contact</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Questions, feedback, or partnership enquiries — we'd love to hear from you.
          </p>
        </Reveal>

        {!submitted ? (
          <form onSubmit={onSubmit} className="mt-10 grid gap-6">
            <div>
              <label className="label-mono text-xs uppercase tracking-wide text-muted-foreground">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-2 w-full border-b border-border bg-transparent pb-3 font-display text-xl outline-none transition-colors focus:border-foreground"
              />
            </div>
            <div>
              <label className="label-mono text-xs uppercase tracking-wide text-muted-foreground">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full border-b border-border bg-transparent pb-3 font-display text-xl outline-none transition-colors focus:border-foreground"
              />
            </div>
            <div>
              <label className="label-mono text-xs uppercase tracking-wide text-muted-foreground">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what's on your mind..."
                rows={5}
                className="mt-2 w-full border border-border bg-transparent p-3 font-display text-base outline-none transition-colors focus:border-foreground"
              />
            </div>
            <button
              type="submit"
              className="label-mono bg-foreground px-6 py-3.5 text-background transition-opacity hover:opacity-85"
            >
              Send message
            </button>
          </form>
        ) : (
          <div className="mt-10 rounded-xl border border-border bg-card p-8 text-center">
            <p className="font-display text-2xl">Thanks for reaching out</p>
            <p className="mt-2 text-sm text-muted-foreground">We'll reply to {email} as soon as possible.</p>
            <button
              onClick={() => {
                setSubmitted(false);
                setName("");
                setEmail("");
                setMessage("");
              }}
              className="label-mono mt-6 border border-foreground px-6 py-3 transition-colors hover:bg-foreground hover:text-background"
            >
              Send another message
            </button>
          </div>
        )}

        <Reveal delay={200}>
          <div className="mt-16">
            <Link
              to="/"
              className="label-mono inline-flex items-center gap-2 border border-foreground px-6 py-3 transition-colors hover:bg-foreground hover:text-background"
            >
              ← Back to home
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
