import { TypographySystem } from "@/types/project";
import { TypographySpecimen } from "./TypographySpecimen";

interface TypographyPageProps {
  fontFamily: string;
  levels: TypographySystem["levels"];
}

export function TypographyPage({ fontFamily, levels }: TypographyPageProps) {
  return (
    <div className="flex w-full flex-col gap-10 p-8 h-auto">
      <span
        className="font-medium uppercase tracking-wide"
        style={{
          fontSize: "var(--token-font-size-small)",
          color: "var(--token-color-dominant)",
        }}
      >
        Typography
      </span>

      <TypographySpecimen fontFamily={fontFamily} levels={levels} />
    </div>
  );
}
