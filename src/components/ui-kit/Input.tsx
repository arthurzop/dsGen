export function Input({
  placeholder = "Placeholder",
}: {
  placeholder?: string;
}) {
  return (
    <input
      placeholder={placeholder}
      className="w-full border border-grey-200 px-3 py-2 outline-none transition-colors focus:border-[var(--token-color-dominant)]"
      style={{
        borderRadius: "var(--token-radius)",
        fontFamily: "var(--token-font-family)",
        fontSize: "var(--token-font-size-small)",
      }}
    />
  );
}
