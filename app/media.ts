export type OptimizedImage = {
  kind: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
  webpSrc?: string;
  avifSrc?: string;
};

export type OptimizedVideo = {
  kind: "video";
  src: string;
  ariaLabel: string;
  poster?: string;
  aspectRatio?: string;
  webmSrc?: string;
};

export type OptimizedMedia = OptimizedImage | OptimizedVideo;

import { imageManifest, videoManifest } from "./generated/media-manifest";

export function imageMedia(src: string, alt: string): OptimizedImage {
  const optimized = imageManifest[src as keyof typeof imageManifest];
  if (!optimized) throw new Error(`Missing optimized image metadata for ${src}`);
  return { kind: "image", src, alt, ...optimized };
}

export function videoMedia(
  source: string,
  ariaLabel: string,
  aspectRatio?: string,
  poster?: string,
): OptimizedVideo {
  const optimized = videoManifest[source as keyof typeof videoManifest];
  if (!optimized) throw new Error(`Missing optimized video metadata for ${source}`);
  return { kind: "video", ariaLabel, aspectRatio, poster, ...optimized };
}
