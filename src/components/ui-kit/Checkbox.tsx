"use client";

import { useState } from "react";

export function Checkbox({ label }: { label: string }) {
  const [checked, setChecked] = useState(true);

  return (
    <label
      className="flex items-center gap-2"
      style={{ fontSize: "var(--token-font-size-small)" }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        style={{ accentColor: "var(--token-color-dominant)" }}
      />
      {label}
    </label>
  );
}
