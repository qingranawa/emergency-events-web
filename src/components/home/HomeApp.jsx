import { useRef } from "react";
import { Background } from "../layout/Background";
import { Footer } from "../layout/Footer";
import { SectionHeader } from "../layout/SectionHeader";
import { SiteNav } from "../layout/SiteNav";
import { FactionCarousel } from "../factions/FactionCarousel";
import { EventStories } from "../events/EventStories";
import { RoundTimeline } from "../round/RoundTimeline";
import { QualificationPipeline } from "../qualification/QualificationPipeline";
import { MetricsWall } from "../systems/MetricsWall";
import { SystemArchitecture } from "../systems/SystemArchitecture";
import { DevelopmentStatus } from "../development/DevelopmentStatus";
import { useTheme } from "../../hooks/useTheme";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { factions } from "../../data/factions";
import { events } from "../../data/events";
import { timeline } from "../../data/timeline";
import { qualificationStages } from "../../data/qualification";
import { architectureGroups, keywords } from "../../data/systems";
import { developmentRows } from "../../data/development";

export function HomeApp() {
  const { theme, toggleTheme } = useTheme();
  const mainRef = useRef(null);
  useScrollReveal(mainRef, ":scope > section");
  return <><Background /><SiteNav page="home" theme={theme} onToggleTheme={toggleTheme} /><main ref={mainRef} className="home-page"><section className="hero" id="top"><div className="container hero-grid"><div><div className="eyebrow mono">项目定位</div><h1>Emergency Events<br /><span>回合响应与事件接入</span></h1><p className="hero-desc">Emergency Events 是给 SCP: Secret Laboratory / EXILED 服务器用的回合响应框架。它记录本局人数、SCP、阵营增援和设施状态，在条件合适时筛选额外响应；条件不合适，就继续走原版流程。</p><div className="hero-actions"><a className="btn primary" href="#systems">查看运行方式</a><a className="btn" href="#download">查看当前状态</a><a className="btn" href="https://github.com/qingranawa/Emergency-events" target="_blank" rel="noreferrer">查看源码</a></div><div className="hero-meta mono">回合判断框架已运行 · 正式事件内容尚未开始</div></div><aside className="director-panel" aria-label="回合判断范围"><div className="panel-label mono">一局回合</div><h2 className="panel-title">判断范围</h2><ol className="decision-list">{[["开局人数", "已接入"], ["局面压力", "已接入"], ["危机状态", "已接入"], ["候选筛选", "框架已完成"], ["正式事件内容", "尚未制作"]].map(([title, status], index) => <li key={title}><span className="mono">{String(index + 1).padStart(2, "0")}</span><b>{title}</b><em>{status}</em></li>)}</ol></aside></div></section><section id="factions"><div className="container"><SectionHeader kicker="接入范围" title="阵营与组织" description="页面介绍插件可能接触的组织和行动单位；具体生产内容按回合条件逐步接入，当前状态以开发进度为准。" /><FactionCarousel factions={factions} /></div></section><section id="events"><div className="container"><SectionHeader kicker="事件资格" title="事件怎么获得资格" description="系统先读取当前局势，再检查人数、响应等级、危机条件和可用人员。开始前条件失效，候选就会退出。" /><EventStories events={events} /></div></section><section><div className="container"><SectionHeader kicker="回合记录" title="一局会留下哪些信息" description="插件先记录开局人数和原版增援，接着观察压力、危机、设施失序和时间变化。" /><RoundTimeline timeline={timeline} /></div></section><section><div className="container"><SectionHeader kicker="启动检查" title="候选启动前还要复核" description="真正开始前会重新确认人数、危机、响应等级和回合编号；条件失效时安全回滚。" /><QualificationPipeline stages={qualificationStages} /></div></section><section id="systems"><div className="container"><SectionHeader kicker="模块分工" title="每个模块各管一块" description="回合核心管接管和人数，响应判断管局势，危机模块管危机状态，事件筛选器管候选，运行记录负责留痕。" /><SystemArchitecture groups={architectureGroups} /></div></section><section className="snapshot-section"><div className="container"><SectionHeader kicker="当前实现" title="框架与内容分开看" description="下面只列源码和测试已经确认的部分，计划中的事件内容单独标出。" /><MetricsWall /></div></section><section><div className="container"><SectionHeader kicker="项目价值" title="让回合判断有迹可循" description="服主能看到插件为什么做出判断，内容作者也能按统一边界加入后续事件。" /><div className="word-wall" aria-label="Emergency Events 项目特性">{keywords.map(([title, text, size], index) => <article className={`word-block ${size}`} key={title}><div className="word-index mono">{String(index + 1).padStart(2, "0")}</div><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section><section><div className="container"><SectionHeader kicker="开发状态" title="当前实现状态" description="回合运行、危机识别、响应判断和事件筛选框架已经就绪；正式事件包、平衡调校和真人实服验证仍在后面。" /><DevelopmentStatus rows={developmentRows} /><div className="engineering-strip mono">自动化测试通过 · Release 构建通过 · 运行探针可用 · 真人验证待进行</div></div></section><section className="download-section" id="download"><div className="container"><div className="download-panel"><div className="download-copy"><div className="section-kicker mono">开源 / 当前状态</div><h2>当前版本</h2><p>当前版本提供回合判断、局势记录、候选筛选和安全回滚的运行底座。正式事件包要等内容制作和真人验证完成后再发布。</p></div><div className="download-actions"><a className="btn primary" href="https://github.com/qingranawa/Emergency-events" target="_blank" rel="noreferrer">查看源码</a><a className="btn" href="https://github.com/qingranawa/Emergency-events/releases" target="_blank" rel="noreferrer">查看 Releases</a></div></div></div></section></main><Footer /></>;
}
