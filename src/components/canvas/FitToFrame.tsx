"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface FitToFrameProps {
  children: ReactNode;
}

export function FitToFrame({ children }: FitToFrameProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [widthPx, setWidthPx] = useState<number | null>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const ghost = ghostRef.current;
    if (!outer || !ghost) return;

    function recalc() {
      if (!outer || !ghost) return;
      const outerWidth = outer.clientWidth;
      const outerHeight = outer.clientHeight;
      const naturalHeight = ghost.scrollHeight;

      const nextScale =
        naturalHeight > outerHeight ? outerHeight / naturalHeight : 1;
      setScale(nextScale);
      setWidthPx(outerWidth / nextScale);
    }

    recalc();

    const resizeObserver = new ResizeObserver(recalc);
    resizeObserver.observe(ghost);
    resizeObserver.observe(outer);

    return () => resizeObserver.disconnect();
  }, [children]);

  return (
    <div ref={outerRef} className="relative h-full w-full overflow-hidden">
      <div
        ref={ghostRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 w-full"
        style={{ visibility: "hidden" }}
      >
        {children}
      </div>

      <div
        className="absolute left-0 top-0"
        style={{
          width: widthPx ? `${widthPx}px` : "100%",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
