"use client";

import { useProjectStore } from "@/store/useProjectStore";

export function UiSystemToggle() {
  const enabled = useProjectStore((s) => s.project.uiSystem.enabled);
  const toggleUiSystem = useProjectStore((s) => s.toggleUiSystem);

  return (
    <>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => toggleUiSystem(e.target.checked)}
          className="accent-tiger-500"
        />
        Ativar UI System no documento
      </label>
    </>
  );
}
