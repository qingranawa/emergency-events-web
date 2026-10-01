export const crisisItems = [
  ["BIO", "生化危机", "/assets/crisis/bio.webp"], ["SYS", "系统控制危机", "/assets/crisis/sys.png"], ["CON", "收容危机", "/assets/crisis/containment.webp"], ["SEC", "安全危机", "/assets/crisis/sec.jpg"], ["GOI", "外部组织介入", "/assets/crisis/goi.png"], ["WAR", "核设施危机", "/assets/crisis/war.png"], ["END", "终局状态", "/assets/crisis/end.webp"],
];

export const dlrcModules = [
  ["M01", "Round Core", "回合生命周期、PopulationTier 与 opening slot quantities", "IMPLEMENTED", "done"],
  ["M02", "Reinforcement Integration", "保留原版 Primary Wave 并记录实际波次事实", "IMPLEMENTED", "done"],
  ["M03", "D-LRC Evaluator", "响应等级、Control cap 与正式 DLRC Code", "IMPLEMENTED", "done"],
  ["M04", "Crisis System", "七类 Crisis Tags 与 Episode 生命周期", "IMPLEMENTED", "done"],
  ["M04.5", "Facility Disorder Index", "0–100 历史失序状态与 settlement/recovery", "IMPLEMENTED", "done"],
  ["M05", "Event Director", "候选资格、来源仲裁、Revalidate 与 Commit", "IMPLEMENTED", "done"],
  ["M06", "O4 Panel", "有限 Foundation shortlist 的选择面板与运行时接口", "LIVE VALIDATION PENDING", "observe"],
  ["M07", "Opening Role & Ability", "开局身份、Role Variant、Ability、HUD、Badge 与 WorldEffect", "LOGIC TESTED · LIVE VALIDATION PENDING", "observe"],
  ["—", "Event Pack", "生产 EventDefinition 与实际事件玩法内容", "IN DEVELOPMENT", "future"],
];

export const dlrcDemoStates = [
  { code: "DLRC-A4-BIO+SYS", population: "A", response: "L4", primary: "BIO", secondary: "SYS", score: 73, state: "失控" },
  { code: "DLRC-C3-CON", population: "C", response: "L3", primary: "CON", secondary: "—", score: 58, state: "警戒" },
  { code: "DLRC-E1-SEC", population: "E", response: "L1", primary: "SEC", secondary: "—", score: 24, state: "稳定" },
];
