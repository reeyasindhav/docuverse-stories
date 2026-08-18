import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/browse", label: "Browse" },
  { to: "/topics", label: "Topics" },
  { to: "/watchlists", label: "Watchlists" },
  { to: "/filmmakers", label: "Filmmakers" },
] as const;

export function SiteHeader() {
  const { user } = useStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:grid-cols-[1fr_auto_1fr] md:px-10">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-primary font-mono text-xs text-primary-foreground">
            D/
          </span>
          <span className="label-mono truncate text-foreground">Docuverse</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="label-mono rule-link text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => navigate({ to: "/browse" })}
            aria-label="Search films"
            className="grid h-9 w-9 place-items-center rounded-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="h-4 w-4" />
          </button>
          {user ? (
            <Link
              to="/dashboard"
              className="label-mono hidden border border-border px-4 py-2.5 transition-colors hover:border-foreground md:block"
            >
              {user.name.split(" ")[0]}
            </Link>
          ) : (
            <Link
              to="/login"
              className="label-mono hidden border border-border px-4 py-2.5 transition-colors hover:border-foreground md:block"
            >
              Sign in
            </Link>
          )}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="grid h-9 w-9 shrink-0 place-items-center md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-rise border-t border-border bg-background px-5 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="label-mono">
                {n.label}
              </Link>
            ))}
            <Link to={user ? "/dashboard" : "/login"} onClick={() => setOpen(false)} className="label-mono text-primary">
              {user ? "Dashboard" : "Sign in"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
