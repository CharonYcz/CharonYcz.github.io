/* eslint-disable @next/next/no-html-link-for-pages */
import type { CSSProperties } from "react";
import { imageMedia, videoMedia } from "../media";
import { ProjectDetailClient } from "./ProjectDetailClient";

export type ProjectDetailMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; ariaLabel: string; poster?: string; aspectRatio?: string };

export type ProjectDetailConfig = {
  projectId: "experience" | "enterprise" | "ip" | "ai-workflow";
  eyebrow: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  theme: {
    accent: string;
    sidebarStart: string;
    sidebarEnd: string;
    sidebarBorder: string;
    activeStart: string;
    activeEnd: string;
    cardStart: string;
    cardEnd: string;
    cardBorder: string;
  };
  sections: string[];
  summaries: Array<{ title: string; body: string }>;
  overviewMedia?: ProjectDetailMedia[];
  sectionMedia?: Record<string, ProjectDetailMedia[]>;
  media?: ProjectDetailMedia[];
};

const projectMenu = [
  { id: "experience", label: "体验设计", eyebrow: "UX DESIGN", href: "/projects/experience", color: "#FF6900" },
  { id: "enterprise", label: "中后台", eyebrow: "ENTERPRISE SYSTEM", href: "/projects/enterprise", color: "#1D6EF5" },
  { id: "ip", label: "IP设计", eyebrow: "IP DESIGN", href: "/projects/ip", color: "#FF6900" },
  { id: "ai-workflow", label: "AIUX工作流", eyebrow: "AI WORKFLOW", href: "/projects/ai-workflow", color: "#00FBD0" },
] as const;

type NavIconProps = { name: "home" | "about" | "projects" | "resume" };

function DetailMediaFigure({ media, id, isSectionStart, priority = false }: {
  media: ProjectDetailMedia;
  id?: string;
  isSectionStart?: boolean;
  priority?: boolean;
}) {
  const optimized = media.kind === "image"
    ? imageMedia(media.src, media.alt)
    : videoMedia(media.src, media.ariaLabel, media.aspectRatio, media.poster);
  const videoPoster = optimized.kind === "video"
    ? (optimized.poster ?? media.src.replace(/\.mp4$/i, "-poster.jpg"))
    : undefined;
  const aspectRatio = optimized.kind === "image"
    ? `${optimized.width} / ${optimized.height}`
    : optimized.aspectRatio;
  const deferred = !priority || optimized.kind === "video";

  return (
    <figure
      className="detail-media"
      id={id}
      data-detail-section={isSectionStart ? true : undefined}
      data-deferred-media={deferred ? true : undefined}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {optimized.kind === "video" ? (
        <video
          aria-label={optimized.ariaLabel}
          loop
          muted
          playsInline
          poster={priority ? videoPoster : undefined}
          data-poster={priority ? undefined : videoPoster}
          preload="none"
          data-viewport-video="true"
          data-media-element="true"
          tabIndex={-1}
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
          style={aspectRatio ? { aspectRatio } : undefined}
        >
          {optimized.webmSrc ? <source data-src={optimized.webmSrc} type="video/webm" /> : null}
          <source data-src={optimized.src} type="video/mp4" />
        </video>
      ) : (
        <picture>
          {optimized.avifSrc ? (
            <source
              {...(priority ? { srcSet: optimized.avifSrc } : { "data-srcset": optimized.avifSrc })}
              type="image/avif"
            />
          ) : null}
          {optimized.webpSrc ? (
            <source
              {...(priority ? { srcSet: optimized.webpSrc } : { "data-srcset": optimized.webpSrc })}
              type="image/webp"
            />
          ) : null}
          <img
            {...(priority ? { src: optimized.src } : { "data-src": optimized.src })}
            alt={optimized.alt}
            width={optimized.width}
            height={optimized.height}
            draggable={false}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "low"}
            data-deferred-image={priority ? undefined : true}
            data-media-element="true"
          />
        </picture>
      )}
      <span className="detail-media-loading" aria-label="素材加载中"><i /></span>
    </figure>
  );
}

function NavIcon({ name }: NavIconProps) {
  return (
    <span className="nav-icon" aria-hidden="true">
      <img className="nav-icon-idle" src={`/assets/navigation/${name}-idle.png`} alt="" />
      <img className="nav-icon-selected" src={`/assets/navigation/${name}-selected.png`} alt="" />
    </span>
  );
}

export function ProjectDetailTemplate({ config }: { config: ProjectDetailConfig }) {
  const detailSections = config.sections.map((label, index) => ({
    id: index === 0 ? "project-overview" : `project-section-${index}`,
    label,
  }));
  const highlightIndex = config.title.indexOf(config.titleHighlight);
  const titleBefore = highlightIndex >= 0 ? config.title.slice(0, highlightIndex) : config.title;
  const titleAfter = highlightIndex >= 0 ? config.title.slice(highlightIndex + config.titleHighlight.length) : "";
  const themeStyle = {
    "--project-accent": config.theme.accent,
    "--project-sidebar-start": config.theme.sidebarStart,
    "--project-sidebar-end": config.theme.sidebarEnd,
    "--project-sidebar-border": config.theme.sidebarBorder,
    "--project-active-start": config.theme.activeStart,
    "--project-active-end": config.theme.activeEnd,
    "--project-card-start": config.theme.cardStart,
    "--project-card-end": config.theme.cardEnd,
    "--project-card-border": config.theme.cardBorder,
  } as CSSProperties;
  const relatedProjects = projectMenu.filter((project) => project.id !== config.projectId);

  return (
    <main className="project-detail-page" style={themeStyle}>
      <header className="site-header">
        <div className="site-header-inner">
          <a className="identity-card" href="/#cover" aria-label="岳崇政 CharonY，返回个人首页">
            <span className="identity-avatar"><img src="/assets/navigation/profile-small.png" alt="岳崇政头像" /></span>
            <span className="identity-copy"><strong>岳崇政</strong><small>CharonY</small></span>
          </a>

          <nav className="site-nav" aria-label="作品集导航">
            <a className="nav-link" href="/#cover"><NavIcon name="home" /><span>个人首页</span></a>
            <a className="nav-link" href="/#about"><NavIcon name="about" /><span>能力一览</span></a>
            <div className="project-nav nav-link-active">
              <a className="nav-link project-nav-trigger" href="/#projects">
                <NavIcon name="projects" /><span>项目目录</span><i className="nav-caret" aria-hidden="true" />
              </a>
              <div className="project-nav-menu" aria-label="项目列表">
                {projectMenu.map((project) => (
                  <a href={project.href} key={project.href}><span>{project.label}</span><span aria-hidden="true">›</span></a>
                ))}
              </div>
            </div>
            <a className="nav-link resume-link" href="/assets/resume/%E5%B2%B3%E5%B4%87%E6%94%BF%E7%AE%80%E5%8E%86-2026.pdf" download="岳崇政简历-2026.pdf">
              <NavIcon name="resume" /><span>下载简历</span>
            </a>
          </nav>
        </div>
      </header>

      <div className="detail-layout">
        <aside className="detail-sidebar">
          <a className="detail-back" href="/#projects"><span aria-hidden="true" />返回首页</a>
          <nav className="detail-section-nav" aria-label="项目章节">
            {detailSections.map((section, index) => (
              <a
                className={index === 0 ? "detail-nav-active" : undefined}
                data-detail-nav
                href={`#${section.id}`}
                key={section.id}
              >
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="detail-content">
          <section className="detail-intro" id="project-overview" data-detail-section>
            <p className="detail-eyebrow">{config.eyebrow}</p>
            <h1>
              {titleBefore}
              {highlightIndex >= 0 ? <span className="detail-title-highlight">{config.titleHighlight}</span> : null}
              {titleAfter}
            </h1>
            <p className="detail-subtitle">{config.subtitle}</p>
            <div className="detail-summary-grid" aria-label="项目摘要">
              {config.summaries.map((summary) => (
                <section className="detail-summary-card" key={summary.title}><h2>{summary.title}</h2><p>{summary.body}</p></section>
              ))}
            </div>
            {config.overviewMedia?.length ? (
              <div className="detail-media-stack detail-overview-media" aria-label="项目概览素材">
                {config.overviewMedia.map((media, index) => (
                  <DetailMediaFigure media={media} priority={index === 0} key={`${media.src}-${index}`} />
                ))}
              </div>
            ) : null}
          </section>

          <div className={`detail-media-stack${config.overviewMedia?.length ? " detail-media-stack-continuous" : ""}`} aria-label="项目详情素材">
            {detailSections.slice(1).flatMap((section, sectionIndex) => {
              const mediaGroup = config.sectionMedia?.[section.label]
                ?? (config.media?.[sectionIndex] ? [config.media[sectionIndex]] : []);
              return mediaGroup.map((media, mediaIndex) => (
                <DetailMediaFigure
                  id={mediaIndex === 0 ? section.id : undefined}
                  isSectionStart={mediaIndex === 0}
                  key={`${section.id}-${media.src}`}
                  media={media}
                />
              ));
            })}
          </div>

          <section className="related-projects" aria-labelledby="related-projects-title">
            <p className="related-projects-eyebrow">MORE PROJECTS</p>
            <h2 id="related-projects-title">切换到其他作品</h2>
            <div className="related-projects-grid">
              {relatedProjects.map((project, index) => (
                <a className="related-project-card" href={project.href} key={project.id} style={{ "--related-accent": project.color } as CSSProperties}>
                  <span className="related-project-index">0{index + 1}</span>
                  <span className="related-project-arrow" aria-hidden="true">↗</span>
                  <span className="related-project-copy"><small>{project.eyebrow}</small><strong>{project.label}</strong></span>
                </a>
              ))}
            </div>
          </section>
        </article>
      </div>
      <ProjectDetailClient />
    </main>
  );
}
