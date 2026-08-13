"use client";

import { useEffect } from "react";

const MEDIA_PRELOAD_DISTANCE = 1600;

const loadSources = (container: Element) => {
  let sourceChanged = false;
  container.querySelectorAll<HTMLElement>("[data-srcset]").forEach((element) => {
    if (element.dataset.srcset) {
      element.setAttribute("srcset", element.dataset.srcset);
      sourceChanged = true;
    }
    delete element.dataset.srcset;
  });
  container.querySelectorAll<HTMLElement>("[data-src]").forEach((element) => {
    if (element.dataset.src) {
      element.setAttribute("src", element.dataset.src);
      sourceChanged = true;
    }
    delete element.dataset.src;
  });
  const image = container.querySelector<HTMLImageElement>("img[data-deferred-image]");
  if (image) image.dataset.requested = "true";
  if (sourceChanged) container.querySelector<HTMLVideoElement>("video")?.load();
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
      { rootMargin: `${MEDIA_PRELOAD_DISTANCE}px 0px`, threshold: 0.01 },
    );
    figures.forEach((figure) => mediaObserver.observe(figure));

    const videos = [...document.querySelectorAll<HTMLVideoElement>("video[data-viewport-video]")];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isInViewport = (video: HTMLVideoElement) => {
      const rect = video.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    };
    const playIfVisible = (video: HTMLVideoElement) => {
      if (!isInViewport(video)) return;
      if (!video.poster && video.dataset.poster) video.poster = video.dataset.poster;
      loadSources(video.closest("figure") ?? video);
      if (document.hidden || reducedMotion.matches) return;
      video.dataset.playWhenReady = "true";
      if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
      delete video.dataset.playWhenReady;
      void video.play().catch(() => undefined);
    };
    const handleCanPlay = (event: Event) => {
      const video = event.currentTarget as HTMLVideoElement;
      if (video.dataset.playWhenReady === "true") playIfVisible(video);
    };
    videos.forEach((video) => video.addEventListener("canplay", handleCanPlay));
    let playbackFrame = 0;
    const syncVideoPlayback = () => {
      window.cancelAnimationFrame(playbackFrame);
      playbackFrame = window.requestAnimationFrame(() => {
        videos.forEach((video) => {
          if (isInViewport(video)) {
            playIfVisible(video);
          } else {
            delete video.dataset.playWhenReady;
            video.pause();
          }
        });
      });
    };
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            playIfVisible(video);
          } else {
            delete video.dataset.playWhenReady;
            video.pause();
          }
        });
      },
      { threshold: 0.01 },
    );
    videos.forEach((video) => videoObserver.observe(video));
    window.addEventListener("scroll", syncVideoPlayback, { passive: true });
    const handlePlaybackPreference = () => {
      if (document.hidden || reducedMotion.matches) {
        videos.forEach((video) => video.pause());
      } else {
        videos.forEach(playIfVisible);
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
      window.cancelAnimationFrame(playbackFrame);
      window.removeEventListener("scroll", syncVideoPlayback);
      document.removeEventListener("visibilitychange", handlePlaybackPreference);
      reducedMotion.removeEventListener("change", handlePlaybackPreference);
      window.removeEventListener("scroll", updateActiveDetail);
      videos.forEach((video) => video.pause());
      videos.forEach((video) => video.removeEventListener("canplay", handleCanPlay));
      mediaElements.forEach((element) => element.removeEventListener(element instanceof HTMLVideoElement ? "loadeddata" : "load", markLoaded));
    };
  }, []);

  return null;
}
