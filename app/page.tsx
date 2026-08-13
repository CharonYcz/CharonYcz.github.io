import { HeroVideo } from "./HeroVideo";
import { imageMedia, videoMedia } from "./media";
import { PortfolioInteractions } from "./PortfolioInteractions";

const projects = [
  { id: "project-ux", label: "体验设计", image: "/assets/projects/ux.png", hoverImage: "/assets/projects/ux-hover.png", className: "project-ux", detailHref: "/projects/experience" },
  { id: "project-ai", label: "AI工作流", image: "/assets/projects/ai.png", hoverImage: "/assets/projects/ai-hover.png", className: "project-ai", detailHref: "/projects/ai-workflow" },
  { id: "project-crm", label: "中后台", image: "/assets/projects/crm.png", hoverImage: "/assets/projects/crm-hover.png", className: "project-crm", detailHref: "/projects/enterprise" },
  { id: "project-ip", label: "IP设计", image: "/assets/projects/ip.png", hoverImage: "/assets/projects/ip-hover.png", className: "project-ip", detailHref: "/projects/ip" },
] as const;
const projectMenu = [projects[0], projects[2], projects[3], projects[1]];

function NavIcon({ name }: { name: "home" | "about" | "projects" | "resume" }) {
  return (
    <span className="nav-icon" aria-hidden="true">
      <img className="nav-icon-idle" src={`/assets/navigation/${name}-idle.png`} alt="" />
      <img className="nav-icon-selected" src={`/assets/navigation/${name}-selected.png`} alt="" />
    </span>
  );
}

function OptimizedPicture({ src, alt, className, eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const image = imageMedia(src, alt);
  return (
    <picture className={className ? `${className}-picture` : undefined} data-deferred-picture={eager ? undefined : true}>
      {image.avifSrc ? <source {...(eager ? { srcSet: image.avifSrc } : { "data-srcset": image.avifSrc })} type="image/avif" /> : null}
      {image.webpSrc ? <source {...(eager ? { srcSet: image.webpSrc } : { "data-srcset": image.webpSrc })} type="image/webp" /> : null}
      <img
        className={className}
        {...(eager ? { src: image.src } : { "data-src": image.src })}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "low"}
      />
    </picture>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const image = imageMedia(project.image, "");
  const hover = imageMedia(project.hoverImage, "");
  return (
    <a className={`project-card ${project.className}`} href={project.detailHref} id={project.id} data-project-card aria-label={`查看${project.label}项目`}>
      <picture className="project-card-default-picture" data-deferred-picture>
        {image.avifSrc ? <source data-srcset={image.avifSrc} type="image/avif" /> : null}
        {image.webpSrc ? <source data-srcset={image.webpSrc} type="image/webp" /> : null}
        <img className="project-card-default" data-src={image.src} alt="" width={image.width} height={image.height} loading="lazy" decoding="async" />
      </picture>
      <picture className="project-card-hover-picture">
        {hover.avifSrc ? <source data-hover-srcset={hover.avifSrc} type="image/avif" /> : null}
        {hover.webpSrc ? <source data-hover-srcset={hover.webpSrc} type="image/webp" /> : null}
        <img className="project-card-hover" data-hover-src={hover.src} alt="" width={hover.width} height={hover.height} loading="lazy" decoding="async" />
      </picture>
    </a>
  );
}

export default function Home() {
  const coverVideo = videoMedia("/assets/cover/ambient-desktop-loop.mp4", "作品集首页背景动画", "16 / 9");
  const coverPoster = imageMedia("/assets/cover/background.png", "");
  return (
    <main className="portfolio-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <a className="identity-card" href="#cover" aria-label="岳崇政 CharonY，返回个人首页">
            <span className="identity-avatar"><img src="/assets/navigation/profile-small.png" alt="岳崇政头像" /></span>
            <span className="identity-copy"><strong>岳崇政</strong><small>CharonY</small></span>
          </a>
          <nav className="site-nav" aria-label="作品集导航">
            <a className="nav-link nav-link-active" data-nav-section="cover" href="#cover"><NavIcon name="home" /><span>个人首页</span></a>
            <a className="nav-link" data-nav-section="about" href="#about"><NavIcon name="about" /><span>能力一览</span></a>
            <div className="project-nav" data-nav-section="projects">
              <a className="nav-link project-nav-trigger" href="#projects"><NavIcon name="projects" /><span>项目目录</span><i className="nav-caret" aria-hidden="true" /></a>
              <div className="project-nav-menu" aria-label="项目列表">
                {projectMenu.map((project) => <a key={project.id} href={project.detailHref}><span>{project.id === "project-ai" ? "AIUX工作流" : project.label}</span><span aria-hidden="true">›</span></a>)}
              </div>
            </div>
            <a className="nav-link resume-link" href="/assets/resume/%E5%B2%B3%E5%B4%87%E6%94%BF%E7%AE%80%E5%8E%86-2026.pdf" download="岳崇政简历-2026.pdf"><NavIcon name="resume" /><span>下载简历</span></a>
          </nav>
        </div>
      </header>

      <section className="screen-section cover-section" id="cover" aria-labelledby="cover-heading">
        <div className="design-stage cover-stage">
          <h1 className="visually-hidden" id="cover-heading">岳崇政 2026 设计作品集</h1>
          <HeroVideo mp4Src={coverVideo.src} webmSrc={coverVideo.webmSrc} poster={coverPoster.webpSrc ?? coverPoster.src} />
          <OptimizedPicture className="cover-title-art" src="/assets/cover/title.png" alt="Hello. I'm a UX designer. 2026 设计作品集" eager />
        </div>
        <a className="mouse-scroll" href="#about" aria-label="向下查看能力一览"><span className="mouse-outline" aria-hidden="true"><i /></span></a>
      </section>

      <section className="screen-section about-section" id="about" aria-labelledby="about-heading">
        <div className="design-stage about-stage">
          <h2 className="visually-hidden" id="about-heading">岳崇政个人简介</h2>
          <OptimizedPicture className="stage-background" src="/assets/about/background.png" alt="岳崇政个人介绍版面与西装肖像" />
          <p className="about-copy">7年+互联⽹用户体验设计经验，覆盖C端、B端、中后台、运营活动及品牌体验；擅长主动发现问题、⽤户研究、数据分析、体验诊断、⽅案设计到研发跟进、上线验收和效果复盘的完整项目经验。<br />精通体验交互、视觉效果、设计规范建设与AI辅助设计⼯作流。</p>
          <div className="honor-links" aria-label="个人荣誉"><a href="https://www.ui.cn/detail/661217.html?nopop=1" target="_blank" rel="noreferrer">• UI中国第144期榜单TOP1</a><a href="https://www.zcool.com.cn/u/13474438" target="_blank" rel="noreferrer">• 站酷人气设计师</a></div>
          <div className="contact-actions" aria-label="联系方式">
            <button className="contact-phone" type="button" data-copy-value="166-0175-6712" data-copy-message="手机号已复制" aria-label="复制手机号 166-0175-6712">166-0175-6712</button>
            <button className="contact-email" type="button" data-copy-value="chongzheng.yue@foxmail.com" data-copy-message="邮箱已复制" aria-label="复制邮箱 chongzheng.yue@foxmail.com">chongzheng.yue@foxmail.com</button>
          </div>
        </div>
        <a className="mouse-scroll" href="#projects" aria-label="向下查看项目目录"><span className="mouse-outline" aria-hidden="true"><i /></span></a>
      </section>

      <section className="screen-section projects-section" id="projects" aria-labelledby="projects-heading">
        <div className="design-stage projects-stage">
          <h2 className="visually-hidden" id="projects-heading">作品集项目目录</h2>
          {projects.map((project) => <ProjectCard project={project} key={project.id} />)}
          <div className="directory-panel" aria-hidden="true"><OptimizedPicture src="/assets/projects/directory.png" alt="" /></div>
          <p className="directory-copy">本作品集围绕真实业务中的体验问题展开，收录体验设计、AI工作流、中后台与IP设计四个方向。通过用户研究、信息架构、交互视觉与AI辅助工作流，呈现我从发现问题、制定策略到推动落地与验证结果的完整设计过程。</p>
          <OptimizedPicture className="projects-topline" src="/assets/projects/topline.png" alt="Lucky 2026 作品集信息" />
        </div>
      </section>

      <div className="toast" data-copy-toast role="status" aria-live="polite"><span aria-hidden="true">✓</span><b data-copy-toast-text /></div>
      <PortfolioInteractions />
    </main>
  );
}
