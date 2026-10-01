export const m07Allocation = {
  summary: "M01 决定 Composition slot 数量；M07 在 Round Start 为这些槽位分配具体身份。总人数不变。",
  quota: "小人口 roster 使用冻结配额；更大 roster 按 70% 四舍五入，并保留至少一个 Vanilla slot。",
  examples: [
    ["D-Class", "8 slots", "6 Variant", "2 Vanilla"],
    ["Scientist", "3 slots", "2 Variant", "1 Vanilla"],
    ["Security", "4 slots", "2 Facility Guard", "2 Chaos Infiltrator"],
  ],
};

export const dClassVariants = [
  {
    id: "d9341",
    name: "D-9341 · 幸存者",
    hp: "100 HP",
    passive: "求生本能：首次致命伤害后保留 1 HP。",
    active: "紧急逃生 · CD 90 秒 / 8 秒：恢复 25 HP 并短暂提升速度。",
  },
  {
    id: "d11424-veteran",
    name: "D-11424 · 老兵",
    hp: "120 HP",
    passive: "战场经验：枪械子弹伤害降低 15%。",
    active: "压制射击 · CD 60 秒 / 8 秒：开火窗口内提升速度并获得 SCP-1853。",
  },
  {
    id: "d7294",
    name: "D-7294 · 音乐家",
    hp: "100 HP",
    passive: "节奏感：持续拥有由 M07 管理的 SCP-1853 效果。",
    active: "你滴，音乐家？ · CD 90 秒 / 10 秒：获得短暂速度提升。",
  },
  {
    id: "d00341",
    name: "D-00341 · 观察者",
    hp: "80 HP",
    passive: "数据直觉：周期提示附近的钥匙卡或重要掉落物。",
    active: "过载黑客 · CD 75 秒：强制打开准星所指的可交互门。",
  },
  {
    id: "d20384",
    name: "D-20384 · 实验狂徒",
    hp: "90 HP",
    passive: "异常适应：首次 SCP 特殊物品负面效果免疫。",
    active: "高风险试验 · CD 120 秒：消耗生命值并获得随机研究物品。",
  },
  {
    id: "d11424-lucky",
    name: "D-11424 · 倒霉幸运儿",
    hp: "85 HP",
    passive: "幸运波动：每次可处理伤害有 15% 概率完全免疫。",
    active: "背水一搏 · CD 100 秒 / 15 秒：消耗生命值并提高输出伤害。",
  },
  {
    id: "d2179",
    name: "D-2179 · 灾难幸存者",
    hp: "110 HP",
    passive: "混乱适应：核弹或 CASSIE 播报期间提升移动速度。",
    active: "绝境求生 · CD 120 秒 / 10 秒：恢复生命并降低受到的伤害。",
  },
  {
    id: "d217",
    name: "D-217 · 感染载体",
    hp: "95 HP",
    passive: "病毒宿主：死亡时对附近玩家造成一次爆炸伤害。",
    active: "感染觉醒 · CD 90 秒 / 10 秒：成功命中时附加短时中毒。",
  },
];

export const scientistVariants = {
  namedDoctors: ["Dr. Bright", "Dr. Clef", "Dr. Kondraki", "Dr. Gears"],
  namedDoctorLimit: "每局最多 1 名 NamedDoctor。",
  specialists: ["Dr. Iceberg", "Dr. Light"],
  profiles: [
    { name: "Dr. Bright", kind: "NamedDoctor", hp: "200 HP", passive: "满足资格时准备一次受保护的意识转移。", active: "异常研究 · CD 120 秒 / 20 秒：获得研究物品并短暂降低移动速度。" },
    { name: "Dr. Clef", kind: "NamedDoctor", hp: "200 HP", passive: "敌对 SCP 进入视线 10 米内时触发危险直觉。", active: "影遁 · CD 90 秒 / 8 秒：短暂隐身并提升速度。" },
    { name: "Dr. Kondraki", kind: "NamedDoctor", hp: "180 HP", passive: "击杀敌对玩家时恢复生命，最高到 150 HP。", active: "蝴蝶风暴 · CD 100 秒 / 6 秒：使 5 米内敌人视野模糊。" },
    { name: "Dr. Gears", kind: "NamedDoctor", hp: "90 HP", passive: "无被动技能。", active: "机械重构 · CD 75 秒：优先修复准星所指的门，否则获得 AHP。" },
    { name: "Dr. Iceberg", kind: "Specialist", hp: "95 HP", passive: "敌对 SCP 进入视线 10 米内时获得短暂 SCP-1344。", active: "冻结判断 · CD 80 秒 / 10 秒：暂时免疫心搏骤停并提升速度。" },
    { name: "Dr. Light", kind: "Specialist", hp: "100 HP", passive: "附近同阵营队友获得不可叠加的移动速度加成；逐人开门速度 API 受限。", active: "紧急指令 · CD 120 秒 / 10 秒：提升存活同阵营玩家伤害与速度。主动槽 2「我能不能大声说话？」· CD 120 秒 / 30 秒。" },
    { name: "Dr. Maynard", kind: "SpecialAlignment", hp: "75 HP", passive: "击杀敌对目标时增加最大生命值，最高 300 HP。", active: "实验事件 · CD 90 秒 / 15 秒：传送至收容间并进入安全模式；研究成果 · CD 60 秒：消耗生命并取得研究物品。" },
  ],
  maynard: {
    name: "Dr. Maynard",
    eligibility: ["SCP-079 在本局 opening roster", "Scientist special quota ≥ 2", "079 room 可用"],
    alignment: "BaseRole = Scientist；M07 Faction = SCP。",
    limitation: "M07 targeting、Badge 和 ability filtering 把 Maynard 视为 SCP；原生 Role.Team、friendly fire 与 winner evaluation 仍按 Scientist/Foundation 处理。",
  },
};

export const securityOpening = {
  split: "Facility Guard : Chaos Infiltrator = 1 : 1。",
  odd: "奇数 slot 成对分配后，剩余 1 个保留为 Vanilla Facility Guard。",
  chaos: "BaseRole = ChaosConscript；从 Round Start 起公开属于 Chaos faction。",
  spawn: "双方使用 HCZ Elevator A / B；每局随机交换 Guard 与 Chaos 的 A/B 位置。",
};

export const scpRoster = {
  description: "Normal SCP pool 加入三个相互独立的 SCP-939 Variant；每个 MaxPerRound = 1。",
  variants: ["SCP-939-53", "SCP-939-89", "SCP-939-101"],
  note: "三种 Variant 可以同局出现；不会额外增加 SCP slot。旧的 939 两只上限不适用于 M07 opening allocator。",
};

export const scp939Variants = [
  {
    id: "939-53",
    name: "SCP-939-53",
    hp: "2700 HP",
    passive: "迅捷伏击：静止 3 秒后，下一次攻击 +15%。",
    active: "隐秘潜伏：CD 50 秒；持续 15 秒；Fade / SCP-1344。",
  },
  {
    id: "939-89",
    name: "SCP-939-89",
    hp: "3200 HP",
    passive: "野性压制：命中后目标移动速度 −10%，持续 3 秒；刷新时长，不叠加。",
    active: "无主动技能。",
  },
  {
    id: "939-101",
    name: "SCP-939-101",
    hp: "3000 HP",
    passive: "残肢再生：脱战 3 秒后，每 2 秒恢复 5 HP。",
    secondary: "恐惧散布：敌人首次进入 3 米范围触发一次短暂控制。群体协同：同 Zone 有其他存活 939 时，移动速度 +10%、伤害 +3%；不叠加。",
    active: "残肢突袭：CD 45 秒；Dash 4 米；35 伤害与物理 impulse。",
  },
];

export const scpAugmentations = [
  {
    id: "scp096",
    name: "SCP-096",
    base: "3200 HP",
    enhancement: "狂怒期间移动速度 +13%。",
  },
  {
    id: "scp049",
    name: "SCP-049",
    base: "3700 HP",
    enhancement: "被动 SCP-1344 lease；主动 Slot 1「疫病弥漫」：CD 90 秒、持续 45 秒、每秒 tick 8 HP，作用于当前 Room 内敌对存活人类。",
    note: "污染是 Room WorldEffect，不是玩家 Buff；049 死亡不会单独结束污染。",
  },
  {
    id: "scp106",
    name: "SCP-106",
    base: "3200 HP",
    enhancement: "移动速度 +15%。",
    note: "耐力消耗 −5%：UNSUPPORTED BY CURRENT ROLE/API。",
  },
  {
    id: "scp079",
    name: "SCP-079",
    base: "接入 Level 2",
    enhancement: "Auxiliary Power 消耗 −5%；合法正向 XP grant 每次额外 +5 XP。",
    note: "Level 4 room blackout AP cost = 0，但原生次数上限仍保留。Level 5 Area Blackout / Area Lockdown AP cost = 50%。",
  },
  {
    id: "scp173",
    name: "SCP-173",
    base: "5000 HP",
    enhancement: "视力疲劳：Blink cooldown ×0.70；正常 snap 击杀后，对 2 米内敌对 human 造成其 Current HP ×50%。",
    note: "门增强只使用原生 BreakableDoor 流程；不破坏 Unbreakable Gate 或特殊不可破门。",
  },
  {
    id: "scp0492",
    name: "SCP-049-2",
    base: "700 HP；玩家转为 049-2 时由 M07 attach。",
    enhancement: "专属 COM-15、30 发 9mm reserve；M07 跟踪 item serial，不可丢弃，只为专属枪补 reserve。",
    note: "装备、实际射击和补弹仍需 LIVE SERVER VALIDATION。",
  },
];

export const scp0492Details = [
  ["作战协同", "049 成功释放疫病弥漫后，存活 049-2 持续 10 秒获得移动速度 +5%、伤害 +3%；刷新时长，不叠加。"],
  ["立长立贤", "049 死亡后，从存活 049-2 中选择 HP 最高者；并列按 PlayerId ascending。"],
  ["HP inheritance", "初代 049 为 3700 HP；后续继承上一代起始 HP 的一半，最低 250 HP。示例：3700 → 1850 → 925 → 462.5 → 250 → 250…"],
];

export const abilityRuntime = {
  slots: ["Active Slot 1", "Active Slot 2", "Active Slot 3"],
  limit: "M07 active abilities 最多三个逻辑槽位。",
  binding: "SSS → Binding Service → Active Slot → Ability Runtime → Ability。",
  physicalKey: "玩家在 SSS 自行绑定按键；Ability 只接收逻辑槽位，不依赖 F、3 或 Mouse4 等物理按键。",
};

export const sharedHud = {
  flow: "Module → HUD Fragment → SharedPlayerHudService → Compose → Hint",
  fields: ["Role identity", "Faction", "Passive", "Active", "Keybind", "Cooldown"],
  timing: "Spawn 展示详细版；之后使用 Compact HUD。",
};

export const badgeRules = {
  ordinary: "普通 Variant：AlliesOnly；Overhead = true；Player List = false。",
  ordinaryExamples: ["D-9341", "SCP-939-53", "Dr. Iceberg", "Chaos Infiltrator"],
  global: ["Four Horsemen", "Dr. Maynard"],
  globalStatus: "Global Overhead 已实现；Global Player List gameplay projection 受 API 阻塞，等待安全 API 支持。",
};

export const worldEffectContract = {
  scope: "Room scope。",
  metadata: ["EffectId", "InstanceId", "RoundId", "Owner", "Source Variant", "Tags", "Start", "End", "Active", "Cleanseable", "Cleanup reason"],
  tags: ["Biohazard", "Contamination", "RoomPersistent", "Scp049", "Cleanseable"],
  lifecycle: ["Duration end", "Cleanse", "Round End", "Plugin cleanup"],
  contract: "未来 BIO role、明确获准的 MTF 或 Event 通过 IWorldEffectService.TryCleanse(..., AllowedTags) 请求清理；不需要引用 SCP-049 effect 的具体类型。",
};

export const m07ImplementationNotes = [
  ["Bright possession / body transfer", "BLOCKED", "缺少安全的原子玩家身体/控制/物品交换 API。"],
  ["Global gameplay Player List Badge", "BLOCKED", "不能安全覆盖 staff/server Rank；Global Overhead 已实现。"],
  ["Dr. Light per-player door interaction speed", "BLOCKED", "没有可用的 per-player interaction-rate modifier。"],
  ["SCP-106 stamina modifier", "UNSUPPORTED", "当前角色/API 没有通用 stamina drain surface。"],
  ["SCP-079 Level 4 blackout usage cap removal", "UNSUPPORTED", "native capacity 为只读；AP cost 可降为 0。"],
  ["Multi-939 simultaneous live behavior", "LIVE VALIDATION PENDING", "Static path checked；dedicated server 尚未验证。"],
  ["049-2 COM-15 runtime", "LIVE VALIDATION PENDING", "需要真实 server/client 验证装备、射击与 reserve ammo。"],
  ["SCP-049 room tint", "LIVE VALIDATION PENDING", "尝试通过 room visual lease 设置低饱和绿色；无法安全 lease 时跳过 tint。"],
];

export const m07Validation = {
  phaseCommits: [
    "Phase 1 · c3b882340e11e0be3327ba1ab5178620eebc37b0",
    "Phase 2 · e052675018b1c76321eaebf53f9775248bc3af05",
    "Phase 3 · db30b93de1bc45198b3d5ae3db19bf1a3eddaa5c",
  ],
  logic: "313 / 313 custom logic tests passed（plugin docs 当前 baseline）。",
  build: "正式插件 build 与 RuntimeHarness build 因缺少 SCP:SL / EXILED Managed assemblies 而 BLOCKED。",
  live: "Live server smoke test 与真实玩家验证尚未运行。",
};
