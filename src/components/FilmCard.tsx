import { Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import type { Film } from "@/lib/data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function FilmCard({ film, tall = false }: { film: Film; tall?: boolean }) {
  const { isSaved, toggleSave } = useStore();
  const saved = isSaved(film.slug);

  return (
    <article className="group relative">
      <Link to="/film/$slug" params={{ slug: film.slug }} className="block">
        <div className={cn("media-zoom relative bg-muted", tall ? "aspect-[3/4]" : "aspect-[4/5]")}>
          <img
            src={film.image}
            alt={film.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <span className="label-mono absolute bottom-3 left-3 bg-background/90 px-2 py-1 text-foreground">
            {film.kind}
          </span>
        </div>
        <h3 className="mt-4 font-display text-xl tracking-tight transition-colors group-hover:text-primary">
          {film.title}
        </h3>
        <p className="label-mono mt-2 text-muted-foreground">
          {film.runtime} · {film.year} · {film.topic}
        </p>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          const willSave = !saved;
          toggleSave(film.slug);
          toast.success(willSave ? `Saved "${film.title}" to watchlist` : `Removed "${film.title}" from watchlist`);
        }}
        aria-label={saved ? `Remove ${film.title} from watchlist` : `Save ${film.title}`}
        className={cn(
          "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full transition-all duration-300",
          saved ? "bg-primary text-primary-foreground" : "bg-background/90 text-foreground hover:bg-background",
        )}
      >
        <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
      </button>
    </article>
  );
}
