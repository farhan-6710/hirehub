"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { GoogleIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { AuthItem } from "./AuthFormParts";

interface AuthFormFooterProps {
  loading: boolean;
  onGoogle: () => void;
  switchPrompt: string;
  switchLabel: string;
  onSwitch: () => void;
  termsAction: string;
}

export function AuthFormFooter({
  loading,
  onGoogle,
  switchPrompt,
  switchLabel,
  onSwitch,
  termsAction,
}: AuthFormFooterProps) {
  return (
    <>
      <AuthItem className="flex items-center gap-4 mb-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm font-semibold text-muted-foreground">OR</span>
        <div className="flex-1 h-px bg-border" />
      </AuthItem>
      <AuthItem>
        <Button
          type="button"
          variant="outline"
          onClick={onGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 mb-4"
        >
          <HugeiconsIcon icon={GoogleIcon} className="size-4.5" aria-hidden="true" />
          <span>Continue with Google</span>
        </Button>
      </AuthItem>
      <AuthItem className="text-center text-sm text-muted-foreground mb-4">
        {switchPrompt}{" "}
        <button type="button" onClick={onSwitch} className="text-primary hover:underline font-medium">
          {switchLabel}
        </button>
      </AuthItem>
      <AuthItem>
        <hr className="my-4" />
        <p className="text-xs text-muted-foreground text-center">
          By {termsAction}, you agree to our Terms and Policy.
        </p>
      </AuthItem>
    </>
  );
}
