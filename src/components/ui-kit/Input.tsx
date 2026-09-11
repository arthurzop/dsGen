export function Input({
  placeholder = "Placeholder",
}: {
  placeholder?: string;
}) {
  return (
    <input
      placeholder={placeholder}
      className="w-full cursor-text border border-grey-200 bg-white px-3.5 py-2.5 text-black-night outline-none transition-all placeholder:text-grey-400 focus:border-(--token-color-dominant) focus:ring-4 focus:ring-(--token-color-dominant)/10"
      style={{
        borderRadius: "var(--token-radius)",
        fontFamily: "var(--token-font-family)",
        fontSize: "var(--token-font-size-small)",
      }}
    />
  );
}
