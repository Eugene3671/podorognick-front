import { useEffect, useState } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

export function useBreakpoint(): Breakpoint | null {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(null);

  useEffect(() => {
    const updateBreakpoint = () => {
      if (window.matchMedia("(min-width: 1440px)").matches) {
        setBreakpoint("desktop");
      } else if (
        window.matchMedia("(min-width: 768px) and (max-width: 1439px)").matches
      ) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("mobile");
      }
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}
