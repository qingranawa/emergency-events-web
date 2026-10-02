import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  crisisFacts,
  dlrcMechanismFacts,
  directorFacts,
  fdiMechanismFacts,
  mechanismNavGroups,
  populationProfiles,
  reinforcementFacts,
  roundCoreFacts,
} from "../src/data/mechanisms.js";

const source = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

test("机制页侧栏只显示七个中文主章节", () => {
  const items = mechanismNavGroups.flatMap(({ items }) => items);
  assert.deepEqual(items.map(({ id }) => id), [
    "system-architecture", "round-reinforcement", "dlrc", "crisis-fdi", "director", "o4", "configuration",
  ]);
  assert.ok(items.every(({ label }) => /[\u4e00-\u9fff]/.test(label)));
});

test("系统总览以玩家能读懂的顺序表达一局流程", () => {
  const architecture = source("../src/components/mechanisms/ArchitectureMap.jsx");
  for (const phrase of ["开局", "锁定人数档位", "生成开局角色槽位", "原版增援", "判断局势", "选择事件", "事件发生"]) {
    assert.ok(architecture.includes(phrase), `缺少流程节点：${phrase}`);
  }
  assert.doesNotMatch(architecture, /DirectorContext|Composition Slots|Major Wave Facts|WorldEffectService/);
});

test("职责列表使用中文四列以内的玩家说明", () => {
  const matrix = source("../src/components/mechanisms/ResponsibilityMatrix.jsx");
  assert.equal((matrix.match(/<th scope="col">/g) || []).length, 4);
  assert.doesNotMatch(matrix, /OWNS|CONSUMES|PRODUCES|DOES NOT OWN|STATUS/);
});

test("机制页主内容不展示源码内部评估字段", () => {
  const sections = ["DlrcSection", "CrisisSection", "FdiSection", "DirectorSection", "EventPackSection", "O4Section"]
    .map((name) => source(`../src/components/mechanisms/${name}.jsx`)).join("\n");
  assert.doesNotMatch(sections, /NaturalResponseScore|PersistentAdjustment|EffectiveResponseScore|ControlLevelCap|Evaluation contract|Current stock|Transient delta|same Episode while active|Vanilla Primary Wave facts/);
});

test("回合接管与原版增援边界清楚", () => {
  assert.deepEqual(populationProfiles.map(({ tier, range }) => [tier, range]), [
    ["E", "16–19"], ["D", "20–25"], ["C", "26–31"], ["B", "32–37"], ["A", "38–45"],
  ]);
  assert.match(roundCoreFacts.transitions[0][2], /沿用原版流程/);
  assert.match(roundCoreFacts.transitions[2][2], /不会重新启用/);
  assert.deepEqual(roundCoreFacts.slotExample, {
    population: 19,
    tier: "E",
    slots: [["D 级人员", 8], ["科学家", 4], ["安保人员", 4], ["SCP", 3]],
  });
  assert.deepEqual(reinforcementFacts.caps.map(([, cap]) => cap), [6, 6, 8, 14, 18]);
  const reinforcement = source("../src/components/mechanisms/ReinforcementSection.jsx");
  assert.match(reinforcement, /上限不是目标人数/);
  assert.match(reinforcement, /不会强制选择阵营/);
  assert.doesNotMatch(reinforcement, /ForceWave|force faction/);
});

test("D-LRC 展示中文评估过程、正式代码和默认阈值", () => {
  assert.deepEqual(dlrcMechanismFacts.thresholds.map(([, ...levels]) => levels), [
    [0, 18, 32, 48, 65, 82], [0, 20, 34, 50, 67, 84], [0, 22, 36, 52, 69, 86],
    [0, 24, 38, 54, 71, 88], [0, 26, 40, 56, 73, 90],
  ]);
  assert.equal(dlrcMechanismFacts.code.full, "DLRC-C4-BIO");
  assert.match(dlrcMechanismFacts.schedule[0], /391 秒/);
  assert.match(dlrcMechanismFacts.schedule[1], /每 30 秒/);
  const sourceText = source("../src/components/mechanisms/DlrcSection.jsx");
  assert.match(dlrcMechanismFacts.stages[0][0], /综合响应分数/);
  assert.match(sourceText, /最终响应等级/);
  assert.match(sourceText, /当前默认值 · 平衡验证待完成/);
});

test("危机与 FDI 用当前信号说明用途、增减和结算", () => {
  assert.deepEqual(crisisFacts.map(({ tag }) => tag), ["BIO", "SYS", "CON", "SEC", "GOI", "WAR", "END"]);
  assert.match(fdiMechanismFacts.increase, /会推高 FDI/);
  assert.match(fdiMechanismFacts.decrease, /会降低 FDI/);
  assert.match(fdiMechanismFacts.recovery, /90 秒/);
  assert.match(fdiMechanismFacts.timing, /不提前推进结算/);
  const crisis = source("../src/components/mechanisms/CrisisSection.jsx");
  const fdi = source("../src/components/mechanisms/FdiSection.jsx");
  assert.match(crisis, /同一场连续危机/);
  assert.match(fdi, /30–59 · 中/);
  assert.match(fdi, /60–100 · 高/);
});

test("事件调度只提交计划，O4 仍未开放", () => {
  assert.match(directorFacts.pipeline.find(([name]) => name === "形成候选计划")[1], /仍未生成事件/);
  assert.match(directorFacts.event2Note, /非普通支援来源/);
  assert.match(directorFacts.event2Note, /第一个事件没能真正开始/);
  assert.match(source("../src/components/mechanisms/DirectorSection.jsx"), /Event Director/);
  assert.match(source("../src/components/mechanisms/EventPackSection.jsx"), /开发中/);
  assert.match(source("../src/components/mechanisms/O4Section.jsx"), /尚未实现/);
});

test("机制页侧栏没有独立滚动区，并统一使用 14px 圆角", () => {
  const styles = source("../src/styles/mechanisms.css");
  assert.match(styles, /--mechanism-radius:\s*14px/);
  assert.match(styles, /\.mechanisms-page p\s*\{[^}]*font-size:\s*16px/);
  assert.match(styles, /\.mechanism-table\s*\{[^}]*font-size:\s*15px/);
  assert.doesNotMatch(styles, /\.mechanisms-nav[^}]*overflow-y\s*:\s*auto/);
  assert.doesNotMatch(styles, /\.mechanisms-nav[^}]*max-height\s*:/);
});
