import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authApi } from "@/services/authApi";
import { showToast } from "@/config/ToastConfig";
import { getApiErrorMessage } from "@/utils/apiError";
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from "@/constants/auth";

export function ChangePasswordForm() {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const newPassword = String(data.get("new-password"));

    if (newPassword !== String(data.get("confirm-password"))) {
      showToast({
        type: "error",
        title: "Passwords do not match",
        description: "Type the same new password twice.",
      });
      return;
    }

    try {
      setSaving(true);
      await authApi.changePassword(String(data.get("current-password")), newPassword);
      form.reset();
      showToast({
        type: "success",
        title: "Password updated",
        description: "Use your new password next time you log in.",
      });
    } catch (error) {
      showToast({
        type: "error",
        title: "Could not update password",
        description: getApiErrorMessage(error, "Please try again."),
      });
    } finally {
      setSaving(false);
    }
  };

  const passwordProps = {
    type: "password",
    required: true,
    minLength: PASSWORD_MIN_LENGTH,
    maxLength: PASSWORD_MAX_LENGTH,
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3 md:items-end">
      <label className="space-y-2 block">
        <span className="text-sm font-medium">Current password</span>
        <Input name="current-password" type="password" required autoComplete="current-password" />
      </label>
      <label className="space-y-2 block">
        <span className="text-sm font-medium">New password</span>
        <Input name="new-password" autoComplete="new-password" {...passwordProps} />
      </label>
      <label className="space-y-2 block">
        <span className="text-sm font-medium">Confirm new password</span>
        <Input name="confirm-password" autoComplete="new-password" {...passwordProps} />
      </label>
      <div className="md:col-span-3 flex justify-end">
        <Button type="submit" variant="outline" size="sm" disabled={saving}>
          {saving ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </form>
  );
}
