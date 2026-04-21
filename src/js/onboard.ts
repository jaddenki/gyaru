// onboard.ts, character creation state + logic (3-step flow)

import { playerState, showScreen } from "./main";
import { substyles } from "../content/data";

let currentStep = 1;

function showStep(step: number): void {
  currentStep = step;
  document.querySelectorAll(".onboard-step").forEach((el) => {
    (el as HTMLElement).style.display = "none";
  });
  const target = document.getElementById(`onboard-step-${step}`);
  if (target) target.style.display = "block";

  // update progress dots
  document.querySelectorAll(".dot").forEach((dot) => {
    dot.classList.toggle(
      "active",
      dot.getAttribute("data-step") === String(step),
    );
  });
}

function populateSubstyles(): void {
  const container = document.getElementById("substyle-options");
  if (!container) return;
  container.innerHTML = "";
  for (const s of substyles) {
    const btn = document.createElement("button");
    btn.className = "substyle-option";
    btn.setAttribute("data-substyle", s.id);
    btn.textContent = `${s.emoji} ${s.label}`;
    btn.addEventListener("click", () => {
      playerState.substyle = s.id;
      container
        .querySelectorAll("button")
        .forEach((b) => b.removeAttribute("data-selected"));
      btn.setAttribute("data-selected", "true");
    });
    container.appendChild(btn);
  }
}

export function initOnboard(): void {
  populateSubstyles();

  // base selection
  document.querySelectorAll(".base-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      playerState.base = btn.getAttribute("data-base");
      document
        .querySelectorAll(".base-option")
        .forEach((b) => b.removeAttribute("data-selected"));
      btn.setAttribute("data-selected", "true");
    });
  });

  // next/back buttons
  document
    .getElementById("btn-next-1")
    ?.addEventListener("click", () => showStep(2));
  document
    .getElementById("btn-back-2")
    ?.addEventListener("click", () => showStep(1));
  document
    .getElementById("btn-next-2")
    ?.addEventListener("click", () => showStep(3));
  document
    .getElementById("btn-back-3")
    ?.addEventListener("click", () => showStep(2));

  // finish
  document.getElementById("btn-finish")?.addEventListener("click", () => {
    const input = document.getElementById(
      "name-input",
    ) as HTMLInputElement | null;
    playerState.name = input?.value || "anon";
    showScreen("map");
  });
}
