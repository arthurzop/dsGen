"use client";

import { useState } from "react";

export function Switch() {
  const [on, setOn] = useState(true);

  return (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={() => setOn((v) => !v)}
        className="relative h-6 w-11 cursor-pointer rounded-full shadow-inner transition-colors duration-200"
        style={{
          backgroundColor: on ? "var(--token-color-dominant)" : "#D1D1D4",
        }}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
          style={{ transform: on ? "translateX(-20px)" : "translateX(2px)" }}
        />
      </button>
      <button
        onClick={() => setOn((v) => !v)}
        className="relative h-6 w-11 cursor-pointer rounded-full shadow-inner transition-colors duration-200"
        style={{
          backgroundColor: on ? "var(--token-color-secondary)" : "#D1D1D4",
        }}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
          style={{ transform: on ? "translateX(-20px)" : "translateX(2px)" }}
        />
      </button>
      <button
        onClick={() => setOn((v) => !v)}
        className="relative h-6 w-11 cursor-pointer rounded-full shadow-inner transition-colors duration-200"
        style={{
          backgroundColor: on ? "var(--token-color-accent)" : "#D1D1D4",
        }}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
          style={{ transform: on ? "translateX(-20px)" : "translateX(2px)" }}
        />
      </button>
    </div>
  );
}
