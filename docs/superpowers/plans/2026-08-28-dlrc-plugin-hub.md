# D-LRC 插件中心页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将原“紧急事件娱乐模式广播文本库”首页替换为以 D-LRC 为核心、可承载未来文档页面的插件官网中心页。

**Architecture:** `index.html` 保持为零构建依赖的单文件静态站点，使用用户给出的 `D:\.Jeff\Downloads\dlrc.html` 作为视觉和内容基线。页面内联 CSS 与 JavaScript 负责视觉、主题、命令面板和导航状态；后续独立内容页通过预定义的路由命名接入导航，而本次不创建空白页面或失效链接。

**Tech Stack:** HTML5、内联 CSS、原生 JavaScript、浏览器原生 `localStorage`。

**Spec:** 本计划根据用户在当前会话确认的 mockup、中文为主的既有站点语言，以及“苹果官网式可扩展导航”需求制定；项目中没有独立规格文件。

## Global Constraints

- 只修改 `index.html`；不删除或重写现有旧 CSS、JS、PNG、JPG 文件。
- 以 `D:\.Jeff\Downloads\dlrc.html` 为内容和视觉基线，不自行重设品牌、颜色或页面结构。
- 文档语言为简体中文优先，D-LRC、Emergency Events、模块名和危机代码保留英文术语。
- 文档根元素保持 `<html lang="zh-CN">`，并更新标题和 description 以反映 D-LRC 插件官网。
- 不创建角色、机制、特性等未提供内容的空白页，也不得在本次发布中留下会产生 404 的链接。
- 不添加外部框架、字体 CDN、构建工具或包依赖。
- 不执行 Git 提交或推送；当前工作目录不是 Git 仓库。
- 所有键盘和鼠标交互都必须在深色、浅色和移动端布局中可用。

## Future Route Contract

| 导航标签 | 本次行为 | 未来正式路径 | 内容职责 |
| --- | --- | --- | --- |
| 首页 | 链接至 `#top` | `./` | 插件总览与入口中心 |
| D-LRC | 链接至 `#architecture` | `./dlrc/`（可选拆分） | D-LRC 的系统架构与响应代码文档 |
| 角色 | 显示“即将开放”，不跳转 | `./roles/` | 阵营、角色、职责和互动关系 |
| 机制 | 显示“即将开放”，不跳转 | `./mechanics/` | 评估逻辑、危机状态和响应机制 |
| 特性 | 显示“即将开放”，不跳转 | `./features/` | 模块能力、玩法特性与配置说明 |

未来创建上述页面时，将对应的“即将开放”按钮替换为普通 `<a>`，保留相同的 `nav-link` 样式、可访问名称与移动端菜单逻辑；无需改变导航 HTML 结构或首页视觉系统。

---

### Task 1: 建立 D-LRC 单文件首页基线

**Files:**
- Modify: `index.html`（全文替换）
- Reference only: `D:\.Jeff\Downloads\dlrc.html`

**Interfaces:**
- Consumes: 用户提供的 mockup HTML、CSS、中文文案、D-LRC 模块和危机分类名称。
- Produces: 一个不再引用旧广播检索、事件列表、旧主题或旧页脚资源的有效 D-LRC 首页。

- [ ] **Step 1: 记录旧首页的替换边界。**

Run:

```powershell
rg -n '<link rel="stylesheet"|<script src=|<main|<footer|id="(goi-events|foundation-events|emergency-events|changelog)' index.html
```

Expected: 记录旧站仅由 `index.html` 引用的旧页面组件，作为替换后“零旧依赖”的对照。

- [ ] **Step 2: 以 mockup 的完整文档骨架替换首页。**

将 mockup 的网格背景、噪点层、首屏、实时响应代码示例、系统理念、七层响应架构、七类专业危机、宣言、页脚和命令面板放入 `index.html`；不得保留旧娱乐模式事件卡、广播文本、更新日志、每日一言或原作者信息。

首页 head 必须使用以下元数据：

```html
<html lang="zh-CN">
<meta name="description" content="D-LRC 动态封锁响应代码插件官网，介绍 Emergency Events 的响应架构、危机分类与系统机制。">
<title>D-LRC — 动态封锁响应代码</title>
```

- [ ] **Step 3: 验证页面不再加载旧站资源。**

Run:

```powershell
rg -n 'MainCSS\.css|search-trigger\.js|theme-toggle\.js|scroll-to-to\.js|copy-btn\.js|poem\.js|footer-container\.css|quick-links\.css' index.html
```

Expected: 无输出；这些文件保留在工作目录中，但新首页不引用它们。

### Task 2: 实现苹果官网式、可扩展的顶栏导航

**Files:**
- Modify: `index.html`（导航 HTML、内联 CSS、内联 JavaScript）

**Interfaces:**
- Consumes: Task 1 的 `#top` 与 `#architecture` 锚点、`toggleTheme()` 和 `openPalette()` 函数。
- Produces: 统一的 `.site-nav`、`.nav-links`、`.nav-link`、`.nav-menu-toggle` 与 `.nav-pending` 组件约定，供未来页面沿用。

- [ ] **Step 1: 写出导航验收清单。**

在实施前，将以下行为作为浏览器验收项：桌面端可见品牌、五个导航项、搜索和主题按钮；小于 900px 时导航链接收进菜单；菜单可由按钮、Escape、点击菜单外区域关闭；未开放项不发生页面跳转；焦点可见且触控目标不小于 44px。

- [ ] **Step 2: 用语义化导航替换 mockup 的单一右侧工具栏布局。**

导航必须保持品牌在左、中间主导航、右侧工具区的结构，并包含以下稳定标记：

```html
<nav class="site-nav" aria-label="主导航">
  <a class="brand" href="#top" aria-label="Emergency Events 首页">
    <span class="logo mono" aria-hidden="true">EE</span>
    <span>
      <span class="brand-name">Emergency Events</span>
      <span class="brand-sub">D-LRC SYSTEM</span>
    </span>
  </a>
  <div class="nav-links" id="site-navigation">
    <a class="nav-link is-current" href="#top" aria-current="page">首页</a>
    <a class="nav-link" href="#architecture">D-LRC</a>
    <button class="nav-link nav-pending" type="button" data-page="角色" aria-disabled="true">角色<span>即将开放</span></button>
    <button class="nav-link nav-pending" type="button" data-page="机制" aria-disabled="true">机制<span>即将开放</span></button>
    <button class="nav-link nav-pending" type="button" data-page="特性" aria-disabled="true">特性<span>即将开放</span></button>
  </div>
  <div class="nav-tools">
    <button class="command-trigger" type="button" aria-label="搜索系统">搜索系统<kbd>Ctrl K</kbd></button>
    <button class="icon-btn" type="button" aria-label="切换到浅色主题">◐</button>
    <button class="nav-menu-toggle" type="button" aria-controls="site-navigation" aria-expanded="false" aria-label="打开主导航">菜单</button>
  </div>
</nav>
```

`nav-pending` 点击后仅通过 `aria-live` 状态文本反馈“{页面名}页面正在准备中”，不改变 URL、不打开空白页。

- [ ] **Step 3: 添加克制的苹果式导航视觉。**

在现有 mockup 的深浅主题变量上实现 52–56px 高的固定顶栏、半透明背景、`backdrop-filter: blur(18px)`、一条低对比度底部分隔线和 200ms 的颜色/透明度过渡；不使用渐变条、霓虹发光、粗重边框或夸张弹跳动画。

桌面端导航链接居中排列；当前项用文字色和细微底部强调表达状态；未开放项以降级文字与“即将开放”微型标签表达，不伪装成有效外链。

- [ ] **Step 4: 添加移动端菜单状态机。**

JavaScript 必须使用一个布尔 `isNavigationOpen` 管理菜单开关，并提供 `openNavigation()`、`closeNavigation()`、`toggleNavigation()` 三个函数。窗口宽度小于 900px 时隐藏中间链接，显示具有 `aria-controls="site-navigation"` 和动态 `aria-expanded` 的菜单按钮；菜单以顶栏下方的小型半透明面板展开。

关闭条件必须完整：再次点击菜单按钮、选择“首页”或“D-LRC”、按 Escape、点击导航面板之外区域、以及视口重新扩大到桌面断点。

- [ ] **Step 5: 验证导航的语义和未来路由边界。**

Run:

```powershell
rg -n 'site-nav|site-navigation|nav-pending|aria-current|aria-expanded|data-page|roles/|mechanics/|features/' index.html
```

Expected: 首页与 D-LRC 是有效页内链接；角色、机制、特性在本次仅为带 `aria-disabled` 的按钮；未来路径只在注释或维护约定中出现，不作为会跳转的 `href`。

### Task 3: 统一工具交互、主题与可访问性

**Files:**
- Modify: `index.html`（内联 JavaScript、按钮属性和样式）

**Interfaces:**
- Consumes: Task 2 的移动端菜单函数和 `#site-navigation`。
- Produces: 不冲突的键盘事件处理、持久主题偏好和可被读屏软件理解的状态反馈。

- [ ] **Step 1: 合并快捷键的职责。**

`Ctrl/Cmd+K` 只负责调用 `openPalette()` 或 `closePalette()`；Escape 按优先级关闭命令面板、再关闭移动端导航；两者关闭后不抛出异常。

- [ ] **Step 2: 保持主题逻辑为新页面唯一来源。**

继续使用 mockup 的 `body.light` 与 `localStorage` 键 `dlrc-theme`；主题按钮必须动态更新 `aria-label`，在深色时说明“切换到浅色主题”，在浅色时说明“切换到深色主题”。

- [ ] **Step 3: 让命令面板具备最小对话语义。**

为覆盖层添加 `role="dialog"`、`aria-modal="true"`、`aria-label="搜索 D-LRC 系统内容"`；打开时焦点进入搜索框，关闭时焦点返回打开它的按钮。

- [ ] **Step 4: 维持演示数据的明确边界。**

保留 `DLRC-A4-BIO+SYS` 等轮换代码，但将标签明确为演示状态；不把 Response Score、Control State 或演示代码表述为实时服务器数据。

### Task 4: 浏览器验证与交付检查

**Files:**
- Modify: `index.html`（仅在修复本任务发现的缺陷时）
- Verify: `index.html`

**Interfaces:**
- Consumes: Task 1–3 的最终静态页面。
- Produces: 已在真实浏览器桌面与移动视口验证的单页交付物。

- [ ] **Step 1: 启动本地静态服务器。**

Run:

```powershell
python -m http.server 4173 --directory .
```

Expected: 在 `http://localhost:4173/` 提供首页；若 Python 不可用，使用本机已有的等效静态文件服务，且不安装全局依赖。

- [ ] **Step 2: 执行桌面端验收。**

在 1440px 宽视口检查：首屏、七层架构、危机卡片和页脚完整显示；顶栏滚动后保持固定；首页和 D-LRC 链接定位正确；角色、机制、特性不跳转且有“正在准备中”反馈；搜索、Ctrl/Cmd+K、Escape、主题切换和 4.2 秒演示代码轮换正常。

- [ ] **Step 3: 执行移动端验收。**

在 390px 宽视口检查：没有水平滚动；导航菜单可开关；Escape 与外部点击关闭菜单；搜索和主题按钮可触达；卡片网格按样稿断点降为单列或两列；文字不重叠、不裁切。

- [ ] **Step 4: 执行最终静态检查。**

Run:

```powershell
Get-Content -Raw index.html | Select-String -Pattern '<html lang="zh-CN">','<title>D-LRC — 动态封锁响应代码</title>','MainCSS.css','search-trigger.js','theme-toggle.js' -AllMatches
```

Expected: 前两项存在，后三项不存在。

- [ ] **Step 5: 检查改动范围并报告。**

Run:

```powershell
Get-ChildItem -LiteralPath . -File | Select-Object Name,Length,LastWriteTime
```

Expected: 向用户报告仅 `index.html` 为网站实现改动，旧资源未删除；本计划文件是本轮产生的附带文档，不属于网站运行时资源。

## Plan Self-Review

- [x] 覆盖 mockup 替换、中文语言基线、苹果式导航、未来页面扩展、主题、搜索、响应式和验证。
- [x] 未包含空白未来页面、外部依赖、资源删除、Git 提交或推送。
- [x] 每个未来导航入口都定义了本次行为、正式路径和职责，避免出现模糊的路由约定。
- [x] 所有验证步骤都给出可执行命令或明确的浏览器观察条件。
