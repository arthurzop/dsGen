"use client";

import {
  FileText,
  Image,
  Type,
  Palette,
  LayoutTemplate,
  Sliders,
  ToggleLeft,
  Download,
} from "lucide-react";
import { useProjectStore } from "@/store/useProjectStore";
import { SidebarSection } from "./SidebarSection";
import { LogoSection } from "./LogoSection";
import { TypographySection } from "./TypographySection";
import { ColorSection } from "./ColorSection";
import { ApplicationsSidebarSection } from "./ApplicationsSection";
import { FoundationsSection } from "./FoundationsSection";
import { UiSystemToggle } from "./UISystemToggle";
import { ExportSection } from "./ExportSection";

export function Sidebar() {
  const meta = useProjectStore((s) => s.project.meta);
  const palette = useProjectStore((s) => s.project.brandCore.colors.palette);
  const uiEnabled = useProjectStore((s) => s.project.uiSystem.enabled);
  const setProjectName = useProjectStore((s) => s.setProjectName);

  return (
    <div className="flex flex-col gap-4 p-4 neu-inset m-2 rounded-2xl pt-16 ltr:">
      <h1 className="text-lg font-bold text-dragonfruit fixed top-6 bg-neutral-100/90 rounded-full px-4 neue-inset">dsGen</h1>

      <SidebarSection icon={FileText} title="Project">
        <label className="flex flex-col gap-1 text-sm">
          Project name
          <input
            value={meta.name}
            onChange={(e) => setProjectName(e.target.value)}
            className="neu-inset rounded-xl border-0 px-3 py-2 text-sm outline-none"
            placeholder="LUMA"
          />
        </label>
      </SidebarSection>

      <SidebarSection icon={Image} title="Logo">
        <LogoSection />
      </SidebarSection>

      <SidebarSection icon={Type} title="Typography">
        <TypographySection />
      </SidebarSection>

      <SidebarSection
        icon={Palette}
        title="Colors"
        badge={String(palette.length)}
      >
        <ColorSection />
      </SidebarSection>

      <SidebarSection icon={LayoutTemplate} title="Applications">
        <ApplicationsSidebarSection />
      </SidebarSection>

      <SidebarSection icon={Sliders} title="Foundations">
        <FoundationsSection />
      </SidebarSection>

      <SidebarSection
        icon={ToggleLeft}
        title="UI System"
        badge={uiEnabled ? "ativo" : "opcional"}
      >
        <UiSystemToggle />
      </SidebarSection>

      <SidebarSection icon={Download} title="Export">
        <ExportSection />
      </SidebarSection>
    </div>
  );
}
