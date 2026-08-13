import { ProjectDetailTemplate, type ProjectDetailConfig } from "../ProjectDetailTemplate";

const config: ProjectDetailConfig = {
  projectId: "enterprise",
  eyebrow: "Enterprise Business System Integration and Efficiency-FocusedExperience Optimization",
  title: "企业级业务系统整合与效率体验优化",
  titleHighlight: "系统整合",
  subtitle: "随着企业业务发展，CRM、IM、HRM、OA等系统在不同阶段独立建设，形成多个入口和数据孤岛，导致操作路径分散、交互规则不统一、信息检素效率低，影响员工日常工作效率与体验。",
  theme: {
    accent: "#1D6EF5",
    sidebarStart: "rgba(10, 26, 62, 0.8)",
    sidebarEnd: "rgba(7, 13, 31, 0.8)",
    sidebarBorder: "rgba(89, 147, 255, 0.24)",
    activeStart: "rgba(29, 110, 245, 0.34)",
    activeEnd: "rgba(11, 45, 112, 0.17)",
    cardStart: "rgba(18, 61, 137, 0.8)",
    cardEnd: "rgba(10, 27, 68, 0.8)",
    cardBorder: "rgba(58, 132, 255, 0.22)",
  },
  sections: ["需求分析和背景", "用研与体验策略", "设计体系搭建", "方案输出思路", "项目复盘和更多"],
  summaries: [
    { title: "整合背景", body: "多个业务系统独立建设，入口、规则与数据结构分散，增加员工使用与查找成本。" },
    { title: "体验策略", body: "统一任务入口、信息架构与交互规则，围绕高频工作链路提升操作效率。" },
    { title: "业务价值", body: "降低跨系统切换和学习成本，沉淀可复用的企业级产品设计体系。" },
  ],
  overviewMedia: [
    { kind: "image", src: "/assets/details/enterprise/01-background/01.png", alt: "需求分析和背景素材一" },
  ],
  sectionMedia: {
    "用研与体验策略": [
      { kind: "image", src: "/assets/details/enterprise/02-research/01.png", alt: "用研与体验策略素材一" },
    ],
    "设计体系搭建": [
      { kind: "image", src: "/assets/details/enterprise/03-system/01.png", alt: "设计体系搭建素材一" },
      { kind: "image", src: "/assets/details/enterprise/03-system/02.png", alt: "设计体系搭建素材二" },
      { kind: "image", src: "/assets/details/enterprise/03-system/03.png", alt: "设计体系搭建素材三" },
    ],
    "方案输出思路": [
      { kind: "image", src: "/assets/details/enterprise/04-delivery/01.png", alt: "方案输出思路素材一" },
      { kind: "image", src: "/assets/details/enterprise/04-delivery/02.png", alt: "方案输出思路素材二" },
      { kind: "video", src: "/assets/details/enterprise/04-delivery/03.mp4", ariaLabel: "方案输出思路素材三", aspectRatio: "1120 / 629" },
      { kind: "image", src: "/assets/details/enterprise/04-delivery/04.png", alt: "方案输出思路素材四" },
      { kind: "image", src: "/assets/details/enterprise/04-delivery/05.png", alt: "方案输出思路素材五" },
      { kind: "image", src: "/assets/details/enterprise/04-delivery/06.png", alt: "方案输出思路素材六" },
      { kind: "image", src: "/assets/details/enterprise/04-delivery/07.png", alt: "方案输出思路素材七" },
      { kind: "image", src: "/assets/details/enterprise/04-delivery/08.png", alt: "方案输出思路素材八" },
      { kind: "image", src: "/assets/details/enterprise/04-delivery/09.png", alt: "方案输出思路素材九" },
    ],
    "项目复盘和更多": [
      { kind: "image", src: "/assets/details/enterprise/05-review/01.png", alt: "项目复盘和更多素材一" },
      { kind: "image", src: "/assets/details/enterprise/05-review/02.png", alt: "项目复盘和更多素材二" },
    ],
  },
};

export default function EnterpriseProjectPage() {
  return <ProjectDetailTemplate config={config} />;
}
