"use client";

import { useEffect } from "react";

const hoverImageSelector = ".project-card-hover";

function loadHoverImage(card: Element) {
  const image = card.querySelector<HTMLImageElement>(hoverImageSelector);
  if (!image) return;
  const markHoverReady = () => {
    void image.decode().catch(() => undefined).then(() => card.classList.add("project-card-hover-ready"));
  };
  if (image.complete && image.naturalWidth > 0) {
    markHoverReady();
  } else {
    image.addEventListener("load", markHoverReady, { once: true });
  }
}

export function PortfolioInteractions() {
  useEffect(() => {
    const deferredPictures = [...document.querySelectorAll<HTMLElement>("[data-deferred-picture]")];
    const pictureObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const picture = entry.target;
        picture.querySelectorAll<HTMLElement>("source[data-srcset]").forEach((source) => {
          if (source.dataset.srcset) source.setAttribute("srcset", source.dataset.srcset);
          delete source.dataset.srcset;
        });
        const image = picture.querySelector<HTMLImageElement>("img[data-src]");
        if (image?.dataset.src) image.src = image.dataset.src;
        if (image) delete image.dataset.src;
        observer.unobserve(picture);
      });
    }, { rootMargin: "600px 0px", threshold: 0.01 });
    deferredPictures.forEach((picture) => pictureObserver.observe(picture));

    const navLinks = new Map(
      ["cover", "about", "projects"].map((id) => [
        id,
        document.querySelector<HTMLElement>(`[data-nav-section="${id}"]`),
      ]),
    );
    const sections = [...navLinks.keys()]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link, id) => link?.classList.toggle("nav-link-active", id === entry.target.id));
        });
      },
      { threshold: 0.55 },
    );
    sections.forEach((section) => observer.observe(section));

    let toastTimer = 0;
    const toast = document.querySelector<HTMLElement>("[data-copy-toast]");
    const showToast = (message: string) => {
      if (!toast) return;
      const copy = toast.querySelector<HTMLElement>("[data-copy-toast-text]");
      if (copy) copy.textContent = message;
      toast.classList.add("toast-visible");
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => toast.classList.remove("toast-visible"), 2200);
    };
    const copyText = async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        const helper = document.createElement("textarea");
        helper.value = value;
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.appendChild(helper);
        helper.select();
        document.execCommand("copy");
        helper.remove();
      }
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const button = target?.closest<HTMLElement>("[data-copy-value]");
      if (!button?.dataset.copyValue) return;
      void copyText(button.dataset.copyValue).then(() => showToast(button.dataset.copyMessage ?? "已复制"));
    };

    const projectCards = [...document.querySelectorAll<HTMLElement>("[data-project-card]")];
    projectCards.forEach(loadHoverImage);
    document.addEventListener("click", onClick);
    return () => {
      pictureObserver.disconnect();
      observer.disconnect();
      document.removeEventListener("click", onClick);
      window.clearTimeout(toastTimer);
    };
  }, []);

  return null;
}
