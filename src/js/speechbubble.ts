// speechbubble.ts  speech bubble / annotation system

export interface BubbleOptions {
  characterId: string;
  text: string;
  position: "left" | "right" | "center";
  portrait?: string;
}

function scrollLogToBottom(scrollRoot: HTMLElement): void {
  const instant =
    typeof matchMedia !== "undefined" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;
  scrollRoot.scrollTo({
    top: scrollRoot.scrollHeight,
    behavior: instant ? "auto" : "smooth",
  });
}

export function showBubble(options: BubbleOptions): void {
  const scrollRoot = document.getElementById("dialogue-scroll");
  const container = document.getElementById("bubble-container");
  const parent = scrollRoot ?? container;
  if (!parent) return;

  const row = document.createElement("div");
  row.className = `speech-log-row speech-log-row--${options.position}`;

  const rise = document.createElement("div");
  rise.className = "speech-bubble-rise";

  if (options.portrait) {
    const img = document.createElement("img");
    img.className = "speech-bubble-avatar";
    img.src = options.portrait;
    img.alt = "";
    img.decoding = "async";
    rise.appendChild(img);
  }

  const bubble = document.createElement("div");
  const speakerClass =
    options.characterId === "note"
      ? "speech-bubble--note"
      : options.characterId === "ganguro"
        ? "speech-bubble--ganguro"
        : "speech-bubble--reporter";
  bubble.className = `speech-bubble ${speakerClass}`;
  bubble.textContent = options.text;

  rise.appendChild(bubble);
  row.appendChild(rise);
  parent.appendChild(row);

  if (scrollRoot) {
    requestAnimationFrame(() => scrollLogToBottom(scrollRoot));
  }
}

export function clearBubbles(): void {
  const scrollRoot = document.getElementById("dialogue-scroll");
  if (scrollRoot) {
    scrollRoot.innerHTML = "";
    return;
  }
  const container = document.getElementById("bubble-container");
  if (container) container.innerHTML = "";
}
