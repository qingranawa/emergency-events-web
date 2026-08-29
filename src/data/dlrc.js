export const crisisItems = [
  ["BIO", "生化危机", "/assets/crisis/bio.webp"], ["SYS", "系统危机", "/assets/crisis/sys.png"], ["CON", "收容危机", "/assets/crisis/containment.webp"], ["SEC", "安全危机", "/assets/crisis/sec.jpg"], ["GOI", "外部组织", "/assets/crisis/goi.png"], ["WAR", "核设施危机", "/assets/crisis/war.png"], ["END", "终局危机", "/assets/crisis/end.webp"],
];

export const dlrcModules = [
  ["01", "Round Core", "回合核心 · 动态开局编制", "IMPLEMENTED", "done"], ["02", "Reinforcement Integration", "原生支援体系整合", "IMPLEMENTED", "done"], ["03", "D-LRC Evaluator", "动态响应等级评估", "IMPLEMENTED", "done"], ["04", "Crisis System", "专业危机识别与严重度", "IMPLEMENTED", "done"], ["05", "Event Director", "动态事件候选与调度", "PLANNED", "future"], ["06", "O4 Command", "指挥层信息与决策接口", "PLANNED", "future"], ["07", "Event Packs", "专业响应单位与事件体系", "PLANNED", "future"],
];

export const dlrcDemoStates = [
  { code: "DLRC-A4-BIO+SYS", population: "A", response: "L4", primary: "BIO", secondary: "SYS", score: 73, state: "失控 · UNCONTROLLED" },
  { code: "DLRC-C3-CON", population: "C", response: "L3", primary: "CON", secondary: "—", score: 58, state: "警戒 · ELEVATED" },
  { code: "DLRC-E1-SEC", population: "E", response: "L1", primary: "SEC", secondary: "—", score: 24, state: "稳定 · CONTROLLED" },
];
