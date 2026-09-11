// Formato do documento — controla aspect ratio do canvas e do export
export type DocumentFormat =
  | "a4-portrait"
  | "a4-landscape"
  | "16-9"
  | "4-3"
  | "social-portrait"
  | "social-square"
  | "custom";

export interface DocumentDimensions {
  format: DocumentFormat;
  // só usado quando format === "custom"
  customWidth?: number;
  customHeight?: number;
}

// ---------- PROJECT ----------
export interface ProjectMeta {
  name: string;
  subtitle?: string;
  client?: string;
  year?: string;
  description?: string;
  type?: string;
  document: DocumentDimensions;
}

// ---------- LOGO ----------
export type LogoFileType = "svg" | "png" | "jpg";

export interface LogoAsset {
  id: string;
  fileType: LogoFileType;
  // dataUrl para preview/render; em produção isso vira upload real (blob storage)
  dataUrl: string;
  originalWidth: number;
  originalHeight: number;
  aspectRatio: number;
  hasTransparency: boolean;
}

// ---------- TYPOGRAPHY ----------
export type FontSource = "google" | "custom";

export interface FontWeightDefinition {
  weight: number; // 100–900
  style: "normal" | "italic";
  label?: string; // "Light", "Regular", "Bold" — exibição
}

export interface FontDefinition {
  id: string;
  source: FontSource;
  family: string;
  weights: FontWeightDefinition[];
  // só existe quando source === "custom"
  customFile?: {
    dataUrl: string;
    format: "woff" | "woff2" | "ttf" | "otf";
    validated: boolean;
    validationError?: string;
  };
}

export interface TypographySystem {
  primaryFont: FontDefinition;
  // ratio usado para derivar a escala (1.125, 1.25, 1.618, etc.)
  scaleRatio: number;
  // níveis fixos da hierarquia — nunca escala infinita (decisão do MVP)
  levels: {
    display: FontWeightRef;
    h1: FontWeightRef;
    h2: FontWeightRef;
    h3: FontWeightRef;
    body: FontWeightRef;
    small: FontWeightRef;
    caption: FontWeightRef;
  };
}

interface FontWeightRef {
  weight: number;
  // tamanho em rem — derivado do ratio, mas editável pelo usuário depois
  sizeRem: number;
  overridden: boolean; // true se o usuário editou manualmente
}

// ---------- COLORS ----------
// A ORDEM DO ARRAY é a hierarquia. Não existe campo "role" fixo.
export interface ColorEntry {
  id: string;
  hex: string;
}

export interface SemanticColors {
  enabled: boolean;
  green?: string;
  yellow?: string;
  red?: string;
  blue?: string;
}

export interface ColorSystem {
  palette: ColorEntry[]; // ordenado — index 0 = maior hierarquia
  semantic: SemanticColors;
}

// ---------- BRAND CORE (obrigatório) ----------
export interface BrandCore {
  logo?: LogoAsset; // opcional até o usuário subir
  typography: TypographySystem;
  colors: ColorSystem;
}

// ---------- FOUNDATIONS (opcional, com default no momento de gerar tokens) ----------
export type RadiusPreset = "none" | "small" | "medium" | "large" | "full";
export type SpacingBase = number; // px, ex: 4, 8

export interface Foundations {
  radius?: RadiusPreset; // undefined = usa default do sistema
  spacingBase?: SpacingBase;
  gridColumns?: number;
  shadowLevels?: 1 | 2 | 3;
}

// ---------- APPLICATIONS ----------
export type ApplicationTemplateId =
  | "poster"
  | "social-media"
  | "editorial"
  | "website"
  | "business-card"
  | "packaging";

export interface ApplicationInstance {
  id: string;
  templateId: ApplicationTemplateId;
  enabled: boolean;
  // slots fixos por template — cada template define seu próprio shape,
  // mas todos consomem BrandCore + tokens, nunca configuração própria
}

// ---------- UI SYSTEM ----------
export interface UISystem {
  enabled: boolean;
  // sem config própria — tudo vem de Foundations + BrandCore via tokens
}

// ---------- PROJECT COMPLETO ----------
export interface DsGenProject {
  schemaVersion: number; // crítico pra migração futura no localStorage
  id: string;
  meta: ProjectMeta;
  brandCore: BrandCore;
  foundations: Foundations;
  applications: ApplicationInstance[];
  uiSystem: UISystem;
  createdAt: string;
  updatedAt: string;
}
