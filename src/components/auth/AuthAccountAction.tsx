"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { LogIn } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/authContext";
import UserAvatar from "@/components/auth/UserAvatar";

type AuthAccountActionProps = {
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  buttonClassName?: string;
};

export default function AuthAccountAction({
  onOpenLogin,
  onOpenSignup,
  buttonClassName,
}: AuthAccountActionProps) {
  const { user } = useAuth();

  if (user) {
    return <UserAvatar />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="md" className={buttonClassName}>
          <HugeiconsIcon icon={LogIn} strokeWidth={2} className="size-4.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-28 mt-2">
        <DropdownMenuItem
          className="cursor-pointer font-medium"
          onClick={onOpenLogin}
        >
          Login
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer font-medium"
          onClick={onOpenSignup}
        >
          Sign Up
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
