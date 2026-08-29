export const factionIndex = [
  { id: "foundation", code: "FOUNDATION", label: "基金会", type: "containment" },
  { id: "mtf", code: "MTF / AMTF", label: "行动单位", type: "unit" },
  { id: "chaos", code: "CHAOS INSURGENCY", label: "混沌分队", type: "cell" },
  { id: "goc", code: "GOC", label: "全球超自然联盟", type: "coalition" },
  { id: "uiu", code: "FBI / UIU", label: "异常事件组", type: "government" },
  { id: "anomalies", code: "ANOMALOUS ENTITIES", label: "异常实体", type: "anomaly" },
];

export const foundationConcepts = [
  { code: "RESEARCH", title: "研究", description: "分析异常性质，建立可复用的处置知识。" },
  { code: "CONTAINMENT", title: "收容", description: "把异常影响限制在可管理的设施与程序内。" },
  { code: "SECURITY", title: "安保", description: "控制人员、权限和现场秩序，降低扩散风险。" },
  { code: "MOBILE FORCE", title: "机动部队", description: "将专门训练的单位部署到特定威胁或条件。" },
];

export const mtfRows = [
  { code: "MTF", title: "Mobile Task Force", text: "基金会语境中常见的专门行动单位，用于特定威胁或任务条件。" },
  { code: "AMTF", title: "Armed Mobile Task Force", text: "部分文章或设定采用的 Armed 变体，并非跨作品统一的正式层级。" },
  { code: "SCOPE", title: "任务范围", text: "单位名称、编号与职责依具体作品和任务而定，不能据此推导统一战力排名。" },
];

export const chaosCells = [
  { code: "DELTA", title: "Delta Command", text: "常见设定中的核心协调层" },
  { code: "CELL / R&D", title: "研究与军事分队", text: "独立单元按目标、资源和机会行动" },
  { code: "OUTER CELLS", title: "外层单元", text: "分散、可替换，保持网络韧性" },
];

export const gocDivisions = [
  { code: "PHYSICS", title: "物理学部", text: "处理超自然与物理现实的交界问题" },
  { code: "PSYCHE", title: "心智部", text: "关注认知、心理与意识影响" },
  { code: "PTOLEMY", title: "异常空间部", text: "处理空间、维度与相关异常" },
  { code: "CAULATICA", title: "技术部", text: "研究可用于任务的异常技术" },
  { code: "PNEUMA", title: "生命部", text: "聚焦生命、灵魂与生物异常" },
  { code: "PANGAEA", title: "地球部", text: "关注生态、地质与全球层面的异常" },
];

export const gocMission = [
  "SURVIVAL",
  "CONCEALMENT",
  "PROTECTION",
  "DESTRUCTION",
  "EDUCATION",
];

export const uiuRows = [
  { code: "FEDERAL", title: "联邦辖区", text: "UIU 属于美国联邦调查体系，受法律、预算与监督约束。" },
  { code: "PARANORMAL", title: "异常执法", text: "调查与处理超自然或异常相关案件，而非统领整个异常世界。" },
  { code: "CONTEXT", title: "设定差异", text: "UIU 的资源与能力会因文章和故事语境变化，页面只保留稳定共识。" },
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
  ["基金会", "秘密组织", "研究、收容、安保", "否", "收容与研究", "核心概念稳定，具体设定依作品变化"],
  ["MTF / AMTF", "行动单位", "特定威胁部署", "否", "执行任务", "AMTF 不是跨作品统一层级"],
  ["混沌", "分散网络", "渗透、夺取、破坏", "否", "按单元行动", "起源与组织方式存在多种解释"],
  ["GOC", "国际联盟", "超自然事务与人类安全", "部分", "保护、研究、行动", "部门与五重使命有明确常见框架"],
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
