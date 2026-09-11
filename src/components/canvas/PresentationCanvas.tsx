"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { resolveTokens } from "@/lib/tokens/resolveTokens";
import { getAspectRatio } from "@/lib/documentFormats";
import { getDocumentSectionNumbers } from "@/lib/documentSections";
import { PageFrame } from "./PageFrame";
import { CoverPage } from "./pages/CoverPage";
import { BrandPage } from "./pages/BrandPage";
import { ApplicationsSection } from "./ApplicationsSection";
import { UiSystemPage } from "./pages/UISystemPage";
import { SectionDivider } from "./SectionDivider";

export function PresentationCanvas() {
  const project = useProjectStore((s) => s.project);
  const tokens = resolveTokens(project);
  const aspectRatio = getAspectRatio(project.meta.document);
  const sectionNumbers = getDocumentSectionNumbers(project);

  return (
    <div className="flex flex-col items-center gap-8 p-10">
      <SectionDivider number={sectionNumbers.cover} label="Cover" />
      <PageFrame pageId="cover" aspectRatio={aspectRatio} tokens={tokens}>
        <CoverPage project={project} />
      </PageFrame>

      <SectionDivider number={sectionNumbers.brand} label="Brand" />
      <PageFrame pageId="brand" aspectRatio={aspectRatio} tokens={tokens}>
        <BrandPage project={project} tokens={tokens} />
      </PageFrame>

      <ApplicationsSection
        project={project}
        tokens={tokens}
        sectionNumber={sectionNumbers.applications ?? 0}
      />

      {project.uiSystem.enabled && (
        <>
          <SectionDivider
            number={sectionNumbers.uiSystem ?? 0}
            label="UI System"
          />
          <PageFrame
            pageId="ui-system"
            aspectRatio={aspectRatio}
            tokens={tokens}
          >
            <UiSystemPage sectionNumber={sectionNumbers.uiSystem ?? 0} />
          </PageFrame>
        </>
      )}
    </div>
  );
}
