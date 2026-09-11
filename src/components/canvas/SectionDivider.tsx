interface SectionDividerProps {
  number: number;
  label: string;
}

/**
 * Divisor de seção usado FORA do PageFrame, no canvas. Cada página/grupo
 * de páginas ganha um desses antes de si, além do rótulo que já existe
 * dentro do card — reforça a navegação visual do documento como um todo.
 */
export function SectionDivider({ number, label }: SectionDividerProps) {
  return (
    <div className="flex w-full max-w-[900px] items-center gap-3 text-grey-400">
      <span className="text-xs font-medium uppercase tracking-wide">
        {String(number).padStart(2, "0")} · {label}
      </span>
      <div className="h-px flex-1 bg-grey-200" />
    </div>
  );
}
