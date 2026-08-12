import { ProjectDetailTemplate, type ProjectDetailConfig } from "../ProjectDetailTemplate";

const config: ProjectDetailConfig = {
  projectId: "ai-workflow",
  eyebrow: "Building a Coze AI Agent to Refine Semantic Expression",
  title: "搭建COZE智能体重塑语义",
  titleHighlight: "COZE智能体",
  subtitle: "随着业务场景持续增加，文案逐渐由不同角色分别产出，缺少统一的语义标准，不同页面在名词、语气、操作提示与情绪表达上出现明显差异，既增加用户理解成本，也让设计师需要反复进行人工检查与修改。",
  theme: {
    accent: "#00FBD0",
    sidebarStart: "rgba(6, 42, 40, 0.8)",
    sidebarEnd: "rgba(5, 19, 20, 0.8)",
    sidebarBorder: "rgba(52, 255, 219, 0.22)",
    activeStart: "rgba(0, 251, 208, 0.27)",
    activeEnd: "rgba(0, 100, 85, 0.16)",
    cardStart: "rgba(7, 82, 77, 0.8)",
    cardEnd: "rgba(5, 38, 39, 0.8)",
    cardBorder: "rgba(0, 251, 208, 0.2)",
  },
  sections: ["项目背景", "设计思路", "工作流搭建", "文案输出", "沉淀与迭代"],
  summaries: [
    { title: "问题背景", body: "多角色分散产出文案，名词、语气与操作提示缺少统一标准。" },
    { title: "智能策略", body: "将语义规范、场景判断和审核逻辑沉淀到COZE智能体工作流中。" },
    { title: "提效价值", body: "减少重复检查与人工修改，让产品文案输出更稳定、更一致。" },
  ],
  overviewMedia: [
    { kind: "image", src: "/assets/details/ai-workflow/01-background/01.png", alt: "AI工作流项目背景素材一" },
  ],
  sectionMedia: {
    "设计思路": [
      { kind: "image", src: "/assets/details/ai-workflow/02-thinking/01.png", alt: "设计思路素材一" },
      { kind: "video", src: "/assets/details/ai-workflow/02-thinking/02.mp4", ariaLabel: "设计思路素材二" },
      { kind: "image", src: "/assets/details/ai-workflow/02-thinking/03.png", alt: "设计思路素材三" },
    ],
    "工作流搭建": [
      { kind: "image", src: "/assets/details/ai-workflow/03-workflow/01.png", alt: "工作流搭建素材一" },
      { kind: "video", src: "/assets/details/ai-workflow/03-workflow/02.mp4", ariaLabel: "工作流搭建素材二" },
      { kind: "image", src: "/assets/details/ai-workflow/03-workflow/03.png", alt: "工作流搭建素材三" },
    ],
    "文案输出": [
      { kind: "image", src: "/assets/details/ai-workflow/04-copy/01.png", alt: "文案输出素材一" },
      { kind: "image", src: "/assets/details/ai-workflow/04-copy/02.png", alt: "文案输出素材二" },
    ],
    "沉淀与迭代": [
      { kind: "image", src: "/assets/details/ai-workflow/05-iteration/01.png", alt: "沉淀与迭代素材一" },
      { kind: "video", src: "/assets/details/ai-workflow/05-iteration/02.mp4", ariaLabel: "沉淀与迭代素材二" },
    ],
  },
};

export default function AiWorkflowProjectPage() {
  return <ProjectDetailTemplate config={config} />;
}
