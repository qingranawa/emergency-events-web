export const crisisItems = [
  ["BIO", "生化危机", "/assets/crisis/bio.webp"], ["SYS", "系统控制危机", "/assets/crisis/sys.png"], ["CON", "收容危机", "/assets/crisis/containment.webp"], ["SEC", "安全危机", "/assets/crisis/sec.jpg"], ["GOI", "外部组织介入", "/assets/crisis/goi.png"], ["WAR", "核设施危机", "/assets/crisis/war.png"], ["END", "终局状态", "/assets/crisis/end.webp"],
];

export const dlrcModules = [
  ["01", "回合核心", "回合核心 · 开局人口与编制", "IMPLEMENTED", "done"], ["02", "原版增援接入", "原版支援流程接入", "IMPLEMENTED", "done"], ["03", "响应判断", "响应等级评估", "IMPLEMENTED", "done"], ["04", "危机识别", "专业危机识别", "IMPLEMENTED", "done"], ["05", "事件筛选", "事件候选与调度", "PLANNED", "future"], ["06", "观察者面板", "观察者信息与选择接口", "PLANNED", "future"], ["07", "事件内容包", "专业响应单位与事件内容", "PLANNED", "future"],
];

export const dlrcDemoStates = [
  { code: "DLRC-A4-BIO+SYS", population: "A", response: "L4", primary: "BIO", secondary: "SYS", score: 73, state: "失控" },
  { code: "DLRC-C3-CON", population: "C", response: "L3", primary: "CON", secondary: "—", score: 58, state: "警戒" },
  { code: "DLRC-E1-SEC", population: "E", response: "L1", primary: "SEC", secondary: "—", score: 24, state: "稳定" },
];
