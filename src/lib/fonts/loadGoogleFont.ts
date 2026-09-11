export function buildGoogleFontHref(family: string, weights: number[]): string {
  const weightsParam = weights.length > 0 ? weights.join(";") : "400";
  const encodedFamily = family.replace(/ /g, "+");
  return `https://fonts.googleapis.com/css2?family=${encodedFamily}:wght@${weightsParam}&display=swap`;
}

const loadedFamilies = new Set<string>();

export function loadGoogleFont(family: string, weights: number[]) {
  const key = `${family}:${weights.join(",")}`;
  if (loadedFamilies.has(key)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = buildGoogleFontHref(family, weights);
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);

  loadedFamilies.add(key);
}
