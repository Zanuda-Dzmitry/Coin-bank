import { el, setChildren } from 'redom';

export function createNav() {
  return el('ul.nav__list', [
    el('li.nav__item', [
      el(
        'a.nav__link nav__btn-atm',
        {
          href: '/ATMs',
        },
        'Банкоматы',
      ),
    ]),
    el('li.nav__item', [
      el(
        'a.nav__link nav__btn-accounts',
        {
          href: '/accounts',
        },
        'Счета',
      ),
    ]),
    el('li.nav__item', [
      el(
        'a.nav__link nav__btn-currency',
        {
          href: '/currency',
        },
        'Валюта',
      ),
    ]),
    el('li.nav__item', [
      el(
        'a.nav__link nav__btn-go',
        {
          href: '/',
        },
        'Выйти',
      ),
    ]),
  ]);
}
