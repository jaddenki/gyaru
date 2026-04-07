// speechbubble.ts  speech bubble / annotation system

import { bubblePositions } from "../content/data";

export interface BubbleOptions {
  characterId: string;
  text: string;
  position: "left" | "right" | "center";
}

export function showBubble(options: BubbleOptions): void {
  const container = document.getElementById("bubble-container");
  if (!container) return;

  container.innerHTML = "";

  const bubble = document.createElement("div");
  bubble.className = "speech-bubble";
  bubble.textContent = options.text;
  bubble.style.border = "1px solid #000";
  bubble.style.padding = "8px 12px";
  bubble.style.background = "#fff";
  bubble.style.position = "absolute";
  bubble.style.maxWidth = "300px";

  const posStyles = bubblePositions[options.position];
  if (posStyles) {
    for (const [prop, val] of Object.entries(posStyles)) {
      bubble.style.setProperty(prop, val);
    }
  }

  container.appendChild(bubble);
}

export function clearBubbles(): void {
  const container = document.getElementById("bubble-container");
  if (container) container.innerHTML = "";
}
