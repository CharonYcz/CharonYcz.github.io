"use client";

import { useEffect } from "react";

const mediaSelector = "img, video";

export function MediaProtection() {
  useEffect(() => {
    const blockMediaMenu = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest(mediaSelector)) event.preventDefault();
    };

    const blockDrag = (event: DragEvent) => {
      if ((event.target as Element | null)?.closest(mediaSelector)) event.preventDefault();
    };

    const blockSaveShortcuts = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && ["s", "u", "i"].includes(key)) event.preventDefault();
    };

    document.addEventListener("contextmenu", blockMediaMenu);
    document.addEventListener("dragstart", blockDrag);
    window.addEventListener("keydown", blockSaveShortcuts);
    return () => {
      document.removeEventListener("contextmenu", blockMediaMenu);
      document.removeEventListener("dragstart", blockDrag);
      window.removeEventListener("keydown", blockSaveShortcuts);
    };
  }, []);

  return null;
}
