export const factionIndex = [
  { id: "foundation", code: "FOUNDATION", label: "基金会", type: "containment" },
  { id: "mtf", code: "MTF / AMTF", label: "行动单位", type: "unit" },
  { id: "chaos", code: "CHAOS INSURGENCY", label: "混沌分队", type: "cell" },
  { id: "goc", code: "GOC", label: "全球超自然联盟", type: "coalition" },
  { id: "uiu", code: "FBI / UIU", label: "异常事件组", type: "government" },
  { id: "anomalies", code: "ANOMALOUS ENTITIES", label: "异常实体", type: "anomaly" },
];

export const foundationConcepts = [
  { code: "RESEARCH", title: "研究", description: "研究异常性质，积累可复用的处置知识。" },
  { code: "CONTAINMENT", title: "收容", description: "把异常影响限制在可管理的设施和流程内。" },
  { code: "SECURITY", title: "安保", description: "控制人员、权限和现场秩序，尽量减少扩散。" },
  { code: "MOBILE FORCE", title: "机动部队", description: "把受过专门训练的单位派往特定威胁现场。" },
];

export const mtfRows = [
  { code: "MTF", title: "机动特遣队", text: "基金会常见的专门行动单位，用于处理特定威胁或任务。" },
  { code: "AMTF", title: "武装机动特遣队", text: "部分文章使用的武装变体，不是跨作品统一的正式层级。" },
  { code: "SCOPE", title: "任务范围", text: "单位名称、编号和职责要看具体作品与任务，不能拿来排统一战力。" },
];

export const chaosCells = [
  { code: "DELTA", title: "Delta Command", text: "常见设定里的协调层" },
  { code: "CELL / R&D", title: "研究与军事分队", text: "独立单元按目标、资源和机会行动" },
  { code: "OUTER CELLS", title: "外层单元", text: "分散、可替换，让网络更难被一次摧毁" },
];

export const gocDivisions = [
  { code: "PHYSICS", title: "物理学部", text: "处理超自然与物理现实的交界问题" },
  { code: "PSYCHE", title: "心智部", text: "关注认知、心理和意识影响" },
  { code: "PTOLEMY", title: "异常空间部", text: "处理空间、维度和相关异常" },
  { code: "CAULATICA", title: "技术部", text: "研究可以用于任务的异常技术" },
  { code: "PNEUMA", title: "生命部", text: "关注生命、灵魂和生物异常" },
  { code: "PANGAEA", title: "地球部", text: "关注生态、地质和全球层面的异常" },
];

export const gocMission = [
  "SURVIVAL",
  "CONCEALMENT",
  "PROTECTION",
  "DESTRUCTION",
  "EDUCATION",
];

export const uiuRows = [
  { code: "FEDERAL", title: "联邦辖区", text: "UIU 属于美国联邦调查体系，受法律、预算和监督约束。" },
  { code: "PARANORMAL", title: "异常执法", text: "调查和处理超自然或异常案件，不负责统领整个异常世界。" },
  { code: "CONTEXT", title: "设定差异", text: "资源和能力会随文章、故事语境变化，页面只保留较稳定的共识。" },
];

export const anomalyTypes = [
  "HUMANOID",
  "BIOLOGICAL",
  "COGNITOHAZARD",
  "REALITY-ALTERING",
  "OBJECT",
  "PHENOMENON",
];

export const factionComparison = [
  ["基金会", "秘密组织", "研究、收容、安保", "否", "收容与研究", "核心概念稳定，具体设定随作品变化"],
  ["MTF / AMTF", "行动单位", "特定威胁部署", "否", "执行任务", "AMTF 不是跨作品统一层级"],
  ["混沌", "分散网络", "渗透、夺取、破坏", "否", "按单元行动", "起源与组织方式存在多种解释"],
  ["GOC", "国际联盟", "超自然事务与人类安全", "部分", "保护、研究、行动", "部门和五重使命有较明确的常见框架"],
  ["UIU", "联邦机构", "异常执法与调查", "是", "调查与执法", "FBI 体系内的异常事件单位"],
  ["异常实体", "现象集合", "依实体性质而定", "否", "不可预设", "没有统一指挥或共同目标"],
];

export const factionSources = [
  { label: "About the SCP Foundation", url: "https://scp-wiki.wikidot.com/about-the-scp-foundation" },
  { label: "SCP Glossary", url: "https://scp-wiki.wikidot.com/glossary-of-terms" },
  { label: "Global Occult Coalition Hub", url: "https://scp-wiki.wikidot.com/goc-hub-page" },
  { label: "Chaos Insurgency Hub", url: "https://scp-wiki.wikidot.com/chaos-insurgency-hub" },
  { label: "Unusual Incidents Unit Hub", url: "https://scp-wiki.wikidot.com/unusual-incidents-unit-hub" },
  { label: "Dummy’s Guide to Licenses", url: "https://scp-wiki.wikidot.com/guia-licencias-de-archivos" },
];
