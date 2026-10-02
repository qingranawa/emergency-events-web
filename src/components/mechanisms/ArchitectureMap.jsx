import { useState } from "react";

const roundFlow = [
  { title: "开局", detail: "新一局开始，先判断是否达到 Emergency Events 接管条件。" },
  { title: "M01 锁定人数档位", detail: "按开局人数确定 E–A 档；开局后不随人数变化重算。" },
  { title: "生成开局角色槽位", detail: "确定 D 级人员、科学家、安保人员与 SCP 的名额。" },
  { title: "M07 分配具体身份", detail: "把槽位分配给具体职业、变体、SCP 强化与技能。", gameplayBranch: true },
  { title: "原版增援继续运行", detail: "M02 接入中途增援，限制上限并记录真实生成结果。" },
  {
    title: "判断局势",
    detail: "三套系统观察同一局势，各自回答不同问题，再交给 Event Director。",
    assessment: [
      ["D-LRC", "L0–L5", "需要多高响应"],
      ["危机系统", "BIO / SYS / CON / SEC / GOI / WAR / END", "当前出现哪类威胁"],
      ["FDI", "0–100", "设施累计混乱程度"],
    ],
  },
  { title: "Event Director 选择事件计划", detail: "检查条件、仲裁来源、复核最新局势；O4 只在有限候选分支中选择。" },
  { title: "事件发生 · Event Pack 执行", detail: "只有计划通过提交后，事件内容包才执行实际玩法。" },
];

export function ArchitectureMap() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [traceRevision, setTraceRevision] = useState(0);

  const activate = (index) => {
    setActiveIndex(index);
    setTraceRevision((revision) => revision + 1);
  };

  return <div className="system-map">
    <p className="system-map-caption">一局的运行接力。选择任一节点查看它接收什么、把什么交给下一步；以下均为机制说明，不是实时服务器状态。</p>
    <ol className="system-map-flow" aria-label="一局 Emergency Events 的运行路径">
      {roundFlow.map((step, index) => <li
        className={`system-map-step ${activeIndex === index ? "is-active" : ""} ${activeIndex !== null && index < activeIndex ? "is-reached" : ""}`}
        key={step.title}
      >
        <button
          className="system-map-node"
          type="button"
          aria-pressed={activeIndex === index}
          onFocus={() => { if (activeIndex !== index) activate(index); }}
          onClick={() => activate(index)}
        >
          <span className="system-map-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <strong>{step.title}</strong>
          <span className="system-map-step-detail">{step.detail}</span>
        </button>
        {step.gameplayBranch && <div className="system-map-gameplay-branch">
          <span className="mono">M07 持续 Gameplay</span>
          <p>身份分配后仍负责特殊职业、技能、共享 HUD、Badge 与 WorldEffect。</p>
        </div>}
        {step.assessment && <ul className="system-map-assessment" aria-label="局势判断包含三个不同结果">
          {step.assessment.map(([name, value, meaning]) => <li key={name}>
            <span>{name}</span><strong>{value}</strong><small>{meaning}</small>
          </li>)}
        </ul>}
        {index < roundFlow.length - 1 && <span
          className={`system-map-link ${activeIndex !== null && index < activeIndex ? "is-reached" : ""} ${activeIndex === index ? "is-tracing" : ""}`}
          aria-hidden="true"
          key={activeIndex === index ? traceRevision : "idle"}
        />}
      </li>)}
    </ol>
  </div>;
}
