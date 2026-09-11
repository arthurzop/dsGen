"use client";

import { useState } from "react";

export function Tabs({ labels }: { labels: string[] }) {
  const [active, setActive] = useState(0);

  return (
    <div
      className="flex gap-1 border-b border-grey-200"
      style={{ fontFamily: "var(--token-font-family)" }}
    >
      {labels.map((label, i) => (
        <button
          key={label}
          onClick={() => setActive(i)}
          className="relative cursor-pointer px-3.5 py-2.5 transition-colors"
          style={{
            fontSize: "var(--token-font-size-small)",
            color: active === i ? "var(--token-color-dominant)" : "#838383",
          }}
        >
          {label}
          {active === i && (
            <span
              className="absolute inset-x-0 -bottom-px h-0.5 rounded-full"
              style={{ backgroundColor: "var(--token-color-dominant)" }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
