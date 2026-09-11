export function Select({ options }: { options: string[] }) {
  return (
    <select
      className="w-full border border-grey-200 px-3 py-2 outline-none focus:border-[var(--token-color-dominant)]"
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
  );
}
