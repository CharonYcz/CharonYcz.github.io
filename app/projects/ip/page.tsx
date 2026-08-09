import { ProjectDetailTemplate, type ProjectDetailConfig } from "../ProjectDetailTemplate";

const config: ProjectDetailConfig = {
  eyebrow: "Empowering Brand Value Through IP Revitalization Across All Touchpoints",
  title: "IP改造赋能，全场景品牌价值渗透",
  subtitle: "统一IP视觉表达，沉淀标准化设计资产，提升多场景应用与团队复用效率。",
  sections: ["需求分析", "用研与竞品", "AI介入工作流", "完整资产输出", "案例与复盘"],
  summaries: [
    { title: "改造目标", body: "统一IP角色的核心特征与视觉语言，建立稳定、易识别的品牌表达。" },
    { title: "设计方式", body: "结合竞品研究与AI辅助工作流，提高角色探索、延展和资产生产效率。" },
    { title: "资产价值", body: "形成可复用的标准资产，支持产品、运营与传播等多触点快速落地。" },
  ],
  media: [
    { kind: "image", src: "/assets/projects/ip.png", alt: "IP用研与竞品示意" },
    { kind: "image", src: "/assets/projects/ip-hover.png", alt: "IP的AI介入工作流示意" },
    { kind: "image", src: "/assets/projects/directory.png", alt: "IP完整资产输出示意" },
    { kind: "image", src: "/assets/projects/ai.png", alt: "IP案例与复盘示意" },
  ],
};

export default function IpProjectPage() {
  return <ProjectDetailTemplate config={config} />;
}
