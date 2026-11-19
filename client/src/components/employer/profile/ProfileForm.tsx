import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { EmployerProfile } from "@/services/employerApi";

type FieldKey = Exclude<
  keyof EmployerProfile,
  "companyDescription" | "companyLogo"
>;

interface FieldConfig {
  key: FieldKey;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

const FIELDS: FieldConfig[] = [
  { key: "companyName", label: "Company Name", required: true },
  { key: "industry", label: "Industry" },
  { key: "website", label: "Website", type: "url", placeholder: "https://" },
  { key: "headquartersLocation", label: "Headquarters Location", required: true },
  { key: "contactEmail", label: "Contact Email", type: "email" },
  { key: "contactPhone", label: "Contact Phone", type: "tel" },
];

interface ProfileFormProps {
  initialProfile: EmployerProfile;
  saving: boolean;
  submitLabel: string;
  onSubmit: (profile: EmployerProfile) => void;
}

export function ProfileForm({
  initialProfile,
  saving,
  submitLabel,
  onSubmit,
}: ProfileFormProps) {
  const [values, setValues] = useState(initialProfile);

  const setField = (key: keyof EmployerProfile, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FIELDS.map((field) => (
          <label key={field.key} className="space-y-2 block">
            <span className="text-sm font-medium text-foreground">
              {field.label}
              {field.required && <span className="text-primary"> *</span>}
            </span>
            <Input
              name={field.key}
              type={field.type ?? "text"}
              required={field.required}
              placeholder={field.placeholder}
              value={values[field.key]}
              onChange={(event) => setField(field.key, event.target.value)}
            />
          </label>
        ))}
      </div>

      <label className="space-y-2 block">
        <span className="text-sm font-medium text-foreground">Company Description</span>
        <Textarea
          name="companyDescription"
          value={values.companyDescription}
          onChange={(event) => setField("companyDescription", event.target.value)}
          className="min-h-30 bg-background/50"
        />
      </label>

      <div className="pt-4 flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
