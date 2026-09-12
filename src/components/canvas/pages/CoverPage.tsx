import { DsGenProject } from "@/types/project";

interface CoverPageProps {
  project: DsGenProject;
}

export function CoverPage({ project }: CoverPageProps) {
  const { name, subtitle, type, client, year } = project.meta;

  return (
    <div
      className="flex h-full w-full flex-col justify-between p-8"
      style={{
        backgroundColor: "var(--token-color-dominant)",
        fontFamily: "var(--token-font-family)",
      }}
    >
      <div className="flex items-center justify-between">
        {type ? (
          <span
            className="rounded-full bg-white/15 px-3 py-1 text-white/90"
            style={{ fontSize: "var(--token-font-size-caption)" }}
          >
            {type}
          </span>
        ) : (
          <span />
        )}

        {year && (
          <span
            className="uppercase tracking-[0.2em] text-white/60"
            style={{ fontSize: "var(--token-font-size-caption)" }}
          >
            {year}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h1
          className="leading-none text-white-true"
          style={{
            fontSize: "var(--token-font-size-display)",
            fontWeight: "var(--token-font-weight)",
            fontStyle: "var(--token-font-style)",
          }}
        >
          {name || "Untitled"}
        </h1>

        {subtitle && (
          <p
            className="text-white-true/80"
            style={{ fontSize: "var(--token-font-size-h3)" }}
          >
            {subtitle}
          </p>
        )}

        {client && (
          <span
            className="mt-2 text-white-true/50"
            style={{ fontSize: "var(--token-font-size-small)" }}
          >
            Para {client}
          </span>
        )}
      </div>
    </div>
  );
}
