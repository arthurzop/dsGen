"use client";

import { useState } from "react";

export function Switch() {
  const [on, setOn] = useState(true);

  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="relative h-6 w-11 transition-colors"
      style={{
        borderRadius: 9999,
        backgroundColor: on ? "var(--token-color-dominant)" : "#D1D1D4",
      }}
    >
      <span
        className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform"
        style={{ transform: on ? "translateX(22px)" : "translateX(2px)" }}
      />
    </button>
  );
}
