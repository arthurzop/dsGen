import { DsGenProject } from "@/types/project";

interface CoverPageProps {
  project: DsGenProject;
}

export function CoverPage({ project }: CoverPageProps) {
  return (
    <div
      className="flex h-full w-full flex-col justify-center gap-2 p-16"
      style={{
        backgroundColor: "var(--token-color-dominant)",
        fontFamily: "var(--token-font-family)",
      }}
    >
      <h1
        className="font-bold leading-none text-white-true"
        style={{ fontSize: "var(--token-font-size-display)" }}
      >
        {project.meta.name || "Untitled"}
      </h1>

      {project.meta.subtitle && (
        <p
          className="text-white-true/80"
          style={{ fontSize: "var(--token-font-size-h3)" }}
        >
          {project.meta.subtitle}
        </p>
      )}
    </div>
  );
}
