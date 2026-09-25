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
  return <><Background /><SiteNav page="home" theme={theme} onToggleTheme={toggleTheme} /><main ref={mainRef} className="home-page"><section className="hero" id="top"><div className="container hero-grid"><div><div className="eyebrow mono">它解决什么问题</div><h1>Emergency Events<br /><span>先看懂这一局，再决定要不要介入</span></h1><p className="hero-desc">Emergency Events 是给 SCP: Secret Laboratory / EXILED 服务器用的回合响应框架。它记录本局人数、SCP、阵营增援和设施状态，在条件合适时筛选额外响应；条件不合适，就继续走原版流程。</p><div className="hero-actions"><a className="btn primary" href="#systems">看它怎么工作</a><a className="btn" href="#download">查看当前状态</a><a className="btn" href="https://github.com/qingranawa/Emergency-events" target="_blank" rel="noreferrer">查看源码</a></div><div className="hero-meta mono">回合判断框架已运行 · 正式事件内容尚未开始</div></div><aside className="director-panel" aria-label="一局回合会先判断什么"><div className="panel-label mono">一局回合</div><h2 className="panel-title">它会先判断三件事</h2><ol className="decision-list">{[["这一局有多少人", "已接入"], ["局面压力到了哪里", "已接入"], ["现在有没有危机", "已接入"], ["哪些候选可以介入", "框架已完成"], ["正式事件内容", "尚未制作"]].map(([title, status], index) => <li key={title}><span className="mono">{String(index + 1).padStart(2, "0")}</span><b>{title}</b><em>{status}</em></li>)}</ol></aside></div></section><section id="factions"><div className="container"><SectionHeader kicker="它和谁打交道" title="阵营是接入对象，不是现成事件" description="Emergency Events 保留原版阵营与增援流程。未来的专业响应、第三方组织和事件内容，会在满足回合条件后接入。这里的阵营资料不等于已经发布的生产玩法。" /><FactionCarousel factions={factions} /></div></section><section id="events"><div className="container"><SectionHeader kicker="它什么时候介入" title="事件不是随机蹦出来的" description="系统先看这局发生了什么，再检查事件需要的人数、响应等级和危机条件。开始前条件失效，就不启动。" /><EventStories events={events} /></div></section><section><div className="container"><SectionHeader kicker="一局怎么被记录" title="回合里的变化都会留下来" description="插件先记录开局人数和原版增援，接着观察压力、危机、设施失序和时间变化。" /><RoundTimeline timeline={timeline} /></div></section><section><div className="container"><SectionHeader kicker="为什么会取消" title="开始前再确认一次" description="候选只是计划。真正开始前会再查人数、危机和回合编号；不符合就回滚，不影响原版回合。" /><QualificationPipeline stages={qualificationStages} /></div></section><section id="systems"><div className="container"><SectionHeader kicker="背后的几块" title="每个模块只管一件事" description="回合核心管接管和人数，D-LRC 管响应判断，危机模块管危机状态，事件筛选器管候选，运行记录负责留痕。" /><SystemArchitecture groups={architectureGroups} /></div></section><section className="snapshot-section"><div className="container"><SectionHeader kicker="目前有多完整" title="框架已经能跑，事件内容还没到位" description="下面只列代码和测试已经确认的部分，不把计划中的内容写成已经上线。" /><MetricsWall /></div></section><section><div className="container"><SectionHeader kicker="说到底" title="把“要不要介入”变成可以检查的判断" description="服主能看到插件为什么做出判断，内容作者也能按统一边界加入后续事件。" /><div className="word-wall" aria-label="Emergency Events 项目特性">{keywords.map(([title, text, size], index) => <article className={`word-block ${size}`} key={title}><div className="word-index mono">{String(index + 1).padStart(2, "0")}</div><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section><section><div className="container"><SectionHeader kicker="当前状态" title="能判断，能记录，正式事件还在后面" description="回合运行、危机识别、响应判断和事件筛选框架已经就绪；正式事件包、平衡调校和真人实服验证仍在后面。" /><DevelopmentStatus rows={developmentRows} /><div className="engineering-strip mono">自动化测试通过 · Release 构建通过 · 运行探针可用 · 真人验证待进行</div></div></section><section className="download-section" id="download"><div className="container"><div className="download-panel"><div className="download-copy"><div className="section-kicker mono">开源 / 当前状态</div><h2>现在能看懂框架，事件还在制作</h2><p>当前版本更像一套可靠的判断底座：能记录局势、给出状态、筛选候选，并在条件失效时安全退出。正式事件包要等内容制作和真人验证完成后再发布。</p></div><div className="download-actions"><a className="btn primary" href="https://github.com/qingranawa/Emergency-events" target="_blank" rel="noreferrer">查看源码</a><a className="btn" href="https://github.com/qingranawa/Emergency-events/releases" target="_blank" rel="noreferrer">查看 Releases</a></div></div></div></section></main><Footer /></>;
}
