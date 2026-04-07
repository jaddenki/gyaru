// main.ts, screen transitions, app init, event delegation

import { initMap } from "./map";
import { initModal } from "./modal";
import { initDialogue } from "./dialogue";
import { screenCopy } from "../content/data";

export type Screen = "title" | "onboard" | "map";

export interface PlayerState {
  base: string | null;
  substyle: string | null;
  name: string;
}

export const playerState: PlayerState = {
  base: null,
  substyle: null,
  name: "",
};

export function showScreen(screen: Screen): void {
  document
    .querySelectorAll(".screen")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById(`screen-${screen}`)?.classList.add("active");
}

export function updateBadge(): void {
  const badge = document.getElementById("player-badge");
  if (badge) {
    badge.textContent = `${playerState.name} — ${playerState.substyle}`;
  }
}

function populateScreenCopy(): void {
  // title
  const tagline = document.getElementById("title-tagline");
  const enterBtn = document.getElementById("btn-enter");
  if (tagline) tagline.textContent = screenCopy.title.tagline;
  if (enterBtn) enterBtn.textContent = screenCopy.title.enterButton;

  // map
  const hint = document.getElementById("map-hint");
  const badge = document.getElementById("player-badge");
  if (hint) hint.textContent = screenCopy.map.hintText;
  if (badge) badge.textContent = screenCopy.map.defaultBadge;

  // modal
  const closeBtn = document.getElementById("btn-modal-close");
  if (closeBtn) closeBtn.textContent = screenCopy.modal.closeButton;

  // dialogue
  const nextBtn = document.getElementById("btn-dialogue-next");
  if (nextBtn) nextBtn.textContent = screenCopy.dialogue.nextButton;
}

export function initApp(): void {
  populateScreenCopy();
  initMap();
  initModal();
  initDialogue();
  showScreen("map");
}

document.addEventListener("DOMContentLoaded", initApp);
