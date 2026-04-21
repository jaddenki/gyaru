// magazine-pages.ts — list of spread images for the egg magazine flip-book

/** Cover shown before the flip-book; keep in sync with `#magazine-cover-img` in index.html */
export const MAGAZINE_COVER = '/assets/ui/magazine/0.png'

export const pages: string[] = [
  '/assets/ui/magazine/1.png',
  '/assets/ui/magazine/2.png',
  '/assets/ui/magazine/3.png',
  '/assets/ui/magazine/4.png',
]

/** All raster assets for the magazine overlay (cover + spreads) — use for preloading */
export function magazineImageUrls(): readonly string[] {
  return [MAGAZINE_COVER, ...pages]
}
