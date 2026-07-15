"use client";

import { Star } from "lucide-react";

export function StarRating({
  value,
  onChange,
  readonly = false,
  size = 16,
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(n)}
          className={readonly ? "cursor-default" : "cursor-pointer"}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          <Star
            size={size}
            className={
              n <= value
                ? "fill-amber-400 text-amber-400"
                : "fill-transparent text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]"
            }
          />
        </button>
      ))}
    </div>
  );
}
