export function Alert() {
  return (
    <div
      className="border-l-4 bg-grey-100 px-3 py-2"
      style={{
        borderColor: "var(--token-color-accent)",
        borderRadius: "var(--token-radius)",
        fontFamily: "var(--token-font-family)",
        fontSize: "var(--token-font-size-small)",
      }}
    >
      Mensagem de alerta do sistema.
    </div>
  );
}
