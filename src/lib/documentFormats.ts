import { DocumentFormat, DocumentDimensions } from "@/types/project";

export const FIXED_ASPECT_RATIO = 16 / 9;

export function getAspectRatio(_document: DocumentDimensions): number {
  return FIXED_ASPECT_RATIO;
}
