import { toPng } from "html-to-image";

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

export async function exportPageAsPng(
  node: HTMLElement,
  filename: string,
  fontEmbedCSS: string,
) {
  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: resolveBackgroundColor(node),
    fontEmbedCSS,
  });

  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
