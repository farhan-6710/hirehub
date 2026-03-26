"use client";

import { useAuth } from "@/providers/authContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { showToast } from "@/config/ToastConfig";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  UserIcon,
  CreditCardIcon,
  Settings01Icon,
  HelpCircleIcon,
  DocumentCodeIcon,
  Logout01Icon,
} from "@hugeicons/core-free-icons";

const UserAvatar = () => {
  const { user, signOut } = useAuth();

  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const handleSignOutConfirm = async () => {
    try {
      await signOut();
      showToast({
        type: "success",
        title: "Signed Out",
        description: "You have been signed out successfully",
      });
    } catch {
      showToast({
        type: "error",
        title: "Sign Out Failed",
        description: "An error occurred while signing out. Please try again.",
      });
    }
  };

  const handleSignOut = () => {
    setShowSignOutModal(true);
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserName = () => {
    return user?.name || user?.email?.split("@")[0] || "User";
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="py-2">
          <Button
            className="flex items-center gap-2 bg-card hover:bg-accent rounded-full transition-all duration-200 pl-1.5! border border-border py-1 h-auto"
            aria-label="User account menu"
          >
            <Avatar className="h-7 w-7">
              <AvatarImage
                src={user?.picture} // We don't have avatar_url in the new backend yet
                alt={getUserName()}
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                {getInitials(getUserName())}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground max-w-20 truncate">
              {getUserName()}
            </span>
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              className="size-3 text-muted-foreground"
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 p-0">
          {/* User Info Header */}
          <div className="px-3 py-3 bg-muted/50">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={user?.picture} // We don't have avatar_url in the new backend yet
                  alt={getUserName()}
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                  {getInitials(getUserName())}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {getUserName()}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Main Menu Items */}
          <div className="py-1">
            <DropdownMenuItem className="cursor-pointer px-3 py-2.5 focus:bg-accent">
              <HugeiconsIcon
                icon={UserIcon}
                className="mr-3 size-4 text-muted-foreground"
              />
              <span className="text-sm">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer px-3 py-2.5 focus:bg-accent">
              <HugeiconsIcon
                icon={CreditCardIcon}
                className="mr-3 size-4 text-muted-foreground"
              />
              <span className="text-sm">Orders</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer px-3 py-2.5 focus:bg-accent">
              <HugeiconsIcon
                icon={Settings01Icon}
                className="mr-3 size-4 text-muted-foreground"
              />
              <span className="text-sm">Settings</span>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator />

          {/* Support Items */}
          <div className="py-1">
            <DropdownMenuItem className="cursor-pointer px-3 py-2.5 focus:bg-accent">
              <HugeiconsIcon
                icon={HelpCircleIcon}
                className="mr-3 size-4 text-muted-foreground"
              />
              <span className="text-sm">Help Center</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer px-3 py-2.5 focus:bg-accent">
              <HugeiconsIcon
                icon={DocumentCodeIcon}
                className="mr-3 size-4 text-muted-foreground"
              />
              <span className="text-sm">Documentation</span>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator />

          {/* Sign Out */}
          <div className="py-1">
            <DropdownMenuItem
              onClick={handleSignOut}
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
        icon={({ className }) => (
          <HugeiconsIcon icon={Logout01Icon} className={className} />
        )}
        iconClassName="text-destructive"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        onConfirm={handleSignOutConfirm}
        onCancel={() => setShowSignOutModal(false)}
        variant="destructive"
      />
    </>
  );
};

export default UserAvatar;
