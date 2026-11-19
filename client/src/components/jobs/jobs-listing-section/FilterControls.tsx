import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { titleize } from "@/utils/jobs/utils";

interface IconInputProps {
  label: string;
  icon: IconSvgElement;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function IconInput({ label, icon, placeholder, value, onChange }: IconInputProps) {
  return (
    <label className="block mb-5">
      <span className="text-sm font-medium mb-3 block text-foreground">{label}</span>
      <span className="relative block">
        <HugeiconsIcon
          icon={icon}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="pl-9 bg-transparent border-input h-9 rounded-xl text-sm"
        />
      </span>
    </label>
  );
}

interface CheckboxGroupProps<T extends string> {
  label: string;
  options: readonly T[];
  selected: T[];
  onToggle: (value: T) => void;
}

export function CheckboxGroup<T extends string>({ label, options, selected, onToggle }: CheckboxGroupProps<T>) {
  return (
    <fieldset className="mb-6">
      <legend className="text-sm font-medium mb-4 block text-foreground">{label}</legend>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-3 cursor-pointer group">
            <Checkbox
              checked={selected.includes(option)}
              onCheckedChange={() => onToggle(option)}
              className="rounded p-0.5 border-muted-foreground/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {titleize(option)}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
