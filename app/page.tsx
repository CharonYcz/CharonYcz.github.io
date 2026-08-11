"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "project-ux",
    label: "体验设计",
    image: "/assets/projects/ux.png",
    hoverImage: "/assets/projects/ux-hover.png",
    className: "project-ux",
    detailHref: "/projects/experience",
  },
  {
    id: "project-ai",
    label: "AI工作流",
    image: "/assets/projects/ai.png",
    hoverImage: "/assets/projects/ai-hover.png",
    className: "project-ai",
    detailHref: "/projects/ai-workflow",
  },
  {
    id: "project-crm",
    label: "中后台",
    image: "/assets/projects/crm.png",
    hoverImage: "/assets/projects/crm-hover.png",
    className: "project-crm",
    detailHref: "/projects/enterprise",
  },
  {
    id: "project-ip",
    label: "IP设计",
    image: "/assets/projects/ip.png",
    hoverImage: "/assets/projects/ip-hover.png",
    className: "project-ip",
    detailHref: "/projects/ip",
  },
];

const projectMenu = [projects[0], projects[2], projects[3], projects[1]];

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

export default function Home() {
  const [toast, setToast] = useState("");
  const [activeSection, setActiveSection] = useState("cover");
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    const sections = ["cover", "about", "projects"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.55 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

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
      <header className="site-header">
        <div className="site-header-inner">
          <a className="identity-card" href="#cover" aria-label="岳崇政 CharonY，返回个人首页">
            <span className="identity-avatar">
              <img src="/assets/navigation/profile.png" alt="岳崇政头像" />
            </span>
            <span className="identity-copy">
              <strong>岳崇政</strong>
              <small>CharonY</small>
            </span>
          </a>

          <nav className="site-nav" aria-label="作品集导航">
            <a className={`nav-link ${activeSection === "cover" ? "nav-link-active" : ""}`} href="#cover">
              <NavIcon name="home" />
              <span>个人首页</span>
            </a>
            <a className={`nav-link ${activeSection === "about" ? "nav-link-active" : ""}`} href="#about">
              <NavIcon name="about" />
              <span>能力一览</span>
            </a>
            <div className={`project-nav ${activeSection === "projects" ? "nav-link-active" : ""}`}>
              <a className="nav-link project-nav-trigger" href="#projects">
                <NavIcon name="projects" />
                <span>项目目录</span>
                <i className="nav-caret" aria-hidden="true" />
              </a>
              <div className="project-nav-menu" aria-label="项目列表">
                {projectMenu.map((project) => (
                  <a key={project.id} href={project.detailHref ?? `#${project.id}`}>
                    <span>{project.id === "project-ai" ? "AIUX工作流" : project.label}</span>
                    <span aria-hidden="true">›</span>
                  </a>
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

      <section className="screen-section cover-section" id="cover" aria-labelledby="cover-heading">
        <div className="design-stage cover-stage">
          <h1 className="visually-hidden" id="cover-heading">
            岳崇政 2026 设计作品集
          </h1>
          <video
            className="stage-background"
            src="/assets/cover/ambient-desktop-loop.mp4"
            aria-label="充满紫色与暖橙灯光的创意设计工作台循环动画"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            tabIndex={-1}
          />
          <img
            className="cover-title-art"
            src="/assets/cover/title.png"
            alt="Hello. I'm a UX designer. 2026 设计作品集"
          />
        </div>
        <a className="mouse-scroll" href="#about" aria-label="向下查看能力一览">
          <span className="mouse-outline" aria-hidden="true"><i /></span>
        </a>
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
            <a href="https://www.ui.cn/detail/661217.html?nopop=1" target="_blank" rel="noreferrer">• UI中国第144期榜单TOP1</a>
            <a href="https://www.zcool.com.cn/u/13474438" target="_blank" rel="noreferrer">• 站酷人气设计师</a>
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
        <a className="mouse-scroll" href="#projects" aria-label="向下查看项目目录">
          <span className="mouse-outline" aria-hidden="true"><i /></span>
        </a>
      </section>

      <section className="screen-section projects-section" id="projects" aria-labelledby="projects-heading">
        <div className="design-stage projects-stage">
          <h2 className="visually-hidden" id="projects-heading">作品集项目目录</h2>

          {projects.map((project) => (
            <a
              className={`project-card ${project.className}`}
              href={project.detailHref ?? `#${project.id}`}
              id={project.id}
              key={project.id}
              onClick={(event) => {
                if (project.detailHref) return;
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
