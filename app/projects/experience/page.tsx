import { ProjectDetailTemplate, type ProjectDetailConfig } from "../ProjectDetailTemplate";

const config: ProjectDetailConfig = {
  eyebrow: "Ongoing Order Page Experience Optimization",
  title: "订单进行中页面体验优化",
  subtitle: "基于20000余条用户体验监测反馈，在不改变原有业务流程与状态数量的前提下，系统优化订单状态感知、信息层级、核心操作与情绪反馈，提升用户在订单履约过程中的掌控感与服务满意度。",
  sections: ["项目概览", "数据洞察", "体验思考", "链路优化", "多业务适配", "动效和视觉", "项目复盘"],
  summaries: [
    { title: "项目背景", body: "订单履约信息分散、状态表达不一致，用户难以快速判断当前进度与下一步操作。" },
    { title: "设计策略", body: "围绕状态感知、核心任务与服务反馈重组信息层级，并统一关键场景的交互表达。" },
    { title: "项目价值", body: "降低用户理解与操作成本，增强履约过程中的确定感，同时提升服务体验的一致性。" },
  ],
  overviewMedia: [
    { kind: "video", src: "/assets/details/experience/overview/overview-1.mp4", ariaLabel: "订单进行中项目概览视频" },
    { kind: "image", src: "/assets/details/experience/overview/overview-2.png", alt: "订单进行中项目概览长图一" },
    { kind: "image", src: "/assets/details/experience/overview/overview-3.png", alt: "订单进行中项目概览长图二" },
  ],
  media: [
    { kind: "image", src: "/assets/projects/ux.png", alt: "体验设计数据洞察示意" },
    { kind: "image", src: "/assets/projects/ux-hover.png", alt: "体验设计思考示意" },
    { kind: "image", src: "/assets/projects/directory.png", alt: "体验设计链路优化示意" },
    { kind: "image", src: "/assets/projects/crm.png", alt: "体验设计多业务适配示意" },
    { kind: "image", src: "/assets/projects/ip.png", alt: "体验设计动效和视觉示意" },
    { kind: "image", src: "/assets/projects/ai.png", alt: "体验设计项目复盘示意" },
  ],
};

export default function ExperienceProjectPage() {
  return <ProjectDetailTemplate config={config} />;
}
