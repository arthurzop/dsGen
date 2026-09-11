import { DsGenProject } from "@/types/project";
import { ResolvedTokens } from "@/lib/tokens/resolveTokens";
import { TypographySpecimen } from "./TypographySpecimen";

interface BrandPageProps {
  project: DsGenProject;
  tokens: ResolvedTokens;
}

export function BrandPage({ project, tokens }: BrandPageProps) {
  const { logo, colors } = project.brandCore;
  const palette = colors.palette;

  return (
    <div
      className="flex h-full w-full flex-col gap-6 overflow-y-auto p-12"
      style={{ fontFamily: "var(--token-font-family)" }}
    >
      <span
        className="font-medium uppercase tracking-wide"
        style={{
          fontSize: "var(--token-font-size-small)",
          color: "var(--token-color-dominant)",
        }}
      >
       Brand
      </span>

      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <span
            className="text-grey-400"
            style={{ fontSize: "var(--token-font-size-caption)" }}
          >
            Logo
          </span>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo.dataUrl}
              alt="Logo"
              className="max-h-16 max-w-full object-contain"
            />
          ) : (
            <span
              className="text-grey-300"
              style={{ fontSize: "var(--token-font-size-body)" }}
            >
              —
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <span
            className="text-grey-400"
            style={{ fontSize: "var(--token-font-size-caption)" }}
          >
            Paleta
          </span>
          <div className="flex flex-wrap gap-1">
            {palette.length === 0 ? (
              <span
                className="text-grey-300"
                style={{ fontSize: "var(--token-font-size-body)" }}
              >
                —
              </span>
            ) : (
              palette.map((color) => (
                <div
                  key={color.id}
                  className="h-8 w-8"
                  style={{
                    backgroundColor: color.hex,
                    borderRadius: "var(--token-radius)",
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-grey-100 pt-4">
        <span
          className="text-grey-400"
          style={{ fontSize: "var(--token-font-size-caption)" }}
        >
          Typography
        </span>
        <TypographySpecimen
          fontFamily={tokens.fontFamily}
          levels={tokens.specimenTypography}
        />
      </div>
    </div>
  );
}
