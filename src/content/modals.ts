// modals — assembled from individual location files

export interface ModalContentEntry {
  title: string
  subtitle: string
  body: string
  tags?: string[]
  timeline?: { year: string; event: string }[]
}

import { modal as shibuya109 } from './shibuya109'
import { modal as magazine } from './magazine'
import { modal as gyarusa } from './gyarusa'

export const modalContent: Record<string, ModalContentEntry> = {
  'modal-109': shibuya109,
  'modal-magazine': magazine,
  'modal-gyarusa': gyarusa,
}
