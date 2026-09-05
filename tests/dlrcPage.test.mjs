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

test("LiveResponse 使用单一可清理定时器和合成层进度动画", () => {
  const source = readFileSync(new URL("../src/components/dlrc/LiveResponse.jsx", import.meta.url), "utf8");
  const styles = readFileSync(new URL("../src/styles/dlrc.css", import.meta.url), "utf8");
  assert.doesNotMatch(source, /setInterval/);
  assert.match(source, /setTimeout/);
  assert.match(source, /clearTimeout/);
  assert.match(source, /progress-fill/);
  assert.doesNotMatch(styles, /\.dlrc-page > \.live-code-section\.scroll-reveal-visible \.dlrc-code \{ animation: dlrc-code-enter[^}]* both;/);
});

test("LiveResponse 提供逐位滚轮、危机切换和 Spring Fill 动效", () => {
  const source = readFileSync(new URL("../src/components/dlrc/LiveResponse.jsx", import.meta.url), "utf8");
  const styles = readFileSync(new URL("../src/styles/dlrc.css", import.meta.url), "utf8");
  assert.match(source, /OdometerDigit/);
  assert.match(source, /direction=\"up\"/);
  assert.match(source, /direction=\"down\"/);
  assert.match(source, /CrisisCodeTransition/);
  assert.match(source, /is-springing/);
  assert.match(styles, /@keyframes dlrc-odometer-up/);
  assert.match(styles, /@keyframes dlrc-odometer-down/);
  assert.match(styles, /@keyframes dlrc-crisis-enter/);
  assert.match(styles, /@keyframes dlrc-spring-fill/);
  assert.match(styles, /dlrc-odometer-up-out 720ms/);
  assert.match(styles, /dlrc-spring-fill 780ms/);
  assert.match(styles, /\.dlrc-code \{ display: inline-flex; align-items: center; min-height: 1em/);
  assert.match(styles, /white-space: nowrap/);
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

test("共享导航使用抠图标记并保留圆角边框", () => {
  const navSource = readFileSync(new URL("../src/components/layout/SiteNav.jsx", import.meta.url), "utf8");
  const styles = readFileSync(new URL("../src/styles/base.css", import.meta.url), "utf8");
  assert.match(navSource, /emergency-events-mark\.png/);
  assert.match(styles, /\.logo \{[^}]*padding: 4px[^}]*border-radius: 12px/);
  assert.match(styles, /\.logo img \{[^}]*object-fit: contain[^}]*border-radius: 7px/);
});

test("共享导航将 GitHub 作为带图标的右侧操作入口", () => {
  const navSource = readFileSync(new URL("../src/components/layout/SiteNav.jsx", import.meta.url), "utf8");
  const styles = readFileSync(new URL("../src/styles/base.css", import.meta.url), "utf8");
  assert.match(navSource, /className="github-action"/);
  assert.match(navSource, /assets\/github\.svg/);
  assert.doesNotMatch(navSource, /desktop-nav[\s\S]*nav-github/);
  assert.match(styles, /\.github-action \{/);
});

test("共享导航使用较小字号且不显示当前页横线", () => {
  const tokens = readFileSync(new URL("../src/styles/tokens.css", import.meta.url), "utf8");
  const styles = readFileSync(new URL("../src/styles/base.css", import.meta.url), "utf8");
  assert.match(tokens, /--nav-link-font-size: 16px/);
  assert.doesNotMatch(styles, /\.nav-link\.is-current::after/);
});

test("阵营页面拥有独立 MPA 入口与完整章节锚点", () => {
  const pageSource = readFileSync(new URL("../factions.html", import.meta.url), "utf8");
  const appSource = readFileSync(new URL("../src/components/factions/FactionsApp.jsx", import.meta.url), "utf8");
  assert.match(pageSource, /src\/factions-main\.jsx/);
  assert.match(appSource, /<FactionRelationshipMap \/>/);
  assert.match(appSource, /<FactionComparison \/>/);
  assert.match(appSource, /<FactionSources \/>/);
});
