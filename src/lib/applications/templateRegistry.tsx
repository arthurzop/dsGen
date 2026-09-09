import { ComponentType } from "react";
import { ApplicationTemplateId, DsGenProject } from "@/types/project";
import { ResolvedTokens } from "@/lib/tokens/resolveTokens";
import { PosterTemplate } from "./PosterTemplate";

export interface ApplicationTemplateProps {
  project: DsGenProject;
  tokens: ResolvedTokens;
}

/**
 * Registro central de templates. Cada template consome APENAS
 * project + tokens — nunca tem configuração própria/paralela.
 * Templates ainda não implementados ficam como `null` (P1).
 */
export const TEMPLATE_REGISTRY: Record <
  ApplicationTemplateId,
  ComponentType<ApplicationTemplateProps> | null
> = {
  poster: PosterTemplate,
  "social-media": null,
  editorial: null,
  website: null,
  "business-card": null,
  packaging: null,
};

export const TEMPLATE_LABELS: Record<ApplicationTemplateId, string> = {
  poster: "Poster",
  "social-media": "Social Media",
  editorial: "Editorial",
  website: "Website",
  "business-card": "Business Card",
  packaging: "Packaging",
};