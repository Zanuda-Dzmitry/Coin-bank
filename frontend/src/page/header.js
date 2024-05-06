import { el, setChildren } from 'redom';

export function createHeader() {
  return el('header.header', [
    el('div.header__container', [
      el('a.header__logo', 'Coin.'),
      el('nav.nav', []),
    ]),
  ]);
}
