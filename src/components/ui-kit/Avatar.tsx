export function Avatar({ initials = "LU" }: { initials?: string }) {
  return (
    <div
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center font-medium text-white shadow-sm transition-transform hover:scale-105"
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
