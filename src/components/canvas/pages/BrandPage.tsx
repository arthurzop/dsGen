import { DsGenProject } from "@/types/project";

interface BrandPageProps {
  project: DsGenProject;
}

const HIERARCHY_LABELS = ["Dominante", "Secundária", "Suporte"];

export function BrandPage({ project }: BrandPageProps) {
  const { logo, colors } = project.brandCore;
  const palette = colors.palette;

  return (
    <div
      className="flex h-full w-full flex-col gap-10 p-8"
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

      <div className="grid flex-1 grid-cols-2 gap-14">
        <div className="flex flex-col gap-3">
          <span
            className="text-grey-400"
            style={{ fontSize: "var(--token-font-size-caption)" }}
          >
            Logo
          </span>
          <div className="neu-inset flex flex-1 items-center justify-center rounded-2xl p-10">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo.dataUrl}
                alt="Logo"
                className="max-h-32 max-w-full object-contain"
              />
            ) : (
              <span
                className="text-grey-300"
                style={{ fontSize: "var(--token-font-size-body)" }}
              >
                Nenhum logo enviado
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span
            className="text-grey-400"
            style={{ fontSize: "var(--token-font-size-caption)" }}
          >
            Paleta
          </span>
          <div className="flex flex-1 flex-col gap-2">
            {palette.length === 0 ? (
              <div className="neu-inset flex flex-1 items-center justify-center rounded-2xl">
                <span
                  className="text-grey-300"
                  style={{ fontSize: "var(--token-font-size-body)" }}
                >
                  Nenhuma cor definida
                </span>
              </div>
            ) : (
              palette.map((color, index) => (
                <div
                  key={color.id}
                  className="flex flex-1 items-center gap-4 rounded-2xl px-5"
                  style={{ backgroundColor: color.hex }}
                >
                  <span
                    className="font-mono font-medium text-white/90"
                    style={{ fontSize: "var(--token-font-size-small)" }}
                  >
                    {color.hex.toUpperCase()}
                  </span>
                  <span
                    className="ml-auto text-white/60"
                    style={{ fontSize: "var(--token-font-size-caption)" }}
                  >
                    {HIERARCHY_LABELS[index] ??
                      (index === 0 ? "Dominante" : "Accent")}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
