import {
  Briefcase01Icon,
  DashboardSquareSettingIcon,
  PlusSignCircleIcon,
  Settings01Icon,
  UserCircle02Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

import { brand } from "@/constants/brand";

const TAB_ICONS: Record<string, IconSvgElement> = {
  dashboard: DashboardSquareSettingIcon,
  "my-jobs": Briefcase01Icon,
  "post-job": PlusSignCircleIcon,
  profile: UserCircle02Icon,
  settings: Settings01Icon,
};

export const navItems = brand.portals.employer.tabs.map((tab) => ({
  ...tab,
  icon: TAB_ICONS[tab.id],
}));
