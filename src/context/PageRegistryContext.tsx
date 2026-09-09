"use client";

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  ReactNode,
} from "react";

interface PageRegistryValue {
  registerPage: (id: string, node: HTMLElement | null) => void;
  getPageNode: (id: string) => HTMLElement | null;
}

const PageRegistryContext = createContext<PageRegistryValue | null>(null);

/**
 * Registro central de nós de página. Cada PageFrame se registra aqui
 * ao montar. O export lê daqui em vez de precisar de refs manuais
 * passados por toda a árvore de componentes de canvas.
 */
export function PageRegistryProvider({ children }: { children: ReactNode }) {
  const nodesRef = useRef<Record<string, HTMLElement | null>>({});

  const registerPage = useCallback((id: string, node: HTMLElement | null) => {
    nodesRef.current[id] = node;
  }, []);

  const getPageNode = useCallback(
    (id: string) => nodesRef.current[id] ?? null,
    [],
  );

  return (
    <PageRegistryContext.Provider value={{ registerPage, getPageNode }}>
      {children}
    </PageRegistryContext.Provider>
  );
}

export function usePageRegistry() {
  const ctx = useContext(PageRegistryContext);
  if (!ctx)
    throw new Error(
      "usePageRegistry precisa estar dentro de PageRegistryProvider",
    );
  return ctx;
}
