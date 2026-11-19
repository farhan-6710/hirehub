import { useState } from "react";

// A list of unique strings plus the text the user is still typing.
export function useListInput() {
  const [items, setItems] = useState<string[]>([]);
  const [draft, setDraft] = useState("");

  const withDraft = (list: string[]): string[] => {
    const value = draft.trim();
    return value && !list.includes(value) ? [...list, value] : list;
  };

  const add = () => {
    setItems(withDraft);
    setDraft("");
  };

  const remove = (item: string) =>
    setItems((prev) => prev.filter((entry) => entry !== item));

  // Includes a typed-but-not-added value, so submit never drops it.
  const finalize = (): string[] => {
    const next = withDraft(items);
    setItems(next);
    setDraft("");
    return next;
  };

  const reset = () => {
    setItems([]);
    setDraft("");
  };

  return { items, draft, setDraft, add, remove, finalize, reset };
}

export type ListInputState = ReturnType<typeof useListInput>;
