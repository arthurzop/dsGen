import { DsGenProject } from "@/types/project";
import { ResolvedTokens } from "@/lib/tokens/resolveTokens";
import { getAspectRatio } from "@/lib/documentFormats";
import { TEMPLATE_REGISTRY } from "@/lib/applications/templateRegistry";
import { PageFrame } from "./PageFrame";
import { SectionDivider } from "./SectionDivider";

interface ApplicationsSectionProps {
  project: DsGenProject;
  tokens: ResolvedTokens;
  sectionNumber: number;
}

export function ApplicationsSection({
  project,
  tokens,
  sectionNumber,
}: ApplicationsSectionProps) {
  const enabledApps = project.applications.filter((app) => app.enabled);
  if (enabledApps.length === 0) return null;

  const aspectRatio = getAspectRatio(project.meta.document);

  return (
    <>
      <SectionDivider number={sectionNumber} label="Applications" />

      {enabledApps.map((app) => {
        const Template = TEMPLATE_REGISTRY[app.templateId];
        return (
          <PageFrame
            key={app.id}
            pageId={app.id}
            aspectRatio={aspectRatio}
            tokens={tokens}
          >
            {Template ? (
              <Template project={project} tokens={tokens} />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-grey-300 ">
                Template "{app.templateId}" ainda não implementado
              </div>
            )}
          </PageFrame>
        );
      })}
    </>
  );
}
