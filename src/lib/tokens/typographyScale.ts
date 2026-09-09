import { TypographySystem } from "@/types/project";
import { DEFAULT_LEVEL_WEIGHTS } from "./defaults";

const BASE_REM = 1; // body = 1rem, sempre o ponto de ancoragem da escala

// Ordem de distância em relação ao body (negativo = menor, positivo = maior)
const LEVEL_STEPS: Record<keyof TypographySystem["levels"], number> = {
  caption: -2,
  small: -1,
  body: 0,
  h3: 1,
  h2: 2,
  h1: 3,
  display: 4,
};

/**
 * Recalcula todos os níveis NÃO sobrescritos manualmente a partir do ratio.
 * Níveis com overridden=true são preservados como estão.
 */
export function computeTypographyLevels(
  ratio: number,
  currentLevels?: TypographySystem["levels"],
): TypographySystem["levels"] {
  const result = {} as TypographySystem["levels"];

  (Object.keys(LEVEL_STEPS) as Array<keyof typeof LEVEL_STEPS>).forEach(
    (level) => {
      const existing = currentLevels?.[level];

      if (existing?.overridden) {
        result[level] = existing;
        return;
      }

      const step = LEVEL_STEPS[level];
      const sizeRem = Number((BASE_REM * Math.pow(ratio, step)).toFixed(3));

      result[level] = {
        weight: existing?.weight ?? DEFAULT_LEVEL_WEIGHTS[level],
        sizeRem,
        overridden: false,
      };
    },
  );

  return result;
}
