"use client";

import { useEffect, useState } from "react";
import { useProjectStore } from "@/store/useProjectStore";
import {
  fetchGoogleFontsList,
  searchGoogleFonts,
  parseVariants,
  GoogleFontEntry,
} from "@/lib/fonts/googleFontsApi";
import { loadGoogleFont } from "@/lib/fonts/loadGoogleFont";
import { FONT_RATIO_PRESETS } from "@/lib/tokens/defaults";
import { generateId } from "@/lib/id";

export function TypographySection() {
  const typography = useProjectStore((s) => s.project.brandCore.typography);
  const setPrimaryFont = useProjectStore((s) => s.setPrimaryFont);
  const setFontRatio = useProjectStore((s) => s.setFontRatio);

  const [allFonts, setAllFonts] = useState<GoogleFontEntry[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGoogleFontsList()
      .then(setAllFonts)
      .catch(() => setError("Não foi possível carregar as fontes."))
      .finally(() => setLoading(false));
  }, []);

  // Garante que a fonte atual está sempre carregada no <head>, mesmo em reload
  useEffect(() => {
    if (typography.primaryFont.source === "google") {
      loadGoogleFont(
        typography.primaryFont.family,
        typography.primaryFont.weights.map((w) => w.weight),
      );
    }
  }, [typography.primaryFont]);

  function handleSelectFont(entry: GoogleFontEntry) {
    const weights = parseVariants(entry.variants);
    loadGoogleFont(
      entry.family,
      weights.map((w) => w.weight),
    );

    setPrimaryFont({
      id: generateId(),
      source: "google",
      family: entry.family,
      weights,
    });
    setQuery("");
  }

  const results = query ? searchGoogleFonts(allFonts, query) : [];

  return (
    <>
      <div className="flex items-center gap-2 rounded-md border border-grey-200 px-3 py-2">
        <span
          className="text-lg"
          style={{ fontFamily: typography.primaryFont.family }}
        >
          Ag
        </span>
        <div className="flex flex-col">
          <span className="text-sm">{typography.primaryFont.family}</span>
          <span className="text-[10px] text-grey-400">
            {typography.primaryFont.weights.length} peso(s)
          </span>
        </div>
      </div>

      <div className="relative flex flex-col gap-1">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            loading ? "Carregando fontes..." : "Buscar Google Font..."
          }
          disabled={loading || !!error}
          className="rounded-md border border-grey-200 px-3 py-2 text-sm outline-none focus:border-tiger-500"
        />

        {error && (
          <span className="text-[10px] text-bubblegum-600">{error}</span>
        )}

        {results.length > 0 && (
          <div className="absolute top-full z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-grey-200 bg-white-true shadow-md">
            {results.map((entry) => (
              <button
                key={entry.family}
                onClick={() => handleSelectFont(entry)}
                className="block w-full px-3 py-2 text-left text-sm hover:bg-grey-100"
              >
                {entry.family}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 text-sm">
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
                className={`rounded-lg py-1.5 text-[11px] font-mono transition-colors cursor-pointer ${
                  isActive
                    ? "neu-inset text-tiger-600 "
                    : "neu-surface text-grey-500 hover:text-tiger-500 hover:bg-neutral-200"
                }`}
              >
                {ratio}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
