import { DsGenProject } from "@/types/project";

export function getDocumentSectionNumbers(project: DsGenProject) {
  const hasApplications = project.applications.some((a) => a.enabled);
  const hasUiSystem = project.uiSystem.enabled;

  let next = 4;
  const applicationsNumber = hasApplications ? next++ : null;
  const uiSystemNumber = hasUiSystem ? next++ : null;

  return {
    cover: 1,
    brand: 2,
    typography: 3,
    applications: applicationsNumber,
    uiSystem: uiSystemNumber,
  };
}
