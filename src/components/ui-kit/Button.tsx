"use client";

import { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "text";
  children: ReactNode;
}

export function Button({ variant = "primary", children }: ButtonProps) {
  const shared = {
    borderRadius: "var(--token-radius)",
    fontFamily: "var(--token-font-family)",
    fontSize: "var(--token-font-size-small)",
  };

  if (variant === "primary") {
    return (
      <button
        className="px-4 py-2 font-medium text-white transition-opacity active:opacity-70"
        style={{ ...shared, backgroundColor: "var(--token-color-dominant)" }}
      >
        {children}
      </button>
    );
  }

  if (variant === "secondary") {
    return (
      <button
        className="px-4 py-2 font-medium text-white transition-opacity active:opacity-70"
        style={{ ...shared, backgroundColor: "var(--token-color-secondary)" }}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className="px-3 py-2 font-medium underline-offset-2 hover:underline"
      style={{ ...shared, color: "var(--token-color-dominant)" }}
    >
      {children}
    </button>
  );
}
