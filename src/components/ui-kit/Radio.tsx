"use client";

import { useState } from "react";

export function Radio({ options }: { options: string[] }) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div
      className="flex gap-4 pt-4"
      style={{
        fontSize: "var(--token-font-size-small)",
        fontFamily: "var(--token-font-family)",
      }}
    >
      {options.map((opt) => {
        const active = selected === opt;
        return (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className="flex cursor-pointer items-center gap-2.5"
          >
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all"
              style={{
                borderColor: active ? "var(--token-color-dominant)" : "#CCCCCC",
              }}
            >
              {active && (
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: "var(--token-color-dominant)" }}
                />
              )}
            </span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}
