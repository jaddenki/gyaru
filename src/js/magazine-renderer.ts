// magazine-renderer.ts — image-based magazine flip-book
// Each spread is a single image (both pages) exported from Figma.
// To add pages: drop files into assets/ui/magazine/pages/ and add paths to magazine-pages.ts.

import { magazineCoverCaption } from '../content/magazine'
import { magazineImageUrls, pages } from '../content/magazine-pages'

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      img
        .decode()
        .then(() => resolve())
        .catch(() => resolve())
    }
    img.onerror = () => resolve()
    img.src = url
  })
}

function startMagazinePreload(): void {
  void Promise.all(magazineImageUrls().map(preloadImage))
}

const state = { spreadIndex: 0 }

const SPREAD_ALTS = [
  'egg magazine spread 1',
  'egg magazine spread 2',
  'egg magazine spread 3',
] as const

function getOverlay() { return document.getElementById('magazine-overlay') as HTMLElement }
function getCoverEl() { return document.getElementById('magazine-cover-row') as HTMLElement }
function getSpreadEl() { return document.getElementById('magazine-spread') as HTMLElement }
function getSpreadImg() { return document.getElementById('magazine-spread-img') as HTMLImageElement }

function renderCover() {
  getCoverEl().style.display = 'flex'
  getSpreadEl().style.display = 'none'
}

function renderSpread(index: number) {
  const src = pages[index]
  if (!src) return
  state.spreadIndex = index
  const img = getSpreadImg()
  img.src = src
  img.alt = SPREAD_ALTS[index] ?? 'magazine spread'
  getCoverEl().style.display = 'none'
  getSpreadEl().style.display = 'flex'
  updateNavButtons()
}

function updateNavButtons() {
  const next = document.getElementById('btn-magazine-next') as HTMLButtonElement
  if (!next) return
  next.textContent = state.spreadIndex < pages.length - 1 ? '→' : '↩'
}

export function openMagazine(): void {
  getOverlay().style.display = 'flex'
  renderCover()
}

/** Open overlay on a specific spread (e.g. from Shibuya 109). Index matches `pages` in magazine-pages. */
export function openMagazineAtSpread(index: number): void {
  const overlay = getOverlay()
  overlay.style.display = 'flex'
  const max = pages.length - 1
  renderSpread(Math.max(0, Math.min(index, max)))
}

export function closeMagazine(): void {
  getOverlay().style.display = 'none'
}

export function initMagazine(): void {
  startMagazinePreload()

  const coverCaption = document.querySelector('#magazine-cover-caption')
  if (coverCaption) coverCaption.textContent = magazineCoverCaption

  document.getElementById('btn-magazine-close')?.addEventListener('click', closeMagazine)
  getOverlay()?.addEventListener('click', (e) => {
    if (e.target === getOverlay()) closeMagazine()
  })

  document.getElementById('btn-magazine-open')?.addEventListener('click', () => renderSpread(0))

  document.getElementById('btn-magazine-prev')?.addEventListener('click', () => {
    if (state.spreadIndex > 0) renderSpread(state.spreadIndex - 1)
    else renderCover()
  })

  document.getElementById('btn-magazine-next')?.addEventListener('click', () => {
    if (state.spreadIndex < pages.length - 1) renderSpread(state.spreadIndex + 1)
    else renderCover()
  })
}
