import { ApplicationTemplateProps } from "@/lib/applications/templateRegistry";

export function PosterTemplate({ project, tokens }: ApplicationTemplateProps) {
  const logo = project.brandCore.logo;
  const colors = tokens.colors;
  const swatches = colors.all.slice(0, 5);
  const headline = project.meta.subtitle || project.meta.name || "Untitled";

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden"
      style={{
        backgroundColor: colors.dominant,
        fontFamily: "var(--token-font-family)",
      }}
    >
      <div
        className="absolute -bottom-32 -right-24 size-105 rounded-full opacity-60 blur-3xl"
        style={{ backgroundColor: colors.accent }}
      />
      <div
        className="absolute -left-20 -top-24 h-64 w-64 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: colors.secondary }}
      />

      <div className="relative z-10 flex items-center justify-between px-10 pt-10">
        {logo ? (
          <div className="flex h-9 items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}

            <img
              src={logo.dataUrl}
              alt="Logo"
              className="h-10 rounded max-w-25 object-contain"
            />
            <img
              src={logo.dataUrl}
              alt="Logo"
              className="h-10 rounded-full max-w-25 object-contain"
            />
          </div>
        ) : (
          <span
            className="rounded-full px-4 py-1.5 text-white/90"
            style={{
              backgroundColor: colors.secondary,
              fontSize: "var(--token-font-size-caption)",
            }}
          >
            {project.meta.name || "Untitled"}
          </span>
        )}

        <span
          className="uppercase tracking-[0.2em] text-white/60"
          style={{ fontSize: "var(--token-font-size-caption)" }}
        >
          {project.meta.year || new Date().getFullYear()}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center px-10">
        <h1
          className="font-black leading-[0.95] text-white-true"
          style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)" }}
        >
          {headline}
        </h1>
      </div>

      <div
        className="relative z-10 flex items-end justify-between px-10 pb-10"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.25))",
          marginTop: "-4rem",
          paddingTop: "4rem",
        }}
      >
        <div className="flex gap-2 flex-wrap">
          {swatches.map((hex, i) => (
            <div
              key={`${hex}-${i}`}
              className="h-6 w-6 rounded-full border border-white/10"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>

        <span
          className="uppercase tracking-[0.15em] text-white/50"
          style={{ fontSize: "var(--token-font-size-caption)" }}
        >
          {project.meta.name} · Brand
        </span>
      </div>
    </div>
  );
}
