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
    <section className="hero dlrc-hero"><div className="container hero-inner"><div className="hero-intro"><div className="eyebrow mono">这一局现在怎么样</div><h1>D-LRC<br /><span>把一局状态写成一串代码</span></h1><p className="hero-desc">D-LRC 把一局里的三件事放在一起：人数档位、响应等级和当前危机。它是状态记录，不是事件清单，也不是危机严重度。</p><div className="hero-actions"><a className="btn primary" href="#code">看懂这串代码</a><a className="btn" href="#levels">看响应等级</a><a className="btn" href="#crisis">看危机状态</a><a className="btn" href="https://github.com/qingranawa/Emergency-events" target="_blank" rel="noreferrer">查看源码</a></div><div className="hero-meta mono">状态判断已接入 · 正式事件内容尚未制作</div></div></div></section>
    <nav className="dlrc-section-nav" aria-label="D-LRC 页面章节"><div className="container">{[["代码", "#code"], ["人数", "#population"], ["响应", "#levels"], ["危机", "#crisis"], ["设施", "#fdi"], ["筛选", "#director"], ["示例", "#example"], ["状态", "#architecture"]].map(([label, href]) => <a className="mono" href={href} key={label}>{label}</a>)}</div></nav>
    <LiveResponse states={dlrcDemoStates} demoLabel={dlrcRuntimeFacts.demoLabel} />
    <section id="code"><div className="container"><SectionHeader kicker="先看这串代码" title="它记录了什么" description="代码由前缀、人数档位、响应等级和当前危机组成。" /><CodeAnatomy /></div></section>
    <section id="population"><div className="container"><SectionHeader kicker="开局锁定" title="这一局有多少人" description="回合开始时锁定人数档位；中途掉人不会自动换档，它会影响候选事件的人数计划。" /><PopulationScale /></div></section>
    <section id="levels"><div className="container"><SectionHeader kicker="当前压力" title="响应等级代表什么" description="响应等级表示这一局的压力和支援需求，范围是 L0 到 L5；它不是某类危机的等级。" /><ResponseLadder /></div></section>
    <section id="score"><div className="container"><SectionHeader kicker="怎么算出来" title="系统会看哪些局势" description="系统会参考 SCP 威胁、基金会压力、增援结果、时间和战略危险，再得到响应分数。" /><ScoreFlow /></div></section>
    <section id="control"><div className="container"><SectionHeader kicker="别让一个信号带偏结果" title="控制状态会设上限" description="控制状态会结合局势趋势、基金会强度和波次表现，限制最终响应等级。" /><ControlStatePanel /></div></section>
    <section id="crisis"><div className="container"><SectionHeader kicker="单独记录" title="危机现在是否发生" description="危机识别只回答条件是否成立，以及它是刚刚开始、持续中，还是已经结束。" /><CrisisAccordion /></div></section>
    <section id="crisis-relation"><div className="container"><SectionHeader kicker="不要混在一起看" title="整体响应、危机、设施记录是三件事" description="D-LRC 看整体响应，危机标签看具体条件，设施失序记录保留环境变化。它们互相提供信息，但不是同一个等级。" /><CrisisRelation /></div></section>
    <section id="fdi"><div className="container"><SectionHeader kicker="设施记录" title="FDI 会记住设施发生过什么" description="FDI 是 0–100 的设施秩序记录，只会临时影响普通支援的来源选择，不会改写响应等级或专业危机资格。" /><FdiFlow /></div></section>
    <section id="relationship"><div className="container"><SectionHeader kicker="从记录到候选" title="这些模块怎样接起来" description="先记录回合事实，再判断响应和危机，最后交给事件筛选器决定有没有合适候选。" /><SystemRelationship /></div></section>
    <section id="cycle"><div className="container"><SectionHeader kicker="一局会检查几次" title="评估不是只看开局那一刻" description="开局先锁定人数档位；391 秒后首次评估，之后每 30 秒更新，重要波次完成后也会重新观察。" /><EvaluationCycle /></div></section>
    <section id="qualification"><div className="container"><SectionHeader kicker="开始前的安全检查" title="候选不等于已经开始" description="候选、选择和真正启动之间还会重新确认人数、危机、响应等级和回合编号。" /><QualificationFlow /></div></section>
    <section id="director"><div className="container"><SectionHeader kicker="事件筛选器" title="谁决定候选能不能进场" description="D-LRC 提供当前状态，事件筛选器根据人数计划、危机条件和可用人员筛选候选；它不负责写具体装备和出生点。" /><DirectorBoundary /></div></section>
    <section id="integration"><div className="container"><SectionHeader kicker="原版流程还在" title="插件只接管自己该管的部分" description="原版阵营、职业、装备、玩家选择和增援出生仍由游戏负责，插件主要记录结果并添加判断边界。" /><VanillaIntegration /></div></section>
    <section id="fallback"><div className="container"><SectionHeader kicker="人数不够怎么办" title="不满足最低人数，就回到原版流程" description="开局少于 16 人时不启用；活动回合降到 16 人以下后，本局暂停，下一局重新判断。" /><RuntimeFallback /></div></section>
    <section id="example"><div className="container"><SectionHeader kicker="只看一条链" title="模拟一局会怎样变化" description="下面是给读者看的模拟状态链，不是实时服务器数据，也不是已执行的正式事件。" /><RoundExample /></div></section>
    <section id="commands"><div className="container"><SectionHeader kicker="给服主看的查询" title="可以查什么" description="这些命令用于查看回合、响应、危机、设施记录和模块状态；它们不会凭空创建事件。" /><OperatorCommands /></div></section>
    <section id="telemetry"><div className="container"><SectionHeader kicker="只读记录" title="系统为什么这样判断" description="运行记录保存判断过程，不参与重新计算，也不改变回合。" /><TelemetryPanel /></div></section>
    <section id="architecture"><div className="container"><SectionHeader kicker="给维护者看的状态" title="当前各部分做到哪一步" description="运行框架已经具备，正式事件内容、平衡调校和真人验证仍然分开标注。" /><ArchitectureStatus /></div></section>
    <section id="principles"><div className="container"><SectionHeader kicker="这套框架的底线" title="几个必须守住的判断原则" description="保留原版、只消费已确认事实、开始前复核、条件失效就安全退出。" /><PrinciplesWall /></div></section>
  </main><Footer dlrc /></>;
}
