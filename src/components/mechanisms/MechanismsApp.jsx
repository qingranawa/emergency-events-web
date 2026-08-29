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
              <span className="phase-index mono">A / RUNTIME</span>
              <p>从回合事实到事件边界，沿着同一条运行主干阅读整个系统。</p>
            </div>
            <section id="overview" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="01 / RUNTIME OVERVIEW" title="一局游戏中的 Emergency Events" description="从回合开始到记录结果，所有模块都围绕同一份回合事实协作。" />
                <RuntimeFlow />
              </div>
            </section>
            <section id="round-core" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="02 / M01" title="Round Core" description="M01 决定本局是否由 Emergency Events 接管，并在回合开始锁定人口档位与开局编制。" />
                <RoundCoreSection />
              </div>
            </section>
            <section id="reinforcement" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="03 / M02" title="Reinforcement Integration" description="插件保留原版增援的决定与出生流程，只在已发布的刷新边界记录事实并应用自己的上限策略。" />
                <ReinforcementSection />
              </div>
            </section>
            <section id="dlrc" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="04 / M03" title="D-LRC 评估" description="D-LRC 将回合快照中的五组压力输入合成为 0–100 分，再按人口档位解析 L0–L5。" />
                <DlrcSection />
              </div>
            </section>
            <section id="crisis" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="05 / M04" title="Crisis System" description="CrisisManager 在每次合法评估中调用七个 Detector，独立维护 Active 状态和 Episode。" />
                <CrisisSection />
              </div>
            </section>
            <section id="fdi" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="06 / M04.5" title="Facility Disorder Index" description="FDI 记录设施秩序的持续变化，是独立的历史事实，也只临时影响普通 SUPPORT 来源仲裁。" />
                <FdiSection />
              </div>
            </section>
            <section id="director" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="07 / M05" title="Event Director" description="M05 负责事件资格、Population Plan、候选筛选和生命周期调度，生产事件内容仍由 Event Pack 提供。" />
                <DirectorSection />
              </div>
            </section>
            <section id="event-pack" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="08 / CONTENT BOUNDARY" title="Event Pack" description="Event Pack 是角色、装备、出生点和实际事件行为的内容边界，当前正式生产内容尚未制作。" />
                <EventPackSection />
              </div>
            </section>
          </div>

          <div className="mechanisms-phase architecture-phase">
            <div className="phase-intro" data-scroll-reveal>
              <span className="phase-index mono">B / SYSTEM ARCHITECTURE</span>
              <p>Runtime 已经产生的事实，如何在模块之间传递、清理并回到下一局。</p>
            </div>
            <section id="architecture" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="09 / ARCHITECTURE" title="模块如何连接" description="上游模块发布事实，下游模块消费同一份结果，避免重复推导。" />
                <ArchitectureSection />
              </div>
            </section>
            <section id="lifecycle" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="10 / LIFECYCLE" title="运行周期" description="Plugin enable、回合启动、评估、观察和清理都由 Plugin.cs 的事件钩子串联。" />
                <LifecycleSection />
              </div>
            </section>
          </div>

          <div className="mechanisms-phase hood-phase">
            <div className="phase-intro" data-scroll-reveal>
              <span className="phase-index mono">C / UNDER THE HOOD</span>
              <p>配置、命令、Telemetry 与源码路径，页面在这里收束为工程参考。</p>
            </div>
            <section id="configuration" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="11 / CONFIGURATION" title="关键配置" description="这里只列出影响机制理解的默认值，不复制整份 Config。" />
                <ConfigurationSection />
              </div>
            </section>
            <section id="commands" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="12 / REMOTE ADMIN" title="管理员命令" description="以下是 RemoteAdmin parser 当前支持的生产查询与控制命令，ee test 诊断入口不伪装成生产功能。" />
                <CommandsSection />
              </div>
            </section>
            <section id="telemetry" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="13 / OBSERVABILITY" title="Telemetry 记录" description="BalanceTelemetryService 是只读观察器，不参与 Gameplay 决策。" />
                <TelemetrySection />
              </div>
            </section>
            <section id="source" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="14 / SOURCE WALKTHROUGH" title="从代码看一次判断" description="下面列出一条从回合事实到 Director 的真实调用路径，路径均来自当前插件源码。" />
                <SourceSection />
              </div>
            </section>
            <section id="status" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="15 / CURRENT STATUS" title="当前实现状态" description="已实现、框架完成、开发中、暂缓和等待验证分别标出，避免把设计边界写成已上线功能。" />
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
