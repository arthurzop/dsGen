export function Card() {
  return (
    <div
      className="border border-grey-200 p-4"
      style={{
        borderRadius: "var(--token-radius)",
        padding: "var(--token-spacing)",
      }}
    >
      <h4
        className="font-bold"
        style={{
          fontFamily: "var(--token-font-family)",
          fontSize: "var(--token-font-size-body)",
        }}
      >
        Título do Card
      </h4>
      <p
        className="mt-1 text-grey-500"
        style={{
          fontFamily: "var(--token-font-family)",
          fontSize: "var(--token-font-size-caption)",
        }}
      >
        Descrição curta do conteúdo do card.
      </p>
    </div>
  );
}
