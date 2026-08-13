"use client";

import { useEffect } from "react";

const loadSources = (container: Element) => {
  container.querySelectorAll<HTMLElement>("[data-srcset]").forEach((element) => {
    if (element.dataset.srcset) element.setAttribute("srcset", element.dataset.srcset);
    delete element.dataset.srcset;
  });
  container.querySelectorAll<HTMLElement>("[data-src]").forEach((element) => {
    if (element.dataset.src) element.setAttribute("src", element.dataset.src);
    delete element.dataset.src;
  });
  const image = container.querySelector<HTMLImageElement>("img[data-deferred-image]");
  if (image) image.dataset.requested = "true";
  container.querySelector<HTMLVideoElement>("video")?.load();
};

export function ProjectDetailClient() {
  useEffect(() => {
    const figures = [...document.querySelectorAll<HTMLElement>("[data-deferred-media]")];
    const mediaElements = [...document.querySelectorAll<HTMLImageElement | HTMLVideoElement>("[data-media-element]")];
    const markLoaded = (event: Event) => (event.currentTarget as Element).closest("figure")?.classList.add("detail-media-loaded");
    mediaElements.forEach((element) => {
      if (element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0) {
        element.closest("figure")?.classList.add("detail-media-loaded");
      }
      if (element instanceof HTMLVideoElement && element.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        element.closest("figure")?.classList.add("detail-media-loaded");
      }
      element.addEventListener(element instanceof HTMLVideoElement ? "loadeddata" : "load", markLoaded);
    });
    const mediaObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          loadSources(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "700px 0px", threshold: 0.01 },
    );
    figures.forEach((figure) => mediaObserver.observe(figure));

    const videos = [...document.querySelectorAll<HTMLVideoElement>("video[data-viewport-video]")];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const playIfNearViewport = (video: HTMLVideoElement) => {
      const rect = video.getBoundingClientRect();
      if (rect.bottom <= -700 || rect.top >= window.innerHeight + 700) return;
      loadSources(video.closest("figure") ?? video);
      if (!video.poster && video.dataset.poster) video.poster = video.dataset.poster;
      if (!document.hidden && !reducedMotion.matches) void video.play().catch(() => undefined);
    };
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            playIfNearViewport(video);
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: "700px 0px", threshold: 0.01 },
    );
    videos.forEach((video) => videoObserver.observe(video));
    const handlePlaybackPreference = () => {
      if (document.hidden || reducedMotion.matches) {
        videos.forEach((video) => video.pause());
      } else {
        videos.forEach(playIfNearViewport);
      }
    };
    document.addEventListener("visibilitychange", handlePlaybackPreference);
    reducedMotion.addEventListener("change", handlePlaybackPreference);

    const sectionLinks = new Map(
      [...document.querySelectorAll<HTMLAnchorElement>("[data-detail-nav]")].map((link) => [link.hash.slice(1), link]),
    );
    const updateActiveDetail = () => {
      let current = sectionLinks.keys().next().value as string | undefined;
      sectionLinks.forEach((_link, id) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 230) current = id;
      });
      sectionLinks.forEach((link, id) => link.classList.toggle("detail-nav-active", id === current));
    };
    updateActiveDetail();
    window.addEventListener("scroll", updateActiveDetail, { passive: true });
    return () => {
      mediaObserver.disconnect();
      videoObserver.disconnect();
      document.removeEventListener("visibilitychange", handlePlaybackPreference);
      reducedMotion.removeEventListener("change", handlePlaybackPreference);
      window.removeEventListener("scroll", updateActiveDetail);
      videos.forEach((video) => video.pause());
      mediaElements.forEach((element) => element.removeEventListener(element instanceof HTMLVideoElement ? "loadeddata" : "load", markLoaded));
    };
  }, []);

  return null;
}
