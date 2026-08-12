"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

export type ProjectDetailMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; ariaLabel: string };

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

type NavIconProps = {
  name: "home" | "about" | "projects" | "resume";
};

function DetailMediaFigure({ media, id, isSectionStart }: {
  media: ProjectDetailMedia;
  id?: string;
  isSectionStart?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  useEffect(() => {
    const element = mediaRef.current;
    if (!element) return;

    if (element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0) {
      setLoaded(true);
    }
    if (element instanceof HTMLVideoElement && element.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      setLoaded(true);
    }
  }, [media.src]);

  return (
    <figure
      className={`detail-media${loaded ? " detail-media-loaded" : ""}`}
      id={id}
      data-detail-section={isSectionStart ? true : undefined}
    >
      {media.kind === "video" ? (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={media.src}
          aria-label={media.ariaLabel}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
          onCanPlay={() => setLoaded(true)}
        />
      ) : (
        <img ref={mediaRef as React.RefObject<HTMLImageElement>} src={media.src} alt={media.alt} onLoad={() => setLoaded(true)} />
      )}
      {!loaded ? <span className="detail-media-loading" aria-label="素材加载中"><i /></span> : null}
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
  const [activeDetail, setActiveDetail] = useState(detailSections[0].id);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    const updateActiveDetail = () => {
      let current = detailSections[0].id;
      detailSections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 230) current = id;
      });
      setActiveDetail(current);
    };

    updateActiveDetail();
    window.addEventListener("scroll", updateActiveDetail, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActiveDetail);
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2200);
  };

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
            <span className="identity-avatar">
              <img src="/assets/navigation/profile.png" alt="岳崇政头像" />
            </span>
            <span className="identity-copy">
              <strong>岳崇政</strong>
              <small>CharonY</small>
            </span>
          </a>

          <nav className="site-nav" aria-label="作品集导航">
            <a className="nav-link" href="/#cover"><NavIcon name="home" /><span>个人首页</span></a>
            <a className="nav-link" href="/#about"><NavIcon name="about" /><span>能力一览</span></a>
            <div className="project-nav nav-link-active">
              <a className="nav-link project-nav-trigger" href="/#projects">
                <NavIcon name="projects" />
                <span>项目目录</span>
                <i className="nav-caret" aria-hidden="true" />
              </a>
              <div className="project-nav-menu" aria-label="项目列表">
                {projectMenu.map((project) => (
                  <a href={project.href} key={project.href}><span>{project.label}</span><span aria-hidden="true">›</span></a>
                ))}
              </div>
            </div>
            <a
              className="nav-link resume-link"
              href="#resume"
              onClick={(event) => {
                event.preventDefault();
                showToast("在线简历将在后续补充");
              }}
            >
              <NavIcon name="resume" />
              <span>在线简历</span>
            </a>
          </nav>
        </div>
      </header>

      <div className="detail-layout">
        <aside className="detail-sidebar">
          <a className="detail-back" href="/#projects"><span aria-hidden="true" />返回首页</a>
          <nav className="detail-section-nav" aria-label="项目章节">
            {detailSections.map((section) => (
              <a
                className={activeDetail === section.id ? "detail-nav-active" : ""}
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
                <section className="detail-summary-card" key={summary.title}>
                  <h2>{summary.title}</h2>
                  <p>{summary.body}</p>
                </section>
              ))}
            </div>

            {config.overviewMedia?.length ? (
              <div className="detail-media-stack detail-overview-media" aria-label="项目概览素材">
                {config.overviewMedia.map((media, index) => (
                  <DetailMediaFigure media={media} key={`${media.src}-${index}`} />
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
                <a
                  className="related-project-card"
                  href={project.href}
                  key={project.id}
                  style={{ "--related-accent": project.color } as CSSProperties}
                >
                  <span className="related-project-index">0{index + 1}</span>
                  <span className="related-project-arrow" aria-hidden="true">↗</span>
                  <span className="related-project-copy">
                    <small>{project.eyebrow}</small>
                    <strong>{project.label}</strong>
                  </span>
                </a>
              ))}
            </div>
          </section>
        </article>
      </div>

      <div className={`toast ${toast ? "toast-visible" : ""}`} role="status" aria-live="polite">
        <span aria-hidden="true">✓</span>{toast}
      </div>
    </main>
  );
}
