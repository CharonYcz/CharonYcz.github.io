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
    { kind: "video", src: "/assets/details/experience/01-overview/01.mp4", ariaLabel: "订单进行中项目概览视频" },
    { kind: "image", src: "/assets/details/experience/01-overview/02.png", alt: "订单进行中项目概览素材二" },
    { kind: "image", src: "/assets/details/experience/01-overview/03.png", alt: "订单进行中项目概览素材三" },
  ],
  sectionMedia: {
    "数据洞察": [
      { kind: "image", src: "/assets/details/experience/02-insights/01.png", alt: "数据洞察素材一" },
      { kind: "video", src: "/assets/details/experience/02-insights/02.mp4", ariaLabel: "数据洞察素材二" },
      { kind: "image", src: "/assets/details/experience/02-insights/03.png", alt: "数据洞察素材三" },
    ],
    "体验思考": [
      { kind: "image", src: "/assets/details/experience/03-thinking/01.png", alt: "体验思考素材一" },
      { kind: "image", src: "/assets/details/experience/03-thinking/02.png", alt: "体验思考素材二" },
      { kind: "image", src: "/assets/details/experience/03-thinking/03.png", alt: "体验思考素材三" },
    ],
    "链路优化": [
      { kind: "image", src: "/assets/details/experience/04-flow/01.png", alt: "链路优化素材一" },
      { kind: "video", src: "/assets/details/experience/04-flow/02.mp4", ariaLabel: "链路优化素材二" },
      { kind: "image", src: "/assets/details/experience/04-flow/03.png", alt: "链路优化素材三" },
    ],
    "多业务适配": [
      { kind: "image", src: "/assets/details/experience/05-adaptation/01.png", alt: "多业务适配素材一" },
      { kind: "image", src: "/assets/details/experience/05-adaptation/02.png", alt: "多业务适配素材二" },
      { kind: "image", src: "/assets/details/experience/05-adaptation/03.png", alt: "多业务适配素材三" },
      { kind: "image", src: "/assets/details/experience/05-adaptation/04.png", alt: "多业务适配素材四" },
      { kind: "image", src: "/assets/details/experience/05-adaptation/05.png", alt: "多业务适配素材五" },
      { kind: "image", src: "/assets/details/experience/05-adaptation/06.png", alt: "多业务适配素材六" },
      { kind: "image", src: "/assets/details/experience/05-adaptation/07.png", alt: "多业务适配素材七" },
    ],
    "动效和视觉": [
      { kind: "image", src: "/assets/details/experience/06-motion/01.png", alt: "动效和视觉素材一" },
      { kind: "video", src: "/assets/details/experience/06-motion/02.mp4", ariaLabel: "动效和视觉素材二" },
      { kind: "image", src: "/assets/details/experience/06-motion/03.png", alt: "动效和视觉素材三" },
      { kind: "video", src: "/assets/details/experience/06-motion/04.mp4", ariaLabel: "动效和视觉素材四" },
      { kind: "image", src: "/assets/details/experience/06-motion/05.png", alt: "动效和视觉素材五" },
    ],
    "项目复盘": [
      { kind: "image", src: "/assets/details/experience/07-review/01.png", alt: "项目复盘素材一" },
      { kind: "image", src: "/assets/details/experience/07-review/02.png", alt: "项目复盘素材二" },
      { kind: "image", src: "/assets/details/experience/07-review/03.png", alt: "项目复盘素材三" },
    ],
  },
};

export default function ExperienceProjectPage() {
  return <ProjectDetailTemplate config={config} />;
}
