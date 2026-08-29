import { Background } from "../layout/Background";
import { Footer } from "../layout/Footer";
import { SectionHeader } from "../layout/SectionHeader";
import { SiteNav } from "../layout/SiteNav";
import { useTheme } from "../../hooks/useTheme";
import { crisisItems, dlrcDemoStates } from "../../data/dlrc";
import { dlrcRuntimeFacts } from "../../data/dlrcPage";
import { LiveResponse } from "./LiveResponse";
import { CodeAnatomy, PopulationScale, ResponseLadder, ScoreFlow, ControlStatePanel } from "./MechanismSections";
import { CrisisAccordion } from "./CrisisAccordion";
import { CrisisRelation, FdiFlow, SystemRelationship, EvaluationCycle, QualificationFlow, DirectorBoundary, VanillaIntegration, RuntimeFallback } from "./RuntimeSections";
import { RoundExample, OperatorCommands, TelemetryPanel, ArchitectureStatus, PrinciplesWall } from "./OperationsSections";

export function DlrcApp() {
  const { theme, toggleTheme } = useTheme();
  return <><Background /><SiteNav page="dlrc" theme={theme} onToggleTheme={toggleTheme} /><main id="top">
    <section className="hero dlrc-hero"><div className="container hero-inner"><div className="hero-intro"><div className="eyebrow mono">D-LRC · 系统架构</div><h1>D-LRC<br /><span>Dynamic Lockdown<br />Response Code</span></h1><p className="hero-desc">D-LRC 用来描述 Emergency Events 当前回合的响应状态。它会汇总人口规模、响应等级和 Crisis，生成一条可读的回合代码。</p><div className="hero-actions"><a className="btn primary" href="#code">查看代码结构</a><a className="btn" href="#levels">查看响应等级</a><a className="btn" href="#crisis">查看 Crisis</a><a className="btn" href="https://github.com/qingranawa/Emergency-events" target="_blank" rel="noreferrer">GitHub / Releases</a></div><div className="hero-meta mono">核心运行时已就绪 · Event Pack 待完成</div></div></div></section>
    <nav className="dlrc-section-nav" aria-label="D-LRC 页面章节"><div className="container">{[["代码", "#code"], ["人口", "#population"], ["等级", "#levels"], ["Crisis", "#crisis"], ["FDI", "#fdi"], ["Director", "#director"], ["示例", "#example"], ["状态", "#architecture"]].map(([label, href]) => <a className="mono" href={href} key={label}>{label}</a>)}</div></nav>
    <LiveResponse states={dlrcDemoStates} demoLabel={dlrcRuntimeFacts.demoLabel} />
    <section id="code"><div className="container"><SectionHeader kicker="代码结构" title="代码结构" description="正式代码使用 DLRC 前缀，后面依次写入 Population Profile、Response Level 和同一次评估中的 Crisis Tags。" /><CodeAnatomy /></div></section>
    <section id="population"><div className="container"><SectionHeader kicker="Population Profile" title="人口档位" description="Round Core 在回合开始锁定人口档位，供编制、Primary Wave cap 和 Level threshold 使用。" /><PopulationScale /></div></section>
    <section id="levels"><div className="container"><SectionHeader kicker="Response Level · 0—5" title="响应等级" description="Evaluator 将 EffectiveResponseScore 与当前 Population Profile 的六个阈值比较，得到 Level 0 到 Level 5。" /><ResponseLadder /></div></section>
    <section id="score"><div className="container"><SectionHeader kicker="Response Score" title="评分组成" description="Response Score 由多个回合数据项计算，最后限制在 0–100，再进入 Population-specific threshold。" /><ScoreFlow /></div></section>
    <section id="control"><div className="container"><SectionHeader kicker="ControlState" title="控制状态" description="ControlEvaluator 根据趋势、基金会强度、波次表现和战场动量计算 Control Level Cap。" /><ControlStatePanel /></div></section>
    <section id="crisis"><div className="container"><SectionHeader kicker="Crisis System" title="Crisis 类型" description="Crisis Detector 读取同一次快照，维护 Active/Inactive 状态和 Episode。Crisis 没有独立 Severity 轴。" /><CrisisAccordion /></div></section>
    <section id="crisis-relation"><div className="container"><SectionHeader kicker="状态关系" title="三组独立状态" description="D-LRC 描述整体响应，Crisis 描述专业危机是否发生，FDI 记录设施失序的持续记忆。" /><CrisisRelation /></div></section>
    <section id="fdi"><div className="container"><SectionHeader kicker="Facility Disorder Index" title="FDI 记忆" description="FDI 是独立的 0–100 设施秩序事实，不会被包装成另一个 D-LRC 等级。" /><FdiFlow /></div></section>
    <section id="relationship"><div className="container"><SectionHeader kicker="System Relationship" title="系统关系" description="上游模块发布回合数据，下游模块直接读取这些结果，不重复推导同一套算法。" /><SystemRelationship /></div></section>
    <section id="cycle"><div className="container"><SectionHeader kicker="D-LRC 更新" title="评估周期" description="首次评估、周期评估和事件后的新数据共同决定下一次结果。" /><EvaluationCycle /></div></section>
    <section id="qualification"><div className="container"><SectionHeader kicker="事件资格" title="资格判断" description="Candidate 和 Selected 只是计划；Start 与 Commit 前必须用最新数据重新确认。" /><QualificationFlow /></div></section>
    <section id="director"><div className="container"><SectionHeader kicker="Event Director" title="谁筛选事件？" description="D-LRC 提供状态，Event Director 使用这些状态筛选候选，Event Pack 负责具体内容。" /><DirectorBoundary /></div></section>
    <section id="integration"><div className="container"><SectionHeader kicker="原版协作" title="原版协作范围" description="Emergency Events 不重写原版 Respawn 的阵营、计时、职业或装备决定。" /><VanillaIntegration /></div></section>
    <section id="fallback"><div className="container"><SectionHeader kicker="Runtime Fallback" title="低人口回退" description="最低激活人数来自当前 Runtime Contract，而不是旧页面的推测。" /><RuntimeFallback /></div></section>
    <section id="example"><div className="container"><SectionHeader kicker="回合示例" title="回合示例" description="下面是合法状态链的模拟示例，不代表任何实时服务器。" /><RoundExample /></div></section>
    <section id="commands"><div className="container"><SectionHeader kicker="RemoteAdmin" title="管理员命令" description="以下仅列出 RemoteAdmin parser 当前支持的生产查询与控制入口。测试接口和规划命令不在此显示成可用功能。" /><OperatorCommands /></div></section>
    <section id="telemetry"><div className="container"><SectionHeader kicker="Telemetry" title="判断记录" description="Balance Telemetry 是只读观察器，记录等级、危机、波次和 FDI 的变化。" /><TelemetryPanel /></div></section>
    <section id="architecture"><div className="container"><SectionHeader kicker="当前架构" title="模块状态" description="当前架构由 M01、M02、M03、M04、M04.5、M05 和 M06 组成，Event Pack 位于内容扩展边界。" /><ArchitectureStatus /></div></section>
    <section id="principles"><div className="container"><SectionHeader kicker="设计原则" title="项目原则" description="这些原则决定系统如何读取局势、尊重人口、保留原版并记录每次判断。" /><PrinciplesWall /></div></section>
  </main><Footer dlrc /></>;
}
