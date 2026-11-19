"use client";

import { useState } from "react";
import { useAuth } from "@/providers/authContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { showToast } from "@/config/ToastConfig";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, Logout01Icon } from "@hugeicons/core-free-icons";
import { UserProfileModal } from "./UserProfileModal";
import { UserMenuLinks } from "./UserMenuLinks";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const UserAvatar = () => {
  const { user, signOut } = useAuth();
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const userName = user?.name || user?.email?.split("@")[0] || "User";

  const handleSignOutConfirm = async () => {
    await signOut();
    showToast({ type: "success", title: "Signed Out", description: "You have been signed out successfully" });
  };

  const avatar = (sizeClass: string, textClass: string) => (
    <Avatar className={sizeClass}>
      <AvatarImage src={user?.picture} alt={userName} />
      <AvatarFallback className={`bg-primary text-primary-foreground font-medium ${textClass}`}>
        {getInitials(userName)}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="py-2">
          <Button
            className="flex items-center gap-2 bg-card hover:bg-accent rounded-full transition-all duration-200 pl-1.5! border border-border py-1 h-auto"
            aria-label="User account menu"
          >
            {avatar("h-7 w-7", "text-xs")}
            <span className="text-sm font-medium text-foreground max-w-20 truncate">{userName}</span>
            <HugeiconsIcon icon={ArrowDown01Icon} className="size-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 p-0">
          <div className="px-3 py-3 bg-muted/50 flex items-center gap-3">
            {avatar("h-9 w-9", "text-sm")}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{userName}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>

          <DropdownMenuSeparator />
          <UserMenuLinks isEmployer={user?.role === "employer"} onOpenProfile={() => setShowProfileModal(true)} />

          <DropdownMenuSeparator />
          <div className="py-1">
            <DropdownMenuItem
              onClick={() => setShowSignOutModal(true)}
              className="cursor-pointer px-3 py-2.5 text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <HugeiconsIcon icon={Logout01Icon} className="mr-3 size-4" />
              <span className="text-sm">Sign Out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationModal
        open={showSignOutModal}
        onOpenChange={setShowSignOutModal}
        title="Sign Out"
        description="Are you sure you want to sign out?"
        icon={({ className }) => <HugeiconsIcon icon={Logout01Icon} className={className} />}
        confirmLabel="Confirm"
        onConfirm={() => void handleSignOutConfirm()}
        variant="destructive"
      />

      <UserProfileModal
        open={showProfileModal}
        onOpenChange={setShowProfileModal}
        name={userName}
        email={user?.email}
        role={user?.role}
      />
    </>
  );
};

export default UserAvatar;
