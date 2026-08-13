"use client";

import { useEffect, useRef } from "react";

export function HeroVideo({ mp4Src, webmSrc, poster }: { mp4Src: string; webmSrc?: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const load = () => {
      video.querySelectorAll<HTMLSourceElement>("source[data-src]").forEach((source) => {
        if (source.dataset.src) source.src = source.dataset.src;
        delete source.dataset.src;
      });
      video.load();
      void video.play().catch(() => undefined);
    };
    const delayId = window.setTimeout(load, 300);

    return () => {
      window.clearTimeout(delayId);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      className="stage-background"
      poster={poster}
      aria-label="充满紫色与暖橙灯光的创意设计工作台循环动画"
      loop
      muted
      playsInline
      preload="none"
      tabIndex={-1}
      controlsList="nodownload noplaybackrate noremoteplayback"
      disablePictureInPicture
    >
      {webmSrc ? <source data-src={webmSrc} type="video/webm" /> : null}
      <source data-src={mp4Src} type="video/mp4" />
    </video>
  );
}
