import { LogoAsset, LogoFileType } from "@/types/project";
import { generateId } from "@/lib/id";

const ACCEPTED_TYPES: Record<string, LogoFileType> = {
  "image/svg+xml": "svg",
  "image/png": "png",
  "image/jpeg": "jpg",
};

const MAX_FILE_SIZE_MB = 5;

export class LogoValidationError extends Error {}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () =>
      reject(new LogoValidationError("Não foi possível ler o arquivo."));
    reader.readAsDataURL(file);
  });
}

function loadImageDimensions(
  dataUrl: string,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () =>
      reject(
        new LogoValidationError("Arquivo de imagem corrompido ou inválido."),
      );
    img.src = dataUrl;
  });
}

/**
 * Fallback pra SVGs sem width/height explícitos no elemento raiz —
 * tenta extrair do viewBox. Sem isso, alguns SVGs válidos reportam 0x0.
 */
function extractSvgDimensionsFromViewBox(
  svgText: string,
): { width: number; height: number } | null {
  const viewBoxMatch = svgText.match(/viewBox=["']([\d.\s-]+)["']/i);
  if (!viewBoxMatch) return null;

  const parts = viewBoxMatch[1].trim().split(/\s+/).map(Number);
  if (parts.length !== 4 || parts.some(isNaN)) return null;

  const [, , width, height] = parts;
  if (width <= 0 || height <= 0) return null;

  return { width, height };
}

async function detectRasterTransparency(dataUrl: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      // Sampling em resolução reduzida — só precisamos saber SE existe
      // transparência, não mapear pixel a pixel em alta resolução.
      const sampleSize = 64;
      canvas.width = sampleSize;
      canvas.height = sampleSize;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        resolve(false);
        return;
      }

      ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
      const { data } = ctx.getImageData(0, 0, sampleSize, sampleSize);

      for (let i = 3; i < data.length; i += 4) {
        if (data[i] < 255) {
          resolve(true);
          return;
        }
      }
      resolve(false);
    };
    img.onerror = () => resolve(false);
    img.src = dataUrl;
  });
}

export async function processLogoFile(file: File): Promise<LogoAsset> {
  // 1. Formato
  const fileType = ACCEPTED_TYPES[file.type];
  if (!fileType) {
    throw new LogoValidationError(
      "Formato não suportado. Use SVG, PNG ou JPG.",
    );
  }

  // 2. Tamanho
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    throw new LogoValidationError(`Arquivo maior que ${MAX_FILE_SIZE_MB}MB.`);
  }

  if (file.size === 0) {
    throw new LogoValidationError("Arquivo vazio.");
  }

  // 3. Leitura
  const dataUrl = await readFileAsDataUrl(file);

  // 4. Dimensões — valida que a imagem de fato renderiza (detecta corrupção)
  let dimensions: { width: number; height: number };
  try {
    dimensions = await loadImageDimensions(dataUrl);
  } catch {
    throw new LogoValidationError(
      "Arquivo corrompido ou não é uma imagem válida.",
    );
  }

  if (
    fileType === "svg" &&
    (dimensions.width === 0 || dimensions.height === 0)
  ) {
    const svgText = await file.text();
    const fallback = extractSvgDimensionsFromViewBox(svgText);
    if (!fallback) {
      throw new LogoValidationError(
        "SVG sem dimensões definidas (width/height ou viewBox).",
      );
    }
    dimensions = fallback;
  }

  if (dimensions.width === 0 || dimensions.height === 0) {
    throw new LogoValidationError("Imagem com dimensões inválidas.");
  }

  // 5. Transparência
  const hasTransparency =
    fileType === "jpg"
      ? false
      : fileType === "svg"
        ? true
        : await detectRasterTransparency(dataUrl);

  return {
    id: generateId(),
    fileType,
    dataUrl,
    originalWidth: dimensions.width,
    originalHeight: dimensions.height,
    aspectRatio: dimensions.width / dimensions.height,
    hasTransparency,
  };
}
