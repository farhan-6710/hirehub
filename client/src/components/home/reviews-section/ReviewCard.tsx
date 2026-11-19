interface ReviewCardProps {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

const MAX_RATING = 5;

export function ReviewCard({ name, role, quote, rating }: ReviewCardProps) {
  return (
    <article className="h-full rounded-2xl border border-border bg-background p-6 shadow-xs transition-colors duration-300 hover:border-primary/50 hover:bg-glow-green-bg">
      <div className="mb-4 flex items-center gap-2 text-base leading-none text-chart-2" aria-label={`${rating} out of ${MAX_RATING} stars`}>
        {Array.from({ length: MAX_RATING }).map((_, index) => (
          <span key={index} aria-hidden="true">{index < rating ? "★" : "☆"}</span>
        ))}
      </div>
      <p className="mb-6 text-sm leading-6 text-muted-foreground">&ldquo;{quote}&rdquo;</p>
      <div>
        <h3 className="text-base font-semibold text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </article>
  );
}
