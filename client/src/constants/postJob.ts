import {
  EXPERIENCE_LEVELS,
  JOB_TYPES,
  WORKPLACE_TYPES,
} from "@/types/jobs/jobs";
import { titleize } from "@/utils/jobs/utils";

export interface SelectOption {
  value: string;
  label: string;
}

const toOptions = (values: readonly string[]): SelectOption[] =>
  values.map((value) => ({ value, label: titleize(value) }));

// Values come from the job enums in types/jobs/jobs.ts (they match Prisma).
export const WORKPLACE_TYPE_OPTIONS = toOptions(WORKPLACE_TYPES);
export const JOB_TYPE_OPTIONS = toOptions(JOB_TYPES);
export const EXPERIENCE_LEVEL_OPTIONS = toOptions(EXPERIENCE_LEVELS);

export const CURRENCY_OPTIONS: SelectOption[] = [
  { value: "INR", label: "INR (₹)" },
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
];

export const MAX_DESCRIPTION_LINES = 180;
