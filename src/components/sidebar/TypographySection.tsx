"use client";

import { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { useProjectStore } from "@/store/useProjectStore";
import {
  fetchGoogleFontsList,
  searchGoogleFonts,
  parseVariants,
  GoogleFontEntry,
} from "@/lib/fonts/googleFontsApi";
import { loadGoogleFont } from "@/lib/fonts/loadGoogleFont";
import { loadCustomFont } from "@/lib/fonts/loadCustomFont";
import {
  processCustomFontFile,
  FontValidationError,
} from "@/lib/fonts/processCustomFontFile";
import { FONT_RATIO_PRESETS } from "@/lib/tokens/defaults";
import { generateId } from "@/lib/id";

const CUSTOM_WEIGHT_OPTIONS = [100, 200, 300, 400, 500, 600, 700, 800, 900];

export function TypographySection() {
  const typography = useProjectStore((s) => s.project.brandCore.typography);
  const setPrimaryFont = useProjectStore((s) => s.setPrimaryFont);
  const setFontRatio = useProjectStore((s) => s.setFontRatio);

  const [tab, setTab] = useState<"google" | "custom">(
    typography.primaryFont.source === "custom" ? "custom" : "google",
  );

  const [allFonts, setAllFonts] = useState<GoogleFontEntry[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [googleError, setGoogleError] = useState<string | null>(null);

  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchGoogleFontsList()
      .then(setAllFonts)
      .catch(() => setGoogleError("Não foi possível carregar as fontes."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const font = typography.primaryFont;
    if (font.source === "google") {
      loadGoogleFont(
        font.family,
        font.weights.map((w) => w.weight),
      );
    } else if (font.source === "custom" && font.customFile) {
      const primaryWeight = font.weights[0];
      loadCustomFont(
        font.family,
        font.customFile.dataUrl,
        primaryWeight?.weight ?? 400,
        primaryWeight?.style ?? "normal",
      );
    }
  }, [typography.primaryFont]);

  function handleSelectFont(entry: GoogleFontEntry) {
    const weights = parseVariants(entry.variants);
    loadGoogleFont(
      entry.family,
      weights.map((w) => w.weight),
    );

    const defaultIndex = weights.findIndex(
      (w) => w.weight === 400 && w.style === "normal",
    );

    setPrimaryFont({
      id: generateId(),
      source: "google",
      family: entry.family,
      weights,
      activeWeightIndex: defaultIndex >= 0 ? defaultIndex : 0,
    });
    setQuery("");
  }

  async function handleFileUpload(file: File | undefined) {
    if (!file) return;
    setUploadError(null);
    setIsProcessing(true);

    try {
      const fontDef = await processCustomFontFile(file);
      setPrimaryFont(fontDef);
    } catch (err) {
      setUploadError(
        err instanceof FontValidationError
          ? err.message
          : "Erro inesperado ao processar a fonte.",
      );
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function updateCustomFamily(family: string) {
    if (typography.primaryFont.source !== "custom") return;
    setPrimaryFont({ ...typography.primaryFont, family });
  }

  function updateCustomWeight(weight: number) {
    if (typography.primaryFont.source !== "custom") return;
    const style = typography.primaryFont.weights[0]?.style ?? "normal";
    setPrimaryFont({ ...typography.primaryFont, weights: [{ weight, style }] });
  }

  function updateCustomStyle(style: "normal" | "italic") {
    if (typography.primaryFont.source !== "custom") return;
    const weight = typography.primaryFont.weights[0]?.weight ?? 400;
    setPrimaryFont({ ...typography.primaryFont, weights: [{ weight, style }] });
  }

  function updateGoogleWeight(weight: number) {
    if (typography.primaryFont.source !== "google") return;
    const weights = typography.primaryFont.weights;
    const currentStyle =
      weights[typography.primaryFont.activeWeightIndex ?? 0]?.style ?? "normal";

    let index = weights.findIndex(
      (w) => w.weight === weight && w.style === currentStyle,
    );
    if (index === -1) index = weights.findIndex((w) => w.weight === weight);
    if (index === -1) return;

    setPrimaryFont({ ...typography.primaryFont, activeWeightIndex: index });
  }

  function updateGoogleStyle(style: "normal" | "italic") {
    if (typography.primaryFont.source !== "google") return;
    const weights = typography.primaryFont.weights;
    const currentWeight =
      weights[typography.primaryFont.activeWeightIndex ?? 0]?.weight ?? 400;

    const index = weights.findIndex(
      (w) => w.weight === currentWeight && w.style === style,
    );
    if (index === -1) return;

    setPrimaryFont({ ...typography.primaryFont, activeWeightIndex: index });
  }

  const results = query ? searchGoogleFonts(allFonts, query) : [];

  const googleWeights =
    typography.primaryFont.source === "google"
      ? typography.primaryFont.weights
      : [];
  const activeGoogleWeight =
    googleWeights[
      typography.primaryFont.source === "google"
        ? (typography.primaryFont.activeWeightIndex ?? 0)
        : 0
    ];
  const availableWeightValues = Array.from(
    new Set(googleWeights.map((w) => w.weight)),
  ).sort((a, b) => a - b);
  const availableStylesForWeight = googleWeights
    .filter((w) => w.weight === activeGoogleWeight?.weight)
    .map((w) => w.style);

  const previewWeight =
    typography.primaryFont.source === "google"
      ? (activeGoogleWeight?.weight ?? 400)
      : (typography.primaryFont.weights[0]?.weight ?? 400);
  const previewStyle =
    typography.primaryFont.source === "google"
      ? (activeGoogleWeight?.style ?? "normal")
      : (typography.primaryFont.weights[0]?.style ?? "normal");

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2 rounded-lg border border-grey-200 px-3 py-2">
        <span
          className="text-lg"
          style={{
            fontFamily: typography.primaryFont.family,
            fontWeight: previewWeight,
            fontStyle: previewStyle,
          }}
        >
          Ag
        </span>
        <div className="flex flex-col">
          <span className="text-sm">{typography.primaryFont.family}</span>
          <span className="text-[10px] text-grey-400">
            {typography.primaryFont.source === "custom"
              ? "Custom"
              : "Google Fonts"}{" "}
            · {previewWeight}
            {previewStyle === "italic" ? " Italic" : ""}
          </span>
        </div>
      </div>

      <div className="flex gap-1 rounded-lg bg-grey-100 p-1">
        <button
          onClick={() => setTab("google")}
          className={`flex-1 cursor-pointer rounded-md py-1.5 text-xs font-medium transition-colors ${
            tab === "google" ? "bg-white shadow-sm" : "text-grey-500"
          }`}
        >
          Google Fonts
        </button>
        <button
          onClick={() => setTab("custom")}
          className={`flex-1 cursor-pointer rounded-md py-1.5 text-xs font-medium transition-colors ${
            tab === "custom" ? "bg-white shadow-sm" : "text-grey-500"
          }`}
        >
          Custom
        </button>
      </div>

      {tab === "google" && (
        <div className="flex flex-col gap-3">
          <div className="relative flex flex-col gap-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                loading ? "Carregando fontes..." : "Buscar Google Font..."
              }
              disabled={loading || !!googleError}
              className="cursor-text rounded-lg border border-grey-200 px-3 py-2 text-sm outline-none focus:border-(--color-tiger)"
            />

            {googleError && (
              <span className="text-[10px] text-bubblegum-600">
                {googleError}
              </span>
            )}

            {results.length > 0 && (
              <div className="absolute top-full z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-grey-200 bg-white shadow-md">
                {results.map((entry) => (
                  <button
                    key={entry.family}
                    onClick={() => handleSelectFont(entry)}
                    className="block w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-grey-100"
                  >
                    {entry.family}
                  </button>
                ))}
              </div>
            )}
          </div>

          {typography.primaryFont.source === "google" &&
            availableWeightValues.length > 0 && (
              <div className="flex gap-2">
                <label className="flex flex-1 flex-col gap-1 text-xs">
                  Weight
                  <select
                    value={
                      activeGoogleWeight?.weight ?? availableWeightValues[0]
                    }
                    onChange={(e) => updateGoogleWeight(Number(e.target.value))}
                    className="cursor-pointer rounded-md border border-grey-200 px-2 py-1.5 text-sm outline-none focus:border-(--color-tiger)"
                  >
                    {availableWeightValues.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-1 flex-col gap-1 text-xs">
                  Style
                  <select
                    value={activeGoogleWeight?.style ?? "normal"}
                    onChange={(e) =>
                      updateGoogleStyle(e.target.value as "normal" | "italic")
                    }
                    disabled={!availableStylesForWeight.includes("italic")}
                    className="cursor-pointer rounded-md border border-grey-200 px-2 py-1.5 text-sm outline-none focus:border-(--color-tiger) disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <option value="normal">Normal</option>
                    {availableStylesForWeight.includes("italic") && (
                      <option value="italic">Italic</option>
                    )}
                  </select>
                </label>
              </div>
            )}
        </div>
      )}

      {tab === "custom" && (
        <div className="flex flex-col gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-grey-300 py-5 text-grey-500 hover:border-(--color-tiger) hover:text-(--color-tiger)"
          >
            <Upload size={16} />
            <span className="text-xs">
              {isProcessing
                ? "Processando..."
                : "Enviar fonte (TTF, OTF, WOFF, WOFF2)"}
            </span>
          </button>

          {uploadError && (
            <span className="text-[10px] text-bubblegum-600">
              {uploadError}
            </span>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".ttf,.otf,.woff,.woff2"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files?.[0])}
          />

          {typography.primaryFont.source === "custom" && (
            <div className="flex flex-col gap-2 rounded-lg border border-grey-200 p-3">
              <label className="flex flex-col gap-1 text-xs">
                Font Family
                <input
                  value={typography.primaryFont.family}
                  onChange={(e) => updateCustomFamily(e.target.value)}
                  className="cursor-text rounded-md border border-grey-200 px-2 py-1.5 text-sm outline-none focus:border-(--color-tiger)"
                />
              </label>

              <div className="flex gap-2">
                <label className="flex flex-1 flex-col gap-1 text-xs">
                  Weight
                  <select
                    value={typography.primaryFont.weights[0]?.weight ?? 400}
                    onChange={(e) => updateCustomWeight(Number(e.target.value))}
                    className="cursor-pointer rounded-md border border-grey-200 px-2 py-1.5 text-sm outline-none focus:border-(--color-tiger)"
                  >
                    {CUSTOM_WEIGHT_OPTIONS.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-1 flex-col gap-1 text-xs">
                  Style
                  <select
                    value={typography.primaryFont.weights[0]?.style ?? "normal"}
                    onChange={(e) =>
                      updateCustomStyle(e.target.value as "normal" | "italic")
                    }
                    className="cursor-pointer rounded-md border border-grey-200 px-2 py-1.5 text-sm outline-none focus:border-(--color-tiger)"
                  >
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                  </select>
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="flex justify-between text-xs text-grey-500">
          Font Ratio
          <span className="font-mono">{typography.scaleRatio.toFixed(3)}</span>
        </span>
        <div className="grid grid-cols-4 gap-1.5">
          {FONT_RATIO_PRESETS.map((ratio) => {
            const isActive = Math.abs(ratio - typography.scaleRatio) < 0.001;
            return (
              <button
                key={ratio}
                onClick={() => setFontRatio(ratio)}
                className={`cursor-pointer rounded-lg py-1.5 text-[11px] font-mono transition-colors ${
                  isActive
                    ? "bg-(--color-tiger) text-white"
                    : "border border-grey-200 text-grey-500 hover:border-(--color-tiger)"
                }`}
              >
                {ratio}
              </button>
            );
          })}
        </div>
      </label>
    </section>
  );
}
