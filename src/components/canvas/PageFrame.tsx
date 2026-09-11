import { ResolvedTokens } from "@/lib/tokens/resolveTokens";
import { CSSProperties, ReactNode } from "react";
import { usePageRegistry } from "@/context/PageRegistryContext";

interface PageFrameProps {
  pageId: string;
  aspectRatio: number;
  tokens: ResolvedTokens;
  children: ReactNode;
}

export function PageFrame({
  pageId,
  aspectRatio,
  tokens,
  children,
}: PageFrameProps) {
  const { registerPage } = usePageRegistry();

  const style: CSSProperties = {
    aspectRatio: String(aspectRatio),
    ...tokens.css,
  } as CSSProperties;

  return (
    <div
      ref={(node) => registerPage(pageId, node)}
      style={style}
      className="w-full max-w-225 overflow-hidden rounded-lg bg-white-true shadow-md "
      data-page-frame
      data-page-id={pageId}
    >
      {children}
    </div>
  );
}
