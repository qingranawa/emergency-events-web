import { lifecycleStages, mechanismFacts, populationProfiles } from "../../data/mechanisms";

export function LifecycleSection() {
  return <ol className="lifecycle-timeline">{lifecycleStages.map(([stage, detail]) => <li key={stage}>
    <strong>{stage}</strong><p>{detail}</p>
  </li>)}</ol>;
}

export function ConfigurationSection() {
  return <div className="mechanism-defaults" aria-label="当前机制默认值">
    <article><strong>接管门槛</strong><span>开局至少 {mechanismFacts.minimumPlayers} 人</span><p>接管后若人数跌破门槛，本局不会重新恢复接管。</p></article>
    <article><strong>人数档位</strong><span>{populationProfiles.map(({ tier, range }) => `${tier} 档 ${range} 人`).join(" · ")}</span><p>回合开始后锁定本局档位。</p></article>
    <article><strong>D-LRC 评估</strong><span>首次 {Math.floor(mechanismFacts.evaluationStartSeconds / 60)} 分 {mechanismFacts.evaluationStartSeconds % 60} 秒 · 之后每 {mechanismFacts.evaluationIntervalSeconds} 秒</span><p>第一次评估约在回合开始后 06:31。</p></article>
    <article><strong>原版主要增援人数上限</strong><span>{Object.entries(mechanismFacts.primaryWaveCaps).map(([tier, cap]) => `${tier} 档 ${cap} 人`).join(" · ")}</span><p>这是最多人数，不保证一定会生成到上限。</p></article>
    <article><strong>FDI 首次结算与恢复</strong><span>约 06:31 开始结算 · 默认静默 90 秒后满足恢复检查</span><p>恢复仍会受到当前危机和设施状态影响。</p></article>
  </div>;
}
