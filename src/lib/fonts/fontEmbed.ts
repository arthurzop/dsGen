const embedCssCache = new Map<string, string>();

async function fetchAsDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function inlineFontUrls(cssText: string): Promise<string> {
  const urlRegex = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g;
  const matches = Array.from(cssText.matchAll(urlRegex));
  let result = cssText;

  for (const match of matches) {
    const url = match[1];
    const dataUrl = await fetchAsDataUrl(url);
    result = result.replace(url, dataUrl);
  }

  return result;
}

export async function fetchFontEmbedCss(cssHref: string): Promise<string> {
  if (embedCssCache.has(cssHref)) return embedCssCache.get(cssHref)!;

  const res = await fetch(cssHref);
  const cssText = await res.text();
  const inlined = await inlineFontUrls(cssText);

  embedCssCache.set(cssHref, inlined);
  return inlined;
}
