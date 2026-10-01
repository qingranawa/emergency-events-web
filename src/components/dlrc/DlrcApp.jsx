import { useRef } from "react";
import { Background } from "../layout/Background";
import { Footer } from "../layout/Footer";
import { SectionHeader } from "../layout/SectionHeader";
import { SiteNav } from "../layout/SiteNav";
import { useTheme } from "../../hooks/useTheme";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { crisisItems, dlrcDemoStates } from "../../data/dlrc";
import { dlrcRuntimeFacts } from "../../data/dlrcPage";
import { LiveResponse } from "./LiveResponse";
import { CodeAnatomy, PopulationScale, ResponseLadder, ScoreFlow, ControlStatePanel } from "./MechanismSections";
import { CrisisAccordion } from "./CrisisAccordion";
import { CrisisRelation, FdiFlow, SystemRelationship, EvaluationCycle, QualificationFlow, DirectorBoundary, VanillaIntegration, RuntimeFallback } from "./RuntimeSections";
import { RoundExample, OperatorCommands, TelemetryPanel, ArchitectureStatus, PrinciplesWall } from "./OperationsSections";

export function DlrcApp() {
  const { theme, toggleTheme } = useTheme();
  const mainRef = useRef(null);
  useScrollReveal(mainRef, ":scope > section");
  return <><Background /><SiteNav page="dlrc" theme={theme} onToggleTheme={toggleTheme} /><main ref={mainRef} id="top" className="dlrc-page">
    <section className="hero dlrc-hero"><div className="container hero-inner"><div className="hero-intro"><div className="eyebrow mono">D-LRC · 系统架构</div><h1>D-LRC<br /><span>Dynamic Lockdown<br />Response Code</span></h1><p className="hero-desc">D-LRC 用来描述 Emergency Events 当前回合的响应状态。它会汇总人口规模、响应等级和 Crisis，生成一条可读的回合代码。</p><div className="hero-actions"><a className="btn primary" href="#code">查看代码结构</a><a className="btn" href="#levels">查看响应等级</a><a className="btn" href="#crisis">查看 Crisis</a><a className="btn" href="https://github.com/qingranawa/Emergency-events" target="_blank" rel="noreferrer">GitHub / Releases</a></div><div className="hero-meta mono">核心运行时已就绪 · Event Pack 待完成</div></div></div></section>
    <nav className="dlrc-section-nav" aria-label="D-LRC 页面章节"><div className="container">{[["代码", "#code"], ["人数", "#population"], ["响应", "#levels"], ["危机", "#crisis"], ["设施", "#fdi"], ["筛选", "#director"], ["示例", "#example"], ["状态", "#architecture"]].map(([label, href]) => <a className="mono" href={href} key={label}>{label}</a>)}</div></nav>
    <LiveResponse states={dlrcDemoStates} demoLabel={dlrcRuntimeFacts.demoLabel} />
    <section id="code"><div className="container"><SectionHeader kicker="代码结构" title="D-LRC 代码" description="由代码前缀、人数档位、响应等级和危机标签组成。" /><CodeAnatomy /></div></section>
    <section id="population"><div className="container"><SectionHeader kicker="人数档位" title="Population Profile" description="回合开始锁定人数档位，决定开局编制、人数计划和响应门槛。" /><PopulationScale /></div></section>
    <section id="levels"><div className="container"><SectionHeader kicker="响应等级" title="Response Level · L0–L5" description="根据响应分数和人数档位计算最终响应等级，用于事件资格判断。" /><ResponseLadder /></div></section>
    <section id="score"><div className="container"><SectionHeader kicker="响应分数" title="Response Score" description="读取 SCP 威胁、基金会压力、增援结果、时间和战略危险，合成 0–100 分。" /><ScoreFlow /></div></section>
    <section id="control"><div className="container"><SectionHeader kicker="局面状态" title="Control State" description="根据局势趋势、基金会强度和波次表现计算最终响应等级上限。" /><ControlStatePanel /></div></section>
    <section id="crisis"><div className="container"><SectionHeader kicker="危机识别" title="Crisis System" description="七类危机检查器读取同一份回合记录，输出危机状态和危机编号。" /><CrisisAccordion /></div></section>
    <section id="crisis-relation"><div className="container"><SectionHeader kicker="状态关系" title="三类独立状态" description="响应等级、危机标签和设施失序记录分别服务于不同判断。" /><CrisisRelation /></div></section>
    <section id="fdi"><div className="container"><SectionHeader kicker="设施失序记录" title="FDI · Facility Disorder Index" description="用 0–100 表示设施秩序状态，读取当前设施存量和最近事件变化，并为普通支援来源选择提供输入。" /><FdiFlow /></div></section>
    <section id="relationship"><div className="container"><SectionHeader kicker="模块关系" title="从回合事实到候选" description="回合核心和增援模块发布事实，响应判断、危机识别和设施记录处理状态，事件筛选器读取结果生成候选。" /><SystemRelationship /></div></section>
    <section id="cycle"><div className="container"><SectionHeader kicker="评估周期" title="D-LRC Evaluation" description="391 秒首次评估，之后每 30 秒更新；重要增援完成后触发即时重新观察。" /><EvaluationCycle /></div></section>
    <section id="qualification"><div className="container"><SectionHeader kicker="事件资格" title="Eligibility 与 Revalidation" description="候选资格由人数档位、响应等级、危机状态、设施状态和可用人员共同决定；启动前会重新检查。" /><QualificationFlow /></div></section>
    <section id="director"><div className="container"><SectionHeader kicker="事件筛选器" title="Event Director" description="读取已确认的回合事实，检查事件条件、人数计划、来源和生命周期。" /><DirectorBoundary /></div></section>
    <section id="integration"><div className="container"><SectionHeader kicker="原版增援接入" title="Reinforcement Integration" description="保留原版阵营、职业、装备、玩家选择和出生流程；插件记录实际结果并应用自己的边界策略。" /><VanillaIntegration /></div></section>
    <section id="fallback"><div className="container"><SectionHeader kicker="运行边界" title="Low Population Fallback" description="低于 16 人时保持原版流程；活动回合降到 16 人以下后暂停本局，下一局重新判断。" /><RuntimeFallback /></div></section>
    <section id="example"><div className="container"><SectionHeader kicker="模拟示例" title="Round Example" description="用一条模拟状态链展示从开局、评估、危机到候选复核的变化。" /><RoundExample /></div></section>
    <section id="commands"><div className="container"><SectionHeader kicker="服主命令" title="RemoteAdmin Commands" description="用于查询回合、响应、危机、设施记录和模块状态。" /><OperatorCommands /></div></section>
    <section id="telemetry"><div className="container"><SectionHeader kicker="运行记录" title="Balance Telemetry" description="只读保存响应判断、危机、设施、增援和回合摘要，供维护者回看运行结果。" /><TelemetryPanel /></div></section>
    <section id="architecture"><div className="container"><SectionHeader kicker="实现状态" title="Module Status" description="分别标注 IMPLEMENTED、LOGIC TESTED、IN DEVELOPMENT、BLOCKED 与 LIVE VALIDATION PENDING。" /><ArchitectureStatus /></div></section>
    <section id="principles"><div className="container"><SectionHeader kicker="设计原则" title="Runtime Principles" description="保留原版流程，模块各负其责，数据有来源，启动前重新确认。" /><PrinciplesWall /></div></section>
  </main><Footer dlrc /></>;
}
