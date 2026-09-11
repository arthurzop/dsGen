import { DsGenProject } from "@/types/project";

/**
 * Calcula os números de seção com base no que de fato existe no documento.
 * Cover e Brand são sempre 01/02. Applications e UI System são condicionais,
 * então o número de cada um depende do que vem antes estar presente ou não.
 */
export function getDocumentSectionNumbers(project: DsGenProject) {
  const hasApplications = project.applications.some((a) => a.enabled);
  const hasUiSystem = project.uiSystem.enabled;

  let next = 3;
  const applicationsNumber = hasApplications ? next++ : null;
  const uiSystemNumber = hasUiSystem ? next++ : null;

  return {
    cover: 1,
    brand: 2,
    applications: applicationsNumber,
    uiSystem: uiSystemNumber,
  };
}