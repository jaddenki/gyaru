// main.ts, screen transitions, app init, event delegation

import "../../style/tailwind.css";
import { initMap } from "./map";
import { initModal } from "./modal";
import { initDialogue } from "./dialogue";
import { initMagazine } from "./magazine-renderer";
import { screenCopy } from "../content/data";
import { preloadShibuya109Images } from "../content/shibuya109";

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

function populateScreenCopy(): void {
  // title
  const tagline = document.getElementById("title-tagline");
  const enterBtn = document.getElementById("btn-enter");
  if (tagline) tagline.textContent = screenCopy.title.tagline;
  if (enterBtn) enterBtn.textContent = screenCopy.title.enterButton;

  // map
  const hint = document.getElementById("map-hint");
  if (hint) hint.textContent = screenCopy.map.hintText;

  // modal
  const closeBtn = document.getElementById("btn-modal-close");
  if (closeBtn) closeBtn.textContent = screenCopy.modal.closeButton;

  // dialogue
  const nextBtn = document.getElementById("btn-dialogue-next");
  if (nextBtn) nextBtn.textContent = screenCopy.dialogue.nextButton;
  const introBody = document.getElementById("dialogue-intro-body");
  if (introBody) introBody.textContent = screenCopy.dialogue.introBody;
}

export function initApp(): void {
  populateScreenCopy();
  preloadShibuya109Images();
  initMap();
  initModal();
  initDialogue();
  initMagazine();
  showScreen("map");
}

document.addEventListener("DOMContentLoaded", initApp);
