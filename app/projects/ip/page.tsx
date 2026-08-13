import { ProjectDetailTemplate, type ProjectDetailConfig } from "../ProjectDetailTemplate";

const config: ProjectDetailConfig = {
  projectId: "ip",
  eyebrow: "Empowering Brand Value Through IP Revitalization Across All Touchpoints",
  title: "IP改造赋能，全场景品牌价值渗透",
  titleHighlight: "品牌价值渗透",
  subtitle: "统一IP视觉表达，沉淀标准化设计资产，提升多场景应用与团队复用效率。",
  theme: {
    accent: "#FF6900",
    sidebarStart: "rgba(43, 22, 8, 0.8)",
    sidebarEnd: "rgba(16, 10, 6, 0.8)",
    sidebarBorder: "rgba(255, 150, 69, 0.22)",
    activeStart: "rgba(255, 105, 0, 0.34)",
    activeEnd: "rgba(91, 37, 2, 0.16)",
    cardStart: "rgba(93, 44, 8, 0.8)",
    cardEnd: "rgba(37, 19, 7, 0.8)",
    cardBorder: "rgba(255, 135, 30, 0.2)",
  },
  sections: ["需求分析", "用研与竞品", "AI介入工作流", "完整资产输出", "案例与复盘"],
  summaries: [
    { title: "改造目标", body: "统一IP角色的核心特征与视觉语言，建立稳定、易识别的品牌表达。" },
    { title: "设计方式", body: "结合竞品研究与AI辅助工作流，提高角色探索、延展和资产生产效率。" },
    { title: "资产价值", body: "形成可复用的标准资产，支持产品、运营与传播等多触点快速落地。" },
  ],
  overviewMedia: [
    { kind: "video", src: "/assets/details/ip/01-analysis/01.mp4", ariaLabel: "IP需求分析素材一", aspectRatio: "934 / 1280" },
  ],
  sectionMedia: {
    "用研与竞品": [
      { kind: "image", src: "/assets/details/ip/02-research/02.png", alt: "用研与竞品素材二" },
    ],
    "AI介入工作流": [
      { kind: "image", src: "/assets/details/ip/03-ai-workflow/01.png", alt: "AI介入工作流素材一" },
      { kind: "image", src: "/assets/details/ip/03-ai-workflow/02.png", alt: "AI介入工作流素材二" },
      { kind: "image", src: "/assets/details/ip/03-ai-workflow/03.png", alt: "AI介入工作流素材三" },
    ],
    "完整资产输出": [
      { kind: "image", src: "/assets/details/ip/04-assets/01.png", alt: "完整资产输出素材一" },
      { kind: "image", src: "/assets/details/ip/04-assets/02.png", alt: "完整资产输出素材二" },
      { kind: "video", src: "/assets/details/ip/04-assets/03.mp4", ariaLabel: "完整资产输出素材三", aspectRatio: "1120 / 273" },
      { kind: "image", src: "/assets/details/ip/04-assets/04.png", alt: "完整资产输出素材四" },
      { kind: "image", src: "/assets/details/ip/04-assets/05.png", alt: "完整资产输出素材五" },
      { kind: "video", src: "/assets/details/ip/04-assets/06.mp4", ariaLabel: "完整资产输出素材六", aspectRatio: "1120 / 809" },
      { kind: "image", src: "/assets/details/ip/04-assets/07.png", alt: "完整资产输出素材七" },
    ],
    "案例与复盘": [
      { kind: "image", src: "/assets/details/ip/05-review/01.png", alt: "案例与复盘素材一" },
      { kind: "image", src: "/assets/details/ip/05-review/02.png", alt: "案例与复盘素材二" },
      { kind: "video", src: "/assets/details/ip/05-review/03.mp4", ariaLabel: "案例与复盘素材三", aspectRatio: "1120 / 565" },
      { kind: "image", src: "/assets/details/ip/05-review/04.png", alt: "案例与复盘素材四" },
      { kind: "video", src: "/assets/details/ip/05-review/05.mp4", ariaLabel: "案例与复盘素材五", aspectRatio: "1120 / 565" },
      { kind: "image", src: "/assets/details/ip/05-review/06.png", alt: "案例与复盘素材六" },
    ],
  },
};

export default function IpProjectPage() {
  return <ProjectDetailTemplate config={config} />;
}
