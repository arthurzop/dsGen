export function Avatar({ initials = "LU" }: { initials?: string }) {
  return (
    <div
      className="flex h-10 w-10 items-center justify-center text-white"
      style={{
        backgroundColor: "var(--token-color-secondary)",
        borderRadius: "var(--token-radius)",
        fontFamily: "var(--token-font-family)",
        fontSize: "var(--token-font-size-caption)",
      }}
    >
      {initials}
    </div>
  );
}
