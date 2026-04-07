// dialogue.ts, interview dialogue state machine

import { interviewDialogue, dialogueCharacters } from "../content/data";
import { showBubble, clearBubbles } from "./speechbubble";

let currentLine = 0;
let active = false;

function buildCharacters(): void {
  const container = document.getElementById("dialogue-characters");
  if (!container) return;
  container.innerHTML = "";
  for (const char of dialogueCharacters) {
    const el = document.createElement("div");
    el.id = `character-${char.id}`;
    el.textContent = `[${char.label}]`;
    el.style.position = "absolute";
    el.style.bottom = char.position.bottom;
    if (char.position.left) el.style.left = char.position.left;
    if (char.position.right) el.style.right = char.position.right;
    container.appendChild(el);
  }
}

export function startDialogue(): void {
  currentLine = 0;
  active = true;
  const layer = document.getElementById("dialogue-layer") as HTMLElement;
  layer.style.display = "block";
  showCurrentLine();
}

function showCurrentLine(): void {
  if (currentLine >= interviewDialogue.length) {
    endDialogue();
    return;
  }
  const line = interviewDialogue[currentLine];
  showBubble({
    characterId: line.speaker,
    text: line.text,
    position: line.position,
  });
}

export function advanceDialogue(): void {
  if (!active) return;
  currentLine++;
  showCurrentLine();
}

function endDialogue(): void {
  active = false;
  clearBubbles();
  const layer = document.getElementById("dialogue-layer") as HTMLElement;
  layer.style.display = "none";
}

export function initDialogue(): void {
  buildCharacters();
  document
    .getElementById("btn-dialogue-next")
    ?.addEventListener("click", advanceDialogue);
}
