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
                <SectionHeader kicker="01 / 一局怎么走" title="从开局到候选，插件经过哪些步骤" description="插件围绕同一份回合记录工作：先接管，再记录，再判断，最后在开始前复核。" />
                <RuntimeFlow />
              </div>
            </section>
            <section id="round-core" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="02 / 回合核心" title="这一局要不要接管" description="人数达到最低要求后，回合核心锁定本局人数档位和开局编制；人数不够就继续走原版流程。" />
                <RoundCoreSection />
              </div>
            </section>
            <section id="reinforcement" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="03 / 原版增援" title="原版增援还是原版负责" description="插件不替原版决定谁出生，只记录实际波次，并在规定边界内应用人数上限。" />
                <ReinforcementSection />
              </div>
            </section>
            <section id="dlrc" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="04 / 响应判断" title="系统怎样判断这一局的压力" description="它会综合 SCP、基金会、增援、时间和战略危险，得到响应分数和最终响应等级。" />
                <DlrcSection />
              </div>
            </section>
            <section id="crisis" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="05 / 危机识别" title="危机只回答：现在发生了吗" description="系统分别检查七类危机，记录它们什么时候开始、持续多久、什么时候结束。" />
                <CrisisSection />
              </div>
            </section>
            <section id="fdi" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="06 / 设施记录" title="设施发生过什么，会留下记录" description="设施失序记录保存历史变化，只会临时影响普通支援从哪个来源产生。" />
                <FdiSection />
              </div>
            </section>
            <section id="director" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="07 / 事件筛选" title="谁来决定候选能不能开始" description="事件筛选器检查条件、安排人数、生成候选，并在真正开始前重新确认；它不负责具体装备和出生点。" />
                <DirectorSection />
              </div>
            </section>
            <section id="event-pack" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="08 / 内容边界" title="正式事件内容还在后面" description="未来的事件内容包负责角色、装备、出生点和实际执行；当前正式生产内容还没有制作。" />
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
                <SectionHeader kicker="09 / 模块关系" title="每个模块只管一件事" description="上游记录事实，下游读取结果，不在不同地方重复计算同一件事。" />
                <ArchitectureSection />
              </div>
            </section>
            <section id="lifecycle" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="10 / 一局生命周期" title="从加载到清理" description="插件加载、等待玩家、回合开始、持续判断和回合结束，都有清楚的清理边界。" />
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
                <SectionHeader kicker="11 / 配置" title="影响行为的几个数字" description="这里只列最低人数、首次判断、更新间隔和设施记录窗口，不把整份配置搬过来。" />
                <ConfigurationSection />
              </div>
            </section>
            <section id="commands" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="12 / 服主命令" title="可以查什么" description="这些命令用于查看状态和诊断；测试入口不会凭空创建正式事件。" />
                <CommandsSection />
              </div>
            </section>
            <section id="telemetry" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="13 / 运行记录" title="只读保存判断结果" description="运行记录不参与回合决策，只把响应、危机、波次和设施变化保存下来。" />
                <TelemetrySection />
              </div>
            </section>
            <section id="source" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="14 / 源码路径" title="想继续深挖，可以从这里开始" description="下面列出一次判断经过的源码入口，适合维护者继续追踪。" />
                <SourceSection />
              </div>
            </section>
            <section id="status" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="15 / 当前状态" title="哪些已经能用，哪些还没有" description="运行框架、事件内容、观察者面板和真人验证分开标注，不把计划写成上线功能。" />
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
