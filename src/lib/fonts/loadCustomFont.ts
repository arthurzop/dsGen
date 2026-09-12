const loadedCustomFonts = new Set<string>();

export async function loadCustomFont(
  family: string,
  dataUrl: string,
  weight: number,
  style: "normal" | "italic",
) {
  const key = `${family}:${weight}:${style}`;
  if (loadedCustomFonts.has(key)) return;

  const fontFace = new FontFace(family, `url(${dataUrl})`, {
    weight: String(weight),
    style,
  });
  await fontFace.load();
  document.fonts.add(fontFace);

  loadedCustomFonts.add(key);
}
