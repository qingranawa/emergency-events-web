import { useRef } from "react";
import { Background } from "../layout/Background";
import { Footer } from "../layout/Footer";
import { SectionHeader } from "../layout/SectionHeader";
import { SiteNav } from "../layout/SiteNav";
import { useTheme } from "../../hooks/useTheme";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { mechanismSections, runtimeBackboneSections } from "../../data/mechanisms";
import { MechanismsHero } from "./MechanismsHero";
import { MechanismsNav } from "./MechanismsNav";
import { RuntimeBackbone } from "./RuntimeBackbone";
import { RuntimeFlow } from "./RuntimeFlow";
import { RoundCoreSection } from "./RoundCoreSection";
import { ReinforcementSection } from "./ReinforcementSection";
import { DlrcSection } from "./DlrcSection";
import { CrisisSection } from "./CrisisSection";
import { FdiSection } from "./FdiSection";
import { DirectorSection } from "./DirectorSection";
import { EventPackSection } from "./EventPackSection";
import { ArchitectureSection, LifecycleSection, ConfigurationSection, CommandsSection, TelemetrySection, SourceSection, StatusSection } from "./OperationsSections";

export function MechanismsApp() {
  const { theme, toggleTheme } = useTheme();
  const mainRef = useRef(null);
  useScrollReveal(mainRef);

  return <>
    <Background />
    <SiteNav page="mechanisms" theme={theme} onToggleTheme={toggleTheme} />
    <main ref={mainRef} id="top" className="mechanisms-page">
      <MechanismsHero />
      <MechanismsNav sections={mechanismSections} />
      <div className="mechanisms-shell">
        <RuntimeBackbone sections={runtimeBackboneSections} />
        <div className="mechanisms-content">
          <div className="mechanisms-phase runtime-phase">
            <div className="phase-intro" data-scroll-reveal>
              <span className="phase-index mono">A / 一局怎么走</span>
              <p>从回合开始一路读到事件边界，先看清插件到底做了什么。</p>
            </div>
            <section id="overview" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="01 / 运行流程" title="运行流程" description="从回合接管、事实记录、状态判断到候选复核，按顺序查看插件的运行链路。" />
                <RuntimeFlow />
              </div>
            </section>
            <section id="round-core" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="02 / 回合核心" title="回合核心" description="判断是否接管本局，锁定人数档位和开局编制，并负责回合生命周期。" />
                <RoundCoreSection />
              </div>
            </section>
            <section id="reinforcement" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="03 / 原版增援" title="原版增援接入" description="保留原版阵营、职业、装备、玩家选择和出生流程，插件记录实际波次并应用人数上限。" />
                <ReinforcementSection />
              </div>
            </section>
            <section id="dlrc" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="04 / 响应判断" title="D-LRC Evaluator" description="读取 SCP、基金会、增援、时间和战略危险，计算响应分数、局面状态和最终响应等级。" />
                <DlrcSection />
              </div>
            </section>
            <section id="crisis" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="05 / 危机识别" title="Crisis System" description="七类危机检查器读取同一份回合记录，维护危机状态和每次危机的编号。" />
                <CrisisSection />
              </div>
            </section>
            <section id="fdi" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="06 / 设施记录" title="FDI · Facility Disorder Index" description="用 0–100 表示设施秩序状态，读取当前设施存量和最近事件变化，为普通支援来源选择提供输入。" />
                <FdiSection />
              </div>
            </section>
            <section id="director" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="07 / 事件筛选" title="Event Director" description="读取已确认的回合事实，检查事件条件、人数计划、来源和生命周期，并在启动前重新确认。" />
                <DirectorSection />
              </div>
            </section>
            <section id="event-pack" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="08 / 内容边界" title="Event Pack" description="事件内容包负责角色、装备、出生点和实际执行；当前正式生产内容数量为 0。" />
                <EventPackSection />
              </div>
            </section>
          </div>

          <div className="mechanisms-phase architecture-phase">
            <div className="phase-intro" data-scroll-reveal>
              <span className="phase-index mono">B / 模块怎么接</span>
              <p>一份回合记录怎样从上游传到下游，又怎样在下一局开始前清掉。</p>
            </div>
            <section id="architecture" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="09 / 模块关系" title="模块关系" description="上游模块发布事实，下游模块读取结果，状态在模块之间按边界传递。" />
                <ArchitectureSection />
              </div>
            </section>
            <section id="lifecycle" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="10 / 一局生命周期" title="Runtime Lifecycle" description="展示插件加载、等待玩家、回合开始、持续判断、回合结束和插件关闭的状态变化。" />
                <LifecycleSection />
              </div>
            </section>
          </div>

          <div className="mechanisms-phase hood-phase">
            <div className="phase-intro" data-scroll-reveal>
              <span className="phase-index mono">C / 给维护者看的细节</span>
              <p>需要查配置、服主命令、运行记录和源码路径时，再来这里。</p>
            </div>
            <section id="configuration" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="11 / 配置" title="关键配置" description="列出最低人数、首次判断、更新间隔、设施记录窗口和 Telemetry 容量。" />
                <ConfigurationSection />
              </div>
            </section>
            <section id="commands" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="12 / 服主命令" title="RemoteAdmin Commands" description="列出当前可用的状态查询、响应判断、危机和设施记录命令。" />
                <CommandsSection />
              </div>
            </section>
            <section id="telemetry" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="13 / 运行记录" title="Balance Telemetry" description="只读保存响应判断、危机、设施、增援和回合摘要。" />
                <TelemetrySection />
              </div>
            </section>
            <section id="source" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="14 / 源码路径" title="Source Walkthrough" description="列出一次判断经过的源码入口，供维护者继续追踪。" />
                <SourceSection />
              </div>
            </section>
            <section id="status" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="15 / 当前状态" title="Module Status" description="分别标注已完成、框架完成、开发中、按设计暂缓和等待验证。" />
                <StatusSection />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
    <Footer mechanisms />
  </>;
}
