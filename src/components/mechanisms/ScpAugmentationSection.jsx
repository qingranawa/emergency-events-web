import { scp0492Details, scpAugmentations } from "../../data/m07";

export function ScpAugmentationSection() {
  return <div className="scp-augmentation-section">
    <div className="m07-subhead">
      <span className="mono">STANDARD SCP AUGMENTATION</span>
      <p>以下是 Base SCP + M07 enhancement profile；这些内容不参与开局 Variant 抽选。</p>
    </div>
    <div className="scp-augmentation-list">
      {scpAugmentations.map((entry) => <article key={entry.id}>
        <div className="scp-augmentation-name"><strong>{entry.name}</strong><span className="mono">{entry.base}</span></div>
        <p>{entry.enhancement}</p>
        {entry.note && <small>{entry.note}</small>}
      </article>)}
    </div>
    <div className="scp0492-followup">
      {scp0492Details.map(([label, detail]) => <article key={label}><span className="mono">{label}</span><p>{detail}</p></article>)}
    </div>
  </div>;
}
