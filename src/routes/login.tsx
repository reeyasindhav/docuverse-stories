import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { films } from "@/lib/data";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Docuverse" },
      { name: "description", content: "Sign in to save watchlists and track your progress." },
    ],
  }),
  component: LoginPage,
});

const featured = films[0]!;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { signIn } = useStore();
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    signIn(email.trim(), name.trim() || undefined);
    navigate({ to: "/" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src={featured.still}
          alt={featured.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-10 pb-12">
          <p className="label-mono text-white/80">Featured</p>
          <h2 className="mt-3 font-display text-4xl text-white">{featured.title}</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">{featured.synopsis}</p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="mx-auto max-w-md px-5 py-14 md:px-10">
          <Link to="/" className="label-mono inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to browse
          </Link>
          <p className="label-mono mt-10 text-muted-foreground">Welcome back</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">Sign in</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Sign in to save watchlists and track your progress across films.
          </p>

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
            <button
              type="submit"
              className="label-mono bg-foreground px-6 py-3.5 text-background transition-opacity hover:opacity-85"
            >
              Sign in
            </button>
          </form>

          <p className="mt-8 text-sm text-muted-foreground">
            No account needed — just enter an email and we&apos;ll set you up.
          </p>

          <Link to="/signup" className="label-mono mt-2 inline-block text-muted-foreground hover:text-foreground">
            Create an account →
          </Link>
        </div>
      </div>
    </div>
  );
}
