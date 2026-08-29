# D-LRC 完整产品说明页实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在当前 React + Vite 页面中实现基于真实插件源码的完整 D-LRC 产品与机制说明页。

**Architecture:** `DlrcApp.jsx` 作为编排器，D-LRC 各机制章节拆成独立组件；页面数据集中放在 `src/data/dlrcPage.js`，避免事实散落在 JSX。`dlrc.css` 为每种章节提供独立版式，并复用现有 Design Tokens、公共导航和背景层。

**Tech Stack:** React 19、Vite、Radix Dialog primitive、原生 details/summary、原生 CSS、SVG。

**Spec:** `docs/superpowers/specs/2026-08-29-dlrc-complete-page-design.md`

## Global Constraints

- 搜索系统本轮不实现，不恢复 Ctrl+K、命令面板或顶部搜索框。
- 事实以 `D:\Project\Emergency-events` 当前源码和运行契约为准。
- 正式代码格式使用 `DLRC-A4-BIO`，D-LRC 仅作为体系名称。
- 所有演示和回合示例必须显示 `SIMULATED` 或 `EXAMPLE`。
- 不声称 Event Pack、O4 Panel、GOI 正式 runtime provider 或真人验证已完成。
- 页面不得出现页面级横向溢出。

### Task 1: 建立事实数据层

**Files:** Create `src/data/dlrcPage.js`; Test `tests/dlrcPage.test.mjs`.

- [x] 写测试，验证 Population 五档、Level 0–5、Threshold 五组、Primary Wave cap、Evaluation 时序、最低人数和模块状态常量。
- [x] 运行 `node --test tests/dlrcPage.test.mjs`，确认测试先因数据模块不存在而失败。
- [x] 创建数据模块，集中保存阈值、Population、Crisis、FDI、命令、状态和模拟回合数据，并为不确定内容标注状态。
- [x] 运行测试确认通过。

### Task 2: 拆分 D-LRC 页面章节组件

**Files:** Modify `src/components/dlrc/DlrcApp.jsx`; Create focused components under `src/components/dlrc/`.

- [x] 保留 Hero 和 LiveResponse 的现有业务内容，补充非实时 Demo 标识与 Code Anatomy。
- [x] 创建 Population Scale、Response Ladder、Score Flow、Control State、Crisis Accordion、Crisis Relation、FdiFlow、SystemMap、EvaluationCycle、QualificationFlow、DirectorBoundary、VanillaIntegration、RuntimeFallback、RoundExample、OperatorCommands、TelemetryPanel、ArchitectureStatus 和 PrinciplesWall。
- [x] Crisis Accordion 使用原生 details/summary，并以数据模块渲染七类 Crisis。
- [x] `DlrcApp.jsx` 只保留组件顺序、公共布局和锚点，不写长事实数组。

### Task 3: 实现章节版式与响应式

**Files:** Modify `src/styles/dlrc.css` and shared styles only when required.

- [x] 为代码拆解、人数尺、等级阶梯、阈值矩阵、评分流、关系图、时间轴、流程、命令终端和关键词墙分别定义版式。
- [x] 桌面端使用网格/横向流，平板和手机转纵向；阈值矩阵只允许局部滚动。
- [x] 保留 D-LRC 现有首屏、Live Code、危机图标比例和公共导航，不引入搜索样式。

### Task 4: 验证整页与事实边界

**Files:** No new production files.

- [x] 运行 `npm run build`。
- [x] 使用浏览器检查首屏、危机 Accordion、模拟回合、命令区和底部状态区。
- [x] 检查桌面与 390px 手机宽度没有页面级横向溢出，局部数据轨道保留自身滚动。
- [x] 检查控制台无错误，并用 `git diff --check` 验证格式。
