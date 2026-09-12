"use client";

import { useProjectStore } from "@/store/useProjectStore";

export function UiSystemToggle() {
  const enabled = useProjectStore((s) => s.project.uiSystem.enabled);
  const toggleUiSystem = useProjectStore((s) => s.toggleUiSystem);

  return (
    <div className="flex items-center justify-between text-sm">
      <span>Ativar UI System no documento</span>

      <button
        onClick={() => toggleUiSystem(!enabled)}
        className="relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200"
        style={{ backgroundColor: enabled ? "var(--color-tiger)" : "#D1D1D4" }}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
          style={{
            transform: enabled ? "translateX(-20px)" : "translateX(2px)",
          }}
        />
      </button>
    </div>
  );
}
