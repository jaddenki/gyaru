// modal.ts, open/close/render modal panels

import { modalContent } from "../content/data";

export function openModal(id: string): void {
  const content = modalContent[id];
  if (!content) return;

  const overlay = document.getElementById("modal-overlay") as HTMLElement;
  const title = document.getElementById("modal-title") as HTMLElement;
  const subtitle = document.getElementById("modal-subtitle") as HTMLElement;
  const body = document.getElementById("modal-body") as HTMLElement;
  const tags = document.getElementById("modal-tags") as HTMLElement;
  const timeline = document.getElementById("modal-timeline") as HTMLElement;

  title.textContent = content.title;
  subtitle.textContent = content.subtitle;
  body.textContent = content.body;

  // tags
  tags.innerHTML = "";
  if (content.tags) {
    for (const tag of content.tags) {
      const span = document.createElement("span");
      span.textContent = tag;
      span.style.border = "1px solid #999";
      span.style.padding = "2px 6px";
      span.style.marginRight = "4px";
      span.style.display = "inline-block";
      tags.appendChild(span);
    }
  }

  // timeline
  timeline.innerHTML = "";
  if (content.timeline) {
    const ul = document.createElement("ul");
    for (const entry of content.timeline) {
      const li = document.createElement("li");
      li.textContent = `${entry.year} — ${entry.event}`;
      ul.appendChild(li);
    }
    timeline.appendChild(ul);
  }

  overlay.style.display = "block";
}

export function closeModal(): void {
  const overlay = document.getElementById("modal-overlay") as HTMLElement;
  overlay.style.display = "none";
}

export function initModal(): void {
  document
    .getElementById("btn-modal-close")
    ?.addEventListener("click", closeModal);
  // close on overlay background click
  document.getElementById("modal-overlay")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
}
