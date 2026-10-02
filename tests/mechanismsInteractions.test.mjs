import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  crisisFacts,
  directorDemoFacts,
  dlrcMechanismFacts,
  fdiDemoFacts,
  o4Facts,
} from "../src/data/mechanisms.js";
import { crisisDefinitions } from "../src/data/dlrcPage.js";

const source = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

test("D-LRC 代码各段与人数档位和完整代码一致", () => {
  const { prefix, population, level, crisis, full } = dlrcMechanismFacts.code;
  assert.equal(population, "C");
  assert.equal(level, "4");
  assert.equal(crisis, "BIO");
  assert.equal(full, `${prefix}-${population}${level}-${crisis}`);
  assert.equal(dlrcMechanismFacts.thresholds.find(([tier]) => tier === population)?.[0], "C");
});

test("机制页和 D-LRC 页共用 SYS 的真实触发条件", () => {
  const mechanismRule = crisisFacts.find(({ tag }) => tag === "SYS")?.rule;
  const dlrcRule = crisisDefinitions.find(({ code }) => code === "SYS")?.trigger;
  assert.equal(mechanismRule, dlrcRule);
  assert.match(mechanismRule, /SCP-079.*存在/);
  assert.match(mechanismRule, /控制等级有效.*3 级/);
  assert.doesNotMatch(mechanismRule, /响应等级/);
});

test("FDI 交互演示只使用真实默认配置变化并标记模拟状态", () => {
  assert.equal(fdiDemoFacts.startingValue, 42);
  assert.match(fdiDemoFacts.disclaimer, /演示起点.*不代表.*实时/);
  assert.equal(fdiDemoFacts.incident.delta, 3);
  assert.match(fdiDemoFacts.incident.configNote, /FoundationKilledByScp/);
  assert.equal(fdiDemoFacts.recovery.quietWindowSeconds, 90);
  assert.deepEqual(fdiDemoFacts.recovery.deltas, { HIGH: -2, MEDIUM: -1, LOW: 0 });
  assert.match(fdiDemoFacts.recovery.gates.join(" "), /没有活动危机/);
  assert.match(fdiDemoFacts.recovery.gates.join(" "), /敌对力量/);
  assert.match(fdiDemoFacts.recovery.timing, /正式周期结算/);
});

test("O4 显示已实现的有限选择边界与待验证状态", () => {
  assert.match(o4Facts.status, /核心逻辑已实现/);
  assert.match(o4Facts.status, /实服验证待完成/);
  assert.match(o4Facts.rules.join(" "), /多个.*基金会普通支援/);
  assert.match(o4Facts.rules.join(" "), /不创建/);
  assert.match(o4Facts.rules.join(" "), /返回 Event Director.*复核/);
  assert.equal(o4Facts.demoCandidates.length, 2);
});

test("Event Director 演示单独呈现当前局势检查，再进入来源仲裁和 O4", () => {
  assert.deepEqual(directorDemoFacts.stages.slice(1, 6), [
    "响应等级",
    "危机条件",
    "人数计划",
    "当前局势",
    "来源仲裁",
  ]);
  assert.ok(directorDemoFacts.candidates.every(({ currentSituationEligible }) => typeof currentSituationEligible === "boolean"));
  const director = source("../src/components/mechanisms/DirectorSection.jsx");
  assert.match(director, /设施状态或所需人员/);
});

test("核心交互有原生键盘按钮语义和可辨识操作", () => {
  const architecture = source("../src/components/mechanisms/ArchitectureMap.jsx");
  const dlrc = source("../src/components/mechanisms/DlrcSection.jsx");
  const fdi = source("../src/components/mechanisms/FdiSection.jsx");
  const director = source("../src/components/mechanisms/DirectorSection.jsx");
  const o4 = source("../src/components/mechanisms/O4Section.jsx");
  assert.match(architecture, /<button[\s\S]*aria-pressed/);
  assert.match(dlrc, /<button className=\{`dlrc-code-part/);
  assert.match(fdi, /data-action="fdi-record-incident"/);
  assert.match(fdi, /data-action="fdi-settle"/);
  assert.match(fdi, /data-action="fdi-reset"/);
  assert.match(director, /data-action="director-next-step"/);
  assert.match(director, /data-action="director-reset"/);
  assert.match(director, /data-action="o4-choice"/);
  assert.match(o4, /href="#director-o4-branch"/);
});

test("机制页交互不是实时服务器状态，并支持减少动态", () => {
  const nav = source("../src/components/layout/SiteNav.jsx");
  const styles = source("../src/styles/mechanisms.css");
  const app = source("../src/components/mechanisms/MechanismsApp.jsx");
  assert.doesNotMatch(nav, /运行中/);
  assert.match(app, /机制演示/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
});
