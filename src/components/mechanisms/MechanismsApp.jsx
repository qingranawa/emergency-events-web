import { useRef } from "react";
import { Background } from "../layout/Background";
import { Footer } from "../layout/Footer";
import { SectionHeader } from "../layout/SectionHeader";
import { SiteNav } from "../layout/SiteNav";
import { useTheme } from "../../hooks/useTheme";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { mechanismNavGroups, mechanismFacts } from "../../data/mechanisms";
import { MechanismsHero } from "./MechanismsHero";
import { MechanismsNav } from "./MechanismsNav";
import { ArchitectureMap } from "./ArchitectureMap";
import { ResponsibilityMatrix } from "./ResponsibilityMatrix";
import { RoundCoreSection } from "./RoundCoreSection";
import { ReinforcementSection } from "./ReinforcementSection";
import { DlrcSection } from "./DlrcSection";
import { CrisisSection } from "./CrisisSection";
import { FdiSection } from "./FdiSection";
import { DirectorSection } from "./DirectorSection";
import { EventPackSection } from "./EventPackSection";
import { O4Section } from "./O4Section";
import { ConfigurationSection, LifecycleSection } from "./OperationsSections";

export function MechanismsApp() {
  const { theme, toggleTheme } = useTheme();
  const mainRef = useRef(null);
  useScrollReveal(mainRef);

  return <>
    <Background />
    <SiteNav page="mechanisms" theme={theme} onToggleTheme={toggleTheme} />
    <main ref={mainRef} id="top" className="mechanisms-page">
      <MechanismsHero />
      <div className="mechanisms-shell">
        <MechanismsNav groups={mechanismNavGroups} />
        <div className="mechanisms-content">
          <section id="system-architecture" className="mechanisms-section" data-scroll-reveal>
            <div className="container">
              <SectionHeader kicker="一局如何运行" title="系统总览" description="从回合开始，到判断局势、选择并执行事件，按一局的顺序看 Emergency Events 如何运作。" />
              <ArchitectureMap />
              <div className="responsibility-heading">
                <h3>各模块负责什么</h3>
                <p>槽位、局势判断、事件计划和实际玩法由不同模块接力完成。</p>
              </div>
              <ResponsibilityMatrix />
            </div>
          </section>

          <section id="round-reinforcement" className="mechanisms-section" data-scroll-reveal>
            <div className="container">
              <SectionHeader kicker="M01 + M02" title="回合与增援" description="M01 决定这一局是否接管、人数档位和开局槽位；M02 只在中途接入原版增援。" />
              <div className="mechanism-subsection">
                <SectionHeader kicker="M01 · 回合核心" title="按人数决定是否接管" description="开局人数达到 16 人才接管。M01 决定各类角色的槽位数量，不决定槽位里具体是谁。" />
                <RoundCoreSection />
              </div>
              <div className="mechanism-subsection">
                <SectionHeader kicker="M02 · 原版增援接入" title="原版增援继续负责生成" description="保留阵营选择、玩家选择、职业组成、装备和生成。M02 只修改明确需要控制的增援边界。" />
                <ReinforcementSection />
              </div>
              <div id="m07" className="gameplay-connection">
                <span className="mono">M07 · 开局职业与技能</span>
                <p>M01 提供名额，M07 决定具体开局身份并提供游戏内技能、状态栏、徽章与场景效果。它不接管中途增援。</p>
                <a className="text-link" href="roles.html">查看角色介绍 →</a>
              </div>
            </div>
          </section>

          <section id="dlrc" className="mechanisms-section" data-scroll-reveal>
            <div className="container">
              <SectionHeader kicker="M03 · 动态封锁响应" title="D-LRC 如何判断局势" description="D-LRC 把威胁、基金会压力、增援与时间等信号综合为 L0–L5 响应等级。" />
              <DlrcSection />
            </div>
          </section>

          <section id="crisis-fdi" className="mechanisms-section" data-scroll-reveal>
            <div className="container">
              <SectionHeader kicker="M04 + M04.5" title="危机与设施混乱度" description="危机系统识别当前正在发生的威胁；FDI 记录设施的累计混乱程度。它们回答不同的问题。" />
              <div className="mechanism-subsection" id="crisis">
                <h3 className="mechanism-subtitle">M04 · 危机检测</h3>
                <CrisisSection />
              </div>
              <div className="mechanism-subsection" id="fdi">
                <h3 className="mechanism-subtitle">M04.5 · 设施混乱度（FDI）</h3>
                <FdiSection />
              </div>
            </div>
          </section>

          <section id="director" className="mechanisms-section" data-scroll-reveal>
            <div className="container">
              <SectionHeader kicker="M05 · 事件调度" title="先决定发生什么，再执行玩法" description="Event Director 筛选、选择并复核事件计划；事件内容包负责让事件真正发生。" />
              <DirectorSection />
              <div className="mechanism-subsection" id="event-pack">
                <h3 className="mechanism-subtitle">事件内容包负责实际玩法</h3>
                <EventPackSection />
              </div>
            </div>
          </section>

          <section id="o4" className="mechanisms-section" data-scroll-reveal>
            <div className="container">
              <SectionHeader kicker="M06 · 观察员选择边界" title="O4 目前尚未开放" description="未来 O4 只能从 Event Director 提供的少量合格候选中选择，不会创建或召唤事件。" />
              <O4Section />
            </div>
          </section>

          <section id="configuration" className="mechanisms-section" data-scroll-reveal>
            <div className="container">
              <SectionHeader kicker="一局的运行与配置" title="运行顺序与关键默认值" description="下列值用于说明当前机制。实际服务器可通过插件配置调整。" />
              <LifecycleSection />
              <ConfigurationSection />
              <details className="mechanism-reference">
                <summary>开发参考</summary>
                <div>
                  <p>逻辑测试基线：{mechanismFacts.testBaseline}。正式服务器构建与服内验证仍待完整服务端程序集和实服环境。</p>
                  <p>FDI 恢复默认周期：{mechanismFacts.fdiRecoverySeconds} 秒；事件内容包仍在开发中。</p>
                </div>
              </details>
            </div>
          </section>
        </div>
      </div>
    </main>
    <Footer mechanisms />
  </>;
}
