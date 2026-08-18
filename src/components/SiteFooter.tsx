import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="label-mono text-muted-foreground">© 2026 Docuverse</p>
        <p className="label-mono text-muted-foreground">Stories worth staying for.</p>
        <nav className="flex flex-wrap gap-5">
          <Link to="/about" className="label-mono rule-link text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link to="/filmmakers" className="label-mono rule-link text-muted-foreground hover:text-foreground">
            Filmmakers
          </Link>
          <Link to="/watchlists" className="label-mono rule-link text-muted-foreground hover:text-foreground">
            Journal
          </Link>
        </nav>
      </div>
    </footer>
  );
}
