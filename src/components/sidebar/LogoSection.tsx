"use client";

import { useRef, useState } from "react";
import { X, Upload } from "lucide-react";
import { useProjectStore } from "@/store/useProjectStore";
import {
  processLogoFile,
  LogoValidationError,
} from "@/lib/logo/processLogoFile";

export function LogoSection() {
  const logo = useProjectStore((s) => s.project.brandCore.logo);
  const setLogo = useProjectStore((s) => s.setLogo);
  const removeLogo = useProjectStore((s) => s.removeLogo);

  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setIsProcessing(true);

    try {
      const asset = await processLogoFile(file);
      setLogo(asset);
    } catch (err) {
      if (err instanceof LogoValidationError) {
        setError(err.message);
      } else {
        setError("Erro inesperado ao processar o logo.");
      }
    } finally {
      setIsProcessing(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <section className="flex flex-col gap-3">
      <span className="text-xs font-medium uppercase tracking-wide text-grey-500">
        Logo
      </span>

      {logo ? (
        <div className="flex flex-col gap-2 rounded-md border border-grey-200 p-3">
          <div
            className="flex h-24 items-center justify-center rounded"
            style={{
              backgroundImage:
                "conic-gradient(#f0f0f0 0.25turn, #fff 0.25turn 0.5turn, #f0f0f0 0.5turn 0.75turn, #fff 0.75turn)",
              backgroundSize: "16px 16px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.dataUrl}
              alt="Logo"
              className="max-h-20 max-w-full object-contain"
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-grey-400">
            <span>
              {logo.originalWidth}×{logo.originalHeight} ·{" "}
              {logo.fileType.toUpperCase()}
              {logo.hasTransparency ? " · transparente" : ""}
            </span>
            <button
              onClick={removeLogo}
              className="text-grey-400 hover:text-bubblegum-600"
            >
              <X size={12} />
            </button>
          </div>

          <button
            onClick={() => inputRef.current?.click()}
            className="text-xs text-tiger-500 hover:underline"
          >
            Substituir
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={isProcessing}
          className="flex flex-col items-center justify-center gap-1 rounded-md border border-dashed border-grey-300 py-6 text-grey-500 hover:border-tiger-500 hover:text-tiger-500"
        >
          <Upload size={16} />
          <span className="text-xs">
            {isProcessing ? "Processando..." : "Enviar logo (SVG, PNG, JPG)"}
          </span>
        </button>
      )}

      {error && <span className="text-[10px] text-bubblegum-600">{error}</span>}

      <input
        ref={inputRef}
        type="file"
        accept=".svg,.png,.jpg,.jpeg"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </section>
  );
}
