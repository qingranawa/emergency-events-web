# 项目结构整理设计

## 目标

按功能将现有静态站点的样式、脚本、图片、数据和运维文件归类，保持现有页面 URL、Cloudflare Pages 部署方式和业务行为不变。

## 方案

保留根目录中的三个 HTML 入口和部署配置，避免改变现有访问路径；将支撑文件移入功能目录：

```text
/
├── index.html
├── admin.html
├── design-mockup.html
├── wrangler.toml
├── assets/
│   ├── styles/
│   │   ├── public/
│   │   └── admin/
│   ├── scripts/
│   │   ├── public/
│   │   └── admin/
│   └── images/
├── data/
├── functions/
├── migrations/
├── scripts/
└── docs/
```

文件归类规则：

- 公共页面 CSS 放入 `assets/styles/public/`。
- 管理后台 CSS 放入 `assets/styles/admin/`。
- 公共页面脚本放入 `assets/scripts/public/`。
- 管理后台脚本放入 `assets/scripts/admin/`。
- 图片和 SVG 放入 `assets/images/`。
- `data/`、`functions/`、`migrations/`、`scripts/` 保持职责独立。

## 约束

- 只移动文件并更新引用路径，不拆分或重写业务逻辑。
- `index.html`、`admin.html`、`design-mockup.html` 保持在根目录。
- `functions/` 保持 Cloudflare Pages Functions 约定路径。
- `migrations/` 保持 Wrangler 配置中的迁移目录不变。
- 完成后检查旧文件路径无残留引用，并确认 Git 差异只包含预期的移动和路径变更。
