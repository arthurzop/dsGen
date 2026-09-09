import { DsGenProject } from "@/types/project";

interface BrandPageProps {
  project: DsGenProject;
}

export function BrandPage({ project }: BrandPageProps) {
  const { logo, typography, colors } = project.brandCore;
  const palette = colors.palette;

  return (
    <div
      className="flex h-full w-full flex-col gap-8 p-12"
      style={{ fontFamily: "var(--token-font-family)" }}
    >
      <span
        className="font-medium uppercase tracking-wide"
        style={{
          fontSize: "var(--token-font-size-small)",
          color: "var(--token-color-dominant)",
        }}
      >
        02 · Brand
      </span>

      <div className="grid grid-cols-3 gap-8">
        {/* Logo */}
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

        {/* Typography */}
        <div className="flex flex-col gap-2">
          <span
            className="text-grey-400"
            style={{ fontSize: "var(--token-font-size-caption)" }}
          >
            Tipografia
          </span>
          <span
            className="font-bold"
            style={{
              fontSize: "var(--token-font-size-h1)",
              fontFamily: "var(--token-font-family)",
            }}
          >
            Aa
          </span>
          <span
            className="text-grey-500"
            style={{ fontSize: "var(--token-font-size-small)" }}
          >
            {typography.primaryFont.family}
          </span>
        </div>

        {/* Colors */}
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
    </div>
  );
}
