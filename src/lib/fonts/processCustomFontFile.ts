import * as opentype from "opentype.js";
import { FontDefinition, FontWeightDefinition } from "@/types/project";
import { generateId } from "@/lib/id";

const ACCEPTED_EXTENSIONS: Record<string, "woff" | "woff2" | "ttf" | "otf"> = {
  ".ttf": "ttf",
  ".otf": "otf",
  ".woff": "woff",
  ".woff2": "woff2",
};

const MAX_FILE_SIZE_MB = 15;

export class FontValidationError extends Error {}

function getExtension(filename: string): string {
  const match = filename.toLowerCase().match(/\.[^.]+$/);
  return match ? match[0] : "";
}

function weightLabelFromValue(weight: number): string {
  if (weight <= 200) return "Thin";
  if (weight <= 300) return "Light";
  if (weight <= 400) return "Regular";
  if (weight <= 500) return "Medium";
  if (weight <= 600) return "SemiBold";
  if (weight <= 700) return "Bold";
  if (weight <= 800) return "ExtraBold";
  return "Black";
}

function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () =>
      reject(new FontValidationError("Não foi possível ler o arquivo."));
    reader.readAsArrayBuffer(file);
  });
}

function arrayBufferToDataUrl(buffer: ArrayBuffer, mime: string): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++)
    binary += String.fromCharCode(bytes[i]);
  return `data:${mime};base64,${btoa(binary)}`;
}

export async function processCustomFontFile(
  file: File,
): Promise<FontDefinition> {
  const extension = getExtension(file.name);

  if (extension === ".ttc") {
    throw new FontValidationError(
      "Arquivos .ttc não são suportados por navegadores via @font-face. Extraia uma fonte individual (.ttf) da coleção.",
    );
  }

  const fileFormat = ACCEPTED_EXTENSIONS[extension];
  if (!fileFormat) {
    throw new FontValidationError(
      "Formato não suportado. Use TTF, OTF, WOFF ou WOFF2.",
    );
  }

  if (file.size === 0) {
    throw new FontValidationError("Arquivo vazio.");
  }

  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    throw new FontValidationError(`Arquivo maior que ${MAX_FILE_SIZE_MB}MB.`);
  }

  const buffer = await readFileAsArrayBuffer(file);

  let parsed: opentype.Font;
  try {
    parsed = opentype.parse(buffer);
  } catch {
    throw new FontValidationError(
      "Arquivo corrompido ou não é uma fonte válida.",
    );
  }

  if (!parsed.supported) {
    throw new FontValidationError("Fonte com estrutura interna não suportada.");
  }

  const family =
    parsed.names.fontFamily?.en ||
    Object.values(parsed.names.fontFamily ?? {})[0] ||
    file.name.replace(/\.[^.]+$/, "");

  const os2WeightClass = (parsed.tables as any)?.os2?.usWeightClass;
  const weight =
    typeof os2WeightClass === "number" && os2WeightClass > 0
      ? os2WeightClass
      : 400;

  const subfamily =
    parsed.names.fontSubfamily?.en ||
    Object.values(parsed.names.fontSubfamily ?? {})[0] ||
    "";
  const isItalic =
    (parsed.tables as any)?.head?.macStyle === 2 ||
    /italic|oblique/i.test(subfamily);

  const mimeMap: Record<typeof fileFormat, string> = {
    ttf: "font/ttf",
    otf: "font/otf",
    woff: "font/woff",
    woff2: "font/woff2",
  };

  const dataUrl = arrayBufferToDataUrl(buffer, mimeMap[fileFormat]);

  const weightDef: FontWeightDefinition = {
    weight,
    style: isItalic ? "italic" : "normal",
    label: weightLabelFromValue(weight),
  };

  return {
    id: generateId(),
    source: "custom",
    family,
    weights: [weightDef],
    customFile: { dataUrl, format: fileFormat, validated: true },
  };
}
