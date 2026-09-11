import { PDFDocument } from "pdf-lib";
import { toPng } from "html-to-image";
import { dataUrlToBytes } from "./dataUrlToBytes";

export interface PdfPageSource {
  id: string;
  node: HTMLElement;
}

const CAPTURE_PIXEL_RATIO = 2;

function resolveBackgroundColor(node: HTMLElement): string {
  const computed = window.getComputedStyle(node);
  const bg = computed.backgroundColor;
  if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;

  const firstChild = node.firstElementChild as HTMLElement | null;
  if (firstChild) {
    const childBg = window.getComputedStyle(firstChild).backgroundColor;
    if (childBg && childBg !== "rgba(0, 0, 0, 0)" && childBg !== "transparent")
      return childBg;
  }

  return "#ffffff";
}

export async function exportFullPdf(
  pages: PdfPageSource[],
  filename: string,
  fontEmbedCSS: string,
) {
  const pdfDoc = await PDFDocument.create();

  for (const { node } of pages) {
    const dataUrl = await toPng(node, {
      pixelRatio: CAPTURE_PIXEL_RATIO,
      cacheBust: true,
      backgroundColor: resolveBackgroundColor(node),
      fontEmbedCSS,
    });

    const bytes = await dataUrlToBytes(dataUrl);
    const png = await pdfDoc.embedPng(bytes);

    const pageWidth = png.width / CAPTURE_PIXEL_RATIO;
    const pageHeight = png.height / CAPTURE_PIXEL_RATIO;

    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    page.drawImage(png, { x: 0, y: 0, width: pageWidth, height: pageHeight });
  }

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
    type: "application/pdf",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
