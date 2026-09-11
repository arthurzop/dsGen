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
          className="px-3 py-2"
          style={{
            fontSize: "var(--token-font-size-small)",
            color: active === i ? "var(--token-color-dominant)" : "#838383",
            borderBottom:
              active === i
                ? "2px solid var(--token-color-dominant)"
                : "2px solid transparent",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
export function Avatar({ initials = "LU" }: { initials?: string }) {
  return (
    <div
      className="flex h-10 w-10 items-center justify-center text-white"
      style={{
        backgroundColor: "var(--token-color-secondary)",
        borderRadius: "var(--token-radius)",
        fontFamily: "var(--token-font-family)",
        fontSize: "var(--token-font-size-caption)",
      }}
    >
      {initials}
    </div>
  );
}
