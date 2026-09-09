const loadedFamilies = new Set<string>();

export function loadGoogleFont(family: string, weights: number[]) {
  const key = `${family}:${weights.join(",")}`;
  if (loadedFamilies.has(key)) return;

  const weightsParam = weights.length > 0 ? weights.join(";") : "400";
  const encodedFamily = family.replace(/ /g, "+");
  const href = `https://fonts.googleapis.com/css2?family=${encodedFamily}:wght@${weightsParam}&display=swap`;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.crossOrigin = "anonymous"; // permite que html-to-image leia as cssRules ao exportar
  document.head.appendChild(link);

  loadedFamilies.add(key);
}