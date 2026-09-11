"use client";

import { useState } from "react";
import {
  ChevronDown,
  FileText,
  Image,
  Type,
  Palette,
  LayoutTemplate,
  Sliders,
  ToggleLeft,
} from "lucide-react";
import { useProjectStore } from "@/store/useProjectStore";
import { PROJECT_TYPE_OPTIONS } from "@/lib/projectTypes";
import { SidebarSection } from "./SidebarSection";
import { LogoSection } from "./LogoSection";
import { TypographySection } from "./TypographySection";
import { ColorSection } from "./ColorSection";
import { ApplicationsSidebarSection } from "./ApplicationsSection";
import { FoundationsSection } from "./FoundationsSection";
import { UiSystemToggle } from "./UISystemToggle";

export function Sidebar() {
  const meta = useProjectStore((s) => s.project.meta);
  const palette = useProjectStore((s) => s.project.brandCore.colors.palette);
  const uiEnabled = useProjectStore((s) => s.project.uiSystem.enabled);
  const setProjectName = useProjectStore((s) => s.setProjectName);
  const updateProjectMeta = useProjectStore((s) => s.updateProjectMeta);

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="px-1 text-lg font-bold text-dragonfruit">dsGen</h1>

      <SidebarSection icon={FileText} title="Project">
        <label className="flex flex-col gap-1 text-sm">
          Project name
          <input
            value={meta.name}
            onChange={(e) => setProjectName(e.target.value)}
            className="border border-grey-200 bg-white px-3 py-2 text-sm outline-none focus:border-(--color-tiger)]"
            style={{ borderRadius: "var(--token-radius, 12px)" }}
            placeholder="LUMA"
          />
        </label>

        <button
          onClick={() => setShowMore((v) => !v)}
          className="flex cursor-pointer items-center gap-1 text-xs text-grey-500 hover:text-grey-700"
        >
          Mais opções
          <ChevronDown
            size={13}
            className={`transition-transform ${showMore ? "rotate-180" : ""}`}
          />
        </button>

        {showMore && (
          <div className="flex flex-col gap-3 border-t border-grey-100 pt-3">
            <label className="flex flex-col gap-1 text-sm">
              Subtitle
              <input
                value={meta.subtitle ?? ""}
                onChange={(e) =>
                  updateProjectMeta({ subtitle: e.target.value })
                }
                className="border border-grey-200 bg-white px-3 py-2 text-sm outline-none focus:border-(--color-tiger)"
                style={{ borderRadius: "var(--token-radius, 12px)" }}
                placeholder="Brand Styleguide"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              Type
              <input
                list="project-type-options"
                value={meta.type ?? ""}
                onChange={(e) => updateProjectMeta({ type: e.target.value })}
                className="border border-grey-200 bg-white px-3 py-2 text-sm outline-none focus:border-(--color-tiger)"
                style={{ borderRadius: "var(--token-radius, 12px)" }}
                placeholder="Branding, UI/UX, Editorial..."
              />
              <datalist id="project-type-options">
                {PROJECT_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type} />
                ))}
              </datalist>
            </label>

            <div className="grid w-full grid-cols-[1fr_120px] gap-2">
              <label className="flex flex-col gap-1 text-sm">
                Client
                <input
                  value={meta.client ?? ""}
                  onChange={(e) =>
                    updateProjectMeta({ client: e.target.value })
                  }
                  className="w-full border border-grey-200 bg-white px-3 py-2 text-sm outline-none focus:border-(--color-tiger)"
                  style={{ borderRadius: "var(--token-radius, 12px)" }}
                />
              </label>

              <label className="flex flex-col gap-1 text-sm">
                Year
                <input
                  value={meta.year ?? ""}
                  onChange={(e) => updateProjectMeta({ year: e.target.value })}
                  className="w-full border border-grey-200 bg-white px-3 py-2 text-sm outline-none focus:border-(--color-tiger)"
                  style={{ borderRadius: "var(--token-radius, 12px)" }}
                  placeholder="2026"
                />
              </label>
            </div>
          </div>
        )}
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
    </div>
  );
}
