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

export function FoundationsSection() {
  const foundations = useProjectStore((s) => s.project.foundations);
  const setRadius = useProjectStore((s) => s.setRadius);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm">Border Radius</span>
      <div className="flex flex-col gap-1">
        {RADIUS_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2 text-sm"
          >
            <input
              type="radio"
              name="radius"
              checked={foundations.radius === option.value}
              onChange={() => setRadius(option.value)}
              className="cursor-pointer"
              style={{ accentColor: "var(--color-tiger)" }}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
