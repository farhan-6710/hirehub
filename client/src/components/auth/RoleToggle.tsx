import { AuthItem } from "./AuthFormParts";

export type Role = "candidate" | "employer";

const ROLES: { value: Role; label: string }[] = [
  { value: "candidate", label: "Candidate" },
  { value: "employer", label: "Employer" },
];

interface RoleToggleProps {
  value: Role;
  onChange: (role: Role) => void;
}

export function RoleToggle({ value, onChange }: RoleToggleProps) {
  return (
    <AuthItem className="flex gap-4 p-1 bg-muted/50 rounded-lg">
      {ROLES.map((option) => (
        <label key={option.value} className="flex-1 relative cursor-pointer">
          <input
            type="radio"
            name="role"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="peer sr-only"
          />
          <div className="text-center py-2 px-4 rounded-md text-sm font-medium transition-all peer-checked:bg-background peer-checked:text-foreground peer-checked:shadow-sm text-muted-foreground hover:text-foreground">
            {option.label}
          </div>
        </label>
      ))}
    </AuthItem>
  );
}
