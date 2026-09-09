import { PDFDocument } from "pdf-lib";
import { toPng } from "html-to-image";
import { dataUrlToBytes } from "./dataUrlToBytes";

export interface PdfPageSource {
  id: string;
  node: HTMLElement;
}

const CAPTURE_PIXEL_RATIO = 2;

export async function exportFullPdf(pages: PdfPageSource[], filename: string) {
  const pdfDoc = await PDFDocument.create();

  for (const { node } of pages) {
    const dataUrl = await toPng(node, {
      pixelRatio: CAPTURE_PIXEL_RATIO,
      cacheBust: true,
      backgroundColor: "#ffffff",
      skipFonts: true,
    });

    const bytes = await dataUrlToBytes(dataUrl);
    const png = await pdfDoc.embedPng(bytes);

    // Divide pelo pixelRatio pra voltar à escala "física" da página,
    // já que a imagem capturada está em resolução 2x
    const pageWidth = png.width / CAPTURE_PIXEL_RATIO;
    const pageHeight = png.height / CAPTURE_PIXEL_RATIO;

    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    page.drawImage(png, { x: 0, y: 0, width: pageWidth, height: pageHeight });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}
