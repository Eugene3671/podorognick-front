"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import "@/src/app/globals.css";
import css from "./toggle-theme.module.css";

import { cn } from "@/src/lib/utils";

// 1. Define the possible animation types (UPDATED to include all demo types)
// NOTE: Type is renamed from 'AnimationType' to 'ThemeAnimationType'
// to avoid conflicts if used with the demo file in the same scope,
// though the original 'AnimationType' is kept for minimal change.
type AnimationType =
  | "none"
  | "circle-spread"
  | "round-morph"
  | "swipe-left"
  | "swipe-up"
  | "diag-down-right"
  | "fade-in-out"
  | "shrink-grow"
  | "flip-x-in"
  | "split-vertical"
  | "swipe-right"
  | "swipe-down"
  | "wave-ripple";

// 2. Interface is renamed
interface ToggleThemeProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
  animationType?: AnimationType;
}

// 3. Component and export are renamed
export const ToggleTheme = ({
  className,
  duration = 400,
  animationType = "circle-spread",
  ...props
}: ToggleThemeProps) => {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  //   const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    // Wait for the DOM update to complete within the View Transition
    await document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", newTheme ? "dark" : "light");
      });
    }).ready;

    // Calculate coordinates and dimensions for spatial animations
    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    );
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 4. Implement a switch to handle all animation types
    switch (animationType) {
      case "circle-spread":
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          },
        );
        break;

      case "round-morph":
        document.documentElement.animate(
          [
            { opacity: 0, transform: "scale(0.8) rotate(5deg)" },
            { opacity: 1, transform: "scale(1) rotate(0deg)" },
          ],
          {
            duration: duration * 1.2,
            easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
        break;

      case "swipe-left":
        document.documentElement.animate(
          {
            clipPath: [`inset(0 0 0 ${viewportWidth}px)`, `inset(0 0 0 0)`],
          },
          {
            duration,
            easing: "cubic-bezier(0.2, 0, 0, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
        break;

      case "swipe-up":
        document.documentElement.animate(
          {
            clipPath: [`inset(${viewportHeight}px 0 0 0)`, `inset(0 0 0 0)`],
          },
          {
            duration,
            easing: "cubic-bezier(0.2, 0, 0, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
        break;

      case "none":
      default:
        // No custom animation runs
        break;
    }
  }, [isDark, duration, animationType]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        className={cn(
          `p-2 rounded-full transition-colors duration-300 ${css.themeButton}`,
          isDark ? "hover:text-amber-400" : "hover:text-blue-500",
          className,
        )}
        {...props}
      >
        {isDark ? (
          <Sun className={`h-6 w-6 text-amber-400 ${css.toggleIcon}`} />
        ) : (
          <Moon className={`h-6 w-6 text-blue-500 ${css.toggleIcon}`} />
        )}
      </button>

      {/* This inline <style> block is necessary to override the default 
                view transition animation for all JS-based effects.
            */}
      {animationType !== "flip-x-in" && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
                            ::view-transition-old(root),
                            ::view-transition-new(root) {
                                animation: none;
                                mix-blend-mode: normal;
                            }
                        `,
          }}
        />
      )}
    </>
  );
};
