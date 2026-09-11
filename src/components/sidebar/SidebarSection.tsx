import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface SidebarSectionProps {
  icon: LucideIcon;
  title: string;
  badge?: string;
  children: ReactNode;
}

export function SidebarSection({
  icon: Icon,
  title,
  badge,
  children,
}: SidebarSectionProps) {
  return (
    <div className="neu-surface flex flex-col gap-3 rounded-2xl border border-grey-200/60 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-grey-500" />
          <span className="text-xs font-medium uppercase tracking-wide text-grey-600">
            {title}
          </span>
        </div>
        {badge && <span className="text-[10px] text-grey-400">{badge}</span>}
      </div>
      <div className="neu-divider" />
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
