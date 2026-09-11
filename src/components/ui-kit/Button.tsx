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
        className="flex-1 cursor-pointer px-5 py-2.5 font-medium text-white shadow-sm transition-all hover:brightness-110 hover:shadow-md active:scale-[0.97]"
        style={{ ...shared, backgroundColor: "var(--token-color-dominant)" }}
      >
        {children}
      </button>
    );
  }

  if (variant === "secondary") {
    return (
      <button
        className="flex-1 cursor-pointer border-2 bg-transparent px-5 py-2 font-medium transition-all hover:bg-(--token-color-dominant) hover:text-white active:scale-[0.97]"
        style={{
          ...shared,
          borderColor: "var(--token-color-dominant)",
          color: "var(--token-color-dominant)",
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className="cursor-pointer rounded-lg w-full py-2 font-medium transition-colors hover:bg-black/5 hover:underline"
      style={{ ...shared, color: "var(--token-color-dominant)" }}
    >
      {children}
    </button>
  );
}
