import { ProjectDetailTemplate, type ProjectDetailConfig } from "../ProjectDetailTemplate";

const config: ProjectDetailConfig = {
  eyebrow: "Building a Coze AI Agent to Refine Semantic Expression",
  title: "搭建COZE智能体重塑语义",
  subtitle: "随着业务场景持续增加，文案逐渐由不同角色分别产出，缺少统一的语义标准，不同页面在名词、语气、操作提示与情绪表达上出现明显差异，既增加用户理解成本，也让设计师需要反复进行人工检查与修改。",
  sections: ["项目背景", "设计思路", "工作流搭建", "文案输出", "沉淀与迭代"],
  summaries: [
    { title: "问题背景", body: "多角色分散产出文案，名词、语气与操作提示缺少统一标准。" },
    { title: "智能策略", body: "将语义规范、场景判断和审核逻辑沉淀到COZE智能体工作流中。" },
    { title: "提效价值", body: "减少重复检查与人工修改，让产品文案输出更稳定、更一致。" },
  ],
  media: [
    { kind: "image", src: "/assets/projects/ai.png", alt: "AI工作流设计思路示意" },
    { kind: "image", src: "/assets/projects/ai-hover.png", alt: "AI工作流搭建示意" },
    { kind: "image", src: "/assets/projects/directory.png", alt: "AI文案输出示意" },
    { kind: "image", src: "/assets/projects/ux-hover.png", alt: "AI工作流沉淀与迭代示意" },
  ],
};

export default function AiWorkflowProjectPage() {
  return <ProjectDetailTemplate config={config} />;
}
