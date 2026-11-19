import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Briefcase01Icon,
  DashboardSquareSettingIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { brand } from "@/constants/brand";

const ITEM_CLASS = "cursor-pointer px-3 py-2.5 focus:bg-accent";
const ICON_CLASS = "mr-3 size-4 text-muted-foreground";

interface UserMenuLinksProps {
  isEmployer: boolean;
  onOpenProfile: () => void;
}

export function UserMenuLinks({ isEmployer, onOpenProfile }: UserMenuLinksProps) {
  return (
    <div className="py-1">
      <DropdownMenuItem className={ITEM_CLASS} onClick={() => onOpenProfile()}>
        <HugeiconsIcon icon={UserIcon} className={ICON_CLASS} />
        <span className="text-sm">Profile</span>
      </DropdownMenuItem>
      <DropdownMenuItem asChild className={ITEM_CLASS}>
        <Link href={brand.portals.candidate.path}>
          <HugeiconsIcon icon={Briefcase01Icon} className={ICON_CLASS} />
          <span className="text-sm">{brand.portals.candidate.label}</span>
        </Link>
      </DropdownMenuItem>
      {isEmployer && (
        <DropdownMenuItem asChild className={ITEM_CLASS}>
          <Link href={`${brand.portals.employer.path}?tab=dashboard`}>
            <HugeiconsIcon icon={DashboardSquareSettingIcon} className={ICON_CLASS} />
            <span className="text-sm">Employer Dashboard</span>
          </Link>
        </DropdownMenuItem>
      )}
    </div>
  );
}
