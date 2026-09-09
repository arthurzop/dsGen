import { DocumentFormat, DocumentDimensions } from "@/types/project";

// Todos os ratios como width/height
const ASPECT_RATIOS: Record<Exclude<DocumentFormat, "custom">, number> = {
  "a4-portrait": 210 / 297,
  "a4-landscape": 297 / 210,
  "16-9": 16 / 9,
  "4-3": 4 / 3,
  "social-portrait": 4 / 5,
  "social-square": 1,
};

export function getAspectRatio(document: DocumentDimensions): number {
  if (document.format === "custom") {
    const w = document.customWidth ?? 1;
    const h = document.customHeight ?? 1;
    return w / h;
  }
  return ASPECT_RATIOS[document.format];
}

export const DOCUMENT_FORMAT_LABELS: Record<DocumentFormat, string> = {
  "a4-portrait": "A4 Retrato",
  "a4-landscape": "A4 Paisagem",
  "16-9": "16:9",
  "4-3": "4:3",
  "social-portrait": "Social (Retrato)",
  "social-square": "Social (Quadrado)",
  custom: "Custom",
};
