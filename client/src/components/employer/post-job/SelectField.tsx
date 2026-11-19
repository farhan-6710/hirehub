import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectOption } from "@/constants/postJob";

interface SelectFieldProps {
  name: string;
  label: string;
  options: readonly SelectOption[];
  defaultValue: string;
}

export function SelectField({ name, label, options, defaultValue }: SelectFieldProps) {
  return (
    <div className="space-y-2 flex flex-col justify-end">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <Select name={name} defaultValue={defaultValue}>
        <SelectTrigger className="w-full bg-background/50 h-10" aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
