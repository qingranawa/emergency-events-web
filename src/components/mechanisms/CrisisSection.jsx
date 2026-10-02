import { useState } from "react";
import { crisisFacts } from "../../data/mechanisms";

const labels = {
  BIO: "生物危机",
  SYS: "系统危机",
  CON: "收容危机",
  SEC: "安全危机",
  GOI: "第三方组织介入",
  WAR: "核武危机",
  END: "终局状态",
};

export function CrisisSection() {
  const [selectedTag, setSelectedTag] = useState("BIO");
  const selected = crisisFacts.find(({ tag }) => tag === selectedTag) || crisisFacts[0];

  return <div className="crisis-system">
    <p className="crisis-selector-note">选择一种危机查看说明。这里的选择只是阅读切换；一局中可以同时存在多种危机。</p>
    <div className="crisis-selector" role="group" aria-label="选择查看哪一种危机">
      {crisisFacts.map(({ tag }) => <button
        className={`crisis-selector-button ${selectedTag === tag ? "is-selected" : ""}`}
        key={tag}
        type="button"
        aria-pressed={selectedTag === tag}
        onClick={() => setSelectedTag(tag)}
      >
        <span className="mono">{tag}</span><span>{labels[tag]}</span>
      </button>)}
    </div>

    <article className="crisis-explanation" aria-live="polite" aria-atomic="true">
      <div className="crisis-explanation-heading">
        <span className="crisis-tag-code mono">{selected.tag}</span>
        <h4>{labels[selected.tag]}</h4>
      </div>
      <dl className="crisis-explanation-grid">
        <div><dt>它代表什么</dt><dd>{selected.signal}</dd></div>
        <div><dt>什么时候触发</dt><dd>{selected.rule}</dd></div>
        <div><dt>它如何参与判断</dt><dd>{selected.note}</dd></div>
      </dl>
      <div className="crisis-episode-flow" aria-label="危机阶段：出现，持续，解除，再次出现时进入新阶段">
        <span>出现</span><i aria-hidden="true" /><span>持续</span><i aria-hidden="true" /><span>解除</span><i aria-hidden="true" /><span>再次出现 · 新阶段</span>
      </div>
      <p className="crisis-episode-note">同一场连续危机会维持同一个阶段；条件解除后再次满足，才会建立新的阶段。</p>
    </article>
    <p className="crisis-separation-note"><b>危机系统回答“出现了什么威胁”。</b> D-LRC 回答“需要多高响应”；Event Director 再检查两者是否符合候选计划条件。</p>
  </div>;
}
