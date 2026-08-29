import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  dlrcPopulationProfiles,
  dlrcResponseLevels,
  dlrcThresholds,
  primaryWaveCaps,
  dlrcRuntimeFacts,
} from "../src/data/dlrcPage.js";
import { mechanismSections, mechanismFacts } from "../src/data/mechanisms.js";

test("D-LRC 页面数据反映当前 Population 与 cap 契约", () => {
  assert.deepEqual(dlrcPopulationProfiles.map(({ code, min, max }) => [code, min, max]), [
    ["E", 16, 19], ["D", 20, 25], ["C", 26, 31], ["B", 32, 37], ["A", 38, 45],
  ]);
  assert.deepEqual(primaryWaveCaps, { E: 6, D: 6, C: 8, B: 14, A: 18 });
});

test("D-LRC 页面数据包含六个等级和五组真实阈值", () => {
  assert.deepEqual(dlrcResponseLevels.map(({ level }) => level), [0, 1, 2, 3, 4, 5]);
  assert.deepEqual(dlrcThresholds, {
    E: [0, 18, 32, 48, 65, 82], D: [0, 20, 34, 50, 67, 84], C: [0, 22, 36, 52, 69, 86],
    B: [0, 24, 38, 54, 71, 88], A: [0, 26, 40, 56, 73, 90],
  });
});

test("D-LRC 页面数据标记模拟内容与运行时边界", () => {
  assert.equal(dlrcRuntimeFacts.minimumPlayers, 16);
  assert.equal(dlrcRuntimeFacts.evaluationStartSeconds, 391);
  assert.equal(dlrcRuntimeFacts.evaluationIntervalSeconds, 30);
  assert.equal(dlrcRuntimeFacts.demoLabel, "模拟示例 / SIMULATED");
  assert.equal(dlrcRuntimeFacts.o4Status, "DEFERRED BY DESIGN");
});

test("机制页使用独立入口并覆盖完整运行链路", () => {
  assert.deepEqual(mechanismSections.map((section) => section.id), [
    "overview", "round-core", "reinforcement", "dlrc", "crisis", "fdi", "director", "event-pack", "architecture", "lifecycle", "configuration", "commands", "telemetry", "source", "status",
  ]);
  assert.equal(mechanismFacts.minimumPlayers, 16);
  assert.equal(mechanismFacts.evaluationStartSeconds, 391);
  assert.equal(mechanismFacts.evaluationIntervalSeconds, 30);
  assert.deepEqual(mechanismFacts.primaryWaveCaps, { E: 6, D: 6, C: 8, B: 14, A: 18 });
  assert.equal(mechanismFacts.fdiRange, "0–100");
  assert.equal(mechanismFacts.fdiQuietWindowSeconds, 90);
});

test("共享导航不把未制作页面伪装成锚点或死路由", () => {
  const navSource = readFileSync(new URL("../src/components/layout/SiteNav.jsx", import.meta.url), "utf8");
  assert.match(navSource, /mechanisms\.html/);
  assert.match(navSource, /id: "factions"[\s\S]*pending: true/);
  assert.match(navSource, /id: "events"[\s\S]*pending: true/);
  assert.doesNotMatch(navSource, /home: "#factions"/);
  assert.doesNotMatch(navSource, /home: "#events"/);
});
