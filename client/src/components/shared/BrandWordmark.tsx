import { brand } from "@/constants/brand";

interface BrandWordmarkProps {
  collapsed?: boolean;
}

export function BrandWordmark({ collapsed = false }: BrandWordmarkProps) {
  const { accent, rest } = brand.wordmark;

  return (
    <>
      <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
        {collapsed ? accent.charAt(0) : accent}
      </span>
      {!collapsed && <span className="text-foreground">{rest}</span>}
    </>
  );
}
