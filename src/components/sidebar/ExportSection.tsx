"use client";

import { useState } from "react";
import { Download, FileDown } from "lucide-react";
import { useProjectStore } from "@/store/useProjectStore";
import { usePageRegistry } from "@/context/PageRegistryContext";
import { exportPageAsPng } from "@/lib/export/exportPageAsPng";
import { exportFullPdf } from "@/lib/export/exportFullPdf";
import { TEMPLATE_LABELS } from "@/lib/applications/templateRegistry";

interface PageManifestEntry {
  id: string;
  label: string;
}

export function ExportSection() {
  const project = useProjectStore((s) => s.project);
  const { getPageNode } = usePageRegistry();
  const [selected, setSelected] = useState<Set<string>>(new Set(["cover"]));
  const [exportingPng, setExportingPng] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);

  const manifest: PageManifestEntry[] = [
    { id: "cover", label: "Cover" },
    { id: "brand", label: "Brand" },
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

  async function handleExportPng() {
    if (selected.size === 0) return;
    setExportingPng(true);
    try {
      for (const id of selected) {
        const node = getPageNode(id);
        if (!node) continue;
        const label = manifest.find((p) => p.id === id)?.label ?? id;
        await exportPageAsPng(
          node,
          `${project.meta.name || "dsgen"}-${label}.png`,
        );
      }
    } finally {
      setExportingPng(false);
    }
  }

  async function handleExportPdf() {
    setExportingPdf(true);
    try {
      // PDF completo SEMPRE inclui todas as páginas do manifest,
      // independente da seleção usada no export parcial de PNG
      const pages = manifest
        .map((p) => ({ id: p.id, node: getPageNode(p.id) }))
        .filter((p): p is { id: string; node: HTMLElement } => p.node !== null);

      if (pages.length === 0) return;

      await exportFullPdf(
        pages,
        `${project.meta.name || "dsgen"}-styleguide.pdf`,
      );
    } finally {
      setExportingPdf(false);
    }
  }

  return (
    <>
      <button
        onClick={handleExportPdf}
        disabled={exportingPdf}
        className="flex items-center justify-center gap-2 rounded-md bg-dragonfruit py-2 text-sm text-white-true hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FileDown size={14} />
        {exportingPdf ? "Gerando PDF..." : "Exportar PDF completo"}
      </button>

      <div className="my-1 h-px bg-grey-200" />

      <span className="text-[10px] uppercase tracking-wide text-grey-400">
        Export parcial (PNG)
      </span>

      <div className="flex flex-col gap-1">
        {manifest.map((page) => (
          <label key={page.id} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected.has(page.id)}
              onChange={() => toggle(page.id)}
            />
            {page.label}
          </label>
        ))}
      </div>

      <button
        onClick={handleExportPng}
        disabled={selected.size === 0 || exportingPng}
        className="flex items-center justify-center gap-2 rounded-md border border-grey-300 py-2 text-sm text-grey-700 hover:border-tiger-500 hover:text-tiger-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Download size={14} />
        {exportingPng ? "Exportando..." : "Exportar selecionadas"}
      </button>
    </>
  );
}
