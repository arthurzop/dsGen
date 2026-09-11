import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DsGenProject,
  ColorEntry,
  ApplicationTemplateId,
} from "@/types/project";
import { generateId } from "@/lib/id";
import { computeTypographyLevels } from "@/lib/tokens/typographyScale";
import { DEFAULT_FONT_RATIO, DEFAULT_FOUNDATIONS } from "@/lib/tokens/defaults";

const SCHEMA_VERSION = 1;

function createDefaultProject(): DsGenProject {
  const now = new Date().toISOString();

  return {
    schemaVersion: SCHEMA_VERSION,
    id: generateId(),
    meta: {
      name: "Untitled",
      document: { format: "16-9" },
    },
    brandCore: {
      typography: {
        primaryFont: {
          id: generateId(),
          source: "google",
          family: "Inter",
          weights: [{ weight: 400, style: "normal", label: "Regular" }],
        },
        scaleRatio: DEFAULT_FONT_RATIO,
        levels: computeTypographyLevels(DEFAULT_FONT_RATIO),
      },
      colors: {
        palette: [],
        semantic: { enabled: false },
      },
    },
    foundations: { ...DEFAULT_FOUNDATIONS },
    applications: [],
    uiSystem: { enabled: false },
    createdAt: now,
    updatedAt: now,
  };
}

interface ProjectStore {
  project: DsGenProject;

  // Meta
  setProjectName: (name: string) => void;
  setDocumentFormat: (
    format: DsGenProject["meta"]["document"]["format"],
  ) => void;

  // Typography
  setFontRatio: (ratio: number) => void;
  setPrimaryFont: (
    font: DsGenProject["brandCore"]["typography"]["primaryFont"],
  ) => void;

  // Colors — a posição no array É a hierarquia
  addColor: (hex: string) => void;
  removeColor: (id: string) => void;
  reorderColors: (fromIndex: number, toIndex: number) => void;
  updateColor: (id: string, hex: string) => void;

  // Foundations
  setRadius: (radius: DsGenProject["foundations"]["radius"]) => void;
  setSpacingBase: (px: number) => void;

  // UI System
  toggleUiSystem: (enabled: boolean) => void;

  // Applications
  addApplication: (templateId: ApplicationTemplateId) => void;
  removeApplication: (id: string) => void;

  // Reset (útil pra debug / "novo projeto")
  resetProject: () => void;

  //logo
  setLogo: (logo: DsGenProject["brandCore"]["logo"]) => void;
  removeLogo: () => void;

  updateProjectMeta: (
    patch: Partial<Omit<DsGenProject["meta"], "document">>,
  ) => void;
}

function touch(project: DsGenProject): DsGenProject {
  return { ...project, updatedAt: new Date().toISOString() };
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      project: createDefaultProject(),

      setProjectName: (name) =>
        set((state) => ({
          project: touch({
            ...state.project,
            meta: { ...state.project.meta, name },
          }),
        })),

      setDocumentFormat: (format) =>
        set((state) => ({
          project: touch({
            ...state.project,
            meta: {
              ...state.project.meta,
              document: { ...state.project.meta.document, format },
            },
          }),
        })),

      setFontRatio: (ratio) =>
        set((state) => {
          const typography = state.project.brandCore.typography;
          return {
            project: touch({
              ...state.project,
              brandCore: {
                ...state.project.brandCore,
                typography: {
                  ...typography,
                  scaleRatio: ratio,
                  levels: computeTypographyLevels(ratio, typography.levels),
                },
              },
            }),
          };
        }),

      setLogo: (logo) =>
        set((state) => ({
          project: touch({
            ...state.project,
            brandCore: { ...state.project.brandCore, logo },
          }),
        })),

      removeLogo: () =>
        set((state) => ({
          project: touch({
            ...state.project,
            brandCore: { ...state.project.brandCore, logo: undefined },
          }),
        })),

      setPrimaryFont: (font) =>
        set((state) => ({
          project: touch({
            ...state.project,
            brandCore: {
              ...state.project.brandCore,
              typography: {
                ...state.project.brandCore.typography,
                primaryFont: font,
              },
            },
          }),
        })),

      addColor: (hex) =>
        set((state) => {
          const newEntry: ColorEntry = { id: generateId(), hex };
          return {
            project: touch({
              ...state.project,
              brandCore: {
                ...state.project.brandCore,
                colors: {
                  ...state.project.brandCore.colors,
                  palette: [
                    ...state.project.brandCore.colors.palette,
                    newEntry,
                  ],
                },
              },
            }),
          };
        }),

      removeColor: (id) =>
        set((state) => ({
          project: touch({
            ...state.project,
            brandCore: {
              ...state.project.brandCore,
              colors: {
                ...state.project.brandCore.colors,
                palette: state.project.brandCore.colors.palette.filter(
                  (c) => c.id !== id,
                ),
              },
            },
          }),
        })),

      reorderColors: (fromIndex, toIndex) =>
        set((state) => {
          const palette = [...state.project.brandCore.colors.palette];
          const [moved] = palette.splice(fromIndex, 1);
          palette.splice(toIndex, 0, moved);
          return {
            project: touch({
              ...state.project,
              brandCore: {
                ...state.project.brandCore,
                colors: { ...state.project.brandCore.colors, palette },
              },
            }),
          };
        }),

      updateColor: (id, hex) =>
        set((state) => ({
          project: touch({
            ...state.project,
            brandCore: {
              ...state.project.brandCore,
              colors: {
                ...state.project.brandCore.colors,
                palette: state.project.brandCore.colors.palette.map((c) =>
                  c.id === id ? { ...c, hex } : c,
                ),
              },
            },
          }),
        })),

      setRadius: (radius) =>
        set((state) => ({
          project: touch({
            ...state.project,
            foundations: { ...state.project.foundations, radius },
          }),
        })),

      setSpacingBase: (px) =>
        set((state) => ({
          project: touch({
            ...state.project,
            foundations: { ...state.project.foundations, spacingBase: px },
          }),
        })),

      toggleUiSystem: (enabled) =>
        set((state) => ({
          project: touch({ ...state.project, uiSystem: { enabled } }),
        })),

      addApplication: (templateId) =>
        set((state) => ({
          project: touch({
            ...state.project,
            applications: [
              ...state.project.applications,
              { id: generateId(), templateId, enabled: true },
            ],
          }),
        })),

      updateProjectMeta: (patch) =>
        set((state) => ({
          project: touch({
            ...state.project,
            meta: { ...state.project.meta, ...patch },
          }),
        })),
      removeApplication: (id) =>
        set((state) => ({
          project: touch({
            ...state.project,
            applications: state.project.applications.filter((a) => a.id !== id),
          }),
        })),

      resetProject: () => set({ project: createDefaultProject() }),
    }),
    
    {
      name: "dsgen-project", // chave no localStorage
      version: SCHEMA_VERSION,
      // quando o schema mudar no futuro, a lógica de migração entra aqui
      migrate: (persistedState) => persistedState as ProjectStore,
    },
  ),
);
