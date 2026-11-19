import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusSignIcon, Delete01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ListInputState } from "@/hooks/useListInput";

interface ListInputProps {
  label: string;
  placeholder: string;
  state: ListInputState;
  variant?: "list" | "chips";
}

export function ListInput({
  label,
  placeholder,
  state,
  variant = "list",
}: ListInputProps) {
  const removeButton = (item: string, size: number) => (
    <button
      type="button"
      onClick={() => state.remove(item)}
      className="text-destructive hover:text-destructive/80 shrink-0 transition-colors rounded-full"
      aria-label={`Remove ${item}`}
    >
      <HugeiconsIcon icon={Delete01Icon} size={size} />
    </button>
  );

  return (
    <div className="space-y-2 pt-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex gap-2 isolate">
        <Input
          value={state.draft}
          onChange={(event) => state.setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              state.add();
            }
          }}
          placeholder={placeholder}
          className="bg-background/50"
        />
        <Button type="button" variant="secondary" onClick={state.add} className="shrink-0 gap-2 px-6">
          <HugeiconsIcon icon={PlusSignIcon} size={16} />
          Add
        </Button>
      </div>

      {state.items.length > 0 && variant === "chips" && (
        <div className="flex flex-wrap gap-2 pt-3">
          {state.items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 pl-3 pr-2 py-1.5 rounded-full text-sm font-medium animate-in fade-in zoom-in-95"
            >
              {item}
              {removeButton(item, 16)}
            </div>
          ))}
        </div>
      )}

      {state.items.length > 0 && variant === "list" && (
        <ul className="space-y-2 mt-3 p-4 bg-background/30 rounded-xl border border-border/50">
          {state.items.map((item) => (
            <li key={item} className="flex items-start justify-between text-sm text-foreground/90 gap-4">
              <span className="flex items-start gap-2 flex-1">
                <span className="text-primary mt-0.5 shrink-0">•</span>
                <span>{item}</span>
              </span>
              {removeButton(item, 18)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
