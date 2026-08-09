"use client";

import { useEffect, useRef, useState } from "react";

const detailSections = [
  { id: "project-overview", label: "项目概览" },
  { id: "data-insights", label: "数据洞察" },
  { id: "experience-thinking", label: "体验思考" },
  { id: "flow-optimization", label: "链路优化" },
  { id: "business-adaptation", label: "多业务适配" },
  { id: "motion-visual", label: "动效和视觉" },
  { id: "project-retrospective", label: "项目复盘" },
];

type DetailMedia =
  | { id: string; kind: "image"; src: string; alt: string }
  | { id: string; kind: "video"; src: string; ariaLabel: string };

const demoMedia: DetailMedia[] = [
  { id: "data-insights", kind: "image", src: "/assets/projects/ux.png", alt: "体验设计项目视觉示意" },
  { id: "experience-thinking", kind: "image", src: "/assets/projects/ux-hover.png", alt: "体验思考视觉示意" },
  { id: "flow-optimization", kind: "image", src: "/assets/projects/directory.png", alt: "链路优化视觉示意" },
  { id: "business-adaptation", kind: "image", src: "/assets/projects/crm.png", alt: "多业务适配视觉示意" },
  { id: "motion-visual", kind: "image", src: "/assets/projects/ip.png", alt: "动效和视觉示意" },
  { id: "project-retrospective", kind: "image", src: "/assets/projects/ai.png", alt: "项目复盘视觉示意" },
];

type NavIconProps = {
  name: "home" | "about" | "projects" | "resume";
};

function NavIcon({ name }: NavIconProps) {
  return (
    <span className="nav-icon" aria-hidden="true">
      <img className="nav-icon-idle" src={`/assets/navigation/${name}-idle.png`} alt="" />
      <img className="nav-icon-selected" src={`/assets/navigation/${name}-selected.png`} alt="" />
    </span>
  );
}

export default function ExperienceProjectPage() {
  const [activeDetail, setActiveDetail] = useState("project-overview");
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

  return (
    <main className="project-detail-page">
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
            <a className="nav-link" href="/#cover">
              <NavIcon name="home" />
              <span>个人首页</span>
            </a>
            <a className="nav-link" href="/#about">
              <NavIcon name="about" />
              <span>能力一览</span>
            </a>
            <div className="project-nav nav-link-active">
              <a className="nav-link project-nav-trigger" href="/#projects">
                <NavIcon name="projects" />
                <span>项目目录</span>
                <i className="nav-caret" aria-hidden="true" />
              </a>
              <div className="project-nav-menu" aria-label="项目列表">
                <a href="/projects/experience"><span>体验设计</span><span aria-hidden="true">›</span></a>
                <a href="/#project-crm"><span>中后台</span><span aria-hidden="true">›</span></a>
                <a href="/#project-ip"><span>IP设计</span><span aria-hidden="true">›</span></a>
                <a href="/#project-ai"><span>AIUX工作流</span><span aria-hidden="true">›</span></a>
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
          <a className="detail-back" href="/#projects">
            <span aria-hidden="true">‹</span> 返回首页
          </a>
          <nav className="detail-section-nav" aria-label="体验设计项目章节">
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
            <p className="detail-eyebrow">Ongoing Order Page Experience Optimization</p>
            <h1>订单进行中页面体验优化</h1>
            <p className="detail-subtitle">
              基于20000余条用户体验监测反馈，在不改变原有业务流程与状态数量的前提下，系统优化订单状态感知、信息层级、核心操作与情绪反馈，提升用户在订单履约过程中的掌控感与服务满意度。
            </p>

            <div className="detail-summary-grid" aria-label="项目摘要">
              <section className="detail-summary-card">
                <h2>项目背景</h2>
                <p>订单履约信息分散、状态表达不一致，用户难以快速判断当前进度与下一步操作。</p>
              </section>
              <section className="detail-summary-card">
                <h2>设计策略</h2>
                <p>围绕状态感知、核心任务与服务反馈重组信息层级，并统一关键场景的交互表达。</p>
              </section>
              <section className="detail-summary-card">
                <h2>项目价值</h2>
                <p>降低用户理解与操作成本，增强履约过程中的确定感，同时提升服务体验的一致性。</p>
              </section>
            </div>
          </section>

          <div className="detail-media-stack" aria-label="项目详情示意素材">
            {demoMedia.map((media) => (
              <figure className="detail-media" id={media.id} data-detail-section key={media.id}>
                {media.kind === "video" ? (
                  <video
                    src={media.src}
                    aria-label={media.ariaLabel}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    tabIndex={-1}
                  />
                ) : (
                  <img src={media.src} alt={media.alt} />
                )}
              </figure>
            ))}
          </div>
        </article>
      </div>

      <div className={`toast ${toast ? "toast-visible" : ""}`} role="status" aria-live="polite">
        <span aria-hidden="true">✓</span>{toast}
      </div>
    </main>
  );
}
