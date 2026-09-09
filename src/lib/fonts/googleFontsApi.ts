import { FontWeightDefinition } from "@/types/project";

export interface GoogleFontEntry {
  family: string;
  variants: string[]; // ex: ["regular", "italic", "700", "700italic"]
}

let cachedList: GoogleFontEntry[] | null = null;

/**
 * Busca a lista de fontes UMA vez (não os arquivos de fonte em si, só metadados)
 * e mantém em memória + sessionStorage pra não bater na API a cada reload.
 */
export async function fetchGoogleFontsList(): Promise<GoogleFontEntry[]> {
  if (cachedList) return cachedList;

  const stored = sessionStorage.getItem("dsgen-google-fonts-list");
  if (stored) {
    cachedList = JSON.parse(stored);
    return cachedList!;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY;
  const res = await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`,
  );

  if (!res.ok) {
    throw new Error("Falha ao carregar lista de fontes do Google Fonts");
  }

  const data = await res.json();
  const list: GoogleFontEntry[] = data.items.map((item: any) => ({
    family: item.family,
    variants: item.variants,
  }));

  cachedList = list;
  sessionStorage.setItem("dsgen-google-fonts-list", JSON.stringify(list));
  return list;
}

export function searchGoogleFonts(
  list: GoogleFontEntry[],
  query: string,
): GoogleFontEntry[] {
  if (!query.trim()) return list.slice(0, 20);
  const q = query.toLowerCase();
  return list.filter((f) => f.family.toLowerCase().includes(q)).slice(0, 20);
}

/**
 * Converte variants tipo "regular", "700", "700italic" em pesos numéricos utilizáveis.
 */
export function parseVariants(variants: string[]): FontWeightDefinition[] {
  const seen = new Set<string>();
  const result: FontWeightDefinition[] = [];

  variants.forEach((variant) => {
    const isItalic = variant.includes("italic");
    const numeric = variant.replace("italic", "");
    const weight =
      numeric === "regular" || numeric === "" ? 400 : parseInt(numeric, 10);

    const key = `${weight}-${isItalic ? "italic" : "normal"}`;
    if (seen.has(key) || isNaN(weight)) return;
    seen.add(key);

    result.push({ weight, style: isItalic ? "italic" : "normal" });
  });

  return result.sort((a, b) => a.weight - b.weight);
}
