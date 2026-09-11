"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface FitToFrameProps {
  children: ReactNode;
}

export function FitToFrame({ children }: FitToFrameProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    function recalc() {
      if (!outer || !inner) return;
      const outerHeight = outer.clientHeight;
      const innerHeight = inner.scrollHeight;
      setScale(innerHeight > outerHeight ? outerHeight / innerHeight : 1);
    }

    recalc();

    const resizeObserver = new ResizeObserver(recalc);
    resizeObserver.observe(inner);
    resizeObserver.observe(outer);

    return () => resizeObserver.disconnect();
  }, [children]);

  return (
    <div ref={outerRef} className="relative h-full w-full overflow-hidden">
      <div
        ref={innerRef}
        className="absolute left-0 top-0 w-full"
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}
