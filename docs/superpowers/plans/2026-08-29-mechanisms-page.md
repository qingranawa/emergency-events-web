# Emergency Events 机制页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 基于当前插件源码事实，修正共享导航并实现可直接访问的独立机制说明页。

**Architecture:** 保留 Vite MPA，在 `mechanisms.html` 使用独立 React entry；`MechanismsApp` 只编排章节，章节组件拆分到 `src/components/mechanisms/`，事实数据集中在 `src/data/mechanisms.js`。共享 `SiteNav` 统一维护现有页面、待开放页面和机制页路由。

**Tech Stack:** React 19、Vite 7、原生 CSS、现有 design tokens、原生 `details`/SVG/HTML 表格。

**Spec:** `docs/superpowers/specs/2026-08-29-mechanisms-page-design.md`

## Global Constraints

- 插件目录 `D:/Project/Emergency-events` 只读，不修改任何插件文件。
- 阵营与事件页本轮不创建，导航项显示“待开放”，不使用 `href="#"` 或假路由。
- 机制页必须是独立 `mechanisms.html` 入口，并在该页 active。
- 不恢复搜索系统、Ctrl+K 或 Command Palette。
- 技术事实只使用当前源码、配置、测试和运行时契约能确认的内容。
- 保留现有深色网格、细边框、Mono 和响应式设计，禁止页面级横向溢出。

---

### Task 1: 建立机制页事实数据与失败测试

**Files:**
- Create: `src/data/mechanisms.js`
- Modify: `tests/dlrcPage.test.mjs`

- [ ] **Step 1: 写导航与机制内容契约测试**

测试读取 `SiteNav.jsx`、`mechanisms.html` 和 `mechanisms.js`，断言存在独立入口、待开放项没有锚点、章节数据覆盖 Round Core 至 Current Status，并断言源码事实关键值（16、391、30、E6/D6/C8/B14/A18、FDI 0–100、90 秒）存在。

- [ ] **Step 2: 运行测试确认新增契约失败**

运行 `npm test`，预期因机制页入口和数据文件尚不存在而失败。

- [ ] **Step 3: 建立数据文件**

集中导出 `mechanismNavSections`、`runtimeFlow`、`roundCoreFacts`、`populationProfiles`、`reinforcementFacts`、`dlrcFacts`、`crisisFacts`、`fdiFacts`、`directorFacts`、`eventPackFacts`、`architectureLayers`、`lifecycleStages`、`configurationRows`、`commandRows`、`telemetryRows`、`sourceWalkthrough`、`mechanismStatus`。所有状态为 `已完成`、`框架完成`、`开发中`、`暂缓` 或 `等待验证`，并保留源码路径字段。

- [ ] **Step 4: 运行测试确认数据契约通过**

运行 `npm test`，确认新增契约通过；已有测试也必须通过。

### Task 2: 共享导航和 Vite MPA 入口

**Files:**
- Modify: `src/components/layout/SiteNav.jsx`
- Modify: `src/components/layout/Footer.jsx`
- Modify: `vite.config.js`
- Create: `mechanisms.html`
- Create: `src/mechanisms-main.jsx`

- [ ] **Step 1: 将 navigation 改为统一 route 定义**

首页和 D-LRC 保持现有文件入口；阵营和事件渲染为无 href 的 `待开放` 项；机制指向 `mechanisms.html`。桌面和移动菜单共用同一数组，当前页面支持 `mechanisms` active。

- [ ] **Step 2: 接入机制 entry 与元信息**

新增 `mechanisms.html` 和 `src/mechanisms-main.jsx`，在 Vite `rollupOptions.input` 注册 `mechanisms`。

- [ ] **Step 3: 更新 footer 页面职责**

让机制页 footer 返回首页，不改变首页和 D-LRC 的已有链接语义。

- [ ] **Step 4: 运行测试确认导航和入口契约通过**

运行 `npm test`，确认路由、active 页面和入口断言通过。

### Task 3: 机制页章节组件

**Files:**
- Create: `src/components/mechanisms/MechanismsApp.jsx`
- Create: `src/components/mechanisms/MechanismsHero.jsx`
- Create: `src/components/mechanisms/RuntimeFlow.jsx`
- Create: `src/components/mechanisms/CoreMechanisms.jsx`
- Create: `src/components/mechanisms/DirectorAndPack.jsx`
- Create: `src/components/mechanisms/OperationsSections.jsx`

- [ ] **Step 1: 写 `MechanismsApp` 编排骨架**

只负责渲染 `Background`、共享 `SiteNav page="mechanisms"`、sticky 章节导航、各章节组件和 `Footer`。

- [ ] **Step 2: 实现 Hero 与 Runtime Flow**

Hero 使用短标题“机制”；Runtime Flow 用真实阶段节点和 SVG/HTML 连线表达 Round Start → Round Core → Population → Reinforcement → Round Facts → D-LRC/Crisis/FDI → Event Director → Eligibility/Revalidate → Event Pack → Telemetry。

- [ ] **Step 3: 实现核心机制章节**

`CoreMechanisms` 提供 Round Core 生命周期、Population Scale、Reinforcement 对照、D-LRC 评估流、Crisis 原生折叠详情、FDI 记忆公式，数据来自 `mechanisms.js`。

- [ ] **Step 4: 实现 Director、Event Pack 和运维章节**

`DirectorAndPack` 表达资格收束和 Director/Pack 边界；`OperationsSections` 提供模块关系、生命周期、配置表、真实 RA 命令、Telemetry 事件流、源码调用路径、状态表和 O4/Live Validation 边界。

- [ ] **Step 5: 运行测试确认组件可被入口加载**

运行 `npm test`，确认机制页入口引用组件和主要章节 id 均存在。

### Task 4: 机制页样式与响应式

**Files:**
- Create: `src/styles/mechanisms.css`

- [ ] **Step 1: 为各版式建立独立 CSS 结构**

为 flow、timeline、population scale、matrix、accordion、equation、architecture、terminal、status table 分别定义样式，复用 tokens，不覆盖现有首页/D-LRC 样式。

- [ ] **Step 2: 添加移动端降级**

在 980px、720px、520px 断点将多列结构堆叠；为矩阵、人口刻度和命令表提供内部滚动；确保 `body` 无横向溢出。

- [ ] **Step 3: 运行构建**

运行 `npm run build`，确认 `dist/mechanisms.html` 及其资源生成且无编译错误。

### Task 5: 当前仓库验证与报告

**Files:**
- No new source files.

- [ ] **Step 1: 运行完整当前构建和测试**

运行 `npm test` 与 `npm run build`，读取完整输出和退出码。

- [ ] **Step 2: 快速浏览验证三条页面入口**

使用当前可用浏览器路径检查首页、D-LRC、机制页的导航文本、active 状态、机制章节内容、移动端首屏和无页面级溢出；若浏览器插件不可用，记录实际原因并使用现有本地验证方式。

- [ ] **Step 3: 复核插件目录未被修改**

运行 `git -C D:/Project/Emergency-events status --short`，预期为空。

- [ ] **Step 4: 输出事实报告**

报告当前分支、修改前后导航目标、机制路由/入口、主要文件、当前 M01–M06/FDI 对应关系、真实源码/配置/命令/Telemetry、旧内容差异、README/docs 冲突、未修改的插件问题、构建结果和因证据不足未写入内容。
