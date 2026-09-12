"use client";

import { useEffect, useRef, useState } from "react";
import { Download, FileDown, ChevronDown } from "lucide-react";
import { useProjectStore } from "@/store/useProjectStore";
import { usePageRegistry } from "@/context/PageRegistryContext";
import { exportPageAsPng } from "@/lib/export/exportPageAsPng";
import { exportFullPdf } from "@/lib/export/exportFullPdf";
import { TEMPLATE_LABELS } from "@/lib/applications/templateRegistry";
import { buildGoogleFontHref } from "@/lib/fonts/loadGoogleFont";
import { fetchFontEmbedCss } from "@/lib/fonts/fontEmbed";

interface PageManifestEntry {
  id: string;
  label: string;
}

export function ExportMenu() {
  const project = useProjectStore((s) => s.project);
  const { getPageNode } = usePageRegistry();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set(["cover"]));
  const [exportingPng, setExportingPng] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const manifest: PageManifestEntry[] = [
    { id: "cover", label: "Cover" },
    { id: "brand", label: "Brand" },
    { id: "typography", label: "Typography" },
    ...project.applications
      .filter((a) => a.enabled)
      .map((a) => ({ id: a.id, label: TEMPLATE_LABELS[a.templateId] })),
    ...(project.uiSystem.enabled
      ? [{ id: "ui-system", label: "UI System" }]
      : []),
  ];

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function getFontEmbedCss(): Promise<string> {
    const font = project.brandCore.typography.primaryFont;

    if (font.source === "google") {
      const href = buildGoogleFontHref(
        font.family,
        font.weights.map((w) => w.weight),
      );
      return fetchFontEmbedCss(href);
    }

    if (font.source === "custom" && font.customFile) {
      const weight = font.weights[0]?.weight ?? 400;
      const style = font.weights[0]?.style ?? "normal";
      return `@font-face { font-family: '${font.family}'; src: url(${font.customFile.dataUrl}); font-weight: ${weight}; font-style: ${style}; }`;
    }

    return "";
  }

  async function handleExportPng() {
    if (selected.size === 0) return;
    setExportingPng(true);
    try {
      const fontEmbedCSS = await getFontEmbedCss();
      for (const id of selected) {
        const node = getPageNode(id);
        if (!node) continue;
        const label = manifest.find((p) => p.id === id)?.label ?? id;
        await exportPageAsPng(
          node,
          `${project.meta.name || "dsgen"}-${label}.png`,
          fontEmbedCSS,
        );
      }
    } finally {
      setExportingPng(false);
    }
  }

  async function handleExportPdf() {
    setExportingPdf(true);
    try {
      const fontEmbedCSS = await getFontEmbedCss();
      const pages = manifest
        .map((p) => ({ id: p.id, node: getPageNode(p.id) }))
        .filter((p): p is { id: string; node: HTMLElement } => p.node !== null);

      if (pages.length === 0) return;
      await exportFullPdf(
        pages,
        `${project.meta.name || "dsgen"}-styleguide.pdf`,
        fontEmbedCSS,
      );
      setOpen(false);
    } finally {
      setExportingPdf(false);
    }
  }

  return (
    <div ref={containerRef} className="fixed right-6 top-6 z-50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:brightness-110"
        style={{ backgroundColor: "var(--color-dragonfruit)" }}
      >
        <Download size={16} />
        Exportar
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 flex w-72 flex-col gap-3 rounded-2xl border border-grey-200 bg-white p-4 shadow-lg">
          <button
            onClick={handleExportPdf}
            disabled={exportingPdf}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
            style={{ backgroundColor: "var(--color-dragonfruit)" }}
          >
            <FileDown size={14} />
            {exportingPdf ? "Gerando PDF..." : "PDF completo"}
          </button>

          <div className="h-px bg-grey-100" />

          <span className="text-[10px] uppercase tracking-wide text-grey-400">
            PNG por página
          </span>

          <div className="flex max-h-48 flex-col gap-1.5 overflow-y-auto">
            {manifest.map((page) => (
              <label
                key={page.id}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selected.has(page.id)}
                  onChange={() => toggle(page.id)}
                  className="cursor-pointer"
                  style={{ accentColor: "var(--color-tiger)" }}
                />
                {page.label}
              </label>
            ))}
          </div>

          <button
            onClick={handleExportPng}
            disabled={selected.size === 0 || exportingPng}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-grey-200 py-2 text-sm text-grey-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Download size={14} />
            {exportingPng ? "Exportando..." : "Exportar selecionadas"}
          </button>
        </div>
      )}
    </div>
  );
}
