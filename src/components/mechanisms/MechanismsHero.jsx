export function MechanismsHero() {
  return <section className="hero mechanisms-hero" data-scroll-reveal data-motion="hero">
    <div className="container mechanisms-hero-inner">
      <div>
        <div className="eyebrow mono">EMERGENCY EVENTS · MECHANISMS</div>
        <h1>系统机制</h1>
        <p className="hero-desc">从 Round Core、状态评估到 Event Director 和 Gameplay Layer，查看每个模块的职责、数据流、边界与当前验证状态。</p>
        <div className="hero-actions">
          <a className="btn primary" href="#system-architecture">查看系统架构</a>
          <a className="btn" href="#m07">查看 M07 Gameplay Layer</a>
          <a className="btn" href="dlrc.html">查看 D-LRC 详情</a>
        </div>
        <div className="hero-meta mono">M01–M07 边界 · Event Pack execution boundary · population minimum 16</div>
      </div>
      <aside className="mechanism-hero-aside">
        <span className="mono">SYSTEM SNAPSHOT</span>
        <strong>多条运行路径，共享状态事实</strong>
        <p>Round Start opening identity 由 M07 分配；mid-round reinforcement 由 M02 接入；M05 消费状态并规划候选。</p>
        <div className="hero-aside-line"><span>D-LRC first evaluation</span><b>391 sec</b></div>
        <div className="hero-aside-line"><span>D-LRC interval</span><b>30 sec</b></div>
        <div className="hero-aside-line"><span>FDI range</span><b>0–100</b></div>
      </aside>
    </div>
  </section>;
}
