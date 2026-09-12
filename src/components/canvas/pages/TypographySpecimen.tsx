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

const REM_BASE_PX = 16;

function remToPx(rem: number): number {
  return Math.round(rem * REM_BASE_PX);
}

export function TypographySpecimen({
  fontFamily,
  levels,
}: TypographySpecimenProps) {
  return (
    <div className="flex w-full flex-col gap-6" style={{ fontFamily }}>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center gap-3 border-b border-grey-200 pb-1.5">
          <span className="w-14 shrink-0 font-mono text-xs uppercase text-grey-400">
            Tag
          </span>
          <span className="flex-1 font-mono text-xs uppercase text-grey-400">
            Demo
          </span>
          <span className="w-20 shrink-0 font-mono text-xs uppercase text-grey-400">
            Size
          </span>
          <span className="w-16 shrink-0 font-mono text-xs uppercase text-grey-400">
            Weight
          </span>
        </div>

        {LEVEL_ORDER.map((level) => {
          const def = levels[level];
          return (
            <div
              key={level}
              className="flex w-full items-center gap-3 border-b border-grey-100 py-2"
            >
              <span className="w-14 shrink-0 font-mono text-xs uppercase text-grey-400">
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
              <span className="w-20 shrink-0 font-mono text-xs text-grey-400">
                {remToPx(def.sizeRem)}px
              </span>
              <span className="w-16 shrink-0 font-mono text-xs text-grey-400">
                {def.weight}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex w-full gap-10">
        <div className="flex flex-col gap-0.5 pt-2">
          <span className="font-mono text-sm uppercase text-grey-400">
            Caracteres
          </span>
          <p className="text-lg">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            abcdefghijklmnopqrstuvwxyz
            <br />
            0123456789 !@#$%&*()
          </p>
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-sm uppercase text-grey-400">
            Pangrama
          </span>
          <p className="text-4xl ">
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </div>
    </div>
  );
}
