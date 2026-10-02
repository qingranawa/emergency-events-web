import { mechanismFacts } from "../../data/mechanisms";

export function MechanismsHero() {
  return <section className="hero mechanisms-hero" data-scroll-reveal data-motion="hero">
    <div className="container mechanisms-hero-inner">
      <div>
        <div className="eyebrow mono">EMERGENCY EVENTS · 机制说明</div>
        <h1>一局如何运行</h1>
        <p className="hero-desc">从开局接管、原版增援到局势评估和事件执行，用玩家与服主都能看懂的方式说明各机制如何配合。</p>
        <div className="hero-actions">
          <a className="btn primary" href="#system-architecture">查看一局流程</a>
          <a className="btn" href="#round-reinforcement">回合与增援</a>
          <a className="btn" href="#director">事件如何发生</a>
        </div>
        <div className="hero-meta mono">最低接管人数 {mechanismFacts.minimumPlayers} · 首次局势评估约 06:31 · FDI 范围 0–100</div>
      </div>
      <aside className="mechanism-hero-aside" aria-label="运行要点">
        <span className="mono">运行要点</span>
        <strong>开局定名额，中途看局势，满足条件后安排事件。</strong>
        <p>M01 决定开局槽位，M07 为槽位分配具体身份；M02 保留原版的中途增援流程。</p>
        <div className="hero-aside-line"><span>首次响应评估</span><b>06:31</b></div>
        <div className="hero-aside-line"><span>后续评估间隔</span><b>30 秒</b></div>
        <div className="hero-aside-line"><span>增援人数上限</span><b>E 档 6 · D 档 6 · C 档 8 · B 档 14 · A 档 18</b></div>
      </aside>
    </div>
  </section>;
}
