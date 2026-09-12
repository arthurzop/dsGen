import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-white-off text-center"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--color-grey-200) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <span className="text-lg font-bold text-dragonfruit">dsGen</span>

      <h1 className="text-6xl font-black text-black-night">404</h1>
      <p className="max-w-sm text-sm text-grey-500">
        Essa página não existe ou foi movida. Volte para o editor para continuar
        de onde parou.
      </p>

      <Link
        href="/"
        className="mt-2 cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:brightness-110 flex items-center gap-2"
        style={{ backgroundColor: "var(--color-dragonfruit)" }}
      >
        <ArrowLeft size={18}/> Voltar pro editor
      </Link>
    </div>
  );
}
