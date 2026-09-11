"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export function Checkbox() {
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(true);

  return (
    <div className="flex gap-8">
      <button
        onClick={() => setChecked1((v) => !v)}
        className="flex cursor-pointer items-center gap-2.5"
        style={{
          fontSize: "var(--token-font-size-small)",
          fontFamily: "var(--token-font-family)",
        }}
      >
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center border-2 transition-all"
          style={{
            borderRadius: "calc(var(--token-radius) / 2)",
            borderColor: checked1 ? "var(--token-color-dominant)" : "#CCCCCC",
            backgroundColor: checked1
              ? "var(--token-color-dominant)"
              : "transparent",
          }}
        >
          {checked1 && (
            <Check size={13} strokeWidth={3} className="text-white" />
          )}
        </span>
        Opção 01
      </button>
      <button
        onClick={() => setChecked2((v) => !v)}
        className="flex cursor-pointer items-center gap-2.5"
        style={{
          fontSize: "var(--token-font-size-small)",
          fontFamily: "var(--token-font-family)",
        }}
      >
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center border-2 transition-all"
          style={{
            borderRadius: "calc(var(--token-radius) / 2)",
            borderColor: checked2 ? "var(--token-color-dominant)" : "#CCCCCC",
            backgroundColor: checked2
              ? "var(--token-color-dominant)"
              : "transparent",
          }}
        >
          {checked2 && (
            <Check size={13} strokeWidth={3} className="text-white" />
          )}
        </span>
        Opção 02
      </button>
    </div>
  );
}
