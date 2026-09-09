import { ApplicationTemplateProps } from "@/lib/applications/templateRegistry";

/**
 * Slots fixos: background (dominante→secundária), blob decorativo (accent),
 * headline (nome/subtitle do projeto), logo. Nenhum deles reage a "quantas
 * cores existem" além de ler dominant/secondary/accent já resolvidos —
 * isso é o que evita virar um motor de composição livre.
 */
export function PosterTemplate({ project, tokens }: ApplicationTemplateProps) {
  const { logo, colors } = {
    logo: project.brandCore.logo,
    colors: tokens.colors,
  };

  return (
    <div
      className="relative flex h-full w-full flex-col justify-end overflow-hidden p-10"
      style={{
        background: `linear-gradient(135deg, ${colors.dominant}, ${colors.secondary})`,
        fontFamily: "var(--token-font-family)",
      }}
    >
      {/* Blob decorativo — slot fixo de accent */}
      <div
        className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-70 blur-2xl"
        style={{ backgroundColor: colors.accent }}
      />

      {/* Logo — canto superior esquerdo, sempre a mesma posição */}
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo.dataUrl}
          alt="Logo"
          className="absolute left-10 top-10 max-h-8 max-w-[120px] object-contain"
          style={{ filter: logo.hasTransparency ? "none" : "invert(1)" }}
        />
      )}

      {/* Headline — slot fixo, nunca mais de 2 linhas por design */}
      <h2
        className="relative z-10 max-w-[80%] font-bold leading-tight text-white-true"
        style={{ fontSize: "var(--token-font-size-h1)" }}
      >
        {project.meta.subtitle || project.meta.name || "Untitled"}
      </h2>

      <span
        className="relative z-10 mt-2 text-white-true/70"
        style={{ fontSize: "var(--token-font-size-small)" }}
      >
        {project.meta.name}
      </span>
    </div>
  );
}
