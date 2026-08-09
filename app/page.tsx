"use client";

import { useRef, useState } from "react";

const projects = [
  {
    id: "project-ux",
    label: "体验设计",
    image: "/assets/projects/ux.png",
    hoverImage: "/assets/projects/ux-hover.png",
    className: "project-ux",
  },
  {
    id: "project-ai",
    label: "AI工作流",
    image: "/assets/projects/ai.png",
    hoverImage: "/assets/projects/ai-hover.png",
    className: "project-ai",
  },
  {
    id: "project-crm",
    label: "中后台",
    image: "/assets/projects/crm.png",
    hoverImage: "/assets/projects/crm-hover.png",
    className: "project-crm",
  },
  {
    id: "project-ip",
    label: "IP设计",
    image: "/assets/projects/ip.png",
    hoverImage: "/assets/projects/ip-hover.png",
    className: "project-ip",
  },
];

export default function Home() {
  const [toast, setToast] = useState("");
  const toastTimer = useRef<number | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2200);
  };

  const copyText = async (value: string, message: string) => {
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
    showToast(message);
  };

  return (
    <main className="portfolio-shell">
      <nav className="site-nav" aria-label="作品集导航">
        <a href="#cover">首页</a>
        <a href="#about">个人</a>
        <div className="project-nav">
          <a className="project-nav-trigger" href="#projects">
            项目 <span aria-hidden="true">⌄</span>
          </a>
          <div className="project-nav-menu" aria-label="项目列表">
            {projects.map((project) => (
              <a key={project.id} href={`#${project.id}`}>
                <span>{project.label}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section className="screen-section cover-section" id="cover" aria-labelledby="cover-heading">
        <div className="design-stage cover-stage">
          <h1 className="visually-hidden" id="cover-heading">
            岳崇政 2026 设计作品集
          </h1>
          <img
            className="stage-background"
            src="/assets/cover/background.png"
            alt="充满紫色与暖橙灯光的创意设计工作台"
          />
          <div className="cover-meta" aria-label="作品集信息">
            <span className="brand-line"><i aria-hidden="true" />Lucky 2026</span>
            <a href="mailto:chongzheng.yue@foxmail.com">chongzheng.yue@foxmail.com</a>
          </div>
          <img
            className="cover-title-art"
            src="/assets/cover/title.png"
            alt="Hello. I'm a UX designer. 2026 设计作品集"
          />
          <div className="cover-footer" aria-hidden="true">
            <span>● Cease 2024 ~ 2026</span>
            <span>「用户体验设计的目的就是让“散文转变为诗歌”」</span>
            <span>Copyright 2026 @ CharonY</span>
          </div>
          <a className="scroll-cue" href="#about" aria-label="向下查看个人介绍">
            <span>SCROLL</span>
            <i aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="screen-section about-section" id="about" aria-labelledby="about-heading">
        <div className="design-stage about-stage">
          <h2 className="visually-hidden" id="about-heading">岳崇政个人简介</h2>
          <img
            className="stage-background"
            src="/assets/about/background.png"
            alt="岳崇政个人介绍版面与西装肖像"
          />

          <p className="about-copy">
            从事UI设计7年+，精通ToB、ToC、UI规范建立、数据可视化、H5页面、动效设计等，并且擅长品牌设计、字体设计、AIGC等。
            <br />
            主导过多个公司重点项目，擅于使用UCD方法论发现并解决问题，同时能兼任B端UE的用研、需求分析、原型输出、交互文档、交互规范等大部分工作。
          </p>

          <div className="honor-links" aria-label="个人荣誉">
            <button type="button" onClick={() => showToast("荣誉链接将在后续补充")}>• UI中国第144期榜单TOP1</button>
            <button type="button" onClick={() => showToast("荣誉链接将在后续补充")}>• 站酷人气设计师</button>
          </div>

          <div className="contact-actions" aria-label="联系方式">
            <button
              className="contact-phone"
              type="button"
              onClick={() => copyText("166-0175-6712", "手机号已复制")}
              aria-label="复制手机号 166-0175-6712"
            >
              166-0175-6712
            </button>
            <button
              className="contact-email"
              type="button"
              onClick={() => copyText("chongzheng.yue@foxmail.com", "邮箱已复制")}
              aria-label="复制邮箱 chongzheng.yue@foxmail.com"
            >
              chongzheng.yue@foxmail.com
            </button>
          </div>
        </div>
      </section>

      <section className="screen-section projects-section" id="projects" aria-labelledby="projects-heading">
        <div className="design-stage projects-stage">
          <h2 className="visually-hidden" id="projects-heading">作品集项目目录</h2>

          {projects.map((project) => (
            <a
              className={`project-card ${project.className}`}
              href={`#${project.id}`}
              id={project.id}
              key={project.id}
              onClick={(event) => {
                event.preventDefault();
                showToast(`${project.label}详情页将在下一阶段补充`);
              }}
              aria-label={`查看${project.label}项目`}
            >
              <img className="project-card-default" src={project.image} alt="" />
              <img className="project-card-hover" src={project.hoverImage} alt="" />
            </a>
          ))}

          <div className="directory-panel" aria-hidden="true">
            <img src="/assets/projects/directory.png" alt="" />
          </div>
          <p className="directory-copy">
            本作品集围绕真实业务中的体验问题展开，收录体验设计、AI工作流、中后台与IP设计四个方向。通过用户研究、信息架构、交互视觉与AI辅助工作流，呈现我从发现问题、制定策略到推动落地与验证结果的完整设计过程。
          </p>
          <img className="projects-topline" src="/assets/projects/topline.png" alt="Lucky 2026 作品集信息" />
        </div>
      </section>

      <div className={`toast ${toast ? "toast-visible" : ""}`} role="status" aria-live="polite">
        <span aria-hidden="true">✓</span>{toast}
      </div>
    </main>
  );
}
