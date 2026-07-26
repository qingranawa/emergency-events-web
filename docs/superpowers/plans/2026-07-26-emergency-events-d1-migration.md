# Emergency Events D1 Content Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `emergency-events-web` 当前写在 `index.html` 与 `poem.js` 中的页面内容迁移到 Cloudflare D1，并由 Pages Functions 从 D1 提供同源内容 API；保留现有视觉、复制、搜索、抽屉导航和动效行为。

**Architecture:** 使用一张 `content_documents` 表保存版本化的页面内容文档。它适合本项目的只读资料库：事件广播中的 SCP 自定义标记按原始文本保存，前端使用 `textContent` 渲染，避免把内容误当成 HTML 执行。`functions/api/content.js` 只读返回当前文档；`content.js` 负责把 API 数据渲染到现有 CSS 所需的 DOM 结构。D1 由 Pages production/preview 同时绑定为 `CONTENT_DB`，并保留本地 Wrangler 配置与 SQL migration 作为可复现入口。

**Tech Stack:** Cloudflare Pages Functions, Cloudflare D1, vanilla JavaScript, HTML/CSS, Wrangler configuration, Python standard library extraction script.

## Global Constraints

- 不删除现有其他 D1 数据库，不复用 `qingran-guestbook` 等已有业务库。
- 新建专用数据库 `emergency-events-content`，只创建和写入本项目的表及内容。
- 不把快速链接迁入生产内容；当前项目中它没有被 `index.html` 引用，继续保持排除。
- D1 内容由 `data/content.json` 作为可审计的 seed 源，线上 API 只读；不在浏览器暴露 Cloudflare 凭据。
- API 未准备好前先保留可回滚的 Git 工作区状态；部署前执行本地静态检查、数据计数检查和线上 API 检查。
- 不执行 `DROP DATABASE`、强制推送或覆盖其他项目的 Pages 配置。

---

## 1. 盘点并固化源数据

**Files:** `index.html`, `poem.js`, `data/content.json`, `scripts/extract-content.py`

- [ ] 编写标准库解析脚本，提取导航、Hero、注意事项、撤离协议、四个事件分区、更新日志、每日一言、作者、鸣谢、版权和许可证图标信息。
- [ ] 将广播中的 `<color>`, `<size>`, `<split>` 等 SCP 文本标记作为字符串保存，不解释、不执行。
- [ ] 输出 `data/content.json`，记录 `schema_version` 与统计信息，便于迁移后核对事件数、广播数、更新日志数和名言数。
- [ ] 验证源数据统计与当前页面：4 个事件分区、29 个事件、60 条更新日志，以及 `poem.js` 中的全部 190 条名言。

## 2. 建立 D1 schema 与 seed

**Files:** `migrations/0001_content_documents.sql`, `scripts/build-seed-sql.py`, `data/content.json`

- [ ] 创建 `content_documents(document_key TEXT PRIMARY KEY, schema_version INTEGER NOT NULL, content_json TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`。
- [ ] 创建唯一约束/索引，确保页面 key 只能有一份当前文档，并为更新时间保留审计字段。
- [ ] 生成幂等 seed SQL：使用 `INSERT ... ON CONFLICT(document_key) DO UPDATE`，不得把内容拼接进不转义的 SQL。
- [ ] 通过 Cloudflare MCP 创建 `emergency-events-content`，执行 schema 和 seed，随后查询 JSON 合法性与内容统计。

## 3. 接入 Pages Functions 内容 API

**Files:** `functions/api/content.js`, `wrangler.toml`

- [ ] 实现 `GET /api/content`，从 `env.CONTENT_DB` 查询 `emergency-events` 文档并返回 `application/json`。
- [ ] API 添加短时浏览器缓存、明确的错误响应和 `X-Content-Source: cloudflare-d1`，不返回数据库内部信息。
- [ ] 为 Pages preview/production 配置同名 `CONTENT_DB` D1 binding；`wrangler.toml` 写入数据库名、数据库 ID 和 migrations 目录。
- [ ] 不改动现有 Pages 的 GitHub source、production branch、build command 和域名配置。

## 4. 将页面改为 D1 驱动渲染

**Files:** `index.html`, `content.js`, `toc-links.js`, `reveal.js`, `search-trigger.js`, `poem.js`

- [ ] 将 `index.html` 中的内容主体改为保留 ID/class 的空壳和 loading 状态，删除事件、日志、页脚及每日一言的硬编码副本。
- [ ] `content.js` 根据 D1 文档安全创建 DOM：导航锚点、预置规则、事件卡、广播复制按钮、更新日志抽屉、每日一言数据和页脚信息。
- [ ] 通过 `content:ready` 事件重新初始化目录高亮、滚动揭示和广播搜索，确保异步渲染后仍可用。
- [ ] 保持复制按钮每次恢复同一初始图标；搜索只读取已渲染的事件，并继续支持 Ctrl/Cmd+K。
- [ ] API 失败时显示可理解的错误状态，不静默展示不完整内容；保留既有 CSS、资源和动效。
- [ ] 删除 `poem.js` 中与 D1 内容重复的 200 条静态名言，保留换一句、去重随机和计数行为在 `content.js` 中。

## 5. 验证、绑定、部署和回滚点

**Files:** `docs/superpowers/plans/2026-07-26-emergency-events-d1-migration.md`

- [ ] 运行源数据与 D1 统计对账，检查 4/29/60/190 总数一致。
- [ ] 运行 JavaScript 语法检查、Wrangler 配置检查、HTML 关键 ID 检查和本地 API 渲染检查。
- [ ] 使用 Cloudflare MCP PATCH Pages project，仅补充 production/preview 的 `CONTENT_DB` binding；确认原有配置没有被覆盖。
- [ ] 触发 GitHub `main` 部署后轮询 Pages deployment，确认 stage 为 `success`。
- [ ] 访问 `https://emergency.qingran.vip/api/content` 与 Pages 默认域名，核对状态码、响应头、统计字段和页面加载。
- [ ] 若部署或 API 验证失败，优先回滚 Git 代码并移除 Pages binding；不删除 D1 数据库，保留数据库用于重新部署和审计。

## Commands / Checkpoints

```powershell
python scripts/extract-content.py
python scripts/build-seed-sql.py
node --check content.js
node --check functions/api/content.js
git diff --check
git status --short
```

Cloudflare target:

- Pages project: `emergency-events-web`
- Production branch: `main`
- Production domains: `https://emergency.qingran.vip`, `https://emergency-events-web.pages.dev`
- New D1: `emergency-events-content`
- Pages binding: `CONTENT_DB`
