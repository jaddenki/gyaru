// map.ts, zone registration, hover states, click routing

import { zones } from "../content/data";
import Shibuya109Modal from "../content/shibuya109";
import { openModal } from "./modal";
import { startDialogue } from "./dialogue";
import { openMagazine } from "./magazine-renderer";

const mapBackgroundSources = [
  "/assets/map/background.png",
  "/assets/map/background.jpg",
  "/assets/map/background.jpeg",
  "/assets/map/map-background.png",
];

const zoneImageSrc: Record<string, string> = {
  "zone-gyarusa": "/assets/map/gyarusa.png",
  "zone-interview": "/assets/map/news-van.png",
  "zone-109": "/assets/map/shibuya-109.png",
  "zone-magazine": "/assets/map/magazine-rack.png",
};

function handleZoneClick(zoneId: string): void {
  const zone = zones.find((z) => z.id === zoneId);
  if (!zone) return;

  if (zone.interaction === "magazine") {
    openMagazine();
  } else if (zone.interaction === "modal" && zone.modal === "modal-109") {
    Shibuya109Modal.open();
  } else if (zone.interaction === "modal" && zone.modal) {
    openModal(zone.modal);
  } else if (zone.interaction === "dialogue") {
    startDialogue();
  }
}

function buildBackground(container: HTMLElement): void {
  const existing = container.querySelector(".map-background");
  if (existing) return;

  const bg = document.createElement("img");
  bg.className = "map-background";
  bg.alt = "Shibuya map background";
  bg.draggable = false;
  bg.decoding = "async";

  let index = 0;
  const loadNext = (): void => {
    if (index >= mapBackgroundSources.length) {
      bg.classList.add("is-missing");
      return;
    }
    bg.src = mapBackgroundSources[index];
    index += 1;
  };

  bg.addEventListener("load", () => {
    // Guard against accidental 1x1 placeholder exports.
    if (bg.naturalWidth <= 1 || bg.naturalHeight <= 1) {
      loadNext();
      return;
    }
    bg.classList.remove("is-missing");
  });

  bg.addEventListener("error", loadNext);

  loadNext();
  container.appendChild(bg);
}

/** Build zone buttons from data and append to #map-container. */
function createZones(): void {
  const container = document.getElementById("map-container");
  const stage = document.getElementById("map-stage");
  if (!container || !stage) return;

  buildBackground(stage);

  for (const zone of zones) {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "zone";
    el.id = zone.id;
    el.setAttribute("aria-label", zone.label);

    // position from data
    el.style.position = "absolute";
    el.style.top = zone.rect.top;
    el.style.left = zone.rect.left;
    el.style.width = zone.rect.width;
    el.style.height = zone.rect.height;

    const nx = zone.nudge?.x ?? "0";
    const ny = zone.nudge?.y ?? "0";
    if (nx !== "0" || ny !== "0") {
      el.style.transform = `translate(${nx}, ${ny})`;
    }

    const image = zoneImageSrc[zone.id];
    if (image) {
      const img = document.createElement("img");
      img.src = image;
      img.alt = "";
      img.className = "zone-image";
      img.draggable = false;
      el.appendChild(img);
    }

    const label = document.createElement("span");
    label.className = "zone-label";
    label.textContent = zone.label;
    el.appendChild(label);

    el.addEventListener("click", () => handleZoneClick(zone.id));
    stage.appendChild(el);
  }
}

const STAR_PARTICLE_COUNT = 34;

function initMapHeroStarParticles(): void {
  const field = document.querySelector<HTMLElement>(".map-star-field");
  if (!field) return;

  field.replaceChildren();

  for (let i = 0; i < STAR_PARTICLE_COUNT; i++) {
    const p = document.createElement("span");
    p.className = "map-star-particle";
    p.style.left = `${6 + Math.random() * 88}%`;
    p.style.top = `${4 + Math.random() * 92}%`;
    p.style.setProperty("--star-delay", `${Math.random() * 5}s`);
    p.style.setProperty("--star-dur", `${2.2 + Math.random() * 2.8}s`);
    field.appendChild(p);
  }
}

function initGyaruSparkleButton(): void {
  const btn = document.querySelector<HTMLButtonElement>(
    ".map-hero-title__sparkle-btn",
  );
  if (!btn) return;

  const BURST_MS = 950;
  let burstTimer: ReturnType<typeof setTimeout> | undefined;

  const playBurst = (): void => {
    btn.classList.remove("map-hero-title__sparkle-btn--burst");
    void btn.offsetWidth;
    btn.classList.add("map-hero-title__sparkle-btn--burst");
    window.clearTimeout(burstTimer);
    burstTimer = window.setTimeout(() => {
      btn.classList.remove("map-hero-title__sparkle-btn--burst");
    }, BURST_MS);
  };

  btn.addEventListener("click", playBurst);
}

export function initMap(): void {
  createZones();
  initGyaruSparkleButton();
  initMapHeroStarParticles();
}
