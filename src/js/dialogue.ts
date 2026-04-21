// dialogue.ts, interview dialogue state machine

import {
  interviewDialogue,
  dialogueCharacters,
  speakerPortraits,
  screenCopy,
} from "../content/data";
import { showBubble, clearBubbles } from "./speechbubble";

let currentLine = 0;
let active = false;
let introPending = false;

function setDialogueTldr(text: string | undefined): void {
  const aside = document.getElementById("dialogue-tldr");
  const label = aside?.querySelector(".dialogue-tldr__label");
  if (!aside || !label) return;
  if (text) {
    label.textContent = text;
    aside.hidden = false;
    aside.removeAttribute("hidden");
  }
}

function setNextButtonLabel(label: string): void {
  const btn = document.getElementById("btn-dialogue-next");
  if (btn) btn.textContent = label;
}

function showInterviewIntro(): void {
  introPending = true;
  const layer = document.getElementById("dialogue-layer");
  const intro = document.getElementById("dialogue-intro");
  if (layer) layer.classList.add("dialogue-layer--intro");
  if (intro) {
    intro.hidden = false;
    intro.removeAttribute("hidden");
  }
  setNextButtonLabel(screenCopy.dialogue.introContinue);
}

function hideInterviewIntro(): void {
  introPending = false;
  const layer = document.getElementById("dialogue-layer");
  const intro = document.getElementById("dialogue-intro");
  if (layer) layer.classList.remove("dialogue-layer--intro");
  if (intro) {
    intro.hidden = true;
    intro.setAttribute("hidden", "");
  }
  setNextButtonLabel(screenCopy.dialogue.nextButton);
}

function setActiveSpeaker(speakerId: string): void {
  const container = document.getElementById("dialogue-characters");
  if (!container) return;
  for (const el of container.querySelectorAll(".dialogue-character-chip")) {
    const id = el.id.replace("character-", "");
    const isActive = speakerId !== "note" && id === speakerId;
    el.classList.toggle("is-active", isActive);
    el.classList.toggle("is-idle", speakerId !== "note" && !isActive);
  }
}

function buildCharacters(): void {
  const container = document.getElementById("dialogue-characters");
  if (!container) return;
  container.innerHTML = "";
  for (const char of dialogueCharacters) {
    const el = document.createElement("div");
    el.id = `character-${char.id}`;
    el.className = "dialogue-character-chip";
    el.style.position = "absolute";
    el.style.bottom = char.position.bottom;
    if (char.position.left) el.style.left = char.position.left;
    if (char.position.right) el.style.right = char.position.right;
    if (char.portrait) {
      const img = document.createElement("img");
      img.className = "dialogue-character-chip__photo";
      img.src = char.portrait;
      img.alt = "";
      img.decoding = "async";
      el.appendChild(img);
    }
    const label = document.createElement("span");
    label.className = "dialogue-character-chip__label";
    label.textContent = char.label;
    el.appendChild(label);
    container.appendChild(el);
  }
}

function onEscapeEndDialogue(e: KeyboardEvent): void {
  if (!active || e.key !== "Escape") return;
  e.preventDefault();
  endDialogue();
}

export function startDialogue(): void {
  document.removeEventListener("keydown", onEscapeEndDialogue);
  document.addEventListener("keydown", onEscapeEndDialogue);

  currentLine = 0;
  active = true;
  clearBubbles();
  const tldrAside = document.getElementById("dialogue-tldr");
  if (tldrAside) {
    tldrAside.hidden = true;
    tldrAside.setAttribute("hidden", "");
  }
  const layer = document.getElementById("dialogue-layer") as HTMLElement;
  layer.style.display = "block";

  showInterviewIntro();
}

function showCurrentLine(): void {
  if (currentLine >= interviewDialogue.length) {
    endDialogue();
    return;
  }
  const line = interviewDialogue[currentLine];
  if (line.tldr) setDialogueTldr(line.tldr);
  setActiveSpeaker(line.speaker);
  showBubble({
    characterId: line.speaker,
    text: line.text,
    position: line.position,
    portrait: speakerPortraits[line.speaker],
  });
}

export function advanceDialogue(): void {
  if (!active) return;
  if (introPending) {
    hideInterviewIntro();
    showCurrentLine();
    return;
  }
  currentLine++;
  showCurrentLine();
}

function endDialogue(): void {
  document.removeEventListener("keydown", onEscapeEndDialogue);

  active = false;
  introPending = false;
  hideInterviewIntro();
  clearBubbles();
  const tldrAside = document.getElementById("dialogue-tldr");
  if (tldrAside) {
    tldrAside.hidden = true;
    tldrAside.setAttribute("hidden", "");
  }
  document
    .querySelectorAll(".dialogue-character-chip")
    .forEach((el) => el.classList.remove("is-active", "is-idle"));
  const layer = document.getElementById("dialogue-layer") as HTMLElement;
  layer.style.display = "none";
}

export function initDialogue(): void {
  buildCharacters();
  document
    .getElementById("btn-dialogue-next")
    ?.addEventListener("click", advanceDialogue);
}
