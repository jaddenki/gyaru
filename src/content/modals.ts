// modals — assembled from individual location files

export interface ModalContentEntry {
  title: string
  subtitle: string
  body: string
  tags?: string[]
  timeline?: { year: string; event: string }[]
  /** When set, replaces plain `body` with a formatted bibliography list */
  worksCited?: string[]
}

import { modal as magazine } from './magazine'
import { modal as gyarusa } from './gyarusa'

export const modalContent: Record<string, ModalContentEntry> = {
  'modal-magazine': magazine,
  'modal-gyarusa': gyarusa,
}
