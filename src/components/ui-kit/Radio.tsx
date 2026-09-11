"use client";

import { useState } from "react";

export function Radio({ options }: { options: string[] }) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div
      className="flex flex-col gap-1"
      style={{ fontSize: "var(--token-font-size-small)" }}
    >
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2">
          <input
            type="radio"
            name="specimen-radio"
            checked={selected === opt}
            onChange={() => setSelected(opt)}
            style={{ accentColor: "var(--token-color-dominant)" }}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}
