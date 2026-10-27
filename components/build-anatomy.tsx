"use client";

import { useState, type KeyboardEvent } from "react";

const stages = [
  { name: "IDEA", headline: "MAKE IT CLEAR.", copy: "I turn real problems into clear directions, defining what matters before writing the first line of code.", actions: "DISCOVER / DEFINE / PLAN" },
  { name: "INTERFACE", headline: "MAKE IT FEEL EFFORTLESS.", copy: "I build responsive, accessible interfaces where visual clarity and thoughtful interactions work together.", actions: "DESIGN / BUILD / REFINE" },
  { name: "LOGIC", headline: "MAKE IT WORK.", copy: "I connect user actions to reliable functionality through well-structured APIs and clean business rules.", actions: "CONNECT / VALIDATE / SECURE" },
  { name: "DATA", headline: "MAKE IT LAST.", copy: "I design dependable data models and efficient flows that keep the product consistent as it grows.", actions: "MODEL / QUERY / OPTIMIZE" },
  { name: "DEPLOYMENT", headline: "MAKE IT LIVE.", copy: "I prepare applications for production, monitor how they perform, and keep improving them after launch.", actions: "TEST / RELEASE / MONITOR" },
];

export function BuildAnatomy() {
  const [active, setActive] = useState(0);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === "ArrowDown" || event.key === "ArrowRight" ? (index + 1) % stages.length
      : event.key === "ArrowUp" || event.key === "ArrowLeft" ? (index - 1 + stages.length) % stages.length
      : event.key === "Home" ? 0 : event.key === "End" ? stages.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`anatomy-tab-${next}`)?.focus();
  };

  return <>
    <div className="anatomy-grid">
      <div className="anatomy-steps" role="tablist" aria-label="Product build stages">
        {stages.map((stage, index) => (
          <button key={stage.name} id={`anatomy-tab-${index}`} role="tab" aria-controls="anatomy-panel" aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => onTabKeyDown(event, index)}>
            <span>0{index + 1}</span>{stage.name}
          </button>
        ))}
      </div>
      <div className="anatomy-panel" id="anatomy-panel" role="tabpanel" aria-labelledby={`anatomy-tab-${active}`} tabIndex={0}>
        <span>STAGE {String(active + 1).padStart(2, "0")}</span>
        <h3>{stages[active].name}</h3>
        <h4>{stages[active].headline}</h4>
        <p>{stages[active].copy}</p>
        <small>{stages[active].actions}</small>
        <div className="anatomy-progress" aria-label="Build stage progress">
          <div className="anatomy-progress-steps">
            {stages.map((stage, index) => <button key={stage.name} type="button" data-complete={index <= active} aria-label={`Go to stage ${String(index + 1).padStart(2, "0")}: ${stage.name}`} aria-current={active === index ? "step" : undefined} onClick={() => setActive(index)} />)}
          </div>
        </div>
      </div>
    </div>
  </>;
}
