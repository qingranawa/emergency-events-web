import { useMemo, useState } from "react";
import { directorDemoFacts, directorFacts } from "../../data/mechanisms";

const populationOrder = ["E", "D", "C", "B", "A"];

function getCandidateChecks(candidate, phase) {
  const context = directorDemoFacts.context;
  const checks = [
    { phase: 1, failed: context.responseLevel < candidate.requiredLevel, reason: `响应等级不足：需要 L${candidate.requiredLevel}` },
    { phase: 2, failed: !context.crisisTags.includes(candidate.requiredCrisis), reason: `需要 ${candidate.requiredCrisis}` },
    { phase: 3, failed: populationOrder.indexOf(context.population) < populationOrder.indexOf(candidate.minimumPopulation), reason: `人数不满足：需要 ${candidate.minimumPopulation} 档` },
    { phase: 4, failed: !candidate.currentSituationEligible, reason: "当前设施状态或所需人员条件不满足" },
  ];
  const completed = checks.filter((check) => phase >= check.phase);
  return {
    reasons: completed.filter((check) => check.failed).map((check) => check.reason),
    checked: completed.length,
    eligible: completed.length === checks.length && completed.every((check) => !check.failed),
  };
}

export function DirectorSection() {
  const [phase, setPhase] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const rows = useMemo(() => directorDemoFacts.candidates.map((candidate) => ({
    ...candidate,
    ...getCandidateChecks(candidate, phase),
  })), [phase]);
  const eligible = rows.filter(({ eligible: isEligible }) => isEligible);
  const reset = () => {
    setPhase(0);
    setSelectedCandidate(null);
    setOutcome(null);
  };
  const advance = () => {
    setOutcome(null);
    setPhase((current) => Math.min(current + 1, directorDemoFacts.stages.length - 1));
  };
  const chooseCandidate = (candidateId) => {
    setSelectedCandidate(candidateId);
    setPhase(7);
    setOutcome(null);
  };

  const activeLabel = directorDemoFacts.stages[phase];
  const demoCrisis = directorDemoFacts.context.crisisTags[0];
  const demoCode = `DLRC-${directorDemoFacts.context.population}${directorDemoFacts.context.responseLevel}-${directorDemoFacts.context.crisisTags.join("+")}`;

  return <div className="director-mechanism">
    <div className="director-demo" aria-label="Event Director 候选筛选机制演示">
      <div className="director-demo-heading">
        <div><span className="mono">候选筛选 · 手动推进</span><p>{directorDemoFacts.label}</p></div>
        <button type="button" data-action="director-reset" onClick={reset}>重置演示</button>
      </div>

      <ol className="director-demo-progress" aria-label="候选处理阶段">
        {directorDemoFacts.stages.map((label, index) => <li className={index === phase ? "is-current" : index < phase ? "is-complete" : ""} aria-current={index === phase ? "step" : undefined} key={label}>
          <span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong>
        </li>)}
      </ol>

      <div className="director-context-line">
        <span>本次模拟局势</span><strong>档位 {directorDemoFacts.context.population}</strong><strong>{demoCode}</strong><strong>危机 {demoCrisis}</strong>
      </div>

      <div className="director-candidate-list" aria-label="演示候选列表">
        {rows.map((candidate) => {
          const rejected = candidate.reasons.length > 0;
          const isSelected = selectedCandidate === candidate.id;
          return <article className={`director-candidate ${rejected ? "is-rejected" : ""} ${isSelected ? "is-selected" : ""}`} key={candidate.id}>
            <div className="director-candidate-title"><span className="mono">候选 {candidate.id}</span><strong>{candidate.eligible ? "符合条件" : rejected ? "未通过" : "待检查"}</strong></div>
            <div className="director-candidate-rules">
              <span>响应 L{candidate.requiredLevel}+</span><span>需要 {candidate.requiredCrisis}</span><span>{candidate.minimumPopulation} 档起</span>
            </div>
            <div className="director-candidate-reason">
              {rejected ? candidate.reasons.join(" · ") : candidate.eligible ? (phase >= 5 ? candidate.source : "已通过资格检查，待来源仲裁") : candidate.checked === 0 ? "等待资格检查" : "已通过当前检查"}
            </div>
            {isSelected && <span className="director-selected-label">已选中计划 · 尚未启动</span>}
          </article>;
        })}
      </div>

      {phase >= 6 && <div className="director-o4-branch" id="director-o4-branch">
        <div className="director-o4-copy"><span className="mono">M06 · O4 有限选择</span><p>只展示已通过筛选的基金会普通支援候选。选择结果返回 M05，仍要经过复核。</p></div>
        <div className="director-o4-options" role="group" aria-label="模拟 O4 从有限候选中选择">
          {eligible.filter(({ source }) => source.startsWith("基金会")).map((candidate) => <button
            type="button"
            data-action="o4-choice"
            aria-pressed={selectedCandidate === candidate.id}
            className={selectedCandidate === candidate.id ? "is-selected" : ""}
            onClick={() => chooseCandidate(candidate.id)}
            key={candidate.id}
          >选候选 {candidate.id}</button>)}
          <span>输入的是说明演示；未连接真实 O4 投票会话。</span>
        </div>
      </div>}

      {phase >= 7 && <div className="director-current-plan" aria-live="polite">
        <span>返回 M05 的选中计划</span><strong>候选 {selectedCandidate}</strong><p>选中只代表一份计划；还没有生成角色、装备或事件内容。</p>
      </div>}

      {phase >= 8 && <div className="director-revalidation">
        <span className="mono">启动前重新检查</span>
        <p>Event Director 使用最新局势复核响应等级、危机、人数计划、设施状态与人员。任一条件变化，都会取消本次启动尝试。</p>
      </div>}

      {phase === 9 && <div className="director-start-attempt">
        <span className="mono">尝试启动</span>
        <p>选择一个模拟结果，说明 Commit 与失败回滚的边界。不会在游戏服务器中启动事件。</p>
        <div>
          <button type="button" onClick={() => setOutcome("commit")}>模拟启动成功 · Commit</button>
          <button type="button" onClick={() => setOutcome("rollback")}>模拟启动失败 · 回滚</button>
        </div>
      </div>}

      {outcome && <p className={`director-outcome ${outcome}`} role="status" aria-live="polite">
        {outcome === "commit"
          ? "模拟 Commit：计划启动成功后，才算事件真正开始。此处仍只是机制演示。"
          : "未启动 / 回滚：不扣成本、不消耗专业响应资格，也不安排 Event #2。"}
      </p>}

      <div className="director-demo-controls">
        <p role="status" aria-live="polite">当前步骤：{activeLabel}{phase === 7 ? ` · 候选 ${selectedCandidate} 已返回 M05` : ""}</p>
        {phase < 9 && <button type="button" data-action="director-next-step" onClick={advance} disabled={phase === 6}>
          {phase === 5 ? "进入 O4 有限选择" : phase === 6 ? "先选择一个候选" : phase === 7 ? "再次检查最新局势" : phase === 8 ? "尝试启动" : `下一步：${directorDemoFacts.stages[phase + 1]}`}
        </button>}
      </div>
    </div>

    <div className="director-boundary-wide">
      <article><span className="mono">决定事件计划</span><h3>Event Director</h3><p>它决定当前哪些计划符合条件、由什么来源进入候选，以及是否通过最新局势复核。</p></article>
      <article className="director-pack-boundary"><span className="mono">执行实际玩法</span><h3>事件内容包</h3><p>事件内容包负责生成角色和装备、提供目标与玩法，并在结束或失败后清理场景。</p></article>
    </div>

    <div className="director-principles">
      <p><b>响应顺序：</b>专业危机响应优先。只有普通支援事件才会按基金会、混沌分裂者、第三方等来源进行仲裁；FDI 只会临时影响普通支援的来源权重。</p>
    </div>

    <div className="director-failure-path">
      <strong>复核或启动失败</strong>
      <div>{directorFacts.failure.map((state) => <span key={state}>{state}</span>)}</div>
    </div>

    <div className="director-event2-branch">
      <div className="module-panel-heading"><span className="mono">第二个事件</span><strong>{directorFacts.event2Note}</strong></div>
      <ol className="event2-timeline">{directorFacts.event2.map(([label, detail]) => <li key={label}><span>{detail}</span><strong>{label}</strong></li>)}</ol>
    </div>
  </div>;
}
