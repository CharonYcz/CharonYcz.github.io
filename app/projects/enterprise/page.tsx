import { ProjectDetailTemplate, type ProjectDetailConfig } from "../ProjectDetailTemplate";

const config: ProjectDetailConfig = {
  eyebrow: "Enterprise Business System Integration and Efficiency-FocusedExperience Optimization",
  title: "企业级业务系统整合与效率体验优化",
  subtitle: "随着企业业务发展，CRM、IM、HRM、OA等系统在不同阶段独立建设，形成多个入口和数据孤岛，导致操作路径分散、交互规则不统一、信息检素效率低，影响员工日常工作效率与体验。",
  sections: ["需求分析和背景", "用研与体验策略", "设计体系搭建", "方案输出思路", "项目复盘和更多"],
  summaries: [
    { title: "整合背景", body: "多个业务系统独立建设，入口、规则与数据结构分散，增加员工使用与查找成本。" },
    { title: "体验策略", body: "统一任务入口、信息架构与交互规则，围绕高频工作链路提升操作效率。" },
    { title: "业务价值", body: "降低跨系统切换和学习成本，沉淀可复用的企业级产品设计体系。" },
  ],
  media: [
    { kind: "image", src: "/assets/projects/crm.png", alt: "中后台用研与体验策略示意" },
    { kind: "image", src: "/assets/projects/crm-hover.png", alt: "中后台设计体系搭建示意" },
    { kind: "image", src: "/assets/projects/directory.png", alt: "中后台方案输出思路示意" },
    { kind: "image", src: "/assets/projects/ux.png", alt: "中后台项目复盘示意" },
  ],
};

export default function EnterpriseProjectPage() {
  return <ProjectDetailTemplate config={config} />;
}
