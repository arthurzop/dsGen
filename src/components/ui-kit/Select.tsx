import { ChevronDown } from "lucide-react";

export function Select({ options }: { options: string[] }) {
  return (
    <div className="relative">
      <select
        className="w-full cursor-pointer appearance-none border border-grey-200 bg-white px-3.5 py-2.5 pr-9 text-black-night outline-none transition-all focus:border-(--token-color-dominant) focus:ring-4 focus:ring-(--token-color-dominant)/10"
        style={{
          borderRadius: "var(--token-radius)",
          fontFamily: "var(--token-font-family)",
          fontSize: "var(--token-font-size-small)",
        }}
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-grey-400"
      />
    </div>
  );
}
