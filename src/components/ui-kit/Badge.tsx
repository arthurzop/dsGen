export function Badge({ label }: { label: string }) {
  return (
    <span
      className="px-2 py-0.5 text-white"
      style={{
        backgroundColor: "var(--token-color-accent)",
        borderRadius: "var(--token-radius)",
        fontFamily: "var(--token-font-family)",
        fontSize: "var(--token-font-size-caption)",
      }}
    >
      {label}
    </span>
  );
}
