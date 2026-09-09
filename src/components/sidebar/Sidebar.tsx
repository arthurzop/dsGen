"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { DOCUMENT_FORMAT_LABELS } from "@/lib/documentFormats";
import { DocumentFormat } from "@/types/project";
import { ColorSection } from "./ColorSection";
import { TypographySection } from "./TypographySection";
import { LogoSection } from "./LogoSection";
import { ApplicationsSidebarSection } from "./ApplicationsSection";
import { ExportSection } from "./ExportSection";
import { FoundationsSection } from "./FoundationsSection";

const FORMAT_OPTIONS: DocumentFormat[] = [
  "a4-portrait",
  "a4-landscape",
  "16-9",
  "4-3",
  "social-portrait",
  "social-square",
];

export function Sidebar() {
  const { meta } = useProjectStore((s) => s.project);
  const setProjectName = useProjectStore((s) => s.setProjectName);
  const setDocumentFormat = useProjectStore((s) => s.setDocumentFormat);

  return (
    <div className="flex flex-col gap-6 p-5">
      <h1 className="text-lg font-bold text-dragonfruit">dsGen</h1>

      <section className="flex flex-col gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-grey-500">
          Project
        </span>

        <label className="flex flex-col gap-1 text-sm">
          Project name
          <input
            value={meta.name}
            onChange={(e) => setProjectName(e.target.value)}
            className="rounded-(--token-radius,8px) border border-grey-200 px-3 py-2 text-sm outline-none focus:border-tiger-500"
            placeholder="LUMA"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Document format
          <select
            value={meta.document.format}
            onChange={(e) =>
              setDocumentFormat(e.target.value as DocumentFormat)
            }
            className="rounded-(--token-radius,8px) border border-grey-200 px-3 py-2 text-sm outline-none focus:border-tiger-500"
          >
            {FORMAT_OPTIONS.map((format) => (
              <option key={format} value={format}>
                {DOCUMENT_FORMAT_LABELS[format]}
              </option>
            ))}
          </select>
        </label>
      </section>
      <LogoSection />
      <ColorSection />
      <TypographySection />
      <ApplicationsSidebarSection />
      <FoundationsSection />
      <ExportSection />
    </div>
  );
}
