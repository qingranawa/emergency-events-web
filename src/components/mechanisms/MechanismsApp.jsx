import { useRef } from "react";
import { Background } from "../layout/Background";
import { Footer } from "../layout/Footer";
import { SectionHeader } from "../layout/SectionHeader";
import { SiteNav } from "../layout/SiteNav";
import { useTheme } from "../../hooks/useTheme";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { mechanismNavGroups } from "../../data/mechanisms";
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
import { GameplayLayerSection } from "./GameplayLayerSection";
import {
  CommandsSection,
  ConfigurationSection,
  LifecycleSection,
  TelemetrySection,
} from "./OperationsSections";

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
          <div className="mechanisms-phase architecture-phase">
            <section id="system-architecture" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="SYSTEM ARCHITECTURE" title="系统架构" description="Round Start 与 mid-round 有各自的运行路径；M07 连接开局槽位和玩家 Gameplay，M05 接收状态事实后规划候选。" />
                <ArchitectureMap />
              </div>
            </section>
            <section id="responsibilities" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="RESPONSIBILITY MATRIX" title="模块职责矩阵" description="每个模块都标出所有权、输入、输出、边界和当前状态。" />
                <ResponsibilityMatrix />
              </div>
            </section>
          </div>

          <div className="mechanisms-phase runtime-phase">
            <div className="phase-intro" data-scroll-reveal>
              <span className="phase-index mono">01 / RUNTIME BACKBONE</span>
              <p>M01 接管本局并定义 opening slot 数量；M02 保留 Vanilla mid-round reinforcement 流程。</p>
            </div>
            <section id="round-core" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="M01 · ROUND CORE" title="回合核心" description="Round Start 人口决定是否接管；M01 锁定 PopulationTier、RoundId 与 Composition slot 数量。" />
                <RoundCoreSection />
              </div>
            </section>
            <section id="reinforcement" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="M02 · REINFORCEMENT INTEGRATION" title="原版增援接入" description="M02 只处理 mid-round reinforcement，保留 Vanilla faction choice、player selection、composition、equipment 和 spawn。" />
                <ReinforcementSection />
              </div>
            </section>
          </div>

          <div className="mechanisms-phase state-phase">
            <div className="phase-intro" data-scroll-reveal>
              <span className="phase-index mono">02 / STATE & EVALUATION</span>
              <p>D-LRC 输出响应等级；Crisis 维护 Tags 与 Episodes；FDI 记录历史设施失序。</p>
            </div>
            <section id="dlrc" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="M03 · D-LRC EVALUATOR" title="Dynamic Lockdown Response Code" description="从五组局势输入计算响应分数、Control 上限、最终 L0–L5 等级与正式 DLRC Code。" />
                <DlrcSection />
              </div>
            </section>
            <section id="crisis" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="M04 · CRISIS TAGS + EPISODES" title="Crisis System" description="七类 detector 在每次有效 evaluation 后更新 Active / Inactive 状态，并按迁移维护 Episode。" />
                <CrisisSection />
              </div>
            </section>
            <section id="fdi" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="M04.5 · FACILITY DISORDER INDEX" title="设施混乱度与历史状态" description="FDI 以 0–100 记录设施失序历史；PERIODIC 推进结算窗口，其他触发只观察。" />
                <FdiSection />
              </div>
            </section>
          </div>

          <div className="mechanisms-phase decision-phase">
            <div className="phase-intro" data-scroll-reveal>
              <span className="phase-index mono">03 / DECISION & CONTENT</span>
              <p>M05 形成并复核计划，Event Pack 执行已提交的实际玩法；M06 在限定候选边界内返回选择结果。</p>
            </div>
            <section id="director" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="M05 · EVENT DIRECTOR" title="Event Director" description="从已注册定义中检查资格、仲裁来源、形成计划，并在启动和提交前读取最新 context 复核。" />
                <DirectorSection />
              </div>
            </section>
            <section id="event-pack" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="EVENT PACK · EXECUTION CONTENT" title="事件内容包" description="Event Pack 提供 Spawn、Role、Equipment、Abilities、Objectives、Lifecycle、Rollback 与 Cleanup。" />
                <EventPackSection />
              </div>
            </section>
            <section id="o4" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="M06 · O4 PANEL" title="有限候选选择边界" description="O4 接收 M05 已经完成来源仲裁的 Foundation normal SUPPORT shortlist；M05 保留最终 revalidation 与生命周期控制。" />
                <O4Section />
              </div>
            </section>
          </div>

          <div className="mechanisms-phase gameplay-phase">
            <div className="phase-intro" data-scroll-reveal>
              <span className="phase-index mono">04 / GAMEPLAY LAYER</span>
              <p>M07 横跨 Round Start 分配与玩家在场内的持续 Gameplay Runtime。</p>
            </div>
            <section id="m07" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="M07 · OPENING ROLE & ABILITY SYSTEM" title="开局职业与技能系统" description="M07 负责具体开局身份、Role Variant、SCP enhancement、Ability、Shared HUD、Badge 与 WorldEffect。" />
                <GameplayLayerSection />
              </div>
            </section>
          </div>

          <div className="mechanisms-phase operations-phase">
            <div className="phase-intro" data-scroll-reveal>
              <span className="phase-index mono">05 / OPERATIONS REFERENCE</span>
              <p>配置、RemoteAdmin 和 Telemetry 供维护者查阅。</p>
            </div>
            <section id="lifecycle" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="RUNTIME LIFECYCLE" title="一局生命周期" description="各服务在 WaitingForPlayers、Round Start、Low Population 与 Round End 边界同步状态。" />
                <LifecycleSection />
              </div>
            </section>
            <section id="configuration" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="CONFIGURATION" title="关键配置" description="展示最低人数、默认 D-LRC 周期、wave cap、FDI recovery 与 Crisis 开关。" />
                <ConfigurationSection />
              </div>
            </section>
            <section id="commands" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="REMOTE ADMIN" title="服主命令" description="当前 RemoteAdmin 提供的只读状态和诊断查询入口。" />
                <CommandsSection />
              </div>
            </section>
            <section id="telemetry" data-scroll-reveal>
              <div className="container">
                <SectionHeader kicker="BALANCE TELEMETRY" title="运行记录" description="记录结果供回看；Telemetry 不替代上游模块的正式事实。" />
                <TelemetrySection />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
    <Footer mechanisms />
  </>;
}
