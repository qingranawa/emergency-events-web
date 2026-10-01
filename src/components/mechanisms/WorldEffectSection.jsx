import { worldEffectContract } from "../../data/m07";

export function WorldEffectSection() {
  return <div className="world-effect-section">
    <div className="world-effect-origin">
      <span className="mono">SCP-049 · ACTIVE SLOT 1</span>
      <strong>疫病弥漫</strong>
      <span>Room WorldEffect</span>
    </div>
    <div className="world-effect-facts">
      <article><span className="mono">SCOPE</span><strong>{worldEffectContract.scope}</strong></article>
      <article><span className="mono">TAGS</span><div className="world-effect-tags">{worldEffectContract.tags.map((tag) => <span className="mono" key={tag}>{tag}</span>)}</div></article>
      <article><span className="mono">METADATA</span><p>{worldEffectContract.metadata.join(" · ")}</p></article>
      <article><span className="mono">CLEANUP</span><p>{worldEffectContract.lifecycle.join(" · ")}</p></article>
    </div>
    <div className="world-effect-contract">
      <code>IWorldEffectService.TryCleanse(...)</code>
      <p>{worldEffectContract.contract}</p>
    </div>
    <p className="world-effect-note">Owner death 不会单独清理污染。房间灯光尝试使用 RGB 0.25 / 0.55 / 0.30 的低饱和绿色 visual lease；lease 不安全或不可用时跳过 tint，污染与伤害逻辑仍按 effect 生命周期运行。</p>
  </div>;
}
