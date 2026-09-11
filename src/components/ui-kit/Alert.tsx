import { AlertCircle } from "lucide-react";

export function Alert() {
  return (
    <div
      className="flex items-start gap-2.5 border-l-4 px-3.5 py-3"
      style={{
        borderColor: "var(--token-color-accent)",
        backgroundColor:
          "color-mix(in srgb, var(--token-color-accent) 8%, white)",
        borderTopRightRadius: "var(--token-radius)",
        borderBottomRightRadius: "var(--token-radius)",
        fontFamily: "var(--token-font-family)",
        fontSize: "var(--token-font-size-small)",
      }}
    >
      <AlertCircle
        size={16}
        style={{ color: "var(--token-color-accent)" }}
        className="mt-0.5 shrink-0"
      />
      Mensagem de alerta do sistema.
    </div>
  );
}
