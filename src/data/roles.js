const allyBadge = {
  visibility: "AlliesOnly",
  overhead: "阵营队友可见",
  playerList: "不投影至玩家列表",
};

const globalBadge = {
  visibility: "Global Overhead",
  overhead: "全局头顶标识已实现",
  playerList: "玩家列表投影等待安全 API",
};

const noVariantBadge = {
  visibility: "无额外 Variant Badge",
  overhead: "使用原生 SCP 身份展示",
  playerList: "不添加 gameplay projection",
};

const dossier = (profile) => ({
  passives: [],
  actives: [],
  mechanics: [],
  notes: [],
  ...profile,
});

export const roleDossiers = [
  dossier({
    id: "d9341", category: "d-class", name: "D-9341 · 幸存者", roleType: "D-Class Role Variant", baseRole: "ClassD", faction: "D-Class", health: "100 HP", badge: allyBadge,
    passives: ["求生本能：每条生命首次遭受致命伤害时保留 1 HP。"],
    actives: [{ slot: "Active Slot 1", name: "紧急逃生", detail: "CD 90 秒；恢复 25 HP，并在 8 秒内提升移动速度 30%。" }],
  }),
  dossier({
    id: "d11424-veteran", category: "d-class", name: "D-11424 · 老兵", roleType: "D-Class Role Variant", baseRole: "ClassD", faction: "D-Class", health: "120 HP", badge: allyBadge,
    passives: ["战场经验：受到枪械子弹伤害降低 15%。"],
    actives: [{ slot: "Active Slot 1", name: "压制射击", detail: "CD 60 秒；触发 8 秒射击窗口，开火时获得 SCP-1853 与 15% 移动速度加成，效果最多持续 5 秒。" }],
  }),
  dossier({
    id: "d7294", category: "d-class", name: "D-7294 · 音乐家", roleType: "D-Class Role Variant", baseRole: "ClassD", faction: "D-Class", health: "100 HP", badge: allyBadge,
    passives: ["节奏感：持续获得由 M07 管理的 SCP-1853 效果。"],
    actives: [{ slot: "Active Slot 1", name: "你滴，音乐家？", detail: "CD 90 秒；持续 10 秒，移动速度提高 25%。" }],
  }),
  dossier({
    id: "d00341", category: "d-class", name: "D-00341 · 观察者", roleType: "D-Class Role Variant", baseRole: "ClassD", faction: "D-Class", health: "80 HP", badge: allyBadge,
    passives: ["数据直觉：周期性提示 8 米范围内可识别的钥匙卡或重要掉落物。", "具备 3 米范围内的目标门交互判定。"],
    actives: [{ slot: "Active Slot 1", name: "过载黑客", detail: "CD 75 秒；对准符合条件的门可强制开门，并使目标减速 10 秒。" }],
  }),
  dossier({
    id: "d20384", category: "d-class", name: "D-20384 · 实验狂徒", roleType: "D-Class Role Variant", baseRole: "ClassD", faction: "D-Class", health: "90 HP", badge: allyBadge,
    passives: ["异常适应：只对当前识别到的 SCP-207 / SCP-018 负面效果路径进行适应；不覆盖所有 SCP 物品效果。"],
    actives: [{ slot: "Active Slot 1", name: "高风险试验", detail: "CD 120 秒；消耗 20 HP，从启用的研究物品池中随机获得 SCP-207、018、268 或 1853。" }],
  }),
  dossier({
    id: "d11424-lucky", category: "d-class", name: "D-11424 · 倒霉幸运儿", roleType: "D-Class Role Variant", baseRole: "ClassD", faction: "D-Class", health: "85 HP", badge: allyBadge,
    passives: ["幸运波动：对受支持的伤害判定有 15% 概率完全免疫。"],
    actives: [{ slot: "Active Slot 1", name: "背水一搏", detail: "CD 100 秒；消耗 20 HP，在 15 秒内提高伤害 20%。" }],
    notes: [{ status: "SOURCE NOTE", text: "D-11424 与老兵共用源概念编号；内部 VariantId 不同，页面保留原编号。" }],
  }),
  dossier({
    id: "d2179", category: "d-class", name: "D-2179 · 灾难幸存者", roleType: "D-Class Role Variant", baseRole: "ClassD", faction: "D-Class", health: "110 HP", badge: allyBadge,
    passives: ["混乱适应：Alpha Warhead 或 CASSIE 播报窗口期间，移动速度提高 10%。"],
    actives: [{ slot: "Active Slot 1", name: "绝境求生", detail: "CD 120 秒；恢复 15 HP，并在 10 秒内降低受到的伤害 15%。" }],
  }),
  dossier({
    id: "d217", category: "d-class", name: "D-217 · 感染载体", roleType: "D-Class Role Variant", baseRole: "ClassD", faction: "D-Class", health: "95 HP", badge: allyBadge,
    passives: ["病毒宿主：死亡时在 5 米范围造成一次最高 500 点的爆炸伤害；符合条件的直接爆炸击杀可转化为 SCP-049-2。"],
    actives: [{ slot: "Active Slot 1", name: "感染觉醒", detail: "CD 90 秒；启动 10 秒。命中可处理的敌对目标时造成每秒 2 HP、持续 5 秒的毒性伤害；再次触发刷新时长，不叠加。" }],
  }),
  dossier({
    id: "bright", category: "scientist", name: "Dr. Bright", roleType: "NamedDoctor", baseRole: "Scientist", faction: "Foundation", health: "200 HP", badge: globalBadge,
    passives: ["意识转移目标搜索半径 15 米；转移前再次验证目标状态，设计上要求 8 秒 revalidation。"],
    actives: [{ slot: "Active Slot 1", name: "异常研究", detail: "CD 120 秒；取得研究物品，并在 20 秒内降低移动速度 10%。" }],
    notes: [{ status: "BLOCKED", text: "玩家身体、控制权与物品的安全原子交换 API 不可用；意识转移暂不能执行。" }],
  }),
  dossier({
    id: "clef", category: "scientist", name: "Dr. Clef", roleType: "NamedDoctor", baseRole: "Scientist", faction: "Foundation", health: "200 HP", badge: globalBadge,
    passives: ["危险直觉：敌对 SCP 在 10 米内且处于视线时，获得 SCP-1344，持续 10 秒；内部触发间隔 40 秒。"],
    actives: [{ slot: "Active Slot 1", name: "影遁", detail: "CD 90 秒；持续 8 秒，获得 Fade 与 15% 移动速度加成。攻击或交互会打断效果。" }],
  }),
  dossier({
    id: "kondraki", category: "scientist", name: "Dr. Kondraki", roleType: "NamedDoctor", baseRole: "Scientist", faction: "Foundation", health: "180 HP", badge: globalBadge,
    passives: ["击杀敌对目标恢复 10 HP；恢复上限为 150 HP。"],
    actives: [{ slot: "Active Slot 1", name: "蝴蝶风暴", detail: "CD 100 秒；使 5 米范围内目标视野模糊 6 秒。" }],
  }),
  dossier({
    id: "gears", category: "scientist", name: "Dr. Gears", roleType: "NamedDoctor", baseRole: "Scientist", faction: "Foundation", health: "90 HP", badge: globalBadge,
    passives: ["无专属被动效果。"],
    actives: [{ slot: "Active Slot 1", name: "机械重构", detail: "CD 75 秒；优先修复或解锁准星指向的合资格门；无法处理时获得 20 AHP。" }],
  }),
  dossier({
    id: "iceberg", category: "scientist", name: "Dr. Iceberg", roleType: "Specialist", baseRole: "Scientist", faction: "Foundation", health: "95 HP", badge: allyBadge,
    passives: ["敌对 SCP 在 10 米内且处于视线时获得 SCP-1344，持续 5 秒；内部触发间隔 60 秒。"],
    actives: [{ slot: "Active Slot 1", name: "冻结判断", detail: "CD 80 秒；持续 10 秒，免疫心搏骤停并提高移动速度 10%。" }],
  }),
  dossier({
    id: "light", category: "scientist", name: "Dr. Light", roleType: "Specialist", baseRole: "Scientist", faction: "Foundation", health: "100 HP", badge: allyBadge,
    passives: ["10 米内同阵营队友获得不可叠加的 5% 移动速度加成。"],
    actives: [
      { slot: "Active Slot 1", name: "紧急指令", detail: "CD 120 秒；持续 10 秒，为存活同阵营队友提供 10% 伤害与移动速度加成。" },
      { slot: "Active Slot 2", name: "我能不能大声说话？", detail: "CD 120 秒；持续 30 秒，通过 Intercom API 请求麦克风权限；服务器能力不满足时可能返回 VoiceRoutingUnavailable。" },
    ],
    notes: [{ status: "BLOCKED", text: "逐玩家开门速度调整缺少可用的交互速率 API。" }],
  }),
  dossier({
    id: "maynard", category: "scientist", name: "Dr. Maynard", roleType: "SpecialAlignment", baseRole: "Scientist", faction: "SCP", health: "75 HP", badge: globalBadge,
    passives: ["资格：SCP-079 在场、Scientist special quota ≥ 2 且 079 room 可用。", "击杀敌对目标后按角色 tier 提升最大生命值，增量为 2 / 3 / 5 / 6 / 8，最高 300 HP。"],
    actives: [
      { slot: "Active Slot 1", name: "实验事件", detail: "CD 90 秒；传送至合资格收容间并进入 15 秒安全模式：期间不能受到伤害，也不能攻击。" },
      { slot: "Active Slot 2", name: "研究成果", detail: "CD 60 秒；消耗 20 HP 并从研究物品池选择物品。能力不可用或背包已满时不扣生命、不消耗冷却。" },
    ],
    mechanics: ["出生配备 COM-15、30 发弹药与随机 Research SCP item。", "M07 targeting、Badge 与 ability filtering 按 SCP 身份处理 Maynard。"],
    notes: [{ status: "BOUNDARY", text: "原生 SCP:SL Role.Team、friendly fire 与 winner evaluation 仍按 BaseRole Scientist / Foundation 处理；不代表已成为原生 SCP 阵营角色。" }],
  }),
  dossier({
    id: "chaos-infiltrator", category: "security", name: "Chaos Infiltrator", roleType: "Security Opening Identity", baseRole: "ChaosConscript", faction: "Chaos", health: "Vanilla BaseRole", badge: allyBadge,
    passives: ["从 Round Start 起就是公开的 Chaos faction，不是秘密叛徒，也不伪装成 Guard。"],
    actives: [],
    mechanics: ["与 Facility Guard 按 1:1 分配 Security opening slots；奇数剩余 slot 留给 Vanilla Facility Guard。", "双方从 HCZ Elevator A / B 出生，每局随机交换 A/B 位置；一局内固定。"],
  }),
  dossier({
    id: "scp939-53", category: "scp-939", name: "SCP-939-53", roleType: "SCP Role Variant", baseRole: "SCP-939", faction: "SCP", health: "2700 HP", badge: allyBadge,
    passives: ["迅捷伏击：静止 3 秒后，下一次攻击伤害提高 15%。"],
    actives: [{ slot: "Active Slot 1", name: "隐秘潜伏", detail: "CD 50 秒；持续 15 秒，获得 Fade 与 SCP-1344。" }],
  }),
  dossier({
    id: "scp939-89", category: "scp-939", name: "SCP-939-89", roleType: "SCP Role Variant", baseRole: "SCP-939", faction: "SCP", health: "3200 HP", badge: allyBadge,
    passives: ["野性压制：命中后使目标移动速度降低 10%，持续 3 秒；再次命中刷新时长，不叠加。"],
    actives: [],
  }),
  dossier({
    id: "scp939-101", category: "scp-939", name: "SCP-939-101", roleType: "SCP Role Variant", baseRole: "SCP-939", faction: "SCP", health: "3000 HP", badge: allyBadge,
    passives: ["残肢再生：脱战 3 秒后，每 2 秒恢复 5 HP。", "恐惧散布：敌人首次进入 3 米范围触发 0.5 秒控制；持续停留不会重复触发。", "群体协同：同 Zone 存在其他存活 939 时，移动速度 +10%、伤害 +3%；不叠加。"],
    actives: [{ slot: "Active Slot 1", name: "残肢突袭", detail: "CD 45 秒；Dash 4 米，造成 35 伤害并施加一次物理 impulse。" }],
  }),
  dossier({
    id: "scp096", category: "scp-augmentation", name: "SCP-096", roleType: "Standard SCP Augmentation", baseRole: "SCP-096", faction: "SCP", health: "3200 HP", badge: noVariantBadge,
    passives: ["狂怒期间移动速度提高 13%；仅在 Rage 持续期间生效。"], actives: [],
  }),
  dossier({
    id: "scp049", category: "scp-augmentation", name: "SCP-049", roleType: "Standard SCP Augmentation", baseRole: "SCP-049", faction: "SCP", health: "3700 HP", badge: noVariantBadge,
    passives: ["救死扶伤：由 M07 管理 SCP-1344 lease。"],
    actives: [{ slot: "Active Slot 1", name: "疫病弥漫", detail: "CD 90 秒；持续 45 秒，每秒 tick 8 HP，作用于当前位置 Room 中敌对存活人类。" }],
    mechanics: ["污染以 Room Scope WorldEffect 存在，带有 Biohazard、Contamination、RoomPersistent、Scp049、Cleanseable 标签。", "049 死亡不会单独清除污染；持续至过期、被清理、回合结束或插件清理。", "未来获准的 BIO、MTF 或 Event 可通过 IWorldEffectService.TryCleanse 与 AllowedTags 请求清理。"],
    notes: [{ status: "LIVE VALIDATION PENDING", text: "Room tint 尝试低饱和绿色 RGB 约 0.25 / 0.55 / 0.30；如果无法安全建立视觉 lease，则跳过 tint。" }],
  }),
  dossier({
    id: "scp106", category: "scp-augmentation", name: "SCP-106", roleType: "Standard SCP Augmentation", baseRole: "SCP-106", faction: "SCP", health: "3200 HP", badge: noVariantBadge,
    passives: ["移动速度提高 15%。"], actives: [],
    notes: [{ status: "UNSUPPORTED", text: "旧设计中的耐力消耗降低 5% 缺少当前 Role/API 支持，不会按已生效能力展示。" }],
  }),
  dossier({
    id: "scp079", category: "scp-augmentation", name: "SCP-079", roleType: "Standard SCP Augmentation", baseRole: "SCP-079", faction: "SCP", health: "原生 SCP-079", badge: noVariantBadge,
    passives: ["开局接入 Level 2；AP 消耗降低 5%；每次合法正向 XP grant 额外获得 5 XP。"],
    actives: [
      { slot: "Level 4", name: "Room Blackout", detail: "AP cost = 0；原生 blackout 使用次数上限仍无法解除。" },
      { slot: "Level 5", name: "Area Blackout / Area Lockdown", detail: "AP cost 降至 50%。" },
    ],
    notes: [{ status: "UNSUPPORTED", text: "原生 blackout usage capacity 为只读或缺少可用接口，因此次数上限继续保留。" }],
  }),
  dossier({
    id: "scp173", category: "scp-augmentation", name: "SCP-173", roleType: "Standard SCP Augmentation", baseRole: "SCP-173", faction: "SCP", health: "5000 HP", badge: noVariantBadge,
    passives: ["视力疲劳：Blink cooldown 乘以 0.70。", "正常 snap 致死后，对死亡点 2 米内其他敌对 human 造成其 Current HP × 50% 的伤害。"],
    actives: [],
    mechanics: ["门破坏增强走原生 BreakableDoor 流程；不破坏 Unbreakable Gate 或特殊不可破门。"],
  }),
  dossier({
    id: "scp0492", category: "scp-augmentation", name: "SCP-049-2", roleType: "Standard SCP Augmentation", baseRole: "SCP-049-2", faction: "SCP", health: "700 HP", badge: noVariantBadge,
    passives: ["玩家转为 049-2 时由 M07 自动 attach。", "若持有 M07 专属枪，COM-15 的 reserve ammunition 为 30 发；物品序列号受跟踪，不可丢弃，只为专属枪补弹。"],
    actives: [],
    mechanics: ["049 成功释放疫病弥漫后，存活 049-2 获得 10 秒移动速度 +5%、伤害 +3%；再次触发刷新时长，不叠加。", "049 死亡后由存活 049-2 中 HP 最高者继任；并列时 PlayerId 升序。初代 3700 HP，后代继承上一代起始 HP 的一半，最低 250 HP。示例：3700 → 1850 → 925 → 462.5 → 250 → 250…"],
    notes: [{ status: "LIVE VALIDATION PENDING", text: "真实游戏内 COM-15 装备、射击与 reserve ammo 仍需服务器验证。" }],
  }),
];

export const roleArchiveGroups = [
  { id: "d-class", category: "d-class", kicker: "OPENING VARIANTS / D-CLASS", title: "D-Class Role Variants", description: "8 个不同的开局身份；内部 VariantId 区分源概念中重复的 D-11424 编号。" },
  { id: "scientists", category: "scientist", kicker: "OPENING VARIANTS / SCIENTIST", title: "Scientist 特殊身份", description: "NamedDoctor、Specialist 与 SpecialAlignment 使用不同资格和身份边界。" },
  { id: "security", category: "security", kicker: "OPENING SPLIT / SECURITY", title: "Security Opening Split", description: "Guard 与 Chaos Infiltrator 在开局槽位中配对分配；Chaos 身份从回合开始公开。" },
  { id: "scp-939", category: "scp-939", kicker: "OPENING VARIANTS / SCP-939", title: "SCP-939 Role Variants", description: "三种独立 Variant，各自 MaxPerRound = 1；同一局可出现多种 939。" },
  { id: "scp-augmentation", category: "scp-augmentation", kicker: "BASE SCP + M07", title: "Standard SCP Augmentation", description: "标准 SCP 身份叠加 M07 强化；这些强化不额外生成 Variant Badge。" },
];

export const roleArchiveFacts = {
  allocation: {
    dClassExample: { slots: 8, variantCount: 6, vanillaCount: 2 },
    scientistExample: { slots: 3, variantCount: 2, vanillaCount: 1 },
    securityExample: { slots: 4, guardCount: 2, chaosInfiltratorCount: 2 },
    explanation: "M01 决定 Composition slot 数量；M07 在 Round Start 为这些槽位分配具体 opening identity，不增加总人数。小 roster 使用冻结配额；较大 roster 按约 70% 分配，并至少保留一个 Vanilla slot。",
  },
  openingFlow: ["M01 · Composition slots", "M07 · Concrete opening identity", "M07 · Ability / HUD / Badge / WorldEffect", "M02 · Mid-round reinforcement"],
  namedDoctor: "Dr. Bright、Dr. Clef、Dr. Kondraki、Dr. Gears 属于 NamedDoctor；每局最多 1 人。Dr. Iceberg 与 Dr. Light 是 Specialist；Dr. Maynard 是 SpecialAlignment。",
  scp939Policy: "Normal SCP pool + SCP-939-53 / 89 / 101；每种 Variant MaxPerRound = 1。允许三种同局出现，但不会强制出现。",
  activeAbility: {
    slots: ["Active Slot 1", "Active Slot 2", "Active Slot 3"],
    binding: "SSS → Binding Service → Active Slot → Ability Runtime → Ability。玩家自行绑定按键；Ability 只知道逻辑槽位，不知道 F、3 或 Mouse4 等物理按键。",
  },
  hud: "模块提交 HUD Fragment，由 SharedPlayerHudService 统一组合、处理优先级与过期时间，再渲染最终 Hint。M07 角色本人可见身份、阵营、被动、主动技能、键位和冷却；出生显示详细版，之后切换 Compact HUD。",
  badge: "普通特殊身份为 AlliesOnly、显示头顶、不投影到玩家列表。四天启与 Maynard 使用全局头顶标识；玩家列表 gameplay projection 等待不覆盖 staff/server Rank 的安全 API。",
  worldEffect: "WorldEffect 是跨模块 contract，提供 Room Scope 与 EffectId、InstanceId、RoundId、Owner、Source Variant、Tags、Start、End、Active、Cleanseable、Cleanup reason 等元数据。清理方通过 IWorldEffectService.TryCleanse(..., AllowedTags) 请求清理，不需识别 SCP-049 专用类型。",
  validation: {
    phase3: "db30b93de1bc45198b3d5ae3db19bf1a3eddaa5c",
    logicTests: "313 / 313",
    pluginBuild: "BLOCKED · 缺少完整 SCP:SL Managed assemblies",
    liveServer: "LIVE VALIDATION PENDING · 尚未运行正式服务端 smoke test",
  },
};

export const roleImplementationStatus = [
  { subject: "Bright possession / body transfer", status: "BLOCKED", detail: "缺少安全的原子玩家身体、控制权与物品交换 API。" },
  { subject: "Global gameplay Player List Badge", status: "BLOCKED", detail: "不能安全覆盖 staff/server Rank；Global Overhead 已实现。" },
  { subject: "Dr. Light per-player door interaction speed", status: "BLOCKED", detail: "当前没有可用的逐玩家 interaction-rate modifier。" },
  { subject: "SCP-106 stamina modifier", status: "UNSUPPORTED", detail: "当前 Role/API 没有通用 stamina drain surface。" },
  { subject: "SCP-079 blackout usage-cap removal", status: "UNSUPPORTED", detail: "原生 capacity 只读或没有可用接口；AP cost 调整仍生效。" },
  { subject: "Multi-939 simultaneous live behavior", status: "LIVE VALIDATION PENDING", detail: "静态路径已检查；尚未在 dedicated server 验证。" },
  { subject: "049-2 COM-15 runtime", status: "LIVE VALIDATION PENDING", detail: "装备、射击与 reserve ammo 仍需真实 server/client 验证。" },
  { subject: "SCP-049 room tint", status: "LIVE VALIDATION PENDING", detail: "安全视觉 lease 不可用时会跳过房间色调。" },
];
