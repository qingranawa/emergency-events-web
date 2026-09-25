import { useState } from "react";
import { populationProfiles, roundCoreFacts } from "../../data/mechanisms";

export function RoundCoreSection() {
  const [selectedTier, setSelectedTier] = useState("C");
  const selectedProfile = populationProfiles.find((profile) => profile.tier === selectedTier) || populationProfiles[0];

  return <div className="round-core-layout" data-scroll-reveal data-motion="sequence">
    <div className="round-core-sequence" aria-label="回合核心运行周期">
      {roundCoreFacts.sequence.map(([state, detail], index) => <div className="round-core-step" style={{ "--motion-delay": `${index * 78}ms` }} key={state}>
        <span className="round-core-step-index mono">0{index + 1}</span>
        <i className="round-core-dot" aria-hidden="true" />
        <strong>{state}</strong>
        <p>{detail}</p>
        {index < roundCoreFacts.sequence.length - 1 && <span className="round-core-arrow" aria-hidden="true">→</span>}
      </div>)}
    </div>
    <div className="round-core-details">
      <div className="round-core-copy">
        <span className="mechanism-label mono">回合核心负责什么</span>
        <ul>{roundCoreFacts.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
        <p className="source-line mono">{roundCoreFacts.source}</p>
      </div>
      <div className="population-scale-panel">
        <div className="mechanism-label mono">人数档位 · 16–45 人</div>
        <div className="population-ruler-scale" aria-label="人数档位范围">
          <div className="population-ruler-axis" aria-hidden="true"><span>16</span><span>20</span><span>26</span><span>32</span><span>38</span><span>45</span></div>
          <div className="population-ruler-track" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="population-ruler-tiers">{populationProfiles.map((profile) => <button type="button" className={`population-tier-button ${selectedTier === profile.tier ? "is-selected" : ""}`} key={profile.tier} onClick={() => setSelectedTier(profile.tier)} onFocus={() => setSelectedTier(profile.tier)} aria-pressed={selectedTier === profile.tier}><strong>{profile.tier}</strong><span>{profile.range}</span><small>{profile.note}</small></button>)}</div>
        </div>
        <div className="population-profile-detail"><span className="mono">当前档位</span><strong>{selectedProfile.tier} · {selectedProfile.range} 人</strong><p>原版增援人数上限：{selectedProfile.cap}，{selectedProfile.note}。</p></div>
        <p className="section-note">16 人以下继续走原版流程；46 人以上标记 unsupported，不强套组成表。</p>
      </div>
    </div>
    <div className="round-core-statuses" aria-label="回合核心状态边界">{roundCoreFacts.lifecycle.map(([state, detail]) => <div key={state}><span className="mono">{state}</span><p>{detail}</p></div>)}</div>
  </div>;
}
