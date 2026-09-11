export function Badge({ label }: { label: string }) {
  return (
    <span
      className="px-2.5 py-1 font-medium"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--token-color-accent) 15%, white)",
        color: "var(--token-color-accent)",
        borderRadius: "var(--token-radius)",
        fontFamily: "var(--token-font-family)",
        fontSize: "var(--token-font-size-caption)",
      }}
    >
      {label}
    </span>
  );
}
