# Project Structure Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task with verification checkpoints.

**Goal:** 按功能整理现有静态 Cloudflare Pages 项目的支撑文件，同时保持页面 URL、部署约定和业务逻辑不变。

**Architecture:** 保留根目录的三个 HTML 入口、`wrangler.toml`、`functions/` 和 `migrations/`。将前端样式、脚本和图片按公共页面/管理后台归入 `assets/`，继续使用相对路径，不引入构建工具或运行时依赖。

**Tech Stack:** 原生 HTML、CSS、浏览器 JavaScript、Cloudflare Pages Functions、Wrangler、Python/Node 辅助脚本。

## Global Constraints

- 只移动文件并更新引用路径，不拆分或重写业务逻辑。
- `index.html`、`admin.html`、`design-mockup.html` 保持在根目录。
- `functions/` 保持 Cloudflare Pages Functions 约定路径。
- `migrations/` 保持 Wrangler 配置中的迁移目录不变。
- 不新增 npm 依赖或构建步骤。

### Task 1: 建立功能目录并移动前端资源

**Files:**
- Create: `assets/styles/public/`, `assets/styles/admin/`, `assets/scripts/public/`, `assets/scripts/admin/`, `assets/images/`
- Move: 根目录公共样式（包括 `quick-links.css`）、公共脚本、`admin.css`、`admin.js` 和六个图片/SVG 文件到对应目录

**Interfaces:**
- Produces the new stable asset paths used by the three root HTML entrypoints and runtime content rendering.

- [ ] **Step 1: Create destination directories**

```bash
mkdir -p assets/styles/public assets/styles/admin assets/scripts/public assets/scripts/admin assets/images
```

Expected: all five destination directories exist.

- [ ] **Step 2: Move files without changing contents**

```bash
mv MainCSS.css search-trigger.css scroll-to-to.css copy-btn.css theme-toggle.css changelog-container.css poem.css footer-container.css toc-links.css motion.css content.css assets/styles/public/
mv admin.css assets/styles/admin/
mv theme-toggle.js search-trigger.js scroll-to-to.js copy-btn.js reveal.js toc-links.js content.js motion.js assets/scripts/public/
mv admin.js assets/scripts/admin/
mv Jeff.jpg awni.jpg qingran.jpg IMG_4104.PNG MVP.jpg scp-foundation-emblem.svg assets/images/
```

Expected: each listed file exists only at its new path.

- [ ] **Step 3: Verify moved files are detected as renames**

```bash
git diff --stat --find-renames
git status --short
```

Expected: Git reports the listed files as moves/renames before reference updates.

### Task 2: Update HTML and runtime asset references

**Files:**
- Modify: `index.html`, `admin.html`, `design-mockup.html` only where they reference moved assets
- Modify: `assets/scripts/public/content.js` if it constructs avatar/image URLs
- Modify: any moved CSS file that references a moved image

**Interfaces:**
- Consumes: destination paths from Task 1.
- Produces: browser-loadable links and script URLs from the root HTML pages.

- [ ] **Step 1: Update stylesheet and script URLs**

Use these mappings in HTML:

```text
public CSS → assets/styles/public/<same filename>
admin.css → assets/styles/admin/admin.css
public JS → assets/scripts/public/<same filename>
admin.js → assets/scripts/admin/admin.js
```

Expected: every HTML link/script target points to an existing file.

- [ ] **Step 2: Update moved image URLs**

Change static and runtime-generated references to `assets/images/<filename>`. Preserve the stored avatar filenames in `data/content.json` unless the runtime explicitly requires full paths.

Expected: the emblem and author avatars resolve from the new image directory.

- [ ] **Step 3: Preserve data and deployment paths**

Inspect `scripts/extract-content.py`, `scripts/build-seed-sql.py`, and `wrangler.toml`. Keep `data/content.json` and `migrations/` references unchanged unless a concrete stale path is found.

Expected: no database schema, seed content, API path, or deployment directory changes.

### Task 3: Verify structure and repository integrity

**Files:**
- Verify: all files changed by Tasks 1-2, `wrangler.toml`, and `data/content.json`

**Interfaces:**
- Consumes: completed file layout and updated references.
- Produces: evidence that old root asset paths are gone and deployment directories remain valid.

- [ ] **Step 1: Check the expected tree**

```bash
find assets -maxdepth 3 -type f | sort
```

Expected: styles, scripts, and images appear under their assigned directories; no moved asset remains at the repository root.

- [ ] **Step 2: Search for stale root asset references**

```bash
rg -n --hidden -S '(MainCSS\.css|content\.css|admin\.css|theme-toggle\.js|search-trigger\.js|footer-container\.css|changelog-container\.css|poem\.css|toc-links\.js|copy-btn\.js|motion\.css|scroll-to-to\.js|reveal\.js|content\.js|admin\.js|Jeff\.jpg|awni\.jpg|qingran\.jpg|IMG_4104\.PNG|MVP\.jpg|scp-foundation-emblem\.svg)' --glob '!docs/superpowers/**' .
```

Expected: matches use `assets/...` paths; no old root-relative reference remains.

- [ ] **Step 3: Validate configuration, scripts, and diff**

```bash
test "$(grep -E '^migrations_dir[[:space:]]*=' wrangler.toml | sed 's/.*=[[:space:]]*//' | tr -d '"')" = "migrations"
test -f data/content.json
python3 -m py_compile scripts/build-seed-sql.py scripts/extract-content.py
git diff --check
git diff --stat --find-renames
git status --short
```

Expected: all checks pass; the diff contains only the approved docs, moves, and path updates.
