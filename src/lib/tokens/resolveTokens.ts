import {
  DsGenProject,
  TypographySystem,
  FontDefinition,
} from "@/types/project";
import {
  RADIUS_PX_MAP,
  DEFAULT_FOUNDATIONS,
  FIXED_DOCUMENT_RATIO,
} from "./defaults";
import { computeTypographyLevels } from "./typographyScale";

export interface ColorRoles {
  dominant: string;
  secondary: string;
  supporting: string;
  accent: string;
  all: string[];
}

export interface ResolvedTokens {
  colors: ColorRoles;
  radiusPx: number;
  spacingPx: number;
  gridColumns: number;
  shadowLevels: 1 | 2 | 3;
  fontFamily: string;
  fontWeight: number;
  fontStyle: "normal" | "italic";
  documentTypography: TypographySystem["levels"];
  specimenTypography: TypographySystem["levels"];
  css: Record<string, string>;
}

const FALLBACK_COLOR = "#CCCCCC";

function resolveColorRoles(
  palette: DsGenProject["brandCore"]["colors"]["palette"],
): ColorRoles {
  const hexList = palette.map((c) => c.hex);
  return {
    dominant: hexList[0] ?? FALLBACK_COLOR,
    secondary: hexList[1] ?? hexList[0] ?? FALLBACK_COLOR,
    supporting: hexList[2] ?? hexList[0] ?? FALLBACK_COLOR,
    accent: hexList[hexList.length - 1] ?? FALLBACK_COLOR,
    all: hexList,
  };
}

function resolveSelectedWeight(font: FontDefinition): {
  weight: number;
  style: "normal" | "italic";
} {
  if (font.source === "google") {
    const index = font.activeWeightIndex ?? 0;
    const active = font.weights[index] ?? font.weights[0];
    return { weight: active?.weight ?? 400, style: active?.style ?? "normal" };
  }

  const active = font.weights[0];
  return { weight: active?.weight ?? 400, style: active?.style ?? "normal" };
}

const documentLevelsCache = computeTypographyLevels(FIXED_DOCUMENT_RATIO);

export function resolveTokens(project: DsGenProject): ResolvedTokens {
  const { brandCore, foundations } = project;

  const colors = resolveColorRoles(brandCore.colors.palette);

  const radiusPreset = foundations.radius ?? DEFAULT_FOUNDATIONS.radius;
  const radiusPx = RADIUS_PX_MAP[radiusPreset];
  const spacingPx = foundations.spacingBase ?? DEFAULT_FOUNDATIONS.spacingBase;
  const gridColumns =
    foundations.gridColumns ?? DEFAULT_FOUNDATIONS.gridColumns;
  const shadowLevels =
    foundations.shadowLevels ?? DEFAULT_FOUNDATIONS.shadowLevels;

  const fontFamily = brandCore.typography.primaryFont.family || "Inter";
  const { weight: fontWeight, style: fontStyle } = resolveSelectedWeight(
    brandCore.typography.primaryFont,
  );

  const documentTypography = documentLevelsCache;
  const specimenTypography = brandCore.typography.levels;

  const css: Record<string, string> = {
    "--token-color-dominant": colors.dominant,
    "--token-color-secondary": colors.secondary,
    "--token-color-supporting": colors.supporting,
    "--token-color-accent": colors.accent,
    "--token-radius": `${radiusPx}px`,
    "--token-spacing": `${spacingPx}px`,
    "--token-font-family": fontFamily,
    "--token-font-weight": String(fontWeight),
    "--token-font-style": fontStyle,
    "--token-font-size-display": `${documentTypography.display.sizeRem}rem`,
    "--token-font-size-h1": `${documentTypography.h1.sizeRem}rem`,
    "--token-font-size-h2": `${documentTypography.h2.sizeRem}rem`,
    "--token-font-size-h3": `${documentTypography.h3.sizeRem}rem`,
    "--token-font-size-body": `${documentTypography.body.sizeRem}rem`,
    "--token-font-size-small": `${documentTypography.small.sizeRem}rem`,
    "--token-font-size-caption": `${documentTypography.caption.sizeRem}rem`,
  };

  return {
    colors,
    radiusPx,
    spacingPx,
    gridColumns,
    shadowLevels,
    fontFamily,
    fontWeight,
    fontStyle,
    documentTypography,
    specimenTypography,
    css,
  };
}
