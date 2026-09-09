"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { RadiusPreset } from "@/types/project";

const RADIUS_OPTIONS: { value: RadiusPreset; label: string }[] = [
  { value: "none", label: "None" },
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "full", label: "Full" },
];

const SPACING_OPTIONS = [4, 8, 12, 16];

export function FoundationsSection() {
  const foundations = useProjectStore((s) => s.project.foundations);
  const setRadius = useProjectStore((s) => s.setRadius);
  const setSpacingBase = useProjectStore((s) => s.setSpacingBase);

  return (
    <section className="flex flex-col gap-4">
      <span className="text-xs font-medium uppercase tracking-wide text-grey-500">
        Foundations
      </span>

      <div className="flex flex-col gap-2">
        <span className="text-sm">Border Radius</span>
        <div className="flex flex-col gap-1">
          {RADIUS_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 text-sm"
            >
              <input
                type="radio"
                name="radius"
                checked={foundations.radius === option.value}
                onChange={() => setRadius(option.value)}
                className="accent-tiger-500"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm">Spacing base</span>
        <div className="flex gap-2">
          {SPACING_OPTIONS.map((px) => (
            <button
              key={px}
              onClick={() => setSpacingBase(px)}
              className={`rounded-md border px-3 py-1.5 text-xs ${
                foundations.spacingBase === px
                  ? "border-tiger-500 bg-tiger-50 text-tiger-700"
                  : "border-grey-200 text-grey-500 hover:border-grey-300"
              }`}
            >
              {px}px
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
