"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { resolveTokens } from "@/lib/tokens/resolveTokens";
import { getAspectRatio } from "@/lib/documentFormats";
import { PageFrame } from "./PageFrame";
import { CoverPage } from "./pages/CoverPage";
import { BrandPage } from "./pages/BrandPage";
import { ApplicationsSection } from "./ApplicationsSection";

export function PresentationCanvas() {
  const project = useProjectStore((s) => s.project);
  const tokens = resolveTokens(project);
  const aspectRatio = getAspectRatio(project.meta.document);

  return (
    <div className="flex flex-col items-center gap-8 p-10">
      {/* 01 — Cover. Próximas seções (Brand, Visual System, Applications, UI)
          entram aqui como novos PageFrame, cada uma no seu componente próprio. */}
      <PageFrame pageId="cover" aspectRatio={aspectRatio} tokens={tokens}>
        <CoverPage project={project} />
      </PageFrame>

      <PageFrame pageId="brand" aspectRatio={aspectRatio} tokens={tokens}>
        <BrandPage project={project} />
      </PageFrame>

      <ApplicationsSection project={project} tokens={tokens} />
    </div>
  );
}
