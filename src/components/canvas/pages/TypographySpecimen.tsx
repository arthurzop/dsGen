import { TypographySystem } from "@/types/project";

interface TypographySpecimenProps {
  fontFamily: string;
  levels: TypographySystem["levels"];
}

const LEVEL_ORDER: (keyof TypographySystem["levels"])[] = [
  "display",
  "h1",
  "h2",
  "h3",
  "body",
  "small",
  "caption",
];

const LEVEL_LABELS: Record<keyof TypographySystem["levels"], string> = {
  display: "Display",
  h1: "H1",
  h2: "H2",
  h3: "H3",
  body: "Body",
  small: "Small",
  caption: "Caption",
};

export function TypographySpecimen({
  fontFamily,
  levels,
}: TypographySpecimenProps) {
  return (
    <div className="flex flex-col gap-3" style={{ fontFamily }}>
      {LEVEL_ORDER.map((level) => {
        const def = levels[level];
        return (
          <div
            key={level}
            className="flex items-baseline gap-3 border-b border-grey-100 pb-1.5"
          >
            <span className="w-14 shrink-0 font-mono text-[9px] uppercase text-grey-400">
              {LEVEL_LABELS[level]}
            </span>
            <span
              className="flex-1 truncate"
              style={{
                fontSize: `${def.sizeRem}rem`,
                fontWeight: def.weight,
                lineHeight: 1.1,
              }}
            >
              Aa
            </span>
            <span className="shrink-0 font-mono text-[9px] text-grey-400">
              {def.sizeRem}rem · {def.weight}
            </span>
          </div>
        );
      })}

      <div className="flex flex-col gap-0.5 pt-2">
        <span className="font-mono text-[9px] uppercase text-grey-400">
          Caracteres
        </span>
        <p className="text-sm leading-snug">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
          <br />
          abcdefghijklmnopqrstuvwxyz
          <br />
          0123456789 !@#$%&*()
        </p>
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-[9px] uppercase text-grey-400">
          Pangrama
        </span>
        <p className="text-sm">The quick brown fox jumps over the lazy dog.</p>
      </div>
    </div>
  );
}
