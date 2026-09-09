import { RadiusPreset } from "@/types/project";

export const RADIUS_PX_MAP: Record<RadiusPreset, number> = {
  none: 0,
  small: 4,
  medium: 8,
  large: 16,
  full: 9999,
};

export const DEFAULT_FOUNDATIONS = {
  radius: "medium" as RadiusPreset,
  spacingBase: 8,
  gridColumns: 12,
  shadowLevels: 2 as 1 | 2 | 3,
};

export const DEFAULT_FONT_RATIO = 1.25;

// Peso padrão por nível — usuário pode sobrescrever depois, isso é só o ponto de partida
export const DEFAULT_LEVEL_WEIGHTS = {
  display: 700,
  h1: 700,
  h2: 700,
  h3: 600,
  body: 400,
  small: 400,
  caption: 400,
} as const;

export const FONT_RATIO_PRESETS = [
  1.067, 1.125, 1.2, 1.25, 1.333, 1.414, 1.5, 1.618,
] as const;
