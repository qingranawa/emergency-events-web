import { useRef } from "react";
import { Background } from "../layout/Background";
import { Footer } from "../layout/Footer";
import { SectionHeader } from "../layout/SectionHeader";
import { SiteNav } from "../layout/SiteNav";
import { FactionCarousel } from "../factions/FactionCarousel";
import { RoundTimeline } from "../round/RoundTimeline";
import { QualificationPipeline } from "../qualification/QualificationPipeline";
import { MetricsWall } from "../systems/MetricsWall";
import { SystemArchitecture } from "../systems/SystemArchitecture";
import { DevelopmentStatus } from "../development/DevelopmentStatus";
import { useTheme } from "../../hooks/useTheme";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { factions } from "../../data/factions";
import { timeline } from "../../data/timeline";
import { qualificationStages } from "../../data/qualification";
import { keywords } from "../../data/systems";
import { developmentRows } from "../../data/development";

function EventBoundary() {
  return <div className="home-event-boundary">
    <article>
      <span className="mono">M05 · EVENT DIRECTOR</span>
      <h3>决定什么计划可以发生</h3>
      <p>读取 M01、M02、有效 D-LRC、Crisis 与 FDI，筛选来源和候选；开始前重新复核并提交。</p>
      <small className="mono">CANDIDATE → REVALIDATE → COMMIT</small>
    </article>
    <div className="home-boundary-arrow mono" aria-hidden="true">COMMITTED PLAN →</div>
    <article>
      <span className="mono">EVENT PACK</span>
      <h3>执行实际事件玩法</h3>
      <p>未来提供 Spawn、Role、Equipment、Ability、Objective、Lifecycle、Rollback 与 Cleanup。</p>
      <small className="mono">IN DEVELOPMENT · PRODUCTION DEFINITIONS: 0</small>
    </article>
  </div>;
}

export function HomeApp() {
  const { theme, toggleTheme } = useTheme();
  const mainRef = useRef(null);
  useScrollReveal(mainRef, ":scope > section");

  return <>
    <Background />
    <SiteNav page="home" theme={theme} onToggleTheme={toggleTheme} />
    <main ref={mainRef} className="home-page">
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow mono">项目定位</div>
            <h1>Emergency Events<br /><span>回合响应与事件接入</span></h1>
            <p className="hero-desc">Emergency Events 是给 SCP: Secret Laboratory / EXILED 服务器用的回合响应框架。它记录本局人数、SCP、阵营增援和设施状态，在条件合适时筛选额外响应；条件不合适，就继续走原版流程。</p>
            <div className="hero-actions">
              <a className="btn primary" href="#systems">查看运行方式</a>
              <a className="btn" href="#download">查看当前状态</a>
              <a className="btn" href="https://github.com/qingranawa/Emergency-events" target="_blank" rel="noreferrer">查看源码</a>
            </div>
            <div className="hero-meta mono">回合运行与 M07 Gameplay 已实现 · 正式事件内容仍在开发</div>
          </div>
          <aside className="director-panel" aria-label="回合判断范围">
            <div className="panel-label mono">一局回合</div>
            <h2 className="panel-title">判断范围</h2>
            <ol className="decision-list">
              {["回合接管与开局槽位", "局势评估与危机", "设施历史状态", "候选选择与复核", "事件玩法执行"].map((title, index) => <li key={title}>
                <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                <b>{title}</b>
                <em>{index === 4 ? "内容开发中" : "已接入"}</em>
              </li>)}
            </ol>
          </aside>
        </div>
      </section>

      <section id="factions">
        <div className="container">
          <SectionHeader kicker="接入范围" title="阵营与组织" description="页面介绍插件可能接触的组织和行动单位；生产事件玩法仍在 Event Pack 内容层开发。" />
          <FactionCarousel factions={factions} />
        </div>
      </section>

      <section id="events">
        <div className="container">
          <SectionHeader kicker="DECISION / EXECUTION" title="Event Director 与 Event Pack" description="M05 决定哪些计划通过资格检查并提交；Event Pack 才负责角色、装备、出生点和目标的实际玩法。" />
          <EventBoundary />
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHeader kicker="回合记录" title="一局会留下哪些信息" description="M01 管开局接管与槽位；M02 记录原版增援；后续模块分别更新响应、危机和设施历史。" />
          <RoundTimeline timeline={timeline} />
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHeader kicker="候选启动" title="提交之前重新复核" description="M05 读取最新局势再次检查资格；复核或执行失败时回滚，不扣成本、不消耗专业响应资格。" />
          <QualificationPipeline stages={qualificationStages} />
        </div>
      </section>

      <section id="systems">
        <div className="container">
          <SectionHeader kicker="UNDER THE HOOD · SYSTEM ARCHITECTURE" title="两条运行路径，一个 Gameplay Layer" description="Round Start 分配开局身份；mid-round 保留原版增援；状态与评估汇入 M05。M07 横跨回合开局和玩家 Gameplay。" />
          <SystemArchitecture />
        </div>
      </section>

      <section className="snapshot-section">
        <div className="container">
          <SectionHeader kicker="当前实现" title="框架与内容分开看" description="数据来自当前插件主线源码与测试文档；生产事件内容和实服验证保持单独标注。" />
          <MetricsWall />
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHeader kicker="项目价值" title="让回合判断有迹可循" description="服主能看到插件为什么做出判断，内容作者也能沿模块边界加入后续玩法。" />
          <div className="word-wall" aria-label="Emergency Events 项目特性">
            {keywords.map(([title, text, size], index) => <article className={`word-block ${size}`} key={title}>
              <div className="word-index mono">{String(index + 1).padStart(2, "0")}</div>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>)}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHeader kicker="开发状态" title="当前实现状态" description="M07 已通过逻辑测试；正式 SCP:SL server build 和 live smoke test 仍受本地缺失服务端程序集阻塞。" />
          <DevelopmentStatus rows={developmentRows} />
          <div className="engineering-strip mono">M07 逻辑测试：313 / 313 · Plugin build：BLOCKED · Live validation：PENDING</div>
        </div>
      </section>

      <section className="download-section" id="download">
        <div className="container">
          <div className="download-panel">
            <div className="download-copy">
              <div className="section-kicker mono">开源 / 当前状态</div>
              <h2>当前版本</h2>
              <p>当前版本提供回合运行、状态评估、事件决策框架和 M07 Gameplay Layer。生产 EventDefinition 尚未注册；正式事件内容仍在开发。</p>
            </div>
            <div className="download-actions">
              <a className="btn primary" href="https://github.com/qingranawa/Emergency-events" target="_blank" rel="noreferrer">查看源码</a>
              <a className="btn" href="https://github.com/qingranawa/Emergency-events/releases" target="_blank" rel="noreferrer">查看 Releases</a>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
