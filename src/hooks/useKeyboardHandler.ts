import { useEffect, useState } from "react";

export const useKeyboardOpen = (): { isKeyboardOpen: boolean } => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    let baselineHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDiff = baselineHeight - currentHeight;
      setIsKeyboardOpen(heightDiff > 120);
    };

    const handleViewportResize = () => {
      if (window.visualViewport) {
        const vv = window.visualViewport;
        const heightDiff =
          vv.height < baselineHeight ? baselineHeight - vv.height : 0;
        setIsKeyboardOpen(heightDiff > 120);
      }
    };

    const handleFocusIn = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName.toLowerCase();
      if (
        tag === "input" ||
        tag === "textarea" ||
        target.getAttribute("contenteditable") === "true"
      ) {
        setIsKeyboardOpen(true);
      }
    };

    const handleFocusOut = (e: Event) => {
      const related = (e as FocusEvent).relatedTarget as HTMLElement | null;
      if (!related) {
        setIsKeyboardOpen(false);
      }
    };

    baselineHeight = window.innerHeight;

    window.addEventListener("resize", handleResize);
    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleViewportResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          handleViewportResize,
        );
      }
    };
  }, []);

  return { isKeyboardOpen };
};
