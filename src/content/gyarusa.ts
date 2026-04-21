// gyarusa hangout — it takes a circle

import type { ZoneConfig } from './zones'
import type { ModalContentEntry } from './modals'

export const zone: ZoneConfig = {
  id: 'zone-gyarusa',
  modal: 'modal-gyarusa',
  label: 'Gyarusa Hangout',
  interaction: 'modal',
  rect: { top: '63.5%', left: '63.1%', width: '3.5%', height: '5%' },
}

export const modal: ModalContentEntry = {
  title: 'Works Cited',
  subtitle: '',
  body: '',
  worksCited: [
    '"Egg (Magazine)." The Gyaru Wiki, Fandom, gyaru-109.fandom.com/wiki/Egg_(Magazine). Accessed 21 Apr. 2026.',
    '"Ganguro." Wikipedia, Wikimedia Foundation, en.wikipedia.org/wiki/Ganguro. Accessed 21 Apr. 2026.',
    '"Gyaru." Wikipedia, Wikimedia Foundation, en.wikipedia.org/wiki/Gyaru. Accessed 21 Apr. 2026.',
    '"Gyaru Culture: More Than Just a Fashion Statement." Kokoro Care, kokorocares.com/blogs/blog/gyaru-culture-more-than-just-a-fashion-statement. Accessed 21 Apr. 2026.',
    '"Gyaru Culture: Yone-san and the Cult of Egg Magazine." Sabukaru, sabukaru.online/articles/gyaru-revolution-yone-san-and-the-influence-of-egg-magazine. Accessed 21 Apr. 2026.',
    '"Gyaru/Substyles." The Gyaru Wiki, Fandom, gyaru-109.fandom.com/wiki/Gyaru/Substyles. Accessed 21 Apr. 2026.',
    'Haenfler, Ross. "Gyaru." Subcultures and Sociology, Grinnell College, haenfler.sites.grinnell.edu/subcultures-and-scenes/gyaru/. Accessed 21 Apr. 2026.',
    '"History." Gal Revo, www.galrevo.com/history. Accessed 21 Apr. 2026.',
    '"The History of Gyaru: A Fashion Rebellion." Valor Dictus, 22 Nov. 2022, valor-dictus.com/artsentertainment/2022/11/22/the-history-of-gyaru-a-fashion-rebellion/.',
    '"The History of Gyaru: From Protest to Subculture." Medium, medium.com/@sonneblade/the-history-of-gyaru-from-protest-to-subculture-bdd9d50cf768. Accessed 21 Apr. 2026.',
    '"What Is Gyaru? The Definitive Guide to Japan\'s Rebel Culture." Gyaru.online, gyaru.online/blog/what-is-gyaru/. Accessed 21 Apr. 2026.',
    '"Yamanba." Gyaru Wiki, Fandom, gyaru.fandom.com/wiki/Yamanba. Accessed 21 Apr. 2026.',
  ],
}
