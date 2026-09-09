import { DsGenProject } from "@/types/project";
import { RADIUS_PX_MAP, DEFAULT_FOUNDATIONS } from "./defaults";

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
  typography: DsGenProject["brandCore"]["typography"]["levels"];
  css: Record<string, string>; // pronto pra jogar em style={} no canvas/export
}

const FALLBACK_COLOR = "#CCCCCC"; // quando a paleta do usuário está vazia

function resolveColorRoles(
  palette: DsGenProject["brandCore"]["colors"]["palette"],
): ColorRoles {
  const hexList = palette.map((c) => c.hex);

  return {
    dominant: hexList[0] ?? FALLBACK_COLOR,
    secondary: hexList[1] ?? hexList[0] ?? FALLBACK_COLOR,
    supporting: hexList[2] ?? hexList[0] ?? FALLBACK_COLOR,
    // accent é sempre a última cor da lista, não a quarta posição fixa —
    // assim funciona tanto com paleta de 2 cores quanto de 8
    accent: hexList[hexList.length - 1] ?? FALLBACK_COLOR,
    all: hexList,
  };
}

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
  const levels = brandCore.typography.levels;

  const css: Record<string, string> = {
    "--token-color-dominant": colors.dominant,
    "--token-color-secondary": colors.secondary,
    "--token-color-supporting": colors.supporting,
    "--token-color-accent": colors.accent,
    "--token-radius": `${radiusPx}px`,
    "--token-spacing": `${spacingPx}px`,
    "--token-font-family": fontFamily,
    "--token-font-size-display": `${levels.display.sizeRem}rem`,
    "--token-font-size-h1": `${levels.h1.sizeRem}rem`,
    "--token-font-size-h2": `${levels.h2.sizeRem}rem`,
    "--token-font-size-h3": `${levels.h3.sizeRem}rem`,
    "--token-font-size-body": `${levels.body.sizeRem}rem`,
    "--token-font-size-small": `${levels.small.sizeRem}rem`,
    "--token-font-size-caption": `${levels.caption.sizeRem}rem`,
  };

  return {
    colors,
    radiusPx,
    spacingPx,
    gridColumns,
    shadowLevels,
    fontFamily,
    typography: levels,
    css,
  };
}
