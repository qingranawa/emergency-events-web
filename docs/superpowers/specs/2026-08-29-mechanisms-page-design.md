# Emergency Events 机制页设计说明

## 目标

新增一个独立的 `mechanisms.html` 技术说明页，解释 Emergency Events 从回合启动到 Telemetry 的真实运行链路，并让顶部导航共享同一套路由定义。

## 事实边界

- 插件事实来自 `D:/Project/Emergency-events` 当前源码、配置和运行时契约文档。
- 阵营页与事件页本轮不创建，导航项显示为不可点击的“待开放”。
- 机制页不复制完整 D-LRC 页面，只说明 D-LRC 在整体插件中的职责，并链接到 `dlrc.html`。
- O4 Panel、正式 Event Pack、Director cadence、GOI production provider 等没有完成或仍属 provisional 的内容必须明确标注状态。

## 页面结构

总览 → Runtime Flow → Round Core / Population → Reinforcement Integration → D-LRC → Crisis System → FDI → Event Director → Event Pack → Module Relationship → Runtime Lifecycle → Configuration → RemoteAdmin Commands → Telemetry → Source Walkthrough → Current Status。

## 视觉与交互

沿用现有深色网格、细边框、Mono 标签和低饱和状态色。不同章节分别使用流程图、时间线、比例刻度、阈值矩阵、状态分栏、折叠详情、关系图、终端列表和状态表。页面导航使用轻量 sticky 目录，Crisis 使用原生 `details` 保持键盘可访问，不新增搜索系统或大型动画依赖。

## 响应式

桌面端采用多列流程和关系图，移动端逐列堆叠；矩阵、人口刻度、表格仅在自身容器内横向滚动，页面本身保持无横向溢出。
