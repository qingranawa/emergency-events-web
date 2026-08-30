import { useEffect, useRef, useState } from "react";

const DISPLAY_INTERVAL_MS = 4600;

function getScoreDigits(score) {
  return String(score).padStart(2, "0");
}

function getCrisisCode(state) {
  return state.secondary === "—" ? state.primary : `${state.primary}+${state.secondary}`;
}

function OdometerDigit({ value, previousValue, direction, animate }) {
  if (!animate || value === previousValue) {
    return <span className="odometer-window" aria-hidden="true"><span className="odometer-face">{value}</span></span>;
  }

  return <span className={`odometer-window odometer-window-${direction}`} aria-hidden="true">
    <span className="odometer-face odometer-face-previous">{previousValue}</span>
    <span className="odometer-face odometer-face-current">{value}</span>
  </span>;
}

function CrisisCodeTransition({ value, previousValue, animate, className = "" }) {
  if (!animate || value === previousValue) return <span className={className}>{value}</span>;

  return <span className={`crisis-code-switch ${className}`} aria-hidden="true">
    <span className="crisis-code-old">{previousValue}</span>
    <span className="crisis-code-new">{value}</span>
  </span>;
}

export function LiveResponse({ states = [], demoLabel = "SIMULATED" }) {
  const [index, setIndex] = useState(0);
  const hasAdvancedRef = useRef(false);
  const stateCount = states.length;
  const current = stateCount > 0 ? states[index % stateCount] : null;
  const animate = hasAdvancedRef.current;
  const previous = animate ? states[(index + stateCount - 1) % stateCount] : current;
  const currentLevel = current?.response.replace(/^L/, "") || "0";
  const previousLevel = previous?.response.replace(/^L/, "") || currentLevel;
  const currentScore = current ? getScoreDigits(current.score) : "00";
  const previousScore = previous ? getScoreDigits(previous.score) : currentScore;

  useEffect(() => {
    if (stateCount < 2) return undefined;

    let timerId;
    const scheduleAdvance = () => {
      timerId = window.setTimeout(() => {
        hasAdvancedRef.current = true;
        setIndex((value) => (value + 1) % stateCount);
        scheduleAdvance();
      }, DISPLAY_INTERVAL_MS);
    };

    scheduleAdvance();
    return () => window.clearTimeout(timerId);
  }, [stateCount]);

  if (!current) return null;

  return (
    <section className="live-code-section">
      <div className="container">
        <div className="demo-ribbon mono">{demoLabel}</div>
        <div className="live-code">
          <div className="code-panel">
            <div className="label mono">当前响应代码</div>
            <div className="dlrc-code mono" aria-live="polite" aria-label={current.code}>
              <span aria-hidden="true">DLRC-</span>
              <OdometerDigit key={`population-${index}`} value={current.population} previousValue={previous.population} direction="up" animate={animate} />
              <OdometerDigit key={`level-${index}`} value={currentLevel} previousValue={previousLevel} direction="down" animate={animate} />
              <span aria-hidden="true">-</span>
              <CrisisCodeTransition key={`crisis-code-${index}`} value={getCrisisCode(current)} previousValue={getCrisisCode(previous)} animate={animate} className="crisis-code-main" />
            </div>
            <div className="code-detail">
              <div className="tag">人口档位 · {current.population}</div>
              <div className="tag">响应等级 · {current.response}</div>
              <div className="tag bio" aria-label={`Crisis · ${current.primary}`}>Crisis · <CrisisCodeTransition key={`primary-${index}`} value={current.primary} previousValue={previous.primary} animate={animate} /></div>
              <div className="tag sys" aria-label={`Crisis · ${current.secondary}`}>Crisis · <CrisisCodeTransition key={`secondary-${index}`} value={current.secondary} previousValue={previous.secondary} animate={animate} /></div>
            </div>
          </div>
          <div className="metric-panel">
            <div>
              <div className="label mono">Response Score</div>
              <div className="score mono" aria-label={`Response Score ${current.score} / 100`}>
                <span className="score-value" aria-hidden="true">
                  {currentScore.split("").map((digit, digitIndex) => <OdometerDigit key={`score-${index}-${digitIndex}`} value={digit} previousValue={previousScore[digitIndex] || "0"} direction={digitIndex === 0 ? "up" : "down"} animate={animate} />)}
                </span>
                <small aria-hidden="true">/ 100</small>
              </div>
              <div className="progress" aria-label="响应分数进度">
                <div key={`progress-${index}`} className={`progress-fill ${animate ? "is-springing" : ""}`} style={{ "--progress": current.score / 100, "--progress-from": previous.score / 100 }} />
              </div>
            </div>
            <div>
              <div className="label">ControlState</div>
              <div className="control-state">{current.state}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
