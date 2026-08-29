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
  return <><Background /><SiteNav page="home" theme={theme} onToggleTheme={toggleTheme} /><main ref={mainRef} className="home-page"><section className="hero" id="top"><div className="container hero-grid"><div><div className="eyebrow mono">插件概览</div><h1>Emergency Events<br /><span>更多阵营，更多事件</span></h1><p className="hero-desc">Emergency Events 为 SCP: Secret Laboratory / EXILED 提供多阵营事件框架。系统会读取当前回合数据，再决定哪些单位可以介入以及采用哪种方式。</p><div className="hero-actions"><a className="btn primary" href="https://github.com/qingranawa/Emergency-events" target="_blank" rel="noreferrer">GitHub 仓库</a><a className="btn" href="https://github.com/qingranawa/Emergency-events/releases" target="_blank" rel="noreferrer">下载插件 / Releases</a><a className="btn" href="#systems">查看插件系统</a></div><div className="hero-meta mono">核心运行时已就绪 · 事件内容开发中</div></div><aside className="director-panel" aria-label="阵营与事件"><div className="panel-label mono">阵营 / 事件</div><h2 className="panel-title">阵营与介入方式</h2><ol className="decision-list">{[["基金会响应力量", "开发中"], ["混沌渗透与特殊行动", "开发中"], ["第三方势力介入", "计划中"], ["设施异常与战略事件", "开发中"], ["事件后续与连续响应", "框架已完成"]].map(([title, status], index) => <li key={title}><span className="mono">{String(index + 1).padStart(2, "0")}</span><b>{title}</b><em>{status}</em></li>)}</ol></aside></div></section><section id="factions"><div className="container"><SectionHeader kicker="阵营与组织" title="阵营与选择" description="统一入口可以接入组织、专业单位和第三方势力。正式阵营会随着 Event Pack 逐步加入，尚未发布的内容不会显示成现成玩法。" /><FactionCarousel factions={factions} /></div></section><section id="events"><div className="container"><SectionHeader kicker="动态事件" title="事件资格检查" description="每类事件都有自己的资格、目标和影响方式。系统读取当前回合数据，再从可用内容中选出合适的介入。" /><EventStories events={events} /></div></section><section><div className="container"><SectionHeader kicker="Emergency Events 回合" title="回合数据" description="开局先确定力量关系，后续评估再根据回合变化筛选事件。一次介入的结果会进入下一次判断。" /><RoundTimeline timeline={timeline} /></div></section><section><div className="container"><SectionHeader kicker="事件资格" title="资格判断" description="事件开始前会再次检查人数、危机和当前响应状态。条件失效时取消，不打断正在进行的回合。" /><QualificationPipeline stages={qualificationStages} /></div></section><section id="systems"><div className="container"><SectionHeader kicker="系统内部" title="系统关系" description="系统分别处理回合数据、危机判断、事件资格和 Telemetry，新阵营和新事件可以单独加入。" /><SystemArchitecture groups={architectureGroups} /></div></section><section className="snapshot-section"><div className="container"><SectionHeader kicker="系统概览" title="运行数据" description="这里放的是页面和代码里已经确认的档位、响应等级和自动化验证数量。" /><MetricsWall /></div></section><section><div className="container"><SectionHeader kicker="为什么是 Emergency Events" title="事件与回合" description="服主可以看到运行边界，内容作者可以按约定加入 Event Pack，后续开发也有明确的接口。" /><div className="word-wall" aria-label="Emergency Events 项目特性">{keywords.map(([title, text, size], index) => <article className={`word-block ${size}`} key={title}><div className="word-index mono">{String(index + 1).padStart(2, "0")}</div><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section><section><div className="container"><SectionHeader kicker="开发状态" title="开发进度" description="Core Runtime 和 Event Director framework 已经可以继续开发，正式事件内容和真人实服验证还没有完成。" /><DevelopmentStatus rows={developmentRows} /><div className="engineering-strip mono">182 个自动化测试 · Release 构建通过 · Runtime probes 可用 · 等待真人验证</div></div></section><section className="download-section" id="download"><div className="container"><div className="download-panel"><div className="download-copy"><div className="section-kicker mono">开源 / 下载</div><h2>Emergency Events 尚在开发中</h2><p>核心运行时和扩展框架已经就绪。正式事件包会在内容制作和真人验证完成后发布；现在可以查看源码或关注 Releases 页面。</p></div><div className="download-actions"><a className="btn primary" href="https://github.com/qingranawa/Emergency-events" target="_blank" rel="noreferrer">GitHub 仓库</a><a className="btn" href="https://github.com/qingranawa/Emergency-events/releases" target="_blank" rel="noreferrer">Releases · 即将发布</a></div></div></div></section></main><Footer /></>;
}
