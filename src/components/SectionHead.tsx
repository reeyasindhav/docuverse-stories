import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function SectionHead({
  eyebrow,
  title,
  linkTo,
  linkLabel = "View all",
}: {
  eyebrow: string;
  title: string;
  linkTo?: "/browse" | "/topics" | "/watchlists" | "/filmmakers";
  linkLabel?: string;
}) {
  return (
    <Reveal>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <p className="label-mono text-muted-foreground">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">{title}</h2>
        </div>
        {linkTo && (
          <Link to={linkTo} className="label-mono rule-link flex shrink-0 items-center gap-2 pb-2">
            {linkLabel} <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </Reveal>
  );
}
