# D-LRC 完整产品说明页设计

## 目标

将 D-LRC 页面从概览页扩展为基于当前 Emergency Events 实际实现的产品、运行机制和架构说明页。页面不连接实时服务器，所有 Live Code 与回合示例都明确标记为模拟内容。

## 事实基准

页面事实只取自 `D:\Project\Emergency-events` 当前源码和 `docs/` 运行契约：Population 为 E=16–19、D=20–25、C=26–31、B=32–37、A=38–45；Response Level 为 0–5，并使用五组真实阈值；最低激活人数为 16；首次 Evaluation 为 391 秒，后续周期为 30 秒；Primary Wave cap 为 E6/D6/C8/B14/A18，cap 仅为截断上限；FDI 为 0–100 的独立设施失序状态；M06 O4 Panel 为 `DEFERRED BY DESIGN`；正式 Event Pack 内容尚未开始。

## 页面结构

`DlrcApp` 只负责编排独立章节组件和公共布局。新增章节组件覆盖 Code Anatomy、Population Scale、Response Level、Score Flow、Control State、Crisis Accordion、Crisis/Response 双轴、FDI Memory Flow、System Relationship、Evaluation Cycle、Qualification Pipeline、Event Director 边界、Vanilla Integration、Runtime Fallback、Simulated Round Example、RemoteAdmin 命令、Telemetry、真实模块状态和 Keyword Wall。

## 交互与可访问性

危机详情使用原生 details/summary 折叠结构，保留浏览器默认键盘导航、语义和焦点行为，不人为扩展 Escape 行为。回合示例使用轻量 React 状态切换；不加入搜索系统、不加入大型动画库。所有视觉关系图同时提供可读文本。

## 视觉与响应式

继续使用深色网格背景、细边框、Mono 标签、灰白文字和低饱和状态色。章节轮换使用时间轴、流程图、矩阵、关系图、表格、Accordion 和关键词墙，避免连续重复卡片。桌面端支持 1920/1440/1280，平板与手机转为纵向；局部阈值矩阵允许自身横向滚动，但页面本身不得横向溢出。

## 信息边界

Crisis 不写不存在的 Severity 轴；GOI runtime provider、FacilityState 的部分状态、Episode Resolve Debounce、正式 Director cadence、生产 Event Pack、真人实服验证和 O4 UI 均明确标记为 `PROVISIONAL`、`PENDING DESIGN`、`DEFERRED BY DESIGN` 或 `PENDING VALIDATION`，不包装为已完成能力。
