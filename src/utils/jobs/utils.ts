import type { StatusBadgeConfig } from "../../types/jobs/components";

export const titleize = (value: string) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-");

export const formatSalary = (min: number, max: number, currency: string) => {
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  });

  return `${formatter.format(min)} - ${formatter.format(max)} ${currency}`;
};

export const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const formatPeopleApplied = (value?: number) => {
  if (value === undefined || value === null) return null;
  return `${value} applied`;
};

export const getStatusBadge = (statusRaw: string): StatusBadgeConfig => {
  const normalized = statusRaw?.trim().toLowerCase();

  if (normalized === "active" || normalized === "open") {
    return {
      label: "Open",
      variant: "outline",
      className:
        "bg-primary text-primary-foreground border-primary/40 rounded-lg px-3 py-1 text-xs font-medium",
    };
  }

  if (normalized === "applied") {
    return {
      label: "Applied",
      variant: "default",
      className:
        "bg-secondary text-secondary-foreground border-secondary-foreground/40 rounded-lg px-3 py-1 text-xs font-medium",
    };
  }

  return {
    label: titleize(statusRaw),
    variant: "outline",
    className:
      "text-muted-foreground border-muted-foreground/30 rounded-lg px-3 py-1 text-xs font-medium capitalize",
  };
};
