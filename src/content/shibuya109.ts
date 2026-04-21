// shibuya 109 — the gyaru mall

import type { ZoneConfig } from './zones'

/** One substyle: card + in-modal detail (image + blurb). */
export interface GyaruSubstyle {
  id: string
  nameEn: string
  nameJa: string
  teaser: string
  image: string
  blurb: string
}

export const GYARU_SUBSTYLES: GyaruSubstyle[] = [
  {
    id: 'kogal',
    nameEn: 'kogyaru',
    nameJa: 'コギャル',
    teaser: 'Uniform, loose socks.',
    image: '/assets/ui/shibuya109/kogyaru.png',
    blurb:
      'Kogal bent the school dress code: short skirt, bleached hair, loose socks.',
  },
  {
    id: 'ganguro',
    nameEn: 'ganguro',
    nameJa: 'ガングロ',
    teaser: 'Tan, white lips, neon.',
    image: '/assets/ui/shibuya109/ganguro.png',
    blurb:
      'Taking Kogyaru to the next level, Ganguro was high-contrast: deep tan, white eye and lip paint, big color.',
  },
  {
    id: 'manba',
    nameEn: 'manba',
    nameJa: 'ヤマンバ',
    teaser: 'Stripe face, deco hair.',
    image: '/assets/ui/shibuya109/yamanba.png',
    blurb:
      'Yamanba / manba went loud: white face stripe, stickers, rainbow hair, and print on print.',
  },
]

/** URLs used in the modal detail view — preload so opens feel instant. */
export function shibuya109ImageUrls(): readonly string[] {
  return GYARU_SUBSTYLES.map((s) => s.image)
}

function preloadOneImage(url: string): Promise<void> {
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

/** Decode substyle images into cache during idle startup (see main.ts). */
export function preloadShibuya109Images(): void {
  void Promise.all(shibuya109ImageUrls().map(preloadOneImage))
}

export const zone: ZoneConfig = {
  id: 'zone-109',
  modal: 'modal-109',
  label: 'Shibuya 109 (Substyles)',
  interaction: 'modal',
  rect: { top: '3.3%', left: '73.2%', width: '14.8%', height: '48.2%' },
}

const OVERLAY_ATTR = 'data-shibuya109-overlay'

/** Inline palette — light pink surfaces, dark text (matches app popups). */
const UI = {
  accent: '#FF2D78',
  ink: '#2d1520',
  muted: '#7c4a5c',
  edge: 'rgba(190, 24, 93, 0.42)',
  paper: '#fdf2f8',
  hover: '#fce7f3',
} as const

/** Modal typography — bumped for readability inside the overlay. */
const FONT_UI = '18px'
const FONT_UI_LINE = '1.5'
const FONT_UI_TITLE = '20px'

function setGridLayout(el: HTMLElement): void {
  Object.assign(el.style, {
    display: 'grid',
    gap: '12px',
  })
  if (typeof matchMedia !== 'undefined' && matchMedia('(min-width: 480px)').matches) {
    el.style.gridTemplateColumns = 'repeat(3, minmax(0, 1fr))'
  } else {
    el.style.gridTemplateColumns = '1fr'
  }
}

/**
 * Avoid `overflow: hidden` on `document.documentElement`: in Chromium/WebKit it
 * can re-root `position: fixed` to the document, so modals render in-flow at
 * the bottom instead of the viewport center.
 */
type BodyScrollLock = {
  scrollY: number
  position: string
  top: string
  left: string
  right: string
  width: string
  paddingRight: string
}

let bodyScrollLock: BodyScrollLock | null = null

function lockDocumentScroll(): void {
  const body = document.body
  const scrollY = window.scrollY
  const gap = window.innerWidth - document.documentElement.clientWidth
  bodyScrollLock = {
    scrollY,
    position: body.style.position,
    top: body.style.top,
    left: body.style.left,
    right: body.style.right,
    width: body.style.width,
    paddingRight: body.style.paddingRight,
  }
  body.style.position = 'fixed'
  body.style.top = `-${scrollY}px`
  body.style.left = '0'
  body.style.right = '0'
  body.style.width = '100%'
  if (gap > 0) body.style.paddingRight = `${gap}px`
}

function unlockDocumentScroll(): void {
  if (!bodyScrollLock) return
  const body = document.body
  const { scrollY, ...rest } = bodyScrollLock
  body.style.position = rest.position
  body.style.top = rest.top
  body.style.left = rest.left
  body.style.right = rest.right
  body.style.width = rest.width
  body.style.paddingRight = rest.paddingRight
  bodyScrollLock = null
  window.scrollTo(0, scrollY)
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag)
  node.className = className
  return node
}

function closeShibuya109Modal(): void {
  const existing = document.querySelector(`[${OVERLAY_ATTR}]`)
  existing?.remove()
  unlockDocumentScroll()
  document.removeEventListener('keydown', onDocumentKeydown)
}

function onDocumentKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape') closeShibuya109Modal()
}

function buildModal(): HTMLElement {
  const overlay = el('div', 'shibuya109-overlay')
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    maxWidth: '100vw',
    height: '100%',
    minHeight: '100dvh',
    maxHeight: '100dvh',
    margin: '0',
    boxSizing: 'border-box',
    zIndex: '30000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    pointerEvents: 'auto',
    isolation: 'isolate',
    overscrollBehavior: 'contain',
    opacity: '1',
  })
  overlay.setAttribute(OVERLAY_ATTR, 'true')
  overlay.setAttribute('role', 'dialog')
  overlay.setAttribute('aria-modal', 'true')
  overlay.setAttribute('aria-labelledby', 'shibuya109-modal-title')

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeShibuya109Modal()
  })

  const panel = el('div', 'shibuya109-panel')
  panel.id = 'shibuya109-panel'
  panel.tabIndex = -1
  Object.assign(panel.style, {
    position: 'relative',
    width: '100%',
    maxWidth: 'min(46rem, calc(100vw - 32px))',
    maxHeight: 'min(92vh, 900px)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxSizing: 'border-box',
    backgroundColor: UI.paper,
    color: UI.ink,
    border: `2px solid ${UI.edge}`,
    borderRadius: '0',
    fontFamily: 'inherit',
    fontSize: FONT_UI,
    lineHeight: FONT_UI_LINE,
    opacity: '1',
  })
  panel.addEventListener('click', (e) => e.stopPropagation())

  const header = el('div', '')
  Object.assign(header.style, {
    display: 'flex',
    flexShrink: '0',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '16px',
    borderBottom: `1px solid ${UI.edge}`,
    padding: '20px 24px',
    backgroundColor: UI.paper,
  })

  const titleBlock = el('div', '')
  Object.assign(titleBlock.style, {
    minWidth: '0',
    flex: '1',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: '12px',
  })
  const h1 = el('h1', '')
  h1.id = 'shibuya109-modal-title'
  h1.textContent = 'Shibuya 109'
  Object.assign(h1.style, {
    margin: '0',
    color: UI.ink,
    fontSize: FONT_UI_TITLE,
    fontWeight: '400',
    letterSpacing: '-0.02em',
    lineHeight: FONT_UI_LINE,
  })
  const sub = el('span', '')
  sub.textContent = 'Gyaru Substyles'
  Object.assign(sub.style, {
    margin: '0',
    fontSize: FONT_UI,
    fontWeight: '400',
    color: UI.muted,
    lineHeight: FONT_UI_LINE,
  })
  titleBlock.append(h1, sub)

  header.append(titleBlock)

  const panelScroll = el('div', '')
  Object.assign(panelScroll.style, {
    flex: '1',
    minHeight: '0',
    overflowY: 'auto',
    padding: '22px 26px 28px',
  })

  const gridView = el('div', 'shibuya109-grid')
  const detailView = el('div', 'shibuya109-detail')
  setGridLayout(gridView)
  detailView.style.display = 'none'

  const detailBack = el('button', '')
  detailBack.type = 'button'
  detailBack.textContent = 'Back to substyles'
  Object.assign(detailBack.style, {
    cursor: 'pointer',
    border: `1px solid ${UI.edge}`,
    borderRadius: '0',
    backgroundColor: UI.paper,
    color: UI.ink,
    fontWeight: '400',
    fontSize: FONT_UI,
    padding: '8px 14px',
    marginBottom: '16px',
  })
  detailBack.addEventListener('mouseenter', () => {
    detailBack.style.backgroundColor = UI.hover
  })
  detailBack.addEventListener('mouseleave', () => {
    detailBack.style.backgroundColor = UI.paper
  })
  detailBack.addEventListener('click', () => {
    detailView.style.display = 'none'
    gridView.style.display = 'grid'
    setGridLayout(gridView)
  })

  const detailImage = el('img', '') as HTMLImageElement
  Object.assign(detailImage.style, {
    display: 'block',
    width: '100%',
    maxHeight: 'min(52vh, 520px)',
    objectFit: 'contain',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
  })
  detailImage.decoding = 'async'
  detailImage.draggable = false

  const detailNameRow = el('div', '')
  Object.assign(detailNameRow.style, {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: '12px',
    marginTop: '12px',
  })

  const detailTitle = el('h2', '')
  Object.assign(detailTitle.style, {
    margin: '0',
    fontSize: FONT_UI_TITLE,
    fontWeight: '400',
    color: UI.ink,
    lineHeight: FONT_UI_LINE,
  })

  const detailJa = el('span', '')
  Object.assign(detailJa.style, {
    margin: '0',
    fontSize: FONT_UI,
    fontWeight: '400',
    color: UI.accent,
    lineHeight: FONT_UI_LINE,
    whiteSpace: 'nowrap',
  })

  detailNameRow.append(detailTitle, detailJa)
  detailNameRow.setAttribute('role', 'group')

  const detailBlurb = el('p', '')
  Object.assign(detailBlurb.style, {
    margin: '14px 0 0',
    fontSize: FONT_UI,
    fontWeight: '400',
    lineHeight: FONT_UI_LINE,
    color: UI.ink,
  })

  detailView.append(detailBack, detailImage, detailNameRow, detailBlurb)

  function showDetail(style: GyaruSubstyle): void {
    detailImage.src = style.image
    detailImage.alt = `${style.nameEn} — illustration`
    detailTitle.textContent = style.nameEn
    detailJa.textContent = style.nameJa
    detailNameRow.setAttribute(
      'aria-label',
      `${style.nameEn}, ${style.nameJa}`,
    )
    detailBlurb.textContent = style.blurb
    gridView.style.display = 'none'
    detailView.style.display = 'block'
  }

  for (const style of GYARU_SUBSTYLES) {
    const card = el('button', '')
    card.type = 'button'
    Object.assign(card.style, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: 'left',
      cursor: 'pointer',
      border: `1px solid ${UI.edge}`,
      borderRadius: '0',
      backgroundColor: UI.paper,
      color: UI.ink,
      padding: '14px 16px',
      fontFamily: 'inherit',
    })
    const name = el('span', '')
    name.textContent = style.nameEn
    Object.assign(name.style, {
      color: UI.accent,
      fontWeight: '400',
      fontSize: FONT_UI,
      letterSpacing: '0.02em',
    })
    const ja = el('span', '')
    ja.textContent = style.nameJa
    Object.assign(ja.style, {
      marginTop: '2px',
      color: UI.muted,
      fontWeight: '400',
      fontSize: FONT_UI,
    })
    const teaser = el('span', '')
    teaser.textContent = style.teaser
    Object.assign(teaser.style, {
      marginTop: '8px',
      color: UI.muted,
      fontWeight: '400',
      fontSize: FONT_UI,
      lineHeight: FONT_UI_LINE,
    })
    card.append(name, ja, teaser)
    card.setAttribute('aria-label', `View ${style.nameEn}`)

    const accent = UI.accent
    const paper = UI.paper
    card.addEventListener('mouseenter', () => {
      card.style.backgroundColor = UI.hover
      card.style.borderColor = UI.edge
    })
    card.addEventListener('mouseleave', () => {
      card.style.backgroundColor = paper
      card.style.borderColor = UI.edge
      name.style.color = accent
      ja.style.color = UI.muted
      teaser.style.color = UI.muted
    })
    card.addEventListener('click', () => showDetail(style))
    gridView.appendChild(card)
  }

  panelScroll.append(gridView, detailView)
  panel.append(header, panelScroll)
  overlay.appendChild(panel)

  return overlay
}

/** Shibuya 109 — three substyles, minimal modal. */
const Shibuya109Modal = {
  open(): void {
    if (document.querySelector(`[${OVERLAY_ATTR}]`)) return
    lockDocumentScroll()
    document.body.appendChild(buildModal())
    document.addEventListener('keydown', onDocumentKeydown)
    queueMicrotask(() => document.getElementById('shibuya109-panel')?.focus())
  },
  close: closeShibuya109Modal,
}

export default Shibuya109Modal
