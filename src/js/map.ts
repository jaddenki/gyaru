// map.ts, zone registration, hover states, click routing

import { zones } from "../content/data";
import { openModal } from "./modal";
import { startDialogue } from "./dialogue";

function handleZoneClick(zoneId: string): void {
  const zone = zones.find((z) => z.id === zoneId);
  if (!zone) return;

  if (zone.interaction === "modal" && zone.modal) {
    openModal(zone.modal);
  } else if (zone.interaction === "dialogue") {
    startDialogue();
  }
}

/** Build zone divs from data and append to #map-container. */
function createZones(): void {
  const container = document.getElementById("map-container");
  if (!container) return;

  for (const zone of zones) {
    const el = document.createElement("div");
    el.className = "zone";
    el.id = zone.id;
    el.textContent = `[${zone.label.toUpperCase()}]`;
    el.style.cursor = "pointer";

    // position from data
    el.style.position = "absolute";
    el.style.top = zone.rect.top;
    el.style.left = zone.rect.left;
    el.style.width = zone.rect.width;
    el.style.height = zone.rect.height;

    // wireframe border
    el.style.border = "2px dashed #999";

    el.addEventListener("click", () => handleZoneClick(zone.id));
    container.appendChild(el);
  }
}

export function initMap(): void {
  createZones();
}
